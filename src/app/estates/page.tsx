import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PainGrid } from "@/components/PainGrid";
import { Verdict } from "@/components/Verdict";
import { Standard } from "@/components/Standard";
import { Moments } from "@/components/Moments";
import { Conduct } from "@/components/Conduct";
import { Programs } from "@/components/Programs";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Inquiry } from "@/components/Inquiry";
import { Footer } from "@/components/Footer";
import { brand, faqs, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "Private estate care",
  description:
    "Grounds and exterior surfaces for private estates, maintained by one accountable team with a report after every visit.",
};

export default function Estates() {
  return (
    <>
      <Header />
      <main>
        <Hero
          image="/images/modern-dusk-lawn.jpg"
          alt="Contemporary home at dusk with lit windows above a sloped, manicured lawn"
          objectPosition="50% 55%"
          mobilePosition="48% 50%"
          eyebrow="Private estates"
          headline="The estate, handled."
          sub="Lawn care, hedges and power washing handled by one accountable team, so you never manage a crew again."
          secondary={{ label: "View Programs", href: "#programs" }}
        />

        <PainGrid
          heading="You did not buy this property to supervise it."
          intro="Most owners end up managing three vendors, chasing two of them and apologizing for one. That is the job we take off your plate."
          items={[
            {
              pain: "Crews that do not show",
              answer: "A fixed schedule, kept. If weather moves a visit, you hear it from us first.",
            },
            {
              pain: "A new face every week",
              answer: "The same crew learns your property, your preferences and your gate.",
            },
            {
              pain: "Juggling a mower, a washer and a trimmer",
              answer: "One team owns the full exterior. One call, one invoice.",
            },
            {
              pain: "Finding out from a guest",
              answer: "Photo reports after each visit, so you see issues before anyone else does.",
            },
          ]}
        />

        <Verdict
          headline="The grounds are part of the asset."
          body="Landscape condition is priced in by every buyer, appraiser and guest who walks the drive. Keeping it at its best is not decoration. It is how the value of the property is protected."
          stats={[stats.homeValue, stats.lawnRecovery, stats.contractorProblems]}
        />

        <Standard
          heading="Every surface. Every line. Every visit."
          intro="Turf, hedges, beds, stone, facades and terraces, held to one standard by one team that knows the property."
        />

        <Moments
          items={[
            {
              title: "Before the guests arrive",
              body: "Hosting a dinner, a fundraiser or family for the holidays? Pre event detailing puts every terrace, path and bed in order the day before.",
              image: "/images/hardscape-pool-deck.jpg",
              alt: "Spotless pool terrace and spa at sunset",
            },
            {
              title: "While you are away",
              body: "The program runs whether you are home or not. You receive photos of every visit, wherever you are.",
              image: "/images/estate-classic-lawn.jpg",
              alt: "White estate home with a wraparound porch and a wide, even lawn",
            },
          ]}
        />

        <Conduct
          heading="Discretion is part of the service."
          intro={`The people on your property are vetted, uniformed and quiet. ${brand.principal} is your direct line, not a dispatcher.`}
          image="/images/estate-sunset.jpg"
          alt="Timber estate home at sunset above a broad, even lawn"
        />

        <Programs
          heading="Three levels of estate care."
          intro="Each program is scoped on a walkthrough and billed as a fixed monthly figure. Move between levels as your needs change."
          programs={[
            {
              name: "Residence",
              forWho: "For homes that need impeccable grounds, kept consistently.",
              cadence: "Weekly in season, biweekly off season",
              includes: [
                "Turf care, hand edging and blow down",
                "Hedge and shrub shaping",
                "Bed maintenance and seasonal mulch",
                "Two surface washes per year",
              ],
            },
            {
              name: "Estate",
              forWho: "For larger properties with stone, terraces and pool surrounds.",
              cadence: "Weekly, year round",
              includes: [
                "Everything in Residence",
                "Quarterly soft washing of stone, facades and decks",
                "Gutter and drain clearing",
                "Photo report after every visit",
              ],
            },
            {
              name: "Estate Concierge",
              forWho: "For owners who entertain, travel, or simply want the exterior fully off their mind.",
              cadence: "Weekly, with priority scheduling",
              includes: [
                "Everything in Estate",
                "Pre event detailing on short notice",
                "Exterior checks while you are away",
                "Coordination with your other exterior vendors",
              ],
            },
          ]}
          note="We take on a limited number of estates per route so the standard never slips."
        />

        <Process heading="Four steps to an exterior you never think about." />

        <Faq items={faqs} />

        <Inquiry
          heading="Request a walkthrough."
          sub="We walk the property with you or your estate manager, then send a written plan and a fixed monthly figure."
          defaultType="Private estate"
        />
      </main>
      <Footer />
    </>
  );
}
