"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { SERVICES, TOOLS } from "@/lib/site";
import { ArrowUpRight, ServiceIcon } from "./Icons";
import { Reveal } from "./Reveal";

/** Tilts the card toward the cursor and moves the coral spotlight with it. */
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

/** Compact services grid: ten small 3D tilt cards, five across on desktop and two across on phones. */
export function Services() {
  return (
    <section id="services" className="relative bg-a1-ink py-16 md:py-20">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <Reveal>
            <p className="eyebrow text-a1-coral">What we do</p>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold">
              Complete digital marketing, <span className="grad-text">one team.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" className="inline-flex items-center gap-2 text-[0.92rem] font-bold text-white hover:text-a1-coral">
              Explore all services <ArrowUpRight />
            </Link>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 5) * 0.05} y={18} className="[perspective:900px]">
              <Link
                href={`/services#${s.slug}`}
                onMouseMove={tilt}
                onMouseLeave={reset}
                className="service-tilt group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-a1-coal p-4 hover:border-white/25 sm:p-5"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(240,70,81,0.26), transparent 62%)" }}
                  aria-hidden
                />
                <span className="relative flex items-center justify-between [transform:translateZ(34px)]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-a1-gradient text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-a1-coral opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
                <span className="relative mt-4 block [transform:translateZ(20px)]">
                  <span className="block text-[0.98rem] font-bold leading-[1.2] sm:text-[1.05rem]">{s.menuTitle}</span>
                  <span className="mt-1.5 hidden text-[0.84rem] leading-snug text-a1-ash sm:block">{s.menuLine}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-7 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 text-a1-stone">Powered by</span>
          {TOOLS.map((t) => (
            <span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[0.8rem] font-semibold text-a1-ash">
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
