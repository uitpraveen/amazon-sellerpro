import { Suspense } from "react";
import ContactForm from "@/app/contact/ContactForm";

const sidebarRows = [
  { label: "Response", value: "< 1 Business Day" },
  { label: "Reviewed By", value: "Ex-Amazonian" },
  { label: "Confidentiality", value: "Strict" },
  { label: "First Review", value: "Free" },
  { label: "Channels", value: "Email · Zoom" },
];

const trustPoints = [
  "Response within 1 business day",
  "Strict confidentiality on all seller and product information",
  "No obligation — your first document review is free",
];

export default function ContactSplitSection() {
  return (
    <section style={{ backgroundColor: "#FAF7F2" }}>
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
        {/* Hero */}
        <div className="max-w-3xl">
          <h1
            className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-dm-serif)", color: "#2D2A26" }}
          >
            Get in Touch
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
          >
            Whether you have a quick compliance question or a complex case that
            needs immediate attention, our team of tenured ex-Amazonians is here
            to help. Fill out the form below and a member of our team will
            respond within 1 business day.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Form — 8 cols */}
          <div className="lg:col-span-8">
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E8E0D4",
              }}
            >
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          {/* Sidebar — 4 cols */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-32">
              {/* Details card */}
              <div
                className="rounded-2xl p-7"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8E0D4",
                }}
              >
                <p
                  className="mb-5 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "#B8860B",
                  }}
                >
                  What to expect
                </p>
                <div className="space-y-0">
                  {sidebarRows.map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-3"
                      style={{
                        borderBottom:
                          i < sidebarRows.length - 1
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

              {/* Trust card */}
              <div
                className="rounded-2xl p-7"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8E0D4",
                }}
              >
                <h2
                  className="text-xl"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    color: "#2D2A26",
                  }}
                >
                  Why Sellers Trust Us
                </h2>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
                >
                  Every message we receive is reviewed by a real, experienced
                  ex-Amazonian. We do not use automated responses for compliance
                  queries — your case is too important for that.
                </p>
                <ul className="mt-5 space-y-3">
                  {trustPoints.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-snug"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "#6B6560",
                      }}
                    >
                      <span
                        className="mt-0.5 shrink-0 font-semibold"
                        style={{ color: "#B8860B" }}
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
