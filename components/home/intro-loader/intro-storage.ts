let playedInThisDocument = false;

export function hasIntroPlayedInThisDocument() {
  return playedInThisDocument;
}

export function markIntroDone() {
  playedInThisDocument = true;
  document.documentElement.dataset.intro = "done";
}
