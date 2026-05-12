"use client";

import {
  useState,
  useRef,
  useTransition,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { submitContactForm, type ContactActionResult } from "./actions";
import { SERVICE_INQUIRY_LABELS, type ServiceInquiryType } from "@/lib/types";
import {
  getServicePrice,
  isPaidService,
  formatPrice,
} from "@/lib/services-prices";
import PayPalCheckout from "@/components/PayPalCheckout";
import StripeCheckout from "@/components/StripeCheckout";
import { getActiveProvider } from "@/lib/payment-provider";

const INQUIRY_OPTIONS: ServiceInquiryType[] = [
  "product_safety_compliance_advice",
  "cpc_doc_gcc_creation",
  "document_validation",
  "stranded_asin_reinstatement",
  "general_question",
];

const VALID_INQUIRIES: ServiceInquiryType[] = [...INQUIRY_OPTIONS];

type PaymentStage = "idle" | "paying" | "paid";

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
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const price = getServicePrice(inquiryType);
  const requiresPayment = isPaidService(inquiryType);

  function runSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(null, formData);
      setState(result);
    });
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const selected = (formData.get("inquiryType")?.toString() ??
      "general_question") as ServiceInquiryType;

    if (isPaidService(selected) && paymentStage === "idle") {
      if (!validateLocally(formData)) {
        setState({
          ok: false,
          error: "Please fill in all required fields before continuing to payment.",
        });
        return;
      }
      setState(null);
      setPaymentError(null);
      setPaymentStage("paying");
      return;
    }

    runSubmit(formData);
  }

  function handlePayPalSuccess(captureId: string, orderId: string) {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set("paypalCaptureId", captureId);
    formData.set("paypalOrderId", orderId);
    setPaymentStage("paid");
    runSubmit(formData);
  }

  function handleStripeSuccess(paymentIntentId: string) {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set("stripePaymentIntentId", paymentIntentId);
    setPaymentStage("paid");
    runSubmit(formData);
  }

  function handlePaymentError(msg: string) {
    setPaymentError(msg);
  }

  const activeProvider = getActiveProvider();

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
            : "Message received. We'll be in touch."}
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
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
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
        disabled={paymentStage !== "idle"}
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

      {requiresPayment && (
        <PricePanel
          inquiryType={inquiryType}
          price={price ?? 0}
        />
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

      {paymentStage === "idle" && (
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
            {isPending
              ? "Sending…"
              : requiresPayment
              ? `Continue to payment · ${formatPrice(price ?? 0)}`
              : "Send Message"}
          </button>
          <span
            className="text-xs"
            style={{ fontFamily: "var(--font-outfit)", color: "#6B6560" }}
          >
            Secure · No trackers
          </span>
        </div>
      )}

      {paymentStage === "paying" && price != null && (
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

          {activeProvider === "stripe" ? (
            <StripeCheckout
              inquiryType={inquiryType}
              amount={price}
              onSuccess={handleStripeSuccess}
              onError={handlePaymentError}
            />
          ) : (
            <PayPalCheckout
              inquiryType={inquiryType}
              amount={price}
              onSuccess={handlePayPalSuccess}
              onError={handlePaymentError}
            />
          )}

          {paymentError && (
            <p
              className="mt-3 text-sm text-[#9B1C1C]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {paymentError}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setPaymentStage("idle");
              setPaymentError(null);
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#6B6560] hover:text-[#B8860B] transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <ArrowLeft size={12} strokeWidth={2.5} />
            Back to edit details
          </button>
        </div>
      )}

      {paymentStage === "paid" && (
        <div className="flex items-center gap-3 pt-2">
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#1B4332] animate-pulse"
            aria-hidden
          />
          <span
            className="text-sm font-medium text-[#1B4332]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Payment received — finalising your order…
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
  onChange,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

function PricePanel({
  inquiryType,
  price,
}: {
  inquiryType: ServiceInquiryType;
  price: number;
}) {
  return (
    <div
      className="rounded-xl border border-[#B8860B]/25 bg-[#B8860B]/[0.04] p-5 flex items-center justify-between gap-4"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B8860B]">
          Service Fee
        </p>
        <p className="text-sm text-[#2D2A26] mt-1">
          {SERVICE_INQUIRY_LABELS[inquiryType]}
        </p>
      </div>
      <div className="text-right">
        <p className="text-2xl text-[#2D2A26] font-medium" style={{ fontFamily: "var(--font-dm-serif)" }}>
          {formatPrice(price)}
        </p>
        <p className="text-[10px] text-[#6B6560] tracking-wider uppercase">
          Pay on continue
        </p>
      </div>
    </div>
  );
}
