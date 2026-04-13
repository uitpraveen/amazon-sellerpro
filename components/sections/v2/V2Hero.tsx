"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function V2Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FBF8F0] text-[#0F1B3C]">
      {/* Ornamental top line */}
      <div className="mx-auto max-w-[1440px] px-6 pt-32 lg:px-12 lg:pt-40">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="h-px origin-left bg-[#C8A45C]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8A45C]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/60">
              Proxima CPEX LLC · Est. 2026
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/60 md:inline">
            Tamil Nadu · India
          </span>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-32 lg:px-12 lg:pt-28 lg:pb-40">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Left — Editorial headline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C8A45C]">
                — Practice
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0F1B3C]/40">
                Product safety & compliance
              </span>
            </motion.div>

            <h1 className="font-playfair text-[56px] font-[500] leading-[1] tracking-[-0.015em] text-[#0F1B3C] sm:text-[76px] lg:text-[104px]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="block"
              >
                Compliance,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65 }}
                className="block italic text-[#C8A45C]"
              >
                handled.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="block"
              >
                From restricted
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.95 }}
                className="block"
              >
                to reinstated.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="mt-14 max-w-xl text-[17px] leading-[1.7] text-[#0F1B3C]/75"
            >
              A boutique compliance advisory built by ex-Amazonians with over
              half a decade inside Amazon&rsquo;s product safety operations.
              Where others guess, we know — because the policies your listing
              is being judged against were, in part, written by the people now
              leading your case.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="mt-12 flex flex-wrap items-center gap-8"
            >
              <Link
                href="/free-validation"
                className="group inline-flex cursor-pointer items-center gap-4 border border-[#0F1B3C] bg-[#0F1B3C] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#FBF8F0] transition-all hover:bg-[#C8A45C] hover:text-[#0F1B3C]"
              >
                Request consultation
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="font-playfair text-lg font-[500] italic text-[#0F1B3C] underline decoration-[#C8A45C] decoration-2 underline-offset-[8px] transition-colors hover:text-[#C8A45C]"
              >
                Our practice areas
              </Link>
            </motion.div>
          </div>

          {/* Right — Credentials card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Gold corner accents */}
              <svg
                aria-hidden
                className="absolute -left-3 -top-3"
                width="20"
                height="20"
              >
                <path
                  d="M 0 20 L 0 0 L 20 0"
                  stroke="#C8A45C"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <svg
                aria-hidden
                className="absolute -right-3 -bottom-3"
                width="20"
                height="20"
              >
                <path
                  d="M 0 20 L 20 20 L 20 0"
                  stroke="#C8A45C"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div className="border border-[#0F1B3C]/15 bg-[#FBF8F0] p-10">
                <div className="mb-8 flex items-center justify-between border-b border-[#C8A45C]/40 pb-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/60">
                    The Practice
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A45C]" />
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/50">
                      Lead principal
                    </p>
                    <p className="font-playfair mt-2 text-2xl font-[500] italic text-[#0F1B3C]">
                      Tenured ex-Amazonian
                    </p>
                    <p className="mt-2 text-[13px] text-[#0F1B3C]/60">
                      5+ years inside Amazon&rsquo;s product safety team
                    </p>
                  </div>

                  <div className="border-t border-[#0F1B3C]/10 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/50">
                      Jurisdictions
                    </p>
                    <p className="font-playfair mt-2 text-2xl font-[500] italic text-[#0F1B3C]">
                      Seven marketplaces
                    </p>
                    <p className="mt-2 text-[13px] text-[#0F1B3C]/60">
                      US · Canada · EU · UK · India · Singapore · Australia
                    </p>
                  </div>

                  <div className="border-t border-[#0F1B3C]/10 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0F1B3C]/50">
                      First consultation
                    </p>
                    <p className="font-playfair mt-2 text-2xl font-[500] italic text-[#C8A45C]">
                      Complimentary
                    </p>
                    <p className="mt-2 text-[13px] text-[#0F1B3C]/60">
                      Reviewed personally by a principal
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-[#C8A45C]/40 pt-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#0F1B3C]/50">
                    Response time
                  </span>
                  <span className="font-playfair text-base font-[600] italic text-[#0F1B3C]">
                    &lt; 1 business day
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Acknowledgments strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="mt-28 border-t border-[#C8A45C]/30 pt-10"
        >
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#0F1B3C]/50">
            Working knowledge of
          </p>
          <div className="flex flex-wrap items-center gap-x-14 gap-y-6">
            {[
              "CPSC",
              "Health Canada",
              "EU GPSR",
              "Amazon TIC",
              "SGS",
              "Intertek",
              "Bureau Veritas",
              "UL Solutions",
            ].map((org) => (
              <span
                key={org}
                className="font-playfair text-xl font-[500] italic text-[#0F1B3C]/60 transition-colors hover:text-[#C8A45C]"
              >
                {org}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
