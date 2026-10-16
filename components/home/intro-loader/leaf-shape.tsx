import type { Leaf } from "./foliage";
import { leafGradientId, leafSymbolId } from "./leaf-ids";

type LeafShapeProps = {
  leaf: Leaf;
  scope: string;
  midrib: string;
};

export function LeafShape({ leaf, scope, midrib }: LeafShapeProps) {
  const transform = `translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.size})`;
  return (
    <use
      href={`#${leafSymbolId(scope, leaf.variant)}`}
      transform={transform}
      fill={`url(#${leafGradientId(scope, leaf.fill)})`}
      stroke={midrib}
    />
  );
}
