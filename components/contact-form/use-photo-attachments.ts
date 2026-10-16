"use client";

import { useEffect, useRef, useState } from "react";
import { PHOTO_LIMITS } from "@/lib/contact-schema";

export type PhotoAttachment = {
  id: string;
  file: File;
  preview: string;
};

type AcceptedType = (typeof PHOTO_LIMITS.acceptedTypes)[number];

export function usePhotoAttachments() {
  const [photos, setPhotos] = useState<PhotoAttachment[]>([]);
  const [error, setError] = useState("");
  const photosRef = useRef(photos);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      for (const photo of photosRef.current) URL.revokeObjectURL(photo.preview);
    };
  }, []);

  function addFiles(files: File[]) {
    const remainingSlots = PHOTO_LIMITS.maxCount - photos.length;
    const accepted: PhotoAttachment[] = [];
    let nextError = "";

    for (const file of files) {
      if (accepted.length >= remainingSlots) {
        nextError = `${PHOTO_LIMITS.maxCount} photos maximum`;
        break;
      }
      if (!PHOTO_LIMITS.acceptedTypes.includes(file.type as AcceptedType)) {
        nextError = "Formats acceptés : JPEG, PNG, WebP";
        continue;
      }
      if (file.size > PHOTO_LIMITS.maxSize) {
        nextError = "Chaque image doit faire 5 Mo maximum";
        continue;
      }
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }

    setError(nextError);
    if (accepted.length > 0) {
      setPhotos((current) => [...current, ...accepted]);
    }
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return current.filter((photo) => photo.id !== id);
    });
    setError("");
  }

  function clearPhotos() {
    for (const photo of photos) URL.revokeObjectURL(photo.preview);
    setPhotos([]);
    setError("");
  }

  return { photos, error, addFiles, removePhoto, clearPhotos };
}
