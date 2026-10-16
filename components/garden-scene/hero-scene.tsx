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
  const failed = useHeroScene(hostRef, canvasRef, progressSource, onDisplayedProgress);

  return (
    <div ref={hostRef} className="absolute inset-0 h-full w-full touch-pan-y">
      {failed ? (
        <div className="absolute inset-0 flex flex-col justify-center rounded-[15px] border border-sage-500/30 text-center">
          <p className="text-[30px]">Imaginez votre prochain jardin.</p>
          <span className="text-[14px] text-stone-400">Terrasse · Pergola · Plantations</span>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Maquette 3D d’un jardin qui se construit au défilement : terrasse, portail, clôture, pergola, arbres et mobilier."
          className="block h-full w-full"
        />
      )}
    </div>
  );
}
