import type { CSSProperties } from "react";
import { HedgeHalf } from "./hedge-half";
import { HEDGE_DEPTHS, type HedgeDepth } from "./hedge-depths";
import { LeafPattern } from "./leaf-pattern";
import styles from "./hedge-layer.module.css";

export function HedgeLayer({ depth }: { depth: HedgeDepth }) {
  const { sway, swaySeconds } = HEDGE_DEPTHS[depth];
  const variables = {
    "--order": depth,
    "--sway": `${sway}px`,
    "--sway-seconds": `${swaySeconds}s`,
  } as CSSProperties;

  return (
    <div className={styles.layer} style={variables}>
      <svg className={styles.definitions} aria-hidden="true">
        <defs>
          <LeafPattern depth={depth} />
        </defs>
      </svg>
      <HedgeHalf depth={depth} half="top" />
      <HedgeHalf depth={depth} half="bottom" />
    </div>
  );
}
