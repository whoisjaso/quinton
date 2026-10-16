"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, Phone, X } from "@phosphor-icons/react";
import { brand, cta, nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

const ease = [0.25, 0.1, 0.25, 1] as const;
const rise = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextSolid = y > 40;
    if (nextSolid !== solid) setSolid(nextSolid);
    // Get out of the way while reading down, come back the moment they scroll up.
    const nextHidden = y > 320 && y > prev + 2;
    const show = y < prev - 2 || y <= 320;
    if (nextHidden && !hidden) setHidden(true);
    else if (show && hidden) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid || open
          ? "border-b border-line bg-base/85 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-base/60 to-transparent"
      }`}
    >
      <div className="gutter grid h-[64px] grid-cols-[1fr_auto_1fr] items-center md:h-[76px]">
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="-ml-2.5 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "list"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {open ? <X size={24} /> : <List size={24} />}
              </motion.span>
            </AnimatePresence>
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
          {brand.phone ? (
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
              aria-label={`Call ${brand.phone}`}
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center sm:hidden"
            >
              <Phone size={22} />
            </a>
          ) : null}
          <a href={cta.href} className="btn btn-primary hidden min-h-[44px] px-5 text-sm sm:inline-flex">
            {cta.primary}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: rise }}
            className="gutter fixed inset-x-0 bottom-0 top-[64px] flex h-[calc(100svh-64px)] flex-col bg-base pb-[max(28px,env(safe-area-inset-bottom))] pt-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-line">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: rise, delay: 0.12 + 0.06 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 text-[2.1rem] leading-none tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
            >
              <p className="text-sm text-ink-medium">{brand.descriptor}</p>
              <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">
                {cta.primary}
              </a>
            </motion.div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
