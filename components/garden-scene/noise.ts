export type RandomSource = () => number;

export type GroundZone = 1 | 2 | 3;

export const GROUND_HALF_WIDTH = 4.5;
export const GROUND_HALF_DEPTH = 3.5;

export function createRandom(initialSeed: number): RandomSource {
  let seed = initialSeed;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2d(i: number, j: number): number {
  const value = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2d(xi, yi);
  const b = hash2d(xi + 1, yi);
  const c = hash2d(xi, yi + 1);
  const d = hash2d(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fractalNoise(x: number, y: number): number {
  return (
    valueNoise(x, y) * 0.5 +
    valueNoise(x * 2.1 + 5.2, y * 2.1 + 1.3) * 0.25 +
    valueNoise(x * 4.3 + 9.1, y * 4.3 + 7.7) * 0.125 +
    valueNoise(x * 8.7, y * 8.7) * 0.0625
  );
}

function edgeFalloff(x: number, z: number): number {
  const distanceToEdge = Math.min(4.5 - Math.abs(x), 3.5 - Math.abs(z));
  const t = Math.max(0, Math.min(1, distanceToEdge / 1.1));
  return t * t * (3 - 2 * t);
}

export function roughHeight(x: number, z: number): number {
  const bumps =
    0.01 +
    0.5 * Math.pow(fractalNoise(x * 0.55 + 3.1, z * 0.55 + 8.4), 1.5) +
    0.04 * valueNoise(x * 2.8, z * 2.8);
  return 0.012 + bumps * edgeFalloff(x, z);
}

export function gentleHeight(x: number, z: number): number {
  return 0.012 + (0.038 + 0.025 * (valueNoise(x * 0.5 + 1.7, z * 0.5 + 4.2) - 0.5)) * edgeFalloff(x, z);
}

export function groundZone(x: number, z: number): GroundZone {
  const isDeck = x > -4.0 && x < -0.5 && z > -1.42 && z < 2.2;
  if (isDeck) return 2;
  const isMulchBed = (x > 0.4 && z < -1.7 && z > -3.12) || (x < -2.4 && z > 2.28);
  if (isMulchBed) return 3;
  const isHedgeStrip = x < -3.95 && z < 1.95;
  if (isHedgeStrip) return 3;
  return 1;
}

export function diagonalWave(x: number, z: number): number {
  return ((x + GROUND_HALF_WIDTH) / 9 + (GROUND_HALF_DEPTH - z) / 7) / 2;
}
