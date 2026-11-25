export type BlogCategorySlug =
  | "digital-marketing"
  | "social-media-marketing"
  | "website-design-development"
  | "seo-geo"
  | "ai-tools-automation"
  | "business-growth"
  | "branding-creative-design";

export type Section = {
  heading: string;
  /** Paragraphs may contain internal links written as [label](/path). */
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  category: BlogCategorySlug;
  title: string;
  /** Meta description, also used as the card excerpt. */
  description: string;
  /** Placeholder stock photo. Replace with an original featured image. */
  image: string;
  imageAlt: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  intro: string;
  sections: Section[];
  takeaway: string;
  /** Closing internal link to the most relevant service or tool. */
  next: { label: string; href: string };
};

export const s = (heading: string, paragraphs: string[], bullets?: string[]): Section => ({ heading, paragraphs, bullets });
