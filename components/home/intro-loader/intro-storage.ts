const SEEN_KEY = "elegance-intro-seen";

let playedInThisDocument = false;

export const INTRO_SKIP_SCRIPT = `try{if(sessionStorage.getItem("${SEEN_KEY}"))document.documentElement.dataset.intro="skip"}catch(e){}setTimeout(function(){var d=document.documentElement.dataset;if(!d.intro)d.intro="done"},4000)`;

export function isIntroSkipped() {
  return document.documentElement.dataset.intro === "skip" || document.documentElement.dataset.intro === "done";
}

export function hasIntroPlayedInThisDocument() {
  return playedInThisDocument;
}

export function markIntroDone() {
  playedInThisDocument = true;
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
}
