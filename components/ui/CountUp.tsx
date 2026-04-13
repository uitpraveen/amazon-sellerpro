"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useTransform } from "framer-motion";

export default function CountUp({
  to,
  duration = 1.4,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const spring = useSpring(0, {
    stiffness: 60,
    damping: 14,
    duration: duration * 1000,
  });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, to, spring]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
