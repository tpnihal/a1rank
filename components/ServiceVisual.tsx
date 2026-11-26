import type { IconKey } from "@/lib/site";
import { ServiceIcon } from "./Icons";

const GLOWS = [
  "radial-gradient(circle at 78% 18%, rgba(236,37,99,0.55), transparent 55%), radial-gradient(circle at 12% 92%, rgba(239,82,69,0.4), transparent 50%)",
  "radial-gradient(circle at 20% 15%, rgba(239,82,69,0.55), transparent 52%), radial-gradient(circle at 88% 85%, rgba(236,37,99,0.45), transparent 52%)",
  "radial-gradient(circle at 50% 108%, rgba(236,37,99,0.6), transparent 58%), radial-gradient(circle at 50% -10%, rgba(239,82,69,0.3), transparent 45%)",
];

const CHIP_POS = ["left-[7%] top-[60%] -rotate-3", "right-[6%] top-[69%] rotate-2", "left-[16%] top-[80%] rotate-1"];

/** Original brand artwork for a service: a tall dark panel with the service icon, its number and floating tags. */
export function ServiceVisual({ icon, index, label, tags }: { icon: IconKey; index: number; label: string; tags: string[] }) {
  const filled = index % 3 === 1;
  return (
    <div
      className={`relative isolate aspect-[5/4] overflow-hidden rounded-[1.75rem] text-white sm:aspect-[16/10] lg:aspect-[4/5] ${filled ? "bg-a1-gradient" : "bg-a1-ink"}`}
      aria-hidden
    >
      {filled ? (
        <span className="absolute inset-0" style={{ background: "radial-gradient(circle at 85% 10%, rgba(255,255,255,0.28), transparent 50%), radial-gradient(circle at 10% 95%, rgba(12,10,11,0.45), transparent 55%)" }} />
      ) : (
        <span className="absolute inset-0" style={{ background: GLOWS[index % GLOWS.length] }} />
      )}
      <span className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_40%,#000_10%,transparent_75%)]" />

      <span className="text-outline absolute left-[6%] top-[3%] font-display text-[clamp(4.5rem,11vw,8.5rem)] font-extrabold leading-none tracking-[-0.04em]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="eyebrow absolute right-[7%] top-[7%] rounded-full border border-white/25 bg-white/10 px-3 py-1 !text-[0.64rem] backdrop-blur">{label}</span>

      <span className="absolute left-1/2 top-[40%] grid -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute h-[19rem] w-[19rem] rounded-full border border-white/[0.07]" />
        <span className="absolute h-[13.5rem] w-[13.5rem] rounded-full border border-white/[0.12]" />
        <span className="absolute h-[8.5rem] w-[8.5rem] rounded-full border border-white/20 bg-white/[0.04]" />
        <span className={`relative grid h-[5.25rem] w-[5.25rem] place-items-center rounded-[1.6rem] shadow-glow-lg ${filled ? "bg-white text-a1-pink" : "bg-a1-gradient text-white"}`}>
          <ServiceIcon name={icon} className="h-9 w-9" />
        </span>
      </span>

      {tags.slice(0, 3).map((t, i) => (
        <span
          key={t}
          className={`absolute hidden whitespace-nowrap rounded-full border border-white/20 bg-white/[0.12] px-3.5 py-1.5 text-[0.8rem] font-semibold shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md lg:block ${CHIP_POS[i]}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
