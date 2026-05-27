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
  title: "Terms and Conditions — Amazon Safety Pro",
  description:
    "Terms and Conditions of Service governing the relationship between Amazon Safety Pro and clients.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "about-us",
    number: "1",
    title: "About Us",
    body: (
      <>
        <LegalP>
          Amazon Safety Pro is a compliance consulting service providing
          Amazon product safety and compliance advisory, including but not
          limited to Children&rsquo;s Product Certificate (CPC) creation,
          Declaration of Conformity (DOC) and General Certificate of
          Conformity (GCC) creation, compliance document review and
          remediation, product compliance assessments, ASIN classification
          review and appeal, safety incident ASIN reinstatement, and related
          advisory services.
        </LegalP>
        <LegalP>
          Amazon Safety Pro is a trading name of Proxima CPEX LLP. When we
          refer to &lsquo;Amazon Safety Pro&rsquo;, &lsquo;we&rsquo;,
          &lsquo;us&rsquo;, or &lsquo;our&rsquo; in these Terms and on this
          website, we mean Proxima CPEX LLP trading as Amazon Safety Pro.
        </LegalP>
        <LegalP>
          <strong className="text-[var(--ink)]">Contact email:</strong>{" "}
          {siteConfig.contactEmail}
        </LegalP>
      </>
    ),
  },
  {
    id: "scope",
    number: "2",
    title: "Scope of Services",
    body: (
      <>
        <LegalSubHeading>What we do</LegalSubHeading>
        <LegalP>
          Amazon Safety Pro provides expert compliance consulting and advisory
          services to Amazon sellers. Our services are designed to help
          sellers understand, navigate, and meet Amazon&rsquo;s product safety
          and compliance requirements. Depending on the service engaged, our
          work may include:
        </LegalP>
        <LegalBullets
          items={[
            "Reviewing and assessing your product and its applicable safety and compliance requirements",
            "Reviewing Amazon compliance notifications, rejection notices, and case communications on your behalf",
            "Advising on the documentation required to meet Amazon's safety standards for your specific product and marketplace",
            "Creating compliance documents including CPCs, DOCs, and GCCs based on the information and test reports you provide",
            "Validating existing compliance documents and labeling against Amazon's requirements and applicable market standards",
            "Advising on and supporting the reinstatement of stranded ASINs on Amazon",
            "Managing communications with Amazon on your behalf where agreed as part of the service scope",
          ]}
        />
        <LegalSubHeading>What we do not do</LegalSubHeading>
        <LegalP>
          Our services are advisory and consultancy in nature. The following
          are expressly outside the scope of our services:
        </LegalP>
        <LegalBullets
          items={[
            "We do not conduct physical product testing or operate as a testing laboratory",
            "We do not provide legal advice or act as legal counsel",
            "We do not guarantee the outcome of any Amazon compliance review, appeal, or reinstatement process",
            "We do not represent that Amazon will accept any document, submission, or appeal we prepare on your behalf",
            "We do not take responsibility for any decisions made by Amazon regarding your account, listings, or products",
            "We do not provide accounting, tax, or financial advisory services",
          ]}
        />
        <LegalP>
          <strong className="text-[var(--ink)]">Important:</strong>{" "}
          Amazon&rsquo;s compliance decisions are made solely by Amazon. While
          we apply our best expertise and insider knowledge to maximize the
          likelihood of a successful outcome, we cannot guarantee
          reinstatement, document acceptance, or any specific result from
          Amazon.
        </LegalP>
      </>
    ),
  },
  {
    id: "client-obligations",
    number: "3",
    title: "Client Obligations",
    body: (
      <>
        <LegalP>
          To enable us to deliver our services effectively, you agree to the
          following obligations:
        </LegalP>
        <LegalSubHeading>Accuracy of information</LegalSubHeading>
        <LegalP>
          You are solely responsible for the accuracy, completeness, and
          authenticity of all information, documents, test reports,
          certificates, and data you provide to us. We will work with the
          information you supply and cannot be held responsible for errors,
          omissions, or inaccuracies in documents or data provided by you or
          your suppliers.
        </LegalP>
        <LegalSubHeading>Timely cooperation</LegalSubHeading>
        <LegalP>
          You agree to respond to our requests for information, documents, or
          clarifications in a timely manner. Delays caused by your failure to
          provide requested information may affect timelines and outcomes,
          and do not entitle you to a refund.
        </LegalP>
        <LegalSubHeading>Authenticity of documents</LegalSubHeading>
        <LegalP>
          You confirm that all documents, test reports, and certificates you
          provide to us are genuine and have not been falsified, altered, or
          misrepresented. You agree not to use any documents we create in a
          manner that is fraudulent, misleading, or in violation of
          Amazon&rsquo;s policies or applicable law.
        </LegalP>
        <LegalSubHeading>Compliance with Amazon policies</LegalSubHeading>
        <LegalP>
          You remain solely responsible for ensuring that your Amazon seller
          account, product listings, and business practices comply with
          Amazon&rsquo;s policies and applicable laws. Our advisory services
          do not transfer this responsibility to us.
        </LegalP>
        <LegalSubHeading>Account access</LegalSubHeading>
        <LegalP>
          Where you grant us access to your Amazon Seller Central account or
          any other platform for the purpose of delivering our services, you
          do so at your own risk and remain fully responsible for all
          activity within your account.
        </LegalP>
      </>
    ),
  },
  {
    id: "fees-and-payment",
    number: "4",
    title: "Fees and Payment",
    body: (
      <>
        <LegalSubHeading>Pricing</LegalSubHeading>
        <LegalP>
          Our services are offered on a fixed-fee or hourly basis, as agreed
          and communicated to you in writing prior to engagement. The
          applicable fees for your specific service will be set out in the
          service quotation or proposal we provide to you.
        </LegalP>
        <LegalSubHeading>Payment terms</LegalSubHeading>
        <LegalP>
          Payment is required in advance of service commencement unless
          otherwise agreed in writing. We accept payment via our website
          payment gateway or direct bank transfer. All fees are quoted
          exclusive of any applicable taxes, which will be added where
          required by law.
        </LegalP>
        <LegalSubHeading>Payment as acceptance</LegalSubHeading>
        <LegalP>
          By completing payment for any service, you confirm your acceptance
          of these Terms in full. No separate signature or written
          confirmation is required for these Terms to be legally binding.
        </LegalP>
        <LegalSubHeading>Currency</LegalSubHeading>
        <LegalP>
          Fees will be quoted in the currency agreed at the time of
          engagement. Where payment is made in a different currency, any
          conversion costs or exchange rate differences are your
          responsibility.
        </LegalP>
        <LegalSubHeading>Late payment</LegalSubHeading>
        <LegalP>
          Where payment is not received in accordance with the agreed terms,
          we reserve the right to suspend or withhold delivery of services
          until payment is received in full.
        </LegalP>
      </>
    ),
  },
  {
    id: "refund-policy",
    number: "5",
    title: "Refund Policy",
    body: (
      <>
        <LegalP>
          We operate a strict no-refund policy once work on your service has
          commenced. This applies to all service types, whether fixed-fee or
          hourly.
        </LegalP>
        <LegalSubHeading>No refunds once work begins</LegalSubHeading>
        <LegalP>
          Given the expert, time-intensive, and consultancy-based nature of
          our services, no refund will be issued once our team has begun work
          on your case. Work is deemed to have commenced upon receipt of
          payment and the first substantive action taken by our team in
          relation to your service, including but not limited to reviewing
          your documents, sending an initial assessment, or scheduling a
          consultation.
        </LegalP>
        <LegalSubHeading>Pre-commencement cancellation</LegalSubHeading>
        <LegalP>
          If you wish to cancel your service before any work has commenced,
          please contact us as soon as possible at {siteConfig.contactEmail}.
          We will assess whether a full or partial refund is appropriate
          based on the specific circumstances. Any decision to issue a
          pre-commencement refund is made at our sole discretion.
        </LegalP>
        <LegalSubHeading>No guarantee of outcome</LegalSubHeading>
        <LegalP>
          The fact that Amazon does not accept a submission, rejects an
          appeal, or does not reinstate a listing does not constitute grounds
          for a refund. Our fee is for the professional services we deliver,
          not for the outcome of Amazon&rsquo;s independent decision-making
          process.
        </LegalP>
      </>
    ),
  },
  {
    id: "confidentiality",
    number: "6",
    title: "Confidentiality",
    body: (
      <>
        <LegalP>
          Both parties acknowledge that in the course of engaging our
          services, confidential information may be exchanged, including but
          not limited to Amazon account details, product information,
          compliance documents, business strategies, and case correspondence.
        </LegalP>
        <LegalSubHeading>Our obligations</LegalSubHeading>
        <LegalP>
          We formally commit to the following confidentiality obligations in
          relation to any information you share with us in the course of
          engaging our services:
        </LegalP>
        <LegalBullets
          items={[
            "We will not disclose your Amazon Seller Central account details, seller account information, ASIN data, case correspondence, or any information accessed within your Seller Central account to any third party, under any circumstances, except where required by law or court order",
            "Any access granted to us to your Amazon Seller Central account will be used solely and exclusively for the purpose of addressing product safety compliance restrictions directly related to your engaged service. We will not access, use, or rely upon any other areas of your account for any other purpose",
            "We will not share, sell, or disclose your business information, product details, or compliance documents to any competitor, third party, or external organization for any purpose other than delivering your service",
            "All client information is handled in strict confidence and in accordance with our Privacy Policy",
          ]}
        />
        <LegalSubHeading>Your obligations</LegalSubHeading>
        <LegalP>
          You agree to keep confidential any proprietary methodologies,
          processes, templates, or know-how shared with you by Amazon Safety
          Pro in the course of delivering our services.
        </LegalP>
        <LegalSubHeading>Data storage</LegalSubHeading>
        <LegalP>
          Documents and information you share with us will be stored securely
          in our cloud storage systems and retained for a period of one year
          following the conclusion of our engagement, in accordance with our
          Privacy Policy. Our full data handling practices are set out in
          our Privacy Policy, available on our website.
        </LegalP>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "7",
    title: "Intellectual Property",
    body: (
      <>
        <LegalSubHeading>Documents we create</LegalSubHeading>
        <LegalP>
          Any compliance documents we create for you — including CPCs, DOCs,
          GCCs, and validation reports — are created specifically for your
          product and business based on the information you provide. Upon
          receipt of full payment, you are granted a non-exclusive license to
          use these documents for the specific product and marketplace for
          which they were created.
        </LegalP>
        <LegalSubHeading>Our proprietary materials</LegalSubHeading>
        <LegalP>
          All methodologies, templates, processes, frameworks, and know-how
          developed by Amazon Safety Pro remain our exclusive intellectual
          property. You may not copy, reproduce, distribute, or repurpose our
          proprietary materials without our prior written consent.
        </LegalP>
        <LegalSubHeading>Your documents</LegalSubHeading>
        <LegalP>
          All documents, test reports, certificates, and data you provide to
          us remain your property. We use them solely for the purpose of
          delivering your service and do not claim any ownership over them.
        </LegalP>
        <LegalSubHeading>Misuse of documents</LegalSubHeading>
        <LegalP>
          You agree not to alter, falsify, or misrepresent any document we
          create for you. You agree not to use our documents in relation to a
          product other than the one for which they were created, or in a
          marketplace other than the one specified, without our prior written
          approval. Misuse of compliance documents may constitute fraud and
          may result in serious legal consequences.
        </LegalP>
      </>
    ),
  },
  {
    id: "disclaimer",
    number: "8",
    title: "Disclaimer of Guarantees",
    body: (
      <>
        <LegalP>
          To the fullest extent permitted by applicable law, Amazon Safety
          Pro makes no warranties, representations, or guarantees, express
          or implied, in relation to:
        </LegalP>
        <LegalBullets
          items={[
            "The acceptance by Amazon of any document, submission, or appeal we prepare",
            "The reinstatement of any suppressed, stranded, or removed listing",
            "The continued compliance of your product with Amazon's policies, which may change at any time",
            "The fitness of our services for any particular purpose beyond those explicitly described",
            "The accuracy or completeness of any information we provide about Amazon's current policies, which are subject to change without notice from Amazon",
          ]}
        />
        <LegalP>
          Our services are delivered based on our best professional expertise
          and insider knowledge at the time of engagement. Amazon is an
          independent third party over whose decisions we have no control or
          influence.
        </LegalP>
        <LegalSubHeading>Best efforts — no guarantee of reinstatement</LegalSubHeading>
        <LegalP>
          We commit to applying our full professional expertise and best
          efforts to support the reinstatement of your product listing or
          ASIN. However, we do not and cannot guarantee that any
          reinstatement will be successful. The outcome of any reinstatement
          process is determined solely by Amazon based on its own internal
          review, policies, and criteria.
        </LegalP>
        <LegalP>
          We will do our best to get your product reinstated. This is not a
          100% guarantee of reinstatement. Amazon&rsquo;s decision is final
          and independent of our work.
        </LegalP>
        <LegalSubHeading>Amazon policy changes after reinstatement</LegalSubHeading>
        <LegalP>
          Amazon reserves the right to update, amend, or introduce new
          product safety and compliance policies at any time without prior
          notice. We are not responsible for any restriction, suppression, or
          removal of your product or listing that occurs following a
          successful reinstatement as a result of a change in Amazon&rsquo;s
          policies, standards, or enforcement approach. A product that is
          compliant and reinstated today may be subject to new requirements
          in the future, and it remains the seller&rsquo;s ongoing
          responsibility to monitor and maintain compliance.
        </LegalP>
        <LegalSubHeading>Amazon&rsquo;s right to approve or reject submissions</LegalSubHeading>
        <LegalP>
          Amazon reserves the absolute right to approve or reject any
          submission, document, or appeal at its sole discretion, including
          based on the seller&rsquo;s overall account history, prior
          compliance record, and any other factors Amazon considers relevant.
          A seller&rsquo;s account history may affect the outcome of a
          compliance review independently of the quality of the documents
          submitted. We are not liable for any rejection that results from
          factors outside our control, including but not limited to the
          seller&rsquo;s account standing with Amazon.
        </LegalP>
        <LegalSubHeading>Additional documents requested by Amazon</LegalSubHeading>
        <LegalP>
          In the course of a compliance review or reinstatement process,
          Amazon may request additional documents, test reports,
          certifications, or other evidence beyond what was initially
          submitted. Where Amazon makes such a request, the seller is
          responsible for obtaining and providing those additional documents
          promptly. Any costs associated with obtaining additional
          documentation — including but not limited to laboratory testing
          fees, certification costs, or third-party inspection fees — are the
          sole responsibility of the seller and are not included in our
          service fees.
        </LegalP>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    number: "9",
    title: "Limitation of Liability",
    body: (
      <>
        <LegalP>
          To the maximum extent permitted by applicable law, Amazon Safety
          Pro shall not be liable to you for any:
        </LegalP>
        <LegalBullets
          items={[
            "Loss of revenue, profit, sales, or business",
            "Loss of anticipated savings",
            "Loss of or damage to goodwill or reputation",
            "Loss of data or information",
            "Indirect, consequential, incidental, or special loss or damage of any kind",
          ]}
        />
        <LegalP>
          arising out of or in connection with the delivery or non-delivery
          of our services, the use of documents we create, or the outcome of
          any Amazon compliance process, whether or not we were advised of
          the possibility of such loss.
        </LegalP>
        <LegalP>
          Where liability cannot be excluded by law, our total aggregate
          liability to you in respect of any claim arising out of or in
          connection with these Terms or our services shall not exceed the
          total fees paid by you to us for the specific service to which the
          claim relates.
        </LegalP>
      </>
    ),
  },
  {
    id: "prohibited-use",
    number: "10",
    title: "Prohibited Use",
    body: (
      <>
        <LegalP>
          You agree that you will not use our services or any documents we
          create for any unlawful, fraudulent, or prohibited purpose. In
          particular, you agree that you will not:
        </LegalP>
        <LegalBullets
          items={[
            "Submit falsified, altered, or misrepresented documents to Amazon or any regulatory authority",
            "Use documents created for one product or ASIN in relation to a different product or ASIN without our written approval",
            "Use our services to circumvent or deceive Amazon's compliance systems",
            "Engage our services in relation to products that you know to be unsafe, recalled, or prohibited",
            "Reproduce, resell, or distribute our work product to third parties without our prior written consent",
          ]}
        />
        <LegalP>
          Any breach of this clause entitles us to immediately terminate the
          engagement without refund and may result in us reporting the matter
          to Amazon or relevant regulatory authorities.
        </LegalP>
      </>
    ),
  },
  {
    id: "termination",
    number: "11",
    title: "Termination",
    body: (
      <>
        <LegalSubHeading>Termination by you</LegalSubHeading>
        <LegalP>
          You may terminate your engagement with us at any time by providing
          written notice to {siteConfig.contactEmail}. Termination after work
          has commenced does not entitle you to a refund. Any fees owed for
          work completed up to the date of termination remain payable.
        </LegalP>
        <LegalSubHeading>Termination by us</LegalSubHeading>
        <LegalP>
          We reserve the right to terminate or suspend our services to you at
          any time, with or without notice, if:
        </LegalP>
        <LegalBullets
          items={[
            "You breach any provision of these Terms",
            "You provide false, misleading, or fraudulent information or documents",
            "Any document you have provided to us is determined, at any point, to be falsified, modified, altered, or misrepresented in any way — upon such determination, we will immediately terminate the agreement with no refund and reserve the right to report the matter to Amazon and relevant regulatory authorities",
            "You fail to make payment in accordance with agreed terms",
            "We reasonably believe that continuing the engagement would expose us to legal, regulatory, or reputational risk",
          ]}
        />
        <LegalP>
          In the event of termination by us for breach, no refund will be
          issued for any fees already paid.
        </LegalP>
      </>
    ),
  },
  {
    id: "governing-law",
    number: "12",
    title: "Governing Law and Dispute Resolution",
    body: (
      <>
        <LegalSubHeading>Governing law</LegalSubHeading>
        <LegalP>
          These Terms and any dispute or claim arising out of or in
          connection with them — including non-contractual disputes or claims
          — shall be governed by and construed in accordance with the laws of
          India.
        </LegalP>
        <LegalSubHeading>Dispute resolution</LegalSubHeading>
        <LegalP>
          In the event of any dispute arising out of or in connection with
          these Terms or our services, the parties agree to first attempt to
          resolve the dispute amicably through good-faith negotiation. Either
          party may initiate this process by providing written notice of the
          dispute to the other party.
        </LegalP>
        <LegalP>
          If the dispute is not resolved within 30 days of such notice (or
          such longer period as the parties may agree in writing), either
          party may refer the matter to the courts of India, which shall
          have exclusive jurisdiction over all disputes arising under or in
          connection with these Terms.
        </LegalP>
        <LegalP>
          <strong className="text-[var(--ink)]">
            Note for international clients:
          </strong>{" "}
          By engaging our services and accepting these Terms, you agree to
          submit to the jurisdiction of the courts of India for the
          resolution of any disputes. We recommend you seek independent
          legal advice if you have concerns about this jurisdiction clause.
        </LegalP>
      </>
    ),
  },
  {
    id: "amendments",
    number: "13",
    title: "Amendments",
    body: (
      <>
        <LegalP>
          We reserve the right to amend, update, or replace these Terms at
          any time. The most current version of our Terms will always be
          available on our website. Where we make material changes to these
          Terms, we will update the &ldquo;Last updated&rdquo; date at the
          top of this document.
        </LegalP>
        <LegalP>
          Your continued engagement of our services or completion of payment
          after any amendment constitutes your acceptance of the updated
          Terms. We recommend you review our Terms periodically.
        </LegalP>
      </>
    ),
  },
  {
    id: "severability",
    number: "14",
    title: "Severability",
    body: (
      <LegalP>
        If any provision of these Terms is found to be unlawful, void, or
        unenforceable for any reason, that provision shall be deemed
        severable from the remaining Terms and shall not affect the validity
        and enforceability of the remaining provisions.
      </LegalP>
    ),
  },
  {
    id: "entire-agreement",
    number: "15",
    title: "Entire Agreement",
    body: (
      <LegalP>
        These Terms, together with our Privacy Policy and any written service
        quotation or proposal provided to you, constitute the entire
        agreement between you and Amazon Safety Pro in relation to the
        services described herein. They supersede all prior discussions,
        representations, or agreements between the parties relating to the
        same subject matter.
      </LegalP>
    ),
  },
  {
    id: "contact-us",
    number: "16",
    title: "Contact Us",
    body: (
      <>
        <LegalP>
          If you have any questions about these Terms or wish to discuss your
          engagement with us, please contact us at:
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

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <LegalDocumentLayout
        pageTitle="Terms and Conditions of Service"
        intro={
          <div className="space-y-4 text-[17px] leading-relaxed text-[var(--ink-2)]">
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern the
              relationship between Amazon Safety Pro (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;), and any individual or
              business entity (&ldquo;Client&rdquo;, &ldquo;you&rdquo;, or
              &ldquo;your&rdquo;) that engages our services or accesses our
              website.
            </p>
            <p>
              By making a payment for any of our services — whether through
              our website, by direct bank transfer, or via any other payment
              method — you confirm that you have read, understood, and agreed
              to be bound by these Terms in full. If you do not agree with
              any part of these Terms, you must not proceed with payment or
              engagement of our services.
            </p>
            <p>
              These Terms apply to all service engagements regardless of how
              they were initiated — online via our website contact form, or
              directly via email, WhatsApp, or any other communication channel.
            </p>
          </div>
        }
        sections={SECTIONS}
      />
      <Footer />
    </>
  );
}
