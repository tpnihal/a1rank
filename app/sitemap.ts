import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog";
import { BLOG_CATEGORIES, INDUSTRIES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE.url}${path}`,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    page("/website-audit", 0.9),
    page("/works", 0.8),
    page("/industries", 0.8),
    page("/about", 0.7),
    page("/contact", 0.7),
    page("/blog", 0.8, "weekly"),
    ...INDUSTRIES.map((i) => page(`/industries/${i.slug}`, 0.7)),
    ...BLOG_CATEGORIES.map((c) => page(`/blog/category/${c.slug}`, 0.5, "weekly")),
    ...ARTICLES.map((a) => ({ ...page(`/blog/${a.slug}`, 0.6), lastModified: a.date })),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
