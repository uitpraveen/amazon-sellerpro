import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { label: "Work", href: "/v1" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

export default function V1Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-[#F4F0E8]">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-8 lg:px-10 lg:pt-32">
        <div className="mb-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="font-bricolage text-[64px] font-[900] uppercase leading-[0.85] tracking-[-0.04em] sm:text-[88px] lg:text-[120px]">
              Safety
              <br />
              Pro
              <span className="ml-2 inline-block h-4 w-4 bg-[#FF4500] lg:h-6 lg:w-6" />
            </h3>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[#F4F0E8]/70">
              Ex-Amazonians. Insider knowledge. Structured, proven compliance
              and reinstatement for Amazon sellers.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="font-bricolage text-xs font-[800] uppercase tracking-wider text-[#FF4500]">
              Navigate
            </span>
            <ul className="mt-6 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-bricolage text-sm font-[600] uppercase tracking-wide text-[#F4F0E8]/80 transition-colors hover:text-[#FF4500]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="font-bricolage text-xs font-[800] uppercase tracking-wider text-[#FF4500]">
              Contact
            </span>
            <ul className="mt-6 space-y-3 text-sm text-[#F4F0E8]/80">
              <li>{siteConfig.contactEmail}</li>
              <li>Response within 1 business day</li>
            </ul>

            <div className="mt-10">
              <span className="font-bricolage text-xs font-[800] uppercase tracking-wider text-[#FF4500]">
                Legal
              </span>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="font-bricolage text-sm font-[600] uppercase tracking-wide text-[#F4F0E8]/80 transition-colors hover:text-[#FF4500]"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="font-bricolage text-sm font-[600] uppercase tracking-wide text-[#F4F0E8]/80 transition-colors hover:text-[#FF4500]"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F4F0E8]/20 pt-6">
          <p className="font-bricolage text-[10px] font-[700] uppercase tracking-wider text-[#F4F0E8]/50">
            © 2026 {siteConfig.businessName} · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
