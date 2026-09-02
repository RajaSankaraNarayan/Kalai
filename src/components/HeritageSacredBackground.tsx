import React from 'react';
import { useParallaxScroll } from '../hooks/useParallaxScroll';

interface HeritageSacredBackgroundProps {
  isRevealed?: boolean;
  className?: string;
  scrollYOffset?: number;
}

/**
 * Neo-Classical Black & Gold Heritage Ambient Background
 * Features:
 * 1. Traditional Embroidery Patterns (Kasuti, Toda, Kanchipuram Zari)
 * 2. Sacred Kolams (Sikku Kolam / Brahma Mudi, Lotus Mandala, Pulli matrices)
 * 3. Temple Animal Motifs (Yaazhi guardian beast, Gaja royal elephant, Mayil peacock, Nandi sacred bull)
 * 4. Classical Performance & Temple Masks (Theyyam, Kathakali, Kirtimukha arch guardian)
 */
export const HeritageSacredBackground: React.FC<HeritageSacredBackgroundProps> = ({
  isRevealed = true,
  className = '',
  scrollYOffset,
}) => {
  const hookScrollY = useParallaxScroll();
  const scrollY = scrollYOffset !== undefined ? scrollYOffset : hookScrollY;

  // Parallax offsets for dynamic 3D depth
  const driftY1 = scrollY * 0.08;
  const driftY2 = scrollY * -0.12;
  const driftY3 = scrollY * 0.18;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
    >
      {/* 0. Deep Cosmic Obsidian Base with Subtle Radial Gold Hearth */}
      <div className="absolute inset-0 bg-[#07080b]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#c89d4218_0%,#07080b_75%)]" />

      {/* 1. Geometric Gold Zari Embroidery Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,#c89d4218_1px,transparent_1px),linear-gradient(to_bottom,#c89d4218_1px,transparent_1px)] bg-[size:48px_48px]"
        style={{
          transform: `translate3d(0, ${driftY1 * 0.5}px, 0)`,
        }}
      />

      {/* 2. Microscopic Kasuti & Toda Embroidery Cross-Stitch Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fae17d_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* 3. Master Vector Canvas containing Kolams, Animal Patterns & Masks */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Shimmer Gradients */}
          <linearGradient id="bgGoldGleam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae17d" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#dcb044" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8a611b" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="embroideryThread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a611b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#fae17d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8a611b" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="maskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fae17d" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#c89d42" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="kolamLotusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fae17d" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#c89d42" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Reusable Sikku Kolam (Brahma Mudi) Component */}
          <g id="sikkuKolamMotif">
            <circle cx="0" cy="0" r="16" fill="url(#kolamLotusGlow)" />
            <circle cx="0" cy="0" r="4" fill="#fae17d" opacity="0.8" />
            {/* 4 Loop Quadrants */}
            {[0, 90, 180, 270].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  d="M -12 -12 C -24 -24, 0 -36, 12 -24 C 24 -12, 36 0, 24 12 C 12 24, -12 24, 0 0 Z"
                  fill="none"
                  stroke="url(#bgGoldGleam)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.75"
                />
                <circle cx="0" cy="-28" r="2.5" fill="#fae17d" opacity="0.9" />
                <circle cx="-20" cy="-20" r="1.8" fill="#c89d42" opacity="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="32" fill="none" stroke="#c89d42" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />
          </g>

          {/* Reusable Toda / Kasuti Geometric Embroidery Diamond */}
          <g id="embroideryDiamond">
            <polygon points="0,-40 40,0 0,40 -40,0" fill="none" stroke="url(#bgGoldGleam)" strokeWidth="1.5" opacity="0.6" />
            <polygon points="0,-28 28,0 0,28 -28,0" fill="none" stroke="#fae17d" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <polygon points="0,-14 14,0 0,14 -14,0" fill="#c89d42" fillOpacity="0.12" stroke="#fae17d" strokeWidth="1" opacity="0.8" />
            {/* Cross stitches on vertices */}
            <path d="M -5 -40 L 5 -40 M 0 -45 L 0 -35" stroke="#fae17d" strokeWidth="1.2" opacity="0.8" />
            <path d="M -5 40 L 5 40 M 0 35 L 0 45" stroke="#fae17d" strokeWidth="1.2" opacity="0.8" />
            <path d="M 40 -5 L 40 5 M 35 0 L 45 0" stroke="#fae17d" strokeWidth="1.2" opacity="0.8" />
            <path d="M -40 -5 L -40 5 M -45 0 L -35 0" stroke="#fae17d" strokeWidth="1.2" opacity="0.8" />
          </g>

          {/* Reusable Temple Elephant (Gaja) Silhouette with Golden Howdah */}
          <g id="gajaElephantMotif">
            {/* Elephant Silhouette */}
            <path
              d="M -60 30 C -60 -10, -40 -35, -10 -40 C 20 -45, 55 -25, 60 10 C 62 25, 50 40, 40 42 C 30 44, 25 35, 20 28 C 15 20, 5 22, -10 25 C -25 28, -35 45, -45 45 C -55 45, -60 40, -60 30 Z"
              fill="none"
              stroke="url(#bgGoldGleam)"
              strokeWidth="2"
              opacity="0.65"
            />
            {/* Trunk */}
            <path
              d="M 55 -5 C 75 -5, 90 15, 85 35 C 80 50, 68 52, 70 42 C 72 32, 65 15, 48 10"
              fill="none"
              stroke="#fae17d"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Tusk */}
            <path d="M 45 20 C 58 24, 68 20, 72 12" fill="none" stroke="#fae17d" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            {/* Nettipattam (Gold Forehead Plate) & Bell Garland */}
            <path d="M 30 -30 C 40 -20, 45 -5, 38 10" fill="none" stroke="#fae17d" strokeWidth="1.8" strokeDasharray="2 3" opacity="0.8" />
            <circle cx="34" cy="-15" r="3" fill="#fae17d" opacity="0.9" />
            {/* Howdah Saddle on Back */}
            <path d="M -20 -38 L 10 -38 L 5 -55 L -15 -55 Z" fill="#c89d42" fillOpacity="0.2" stroke="#fae17d" strokeWidth="1.5" opacity="0.75" />
            <path d="M -5 -55 L -5 -65 L 0 -65" stroke="#fae17d" strokeWidth="1.5" opacity="0.8" />
          </g>

          {/* Reusable Mythical Yaazhi (Pillar Guardian Beast) */}
          <g id="yaazhiMotif">
            {/* Crown & Horns */}
            <path d="M 0 -50 C 10 -65, 25 -65, 20 -45 C 30 -55, 45 -45, 35 -30" fill="none" stroke="#fae17d" strokeWidth="2" opacity="0.8" />
            {/* Fierce Lion Jaw & Trunk */}
            <path d="M -15 -30 C -5 -40, 25 -40, 30 -20 C 35 -5, 15 5, 0 0 C -15 -5, -20 -20, -15 -30 Z" fill="#c89d42" fillOpacity="0.15" stroke="url(#bgGoldGleam)" strokeWidth="1.8" opacity="0.75" />
            <circle cx="10" cy="-22" r="3" fill="#fae17d" opacity="0.9" />
            {/* Flowing Mane Curls */}
            <path d="M -10 -10 C -25 0, -30 20, -15 35 C -5 45, 10 40, 5 25" fill="none" stroke="#fae17d" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
            <path d="M 5 0 C -5 15, -10 35, 10 45 C 25 50, 35 30, 20 15" fill="none" stroke="#c89d42" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Reusable Kathakali / Theyyam Sacred Mask */}
          <g id="theyyamMaskMotif">
            <circle cx="0" cy="0" r="45" fill="url(#maskGlow)" />
            {/* Ornate Sun-Ray Crown (Kirita) */}
            <path
              d="M -50 -20 C -40 -60, 0 -75, 50 -20 C 40 -15, 30 -35, 0 -45 C -30 -35, -40 -15, -50 -20 Z"
              fill="#c89d42"
              fillOpacity="0.25"
              stroke="#fae17d"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Crown Rays */}
            {[-40, -25, -10, 0, 10, 25, 40].map((deg, i) => (
              <line
                key={i}
                x1={deg * 1.1}
                y1={-45 + Math.abs(deg) * 0.4}
                x2={deg * 1.4}
                y2={-70 + Math.abs(deg) * 0.5}
                stroke="#fae17d"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.75"
              />
            ))}
            {/* Oval Face Contour with White Chutti Ridge */}
            <path
              d="M -30 -15 C -35 15, -20 45, 0 52 C 20 45, 35 15, 30 -15 C 20 -25, -20 -25, -30 -15 Z"
              fill="#080a0f"
              stroke="#fae17d"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Expressive Extended Eyes (Kathakali Kajal contours) */}
            <path d="M -24 -2 C -18 -8, -6 -6, -2 -2 C -8 3, -18 3, -24 -2 Z" fill="none" stroke="#fae17d" strokeWidth="1.6" opacity="0.85" />
            <circle cx="-13" cy="-2" r="2.2" fill="#fae17d" />
            <path d="M 2 -2 C 6 -6, 18 -8, 24 -2 C 18 3, 8 3, 2 -2 Z" fill="none" stroke="#fae17d" strokeWidth="1.6" opacity="0.85" />
            <circle cx="13" cy="-2" r="2.2" fill="#fae17d" />
            {/* Tilak / Third Eye Symbol on Forehead */}
            <path d="M 0 -22 C -4 -16, 0 -10, 0 -10 C 0 -10, 4 -16, 0 -22 Z" fill="#fae17d" opacity="0.9" />
            {/* Traditional Chutti Beard Border */}
            <path d="M -26 12 C -15 36, 15 36, 26 12" fill="none" stroke="#fae17d" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
            {/* Ear Kundala Disks */}
            <circle cx="-38" cy="0" r="8" fill="#c89d42" fillOpacity="0.3" stroke="#fae17d" strokeWidth="1.5" opacity="0.8" />
            <circle cx="38" cy="0" r="8" fill="#c89d42" fillOpacity="0.3" stroke="#fae17d" strokeWidth="1.5" opacity="0.8" />
          </g>

          {/* Reusable Mayil (Peacock) Plumage Motif */}
          <g id="mayilMotif">
            {/* Body */}
            <path d="M -15 20 C -25 0, -10 -25, 0 -35 C 5 -40, 15 -35, 12 -25 C 8 -15, 5 5, 10 25 Z" fill="#c89d42" fillOpacity="0.2" stroke="#fae17d" strokeWidth="1.6" opacity="0.7" />
            {/* Crest on Head */}
            <path d="M 3 -38 L 8 -48 M 0 -37 L 0 -49 M -3 -38 L -7 -47" stroke="#fae17d" strokeWidth="1.4" opacity="0.8" />
            {/* Radiating Tail Feathers */}
            {[-60, -40, -20, 0, 20, 40, 60].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} -15 20)`}>
                <path d="M -15 20 C -35 50, -40 80, -35 100" fill="none" stroke="url(#bgGoldGleam)" strokeWidth="1.4" opacity="0.55" />
                <ellipse cx="-35" cy="100" rx="8" ry="12" fill="#c89d42" fillOpacity="0.15" stroke="#fae17d" strokeWidth="1.2" opacity="0.7" />
                <circle cx="-35" cy="100" r="4" fill="#fae17d" opacity="0.85" />
              </g>
            ))}
          </g>

          {/* Reusable Kirtimukha (Face of Glory) Temple Arch Mask */}
          <g id="kirtimukhaMotif">
            {/* Horns & Foliage Crown */}
            <path d="M -40 -30 C -60 -50, -30 -65, -10 -40 C 0 -60, 0 -60, 10 -40 C 30 -65, 60 -50, 40 -30 Z" fill="#c89d42" fillOpacity="0.3" stroke="#fae17d" strokeWidth="2" opacity="0.85" />
            {/* Wide Open Jaws with Crested Teeth */}
            <path d="M -35 -15 C -45 5, -20 25, 0 20 C 20 25, 45 5, 35 -15 Z" fill="#0b0d14" stroke="#fae17d" strokeWidth="2" opacity="0.9" />
            <circle cx="-16" cy="-8" r="4.5" fill="#fae17d" opacity="0.95" />
            <circle cx="16" cy="-8" r="4.5" fill="#fae17d" opacity="0.95" />
            {/* Cascading Pearl Strings & Foliage Drops */}
            <path d="M -25 20 C -35 45, -25 70, -20 85 M 25 20 C 35 45, 25 70, 20 85" fill="none" stroke="#fae17d" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" />
          </g>
        </defs>

        {/* ========================================================================= */}
        {/* PARALLAX LAYER 1: Deep Distant Background Motifs (Slow Parallax) */}
        {/* ========================================================================= */}
        <g
          className="transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(0, ${driftY1}px, 0)`,
          }}
          opacity={isRevealed ? 0.35 : 0.15}
        >
          {/* Top-Left: Large Sikku Kolam Mandala */}
          <use href="#sikkuKolamMotif" x="220" y="180" transform="scale(2.2)" />

          {/* Top-Right: Kirtimukha Arch Mask */}
          <use href="#kirtimukhaMotif" x="1680" y="200" transform="scale(1.8)" />

          {/* Bottom-Left: Temple Elephant (Gaja) */}
          <use href="#gajaElephantMotif" x="280" y="850" transform="scale(1.9)" />

          {/* Bottom-Right: Toda Embroidery Diamonds */}
          <use href="#embroideryDiamond" x="1650" y="820" transform="scale(2)" />

          {/* Center-Top: Interlocking Kolam Ring */}
          <use href="#sikkuKolamMotif" x="960" y="140" transform="scale(1.5)" />
        </g>

        {/* ========================================================================= */}
        {/* PARALLAX LAYER 2: Mid-Plane Heritage Patterns (Counter-Drift Parallax) */}
        {/* ========================================================================= */}
        <g
          className="transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(0, ${driftY2}px, 0)`,
          }}
          opacity={isRevealed ? 0.45 : 0.2}
        >
          {/* Left Mid: Theyyam Sacred Face Mask */}
          <use href="#theyyamMaskMotif" x="140" y="520" transform="scale(1.7)" />

          {/* Right Mid: Sacred Peacock (Mayil) */}
          <use href="#mayilMotif" x="1760" y="540" transform="scale(1.6)" />

          {/* Left-Center: Mythical Yaazhi Pillar Guardian */}
          <use href="#yaazhiMotif" x="520" y="380" transform="scale(1.8)" />

          {/* Right-Center: Royal Elephant Caravan */}
          <use href="#gajaElephantMotif" x="1420" y="440" transform="scale(1.6) scale(-1, 1)" />

          {/* Continuous Gold Embroidery Border at Screen Top */}
          <path
            d="M 0 50 Q 240 70 480 50 T 960 50 T 1440 50 T 1920 50"
            fill="none"
            stroke="url(#embroideryThread)"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.8"
          />

          {/* Continuous Gold Embroidery Border at Screen Bottom */}
          <path
            d="M 0 1030 Q 240 1010 480 1030 T 960 1030 T 1440 1030 T 1920 1030"
            fill="none"
            stroke="url(#embroideryThread)"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.8"
          />
        </g>

        {/* ========================================================================= */}
        {/* PARALLAX LAYER 3: Foreground Ambient Floating Sparkles & Kolam Dots */}
        {/* ========================================================================= */}
        <g
          className="transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(0, ${driftY3}px, 0)`,
          }}
          opacity={isRevealed ? 0.6 : 0.25}
        >
          {/* Corner Ornamental Embroidery Mandalas */}
          <use href="#embroideryDiamond" x="90" y="90" transform="scale(1.2)" />
          <use href="#embroideryDiamond" x="1830" y="90" transform="scale(1.2)" />
          <use href="#sikkuKolamMotif" x="90" y="990" transform="scale(1.3)" />
          <use href="#theyyamMaskMotif" x="1830" y="990" transform="scale(1.2)" />

          {/* Center-Floating Golden Lotus Bindu */}
          <circle cx="960" cy="540" r="3" fill="#fae17d" opacity="0.9" />
          <circle cx="960" cy="540" r="18" fill="none" stroke="#c89d42" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};
