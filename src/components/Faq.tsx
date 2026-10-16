import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="gutter section grid gap-[var(--space-lg)] lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <h2 className="t-heading-xl">Questions, answered plainly.</h2>
      </Reveal>
      <div className="lg:col-span-7 lg:col-start-6">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-line-strong">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 text-left">
              <span className="t-heading-md">{f.q}</span>
              <Plus size={22} className="faq-icon shrink-0 text-ink-high" />
            </summary>
            <p className="max-w-[60ch] pb-8 leading-relaxed text-ink-high">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
