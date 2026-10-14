"use client";

import { useEffect, useRef } from "react";

type DialogKeyHandlers = {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function useDialogBehavior({ onClose, onPrevious, onNext }: DialogKeyHandlers) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const handlersRef = useRef({ onClose, onPrevious, onNext });

  useEffect(() => {
    handlersRef.current = { onClose, onPrevious, onNext };
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handlersRef.current.onClose();
      if (event.key === "ArrowLeft") handlersRef.current.onPrevious();
      if (event.key === "ArrowRight") handlersRef.current.onNext();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return dialogRef;
}
