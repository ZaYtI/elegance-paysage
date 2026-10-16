const AUTOPLAY_SECONDS = 4.5;

export function buildAutoplayProgress(elapsedSeconds: number) {
  const t = Math.min(1, Math.max(0, elapsedSeconds / AUTOPLAY_SECONDS));
  return t * t * (3 - 2 * t);
}
