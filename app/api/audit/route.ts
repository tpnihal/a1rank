import { NextResponse } from "next/server";
import { AuditFailure, runPageSpeed } from "@/lib/audit/psi";
import type { AuditError, Strategy } from "@/lib/audit/types";
import { clientIp, createLimiter } from "@/lib/rate-limit";
import { normaliseUrl } from "@/lib/url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** PageSpeed Insights often needs 20 to 40 seconds per run. */
export const maxDuration = 60;

// One audit is two requests (mobile + desktop): 12 requests allow six audits per 10 minutes per visitor.
const limited = createLimiter(12, 10 * 60 * 1000);

const fail = (body: AuditError, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  let body: { url?: unknown; strategy?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return fail({ code: "invalid_url", error: "Invalid request." }, 400);
  }

  const url = typeof body.url === "string" ? normaliseUrl(body.url) : null;
  if (!url) return fail({ code: "invalid_url", error: "Enter a valid public website address, for example yourbusiness.ae" }, 400);
  const strategy: Strategy = body.strategy === "desktop" ? "desktop" : "mobile";

  if (limited(clientIp(req))) {
    return fail({ code: "rate_limited", error: "You have run several audits in a short time. Please wait a few minutes and try again." }, 429);
  }

  try {
    const result = await runPageSpeed(url, strategy);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof AuditFailure) return fail({ code: err.code, error: err.message }, err.status);
    console.error("[audit] unexpected error", err);
    return fail({ code: "upstream", error: "The audit could not be completed. Please try again." }, 500);
  }
}
