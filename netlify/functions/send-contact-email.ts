import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

/** Contact form body */
interface ContactBody {
  name: string;
  email: string;
  message: string;
  /** Honeypot field - should be empty for real users */
  website?: string;
}

/**
 * Simple in-memory rate limiter.
 * Note: In serverless, each instance has its own memory, so this provides
 * per-instance rate limiting. For distributed rate limiting, use a service
 * like Redis or Netlify's built-in rate limiting at the edge.
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 requests per window per IP

/** Clean up expired entries periodically */
function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/** Check if request should be rate limited */
function isRateLimited(clientIp: string): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  cleanupRateLimitStore();

  const entry = rateLimitStore.get(clientIp);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { limited: false, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { limited: true, remaining: 0, resetIn: entry.resetTime - now };
  }

  entry.count++;
  return { limited: false, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetIn: entry.resetTime - now };
}

/** Get client IP from various headers (Netlify, proxies, direct) */
function getClientIp(event: HandlerEvent): string {
  const headers = event.headers;
  return (
    headers['x-nf-client-connection-ip'] ||
    headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    headers['x-real-ip'] ||
    headers['client-ip'] ||
    'unknown'
  );
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Rate limiting check
  const clientIp = getClientIp(event);
  const rateLimit = isRateLimited(clientIp);

  if (rateLimit.limited) {
    return {
      statusCode: 429,
      headers: {
        'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
      },
      body: JSON.stringify({
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(rateLimit.resetIn / 1000),
      }),
    };
  }

  const host = process.env.SMTP_HOST ?? 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER ?? process.env.EMAIL_FROM;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM ?? user;
  // Port 465 = implicit SSL; 587 = STARTTLS (secure: false)
  const secure = port === 465;

  if (!user || !password) {
    const missing = [
      !user && 'SMTP_USER or EMAIL_FROM',
      !password && 'SMTP_PASSWORD',
    ].filter(Boolean);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Email not configured.',
        missing: missing as string[],
        hint: 'Set env vars in Netlify (Site → Environment variables) then trigger a new deploy.',
      }),
    };
  }

  let body: ContactBody;
  try {
    body = JSON.parse(event.body ?? '{}') as ContactBody;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  // Honeypot check: if the hidden "website" field is filled, it's likely a bot
  if (body.website) {
    // Return success to avoid giving bots feedback, but don't actually send
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing name, email, or message' }),
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to: from,
      replyTo: email,
      subject: `Contact from ${name.trim()} (${email.trim()})`,
      text: message.trim(),
      html: `<p><strong>From:</strong> ${name.trim()} &lt;${email.trim()}&gt;</p><p>${message.trim().replace(/\n/g, '<br>')}</p>`,
    });
    return {
      statusCode: 200,
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
      },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('Send mail error:', err);
    return {
      statusCode: 500,
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
      },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
