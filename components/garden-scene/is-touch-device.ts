const TOUCH_QUERY = "(pointer: coarse)";

export function isTouchDevice() {
  return window.matchMedia(TOUCH_QUERY).matches;
}
