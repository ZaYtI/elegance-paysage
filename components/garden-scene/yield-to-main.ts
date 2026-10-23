type SchedulerYield = { yield: () => Promise<void> };

export function yieldToMain(): Promise<void> {
  const schedulerYield = (globalThis as { scheduler?: SchedulerYield }).scheduler?.yield;
  if (schedulerYield) return schedulerYield.call((globalThis as { scheduler?: SchedulerYield }).scheduler);
  return new Promise((resolve) => setTimeout(resolve, 0));
}
