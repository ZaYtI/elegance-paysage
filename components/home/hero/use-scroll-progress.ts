"use client";

import { useEffect, useState, type RefObject } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return 1;
      const { top, height } = element.getBoundingClientRect();
      return clamp01(-top / (height - window.innerHeight));
    };

    let frameId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => setProgress(measure()));
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [ref]);

  return progress;
}
