import type { Stat } from "@/content/site";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { tc } from "@/lib/titleCase";

/** The pain statement and the evidence behind it. */
export function Verdict({
  headline,
  body,
  stats,
}: {
  headline: React.ReactNode;
  body: string;
  stats: Stat[];
}) {
  return (
    <section className="gutter section">
      <Reveal>
        <h2 className="t-heading-xl max-w-[18ch] text-balance">{tc(headline)}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="t-body-lg mt-8 max-w-[60ch] text-ink-high">{body}</p>
      </Reveal>

      <dl className={`mt-[var(--space-xl)] grid grid-cols-1 gap-y-12 sm:grid-cols-2 ${stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {stats.map((s, i) => (
          <Reveal
            key={s.value + s.claim}
            delay={i * 0.08}
            className="flex flex-col border-l border-line-strong pl-6 pr-6"
          >
            <dt className="order-2 mt-4 text-[0.95rem] leading-relaxed text-ink-high">{s.claim}</dt>
            <dd className="order-1 text-[clamp(3.25rem,3.2vw+1.5rem,4.5rem)] leading-none tracking-tight">
              <CountUp value={s.value} />
            </dd>
            <dd className="order-3 mt-4">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 text-xs text-ink-medium underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-high"
              >
                {s.source}
              </a>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
