import { ArtImage } from "./ArtImage";
import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

type Moment = { title: string; body: string; image: string; alt: string };

/** Two asymmetric image tiles for the moments a client actually cares about. */
export function Moments({ items }: { items: [Moment, Moment] }) {
  return (
    <section className="gutter pb-[var(--space-section)]">
      <div className="grid gap-[var(--space-md)] lg:grid-cols-12">
        {items.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.12} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-[var(--space-xl)]"}>
            <div className={`relative overflow-hidden rounded-[4px] ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
              <ArtImage src={m.image} alt={m.alt} sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <h3 className="t-heading-lg mt-8">{tc(m.title)}</h3>
            <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-high">{m.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
