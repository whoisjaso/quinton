import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const paths = [
  {
    href: "/estates",
    title: "Private estates",
    line: "Protect the asset. Keep your time.",
    image: "/images/estate-pool-lawn.jpg",
    alt: "Modern residence with a manicured lawn and pool terrace",
    link: "Explore estate care",
  },
  {
    href: "/commercial",
    title: "Commercial properties",
    line: "Your exterior is the first thing you sell.",
    image: "/images/estate-lit-terrace.jpg",
    alt: "Hospitality frontage at dusk with lit planters and clean paving",
    link: "Explore commercial care",
  },
];

export function AudienceSplit() {
  return (
    <section aria-label="Choose your property type" className="gutter pt-[var(--space-md)]">
      <div className="grid gap-[var(--space-md)] md:grid-cols-2">
        {paths.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.12}>
            <Link href={p.href} className="group relative block overflow-hidden rounded-[4px]">
              <div className="relative aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/4.4]">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,14,18,0.85),rgba(14,14,18,0.05)_55%)]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-[var(--space-md)] md:p-10">
                <h2 className="t-heading-xl">{p.title}</h2>
                <p className="t-body-lg mt-3 text-ink-high">{p.line}</p>
                <span className="link-arrow mt-6">
                  {p.link} <ArrowRight size={18} weight="bold" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
