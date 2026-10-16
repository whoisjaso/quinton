import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Verdict } from "@/components/Verdict";
import { Standard } from "@/components/Standard";
import { Materials } from "@/components/Materials";
import { Conduct } from "@/components/Conduct";
import { Statement } from "@/components/Statement";
import { Programs } from "@/components/Programs";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Inquiry } from "@/components/Inquiry";
import { Footer } from "@/components/Footer";
import { brand, faqs, stats } from "@/content/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero
          image="/images/hero-estate-dusk.jpg"
          alt="Modern residence at dusk behind a level, freshly cut lawn and a mature eucalyptus"
          objectPosition="50% 60%"
          mobilePosition="42% 50%"
          headline="Your property speaks before you do."
          sub="Lawn care, power washing and storefront cleaning, kept to a standard most crews never reach. One team. One point of contact."
          secondary={{ label: "See the Standard", href: "#standard" }}
        />

        <AudienceSplit />

        <Verdict
          headline="Judgment happens at the curb."
          body="Guests, buyers, tenants and customers decide what a property is worth before they reach the door. A stained walkway or a ragged hedge line reads as neglect, and neglect reads as risk. The numbers agree."
          stats={[stats.shopExterior, stats.avoidedDirty, stats.homeValue, stats.officeRent]}
        />

        <Standard
          heading="Four disciplines. One standard."
          intro={`Most providers mow, or wash, or trim. ${brand.name} owns the entire exterior, so nothing falls between two vendors and nothing is left for you to chase.`}
        />

        <Materials />

        <Conduct
          heading="How we show up matters as much as the work."
          intro="High value properties are run on trust. The crew on your grounds behaves like it belongs there, because it has earned the right to be there."
        />

        <Statement image="/images/turf-dew.jpg" alt="Morning dew on dense green turf">
          Maintenance is a schedule. A standard is a decision.
        </Statement>

        <Programs
          heading="Programs, not visits."
          intro="Every engagement starts with a walkthrough and ends with a written plan at a fixed monthly figure. No surprise invoices, no mid season changes."
          programs={[
            {
              name: "Estate Program",
              forWho: "For private residences where the grounds are part of how you live and entertain.",
              cadence: "Weekly or biweekly, year round",
              includes: [
                "Turf, hedges, beds and hand edging",
                "Scheduled soft washing of stone, facades and terraces",
                "Pre event detailing on request",
                "Photo report after every visit",
              ],
            },
            {
              name: "Commercial Program",
              forWho: "For storefronts, hospitality, offices and associations where the exterior affects revenue.",
              cadence: "Weekly, biweekly or monthly, after hours available",
              includes: [
                "Sidewalks, entries and storefront frontage",
                "Gum, oil and stain removal",
                "Grounds and planter maintenance",
                "Dated reports for owners and boards",
              ],
            },
            {
              name: "Restoration Visit",
              pricing: "Fixed fee, by assessment",
              forWho: "A single, complete reset of the property. Most clients start here.",
              cadence: "One visit, scoped after the walkthrough",
              includes: [
                "Full surface wash and hardscape restoration",
                "Hedge, bed and turf correction",
                "Debris and seasonal clearance",
                "Before and after documentation",
              ],
            },
          ]}
          note="Route capacity is finite. New programs are scheduled in the order walkthroughs are completed."
        />

        <Process heading="Four steps, then you stop thinking about it." />

        <Faq items={faqs} />

        <Inquiry
          heading="Request a walkthrough."
          sub="Thirty minutes on the property. A written plan and a fixed monthly figure. No obligation."
        />
      </main>
      <Footer />
    </>
  );
}
