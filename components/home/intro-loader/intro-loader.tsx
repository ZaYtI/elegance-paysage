"use client";

import { CutLine } from "./cut-line";
import { FallingLeaves } from "./falling-leaves";
import { HedgeLayer } from "./hedge-layer";
import { HEDGE_RENDER_ORDER } from "./hedge-depths";
import { IntroBrand } from "./intro-brand";
import { TIMING_VARIABLES } from "./intro-timing";
import { IntroVignette } from "./intro-vignette";
import styles from "./intro-loader.module.css";
import { useIntroPhase } from "./use-intro-phase";

export function IntroLoader() {
  const phase = useIntroPhase();
  if (phase === "gone") return null;

  return (
    <div className={styles.root} data-phase={phase} style={TIMING_VARIABLES} aria-hidden="true">
      {HEDGE_RENDER_ORDER.map((depth) => (
        <HedgeLayer key={depth} depth={depth} />
      ))}
      <IntroVignette />
      <IntroBrand />
      <CutLine />
      <FallingLeaves />
    </div>
  );
}
