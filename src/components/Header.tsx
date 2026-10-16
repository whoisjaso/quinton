"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { cta, nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 40;
    if (next !== solid) setSolid(next);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid || open ? "border-b border-line bg-base/90 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b from-base/60 to-transparent"
      }`}
    >
      <div className="gutter grid h-[68px] grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="-ml-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink/85 transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Wordmark />

        <div className="flex justify-end">
          <a href={cta.href} className="btn btn-primary hidden min-h-[44px] px-5 text-sm sm:inline-flex">
            {cta.primary}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="gutter fixed inset-x-0 bottom-0 top-[68px] flex flex-col bg-base pt-10 pb-10 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-3xl tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-auto w-full">
              {cta.primary}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
