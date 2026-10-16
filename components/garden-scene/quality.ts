export type QualityProfile = {
  maxPixelRatio: number;
  antialias: boolean;
  shadowMapSize: number;
  grassDensity: number;
  idleFrameSeconds: number;
};

export const FULL_QUALITY: QualityProfile = {
  maxPixelRatio: 1.5,
  antialias: true,
  shadowMapSize: 2048,
  grassDensity: 1,
  idleFrameSeconds: 1 / 30,
};

const REDUCED_QUALITY: QualityProfile = {
  maxPixelRatio: 1.25,
  antialias: false,
  shadowMapSize: 1024,
  grassDensity: 0.4,
  idleFrameSeconds: 1 / 20,
};

const SMALL_SCREEN_QUERY = "(max-width: 767px)";
const TOUCH_QUERY = "(pointer: coarse)";
const LOW_CORE_COUNT = 4;

function isConstrainedDevice() {
  const cores = navigator.hardwareConcurrency || LOW_CORE_COUNT;
  return (
    window.matchMedia(SMALL_SCREEN_QUERY).matches ||
    window.matchMedia(TOUCH_QUERY).matches ||
    cores <= LOW_CORE_COUNT
  );
}

export function chooseQualityProfile(): QualityProfile {
  return isConstrainedDevice() ? REDUCED_QUALITY : FULL_QUALITY;
}
