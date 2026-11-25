import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; body: ReactNode };

/** Plain, fast layout for policy pages. */
export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} crumbs={[{ label: title }]} title={title} lede={intro} />
      <section className="bg-white py-14 text-a1-ink md:py-20">
        <div className="wrap max-w-[52rem] space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[1.5rem] font-bold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-a1-stone [&_a]:font-semibold [&_a]:text-a1-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">{s.body}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
