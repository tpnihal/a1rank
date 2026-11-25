import type { IconKey } from "@/lib/site";

const PATHS: Record<IconKey, React.ReactNode> = {
  strategy: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  social: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17 7h.01" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l9 16H3z" />
      <path d="M12 10v5" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  ads: <path d="M4 10v4h3l6 4V6l-6 4H4zM17 9a4 4 0 010 6" />,
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M9 7l1.5-3h3L15 7" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="13" height="14" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01M2 13h3M19 13h3" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
};

export function ServiceIcon({ name, className = "h-5 w-5" }: { name: IconKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}
