import type { Metadata } from "next";
import { AuditTool } from "@/components/audit/AuditTool";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { normaliseUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Free Website Audit: Speed, SEO and Accessibility Check",
  description: "Run a free website audit in about a minute. Real Google PageSpeed Insights scores for performance, SEO, accessibility and best practices on mobile and desktop. No login.",
  alternates: { canonical: "/website-audit" },
  openGraph: { type: "website", url: "/website-audit", title: "Free Website Audit | A1 Rank", description: "Check your website's speed, SEO and accessibility in about a minute. No login or signup." },
};

type Props = { searchParams: { url?: string | string[] } };

const FAQS = [
  { q: "Is the audit really free?", a: "Yes. There is no login, signup or payment. Enter a website address and the report appears on this page." },
  { q: "Where do the scores come from?", a: "From Google PageSpeed Insights, which runs Lighthouse against the live page on Google's servers. We show the scores exactly as Google returns them." },
  { q: "Why do scores change between runs?", a: "Network conditions, server load and third-party scripts vary from one test to the next, so a few points of difference is normal. Look at the pattern over several runs." },
  { q: "What is the difference between mobile and desktop?", a: "The mobile test simulates a mid-range phone on a slower connection, so it is usually the lower score. Most visitors arrive on phones, which makes it the more important one." },
  { q: "Can you fix the issues the audit finds?", a: "Yes. Request a professional audit from the report and our team will review the site by hand and send a prioritised plan." },
];

export default function WebsiteAuditPage({ searchParams }: Props) {
  const raw = Array.isArray(searchParams.url) ? searchParams.url[0] : searchParams.url;
  const initialUrl = normaliseUrl(raw ?? "") ?? "";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Free Website Audit", path: "/website-audit" }])} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="grain relative isolate overflow-hidden bg-a1-ink pb-16 pt-32 md:pb-24 md:pt-44 print:bg-white print:!pb-0 print:!pt-0">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_20%,#000,transparent_70%)] print:hidden" aria-hidden />
        <div className="absolute -right-48 -top-48 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.3),transparent_68%)] print:hidden" aria-hidden />
        <div className="wrap relative max-w-[64rem]">
          <div className="mx-auto max-w-[46rem] text-center print:hidden">
            <p className="pill eyebrow text-a1-ash">
              <span className="h-1.5 w-1.5 rounded-full bg-a1-coral" /> Free · No login · No signup
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.98]">
              Free Website <span className="grad-text">Audit</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[36rem] text-[1.1rem] text-a1-ash">
              Check your website&rsquo;s performance, SEO, accessibility and best practices on mobile and desktop, using real Google PageSpeed Insights data.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-[64rem] print:mt-0">
            <AuditTool initialUrl={initialUrl} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-a1-ink md:py-24 print:hidden">
        <div className="wrap grid gap-12 lg:grid-cols-[20rem_1fr]">
          <div>
            <p className="eyebrow text-a1-pink">Questions</p>
            <h2 className="section-title mt-4">About the audit.</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>
    </>
  );
}
