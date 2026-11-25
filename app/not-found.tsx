import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[80svh] place-items-center overflow-hidden bg-a1-ink px-5 pt-28 text-center">
      <div>
        <p className="grad-text font-display text-[clamp(6rem,22vw,13rem)] font-extrabold leading-none">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">This page didn&rsquo;t rank.</h1>
        <p className="mx-auto mt-3 max-w-sm text-a1-ash">The page you are looking for has moved or never existed.</p>
        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
