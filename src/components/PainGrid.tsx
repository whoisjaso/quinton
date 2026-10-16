import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

/** Names the reader's frustrations in their own words, then answers each. */
export function PainGrid({
  heading,
  intro,
  items,
}: {
  heading: React.ReactNode;
  intro: string;
  items: { pain: string; answer: string }[];
}) {
  return (
    <section className="gutter section">
      <div className="grid gap-[var(--space-lg)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="t-heading-xl max-w-[14ch] text-balance">{tc(heading)}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-8 max-w-[44ch] text-ink-high">{intro}</p>
          </Reveal>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {items.map((it, i) => (
            <Reveal as="li" key={it.pain} delay={(i % 2) * 0.08}>
              <p className="flex items-baseline gap-3 t-heading-md text-ink-high"><span aria-hidden className="inline-block h-px w-6 shrink-0 translate-y-[-0.3em] bg-ink-medium" />{it.pain}</p>
              <p className="mt-3 leading-relaxed text-ink">{it.answer}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
