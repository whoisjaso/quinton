"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { disciplines, type Discipline } from "@/content/site";
import { tc } from "@/lib/titleCase";

const ease = [0.25, 0.1, 0.25, 1] as const;
const rise = [0.16, 1, 0.3, 1] as const;

/**
 * Phones: each discipline is a full-screen scene pinned with CSS sticky
 * inside one shared stack, so the next one slides up over it like a cut
 * in a film. The scene underneath dims and recedes as it is covered.
 */
function Scene({
  d,
  i,
  total,
  progress,
}: {
  d: Discipline;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = i === total - 1;
  // Scene i is covered while the stack scrolls from i/(total-1) to (i+1)/(total-1).
  const start = i / (total - 1);
  const end = Math.min(1, (i + 1) / (total - 1));
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.9]);
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.75]);
  const imgScale = useTransform(progress, [Math.max(0, start - 1 / (total - 1)), start], [1.15, 1]);

  return (
    <motion.article
      style={{ scale }}
      className="sticky top-0 isolate flex h-[100svh] origin-top flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ scale: imgScale }}>
        <Image src={d.image} alt={d.alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,14,18,0.97)_0%,rgba(14,14,18,0.72)_42%,rgba(14,14,18,0.1)_75%)]"
      />

      <div className="gutter relative pb-[max(96px,calc(env(safe-area-inset-bottom)+84px))]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: rise }}
        >
          <p className="text-sm font-semibold text-ink-high">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-[3.25rem] leading-none tracking-tight">{tc(d.name)}</h3>
          <p className="t-heading-md mt-4">{tc(d.line)}</p>
          <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-high">{d.body}</p>
        </motion.div>
      </div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-base" style={{ opacity: dim }} />
    </motion.article>
  );
}

function MobileStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative mt-[var(--space-xl)] lg:hidden">
      {disciplines.map((d, i) => (
        <Scene key={d.name} d={d} i={i} total={disciplines.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

export function Standard({ heading, intro }: { heading: string; intro: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="standard" className="scroll-mt-20 bg-base-raised pt-[var(--space-section)] lg:pb-[var(--space-section)]">
      <div className="gutter">
        <motion.h2
          className="t-heading-xl max-w-[16ch] text-balance"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          {tc(heading)}
        </motion.h2>
        <p className="t-body-lg mt-8 max-w-[56ch] text-ink-high">{intro}</p>
      </div>

      {/* Phones and tablets: stacked full-screen scenes */}
      <MobileStack />

      {/* Desktop: pinned image, scrolling copy */}
      <div className="gutter mt-[var(--space-xl)] hidden gap-[var(--space-lg)] lg:grid lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="sticky top-[16vh] h-[68vh] overflow-hidden rounded-[4px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              >
                <Image
                  src={disciplines[active].image}
                  alt={disciplines[active].alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 flex gap-2 p-6" aria-hidden>
              {disciplines.map((d, i) => (
                <span
                  key={d.name}
                  className={`h-[2px] w-10 transition-colors duration-500 ${i === active ? "bg-ink" : "bg-ink/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {disciplines.map((d, i) => (
            <article
              key={d.name}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`flex min-h-[62vh] flex-col justify-center transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-35"
              }`}
            >
              <h3 className="t-heading-xl">{tc(d.name)}</h3>
              <p className="t-heading-md mt-4 text-ink">{tc(d.line)}</p>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-high">{d.body}</p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.95rem] text-ink-high">
                {d.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
