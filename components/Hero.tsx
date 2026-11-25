"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "./Icons";
import { LogoMark } from "./Logo";

const StaticMark = () => (
  <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center lg:inset-y-0 lg:left-auto lg:right-[8%] lg:top-0 lg:items-center" aria-hidden>
    <LogoMark className="h-52 w-auto animate-floaty drop-shadow-[0_30px_60px_rgba(236,37,99,0.45)] lg:h-[24rem]" />
  </div>
);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => <StaticMark /> });

/**
 * The 3D scene is the heaviest thing on the site, so it loads only on larger, capable devices
 * and only once the page is idle. Phones and low-power devices keep the light static mark.
 */
function HeroVisual() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const capable =
      window.matchMedia("(min-width: 1024px)").matches &&
      (nav.hardwareConcurrency ?? 8) >= 4 &&
      (nav.deviceMemory ?? 8) >= 4 &&
      !nav.connection?.saveData;
    if (!capable) return;
    let idle = 0;
    let usedIdle = false;
    const start = () => {
      usedIdle = typeof window.requestIdleCallback === "function";
      idle = usedIdle ? window.requestIdleCallback(() => setReady(true), { timeout: 2500 }) : window.setTimeout(() => setReady(true), 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (usedIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return ready ? <HeroScene fallback={<StaticMark />} /> : <StaticMark />;
}

const FACTS = [
  { k: "10", v: "services under one roof" },
  { k: "4", v: "growth packages, from AED 999" },
  { k: "AI", v: "powered content and automation" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: reduce ? false : ({ y: "110%" } as const),
    animate: { y: 0 },
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] as const },
  });
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <section className="grain relative isolate overflow-hidden bg-a1-ink">
      {/* Atmosphere */}
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_70%)]" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.34),rgba(239,82,69,0.1)_45%,transparent_70%)]" aria-hidden />
      <div className="absolute -bottom-52 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(239,82,69,0.18),transparent_65%)]" aria-hidden />

      <HeroVisual />

      <div className="wrap relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-[23rem] lg:min-h-[max(100svh,46rem)] lg:justify-center lg:pb-36 lg:pt-36">
        <div className="max-w-[44rem]">
          <motion.p {...fade(0.05)} className="pill eyebrow !text-[0.62rem] text-a1-ash sm:!text-[0.72rem]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-a1-coral" />
            Digital marketing agency · Dubai, UAE
          </motion.p>

          <h1 className="mt-6 text-[clamp(2.9rem,7.4vw,6.4rem)] font-extrabold leading-[0.95] sm:whitespace-nowrap">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span {...line(0)} className="block">
                Grow smarter.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span {...line(1)} className="grad-text block">
                Rank higher.
              </motion.span>
            </span>
          </h1>

          <motion.p {...fade(0.55)} className="mt-6 max-w-[34rem] text-[1.06rem] text-a1-ash md:text-[1.18rem]">
            Websites, social media, SEO, paid ads, creative production and AI automation. One Dubai team, measured by the
            leads and sales your business gets.
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
            <Link href="/website-audit" className="btn-primary">
              Run a Free Website Audit <ArrowRight />
            </Link>
            <Link href="/#works" className="btn-ghost">
              View Our Works
            </Link>
          </motion.div>
        </div>

        <motion.dl {...fade(0.9)} className="mt-14 grid max-w-[46rem] grid-cols-1 gap-x-8 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-3 lg:mt-20">
          {FACTS.map((f) => (
            <div key={f.v} className="flex items-baseline gap-3 sm:block">
              <dt className="font-display text-3xl font-extrabold tabular-nums text-white md:text-4xl">{f.k}</dt>
              <dd className="text-[0.86rem] text-a1-ash sm:mt-1">{f.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-3 lg:flex" aria-hidden>
        <span className="eyebrow text-a1-stone">Scroll</span>
        <span className="h-10 w-px animate-pulsebar bg-gradient-to-b from-a1-coral to-transparent" />
      </div>
    </section>
  );
}
