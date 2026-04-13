import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";
import StatusPill from "@/components/ui/StatusPill";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";
import ServicesGridSection from "@/components/sections/ServicesGridSection";

export const metadata: Metadata = {
  title: "Services — Amazon Safety Pro",
  description:
    "CPC creation, DOC/GCC creation, document validation, and stranded ASIN reinstatement — delivered by tenured ex-Amazonians.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-[var(--rule)] bg-[var(--paper-warm)]">
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-24">
            <RevealOnScroll showLine={false}>
              <div className="flex flex-wrap items-center gap-3">
                <MonoLabel prefix="→">SERVICES // 05 ENGAGEMENTS</MonoLabel>
                <span className="ml-auto hidden font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)] sm:inline">
                  ~/ services
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                Services
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                Amazon Safety Pro offers a comprehensive suite of compliance
                and documentation services, each delivered by a team of
                tenured ex-Amazonians who understand exactly what Amazon
                requires. Whether you&rsquo;re preparing a new product launch,
                responding to a compliance notice, or working to reinstate a
                suspended listing, we have a service designed for your
                situation.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <StatusPill tone="ok">5 SERVICES ACTIVE</StatusPill>
                <StatusPill tone="signal">EX-AMAZONIANS</StatusPill>
                <StatusPill>FREE FIRST REVIEW</StatusPill>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <HairlineDivider label="ENGAGEMENTS // 05" />
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
                  Not sure which service applies to your case?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[var(--ink-2)]">
                  Submit your documents and Amazon notifications. Our team
                  will review them and tell you exactly what you need.
                </p>
                <div className="mt-8 flex justify-center">
                  <TacticalButton href="/free-validation">
                    Submit for free review
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
