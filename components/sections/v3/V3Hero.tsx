"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function V3Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5EDDB] text-[#1F3D2E]">
      {/* Decorative blob bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#D97757]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#F4C430]/20 blur-3xl"
      />

      {/* Subtle grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-32 pb-28 lg:px-12 lg:pt-44 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1F3D2E]/20 bg-[#F5EDDB]/80 px-4 py-2 text-[12px] font-[500] text-[#1F3D2E] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D97757] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D97757]" />
            </span>
            Built by ex-Amazonians · Now helping sellers like you
          </span>
        </motion.div>

        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-lora text-[56px] font-[600] leading-[1.05] tracking-[-0.02em] text-[#1F3D2E] sm:text-[80px] lg:text-[112px]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="block"
            >
              Compliance, finally
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block"
            >
              <span className="relative inline-block">
                <span className="relative z-10 italic text-[#D97757]">
                  in good hands
                </span>
                <motion.svg
                  aria-hidden
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.1 }}
                  viewBox="0 0 400 20"
                  className="absolute -bottom-3 left-0 right-0 w-full"
                >
                  <motion.path
                    d="M 5 12 Q 100 2, 200 8 T 395 6"
                    stroke="#F4C430"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              .
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mx-auto mt-12 max-w-2xl text-[19px] leading-[1.65] text-[#1F3D2E]/75"
          >
            Amazon Safety Pro is a friendly, expert team of ex-Amazonians who
            spent half a decade inside Amazon&rsquo;s product safety
            operations. We bring insider knowledge — and a refreshingly human
            approach — to every compliance case.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              href="/free-validation"
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#1F3D2E] px-8 py-4 text-[15px] font-[600] text-[#F5EDDB] shadow-[0_6px_0_0_#0F2519] transition-all hover:translate-y-0.5 hover:shadow-[0_3px_0_0_#0F2519]"
            >
              Get a free document review
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/services"
              className="font-lora text-base font-[500] italic text-[#1F3D2E] underline decoration-[#D97757] decoration-2 underline-offset-4 transition-colors hover:text-[#D97757]"
            >
              See how we help
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-[12px] font-[500] text-[#1F3D2E]/50"
          >
            ✦ No obligation · We review first, then talk · Response within 1
            business day
          </motion.p>
        </div>

        {/* Floating illustrative cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-24 grid max-w-5xl gap-6 sm:grid-cols-3"
        >
          {[
            {
              icon: "🌱",
              title: "5+ years inside",
              body: "Tenured ex-Amazonians who built and enforced the safety rules.",
              color: "bg-[#F5EDDB]",
            },
            {
              icon: "✦",
              title: "07 marketplaces",
              body: "US, CA, EU, UK, IN, SG and AU — one team, every region.",
              color: "bg-[#F4C430]/20",
            },
            {
              icon: "♥",
              title: "Free first review",
              body: "Reviewed personally by a real human, never an automated tool.",
              color: "bg-[#D97757]/15",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className={`group relative rounded-3xl border border-[#1F3D2E]/15 ${card.color} p-7 transition-transform hover:-translate-y-1`}
            >
              <div className="font-lora text-2xl text-[#D97757]" aria-hidden>
                {card.icon}
              </div>
              <h3 className="font-lora mt-3 text-xl font-[600] text-[#1F3D2E]">
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#1F3D2E]/70">
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
