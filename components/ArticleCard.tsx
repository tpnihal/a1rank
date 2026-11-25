import Image from "next/image";
import Link from "next/link";
import { categoryName, formatDate, readMinutes, type Article } from "@/lib/blog";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article className={`group relative h-full ${large ? "grid items-center gap-6 md:grid-cols-[1.15fr_1fr] md:gap-10" : "flex flex-col"}`}>
      <div className={`relative overflow-hidden rounded-[1.5rem] bg-a1-ink ${large ? "aspect-[3/2]" : "aspect-[16/10]"}`}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={large}
          sizes={large ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <span className="eyebrow absolute left-3.5 top-3.5 rounded-full bg-black/60 px-3 py-1.5 !text-[0.6rem] text-white backdrop-blur-md">{categoryName(article.category)}</span>
      </div>
      <div className={large ? "" : "flex flex-1 flex-col px-1 pt-5"}>
        <p className="eyebrow !text-[0.64rem] text-a1-stone">
          {formatDate(article.date)} · {readMinutes(article)} min read
        </p>
        <h3 className={`mt-2.5 font-bold leading-[1.12] ${large ? "text-[clamp(1.7rem,3.2vw,2.6rem)] font-extrabold" : "text-[1.3rem]"}`}>
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-a1-pink">
            {article.title}
          </Link>
        </h3>
        <p className={`mt-2.5 text-a1-stone ${large ? "text-[1.05rem]" : "text-[0.94rem]"}`}>{article.description}</p>
      </div>
    </article>
  );
}
