import Image from "next/image";
import { commitments } from "@/content/site";
import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

export function Conduct({
  heading,
  intro,
  image = "/images/hands-pruning.jpg",
  alt = "Gloved hands trimming an evergreen with bypass pruners",
}: {
  heading: React.ReactNode;
  intro: string;
  image?: string;
  alt?: string;
}) {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative h-[75svh] overflow-hidden lg:h-auto lg:min-h-full">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="section gutter lg:pl-[var(--space-xl)]">
        <Reveal>
          <h2 className="t-heading-xl max-w-[14ch] text-balance">{tc(heading)}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-8 max-w-[48ch] text-ink-high">{intro}</p>
        </Reveal>
        <ul className="mt-[var(--space-lg)] grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 2) * 0.08}>
              <h3 className="t-heading-md">{tc(c.title)}</h3>
              <p className="mt-2 leading-relaxed text-ink-high">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
