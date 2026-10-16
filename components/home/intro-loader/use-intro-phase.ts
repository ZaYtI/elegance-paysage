"use client";

import { useCallback, useEffect, useState } from "react";
import { EXIT_MS } from "./intro-timing";
import { hasIntroPlayedInThisDocument, isIntroSkipped, markIntroDone } from "./intro-storage";
import { useIntroReadiness } from "./use-intro-readiness";
import { useScrollLock } from "./use-scroll-lock";

export type IntroPhase = "visible" | "leaving" | "gone";

export function useIntroPhase() {
  const [phase, setPhase] = useState<IntroPhase>(() => (hasIntroPlayedInThisDocument() ? "gone" : "visible"));
  const leave = useCallback(() => {
    markIntroDone();
    setPhase((current) => (current === "visible" ? "leaving" : current));
  }, []);

  useEffect(() => {
    if (!isIntroSkipped()) return;
    const timer = setTimeout(() => setPhase("gone"));
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("gone"), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useScrollLock(phase === "visible");
  useIntroReadiness(leave);

  return phase;
}
