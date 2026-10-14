type ProcessStepIconProps = {
  stepNumber: string;
  className?: string;
};

const iconPaths: Record<string, string[]> = {
  "01": ["M7 3h8l4 4v14H7z", "M15 3v4h4", "M10 12h6", "M10 16h4"],
  "02": ["M14.5 6.5l3 3", "M4 20l9-9", "M13 5l2-2 6 6-2 2", "M6 14l4 4"],
  "03": ["M4 12.5l5 5L20 6.5"],
};

export function ProcessStepIcon({ stepNumber, className }: ProcessStepIconProps) {
  const paths = iconPaths[stepNumber] ?? [];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
