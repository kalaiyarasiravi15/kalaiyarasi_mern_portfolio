import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function ArrowIcon({ size = 26, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 12h15m0 0-5.5-5.5M19.5 12 14 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Six-blade pinwheel star used beside every section label. */
export function StarIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10.6 8.96 10 .3q2.05 3.01 4.46 5.54-1.55 2.04-3.86 3.12ZM11.2 10l7.2-4.85q-1.58 3.28-2.57 6.63-2.54-.32-4.63-1.78ZM10.6 11.04l7.8 3.81q-3.63.27-7.03 1.09-.99-2.36-.77-4.9ZM9.4 11.04l.6 8.66q-2.05-3.01-4.46-5.54 1.55-2.04 3.86-3.12ZM8.8 10l-7.2 4.85q1.58-3.28 2.57-6.63 2.54.32 4.63 1.78ZM9.4 8.96 1.6 5.15q3.63-.27 7.03-1.09.99 2.36.77 4.9Z" />
    </svg>
  );
}

export function EyesIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <ellipse cx="6.4" cy="10" rx="3.4" ry="4.6" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="13.6" cy="10" rx="3.4" ry="4.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7.6" cy="10.4" r="1.7" fill="currentColor" />
      <circle cx="14.8" cy="10.4" r="1.7" fill="currentColor" />
    </svg>
  );
}
