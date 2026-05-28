"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

// Each entry below renders as a separate blurb card.
// Per client: split each "message" into two cards (no dotted line separator).
const BLURBS: string[] = [
  // Message 1 — split into two cards
  "We are not able to validate the compliance documents you submitted, and your application to sell the following ASIN ABCD1234EF has been declined.",
  "We have reviewed all the documents provided for ASIN ABCD1234EF. However, we still have unmet compliance requirements. If you are unable to fulfill your compliance requirements as outlined below, we will be unable to proceed further with the compliance validation and will remove your product. This case now will be closed but we welcome you to re-open this case as soon as you are able to provide the required compliance documents.",
  // Message 2 — split into two cards
  "The product & packaging images submitted for your product does not correctly show all of the information that we require to proceed with our review process.",
  "This case now will be closed but we welcome you to re-open this case as soon as you are able to provide the required compliance documents.",
  // Message 3 — single blurb (no split needed per client comments)
  "We are contacting you because the test report TR123456 submitted for your product has conflicting information. Specifically, the tests and outcome on the summary page of the test report does not match the information on the details page of the report. To move forward with the approvals process, please submit a full test report with the correct information listed for each product.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function SoundFamiliar() {
  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-5xl text-center text-[#2D2A26] mb-8 sm:mb-12"
          style={{ fontFamily: "var(--font-dm-serif)" }}
        >
          Sound familiar?
        </motion.h2>

        {/* Amazon "No loading" page — actual screenshot */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-10 sm:mb-14 max-w-3xl"
        >
          <div className="relative rounded-xl overflow-hidden border border-[#E8E0D4] shadow-[0_8px_24px_rgba(45,42,38,0.08)] bg-white">
            <Image
              src="/images/amazon-no-loading.png"
              alt="Amazon's 'Sorry, we couldn't find that page' error screen — the kind of message sellers see when their ASIN is suppressed."
              width={1918}
              height={877}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-5"
        >
          {BLURBS.map((blurb, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border-l-[3px] border-[#9B1C1C] rounded-r-lg px-4 sm:px-8 py-4 sm:py-5"
            >
              <AlertTriangle size={18} className="text-[#9B1C1C] mt-1 shrink-0" />
              <p
                className="flex-1 text-[#2D2A26] text-base sm:text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                &ldquo;{blurb}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 sm:mt-14 text-center text-[#6B6560] max-w-2xl mx-auto leading-relaxed text-base sm:text-lg"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          If you have been going back and forth with Amazon — submitting
          documents, receiving the same rejection, resubmitting, and getting
          nowhere — you are not alone.
        </motion.p>
      </div>
    </section>
  );
}
