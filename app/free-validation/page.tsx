"use client";

import { useActionState, useState } from "react";
import { Upload, X, CheckCircle2, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatFileSize } from "@/lib/utils";
import {
  ACCEPTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_TOTAL_UPLOAD_SIZE,
  MAX_FILE_COUNT,
} from "@/lib/constants";
import { submitFreeReview, type FreeReviewActionResult } from "./actions";

export default function FreeValidationPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState<
    FreeReviewActionResult | null,
    FormData
  >(submitFreeReview, null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setClientError(null);
    const merged = [...files, ...Array.from(newFiles)];
    if (merged.length > MAX_FILE_COUNT) {
      setClientError(`Maximum ${MAX_FILE_COUNT} files allowed.`);
      return;
    }
    let total = 0;
    for (const f of merged) {
      if (f.size > MAX_FILE_SIZE) {
        setClientError(`${f.name} exceeds 10 MB per-file limit.`);
        return;
      }
      total += f.size;
    }
    if (total > MAX_TOTAL_UPLOAD_SIZE) {
      setClientError("Total upload exceeds 25 MB limit.");
      return;
    }
    setFiles(merged);
  }

  function removeFile(idx: number) {
    setFiles(files.filter((_, i) => i !== idx));
  }

  function handleSubmit(formData: FormData) {
    formData.delete("documents");
    files.forEach((f) => formData.append("documents", f));
    formAction(formData);
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  if (state?.ok) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF7F2]">
          <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
            <div className="rounded-2xl border border-[#1B4332]/20 bg-[#1B4332]/5 p-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-[#1B4332]" />
                <span className="font-[family-name:var(--font-outfit)] text-sm font-medium uppercase tracking-widest text-[#1B4332]">
                  Submission received
                </span>
              </div>
              <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-3xl leading-tight text-[#2D2A26] sm:text-4xl">
                Documents received. We&rsquo;ll be in touch.
              </h1>
              <p className="mt-6 font-[family-name:var(--font-outfit)] text-lg leading-relaxed text-[#6B6560]">
                A real ex-Amazonian will review your case personally and come
                back to you with a clear, honest picture of what is wrong and
                what the path forward looks like. If there is a viable path to
                reinstatement, we will walk you through it — and set up a call
                if needed.
              </p>
              <p className="mt-6 font-[family-name:var(--font-outfit)] text-sm text-[#6B6560]">
                No obligation. We review first, then talk.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#FAF7F2]">
        {/* Hero */}
        <section className="border-b border-[#E8E0D4]">
          <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-12 lg:pt-40">
            <p className="font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-widest text-[#B8860B]">
              Free Document Review
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-dm-serif)] text-4xl leading-tight text-[#2D2A26] sm:text-5xl lg:text-6xl">
              Tired of rejections with no answers?{" "}
              <span className="text-[#B8860B]">Start here.</span>
            </h1>
            <p className="mt-6 max-w-3xl font-[family-name:var(--font-outfit)] text-lg leading-relaxed text-[#6B6560]">
              Submit your compliance documents and Amazon notifications for a
              free review. Our team will go through everything — your rejection
              notices, your existing documents, your case history — and come
              back to you with a clear, honest picture of what is wrong and what
              the path forward looks like.
            </p>
            <p className="mt-4 max-w-3xl font-[family-name:var(--font-outfit)] text-lg leading-relaxed text-[#6B6560]">
              No automated responses. No guesswork. A real ex-Amazonian will
              review your case personally. If there is a viable path to
              reinstatement, we will walk you through it — and set up a call if
              needed.
            </p>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Sidebar info card */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <div className="rounded-2xl border border-[#E8E0D4] bg-white p-8">
                    <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-[#2D2A26]">
                      What to expect
                    </h2>

                    <div className="mt-6 space-y-6">
                      <div>
                        <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                          What we review
                        </p>
                        <ul className="mt-3 space-y-2">
                          {[
                            "Amazon rejection notices",
                            "Existing compliance documents",
                            "Test reports & certificates",
                            "Case history & correspondence",
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#6B6560]"
                            >
                              <span className="mt-0.5 text-[#B8860B]">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[#E8E0D4] pt-6">
                        <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                          What you get
                        </p>
                        <ul className="mt-3 space-y-2">
                          {[
                            "Honest assessment of your case",
                            "Clear path to reinstatement",
                            "Personal review by ex-Amazonian",
                            "Follow-up call if needed",
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#6B6560]"
                            >
                              <span className="mt-0.5 text-[#B8860B]">—</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[#E8E0D4] pt-6">
                        <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                          Response time
                        </p>
                        <p className="mt-2 font-[family-name:var(--font-outfit)] text-sm text-[#6B6560]">
                          Within 1–2 business days. No obligation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Form */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-[#E8E0D4] bg-white p-8 lg:p-10">
                  <h2 className="font-[family-name:var(--font-dm-serif)] text-2xl text-[#2D2A26]">
                    Submit your case for review
                  </h2>
                  <p className="mt-2 font-[family-name:var(--font-outfit)] text-sm text-[#6B6560]">
                    All fields marked * are required.
                  </p>

                  <form action={handleSubmit} className="mt-8 space-y-6" noValidate>
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
                      label="Business name"
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
                      label="Product category"
                      name="productCategory"
                      required
                      error={state?.fieldErrors?.productCategory}
                    />

                    <div>
                      <FieldLabel htmlFor="productDescription" required>
                        Describe your situation
                      </FieldLabel>
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        required
                        rows={5}
                        placeholder="Tell us about your product, the rejection notices you've received, and any case history."
                        className="mt-2 block w-full rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] px-4 py-3 font-[family-name:var(--font-outfit)] text-[17px] text-[#2D2A26] placeholder:text-[#6B6560]/50 transition-colors focus:border-[#B8860B] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20"
                      />
                      {state?.fieldErrors?.productDescription && (
                        <FieldError>{state.fieldErrors.productDescription}</FieldError>
                      )}
                    </div>

                    {/* File upload */}
                    <div>
                      <FieldLabel htmlFor="upload-input">
                        Upload compliance documents (optional)
                      </FieldLabel>
                      <p className="mt-1 font-[family-name:var(--font-outfit)] text-xs text-[#6B6560]">
                        PDF, JPG, PNG, DOC, DOCX — up to {MAX_FILE_COUNT} files, 10 MB each, 25 MB total
                      </p>

                      <label
                        htmlFor="upload-input"
                        className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#E8E0D4] bg-[#FAF7F2] px-6 py-10 transition-colors hover:border-[#B8860B] hover:bg-[#B8860B]/5"
                      >
                        <Upload className="h-6 w-6 text-[#6B6560]" />
                        <span className="font-[family-name:var(--font-outfit)] text-sm text-[#6B6560]">
                          Click to select files
                        </span>
                      </label>
                      <input
                        id="upload-input"
                        type="file"
                        multiple
                        accept={ACCEPTED_FILE_EXTENSIONS}
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                      />

                      {files.length > 0 && (
                        <div className="mt-4 rounded-xl border border-[#E8E0D4] bg-[#FAF7F2] overflow-hidden">
                          <div className="border-b border-[#E8E0D4] px-4 py-3">
                            <span className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                              {files.length} of {MAX_FILE_COUNT} files staged
                            </span>
                          </div>
                          <ul>
                            {files.map((f, i) => (
                              <li
                                key={`${f.name}-${i}`}
                                className="flex items-center gap-3 border-b border-[#E8E0D4] px-4 py-3 last:border-b-0"
                              >
                                <FileText className="h-4 w-4 shrink-0 text-[#B8860B]" />
                                <span className="flex-1 truncate font-[family-name:var(--font-outfit)] text-sm text-[#2D2A26]">
                                  {f.name}
                                </span>
                                <span className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6560]">
                                  {formatFileSize(f.size)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(i)}
                                  className="rounded-full p-1 text-[#6B6560] transition-colors hover:bg-red-50 hover:text-red-500"
                                  aria-label={`Remove ${f.name}`}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </li>
                            ))}
                          </ul>
                          <div className="border-t border-[#E8E0D4] bg-white/60 px-4 py-2">
                            <span className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6560]">
                              Total: {files.length} {files.length === 1 ? "file" : "files"} · {formatFileSize(totalSize)}
                            </span>
                          </div>
                        </div>
                      )}

                      {clientError && <FieldError>{clientError}</FieldError>}
                    </div>

                    {/* Server error */}
                    {state?.ok === false && !state.fieldErrors && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                        <p className="font-[family-name:var(--font-outfit)] text-sm text-red-700">
                          {state.error}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 border-t border-[#E8E0D4] pt-6">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-full bg-[#B8860B] px-8 py-3 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all hover:bg-[#9a7009] disabled:opacity-60"
                      >
                        {isPending ? "Submitting…" : "Submit for Review"}
                      </button>
                      <p className="font-[family-name:var(--font-outfit)] text-xs text-[#6B6560]">
                        Secure · Documents not stored
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
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
        className="mt-2 block w-full rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] px-4 py-3 font-[family-name:var(--font-outfit)] text-[17px] text-[#2D2A26] transition-colors focus:border-[#B8860B] focus:outline-none focus:ring-2 focus:ring-[#B8860B]/20"
      />
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
      className="flex items-center gap-1.5 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#2D2A26]"
    >
      {children}
      {required && <span className="text-[#B8860B]">*</span>}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 font-[family-name:var(--font-outfit)] text-xs text-red-600">
      {children}
    </p>
  );
}
