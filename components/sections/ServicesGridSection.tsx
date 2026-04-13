import { SERVICES } from "@/lib/services-data";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ServiceCard from "@/components/sections/ServiceCard";

export default function ServicesGridSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {SERVICES.map((service, i) => (
        <RevealOnScroll
          key={service.code}
          delay={(i % 2) * 0.08}
          showLine={false}
        >
          <ServiceCard service={service} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
