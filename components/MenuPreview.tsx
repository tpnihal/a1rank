"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Service } from "@/lib/site";
import { ArrowUpRight, ServiceIcon } from "./Icons";

const glass = "rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-sm";
const line = (w: string, tone = "bg-white/25") => <i className={`block h-1.5 rounded-full ${tone}`} style={{ width: w }} />;

/** Small original illustrations, one per service, drawn in CSS so they stay sharp and on brand. */
const SCENES: Record<string, ReactNode> = {
  "digital-marketing-strategy": (
    <div className="flex h-full items-stretch gap-2.5 px-2 pb-1">
      {[38, 58, 80].map((h, i) => (
        <div key={h} className="flex flex-1 flex-col items-center justify-end gap-1.5">
          <span className="font-mono text-[0.6rem] text-white/70">{(i + 1) * 30} days</span>
          <i className={`block w-full rounded-t-xl ${i === 2 ? "bg-a1-gradient shadow-glow" : "bg-white/15"}`} style={{ height: `${h}%` }} />
        </div>
      ))}
    </div>
  ),
  "social-media-management": (
    <div className="relative h-full">
      <div className={`absolute left-[8%] top-[6%] h-[88%] w-[44%] -rotate-6 overflow-hidden rounded-[1.1rem] border border-white/20 bg-a1-ink p-1.5`}>
        <div className="grid h-full grid-cols-2 gap-1">
          {["bg-a1-gradient", "bg-white/15", "bg-white/15", "bg-a1-pink/70", "bg-white/25", "bg-a1-flame/70"].map((c, i) => (
            <i key={i} className={`block rounded-md ${c}`} />
          ))}
        </div>
      </div>
      <div className="absolute right-[8%] top-[10%] flex h-[88%] w-[44%] rotate-6 flex-col justify-between overflow-hidden rounded-[1.1rem] border border-white/20 bg-a1-gradient p-2.5">
        <span className="eyebrow !text-[0.52rem] text-white/90">Reel</span>
        <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white text-a1-pink">
          <svg viewBox="0 0 12 12" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden><path d="M2 1.2v9.6L10.5 6z" /></svg>
        </span>
        <span className="space-y-1">{line("80%", "bg-white/80")}{line("55%", "bg-white/50")}</span>
      </div>
    </div>
  ),
  "graphic-design-branding": (
    <div className="grid h-full grid-cols-[1fr_1.1fr] gap-2.5">
      <div className={`${glass} grid place-items-center font-display text-[2.6rem] font-extrabold leading-none`}>Aa</div>
      <div className="grid grid-rows-2 gap-2.5">
        <div className="flex overflow-hidden rounded-xl">
          {["#EF5245", "#F04651", "#EC2563", "#FFFFFF", "#0C0A0B"].map((c) => (
            <i key={c} className="block flex-1" style={{ background: c }} />
          ))}
        </div>
        <div className={`${glass} flex items-center gap-2.5 px-3`}>
          <i className="block h-7 w-7 rounded-full bg-a1-gradient" />
          <span className="flex-1 space-y-1.5">{line("85%", "bg-white/70")}{line("50%")}</span>
        </div>
      </div>
    </div>
  ),
  "website-design-development": (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/20 bg-a1-coal">
      <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-1.5">
        <i className="h-1.5 w-1.5 rounded-full bg-white/30" /><i className="h-1.5 w-1.5 rounded-full bg-white/30" /><i className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="relative flex-1">
        <Image src="/images/works/alrawabidairy.jpg" alt="" fill sizes="260px" className="object-cover object-top" />
      </div>
    </div>
  ),
  "seo-google-business-profile": (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-a1-ink">
        <ServiceIcon name="seo" className="h-3.5 w-3.5 text-a1-pink" />
        <span className="text-[0.74rem] font-semibold">best near me</span>
        <i className="ml-0.5 h-3.5 w-px animate-pulse bg-a1-ink" />
      </div>
      {[true, false, false].map((top, i) => (
        <div key={i} className={`flex flex-1 items-center gap-2.5 rounded-xl px-3 ${top ? "bg-a1-gradient shadow-glow" : "border border-white/12 bg-white/[0.05]"}`}>
          <span className="font-mono text-[0.66rem] text-white/80">{i + 1}</span>
          <span className="flex-1 space-y-1.5">{line(top ? "70%" : "60%", top ? "bg-white" : "bg-white/40")}{line("40%", top ? "bg-white/60" : "bg-white/20")}</span>
        </div>
      ))}
    </div>
  ),
  "meta-google-ads": (
    <div className="relative h-full">
      <div className={`${glass} absolute inset-x-[8%] top-0 flex h-[86%] flex-col p-2.5`}>
        <span className="eyebrow !text-[0.52rem] text-white/70">Sponsored</span>
        <i className="mt-2 block flex-1 rounded-lg bg-a1-gradient" />
        <span className="mt-2.5 flex items-center justify-between gap-3">
          <span className="flex-1 space-y-1.5">{line("80%", "bg-white/70")}{line("50%")}</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[0.62rem] font-bold text-a1-ink">Enquire</span>
        </span>
      </div>
      <svg viewBox="0 0 24 24" className="absolute bottom-0 right-[6%] h-9 w-9 drop-shadow-lg" fill="#fff" stroke="#0C0A0B" strokeWidth="1.2" aria-hidden><path d="M5 3l14 7-6 2-2 6z" /></svg>
    </div>
  ),
  "photography-videography": (
    <div className="relative h-full overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_60%,rgba(236,37,99,0.55),rgba(12,10,11,0.2)_70%)]">
      {["left-2 top-2 border-l-2 border-t-2", "right-2 top-2 border-r-2 border-t-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((c) => (
        <i key={c} className={`absolute h-5 w-5 border-white ${c}`} />
      ))}
      <i className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/80" />
      <i className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      <span className="absolute left-4 top-3.5 flex items-center gap-1.5 font-mono text-[0.6rem]">
        <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-a1-coral" /> REC
      </span>
    </div>
  ),
  "ai-video-creative-content": (
    <div className="flex h-full flex-col gap-2.5">
      <div className="relative grid flex-1 place-items-center overflow-hidden rounded-xl bg-a1-gradient">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-a1-pink shadow-lg">
          <svg viewBox="0 0 12 12" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden><path d="M2 1.2v9.6L10.5 6z" /></svg>
        </span>
        <span className="eyebrow absolute left-2.5 top-2.5 rounded-full bg-a1-ink/70 px-2 py-0.5 !text-[0.52rem]">AI</span>
      </div>
      <div className={`${glass} flex h-9 items-center gap-[3px] px-2.5`}>
        {[40, 70, 55, 90, 35, 60, 80, 45, 95, 50, 65, 30, 75, 55, 85, 40, 60, 70].map((h, i) => (
          <i key={i} className={`block flex-1 rounded-full ${i < 8 ? "bg-a1-coral" : "bg-white/30"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  ),
  "ai-agents-automation": (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[0.72rem] font-semibold text-a1-ink">Do you have a slot tomorrow?</div>
      <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-a1-gradient px-3 py-2 text-[0.72rem] font-semibold shadow-glow">Yes. Shall I book 11 AM for you?</div>
      <div className="flex w-14 items-center justify-center gap-1 rounded-2xl rounded-bl-md bg-white/15 py-2.5">
        {[0, 1, 2].map((d) => (
          <i key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" style={{ animationDelay: `${d * 0.15}s` }} />
        ))}
      </div>
    </div>
  ),
  "analytics-reporting-lead-generation": (
    <div className="grid h-full grid-cols-[1fr_auto] gap-2.5">
      <div className={`${glass} flex items-end gap-1.5 p-2.5`}>
        {[35, 50, 42, 68, 60, 88].map((h, i) => (
          <i key={i} className={`block flex-1 rounded-t-md ${i === 5 ? "bg-a1-gradient" : "bg-white/25"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className={`${glass} grid w-[5.5rem] place-items-center`}>
        <i className="block h-14 w-14 rounded-full" style={{ background: "conic-gradient(#EC2563 0 62%, rgba(255,255,255,0.18) 0)", WebkitMask: "radial-gradient(circle, transparent 52%, #000 54%)", mask: "radial-gradient(circle, transparent 52%, #000 54%)" }} />
      </div>
    </div>
  ),
};

/** Right-hand panel of the services menu: shows artwork for the service being hovered. */
export function MenuPreview({ service, onNavigate }: { service: Service; onNavigate: () => void }) {
  return (
    <a
      href={`/services#${service.slug}`}
      onClick={onNavigate}
      className="group/card relative flex min-h-[17rem] flex-col overflow-hidden rounded-3xl border border-white/12 bg-a1-coal text-white"
      tabIndex={-1}
      aria-hidden
    >
      <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.5),transparent_68%)]" />
      <span className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(239,82,69,0.35),transparent_68%)]" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={service.slug}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative flex flex-1 flex-col p-4"
        >
          <span className="block h-[10.5rem]">{SCENES[service.slug]}</span>
          <span className="mt-auto flex items-end justify-between gap-3 pt-4">
            <span>
              <span className="eyebrow block !text-[0.6rem] text-a1-coral">{service.label}</span>
              <span className="mt-1 block font-display text-[1.05rem] font-extrabold leading-tight">{service.menuTitle}</span>
            </span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-a1-ink transition group-hover/card:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </span>
        </motion.span>
      </AnimatePresence>
    </a>
  );
}
