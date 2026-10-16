"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type BrandLinkProps = {
  className?: string;
  children: ReactNode;
};

export function BrandLink({ className, children }: BrandLinkProps) {
  const isHome = usePathname() === "/";

  function scrollToTopOnHome(event: MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link href="/" className={className} onClick={scrollToTopOnHome}>
      {children}
    </Link>
  );
}
