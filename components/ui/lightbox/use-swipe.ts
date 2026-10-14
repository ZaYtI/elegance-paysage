"use client";

import { useRef, type PointerEvent } from "react";

const SWIPE_DISTANCE = 50;

type SwipeHandlers = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const startX = useRef<number | null>(null);

  return {
    onPointerDown: (event: PointerEvent) => {
      if (event.pointerType !== "mouse") startX.current = event.clientX;
    },
    onPointerUp: (event: PointerEvent) => {
      if (startX.current === null) return;
      const distance = event.clientX - startX.current;
      startX.current = null;
      if (distance <= -SWIPE_DISTANCE) onSwipeLeft();
      if (distance >= SWIPE_DISTANCE) onSwipeRight();
    },
    onPointerCancel: () => {
      startX.current = null;
    },
  };
}
