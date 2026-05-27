import Link from "next/link";
import { Shield, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const SERVICES = [
  {
    label: "ASIN Classification Review & Appeal",
    href: "/services#asin-classification-review",
  },
  {
    label: "Document Review & Remediation",
    href: "/services#document-review-remediation",
  },
  {
    label: "Safety Incident ASIN Reinstatement",
    href: "/services#safety-incident-reinstatement",
  },
  {
    label: "Compliance Document Creation",
    href: "/services#compliance-document-creation",
  },
  {
    label: "Product Compliance Assessment",
    href: "/services#product-compliance-assessment",
  },
  {
    label: "Testing Guidance (Coming Soon)",
    href: "/services#testing-guidance",
  },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Our Process", href: "/#process" },
  { label: "Safety Guide", href: "/safety-guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Review", href: "/free-validation" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const linkStyle = { fontFamily: "var(--font-outfit)" };
const headingStyle = { fontFamily: "var(--font-outfit)" };

export default function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = !siteConfig.contactEmail.startsWith("TODO");

  return (
    <footer className="relative bg-[#1f1c19] text-[#FAF7F2]">
      {/* Top gold accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8860B]/40 to-transparent" />

      {/* CTA strip */}
      <div className="border-b border-[#FAF7F2]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p
              className="text-[#B8860B] text-xs tracking-[0.22em] uppercase mb-2"
              style={headingStyle}
            >
              Start Free
            </p>
            <h3
              className="text-2xl sm:text-3xl text-[#FAF7F2] leading-tight"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Not sure where your compliance stands?
            </h3>
            <p
              className="text-sm text-[#FAF7F2]/55 mt-2 max-w-md leading-relaxed"
              style={linkStyle}
            >
              Send us your product details and Amazon notifications — we&rsquo;ll review them at no cost and tell you exactly what you need.
            </p>
          </div>
          <Link
            href="/free-validation"
            className="group inline-flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#daa520] text-[#1f1c19] px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap"
            style={linkStyle}
          >
            Request free review
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 md:pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#B8860B]/15 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B]">
                <Shield size={18} strokeWidth={1.8} />
              </div>
              <span
                className="text-lg text-[#FAF7F2]"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Amazon Safety Pro
              </span>
            </div>
            <p
              className="text-sm text-[#FAF7F2]/60 leading-relaxed mb-6 max-w-sm"
              style={linkStyle}
            >
              Amazon product safety and ASIN reinstatement, delivered by
              ex-Amazonians who spent years inside the product safety team. We
              know what Amazon&rsquo;s reviewers look for — because we were
              those reviewers.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#B8860B]/25 bg-[#B8860B]/[0.06]"
              style={linkStyle}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
              <span className="text-[11px] tracking-wider uppercase text-[#B8860B]">
                Ex-Amazon Safety Team
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h5
              className="text-[11px] uppercase tracking-[0.2em] text-[#B8860B] mb-5 font-semibold"
              style={headingStyle}
            >
              Services
            </h5>
            <ul className="space-y-3">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#FAF7F2]/60 hover:text-[#B8860B] transition-colors"
                    style={linkStyle}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h5
              className="text-[11px] uppercase tracking-[0.2em] text-[#B8860B] mb-5 font-semibold"
              style={headingStyle}
            >
              Company
            </h5>
            <ul className="space-y-3">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#FAF7F2]/60 hover:text-[#B8860B] transition-colors"
                    style={linkStyle}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h5
              className="text-[11px] uppercase tracking-[0.2em] text-[#B8860B] mb-5 font-semibold"
              style={headingStyle}
            >
              Get in touch
            </h5>
            <ul className="space-y-4">
              {hasEmail && (
                <li className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="text-[#B8860B] mt-0.5 flex-shrink-0"
                    strokeWidth={1.8}
                  />
                  <a
                    href={"mailto:" + siteConfig.contactEmail}
                    className="text-sm text-[#FAF7F2]/70 hover:text-[#B8860B] transition-colors break-all"
                    style={linkStyle}
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[#FAF7F2]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-xs text-[#FAF7F2]/40"
            style={linkStyle}
          >
            <span>
              &copy; {year} {siteConfig.businessName}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-[#FAF7F2]/15">/</span>
            <div className="flex items-center gap-5">
              {LEGAL.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-[#B8860B] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p
            className="text-[11px] text-[#FAF7F2]/30 max-w-md md:text-right"
            style={linkStyle}
          >
            Amazon is a trademark of Amazon.com, Inc. Amazon Safety Pro is an
            independent compliance service and is not affiliated with or
            endorsed by Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
