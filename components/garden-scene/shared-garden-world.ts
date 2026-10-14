import type { GardenWorld } from "./garden-world";

export type SharedGardenWorld = {
  world: GardenWorld;
  redraw: () => void;
};

let shared: SharedGardenWorld | null = null;
const waiting = new Set<(world: SharedGardenWorld) => void>();

export function shareGardenWorld(world: GardenWorld, redraw: () => void) {
  const entry = { world, redraw };
  shared = entry;
  waiting.forEach((notify) => notify(entry));
  waiting.clear();

  return () => {
    if (shared === entry) shared = null;
  };
}

export function waitForSharedGardenWorld(timeoutMs: number): Promise<SharedGardenWorld | null> {
  if (shared) return Promise.resolve(shared);

  return new Promise((resolve) => {
    const notify = (world: SharedGardenWorld) => {
      clearTimeout(timer);
      resolve(world);
    };
    const timer = setTimeout(() => {
      waiting.delete(notify);
      resolve(null);
    }, timeoutMs);
    waiting.add(notify);
  });
}
