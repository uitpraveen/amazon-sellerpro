"use client";

import { useRef, useMemo, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Search, FileCheck, BookOpen, Eye, MessageSquare, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Understand your product",
    desc: "We start by thoroughly reviewing your product - its category, intended use, target market, and applicable safety standards - to build a clear picture of what compliance looks like for your specific case.",
    icon: Search,
  },
  {
    num: "02",
    title: "Review the Amazon compliance notification",
    desc: "We go through every line of the compliance notification or safety alert Amazon has raised against your product, identifying exactly what has been flagged, why, and what Amazon is asking for.",
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Check Amazon's policies for your product",
    desc: "We review the specific Amazon policies applicable to your product category and marketplace to determine whether your product is required to meet additional safety requirements - and precisely what those requirements are.",
    icon: BookOpen,
  },
  {
    num: "04",
    title: "Decode existing compliance cases",
    desc: "If you already have an open case with Amazon, we review the full history of Amazon's communications with you - cutting through the automated rejection language to identify exactly where your case is stuck.",
    icon: Eye,
  },
  {
    num: "05",
    title: "Handle all Amazon communication and submissions",
    desc: "Our team takes over all communication with Amazon on your behalf. We manage the entire appeal and document submission process - ensuring every submission is structured correctly.",
    icon: MessageSquare,
  },
  {
    num: "06",
    title: "Work with you to close documentation gaps",
    desc: "Where safety documents are missing or insufficient, we work directly with you to identify what is needed, explain what each document must contain, and guide you through obtaining or completing the required documentation.",
    icon: Lock,
  },
];

const N = STEPS.length;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

type StepRange = {
  inputRange: [number, number, number, number];
  opacityOut: [number, number, number, number];
  yOut: [number, number, number, number];
  scaleOut: [number, number, number, number];
  indicatorRange: [number, number, number];
  indicatorOpacity: [number, number, number];
  indicatorWidth: [number, number, number];
  indicatorColor: [string, string, string];
};

function useStepRanges(): StepRange[] {
  return useMemo(() => {
    const span = 1 / N;
    // Brief crossfade at slot boundaries: each step is fully visible across its
    // slot, then crossfades with the neighbor over a narrow window (~4% of a
    // slot) centered on the boundary. Fast transition, no dead zone.
    const C = span * 0.04;
    return STEPS.map((_, i) => {
      const boundaryLeft = i * span;
      const boundaryRight = (i + 1) * span;
      const center = (i + 0.5) * span;
      const isFirst = i === 0;
      const isLast = i === N - 1;
      const inputRange: [number, number, number, number] = [
        boundaryLeft - C,
        boundaryLeft + C,
        boundaryRight - C,
        boundaryRight + C,
      ];
      const opacityOut = [
        isFirst ? 1 : 0,
        1,
        1,
        isLast ? 1 : 0,
      ] as [number, number, number, number];
      const yOut = [0, 0, 0, 0] as [number, number, number, number];
      const scaleOut = [1, 1, 1, 1] as [number, number, number, number];

      const indicatorRange: [number, number, number] = [
        Math.max(0, boundaryLeft),
        center,
        Math.min(1, boundaryRight),
      ];
      // First/last indicators clamp at full intensity at section boundaries
      const indicatorOpacity = (isFirst
        ? [1, 1, 0.25]
        : isLast
        ? [0.25, 1, 1]
        : [0.25, 1, 0.25]) as [number, number, number];
      const indicatorWidth = (isFirst
        ? [48, 48, 16]
        : isLast
        ? [16, 48, 48]
        : [16, 48, 16]) as [number, number, number];
      const indicatorColor = (isFirst
        ? ["#B8860B", "#B8860B", "#2D2A26"]
        : isLast
        ? ["#2D2A26", "#B8860B", "#B8860B"]
        : ["#2D2A26", "#B8860B", "#2D2A26"]) as [string, string, string];

      return {
        inputRange,
        opacityOut,
        yOut,
        scaleOut,
        indicatorRange,
        indicatorOpacity,
        indicatorWidth,
        indicatorColor,
      };
    });
  }, []);
}

