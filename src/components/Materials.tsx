import { materials } from "@/content/site";

/** One marquee on the page: the range of surfaces handled correctly. */
export function Materials() {
  const row = [...materials, ...materials];
  return (
    <section aria-label="Surfaces we maintain" className="overflow-hidden border-y border-line py-10">
      <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
        {row.map((m, i) => (
          <span
            key={i}
            aria-hidden={i >= materials.length}
            className="text-[clamp(1.75rem,2vw+1rem,3rem)] tracking-tight text-ink-medium"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}
