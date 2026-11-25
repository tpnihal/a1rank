import Link from "next/link";
import { INDUSTRIES } from "@/lib/site";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

export function Industries() {
  return (
    <section id="industries" className="section bg-white text-a1-ink">
      <div className="wrap grid gap-12 lg:grid-cols-[22rem_1fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-a1-pink">Industries</p>
          <h2 className="section-title mt-4">
            Built for how <span className="grad-text">your sector</span> sells.
          </h2>
          <p className="mt-5 text-a1-stone">
            A clinic, a restaurant and a property developer win customers in different ways. We shape the channel mix around
            how buyers in your industry actually decide.
          </p>
          <Link href="/industries" className="btn-ghost-dark mt-7">
            All industries <ArrowUpRight />
          </Link>
        </Reveal>

        <ul className="border-t border-black/10">
          {INDUSTRIES.map((ind, i) => (
            <Reveal as="li" key={ind.name} delay={(i % 4) * 0.04} y={16}>
              <Link href={`/industries/${ind.slug}`} className="group relative grid items-center gap-x-6 gap-y-2 overflow-hidden border-b border-black/10 px-1 py-6 transition-colors duration-300 hover:text-white sm:grid-cols-[2.5rem_1fr_auto] md:px-4">
                <span className="absolute inset-0 origin-left scale-x-0 bg-a1-gradient transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
                <span className="relative hidden text-a1-pink transition group-hover:translate-x-1 group-hover:text-white sm:block">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div className="relative">
                  <h3 className="text-[clamp(1.45rem,3vw,2.1rem)] font-bold transition-transform duration-300 group-hover:translate-x-2">{ind.name}</h3>
                  <p className="mt-1 text-[0.94rem] text-a1-stone transition-colors group-hover:text-white/90">{ind.need}</p>
                </div>
                <ul className="relative flex flex-wrap gap-1.5 sm:justify-end">
                  {ind.services.map((s) => (
                    <li key={s} className="eyebrow rounded-full border border-black/10 px-2.5 py-1 !text-[0.62rem] text-a1-stone transition-colors group-hover:border-white/40 group-hover:text-white">
                      {s}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
