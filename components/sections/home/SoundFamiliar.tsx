"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type Blurb = {
  topPara: string;
  bottomPara: string;
};

const BLURBS: Blurb[] = [
  {
    topPara:
      "We are not able to validate the compliance documents you submitted, and your application to sell the following ASIN ABCD1234EF has been declined.",
    bottomPara:
      "We have reviewed all the documents provided for ASIN ABCD1234EF. However, we still have unmet compliance requirements. If you are unable to fulfill your compliance requirements as outlined below, we will be unable to proceed further with the compliance validation and will remove your product. ………………………………………… This case now will be closed but we welcome you to re-open this case as soon as you are able to provide the required compliance documents.",
  },
  {
    topPara: "",
    bottomPara:
      "The product & packaging images submitted for your product does not correctly show all of the information that we require to proceed with our review process ……………………………. This case now will be closed but we welcome you to re-open this case as soon as you are able to provide the required compliance documents.",
  },
  {
    topPara: "",
    bottomPara:
      "We are contacting you because the test report TR123456 submitted for your product has conflicting information. Specifically, the tests and outcome on the summary page of the test report does not match the information on the details page of the report …………. To move forward with the approvals process, please submit a full test report with the correct information listed for each product.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
          className="space-y-5"
        >
          {BLURBS.map((blurb, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 bg-white border-l-[3px] border-[#9B1C1C] rounded-r-lg px-4 sm:px-8 py-4 sm:py-5"
            >
              <AlertTriangle size={18} className="text-[#9B1C1C] mt-1 shrink-0" />
              <div
                className="flex-1 text-[#2D2A26] text-base sm:text-lg leading-relaxed italic space-y-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {blurb.topPara && <p>&ldquo;{blurb.topPara}&rdquo;</p>}
                <p>
                  {blurb.topPara ? "" : "“"}
                  {blurb.bottomPara}
                  {"”"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 sm:mt-14 text-center text-[#2D2A26] max-w-3xl mx-auto leading-relaxed text-lg sm:text-xl font-bold"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          You are not alone, Amazon Safety Pro is there to guide you to navigate through the process.
        </motion.p>
      </div>
    </section>
  );
}
