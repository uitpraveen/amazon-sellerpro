"use client";

import { motion } from "framer-motion";
import { Award, Users, Zap, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type TeamItem = {
  num: string;
  label: string;
  title: string;
  body: React.ReactNode;
  Icon: LucideIcon;
};

const TEAM_ITEMS: TeamItem[] = [
  {
    num: "01",
    label: "Leadership",
    title: "Led by a tenured Amazonian & industry veteran",
    body: (
      <>
        <p>
          Our group lead is a tenured Amazon product safety professional who
          spent half a decade shaping compliance policy from within - including
          creating policies that are live and actively enforced on Amazon&apos;s
          platform today. Prior to Amazon, our lead brought extensive experience
          from the toys and children&apos;s products industry, one of the most
          rigorously regulated product spaces in global retail. That combination
          - deep industry knowledge followed by years at the heart of
          Amazon&apos;s product safety team - means our clients benefit from
          expertise that spans both sides of the compliance equation.
        </p>
        <p className="mt-4">
          Beyond policy enforcement, our group lead was directly involved in
          reshaping Amazon&apos;s seller-facing help pages - rewriting and
          restructuring content to give sellers clearer, more actionable
          guidance on compliance requirements. This included modifying the
          error and blurb messages sellers receive when their listings are
          flagged or suspended, rewriting them for clarity so sellers could
          actually understand what was wrong and what action to take.
        </p>
        <p className="mt-4">
          Our lead also authored and shaped several of Amazon&apos;s
          product-specific policies that are actively enforced today, including:
        </p>
        <ul className="mt-3 space-y-1.5 pl-1">
          {[
            "Children's Sleepwear - refocused to target the correct product types",
            "Teethers and teething products",
            "Children's toys",
            "Water beads",
            "Mouth tape",
            "Mermaid tail swimwear",
            "Infant sleep products",
            "Several other children's product categories",
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#B8860B]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          When Amazon&apos;s compliance system flags your product, sends you a
          blurb, or requests documentation - there is a strong chance our team
          had a hand in writing that very requirement. That is the depth of
          insider knowledge Amazon Safety Pro brings to your case.
        </p>
      </>
    ),
    Icon: Award,
  },
  {
    num: "02",
    label: "Specialists",
    title: "A team of subject matter experts",
    body: (
      <>
        <p>
          Every member of the Amazon Safety Pro team has worked directly inside
          Amazon - not in an advisory capacity, but hands-on, validating real
          seller compliance documents, reviewing real cases, and making real
          decisions on whether products met Amazon&apos;s safety standards.
        </p>
        <p className="mt-4">
          Our specialists did not just observe Amazon&apos;s compliance process
          - they were an active part of it. They reviewed seller-submitted
          documentation, assessed product safety evidence, and in many cases,
          worked directly on improving the policies and processes that govern
          how Amazon evaluates seller compliance today. The changes they
          contributed to were designed with one goal in mind: to make the
          compliance experience clearer, fairer, and more navigable for sellers.
        </p>
        <p className="mt-4">
          That on-the-ground experience is what our clients benefit from. When
          you submit your compliance documents to Amazon Safety Pro, the person
          reviewing them has done exactly this before - at Amazon, at scale,
          for real.
        </p>
      </>
    ),
    Icon: Users,
  },
  {
    num: "03",
    label: "Responsiveness",
    title: "Ready for your case",
    body: (
      <p>
        Whether it&apos;s a quick query or a complex compliance challenge, our
        team is ready to attend to your specific situation with the depth and
        urgency it deserves.
      </p>
    ),
    Icon: Zap,
  },
  {
    num: "04",
    label: "Currency",
    title: "Always current",
    body: (
      <p>
        We actively monitor Amazon policy updates so our clients stay compliant
        as requirements change - never caught off guard, always one step ahead.
      </p>
    ),
    Icon: RefreshCw,
  },
];

const STATS = [
  { value: "5+", unit: "Years", label: "Inside Amazon" },
  { value: "100%", unit: "", label: "Ex-Amazonians" },
  { value: "07", unit: "", label: "Jurisdictions" },
];

const MARKETS = [
  { code: "US", name: "United States", marketplace: "amazon.com" },
  { code: "CA", name: "Canada", marketplace: "amazon.ca" },
  { code: "EU", name: "European Union", marketplace: "amazon.de · .fr · .it" },
  { code: "UK", name: "United Kingdom", marketplace: "amazon.co.uk" },
  { code: "IN", name: "India", marketplace: "amazon.in" },
  { code: "SG", name: "Singapore", marketplace: "amazon.sg" },
  { code: "AU", name: "Australia", marketplace: "amazon.com.au" },
];

function SectionDivider() {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-[#B8860B]" />
      <span className="h-px flex-1 bg-[#E8E0D4]" />
    </div>
  );
}

export default function AboutDossierSection() {
  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[#FAF7F2] pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B8860B]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 max-w-4xl text-5xl sm:text-6xl lg:text-7xl text-[#2D2A26] leading-[1.0]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Who we are.
            </motion.h1>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp}
              className="mt-12 lg:mt-16 grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border-l-2 border-[#B8860B] pl-4 sm:pl-5"
                >
                  <p
                    className="text-3xl sm:text-4xl lg:text-5xl text-[#1B4332] leading-none"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {s.value}
                    {s.unit && (
                      <span className="ml-1 text-base sm:text-lg text-[#6B6560]">
                        {s.unit}
                      </span>
                    )}
                  </p>
                  <p
                    className="mt-2 text-xs sm:text-sm uppercase tracking-[0.14em] text-[#6B6560]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Brief pull-quote - moved directly under the "Who we are" stats, no "The brief." header */}
            <motion.div
              variants={fadeUp}
              className="mt-12 lg:mt-16 rounded-2xl border-l-4 border-[#B8860B] bg-[#FFFDF9] px-6 sm:px-10 py-7 sm:py-9"
            >
              <p
                className="text-xl sm:text-2xl lg:text-3xl text-[#2D2A26] leading-snug"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Amazon Safety Pro exists for one reason - to give Amazon
                sellers the compliance expertise they need to protect their
                listings, recover their revenue, and build a business that
                stays compliant for the long term. We are not consultants who
                learned Amazon&apos;s rules by reading help pages.{" "}
                <span className="italic">We are the people who wrote them.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Narrative sections ── */}
      <section className="bg-[#FAF7F2] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="space-y-20">

            {/* Origin */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <SectionDivider />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Why we started Amazon Safety Pro.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-8 text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon sellers face one of the most complex and consequential
                compliance environments in global e-commerce - and far too
                many of them are navigating it without the right support. The
                cost is real: lost revenue, suppressed listings, stranded
                inventory, and suspended accounts that could have been avoided
                with the right guidance at the right time.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                What pushed us to act was hearing it directly from sellers. At
                past Amazon Seller Accelerate events in Seattle, we sat in
                rooms with sellers who were frustrated, confused, and stuck.
                Sellers who had received compliance notices they could not
                decode, submitted appeals that kept getting rejected, and had
                no clear path to reinstatement. The support available to them
                was minimal - and the gap between what sellers needed and what
                they were getting was impossible to ignore.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon Safety Pro exists to close that gap. We bring expert
                compliance consultation directly to sellers - giving them the
                clarity, the documentation, and the strategic guidance they
                need to protect their listings, recover their revenue, and
                build a business that stays compliant for the long term.
              </motion.p>
            </motion.div>

            {/* Team */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <SectionDivider />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                What our team brings.
              </motion.h2>

              <motion.div
                variants={stagger}
                /* No `auto-rows-fr`: each grid row sizes to its own content,
                   so the short 03/04 row no longer stretches to match the
                   tall 01/02 row (which causes ugly empty space at the
                   bottom of the short cards). */
                className="mt-10 grid gap-6 sm:grid-cols-2"
              >
                {TEAM_ITEMS.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <motion.div
                      key={item.num}
                      variants={fadeUp}
                      className="group relative flex flex-col rounded-2xl border border-[#E8E0D4] bg-white p-7 sm:p-8 border-l-4 border-l-[#B8860B] transition-shadow hover:shadow-[0_8px_24px_rgba(45,42,38,0.06)] h-full"
                    >
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-4">
                          <span
                            className="text-4xl sm:text-5xl font-light text-[#B8860B]/70 leading-none"
                            style={{ fontFamily: "var(--font-dm-serif)" }}
                          >
                            {item.num}
                          </span>
                          <span
                            className="text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-[#B8860B]"
                            style={{ fontFamily: "var(--font-outfit)" }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#0a1f15] flex items-center justify-center shadow-md shadow-[#1B4332]/15 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,134,11,0.25),transparent_60%)]" />
                          <Icon
                            size={22}
                            strokeWidth={1.5}
                            className="text-[#B8860B] relative z-10"
                          />
                        </div>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl text-[#2D2A26] mb-4 leading-snug"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {item.title}
                      </h3>
                      <div
                        className="flex-1 min-h-0 text-[#6B6560] leading-relaxed text-base sm:text-lg space-y-0 overflow-y-auto pr-2 sm:max-h-[420px] scrollbar-thin"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          scrollbarWidth: "thin",
                          scrollbarColor: "#B8860B40 transparent",
                        }}
                      >
                        {item.body}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Markets we serve */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <SectionDivider />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Markets we serve.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon Safety Pro supports sellers across seven Amazon
                marketplaces - bringing the same depth of insider knowledge to
                every jurisdiction we operate in.
              </motion.p>

              <motion.div
                variants={stagger}
                className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
              >
                {MARKETS.map((m) => (
                  <motion.div
                    key={m.code}
                    variants={fadeUp}
                    className="group relative rounded-2xl border border-[#E8E0D4] bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#B8860B]/40 hover:shadow-[0_8px_24px_rgba(45,42,38,0.06)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-baseline justify-between mb-4">
                      <span
                        className="text-3xl sm:text-4xl text-[#1B4332] leading-none"
                        style={{ fontFamily: "var(--font-dm-serif)" }}
                      >
                        {m.code}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#B8860B] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p
                      className="text-sm sm:text-base font-semibold text-[#2D2A26]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {m.name}
                    </p>
                    <p
                      className="mt-1 text-xs text-[#6B6560]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {m.marketplace}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Mission - centered closing block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center"
            >
              <motion.div
                variants={fadeUp}
                className="mx-auto mb-6 h-px w-16 bg-[#B8860B]"
              />
              <motion.p
                variants={fadeUp}
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#B8860B] mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Our North Star
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26] leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Our mission.
              </motion.h2>

              {/* Mission quote - dark green card */}
              <motion.div
                variants={fadeUp}
                className="relative mt-10 mx-auto max-w-3xl rounded-2xl border border-[#B8860B]/30 bg-[#1B4332] px-8 py-10 sm:px-12 sm:py-14 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(184,134,11,0.18),transparent_60%)] pointer-events-none" />
                <span
                  className="absolute top-4 left-6 text-7xl sm:text-8xl text-[#B8860B]/30 leading-none select-none"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="relative z-10 text-xl sm:text-2xl italic text-[#FAF7F2] leading-snug"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  To empower every Amazon seller - regardless of size or
                  experience - with the expert compliance knowledge and support
                  they need to build a safe, sustainable, and thriving business
                  on Amazon.
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                We measure our success by yours. When your listings stay live,
                your products meet every standard, and your business keeps
                growing - that&rsquo;s what Amazon Safety Pro is here for.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
