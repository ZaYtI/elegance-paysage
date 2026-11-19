import type { ReactNode } from "react";
import { HeroGrain } from "./hero-grain";
import { HeroVisual } from "./hero-visual";
import styles from "./hero-journey.module.css";

type HeroJourneyProps = {
  children: ReactNode;
};

export function HeroJourney({ children }: HeroJourneyProps) {
  return (
    <section id="top" className={styles.hero}>
      <HeroVisual />
      <HeroGrain />
      {children}
    </section>
  );
}
