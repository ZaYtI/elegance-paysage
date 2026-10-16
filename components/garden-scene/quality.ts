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

export function chooseQualityProfile(): QualityProfile {
  return FULL_QUALITY;
}
