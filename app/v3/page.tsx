import type { Metadata } from "next";
import V3Navbar from "@/components/sections/v3/V3Navbar";
import V3Footer from "@/components/sections/v3/V3Footer";
import V3Hero from "@/components/sections/v3/V3Hero";
import V3Process from "@/components/sections/v3/V3Process";
import V3Thesis from "@/components/sections/v3/V3Thesis";
import V3CTA from "@/components/sections/v3/V3CTA";

export const metadata: Metadata = {
  title: "Amazon Safety Pro — V3 Warm Advisory",
  description: "Warm Advisory design direction preview.",
};

export default function V3Page() {
  return (
    <div className="bg-[#F5EDDB]">
      <V3Navbar />
      <main>
        <V3Hero />
        <V3Process />
        <V3Thesis />
        <V3CTA />
      </main>
      <V3Footer />
    </div>
  );
}
