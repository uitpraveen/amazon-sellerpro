import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import LegalDocumentLayout, {
  type LegalSection,
  LegalP,
  LegalSubHeading,
  LegalBullets,
} from "@/components/sections/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Privacy Policy - Amazon Safety Pro",
  description: "How we collect, use, store, and protect your personal data.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "about-this-policy",
    number: "1",
    title: "About This Policy",
    body: (
      <>
        <LegalP>
          This Privacy Policy applies to Amazon Safety Pro, a compliance
          consulting service providing Amazon product safety and compliance
          advisory services to sellers across the United States, Canada, the
          European Union, the United Kingdom, India, Singapore, and
          Australia.
        </LegalP>
        <LegalP>
          This policy explains what personal data we collect from you, how we
          use and store it, who we share it with, and what rights you have in
          relation to your data. By using our website or engaging our
          services, you acknowledge that you have read and understood this
          policy.
        </LegalP>
        <LegalP>
          Because we operate across multiple jurisdictions, this policy is
          designed to comply with applicable privacy laws including
          India&rsquo;s Digital Personal Data Protection Act (DPDPA) 2023, the
          European Union General Data Protection Regulation (GDPR), the UK
          GDPR, Canada&rsquo;s Personal Information Protection and Electronic
          Documents Act (PIPEDA), the California Consumer Privacy Act (CCPA),
          Singapore&rsquo;s Personal Data Protection Act (PDPA), and
          Australia&rsquo;s Privacy Act 1988.
        </LegalP>
      </>
    ),
  },
  {
    id: "who-we-are",
    number: "2",
    title: "Who We Are",
    body: (
      <>
        <LegalP>
          <strong className="text-[var(--ink)]">Service:</strong>{" "}
          {siteConfig.businessName}
        </LegalP>
        <LegalP>
          <strong className="text-[var(--ink)]">Contact Email:</strong>{" "}
          {siteConfig.contactEmail}
        </LegalP>
        <LegalP>
          If you have any questions about how we handle your personal data,
          please contact us at the email address above.
        </LegalP>
      </>
    ),
  },
  {
    id: "what-data-we-collect",
    number: "3",
    title: "What Data We Collect",
    body: (
      <>
        <LegalSubHeading>Data you provide directly</LegalSubHeading>
        <LegalP>
          When you contact us, submit documents, or engage our services, we
          may collect the following personal and business information:
        </LegalP>
        <LegalBullets
          items={[
            "Your full name and job title",
            "Business name and Amazon Seller ID or Store URL",
            "Email address and phone number",
            "Product details, product categories, and ASIN information",
            "Compliance documents, test reports, certificates, and safety documentation you share with us",
            "Amazon notifications, rejection notices, and case correspondence you share with us",
            "Messages and communications sent to us via contact forms, email, Zoom, or Slack",
            "Payment information - processed securely through our third-party payment gateway; we do not store card details directly",
          ]}
        />
        <LegalSubHeading>Data collected automatically</LegalSubHeading>
        <LegalP>When you visit our website, we may automatically collect:</LegalP>
        <LegalBullets
          items={[
            "Usage data: pages visited, time spent on site, links clicked, and referral source",
            "Device and browser data: browser type, operating system, screen resolution, and IP address",
            "Analytics data via Google Analytics, including aggregated traffic and behavior data",
            "Advertising data via tracking pixels and cookies used for Google Ads and other digital advertising campaigns",
          ]}
        />
      </>
    ),
  },
  {
    id: "how-we-use-data",
    number: "4",
    title: "How We Use Your Data",
    body: (
      <>
        <LegalP>
          We use the personal data we collect for the following purposes:
        </LegalP>
        <LegalBullets
          items={[
            "To provide, manage, and deliver our compliance consulting services to you",
            "To review and assess the compliance documents and Amazon notifications you share with us",
            "To communicate with you about your case via email, Zoom, or Slack",
            "To schedule and conduct consultation meetings",
            "To process payments for our services through our third-party payment gateway",
            "To send you service updates, compliance alerts, or information relevant to your case",
            "To analyze website usage and improve our website and services using Google Analytics",
            "To serve targeted advertising to relevant audiences via Google Ads and other digital advertising platforms",
            "To comply with applicable legal and regulatory obligations",
            "To protect the security and integrity of our services and systems",
          ]}
        />
        <LegalP>
          We do not sell your personal data to third parties. We do not use
          your data for purposes beyond those listed above without your prior
          consent.
        </LegalP>
      </>
    ),
  },
  {
    id: "legal-basis",
    number: "5",
    title: "Legal Basis for Processing (EU / UK GDPR)",
    body: (
      <>
        <LegalP>
          For users in the European Union and United Kingdom, we process your
          personal data on the following legal bases:
        </LegalP>
        <LegalBullets
          items={[
            "Contractual necessity - processing required to deliver our services to you",
            "Legitimate interests - analytics, service improvement, and direct marketing to relevant business audiences",
            "Legal obligation - where we are required to process data to comply with applicable law",
            "Consent - for the use of non-essential cookies and targeted advertising, where required",
          ]}
        />
        <LegalP>
          Where we rely on consent as the legal basis, you have the right to
          withdraw that consent at any time without affecting the lawfulness
          of processing carried out before withdrawal.
        </LegalP>
      </>
    ),
  },
  {
    id: "store-and-protect",
    number: "6",
    title: "How We Store and Protect Your Data",
    body: (
      <>
        <LegalSubHeading>Storage</LegalSubHeading>
        <LegalP>
          Client documents, case files, compliance records, and related
          correspondence are stored securely in cloud storage systems. We use
          access controls and encryption to protect stored data from
          unauthorized access, loss, or disclosure.
        </LegalP>
        <LegalP>
          Meeting records and communications conducted via Zoom or Slack may
          be subject to the privacy policies of those platforms in addition
          to this policy.
        </LegalP>
        <LegalSubHeading>Retention</LegalSubHeading>
        <LegalP>
          We retain your personal data and client files for a period of one
          year from the conclusion of our engagement with you, unless a longer
          retention period is required by applicable law or agreed with you in
          writing. After this period, your data will be securely deleted or
          anonymised.
        </LegalP>
        <LegalSubHeading>Security</LegalSubHeading>
        <LegalP>
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. However, no method of transmission over
          the internet or method of electronic storage is completely secure,
          and we cannot guarantee absolute security.
        </LegalP>
      </>
    ),
  },
  {
    id: "data-sharing",
    number: "7",
    title: "Who We Share Your Data With",
    body: (
      <>
        <LegalP>
          We do not sell or rent your personal data. We may share your data
          with the following categories of trusted third parties, strictly
          for the purposes described in this policy:
        </LegalP>
        <LegalBullets
          items={[
            "Payment gateway providers - to process payments for our services securely",
            "Google LLC - for website analytics (Google Analytics) and digital advertising (Google Ads)",
            "Video and communication platforms - Zoom and Slack, used to conduct meetings and case communications",
            "Cloud storage providers - used to securely store client documents and case files",
            "Email and marketing tools - used for email communications and, if applicable, marketing campaigns",
          ]}
        />
        <LegalP>
          All third-party service providers we work with are required to
          handle your data in accordance with applicable privacy laws and are
          permitted to use your data only for the specific purposes for which
          it was shared.
        </LegalP>
        <LegalP>
          We may also disclose your data where required by law, court order,
          or regulatory authority, or where necessary to protect the rights,
          property, or safety of Amazon Safety Pro, our clients, or others.
        </LegalP>
      </>
    ),
  },
  {
    id: "international-transfers",
    number: "8",
    title: "International Data Transfers",
    body: (
      <LegalP>
        As a business registered in India serving clients across the US,
        Canada, EU, UK, Singapore, and Australia, your personal data may be
        transferred to and processed in countries other than your own. Where
        such transfers occur, we ensure that appropriate safeguards are in
        place in accordance with applicable privacy laws, including Standard
        Contractual Clauses (SCCs) for transfers from the EU and UK, and
        equivalent mechanisms for other jurisdictions.
      </LegalP>
    ),
  },
  {
    id: "cookies",
    number: "9",
    title: "Cookies and Tracking Technologies",
    body: (
      <>
        <LegalP>
          Our website uses cookies and similar tracking technologies to
          enhance your browsing experience, analyze site traffic, and support
          our advertising activities. The types of cookies we use include:
        </LegalP>
        <LegalBullets
          items={[
            "Essential cookies - necessary for the website to function correctly",
            "Analytics cookies - used by Google Analytics to collect aggregated data about how visitors use our website",
            "Advertising cookies - used by Google Ads and other advertising platforms to serve relevant ads and measure campaign performance",
          ]}
        />
        <LegalP>
          You can manage your cookie preferences through your browser settings
          or our cookie consent tool when you first visit our website. Please
          note that disabling certain cookies may affect the functionality of
          our website.
        </LegalP>
      </>
    ),
  },
  {
    id: "your-rights",
    number: "10",
    title: "Your Rights",
    body: (
      <>
        <LegalP>
          Depending on your location and the applicable privacy law, you may
          have some or all of the following rights in relation to your
          personal data:
        </LegalP>
        <LegalBullets
          items={[
            "Right to access - request a copy of the personal data we hold about you",
            "Right to rectification - request correction of inaccurate or incomplete data",
            "Right to erasure - request deletion of your personal data in certain circumstances",
            "Right to restrict processing - request that we limit how we use your data",
            "Right to data portability - request your data in a structured, machine-readable format",
            "Right to object - object to certain types of processing, including direct marketing",
            "Right to withdraw consent - where processing is based on consent, withdraw it at any time",
            "Right to lodge a complaint - with the relevant data protection authority in your jurisdiction",
          ]}
        />
        <LegalSubHeading>Jurisdiction-specific rights</LegalSubHeading>
        <LegalBullets
          items={[
            <span key="eu">
              <strong className="text-[var(--ink)]">EU / UK users:</strong>{" "}
              You have the rights listed above under the GDPR and UK GDPR, and
              may lodge a complaint with your national data protection
              authority (e.g. the ICO in the UK).
            </span>,
            <span key="ca">
              <strong className="text-[var(--ink)]">
                California (US) users:
              </strong>{" "}
              Under the CCPA, you have the right to know what personal
              information is collected, the right to delete, the right to opt
              out of the sale of personal information (we do not sell personal
              information), and the right to non-discrimination for exercising
              your rights.
            </span>,
            <span key="canada">
              <strong className="text-[var(--ink)]">Canada users:</strong>{" "}
              Under PIPEDA, you have the right to access and correct your
              personal information and to withdraw consent for its use,
              subject to legal and contractual restrictions.
            </span>,
            <span key="india">
              <strong className="text-[var(--ink)]">India users:</strong>{" "}
              Under the DPDPA 2023, you have the right to access, correct, and
              erase your personal data, and to grievance redressal.
            </span>,
            <span key="sg">
              <strong className="text-[var(--ink)]">Singapore users:</strong>{" "}
              Under the PDPA, you have the right to access and correct your
              personal data held by us.
            </span>,
            <span key="au">
              <strong className="text-[var(--ink)]">Australia users:</strong>{" "}
              Under the Privacy Act 1988, you have the right to access and
              correct your personal information.
            </span>,
          ]}
        />
        <LegalP>
          To exercise any of your rights, please contact us at:{" "}
          {siteConfig.contactEmail}. We will respond to your request within
          the timeframe required by the applicable law in your jurisdiction.
        </LegalP>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    number: "11",
    title: "Children's Privacy",
    body: (
      <LegalP>
        Our services are intended for business use by Amazon sellers and are
        not directed at individuals under the age of 18. We do not knowingly
        collect personal data from minors. If you believe we have
        inadvertently collected data from a minor, please contact us
        immediately and we will take steps to delete it.
      </LegalP>
    ),
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to This Policy",
    body: (
      <LegalP>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices, services, or applicable law. When we make material
        changes, we will update the &ldquo;Last updated&rdquo; date at the top
        of this page. We encourage you to review this policy periodically.
        Continued use of our website or services after any changes constitutes
        your acceptance of the updated policy.
      </LegalP>
    ),
  },
  {
    id: "contact-us",
    number: "13",
    title: "Contact Us",
    body: (
      <>
        <LegalP>
          If you have any questions, concerns, or requests relating to this
          Privacy Policy or the way we handle your personal data, please
          contact us at:
        </LegalP>
        <LegalP>{siteConfig.businessName}</LegalP>
        <LegalP>
          <strong className="text-[var(--ink)]">Email:</strong>{" "}
          {siteConfig.contactEmail}
        </LegalP>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <LegalDocumentLayout
        pageTitle="Privacy Policy"
        sections={SECTIONS}
      />
      <Footer />
    </>
  );
}
