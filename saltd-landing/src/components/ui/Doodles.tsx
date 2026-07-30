'use client';
/**
 * Hand-drawn lime doodles for the playful, refreshing vibe.
 * Each is a small absolutely-positioned SVG - drop into any section.
 */
const LIME = '#2E5BFF';

export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg width="70" height="20" viewBox="0 0 70 20" fill="none" className={className}>
      <path d="M2 12 C12 2, 22 18, 32 10 S52 2, 68 12" stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className={className}>
      <path d="M13 1 C13 8, 14 12, 25 13 C14 14, 13 18, 13 25 C13 18, 12 14, 1 13 C12 12, 13 8, 13 1 Z" fill={LIME} />
    </svg>
  );
}

export function Loop({ className = '' }: { className?: string }) {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className={className}>
      <path d="M4 30 C4 10, 24 4, 30 18 C34 28, 18 34, 18 22 C18 12, 40 10, 52 24"
        stroke={LIME} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Wave({ className = '', color = LIME }: { className?: string; color?: string }) {
  return (
    <svg width="180" height="8" viewBox="0 0 180 8" fill="none" className={className}>
      <path d="M0 4 C30 0, 60 8, 90 4 S150 0, 180 4" stroke={color} strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function Dashes({ className = '' }: { className?: string }) {
  return (
    <svg width="34" height="40" viewBox="0 0 34 40" fill="none" className={className}>
      <path d="M6 32 L18 20" stroke={LIME} strokeWidth="3" strokeLinecap="round" />
      <path d="M14 36 L26 24" stroke={LIME} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 24 L12 14" stroke={LIME} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
