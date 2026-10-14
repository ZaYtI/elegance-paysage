import { useEffect } from "react";

const DESKTOP_QUERY = "(min-width: 651px)";

export function useMobileMenuDismissal(onClose: () => void) {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
}
