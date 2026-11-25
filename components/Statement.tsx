"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const TEXT =
  "You have a business to run. We make sure it gets found on Google, followed on social and chosen over the competition, with one team handling the strategy, the creative and the technology behind it.";
const ACCENT = new Set(["found", "followed", "chosen"]);

function Word({ word, range, progress, still }: { word: string; range: [number, number]; progress: MotionValue<number>; still: boolean }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const clean = word.replace(/[.,]/g, "");
  return (
    <motion.span style={still ? undefined : { opacity }} className={ACCENT.has(clean) ? "text-a1-pink" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** About band: the sentence lights up word by word as it scrolls through the viewport. */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section id="about" className="section bg-white text-a1-ink">
      <div className="wrap grid gap-10 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-a1-pink">About A1 Rank</p>
          <p className="mt-4 text-[0.95rem] text-a1-stone">
            A next-generation digital marketing agency based in Dubai, working with brands across the UAE.
          </p>
        </div>
        <div ref={ref}>
          <p className="font-display text-[clamp(1.7rem,4.2vw,3.5rem)] font-bold leading-[1.12] tracking-[-0.02em]">
            {words.map((w, i) => (
              <Word
                key={i}
                word={w}
                progress={scrollYProgress}
                still={Boolean(reduce)}
                range={[i / words.length, Math.min(1, (i + 2) / words.length)]}
              />
            ))}
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-3">
            {[
              ["One accountable team", "Strategy, design, development and media buying planned together, not in silos."],
              ["AI where it helps", "Faster content, smarter reporting and automations that reply in seconds."],
              ["Numbers you can read", "Every month: reach, leads, cost per lead and what happens next."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white p-6">
                <h3 className="text-[1.1rem] font-bold">{t}</h3>
                <p className="mt-2 text-[0.92rem] text-a1-stone">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
