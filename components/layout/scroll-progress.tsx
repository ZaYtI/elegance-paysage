"use client";

import styles from "./scroll-progress.module.css";
import { useScrollProgress } from "./use-scroll-progress";

export function ScrollProgress() {
  const barRef = useScrollProgress();

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />;
}
