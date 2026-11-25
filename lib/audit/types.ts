export type Strategy = "mobile" | "desktop";
export type Rating = "good" | "average" | "poor";
export type CategoryKey = "performance" | "seo" | "accessibility" | "bestPractices";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  performance: "Performance",
  seo: "SEO",
  accessibility: "Accessibility",
  bestPractices: "Best Practices",
};

export type Metric = { id: string; label: string; value: string; rating: Rating | null };

export type FieldMetric = { id: "lcp" | "inp" | "cls"; label: string; value: string; rating: Rating };

export type Issue = {
  id: string;
  category: CategoryKey;
  title: string;
  description: string;
  displayValue?: string;
  /** 0 to 100 */
  score: number;
  savingsMs?: number;
};

/** One PageSpeed Insights run, reduced to what the report shows. Every value comes from the API response. */
export type AuditResult = {
  strategy: Strategy;
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string;
  lighthouseVersion?: string;
  /** 0 to 100, or null when PageSpeed Insights did not return the category. */
  scores: Record<CategoryKey, number | null>;
  metrics: Metric[];
  /** Real-user Chrome UX Report data, when Google has enough of it. */
  field?: { scope: "page" | "origin"; metrics: FieldMetric[] };
  issues: Issue[];
};

export type AuditError = { error: string; code: "invalid_url" | "rate_limited" | "not_configured" | "unreachable" | "timeout" | "upstream" };

export const ratingFor = (score: number | null): Rating | null => (score === null ? null : score >= 90 ? "good" : score >= 50 ? "average" : "poor");
