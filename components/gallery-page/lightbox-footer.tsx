import type { GalleryEntry } from "./gallery-entry";
import { LightboxPhotoThumbnails } from "./lightbox-photo-thumbnails";

type LightboxFooterProps = {
  entry: GalleryEntry;
  photoIndex: number;
  onSelectPhoto: (index: number) => void;
};

export function LightboxFooter({ entry, photoIndex, onSelectPhoto }: LightboxFooterProps) {
  if (entry.photos.length < 2) return null;

  return <LightboxPhotoThumbnails photos={entry.photos} currentIndex={photoIndex} onSelect={onSelectPhoto} />;
}
