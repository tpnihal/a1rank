import Link from "next/link";
import { INDUSTRIES, SITE } from "@/lib/site";
import { InstagramIcon } from "./Icons";
import { Logo } from "./Logo";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Our Works", href: "/works" },
  { label: "Blogs", href: "/#blogs" },
  { label: "Packages", href: "/services#packages" },
  { label: "Free Website Audit", href: "/website-audit" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Social Media", href: "/services#social-media-management" },
  { label: "Website Design", href: "/services#website-design-development" },
  { label: "SEO & Google Maps", href: "/services#seo-google-business-profile" },
  { label: "Meta & Google Ads", href: "/services#meta-google-ads" },
  { label: "Branding & Design", href: "/services#graphic-design-branding" },
  { label: "AI Automation", href: "/services#ai-agents-automation" },
  { label: "All Services", href: "/services" },
];

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

function Column({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow !text-[0.68rem] text-a1-stone">{heading}</p>
      <ul className="mt-5 space-y-3 text-[0.94rem]">{children}</ul>
    </div>
  );
}

const link = "transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-black text-a1-ash">
      <div className="wrap grid gap-x-10 gap-y-12 pb-12 pt-16 md:pt-20 lg:grid-cols-[1.15fr_2fr]">
        <div>
          <Link href="/" aria-label="A1 Rank home" className="inline-block text-white">
            <Logo />
          </Link>
          <p className="mt-5 max-w-[21rem] text-[0.98rem] leading-relaxed">
            Digital marketing, websites and AI automation for brands that want to grow smarter and rank higher.
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`A1 Rank on Instagram (${SITE.instagram})`}
            className="mt-6 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-transparent hover:bg-a1-gradient"
          >
            <InstagramIcon className="h-[1.1rem] w-[1.1rem]" />
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <Column heading="Company">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column heading="Services">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column heading="Industries">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className={link}>
                  {i.name}
                </Link>
              </li>
            ))}
          </Column>
          <Column heading="Contact">
            <li>
              <Link href="/contact" className={link}>
                Get a Quote
              </Link>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={`${link} break-all`}>
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
                {SITE.instagram}
              </a>
            </li>
            <li className="italic text-a1-stone">{SITE.location}</li>
          </Column>
        </nav>
      </div>

      <div className="wrap">
        <details className="group rounded-[1.75rem] border border-white/15 bg-white/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-white [&::-webkit-details-marker]:hidden">
            Digital marketing across Dubai &amp; the UAE
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 text-lg leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <div className="border-t border-white/10 px-6 py-5">
            <p className="max-w-[40rem] text-[0.92rem]">We are based in Dubai and work with businesses across the UAE, on site where it helps and online everywhere else.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {EMIRATES.map((e) => (
                <li key={e} className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.84rem] font-semibold">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-8 text-[0.82rem] text-a1-stone">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/privacy-policy" className={link}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className={link}>
              Terms of Use
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
