let markReady: () => void = () => {};

const heroReady = new Promise<void>((resolve) => {
  markReady = resolve;
});

export function markHeroReady() {
  markReady();
}

export function whenHeroReady() {
  return heroReady;
}
