import { cn } from "@/lib/utils";
import styles from "./lightbox.module.css";

type LightboxNavButtonProps = {
  direction: "previous" | "next";
  onClick: () => void;
};

export function LightboxNavButton({ direction, onClick }: LightboxNavButtonProps) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      className={cn(styles.roundButton, styles.navButton, isNext ? styles.navNext : styles.navPrevious)}
      onClick={onClick}
      aria-label={isNext ? "Image suivante" : "Image précédente"}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={isNext ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"} />
      </svg>
    </button>
  );
}
