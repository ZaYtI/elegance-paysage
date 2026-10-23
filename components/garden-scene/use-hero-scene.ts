"use client";

import { useEffect, useState, type RefObject } from "react";
import { markHeroReady } from "./hero-ready";
import type { ProgressSource } from "./progress-source";
import { observeDragRotation } from "./observe-drag-rotation";
import { observePointerYaw } from "./observe-pointer-yaw";
import { observeVisibility } from "./observe-visibility";
import { createRotationInertia } from "./rotation-inertia";

export function useHeroScene(
  hostRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progressSource: ProgressSource,
  onDisplayedProgress: (progress: number) => void,
) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let cancelled = false;
    let stopObserving: (() => void) | undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Let the route's own paint (nav, text, placeholder) land before the heavy
    // scene build starts, so navigating back here never looks frozen.
    const startHandle = requestAnimationFrame(() => {
      if (cancelled) return;
      import("./hero-scene-controller")
        .then(({ createHeroSceneController }) => {
          if (cancelled) return;
          const controller = createHeroSceneController({
            canvas,
            host,
            initialProgress: progressSource.current,
            reducedMotion,
            onDisplayedProgress,
            onReady: () => setReady(true),
          });

          const stopProgress = progressSource.subscribe(controller.setTargetProgress);
          const stopVisibility = observeVisibility(host, controller.setVisible);
          const stopPointer = observePointerYaw(host, controller.setTargetYaw);
          const inertia = createRotationInertia((yaw) => controller.addUserRotation(yaw, 0));
          const stopDrag = observeDragRotation(host, {
            onDragStart: inertia.stop,
            onRotate: controller.addUserRotation,
            onDragEnd: (yawSpeed) => {
              if (!reducedMotion) inertia.start(yawSpeed);
            },
          });
          const resizeObserver = new ResizeObserver(controller.renderOnce);
          resizeObserver.observe(host);
          stopObserving = () => {
            stopProgress();
            stopVisibility();
            stopPointer();
            stopDrag();
            inertia.stop();
            resizeObserver.disconnect();
            controller.dispose();
          };
        })
        .catch((error) => {
          console.error(error);
          markHeroReady();
          if (!cancelled) setFailed(true);
        });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(startHandle);
      stopObserving?.();
    };
  }, [hostRef, canvasRef, progressSource, onDisplayedProgress]);

  return { failed, ready };
}
