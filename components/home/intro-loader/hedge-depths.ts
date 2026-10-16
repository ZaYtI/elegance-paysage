import type { FoliageSpec } from "./foliage";

export type HedgeDepth = 0 | 1 | 2 | 3;

export type HedgeDepthConfig = {
  seed: number;
  base: string | null;
  midrib: string;
  sway: number;
  swaySeconds: number;
  foliage: FoliageSpec;
};

const TILE = 480;

export const HEDGE_DEPTHS: Record<HedgeDepth, HedgeDepthConfig> = {
  0: {
    seed: 11,
    base: null,
    midrib: "rgba(160, 167, 148, 0.42)",
    sway: 14,
    swaySeconds: 7,
    foliage: { count: 40, minSize: 58, maxSize: 92, tile: TILE, palette: ["#3c342b", "#463d33", "#514b40", "#5a5346"] },
  },
  1: {
    seed: 23,
    base: null,
    midrib: "rgba(160, 167, 148, 0.28)",
    sway: -10,
    swaySeconds: 9,
    foliage: { count: 56, minSize: 38, maxSize: 60, tile: TILE, palette: ["#2e2921", "#3c342b", "#463d33"] },
  },
  2: {
    seed: 37,
    base: "#1f1b15",
    midrib: "rgba(160, 167, 148, 0.18)",
    sway: 7,
    swaySeconds: 11,
    foliage: { count: 76, minSize: 26, maxSize: 42, tile: TILE, palette: ["#211d17", "#2a251e", "#2e2921"] },
  },
  3: {
    seed: 53,
    base: "#15120d",
    midrib: "rgba(160, 167, 148, 0.1)",
    sway: -5,
    swaySeconds: 14,
    foliage: { count: 90, minSize: 18, maxSize: 30, tile: TILE, palette: ["#17140f", "#1c1813", "#211d17"] },
  },
};

export const HEDGE_RENDER_ORDER: HedgeDepth[] = [3, 2, 1, 0];
