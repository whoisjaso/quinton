import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cta } from "@/content/site";
import { Reveal } from "./Reveal";
import { tc } from "@/lib/titleCase";

export type Program = {
  name: string;
  forWho: string;
  cadence: string;
  includes: string[];
  /** Defaults to a fixed monthly figure. */
  pricing?: string;
};

/**
 * Programs listed like a model line: one full width row each, so the
 * reader compares by scanning down rather than across three cards.
 */
export function Programs({
  heading,
  intro,
  programs,
  note,
  ctaLabel = cta.primary,
}: {
  heading: React.ReactNode;
  intro: string;
  programs: Program[];
  note?: string;
  ctaLabel?: string;
}) {
  return (
    <section id="programs" className="gutter section scroll-mt-20">
      <Reveal>
        <h2 className="t-heading-xl max-w-[16ch] text-balance">{tc(heading)}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="t-body-lg mt-8 max-w-[58ch] text-ink-high">{intro}</p>
      </Reveal>

      <div className="mt-[var(--space-xl)]">
        {programs.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.06}
            className="grid gap-6 border-t border-line-strong py-10 md:grid-cols-12 md:gap-8 md:py-14"
          >
            <div className="md:col-span-4">
              <h3 className="t-heading-lg">{tc(p.name)}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-ink-high">{p.forWho}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm font-semibold text-ink">{p.cadence}</p>
              <ul className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-ink-high">
                {p.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end md:text-right">
              <p className="text-sm text-ink-medium">{p.pricing ?? "Fixed monthly, by assessment"}</p>
              <a href={cta.href} className="link-arrow text-ink">
                {ctaLabel} <ArrowRight size={18} weight="bold" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      {note ? <p className="mt-6 max-w-[60ch] border-t border-line-strong pt-8 text-ink-medium">{note}</p> : null}
    </section>
  );
}
