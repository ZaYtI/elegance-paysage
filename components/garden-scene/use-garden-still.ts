"use client";

import { useEffect, useState, type RefObject } from "react";
import type { GardenView } from "./garden-views";

export function useGardenStill(view: GardenView, canvasRef: RefObject<HTMLCanvasElement | null>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

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

    return () => {
      cancelled = true;
    };
  }, [view, canvasRef]);

  return ready;
}
