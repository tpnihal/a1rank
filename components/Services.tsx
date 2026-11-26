"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
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

type Tone = "outline" | "gradient" | "ink" | "soft";
type Shape = { tone: Tone; style: CSSProperties; center?: boolean; pad?: string; burst?: boolean };

const zigzagBottom = (() => {
  const teeth = 7;
  const pts = ["0 0", "100% 0", "100% calc(100% - 14px)"];
  for (let i = teeth * 2 - 1; i >= 1; i--) pts.push(`${((i / (teeth * 2)) * 100).toFixed(2)}% ${i % 2 ? "100%" : "calc(100% - 14px)"}`);
  pts.push("0 calc(100% - 14px)");
  return `polygon(${pts.join(", ")})`;
})();

/** A 16-point starburst used as an accent behind one icon. */
const burst = (() => {
  const n = 16;
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 36 : 50;
    const a = (Math.PI * i) / n;
    pts.push(`${(50 + r * Math.sin(a)).toFixed(1)}% ${(50 - r * Math.cos(a)).toFixed(1)}%`);
  }
  return `polygon(${pts.join(", ")})`;
})();

const ticket =
  "radial-gradient(circle 15px at 0 50%, transparent 97%, #000), radial-gradient(circle 15px at 100% 50%, transparent 97%, #000)";

/** One shape per service, in order, so no two neighbouring cards look the same. */
const SHAPES: Shape[] = [
  { tone: "outline", style: { borderRadius: "2.75rem 2.75rem 2.75rem 0.35rem" } },
  { tone: "gradient", style: { borderRadius: "999px 999px 1.6rem 1.6rem" }, center: true },
  { tone: "soft", style: { clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" } },
  { tone: "ink", style: { clipPath: zigzagBottom }, pad: "pb-8 sm:pb-9" },
  { tone: "outline", style: { borderRadius: "3.5rem 0.9rem 3.5rem 0.9rem" } },
  { tone: "soft", style: { borderRadius: "0.9rem 3.5rem 0.9rem 3.5rem" } },
  { tone: "ink", style: { WebkitMaskImage: ticket, maskImage: ticket, WebkitMaskComposite: "source-in", maskComposite: "intersect", borderRadius: "1.4rem" } },
  { tone: "outline", style: { borderRadius: "0.35rem 2.75rem 2.75rem 2.75rem" }, burst: true },
  { tone: "gradient", style: { clipPath: "polygon(0 20px, 50% 0, 100% 20px, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px))" }, pad: "py-9 sm:py-10" },
  { tone: "ink", style: { borderRadius: "999px 999px 1.6rem 1.6rem" }, center: true },
];

const TONE: Record<Tone, { card: string; icon: string; arrow: string; num: string; line: string }> = {
  outline: {
    card: "bg-white text-a1-ink ring-[1.5px] ring-inset ring-a1-ink hover:text-white hover:ring-transparent",
    icon: "bg-a1-gradient text-white group-hover:bg-none group-hover:bg-white group-hover:text-a1-pink",
    arrow: "bg-a1-ink text-white group-hover:bg-white group-hover:text-a1-ink",
    num: "text-a1-pink group-hover:text-white/85",
    line: "text-a1-stone group-hover:text-white/90",
  },
  gradient: { card: "bg-a1-gradient text-white", icon: "bg-white text-a1-pink", arrow: "bg-white/20 text-white", num: "text-white/80", line: "text-white/90" },
  ink: { card: "bg-a1-ink text-white", icon: "bg-a1-gradient text-white", arrow: "bg-white/15 text-white", num: "text-a1-coral", line: "text-white/75" },
  soft: { card: "bg-[#F1EDEE] text-a1-ink", icon: "bg-a1-ink text-white", arrow: "bg-white text-a1-ink", num: "text-a1-pink", line: "text-a1-stone" },
};

/** Services grid on a plain white panel: ten 3D tilt cards, each with its own shape, staggered in a zigzag on desktop. */
export function Services() {
  return (
    <section id="services" className="bg-a1-ink px-2 py-3 md:px-4">
      <div className="relative overflow-clip rounded-[2rem] bg-white py-14 text-a1-ink md:rounded-[2.75rem] md:py-20">
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

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:pb-10">
            {SERVICES.map((s, i) => {
              const shape = SHAPES[i % SHAPES.length];
              const t = TONE[shape.tone];
              return (
                <Reveal as="li" key={s.slug} delay={(i % 5) * 0.05} y={18} className={`[perspective:900px] ${(i % 5) % 2 ? "lg:relative lg:top-10" : ""}`}>
                  <Link
                    href={`/services#${s.slug}`}
                    onMouseMove={tilt}
                    onMouseLeave={reset}
                    style={shape.style}
                    className={`service-tilt group relative flex h-full min-h-[12.5rem] flex-col overflow-hidden p-4 sm:min-h-[15rem] sm:p-5 ${shape.pad ?? ""} ${t.card}`}
                  >
                    {shape.tone === "outline" ? (
                      <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-a1-gradient transition-transform duration-300 ease-out group-hover:scale-y-100" aria-hidden />
                    ) : (
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.22), transparent 62%)" }}
                        aria-hidden
                      />
                    )}
                    <span className={`relative flex items-start [transform:translateZ(34px)] ${shape.center ? "justify-center pt-5 sm:pt-7" : "justify-between"}`}>
                      <span className="relative grid h-12 w-12 place-items-center">
                        {shape.burst ? (
                          <span className="absolute -inset-3 bg-a1-gradient transition-transform duration-700 group-hover:rotate-45 group-hover:bg-none group-hover:bg-white" style={{ clipPath: burst }} aria-hidden />
                        ) : null}
                        <span className={`relative grid h-full w-full place-items-center transition duration-300 group-hover:scale-110 ${shape.burst ? "text-white group-hover:text-a1-pink" : `${shape.center ? "rounded-full" : "rounded-2xl"} ${t.icon}`}`}>
                          <ServiceIcon name={s.icon} />
                        </span>
                      </span>
                      {shape.center ? null : (
                        <span className={`grid h-8 w-8 place-items-center rounded-full transition duration-300 group-hover:rotate-45 ${t.arrow}`}>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </span>
                    <span className={`relative mt-auto block pt-5 [transform:translateZ(20px)] ${shape.center ? "text-center" : ""}`}>
                      <span className={`font-mono text-[0.68rem] tracking-[0.14em] transition-colors duration-300 ${t.num}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-1 block text-[0.98rem] font-bold leading-[1.2] sm:text-[1.08rem]">{s.menuTitle}</span>
                      <span className={`mt-1.5 hidden text-[0.84rem] leading-snug transition-colors duration-300 sm:block ${t.line}`}>{s.menuLine}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-9 flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-2 text-a1-stone">Powered by</span>
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1 text-[0.8rem] font-semibold text-a1-ink ring-1 ring-black/15">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
