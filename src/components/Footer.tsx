import Link from "next/link";
import { brand, nav } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="gutter border-t border-line pb-28 pt-[var(--space-xl)] md:pb-10">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-start">
          <div className="-ml-0">
            <Wordmark withDescriptor align="start" />
          </div>
          {brand.serviceArea ? <p className="mt-8 text-ink-high">Serving {brand.serviceArea}.</p> : null}
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[0.95rem]">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-ink-high transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
          {brand.phone ? (
            <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="text-ink-high hover:text-ink">
              {brand.phone}
            </a>
          ) : null}
          {brand.email ? (
            <a href={`mailto:${brand.email}`} className="text-ink-high hover:text-ink">
              {brand.email}
            </a>
          ) : null}
        </nav>
      </div>
      <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-medium sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {brand.legalName}
        </p>
        <p>{brand.insuredStatement}</p>
      </div>
    </footer>
  );
}
