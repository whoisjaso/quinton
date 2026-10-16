/*
  Single source of truth for brand facts. Edit these before launch.
  Anything left empty is simply not rendered, so the site never shows
  placeholder text to a visitor.
*/
export const brand = {
  name: "Quinton",
  descriptor: "Estate & Commercial Grounds",
  legalName: "Quinton Estate & Commercial Grounds",
  /** Leader of the business, used in copy about the point of contact. */
  principal: "Quinton",
  /** e.g. "Greater Houston" or "Dallas, Highland Park and University Park". */
  serviceArea: "Greater Houston",
  /** Display phone, e.g. "(713) 555-0142". Leave empty to hide. */
  phone: "(281) 788-6172",
  /** Optional portrait of Quinton on a real job, e.g. "/images/quinton.jpg". Shown in the owner section when set. */
  portrait: "",
  email: "",
  /** Set when there are real reviews or credentials to show. */
  insuredStatement: "Fully insured. Certificates issued on request.",
  /** Promise in the inquiry section. Keep it true. */
  responseWindow: "within one business day",
  siteUrl: "https://quinton-iota.vercel.app",
};

export const nav = [
  { href: "/estates", label: "Private Estates" },
  { href: "/commercial", label: "Commercial" },
  { href: "/#standard", label: "The Standard" },
  { href: "/#programs", label: "Programs" },
];

export const cta = {
  /** One label for the contact intent, used everywhere. */
  primary: "Request a Walkthrough",
  href: "#walkthrough",
};

export type Stat = {
  value: string;
  claim: string;
  source: string;
  href: string;
};

export const stats = {
  shopExterior: {
    value: "95%",
    claim: "of consumers say a business's exterior shapes where they choose to shop.",
    source: "Morpace consumer survey",
    href: "https://www.retailcustomerexperience.com/articles/report-consumers-influenced-by-a-retailers-physical-appearance/",
  },
  avoidedDirty: {
    value: "52%",
    claim: "have avoided a business entirely because its exterior looked dirty.",
    source: "Morpace consumer survey",
    href: "https://www.retailcustomerexperience.com/articles/report-consumers-influenced-by-a-retailers-physical-appearance/",
  },
  homeValue: {
    value: "12.7%",
    claim: "higher sale price for well landscaped homes, at the top of the measured range.",
    source: "Virginia Tech Cooperative Extension",
    href: "https://pubs.ext.vt.edu/426/426-087/426-087.html",
  },
  officeRent: {
    value: "7%",
    claim: "higher office rents where the landscaping is high quality.",
    source: "University of Washington, Green Cities research",
    href: "https://depts.washington.edu/hhwb/datasheets/GCGH_datasheet.Economics.pdf",
  },
  landscapeUpgrade: {
    value: "10%",
    claim: "added value, or more, when a landscape goes from average to excellent.",
    source: "University of Washington and Virginia Tech",
    href: "https://mynorthwest.com/uncategorized/uw-virginia-tech-studies-show-payoff-for-landscaping/8268",
  },
  contractorProblems: {
    value: "50%",
    claim: "of homeowners who recently hired a contractor reported problems or were unhappy.",
    source: "Angie's List and Harris Poll",
    href: "https://www.wdef.com/?p=6726",
  },
  payMore: {
    value: "9 to 12%",
    claim: "more that shoppers say they would pay in landscaped, tree lined districts.",
    source: "University of Washington, Kathleen Wolf",
    href: "https://research.fs.usda.gov/treesearch/34947",
  },
  hotelRebook: {
    value: "85%",
    claim: "would not rebook a hotel with dirty entryways or floors.",
    source: "Harris Interactive for Cintas",
    href: "https://casinoenterprisemanagement.com/newswire/poll-reveals-85-percent-americans-would-never-rebook-hotel-dirty-floors",
  },
} satisfies Record<string, Stat>;

export type Discipline = {
  name: string;
  line: string;
  body: string;
  items: string[];
  image: string;
  alt: string;
};

