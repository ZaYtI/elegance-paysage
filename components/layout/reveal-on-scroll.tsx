"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const VISIBLE_RATIO = 0.15;

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: VISIBLE_RATIO },
    );

    document.querySelectorAll(".reveal:not(.is-revealed)").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
