import { ratingFor, type AuditResult, type CategoryKey, type FieldMetric, type Issue, type Metric, type Rating, type Strategy } from "./types";

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const TIMEOUT_MS = 55_000;

/** Thrown with a message that is safe to show to visitors. */
export class AuditFailure extends Error {
  constructor(
    public code: "not_configured" | "unreachable" | "timeout" | "upstream",
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

type LhAudit = {
  title?: string;
  description?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
  numericValue?: number;
  details?: { overallSavingsMs?: number };
  metricSavings?: Record<string, number>;
};
type LhCategory = { score?: number | null; auditRefs?: { id: string; weight?: number; group?: string }[] };
type CruxMetric = { percentile?: number; category?: string };
type PsiResponse = {
  error?: { code?: number; message?: string };
  id?: string;
  analysisUTCTimestamp?: string;
  loadingExperience?: { metrics?: Record<string, CruxMetric> };
  originLoadingExperience?: { metrics?: Record<string, CruxMetric> };
  lighthouseResult?: {
    lighthouseVersion?: string;
    finalDisplayedUrl?: string;
    finalUrl?: string;
    fetchTime?: string;
    runtimeError?: { code?: string; message?: string };
    categories?: Record<string, LhCategory>;
    audits?: Record<string, LhAudit>;
  };
};

const PSI_CATEGORY: Record<CategoryKey, string> = {
  performance: "performance",
  seo: "seo",
  accessibility: "accessibility",
  bestPractices: "best-practices",
};

const LAB_METRICS: [string, string][] = [
  ["largest-contentful-paint", "Largest Contentful Paint"],
  ["cumulative-layout-shift", "Cumulative Layout Shift"],
  ["total-blocking-time", "Total Blocking Time"],
  ["first-contentful-paint", "First Contentful Paint"],
  ["speed-index", "Speed Index"],
];

const CRUX_RATING: Record<string, Rating> = { FAST: "good", AVERAGE: "average", SLOW: "poor" };

const pct = (score: number | null | undefined) => (typeof score === "number" ? Math.round(score * 100) : null);

/** Lighthouse descriptions are Markdown. Keep the text, drop links and code ticks. */
const plain = (s = "") =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, "")
    .replace(/\s+Learn (more|how)[^.]*\.?$/i, "")
    .trim();

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

function fieldData(metrics?: Record<string, CruxMetric>): FieldMetric[] {
  if (!metrics) return [];
  const out: FieldMetric[] = [];
  const add = (key: string, id: FieldMetric["id"], label: string, format: (p: number) => string) => {
    const m = metrics[key];
    const rating = m?.category ? CRUX_RATING[m.category] : undefined;
    if (typeof m?.percentile === "number" && rating) out.push({ id, label, value: format(m.percentile), rating });
  };
  add("LARGEST_CONTENTFUL_PAINT_MS", "lcp", "Largest Contentful Paint", seconds);
  add("INTERACTION_TO_NEXT_PAINT", "inp", "Interaction to Next Paint", (p) => `${Math.round(p)} ms`);
  add("CUMULATIVE_LAYOUT_SHIFT_SCORE", "cls", "Cumulative Layout Shift", (p) => (p / 100).toFixed(2));
  return out;
}

/** Reduces a raw PageSpeed Insights response to the report shape. Exported for tests. */
export function toAuditResult(data: PsiResponse, requestedUrl: string, strategy: Strategy): AuditResult {
  const lh = data.lighthouseResult;
  const runtime = lh?.runtimeError;
  if (!lh || !lh.categories || !lh.audits || (runtime?.code && runtime.code !== "NO_ERROR")) {
    throw new AuditFailure("unreachable", "We could not load that website. Check the address is correct and the site is online, then try again.", 422);
  }
  const audits = lh.audits;

  const scores = {} as Record<CategoryKey, number | null>;
  const issues: Issue[] = [];
  for (const key of Object.keys(PSI_CATEGORY) as CategoryKey[]) {
    const cat = lh.categories[PSI_CATEGORY[key]];
    scores[key] = pct(cat?.score);
    const found: (Issue & { weight: number })[] = [];
    for (const ref of cat?.auditRefs ?? []) {
      if (ref.group === "metrics" || ref.group === "hidden") continue;
      const a = audits[ref.id];
      if (!a?.title || typeof a.score !== "number" || a.score >= 0.9) continue;
      if (a.scoreDisplayMode && !["binary", "numeric", "metricSavings"].includes(a.scoreDisplayMode)) continue;
      const savings = a.details?.overallSavingsMs ?? Math.max(0, a.metricSavings?.LCP ?? 0, a.metricSavings?.FCP ?? 0);
      found.push({
        id: ref.id,
        category: key,
        title: plain(a.title),
        description: plain(a.description),
        displayValue: a.displayValue || undefined,
        score: Math.round(a.score * 100),
        savingsMs: savings > 0 ? Math.round(savings) : undefined,
        weight: ref.weight ?? 0,
      });
    }
    found.sort((x, y) => (key === "performance" ? (y.savingsMs ?? 0) - (x.savingsMs ?? 0) : 0) || y.weight - x.weight || x.score - y.score);
    for (const { weight: _weight, ...issue } of found.slice(0, 12)) issues.push(issue);
  }

  if (Object.values(scores).every((v) => v === null)) {
    throw new AuditFailure("upstream", "The audit did not return any scores. Please try again.", 502);
  }

  const metrics: Metric[] = [];
  for (const [id, label] of LAB_METRICS) {
    const a = audits[id];
    if (a?.displayValue) metrics.push({ id, label, value: a.displayValue.replace(/ /g, " "), rating: ratingFor(pct(a.score)) });
  }

  const page = fieldData(data.loadingExperience?.metrics);
  const origin = page.length ? [] : fieldData(data.originLoadingExperience?.metrics);
  const field = page.length ? { scope: "page" as const, metrics: page } : origin.length ? { scope: "origin" as const, metrics: origin } : undefined;

  return {
    strategy,
    requestedUrl,
    finalUrl: lh.finalDisplayedUrl || lh.finalUrl || data.id || requestedUrl,
    fetchedAt: lh.fetchTime || data.analysisUTCTimestamp || new Date().toISOString(),
    lighthouseVersion: lh.lighthouseVersion,
    scores,
    metrics,
    field,
    issues,
  };
}

/** Runs one PageSpeed Insights audit on Google's servers. The API key never leaves this server. */
export async function runPageSpeed(url: string, strategy: Strategy): Promise<AuditResult> {
  const key = process.env.PAGESPEED_API_KEY;
  if (!key) {
    throw new AuditFailure("not_configured", "The audit tool is not connected yet. Please request a professional audit and our team will review your site.", 503);
  }
  const q = new URLSearchParams({ url, strategy, key });
  for (const c of Object.values(PSI_CATEGORY)) q.append("category", c);

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?${q}`, { signal: AbortSignal.timeout(TIMEOUT_MS), cache: "no-store" });
  } catch (err) {
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      throw new AuditFailure("timeout", "The audit took too long to finish. Large or slow pages can do this. Please try again.", 504);
    }
    throw new AuditFailure("upstream", "We could not reach the audit service. Please try again in a moment.", 502);
  }

  let data: PsiResponse;
  try {
    data = (await res.json()) as PsiResponse;
  } catch {
    throw new AuditFailure("upstream", "The audit service returned an unexpected response. Please try again.", 502);
  }

  if (!res.ok || data.error) {
    const message = data.error?.message ?? "";
    console.error(`[audit] PageSpeed ${res.status} for ${strategy}: ${message.slice(0, 300)}`);
    if (res.status === 429) throw new AuditFailure("upstream", "The audit service is busy right now. Please try again in a few minutes.", 503);
    if (/API key|API_KEY|permission|forbidden/i.test(message) || res.status === 403) {
      throw new AuditFailure("not_configured", "The audit tool is not available right now. Please request a professional audit instead.", 503);
    }
    if (/DOCUMENT_REQUEST|DNS_FAILURE|NO_FCP|NOT_HTML|PAGE_HUNG|unable to process|could not be resolved|returned with error/i.test(message) || res.status === 400 || res.status === 500) {
      throw new AuditFailure("unreachable", "We could not load that website. Check the address is correct and the site is online, then try again.", 422);
    }
    throw new AuditFailure("upstream", "The audit could not be completed. Please try again.", 502);
  }

  return toAuditResult(data, url, strategy);
}
