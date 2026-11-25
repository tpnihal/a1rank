import { useId } from "react";

const VIEW_BOX = "0 0 160.00 139.25";
const PATH =
  "M60.62 33.62 L59.50 34.25 L57.00 38.12 L1.88 133.62 L0.00 137.38 L0.62 138.75 L1.75 139.12 L30.25 139.00 L32.12 137.88 L36.88 132.00 L44.12 125.25 L51.38 120.50 L58.12 117.38 L66.12 115.00 L73.12 113.88 L79.62 113.50 L103.00 113.50 L104.25 113.00 L104.50 111.75 L91.12 88.38 L89.50 86.38 L87.88 85.88 L80.88 85.88 L78.75 85.50 L65.12 85.50 L63.50 84.50 L63.62 83.25 L68.62 74.00 L68.88 63.38 L66.88 51.50 L64.75 45.00 L62.12 39.00 L61.12 34.38Z M79.38 0.12 L77.88 2.00 L68.12 19.12 L66.62 22.88 L65.12 29.25 L65.12 35.88 L68.38 43.88 L70.38 50.12 L72.88 64.38 L73.75 64.75 L74.50 64.12 L79.12 56.62 L80.00 56.25 L81.25 57.12 L126.25 135.38 L128.62 138.50 L131.12 139.12 L157.50 139.25 L159.38 138.88 L160.00 138.00 L159.88 136.88 L82.25 2.38 L80.88 0.38Z";

/** A1 Rank logo mark, traced from the original logo file. Coral to pink gradient. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg viewBox={VIEW_BOX} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EF5245" />
          <stop offset="1" stopColor="#EC2563" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} fillRule="evenodd" d={PATH} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-auto" />
      <span className="font-display text-[1.2rem] font-extrabold tracking-[0.06em]">A1 RANK</span>
    </span>
  );
}
