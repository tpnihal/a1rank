import { ratingFor, type Rating } from "@/lib/audit/types";

export const RATING_COLOUR: Record<Rating, string> = { good: "#0CCE6B", average: "#FFA400", poor: "#FF4E42" };
export const RATING_WORD: Record<Rating, string> = { good: "Good", average: "Needs work", poor: "Poor" };

export function ScoreRing({ score, label, size = 112 }: { score: number | null; label: string; size?: number }) {
  const rating = ratingFor(score);
  const colour = rating ? RATING_COLOUR[rating] : "#6A5F62";
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <figure className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="7" />
          {score !== null ? (
            <circle cx="50" cy="50" r={r} fill="none" stroke={colour} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(score / 100) * c} ${c}`} />
          ) : null}
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display font-extrabold tabular-nums" style={{ fontSize: size * 0.3 }}>
          {score ?? "–"}
        </span>
      </div>
      <figcaption className="mt-3">
        <span className="block text-[0.95rem] font-bold">{label}</span>
        <span className="eyebrow mt-1 block !text-[0.6rem]" style={{ color: colour }}>
          {rating ? RATING_WORD[rating] : "Not available"}
        </span>
      </figcaption>
    </figure>
  );
}

export function RatingDot({ rating }: { rating: Rating | null }) {
  return <i className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: rating ? RATING_COLOUR[rating] : "#6A5F62" }} aria-hidden />;
}
