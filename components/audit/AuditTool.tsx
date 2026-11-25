"use client";

import Link from "next/link";
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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Lead = { email: string; phone: string; url: string; hp: string };

/** Tells A1 Rank who ran the audit, with the scores when there are any. Nothing in the audit waits on this. */
function sendLead(lead: Lead, results?: Partial<Record<Strategy, AuditResult>>) {
  const scores = results ? Object.fromEntries(Object.entries(results).map(([k, r]) => [k, r.scores])) : undefined;
  void fetch("/api/audit/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, scores }),
    keepalive: true,
  }).catch(() => undefined);
}

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

/** Free public audit: website and email form, live progress, then a report built only from real PageSpeed Insights data. */
export function AuditTool({ initialUrl = "" }: { initialUrl?: string }) {
  const [value, setValue] = useState(initialUrl);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  /** The lead for the audit in progress. It is sent once: with scores when the audit ends, or as it is if the visitor leaves first. */
  const pending = useRef<Lead | null>(null);
  const flushLead = useCallback((results?: Partial<Record<Strategy, AuditResult>>) => {
    if (!pending.current) return;
    sendLead(pending.current, results);
    pending.current = null;
  }, []);
  const [phase, setPhase] = useState<Phase>({ name: "idle" });
  const [stage, setStage] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const run = useCallback(async (raw: string, rawEmail: string, rawPhone: string, trap: string) => {
    const url = normaliseUrl(raw);
    const mail = rawEmail.trim();
    const badEmail = !EMAIL_RE.test(mail);
    setFieldError(url ? "" : "Enter a valid website address, for example yourbusiness.ae");
    setEmailError(badEmail ? "Enter a valid email address, for example you@yourbusiness.ae" : "");
    if (!url) {
      document.getElementById("audit-url")?.focus();
      return;
    }
    if (badEmail) {
      emailRef.current?.focus();
      return;
    }
    flushLead();
    pending.current = { email: mail, phone: rawPhone.trim(), url, hp: trap };
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
      flushLead();
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
    flushLead(results);
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
  }, [flushLead]);

  useEffect(() => {
    // Arriving from the homepage with a website already filled in: only the email is left to type.
    if (initialUrl) emailRef.current?.focus({ preventScroll: true });
    const onLeave = () => flushLead();
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      controller.current?.abort();
    };
  }, [initialUrl, flushLead]);

  const reset = () => {
    flushLead();
    controller.current?.abort();
    setPhase({ name: "idle" });
    setSummary(null);
    setValue("");
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void run(value, email, phone, hp);
  };

  const form = (
    <form onSubmit={onSubmit} noValidate className="print:hidden">
      <div className="grid gap-3 rounded-[1.75rem] border border-white/12 bg-a1-coal/70 p-4 text-left sm:grid-cols-2 sm:p-5">
        <div className="sm:col-span-2">
          <label htmlFor="audit-url" className="mb-1.5 block text-[0.8rem] font-semibold text-a1-ash">
            Website address
          </label>
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
            aria-describedby="audit-help"
            className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-[1.02rem] text-white placeholder:text-a1-stone transition focus:border-a1-pink focus:outline-none focus:ring-4 focus:ring-a1-pink/25"
          />
        </div>
        <div>
          <label htmlFor="audit-email" className="mb-1.5 block text-[0.8rem] font-semibold text-a1-ash">
            Your email
          </label>
          <input
            ref={emailRef}
            id="audit-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@yourbusiness.ae"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={emailError ? true : undefined}
            aria-describedby="audit-help"
            className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-[1.02rem] text-white placeholder:text-a1-stone transition focus:border-a1-pink focus:outline-none focus:ring-4 focus:ring-a1-pink/25"
          />
        </div>
        <div>
          <label htmlFor="audit-phone" className="mb-1.5 block text-[0.8rem] font-semibold text-a1-ash">
            WhatsApp number <span className="font-normal text-a1-stone">(optional)</span>
          </label>
          <input
            id="audit-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+971"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-[1.02rem] text-white placeholder:text-a1-stone transition focus:border-a1-pink focus:outline-none focus:ring-4 focus:ring-a1-pink/25"
          />
        </div>
        <input type="text" name="company_site" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden />
        <button type="submit" className="btn-primary justify-center !py-4 sm:col-span-2">
          Run Free Audit <ArrowRight />
        </button>
      </div>
      <p id="audit-help" role={fieldError || emailError ? "alert" : undefined} className={`mt-3 text-[0.86rem] ${fieldError || emailError ? "text-[#ff9aa5]" : "text-a1-stone"}`}>
        {fieldError || emailError || (
          <>
            Free. No account or password. By running the audit you agree that A1 Rank may contact you by email or WhatsApp about your results and our services. See our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>
            .
          </>
        )}
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
