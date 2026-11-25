import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/site";

/** Category chips used on the blog index and category pages. */
export function BlogCategories({ active }: { active?: string }) {
  const chip = (on: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-[0.88rem] font-bold transition ${on ? "border-a1-ink bg-a1-ink text-white" : "border-black/10 bg-white text-a1-ink hover:border-a1-ink"}`;
  return (
    <nav aria-label="Blog categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
      <Link href="/blog" aria-current={!active ? "page" : undefined} className={chip(!active)}>
        All
      </Link>
      {BLOG_CATEGORIES.map((c) => (
        <Link key={c.slug} href={`/blog/category/${c.slug}`} aria-current={active === c.slug ? "page" : undefined} className={chip(active === c.slug)}>
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
