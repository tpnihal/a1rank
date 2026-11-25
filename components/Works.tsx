"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { WORKS, WORK_CATEGORIES, type Work } from "@/lib/site";
import { Reveal } from "./Reveal";

function Visual({ kind }: { kind: Work["visual"] }) {
  switch (kind) {
    case "browser":
      return (
        <div className="absolute inset-x-[9%] bottom-0 top-[14%] rounded-t-xl bg-white shadow-2xl transition duration-500 group-hover:-translate-y-2">
          <div className="flex h-5 items-center gap-1.5 border-b border-black/5 px-3">
            <i className="h-1.5 w-1.5 rounded-full bg-a1-coral" />
            <i className="h-1.5 w-1.5 rounded-full bg-a1-blush" />
            <i className="h-1.5 w-1.5 rounded-full bg-black/10" />
          </div>
          <div className="space-y-2 p-3.5">
            <div className="h-16 rounded-lg bg-a1-gradient" />
            <div className="h-2 w-3/4 rounded bg-black/10" />
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="h-12 rounded-md bg-a1-blush" />
              <div className="h-12 rounded-md bg-black/5" />
              <div className="h-12 rounded-md bg-black/5" />
            </div>
          </div>
        </div>
      );
    case "phones":
      return (
        <div className="absolute inset-0 flex items-end justify-center gap-3">
          {["h-[68%] from-a1-flame to-[#7a0f30]", "h-[86%] from-white to-a1-blush", "h-[74%] from-a1-pink to-[#2a0b16]"].map((c, i) => (
            <div
              key={i}
              className={`w-[23%] rounded-t-2xl border-[3px] border-b-0 border-[#2a2326] bg-gradient-to-b transition duration-500 group-hover:-translate-y-2 ${c}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mx-auto mt-2 h-1 w-1/3 rounded-full bg-black/30" />
            </div>
          ))}
        </div>
      );
    case "chart":
      return (
        <div className="absolute inset-x-[10%] bottom-[14%] top-[18%] flex items-end gap-[5%]">
          {[22, 30, 38, 52, 74, 96].map((h, i) => (
            <div
              key={h}
              className={`flex-1 origin-bottom rounded-t-md transition duration-500 group-hover:scale-y-105 ${i > 3 ? "bg-a1-gradient" : "bg-white/15"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );
    case "flow":
      return (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 300 150" className="w-[84%]" fill="none">
            <defs>
              <linearGradient id="flow-g" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#EF5245" />
                <stop offset="1" stopColor="#EC2563" />
              </linearGradient>
            </defs>
            <g stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="4 5">
              <path d="M70 75h50M180 75h50M150 45V22M150 105v23" />
            </g>
            <g fill="#1d1719" stroke="rgba(255,255,255,.25)">
              <rect x="10" y="55" width="60" height="40" rx="10" />
              <rect x="230" y="55" width="60" height="40" rx="10" />
              <rect x="118" y="0" width="64" height="22" rx="8" />
              <rect x="118" y="128" width="64" height="22" rx="8" />
            </g>
            <rect x="120" y="45" width="60" height="60" rx="14" fill="url(#flow-g)" />
            <g fill="#fff" fontFamily="monospace" fontSize="10" textAnchor="middle">
              <text x="40" y="79">Lead</text>
              <text x="150" y="79">AI agent</text>
              <text x="260" y="79">CRM</text>
              <text x="150" y="15">WhatsApp</text>
              <text x="150" y="143">Email</text>
            </g>
          </svg>
        </div>
      );
    case "brand":
      return (
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <span className="bg-a1-gradient" />
          <span className="bg-white" />
          <span className="bg-a1-smoke" />
          <span className="bg-a1-blush" />
          <b className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-a1-ink font-display text-4xl font-extrabold text-white ring-4 ring-white transition duration-500 group-hover:scale-110">
            Aa
          </b>
        </div>
      );
    case "ad":
      return (
        <div className="absolute inset-[12%] flex flex-col gap-2 rounded-xl bg-white p-3 shadow-2xl transition duration-500 group-hover:-rotate-2">
          <div className="h-2 w-2/5 rounded bg-black/10" />
          <div className="flex-1 rounded-lg bg-[linear-gradient(130deg,#EF5245,#EC2563_60%,#2a0b16)]" />
          <div className="h-2 w-4/5 rounded bg-black/10" />
          <div className="h-5 w-2/5 rounded-md bg-a1-ink" />
        </div>
      );
  }
}

export function Works() {
  const [cat, setCat] = useState<(typeof WORK_CATEGORIES)[number]>("All");
  const list = WORKS.filter((w) => cat === "All" || w.category === cat);

  return (
    <section id="works" className="section bg-a1-paper text-a1-ink">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-pink">Our works</p>
            <h2 className="section-title mt-4 max-w-[12ch]">
              From idea to live. <span className="grad-text">Work that performs.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[26rem]">
            <p className="text-a1-stone">
              Websites, social campaigns, search programmes and automations we build for brands across Dubai and the UAE.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter works by type">
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

        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(12,10,11,0.45)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-a1-ink">
                    <Visual kind={w.visual} />
                    <span className="eyebrow absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 !text-[0.6rem] text-white backdrop-blur">
                      Concept
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow !text-[0.66rem] text-a1-pink">{w.sector}</p>
                    <h3 className="mt-2 text-[1.3rem] font-bold">{w.title}</h3>
                    <p className="mt-2 text-[0.92rem] text-a1-stone">{w.summary}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {w.tags.map((t) => (
                        <span key={t} className="eyebrow rounded-md bg-a1-paper px-2 py-1 !text-[0.62rem] text-a1-stone">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
