"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRight } from "./Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`mx-auto flex h-[60px] max-w-site items-center justify-between gap-4 rounded-full border pl-5 pr-2.5 transition-all duration-300 ${
          scrolled || open
            ? "border-white/15 bg-a1-ink/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/10 bg-white/[0.04] backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="A1 Rank home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[0.9rem] font-semibold text-a1-ash transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/website-audit"
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.88rem] font-bold text-white ring-1 ring-inset ring-a1-coral/60 transition hover:bg-a1-coral/15 sm:inline-flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-a1-coral opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-a1-coral" />
            </span>
            Free Audit
          </Link>
          <Link href="/contact" className="hidden rounded-full bg-a1-gradient px-5 py-2.5 text-[0.88rem] font-bold text-white shadow-glow transition hover:-translate-y-0.5 md:inline-flex">
            Get a Quote
          </Link>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-w-site overflow-hidden rounded-3xl border border-white/15 bg-a1-ink/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 px-2 py-4 font-display text-2xl font-bold"
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-a1-coral" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link href="/website-audit" onClick={() => setOpen(false)} className="btn-ghost !px-4">
                Free Audit
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary !px-4">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
