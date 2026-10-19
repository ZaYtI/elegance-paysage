"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { limitDownwardDelta } from "./scroll-gate";

const STUDIO_PATH = "/studio";

export function SmoothScroll() {
  const isStudio = usePathname().startsWith(STUDIO_PATH);

  useEffect(() => {
    if (isStudio) return;

    const onWheel = (event: WheelEvent) => {
      const allowed = limitDownwardDelta(window.scrollY, event.deltaY);
      if (allowed === event.deltaY) return;
      event.preventDefault();
      if (allowed > 0) window.scrollBy(0, allowed);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isStudio]);

  return null;
}
