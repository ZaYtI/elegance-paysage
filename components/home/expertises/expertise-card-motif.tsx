import { BarsMotif } from "./bars-motif";
import type { ExpertiseCardStyle } from "./expertise-cards";
import { LeavesMotif } from "./leaves-motif";
import { RingsMotif } from "./rings-motif";

type ExpertiseCardMotifProps = {
  card: ExpertiseCardStyle;
};

export function ExpertiseCardMotif({ card }: ExpertiseCardMotifProps) {
  const motifProps = { color: card.motifColor, opacity: card.motifOpacity };

  switch (card.motif) {
    case "leaves":
      return <LeavesMotif {...motifProps} />;
    case "rings":
      return <RingsMotif {...motifProps} />;
    case "bars":
      return <BarsMotif {...motifProps} />;
    default:
      return null;
  }
}
