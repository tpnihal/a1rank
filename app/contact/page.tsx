import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { InstagramIcon } from "@/components/Icons";
import { PACKAGE_MINIMUM, SITE, formatAed, packageBySlug } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Send A1 Rank an enquiry about digital marketing, websites, SEO, ads or AI automation in Dubai and the UAE.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: { package?: string | string[]; website?: string | string[]; topic?: string | string[] } };

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default function ContactPage({ searchParams }: Props) {
  const pkg = packageBySlug(first(searchParams.package));
  const website = normaliseUrl(first(searchParams.website) ?? "") ?? "";
  const audit = first(searchParams.topic) === "audit";

  return (
    <section className="grain relative overflow-hidden bg-a1-ink pb-24 pt-36 md:pt-44">
      <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.3),transparent_65%)]" aria-hidden />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-a1-coral">{audit ? "Professional website audit" : "Enquiry"}</p>
          <h1 className="mt-4 text-[clamp(2.6rem,6.4vw,5rem)] font-extrabold leading-[0.98]">
            {pkg ? (
              <>
                Start with <span className="grad-text">{pkg.name}.</span>
              </>
            ) : audit ? (
              <>
                Get a <span className="grad-text">full audit.</span>
              </>
            ) : (
              <>
                Let&rsquo;s grow <span className="grad-text">your brand.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-[26rem] text-a1-ash">
            {audit
              ? "Our team reviews your website, search visibility and tracking by hand and sends you a prioritised action plan."
              : "Tell us about your business and what you want more of. We'll come back with a clear plan and the package that fits."}
          </p>

          {pkg ? (
            <div className="mt-8 rounded-3xl border border-white/12 bg-a1-coal p-6">
              <p className="eyebrow text-a1-stone">Selected package</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-3xl font-extrabold">{pkg.name}</span>
                <span className="tabular-nums text-a1-ash">
                  {pkg.from ? "Starting " : ""}AED {formatAed(pkg.price)}/month · {PACKAGE_MINIMUM}
                </span>
              </p>
              <p className="mt-2 text-[0.9rem] text-a1-ash">{pkg.audience}</p>
            </div>
          ) : null}

          <dl className="mt-9 divide-y divide-white/10 border-y border-white/10">
            <div className="grid grid-cols-[7rem_1fr] gap-3 py-4">
              <dt className="eyebrow pt-1 text-a1-stone">Email</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="font-semibold hover:text-a1-coral">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 py-4">
              <dt className="eyebrow pt-1 text-a1-stone">Instagram</dt>
              <dd>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-a1-coral">
                  <InstagramIcon className="h-4 w-4" /> {SITE.instagram}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 py-4">
              <dt className="eyebrow pt-1 text-a1-stone">Based in</dt>
              <dd className="font-semibold">{SITE.location}</dd>
            </div>
          </dl>
        </div>

        <EnquiryForm
          key={`${pkg?.slug ?? "none"}-${website}`}
          idPrefix="contact"
          defaultPackage={pkg?.name ?? ""}
          defaultWebsite={website}
          topic={audit ? "Professional website audit" : pkg ? `${pkg.name} package` : "General enquiry"}
        />
      </div>
    </section>
  );
}
