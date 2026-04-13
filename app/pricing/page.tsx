import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";
import TransmissionRow from "@/components/ui/TransmissionRow";
import ServicesGridSection from "@/components/sections/ServicesGridSection";

export const metadata: Metadata = {
  title: "Pricing — Amazon Safety Pro",
  description:
    "Our services are quoted on a fixed-fee or hourly basis, agreed in writing prior to engagement.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--rule)] bg-[var(--paper)]">
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-24">
            <div className="grid gap-12 lg:grid-cols-12">
              <RevealOnScroll className="lg:col-span-7" showLine={false}>
                <MonoLabel prefix="→">QUOTE PROTOCOL // OPEN</MonoLabel>
                <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                  Request a Quote
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--ink-2)]">
                  Our services are offered on a fixed-fee or hourly basis,
                  agreed and communicated to you in writing prior to
                  engagement. Tell us about your case and we&rsquo;ll come
                  back with a quotation tailored to your specific situation.
                </p>
              </RevealOnScroll>

              <RevealOnScroll className="lg:col-span-5" showLine={false}>
                <FramedBlock className="bg-[var(--paper-edge)]/60">
                  <MonoLabel prefix="→">PROTOCOL</MonoLabel>
                  <div className="mt-4 space-y-0">
                    <TransmissionRow label="Engagement" value="Fixed Fee / Hourly" />
                    <TransmissionRow label="Agreement" value="Written Quote" />
                    <TransmissionRow label="Currency" value="USD / Multi" />
                    <TransmissionRow label="Payment" value="In Advance" />
                    <TransmissionRow label="First Review" value="Free" />
                  </div>
                </FramedBlock>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <HairlineDivider label="AVAILABLE SERVICES // 05" />
            <div className="mt-12">
              <ServicesGridSection />
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--rule)] bg-[var(--paper-edge)]/40">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <RevealOnScroll showLine={false}>
              <FramedBlock
                bracketColor="var(--signal)"
                className="bg-[var(--paper)] text-center"
              >
                <MonoLabel prefix="→">FREE FIRST REVIEW</MonoLabel>
                <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                  Not sure which service you need?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[var(--ink-2)]">
                  Submit your documents for a free review and our team will
                  guide you to the right engagement.
                </p>
                <div className="mt-8 flex justify-center">
                  <TacticalButton href="/free-validation">
                    Submit for a free review
                  </TacticalButton>
                </div>
              </FramedBlock>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
