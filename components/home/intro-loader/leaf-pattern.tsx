import { generateLeaves } from "./foliage";
import { HEDGE_DEPTHS, type HedgeDepth } from "./hedge-depths";
import { LeafGradients } from "./leaf-gradients";
import { LeafShape } from "./leaf-shape";
import { LeafSymbols } from "./leaf-symbols";

const SMALLEST_LEAF_SIZE_WITHOUT_LATERALS = 32;

export function leafPatternId(depth: HedgeDepth) {
  return `hedge-foliage-${depth}`;
}

export function LeafPattern({ depth }: { depth: HedgeDepth }) {
  const { seed, base, midrib, foliage } = HEDGE_DEPTHS[depth];
  const leaves = generateLeaves(seed, foliage);
  const scope = `hedge-${depth}`;
  const withLaterals = foliage.maxSize > SMALLEST_LEAF_SIZE_WITHOUT_LATERALS;

  return (
    <pattern id={leafPatternId(depth)} width={foliage.tile} height={foliage.tile} patternUnits="userSpaceOnUse">
      <defs>
        <LeafGradients scope={scope} fills={foliage.palette} />
        <LeafSymbols scope={scope} withLaterals={withLaterals} />
      </defs>
      {base && <rect width={foliage.tile} height={foliage.tile} fill={base} />}
      {leaves.map((leaf, index) => (
        <LeafShape key={index} leaf={leaf} scope={scope} midrib={midrib} />
      ))}
    </pattern>
  );
}
