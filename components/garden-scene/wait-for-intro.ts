const SAFETY_TIMEOUT_MS = 4000;

function isIntroFinished() {
  return document.documentElement.dataset.intro === "done";
}

export function waitForIntro(onFinished: () => void) {
  if (isIntroFinished()) {
    onFinished();
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (isIntroFinished()) finish();
  });
  const timeout = window.setTimeout(() => finish(), SAFETY_TIMEOUT_MS);

  function finish() {
    stop();
    onFinished();
  }

  function stop() {
    observer.disconnect();
    window.clearTimeout(timeout);
  }

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return stop;
}
