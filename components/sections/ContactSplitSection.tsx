import { Suspense } from "react";
import ContactForm from "@/app/contact/ContactForm";
import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import FramedBlock from "@/components/ui/FramedBlock";
import TransmissionRow from "@/components/ui/TransmissionRow";
import StatusPill from "@/components/ui/StatusPill";

export default function ContactSplitSection() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
        <RevealOnScroll showLine={false}>
          <MonoLabel prefix="→">CONTACT // 02 // OPEN TRANSMISSION</MonoLabel>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
            Get in Touch — We&rsquo;re Ready for Your Case
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--ink-2)]">
            Whether you have a quick compliance question or a complex case
            that needs immediate attention, our team of tenured ex-Amazonians
            is here to help. Fill out the form below and a member of our team
            will respond within 1 business day.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <RevealOnScroll className="lg:col-span-8" showLine={false}>
            <FramedBlock className="bg-[var(--paper)]">
              <div className="mb-8 flex items-center justify-between">
                <MonoLabel prefix="→">FORM // CONTACT</MonoLabel>
                <StatusPill tone="ok">OPEN</StatusPill>
              </div>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </FramedBlock>
          </RevealOnScroll>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-6">
              <RevealOnScroll showLine={false}>
                <FramedBlock className="bg-[var(--paper-edge)]/60">
                  <MonoLabel prefix="→">TRANSMISSION DETAILS</MonoLabel>
                  <div className="mt-6 space-y-0">
                    <TransmissionRow label="Response" value="< 1 Business Day" />
                    <TransmissionRow label="Reviewed By" value="Ex-Amazonian" />
                    <TransmissionRow label="Confidentiality" value="Strict" />
                    <TransmissionRow label="First Review" value="Free" />
                    <TransmissionRow label="Channels" value="Email · Zoom" />
                  </div>
                </FramedBlock>
              </RevealOnScroll>

              <RevealOnScroll showLine={false} delay={0.05}>
                <div className="border border-[var(--rule)] bg-[var(--paper)] p-6">
                  <MonoLabel prefix="→">WHY SELLERS TRUST US</MonoLabel>
                  <p className="mt-4 text-sm text-[var(--ink-2)]">
                    Every message we receive is reviewed by a real,
                    experienced ex-Amazonian. We do not use automated
                    responses for compliance queries — your case is too
                    important for that.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Response within 1 business day",
                      "Strict confidentiality on all seller and product information",
                      "No obligation — your first document review is free",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-mono text-[12px] uppercase tracking-wider text-[var(--ink-2)]"
                      >
                        <span className="text-[var(--ok)]">[✓]</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
