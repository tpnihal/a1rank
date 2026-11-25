import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Faq, faqJsonLd } from "@/components/Faq";
import { ArrowRight, ArrowUpRight, ServiceIcon } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_DETAILS } from "@/lib/industry-details";
import { INDUSTRIES, SERVICES } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const ind = INDUSTRIES.find((x) => x.slug === params.slug);
  const d = INDUSTRY_DETAILS[params.slug];
  if (!ind || !d) return {};
  const description = d.intro.length > 158 ? `${d.intro.slice(0, 155).trimEnd()}…` : d.intro;
  return {
    title: `Digital Marketing for ${ind.name} in the UAE`,
    description,
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: { title: `Digital Marketing for ${ind.name} | A1 Rank`, description, url: `/industries/${ind.slug}`, images: [ind.image] },
  };
}

export default function IndustryPage({ params }: Props) {
  const ind = INDUSTRIES.find((x) => x.slug === params.slug);
  const d = INDUSTRY_DETAILS[params.slug];
  if (!ind || !d) notFound();
  const others = INDUSTRIES.filter((x) => x.slug !== ind.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Industries", path: "/industries" },
          { name: ind.name, path: `/industries/${ind.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(d.faqs)} />

      <PageHero image={ind.image} eyebrow={`Industries · ${ind.name}`} crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]} title={d.headline} lede={d.intro}>
        <Link href="/contact" className="btn-primary">
          Get a plan for your business <ArrowRight />
        </Link>
      </PageHero>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[20rem_1fr]">
          <Reveal>
            <p className="eyebrow text-a1-pink">The challenge</p>
            <h2 className="section-title mt-4">What holds growth back.</h2>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-3">
            {d.challenges.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.08} className="bg-white p-7">
                <span className="block h-1 w-10 rounded-full bg-a1-gradient" />
                <p className="mt-5 font-display text-[1.25rem] font-bold leading-[1.2]">{c}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-a1-ink py-16 md:py-24">
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow text-a1-coral">How we help</p>
            <h2 className="section-title mt-4 max-w-[16ch]">
              The plan for <span className="grad-text">{ind.name}.</span>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {d.plays.map((p, i) => {
              const s = SERVICES.find((x) => x.slug === p.service);
              return (
                <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} className="h-full">
                  <Link href={`/services#${p.service}`} className="group flex h-full gap-5 rounded-3xl border border-white/12 bg-a1-coal p-6 transition hover:-translate-y-1 hover:border-a1-coral md:p-8">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-a1-gradient shadow-glow">{s ? <ServiceIcon name={s.icon} /> : null}</span>
                    <div>
                      <h3 className="text-[1.35rem] font-bold leading-[1.15]">{p.title}</h3>
                      <p className="mt-2 text-[0.95rem] text-a1-ash">{p.text}</p>
                      <span className="eyebrow mt-4 inline-flex items-center gap-1.5 text-a1-stone transition group-hover:text-a1-coral">
                        {s?.title} <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[20rem_1fr]">
          <Reveal>
            <p className="eyebrow text-a1-pink">Questions</p>
            <h2 className="section-title mt-4">Good to know.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={d.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="bg-a1-paper py-14 text-a1-ink">
        <div className="wrap">
          <p className="eyebrow text-a1-stone">Other industries</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-[0.92rem] font-semibold transition hover:border-a1-ink hover:bg-a1-ink hover:text-white">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Let's grow your ${ind.name.toLowerCase().includes("commerce") ? "store" : "business"}.`} text="Tell us where you are today and where you want to be. We will come back with a clear plan and the package that fits." />
    </>
  );
}
