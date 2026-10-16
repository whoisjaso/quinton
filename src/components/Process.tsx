import { process } from "@/content/site";
import { Reveal } from "./Reveal";

export function Process({ heading }: { heading: React.ReactNode }) {
  return (
    <section className="gutter section bg-base-raised">
      <Reveal>
        <h2 className="t-heading-xl max-w-[18ch] text-balance">{heading}</h2>
      </Reveal>
      <ol className="mt-[var(--space-xl)] grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {process.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.1} className="border-t-2 border-ink pt-6">
            <h3 className="t-heading-lg">{p.title}</h3>
            <p className="mt-4 max-w-[30ch] leading-relaxed text-ink-high">{p.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
