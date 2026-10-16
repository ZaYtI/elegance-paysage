"use client";

import { LogoIcon } from "@/components/logo-icon";
import styles from "./intro-loader.module.css";
import { useIntroPhase } from "./use-intro-phase";

export function IntroLoader() {
  const phase = useIntroPhase();
  if (phase === "gone") return null;

  return (
    <div className={styles.root} data-phase={phase} aria-hidden="true">
      <div className={styles.emblem}>
        <LogoIcon onDark />
      </div>
      <p className={styles.name}>élégance paysage</p>
      <span className={styles.pulse} />
    </div>
  );
}
