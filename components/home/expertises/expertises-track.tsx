"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./expertises-track.module.css";
import { useSectionScrollProgress } from "./use-section-scroll-progress";

const SLIDE_COUNT = 4;
const SCROLL_DRIVEN_QUERY = "(min-width: 651px) and (prefers-reduced-motion: no-preference)";
const VISIBLE_VIEWPORT_RATIO = 0.88;

type ExpertisesTrackProps = {
  heading: React.ReactNode;
  children: React.ReactNode;
};

export function ExpertisesTrack({ heading, children }: ExpertisesTrackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [slide, setSlide] = useState(1);

  const handleProgress = useCallback((progress: number) => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;

    if (!window.matchMedia(SCROLL_DRIVEN_QUERY).matches) {
      track.style.transform = "";
      bar.style.transform = "";
      return;
    }

    const travel = Math.max(0, track.scrollWidth - window.innerWidth * VISIBLE_VIEWPORT_RATIO);
    track.style.transform = `translateX(${-progress * travel}px)`;
    bar.style.transform = `scaleX(${1 + progress * (SLIDE_COUNT - 1)})`;
    setSlide(Math.min(SLIDE_COUNT, Math.floor(progress * (SLIDE_COUNT - 0.001)) + 1));
  }, []);

  useSectionScrollProgress(sectionRef, handleProgress);

  return (
    <section ref={sectionRef} id="expertises" className={styles.section}>
      <div className={styles.sticky}>
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
        <div className={styles.progress} aria-hidden="true">
          <span ref={barRef} className={styles.progressBar} />
        </div>
      </div>
    </section>
  );
}
