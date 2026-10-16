import { shadeHex } from "./color-shade";
import { leafGradientId } from "./leaf-ids";

type LeafGradientsProps = {
  scope: string;
  fills: string[];
};

export function LeafGradients({ scope, fills }: LeafGradientsProps) {
  return (
    <>
      {fills.map((fill) => (
        <linearGradient key={fill} id={leafGradientId(scope, fill)} x1="0.2" y1="1" x2="0.8" y2="0">
          <stop offset="0" stopColor={shadeHex(fill, -0.3)} />
          <stop offset="0.55" stopColor={fill} />
          <stop offset="1" stopColor={shadeHex(fill, 0.2)} />
        </linearGradient>
      ))}
    </>
  );
}
