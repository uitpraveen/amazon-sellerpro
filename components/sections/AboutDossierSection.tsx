"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Zap, RefreshCw } from "lucide-react";
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
  body: string;
  Icon: LucideIcon;
};

const TEAM_ITEMS: TeamItem[] = [
  {
    num: "01",
    label: "Leadership",
    title: "Led by a tenured Amazonian & industry veteran",
    body: "Our group lead is a tenured Amazon product safety professional who spent half a decade shaping compliance policy from within — including creating policies that are live and actively enforced on Amazon's platform today. Prior to Amazon, our lead brought extensive experience from the toys and children's products industry, one of the most rigorously regulated product spaces in global retail. That combination — deep industry knowledge followed by years at the heart of Amazon's product safety team — means our clients benefit from expertise that spans both sides of the compliance equation.",
    Icon: Award,
  },
  {
    num: "02",
    label: "Specialists",
    title: "A team of subject matter experts",
    body: "Every member of the Amazon Safety Pro team is a subject matter expert in their field — from product safety standards and marketplace policy to documentation compliance. Rather than a generalist team that covers everything at surface level, we bring specialists who have worked directly inside Amazon and carry practitioner-level knowledge into every case they handle.",
    Icon: Users,
  },
  {
    num: "03",
    label: "Responsiveness",
    title: "Ready for your case",
    body: "Whether it's a quick query or a complex compliance challenge, our team is ready to attend to your specific situation with the depth and urgency it deserves.",
    Icon: Zap,
  },
  {
    num: "04",
    label: "Currency",
    title: "Always current",
    body: "We actively monitor Amazon policy updates so our clients stay compliant as requirements change — never caught off guard, always one step ahead.",
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
          </motion.div>
        </div>
      </section>

      {/* ── Narrative sections ── */}
      <section className="bg-[#FAF7F2] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="space-y-20">

            {/* Introduction */}
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
                The brief.
              </motion.h2>

              {/* Pull-quote card */}
              <motion.div
                variants={fadeUp}
                className="mt-8 max-w-4xl rounded-2xl border-l-4 border-[#B8860B] bg-[#FFFDF9] px-8 py-7"
              >
                <p
                  className="text-xl sm:text-2xl text-[#2D2A26] leading-snug"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  &ldquo;We are Amazon Safety Pro — a group of compliance and
                  product safety experts, built from within Amazon, who exist
                  for one reason: to help sellers succeed on Amazon without the
                  compliance guesswork.&rdquo;
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon Safety Pro was founded by a compliance and product
                safety specialist with over half a decade of direct, tenured
                experience inside Amazon&rsquo;s product safety operations.
                What sets our foundation apart is not just the years spent
                inside Amazon — it is the depth of contribution. Our group
                lead was part of the team that created and shaped the very
                product safety policies that Amazon enforces on sellers today.
                The compliance requirements you are navigating as a seller
                were, in part, written by the person now leading your case.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Backed by a dedicated team of fellow ex-Amazonians and subject
                matter experts — each with deep, specialized expertise in
                their respective compliance fields — we are uniquely
                positioned to give sellers the kind of guidance that simply
                cannot be found elsewhere. We did not learn Amazon&rsquo;s
                compliance requirements by reading help pages. We built them,
                enforced them, and refined them from within. That is what
                makes Amazon Safety Pro genuinely different — and what makes
                our guidance genuinely effective.
              </motion.p>
            </motion.div>

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
                className="mt-8 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon sellers face one of the most complex and consequential
                compliance environments in global e-commerce — and far too
                many of them are navigating it without the right support. The
                cost is real: lost revenue, suppressed listings, stranded
                inventory, and suspended accounts that could have been avoided
                with the right guidance at the right time.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                What pushed us to act was hearing it directly from sellers. At
                past Amazon Seller Accelerate events in Seattle, we sat in
                rooms with sellers who were frustrated, confused, and stuck.
                Sellers who had received compliance notices they could not
                decode, submitted appeals that kept getting rejected, and had
                no clear path to reinstatement. The support available to them
                was minimal — and the gap between what sellers needed and what
                they were getting was impossible to ignore.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon Safety Pro exists to close that gap. We bring expert
                compliance consultation directly to sellers — giving them the
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
                className="mt-10 grid gap-6 sm:grid-cols-2"
              >
                {TEAM_ITEMS.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <motion.div
                      key={item.num}
                      variants={fadeUp}
                      className="group relative flex flex-col rounded-2xl border border-[#E8E0D4] bg-white p-7 sm:p-8 border-l-4 border-l-[#B8860B] transition-shadow hover:shadow-[0_8px_24px_rgba(45,42,38,0.06)]"
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
                      <p
                        className="text-[#6B6560] leading-relaxed text-base sm:text-lg"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {item.body}
                      </p>
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
                className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Amazon Safety Pro supports sellers across seven Amazon
                marketplaces — bringing the same depth of insider knowledge to
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

            {/* Mission — centered closing block */}
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

              {/* Mission quote — dark green card */}
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
                  To empower every Amazon seller — regardless of size or
                  experience — with the expert compliance knowledge and support
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
                growing — that&rsquo;s what Amazon Safety Pro is here for.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA — matches HomeCTA style ── */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/shield-protect.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,67,50,0.88)] to-[rgba(27,67,50,0.95)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Ready to get compliant?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[#FAF7F2]/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Submit your documents for a free review. A real ex-Amazonian will
              personally assess your case.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/free-validation"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B8860B] hover:bg-[#a07609] text-white font-semibold transition-colors"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Submit your documents <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
