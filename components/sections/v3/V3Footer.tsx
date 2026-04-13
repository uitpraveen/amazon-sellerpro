import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { label: "Home", href: "/v3" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

export default function V3Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#FAF5E6]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[#D97757]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-24 pb-10 lg:px-12 lg:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1F3D2E]">
                <span className="font-lora text-xl font-[600] italic text-[#F5EDDB]">
                  A
                </span>
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#D97757]" />
              </span>
              <span className="font-lora text-2xl font-[600] text-[#1F3D2E]">
                Amazon Safety Pro
              </span>
            </div>
            <h3 className="font-lora mt-10 max-w-md text-[40px] font-[600] leading-[1.1] tracking-[-0.01em] text-[#1F3D2E] sm:text-[52px]">
              Compliance, finally{" "}
              <span className="italic text-[#D97757]">in good hands</span>.
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.65] text-[#1F3D2E]/70">
              A friendly, expert team of ex-Amazonians helping sellers from
              restricted to reinstated.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[11px] font-[700] uppercase tracking-wider text-[#D97757]">
              ✦ Navigate
            </span>
            <ul className="mt-6 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] font-[500] text-[#1F3D2E]/80 transition-colors hover:text-[#D97757]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="text-[11px] font-[700] uppercase tracking-wider text-[#D97757]">
              ✦ Get in touch
            </span>
            <ul className="mt-6 space-y-3 text-[14px] text-[#1F3D2E]/80">
              <li>{siteConfig.contactEmail}</li>
              <li>Response within 1 business day</li>
              <li>Free first review · No obligation</li>
            </ul>

            <div className="mt-10">
              <span className="text-[11px] font-[700] uppercase tracking-wider text-[#D97757]">
                ✦ Legal
              </span>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[14px] font-[500] text-[#1F3D2E]/80 transition-colors hover:text-[#D97757]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[14px] font-[500] text-[#1F3D2E]/80 transition-colors hover:text-[#D97757]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[#1F3D2E]/15 pt-8 md:flex-row md:items-center">
          <p className="text-[11px] font-[500] text-[#1F3D2E]/50">
            © 2026 {siteConfig.legalEntity} · Made with care
          </p>
          <div className="flex flex-wrap gap-2">
            {["US", "CA", "EU", "UK", "IN", "SG", "AU"].map((j) => (
              <span
                key={j}
                className="rounded-full border border-[#1F3D2E]/20 bg-[#F5EDDB] px-2.5 py-0.5 text-[10px] font-[600] text-[#1F3D2E]/60"
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
