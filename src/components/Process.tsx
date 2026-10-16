import { process } from "@/content/site";
import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

export function Process({ heading }: { heading: React.ReactNode }) {
  return (
    <section className="gutter section bg-base-raised">
      <Reveal>
        <h2 className="t-heading-xl max-w-[18ch] text-balance">{tc(heading)}</h2>
      </Reveal>
      <ol className="no-scrollbar -mx-[var(--gutter)] mt-[var(--space-xl)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-8" style={{ scrollPaddingInline: "var(--gutter)" }}>
        {process.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.1} className="w-[78vw] shrink-0 snap-start border-t-2 border-ink pt-6 sm:w-auto">
            <h3 className="t-heading-lg">{tc(p.title)}</h3>
            <p className="mt-4 max-w-[30ch] leading-relaxed text-ink-high">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
