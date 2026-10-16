export const CUT_MS = 350;
export const LAYER_COUNT = 4;
export const DEPTH_LAG_MS = 60;
export const LAYER_SPLIT_MS = 640;
export const EXIT_MS = CUT_MS + LAYER_SPLIT_MS + DEPTH_LAG_MS * (LAYER_COUNT - 1) + 80;

export const TIMING_VARIABLES = {
  "--cut-ms": `${CUT_MS}ms`,
  "--depth-lag-ms": `${DEPTH_LAG_MS}ms`,
  "--layer-split-ms": `${LAYER_SPLIT_MS}ms`,
} as Record<string, string>;
