import styles from "./hero-scroll-line.module.css";

export function HeroScrollLine({ className }: { className?: string }) {
  return <i aria-hidden="true" className={`${styles.line} ${className ?? ""}`} />;
}
