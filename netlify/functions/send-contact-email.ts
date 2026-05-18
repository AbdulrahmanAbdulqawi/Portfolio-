import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

/**
 * CORS headers for the function.
 * Uses the Netlify URL environment variable to restrict to same origin in production,
 * falls back to allowing any origin for local development.
 */
function getCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': process.env.URL || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/**
 * Escape HTML entities to prevent XSS in email content.
 * Converts potentially dangerous characters to their HTML entity equivalents.
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
  const corsHeaders = getCorsHeaders();

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Rate limiting check
  const clientIp = getClientIp(event);
  const rateLimit = isRateLimited(clientIp);

  if (rateLimit.limited) {
    return {
      statusCode: 429,
      headers: {
        ...corsHeaders,
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
      headers: corsHeaders,
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
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  // Honeypot check: if the hidden "website" field is filled, it's likely a bot
  if (body.website) {
    // Return success to avoid giving bots feedback, but don't actually send
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    };
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      statusCode: 400,
      headers: corsHeaders,
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
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to: from,
      replyTo: email,
      subject: `Contact from ${name.trim()} (${email.trim()})`,
      text: message.trim(),
      html: `<p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p>${safeMessage}</p>`,
    });
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
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
        ...corsHeaders,
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
      },
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
