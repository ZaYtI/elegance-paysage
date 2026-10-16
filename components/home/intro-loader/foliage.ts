import { LEAF_VARIANTS } from "./leaf-variants";

export type Leaf = {
  x: number;
  y: number;
  rotation: number;
  size: number;
  fill: string;
  variant: number;
};

export type FoliageSpec = {
  count: number;
  minSize: number;
  maxSize: number;
  palette: string[];
  tile: number;
};

export function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function wrappedOffsets(position: number, size: number, tile: number) {
  return [-tile, 0, tile].filter((offset) => position + offset > -size && position + offset < tile + size);
}

export function generateLeaves(seed: number, spec: FoliageSpec): Leaf[] {
  const random = createRandom(seed);
  const leaves: Leaf[] = [];
  for (let index = 0; index < spec.count; index++) {
    const x = random() * spec.tile;
    const y = random() * spec.tile;
    const size = spec.minSize + random() * (spec.maxSize - spec.minSize);
    const rotation = random() * 360;
    const fill = spec.palette[Math.floor(random() * spec.palette.length)];
    const variant = Math.floor(random() * LEAF_VARIANTS.length);
    for (const offsetX of wrappedOffsets(x, size, spec.tile)) {
      for (const offsetY of wrappedOffsets(y, size, spec.tile)) {
        leaves.push({ x: round(x + offsetX), y: round(y + offsetY), rotation: round(rotation), size: round(size), fill, variant });
      }
    }
  }
  return leaves;
}
