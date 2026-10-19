import { getDisplayedBuildProgress, getJourneyGeometry } from "@/components/garden-scene/hero-build-state";
import { isTouchDevice } from "@/components/garden-scene/is-touch-device";

const LEAD = 0.25;
const BUILD_COMPLETE = 0.999;

function getMaxScroll() {
  const displayed = getDisplayedBuildProgress();
  const geometry = getJourneyGeometry();
  if (!geometry || displayed >= BUILD_COMPLETE) return Infinity;
  return geometry.top + (displayed + LEAD) * geometry.distance;
}

function isPastJourney(scrollY: number) {
  const geometry = getJourneyGeometry();
  return !geometry || scrollY > geometry.top + geometry.distance;
}

export function limitDownwardDelta(scrollY: number, deltaY: number) {
  if (deltaY <= 0 || isTouchDevice() || isPastJourney(scrollY)) return deltaY;
  const room = getMaxScroll() - scrollY;
  return Math.max(0, Math.min(deltaY, room));
}
