"use client";

import { useEffect, useState } from "react";
import MonoLabel from "@/components/ui/MonoLabel";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HairlineDivider from "@/components/ui/HairlineDivider";
import FramedBlock from "@/components/ui/FramedBlock";
import StatusPill from "@/components/ui/StatusPill";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  body: React.ReactNode;
}

export default function LegalDocumentLayout({
  pageTitle,
  documentLabel,
  lastUpdated,
  warning,
  intro,
  sections,
}: {
  pageTitle: string;
  documentLabel: string;
  lastUpdated: string;
  warning?: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <main>
      {/* Header */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-12 lg:pt-40">
          <RevealOnScroll showLine={false}>
            <div className="flex flex-wrap items-center gap-3">
              <MonoLabel prefix="→">{documentLabel}</MonoLabel>
              <span className="ml-auto hidden font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)] sm:inline">
                LAST UPDATED · {lastUpdated}
              </span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {pageTitle}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusPill>{`${sections.length.toString().padStart(2, "0")} SECTIONS`}</StatusPill>
              <StatusPill tone="signal">7 JURISDICTIONS</StatusPill>
            </div>
            {warning && (
              <FramedBlock
                bracketColor="var(--alert)"
                className="mt-10 bg-[var(--paper-edge)]/60"
              >
                <MonoLabel prefix="→">LEGAL NOTICE</MonoLabel>
                <p className="mt-3 text-sm text-[var(--ink-2)]">{warning}</p>
              </FramedBlock>
            )}
            {intro && <div className="mt-10 max-w-3xl">{intro}</div>}
          </RevealOnScroll>
        </div>
      </section>

      {/* Body */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* TOC */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <div className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                  → CONTENTS
                </div>
                <ul className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto border-l border-[var(--rule)] pr-2">
                  {sections.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={`group relative -ml-px block border-l py-2 pl-4 font-mono text-[12px] uppercase tracking-wider transition-colors ${
                            isActive
                              ? "border-[var(--signal)] text-[var(--signal)]"
                              : "border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]"
                          }`}
                        >
                          <span className="mr-2">[{s.number}]</span>
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-16 lg:col-span-9">
              {sections.map((s, i) => (
                <article
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-32"
                >
                  <MonoLabel prefix="→">{`SECTION ${s.number.padStart(2, "0")}`}</MonoLabel>
                  <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.015em] text-[var(--ink)] sm:text-3xl">
                    {s.title}
                  </h2>
                  <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-[var(--ink-2)]">
                    {s.body}
                  </div>
                  {i < sections.length - 1 && (
                    <div className="mt-16">
                      <HairlineDivider />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Helper components for legal section bodies */
export function LegalP({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function LegalSubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-lg font-bold text-[var(--ink)]">{children}</h3>
  );
}

export function LegalBullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-1 font-mono text-[var(--signal)]">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
