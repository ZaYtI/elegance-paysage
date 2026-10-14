"use client";

import { useEffect, type RefObject } from "react";

export function useSectionScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      frameId = 0;
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;
      const { top, height } = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, height - sticky.offsetHeight);
      onProgress(Math.min(1, Math.max(0, -top / scrollableDistance)));
    };

    const schedule = () => {
      if (frameId === 0) frameId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frameId);
    };
  }, [sectionRef, stickyRef, onProgress]);
}
