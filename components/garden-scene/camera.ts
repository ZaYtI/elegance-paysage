import type { PerspectiveCamera } from "three";

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

const FIELD_OF_VIEW = 20;
const DEFAULT_ELEVATION = 0.56;
const MIN_ELEVATION = 0.3;
const MAX_ELEVATION = 1.0;

export function clampElevationOffset(offset: number) {
  return Math.min(MAX_ELEVATION - DEFAULT_ELEVATION, Math.max(MIN_ELEVATION - DEFAULT_ELEVATION, offset));
}

export function createHeroCamera(progress: number, aspect: number, viewYaw: number, elevationOffset = 0): OrbitCamera {
  return {
    yaw: 0.82 + progress * 0.22 + viewYaw,
    elevation: DEFAULT_ELEVATION + clampElevationOffset(elevationOffset),
    width: aspect < 1.2 ? 13 : 14.8,
    offsetX: 0,
    offsetY: 0.02,
    targetX: 0,
    targetY: -0.25,
    targetZ: 0,
  };
}

export function placeCamera(camera: PerspectiveCamera, spec: OrbitCamera, aspect: number) {
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
}
