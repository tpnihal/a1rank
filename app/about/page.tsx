import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, ServiceIcon } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { SERVICES, SITE, TOOLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About A1 Rank",
  description: "A1 Rank is a next-generation digital marketing agency in Dubai, combining strategy, creative, technology and AI to help UAE brands grow.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { title: "Results before reports", text: "Reach and likes are useful signals. Leads, bookings and sales are the goal, and that is what we plan and report against." },
  { title: "One team, one plan", text: "Your website, content, search and ads are planned together so each one makes the others work harder." },
  { title: "AI with a human in charge", text: "We use AI to move faster and test more ideas. Strategy, taste and final decisions stay with people." },
  { title: "Plain language, always", text: "No jargon and no hidden numbers. You see what was done, what it achieved and what comes next." },
];

const PILLARS = [
  { label: "Strategy", text: "Research, positioning and a roadmap tied to revenue.", icons: ["strategy", "chart"] as const },
  { label: "Creative", text: "Branding, content, photography and video that look premium.", icons: ["brand", "camera"] as const },
  { label: "Technology", text: "Websites, tracking, AI agents and automation.", icons: ["web", "bot"] as const },
  { label: "Media", text: "Social, search and paid campaigns managed every day.", icons: ["social", "ads"] as const },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        crumbs={[{ label: "About Us" }]}
        title={
          <>
            A next-generation agency, <span className="grad-text">built in Dubai.</span>
          </>
        }
        lede="A1 Rank brings strategy, creative, technology and AI together in one team, so growing brands in the UAE get marketing that is joined up and measurable."
        aside={
          <div className="hidden justify-end lg:flex" aria-hidden>
            <LogoMark className="h-56 w-auto animate-floaty drop-shadow-[0_30px_60px_rgba(236,37,99,0.45)]" />
          </div>
        }
      >
        <Link href="/contact" className="btn-primary">
          Work with us <ArrowRight />
        </Link>
        <Link href="/services" className="btn-ghost">
          Our services
        </Link>
      </PageHero>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[14rem_1fr]">
          <p className="eyebrow text-a1-pink">Why we exist</p>
          <div>
            <Reveal>
              <p className="font-display text-[clamp(1.7rem,3.8vw,3.1rem)] font-bold leading-[1.12] tracking-[-0.02em]">
                Most businesses end up with one company for the website, another for social media and a third for ads.{" "}
                <span className="text-a1-pink">Nobody owns the result.</span> A1 Rank was set up to be the single team that does.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid gap-6 text-a1-stone md:grid-cols-2">
              <p>
                We are based in Dubai and work with businesses across the UAE, from new ventures that need a professional
                presence to established brands that want to lead their category online.
              </p>
              <p>
                The name says what we aim for: A1 quality in everything we produce, and a higher rank for our clients wherever
                their customers are looking, on Google, on social media and in AI search.
              </p>
            </Reveal>
          </div>
        </div>
        {/* Placeholder stock photos. Replace with A1 Rank office and team photography. */}
        <div className="wrap mt-14 grid gap-4 md:mt-20 md:grid-cols-[1.6fr_1fr]">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-a1-ink">
            <Image src="/images/stock/dubai-skyline.jpg" alt="Dubai skyline" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
            <span className="eyebrow absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 !text-[0.62rem] text-white backdrop-blur-md">Based in Dubai, UAE</span>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-a1-ink md:aspect-auto">
            <Image src="/images/stock/strategy-desk.jpg" alt="Marketing strategy planning on a desk" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-a1-ink py-16 md:py-24">
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow text-a1-coral">Four capabilities</p>
            <h2 className="section-title mt-4 max-w-[15ch]">
              Everything under <span className="grad-text">one roof.</span>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.label} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-white/12 bg-a1-coal p-7">
                  <div className="flex -space-x-2">
                    {p.icons.map((ic) => (
                      <span key={ic} className="grid h-11 w-11 place-items-center rounded-full bg-a1-gradient ring-4 ring-a1-coal">
                        <ServiceIcon name={ic} />
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-8 text-[1.7rem] font-extrabold">{p.label}</h3>
                  <p className="mt-2 text-a1-ash">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="eyebrow mr-2 text-a1-stone">{SERVICES.length} services</span>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[0.84rem] font-semibold text-a1-ash transition hover:border-a1-coral hover:text-white">
                {s.label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 text-a1-ink md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[20rem_1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-a1-pink">How we think</p>
            <h2 className="section-title mt-4">What we believe.</h2>
          </Reveal>
          <ul className="border-t border-black/10">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} y={16} className="grid gap-x-10 gap-y-2 border-b border-black/10 py-7 md:grid-cols-[18rem_1fr]">
                <h3 className="text-[1.5rem] font-bold leading-[1.12]">{p.title}</h3>
                <p className="text-a1-stone">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-a1-paper py-16 text-a1-ink md:py-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-a1-pink">AI-powered, human-led</p>
            <h2 className="section-title mt-4">The tools behind the work.</h2>
            <p className="mt-5 max-w-[30rem] text-a1-stone">
              We combine leading AI models with the platforms your customers already use. The tools change quickly. Our job is to
              know which ones are worth using for your business.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2.5">
              {TOOLS.map((t) => (
                <li key={t} className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 font-display text-[1.1rem] font-bold">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Process />

      <section className="bg-white py-16 text-a1-ink">
        <div className="wrap">
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-3">
            {[
              ["Based in", SITE.location],
              ["Email", SITE.email],
              ["Instagram", SITE.instagram],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-7">
                <dt className="eyebrow text-a1-stone">{k}</dt>
                <dd className="mt-2 select-all break-words font-display text-[1.35rem] font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand title="Let's build something that ranks." text="Tell us about your business. We will reply with ideas, not a sales script." />
    </>
  );
}
