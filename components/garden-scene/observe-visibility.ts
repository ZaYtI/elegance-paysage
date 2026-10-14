export function observeVisibility(element: Element, onChange: (visible: boolean) => void): () => void {
  let intersecting = true;
  const report = () => onChange(intersecting && !document.hidden);

  const observer = new IntersectionObserver((entries) => {
    intersecting = entries[entries.length - 1].isIntersecting;
    report();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", report);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", report);
  };
}
