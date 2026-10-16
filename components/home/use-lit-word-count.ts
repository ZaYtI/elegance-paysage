"use client";

import { useEffect, useState, type RefObject } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FIRST_WORD_VIEWPORT_POSITION = 0.85;
const READING_SPAN_IN_VIEWPORT = 0.65;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useLitWordCount(ref: RefObject<HTMLElement | null>, wordCount: number) {
  const [litWordCount, setLitWordCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return wordCount;
      const viewportHeight = window.innerHeight;
      const { top } = element.getBoundingClientRect();
      const readProgress = (viewportHeight * FIRST_WORD_VIEWPORT_POSITION - top) / (viewportHeight * READING_SPAN_IN_VIEWPORT);
      return Math.ceil(clamp01(readProgress) * wordCount);
    };

    let frameId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => setLitWordCount(measure()));
    };

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [ref, wordCount]);

  return litWordCount;
}
