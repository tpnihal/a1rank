import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowUpRight, Check, ServiceIcon } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { SERVICES, TOOLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Dubai",
  description:
    "Ten services from one Dubai team: strategy, social media, branding, websites, SEO, Meta and Google Ads, photo and video, AI video, AI automation and analytics.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        crumbs={[{ label: "Services" }]}
        title={
          <>
            Everything your brand needs to <span className="grad-text">grow online.</span>
          </>
        }
        lede="Ten disciplines, one accountable team in Dubai. Take a single service or a complete monthly package."
      >
        <Link href="/contact" className="btn-primary">
          Get a Quote
        </Link>
        <Link href="#packages" className="btn-ghost">
          See packages
        </Link>
      </PageHero>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap">
          <nav aria-label="Jump to a service" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
            {SERVICES.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="shrink-0 rounded-full border border-black/10 bg-a1-paper px-4 py-2 text-[0.86rem] font-bold transition hover:border-a1-ink hover:bg-a1-ink hover:text-white">
                {s.label}
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
            {SERVICES.map((s, i) => {
              const d = SERVICE_DETAILS[s.slug];
              return (
                <article key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={`relative aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-a1-ink ${i % 2 ? "lg:order-2" : ""}`}>
                    <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 580px, 100vw" className="object-cover" />
                    <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-a1-gradient text-white shadow-glow">
                      <ServiceIcon name={s.icon} />
                    </span>
                  </div>
                  <div>
                    <p className="eyebrow text-a1-pink">
                      {String(i + 1).padStart(2, "0")} · {s.label}
                    </p>
                    <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.05]">{s.title}</h2>
                    <p className="mt-4 text-[1.05rem] text-a1-stone">{d.headline}</p>
                    <ul className="mt-6 space-y-2.5">
                      {d.deliverables.slice(0, 5).map((x) => (
                        <li key={x} className="grid grid-cols-[1.5rem_1fr] items-start gap-2.5 text-[0.96rem]">
                          <Check className="mt-1 h-4 w-4 text-a1-pink" />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="mt-7 inline-flex items-center gap-2 font-bold hover:text-a1-pink">
                      Enquire about this service <ArrowUpRight />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center gap-2.5">
            <span className="eyebrow mr-2 text-a1-stone">Tools we work with</span>
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full border border-black/10 bg-a1-paper px-3.5 py-1.5 text-[0.84rem] font-semibold text-a1-stone">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <Process />
      <Packages />
      <CtaBand title="Not sure which service you need?" text="Tell us your goal and we will recommend where to start, with no obligation." />
    </>
  );
}
