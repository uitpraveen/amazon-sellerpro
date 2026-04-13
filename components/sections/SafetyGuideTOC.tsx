"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  number: string;
  label: string;
}

export default function SafetyGuideTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(item.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav aria-label="Section navigation">
      <div className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
        → CONTENTS
      </div>
      <ul className="mt-4 space-y-1 border-l border-[var(--rule)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group relative -ml-px block border-l py-2 pl-4 font-mono text-[12px] uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[var(--signal)] text-[var(--signal)]"
                    : "border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]"
                }`}
              >
                <span
                  className={`mr-2 ${
                    isActive ? "text-[var(--signal)]" : "text-[var(--ink-3)]"
                  }`}
                >
                  [{item.number}]
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
