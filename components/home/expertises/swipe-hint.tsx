export function SwipeHint() {
  return (
    <span className="mt-[18px] hidden items-center gap-2 text-[11px] uppercase tracking-[1.4px] text-bark-700 max-[650px]:inline-flex">
      <span>Faites glisser</span>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