export const disciplines: Discipline[] = [
  {
    name: "Grounds",
    line: "Mowing, edging and hedges held to a line.",
    body: "Lawns mowed at the right height for the season and the grass. Edges cut by hand at every visit. Hedges shaped to a consistent profile, beds kept defined and weed free.",
    items: ["Lawn mowing and striping", "Hand edging", "Hedge and shrub shaping", "Bed definition and mulch"],
    image: "/images/turf-macro.jpg",
    alt: "Close view of dense, freshly cut turf in front of a modern building",
  },
  {
    name: "Surfaces",
    line: "Power washing, matched to the material.",
    body: "Stone, brick, stucco, pavers and painted finishes are cleaned with the right pressure and the right chemistry. Nothing etched, stripped or streaked.",
    items: ["Power washing and soft washing", "Paver, travertine and stone decks", "Driveways and motor courts", "Pool surrounds and terraces"],
    image: "/images/hardscape-pool-deck.jpg",
    alt: "Clean stone pool deck and spa beside a stucco residence at sunset",
  },
  {
    name: "Frontage",
    line: "Where customers decide.",
    body: "Sidewalks, entries, planters and storefront glass kept customer ready. Gum, oil, rust and organic staining removed on a schedule, not after a complaint.",
    items: ["Sidewalk and entry washing", "Gum and stain removal", "Planters and entry beds", "Dumpster pads and service areas"],
    image: "/images/storefront.jpg",
    alt: "Painted storefront with clean glass and swept cobblestone walk",
  },
  {
    name: "Detail",
    line: "The work you notice only when it is missing.",
    body: "Debris cleared from every corner, clippings never left on stone, gutters and drains kept open. Pre event detailing on request.",
    items: ["Post visit blow down", "Gutter and drain clearing", "Seasonal cleanups", "Pre event detailing"],
    image: "/images/garden-path.jpg",
    alt: "Brick garden path between clipped hedges and flowering shrubs",
  },
];

export const materials = [
  "Limestone",
  "Travertine",
  "Bluestone",
  "Brick",
  "Stucco",
  "Pavers",
  "Cedar",
  "Concrete",
  "Granite",
  "Slate",
  "Painted siding",
  "Storefront glass",
];

export const commitments = [
  {
    title: "One point of contact",
    body: "You deal with one person who knows your property. Calls and messages are answered.",
  },
  {
    title: "A report after every visit",
    body: "Dated photos of the work and anything we noticed that needs your attention.",
  },
  {
    title: "Same crew, every visit",
    body: "The people on your property learn it. No rotating strangers.",
  },
  {
    title: "Scheduled around you",
    body: "Visits planned around your household, your guests or your business hours.",
  },
  {
    title: "Conduct you will not notice",
    body: "Uniformed, courteous, quiet. Gates closed, vehicles respected, nothing left behind.",
  },
  {
    title: "Insured before day one",
    body: "Certificate of insurance on file before the first visit, for owners and managers alike.",
  },
];

export const process = [
  {
    title: "Walk",
    body: "We walk the property with you or your manager. Every surface, bed and line.",
  },
  {
    title: "Plan",
    body: "You receive a written plan: scope, cadence and a fixed monthly figure.",
  },
  {
    title: "Maintain",
    body: "The program runs on schedule. You stop thinking about it.",
  },
  {
    title: "Report",
    body: "Photos after every visit. A seasonal review of what to address next.",
  },
];

export const faqs = [
  {
    q: "Do you publish prices?",
    a: "No. Every property is different, so every program is quoted after a walkthrough. You receive a fixed monthly figure in writing, and it does not change mid season.",
  },
  {
    q: "Will pressure washing damage stone, brick or paint?",
    a: "Not here. Travertine, limestone and other natural stone are never pressure washed. They are soft washed at low pressure with stone safe cleaners, after a test patch in a hidden spot. High pressure is used only on concrete built to take it.",
  },
  {
    q: "Can you work around events and business hours?",
    a: "Yes. Residential visits are scheduled around your household and guests. Commercial frontage can be serviced early morning or after close, so customers never see the work, only the result.",
  },
  {
    q: "Who do I contact when something needs attention?",
    a: "One person, directly. No call center, no ticket queue. If something is wrong, it is addressed on the next visit or sooner.",
  },
  {
    q: "Do you take one time work?",
    a: "Yes, as a Restoration Visit. Many clients start there to see the standard before committing to a program.",
  },
  {
    q: "Can you provide insurance documentation?",
    a: "Yes. A certificate of insurance can be issued to you, your property manager or your association before work begins.",
  },
];

