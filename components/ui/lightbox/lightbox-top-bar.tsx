import styles from "./lightbox.module.css";

type LightboxTopBarProps = {
  eyebrow?: string;
  title: string;
  current: number;
  total: number;
  onClose: () => void;
};

function formatPosition(value: number) {
  return String(value).padStart(2, "0");
}

export function LightboxTopBar({ eyebrow, title, current, total, onClose }: LightboxTopBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.heading}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.actions}>
        <span className={styles.counter}>
          {formatPosition(current)} <span className={styles.counterTotal}>/ {formatPosition(total)}</span>
        </span>
        <button type="button" className={styles.roundButton} onClick={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
