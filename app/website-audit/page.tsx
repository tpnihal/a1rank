import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { AUDIT_STAGES } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Free Website Audit",
  description: "A free website audit from A1 Rank using Google PageSpeed Insights: performance, SEO, accessibility and best practices.",
  alternates: { canonical: "/website-audit" },
  robots: { index: false }, // Indexed once the tool itself is live (Stage 4)
};

type Props = { searchParams: { url?: string | string[] } };

/**
 * Stage 1 placeholder. The working audit tool (real PageSpeed Insights data,
 * progress screen, report and PDF) is built in Stage 4. No scores are shown here
 * because no audit is run.
 */
export default function WebsiteAuditPage({ searchParams }: Props) {
  const raw = Array.isArray(searchParams.url) ? searchParams.url[0] : searchParams.url;
  const url = normaliseUrl(raw ?? "");
  const contact = `/contact?topic=audit${url ? `&website=${encodeURIComponent(url)}` : ""}`;

  return (
    <section className="grain relative overflow-hidden bg-a1-ink pb-24 pt-36 md:pt-44">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_70%)]" aria-hidden />
      <div className="wrap relative max-w-3xl text-center">
        <p className="pill eyebrow text-a1-ash">
          <span className="h-1.5 w-1.5 rounded-full bg-a1-coral" /> Launching soon
        </p>
        <h1 className="mt-6 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.98]">
          Free Website <span className="grad-text">Audit</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[34rem] text-a1-ash">
          Our instant audit tool is being built. It will run a real Google PageSpeed Insights check on your site, with no login
          or signup.{" "}
          {url ? (
            <>
              We have not audited <span className="break-all font-semibold text-white">{url}</span> yet.
            </>
          ) : null}
        </p>

        <ol className="mx-auto mt-10 grid max-w-xl gap-2.5 text-left sm:grid-cols-2">
          {AUDIT_STAGES.map((s, i) => (
            <li key={s} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-a1-coal px-4 py-3 text-[0.92rem]">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-[0.68rem] text-a1-ash">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={contact} className="btn-primary">
            Request an audit from our team <ArrowRight />
          </Link>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
