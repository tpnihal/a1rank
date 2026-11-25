import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowUpRight } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_DETAILS } from "@/lib/industry-details";
import { INDUSTRIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries We Serve in the UAE",
  description:
    "Digital marketing shaped around how each sector sells: real estate, restaurants, clinics, e-commerce, beauty, construction, education and hospitality.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Industries", path: "/industries" }])} />
      <PageHero
        eyebrow="Industries"
        crumbs={[{ label: "Industries" }]}
        title={
          <>
            Built for how <span className="grad-text">your sector</span> sells.
          </>
        }
        lede="A clinic, a restaurant and a property developer win customers in different ways. We shape the channel mix around how buyers in your industry actually decide."
      />

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2">
            {INDUSTRIES.map((ind, i) => {
              const d = INDUSTRY_DETAILS[ind.slug];
              return (
                <Reveal as="li" key={ind.slug} delay={(i % 2) * 0.06} className="h-full">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-a1-paper p-7 transition duration-300 hover:-translate-y-1 hover:text-white md:p-9"
                  >
                    <span className="absolute inset-0 origin-bottom-left scale-0 rounded-3xl bg-a1-ink transition-transform duration-500 ease-out group-hover:scale-100" aria-hidden />
                    <span className="relative -mx-3 -mt-3 mb-7 block aspect-[16/8] overflow-hidden rounded-2xl bg-a1-ink md:-mx-4 md:-mt-4">
                      <Image src={ind.image} alt={`${ind.name} marketing`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </span>
                    <div className="relative flex items-start justify-between gap-6">
                      <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.05]">{ind.name}</h2>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/15 transition group-hover:border-transparent group-hover:bg-a1-gradient" aria-hidden>
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="relative mt-3 max-w-[30rem] text-a1-stone transition-colors group-hover:text-a1-ash">{d.headline}</p>
                    <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-8">
                      {ind.services.map((s) => (
                        <li key={s} className="eyebrow rounded-full border border-black/10 px-2.5 py-1 !text-[0.62rem] text-a1-stone transition-colors group-hover:border-white/30 group-hover:text-white">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand title="Don't see your industry?" text="We work with many kinds of businesses. Tell us about yours and we will show you how we would approach it." />
    </>
  );
}
