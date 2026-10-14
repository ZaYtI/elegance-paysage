import { stillShots } from "./camera";
import { createGardenWorld, type GardenWorld } from "./garden-world";
import type { GardenView } from "./garden-views";

const STILL_TIME = 2.2;
const FIRST_RENDER_DELAY_MS = 400;
const WORLD_IDLE_DISPOSE_MS = 4000;

type QueuedStill = {
  view: GardenView;
  resolve: (canvas: HTMLCanvasElement) => void;
  reject: (error: unknown) => void;
};

const cache = new Map<GardenView, Promise<HTMLCanvasElement>>();
const queue: QueuedStill[] = [];
let world: GardenWorld | null = null;
let isProcessing = false;
let disposeTimer: ReturnType<typeof setTimeout> | undefined;

function renderStill(view: GardenView): HTMLCanvasElement {
  world ??= createGardenWorld(document.createElement("canvas"));
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
  return still;
}

function releaseWorldWhenIdle() {
  clearTimeout(disposeTimer);
  disposeTimer = setTimeout(() => {
    if (queue.length > 0) return;
    world?.dispose();
    world = null;
  }, WORLD_IDLE_DISPOSE_MS);
}

function scheduleWhenIdle(task: () => void) {
  if ("requestIdleCallback" in window) window.requestIdleCallback(task, { timeout: 1500 });
  else setTimeout(task, 120);
}

function processNext() {
  const next = queue.shift();
  if (!next) {
    isProcessing = false;
    releaseWorldWhenIdle();
    return;
  }
  try {
    next.resolve(renderStill(next.view));
  } catch (error) {
    world?.dispose();
    world = null;
    next.reject(error);
  }
  scheduleWhenIdle(processNext);
}

function startProcessing() {
  if (isProcessing) return;
  isProcessing = true;
  clearTimeout(disposeTimer);
  setTimeout(() => scheduleWhenIdle(processNext), world ? 0 : FIRST_RENDER_DELAY_MS);
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
