import type { GalleryEntry } from "./gallery-entry";
import { GalleryTile } from "./gallery-tile";
import styles from "./gallery-grid.module.css";

const APPEAR_STAGGER_SECONDS = 0.05;

type GalleryGridProps = {
  entries: GalleryEntry[];
  onOpen: (index: number) => void;
};

export function GalleryGrid({ entries, onOpen }: GalleryGridProps) {
  return (
    <div className={styles.grid}>
      {entries.map((entry, index) => (
        <GalleryTile
          key={entry.id}
          entry={entry}
          appearDelaySeconds={index * APPEAR_STAGGER_SECONDS}
          onOpen={() => onOpen(index)}
        />
      ))}
    </div>
  );
}
