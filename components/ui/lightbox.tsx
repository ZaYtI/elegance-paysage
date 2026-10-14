"use client";

import type { ReactNode } from "react";
import { useDialogBehavior } from "./use-dialog-behavior";
import styles from "./lightbox.module.css";

type LightboxProps = {
  title: string;
  indexLabel: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
};

export function Lightbox({ title, indexLabel, onClose, onPrevious, onNext, children }: LightboxProps) {
  const dialogRef = useDialogBehavior({ onClose, onPrevious, onNext });

  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className={styles.box} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}>
        <div className={styles.row}>
          <span className={styles.title}>{title}</span>
          <button type="button" className={styles.button} onClick={onClose}>Fermer</button>
        </div>
        <div className={styles.media}>{children}</div>
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={onPrevious}>Précédente</button>
          <span className={styles.index}>{indexLabel}</span>
          <button type="button" className={styles.button} onClick={onNext}>Suivante</button>
        </div>
      </div>
    </div>
  );
}
