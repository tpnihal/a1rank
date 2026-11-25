import Link from "next/link";
import { NAV, PACKAGES, SITE } from "@/lib/site";
import { InstagramIcon } from "./Icons";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-a1-ash">
      <div className="wrap relative grid gap-12 pb-10 pt-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.1fr]">
        <div>
          <Link href="/" aria-label="A1 Rank home" className="text-white">
            <Logo />
          </Link>
          <p className="mt-5 max-w-[22rem] text-[0.94rem]">
            Digital marketing, websites and AI automation for brands that want to grow smarter and rank higher.
          </p>
          <dl className="mt-6 space-y-2 text-[0.94rem]">
            <div className="flex gap-3">
              <dt className="eyebrow w-20 shrink-0 pt-1 text-a1-stone">Email</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="font-semibold text-white hover:text-a1-coral">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="eyebrow w-20 shrink-0 pt-1 text-a1-stone">Instagram</dt>
              <dd>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-a1-coral">
                  <InstagramIcon className="h-4 w-4" /> {SITE.instagram}
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="eyebrow w-20 shrink-0 pt-1 text-a1-stone">Based in</dt>
              <dd className="font-semibold text-white">{SITE.location}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-a1-stone">Explore</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/website-audit" className="hover:text-white">
                Free Website Audit
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Packages">
          <p className="eyebrow text-a1-stone">Packages</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {PACKAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/contact?package=${p.slug}`} className="hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Newsletter />
      </div>

      <p className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[21vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-white/[0.045]" aria-hidden>
        A1 RANK
      </p>

      <div className="wrap relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[0.82rem]">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p>{SITE.domain}</p>
      </div>
    </footer>
  );
}
