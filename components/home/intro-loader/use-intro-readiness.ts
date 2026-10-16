"use client";

import { useEffect } from "react";
import { whenHeroReady } from "@/components/garden-scene/hero-ready";

const MIN_DISPLAY_MS = 1700;
const MAX_WAIT_MS = 2500;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function useIntroReadiness(onReady: () => void) {
  useEffect(() => {
    let cancelled = false;
    const sceneAndFonts = Promise.all([document.fonts.ready, whenHeroReady()]);
    const minimumShown = wait(MIN_DISPLAY_MS);
    Promise.race([Promise.all([minimumShown, sceneAndFonts]), wait(MAX_WAIT_MS)]).then(() => {
      if (!cancelled) onReady();
    });
    return () => {
      cancelled = true;
    };
  }, [onReady]);
}
