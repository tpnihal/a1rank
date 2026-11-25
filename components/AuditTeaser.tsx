"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AUDIT_STAGES } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";
import { ArrowRight, Check } from "./Icons";
import { Reveal } from "./Reveal";

const CHECKS = ["Performance", "SEO", "Accessibility", "Best Practices"];

/** Homepage entry point to the free Website Audit tool. */
export function AuditTeaser() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = normaliseUrl(url);
    if (!clean) {
      setError("Enter a valid website address, for example yourbusiness.ae");
      return;
    }
    setError("");
    router.push(`/website-audit?url=${encodeURIComponent(clean)}`);
  }

  return (
    <section id="audit" className="section grain relative overflow-hidden bg-a1-ink">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_50%,#000,transparent_72%)]" aria-hidden />
      <div className="wrap relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-a1-coal p-6 md:p-12">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.4),transparent_65%)]" aria-hidden />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="pill eyebrow text-a1-ash">
                <span className="h-1.5 w-1.5 rounded-full bg-a1-coral" /> Free · No account · No password
              </p>
              <h2 className="section-title mt-5">
                How does your website <span className="grad-text">really score?</span>
              </h2>
              <p className="mt-5 max-w-[32rem] text-a1-ash">
                Run a free audit powered by Google PageSpeed Insights. You get real scores for mobile and desktop, the issues
                holding you back and what to fix first.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-8 max-w-[34rem]">
                <label htmlFor="audit-url" className="sr-only">
                  Website address
                </label>
                <div className="flex flex-col gap-2.5 rounded-[1.4rem] border border-white/15 bg-a1-ink p-2 focus-within:border-a1-pink sm:flex-row sm:rounded-full">
                  <input
                    id="audit-url"
                    name="url"
                    inputMode="url"
                    autoComplete="url"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="yourbusiness.ae"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "audit-url-error" : undefined}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white placeholder:text-a1-stone focus:outline-none"
                  />
                  <button type="submit" className="btn-primary shrink-0">
                    Run Free Audit <ArrowRight />
                  </button>
                </div>
                {error ? (
                  <p id="audit-url-error" role="alert" className="mt-3 text-[0.88rem] text-[#ff9aa5]">
                    {error}
                  </p>
                ) : null}
              </form>

              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.88rem] text-a1-ash">
                {CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-a1-coral" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/12 bg-a1-ink p-6 shadow-glow-lg" aria-label="What the audit checks, step by step">
                <p className="eyebrow text-a1-stone">What happens when you run it</p>
                <ol className="mt-5 space-y-3.5">
                  {AUDIT_STAGES.map((s, i) => (
                    <li key={s} className="flex items-center gap-3.5">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-[0.7rem] tabular-nums text-a1-ash">
                        {i + 1}
                      </span>
                      <span className="text-[0.95rem]">{s}</span>
                      <span className="ml-auto h-1 w-16 overflow-hidden rounded-full bg-white/10">
                        <span className="block h-full animate-pulsebar rounded-full bg-a1-gradient" style={{ animationDelay: `${i * 0.25}s` }} />
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
