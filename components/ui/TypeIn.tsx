"use client";

import { useEffect, useRef, useState } from "react";

export default function TypeIn({
  text,
  speed = 18,
  className,
  startDelay = 0,
  cursor = true,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursor?: boolean;
}) {
  const [shown, setShown] = useState(0);
  const idRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const start = setTimeout(() => {
      function step() {
        if (cancelled) return;
        setShown((s) => {
          if (s >= text.length) return s;
          idRef.current = setTimeout(step, speed);
          return s + 1;
        });
      }
      step();
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
      if (idRef.current) clearTimeout(idRef.current);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {text.slice(0, shown)}
      {cursor && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[0.4em] translate-y-[2px] animate-pulse bg-[var(--signal)] align-middle" />
      )}
    </span>
  );
}
