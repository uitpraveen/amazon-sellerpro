import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Amazon Safety Pro",
  description:
    "Our services are quoted on a fixed-fee or hourly basis, agreed in writing prior to engagement.",
};

const infoRows = [
  { label: "Engagement", value: "Fixed Fee / Hourly" },
  { label: "Agreement", value: "Written Quote" },
  { label: "Currency", value: "USD / Multi-currency" },
  { label: "Payment", value: "In Advance" },
  { label: "First Review", value: "Free" },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#FAF7F2" }}>
        {/* Hero */}
        <section style={{ borderBottom: "1px solid #E8E0D4" }}>
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-12 lg:pt-40 lg:pb-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Heading + description */}
              <div className="lg:col-span-7">
                <p
                  className="text-sm font-medium uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "#B8860B",
                  }}
                >
                  Request a Quote
                </p>
                <h1
                  className="mt-4 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    color: "#2D2A26",
                  }}
                >
                  Transparent Pricing,<br />Agreed in Writing
                </h1>
                <p
                  className="mt-6 max-w-2xl text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
                >
                  Our services are offered on a fixed-fee or hourly basis,
                  agreed and communicated to you in writing prior to engagement.
                  Tell us about your case and we&rsquo;ll come back with a
                  quotation tailored to your specific situation.
                </p>
              </div>

              {/* Info card */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-2xl p-8"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #E8E0D4",
                  }}
                >
                  <p
                    className="mb-6 text-xs font-semibold uppercase tracking-widest"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: "#B8860B",
                    }}
                  >
                    Engagement Details
                  </p>
                  <div className="space-y-0">
                    {infoRows.map((row, i) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between py-3"
                        style={{
                          borderBottom:
                            i < infoRows.length - 1
                              ? "1px solid #E8E0D4"
                              : "none",
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "var(--font-outfit)",
                            color: "#B8860B",
                            fontWeight: 500,
                          }}
                        >
                          {row.label}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            fontFamily: "var(--font-outfit)",
                            color: "#2D2A26",
                          }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <ServicesGridSection />
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ borderTop: "1px solid #E8E0D4" }}>
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
            <div
              className="rounded-2xl px-10 py-16 text-center"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E8E0D4",
              }}
            >
              <h2
                className="text-3xl sm:text-4xl"
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  color: "#2D2A26",
                }}
              >
                Not sure which service you need?
              </h2>
              <p
                className="mx-auto mt-4 max-w-xl text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
              >
                Submit your documents for a free review and our team will guide
                you to the right engagement — no obligation.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/free-validation"
                  className="inline-block rounded-full bg-signal px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-deep"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Submit for a free review
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
