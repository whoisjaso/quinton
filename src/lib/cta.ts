import { brand, cta } from "@/content/site";

/** One label per page for the contact intent. Storefront buyers want a price, estates want a walk. */
export function ctaLabelFor(pathname: string) {
  return pathname.startsWith("/commercial") ? "Get a Quote" : cta.primary;
}

export const phoneHref = `tel:${brand.phone.replace(/[^\d+]/g, "")}`;
export const smsHref = `sms:${brand.phone.replace(/[^\d+]/g, "")}`;
