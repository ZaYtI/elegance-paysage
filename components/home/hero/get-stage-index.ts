const STAGE_END_PROGRESS = [0.1, 0.36, 0.64, 0.82];

export function getStageIndex(progress: number) {
  const index = STAGE_END_PROGRESS.findIndex((end) => progress < end);
  return index === -1 ? STAGE_END_PROGRESS.length : index;
}
