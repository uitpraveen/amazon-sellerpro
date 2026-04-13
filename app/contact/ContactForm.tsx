"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm, type ContactActionResult } from "./actions";
import { SERVICE_INQUIRY_LABELS, type ServiceInquiryType } from "@/lib/types";
import StatusPill from "@/components/ui/StatusPill";
import FramedBlock from "@/components/ui/FramedBlock";
import MonoLabel from "@/components/ui/MonoLabel";
import TacticalButton from "@/components/ui/TacticalButton";

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
      <FramedBlock
        bracketColor="var(--ok)"
        className="bg-[var(--paper)]"
      >
        <div className="flex items-center gap-3">
          <StatusPill tone="ok">TRANSMITTED</StatusPill>
          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
            ACK · 200 OK
          </span>
        </div>
        <h3 className="mt-6 text-2xl font-bold text-[var(--ink)]">
          Message received. Stand by.
        </h3>
        <p className="mt-3 text-[var(--ink-2)]">
          A member of our team will respond within 1 business day.
        </p>
      </FramedBlock>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot */}
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
          className="mt-2 block w-full border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 font-sans text-[17px] text-[var(--ink)] transition-colors focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
        />
        {state?.fieldErrors?.message && (
          <FieldError>{state.fieldErrors.message}</FieldError>
        )}
      </div>

      {state?.ok === false && !state.fieldErrors && (
        <FramedBlock
          bracketColor="var(--alert)"
          className="bg-[var(--paper)] py-4"
        >
          <div className="flex items-center gap-3">
            <StatusPill tone="alert">ERROR</StatusPill>
            <p className="text-sm text-[var(--ink-2)]">{state.error}</p>
          </div>
        </FramedBlock>
      )}

      <div className="flex items-center gap-4 pt-2">
        <TacticalButton type="submit" disabled={isPending}>
          {isPending ? "Transmitting…" : "Transmit Message"}
        </TacticalButton>
        <MonoLabel>// SECURE · NO TRACKERS</MonoLabel>
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
        className="mt-2 block w-full border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 font-sans text-[17px] text-[var(--ink)] transition-colors focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
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
      <div className="relative mt-2">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className="block w-full appearance-none border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 pr-10 font-sans text-[17px] text-[var(--ink)] transition-colors focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[var(--ink-3)]"
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
      className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--ink-3)]"
    >
      <span className="text-[var(--signal)]">→</span>
      {children}
      {required && <span className="text-[var(--alert)]">*</span>}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 font-mono text-[12px] uppercase tracking-widest text-[var(--alert)]">
      [ ERROR ] {children}
    </p>
  );
}
