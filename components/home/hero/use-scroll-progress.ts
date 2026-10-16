"use client";

import { useEffect, type RefObject } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  useEffect(() => {
    const element = ref.current;
    const sticky = stickyRef.current;
    if (!element || !sticky) return;

    const measure = () => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return 1;
      const { top, height } = element.getBoundingClientRect();
      return clamp01(-top / Math.max(1, height - sticky.offsetHeight));
    };

    let frameId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => onProgress(measure()));
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [ref, stickyRef, onProgress]);
}
