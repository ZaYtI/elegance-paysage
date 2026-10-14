import styles from "./site-footer.module.css";

export function FooterWordmark() {
  return (
    <svg viewBox="0 0 1310 160" aria-hidden="true" className={styles.wordmark}>
      <defs>
        <linearGradient id="footer-wordmark-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6c5d4f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6c5d4f" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="118"
        textLength="1306"
        lengthAdjust="spacing"
        fill="url(#footer-wordmark-fade)"
        className={styles.wordmarkText}
      >
        élégance paysage
      </text>
    </svg>
  );
}
