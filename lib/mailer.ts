import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

/**
 * Sends the website's notification emails (enquiries, newsletter sign-ups, audit leads) to A1 Rank.
 *
 * Two ways to deliver, tried in this order:
 * 1. SMTP through the A1 Rank mailbox (Hostinger). Needs only SMTP_PASS; host, port and user have defaults.
 * 2. Resend, when RESEND_API_KEY and ENQUIRY_FROM are set. Also used if SMTP fails.
 *
 * The password and API key are read from environment variables only. Never put them in the code.
 */

export type MailResult = "sent" | "not_configured" | "failed";
type Mail = { subject: string; html: string; replyTo: string };

const TIMEOUT_MS = 10_000;

function smtpConfig() {
  const pass = process.env.SMTP_PASS;
  if (!pass) return null;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || SITE.email;
  return {
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465,
    user,
    pass,
    from: process.env.ENQUIRY_FROM || `A1 Rank Website <${user}>`,
  };
}

function resendConfig() {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  return key && from ? { key, from } : null;
}

export const mailConfigured = () => Boolean(smtpConfig() || resendConfig());

const recipient = () => process.env.ENQUIRY_TO || SITE.email;

async function viaSmtp(cfg: NonNullable<ReturnType<typeof smtpConfig>>, mail: Mail, tag: string) {
  try {
    const transport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
      connectionTimeout: TIMEOUT_MS,
      greetingTimeout: TIMEOUT_MS,
      socketTimeout: TIMEOUT_MS,
    });
    await transport.sendMail({ from: cfg.from, to: recipient(), replyTo: mail.replyTo, subject: mail.subject, html: mail.html });
    return true;
  } catch (err) {
    // Log the reason only. The error object can carry connection details.
    const e = err as { code?: string; responseCode?: number; message?: string };
    console.error(`[${tag}] SMTP send failed:`, e.code ?? "", e.responseCode ?? "", e.message ?? "");
    return false;
  }
}

async function viaResend(cfg: NonNullable<ReturnType<typeof resendConfig>>, mail: Mail, tag: string) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Authorization: `Bearer ${cfg.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: [recipient()], reply_to: mail.replyTo, subject: mail.subject, html: mail.html }),
    });
    if (!res.ok) {
      console.error(`[${tag}] Resend rejected the message:`, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[${tag}] Resend request failed:`, err);
    return false;
  }
}

export async function sendMail(mail: Mail, tag: string): Promise<MailResult> {
  const smtp = smtpConfig();
  const resend = resendConfig();
  if (!smtp && !resend) return "not_configured";
  if (smtp && (await viaSmtp(smtp, mail, tag))) return "sent";
  if (resend && (await viaResend(resend, mail, tag))) return "sent";
  return "failed";
}
