"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { disciplines } from "@/content/site";

const ease = [0.25, 0.1, 0.25, 1] as const;

/**
 * Pinned image on the left cross-fades as each discipline on the right
 * reaches the middle of the viewport. On small screens each discipline
 * carries its own image inline.
 */
export function Standard({ heading, intro }: { heading: React.ReactNode; intro: string }) {
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
    <section id="standard" className="section scroll-mt-20 bg-base-raised">
      <div className="gutter">
        <h2 className="t-heading-xl max-w-[16ch] text-balance">{heading}</h2>
        <p className="t-body-lg mt-8 max-w-[56ch] text-ink-high">{intro}</p>
      </div>

      <div className="gutter mt-[var(--space-xl)] grid gap-[var(--space-lg)] lg:grid-cols-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-[calc(50vh-34vh)] h-[68vh] overflow-hidden rounded-[4px]">
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
              className={`flex flex-col justify-center py-12 transition-opacity duration-700 lg:min-h-[62vh] lg:py-0 ${
                i === active ? "lg:opacity-100" : "lg:opacity-35"
              }`}
            >
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[4px] lg:hidden">
                <Image src={d.image} alt={d.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <h3 className="t-heading-xl">{d.name}</h3>
              <p className="t-heading-md mt-4 text-ink">{d.line}</p>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-ink-high">{d.body}</p>
              <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-line pt-6 text-[0.95rem] text-ink-high sm:grid-cols-2">
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
