"use client";

import { useEffect } from "react";

const SCROLL_KEYS = new Set(["Space", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);

function blockEvent(event: Event) {
  event.preventDefault();
}

function blockScrollKey(event: KeyboardEvent) {
  if (SCROLL_KEYS.has(event.code)) event.preventDefault();
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    window.scrollTo(0, 0);
    root.dataset.scrollLocked = "true";
    window.addEventListener("wheel", blockEvent, { passive: false });
    window.addEventListener("touchmove", blockEvent, { passive: false });
    window.addEventListener("keydown", blockScrollKey, { passive: false });
    return () => {
      delete root.dataset.scrollLocked;
      window.removeEventListener("wheel", blockEvent);
      window.removeEventListener("touchmove", blockEvent);
      window.removeEventListener("keydown", blockScrollKey);
    };
  }, [locked]);
}
