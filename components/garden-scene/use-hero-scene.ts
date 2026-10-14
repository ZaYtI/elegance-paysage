"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { HeroSceneController } from "./hero-scene-controller";
import { observePointerYaw } from "./observe-pointer-yaw";
import { observeVisibility } from "./observe-visibility";

export function useHeroScene(
  hostRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  progress: number,
) {
  const [failed, setFailed] = useState(false);
  const controllerRef = useRef<HeroSceneController | null>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
    controllerRef.current?.setTargetProgress(progress);
  }, [progress]);

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
          initialProgress: progressRef.current,
          reducedMotion,
        });
        controllerRef.current = controller;

        const stopVisibility = observeVisibility(host, controller.setVisible);
        const stopPointer = observePointerYaw(host, controller.setTargetYaw);
        const resizeObserver = new ResizeObserver(controller.renderOnce);
        resizeObserver.observe(host);
        stopObserving = () => {
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
      controllerRef.current = null;
      stopObserving?.();
    };
  }, [hostRef, canvasRef]);

  return failed;
}
