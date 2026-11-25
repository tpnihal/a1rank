import { BLOG_CATEGORIES } from "@/lib/site";
import { aiToolsAutomation } from "./articles/ai-tools-automation";
import { brandingCreativeDesign } from "./articles/branding-creative-design";
import { businessGrowth } from "./articles/business-growth";
import { digitalMarketing } from "./articles/digital-marketing";
import { seoGeo } from "./articles/seo-geo";
import { socialMediaMarketing } from "./articles/social-media-marketing";
import { websiteDesignDevelopment } from "./articles/website-design-development";
import type { Article, BlogCategorySlug } from "./types";

export type { Article, BlogCategorySlug, Section } from "./types";

/** Newest first. */
export const ARTICLES: Article[] = [
  ...digitalMarketing,
  ...socialMediaMarketing,
  ...websiteDesignDevelopment,
  ...seoGeo,
  ...aiToolsAutomation,
  ...businessGrowth,
  ...brandingCreativeDesign,
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const articlesIn = (category: string) => ARTICLES.filter((a) => a.category === category);
export const categoryBySlug = (slug: string) => BLOG_CATEGORIES.find((c) => c.slug === slug);
export const categoryName = (slug: BlogCategorySlug) => categoryBySlug(slug)?.name ?? "Blog";

/** Same category first, then the newest from elsewhere. */
export function relatedTo(article: Article, count = 3): Article[] {
  const same = ARTICLES.filter((a) => a.category === article.category && a.slug !== article.slug);
  const rest = ARTICLES.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, count);
}

export const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function readMinutes(article: Article) {
  const text = [article.intro, article.takeaway, ...article.sections.flatMap((x) => [x.heading, ...x.paragraphs, ...(x.bullets ?? [])])].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 210));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
