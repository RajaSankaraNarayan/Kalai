import React from 'react';

interface VelIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const VelIcon: React.FC<VelIconProps> = ({
  className = '',
  size = 64,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      style={{
        filter: glow
          ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.85)) drop-shadow(0 0 26px rgba(212, 175, 55, 0.4))'
          : undefined,
      }}
    >
      <defs>
        {/* Gold Gradients */}
        <linearGradient id="velGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#F5D67B" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#A67C1E" />
          <stop offset="100%" stopColor="#664D0F" />
        </linearGradient>
        <linearGradient id="velGoldHighlight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F5D67B" />
          <stop offset="100%" stopColor="#8B6B1F" />
        </linearGradient>
        <linearGradient id="velShaftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#664D0F" />
          <stop offset="35%" stopColor="#F5D67B" />
          <stop offset="65%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#4A370A" />
        </linearGradient>

        {/* Jewels */}
        <radialGradient id="rubyGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF6B93" />
          <stop offset="40%" stopColor="#C41E3A" />
          <stop offset="80%" stopColor="#7A1F3D" />
          <stop offset="100%" stopColor="#3B0715" />
        </radialGradient>
        <radialGradient id="emeraldGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4EBA7D" />
          <stop offset="40%" stopColor="#198754" />
          <stop offset="80%" stopColor="#0F5132" />
          <stop offset="100%" stopColor="#052014" />
        </radialGradient>
        <radialGradient id="diamondGlow" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
      </defs>

      {/* Vel Shaft / Base Handle */}
      <rect x="46" y="118" width="8" height="40" rx="4" fill="url(#velShaftGradient)" stroke="#8B6B1F" strokeWidth="0.8" />
      <ellipse cx="50" cy="120" rx="7" ry="3" fill="#F5D67B" />
      <ellipse cx="50" cy="138" rx="6" ry="2.5" fill="#D4AF37" />

      {/* Lower Ornate Base / Peedam */}
      <path
        d="M 38 118 C 38 112, 44 108, 50 108 C 56 108, 62 112, 62 118 C 60 121, 40 121, 38 118 Z"
        fill="url(#velGoldGradient)"
        stroke="#664D0F"
        strokeWidth="1"
      />
      <circle cx="50" cy="113" r="2.5" fill="url(#rubyGlow)" />

      {/* Main Spearhead Silhouette (Teardrop / Leaf Blade) */}
      <path
        d="M 50 6
           C 54 18, 70 42, 84 64
           C 94 79, 90 98, 76 108
           C 66 115, 58 116, 50 116
           C 42 116, 34 115, 24 108
           C 10 98, 6 79, 16 64
           C 30 42, 46 18, 50 6 Z"
        fill="url(#velGoldGradient)"
        stroke="#8B6B1F"
        strokeWidth="1.8"
      />

      {/* Center Spine Ridge */}
      <path
        d="M 50 8 L 50 114"
        stroke="url(#velGoldHighlight)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Left Blade Bevel Shadow */}
      <path
        d="M 50 6
           C 46 18, 30 42, 16 64
           C 6 79, 10 98, 24 108
           C 34 115, 42 116, 50 116 Z"
        fill="black"
        fillOpacity="0.14"
      />

      {/* Outer Jewel Border - Emeralds & Rubies rim */}
      {/* Outer beaded dots */}
      <path
        d="M 50 14 C 53 24, 66 45, 78 64 C 86 76, 83 90, 72 98 C 64 104, 57 105, 50 105 C 43 105, 36 104, 28 98 C 17 90, 14 76, 22 64 C 34 45, 47 24, 50 14 Z"
        fill="none"
        stroke="#664D0F"
        strokeWidth="0.8"
        strokeDasharray="2, 4"
      />

      {/* Emerald rim accents */}
      <circle cx="50" cy="18" r="2.2" fill="url(#rubyGlow)" />
      <circle cx="62" cy="34" r="2" fill="url(#emeraldGlow)" />
      <circle cx="72" cy="50" r="2" fill="url(#rubyGlow)" />
      <circle cx="80" cy="68" r="2" fill="url(#emeraldGlow)" />
      <circle cx="80" cy="84" r="2" fill="url(#rubyGlow)" />
      <circle cx="70" cy="98" r="2" fill="url(#emeraldGlow)" />

      <circle cx="38" cy="34" r="2" fill="url(#emeraldGlow)" />
      <circle cx="28" cy="50" r="2" fill="url(#rubyGlow)" />
      <circle cx="20" cy="68" r="2" fill="url(#emeraldGlow)" />
      <circle cx="20" cy="84" r="2" fill="url(#rubyGlow)" />
      <circle cx="30" cy="98" r="2" fill="url(#emeraldGlow)" />

      {/* Tripundra / Vibhuti Triple-Stripe Motif with Central Ruby Bindu */}
      <g transform="translate(0, -2)">
        {/* Stripe 1 */}
        <rect x="36" y="52" width="28" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.95" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />
        {/* Stripe 2 */}
        <rect x="34" y="57" width="32" height="3.2" rx="1.6" fill="#FFFFFF" fillOpacity="0.95" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />
        {/* Stripe 3 */}
        <rect x="36" y="62" width="28" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.95" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />

        {/* Central Red Kumkum / Ruby Dot */}
        <circle cx="50" cy="58.6" r="3.2" fill="url(#rubyGlow)" stroke="#FFF2B2" strokeWidth="0.8" filter="drop-shadow(0 0 4px #FF6B93)" />
      </g>

      {/* Lower Jewelled Medallion (Padmam & Gem Cluster) */}
      <g transform="translate(0, 10)">
        <ellipse cx="50" cy="85" rx="12" ry="9" fill="url(#velGoldGradient)" stroke="#8B6B1F" strokeWidth="1" />
        <circle cx="50" cy="85" r="4.5" fill="url(#emeraldGlow)" stroke="#FFF2B2" strokeWidth="0.8" />
        {/* Surrounding Petal Diamonds */}
        <circle cx="50" cy="77" r="1.8" fill="url(#diamondGlow)" />
        <circle cx="56" cy="80" r="1.8" fill="url(#rubyGlow)" />
        <circle cx="58" cy="86" r="1.8" fill="url(#diamondGlow)" />
        <circle cx="55" cy="91" r="1.8" fill="url(#rubyGlow)" />
        <circle cx="50" cy="93" r="1.8" fill="url(#diamondGlow)" />
        <circle cx="45" cy="91" r="1.8" fill="url(#rubyGlow)" />
        <circle cx="42" cy="86" r="1.8" fill="url(#diamondGlow)" />
        <circle cx="44" cy="80" r="1.8" fill="url(#rubyGlow)" />
      </g>
    </svg>
  );
};
