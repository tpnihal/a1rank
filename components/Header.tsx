"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { INDUSTRIES, NAV, SERVICES } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRight, ArrowUpRight, ServiceIcon } from "./Icons";

type MenuKey = "/services" | "/industries";

const SERVICE_GROUPS: { heading: string; slugs: string[] }[] = [
  {
    heading: "Grow",
    slugs: ["digital-marketing-strategy", "social-media-management", "seo-google-business-profile", "meta-google-ads"],
  },
  {
    heading: "Create",
    slugs: ["graphic-design-branding", "website-design-development", "photography-videography", "ai-video-creative-content"],
  },
  { heading: "Automate & measure", slugs: ["ai-agents-automation", "analytics-reporting-lead-generation"] },
];

const hasMenu = (href: string): href is MenuKey => href === "/services" || href === "/industries";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

function ServicesMenu({ close }: { close: () => void }) {
  return (
    <>
      <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1fr_1fr_17.5rem] xl:p-8">
        {SERVICE_GROUPS.map((g) => (
          <div key={g.heading}>
            <p className="eyebrow px-3 !text-[0.66rem] text-a1-stone">{g.heading}</p>
            <ul className="mt-3 space-y-0.5">
              {g.slugs.map((slug) => {
                const s = SERVICES.find((x) => x.slug === slug);
                if (!s) return null;
                return (
                  <li key={slug}>
                    <Link href={`/services#${slug}`} onClick={close} className="group/item flex items-start gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-white/[0.07]">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-a1-coral transition group-hover/item:bg-a1-gradient group-hover/item:text-white">
                        <ServiceIcon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                      </span>
                      <span>
                        <span className="block text-[0.95rem] font-bold leading-snug text-white">{s.menuTitle}</span>
                        <span className="mt-0.5 block text-[0.82rem] leading-snug text-a1-ash">{s.menuLine}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <Link href="/website-audit" onClick={close} className="group/card relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl bg-a1-gradient p-6 text-white">
          <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover/card:scale-125" aria-hidden />
          <span className="eyebrow relative flex items-center gap-2 !text-[0.66rem]">
            <i className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden /> Free tool
          </span>
          <span className="relative">
            <span className="block font-display text-[1.6rem] font-extrabold leading-[1.05]">Free Website Audit</span>
            <span className="mt-2 block text-[0.88rem] leading-snug text-white/85">Check your site&apos;s speed, SEO and accessibility in about a minute.</span>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.84rem] font-bold text-a1-ink">
              Run free audit <ArrowRight className="h-4 w-4" />
            </span>
          </span>
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-4 text-[0.88rem]">
        <p className="text-a1-ash">
          Not sure which one you need?{" "}
          <Link href="/contact" onClick={close} className="font-bold text-white underline-offset-4 hover:underline">
            Talk to us
          </Link>
        </p>
        <Link href="/services" onClick={close} className="inline-flex items-center gap-2 font-bold text-white hover:text-a1-coral">
          View all services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

function IndustriesMenu({ close }: { close: () => void }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 p-6 xl:grid-cols-4 xl:p-7">
        {INDUSTRIES.map((ind) => (
          <li key={ind.slug}>
            <Link href={`/industries/${ind.slug}`} onClick={close} className="group/item flex items-center gap-3.5 rounded-2xl p-2.5 transition hover:bg-white/[0.07]">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-a1-smoke">
                <Image src={ind.image} alt="" fill sizes="56px" className="object-cover transition duration-500 group-hover/item:scale-110" />
              </span>
              <span>
                <span className="block text-[0.95rem] font-bold leading-snug text-white">{ind.name}</span>
                <span className="mt-0.5 block text-[0.78rem] leading-snug text-a1-ash">{ind.services.join(" · ")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-4 text-[0.88rem]">
        <p className="text-a1-ash">Different sectors win customers in different ways.</p>
        <Link href="/industries" onClick={close} className="inline-flex items-center gap-2 font-bold text-white hover:text-a1-coral">
          View all industries <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [sub, setSub] = useState<MenuKey | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const pathname = usePathname();

  const show = (key: MenuKey | null) => {
    clearTimeout(timer.current);
    setMenu(key);
  };
  const hideSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(null), 140);
  };

  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  const active = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4" onMouseLeave={hideSoon}>
      <div
        className={`relative z-10 mx-auto flex h-[60px] max-w-site items-center justify-between gap-4 rounded-full border pl-5 pr-2.5 transition-all duration-300 ${
          scrolled || open || menu
            ? "border-white/15 bg-a1-ink/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-white/10 bg-white/[0.04] backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="A1 Rank home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Link
            href="/website-plans"
            aria-current={active("/website-plans") ? "page" : undefined}
            onMouseEnter={() => show(null)}
            onFocus={() => show(null)}
            className="plan-pill mr-1 flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-[0.4rem] text-[0.9rem] font-bold text-white transition hover:-translate-y-0.5"
          >
            Website Plans
            <span className="hidden rounded-full bg-a1-gradient px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] min-[1340px]:inline">from AED 699</span>
          </Link>
          {NAV.map((item) => {
            const cls = `flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 xl:px-3.5 text-[0.9rem] font-semibold transition hover:bg-white/10 hover:text-white ${
              active(item.href) || menu === item.href ? "bg-white/10 text-white" : "text-a1-ash"
            }`;
            return hasMenu(item.href) ? (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                aria-haspopup="true"
                aria-expanded={menu === item.href}
                aria-controls="mega-menu"
                onMouseEnter={() => show(item.href as MenuKey)}
                onFocus={() => show(item.href as MenuKey)}
                className={cls}
              >
                {item.label}
                <Chevron open={menu === item.href} />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                onMouseEnter={() => show(null)}
                onFocus={() => show(null)}
                className={cls}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/website-audit"
            className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.88rem] font-bold text-white ring-1 ring-inset ring-a1-coral/60 transition hover:bg-a1-coral/15 sm:inline-flex lg:hidden xl:inline-flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-a1-coral opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-a1-coral" />
            </span>
            Free Audit
          </Link>
          <Link href="/contact" className="hidden rounded-full bg-a1-gradient whitespace-nowrap px-5 py-2.5 text-[0.88rem] font-bold text-white shadow-glow transition hover:-translate-y-0.5 md:inline-flex">
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
        {menu ? (
          <motion.div
            id="mega-menu"
            key="mega"
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={() => show(menu)}
            className="mx-auto hidden max-w-site origin-top pt-2.5 lg:block"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-a1-ink/85 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              {menu === "/services" ? <ServicesMenu close={() => setMenu(null)} /> : <IndustriesMenu close={() => setMenu(null)} />}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-site overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-a1-ink/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <Link
              href="/website-plans"
              onClick={() => setOpen(false)}
              className="mb-2 flex items-center justify-between gap-3 rounded-2xl bg-a1-gradient px-4 py-4 shadow-glow"
            >
              <span>
                <span className="block font-display text-2xl font-bold leading-tight">Website Plans</span>
                <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/90">From AED 699 · one-time price</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-white/10">
                  <div className="flex items-center">
                    <Link href={item.href} onClick={() => setOpen(false)} className="flex-1 px-2 py-4 font-display text-2xl font-bold">
                      {item.label}
                    </Link>
                    {hasMenu(item.href) ? (
                      <button
                        type="button"
                        aria-expanded={sub === item.href}
                        aria-label={`${sub === item.href ? "Hide" : "Show"} ${item.label.toLowerCase()} list`}
                        onClick={() => setSub((v) => (v === item.href ? null : (item.href as MenuKey)))}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-a1-coral"
                      >
                        <span className="scale-150">
                          <Chevron open={sub === item.href} />
                        </span>
                      </button>
                    ) : (
                      <ArrowRight className="mr-3 h-5 w-5 text-a1-coral" />
                    )}
                  </div>
                  {sub === item.href ? (
                    <ul className="grid gap-x-4 pb-4 sm:grid-cols-2">
                      {(item.href === "/services"
                        ? SERVICES.map((s) => ({ href: `/services#${s.slug}`, label: s.menuTitle }))
                        : INDUSTRIES.map((x) => ({ href: `/industries/${x.slug}`, label: x.name }))
                      ).map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-2 py-2.5 text-[0.98rem] font-semibold text-a1-ash hover:bg-white/[0.06] hover:text-white">
                            {l.label}
                            <ArrowUpRight className="h-4 w-4 text-a1-stone" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
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
