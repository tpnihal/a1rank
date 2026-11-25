"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import type { AuditError, AuditResult, Strategy } from "@/lib/audit/types";
import { AUDIT_STAGES } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";
import { ArrowRight, Check } from "../Icons";
import { AuditReport } from "./AuditReport";

type Outcome = { ok: true; result: AuditResult } | { ok: false; error: string };
type Phase =
  | { name: "idle" }
  | { name: "running"; url: string }
  | { name: "done"; results: Partial<Record<Strategy, AuditResult>>; notice?: string }
  | { name: "error"; message: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function audit(url: string, strategy: Strategy, signal: AbortSignal): Promise<Outcome> {
  try {
    const res = await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, strategy }),
      signal,
    });
    const body = (await res.json().catch(() => null)) as AuditResult | AuditError | null;
    if (!res.ok || !body || "error" in body) {
      return { ok: false, error: body && "error" in body ? body.error : "The audit could not be completed. Please try again." };
    }
    return { ok: true, result: body };
  } catch {
    return { ok: false, error: signal.aborted ? "The audit was cancelled." : "We could not reach the audit service. Check your connection and try again." };
  }
}

/** Free public audit: URL form, live progress, then a report built only from real PageSpeed Insights data. */
export function AuditTool({ initialUrl = "" }: { initialUrl?: string }) {
  const [value, setValue] = useState(initialUrl);
  const [fieldError, setFieldError] = useState("");
  const [phase, setPhase] = useState<Phase>({ name: "idle" });
  const [stage, setStage] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const autoRan = useRef(false);
  const top = useRef<HTMLDivElement>(null);

  const run = useCallback(async (raw: string) => {
    const url = normaliseUrl(raw);
    if (!url) {
      setFieldError("Enter a valid website address, for example yourbusiness.ae");
      return;
    }
    setFieldError("");
    setSummary(null);
    controller.current?.abort();
    const ac = new AbortController();
    controller.current = ac;
    setStage(0);
    setPhase({ name: "running", url });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Both audits run at the same time. The stages below follow the real requests.
    const mobile = audit(url, "mobile", ac.signal);
    const desktop = audit(url, "desktop", ac.signal);
    await wait(900);
    if (ac.signal.aborted) return;
    setStage(1);
    const m = await mobile;
    if (ac.signal.aborted) return;
    setStage(2);
    const d = await desktop;
    if (ac.signal.aborted) return;

    if (!m.ok && !d.ok) {
      setPhase({ name: "error", message: m.error });
      return;
    }
    // Scores are in. The last three stages cover reading the SEO and accessibility results and ranking the fixes.
    for (const s of [3, 4, 5]) {
      setStage(s);
      await wait(550);
      if (ac.signal.aborted) return;
    }
    const results: Partial<Record<Strategy, AuditResult>> = {};
    if (m.ok) results.mobile = m.result;
    if (d.ok) results.desktop = d.result;
    const notice = !m.ok ? `The mobile audit could not be completed (${m.error}) Showing desktop results only.` : !d.ok ? `The desktop audit could not be completed (${d.error}) Showing mobile results only.` : undefined;
    setPhase({ name: "done", results, notice });

    // Optional plain-English summary. The report is complete without it.
    try {
      const res = await fetch("/api/audit/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, runs: Object.values(results).map((r) => ({ strategy: r.strategy, scores: r.scores, issues: r.issues.map((i) => i.id) })) }),
        signal: ac.signal,
      });
      const body = (await res.json().catch(() => null)) as { summary?: string | null } | null;
      if (!ac.signal.aborted && body?.summary) setSummary(body.summary);
    } catch {
      /* summary is optional */
    }
  }, []);

  useEffect(() => {
    if (initialUrl && !autoRan.current) {
      autoRan.current = true;
      void run(initialUrl);
    }
    return () => controller.current?.abort();
  }, [initialUrl, run]);

  const reset = () => {
    controller.current?.abort();
    setPhase({ name: "idle" });
    setSummary(null);
    setValue("");
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void run(value);
  };

  const form = (
    <form onSubmit={onSubmit} noValidate className="print:hidden">
      <label htmlFor="audit-url" className="sr-only">
        Website address
      </label>
      <div className="flex flex-col gap-2 rounded-[1.75rem] border border-white/15 bg-white/[0.05] p-2 focus-within:border-a1-pink sm:flex-row sm:rounded-full">
        <input
          id="audit-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="yourbusiness.ae"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby="audit-url-help"
          className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-[1.05rem] text-white placeholder:text-a1-stone focus:outline-none"
        />
        <button type="submit" className="btn-primary !px-7 !py-4">
          Run Free Audit <ArrowRight />
        </button>
      </div>
      <p id="audit-url-help" role={fieldError ? "alert" : undefined} className={`mt-3 text-[0.86rem] ${fieldError ? "text-[#ff9aa5]" : "text-a1-stone"}`}>
        {fieldError || "Free. No login or signup. Takes about a minute."}
      </p>
    </form>
  );

  return (
    <div ref={top} className="scroll-mt-28">
      {phase.name === "idle" ? form : null}

      {phase.name === "running" ? (
        <div role="status" aria-live="polite" className="rounded-3xl border border-white/12 bg-a1-coal p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-tight">Analysing Your Website...</h2>
              <p className="mt-2 break-all text-a1-ash">{phase.url}</p>
            </div>
            <span className="relative grid h-14 w-14 place-items-center" aria-hidden>
              <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-white/10 border-t-a1-coral motion-reduce:animate-none" />
              <span className="font-mono text-[0.8rem] text-a1-ash">
                {stage + 1}/{AUDIT_STAGES.length}
              </span>
            </span>
          </div>
          <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div className="h-full rounded-full bg-a1-gradient transition-[width] duration-700 ease-out" style={{ width: `${((stage + 0.5) / AUDIT_STAGES.length) * 100}%` }} />
          </div>
          <ol className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {AUDIT_STAGES.map((label, i) => {
              const state = i < stage ? "done" : i === stage ? "active" : "todo";
              return (
                <li
                  key={label}
                  aria-current={state === "active" ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-[0.95rem] font-semibold transition ${
                    state === "active" ? "border-a1-coral/60 bg-a1-coral/10 text-white" : state === "done" ? "border-white/10 text-a1-ash" : "border-white/10 text-a1-stone"
                  }`}
                >
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.7rem] ${state === "done" ? "bg-a1-gradient text-white" : state === "active" ? "bg-white/10" : "bg-white/5"}`}>
                    {state === "done" ? <Check className="h-3.5 w-3.5" /> : state === "active" ? <span className="h-2 w-2 animate-pulse rounded-full bg-a1-coral motion-reduce:animate-none" /> : i + 1}
                  </span>
                  {label}
                  <span className="sr-only">{state === "done" ? " (done)" : state === "active" ? " (in progress)" : ""}</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.86rem] text-a1-stone">Google is testing the live site on mobile and desktop. This usually takes 30 to 60 seconds.</p>
            <button type="button" onClick={reset} className="text-[0.88rem] font-bold text-a1-ash underline-offset-4 hover:text-white hover:underline">
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {phase.name === "error" ? (
        <div className="space-y-6">
          <div role="alert" className="rounded-3xl border border-[#FF4E42]/40 bg-[#FF4E42]/10 p-6 md:p-8">
            <h2 className="text-[1.5rem] font-extrabold">The audit did not complete</h2>
            <p className="mt-2 text-a1-ash">{phase.message}</p>
            <p className="mt-2 text-[0.88rem] text-a1-stone">No scores are shown because no audit was completed.</p>
          </div>
          {form}
        </div>
      ) : null}

      {phase.name === "done" ? <AuditReport results={phase.results} notice={phase.notice} summary={summary} onReset={reset} /> : null}
    </div>
  );
}
