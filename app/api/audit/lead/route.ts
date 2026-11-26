import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { clientIp, createLimiter } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const limited = createLimiter(8, 10 * 60 * 1000);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Records who ran a free audit: the visitor's email, optional WhatsApp number, the audited website and,
 * when the audit finished, its scores. The lead is posted as JSON to LEAD_WEBHOOK_URL (the Google Sheet
 * web app described in docs/audit-leads-google-sheet.md) and, if email delivery is configured (lib/mailer.ts), also emailed to
 * A1 Rank. The audit never depends on this call.
 */
export async function POST(req: Request) {
  let body: { email?: unknown; phone?: unknown; url?: unknown; hp?: unknown; scores?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Bots fill the hidden field. Pretend it worked and send nothing.
  if (typeof body.hp === "string" && body.hp) return json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  if (!EMAIL_RE.test(email)) return json({ error: "Please enter a valid email address." }, 400);
  const url = typeof body.url === "string" ? normaliseUrl(body.url) : null;
  if (!url) return json({ error: "Enter a valid website address." }, 400);

  const phone = typeof body.phone === "string" ? body.phone.replace(/[^\d+ ()-]/g, "").trim().slice(0, 24) : "";
  const scores = readScores(body.scores);

  if (limited(clientIp(req))) return json({ ok: true, delivered: false });

  const rows: [string, string][] = [
    ["Email", email],
    ["WhatsApp", phone],
    ["Website audited", url],
    ...scores.map(([device, s]): [string, string] => [`${device} scores`, s]),
    ["Audit result", scores.length ? "Completed" : "Not completed (failed, cancelled or the visitor left)"],
    ["Contact consent", "Shown on the form: agreed to be contacted by email or WhatsApp about results and services"],
  ];

  const [emailed, logged] = await Promise.all([sendEmail(email, url, rows), postWebhook({
      at: new Date().toISOString(),
      email,
      phone,
      url,
      mobile: scores.find(([d]) => d === "Mobile")?.[1] ?? "",
      desktop: scores.find(([d]) => d === "Desktop")?.[1] ?? "",
      status: scores.length ? "Completed" : "Not completed",
      consent: "Yes (agreed on the form)",
    })]);
  return json({ ok: true, delivered: emailed || logged });
}

const CATEGORIES = [
  ["performance", "Performance"],
  ["seo", "SEO"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best practices"],
] as const;

/** Keeps only whole-number scores from 0 to 100 for known devices and categories. */
function readScores(input: unknown): [string, string][] {
  if (!input || typeof input !== "object") return [];
  const out: [string, string][] = [];
  for (const device of ["mobile", "desktop"] as const) {
    const s = (input as Record<string, unknown>)[device];
    if (!s || typeof s !== "object") continue;
    const parts = CATEGORIES.flatMap(([key, label]) => {
      const v = (s as Record<string, unknown>)[key];
      return typeof v === "number" && v >= 0 && v <= 100 ? [`${label} ${Math.round(v)}`] : [];
    });
    if (parts.length) out.push([device === "mobile" ? "Mobile" : "Desktop", parts.join(", ")]);
  }
  return out;
}

async function postWebhook(payload: object) {
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.warn("[audit-lead] LEAD_WEBHOOK_URL not set; the lead was not saved to the sheet.");
    return false;
  }
  try {
    const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000) });
    return res.ok;
  } catch (err) {
    console.error("[audit-lead] webhook failed:", err);
    return false;
  }
}

async function sendEmail(email: string, url: string, rows: [string, string][]) {
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">
<p>Someone ran the free website audit on ${esc(SITE.domain)}.</p>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="color:#6a5f62;vertical-align:top;border-bottom:1px solid #eee"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #eee">${esc(v)}</td></tr>`)
    .join("")}</table>
<p>Reply to this email to contact them.</p></div>`;

  const subject = `[${SITE.domain}] Free audit lead: ${new URL(url).hostname}`;
  return (await sendMail({ subject, html, replyTo: email }, "audit-lead")) === "sent";
}
