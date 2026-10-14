"use client";

import { useState } from "react";
import type { NavLink } from "@/lib/site-data";
import { BurgerButton } from "./burger-button";
import { MobileMenu } from "./mobile-menu";

type HeaderMenuProps = {
  links: NavLink[];
};

export function HeaderMenu({ links }: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BurgerButton isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)} />
      {isOpen ? <MobileMenu links={links} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}
