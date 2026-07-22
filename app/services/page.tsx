import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import ReinstatementProcess from "@/components/sections/services/ReinstatementProcess";

export const metadata: Metadata = {
  title: "Services - Amazon Safety Pro",
  description:
    "CPC creation, DOC/GCC creation, document validation, and stranded ASIN reinstatement - delivered by tenured ex-Amazonians.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesGridSection />
        <ReinstatementProcess />
      </main>
      <Footer />
    </>
  );
}
