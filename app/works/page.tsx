import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WorksGrid } from "@/components/Works";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Works",
  description: "Websites, social media campaigns, SEO programmes, ad campaigns, branding and AI automation by A1 Rank, Dubai.",
  alternates: { canonical: "/works" },
};

const CAPABILITIES: { label: string; text: string; slug: string }[] = [
  { label: "Websites", text: "Company sites, landing pages and online stores.", slug: "website-design-development" },
  { label: "Social Media", text: "Monthly content, reels and community management.", slug: "social-media-management" },
  { label: "SEO", text: "Search and Google Maps visibility programmes.", slug: "seo-google-business-profile" },
  { label: "Ads", text: "Meta and Google campaigns built around leads.", slug: "meta-google-ads" },
  { label: "AI Automation", text: "Chat agents and workflows that save hours.", slug: "ai-agents-automation" },
  { label: "Branding", text: "Identities, guidelines and marketing materials.", slug: "graphic-design-branding" },
];

export default function WorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Our Works", path: "/works" }])} />
      <PageHero
        image="/images/stock/dashboard-dark.jpg"
        eyebrow="Our works"
        crumbs={[{ label: "Our Works" }]}
        title={
          <>
            From idea to live. <span className="grad-text">Work that performs.</span>
          </>
        }
        lede="A look at the kinds of projects we deliver across websites, social media, search, advertising, branding and AI automation."
      >
        <Link href="/contact" className="btn-primary">
          Start your project
        </Link>
      </PageHero>

      <WorksGrid />

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow text-a1-pink">What we deliver</p>
            <h2 className="section-title mt-4 max-w-[16ch]">Six kinds of work, one standard.</h2>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => {
              const s = SERVICES.find((x) => x.slug === c.slug);
              return (
                <li key={c.label} className="bg-white">
                  <Link href={`/services#${c.slug}`} className="group flex h-full flex-col p-7 transition hover:bg-a1-ink hover:text-white">
                    <h3 className="text-[1.5rem] font-bold">{c.label}</h3>
                    <p className="mt-2 text-a1-stone transition-colors group-hover:text-a1-ash">{c.text}</p>
                    <span className="eyebrow mt-6 text-a1-pink">{s?.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand title="Want to see work from your industry?" text="Tell us your sector and we will share relevant examples and ideas for your brand." primary={{ label: "Ask for examples", href: "/contact" }} />
    </>
  );
}
