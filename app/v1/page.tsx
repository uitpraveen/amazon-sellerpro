import type { Metadata } from "next";
import V1Navbar from "@/components/sections/v1/V1Navbar";
import V1Footer from "@/components/sections/v1/V1Footer";
import V1Hero from "@/components/sections/v1/V1Hero";
import V1Process from "@/components/sections/v1/V1Process";
import V1Manifesto from "@/components/sections/v1/V1Manifesto";
import V1CTA from "@/components/sections/v1/V1CTA";

export const metadata: Metadata = {
  title: "Amazon Safety Pro — V1 Bold Swiss",
  description: "Bold Swiss Modern design direction preview.",
};

export default function V1Page() {
  return (
    <div className="bg-[#F4F0E8]">
      <V1Navbar />
      <main>
        <V1Hero />
        <V1Process />
        <V1Manifesto />
        <V1CTA />
      </main>
      <V1Footer />
    </div>
  );
}
