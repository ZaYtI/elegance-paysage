import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";
import { GalleryCover } from "./gallery-cover";
import type { GalleryEntry, GalleryTileSize } from "./gallery-entry";
import styles from "./gallery-tile.module.css";

type GalleryTileProps = {
  entry: GalleryEntry;
  appearDelaySeconds: number;
  onOpen: () => void;
};

const TILE_IMAGE_SIZES = "(min-width: 1024px) 30vw, 50vw";

const sizeClassNames: Record<GalleryTileSize, string | undefined> = {
  regular: undefined,
  wide: styles.wide,
  tall: styles.tall,
  big: styles.big,
};

export function GalleryTile({ entry, appearDelaySeconds, onOpen }: GalleryTileProps) {
  return (
    <button
      type="button"
      className={cn(styles.tile, sizeClassNames[entry.size])}
      style={{ animationDelay: `${appearDelaySeconds}s` }}
      aria-label={`Agrandir : ${entry.title}`}
      onClick={onOpen}
    >
      <GalleryCover entry={entry} sizes={TILE_IMAGE_SIZES} className={cn(styles.texture, "object-cover")} />
      <span className={styles.tags}>
        <span className={styles.tag}>{entry.categoryLabel}</span>
        {entry.isExample && <ExampleTag />}
      </span>
      <h3 className={styles.title}>{entry.title}</h3>
      <span className={styles.see} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
    </button>
  );
}
