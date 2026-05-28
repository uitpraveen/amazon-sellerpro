"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceDef } from "@/lib/services-data";

export default function ServiceCard({ service, index }: { service: ServiceDef; index: number }) {
  const num = String(service.number).padStart(2, "0");

  const ctaHref = service.comingSoon
    ? `/contact?inquiry=${service.inquiry}`
    : `/contact?inquiry=${service.inquiry}`;

  return (
    <motion.div
      id={service.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: "easeOut" }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8E0D4",
        borderRadius: "16px",
        borderTop: "2px solid #B8860B",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        scrollMarginTop: "120px",
        position: "relative",
      }}
    >
      {service.badge && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "32px",
            background: service.comingSoon ? "#6B6560" : "#B8860B",
            color: service.comingSoon ? "#FAF7F2" : "#1f1c19",
            padding: "5px 12px",
            borderRadius: "999px",
            fontFamily: "var(--font-outfit)",
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            boxShadow: "0 2px 6px rgba(45,42,38,0.12)",
          }}
        >
          {service.badge}
        </div>
      )}
      <div style={{ padding: "32px" }}>
        {/* Gold numbered badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(184,134,11,0.10)",
            border: "1.5px solid #B8860B",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#B8860B",
              letterSpacing: "0.04em",
            }}
          >
            {num}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.25,
            color: "#2D2A26",
            marginBottom: "20px",
          }}
        >
          {service.title}
        </h3>

        {/* What it is */}
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B8860B",
              marginBottom: "8px",
            }}
          >
            What it is
          </p>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "14.5px",
              lineHeight: 1.7,
              color: "#6B6560",
            }}
          >
            {service.what}
          </p>
        </div>

        {/* Who needs it */}
        {service.who && (
          <div style={{ marginBottom: "18px" }}>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6560",
                marginBottom: "8px",
              }}
            >
              Who needs it
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "14.5px",
                lineHeight: 1.7,
                color: "#6B6560",
              }}
            >
              {service.who}
            </p>
          </div>
        )}

        {/* Why it matters */}
        {service.whyMatters && (
          <div
            style={{
              marginBottom: "18px",
              background: "rgba(184,134,11,0.06)",
              borderLeft: "3px solid #B8860B",
              borderRadius: "0 8px 8px 0",
              padding: "14px 16px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#B8860B",
                marginBottom: "6px",
              }}
            >
              Why it matters
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit)",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#6B6560",
              }}
            >
              {service.whyMatters}
            </p>
          </div>
        )}

        {/* Scope of work */}
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1B4332",
              marginBottom: "10px",
            }}
          >
            Scope of work
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {service.includes.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "3px",
                    color: "#B8860B",
                    fontSize: "14px",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "#6B6560",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing note */}
        {service.closingNote && (
          <p
            style={{
              fontFamily: "var(--font-outfit)",
              fontSize: "14px",
              fontStyle: "italic",
              lineHeight: 1.65,
              color: "#2D2A26",
              borderLeft: "2px solid #E8E0D4",
              paddingLeft: "14px",
              marginBottom: "18px",
            }}
          >
            {service.closingNote}
          </p>
        )}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: "auto",
          padding: "20px 32px 28px",
          borderTop: "1px solid #E8E0D4",
        }}
      >
        {service.comingSoon ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-outfit)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#6B6560",
            }}
          >
            Coming Soon - Register Interest
          </span>
        ) : (
          <Link
            href={ctaHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-outfit)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#B8860B",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {service.ctaLabel}
            <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
