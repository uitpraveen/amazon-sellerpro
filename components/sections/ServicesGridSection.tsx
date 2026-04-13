"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/services-data";
import ServiceCard from "@/components/sections/ServiceCard";
import Link from "next/link";

export default function ServicesGridSection() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "#FAF7F2",
          paddingTop: "96px",
          paddingBottom: "72px",
          borderBottom: "1px solid #E8E0D4",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B8860B",
                marginBottom: "16px",
              }}
            >
              What We Do
            </p>
            <h1
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(44px, 7vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.08,
                color: "#2D2A26",
                marginBottom: "24px",
                maxWidth: "700px",
              }}
            >
              Our Services
            </h1>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "17px",
                lineHeight: 1.75,
                color: "#6B6560",
                maxWidth: "640px",
              }}
            >
              Amazon Safety Pro offers a comprehensive suite of compliance and
              documentation services, each delivered by a team of tenured
              ex-Amazonians who understand exactly what Amazon requires. Whether
              you&rsquo;re preparing a new product launch, responding to a
              compliance notice, or working to reinstate a suspended listing, we
              have a service designed for your situation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards grid */}
      <section
        style={{
          background: "#FAF7F2",
          paddingTop: "72px",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.code} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: "#FAF7F2",
          borderTop: "1px solid #E8E0D4",
          paddingTop: "72px",
          paddingBottom: "88px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B8860B",
                marginBottom: "16px",
              }}
            >
              Free First Review
            </p>
            <h2
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#2D2A26",
                marginBottom: "16px",
                maxWidth: "560px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Not sure which service applies?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#6B6560",
                maxWidth: "480px",
                margin: "0 auto 36px",
              }}
            >
              Submit your documents and Amazon notifications. Our team will
              review them and tell you exactly what you need.
            </p>
            <Link
              href="/free-validation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-outfit)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FAF7F2",
                background: "#B8860B",
                textDecoration: "none",
                padding: "14px 32px",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#96700a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#B8860B")}
            >
              Submit for free review
              <span style={{ fontSize: "16px" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
