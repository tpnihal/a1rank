import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { CATEGORY_LABELS, type CategoryKey, type Strategy } from "@/lib/audit/types";
import { clientIp, createLimiter } from "@/lib/rate-limit";
import { normaliseUrl } from "@/lib/url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const limited = createLimiter(6, 10 * 60 * 1000);
const CATEGORIES = Object.keys(CATEGORY_LABELS) as CategoryKey[];
const ID_RE = /^[a-z0-9-]{2,60}$/;

const SYSTEM = `You explain website audit results to a business owner who is not technical.
You are given Google PageSpeed Insights (Lighthouse) scores and the IDs of the audits that failed.
Write a short plain-English summary: what the scores mean for their customers, the two or three fixes that matter most, and what is already good.
Rules: use only the numbers provided and never invent or estimate figures. Do not promise rankings, traffic or sales. No headings, no bullet lists, no Markdown. Under 140 words. British English.`;

type Run = { strategy: Strategy; scores: Record<CategoryKey, number | null>; issues: string[] };

/** Accepts numbers and Lighthouse audit IDs only, so no free text from the browser reaches the model. */
function parseRun(v: unknown): Run | null {
  if (!v || typeof v !== "object") return null;
  const r = v as Record<string, unknown>;
  if (r.strategy !== "mobile" && r.strategy !== "desktop") return null;
  const s = (r.scores ?? {}) as Record<string, unknown>;
  const scores = {} as Run["scores"];
  for (const c of CATEGORIES) {
    const n = s[c];
    scores[c] = typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 100 ? n : null;
  }
  const issues = Array.isArray(r.issues) ? r.issues.filter((x): x is string => typeof x === "string" && ID_RE.test(x)).slice(0, 25) : [];
  return { strategy: r.strategy, scores, issues };
}

/**
 * Optional plain-English summary of an audit, written by Claude.
 * Returns { summary: null } when ANTHROPIC_API_KEY is not set, and the report simply omits the section.
 */
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ summary: null });
  if (limited(clientIp(req))) return NextResponse.json({ summary: null }, { status: 429 });

  let body: { url?: unknown; runs?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ summary: null }, { status: 400 });
  }
  const url = typeof body.url === "string" ? normaliseUrl(body.url) : null;
  const runs = (Array.isArray(body.runs) ? body.runs : []).map(parseRun).filter((r): r is Run => r !== null).slice(0, 2);
  if (!url || !runs.length) return NextResponse.json({ summary: null }, { status: 400 });

  const facts = [
    `Website: ${new URL(url).hostname}`,
    ...runs.map(
      (r) =>
        `${r.strategy} scores out of 100: ${CATEGORIES.map((c) => `${CATEGORY_LABELS[c]} ${r.scores[c] ?? "not available"}`).join(", ")}. Failed audit IDs: ${r.issues.join(", ") || "none"}.`,
    ),
  ].join("\n");

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: [{ role: "user", content: facts }],
    });
    if (response.stop_reason === "refusal") return NextResponse.json({ summary: null });
    const summary = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    return NextResponse.json({ summary: summary ? summary.slice(0, 1500) : null }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) console.error("[audit] Claude rate limited");
    else if (err instanceof Anthropic.AuthenticationError) console.error("[audit] ANTHROPIC_API_KEY was rejected");
    else if (err instanceof Anthropic.APIError) console.error(`[audit] Claude API error ${err.status}`);
    else console.error("[audit] Claude summary failed", err);
    return NextResponse.json({ summary: null });
  }
}
