export type JourneyGeometry = {
  top: number;
  distance: number;
};

type GeometryProvider = () => JourneyGeometry;

let displayedProgress = 0;
let geometryProvider: GeometryProvider | null = null;

export function setDisplayedBuildProgress(progress: number) {
  displayedProgress = progress;
}

export function getDisplayedBuildProgress() {
  return displayedProgress;
}

export function registerJourneyGeometry(provider: GeometryProvider) {
  geometryProvider = provider;
  return () => {
    if (geometryProvider === provider) geometryProvider = null;
  };
}

export function getJourneyGeometry() {
  return geometryProvider?.() ?? null;
}
