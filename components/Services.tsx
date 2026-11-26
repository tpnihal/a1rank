"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { SERVICES, TOOLS } from "@/lib/site";
import { ArrowUpRight, ServiceIcon } from "./Icons";
import { Reveal } from "./Reveal";

/** Tilts the card toward the cursor and moves the spotlight with it. */
function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 16}deg`);
}

function reset(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

/** Which cards are filled in by default; the rest are white and fill with the gradient on hover. */
const FILLED: Record<string, "gradient" | "dark"> = {
  "website-design-development": "gradient",
  "ai-agents-automation": "dark",
};

/** Compact services grid on a light panel: ten 3D tilt cards, five across on desktop and two across on phones. */
export function Services() {
  return (
    <section id="services" className="bg-a1-ink px-2 py-3 md:px-4">
      <div className="relative overflow-clip rounded-[2rem] bg-a1-paper py-14 text-a1-ink md:rounded-[2.75rem] md:py-20">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.16),transparent_65%)]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-52 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(239,82,69,0.18),transparent_65%)]" aria-hidden />
        <div className="wrap relative">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <Reveal>
              <p className="eyebrow text-a1-pink">What we do</p>
              <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold">
                Complete digital marketing, <span className="grad-text">one team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-a1-ink px-5 py-2.5 text-[0.9rem] font-bold text-white transition hover:-translate-y-0.5 hover:bg-a1-pink">
                Explore all services <ArrowUpRight />
              </Link>
            </Reveal>
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-5">
            {SERVICES.map((s, i) => {
              const fill = FILLED[s.slug];
              const light = !fill;
              return (
                <Reveal as="li" key={s.slug} delay={(i % 5) * 0.05} y={18} className="[perspective:900px]">
                  <Link
                    href={`/services#${s.slug}`}
                    onMouseMove={tilt}
                    onMouseLeave={reset}
                    className={`service-tilt group relative flex h-full min-h-[9.25rem] flex-col overflow-hidden rounded-3xl p-4 sm:min-h-[13rem] sm:p-5 ${
                      fill === "gradient"
                        ? "bg-a1-gradient text-white shadow-glow-lg"
                        : fill === "dark"
                          ? "bg-a1-ink text-white shadow-[0_24px_50px_-28px_rgba(12,10,11,0.8)]"
                          : "bg-white shadow-[0_22px_44px_-30px_rgba(236,37,99,0.55)] ring-1 ring-black/[0.06] hover:text-white hover:shadow-glow-lg"
                    }`}
                  >
                    {light ? (
                      <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-a1-gradient transition-transform duration-300 ease-out group-hover:scale-y-100" aria-hidden />
                    ) : (
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.22), transparent 62%)" }}
                        aria-hidden
                      />
                    )}
                    <span className="relative flex items-start justify-between [transform:translateZ(34px)]">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-2xl transition duration-300 group-hover:scale-110 ${
                          fill === "gradient"
                            ? "bg-white text-a1-pink"
                            : fill === "dark"
                              ? "bg-a1-gradient text-white shadow-glow"
                              : "bg-a1-blush text-a1-pink group-hover:bg-white"
                        }`}
                      >
                        <ServiceIcon name={s.icon} />
                      </span>
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full transition duration-300 group-hover:rotate-45 ${
                          light ? "bg-a1-ink/[0.05] text-a1-ink group-hover:bg-white/20 group-hover:text-white" : "bg-white/15 text-white"
                        }`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                    <span className="relative mt-auto block pt-5 [transform:translateZ(20px)]">
                      <span className={`font-mono text-[0.68rem] tracking-[0.14em] transition-colors duration-300 ${light ? "text-a1-pink group-hover:text-white/85" : "text-white/75"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block text-[0.98rem] font-bold leading-[1.2] sm:text-[1.08rem]">{s.menuTitle}</span>
                      <span className={`mt-1.5 hidden text-[0.84rem] leading-snug transition-colors duration-300 sm:block ${light ? "text-a1-stone group-hover:text-white/90" : "text-white/85"}`}>
                        {s.menuLine}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-8 flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-a1-stone">Powered by</span>
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1 text-[0.8rem] font-semibold text-a1-ink ring-1 ring-black/[0.07]">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
