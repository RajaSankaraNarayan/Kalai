import React from 'react';

interface PatternProps {
  className?: string;
}

/**
 * Authentic Sacred Sikku Kolam (Brahma Mudi) Vector Icon
 */
export const SikkuKolamIcon: React.FC<PatternProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="kolamGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fae17d" />
          <stop offset="50%" stopColor="#dcb044" />
          <stop offset="100%" stopColor="#a37820" />
        </linearGradient>
      </defs>
      
      {/* 9-Pulli Sacred Matrix */}
      <circle cx="50" cy="50" r="2.2" fill="url(#kolamGoldGrad)" />
      <circle cx="50" cy="28" r="1.8" fill="url(#kolamGoldGrad)" />
      <circle cx="50" cy="72" r="1.8" fill="url(#kolamGoldGrad)" />
      <circle cx="28" cy="50" r="1.8" fill="url(#kolamGoldGrad)" />
      <circle cx="72" cy="50" r="1.8" fill="url(#kolamGoldGrad)" />
      <circle cx="34" cy="34" r="1.5" fill="url(#kolamGoldGrad)" />
      <circle cx="66" cy="34" r="1.5" fill="url(#kolamGoldGrad)" />
      <circle cx="34" cy="66" r="1.5" fill="url(#kolamGoldGrad)" />
      <circle cx="66" cy="66" r="1.5" fill="url(#kolamGoldGrad)" />

      {/* 4-Fold Symmetrical Brahma Mudi Loop */}
      {[0, 90, 180, 270].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M 44 32 C 44 18, 56 18, 56 32 C 56 40, 68 40, 68 48 C 68 56, 56 56, 50 50 C 44 44, 44 38, 44 32 Z"
            fill="none"
            stroke="url(#kolamGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      
      {/* Center Bindu */}
      <circle cx="50" cy="50" r="4.5" fill="none" stroke="url(#kolamGoldGrad)" strokeWidth="1" />
    </svg>
  );
};

/**
 * Sacred Geometric Mandala Icon
 */
export const MandalaIcon: React.FC<PatternProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />

      {/* 8-Petal Geometry */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M 50 24 C 46 32, 46 40, 50 46 C 54 40, 54 32, 50 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="50" cy="18" r="1.5" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
};

/**
 * Corner Ornamental Filigree in Bronze & Gold
 */
export const CornerOrnament: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  flipX?: boolean;
  flipY?: boolean;
}> = ({ className = 'w-4 h-4', position = 'top-left', flipX = false, flipY = false }) => {
  let transformClasses = '';
  if (flipX && flipY) {
    transformClasses = '-scale-x-100 -scale-y-100';
  } else if (flipX) {
    transformClasses = '-scale-x-100';
  } else if (flipY) {
    transformClasses = '-scale-y-100';
  } else if (position === 'top-right') {
    transformClasses = 'rotate-90';
  } else if (position === 'bottom-right') {
    transformClasses = 'rotate-180';
  } else if (position === 'bottom-left') {
    transformClasses = '-rotate-90';
  }

  return (
    <svg
      viewBox="0 0 40 40"
      className={`${className} ${transformClasses} pointer-events-none text-[#c89d42]/60`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 2 L 20 2 C 14 6, 6 14, 2 20 Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M 2 2 L 34 2 C 26 8, 8 26, 2 34 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6" cy="6" r="1.5" fill="#fae17d" />
      <circle cx="16" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="16" r="1" fill="currentColor" />
    </svg>
  );
};

