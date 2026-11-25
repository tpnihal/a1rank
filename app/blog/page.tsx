import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { BlogCategories } from "@/components/BlogCategories";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ARTICLES } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: Digital Marketing Advice for UAE Businesses",
  description: "Practical articles on digital marketing, social media, websites, SEO and GEO, AI automation, business growth and branding from the A1 Rank team in Dubai.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: "A1 Rank Blog", description: "Practical marketing advice for UAE businesses." },
};

export default function BlogPage() {
  const [latest, ...rest] = ARTICLES;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "A1 Rank Blog",
          url: `${SITE.url}/blog`,
          publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }}
      />
      <PageHero
        eyebrow="Blogs"
        crumbs={[{ label: "Blog" }]}
        title={
          <>
            Practical marketing advice for <span className="grad-text">UAE businesses.</span>
          </>
        }
        lede="Written by the team that plans the campaigns, builds the websites and sets up the automations."
      />
      <section className="bg-a1-paper py-12 text-a1-ink md:py-16">
        <div className="wrap">
          <BlogCategories />
          <div className="mt-10 rounded-[2rem] border border-black/[0.07] bg-white p-4 md:p-6">
            <ArticleCard article={latest} large />
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
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
