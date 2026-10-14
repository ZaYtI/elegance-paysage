import styles from "./expertise-motif.module.css";
import type { MotifProps } from "./motif-props";

export function BarsMotif({ color, opacity }: MotifProps) {
  return (
    <svg className={`${styles.motif} ${styles.bars}`} viewBox="120 60 94 94" style={{ color, opacity }} aria-hidden="true">
      <path fill="currentColor" d="M206.8 89.3h-80.5c-0.5 0 -1 0.4 -1 1v11.2c0 0.5 0.4 1 1 1h80.6c0.6 0 1 -0.4 1 -1v-11.2c0 -0.5 -0.4 -1 -1 -1Z" />
      <path fill="currentColor" d="M126.3 79.5h80.6c0.6 0 1 -0.4 1 -1v-11.2c0 -0.5 -0.4 -1 -1 -1h-80.5c-0.5 0 -1 0.4 -1 1v11.2c0 0.5 0.4 1 1 1Z" />
      <path fill="currentColor" d="M207.9 147.2v-11.2c0 -0.5 -0.4 -1 -1 -1h-80.5c-0.5 0 -1 0.4 -1 1v11.2c0 0.5 0.4 1 1 1h80.6c0.6 0 1 -0.4 1 -1Z" />
      <path fill="currentColor" d="M126.3 125h80.6c0.6 0 1 -0.4 1 -1v-11.2c0 -0.5 -0.4 -1 -1 -1h-80.5c-0.5 0 -1 0.4 -1 1v11.2c0 0.5 0.4 1 1 1Z" />
    </svg>
  );
}
