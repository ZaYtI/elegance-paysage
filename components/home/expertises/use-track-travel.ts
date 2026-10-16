"use client";

import { useEffect, useRef, type RefObject } from "react";

const SLIDING_LAYOUT_QUERY = "(min-width: 651px) and (prefers-reduced-motion: no-preference)";
const VISIBLE_VIEWPORT_RATIO = 0.88;

export function useTrackTravel(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
) {
  const travel = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const measure = () => {
      const isSliding = window.matchMedia(SLIDING_LAYOUT_QUERY).matches;
      travel.current = isSliding ? Math.max(0, track.scrollWidth - window.innerWidth * VISIBLE_VIEWPORT_RATIO) : 0;
      section.style.setProperty("--track-travel", `${travel.current}px`);
      if (!isSliding) track.style.transform = "";
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [sectionRef, trackRef]);

  return travel;
}
