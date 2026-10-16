import Image from "next/image";
import { brand } from "@/content/site";
import { Reveal } from "./Reveal";
import { phoneHref, smsHref } from "@/lib/cta";

/** The trust lever every buyer asked for: a real person, in his own words. */
export function Owner({ lines }: { lines: string[] }) {
  return (
    <section className="gutter section border-t border-line">
      <div className="grid gap-[var(--space-lg)] lg:grid-cols-12 lg:items-end">
        {brand.portrait ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] lg:col-span-5">
            <Image src={brand.portrait} alt={`${brand.principal}, owner`} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={90} className="object-cover" />
          </div>
        ) : null}
        <div className={brand.portrait ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-9"}>
          <Reveal>
            <p className="t-heading-xl max-w-[22ch] text-balance">&ldquo;I&rsquo;m {brand.principal}. {lines[0]}&rdquo;</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="t-body-lg mt-8 max-w-[56ch] space-y-4 text-ink-high">
              {lines.slice(1).map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </Reveal>
          {brand.phone ? (
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={phoneHref} className="btn btn-secondary">Call {brand.phone}</a>
                <a href={smsHref} className="btn btn-secondary">Text a photo</a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
