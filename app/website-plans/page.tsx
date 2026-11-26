import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WebsitePlanCards } from "@/components/WebsitePlans";
import { LAUNCHES, SITE, WEBSITE_PLANS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Plans & Prices in Dubai, from AED 699",
  description:
    "Website design plans from A1 Rank in Dubai: landing page AED 699, business website AED 1,299, 20-page SEO website AED 1,999 and ecommerce from AED 2,999. One-time prices.",
  alternates: { canonical: "/website-plans" },
};

const FAQ = [
  {
    q: "Are these monthly prices?",
    a: "No. Website plans are one-time project prices for designing and building your website. Our monthly digital marketing packages are separate.",
  },
  {
    q: "Which plan should I choose?",
    a: "A new business that needs to be found online can start with Launch. Most established businesses choose Business. If you offer many services or serve several locations, SEO Pro gives each one its own page. To sell products online, choose Ecommerce.",
  },
  {
    q: "Why does the ecommerce price start from AED 2,999?",
    a: "Every store is different. The starting price covers a complete online store. Custom features, such as special integrations or advanced product options, are quoted after we understand what you need.",
  },
  {
    q: "How do I get started?",
    a: "Choose a plan and send the enquiry form. We reply with a clear proposal. There is no online payment on this website.",
  },
];

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website design and development",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: "AE",
  offers: WEBSITE_PLANS.map((p) => ({
    "@type": "Offer",
    name: `${p.name} (${p.kind})`,
    priceCurrency: "AED",
    price: p.price,
    url: `${SITE.url}/website-plans#${p.slug}`,
  })),
};

export default function WebsitePlansPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Website Plans", path: "/website-plans" }])} />
      <JsonLd data={offersJsonLd} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <PageHero
        eyebrow="Website plans · one-time price"
        crumbs={[{ label: "Website Plans" }]}
        title={
          <>
            Modern, fast websites <span className="grad-text">from AED 699.</span>
          </>
        }
        lede="Websites are what we do most. Pick the size that fits your business today: a landing page, a business website, a 20-page SEO website or a full online store."
      >
        <Link href="#plans" className="btn-primary">
          See the plans
        </Link>
        <Link href="/#latest-websites" className="btn-ghost">
          Our latest websites
        </Link>
      </PageHero>

      <section id="plans" className="grain relative scroll-mt-24 overflow-hidden bg-a1-ink pb-20 pt-6 md:pb-28">
        <div className="absolute left-1/2 top-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(236,37,99,0.2),transparent_65%)]" aria-hidden />
        <div className="wrap relative">
          <WebsitePlanCards />
          <p className="mt-9 text-center text-[0.86rem] text-a1-stone">
            One-time project prices in AED. No online payment: choosing a plan opens an enquiry form and we reply with a proposal.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-a1-pink">Every plan includes</p>
            <h2 className="section-title mt-4">Built to be found, built to convert.</h2>
            <ul className="mt-8 space-y-4 text-[1.02rem]">
              {[
                ["Mobile-first design", "Most visitors arrive on a phone, so we design for the phone first."],
                ["Speed", "Light pages that load quickly on mobile data."],
                ["SEO-friendly build", "Clean structure, titles and descriptions that search engines can read."],
                ["Clear ways to contact you", "WhatsApp, call and enquiry buttons where visitors look for them."],
              ].map(([t, d]) => (
                <li key={t} className="border-l-2 border-a1-pink pl-4">
                  <span className="font-display text-[1.1rem] font-bold">{t}</span>
                  <span className="mt-0.5 block text-a1-stone">{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.95rem] text-a1-stone">
              Recent websites by our team:{" "}
              {LAUNCHES.map((l, i) => (
                <span key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-a1-ink underline decoration-a1-pink underline-offset-4 hover:text-a1-pink">
                    {l.title}
                  </a>
                  {i < LAUNCHES.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-a1-pink">Questions</p>
            <h2 className="mb-6 mt-4 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold">Before you choose</h2>
            <Faq items={FAQ} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure which plan fits?"
        text="Tell us about your business and we will recommend one."
        primary={{ label: "Ask us", href: "/contact" }}
        secondary={{ label: "Run a Free Website Audit", href: "/website-audit" }}
      />
    </>
  );
}
