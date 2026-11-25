import { PROCESS } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="process" className="section bg-a1-paper text-a1-ink">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <Reveal>
            <p className="eyebrow text-a1-pink">How we work</p>
            <h2 className="section-title mt-4">From first call to monthly growth.</h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-[24rem]">
            <p className="text-a1-stone">The same four steps on every package, so you always know what happens next.</p>
          </Reveal>
        </div>
        <ol className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08}>
              <div className="relative h-0.5 bg-black/10">
                <span className="absolute inset-y-0 left-0 bg-a1-gradient" style={{ width: `${(i + 1) * 25}%` }} />
              </div>
              <p className="eyebrow mt-5 text-a1-pink">
                Step {i + 1} · {p.when}
              </p>
              <h3 className="mt-3 text-[1.45rem] font-bold">{p.title}</h3>
              <p className="mt-2.5 text-[0.94rem] text-a1-stone">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
