import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FramedBlock from "@/components/ui/FramedBlock";
import HairlineDivider from "@/components/ui/HairlineDivider";
import TransmissionRow from "@/components/ui/TransmissionRow";
import TacticalButton from "@/components/ui/TacticalButton";

export default function AboutDossierSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
        {/* Page header */}
        <RevealOnScroll showLine={false}>
          <MonoLabel prefix="→">FILE // ABOUT // OPEN</MonoLabel>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Who we are.
          </h1>
        </RevealOnScroll>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          {/* Left — RECORD dossier */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FramedBlock className="bg-[var(--paper-edge)]/60">
                <MonoLabel prefix="→">RECORD</MonoLabel>
                <div className="mt-6 space-y-0">
                  <TransmissionRow label="Entity" value="Proxima CPEX LLC" />
                  <TransmissionRow label="Brand" value="Amazon Safety Pro" />
                  <TransmissionRow label="Location" value="Tamil Nadu, IN" />
                  <TransmissionRow label="Founded" value="2026" />
                  <TransmissionRow label="Lead" value="Tenured Ex-Amazonian" />
                  <TransmissionRow label="Inside Amazon" value="5+ Years" />
                  <TransmissionRow label="Jurisdictions" value="07" />
                  <TransmissionRow label="Status" value="Active" />
                </div>
              </FramedBlock>
              <div className="mt-6">
                <MonoLabel prefix="//">FILE OPENED 2026 · CLASSIFIED OPS</MonoLabel>
              </div>
            </div>
          </aside>

          {/* Right — Narrative */}
          <div className="space-y-24 lg:col-span-8">
            {/* MISSION */}
            <RevealOnScroll>
              <MonoLabel prefix="→">SECTION 01 // INTRODUCTION</MonoLabel>
              <h2 className="mt-4 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
                The brief.
              </h2>
              <FramedBlock
                bracketColor="var(--signal)"
                className="mt-8 bg-[var(--signal-soft)]/40"
              >
                <p className="text-xl font-medium leading-snug text-[var(--ink)] sm:text-2xl">
                  &ldquo;We are Amazon Safety Pro — a group of compliance and
                  product safety experts, built from within Amazon, who exist
                  for one reason: to help sellers succeed on Amazon without the
                  compliance guesswork.&rdquo;
                </p>
              </FramedBlock>
              <p className="mt-8 text-lg leading-relaxed text-[var(--ink-2)]">
                Amazon Safety Pro was founded by a compliance and product
                safety specialist with over half a decade of direct, tenured
                experience inside Amazon&rsquo;s product safety operations.
                What sets our foundation apart is not just the years spent
                inside Amazon — it is the depth of contribution. Our group
                lead was part of the team that created and shaped the very
                product safety policies that Amazon enforces on sellers today.
                The compliance requirements you are navigating as a seller
                were, in part, written by the person now leading your case.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">
                Backed by a dedicated team of fellow ex-Amazonians and subject
                matter experts — each with deep, specialized expertise in
                their respective compliance fields — we are uniquely
                positioned to give sellers the kind of guidance that simply
                cannot be found elsewhere. We did not learn Amazon&rsquo;s
                compliance requirements by reading help pages. We built them,
                enforced them, and refined them from within. That is what
                makes Amazon Safety Pro genuinely different — and what makes
                our guidance genuinely effective.
              </p>
            </RevealOnScroll>

            {/* ORIGIN */}
            <RevealOnScroll>
              <MonoLabel prefix="→">SECTION 02 // ORIGIN</MonoLabel>
              <h2 className="mt-4 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
                Why we started Amazon Safety Pro.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-[var(--ink-2)]">
                Amazon sellers face one of the most complex and consequential
                compliance environments in global e-commerce — and far too
                many of them are navigating it without the right support. The
                cost is real: lost revenue, suppressed listings, stranded
                inventory, and suspended accounts that could have been avoided
                with the right guidance at the right time.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">
                What pushed us to act was hearing it directly from sellers. At
                past Amazon Seller Accelerate events in Seattle, we sat in
                rooms with sellers who were frustrated, confused, and stuck.
                Sellers who had received compliance notices they could not
                decode, submitted appeals that kept getting rejected, and had
                no clear path to reinstatement. The support available to them
                was minimal — and the gap between what sellers needed and what
                they were getting was impossible to ignore.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">
                Amazon Safety Pro exists to close that gap. We bring expert
                compliance consultation directly to sellers — giving them the
                clarity, the documentation, and the strategic guidance they
                need to protect their listings, recover their revenue, and
                build a business that stays compliant for the long term.
              </p>
            </RevealOnScroll>

            {/* TEAM */}
            <RevealOnScroll>
              <MonoLabel prefix="→">SECTION 03 // TEAM</MonoLabel>
              <h2 className="mt-4 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
                What our team brings.
              </h2>

              <div className="mt-10 space-y-8">
                {[
                  {
                    label: "01 / LEADERSHIP",
                    title: "Led by a tenured Amazonian & industry veteran",
                    body: "Our group lead is a tenured Amazon product safety professional who spent half a decade shaping compliance policy from within — including creating policies that are live and actively enforced on Amazon's platform today. Prior to Amazon, our lead brought extensive experience from the toys and children's products industry, one of the most rigorously regulated product spaces in global retail. That combination — deep industry knowledge followed by years at the heart of Amazon's product safety team — means our clients benefit from expertise that spans both sides of the compliance equation.",
                  },
                  {
                    label: "02 / SPECIALISTS",
                    title: "A team of subject matter experts",
                    body: "Every member of the Amazon Safety Pro team is a subject matter expert in their field — from product safety standards and marketplace policy to documentation compliance. Rather than a generalist team that covers everything at surface level, we bring specialists who have worked directly inside Amazon and carry practitioner-level knowledge into every case they handle.",
                  },
                  {
                    label: "03 / RESPONSIVENESS",
                    title: "Ready for your case",
                    body: "Whether it's a quick query or a complex compliance challenge, our team is ready to attend to your specific situation with the depth and urgency it deserves.",
                  },
                  {
                    label: "04 / CURRENCY",
                    title: "Always current",
                    body: "We actively monitor Amazon policy updates so our clients stay compliant as requirements change — never caught off guard, always one step ahead.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-l-2 border-[var(--signal)] pl-6"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--signal)]">
                      {item.label}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[var(--ink-2)]">{item.body}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* MISSION STATEMENT */}
            <RevealOnScroll>
              <MonoLabel prefix="→">SECTION 04 // MISSION</MonoLabel>
              <h2 className="mt-4 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
                Our mission.
              </h2>
              <FramedBlock
                bracketColor="var(--signal)"
                className="mt-8 bg-[var(--ink)] text-[var(--paper)]"
              >
                <p className="text-xl font-medium leading-snug sm:text-2xl">
                  &ldquo;To empower every Amazon seller — regardless of size or
                  experience — with the expert compliance knowledge and support
                  they need to build a safe, sustainable, and thriving business
                  on Amazon.&rdquo;
                </p>
              </FramedBlock>
              <p className="mt-8 text-lg leading-relaxed text-[var(--ink-2)]">
                We measure our success by yours. When your listings stay live,
                your products meet every standard, and your business keeps
                growing — that&rsquo;s what Amazon Safety Pro is here for.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div className="mt-32">
          <HairlineDivider label="OPEN A CASE" />
        </div>

        <RevealOnScroll className="mt-12 text-center" showLine={false}>
          <TacticalButton href="/free-validation">
            Submit your documents for a free review
          </TacticalButton>
        </RevealOnScroll>
      </div>
    </section>
  );
}