/** On the estates page the third discipline is the arrival, not a storefront. */
export const disciplinesEstate: Discipline[] = disciplines.map((d) =>
  d.name === "Frontage"
    ? {
        name: "Arrival",
        line: "The front walk your guests remember.",
        body: "Front walk, steps, motor court and entry beds kept guest ready. Stone and pavers soft washed, never blasted, so nothing etches or stains.",
        items: ["Front walk and steps", "Motor court and drive", "Entry beds and planters", "Pre event detailing"],
        image: "/images/modern-steps-lawn.jpg",
        alt: "Wide stone steps rising through a manicured lawn to a modern entrance",
      }
    : d,
);

export const commitmentsCommercial = [
  {
    title: "One point of contact",
    body: "Quinton answers the phone and walks every site himself. No dispatcher, no ticket queue.",
  },
  {
    title: "Before open or after close",
    body: "Washing and grounds work scheduled around your trading hours, so customers only see the result.",
  },
  {
    title: "A dated report every visit",
    body: "Before and after photos you can forward straight to your owner or board.",
  },
  {
    title: "Insured, with paperwork ready",
    body: "Certificate of insurance and W-9 before the first visit. Your ownership entity named as additional insured on request.",
  },
  {
    title: "Same crew, same sites",
    body: "The people on your property know it, and know what your tenants complain about.",
  },
  {
    title: "Missed visit, made right",
    body: "If weather moves a visit you hear it from us first, with the new date.",
  },
];

const stoneFaq = {
  q: "Will pressure washing damage stone, brick or paint?",
  a: "Not here. Travertine, limestone and other natural stone are never pressure washed. They are soft washed at low pressure with stone safe cleaners, after a test patch in a hidden spot. High pressure is used only on concrete built to take it.",
};

export const faqsEstate = [
  { q: "Who will actually be on my property?", a: "Quinton walks the property with you first and is on site for the first visit. After that, the same small crew every time, never a rotating cast of strangers." },
  stoneFaq,
  { q: "Can you work around events and travel?", a: "Yes. Visits are planned around your household and guests, and pre event detailing can be booked on short notice. When you are away, the program runs as normal and the photos come to you." },
  { q: "Do you publish prices?", a: "Estates are quoted after the walkthrough, because every property is different. You receive a fixed monthly figure in writing, and it does not change mid season." },
  { q: "Can I start with a single visit?", a: "Yes, a Restoration Visit. Many clients start there to see the standard before committing to a program." },
  { q: "Can you provide insurance documentation?", a: "Yes. A certificate of insurance can be issued to you or your estate manager before work begins." },
];

export const faqsCommercial = [
  { q: "How fast can I get a price?", a: "Text a photo of your frontage to (281) 788-6172 and you will usually have a number the same day. Larger properties get a quick site walk first." },
  { q: "Can you work before we open or after we close?", a: "Yes. Most storefront and sidewalk washing is done early morning or after close, so customers never walk around the work." },
  { q: "Do you handle more than one site?", a: "Yes. Multi site programs run on a set schedule with one report per site, and Quinton is your single point of contact for all of them." },
  stoneFaq,
  { q: "What documentation do you provide?", a: "A certificate of insurance and W-9 before the first visit, your ownership entity named as additional insured on request, and dated before and after photos every visit." },
  { q: "Can I start with a single visit?", a: "Yes, a Restoration Visit: a full reset before a lease up, inspection, opening or season." },
];
