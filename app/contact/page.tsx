import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSplitSection from "@/components/sections/ContactSplitSection";

export const metadata: Metadata = {
  title: "Contact — Amazon Safety Pro",
  description:
    "Get in touch with our team of ex-Amazonians. Response within 1 business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSplitSection />
      </main>
      <Footer />
    </>
  );
}
