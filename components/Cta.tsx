import { SITE } from "@/lib/site";
import { EnquiryForm } from "./EnquiryForm";
import { InstagramIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function Cta() {
  return (
    <section id="enquiry" className="section grain relative overflow-hidden bg-a1-ink">
      <div className="absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(239,82,69,0.22),transparent_65%)]" aria-hidden />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow text-a1-coral">Let&rsquo;s start a project</p>
          <h2 className="mt-4 text-[clamp(2.6rem,6.4vw,5rem)] font-extrabold leading-[0.98]">
            Ready to <span className="grad-text">rank higher?</span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-a1-ash">
            Tell us about your business and what you want more of. We&rsquo;ll come back with a clear plan and the package that
            fits.
          </p>
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
        </Reveal>
        <Reveal delay={0.12}>
          <EnquiryForm idPrefix="home" />
        </Reveal>
      </div>
    </section>
  );
}
