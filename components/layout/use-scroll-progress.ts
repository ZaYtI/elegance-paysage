import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.width = `${Math.min(progress, 1) * 100}%`;
    };

    updateWidth();
    window.addEventListener("scroll", updateWidth, { passive: true });
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("scroll", updateWidth);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return barRef;
}
