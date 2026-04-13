import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { label: "Practice", href: "/v2" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

export default function V2Footer() {
  return (
    <footer className="border-t border-[#C8A45C]/30 bg-[#0F1B3C] text-[#FBF8F0]">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 lg:px-12 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center border border-[#C8A45C] text-[#C8A45C]">
                <span className="font-playfair text-2xl font-[600] italic">
                  A
                </span>
              </span>
              <div>
                <p className="font-playfair text-2xl font-[500] tracking-[-0.01em] text-[#FBF8F0]">
                  Amazon Safety Pro
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8A45C]">
                  Compliance · Advisory · Practice
                </p>
              </div>
            </div>
            <p className="font-playfair mt-12 max-w-md text-3xl font-[500] italic leading-tight text-[#FBF8F0]/90">
              Compliance, handled. From restricted to reinstated.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8A45C]">
              Practice
            </span>
            <ul className="mt-6 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[#FBF8F0]/75 transition-colors hover:text-[#C8A45C]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8A45C]">
              Office
            </span>
            <ul className="mt-6 space-y-3 text-[14px] text-[#FBF8F0]/75">
              <li>{siteConfig.legalEntity}</li>
              <li>{siteConfig.registeredAddress}</li>
              <li>{siteConfig.contactEmail}</li>
            </ul>

            <div className="mt-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C8A45C]">
                Legal
              </span>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[14px] text-[#FBF8F0]/75 transition-colors hover:text-[#C8A45C]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[14px] text-[#FBF8F0]/75 transition-colors hover:text-[#C8A45C]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[#C8A45C]/20 pt-8 md:flex-row md:items-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#FBF8F0]/50">
            © 2026 {siteConfig.legalEntity} · All rights reserved
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C8A45C]">
            US · CA · EU · UK · IN · SG · AU
          </p>
        </div>
      </div>
    </footer>
  );
}
