import { createHeroCamera } from "./camera";
import { createGardenWorld } from "./garden-world";
import { markHeroReady } from "./hero-ready";
import { chooseQualityProfile } from "./quality";
import { shareGardenWorld } from "./shared-garden-world";

const MAX_FRAME_SECONDS = 0.05;
const PROGRESS_SMOOTHING_PER_SECOND = 5.5;
const YAW_SMOOTHING_PER_SECOND = 7;
const SETTLE_THRESHOLD = 0.0005;

function easeToward(current: number, target: number, smoothingPerSecond: number, seconds: number) {
  const next = current + (target - current) * (1 - Math.exp(-smoothingPerSecond * seconds));
  return Math.abs(target - next) < SETTLE_THRESHOLD ? target : next;
}

export type HeroSceneController = {
  setTargetProgress: (progress: number) => void;
  setTargetYaw: (yaw: number) => void;
  setVisible: (visible: boolean) => void;
  renderOnce: () => void;
  dispose: () => void;
};

type HeroSceneOptions = {
  canvas: HTMLCanvasElement;
  host: HTMLElement;
  initialProgress: number;
  reducedMotion: boolean;
};

export function createHeroSceneController({
  canvas,
  host,
  initialProgress,
  reducedMotion,
}: HeroSceneOptions): HeroSceneController {
  const quality = chooseQualityProfile();
  const world = createGardenWorld(canvas, quality);
  let targetProgress = reducedMotion ? 1 : initialProgress;
  let progress = targetProgress;
  let targetYaw = 0;
  let yaw = 0;
  let time = 0;
  let lastTimestamp = 0;
  let secondsSinceDraw = 0;
  let visible = true;
  let frameHandle = 0;

  const draw = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    const pixelRatio = Math.min(quality.maxPixelRatio, window.devicePixelRatio || 1);
    world.render({
      width: Math.round(width * pixelRatio),
      height: Math.round(height * pixelRatio),
      progress,
      time,
      camera: createHeroCamera(progress, width / height, yaw),
      mode: "hero",
    });
    markHeroReady();
  };

  const onFrame = (timestamp: number) => {
    frameHandle = requestAnimationFrame(onFrame);
    const elapsed = lastTimestamp ? Math.min(MAX_FRAME_SECONDS, (timestamp - lastTimestamp) / 1000) : 0;
    lastTimestamp = timestamp;
    time += elapsed;
    progress = easeToward(progress, targetProgress, PROGRESS_SMOOTHING_PER_SECOND, elapsed);
    yaw = easeToward(yaw, targetYaw, YAW_SMOOTHING_PER_SECOND, elapsed);
    secondsSinceDraw += elapsed;
    const isEasing = progress !== targetProgress || yaw !== targetYaw;
    if (visible && (isEasing || secondsSinceDraw >= quality.idleFrameSeconds)) {
      secondsSinceDraw = 0;
      draw();
    }
  };

  const stopSharing = shareGardenWorld(world, draw);

  if (reducedMotion) draw();
  else frameHandle = requestAnimationFrame(onFrame);

  return {
    setTargetProgress: (value) => {
      if (!reducedMotion) targetProgress = value;
    },
    setTargetYaw: (value) => {
      if (!reducedMotion) targetYaw = value;
    },
    setVisible: (value) => {
      visible = value;
      if (reducedMotion && visible) draw();
    },
    renderOnce: () => {
      if (reducedMotion && visible) draw();
    },
    dispose: () => {
      cancelAnimationFrame(frameHandle);
      stopSharing();
      world.dispose();
    },
  };
}
