import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";
import StatusPill from "@/components/ui/StatusPill";
import SafetyGuideTOC from "@/components/sections/SafetyGuideTOC";

export const metadata: Metadata = {
  title: "Product Safety Guide — Amazon Safety Pro",
  description:
    "A complete guide to Amazon's product safety landscape — what it means, why it exists, how Amazon enforces it, and what it means for sellers.",
};

const TOC = [
  { id: "section-4a", number: "4a", label: "What is product safety" },
  { id: "section-4b", number: "4b", label: "Global policies" },
  { id: "section-4c-i", number: "4c·i", label: "Products requiring docs" },
  { id: "section-4c-ii", number: "4c·ii", label: "Restricted products" },
  { id: "section-4c-iii", number: "4c·iii", label: "Dangerous goods" },
  { id: "section-4c-iv", number: "4c·iv", label: "Amazon TIC policy" },
];

function SectionHeading({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div>
      <MonoLabel prefix="→">SECTION {num}</MonoLabel>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.015em] text-[var(--ink)] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-xl font-bold text-[var(--ink)] sm:text-2xl">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-2)]">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[17px] leading-relaxed text-[var(--ink-2)]"
        >
          <span className="mt-1 font-mono text-[var(--signal)]">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 text-[17px] leading-relaxed text-[var(--ink-2)]"
        >
          <span className="shrink-0 font-mono text-xs tracking-widest text-[var(--alert)]">
            [ {String(i + 1).padStart(2, "0")} ]
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function SafetyGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section className="border-b border-[var(--rule)] bg-[var(--paper-sage)]">
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-24">
            <RevealOnScroll showLine={false}>
              <div className="flex flex-wrap items-center gap-3">
                <MonoLabel prefix="→">FIELD GUIDE // 04</MonoLabel>
                <span className="ml-auto hidden font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)] sm:inline">
                  ~/ safety-guide
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                Product Safety Guide
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                Understanding Amazon&rsquo;s product safety landscape is one of
                the most important things any seller can do — and one of the
                most overlooked. This guide breaks down what product safety
                means, why it exists, how Amazon enforces it, and what it means
                for you as a seller on Amazon&rsquo;s global marketplaces.
                Whether you are launching your first product or managing a
                large catalog across multiple regions, the information here
                will help you navigate compliance with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <StatusPill tone="signal">06 SECTIONS</StatusPill>
                <StatusPill>UPDATED 2026-03</StatusPill>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Body */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* TOC */}
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <SafetyGuideTOC items={TOC} />
                </div>
              </aside>

              {/* Content */}
              <div className="space-y-24 lg:col-span-9">
                {/* 4a */}
                <article id="section-4a" className="scroll-mt-32">
                  <SectionHeading
                    num="4a"
                    title="What is product safety and why it is needed"
                  />
                  <P>
                    Product safety is the framework of standards, regulations,
                    and enforcement mechanisms designed to ensure that products
                    available to consumers do not pose an unreasonable risk of
                    harm — whether through injury, illness, or exposure to
                    hazardous substances. It exists at every level of the
                    supply chain, from the factory floor to the marketplace
                    shelf, and it applies to every seller regardless of size,
                    sales volume, or brand recognition.
                  </P>

                  <SubHeading>Why product safety is needed — for consumers</SubHeading>
                  <P>
                    For the customers buying products on Amazon, product safety
                    is not a bureaucratic formality — it is a matter of
                    physical wellbeing. Every year, unsafe or unregulated
                    products cause thousands of preventable injuries and deaths
                    across the world. The consequences of inadequate product
                    safety reach into homes, hospitals, and schools in ways
                    that are often irreversible.
                  </P>
                  <P>
                    Real-world cases make this clear. E-bikes and electric
                    scooters powered by unregulated lithium batteries have
                    caused devastating fires and explosions in homes and
                    apartments across the US and Europe — many linked to
                    products sourced through online marketplaces without
                    adequate battery safety certification. Buckyballs — small,
                    powerful rare-earth magnetic balls sold as desk toys — were
                    found to be swallowed by children, causing life-threatening
                    internal injuries requiring emergency surgery, leading to a
                    years-long CPSC enforcement action and eventual recall.
                    Water beads, widely sold as sensory toys for children, have
                    caused serious internal harm and at least one child death
                    after being ingested — prompting regulatory action and
                    Amazon restrictions across multiple categories.
                  </P>
                  <P>
                    These are not edge cases. They are the reason product
                    safety regulations exist — and why Amazon enforces them
                    actively, even when a product appears popular, harmless,
                    or widely available elsewhere.
                  </P>

                  {/* Self-guide CTA — only link in the entire site */}
                  <FramedBlock
                    bracketColor="var(--signal)"
                    className="my-12 bg-[var(--signal-soft)]/30"
                  >
                    <MonoLabel prefix="→">INTERACTIVE TOOL</MonoLabel>
                    <h3 className="mt-3 text-2xl font-bold text-[var(--ink)]">
                      Try our interactive Product Safety checker
                    </h3>
                    <p className="mt-3 text-[var(--ink-2)]">
                      Walk through a quick decision tree to identify what
                      compliance requirements apply to your product.
                    </p>
                    <div className="mt-6">
                      <TacticalButton href="/self-guide" variant="secondary">
                        Open Self-Guide
                      </TacticalButton>
                    </div>
                  </FramedBlock>

                  <SubHeading>Why product safety matters for Amazon sellers</SubHeading>
                  <P>
                    Amazon is one of the world&rsquo;s largest retail platforms
                    and maintains a rigorous, proactive product safety program.
                    Any product that does not meet applicable safety standards
                    — or that lacks the required documentation to prove
                    compliance — is at risk of being removed from the platform.
                    This applies regardless of a product&rsquo;s sales history,
                    account standing, brand reputation, or how popular or
                    trending the product may be at the time.
                  </P>
                  <P>
                    Amazon has demonstrated this consistently. Water beads were
                    among the most searched and best-selling sensory products
                    on the platform before Amazon restricted the category
                    following multiple reports of child ingestion incidents —
                    despite the products not being formally banned by the CPSC
                    or other regulators at the time. Toothpick crossbows, a
                    viral novelty product that surged in popularity across
                    social media, were swiftly removed from Amazon&rsquo;s
                    marketplace due to the risk of eye injury — again, ahead
                    of formal regulatory action. Neither brand recognition nor
                    sales rank offered any protection once Amazon identified a
                    safety concern.
                  </P>

                  <SubHeading>The risks of non-compliance</SubHeading>
                  <BulletList
                    items={[
                      "Listing suppression following a compliance notification — Amazon will notify sellers of a safety or compliance issue, but suppression of the affected listing can follow immediately after that notification if the required documentation is not provided within the specified timeframe",
                      "Listing removal where a product is found to present an immediate safety risk or where the seller fails to respond to compliance requests",
                      "Loss of selling privileges for repeated or serious compliance violations",
                      "Product recalls and associated legal and financial liability",
                      "Regulatory penalties from government bodies in the seller's jurisdiction",
                      "Damage to brand reputation and long-term loss of customer trust",
                    ]}
                  />

                  <SubHeading>What constitutes &lsquo;safe&rsquo; on Amazon</SubHeading>
                  <P>
                    A product is generally considered compliant on Amazon when
                    it meets all applicable mandatory safety standards in the
                    marketplace where it is sold, is accompanied by valid test
                    reports and certifications from accredited third-party
                    laboratories, and is labeled, packaged, and described in
                    accordance with relevant regulatory requirements.
                  </P>
                  <P>
                    However, Amazon&rsquo;s definition of &lsquo;safe&rsquo;
                    goes beyond what regulators formally require. Amazon
                    enforces both mandatory and voluntary safety standards —
                    and it reserves the right to restrict or remove any product
                    it determines poses a risk to customers, even where no
                    formal regulatory action has been taken.
                  </P>

                  <SubHeading>How Amazon monitors product safety</SubHeading>
                  <P>
                    Amazon actively monitors the safety landscape through
                    multiple channels, including government regulatory bodies
                    such as the CPSC (US), Health Canada, and the EU Safety
                    Gate; established safety watchdogs and consumer advocacy
                    organizations such as Consumer Reports, Safe Kids
                    Worldwide, and the World Against Toys Causing Harm
                    (W.A.T.C.H.); independent product safety NGOs and testing
                    organizations; and its own internal safety signals from
                    customer complaints, injury reports, and marketplace data.
                  </P>
                  <P>
                    When a product is identified as posing a potential risk
                    through any of these channels, Amazon may immediately
                    restrict the listing, suppress it pending document review,
                    or request that the seller provides test reports, product
                    images, packaging images, and labeling information to
                    demonstrate compliance. If the risk is considered
                    significant, the product may be removed entirely while the
                    review is underway.
                  </P>

                  <SubHeading>Amazon&rsquo;s enforcement beyond regulation</SubHeading>
                  <P>
                    Amazon does not wait for a regulator to act before
                    restricting a product. This is one of the most important
                    and least understood aspects of selling on Amazon&rsquo;s
                    marketplace — and it catches many sellers off guard.
                  </P>

                  <FramedBlock
                    bracketColor="var(--alert)"
                    className="mt-8 bg-[var(--paper-edge)]/60"
                  >
                    <MonoLabel prefix="→">CASE STUDY · 01</MonoLabel>
                    <h4 className="mt-3 text-lg font-bold text-[var(--ink)]">
                      Mermaid tails for children
                    </h4>
                    <p className="mt-3 text-[var(--ink-2)]">
                      Mermaid tail swimwear for children has not been formally
                      restricted by the CPSC, Health Canada, or any major EU
                      product safety regulator. However, Amazon restricts the
                      sale of these products because they have been linked to
                      drowning incidents — the design restricts leg movement
                      in water, creating a genuine risk for young swimmers.
                      Amazon identified the safety signal independently and
                      acted on it, regardless of the absence of formal
                      regulatory action.
                    </p>
                  </FramedBlock>

                  <FramedBlock
                    bracketColor="var(--alert)"
                    className="mt-6 bg-[var(--paper-edge)]/60"
                  >
                    <MonoLabel prefix="→">CASE STUDY · 02</MonoLabel>
                    <h4 className="mt-3 text-lg font-bold text-[var(--ink)]">
                      Mouth tape products
                    </h4>
                    <p className="mt-3 text-[var(--ink-2)]">
                      Mouth tapes became a widely popular wellness trend, with
                      products sold across Amazon&rsquo;s marketplaces
                      generating significant sales volumes. Amazon restricted
                      the category after identifying safety concerns around
                      breathing obstruction in adults and children during
                      sleep — ahead of formal action from regulators.
                      Popularity and sales volume offered no protection once
                      Amazon determined the product presented a safety risk.
                    </p>
                  </FramedBlock>

                  <P>
                    In both cases, sellers were required to submit test
                    reports, product images, packaging images, product labels,
                    and other supporting documentation before their listings
                    could be reviewed for reinstatement. This is the standard
                    Amazon process when a safety concern is raised — and it
                    is exactly the kind of situation Amazon Safety Pro exists
                    to help sellers navigate.
                  </P>
                </article>

                <HairlineDivider />

                {/* 4b */}
                <article id="section-4b" className="scroll-mt-32">
                  <SectionHeading
                    num="4b"
                    title="Global product safety policies across different marketplaces"
                  />
                  <P>
                    Amazon operates across multiple global marketplaces, each
                    subject to the regulatory framework of its respective
                    country or region. Sellers are responsible for ensuring
                    their products comply with the standards applicable to
                    every marketplace in which they sell.
                  </P>

                  <SubHeading>United States (amazon.com)</SubHeading>
                  <P>
                    Product safety in the US marketplace is primarily governed
                    by the Consumer Product Safety Commission (CPSC) and
                    enforced through the Consumer Product Safety Improvement
                    Act (CPSIA). Key requirements include:
                  </P>
                  <BulletList
                    items={[
                      "Children's products must comply with CPSIA and be accompanied by a Children's Product Certificate (CPC) supported by third-party testing from a CPSC-approved laboratory",
                      "General consumer products must meet applicable ASTM, UL, or other recognized voluntary or mandatory standards",
                      "Certain product categories require specific certifications and labeling",
                    ]}
                  />

                  <SubHeading>Canada (amazon.ca)</SubHeading>
                  <P>
                    The Canadian marketplace is regulated by Health Canada
                    under the Canada Consumer Product Safety Act (CCPSA).
                    Products sold on amazon.ca must not pose an unreasonable
                    danger to human health or safety. In addition to the
                    CCPSA&rsquo;s general requirements, many product categories
                    in Canada are subject to specific Statutory Orders and
                    Regulations (SOR standards) — mandatory technical
                    regulations that set out detailed safety requirements for
                    particular product types, including children&rsquo;s toys,
                    cribs, car seats, electrical products, and more. Sellers
                    must identify and comply with the relevant SOR standards
                    for their product category before listing on the Canadian
                    marketplace. Sellers may be required to provide a General
                    Certificate of Conformity (GCC) or equivalent documentation
                    demonstrating compliance with the applicable SOR standards.
                  </P>

                  <SubHeading>European Union</SubHeading>
                  <P>
                    EU marketplaces are governed by a comprehensive framework
                    of product safety directives and regulations, including:
                  </P>
                  <BulletList
                    items={[
                      "General Product Safety Regulation (GPSR) — applies to all consumer products not covered by a specific directive",
                      "CE marking requirements for applicable product categories",
                      "REACH regulation governing chemical substances in products",
                      "RoHS directive for electrical and electronic equipment",
                      "EN 71 toy safety standard for toys sold in the EU",
                      "EU Declaration of Conformity (DoC) required for CE-marked products",
                    ]}
                  />
                  <P>
                    Note: Following Brexit, the United Kingdom has its own
                    separate product safety framework (UKCA marking) for
                    products sold on amazon.co.uk.
                  </P>
                </article>

                <HairlineDivider />

                {/* 4c-i */}
                <article id="section-4c-i" className="scroll-mt-32">
                  <SectionHeading
                    num="4c·i"
                    title="Products requiring safety documents"
                  />
                  <P>
                    Amazon applies a range of product-specific compliance
                    requirements that sellers must understand before listing.
                    These fall into four main categories.
                  </P>
                  <P>
                    Certain product categories are flagged by Amazon as
                    requiring safety documentation before a listing can go
                    live or remain active. These typically include
                    children&rsquo;s products, electrical and electronic
                    goods, chemical products, food contact materials, personal
                    protective equipment, and products containing lithium
                    batteries.
                  </P>
                  <P>
                    When Amazon requests safety documentation, sellers are
                    typically required to submit a combination of the
                    following:
                  </P>
                  <BulletList
                    items={[
                      "Test reports from accredited, Amazon-accepted third-party laboratories confirming the product meets all applicable safety standards",
                      "A Children's Product Certificate (CPC), Declaration of Conformity (DOC), or General Certificate of Conformity (GCC) as applicable",
                      "Product images showing the item itself from multiple angles",
                      "Packaging images showing all sides of the retail packaging",
                      "Labeling images clearly showing all required label content including warnings, age grading, manufacturer or importer information, and tracking labels",
                      "Safety Data Sheets (SDS) where applicable for chemical or hazardous products",
                    ]}
                  />
                  <P>
                    Failure to provide the requested documentation within
                    Amazon&rsquo;s specified timeframe will typically result
                    in immediate listing suppression. Sellers who are unsure
                    what specific documents are required for their product
                    and marketplace should seek expert guidance before
                    responding to a compliance notification.
                  </P>
                </article>

                <HairlineDivider />

                {/* 4c-ii */}
                <article id="section-4c-ii" className="scroll-mt-32">
                  <SectionHeading num="4c·ii" title="Restricted products" />
                  <P>
                    Amazon maintains a list of restricted products that may
                    not be sold on the platform, or may only be sold with
                    prior approval. Categories include but are not limited to:
                  </P>
                  <BulletList
                    items={[
                      "Certain pesticides and plant and soil amendments",
                      "Drugs and drug paraphernalia",
                      "Surveillance and tracking devices",
                      "Certain laser products",
                      "Recalled products",
                      "Certain medical devices requiring regulatory approval",
                    ]}
                  />
                  <P>
                    Sellers who attempt to list restricted products without
                    the appropriate approvals risk immediate listing removal
                    and potential account action.
                  </P>
                </article>

                <HairlineDivider />

                {/* 4c-iii */}
                <article id="section-4c-iii" className="scroll-mt-32">
                  <SectionHeading
                    num="4c·iii"
                    title="Dangerous goods (Hazmat)"
                  />
                  <P>
                    Amazon classifies products containing hazardous materials
                    as Dangerous Goods. These include products that are
                    flammable, pressurised, corrosive, toxic, or otherwise
                    pose a risk during storage, handling, or transport. Common
                    examples include lithium batteries and battery-powered
                    products, aerosols and pressurised containers, and
                    flammable liquids. Sellers listing Dangerous Goods must
                    provide a Safety Data Sheet (SDS) and ensure their
                    products are properly classified. Misclassification can
                    result in listing restrictions, removal from FBA, or
                    account suspension.
                  </P>
                </article>

                <HairlineDivider />

                {/* 4c-iv */}
                <article id="section-4c-iv" className="scroll-mt-32">
                  <SectionHeading
                    num="4c·iv"
                    title="Amazon TIC Policy — Testing, Inspection and Certification"
                  />

                  <SubHeading>What is TIC?</SubHeading>
                  <P>
                    Testing, Inspection and Certification (TIC) refers to the
                    services provided by independent, accredited third-party
                    organizations that evaluate products against applicable
                    safety standards and regulations. In the context of
                    Amazon, TIC is the framework through which Amazon requires
                    sellers to prove — not just claim — that their products
                    are safe and compliant. Under Amazon&rsquo;s TIC policy,
                    test results and compliance data must be submitted
                    directly to Amazon by an Amazon-approved TIC organization,
                    not uploaded manually by the seller. This direct-from-lab
                    verification model was introduced to eliminate falsified
                    or altered test reports and to ensure the integrity of
                    every compliance submission on the platform.
                  </P>

                  <SubHeading>How the TIC process works</SubHeading>
                  <P>
                    When an ASIN is flagged under Amazon&rsquo;s TIC compliance
                    process, the seller receives a notification through their
                    Account Health dashboard under Policy Compliance. The
                    process then follows these steps:
                  </P>
                  <NumberedList
                    items={[
                      "The seller navigates to Account Health, selects the affected ASIN, and clicks \"Verify your product\"",
                      "Amazon generates a Test Request Form (TRF) ID — a unique compliance reference number that links the seller's specific ASIN to the testing submission",
                      "The seller selects an Amazon-approved TIC provider from the approved directory in Seller Central",
                      "The TIC provider contacts the seller with a quote covering cost and timelines, and the seller accepts and provides product samples or existing documentation",
                      "The TIC provider either conducts fresh laboratory testing or evaluates existing documentation to confirm it meets Amazon's requirements",
                      "Upon successful verification, the TIC provider submits the results directly to Amazon via a secure integration — the seller cannot upload the results themselves",
                      "Amazon reviews the submission and, if accepted, reinstates the listing",
                    ]}
                  />

                  <FramedBlock
                    bracketColor="var(--alert)"
                    className="mt-8 bg-[var(--paper-edge)]/60"
                  >
                    <MonoLabel prefix="→">CRITICAL</MonoLabel>
                    <p className="mt-3 text-[var(--ink-2)]">
                      <strong className="text-[var(--ink)]">Important:</strong>{" "}
                      The TRF ID must be provided to the TIC lab before testing
                      begins. Without it, the lab cannot link the test results
                      to the seller&rsquo;s Amazon account, and the listing
                      will remain suppressed even if the product passes all
                      tests.
                    </p>
                  </FramedBlock>

                  <SubHeading>Which products are subject to TIC requirements?</SubHeading>
                  <P>
                    Amazon has expanded the TIC program across multiple
                    product categories. As of September 2025, TIC compliance
                    is required for children&rsquo;s toys sold in the US and
                    Canada stores, with annual testing or document
                    verification now mandatory. The program also covers
                    dietary supplements, where Amazon-approved TIC providers
                    must submit compliance data directly. Additional product
                    categories are subject to TIC requirements — the full and
                    current list of affected categories and approved TIC
                    providers is available in the TIC directory within Amazon
                    Seller Central at:{" "}
                    <a
                      href="https://sellercentral.amazon.com/help/hub/reference/external/GUTZ2R2DD6P2UMVB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="signal-link break-all"
                    >
                      sellercentral.amazon.com/help/hub/reference/external/GUTZ2R2DD6P2UMVB
                    </a>
                    . Sellers should check the directory regularly as Amazon
                    updates the list and enforcement scope over time.
                  </P>

                  <SubHeading>Approved TIC providers</SubHeading>
                  <P>
                    Amazon maintains a directory of approved TIC organizations
                    within Seller Central. Well-known providers currently
                    operating in the Amazon TIC program include SGS, Bureau
                    Veritas, Intertek, UL Solutions, NSF International, and
                    Mérieux NutriSciences, among others. Sellers must select a
                    provider from this directory — test reports from non-listed
                    laboratories, even if accredited, will not be accepted
                    under the TIC program. Labs can also be suspended or
                    removed from the approved list over time, so sellers
                    should verify their provider&rsquo;s status at the point
                    of each compliance submission.
                  </P>

                  <SubHeading>Key enforcement rules under TIC</SubHeading>
                  <BulletList
                    items={[
                      "Test reports must reference the current version of the applicable standard — for example, Amazon now requires ASTM F963-23 for US toys; reports based on older versions such as ASTM F963-17 may be rejected",
                      "The age grading on the product listing, the CPC, and the test report must all be consistent — any mismatch will result in rejection",
                      "Packaging, labels, warning statements, and tracking label information must align precisely with what is documented in the test report",
                      "TIC verification is not a one-time event — Amazon requires annual re-verification for applicable categories, making compliance an ongoing operating responsibility",
                      "Sellers cannot rely on existing test reports indefinitely — where a standard has been updated, retesting to the new version is required",
                    ]}
                  />

                  <SubHeading>What this means for sellers</SubHeading>
                  <P>
                    The TIC program represents a significant shift in how
                    Amazon enforces compliance — moving from a self-declaration
                    model to a verified, third-party-led system with direct
                    platform integration. For sellers in affected categories,
                    compliance is no longer a one-time launch task. It is a
                    recurring, documented, annually verified obligation that
                    requires careful management of test reports, certification
                    timelines, lab relationships, and submission deadlines.
                  </P>
                  <P>
                    Navigating the TIC process — especially when an ASIN has
                    already been flagged or suppressed — is one of the areas
                    where Amazon Safety Pro&rsquo;s insider knowledge delivers
                    the greatest advantage. We understand how the TIC workflow
                    operates within Amazon&rsquo;s systems, which providers
                    have the strongest track record, and how to move a
                    flagged ASIN through the verification process as
                    efficiently as possible.
                  </P>
                </article>

                {/* End-of-guide CTA */}
                <FramedBlock
                  bracketColor="var(--signal)"
                  className="mt-16 bg-[var(--ink)] text-[var(--paper)]"
                >
                  <MonoLabel
                    prefix="→"
                    className="text-[var(--signal)]"
                  >
                    NEXT STEP
                  </MonoLabel>
                  <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                    Got a flagged ASIN or a compliance notice?
                  </h2>
                  <p className="mt-4 max-w-2xl text-[var(--paper)]/80">
                    Submit your documents for a free review. A real
                    ex-Amazonian will go through your case personally.
                  </p>
                  <div className="mt-8">
                    <TacticalButton href="/free-validation">
                      Submit for free review
                    </TacticalButton>
                  </div>
                </FramedBlock>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
