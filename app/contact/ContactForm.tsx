"use client";

import {
  useState,
  useRef,
  useEffect,
  useTransition,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { submitContactForm, type ContactActionResult } from "./actions";
import {
  SERVICE_INQUIRY_LABELS,
  AMAZON_MARKETPLACES,
  type ServiceInquiryType,
} from "@/lib/types";
import {
  getServicePrice,
  isPaidService,
  formatPrice,
} from "@/lib/services-prices";
import PayPalCheckout from "@/components/PayPalCheckout";

const INQUIRY_OPTIONS: ServiceInquiryType[] = [
  "asin_classification_review",
  "document_review_remediation",
  "safety_incident_reinstatement",
  "compliance_document_creation",
  "product_compliance_assessment",
  "testing_guidance",
  "not_sure_need_advice",
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

  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ContactActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const [inquiryType, setInquiryType] =
    useState<ServiceInquiryType>(initialInquiry);
  const [marketplaces, setMarketplaces] = useState<string[]>([]);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  // Whether all mandatory fields are currently filled - gates the pay button.
  const [formValid, setFormValid] = useState(false);

  const price = getServicePrice(inquiryType);
  const requiresPayment = isPaidService(inquiryType);
  const isTestingGuidance = inquiryType === "testing_guidance";

  function runSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(null, formData);
      setState(result);
    });
  }

  function refreshValidity() {
    if (!formRef.current) {
      setFormValid(false);
      return;
    }
    setFormValid(validateLocally(new FormData(formRef.current)));
  }

  // Re-check validity when the controlled fields (marketplaces, inquiry) change;
  // free-text fields are re-checked via the form's onInput handler.
  useEffect(() => {
    refreshValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplaces, inquiryType]);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    // Paid services submit only after a successful PayPal capture.
    if (requiresPayment) return;
    runSubmit(new FormData(formRef.current));
  }

  function handlePayPalSuccess(captureId: string, orderId: string) {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set("paypalCaptureId", captureId);
    formData.set("paypalOrderId", orderId);
    runSubmit(formData);
  }

  function handlePaymentError(msg: string) {
    setPaymentError(msg);
  }

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
          {requiresPayment
            ? "Payment received. We'll be in touch."
            : "Enquiry received. We'll be in touch."}
        </h3>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ fontFamily: "var(--font-outfit)", color: "#2D2A26" }}
        >
          A member of our team will respond within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      onInput={refreshValidity}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <fieldset
        disabled={isPending}
        className="space-y-6 disabled:opacity-60"
      >
        <Field
          label="Full name"
          name="fullName"
          required
          error={state && !state.ok ? state.fieldErrors?.fullName : undefined}
        />
        <Field
          label="Business name / Company"
          name="businessName"
          required
          error={
            state && !state.ok ? state.fieldErrors?.businessName : undefined
          }
        />
        <Field
          label="Email address"
          name="email"
          type="email"
          required
          error={state && !state.ok ? state.fieldErrors?.email : undefined}
        />
        <Field
          label="Phone number (optional)"
          name="phone"
          type="tel"
          error={state && !state.ok ? state.fieldErrors?.phone : undefined}
        />
        <Field
          label="Amazon Seller ID or Store URL (optional)"
          name="amazonSellerId"
          error={
            state && !state.ok ? state.fieldErrors?.amazonSellerId : undefined
          }
        />

        <MultiMarketplaceField
          label="Amazon marketplace"
          name="amazonMarketplace"
          required
          values={marketplaces}
          onChange={setMarketplaces}
          options={AMAZON_MARKETPLACES.map((m) => ({
            value: m.value,
            label: m.label,
          }))}
          error={
            state && !state.ok
              ? state.fieldErrors?.amazonMarketplace
              : undefined
          }
        />

        <Field
          label="Product category (e.g. Toys, Electronics, Apparel)"
          name="productCategory"
          required
          error={
            state && !state.ok ? state.fieldErrors?.productCategory : undefined
          }
        />

        <SelectField
          label="Type of inquiry"
          name="inquiryType"
          required
          value={inquiryType}
          onChange={(v) => setInquiryType(v as ServiceInquiryType)}
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
          {state && !state.ok && state.fieldErrors?.message && (
            <FieldError>{state.fieldErrors.message}</FieldError>
          )}
        </div>
      </fieldset>

      {isTestingGuidance && (
        <div
          className="rounded-xl border border-[#B8860B]/30 bg-[#B8860B]/[0.04] p-5"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B8860B] mb-1">
            Coming Soon
          </p>
          <p className="text-sm text-[#2D2A26]">
            Testing Guidance is launching shortly. Submit your details and we
            will notify you as soon as the service is available.
          </p>
        </div>
      )}

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

      {requiresPayment && price != null ? (
        <div className="rounded-2xl border border-[#E8E0D4] bg-white p-6 shadow-lg shadow-[#1B4332]/5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p
                className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B8860B]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Payment
              </p>
              <h3
                className="text-xl text-[#2D2A26] mt-1"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {SERVICE_INQUIRY_LABELS[inquiryType]}
              </h3>
            </div>
            <div className="text-right">
              <p
                className="text-[10px] text-[#6B6560] tracking-widest uppercase"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Total
              </p>
              <p
                className="text-2xl text-[#2D2A26]"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                {formatPrice(price)}
              </p>
            </div>
          </div>

          {!formValid && (
            <div
              className="mb-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] px-4 py-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <p className="text-sm text-[#6B6560]">
                Please complete all required fields above to enable payment.
              </p>
            </div>
          )}

          {isPending ? (
            <div className="flex items-center gap-3 py-2">
              <span
                className="inline-block h-2 w-2 rounded-full bg-[#1B4332] animate-pulse"
                aria-hidden
              />
              <span
                className="text-sm font-medium text-[#1B4332]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Payment received - submitting your details…
              </span>
            </div>
          ) : (
            <div className={!formValid ? "opacity-50" : undefined}>
              <PayPalCheckout
                inquiryType={inquiryType}
                amount={price}
                onSuccess={handlePayPalSuccess}
                onError={handlePaymentError}
                disabled={!formValid}
              />
            </div>
          )}

          {paymentError && (
            <p
              className="mt-3 text-sm text-[#9B1C1C]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {paymentError}
            </p>
          )}

          <p
            className="mt-4 text-xs text-[#6B6560]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Secure · No trackers · You&apos;ll be charged once and your details
            are sent to us automatically on success.
          </p>
        </div>
      ) : (
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
            {isPending ? "Sending…" : "Send Enquiry"}
          </button>
          <span
            className="text-xs"
            style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
          >
            Secure · No trackers
          </span>
        </div>
      )}
    </form>
  );
}

