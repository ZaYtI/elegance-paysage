"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoLockup } from "@/components/logo-lockup";
import { nav } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-950 text-paper border-b border-white/10">
      <nav className="mx-auto max-w-290 px-7 py-3.5 flex items-center justify-between">
        <a href="#top" className="flex items-center text-paper no-underline">
          <LogoLockup onDark className="h-10 w-auto" />
        </a>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-2xl bg-transparent border-0 text-paper cursor-pointer"
        >
          ☰
        </button>

        <ul
          className={cn(
            "md:flex md:static md:flex-row md:gap-7 md:bg-transparent md:p-0 md:border-0",
            "list-none m-0 gap-4",
            open
              ? "flex flex-col absolute top-full left-0 right-0 bg-ink-950 px-7 py-4.5 border-b border-white/10"
              : "hidden"
          )}
        >
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[0.9rem] no-underline text-paper opacity-85 pb-0.75 border-b border-transparent transition-[opacity,border-color] duration-150 hover:opacity-100 hover:border-gold-600"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          render={<a href="#contact" />}
          nativeButton={false}
          className="hidden md:inline-flex bg-paper text-ink-950 hover:bg-bark-700 hover:text-white rounded-[3px]"
        >
          Devis gratuit
        </Button>
      </nav>
    </header>
  );
}
