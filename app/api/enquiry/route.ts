import { NextResponse } from "next/server";
import { INTERESTS, PACKAGES, SITE } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Small in-memory limiter. Good for a single server; Stage 4 moves rate limiting to a shared store. */
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend it worked and send nothing.
  if (str(body.hp, 200)) return NextResponse.json({ ok: true });

  const type = body.type === "newsletter" ? "newsletter" : "enquiry";
  const email = str(body.email, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  let subject: string;
  let rows: [string, string][];

  if (type === "newsletter") {
    subject = "New newsletter subscriber";
    rows = [["Email", email]];
  } else {
    const name = str(body.name, 120);
    if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
    const pkg = PACKAGES.find((p) => p.name === str(body.package, 40))?.name ?? "Not chosen";
    const interests = Array.isArray(body.interests)
      ? body.interests.filter((i): i is string => typeof i === "string" && INTERESTS.includes(i))
      : [];
    subject = `New enquiry from ${name}${pkg !== "Not chosen" ? ` (${pkg})` : ""}`;
    rows = [
      ["Topic", str(body.topic, 120) || "General enquiry"],
      ["Name", name],
      ["Business", str(body.company, 160)],
      ["Email", email],
      ["WhatsApp / phone", str(body.phone, 40)],
      ["Website", str(body.website, 300)],
      ["Package", pkg],
      ["Interested in", interests.join(", ")],
      ["Goals", str(body.message, 4000)],
    ];
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) {
    console.warn("[enquiry] RESEND_API_KEY / ENQUIRY_FROM not set; message was not delivered.");
    return NextResponse.json({ error: "Our online form is not connected to email yet." }, { status: 503 });
  }

  const html = `<table cellpadding="8" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="color:#6a5f62;vertical-align:top;border-bottom:1px solid #eee"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.ENQUIRY_TO || SITE.email],
        reply_to: email,
        subject: `[${SITE.domain}] ${subject}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend rejected the message:", res.status, await res.text());
      return NextResponse.json({ error: "We could not send your message right now." }, { status: 502 });
    }
  } catch (err) {
    console.error("[enquiry] Resend request failed:", err);
    return NextResponse.json({ error: "We could not send your message right now." }, { status: 504 });
  } finally {
    clearTimeout(timer);
  }

  return NextResponse.json({ ok: true });
}
