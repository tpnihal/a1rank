import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { InstagramIcon } from "@/components/Icons";
import { PACKAGE_MINIMUM, SITE, formatAed, packageBySlug, websitePlanBySlug } from "@/lib/site";
import { normaliseUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Send A1 Rank an enquiry about digital marketing, websites, SEO, ads or AI automation in Dubai and the UAE.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: { package?: string | string[]; plan?: string | string[]; website?: string | string[]; topic?: string | string[] } };

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default function ContactPage({ searchParams }: Props) {
  const pkg = packageBySlug(first(searchParams.package));
  const plan = pkg ? undefined : websitePlanBySlug(first(searchParams.plan));
  const website = normaliseUrl(first(searchParams.website) ?? "") ?? "";
  const audit = first(searchParams.topic) === "audit";
  const consultation = first(searchParams.topic) === "consultation";

  return (
    <section className="grain relative overflow-hidden bg-a1-ink pb-24 pt-36 md:pt-44">
      <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.3),transparent_65%)]" aria-hidden />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-a1-coral">{plan ? "Website plan enquiry" : audit ? "Professional website audit" : consultation ? "Consultation" : "Enquiry"}</p>
          <h1 className="mt-4 text-[clamp(2.6rem,6.4vw,5rem)] font-extrabold leading-[0.98]">
            {pkg ? (
              <>
                Start with <span className="grad-text">{pkg.name}.</span>
              </>
            ) : plan ? (
              <>
                Your new <span className="grad-text">website.</span>
              </>
            ) : audit ? (
              <>
                Get a <span className="grad-text">full audit.</span>
              </>
            ) : consultation ? (
              <>
                Book a <span className="grad-text">consultation.</span>
              </>
            ) : (
              <>
                Let&rsquo;s grow <span className="grad-text">your brand.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-[26rem] text-a1-ash">
            {plan
              ? "Tell us about your business and what the website should do. We reply with a clear proposal for your plan. No online payment."
              : audit
              ? "Our team reviews your website, search visibility and tracking by hand and sends you a prioritised action plan."
              : consultation
                ? "Tell us a little about your business and when suits you. We'll reply to arrange a call."
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

          {plan ? (
            <div className="mt-8 rounded-3xl border border-white/12 bg-a1-coal p-6">
              <p className="eyebrow text-a1-stone">Selected website plan</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-3xl font-extrabold">{plan.name}</span>
                <span className="tabular-nums text-a1-ash">
                  {plan.from ? "From " : ""}AED {formatAed(plan.price)} · {plan.priceNote}
                </span>
              </p>
              <p className="mt-2 text-[0.9rem] text-a1-ash">{plan.audience}</p>
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
          key={`${pkg?.slug ?? plan?.slug ?? "none"}-${website}`}
          idPrefix="contact"
          defaultPackage={pkg?.name ?? ""}
          defaultWebsite={website}
          topic={audit ? "Professional website audit" : pkg ? `${pkg.name} package` : plan ? `Website plan: ${plan.name} (${plan.from ? "from " : ""}AED ${formatAed(plan.price)})` : "General enquiry"}
        />
      </div>
    </section>
  );
}
