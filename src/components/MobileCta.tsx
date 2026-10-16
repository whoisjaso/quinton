"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { brand, cta } from "@/content/site";

/**
 * Thumb-reach call to action on phones. Appears once the hero has
 * scrolled away and steps aside when the form itself is on screen.
 */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.getElementById("walkthrough");
    const io = form
      ? new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" })
      : null;
    if (form && io) io.observe(form);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !atForm;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-base/80 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
        >
          <div className="flex gap-2">
            <a href={cta.href} className="btn btn-primary flex-1">
              {cta.primary}
            </a>
            {brand.phone ? (
              <a
                href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
                aria-label={`Call ${brand.phone}`}
                className="btn btn-secondary w-[52px] px-0"
              >
                <Phone size={20} />
              </a>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
