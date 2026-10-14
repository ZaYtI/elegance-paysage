import type { PerspectiveCamera } from "three";
import type { GardenView } from "./garden-views";

export type OrbitCamera = {
  yaw: number;
  elevation: number;
  width: number;
  offsetX?: number;
  offsetY?: number;
  targetX: number;
  targetY: number;
  targetZ: number;
};

export type StillShot = {
  width: number;
  height: number;
  progress: number;
  camera: OrbitCamera;
};

const FIELD_OF_VIEW = 20;

export function createHeroCamera(progress: number, aspect: number, pointerYaw: number): OrbitCamera {
  return {
    yaw: 0.82 + progress * 0.22 + pointerYaw,
    elevation: 0.56,
    width: aspect < 1.2 ? 14.2 : 15.4,
    offsetX: 0,
    offsetY: 0.02,
    targetX: 0,
    targetY: -0.25,
    targetZ: 0,
  };
}

const finishedCamera: OrbitCamera = {
  yaw: 0.78,
  elevation: 0.42,
  width: 11.4,
  targetX: -0.1,
  targetY: 0.55,
  targetZ: 0.1,
};

export const stillShots: Record<GardenView, StillShot> = {
  creation: {
    width: 1500,
    height: 800,
    progress: 1,
    camera: { yaw: 1.32, elevation: 0.2, width: 9.4, targetX: -1.2, targetY: 1.35, targetZ: 0.2 },
  },
  finished: { width: 1300, height: 1080, progress: 1, camera: finishedCamera },
  terrace: {
    width: 1120,
    height: 1010,
    progress: 1,
    camera: { yaw: 1.3, elevation: 0.72, width: 6.4, targetX: -2.3, targetY: 0.9, targetZ: 0.4 },
  },
  planting: {
    width: 1040,
    height: 480,
    progress: 1,
    camera: { yaw: -0.3, elevation: 0.26, width: 5.6, targetX: 2.3, targetY: 0.75, targetZ: -2.3 },
  },
  hedge: {
    width: 1040,
    height: 480,
    progress: 1,
    camera: { yaw: 0.72, elevation: 0.2, width: 4.8, targetX: -3.5, targetY: 0.85, targetZ: -2.3 },
  },
  bare: { width: 1300, height: 1080, progress: 0, camera: finishedCamera },
};

export type CameraPlacement = {
  target: [number, number, number];
  distance: number;
  direction: [number, number, number];
};

export function placeCamera(camera: PerspectiveCamera, spec: OrbitCamera, aspect: number): CameraPlacement {
  camera.fov = FIELD_OF_VIEW;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  const distance = spec.width / aspect / 2 / Math.tan((10 * Math.PI) / 180);
  const offsetX = (spec.offsetX ?? 0) * spec.width;
  const offsetY = ((spec.offsetY ?? 0) * spec.width) / aspect;
  const sinYaw = Math.sin(spec.yaw);
  const cosYaw = Math.cos(spec.yaw);
  const sinElevation = Math.sin(spec.elevation);
  const cosElevation = Math.cos(spec.elevation);

  const targetX = spec.targetX - cosYaw * offsetX - sinYaw * sinElevation * offsetY;
  const targetY = spec.targetY + cosElevation * offsetY;
  const targetZ = spec.targetZ + sinYaw * offsetX - cosYaw * sinElevation * offsetY;
  const offsetFromTarget: [number, number, number] = [
    sinYaw * cosElevation * distance,
    sinElevation * distance,
    cosYaw * cosElevation * distance,
  ];

  camera.position.set(targetX + offsetFromTarget[0], targetY + offsetFromTarget[1], targetZ + offsetFromTarget[2]);
  camera.lookAt(targetX, targetY, targetZ);
  return { target: [targetX, targetY, targetZ], distance, direction: offsetFromTarget };
}
