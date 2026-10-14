"use client";

import { useEffect, useState, type RefObject } from "react";
import type { GardenView } from "./garden-views";

const PRELOAD_MARGIN = "600px 0px";

function whenNearViewport(element: Element, callback: () => void) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      callback();
    },
    { rootMargin: PRELOAD_MARGIN },
  );
  observer.observe(element);
  return () => observer.disconnect();
}

export function useGardenStill(view: GardenView, canvasRef: RefObject<HTMLCanvasElement | null>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    const drawStill = () => {
      import("./snapshot-renderer")
        .then(({ requestGardenStill }) => requestGardenStill(view))
        .then((still) => {
          const context = canvas.getContext("2d");
          if (cancelled || !context) return;
          canvas.width = still.width;
          canvas.height = still.height;
          context.drawImage(still, 0, 0);
          setReady(true);
        })
        .catch((error) => console.error(error));
    };

    const stopWaiting = whenNearViewport(canvas, drawStill);

    return () => {
      cancelled = true;
      stopWaiting();
    };
  }, [view, canvasRef]);

  return ready;
}
