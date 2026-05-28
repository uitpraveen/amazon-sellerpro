import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SafetyGuideTOC from "@/components/sections/SafetyGuideTOC";

export const metadata: Metadata = {
  title: "Product Safety Guide - Amazon Safety Pro",
  description:
    "A complete guide to Amazon's product safety landscape - what it means, why it exists, how Amazon enforces it, and what it means for sellers.",
};

const TOC = [
  { id: "section-4a", number: "1", label: "What is product safety" },
  { id: "section-4b", number: "2", label: "Global policies" },
  { id: "section-4c-i", number: "3", label: "Products requiring docs" },
  { id: "section-4c-ii", number: "4", label: "Restricted products" },
  { id: "section-4c-iii", number: "5", label: "Dangerous goods" },
  { id: "section-4c-iv", number: "6", label: "Amazon TIC policy" },
];

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div>
      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "#B8860B", fontFamily: "Outfit, sans-serif" }}
      >
        Section {num}
      </p>
      <h2
        className="mt-2 text-3xl leading-tight sm:text-4xl"
        style={{
          fontFamily: "'DM Serif Display', serif",
          color: "#2D2A26",
          fontWeight: 400,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-10 text-xl sm:text-2xl"
      style={{
        fontFamily: "'DM Serif Display', serif",
        color: "#2D2A26",
        fontWeight: 400,
      }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 text-[17px] leading-relaxed"
      style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
    >
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
          className="flex gap-3 text-[17px] leading-relaxed"
          style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
        >
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "#B8860B" }}
          />
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
          className="flex gap-4 text-[17px] leading-relaxed"
          style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
        >
          <span
            className="shrink-0 text-sm font-bold"
            style={{ color: "#B8860B", minWidth: "1.5rem" }}
          >
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function WarmCard({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="my-10 rounded-2xl p-7"
      style={{
        background: "#FAF7F2",
        border: "1px solid #B8860B",
      }}
    >
      {label && (
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#B8860B", fontFamily: "Outfit, sans-serif" }}
        >
          {label}
        </p>
      )}
      {title && (
        <h3
          className="text-xl"
          style={{
            fontFamily: "'DM Serif Display', serif",
            color: "#2D2A26",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
      )}
      <div
        className="mt-3 text-[16px] leading-relaxed"
        style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function KeyPointCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-8 rounded-r-xl py-5 pl-6 pr-5"
      style={{
        background: "#FAF7F2",
        borderLeft: "3px solid #B8860B",
      }}
    >
      <div
        className="text-[16px] leading-relaxed"
        style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <hr
      className="my-2"
      style={{ borderColor: "#E8E0D4", borderTopWidth: 1 }}
    />
  );
}

export default function SafetyGuidePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#FAF7F2" }}>
        {/* Hero */}
        <section
          className="border-b"
          style={{ borderColor: "#E8E0D4", background: "#FAF7F2" }}
        >
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-12 lg:pb-24 lg:pt-40">
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#B8860B", fontFamily: "Outfit, sans-serif" }}
            >
              Your Complete Guide
            </p>
            <h1
              className="mt-4 max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#2D2A26",
                fontWeight: 400,
              }}
            >
              Product Safety Guide
            </h1>
            <p
              className="mt-8 text-lg leading-relaxed"
              style={{ color: "#6B6560", fontFamily: "Outfit, sans-serif" }}
            >
              Understanding Amazon&rsquo;s product safety landscape is one of
              the most important things any seller can do - and one of the most
              overlooked. This guide breaks down what product safety means, why
              it exists, how Amazon enforces it, and what it means for you as a
              seller on Amazon&rsquo;s global marketplaces. Whether you are
              launching your first product or managing a large catalog across
              multiple regions, the information here will help you navigate
              compliance with confidence.
            </p>
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
                    num="1"
                    title="What is product safety and why it is needed"
                  />
                  <P>
                    Product safety is the framework of standards, regulations,
                    and enforcement mechanisms designed to ensure that products
                    available to consumers do not pose an unreasonable risk of
                    harm - whether through injury, illness, or exposure to
                    hazardous substances. It exists at every level of the supply
                    chain, from the factory floor to the marketplace shelf, and
                    it applies to every seller regardless of size, sales volume,
                    or brand recognition.
                  </P>

                  <SubHeading>Why product safety is needed - for consumers</SubHeading>
                  <P>
                    For the customers buying products on Amazon, product safety
                    is not a bureaucratic formality - it is a matter of physical
                    wellbeing. Every year, unsafe or unregulated products cause
                    thousands of preventable injuries and deaths across the
                    world. The consequences of inadequate product safety reach
                    into homes, hospitals, and schools in ways that are often
                    irreversible.
                  </P>
                  <P>
                    Real-world cases make this clear. E-bikes and electric
                    scooters powered by unregulated lithium batteries have caused
                    devastating fires and explosions in homes and apartments
                    across the US and Europe - many linked to products sourced
                    through online marketplaces without adequate battery safety
                    certification. Buckyballs - small, powerful rare-earth
                    magnetic balls sold as desk toys - were found to be swallowed
                    by children, causing life-threatening internal injuries
                    requiring emergency surgery, leading to a years-long CPSC
                    enforcement action and eventual recall. Water beads, widely
                    sold as sensory toys for children, have caused serious
                    internal harm and at least one child death after being
                    ingested - prompting regulatory action and Amazon restrictions
                    across multiple categories.
                  </P>
                  <P>
                    These are not edge cases. They are the reason product safety
                    regulations exist - and why Amazon enforces them actively,
                    even when a product appears popular, harmless, or widely
                    available elsewhere.
                  </P>

                  {/* Self-guide CTA */}
                  <WarmCard label="Interactive Tool" title="Try our interactive Product Safety checker">
                    <p>
                      Walk through a quick decision tree to identify what
                      compliance requirements apply to your product.
                    </p>
                    <Link
                      href="/self-guide"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{
                        background: "#1B4332",
                        color: "#FAF7F2",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      Open Self-Guide
                    </Link>
                  </WarmCard>

                  <SubHeading>Why product safety matters for Amazon sellers</SubHeading>
                  <P>
                    Amazon is one of the world&rsquo;s largest retail platforms
                    and maintains a rigorous, proactive product safety program.
                    Any product that does not meet applicable safety standards -
                    or that lacks the required documentation to prove compliance
                    - is at risk of being removed from the platform. This applies
                    regardless of a product&rsquo;s sales history, account
                    standing, brand reputation, or how popular or trending the
                    product may be at the time.
                  </P>
                  <P>
                    Amazon has demonstrated this consistently. Water beads were
                    among the most searched and best-selling sensory products on
                    the platform before Amazon restricted the category following
                    multiple reports of child ingestion incidents - despite the
                    products not being formally banned by the CPSC or other
                    regulators at the time. Toothpick crossbows, a viral novelty
                    product that surged in popularity across social media, were
                    swiftly removed from Amazon&rsquo;s marketplace due to the
                    risk of eye injury - again, ahead of formal regulatory
                    action. Neither brand recognition nor sales rank offered any
                    protection once Amazon identified a safety concern.
                  </P>

                  <SubHeading>The risks of non-compliance</SubHeading>
                  <BulletList
                    items={[
                      "Listing suppression following a compliance notification - Amazon will notify sellers of a safety or compliance issue, but suppression of the affected listing can follow immediately after that notification if the required documentation is not provided within the specified timeframe",
                      "Listing removal where a product is found to present an immediate safety risk or where the seller fails to respond to compliance requests",
                      "Loss of selling privileges for repeated or serious compliance violations",
                      "Product recalls and associated legal and financial liability",
                      "Regulatory penalties from government bodies in the seller's jurisdiction",
                      "Damage to brand reputation and long-term loss of customer trust",
                    ]}
                  />

                  <SubHeading>What constitutes &lsquo;safe&rsquo; on Amazon</SubHeading>
                  <P>
                    A product is generally considered compliant on Amazon when it
                    meets all applicable mandatory safety standards in the
                    marketplace where it is sold, is accompanied by valid test
                    reports and certifications from accredited third-party
                    laboratories, and is labeled, packaged, and described in
                    accordance with relevant regulatory requirements.
                  </P>
                  <P>
                    However, Amazon&rsquo;s definition of &lsquo;safe&rsquo; goes
                    beyond what regulators formally require. Amazon enforces both
                    mandatory and voluntary safety standards - and it reserves the
                    right to restrict or remove any product it determines poses a
                    risk to customers, even where no formal regulatory action has
                    been taken.
                  </P>

                  <SubHeading>How Amazon monitors product safety</SubHeading>
                  <P>
                    Amazon actively monitors the safety landscape through multiple
                    channels, including government regulatory bodies such as the
                    CPSC (US), Health Canada, and the EU Safety Gate; established
                    safety watchdogs and consumer advocacy organizations such as
                    Consumer Reports, Safe Kids Worldwide, and the World Against
                    Toys Causing Harm (W.A.T.C.H.); independent product safety
                    NGOs and testing organizations; and its own internal safety
                    signals from customer complaints, injury reports, and
                    marketplace data.
                  </P>
                  <P>
                    When a product is identified as posing a potential risk
                    through any of these channels, Amazon may immediately restrict
                    the listing, suppress it pending document review, or request
                    that the seller provides test reports, product images,
                    packaging images, and labeling information to demonstrate
                    compliance. If the risk is considered significant, the product
                    may be removed entirely while the review is underway.
                  </P>

                  <SubHeading>Amazon&rsquo;s enforcement beyond regulation</SubHeading>
                  <P>
                    Amazon does not wait for a regulator to act before restricting
                    a product. This is one of the most important and least
                    understood aspects of selling on Amazon&rsquo;s marketplace -
                    and it catches many sellers off guard.
                  </P>

                  <WarmCard label="Case Study · 01" title="Mermaid tails for children">
                    <p>
                      Mermaid tail swimwear for children has not been formally
                      restricted by the CPSC, Health Canada, or any major EU
                      product safety regulator. However, Amazon restricts the
                      sale of these products because they have been linked to
                      drowning incidents - the design restricts leg movement in
                      water, creating a genuine risk for young swimmers. Amazon
                      identified the safety signal independently and acted on it,
                      regardless of the absence of formal regulatory action.
                    </p>
                  </WarmCard>

                  <WarmCard label="Case Study · 02" title="Mouth tape products">
                    <p>
                      Mouth tapes became a widely popular wellness trend, with
                      products sold across Amazon&rsquo;s marketplaces generating
                      significant sales volumes. Amazon restricted the category
                      after identifying safety concerns around breathing
                      obstruction in adults and children during sleep - ahead of
                      formal action from regulators. Popularity and sales volume
                      offered no protection once Amazon determined the product
                      presented a safety risk.
                    </p>
                  </WarmCard>

                  <P>
                    In both cases, sellers were required to submit test reports,
                    product images, packaging images, product labels, and other
                    supporting documentation before their listings could be
                    reviewed for reinstatement. This is the standard Amazon
                    process when a safety concern is raised - and it is exactly
                    the kind of situation Amazon Safety Pro exists to help sellers
                    navigate.
                  </P>
                </article>

                <SectionDivider />

                {/* 4b */}
                <article id="section-4b" className="scroll-mt-32">
                  <SectionHeading
                    num="2"
                    title="Global product safety policies across different marketplaces"
                  />
                  <P>
                    Amazon operates across multiple global marketplaces, each
                    subject to the regulatory framework of its respective country
                    or region. Sellers are responsible for ensuring their products
                    comply with the standards applicable to every marketplace in
                    which they sell.
                  </P>

                  <SubHeading>United States (amazon.com)</SubHeading>
                  <P>
                    Product safety in the US marketplace is primarily governed by
                    the Consumer Product Safety Commission (CPSC) and enforced
                    through the Consumer Product Safety Improvement Act (CPSIA).
                    Key requirements include:
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
                    The Canadian marketplace is regulated by Health Canada under
                    the Canada Consumer Product Safety Act (CCPSA). Products sold
                    on amazon.ca must not pose an unreasonable danger to human
                    health or safety. In addition to the CCPSA&rsquo;s general
                    requirements, many product categories in Canada are subject to
                    specific Statutory Orders and Regulations (SOR standards) -
                    mandatory technical regulations that set out detailed safety
                    requirements for particular product types, including
                    children&rsquo;s toys, cribs, car seats, electrical products,
                    and more. Sellers must identify and comply with the relevant
                    SOR standards for their product category before listing on the
                    Canadian marketplace. Sellers may be required to provide a
                    General Certificate of Conformity (GCC) or equivalent
                    documentation demonstrating compliance with the applicable SOR
                    standards.
                  </P>

                  <SubHeading>European Union</SubHeading>
                  <P>
                    EU marketplaces are governed by a comprehensive framework of
                    product safety directives and regulations, including:
                  </P>
                  <BulletList
                    items={[
                      "General Product Safety Regulation (GPSR) - applies to all consumer products not covered by a specific directive",
                      "CE marking requirements for applicable product categories",
                      "REACH regulation governing chemical substances in products",
                      "RoHS directive for electrical and electronic equipment",
                      "EN 71 toy safety standard for toys sold in the EU",
                      "EU Declaration of Conformity (DoC) required for CE-marked products",
                    ]}
                  />
                  <P>
                    Note: Following Brexit, the United Kingdom has its own
                    separate product safety framework (UKCA marking) for products
                    sold on amazon.co.uk.
                  </P>
                </article>

                <SectionDivider />

                {/* 4c-i */}
                <article id="section-4c-i" className="scroll-mt-32">
                  <SectionHeading
                    num="3"
                    title="Products requiring safety documents"
                  />
                  <P>
                    Amazon applies a range of product-specific compliance
                    requirements that sellers must understand before listing.
                    These fall into four main categories.
                  </P>
                  <P>
                    Certain product categories are flagged by Amazon as requiring
                    safety documentation before a listing can go live or remain
                    active. These typically include children&rsquo;s products,
                    electrical and electronic goods, chemical products, food
                    contact materials, personal protective equipment, and products
                    containing lithium batteries.
                  </P>
                  <P>
                    When Amazon requests safety documentation, sellers are
                    typically required to submit a combination of the following:
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
                    Amazon&rsquo;s specified timeframe will typically result in
                    immediate listing suppression. Sellers who are unsure what
                    specific documents are required for their product and
                    marketplace should seek expert guidance before responding to a
                    compliance notification.
                  </P>
                </article>

                <SectionDivider />

                {/* 4c-ii */}
                <article id="section-4c-ii" className="scroll-mt-32">
                  <SectionHeading num="4" title="Restricted Products" />
                  <P>
                    Amazon maintains a list of restricted products that may not be
                    sold on the platform, or may only be sold with prior approval.
                    The term &lsquo;restricted&rsquo; covers three distinct
                    situations and understanding the difference matters, because the
                    consequences and the options available to you are very different
                    depending on which type applies to your product.
                  </P>

                  <SubHeading>Gated - Pre-Approval Required</SubHeading>
                  <P>
                    Some categories require sellers to apply for and receive
                    Amazon&apos;s approval before listing. Approval typically
                    involves meeting performance criteria, providing supplier
                    documentation, and in some cases paying an application fee.
                    Being approved does not override the requirement to comply with
                    all applicable safety standards.
                  </P>

                  <SubHeading>Restricted - Compliance Required</SubHeading>
                  <P>
                    Restricted products can be sold on Amazon but only after meeting
                    specific compliance requirements: submitting safety documents,
                    obtaining certifications, or meeting labeling standards. The
                    listing will remain suppressed until the required compliance
                    information is provided and verified. This covers the majority
                    of product categories with safety or regulatory requirements,
                    including children&apos;s products, dietary supplements,
                    electronics, cosmetics, and food products.
                  </P>

                  <SubHeading>Prohibited - No Listing Pathway</SubHeading>
                  <P>
                    Prohibited products cannot be listed on Amazon under any
                    circumstances. There is no approval process, no compliance
                    document that will unlock the listing, and no appeal pathway.
                    Common examples include mad honey, cylindrical lithium-ion
                    batteries, powerful magnets such as Buckyballs, infant inclined
                    sleep products, and water beads.
                  </P>
                  <P>
                    Attempting to list a prohibited product will result in immediate
                    removal. Repeated attempts can lead to account suspension and
                    permanent loss of selling privileges.
                  </P>

                  <SubHeading>Why Amazon Restricts Products</SubHeading>
                  <P>
                    Amazon restricts products for five core reasons: consumer
                    safety, legal compliance, regulatory requirements from bodies
                    such as the FDA, CPSC, and FCC, marketplace trust, and
                    intellectual property protection. Importantly, Amazon does not
                    wait for a regulator to act before restricting a product - it
                    monitors safety signals independently and acts on them
                    proactively, as seen with water beads, mermaid tails, and mouth
                    tape, all of which Amazon restricted ahead of formal regulatory
                    action.
                  </P>

                  <SubHeading>Consequences of Selling a Restricted Product</SubHeading>
                  <P>
                    If Amazon determines that you have listed or sold a restricted
                    or prohibited product, the consequences can be immediate. These
                    include listing suppression or removal, financial losses on
                    inventory already procured, storage and warehouse charges for
                    unsellable stock, product destruction charges, compensation
                    claims from injured customers, and regulatory scrutiny from the
                    CPSC, FDA, or other federal and state agencies.
                  </P>

                  <SubHeading>What If Your Product Has Been Incorrectly Restricted?</SubHeading>
                  <P>
                    Amazon&apos;s automated systems are not perfect. Products are
                    sometimes restricted due to incorrect classification, listing
                    content issues, or keyword triggers that do not accurately
                    reflect what the product is. Common causes include product
                    titles or bullet points containing terms that trigger a
                    restricted category, images that resemble a restricted product
                    type, or a product name that resembles a controlled substance or
                    prohibited item. If you believe your product has been
                    incorrectly restricted, the classification and listing content
                    should be reviewed before submitting any appeal.
                  </P>

                  <P>
                    For the complete list of restricted and prohibited product
                    categories on Amazon, visit the official Amazon seller help
                    pages. Amazon updates this list regularly - sellers should check
                    it before launching any new product.
                  </P>
                </article>

                <SectionDivider />

                {/* 4c-iii */}
                <article id="section-4c-iii" className="scroll-mt-32">
                  <SectionHeading
                    num="5"
                    title="Dangerous goods (Hazmat)"
                  />
                  <P>
                    Amazon classifies products containing hazardous materials as
                    Dangerous Goods. These include products that are flammable,
                    pressurised, corrosive, toxic, or otherwise pose a risk during
                    storage, handling, or transport. Common examples include
                    lithium batteries and battery-powered products, aerosols and
                    pressurised containers, and flammable liquids. Sellers listing
                    Dangerous Goods must provide a Safety Data Sheet (SDS) and
                    ensure their products are properly classified. Misclassification
                    can result in listing restrictions, removal from FBA, or
                    account suspension.
                  </P>
                </article>

                <SectionDivider />

                {/* 4c-iv */}
                <article id="section-4c-iv" className="scroll-mt-32">
                  <SectionHeading
                    num="6"
                    title="Amazon TIC Policy - Testing, Inspection and Certification"
                  />

                  <SubHeading>What is TIC?</SubHeading>
                  <P>
                    Testing, Inspection and Certification (TIC) refers to the
                    services provided by independent, accredited third-party
                    organizations that evaluate products against applicable safety
                    standards and regulations. In the context of Amazon, TIC is
                    the framework through which Amazon requires sellers to prove -
                    not just claim - that their products are safe and compliant.
                    Under Amazon&rsquo;s TIC policy, test results and compliance
                    data must be submitted directly to Amazon by an
                    Amazon-approved TIC organization, not uploaded manually by the
                    seller. This direct-from-lab verification model was introduced
                    to eliminate falsified or altered test reports and to ensure
                    the integrity of every compliance submission on the platform.
                  </P>

                  <SubHeading>How the TIC process works</SubHeading>
                  <P>
                    When an ASIN is flagged under Amazon&rsquo;s TIC compliance
                    process, the seller receives a notification through their
                    Account Health dashboard under Policy Compliance. The process
                    then follows these steps:
                  </P>
                  <NumberedList
                    items={[
                      "The seller navigates to Account Health, selects the affected ASIN, and clicks \"Verify your product\"",
                      "Amazon generates a Test Request Form (TRF) ID - a unique compliance reference number that links the seller's specific ASIN to the testing submission",
                      "The seller selects an Amazon-approved TIC provider from the approved directory in Seller Central",
                      "The TIC provider contacts the seller with a quote covering cost and timelines, and the seller accepts and provides product samples or existing documentation",
                      "The TIC provider either conducts fresh laboratory testing or evaluates existing documentation to confirm it meets Amazon's requirements",
                      "Upon successful verification, the TIC provider submits the results directly to Amazon via a secure integration - the seller cannot upload the results themselves",
                      "Amazon reviews the submission and, if accepted, reinstates the listing",
                    ]}
                  />

                  <KeyPointCallout>
                    <strong style={{ color: "#2D2A26" }}>Important:</strong> The
                    TRF ID must be provided to the TIC lab before testing begins.
                    Without it, the lab cannot link the test results to the
                    seller&rsquo;s Amazon account, and the listing will remain
                    suppressed even if the product passes all tests.
                  </KeyPointCallout>

                  <SubHeading>Which products are subject to TIC requirements?</SubHeading>
                  <P>
                    Amazon has expanded the TIC program across multiple product
                    categories. As of September 2025, TIC compliance is required
                    for children&rsquo;s toys sold in the US and Canada stores,
                    with annual testing or document verification now mandatory.
                    The program also covers dietary supplements, where
                    Amazon-approved TIC providers must submit compliance data
                    directly. Additional product categories are subject to TIC
                    requirements - the full and current list of affected
                    categories and approved TIC providers is available in the TIC
                    directory within Amazon Seller Central at:{" "}
                    <a
                      href="https://sellercentral.amazon.com/help/hub/reference/external/GUTZ2R2DD6P2UMVB"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline underline-offset-2 transition-opacity hover:opacity-70"
                      style={{ color: "#B8860B" }}
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
                    provider from this directory - test reports from non-listed
                    laboratories, even if accredited, will not be accepted under
                    the TIC program. Labs can also be suspended or removed from
                    the approved list over time, so sellers should verify their
                    provider&rsquo;s status at the point of each compliance
                    submission.
                  </P>

                  <SubHeading>Key enforcement rules under TIC</SubHeading>
                  <BulletList
                    items={[
                      "Test reports must reference the current version of the applicable standard - for example, Amazon now requires ASTM F963-23 for US toys; reports based on older versions such as ASTM F963-17 may be rejected",
                      "The age grading on the product listing, the CPC, and the test report must all be consistent - any mismatch will result in rejection",
                      "Packaging, labels, warning statements, and tracking label information must align precisely with what is documented in the test report",
                      "TIC verification is not a one-time event - Amazon requires annual re-verification for applicable categories, making compliance an ongoing operating responsibility",
                      "Sellers cannot rely on existing test reports indefinitely - where a standard has been updated, retesting to the new version is required",
                    ]}
                  />

                  <SubHeading>What this means for sellers</SubHeading>
                  <P>
                    The TIC program represents a significant shift in how Amazon
                    enforces compliance - moving from a self-declaration model to
                    a verified, third-party-led system with direct platform
                    integration. For sellers in affected categories, compliance is
                    no longer a one-time launch task. It is a recurring,
                    documented, annually verified obligation that requires careful
                    management of test reports, certification timelines, lab
                    relationships, and submission deadlines.
                  </P>
                  <P>
                    Navigating the TIC process - especially when an ASIN has
                    already been flagged or suppressed - is one of the areas where
                    Amazon Safety Pro&rsquo;s insider knowledge delivers the
                    greatest advantage. We understand how the TIC workflow
                    operates within Amazon&rsquo;s systems, which providers have
                    the strongest track record, and how to move a flagged ASIN
                    through the verification process as efficiently as possible.
                  </P>
                </article>

                {/* Bottom CTA */}
                <div
                  className="mt-16 rounded-2xl p-10 text-center"
                  style={{ background: "#1B4332" }}
                >
                  <p
                    className="text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "#B8860B", fontFamily: "Outfit, sans-serif" }}
                  >
                    Next Step
                  </p>
                  <h2
                    className="mt-4 text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      color: "#FAF7F2",
                      fontWeight: 400,
                    }}
                  >
                    Got a flagged ASIN or a compliance notice?
                  </h2>
                  <p
                    className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed"
                    style={{
                      color: "rgba(250,247,242,0.75)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Send us your case details for review. A real ex-Amazonian
                    will go through your case personally.
                  </p>
                  <Link
                    href="/contact?inquiry=not_sure_need_advice"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
                    style={{
                      background: "#B8860B",
                      color: "#FAF7F2",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Send Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
