export function HeroGrain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.06] mix-blend-overlay"
    >
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
  );
}
