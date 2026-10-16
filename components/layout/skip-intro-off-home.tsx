"use client";

import { useEffect } from "react";
import { markIntroDone } from "@/components/home/intro-loader/intro-storage";

export function SkipIntroOffHome() {
  useEffect(() => {
    if (window.location.pathname !== "/") markIntroDone();
  }, []);

  return null;
}
