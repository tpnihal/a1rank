import { SERVICES } from "@/lib/site";
import { LogoMark } from "./Logo";

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const items = reverse ? [...SERVICES].reverse() : SERVICES;
  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 items-center whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((s) => (
              <span key={s.slug} className="flex items-center">
                <span className={`px-6 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none ${outline ? "text-outline" : "text-white"}`}>
                  {s.label}
                </span>
                <LogoMark className="h-[clamp(1.1rem,2.4vw,1.9rem)] w-auto" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two counter-moving bands listing every discipline. */
export function Marquee() {
  return (
    <div className="relative z-10 -mt-px space-y-3 border-y border-white/10 bg-a1-ink py-7" role="presentation">
      <Row />
      <Row reverse outline />
    </div>
  );
}
