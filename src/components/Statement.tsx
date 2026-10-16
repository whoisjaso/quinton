"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Full bleed image with one sentence. A pause between dense sections. */
export function Statement({ image, alt, children }: { image: string; alt: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[86vh] items-center overflow-hidden">
      <motion.div className="absolute inset-[-10%_0] -z-10" style={{ y }}>
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(14,14,18,0.58)]" />
      <div className="gutter w-full">
        <motion.p
          className="t-display max-w-[17ch] text-balance"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.p>
      </div>
    </section>
  );
}
