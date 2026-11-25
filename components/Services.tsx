"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { SERVICES, TOOLS } from "@/lib/site";
import { ArrowUpRight, ServiceIcon } from "./Icons";
import { Reveal } from "./Reveal";

const SPAN: Record<string, string> = {
  wide: "sm:col-span-2",
  base: "",
};

/** Moves a soft coral spotlight to the cursor position inside the hovered card. */
function track(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Services() {
  return (
    <section id="services" className="section relative bg-a1-ink">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-coral">What we do</p>
            <h2 className="section-title mt-4 max-w-[13ch]">
              Complete digital marketing, <span className="grad-text">one team.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[26rem]">
            <p className="text-a1-ash">
              Strategy, creative, tech and media buying work side by side, so your website, socials, search and ads all push in
              the same direction.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-flow-dense grid-cols-1 gap-3.5 sm:auto-rows-[minmax(13.5rem,auto)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06} className={SPAN[s.span]}>
              <article
                onMouseMove={track}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-a1-coal p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(240,70,81,0.22), transparent 60%)" }}
                  aria-hidden
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-a1-gradient text-white shadow-glow">
                    <ServiceIcon name={s.icon} />
                  </span>
                  <span className="eyebrow text-a1-stone transition group-hover:text-a1-coral">{s.label}</span>
                </div>
                <div className="relative mt-auto pt-6 sm:pt-10">
                  <h3 className={`font-bold leading-[1.12] ${s.span === "base" ? "text-[1.22rem]" : "text-[1.5rem] md:text-[1.7rem]"}`}>{s.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] text-a1-ash">{s.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-2 text-a1-stone">Powered by</span>
          {TOOLS.map((t) => (
            <span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[0.84rem] font-semibold text-a1-ash">
              {t}
            </span>
          ))}
          <Link href="/contact" className="ml-auto inline-flex items-center gap-2 text-[0.92rem] font-bold text-white hover:text-a1-coral">
            Tell us what you need <ArrowUpRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
