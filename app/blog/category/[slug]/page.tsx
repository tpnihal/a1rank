import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { BlogCategories } from "@/components/BlogCategories";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { articlesIn, categoryBySlug } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = categoryBySlug(params.slug);
  if (!c) return {};
  const path = `/blog/category/${c.slug}`;
  return {
    title: `${c.name} Articles`,
    description: `${c.text} Articles from the A1 Rank team in Dubai.`,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${c.name} | A1 Rank Blog`, description: c.text, images: ["/opengraph-image"] },
  };
}

export default function BlogCategoryPage({ params }: Props) {
  const c = categoryBySlug(params.slug);
  if (!c) notFound();
  const list = articlesIn(c.slug);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }, { name: c.name, path: `/blog/category/${c.slug}` }])} />
      <PageHero eyebrow={`${list.length} articles`} crumbs={[{ label: "Blog", href: "/blog" }, { label: c.name }]} title={c.name} lede={c.text} />
      <section className="bg-a1-paper py-12 text-a1-ink md:py-16">
        <div className="wrap">
          <BlogCategories active={c.slug} />
          <h2 className="sr-only">Articles</h2>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Want this done for you?" text="Tell us your goal and we will turn the advice into a plan for your business." />
    </>
  );
}
