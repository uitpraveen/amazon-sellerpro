import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import MonoLabel from "@/components/ui/MonoLabel";
import HairlineDivider from "@/components/ui/HairlineDivider";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const JURISDICTIONS = ["US", "CA", "EU", "UK", "IN", "SG", "AU"];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--rule)] bg-[var(--paper-edge)]/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        {/* Top — brand statement */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MonoLabel prefix="//">AMAZON SAFETY PRO</MonoLabel>
            <h3 className="mt-4 max-w-md text-3xl font-black leading-tight tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
              Compliance handled by people who built the rules.
            </h3>
            <p className="mt-4 max-w-md text-sm text-[var(--ink-2)]">
              Operated by {siteConfig.legalEntity}. Serving Amazon sellers
              across the United States, Canada, the European Union, the
              United Kingdom, India, Singapore, and Australia.
            </p>
          </div>

          <div className="lg:col-span-3">
            <MonoLabel>TRANSMISSION</MonoLabel>
            <ul className="mt-4 space-y-2 font-mono text-[12px] uppercase tracking-wider text-[var(--ink-2)]">
              <li>EMAIL · {siteConfig.contactEmail}</li>
              {siteConfig.whatsappNumber !== "TODO" && (
                <li>
                  WHATSAPP ·{" "}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    className="signal-link"
                  >
                    {siteConfig.whatsappNumber}
                  </a>
                </li>
              )}
              <li>RESPONSE · &lt; 1 BUSINESS DAY</li>
              <li>FIRST REVIEW · FREE</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <MonoLabel>JURISDICTIONS</MonoLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {JURISDICTIONS.map((j) => (
                <span
                  key={j}
                  className="border border-[var(--rule)] px-2.5 py-1 font-mono text-[12px] tracking-widest text-[var(--ink-2)]"
                >
                  {j}
                </span>
              ))}
            </div>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
              // 07 MARKETPLACES · ONE TEAM
            </p>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="my-12">
          <HairlineDivider />
        </div>

        {/* Nav links */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MonoLabel>NAVIGATION</MonoLabel>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4">
              {FOOTER_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--ink-2)] transition-colors hover:text-[var(--signal)]"
                  >
                    <span className="text-[var(--ink-3)] transition-colors group-hover:text-[var(--signal)]">
                      →
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <MonoLabel>LEGAL</MonoLabel>
            <ul className="mt-4 space-y-3">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--ink-2)] transition-colors hover:text-[var(--signal)]"
                  >
                    <span className="text-[var(--ink-3)] transition-colors group-hover:text-[var(--signal)]">
                      →
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom mono line */}
        <div className="mt-16 border-t border-[var(--rule)] pt-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
            // {siteConfig.legalEntity} · {siteConfig.registeredAddress} ·
            SINCE 2026 · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
