import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  /** Optional background photo, faded into the dark band. */
  image?: string;
};

/** Dark header band used at the top of every inner page. */
export function PageHero({ eyebrow, title, lede, crumbs, children, aside, image }: Props) {
  return (
    <section className="grain relative isolate overflow-hidden bg-a1-ink pb-16 pt-32 md:pb-24 md:pt-44">
      {image ? (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]" aria-hidden>
          <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover opacity-30 lg:opacity-45" />
          <span className="absolute inset-0 bg-gradient-to-r from-a1-ink via-a1-ink/75 to-a1-ink/20" />
          <span className="absolute inset-0 bg-gradient-to-t from-a1-ink via-transparent to-a1-ink/70" />
        </div>
      ) : null}
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_20%,#000_5%,transparent_65%)]" aria-hidden />
      <div className="absolute -right-48 -top-48 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(236,37,99,0.32),rgba(239,82,69,0.08)_45%,transparent_70%)]" aria-hidden />
      <div className={`wrap relative z-10 grid items-end gap-12 ${aside ? "lg:grid-cols-[1.25fr_0.75fr]" : ""}`}>
        <div>
          {crumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="eyebrow flex flex-wrap items-center gap-2 text-a1-stone">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-a1-ash">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <p className="eyebrow text-a1-coral">{eyebrow}</p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,6.2vw,5rem)] font-extrabold leading-[0.98]">{title}</h1>
          {lede ? <p className="mt-6 max-w-[38rem] text-[1.06rem] text-a1-ash md:text-[1.15rem]">{lede}</p> : null}
          {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