function validateLocally(formData: FormData): boolean {
  const required = [
    "fullName",
    "businessName",
    "email",
    "amazonMarketplace",
    "productCategory",
    "message",
  ];
  for (const k of required) {
    const v = formData.get(k)?.toString().trim();
    if (!v) return false;
  }
  const email = formData.get("email")?.toString() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  return true;
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
  value,
  defaultValue,
  placeholder,
  onChange,
  options,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
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
          {...(value !== undefined ? { value } : { defaultValue: defaultValue ?? "" })}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-base transition-colors focus:outline-none"
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
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
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function MultiMarketplaceField({
  label,
  name,
  required,
  values,
  onChange,
  options,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  values: string[];
  onChange: (next: string[]) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function toggle(value: string) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  }

  const valueString = values.join(",");
  const summary =
    values.length === 0
      ? "Select one or more marketplaces"
      : values.length === 1
      ? options.find((o) => o.value === values[0])?.label ?? values[0]
      : `${values.length} marketplaces selected`;

  return (
    <div ref={wrapperRef}>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      {/* Hidden input so the form picks up the comma-separated value */}
      <input type="hidden" name={name} value={valueString} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mt-1.5 block w-full rounded-lg border px-4 py-3 pr-10 text-left text-base transition-colors focus:outline-none relative"
        style={{
          fontFamily: "var(--font-outfit)",
          color: values.length === 0 ? "#9B9590" : "#2D2A26",
          backgroundColor: "#FAF7F2",
          borderColor: error ? "#9B1C1C" : open ? "#B8860B" : "#E8E0D4",
        }}
      >
        {summary}
        <ChevronDown
          size={16}
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: "#6B6560" }}
        />
      </button>

      {/* Selected chips */}
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {values.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-full bg-[#B8860B]/10 text-[#B8860B] text-xs px-2.5 py-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {opt?.label.split(" (")[0] ?? v}
                <button
                  type="button"
                  onClick={() => toggle(v)}
                  className="ml-0.5 text-[#B8860B]/80 hover:text-[#B8860B]"
                  aria-label={`Remove ${opt?.label ?? v}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Dropdown panel */}
      {open && (
        <div
          className="mt-2 rounded-lg border bg-white shadow-lg max-h-64 overflow-y-auto"
          style={{
            borderColor: "#E8E0D4",
            fontFamily: "var(--font-outfit)",
          }}
          role="listbox"
        >
          {options.map((opt) => {
            const checked = values.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => toggle(opt.value)}
                aria-selected={checked}
                role="option"
                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#FAF7F2]"
                style={{ color: "#2D2A26" }}
              >
                <span
                  className="flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center"
                  style={{
                    borderColor: checked ? "#B8860B" : "#9B9590",
                    backgroundColor: checked ? "#B8860B" : "transparent",
                  }}
                >
                  {checked && <Check size={11} strokeWidth={3} color="#fff" />}
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
          <div className="px-4 py-2.5 border-t" style={{ borderColor: "#E8E0D4" }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold tracking-wider uppercase text-[#B8860B] hover:text-[#a07609]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {error && <FieldError>{error}</FieldError>}
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

