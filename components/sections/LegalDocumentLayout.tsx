"use client";

import { useEffect, useState } from "react";

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
    <main className="bg-[#FAF7F2]">
      {/* Hero */}
      <section className="border-b border-[#E8E0D4]">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-12 lg:pt-40">
          <p className="font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-widest text-[#B8860B]">
            {documentLabel}
          </p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-dm-serif)] text-4xl leading-tight text-[#2D2A26] sm:text-5xl lg:text-6xl">
            {pageTitle}
          </h1>
          <p className="mt-4 font-[family-name:var(--font-outfit)] text-sm text-[#6B6560]">
            Last updated: {lastUpdated}
          </p>

          {warning && (
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-amber-700">
                Legal notice
              </p>
              <p className="mt-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-amber-800">
                {warning}
              </p>
            </div>
          )}

          {intro && (
            <div className="mt-10 max-w-3xl font-[family-name:var(--font-outfit)] text-[17px] leading-relaxed text-[#6B6560]">
              {intro}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* TOC sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <div className="rounded-2xl border border-[#E8E0D4] bg-white p-6">
                  <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                    Contents
                  </p>
                  <ul className="mt-4 max-h-[65vh] space-y-0.5 overflow-y-auto">
                    {sections.map((s) => {
                      const isActive = active === s.id;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={`group flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors ${
                              isActive
                                ? "bg-[#B8860B]/8 text-[#B8860B]"
                                : "text-[#6B6560] hover:bg-[#FAF7F2] hover:text-[#2D2A26]"
                            }`}
                          >
                            <span
                              className={`mt-0.5 shrink-0 font-[family-name:var(--font-outfit)] text-xs font-semibold tabular-nums ${
                                isActive ? "text-[#B8860B]" : "text-[#B8860B]/60"
                              }`}
                            >
                              {s.number.padStart(2, "0")}
                            </span>
                            <span className="font-[family-name:var(--font-outfit)] text-xs leading-relaxed">
                              {s.title}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-16 lg:col-span-9">
              {sections.map((s, i) => (
                <article key={s.id} id={s.id} className="scroll-mt-32">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                      {s.number.padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-[#E8E0D4]" />
                  </div>
                  <h2 className="mt-3 font-[family-name:var(--font-dm-serif)] text-2xl leading-tight text-[#2D2A26] sm:text-3xl">
                    {s.title}
                  </h2>
                  <div className="mt-6 space-y-4 font-[family-name:var(--font-outfit)] text-[17px] leading-relaxed text-[#6B6560]">
                    {s.body}
                  </div>
                  {i < sections.length - 1 && (
                    <div className="mt-16 border-b border-[#E8E0D4]" />
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
  return (
    <p className="font-[family-name:var(--font-outfit)] text-[17px] leading-relaxed text-[#6B6560]">
      {children}
    </p>
  );
}

export function LegalSubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 font-[family-name:var(--font-outfit)] text-base font-semibold text-[#2D2A26]">
      {children}
    </h3>
  );
}

export function LegalBullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8860B]" />
          <span className="font-[family-name:var(--font-outfit)] text-[17px] leading-relaxed text-[#6B6560]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
