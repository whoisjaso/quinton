"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatText, Phone } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { ctaLabelFor, phoneHref, smsHref } from "@/lib/cta";
import { brand, cta } from "@/content/site";

/**
 * Thumb-reach call to action on phones. Appears once the hero has
 * scrolled away and steps aside when the form itself is on screen.
 */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const label = ctaLabelFor(usePathname());

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
          <div className="grid grid-cols-[1fr_auto_auto] gap-2">
            <a href={cta.href} className="btn btn-primary px-4">
              {label}
            </a>
            {brand.phone ? (
              <>
                <a href={phoneHref} aria-label={`Call ${brand.phone}`} className="btn btn-secondary gap-2 px-4">
                  <Phone size={18} /> Call
                </a>
                <a href={smsHref} aria-label={`Text ${brand.phone}`} className="btn btn-secondary gap-2 px-4">
                  <ChatText size={18} /> Text
                </a>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
