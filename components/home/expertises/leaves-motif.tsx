import styles from "./expertise-motif.module.css";
import type { MotifProps } from "./motif-props";

export function LeavesMotif({ color, opacity }: MotifProps) {
  return (
    <svg className={styles.motif} viewBox="121 144 92 92" style={{ color, opacity }} aria-hidden="true">
      <path fill="currentColor" d="M125.3 178.6v-11c0 -0.5 0.4 -0.9 0.9 -0.9h0c3.5 0.1 16.1 1 34.9 12l10.8 6.5c15.6 10.4 23.5 13.7 35.2 16.5 0.7 0.1 0.9 0.3 0.9 0.8l0 10.7c0 0.5 -0.4 1 -1 1 -2.5 0 -9.8 -1 -20.9 -5.7 -6.6 -2.8 -12.6 -6.4 -18.8 -10.4l-5.7 -3.9c-18.7 -12.5 -35.6 -14.9 -35.6 -14.9 -0.4 0 -0.7 -0.3 -0.7 -0.7h0" />
      <path className={styles.leaf} fill="currentColor" d="M159.2 203.7c0.4 -0.4 0.4 -1.1 0 -1.5 -8.3 -6.5 -20.5 -5.9 -28.1 1.2 -0.4 0.4 -0.4 1.1 0.1 1.5 8.6 6.4 20.1 5.8 28.1 -1.2Z" />
      <path className={`${styles.leaf} ${styles.leafB}`} fill="currentColor" d="M180.9 182c7.2 -0.7 14.1 -3.9 19.3 -9.6 5.2 -5.7 7.8 -12.9 7.8 -20.1 0 -0.6 -0.5 -1 -1 -1 -7.1 0.7 -14.1 3.9 -19.3 9.6 -5.2 5.7 -7.8 12.9 -7.8 20.1 0 0.6 0.5 1 1.1 1Z" />
      <path className={`${styles.leaf} ${styles.leafC}`} fill="currentColor" d="M174.6 211.2c-6.9 -1.7 -14.4 -0.9 -21.2 2.7 -6.7 3.7 -11.5 9.5 -13.9 16.2 -0.2 0.5 0.1 1.1 0.7 1.3 6.9 1.7 14.4 0.9 21.2 -2.7 6.7 -3.6 11.5 -9.5 13.9 -16.2 0.2 -0.5 -0.1 -1.1 -0.7 -1.2Z" />
    </svg>
  );
}
