"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "./Icons";

const ZOOM = 1.45;

function Headline({ clone = false }: { clone?: boolean }) {
  return (
    <span
      aria-hidden={clone || undefined}
      className="block text-center font-display text-[clamp(2.7rem,8.4vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
      style={clone ? { textShadow: "-3px 0 0 rgba(239,82,69,0.55), 3px 0 0 rgba(236,37,99,0.55)" } : undefined}
    >
      Ready to grow smarter <br className="hidden sm:block" />
      and <span className={clone ? undefined : "grad-text"}>rank higher?</span>
    </span>
  );
}

/**
 * Closing call to action. A glass lens follows the pointer and magnifies the headline beneath it.
 * With no pointer (touch screens) the lens drifts slowly on its own; with reduced motion it stays still.
 */
export function LensCta() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = el.offsetWidth;
    let h = el.offsetHeight;
    const pos = { x: w * 0.62, y: h * 0.48 };
    const target = { ...pos };
    let hovering = false;
    let visible = false;
    let raf = 0;

    const paint = () => {
      el.style.setProperty("--x", `${pos.x.toFixed(1)}px`);
      el.style.setProperty("--y", `${pos.y.toFixed(1)}px`);
    };
    const measure = () => {
      w = el.offsetWidth;
      h = el.offsetHeight;
      el.style.setProperty("--w", `${w}px`);
      if (!hovering) {
        pos.x = target.x = w * 0.62;
        pos.y = target.y = h * 0.48;
      }
      paint();
    };
    measure();
    el.dataset.ready = "true";

    const tick = (t: number) => {
      if (!hovering) {
        target.x = w * (0.5 + 0.3 * Math.sin(t / 2600));
        target.y = h * (0.5 + 0.22 * Math.sin(t / 1700 + 1));
      }
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      paint();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf && visible && !reduce) raf = requestAnimationFrame(tick);
    };

    const section = el.closest("section") ?? el;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      hovering = true;
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (reduce) {
        pos.x = target.x;
        pos.y = target.y;
        paint();
      }
    };
    const onLeave = () => {
      hovering = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="enquiry" className="grain relative isolate overflow-hidden bg-a1-ink py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(255,255,255,0.07),transparent_55%)]" aria-hidden />
      <div className="absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.18),transparent_65%)]" aria-hidden />

      <div className="wrap relative">
        <div ref={stage} className="group/lens relative mx-auto max-w-[68rem]">
          <h2>
            <Headline />
          </h2>

          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-data-[ready=true]/lens:opacity-100 [--lens:150px] sm:[--lens:230px]"
            style={{
              width: "var(--lens)",
              height: "var(--lens)",
              transform: "translate(calc(var(--x, 0px) - var(--lens) / 2), calc(var(--y, 0px) - var(--lens) / 2))",
              background: "radial-gradient(circle at 35% 28%, #2a2225 0%, #151012 55%, #0c0a0b 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 10px 30px rgba(255,255,255,0.12), inset 0 -18px 40px rgba(0,0,0,0.6), 0 30px 60px -20px rgba(0,0,0,0.8)",
              willChange: "transform",
            }}
          >
            <div
              className="absolute left-0 top-0 text-white"
              style={{
                width: "var(--w, 100vw)",
                transformOrigin: "var(--x, 0px) var(--y, 0px)",
                transform: `translate(calc(var(--lens) / 2 - var(--x, 0px)), calc(var(--lens) / 2 - var(--y, 0px))) scale(${ZOOM})`,
                willChange: "transform",
              }}
            >
              <Headline clone />
            </div>
            <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] ring-1 ring-white/15" />
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(140deg,rgba(255,255,255,0.16),transparent_38%)]" />
          </div>
        </div>

        <p className="mx-auto mt-9 max-w-[36rem] text-center text-[1.1rem] text-a1-ash md:text-[1.2rem]">
          Tell us about your business and what you want more of. We&rsquo;ll come back with a clear plan and the package that fits.
        </p>
        <div className="mt-10 flex flex-col items-center gap-6">
          <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-5 text-[1.05rem] font-bold text-a1-ink shadow-[0_18px_50px_-12px_rgba(255,255,255,0.45)] transition hover:-translate-y-0.5">
            Get a Quote <ArrowRight />
          </Link>
          <Link href="/website-audit" className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-2.5 text-[0.86rem] font-semibold text-a1-ash transition hover:border-a1-coral hover:text-white">
            <i className="h-1.5 w-1.5 rounded-full bg-a1-coral" aria-hidden /> Or run a free website audit first
          </Link>
        </div>
      </div>
    </section>
  );
}
