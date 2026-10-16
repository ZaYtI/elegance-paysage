const MAX_RISE_PER_SECOND = 1.6;

export function limitProgressRise(current: number, next: number, seconds: number) {
  return Math.min(next, current + MAX_RISE_PER_SECOND * seconds);
}
