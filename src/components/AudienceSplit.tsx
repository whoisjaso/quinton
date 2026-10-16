"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const paths = [
  {
    href: "/estates",
    title: "Private Estates",
    line: "Protect the asset. Keep your time.",
    image: "/images/estate-pool-lawn.jpg",
    alt: "Modern residence with a manicured lawn and pool terrace",
    link: "Explore Estate Care",
  },
  {
    href: "/commercial",
    title: "Commercial Properties",
    line: "Your exterior is the first thing you sell.",
    image: "/images/estate-lit-terrace.jpg",
    alt: "Hospitality frontage at dusk with lit planters and clean paving",
    link: "Explore Commercial Care",
  },
];

function Tile({ p, i }: { p: (typeof paths)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.04, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Link ref={ref} href={p.href} className="group relative block overflow-hidden md:rounded-[4px]">
      <div className="relative h-[82svh] md:h-auto md:aspect-[5/6] lg:aspect-[4/4.4]">
        <motion.div className="absolute inset-[-8%_0]" style={{ scale, y }}>
          <Image
            src={p.image}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,14,18,0.9),rgba(14,14,18,0.05)_58%)]" />
      </div>
      <motion.div
        className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-10 md:p-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      >
        <h2 className="t-heading-xl text-balance">{p.title}</h2>
        <p className="t-body-lg mt-3 text-ink-high">{p.line}</p>
        <span className="link-arrow mt-6">
          {p.link} <ArrowRight size={18} weight="bold" />
        </span>
      </motion.div>
    </Link>
  );
}

export function AudienceSplit() {
  return (
    <section aria-label="Choose your property type" className="md:px-[var(--gutter)] md:pt-[var(--space-md)]">
      <div className="grid gap-px md:gap-[var(--space-md)] md:grid-cols-2">
        {paths.map((p, i) => (
          <Tile key={p.href} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
