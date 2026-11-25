"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { buildRecommendations, overallScore } from "@/lib/audit/recommend";
import { CATEGORY_LABELS, type AuditResult, type CategoryKey, type Strategy } from "@/lib/audit/types";
import { ArrowRight } from "../Icons";
import { RATING_WORD, RatingDot, ScoreRing } from "./ScoreRing";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as CategoryKey[];

const when = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

type Props = {
  results: Partial<Record<Strategy, AuditResult>>;
  /** Shown when one of the two runs failed. */
  notice?: string;
  summary?: string | null;
  onReset: () => void;
};

export function AuditReport({ results, notice, summary, onReset }: Props) {
  const available = (["mobile", "desktop"] as Strategy[]).filter((s) => results[s]);
  const [tab, setTab] = useState<Strategy>(available[0]);
  const all = useMemo(() => available.map((s) => results[s] as AuditResult), [results]); // eslint-disable-line react-hooks/exhaustive-deps
  const current = (results[tab] ?? all[0]) as AuditResult;
  const overall = useMemo(() => overallScore(all), [all]);
  const recommendations = useMemo(() => buildRecommendations(all), [all]);
  const host = (() => {
    try {
      return new URL(current.finalUrl).hostname;
    } catch {
      return current.finalUrl;
    }
  })();
  const contact = `/contact?topic=audit&website=${encodeURIComponent(current.requestedUrl)}`;
  /** Opens every issue list so the saved PDF contains the full report, then uses the browser's print to PDF. */
  const downloadPdf = () => {
    document.querySelectorAll<HTMLDetailsElement>(".audit-report details").forEach((d) => (d.open = true));
    window.print();
  };
  const card = "rounded-3xl border border-white/12 bg-a1-coal p-6 md:p-8 print:border-black/20 print:bg-white";

  return (
    <div className="audit-report space-y-5" aria-live="polite">
      <p className="hidden items-center justify-between border-b border-black/30 pb-3 text-[0.85rem] font-bold print:flex">
        <span>A1 Rank · Free Website Audit</span>
        <span>www.a1rank.com</span>
      </p>
      <section className={`${card} grid items-center gap-8 md:grid-cols-[auto_1fr]`}>
        <ScoreRing score={overall} label="Overall score" size={168} />
        <div>
          <p className="eyebrow text-a1-coral">Website audit report</p>
          <h2 className="mt-3 break-words text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.05]">{host}</h2>
          <p className="mt-3 text-[0.92rem] text-a1-ash print:text-black">
            Tested {when(current.fetchedAt)} with Google PageSpeed Insights
            {current.lighthouseVersion ? ` (Lighthouse ${current.lighthouseVersion})` : ""}. The overall score is the average of the category scores below
            {all.length > 1 ? " on mobile and desktop" : ""}.
          </p>
          {notice ? <p className="mt-3 rounded-2xl border border-[#FFA400]/40 bg-[#FFA400]/10 px-4 py-3 text-[0.9rem] text-[#ffd591] print:text-black">{notice}</p> : null}
          <div className="mt-6 flex flex-wrap gap-2.5 print:hidden">
            <button type="button" onClick={downloadPdf} className="btn-primary">
              Download PDF
            </button>
            <button type="button" onClick={onReset} className="btn-ghost">
              Run another audit
            </button>
          </div>
        </div>
      </section>

      {summary ? (
        <section className={card}>
          <p className="eyebrow text-a1-coral">In plain English</p>
          <p className="mt-4 max-w-[52rem] text-[1.08rem] leading-relaxed">{summary}</p>
          <p className="mt-4 text-[0.8rem] text-a1-stone">Summary written by AI from the audit data above. Check details against the full results.</p>
        </section>
      ) : null}

      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-[1.5rem] font-extrabold">Scores by device</h3>
          {available.length > 1 ? (
            <div role="tablist" aria-label="Device" className="flex rounded-full border border-white/15 p-1 print:hidden">
              {available.map((s) => (
                <button
                  key={s}
                  role="tab"
                  type="button"
                  aria-selected={tab === s}
                  onClick={() => setTab(s)}
                  className={`rounded-full px-5 py-2 text-[0.88rem] font-bold capitalize transition ${tab === s ? "bg-white text-a1-ink" : "text-a1-ash hover:text-white"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <p className="eyebrow mt-2 text-a1-stone">{current.strategy} results</p>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <ScoreRing key={c} score={current.scores[c]} label={CATEGORY_LABELS[c]} />
          ))}
        </div>
        {all.length > 1 ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-[0.92rem]">
              <caption className="sr-only">Mobile and desktop scores</caption>
              <thead>
                <tr className="eyebrow border-b border-white/10 !text-[0.62rem] text-a1-stone print:border-black/20">
                  <th className="py-2.5 font-medium">Category</th>
                  {all.map((r) => (
                    <th key={r.strategy} className="py-2.5 font-medium capitalize">
                      {r.strategy}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((c) => (
                  <tr key={c} className="border-b border-white/10 print:border-black/20">
                    <th scope="row" className="py-3 font-semibold">
                      {CATEGORY_LABELS[c]}
                    </th>
                    {all.map((r) => (
                      <td key={r.strategy} className="py-3 font-bold tabular-nums">
                        {r.scores[c] ?? "–"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section className={card}>
        <h3 className="text-[1.5rem] font-extrabold">Core Web Vitals and speed</h3>
        <p className="mt-2 text-[0.92rem] text-a1-ash print:text-black">Lab test on {current.strategy}. These measure how fast the page appears, how stable it is and how quickly it responds.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {current.metrics.map((m) => (
            <li key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 print:border-black/20">
              <p className="flex items-center gap-2 text-[0.8rem] text-a1-ash print:text-black">
                <RatingDot rating={m.rating} /> {m.rating ? RATING_WORD[m.rating] : "Measured"}
              </p>
              <p className="mt-3 font-display text-[1.7rem] font-extrabold tabular-nums leading-none">{m.value}</p>
              <p className="mt-2 text-[0.84rem] font-semibold">{m.label}</p>
            </li>
          ))}
        </ul>
        {current.field ? (
          <>
            <h4 className="mt-8 text-[1.1rem] font-bold">Real visitors, last 28 days</h4>
            <p className="mt-1 text-[0.88rem] text-a1-ash print:text-black">
              From the Chrome User Experience Report for {current.field.scope === "page" ? "this page" : "the whole site"}, at the 75th percentile.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {current.field.metrics.map((m) => (
                <li key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 print:border-black/20">
                  <p className="flex items-center gap-2 text-[0.8rem] text-a1-ash print:text-black">
                    <RatingDot rating={m.rating} /> {RATING_WORD[m.rating]}
                  </p>
                  <p className="mt-3 font-display text-[1.7rem] font-extrabold tabular-nums leading-none">{m.value}</p>
                  <p className="mt-2 text-[0.84rem] font-semibold">{m.label}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-6 text-[0.88rem] text-a1-stone">Google does not yet have enough real-visitor data for this site, so only lab results are shown.</p>
        )}
      </section>

      <section className={card}>
        <h3 className="text-[1.5rem] font-extrabold">Recommendations</h3>
        {recommendations.length ? (
          <ol className="mt-5 divide-y divide-white/10 border-y border-white/10 print:divide-black/20 print:border-black/20">
            {recommendations.map((r, i) => (
              <li key={r.id} className="grid gap-x-5 gap-y-2 py-5 md:grid-cols-[2.5rem_1fr_auto]">
                <span className="font-mono text-[0.8rem] text-a1-coral">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-bold">{r.action}</p>
                  <p className="mt-1 text-[0.86rem] text-a1-ash print:text-black">
                    {r.title}
                    {r.savingsMs ? ` · could save about ${(r.savingsMs / 1000).toFixed(1)} s` : ""}
                  </p>
                </div>
                <p className="flex flex-wrap items-start gap-1.5 md:justify-end">
                  <span className={`rounded-full px-2.5 py-1 text-[0.72rem] font-bold ${r.priority === "High" ? "bg-[#FF4E42]/15 text-[#ff8f86]" : "bg-[#FFA400]/15 text-[#ffc966]"} print:border print:border-black/30 print:text-black`}>
                    {r.priority} priority
                  </span>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.72rem] font-semibold text-a1-ash print:border-black/30 print:text-black">{r.categoryLabel}</span>
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-a1-ash print:text-black">No failing checks were found in this audit.</p>
        )}
      </section>

      <section className={card}>
        <h3 className="text-[1.5rem] font-extrabold">Issues found on {current.strategy}</h3>
        <div className="mt-5 space-y-3">
          {CATEGORIES.map((c) => {
            const list = current.issues.filter((i) => i.category === c);
            return (
              <details key={c} className="group rounded-2xl border border-white/10 bg-white/[0.03] print:border-black/20" open={list.length > 0 && c === "performance"}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold [&::-webkit-details-marker]:hidden">
                  <span>{CATEGORY_LABELS[c]}</span>
                  <span className="flex items-center gap-3 text-[0.86rem] font-semibold text-a1-ash print:text-black">
                    {list.length ? `${list.length} to fix` : "No issues found"}
                    <span className="text-lg leading-none transition-transform group-open:rotate-45 print:hidden" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                {list.length ? (
                  <ul className="divide-y divide-white/10 border-t border-white/10 px-5 print:divide-black/20 print:border-black/20">
                    {list.map((i) => (
                      <li key={i.id} className="py-4">
                        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-semibold">
                          {i.title}
                          {i.displayValue ? <span className="text-[0.84rem] font-medium text-a1-coral">{i.displayValue}</span> : null}
                        </p>
                        {i.description ? <p className="mt-1.5 text-[0.88rem] text-a1-ash print:text-black">{i.description}</p> : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </details>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-a1-gradient p-6 md:p-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-[34rem]">
            <h3 className="text-[1.7rem] font-extrabold leading-tight">Want these fixed for you?</h3>
            <p className="mt-2 text-white/90">Our team can review the full site by hand, including search visibility and tracking, and send a prioritised plan.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href={contact} className="btn-light">
              Request professional audit <ArrowRight />
            </Link>
            <Link href="/contact?topic=consultation" className="btn text-white ring-1 ring-inset ring-white/60 hover:bg-white/15">
              Book consultation
            </Link>
          </div>
        </div>
      </section>

      <p className="text-[0.8rem] text-a1-stone">
        Scores are produced by Google PageSpeed Insights at the time of the test and can vary between runs. They are guidance, not a guarantee of rankings or traffic.
      </p>
    </div>
  );
}
