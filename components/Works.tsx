"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { WORKS, WORK_CATEGORIES, type Work } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

/** Large photo card: badge on the image, sector line, title and tag pills below. */
function WorkCard({ work, sizes, dark = true }: { work: Work; sizes: string; dark?: boolean }) {
  return (
    <article className="group h-full">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ${dark ? "bg-a1-smoke ring-1 ring-white/10" : "bg-a1-ink"}`}>
        <Image
          src={work.image}
          alt={`${work.title}, ${work.sector}`}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        <span className="eyebrow absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 !text-[0.62rem] text-white backdrop-blur-md">
          <i className="h-1.5 w-1.5 rounded-full bg-a1-coral" aria-hidden />
          {work.category}
        </span>
        <p className="absolute inset-x-5 bottom-5 translate-y-3 text-[0.92rem] font-medium leading-snug text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {work.summary}
        </p>
      </div>
      <div className="px-1.5 pt-5">
        <p className={`eyebrow !text-[0.66rem] ${dark ? "text-a1-ash" : "text-a1-stone"}`}>{work.sector}</p>
        <h3 className="mt-2 text-[1.45rem] font-bold leading-[1.15]">{work.title}</h3>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {work.tags.map((t) => (
            <li
              key={t}
              className={`rounded-full border px-3 py-1 text-[0.76rem] font-semibold ${dark ? "border-white/15 text-a1-ash" : "border-black/10 text-a1-stone"}`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous projects" : "Next projects"}
      className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition hover:border-transparent hover:bg-a1-gradient disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-none"
    >
      <ArrowRight className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}

/** Homepage "Recent work": dark band with a horizontal, snap-scrolling carousel. */
export function Works() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + 24;
    el.scrollBy({ left: dir * step * (window.innerWidth >= 1024 ? 2 : 1), behavior: "smooth" });
  };

  return (
    <section id="works" className="section grain relative isolate overflow-hidden bg-a1-ink">
      <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.2),transparent_68%)]" aria-hidden />
      <div className="wrap relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 md:mb-14">
          <Reveal>
            <p className="eyebrow text-a1-coral">Recent work</p>
            <h2 className="section-title mt-4 max-w-[13ch]">
              From idea to live. <span className="grad-text">Work that performs.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center gap-3">
            <Link href="/works" className="mr-2 inline-flex items-center gap-2 font-bold text-white hover:text-a1-coral">
              See all <ArrowUpRight />
            </Link>
            <ArrowButton dir="prev" disabled={edge.start} onClick={() => move(-1)} />
            <ArrowButton dir="next" disabled={edge.end} onClick={() => move(1)} />
          </Reveal>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={sync}
        tabIndex={0}
        aria-label="Recent work"
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: "max(1.25rem, calc((100vw - 1240px) / 2 + 2rem))",
          scrollPaddingInline: "max(1.25rem, calc((100vw - 1240px) / 2 + 2rem))",
        }}
      >
        {WORKS.map((w) => (
          <li key={w.title} className="w-[82vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30rem]">
            <WorkCard work={w} sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 82vw" />
          </li>
        ))}
        <li className="flex w-[70vw] shrink-0 snap-start sm:w-[22rem]">
          <Link
            href="/works"
            className="group flex aspect-[4/3] w-full flex-col justify-between rounded-[1.75rem] border border-white/15 bg-white/[0.04] p-7 transition hover:border-transparent hover:bg-a1-gradient"
          >
            <span className="eyebrow text-a1-ash group-hover:text-white">More projects</span>
            <span className="flex items-end justify-between gap-4 font-display text-[2rem] font-extrabold leading-none">
              See all works
              <ArrowUpRight className="h-8 w-8" />
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

/** /works: filterable grid of the same cards on a light background. */
export function WorksGrid() {
  const [cat, setCat] = useState<(typeof WORK_CATEGORIES)[number]>("All");
  const list = WORKS.filter((w) => cat === "All" || w.category === cat);

  return (
    <section className="bg-a1-paper py-14 text-a1-ink md:py-20">
      <div className="wrap">
        <h2 className="sr-only">Projects</h2>
        <div className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter works by type">
          {WORK_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.88rem] font-bold transition ${
                cat === c ? "border-a1-ink bg-a1-ink text-white" : "border-black/10 bg-white text-a1-ink hover:border-a1-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((w) => (
              <motion.li
                key={w.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
              >
                <WorkCard work={w} dark={false} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
