"use client";

import { useEffect } from "react";

const MIN_DISPLAY_MS = 1700;
const MAX_WAIT_MS = 2500;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function useIntroReadiness(onReady: () => void) {
  useEffect(() => {
    let cancelled = false;
    const minimumShown = wait(MIN_DISPLAY_MS);
    Promise.race([Promise.all([minimumShown, document.fonts.ready]), wait(MAX_WAIT_MS)]).then(() => {
      if (!cancelled) onReady();
    });
    return () => {
      cancelled = true;
    };
  }, [onReady]);
}
