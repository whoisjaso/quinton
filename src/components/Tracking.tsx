"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
export const ATTRIBUTION_KEY = "q_attribution";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** First-touch ad attribution for the session, PageView on every route, Contact on call and text taps. */
export function Tracking() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(ATTRIBUTION_KEY)) {
        const params = new URLSearchParams(window.location.search);
        const data: Record<string, string> = { landing_page: window.location.pathname, referrer: document.referrer };
        for (const k of KEYS) {
          const v = params.get(k);
          if (v) data[k] = v;
        }
        sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
        if (data.fbclid) document.cookie = `_fbc=fb.1.${Date.now()}.${data.fbclid}; path=/; max-age=7776000; SameSite=Lax`;
      }
    } catch {
      /* storage blocked: the form falls back to the current URL */
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:") || href.startsWith("sms:")) {
        window.fbq?.("track", "Contact", { content_name: href.startsWith("tel:") ? "call" : "text" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false; // the base pixel script already sent the first PageView
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
