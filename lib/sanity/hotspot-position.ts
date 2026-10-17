import type { SanityHotspot } from "./types";

const CENTER = "50% 50%";

export function hotspotPosition(hotspot?: SanityHotspot | null): string {
  if (!hotspot) return CENTER;
  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
