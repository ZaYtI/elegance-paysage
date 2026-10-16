import { leafSymbolId } from "./leaf-ids";
import { LEAF_VARIANTS } from "./leaf-variants";

const HIGHLIGHT_STROKE = "rgba(200, 205, 185, 0.16)";

type LeafSymbolsProps = {
  scope: string;
  withLaterals: boolean;
};

export function LeafSymbols({ scope, withLaterals }: LeafSymbolsProps) {
  return (
    <>
      {LEAF_VARIANTS.map((variant, index) => (
        <g key={index} id={leafSymbolId(scope, index)}>
          <path d={variant.body} stroke="none" />
          <path d={variant.highlight} fill="none" stroke={HIGHLIGHT_STROKE} strokeWidth={0.05} strokeLinecap="round" />
          {withLaterals && <path d={variant.laterals} fill="none" strokeWidth={0.022} strokeOpacity={0.55} />}
          <path d={variant.midrib} fill="none" strokeWidth={0.045} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}
