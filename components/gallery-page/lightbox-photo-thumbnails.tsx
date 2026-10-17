import Image from "next/image";
import type { GalleryPhoto } from "./gallery-entry";
import styles from "./lightbox-thumbnails.module.css";

type LightboxPhotoThumbnailsProps = {
  photos: GalleryPhoto[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export function LightboxPhotoThumbnails({ photos, currentIndex, onSelect }: LightboxPhotoThumbnailsProps) {
  return (
    <div className={styles.strip}>
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          className={styles.thumbnail}
          aria-current={index === currentIndex}
          aria-label={`Photo ${index + 1}`}
          onClick={() => onSelect(index)}
        >
          <Image src={photo.thumbnailSrc} alt="" fill sizes="58px" className="object-cover" style={{ objectPosition: photo.objectPosition }} />
        </button>
      ))}
    </div>
  );
}
