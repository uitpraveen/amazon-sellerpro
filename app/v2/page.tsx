import type { Metadata } from "next";
import V2Navbar from "@/components/sections/v2/V2Navbar";
import V2Footer from "@/components/sections/v2/V2Footer";
import V2Hero from "@/components/sections/v2/V2Hero";
import V2Process from "@/components/sections/v2/V2Process";
import V2Thesis from "@/components/sections/v2/V2Thesis";
import V2CTA from "@/components/sections/v2/V2CTA";

export const metadata: Metadata = {
  title: "Amazon Safety Pro — V2 Corporate Trust",
  description: "Corporate Trust design direction preview.",
};

export default function V2Page() {
  return (
    <div className="bg-[#FBF8F0]">
      <V2Navbar />
      <main>
        <V2Hero />
        <V2Process />
        <V2Thesis />
        <V2CTA />
      </main>
      <V2Footer />
    </div>
  );
}