function StepBlock({
  step,
  i,
  scrollYProgress,
  ranges,
}: {
  step: Step;
  i: number;
  scrollYProgress: MotionValue<number>;
  ranges: StepRange[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const r = ranges[i];
  const opacity = useTransform(scrollYProgress, r.inputRange, r.opacityOut);
  const y = useTransform(scrollYProgress, r.inputRange, r.yOut);

  // Apply initial values once
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = String(opacity.get());
    el.style.transform = `translate3d(0, ${y.get()}px, 0)`;
  }, [opacity, y]);

  // Imperatively update style on motion-value changes (no WAAPI animation)
  useMotionValueEvent(opacity, "change", (v) => {
    const el = ref.current;
    if (el) el.style.opacity = String(v);
  });
  useMotionValueEvent(y, "change", (v) => {
    const el = ref.current;
    if (el) el.style.transform = `translate3d(0, ${v}px, 0)`;
  });

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col justify-center will-change-transform"
      style={{ opacity: 0, transform: "translate3d(0, 0, 0)" }}
    >
      <span
        className="text-[10rem] lg:text-[12rem] 2xl:text-[14rem] font-light leading-none text-[#B8860B]/10 -mb-8 -ml-2 select-none"
        style={{ fontFamily: "var(--font-dm-serif)" }}
      >
        {step.num}
      </span>
      <p
        className="text-[#B8860B] text-xs 2xl:text-sm tracking-[0.25em] uppercase mb-4 font-semibold"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Step {step.num}
      </p>
      <h3
        className="text-3xl lg:text-[2.75rem] 2xl:text-[3.25rem] leading-[1.15] text-[#2D2A26] mb-5"
        style={{ fontFamily: "var(--font-dm-serif)" }}
      >
        {step.title}
      </h3>
      <p
        className="text-base lg:text-lg 2xl:text-xl text-[#6B6560] leading-relaxed max-w-xl 2xl:max-w-2xl"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {step.desc}
      </p>
    </div>
  );
}

function IconBlock({
  step,
  i,
  scrollYProgress,
  ranges,
}: {
  step: Step;
  i: number;
  scrollYProgress: MotionValue<number>;
  ranges: StepRange[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const r = ranges[i];
  const opacity = useTransform(scrollYProgress, r.inputRange, r.opacityOut);
  const scale = useTransform(scrollYProgress, r.inputRange, r.scaleOut);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = String(opacity.get());
    el.style.transform = `scale(${scale.get()})`;
  }, [opacity, scale]);

  useMotionValueEvent(opacity, "change", (v) => {
    const el = ref.current;
    if (el) el.style.opacity = String(v);
  });
  useMotionValueEvent(scale, "change", (v) => {
    const el = ref.current;
    if (el) el.style.transform = `scale(${v})`;
  });

  const Icon = step.icon;
  return (
    <div
      ref={ref}
      className="absolute will-change-transform"
      style={{ opacity: 0, transform: "scale(0.92)" }}
    >
      <div className="w-44 h-44 lg:w-52 lg:h-52 2xl:w-60 2xl:h-60 rounded-3xl bg-gradient-to-br from-[#1B4332] to-[#0a1f15] flex items-center justify-center shadow-xl shadow-[#1B4332]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,134,11,0.25),transparent_60%)]" />
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />
        <Icon size={64} strokeWidth={1.3} className="text-[#B8860B] relative z-10 2xl:w-20 2xl:h-20" />
      </div>
    </div>
  );
}

