import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

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
    <footer className="bg-[#2D2A26] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div>
            <h4
              className="text-xl text-[#FAF7F2] mb-3"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Amazon Safety Pro
            </h4>
            <p
              className="text-sm text-[#FAF7F2]/50 leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Compliance handled by people who built the rules.
            </p>
            <div className="flex flex-wrap gap-2">
              {JURISDICTIONS.map((j) => (
                <span
                  key={j}
                  className="text-xs px-2.5 py-1 border border-[#B8860B]/30 text-[#B8860B] rounded"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {j}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5
              className="text-sm uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Navigation
            </h5>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h5
              className="text-sm uppercase tracking-wider text-[#B8860B] mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Legal & Contact
            </h5>
            <ul className="space-y-2.5">
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={"mailto:" + siteConfig.contactEmail}
                  className="text-sm text-[#FAF7F2]/50 hover:text-[#B8860B] transition-colors"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF7F2]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#FAF7F2]/30"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            &copy; {new Date().getFullYear()} Amazon Safety Pro. All rights reserved.
          </p>
          <p
            className="text-xs text-[#FAF7F2]/30"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Amazon is a trademark of Amazon.com, Inc. We are not affiliated with Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
