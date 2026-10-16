import Image from "next/image";
import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

type Kind = { name: string; stakes: string; image: string; alt: string };

/** Horizontal scroll-snap rail: each property type and what is at stake for it. */
export function PropertyTypes({ heading, items }: { heading: React.ReactNode; items: Kind[] }) {
  return (
    <section className="section bg-base-raised">
      <Reveal className="gutter">
        <h2 className="t-heading-xl max-w-[16ch] text-balance">{tc(heading)}</h2>
      </Reveal>
      <ul
        className="no-scrollbar mt-[var(--space-xl)] flex snap-x snap-mandatory gap-[var(--space-md)] overflow-x-auto px-[var(--gutter)] pb-2"
        style={{ scrollPaddingInline: "var(--gutter)" }}
      >
        {items.map((k) => (
          <li key={k.name} className="w-[82vw] shrink-0 snap-start sm:w-[56vw] lg:w-[30vw]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
              <Image src={k.image} alt={k.alt} fill sizes="(min-width: 1024px) 30vw, 82vw" className="object-cover" />
            </div>
            <h3 className="t-heading-lg mt-6">{tc(k.name)}</h3>
            <p className="mt-3 max-w-[40ch] leading-relaxed text-ink-high">{k.stakes}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
