import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Verdict } from "@/components/Verdict";
import { PropertyTypes } from "@/components/PropertyTypes";
import { PainGrid } from "@/components/PainGrid";
import { Standard } from "@/components/Standard";
import { Conduct } from "@/components/Conduct";
import { Programs } from "@/components/Programs";
import { Faq } from "@/components/Faq";
import { Inquiry } from "@/components/Inquiry";
import { Footer } from "@/components/Footer";
import { faqs, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "Commercial exterior care",
  description:
    "Storefronts, sidewalks, facades and grounds kept customer ready on a schedule, with dated photo reporting for owners and managers.",
};

export default function Commercial() {
  return (
    <>
      <Header />
      <main>
        <Hero
          image="/images/storefront.jpg"
          alt="Painted storefront with clean display windows on a swept cobblestone street"
          objectPosition="50% 45%"
          mobilePosition="56% 50%"
          eyebrow="Commercial properties"
          headline="Your storefront is selling. Or it is not."
          sub="Power washing and grounds care that keep sidewalks, entries and storefronts customer ready, with reports for owners."
          secondary={{ label: "View Programs", href: "#programs" }}
        />

        <Verdict
          headline="Customers read the sidewalk before the sign."
          body="A dirty entrance does not show up as a complaint. It shows up as a customer who never came in, a tenant who did not renew, a review that mentions the parking lot. The research on this is consistent."
          stats={[stats.shopExterior, stats.avoidedDirty, stats.payMore, stats.officeRent]}
        />

        <PropertyTypes
          heading="Built for properties where image is revenue."
          items={[
            {
              name: "Retail and mixed use",
              stakes: "Gum, grime and stained entries quietly cut foot traffic. Frontage kept clean on a schedule keeps doors opening.",
              image: "/images/arcade-retail.jpg",
              alt: "Covered shopping arcade with lit storefronts and a patterned floor",
            },
            {
              name: "Hospitality",
              stakes: "Arrival is the first line of every review. Drives, entries, terraces and pool decks kept guest ready.",
              image: "/images/resort-pool-dusk.jpg",
              alt: "Resort pool and pavilion lit at dusk",
            },
            {
              name: "Office and corporate",
              stakes: "Quality grounds support rents and tenant retention. Plazas and walkways maintained after hours.",
              image: "/images/towers.jpg",
              alt: "Glass office towers seen from street level",
            },
            {
              name: "Multifamily and HOA",
              stakes: "Residents and boards notice everything. Common areas, entries and walkways documented every visit.",
              image: "/images/multifamily.jpg",
              alt: "Brick apartment building with balconies above a trimmed lawn",
            },
          ]}
        />

        <PainGrid
          heading="What property managers tell us they are tired of."
          intro="Low bid vendors are cheap until you count the follow up. You should not have to inspect the people you pay to inspect for you."
          items={[
            {
              pain: "Gum and grime nobody owns",
              answer: "Sidewalks, entries and pads washed on a set cadence, not when someone complains.",
            },
            {
              pain: "Crews in the way at open",
              answer: "Early morning and after close scheduling. Customers see the result, never the work.",
            },
            {
              pain: "No record for the owner or board",
              answer: "Dated before and after photos for every visit, ready to forward.",
            },
            {
              pain: "Slick, algae covered walkways",
              answer: "Organic growth removed from walking surfaces as routine, which reduces slip risk.",
            },
          ]}
        />

        <Standard
          heading="The whole exterior, under one contract."
          intro="Storefront washing, hardscape cleaning and grounds maintenance from one team, so nothing falls between vendors."
        />

        <Conduct
          heading="A vendor you do not have to manage."
          intro="Insured before day one, scheduled around your hours, reporting after every visit. The exterior stops being an item on your list."
          image="/images/modern-entry-drive.jpg"
          alt="Clean concrete drive leading to a modern commercial entrance"
        />

        <Programs
          heading="Programs for commercial properties."
          intro="Scoped on a site walk, billed at a fixed monthly figure, documented every visit."
          programs={[
            {
              name: "Storefront",
              forWho: "For single location retail, restaurants and service businesses.",
              cadence: "Weekly or biweekly, before open or after close",
              includes: [
                "Sidewalk, entry and frontage washing",
                "Gum and stain removal",
                "Planters and entry beds",
                "Photo report after every visit",
              ],
            },
            {
              name: "Property",
              forWho: "For centers, office buildings, hotels and associations.",
              cadence: "Weekly grounds, monthly or quarterly surfaces",
              includes: [
                "Full grounds maintenance",
                "Hardscape, plaza and facade cleaning",
                "Dumpster pads and service areas",
                "Monthly summary for owners and boards",
              ],
            },
            {
              name: "Restoration Visit",
              pricing: "Fixed fee, by assessment",
              forWho: "A single, complete reset before a lease up, inspection, opening or season.",
              cadence: "One visit, scoped on the site walk",
              includes: [
                "Full surface and frontage restoration",
                "Grounds correction and clearance",
                "Before and after documentation",
                "Certificate of insurance issued",
              ],
            },
          ]}
        />

        <Faq items={faqs} />

        <Inquiry
          heading="Request a walkthrough."
          sub="A site walk with you or your property manager, then a written scope and a fixed monthly figure."
          defaultType="Retail or mixed use"
        />
      </main>
      <Footer />
    </>
  );
}
