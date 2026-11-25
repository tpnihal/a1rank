import { BLOG_CATEGORIES } from "@/lib/site";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";

/** Stage 1 introduces the blog topics. Stage 3 replaces this with the latest articles. */
export function BlogTeaser() {
  return (
    <section id="blogs" className="section bg-white text-a1-ink">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-pink">Blogs</p>
            <h2 className="section-title mt-4 max-w-[14ch]">
              Practical marketing advice for <span className="grad-text">UAE businesses.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow rounded-full border border-black/10 px-3.5 py-2 text-a1-stone">Articles publishing soon</p>
          </Reveal>
        </div>
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_CATEGORIES.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 4) * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="group flex h-full flex-col justify-between gap-6 rounded-3xl sm:min-h-[10.5rem] border border-black/[0.08] bg-a1-paper p-6 transition duration-300 hover:-translate-y-1 hover:bg-a1-ink hover:text-white">
                <LogoMark className="h-5 w-auto self-start" />
                <div>
                  <h3 className="text-[1.18rem] font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1.5 text-[0.88rem] text-a1-stone transition-colors group-hover:text-a1-ash">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.15}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-a1-gradient sm:min-h-[10.5rem] p-6 text-white">
              <span className="font-mono text-[0.74rem]">7 topics</span>
              <p className="font-display text-[1.18rem] font-bold leading-tight">Written by the team that runs the campaigns.</p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
