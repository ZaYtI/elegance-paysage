"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { GardenView } from "./garden-views";
import { useGardenStill } from "./use-garden-still";

type GardenSnapshotProps = {
  view: GardenView;
  label?: string;
  className?: string;
};

export function GardenSnapshot({ view, label, className }: GardenSnapshotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ready = useGardenStill(view, canvasRef);

  return (
    <div
      data-view={view}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative h-full w-full bg-[radial-gradient(at_60%_30%,#5a5346,#2e2921_70%)]", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
