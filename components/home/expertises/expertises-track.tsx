"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./expertises-track.module.css";
import { useSectionScrollProgress } from "./use-section-scroll-progress";
import { useTrackTravel } from "./use-track-travel";

const SLIDE_COUNT = 4;
const SLIDE_START = 0;
const SLIDE_END = 0.9;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.6);
}

function toSlideProgress(sectionProgress: number) {
  const t = Math.min(1, Math.max(0, (sectionProgress - SLIDE_START) / (SLIDE_END - SLIDE_START)));
  return easeOut(t);
}

type ExpertisesTrackProps = {
  heading: React.ReactNode;
  children: React.ReactNode;
};

function supportsScrollTimeline() {
  return CSS.supports("animation-timeline: view()");
}

export function ExpertisesTrack({ heading, children }: ExpertisesTrackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);

  const travel = useTrackTravel(sectionRef, trackRef);

  const handleProgress = useCallback(
    (progress: number) => {
      setSlide(Math.min(SLIDE_COUNT, Math.floor(progress * SLIDE_COUNT) + 1));

      const track = trackRef.current;
      if (track && !supportsScrollTimeline()) {
        track.style.transform = `translateX(${-toSlideProgress(progress) * travel.current}px)`;
      }
    },
    [travel],
  );

  useSectionScrollProgress(sectionRef, stickyRef, handleProgress);

  return (
    <section ref={sectionRef} id="expertises" className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.head}>
          {heading}
          <span className={styles.counter}>
            {String(slide).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
          </span>
        </div>
        <div className={styles.trackWrap}>
          <div ref={trackRef} className={styles.track}>
            {children}
          </div>
        </div>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}
