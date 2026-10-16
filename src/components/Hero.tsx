"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { brand, cta } from "@/content/site";
import { phoneHref } from "@/lib/cta";
import { titleCase } from "@/lib/titleCase";
import { ArtImage } from "./ArtImage";


export function Hero({
  image,
  alt,
  headline,
  sub,
  secondary,
  eyebrow,
  objectPosition = "center",
  ctaLabel,
}: {
  image: string;
  alt: string;
  headline: string;
  sub: string;
  secondary?: { label: string; href: string };
  eyebrow?: string;
  objectPosition?: string;
  /** kept for page compatibility; phones use a dedicated portrait crop */
  mobilePosition?: string;
  /** page-specific label for the primary action */
  ctaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1, 0]);
  const words = titleCase(headline).split(" ");

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={false}
        >
          <ArtImage
            src={image}
            alt={alt}
            priority
            sizes="120vw"
            className="hero-img"
            style={{ ["--pos" as string]: objectPosition, ["--pos-m" as string]: "50% 50%" }}
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
            <p className="hero-in t-label mb-5 text-ink-high" style={{ animationDelay: "0.05s" }}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className="t-display t-hero" aria-label={titleCase(headline)}>
            {words.map((w, i) => (
              <span key={i} aria-hidden>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="hero-word inline-block" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                    {w}
                  </span>
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="hero-in t-body-lg mt-5 max-w-[34rem] text-ink-high md:mt-6" style={{ animationDelay: `${0.2 + words.length * 0.05}s` }}>
            {sub}
          </p>
          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row md:mt-10" style={{ animationDelay: `${0.3 + words.length * 0.05}s` }}>
            <a href={cta.href} className="btn btn-primary">
              {ctaLabel ?? cta.primary}
            </a>
            {secondary ? (
              <a href={secondary.href} className="btn btn-secondary">
                {secondary.label}
              </a>
            ) : null}
          </div>
          {brand.phone ? (
            <p className="hero-in mt-5 text-sm text-ink-high" style={{ animationDelay: `${0.4 + words.length * 0.05}s` }}>
              Or call or text Quinton directly:{" "}
              <a href={phoneHref} className="font-semibold text-ink underline underline-offset-4">
                {brand.phone}
              </a>
            </p>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
