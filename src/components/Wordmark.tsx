import Link from "next/link";
import { brand } from "@/content/site";

export function Wordmark({ withDescriptor = false, align = "center" }: { withDescriptor?: boolean; align?: "center" | "start" }) {
  return (
    <Link href="/" aria-label={`${brand.name}, home`} className={`inline-flex flex-col leading-none ${align === "start" ? "items-start" : "items-center"}`}>
      <span
        className="text-[1.05rem] font-semibold uppercase md:text-[1.2rem]"
        style={{ letterSpacing: "0.42em", fontStretch: "125%", marginRight: "-0.42em" }}
      >
        {brand.name}
      </span>
      {withDescriptor ? (
        <span className="mt-2 text-[0.625rem] uppercase tracking-[0.28em] text-ink-medium">
          {brand.descriptor}
        </span>
      ) : null}
    </Link>
  );
}
