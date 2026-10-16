"use client";

import { useEffect, useState, type RefObject } from "react";
import type { ProgressSource } from "./progress-source";
import { observePointerYaw } from "./observe-pointer-yaw";
import { observeVisibility } from "./observe-visibility";

export function useHeroScene(
  hostRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progressSource: ProgressSource,
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let cancelled = false;
    let stopObserving: (() => void) | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("./hero-scene-controller")
      .then(({ createHeroSceneController }) => {
        if (cancelled) return;
        const controller = createHeroSceneController({
          canvas,
          host,
          initialProgress: progressSource.current,
          reducedMotion,
        });

        const stopProgress = progressSource.subscribe(controller.setTargetProgress);
        const stopVisibility = observeVisibility(host, controller.setVisible);
        const stopPointer = observePointerYaw(host, controller.setTargetYaw);
        const resizeObserver = new ResizeObserver(controller.renderOnce);
        resizeObserver.observe(host);
        stopObserving = () => {
          stopProgress();
          stopVisibility();
          stopPointer();
          resizeObserver.disconnect();
          controller.dispose();
        };
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      stopObserving?.();
    };
  }, [hostRef, canvasRef, progressSource]);

  return failed;
}
