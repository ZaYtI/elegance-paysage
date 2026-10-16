import { TrashIcon } from "@/components/section-icons";
import type { PhotoAttachment } from "./use-photo-attachments";

type PhotoPreviewListProps = {
  photos: PhotoAttachment[];
  onRemove: (id: string) => void;
};

export function PhotoPreviewList({ photos, onRemove }: PhotoPreviewListProps) {
  return (
    <>
      {photos.map((photo) => (
        <div key={photo.id} className="relative h-16 w-16 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.preview}
            alt={`Photo jointe : ${photo.file.name}`}
            className="h-full w-full rounded-lg border border-white/15 object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(photo.id)}
            aria-label={`Retirer ${photo.file.name}`}
            className="absolute -top-1.5 -right-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/20 bg-ink-950 text-paper/80 transition-colors hover:border-destructive hover:text-destructive"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      ))}
    </>
  );
}
