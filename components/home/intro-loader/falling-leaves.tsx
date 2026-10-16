import type { CSSProperties } from "react";
import { LEAF_VARIANTS } from "./leaf-variants";
import { createRandom } from "./foliage";
import { LeafGradients } from "./leaf-gradients";
import { LeafShape } from "./leaf-shape";
import { LeafSymbols } from "./leaf-symbols";
import styles from "./falling-leaves.module.css";

const LEAF_COUNT = 10;
const SCOPE = "falling";
const FILLS = ["#514b40", "#5a5346", "#6c5d4f", "#a0a794"];

function buildFallingLeaves() {
  const random = createRandom(97);
  return Array.from({ length: LEAF_COUNT }, (_, index) => ({
    left: 8 + (index / (LEAF_COUNT - 1)) * 84 + random() * 4,
    size: 16 + random() * 14,
    drift: (random() - 0.5) * 120,
    fall: 180 + random() * 200,
    spin: (random() > 0.5 ? 1 : -1) * (180 + random() * 260),
    delay: random() * 160,
    fill: FILLS[Math.floor(random() * FILLS.length)],
    variant: Math.floor(random() * LEAF_VARIANTS.length),
  }));
}

const FALLING_LEAVES = buildFallingLeaves();

export function FallingLeaves() {
  return (
    <>
      <svg className={styles.definitions} aria-hidden="true">
        <defs>
          <LeafGradients scope={SCOPE} fills={FILLS} />
          <LeafSymbols scope={SCOPE} withLaterals />
        </defs>
      </svg>
      {FALLING_LEAVES.map((leaf, index) => {
        const variables = {
          left: `${leaf.left.toFixed(1)}%`,
          width: leaf.size.toFixed(1),
          height: leaf.size.toFixed(1),
          "--drift": `${leaf.drift.toFixed(0)}px`,
          "--fall": `${leaf.fall.toFixed(0)}px`,
          "--spin": `${leaf.spin.toFixed(0)}deg`,
          "--delay": `${leaf.delay.toFixed(0)}ms`,
        } as CSSProperties;
        return (
          <svg key={index} className={styles.leaf} style={variables} viewBox="-1.25 -1.25 2.5 2.5">
            <LeafShape
              leaf={{ x: 0, y: 0, rotation: 0, size: 0.9, fill: leaf.fill, variant: leaf.variant }}
              scope={SCOPE}
              midrib="rgba(160, 167, 148, 0.5)"
            />
          </svg>
        );
      })}
    </>
  );
}
