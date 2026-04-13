"use client";

import { useActionState, useState } from "react";
import { Upload, X } from "lucide-react";
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
import MonoLabel from "@/components/ui/MonoLabel";
import StatusPill from "@/components/ui/StatusPill";
import FramedBlock from "@/components/ui/FramedBlock";
import TacticalButton from "@/components/ui/TacticalButton";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TransmissionRow from "@/components/ui/TransmissionRow";

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
        <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
          <FramedBlock bracketColor="var(--ok)" className="bg-[var(--paper)]">
            <div className="flex items-center gap-3">
              <StatusPill tone="ok">TRANSMITTED</StatusPill>
              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                ACK · 200 OK
              </span>
            </div>
            <h1 className="mt-6 text-3xl font-black leading-tight text-[var(--ink)] sm:text-4xl">
              Documents received. Stand by.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">
              A real ex-Amazonian will review your case personally and come
              back to you with a clear, honest picture of what is wrong and
              what the path forward looks like. If there is a viable path to
              reinstatement, we will walk you through it — and set up a call
              if needed.
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
              // NO OBLIGATION · WE REVIEW FIRST · THEN TALK
            </p>
          </FramedBlock>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 lg:px-12 lg:pt-40">
            <RevealOnScroll showLine={false}>
              <MonoLabel prefix="→">FREE REVIEW PROTOCOL // OPEN</MonoLabel>
              <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Tired of rejections with no answers?{" "}
                <span className="text-[var(--signal)]">Start here.</span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                Submit your compliance documents and Amazon notifications for
                a free review. Our team will go through everything — your
                rejection notices, your existing documents, your case history
                — and come back to you with a clear, honest picture of what
                is wrong and what the path forward looks like.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ink-2)]">
                No automated responses. No guesswork. A real ex-Amazonian
                will review your case personally. If there is a viable path
                to reinstatement, we will walk you through it — and set up
                a call if needed.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                // NO OBLIGATION · WE REVIEW FIRST · THEN TALK
              </p>
            </RevealOnScroll>

            <RevealOnScroll className="mt-16" showLine={false}>
              <FramedBlock className="bg-[var(--paper)]">
                <div className="mb-8 flex items-center justify-between">
                  <MonoLabel prefix="→">PAYLOAD MANIFEST</MonoLabel>
                  <StatusPill tone="signal">READY</StatusPill>
                </div>

                <form action={handleSubmit} className="space-y-6" noValidate>
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
                      className="mt-2 block w-full border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 font-sans text-[17px] text-[var(--ink)] transition-colors focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
                    />
                    {state?.fieldErrors?.productDescription && (
                      <FieldError>{state.fieldErrors.productDescription}</FieldError>
                    )}
                  </div>

                  <div>
                    <FieldLabel htmlFor="upload-input">
                      Stage compliance documents for transmission
                    </FieldLabel>
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-[var(--ink-3)]">
                      // ACCEPT · PDF JPG PNG DOC DOCX · MAX {MAX_FILE_COUNT} FILES
                      · 10MB EACH · 25MB TOTAL
                    </p>
                    <label
                      htmlFor="upload-input"
                      className="mt-3 flex cursor-pointer items-center justify-center gap-3 border border-dashed border-[var(--rule)] bg-[var(--paper-edge)]/60 px-6 py-10 transition-colors hover:border-[var(--signal)] hover:bg-[var(--signal-soft)]/40"
                    >
                      <Upload className="h-5 w-5 text-[var(--ink-2)]" />
                      <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-2)]">
                        → STAGE FILES FOR TRANSMISSION
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
                      <div className="mt-4 border border-[var(--rule)] bg-[var(--paper)]">
                        <div className="border-b border-[var(--rule)] bg-[var(--paper-edge)]/40 px-4 py-2">
                          <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                            STAGED MANIFEST · {files.length}/{MAX_FILE_COUNT}
                          </span>
                        </div>
                        <ul>
                          {files.map((f, i) => (
                            <li
                              key={`${f.name}-${i}`}
                              className="flex items-center gap-3 border-b border-dashed border-[var(--rule)] px-4 py-3 last:border-b-0"
                            >
                              <StatusPill tone="ok">STAGED</StatusPill>
                              <span className="flex-1 truncate font-mono text-xs text-[var(--ink)]">
                                {f.name}
                              </span>
                              <span className="font-mono text-[12px] uppercase tracking-widest text-[var(--ink-3)]">
                                {formatFileSize(f.size)}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="font-mono text-xs text-[var(--ink-3)] transition-colors hover:text-[var(--alert)]"
                                aria-label={`Remove ${f.name}`}
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-[var(--rule)] bg-[var(--paper-edge)]/40 px-4 py-2">
                          <TransmissionRow
                            label="Total Payload"
                            value={`${files.length} FILES · ${formatFileSize(totalSize)}`}
                          />
                        </div>
                      </div>
                    )}

                    {clientError && <FieldError>{clientError}</FieldError>}
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

                  <div className="flex flex-wrap items-center gap-4 border-t border-dashed border-[var(--rule)] pt-6">
                    <TacticalButton type="submit" disabled={isPending}>
                      {isPending ? "Transmitting…" : "Transmit for Review"}
                    </TacticalButton>
                    <MonoLabel>// SECURE · DOCS NOT STORED</MonoLabel>
                  </div>
                </form>
              </FramedBlock>
            </RevealOnScroll>
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
        className="mt-2 block w-full border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 font-sans text-[17px] text-[var(--ink)] transition-colors focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
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
