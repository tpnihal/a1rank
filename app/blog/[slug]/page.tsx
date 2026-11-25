import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowRight, Check } from "@/components/Icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { ARTICLES, articleBySlug, categoryName, formatDate, readMinutes, relatedTo, sectionId } from "@/lib/blog";
import { SITE } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = articleBySlug(params.slug);
  if (!a) return {};
  const path = `/blog/${a.slug}`;
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      section: categoryName(a.category),
      authors: [SITE.name],
      images: [{ url: a.image, width: 1200, height: 800, alt: a.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [a.image] },
  };
}

/** Renders [label](/path) as an internal link. */
function rich(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <Link key={i} href={m[2]} className="font-semibold text-a1-ink underline decoration-a1-pink decoration-2 underline-offset-4 hover:text-a1-pink">
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}

export default function ArticlePage({ params }: Props) {
  const a = articleBySlug(params.slug);
  if (!a) notFound();
  const category = categoryName(a.category);
  const related = relatedTo(a);
  const url = `${SITE.url}/blog/${a.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Blog", path: "/blog" },
          { name: category, path: `/blog/category/${a.category}` },
          { name: a.title, path: `/blog/${a.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          image: [`${SITE.url}${a.image}`],
          datePublished: a.date,
          dateModified: a.date,
          articleSection: category,
          author: { "@type": "Organization", name: SITE.name, url: SITE.url },
          publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/logo-mark.svg` } },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        }}
      />

      <article>
        <header className="grain relative isolate overflow-hidden bg-a1-ink pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="absolute -right-48 -top-48 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.28),transparent_68%)]" aria-hidden />
          <div className="wrap relative max-w-[60rem]">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="eyebrow flex flex-wrap items-center gap-2 text-a1-stone">
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={`/blog/category/${a.category}`} className="text-a1-coral hover:text-white">
                    {category}
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="text-[clamp(2.1rem,5vw,3.9rem)] font-extrabold leading-[1.03]">{a.title}</h1>
            <p className="mt-5 max-w-[44rem] text-[1.1rem] text-a1-ash">{a.description}</p>
            <p className="eyebrow mt-7 text-a1-stone">
              By {SITE.name} · <time dateTime={a.date}>{formatDate(a.date)}</time> · {readMinutes(a)} min read
            </p>
          </div>
        </header>

        <div className="bg-white text-a1-ink">
          <div className="wrap max-w-[60rem]">
            <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-[1.75rem] bg-a1-ink md:mt-12">
              <Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width: 960px) 900px, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="wrap grid max-w-[60rem] gap-10 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[15rem_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav aria-label="Table of contents" className="rounded-3xl bg-a1-paper p-6">
                <p className="eyebrow text-a1-pink">In this article</p>
                <ol className="mt-4 space-y-2.5 text-[0.92rem] font-semibold">
                  {a.sections.map((x) => (
                    <li key={x.heading}>
                      <a href={`#${sectionId(x.heading)}`} className="text-a1-stone hover:text-a1-ink">
                        {x.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 max-w-[42rem] text-[1.06rem] leading-[1.75] text-[#3b3336]">
              <p className="font-display text-[1.35rem] font-medium leading-[1.45] text-a1-ink">{rich(a.intro)}</p>
              {a.sections.map((x) => (
                <section key={x.heading} id={sectionId(x.heading)} className="scroll-mt-28">
                  <h2 className="mt-12 text-[1.75rem] font-extrabold leading-[1.15] text-a1-ink">{x.heading}</h2>
                  {x.paragraphs.map((p, i) => (
                    <p key={i} className="mt-4">
                      {rich(p)}
                    </p>
                  ))}
                  {x.bullets ? (
                    <ul className="mt-5 space-y-2.5">
                      {x.bullets.map((b) => (
                        <li key={b} className="grid grid-cols-[1.5rem_1fr] items-start gap-2.5">
                          <Check className="mt-[0.45rem] h-4 w-4 text-a1-pink" />
                          <span>{rich(b)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className="mt-12 rounded-3xl border-l-4 border-a1-pink bg-a1-paper p-6 md:p-8">
                <p className="eyebrow text-a1-pink">Key takeaway</p>
                <p className="mt-3 font-display text-[1.25rem] font-bold leading-[1.35] text-a1-ink">{a.takeaway}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-a1-ink p-6 text-white md:p-8">
                <p className="max-w-[22rem] font-display text-[1.3rem] font-bold leading-[1.2]">Want help putting this into practice?</p>
                <Link href={a.next.href} className="btn-primary">
                  {a.next.label} <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-a1-paper py-14 text-a1-ink md:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title">Related articles</h2>
            <Link href="/blog" className="inline-flex items-center gap-2 font-bold hover:text-a1-pink">
              All articles <ArrowRight />
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ArticleCard article={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
