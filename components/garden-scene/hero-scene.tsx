"use client";

import { useRef } from "react";
import type { ProgressSource } from "./progress-source";
import { useHeroScene } from "./use-hero-scene";

type HeroSceneProps = {
  progressSource: ProgressSource;
  onDisplayedProgress: (progress: number) => void;
};

export function HeroScene({ progressSource, onDisplayedProgress }: HeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { failed, ready } = useHeroScene(hostRef, canvasRef, progressSource, onDisplayedProgress);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full touch-pan-y [@media(pointer:fine)]:cursor-grab">
      {failed ? (
        <div className="absolute inset-0 flex flex-col justify-center rounded-[15px] border border-sage-500/30 text-center">
          <p className="text-[30px]">Imaginez votre prochain jardin.</p>
          <span className="text-[14px] text-stone-400">Terrasse · Clôture · Plantations</span>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center rounded-[15px] transition-opacity duration-500"
            style={{ opacity: ready ? 0 : 1, pointerEvents: "none" }}
          >
            <div className="h-[46%] w-[72%] animate-pulse rounded-[15px] bg-stone-400/10" />
          </div>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Maquette 3D d’un jardin qui se construit au défilement : terrasse, portail, clôture, arbres et mobilier."
            className="block h-full w-full transition-opacity duration-500"
            style={{ opacity: ready ? 1 : 0 }}
          />
        </>
      )}
    </div>
  );
}
