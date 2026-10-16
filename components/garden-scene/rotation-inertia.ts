const DECAY_PER_SECOND = 4;
const STOP_SPEED = 0.02;
const MAX_FRAME_SECONDS = 0.05;

export type RotationInertia = {
  start: (yawSpeed: number) => void;
  stop: () => void;
};

export function createRotationInertia(onYawStep: (yaw: number) => void): RotationInertia {
  let frameHandle = 0;

  const stop = () => {
    cancelAnimationFrame(frameHandle);
    frameHandle = 0;
  };

  const start = (yawSpeed: number) => {
    stop();
    let speed = yawSpeed;
    let lastTimestamp = 0;
    const onFrame = (timestamp: number) => {
      const seconds = lastTimestamp ? Math.min(MAX_FRAME_SECONDS, (timestamp - lastTimestamp) / 1000) : 0;
      lastTimestamp = timestamp;
      onYawStep(speed * seconds);
      speed *= Math.exp(-DECAY_PER_SECOND * seconds);
      frameHandle = Math.abs(speed) < STOP_SPEED ? 0 : requestAnimationFrame(onFrame);
    };
    if (Math.abs(speed) >= STOP_SPEED) frameHandle = requestAnimationFrame(onFrame);
  };

  return { start, stop };
}
