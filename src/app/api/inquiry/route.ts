import { NextResponse } from "next/server";
import { brand } from "@/content/site";

/*
  Delivery options, first match wins:
  1. INQUIRY_WEBHOOK_URL: POSTs the JSON to any webhook (n8n, Zapier, Make, a CRM).
  2. RESEND_API_KEY + INQUIRY_TO_EMAIL: sends a plain email through Resend.
  3. Neither set: logs the lead to the server console (local development).
*/

const MAX = 2000;
const SERVICES = new Set(["Full grounds program", "Pressure and soft washing", "Storefront and walkways", "Hedges and beds", "Seasonal cleanup", "Pre event detailing"]);
const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : undefined);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 16_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    phone: clean(body.phone),
    email: clean(body.email),
    location: clean(body.location),
    propertyType: clean(body.propertyType),
    services: Array.isArray(body.services) ? body.services.map(clean).filter((v): v is string => !!v && SERVICES.has(v)).slice(0, 8) : [],
    notes: clean(body.notes),
    landingPage: clean(body.landing_page),
    formPage: clean(body.form_page),
    referrer: clean(body.referrer),
    eventId: clean(body.event_id),
    utm: Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]
        .map((k) => [k, clean(body[k])])
        .filter(([, v]) => v),
    ),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }
  if ((lead.phone.match(/\d/g) ?? []).length < 10) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 });
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  try {
    const hook = process.env.INQUIRY_WEBHOOK_URL;
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_TO_EMAIL;

    if (hook) {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } else if (resendKey && to) {
      const lines = Object.entries(lead).map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`);
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL ?? "onboarding@resend.dev",
          to,
          ...(lead.email ? { reply_to: lead.email } : {}),
          subject: `Walkthrough request: ${lead.propertyType ?? "property"} in ${lead.location ?? "unknown"}`,
          text: `New ${brand.name} inquiry\n\n${lines.join("\n")}`,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
    } else if (process.env.NODE_ENV === "production" && !process.env.ALLOW_LOG_ONLY_LEADS) {
      // never tell a visitor "received" when nobody will see it; the form then shows the phone number
      console.error("[inquiry] no delivery configured", JSON.stringify(lead));
      return NextResponse.json({ ok: false, error: "delivery_not_configured" }, { status: 503 });
    } else {
      console.log("[inquiry]", JSON.stringify(lead));
    }
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
