import { cn } from "@/lib/utils";
import styles from "./upcoming-photos.module.css";

type UpcomingPhotosProps = {
  subline?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function UpcomingPhotos({ subline, tone = "light", className }: UpcomingPhotosProps) {
  return (
    <div className={cn(styles.empty, tone === "dark" && styles.dark, className)}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="40"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m21 16-5-5-8 8" />
      </svg>
      <p className={styles.title}>Images à venir</p>
      {subline && <p className={styles.subline}>{subline}</p>}
    </div>
  );
}
