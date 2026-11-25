import Link from "next/link";
import { ARTICLES } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/site";
import { ArticleCard } from "./ArticleCard";
import { ArrowUpRight } from "./Icons";
import { Reveal } from "./Reveal";

/** Homepage blog band: the three newest articles and links to every category. */
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
            <Link href="/blog" className="inline-flex items-center gap-2 font-bold hover:text-a1-pink">
              All articles <ArrowUpRight />
            </Link>
          </Reveal>
        </div>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.07} className={i === 2 ? "sm:max-lg:hidden" : ""}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-wrap items-center gap-2 border-t border-black/10 pt-7">
          <span className="eyebrow mr-2 text-a1-stone">Topics</span>
          {BLOG_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="rounded-full border border-black/10 bg-a1-paper px-3.5 py-1.5 text-[0.84rem] font-semibold transition hover:border-a1-ink hover:bg-a1-ink hover:text-white">
              {c.name}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
