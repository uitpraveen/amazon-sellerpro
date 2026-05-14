import type { Metadata } from "next";
import Link from "next/link";
import {
  RotateCcw,
  FileCheck,
  FileSignature,
  Check,
  ArrowRight,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing — Amazon Safety Pro",
  description:
    "Transparent, fixed-fee or hourly pricing for Amazon compliance services. Every engagement begins with a free review and a written quote.",
};

type Tier = {
  name: string;
  tagline: string;
  icon: typeof RotateCcw;
  features: string[];
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
};

const TIERS: Tier[] = [
  {
    name: "ASIN Reinstatement",
    tagline:
      "Recover stranded or suspended listings with end-to-end case handling.",
    icon: RotateCcw,
    features: [
      "Diagnosis of stranded or suspended status",
      "Review of Amazon's compliance notification",
      "Documentation gap analysis and remediation plan",
      "Direct submission and appeal handling on your behalf",
      "Follow-up support until the ASIN is reinstated",
    ],
    ctaHref: "/contact?inquiry=stranded_asin_reinstatement",
  },
  {
    name: "Document Validation",
    tagline:
      "Line-by-line review of your test reports, certificates, and safety docs.",
    icon: FileCheck,
    features: [
      "Comprehensive review of test reports and certificates",
      "Verification against Amazon's current category standards",
      "Accredited-lab and standards-currency checks",
      "Labeling and packaging review for your marketplaces",
      "Written validation report with prioritized actions",
    ],
    ctaHref: "/contact?inquiry=document_validation",
    highlighted: true,
    badge: "Most Requested",
  },
  {
    name: "Document Creation",
    tagline:
      "CPC, DOC, and GCC documents built fully compliant from the ground up.",
    icon: FileSignature,
    features: [
      "Applicable standards and requirements identification",
      "Review of existing test reports and technical files",
      "Fully compliant CPC, DOC, or GCC creation",
      "Structured for Amazon's submission requirements",
      "Ready for use across applicable marketplaces",
    ],
    ctaHref: "/contact?inquiry=cpc_doc_gcc_creation",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Free Review",
    desc: "Send your product details and Amazon notifications. We review at no cost and confirm exactly which service you need — or whether you need one at all.",
  },
  {
    num: "02",
    title: "Written Quote",
    desc: "You receive a fixed-fee or hourly quotation in writing, with scope, deliverables, and timelines clearly defined before any work begins.",
  },
  {
    num: "03",
    title: "Engagement",
    desc: "Payment confirms acceptance. Our team begins work immediately and keeps you informed at every stage through to delivery.",
  },
];

const TRUST = [
  {
    icon: Shield,
    title: "Free first review",
    desc: "Every engagement starts with a no-cost case review.",
  },
  {
    icon: Clock,
    title: "Quote within 24h",
    desc: "Written scope and fee returned within one business day.",
  },
  {
    icon: Users,
    title: "Ex-Amazon experts",
    desc: "Delivered by ex-Amazonians from the product safety team.",
  },
];

const FAQS = [
  {
    q: "Why don't you publish fixed prices?",
    a: "Compliance work is highly case-specific — fees depend on product category, marketplace, document state, and the scope of remediation needed. Publishing a one-size price would either over-quote simple cases or under-deliver on complex ones. Every quote is fixed and given in writing before work starts, so there are no surprises.",
  },
  {
    q: "What currencies do you accept?",
    a: "Fees are typically quoted in USD, but we accept payment in major currencies including EUR, GBP, and INR. Any conversion or transaction fees are the client's responsibility.",
  },
  {
    q: "Is the first review really free?",
    a: "Yes. Send your product details and any Amazon compliance notifications. Within 24 hours you'll receive an honest assessment — even if our verdict is that you don't need our services.",
  },
  {
    q: "What's your refund policy?",
    a: "We operate a strict no-refund policy once work has commenced. Cancellations before work begins are reviewed case-by-case. Full details are in our Terms.",
  },
];

