"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cta } from "@/content/site";
import { titleCase } from "@/lib/titleCase";

const ease = [0.25, 0.1, 0.25, 1] as const;
const rise = [0.16, 1, 0.3, 1] as const;

export function Hero({
  image,
  alt,
  headline,
  sub,
  secondary,
  eyebrow,
  objectPosition = "center",
  mobilePosition,
}: {
  image: string;
  alt: string;
  headline: string;
  sub: string;
  secondary?: { label: string; href: string };
  eyebrow?: string;
  objectPosition?: string;
  /** Art direction for portrait screens, e.g. "62% 50%". */
  mobilePosition?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const words = titleCase(headline).split(" ");

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 3.2, ease }, opacity: { duration: 1.2, ease } }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="hero-img object-cover"
            style={{ ["--pos" as string]: objectPosition, ["--pos-m" as string]: mobilePosition ?? objectPosition }}
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,14,18,0.96)_0%,rgba(14,14,18,0.7)_34%,rgba(14,14,18,0.12)_66%,rgba(14,14,18,0.45)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgba(14,14,18,0.55)_0%,rgba(14,14,18,0.2)_45%,transparent_70%)] md:block"
      />

      <motion.div style={{ opacity: fade }} className="gutter w-full pb-[max(40px,env(safe-area-inset-bottom))] pt-32 md:pb-[clamp(56px,9vh,112px)]">
        <div className="max-w-[60rem]">
          {eyebrow ? (
            <motion.p
              className="t-label mb-5 text-ink-high"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <h1 className="t-display t-hero" aria-label={titleCase(headline)}>
            {words.map((w, i) => (
              <span key={i} aria-hidden>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease: rise, delay: 0.45 + i * 0.07 }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <motion.p
            className="t-body-lg mt-5 max-w-[34rem] text-ink-high md:mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 + words.length * 0.07 }}
          >
            {sub}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.65 + words.length * 0.07 }}
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
