import type { JSX } from "react";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps): JSX.Element {
  return (
    <svg
      className={`brand-mark ${className}`.trim()}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="2" y="2" width="28" height="28" rx="6" stroke="#8b5cf6" strokeWidth="2" />
      <path
        d="M9 16h6l4-7 4 14 3-7h5"
        stroke="#636EF1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
