export type ProgressSource = {
  current: number;
  set: (progress: number) => void;
  subscribe: (listener: (progress: number) => void) => () => void;
};

export function createProgressSource(): ProgressSource {
  const listeners = new Set<(progress: number) => void>();
  const source: ProgressSource = {
    current: 0,
    set: (progress) => {
      source.current = progress;
      listeners.forEach((listener) => listener(progress));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
  return source;
}
