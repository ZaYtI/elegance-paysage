import { stillShots } from "./camera";
import { createGardenWorld, type GardenWorld } from "./garden-world";
import type { GardenView } from "./garden-views";
import { FULL_QUALITY } from "./quality";
import { waitForSharedGardenWorld } from "./shared-garden-world";

const STILL_TIME = 2.2;
const HERO_WORLD_WAIT_MS = 4000;
const OWN_WORLD_IDLE_DISPOSE_MS = 4000;

type QueuedStill = {
  view: GardenView;
  resolve: (canvas: HTMLCanvasElement) => void;
  reject: (error: unknown) => void;
};

type StillWorld = {
  world: GardenWorld;
  restore: () => void;
};

const cache = new Map<GardenView, Promise<HTMLCanvasElement>>();
const queue: QueuedStill[] = [];
let ownWorld: GardenWorld | null = null;
let isProcessing = false;
let disposeTimer: ReturnType<typeof setTimeout> | undefined;

async function acquireWorld(): Promise<StillWorld> {
  const heroWorld = await waitForSharedGardenWorld(HERO_WORLD_WAIT_MS);
  if (heroWorld) return { world: heroWorld.world, restore: heroWorld.redraw };

  ownWorld ??= createGardenWorld(document.createElement("canvas"), FULL_QUALITY);
  return { world: ownWorld, restore: () => {} };
}

function renderStill(view: GardenView, { world, restore }: StillWorld): HTMLCanvasElement {
  const shot = stillShots[view];
  world.render({
    width: shot.width,
    height: shot.height,
    progress: shot.progress,
    time: STILL_TIME,
    camera: shot.camera,
    mode: "still",
  });

  const still = document.createElement("canvas");
  still.width = shot.width;
  still.height = shot.height;
  const context = still.getContext("2d");
  if (!context) throw new Error("2D canvas context unavailable");
  context.drawImage(world.canvas, 0, 0, shot.width, shot.height);
  restore();
  return still;
}

function releaseOwnWorldWhenIdle() {
  clearTimeout(disposeTimer);
  disposeTimer = setTimeout(() => {
    if (queue.length > 0) return;
    ownWorld?.dispose();
    ownWorld = null;
  }, OWN_WORLD_IDLE_DISPOSE_MS);
}

function scheduleWhenIdle(task: () => void) {
  if ("requestIdleCallback" in window) window.requestIdleCallback(task, { timeout: 1500 });
  else setTimeout(task, 120);
}

async function processNext() {
  const next = queue.shift();
  if (!next) {
    isProcessing = false;
    releaseOwnWorldWhenIdle();
    return;
  }
  try {
    next.resolve(renderStill(next.view, await acquireWorld()));
  } catch (error) {
    ownWorld?.dispose();
    ownWorld = null;
    next.reject(error);
  }
  scheduleWhenIdle(processNext);
}

function startProcessing() {
  if (isProcessing) return;
  isProcessing = true;
  clearTimeout(disposeTimer);
  scheduleWhenIdle(processNext);
}

export function requestGardenStill(view: GardenView): Promise<HTMLCanvasElement> {
  const cached = cache.get(view);
  if (cached) return cached;
  const pending = new Promise<HTMLCanvasElement>((resolve, reject) => {
    queue.push({ view, resolve, reject });
  });
  cache.set(view, pending);
  pending.catch(() => cache.delete(view));
  startProcessing();
  return pending;
}
