import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { label: "Home", href: "/preview" },
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

export default function EditorialFooter() {
  return (
    <footer className="border-t border-[var(--ink)]/15 bg-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 lg:px-14 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="font-display text-[40px] font-[600] italic leading-none tracking-[-0.01em] text-[var(--ink)] sm:text-[56px] lg:text-[72px]">
              Amazon Safety Pro
            </span>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[var(--ink-2)]">
              Compliance, documentation, and reinstatement — delivered by
              ex-Amazonians who spent half a decade inside Amazon&rsquo;s
              product safety team.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
              Navigate
            </span>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[var(--ink-2)] transition-colors hover:text-[var(--signal)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
              Get in touch
            </span>
            <ul className="mt-5 space-y-3">
              <li className="text-[14px] text-[var(--ink-2)]">
                {siteConfig.contactEmail}
              </li>
              {siteConfig.whatsappNumber !== "TODO" && (
                <li className="text-[14px] text-[var(--ink-2)]">
                  WhatsApp: {siteConfig.whatsappNumber}
                </li>
              )}
              <li className="text-[14px] text-[var(--ink-2)]">
                Response within 1 business day
              </li>
            </ul>

            <div className="mt-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-3)]">
                Legal
              </span>
              <ul className="mt-5 space-y-3">
                {LEGAL.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-[var(--ink-2)] transition-colors hover:text-[var(--signal)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[var(--ink)]/15 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--ink-3)]">
            © 2026 {siteConfig.businessName}
          </p>
          <div className="flex flex-wrap gap-2">
            {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((j) => (
              <span
                key={j}
                className="border border-[var(--ink)]/20 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--ink-3)]"
              >
                {j}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
