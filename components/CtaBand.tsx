import Link from "next/link";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

type Props = { title: React.ReactNode; text: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } };

/** Closing gradient band with one clear next step. */
export function CtaBand({
  title,
  text,
  primary = { label: "Get a Quote", href: "/contact" },
  secondary = { label: "Run a Free Website Audit", href: "/website-audit" },
}: Props) {
  return (
    <section className="bg-a1-ink py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-a1-gradient px-6 py-12 shadow-glow-lg md:px-14 md:py-16">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" aria-hidden />
            <div className="relative flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-[40rem]">
                <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1]">{title}</h2>
                <p className="mt-4 text-[1.05rem] text-white/90">{text}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={primary.href} className="btn-light">
                  {primary.label} <ArrowRight />
                </Link>
                <Link href={secondary.href} className="btn text-white ring-1 ring-inset ring-white/60 hover:bg-white/15">
                  {secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
