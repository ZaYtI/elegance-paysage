"use client";

import { useRef } from "react";
import { ImageUploadIcon } from "@/components/section-icons";
import { PHOTO_LIMITS } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { errorTextClasses } from "./field-classes";
import { FormField } from "./form-field";
import { PhotoPreviewList } from "./photo-preview-list";
import type { PhotoAttachment } from "./use-photo-attachments";

type PhotoPickerProps = {
  photos: PhotoAttachment[];
  error: string;
  onAddFiles: (files: File[]) => void;
  onRemove: (id: string) => void;
};

export function PhotoPicker({ photos, error, onAddFiles, onRemove }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length > 0) onAddFiles(files);
  }

  return (
    <FormField htmlFor="photo" label="Photos (optionnel)">
      <input
        ref={inputRef}
        id="photo"
        name="photo"
        type="file"
        multiple
        accept={PHOTO_LIMITS.acceptedTypes.join(",")}
        onChange={handleChange}
        className="sr-only"
        aria-invalid={Boolean(error)}
      />
      <div className="flex flex-wrap gap-3">
        <PhotoPreviewList photos={photos} onRemove={onRemove} />
        {photos.length < PHOTO_LIMITS.maxCount && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-[0.68rem] text-stone-400 transition-colors hover:text-paper",
              error ? "border-destructive" : "border-white/25 hover:border-sage-500"
            )}
          >
            <ImageUploadIcon className="h-5 w-5" />
            Ajouter
          </button>
        )}
      </div>
      {error ? (
        <p className={errorTextClasses}>{error}</p>
      ) : (
        <p className="mt-1.5 text-[0.72rem] text-stone-400/70">
          JPEG, PNG ou WebP — 5 Mo par image, {PHOTO_LIMITS.maxCount} photos maximum
        </p>
      )}
    </FormField>
  );
}
