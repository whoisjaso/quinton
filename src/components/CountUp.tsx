"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts a simple figure like "95%" or "12.7%" up from zero on first view. Anything else renders as is. */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.\d+)?)(%?)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [shown, setShown] = useState(match && !reduce ? (0).toFixed(decimals) : null);

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, match, reduce, target, decimals]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      {shown ?? match[1]}
      {match[2]}
    </span>
  );
}