function IndicatorBlock({
  i,
  scrollYProgress,
  ranges,
  onClick,
}: {
  i: number;
  scrollYProgress: MotionValue<number>;
  ranges: StepRange[];
  onClick: () => void;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const r = ranges[i];

  const numOpacity = useTransform(scrollYProgress, r.indicatorRange, r.indicatorOpacity);
  const numColor = useTransform(scrollYProgress, r.indicatorRange, r.indicatorColor);
  const lineWidth = useTransform(scrollYProgress, r.indicatorRange, r.indicatorWidth);

  useEffect(() => {
    if (numRef.current) {
      numRef.current.style.opacity = String(numOpacity.get());
      numRef.current.style.color = numColor.get();
    }
    if (lineRef.current) {
      lineRef.current.style.width = `${lineWidth.get()}px`;
    }
  }, [numOpacity, numColor, lineWidth]);

  useMotionValueEvent(numOpacity, "change", (v) => {
    if (numRef.current) numRef.current.style.opacity = String(v);
  });
  useMotionValueEvent(numColor, "change", (v) => {
    if (numRef.current) numRef.current.style.color = String(v);
  });
  useMotionValueEvent(lineWidth, "change", (v) => {
    if (lineRef.current) lineRef.current.style.width = `${v}px`;
  });

  return (
    <button onClick={onClick} className="group flex items-center gap-3 cursor-pointer text-left">
      <span
        ref={numRef}
        className="text-xs font-semibold"
        style={{ opacity: 0.25, color: "#2D2A26" }}
      >
        {STEPS[i].num}
      </span>
      <div
        ref={lineRef}
        className="h-[2px] bg-[#B8860B] rounded"
        style={{ width: "16px" }}
      />
    </button>
  );
}

export default function ProcessFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ranges = useStepRanges();

  // Manual scroll progress computed entirely in client-space (getBoundingClientRect
  // + innerHeight). This ratio is dimensionless, so it is immune to the document
  // `zoom` applied on Windows high-DPI, and depends only on scroll POSITION - never
  // on scroll velocity or wheel granularity - so it is identical across trackpad,
  // mouse, Windows and Mac. (Replaces framer's useScroll, whose target-offset math
  // is distorted by CSS zoom.)
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      const p = range > 0 ? -rect.top / range : 0;
      scrollYProgress.set(p < 0 ? 0 : p > 1 ? 1 : p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollYProgress]);

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const goToStep = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const range = rect.height - window.innerHeight;
    const center = (i + 0.5) / N;
    const target = window.scrollY + rect.top + center * range;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop - pinned scroll, imperative motion-value driven */}
      <section
        ref={sectionRef}
        className="hidden md:block relative bg-[#FAF7F2]"
        style={{ height: `calc(${N * 50}vh / var(--ui-scale, 1))` }}
      >
        <div
          className="sticky top-0 flex flex-col justify-center overflow-hidden"
          style={{ height: "calc(100vh / var(--ui-scale, 1))" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.04),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 text-center px-8 mb-8 lg:mb-10 2xl:mb-14">
            <p
              className="text-[#B8860B] text-xs 2xl:text-sm tracking-[0.25em] uppercase mb-2"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              How We Work
            </p>
            <h2
              className="text-3xl lg:text-4xl 2xl:text-5xl text-[#2D2A26]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Our Process
            </h2>
          </div>

          <div className="relative z-10 px-8">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="col-span-2 flex flex-col gap-5">
                {STEPS.map((_, i) => (
                  <IndicatorBlock
                    key={i}
                    i={i}
                    scrollYProgress={scrollYProgress}
                    ranges={ranges}
                    onClick={() => goToStep(i)}
                  />
                ))}
              </div>

              <div className="col-span-7 lg:col-span-7 relative h-[360px] 2xl:h-[440px]">
                {STEPS.map((s, i) => (
                  <StepBlock
                    key={s.num}
                    step={s}
                    i={i}
                    scrollYProgress={scrollYProgress}
                    ranges={ranges}
                  />
                ))}
              </div>

              <div className="col-span-3 lg:col-span-3 relative h-[240px] 2xl:h-[280px] flex items-center justify-center">
                {STEPS.map((s, i) => (
                  <IconBlock
                    key={s.num}
                    step={s}
                    i={i}
                    scrollYProgress={scrollYProgress}
                    ranges={ranges}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full px-8 mt-14 lg:mt-16 2xl:mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-[#2D2A26]/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressBarWidth }}
                  className="h-full bg-gradient-to-r from-[#B8860B] to-[#daa520] origin-left"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile - vertical timeline */}
      <section className="md:hidden bg-[#FAF7F2] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#B8860B] text-xs tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              How We Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-2xl text-[#2D2A26]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Our Process
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[#E8E0D4]" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-10"
            >
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.num} variants={fadeUp} className="relative pl-14">
                    <div className="absolute left-2.5 w-5 h-5 rounded-full bg-[#1B4332] flex items-center justify-center top-1 z-10 ring-4 ring-[#FAF7F2]">
                      <Icon size={11} className="text-[#B8860B]" strokeWidth={2} />
                    </div>
                    <span
                      className="text-[#B8860B]/80 text-xs font-semibold tracking-wider"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Step {step.num}
                    </span>
                    <h3
                      className="text-lg text-[#2D2A26] mt-1 mb-2"
                      style={{ fontFamily: "var(--font-dm-serif)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-[#6B6560] leading-relaxed"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
