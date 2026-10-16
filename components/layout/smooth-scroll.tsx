"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { limitDownwardDelta } from "./scroll-gate";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HEADER_ANCHOR_OFFSET = -90;

function isScrollLocked() {
  return (
    document.documentElement.dataset.scrollLocked === "true" ||
    document.documentElement.style.overflow === "hidden" ||
    document.body.style.overflow === "hidden"
  );
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: HEADER_ANCHOR_OFFSET },
      virtualScroll: (data) => {
        if (isScrollLocked()) return false;
        data.deltaY = limitDownwardDelta(lenis, data.deltaY);
        return true;
      },
    });

    let frameHandle = requestAnimationFrame(function onFrame(time) {
      lenis.raf(time);
      frameHandle = requestAnimationFrame(onFrame);
    });

    return () => {
      cancelAnimationFrame(frameHandle);
      lenis.destroy();
    };
  }, []);

  return null;
}
