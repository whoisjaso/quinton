"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { brand, cta } from "@/content/site";
import { ATTRIBUTION_KEY } from "./Tracking";
import { tc } from "@/lib/titleCase";

type Status = "idle" | "sending" | "sent" | "error";

const serviceOptions = [
  "Full grounds program",
  "Pressure and soft washing",
  "Storefront and walkways",
  "Hedges and beds",
  "Seasonal cleanup",
  "Pre event detailing",
];

const estateTypes = ["Private estate", "Residence", "Other"];
const commercialTypes = ["Retail or restaurant", "Retail center or mixed use", "Hospitality", "Office", "Multifamily or HOA", "Other"];

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];


const field =
  "w-full rounded-[4px] border border-line-strong bg-base px-4 py-3.5 text-ink placeholder:text-ink-medium transition-colors duration-300 hover:border-ink-medium focus:border-ink focus:outline-none";

export function Inquiry({
  heading,
  sub,
  defaultType,
  variant = "general",
  ctaLabel = cta.primary,
}: {
  heading: React.ReactNode;
  sub: string;
  defaultType?: string;
  variant?: "general" | "estate" | "commercial";
  ctaLabel?: string;
}) {
  const propertyTypes = variant === "estate" ? estateTypes : variant === "commercial" ? commercialTypes : [...estateTypes.slice(0, 1), ...commercialTypes];
  const notesHint =
    variant === "commercial"
      ? "Number of sites, best time to come, gum or grease spots, a deadline. Optional."
      : "Gate codes, timing, an upcoming event. Optional.";
  const [status, setStatus] = useState<Status>("idle");
  const [services, setServices] = useState<string[]>(variant === "commercial" ? ["Storefront and walkways"] : []);
  const doneRef = useRef<HTMLDivElement>(null);
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    // first-touch attribution saved by <Tracking />, falling back to this URL
    const found: Record<string, string> = {};
    try {
      Object.assign(found, JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}"));
    } catch {
      /* ignore */
    }
    const params = new URLSearchParams(window.location.search);
    for (const k of utmKeys) {
      const v = params.get(k);
      if (v && !found[k]) found[k] = v;
    }
    found.landing_page ??= window.location.pathname;
    found.form_page = window.location.pathname;
    setAttribution(found);
  }, []);

  const toggle = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    const eventId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, services, ...attribution, event_id: eventId }),
      });
      if (!res.ok) throw new Error(String(res.status));
      window.fbq?.("track", "Lead", { content_category: String(data.propertyType ?? "") }, { eventID: eventId });
      setStatus("sent");
      requestAnimationFrame(() => {
        const el = document.getElementById("walkthrough");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => doneRef.current?.focus(), 400);
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="walkthrough" className="section scroll-mt-16 border-t border-line">
      <div className="gutter grid gap-[var(--space-lg)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="t-heading-xl max-w-[12ch] text-balance">{tc(heading)}</h2>
          <p className="t-body-lg mt-8 max-w-[40ch] text-ink-high">{sub}</p>
          <dl className="mt-10 space-y-5 text-[0.95rem]">
            <div>
              <dt className="text-ink-medium">Response</dt>
              <dd className="mt-1">A reply {brand.responseWindow}.</dd>
            </div>
            {brand.phone ? (
              <div>
                <dt className="text-ink-medium">Call or text Quinton</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                  <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-4">
                    {brand.phone}
                  </a>
                  <a href={`sms:${brand.phone.replace(/[^\d+]/g, "")}`} className="text-ink-high underline underline-offset-4">
                    Text a photo
                  </a>
                </dd>
              </div>
            ) : null}
            {brand.serviceArea ? (
              <div>
                <dt className="text-ink-medium">Service area</dt>
                <dd className="mt-1">{brand.serviceArea}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-ink-medium">Coverage</dt>
              <dd className="mt-1">{brand.insuredStatement}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                ref={doneRef}
                tabIndex={-1}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[420px] flex-col justify-center rounded-[4px] border border-line-strong p-10"
                role="status"
              >
                <CheckCircle size={40} weight="light" />
                <p className="t-heading-lg mt-6">Request Received.</p>
                <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-high">
                  Quinton will call you personally {brand.responseWindow}
                  {brand.phone ? `, from ${brand.phone}` : ""}. Want it faster? Text him a photo of the property.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold">Full name</label>
                  <input id="name" name="name" required autoComplete="name" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold">Email <span className="font-normal text-ink-medium">(optional)</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-sm font-semibold">Property ZIP code</label>
                  <input id="location" name="location" required autoComplete="postal-code" inputMode="numeric" className={field} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="propertyType" className="text-sm font-semibold">Property type</label>
                  <select id="propertyType" name="propertyType" defaultValue={defaultType ?? ""} required className={field}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {propertyTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-semibold">What needs attention</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {serviceOptions.map((s) => {
                      const on = services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(s)}
                          className={`rounded-[4px] border px-4 py-2.5 text-sm transition-colors duration-300 ${
                            on ? "border-ink bg-ink text-base" : "border-line-strong text-ink-high hover:border-ink-medium"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="notes" className="text-sm font-semibold">Anything we should know</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className={field}
                  />
                  <p className="text-xs text-ink-medium">{notesHint}</p>
                </div>
                <div aria-hidden className="absolute left-[-9999px]">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                  <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                    {status === "sending" ? <CircleNotch size={18} className="animate-spin" /> : null}
                    {ctaLabel}
                  </button>
                  {status === "error" ? (
                    <p className="text-sm text-[#ff8a8f]" role="alert">
                      That did not send. Please try again{brand.phone ? ` or call ${brand.phone}` : ""}.
                    </p>
                  ) : (
                    <p className="text-sm text-ink-medium">No obligation. Your details stay private.</p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
