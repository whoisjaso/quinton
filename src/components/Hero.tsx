"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cta } from "@/content/site";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Hero({
  image,
  alt,
  headline,
  sub,
  secondary,
  eyebrow,
  objectPosition = "center",
}: {
  image: string;
  alt: string;
  headline: React.ReactNode;
  sub: string;
  secondary?: { label: string; href: string };
  eyebrow?: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,14,18,0.94)_0%,rgba(14,14,18,0.62)_40%,rgba(14,14,18,0.15)_72%,rgba(14,14,18,0.4)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(14,14,18,0.55)_0%,rgba(14,14,18,0.2)_45%,transparent_70%)]"
      />

      <motion.div style={{ opacity: fade }} className="gutter w-full pb-[clamp(56px,9vh,112px)] pt-32">
        <div className="max-w-[60rem]">
          {eyebrow ? (
            <motion.p
              className="t-label mb-6 text-ink-high"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            className="t-display text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="t-body-lg mt-6 max-w-[34rem] text-ink-high"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
          >
            {sub}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.65 }}
          >
            <a href={cta.href} className="btn btn-primary">
              {cta.primary}
            </a>
            {secondary ? (
              <a href={secondary.href} className="btn btn-secondary">
                {secondary.label}
              </a>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
