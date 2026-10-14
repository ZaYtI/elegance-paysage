"use client";

import { useRef } from "react";
import { useLitWordCount } from "./use-lit-word-count";
import styles from "./manifesto-heading.module.css";

const WORDS = "Une jeune entreprise, des standards professionnels dès le premier chantier.".split(" ");

export function ManifestoHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const litWordCount = useLitWordCount(headingRef, WORDS.length);

  return (
    <h2 ref={headingRef} className="section-title">
      {WORDS.map((word, index) => (
        <span key={`${word}-${index}`} className={index < litWordCount ? styles.lit : styles.word}>
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
