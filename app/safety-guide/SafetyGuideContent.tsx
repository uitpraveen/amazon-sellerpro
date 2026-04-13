"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Globe,
  AlertTriangle,
  ClipboardCheck,
  Bell,
  Info,
} from "lucide-react";

interface GuideSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  keyPoints: string[];
  content: React.ReactNode;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sections: GuideSection[] = [
  {
    id: "what-is-product-safety",
    icon: <ShieldCheck className="h-6 w-6 text-[#2563EB]" />,
    title: "What is Product Safety?",
    keyPoints: [
      "Products must meet all applicable federal, state, and international regulations",
      "Non-compliance can result in ASIN suspensions, listing removals, and legal liability",
      "Understanding requirements is the first step toward protecting your business",
    ],
    content: (
      <>
        <p>
          Product safety refers to the set of regulations, standards, and
          testing requirements that ensure consumer products do not pose
          unreasonable risks of injury or harm. For Amazon sellers, product
          safety compliance means that your products meet all applicable federal,
          state, and international regulations before they reach customers.
        </p>
        <p className="mt-4">
          Non-compliance can result in ASIN suspensions, listing removals,
          account-level restrictions, and even legal liability. Understanding
          these requirements is the first step toward protecting your business.
        </p>
      </>
    ),
  },
  {
    id: "global-policies",
    icon: <Globe className="h-6 w-6 text-[#2563EB]" />,
    title: "Global Policies",
    keyPoints: [
      "US: CPSC oversees safety via CPSIA with third-party testing requirements",
      "Canada: Health Canada enforces CCPSA with separate documentation rules",
      "EU: CE marking and Declarations of Conformity required",
    ],
    content: (
      <>
        <h3 className="mt-2 text-lg font-semibold text-[#1E293B]">
          United States (US)
        </h3>
        <p className="mt-2">
          The Consumer Product Safety Commission (CPSC) oversees product safety
          in the US. Key regulations include the Consumer Product Safety
          Improvement Act (CPSIA), which requires third-party testing and
          certification for children&apos;s products, as well as tracking labels
          and specific lead and phthalate limits.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#1E293B]">
          Canada (CA)
        </h3>
        <p className="mt-2">
          Health Canada enforces the Canada Consumer Product Safety Act (CCPSA).
          Products sold on Amazon.ca must comply with Canadian regulations, which
          may differ from US requirements. Specific testing and documentation is
          required for children&apos;s products, electronics, and textiles.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#1E293B]">
          European Union (EU)
        </h3>
        <p className="mt-2">
          EU product safety is governed by the General Product Safety Directive
          and category-specific directives such as the Toy Safety Directive and
          the Low Voltage Directive. Products require CE marking, Declarations
          of Conformity, and testing by notified bodies where applicable.
        </p>
      </>
    ),
  },
  {
    id: "product-restrictions",
    icon: <AlertTriangle className="h-6 w-6 text-[#F59E0B]" />,
    title: "Product Restrictions at Amazon",
    keyPoints: [
      "Amazon has its own safety policies on top of government regulations",
      "Certain categories are gated and require pre-approval",
      "ASIN suppression can happen even if government-compliant",
    ],
    content: (
      <>
        <p>
          Amazon maintains its own product safety policies on top of government
          regulations. Certain product categories are gated or restricted,
          requiring pre-approval and compliance documentation before you can
          list. Common restricted categories include:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Children's products and toys",
            "Electronics and battery-powered devices",
            "Dietary supplements and health products",
            "Cosmetics and personal care items",
            "Automotive parts and accessories",
            "Hazardous materials and chemicals",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Failure to meet Amazon&apos;s specific requirements can lead to
          immediate ASIN suppression, even if your product is otherwise
          compliant with government standards.
        </p>
      </>
    ),
  },
  {
    id: "amazon-tic-policy",
    icon: <ClipboardCheck className="h-6 w-6 text-[#2563EB]" />,
    title: "Amazon TIC Policy",
    keyPoints: [
      "Documents must come from Amazon-recognized accredited laboratories",
      "Test reports must be from ISO 17025 accredited labs",
      "All documents must match the exact product being sold",
    ],
    content: (
      <>
        <p>
          Amazon&apos;s Testing, Inspection, and Certification (TIC) policy
          requires that all compliance documents be issued by or based on
          testing from Amazon-recognized accredited laboratories. Amazon
          maintains a list of approved testing bodies and will reject
          documentation from unrecognized labs.
        </p>
        <p className="mt-4">
          Key elements of the TIC policy include: test reports must be from
          ISO 17025 accredited labs, certificates must reference specific
          ASTM, CPSIA, or EN standards, and all documents must be current and
          match the exact product being sold.
        </p>
        <p className="mt-4">
          Our team stays up-to-date with Amazon&apos;s approved lab list and
          ensures all documentation meets their acceptance criteria.
        </p>
      </>
    ),
  },
  {
    id: "product-recalls",
    icon: <Bell className="h-6 w-6 text-[#DC2626]" />,
    title: "Product Recalls",
    keyPoints: [
      "CPSC issues mandatory and voluntary recalls for safety hazards",
      "Amazon immediately suppresses ASINs related to recalled products",
      "Sellers must monitor recall notices relevant to their categories",
    ],
    content: (
      <>
        <h3 className="mt-2 text-lg font-semibold text-[#1E293B]">
          CPSC Recalls (US)
        </h3>
        <p className="mt-2">
          The CPSC issues mandatory and voluntary recalls for products that
          present safety hazards. If your product is recalled, Amazon will
          immediately suppress all related ASINs. Sellers must cooperate with
          the recall process, notify affected customers, and may face legal
          consequences.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#1E293B]">
          Health Canada Recalls (CA)
        </h3>
        <p className="mt-2">
          Health Canada publishes recalls and safety alerts for consumer
          products. Products sold on Amazon.ca that are subject to a Canadian
          recall will be removed from sale. Sellers are responsible for
          monitoring recall notices relevant to their product categories.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-[#1E293B]">
          EU RAPEX / Safety Gate
        </h3>
        <p className="mt-2">
          The EU Rapid Alert System for dangerous non-food products (Safety
          Gate) publishes weekly reports on recalled products. Amazon monitors
          these alerts and may proactively remove products that match recalled
          items from European marketplaces.
        </p>
      </>
    ),
  },
];

export default function SafetyGuideContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  function handleTocClick(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#EFF6FF] to-[#F8FAFC]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              Product Safety Guide
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-lg text-[#475569]"
          >
            Everything you need to know about product safety compliance on
            Amazon.
          </motion.p>
        </div>
      </section>

      {/* Content with sticky TOC */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky TOC Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                  Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => handleTocClick(s.id)}
                        className={`block w-full text-left text-sm rounded-lg px-3 py-2 transition-colors ${
                          activeSection === s.id
                            ? "bg-[#2563EB]/10 text-[#2563EB] font-medium"
                            : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                        }`}
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                id={section.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onViewportEnter={() => setActiveSection(section.id)}
                className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9]">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E293B]">
                    {section.title}
                  </h2>
                </div>

                {/* Key Points Callout */}
                <div className="mt-5 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-[#2563EB]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                      Key Points
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {section.keyPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-[#1E40AF]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563EB]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 leading-relaxed text-[#475569]">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
