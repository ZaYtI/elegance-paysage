import { useEffect, type RefObject } from "react";
import { registerJourneyGeometry } from "@/components/garden-scene/hero-build-state";

export function useRegisterJourneyGeometry(
  journeyRef: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
) {
  useEffect(
    () =>
      registerJourneyGeometry(() => {
        const journey = journeyRef.current;
        const sticky = stickyRef.current;
        if (!journey || !sticky) return { top: 0, distance: 0 };
        return {
          top: journey.getBoundingClientRect().top + window.scrollY,
          distance: Math.max(1, journey.offsetHeight - sticky.offsetHeight),
        };
      }),
    [journeyRef, stickyRef],
  );
}
