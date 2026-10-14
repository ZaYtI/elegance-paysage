"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { HeroScene } from "@/components/garden-scene/hero-scene";
import { getStageIndex } from "./get-stage-index";
import { HeroGrain } from "./hero-grain";
import { HeroStageCaption } from "./hero-stage-caption";
import { useScrollProgress } from "./use-scroll-progress";
import styles from "./hero-journey.module.css";

type HeroJourneyProps = {
  children: ReactNode;
};

export function HeroJourney({ children }: HeroJourneyProps) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(journeyRef);

  return (
    <div ref={journeyRef} className={styles.journey}>
      <section
        id="top"
        className={styles.hero}
        style={{ "--hero-progress": progress } as CSSProperties}
      >
        <div
          role="img"
          aria-label="Maquette 3D d’un jardin qui se construit au défilement : terrasse, portail, clôture, pergola, arbres et mobilier."
          className={styles.scene}
        >
          <HeroScene progress={progress} />
        </div>
        <HeroGrain />
        <HeroStageCaption stageIndex={getStageIndex(progress)} />
        {children}
      </section>
    </div>
  );
}
