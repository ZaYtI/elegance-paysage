"use client";

import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HeroScene } from "@/components/garden-scene/hero-scene";
import { setDisplayedBuildProgress } from "@/components/garden-scene/hero-build-state";
import { createProgressSource } from "@/components/garden-scene/progress-source";
import { getStageIndex } from "./get-stage-index";
import { HeroGrain } from "./hero-grain";
import { HeroStageCaption } from "./hero-stage-caption";
import { useRegisterJourneyGeometry } from "./use-register-journey-geometry";
import { useScrollProgress } from "./use-scroll-progress";
import styles from "./hero-journey.module.css";

type HeroJourneyProps = {
  children: ReactNode;
};

export function HeroJourney({ children }: HeroJourneyProps) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [progressSource] = useState(createProgressSource);
  const [stageIndex, setStageIndex] = useState(0);

  const handleProgress = useCallback(
    (progress: number) => {
      progressSource.set(progress);
      heroRef.current?.style.setProperty("--hero-progress", String(progress));
    },
    [progressSource],
  );
  const handleDisplayedProgress = useCallback((progress: number) => {
    setDisplayedBuildProgress(progress);
    setStageIndex(getStageIndex(progress));
  }, []);
  useScrollProgress(journeyRef, heroRef, handleProgress);
  useRegisterJourneyGeometry(journeyRef, heroRef);

  return (
    <div ref={journeyRef} className={styles.journey}>
      <section
        ref={heroRef}
        id="top"
        className={styles.hero}
        style={{ "--hero-progress": 0 } as CSSProperties}
      >
        <div
          role="img"
          aria-label="Maquette 3D d’un jardin qui se construit au défilement : terrasse, portail, clôture, arbres et mobilier."
          className={styles.scene}
        >
          <HeroScene progressSource={progressSource} onDisplayedProgress={handleDisplayedProgress} />
        </div>
        <HeroGrain />
        <HeroStageCaption stageIndex={stageIndex} />
        {children}
      </section>
    </div>
  );
}
