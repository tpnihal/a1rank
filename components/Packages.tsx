import Link from "next/link";
import { PACKAGES, PACKAGE_MINIMUM, formatAed } from "@/lib/site";
import { ArrowRight, Check } from "./Icons";
import { Reveal } from "./Reveal";

export function Packages() {
  return (
    <section id="packages" className="section grain relative overflow-hidden bg-a1-ink">
      <div className="absolute left-1/2 top-24 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(236,37,99,0.2),transparent_65%)]" aria-hidden />
      <div className="wrap relative">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-coral">Complete digital marketing packages</p>
            <h2 className="section-title mt-4">
              Pick your <span className="grad-text">growth gear.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[26rem]">
            <p className="text-a1-ash">
              Four monthly packages, each building on the one before. All have a {PACKAGE_MINIMUM}. Ad spend is paid directly to
              Meta or Google and is not included.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((p, i) => {
            const hot = p.slug === "pro-max";
            const grox = p.slug === "grox";
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.08} className="h-full">
                <article
                  className={`relative flex h-full flex-col gap-5 rounded-[1.75rem] p-7 transition duration-300 hover:-translate-y-1.5 ${
                    grox
                      ? "bg-a1-gradient shadow-glow-lg"
                      : hot
                        ? "border-[1.5px] border-transparent shadow-glow-lg [background:linear-gradient(#141012,#141012)_padding-box,linear-gradient(135deg,#EF5245,#EC2563)_border-box]"
                        : "border border-white/12 bg-a1-coal hover:border-white/30"
                  }`}
                >
                  {p.badge ? (
                    <span className={`eyebrow absolute -top-3 left-7 rounded-full px-3 py-1 !text-[0.64rem] ${grox ? "bg-white text-a1-pink" : "bg-a1-gradient text-white"}`}>
                      {p.badge}
                    </span>
                  ) : null}
                  <div>
                    <h3 className="text-[2.2rem] font-extrabold tracking-[-0.03em]">{p.name}</h3>
                    <p className={`mt-2 min-h-[4.2em] text-[0.9rem] ${grox ? "text-white/90" : "text-a1-ash"}`}>{p.audience}</p>
                  </div>
                  <div>
                    <p className={`eyebrow mb-1.5 !text-[0.64rem] ${grox ? "text-white/90" : "invisible"}`} aria-hidden={!p.from}>
                      Starting from
                    </p>
                    <p className="flex items-baseline gap-1.5 tabular-nums">
                      <span className={`font-mono text-[0.74rem] ${grox ? "text-white/90" : "text-a1-ash"}`}>AED</span>
                      <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.02em]">{formatAed(p.price)}</span>
                      <span className={`font-mono text-[0.74rem] ${grox ? "text-white/90" : "text-a1-ash"}`}>/month</span>
                    </p>
                    <p className={`mt-2 text-[0.78rem] ${grox ? "text-white/85" : "text-a1-stone"}`}>{PACKAGE_MINIMUM}</p>
                  </div>
                  <ul className="flex flex-1 flex-col gap-2.5 text-[0.9rem]">
                    {p.inherits ? <li className={`italic ${grox ? "text-white/90" : "text-a1-ash"}`}>{p.inherits}</li> : null}
                    {p.inclusions.map((item) => (
                      <li key={item} className="grid grid-cols-[1.1rem_1fr] items-start gap-2.5">
                        <Check className={`mt-1 h-4 w-4 ${grox ? "text-white" : "text-a1-coral"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${p.slug}`}
                    className={grox ? "btn-light w-full" : hot ? "btn-primary w-full" : "btn-ghost w-full"}
                    aria-label={`${p.cta}: enquire about the ${p.name} package`}
                  >
                    {p.cta} <ArrowRight />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-[0.86rem] text-a1-stone">
          No online payment. Choosing a package opens an enquiry form and we reply with a tailored proposal.
        </p>
      </div>
    </section>
  );
}
