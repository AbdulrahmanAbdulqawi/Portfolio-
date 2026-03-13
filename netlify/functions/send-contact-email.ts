import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

/** Contact form body */
interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
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
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Send mail error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
