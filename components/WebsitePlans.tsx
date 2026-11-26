import Link from "next/link";
import { WEBSITE_PLANS, formatAed } from "@/lib/site";
import { ArrowRight, Check } from "./Icons";
import { Reveal } from "./Reveal";

/** The four one-time website plans as full cards. */
export function WebsitePlanCards() {
  return (
    <ul className="grid gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
      {WEBSITE_PLANS.map((p, i) => {
        const hot = Boolean(p.badge);
        return (
          <Reveal as="li" key={p.slug} delay={i * 0.08} className="h-full">
            <article
              id={p.slug}
              className={`relative flex h-full scroll-mt-28 flex-col gap-5 rounded-[1.75rem] p-7 transition duration-300 hover:-translate-y-1.5 ${
                hot
                  ? "bg-a1-gradient shadow-glow-lg xl:-my-3 xl:py-10"
                  : "border border-white/12 bg-a1-coal hover:border-white/30"
              }`}
            >
              {p.badge ? (
                <span className="eyebrow absolute -top-3 left-7 rounded-full bg-white px-3 py-1 !text-[0.64rem] font-bold text-a1-pink">{p.badge}</span>
              ) : null}
              <div>
                <p className={`eyebrow !text-[0.66rem] ${hot ? "text-white/90" : "text-a1-coral"}`}>{p.kind}</p>
                <h3 className="mt-2 text-[2.1rem] font-extrabold tracking-[-0.03em]">{p.name}</h3>
                <p className={`mt-2 text-[0.9rem] xl:min-h-[4.9em] ${hot ? "text-white/90" : "text-a1-ash"}`}>{p.audience}</p>
              </div>
              <div>
                <p className={`eyebrow mb-1.5 !text-[0.64rem] ${p.from ? "text-a1-ash" : "invisible"}`} aria-hidden={!p.from}>
                  Starting from
                </p>
                <p className="flex items-baseline gap-1.5 tabular-nums">
                  <span className={`font-mono text-[0.74rem] ${hot ? "text-white/90" : "text-a1-ash"}`}>AED</span>
                  <span className="font-display text-[2.7rem] font-bold leading-none tracking-[-0.02em]">{formatAed(p.price)}</span>
                </p>
                <p className={`mt-2 text-[0.78rem] ${hot ? "text-white/85" : "text-a1-stone"}`}>{p.priceNote}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2.5 text-[0.9rem]">
                {p.inclusions.map((item) => (
                  <li key={item} className="grid grid-cols-[1.1rem_1fr] items-start gap-2.5">
                    <Check className={`mt-1 h-4 w-4 ${hot ? "text-white" : "text-a1-coral"}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${p.slug}`}
                className={hot ? "btn-light w-full" : "btn-ghost w-full"}
                aria-label={`${p.cta}: enquire about the ${p.name} website plan`}
              >
                {p.cta} <ArrowRight />
              </Link>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Compact homepage strip that points to the full Website Plans page. */
export function WebsitePlansTeaser() {
  return (
    <section id="website-plans" className="grain relative overflow-hidden bg-a1-ink py-16 md:py-20">
      <div className="absolute left-1/2 top-0 h-[22rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(236,37,99,0.16),transparent_65%)]" aria-hidden />
      <div className="wrap relative">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-coral">Website plans · one-time price</p>
            <h2 className="section-title mt-4">
              Want a website <span className="grad-text">like these?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/website-plans" className="btn-primary">
              See all website plans <ArrowRight />
            </Link>
          </Reveal>
        </div>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {WEBSITE_PLANS.map((p, i) => {
            const hot = Boolean(p.badge);
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/website-plans#${p.slug}`}
                  className={`group relative flex h-full flex-col gap-3 rounded-3xl p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                    hot ? "bg-a1-gradient shadow-glow" : "border border-white/12 bg-a1-coal hover:border-white/30"
                  }`}
                >
                  {p.badge ? (
                    <span className="eyebrow absolute -top-2.5 left-5 rounded-full bg-white px-2.5 py-0.5 !text-[0.58rem] font-bold text-a1-pink">{p.badge}</span>
                  ) : null}
                  <span className={`eyebrow !text-[0.62rem] ${hot ? "text-white/90" : "text-a1-coral"}`}>{p.kind}</span>
                  <span className="font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[1.7rem]">{p.name}</span>
                  <span className="mt-auto flex items-end justify-between gap-2">
                    <span className="tabular-nums">
                      <span className={`block font-mono text-[0.66rem] ${hot ? "text-white/90" : "text-a1-ash"}`}>{p.from ? "FROM AED" : "AED"}</span>
                      <span className="font-display text-[1.7rem] font-bold leading-none sm:text-[2rem]">{formatAed(p.price)}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
