import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowUpRight, Check } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Packages } from "@/components/Packages";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { ServiceVisual } from "@/components/ServiceVisual";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { SERVICES, TOOLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Dubai",
  description:
    "Ten services from one Dubai team: strategy, social media, branding, websites, SEO, Meta and Google Ads, photo and video, AI video, AI automation and analytics.",
  alternates: { canonical: "/services" },
};

/** Short sub-service tags shown as pills on each block. */
const SERVICE_TAGS: Record<string, string[]> = {
  "digital-marketing-strategy": ["Market research", "Competitor audit", "Channel plan", "Lead funnel", "90-day roadmap", "Tracking plan"],
  "social-media-management": ["Content calendar", "Posts & carousels", "Reels", "Captions", "Community replies", "Monthly report"],
  "graphic-design-branding": ["Logo design", "Brand guidelines", "Social templates", "Company profiles", "Brochures & menus", "Packaging"],
  "website-design-development": ["Landing pages", "Business websites", "Ecommerce stores", "WordPress", "Next.js", "Arabic & English"],
  "seo-google-business-profile": ["Technical SEO", "Keyword research", "On-page SEO", "Google Business Profile", "AI search (GEO)", "Ranking reports"],
  "meta-google-ads": ["Meta Ads", "Google Ads", "Ad creatives", "Retargeting", "Conversion tracking", "Weekly optimisation"],
  "photography-videography": ["Product shoots", "Food photography", "Property & interiors", "Team portraits", "Reels & ad video", "Editing & retouching"],
  "ai-video-creative-content": ["AI reels", "Ad variations", "Product visuals", "Explainers", "Voice-over & captions", "Scripts & hooks"],
  "ai-agents-automation": ["WhatsApp AI agent", "Website chat", "Lead routing", "Appointment booking", "CRM integration", "n8n workflows"],
  "analytics-reporting-lead-generation": ["GA4", "Tag Manager", "Meta pixel", "Call & form tracking", "Lead dashboard", "Monthly reports"],
};

const SERVICE_CTA: Record<string, string> = {
  "digital-marketing-strategy": "Plan my growth",
  "social-media-management": "Start my social media",
  "graphic-design-branding": "Start a brand project",
  "website-design-development": "Scope my website",
  "seo-google-business-profile": "Improve my rankings",
  "meta-google-ads": "Scope a campaign",
  "photography-videography": "Book a shoot",
  "ai-video-creative-content": "Create AI content",
  "ai-agents-automation": "Automate my replies",
  "analytics-reporting-lead-generation": "Set up my tracking",
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

          <div className="mt-12 divide-y divide-black/10 border-t border-black/10 md:mt-16">
            {SERVICES.map((s, i) => {
              const d = SERVICE_DETAILS[s.slug];
              const tags = SERVICE_TAGS[s.slug] ?? [];
              const web = s.slug === "website-design-development";
              return (
                <article key={s.slug} id={s.slug} className="grid scroll-mt-24 items-start gap-9 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:py-20">
                  <div className="lg:py-2">
                    <p className="font-mono text-[0.8rem] text-a1-stone">({String(i + 1).padStart(2, "0")})</p>
                    <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">{s.title}</h2>
                    <p className="mt-5 max-w-[44rem] text-[1.08rem] leading-relaxed text-a1-stone md:text-[1.2rem]">{d.intro}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <li key={t} className="rounded-full bg-a1-paper px-4 py-2 text-[0.88rem] font-semibold ring-1 ring-inset ring-black/[0.07]">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-8 max-w-[44rem] divide-y divide-black/10">
                      {d.deliverables.slice(0, 4).map((x) => (
                        <li key={x} className="grid grid-cols-[1.5rem_1fr] items-start gap-2.5 py-3.5 text-[1rem]">
                          <Check className="mt-1 h-4 w-4 text-a1-pink" />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[1rem] font-semibold ring-1 ring-inset ring-a1-ink/30 transition hover:bg-a1-ink hover:text-white hover:ring-a1-ink"
                      >
                        {SERVICE_CTA[s.slug] ?? "Enquire about this service"} <ArrowUpRight />
                      </Link>
                      {web ? (
                        <Link href="/website-plans" className="inline-flex items-center gap-2.5 rounded-full bg-a1-gradient px-6 py-3.5 text-[1rem] font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
                          Website plans from AED 699 <ArrowUpRight />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <ServiceVisual icon={s.icon} index={i} label={s.label} tags={tags} />
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
