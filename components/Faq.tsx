type Item = { q: string; a: string };

/** Accessible accordion built on native <details>, so it works without JavaScript. */
export function Faq({ items, tone = "light" }: { items: Item[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-black/10 border-black/10"}`}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.15rem] font-bold md:text-[1.3rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition group-open:rotate-45 group-open:border-transparent group-open:bg-a1-gradient group-open:text-white ${dark ? "border-white/20" : "border-black/15"}`} aria-hidden>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </summary>
          <p className={`max-w-[46rem] pb-6 ${dark ? "text-a1-ash" : "text-a1-stone"}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: Item[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}
