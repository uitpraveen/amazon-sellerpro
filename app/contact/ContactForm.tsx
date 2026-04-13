"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm, type ContactActionResult } from "./actions";
import { SERVICE_INQUIRY_LABELS, type ServiceInquiryType } from "@/lib/types";

const INQUIRY_OPTIONS: ServiceInquiryType[] = [
  "product_safety_compliance_advice",
  "cpc_doc_gcc_creation",
  "document_validation",
  "stranded_asin_reinstatement",
  "general_question",
];

const VALID_INQUIRIES: ServiceInquiryType[] = [...INQUIRY_OPTIONS];

export default function ContactForm() {
  const search = useSearchParams();
  const inquiryParam = search.get("inquiry");
  const initialInquiry: ServiceInquiryType =
    inquiryParam && (VALID_INQUIRIES as string[]).includes(inquiryParam)
      ? (inquiryParam as ServiceInquiryType)
      : "general_question";

  const [state, formAction, isPending] = useActionState<
    ContactActionResult | null,
    FormData
  >(submitContactForm, null);

  if (state?.ok) {
    return (
      <div
        className="rounded-xl p-8"
        style={{
          backgroundColor: "#E8F0EC",
          border: "1px solid #1B4332",
        }}
      >
        <h3
          className="text-2xl"
          style={{ fontFamily: "var(--font-dm-serif)", color: "#1B4332" }}
        >
          Message received. We&rsquo;ll be in touch.
        </h3>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ fontFamily: "var(--font-outfit)", color: "#2D2A26" }}
        >
          A member of our team will respond within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot — keep exactly as-is */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Field
        label="Full name"
        name="fullName"
        required
        error={state?.fieldErrors?.fullName}
      />
      <Field
        label="Business name / Company"
        name="businessName"
        required
        error={state?.fieldErrors?.businessName}
      />
      <Field
        label="Email address"
        name="email"
        type="email"
        required
        error={state?.fieldErrors?.email}
      />
      <Field
        label="Phone number (optional)"
        name="phone"
        type="tel"
        error={state?.fieldErrors?.phone}
      />
      <Field
        label="Amazon Seller ID or Store URL (optional)"
        name="amazonSellerId"
        error={state?.fieldErrors?.amazonSellerId}
      />
      <Field
        label="Product category (e.g. Toys, Electronics, Apparel)"
        name="productCategory"
        required
        error={state?.fieldErrors?.productCategory}
      />

      <SelectField
        label="Type of inquiry"
        name="inquiryType"
        required
        defaultValue={initialInquiry}
        options={INQUIRY_OPTIONS.map((opt) => ({
          value: opt,
          label: SERVICE_INQUIRY_LABELS[opt],
        }))}
      />

      <div>
        <FieldLabel htmlFor="message" required>
          Message / describe your issue
        </FieldLabel>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1.5 block w-full rounded-lg border px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2"
          style={{
            fontFamily: "var(--font-outfit)",
            color: "#2D2A26",
            backgroundColor: "#FAF7F2",
            borderColor: "#E8E0D4",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#B8860B";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#E8E0D4";
          }}
        />
        {state?.fieldErrors?.message && (
          <FieldError>{state.fieldErrors.message}</FieldError>
        )}
      </div>

      {state?.ok === false && !state.fieldErrors && (
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: "#9B1C1C",
            backgroundColor: "#FEE2E2",
          }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-outfit)", color: "#9B1C1C" }}
          >
            {state.error}
          </p>
        </div>
      )}

      <div className="flex items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-60"
          style={{
            fontFamily: "var(--font-outfit)",
            backgroundColor: isPending ? "#9A7209" : "#B8860B",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Sending…" : "Send Message"}
        </button>
        <span
          className="text-xs"
          style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
        >
          Secure · No trackers
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        className="mt-1.5 block w-full rounded-lg border px-4 py-3 text-base transition-colors focus:outline-none"
        style={{
          fontFamily: "var(--font-outfit)",
          color: "#2D2A26",
          backgroundColor: "#FAF7F2",
          borderColor: error ? "#9B1C1C" : "#E8E0D4",
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = "#B8860B";
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = "#E8E0D4";
        }}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <div className="relative mt-1.5">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="block w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-base transition-colors focus:outline-none"
          style={{
            fontFamily: "var(--font-outfit)",
            color: "#2D2A26",
            backgroundColor: "#FAF7F2",
            borderColor: "#E8E0D4",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#B8860B";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#E8E0D4";
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs"
          style={{ color: "#6B6560" }}
        >
          ▼
        </span>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1 text-sm font-medium"
      style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
    >
      {children}
      {required && (
        <span style={{ color: "#B8860B" }} aria-label="required">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-1.5 text-sm"
      style={{ fontFamily: "var(--font-outfit)", color: "#9B1C1C" }}
    >
      {children}
    </p>
  );
}
