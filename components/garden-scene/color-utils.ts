import { Color } from "three";

export type Rgb = [number, number, number];

const scratchColor = new Color();

export function hexToLinearRgb(hex: number): Rgb {
  scratchColor.setHex(hex);
  return [scratchColor.r, scratchColor.g, scratchColor.b];
}

export function mixRgb(from: Rgb, to: Rgb, amount: number, brightness: number): Rgb {
  return [
    (from[0] + (to[0] - from[0]) * amount) * brightness,
    (from[1] + (to[1] - from[1]) * amount) * brightness,
    (from[2] + (to[2] - from[2]) * amount) * brightness,
  ];
}
