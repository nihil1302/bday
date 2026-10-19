import React from 'react';

/**
 * Handcrafted SVG doodle components for subtle scrapbook aesthetics
 */

export const FlowerDoodle = ({ className = "w-6 h-6 text-rose-300" }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Petals */}
    <circle cx="20" cy="11" r="7" fill="currentColor" opacity="0.85" />
    <circle cx="29" cy="20" r="7" fill="currentColor" opacity="0.85" />
    <circle cx="20" cy="29" r="7" fill="currentColor" opacity="0.85" />
    <circle cx="11" cy="20" r="7" fill="currentColor" opacity="0.85" />
    {/* Diagonal Petals for fuller flower */}
    <circle cx="13" cy="13" r="6" fill="currentColor" opacity="0.75" />
    <circle cx="27" cy="13" r="6" fill="currentColor" opacity="0.75" />
    <circle cx="27" cy="27" r="6" fill="currentColor" opacity="0.75" />
    <circle cx="13" cy="27" r="6" fill="currentColor" opacity="0.75" />
    {/* Center Core */}
    <circle cx="20" cy="20" r="5" fill="#FDE68A" />
    <circle cx="20" cy="20" r="2.5" fill="#F59E0B" opacity="0.5" />
  </svg>
);

export const DaisyDoodle = ({ className = "w-6 h-6 text-amber-200" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="16" cy="7" rx="3" ry="5" fill="currentColor" opacity="0.9" />
    <ellipse cx="16" cy="25" rx="3" ry="5" fill="currentColor" opacity="0.9" />
    <ellipse cx="7" cy="16" rx="5" ry="3" fill="currentColor" opacity="0.9" />
    <ellipse cx="25" cy="16" rx="5" ry="3" fill="currentColor" opacity="0.9" />
    <circle cx="16" cy="16" r="4.5" fill="#F59E0B" />
  </svg>
);

export const SparkleDoodle = ({ className = "w-5 h-5 text-amber-400" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

export const HeartDoodle = ({ className = "w-5 h-5 text-rose-400" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const LeafDoodle = ({ className = "w-5 h-5 text-emerald-300" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="currentColor" fillOpacity="0.25" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
