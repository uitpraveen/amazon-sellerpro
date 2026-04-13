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
      <div
        className="rounded-2xl p-6"
        style={{ background: "#FAF7F2", border: "1px solid #E8E0D4" }}
      >
        <p
          className="mb-5 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#B8860B", fontFamily: "Outfit, sans-serif" }}
        >
          Contents
        </p>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
                  style={{
                    background: isActive ? "#FAF7F2" : "transparent",
                    boxShadow: isActive
                      ? "inset 0 0 0 1px #E8E0D4"
                      : "none",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors"
                    style={{
                      background: isActive ? "#B8860B" : "#E8E0D4",
                      color: isActive ? "#FAF7F2" : "#6B6560",
                    }}
                  >
                    {item.number.replace("·", "·")}
                  </span>
                  <span
                    className="text-sm leading-snug transition-colors"
                    style={{
                      color: isActive ? "#B8860B" : "#6B6560",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
