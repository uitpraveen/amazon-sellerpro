"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function V1Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F4F0E8] text-[#0F0F0F]">
      {/* Diagonal persimmon block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-full w-[55%] bg-[#FF4500]"
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      {/* Huge faded 01 numeral in background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 font-bricolage text-[420px] font-[900] leading-none tracking-[-0.05em] text-[#0F0F0F] opacity-[0.04] lg:text-[620px]"
      >
        01
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 pt-32 pb-28 lg:px-10 lg:pt-44 lg:pb-36">
        {/* Top marquee row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16 flex items-center justify-between border-y-2 border-[#0F0F0F] py-3"
        >
          <span className="font-bricolage text-xs font-[700] uppercase tracking-wider">
            01 / Amazon compliance
          </span>
          <span className="hidden font-bricolage text-xs font-[700] uppercase tracking-wider md:inline">
            EST. 2026
          </span>
          <span className="hidden font-bricolage text-xs font-[700] uppercase tracking-wider md:inline">
            07 marketplaces
          </span>
          <span className="font-bricolage text-xs font-[700] uppercase tracking-wider">
            Ex-Amazonians ●
          </span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-bricolage text-[68px] font-[900] uppercase leading-[0.82] tracking-[-0.04em] text-[#0F0F0F] sm:text-[104px] lg:text-[148px] xl:text-[176px]"
            >
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
                className="block"
              >
                We built
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
                className="relative block"
              >
                the rules.
                <span className="absolute -right-6 top-0 inline-block h-4 w-4 bg-[#FF4500] lg:h-8 lg:w-8" />
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
                className="block"
              >
                Now we{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#F4F0E8]">enforce</span>
                  <span className="absolute inset-0 -z-0 bg-[#0F0F0F]" />
                </span>
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                className="block"
              >
                them for you.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-14 max-w-xl"
            >
              <p className="text-lg leading-[1.55] text-[#0F0F0F]/80">
                Ex-Amazonians who spent half a decade inside Amazon&rsquo;s
                product safety team — writing, enforcing, and refining the
                policies. No theory. No guessing. Just insider operators for
                your compliance case.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/free-validation"
                className="group inline-flex cursor-pointer items-center gap-3 border-2 border-[#0F0F0F] bg-[#0F0F0F] px-8 py-4 font-bricolage text-sm font-[800] uppercase tracking-wider text-[#F4F0E8] transition-all hover:bg-[#FF4500] hover:text-[#0F0F0F]"
                style={{ boxShadow: "6px 6px 0 0 #FF4500" }}
              >
                Submit for free review
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="group inline-flex cursor-pointer items-center gap-2 border-b-2 border-[#0F0F0F] pb-1 font-bricolage text-sm font-[700] uppercase tracking-wider text-[#0F0F0F]"
              >
                What we do
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right — data block on persimmon */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative lg:col-span-4"
          >
            <div className="relative border-2 border-[#0F0F0F] bg-[#F4F0E8] p-8">
              <div className="mb-6 flex items-center justify-between border-b-2 border-[#0F0F0F] pb-3">
                <span className="font-bricolage text-xs font-[800] uppercase tracking-wider">
                  MANIFEST
                </span>
                <span className="inline-block h-2 w-2 bg-[#FF4500]" />
              </div>

              <div className="space-y-5">
                <div>
                  <div className="font-bricolage text-[64px] font-[900] leading-none tracking-[-0.03em] text-[#0F0F0F]">
                    5<span className="text-[#FF4500]">+</span>
                  </div>
                  <p className="mt-1 font-bricolage text-[10px] font-[700] uppercase tracking-wider">
                    Years inside Amazon
                  </p>
                </div>

                <div className="border-t-2 border-[#0F0F0F] pt-5">
                  <div className="font-bricolage text-[64px] font-[900] leading-none tracking-[-0.03em] text-[#0F0F0F]">
                    07
                  </div>
                  <p className="mt-1 font-bricolage text-[10px] font-[700] uppercase tracking-wider">
                    Marketplaces
                  </p>
                </div>

                <div className="border-t-2 border-[#0F0F0F] pt-5">
                  <div className="font-bricolage text-[64px] font-[900] leading-none tracking-[-0.03em] text-[#0F0F0F]">
                    100<span className="text-[#FF4500]">%</span>
                  </div>
                  <p className="mt-1 font-bricolage text-[10px] font-[700] uppercase tracking-wider">
                    Team ex-Amazon
                  </p>
                </div>
              </div>
            </div>

            {/* Offset shadow block */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 -z-10 h-full w-full border-2 border-[#0F0F0F] bg-[#FF4500]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
