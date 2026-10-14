"use client";

import type { ReactNode } from "react";
import { LightboxNavButton } from "./lightbox-nav-button";
import { LightboxTopBar } from "./lightbox-top-bar";
import { useDialogBehavior } from "./use-dialog-behavior";
import { useSwipe } from "./use-swipe";
import styles from "./lightbox.module.css";

type LightboxProps = {
  eyebrow?: string;
  title: string;
  current: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  footer?: ReactNode;
  children: ReactNode;
};

export function Lightbox({
  eyebrow,
  title,
  current,
  total,
  onClose,
  onPrevious,
  onNext,
  footer,
  children,
}: LightboxProps) {
  const dialogRef = useDialogBehavior({ onClose, onPrevious, onNext });
  const swipeHandlers = useSwipe({ onSwipeLeft: onNext, onSwipeRight: onPrevious });

  return (
    <div ref={dialogRef} className={styles.overlay} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
      <LightboxTopBar eyebrow={eyebrow} title={title} current={current} total={total} onClose={onClose} />

      <div className={styles.stage} {...swipeHandlers}>
        <div key={current} className={styles.media}>
          {children}
        </div>
        <LightboxNavButton direction="previous" onClick={onPrevious} />
        <LightboxNavButton direction="next" onClick={onNext} />
      </div>

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}
