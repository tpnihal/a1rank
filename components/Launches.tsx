"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { LAUNCHES, type Launch } from "@/lib/site";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

function LaunchCard({ launch, index, total, progress }: { launch: Launch; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Earlier cards shrink and dim slightly as later ones slide over them.
  const depth = total - 1 - index;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - depth * 0.045]);
  const dim = useTransform(progress, [index / total, 1], [0, depth * 0.22]);

  const frame = (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 bg-a1-coal px-4 py-2.5 sm:px-5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </span>
        <span className="relative min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.07] px-4 py-1 font-mono text-[0.72rem] text-a1-ash">
          <span className="block truncate">{launch.display}</span>
          <motion.i
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-a1-gradient"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            aria-hidden
          />
        </span>
        <span className="eyebrow flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 !text-[0.6rem] text-white">
          <i className={`h-1.5 w-1.5 rounded-full ${launch.url ? "bg-emerald-400" : "bg-a1-coral"}`} aria-hidden />
          {launch.url ? "Live" : "Sample"}
        </span>
      </div>
      <div className="relative aspect-[16/9] w-full sm:aspect-[12/5]">
        <Image src={launch.image} alt={`Homepage of ${launch.title}`} fill sizes="(min-width: 1400px) 1320px, 94vw" className="object-cover object-top" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/10 bg-a1-coal px-5 py-4 sm:px-7 sm:py-5">
        <div className="min-w-0">
          <p className="eyebrow !text-[0.62rem] text-a1-ash">{launch.sector}</p>
          <h3 className="mt-1.5 text-[clamp(1.15rem,2.2vw,1.6rem)] font-extrabold leading-[1.1] text-white">{launch.title}</h3>
          <p className="mt-1.5 hidden max-w-[44rem] text-[0.9rem] text-a1-ash md:block">{launch.summary}</p>
        </div>
        {launch.url ? (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.86rem] font-bold text-a1-ink transition group-hover:bg-a1-coral group-hover:text-white">
            Visit site <ArrowUpRight />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <li className="sticky mb-8 last:mb-0 sm:mb-14" style={{ top: `calc(5.75rem + ${index * 1.1}rem)` }}>
      <div className="[perspective:1600px]">
        <motion.article
          style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
          initial={reduce ? false : { rotateX: 32, y: 70, opacity: 0 }}
          whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-a1-smoke shadow-[0_-24px_70px_-30px_rgba(0,0,0,0.9)] sm:rounded-[2rem]"
        >
          {launch.url ? (
            <a href={launch.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${launch.title}: visit the live site (opens in a new tab)`}>
              {frame}
            </a>
          ) : (
            frame
          )}
          <motion.span className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: reduce ? 0 : dim }} aria-hidden />
        </motion.article>
      </div>
    </li>
  );
}

/** Latest finished websites as browser windows that tilt open, then stack over each other while scrolling. */
export function Launches() {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="latest-websites" className="relative overflow-x-clip bg-a1-ink py-16 md:py-24">
      <div className="wrap">
        <Reveal className="mx-auto mb-10 max-w-[40rem] text-center md:mb-14">
          <p className="eyebrow text-a1-coral">Fresh launches</p>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-extrabold">
            Our latest <span className="grad-text">websites.</span>
          </h2>
          <p className="mt-4 text-a1-ash">Keep scrolling. Each site opens and stacks over the last.</p>
        </Reveal>
        <ul ref={ref} className="relative">
          {LAUNCHES.map((l, i) => (
            <LaunchCard key={l.title} launch={l} index={i} total={LAUNCHES.length} progress={scrollYProgress} />
          ))}
        </ul>
      </div>
    </section>
  );
}
