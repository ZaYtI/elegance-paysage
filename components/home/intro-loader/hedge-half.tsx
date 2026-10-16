import { leafPatternId } from "./leaf-pattern";
import type { HedgeDepth } from "./hedge-depths";
import styles from "./hedge-half.module.css";

type HedgeHalfProps = {
  depth: HedgeDepth;
  half: "top" | "bottom";
};

export function HedgeHalf({ depth, half }: HedgeHalfProps) {
  return (
    <div className={styles.half} data-half={half} data-depth={depth}>
      <svg className={styles.foliage}>
        <rect width="100%" height="100%" fill={`url(#${leafPatternId(depth)})`} />
      </svg>
    </div>
  );
}