const cardFont = { fontFamily: "var(--font-outfit)" };
const displayFont = { fontFamily: "var(--font-dm-serif)" };

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF7F2]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.08),transparent_60%)] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-36 lg:pt-44 pb-16 lg:pb-20 text-center">
            <p
              className="text-[#B8860B] text-xs tracking-[0.22em] uppercase mb-4 font-semibold"
              style={cardFont}
            >
              Transparent Pricing
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl text-[#2D2A26] leading-[1.05] max-w-3xl mx-auto"
              style={displayFont}
            >
              Quoted in writing.<br />
              <span className="text-[#B8860B]">Agreed before we begin.</span>
            </h1>
            <p
              className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-[#6B6560] leading-relaxed"
              style={cardFont}
            >
              Compliance work is case-specific. We quote each engagement on a
              fixed-fee or hourly basis after a free review — never an estimate,
              never a surprise.
            </p>
          </div>
        </section>

        {/* Tier cards */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
              {TIERS.map((tier) => {
                const Icon = tier.icon;
                const isHighlighted = tier.highlighted;
                return (
                  <div
                    key={tier.name}
                    className={`relative rounded-2xl p-7 lg:p-8 flex flex-col h-full transition-all ${
                      isHighlighted
                        ? "bg-[#1B4332] text-[#FAF7F2] shadow-2xl shadow-[#1B4332]/20 lg:-translate-y-3 border border-[#B8860B]/30"
                        : "bg-white text-[#2D2A26] border border-[#E8E0D4] hover:border-[#B8860B]/40 hover:shadow-lg hover:shadow-[#1B4332]/5"
                    }`}
                  >
                    {tier.badge && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase bg-[#B8860B] text-[#1f1c19]"
                        style={cardFont}
                      >
                        {tier.badge}
                      </div>
                    )}

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                        isHighlighted
                          ? "bg-[#B8860B]/15 border border-[#B8860B]/40 text-[#B8860B]"
                          : "bg-[#1B4332]/[0.06] border border-[#1B4332]/15 text-[#1B4332]"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.6} />
                    </div>

                    <h3
                      className="text-2xl lg:text-[26px] mb-2.5 leading-tight"
                      style={displayFont}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isHighlighted
                          ? "text-[#FAF7F2]/70"
                          : "text-[#6B6560]"
                      }`}
                      style={cardFont}
                    >
                      {tier.tagline}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-3xl lg:text-4xl ${
                            isHighlighted
                              ? "text-[#FAF7F2]"
                              : "text-[#2D2A26]"
                          }`}
                          style={displayFont}
                        >
                          Custom Quote
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1.5 ${
                          isHighlighted
                            ? "text-[#B8860B]"
                            : "text-[#B8860B]"
                        }`}
                        style={cardFont}
                      >
                        Fixed-fee or hourly · agreed before work begins
                      </p>
                    </div>

                    <div
                      className={`h-px w-full mb-6 ${
                        isHighlighted
                          ? "bg-[#FAF7F2]/15"
                          : "bg-[#E8E0D4]"
                      }`}
                    />

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                              isHighlighted
                                ? "bg-[#B8860B]/20 text-[#B8860B]"
                                : "bg-[#B8860B]/10 text-[#B8860B]"
                            }`}
                          >
                            <Check size={11} strokeWidth={2.5} />
                          </span>
                          <span
                            className={`text-sm leading-relaxed ${
                              isHighlighted
                                ? "text-[#FAF7F2]/85"
                                : "text-[#6B6560]"
                            }`}
                            style={cardFont}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={tier.ctaHref}
                      className={`group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors ${
                        isHighlighted
                          ? "bg-[#B8860B] hover:bg-[#daa520] text-[#1f1c19]"
                          : "bg-[#2D2A26] hover:bg-[#1f1c19] text-[#FAF7F2]"
                      }`}
                      style={cardFont}
                    >
                      Request a quote
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            <p
              className="text-center text-xs text-[#6B6560]/70 mt-10 max-w-xl mx-auto"
              style={cardFont}
            >
              All engagements are advisory in nature. We do not guarantee any
              specific outcome from Amazon — see our Terms for details.
            </p>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-[#E8E0D4] bg-white/60">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-14">
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4
                        className="text-base text-[#2D2A26] mb-1"
                        style={displayFont}
                      >
                        {t.title}
                      </h4>
                      <p
                        className="text-sm text-[#6B6560] leading-relaxed"
                        style={cardFont}
                      >
                        {t.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How pricing works */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-14">
              <p
                className="text-[#B8860B] text-xs tracking-[0.22em] uppercase mb-3 font-semibold"
                style={cardFont}
              >
                How pricing works
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A26]"
                style={displayFont}
              >
                From inquiry to engagement
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
              <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />

              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="relative bg-white border border-[#E8E0D4] rounded-2xl p-7 lg:p-8"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border-2 border-[#B8860B] flex items-center justify-center">
                      <span
                        className="text-base text-[#B8860B] font-semibold"
                        style={cardFont}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="text-xl lg:text-2xl text-[#2D2A26] mb-3"
                    style={displayFont}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-[#6B6560] leading-relaxed"
                    style={cardFont}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12">
              <p
                className="text-[#B8860B] text-xs tracking-[0.22em] uppercase mb-3 font-semibold"
                style={cardFont}
              >
                Questions
              </p>
              <h2
                className="text-3xl sm:text-4xl text-[#2D2A26]"
                style={displayFont}
              >
                Frequently asked
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white border border-[#E8E0D4] rounded-xl overflow-hidden hover:border-[#B8860B]/30 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer list-none">
                    <span
                      className="text-base lg:text-lg text-[#2D2A26] font-medium"
                      style={cardFont}
                    >
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center transition-transform group-open:rotate-45">
                      <span className="text-xl leading-none">+</span>
                    </span>
                  </summary>
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 -mt-1">
                    <p
                      className="text-sm lg:text-[15px] text-[#6B6560] leading-relaxed"
                      style={cardFont}
                    >
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#1B4332] px-8 py-14 lg:px-16 lg:py-20 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.2),transparent_55%)] pointer-events-none" />
              <div className="relative">
                <p
                  className="text-[#B8860B] text-xs tracking-[0.22em] uppercase mb-4 font-semibold"
                  style={cardFont}
                >
                  Start Free
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-tight max-w-2xl mx-auto"
                  style={displayFont}
                >
                  Get your free review and written quote
                </h2>
                <p
                  className="mt-5 max-w-xl mx-auto text-base text-[#FAF7F2]/65 leading-relaxed"
                  style={cardFont}
                >
                  Send us your product details and any Amazon notifications.
                  Within 24 hours you&rsquo;ll have a written assessment and a
                  clear scope of work — at no cost.
                </p>
                <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/free-validation"
                    className="group inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] text-[#1f1c19] px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
                    style={cardFont}
                  >
                    Submit for free review
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#FAF7F2]/25 hover:border-[#FAF7F2]/50 text-[#FAF7F2] px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors"
                    style={cardFont}
                  >
                    Talk to us
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
