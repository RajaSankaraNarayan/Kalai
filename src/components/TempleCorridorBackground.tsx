import React from 'react';
import { useParallaxScroll } from '../hooks/useParallaxScroll';

interface TempleCorridorBackgroundProps {
  isRevealed: boolean;
  className?: string;
  scrollYOffset?: number;
}

export const TempleCorridorBackground: React.FC<TempleCorridorBackgroundProps> = ({
  isRevealed,
  className = '',
  scrollYOffset,
}) => {
  const hookScrollY = useParallaxScroll();
  const scrollY = scrollYOffset !== undefined ? scrollYOffset : hookScrollY;

  // Differentiated parallax speeds for multi-plane depth
  const backgroundTranslateY = scrollY * 0.06;
  const ceilingTranslateY = scrollY * 0.14;
  const floorTranslateY = scrollY * -0.05;
  const pillarsTranslateY = scrollY * 0.09;
  const motifsTranslateY1 = scrollY * 0.22;
  const motifsTranslateY2 = scrollY * -0.16;

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {/* 1. Primary Depth Container with Parallax Translation */}
      <div
        className={`w-full h-full transition-opacity duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isRevealed
            ? 'filter-none opacity-95'
            : 'brightness-[0.2] saturate-[0.6] blur-[2px] opacity-50'
        }`}
        style={{
          transform: `translate3d(0, ${backgroundTranslateY}px, 0) scale(${1 + Math.min(scrollY * 0.00015, 0.08)})`,
          transformOrigin: '50% 45%',
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Photorealistic Granite & Stone Textures */}
            <filter id="stoneTexture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.15 0" result="stoneGrain" />
              <feComposite in="SourceGraphic" in2="stoneGrain" operator="over" />
            </filter>

            <filter id="granitePillarTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="graniteGrain" />
              <feColorMatrix type="matrix" values="0.4 0.4 0.4 0 0  0.3 0.3 0.3 0 0  0.25 0.25 0.25 0 0  0 0 0 0.25 0" />
              <feBlend mode="multiply" in="SourceGraphic" result="blend" />
            </filter>

            {/* Radiant Sanctum Glow & Light Rays */}
            <radialGradient id="sanctumDeepLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF4CC" stopOpacity="1" />
              <stop offset="15%" stopColor="#F5D67B" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#7A2209" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#050302" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="floorReflection" x1="50%" y1="50%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F5D67B" stopOpacity="0.35" />
              <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#3B2613" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Ceiling Mandapam Vault Gradients */}
            <linearGradient id="ceilingGranite" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0907" />
              <stop offset="25%" stopColor="#1C140D" />
              <stop offset="60%" stopColor="#2F1F12" />
              <stop offset="100%" stopColor="#4A341E" />
            </linearGradient>

            {/* Floor Basalt Slab Gradient */}
            <linearGradient id="basaltFloor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A0806" />
              <stop offset="35%" stopColor="#18130E" />
              <stop offset="70%" stopColor="#251C14" />
              <stop offset="100%" stopColor="#382A1D" />
            </linearGradient>

            {/* Realistic Flame Gradient for Diyas */}
            <radialGradient id="diyaFlame" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFF2B2" />
              <stop offset="60%" stopColor="#FF9900" />
              <stop offset="90%" stopColor="#CC3300" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <radialGradient id="diyaLightAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC83B" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#E67E22" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Chiseled Stone Pillar Shading */}
            <linearGradient id="leftPillarShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1610" />
              <stop offset="25%" stopColor="#3E2C1E" />
              <stop offset="60%" stopColor="#5A402D" />
              <stop offset="85%" stopColor="#2A1C12" />
              <stop offset="100%" stopColor="#100B07" />
            </linearGradient>

            <linearGradient id="rightPillarShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#100B07" />
              <stop offset="15%" stopColor="#2A1C12" />
              <stop offset="40%" stopColor="#5A402D" />
              <stop offset="75%" stopColor="#3E2C1E" />
              <stop offset="100%" stopColor="#1E1610" />
            </linearGradient>

            {/* Gold Filigree Line Gradient */}
            <linearGradient id="motifGoldLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae17d" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#c89d42" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#966d1f" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Deep Black Foundation */}
          <rect width="1920" height="1080" fill="#040302" />

          {/* Vanishing Point Glow (Distant Sacred Sanctum) */}
          <ellipse cx="960" cy="510" rx="450" ry="240" fill="url(#sanctumDeepLight)" />

          {/* --- CEILING MANDAPAM VAULT (Heavy stone masonry with carved brackets & Parallax Shift) --- */}
          <g style={{ transform: `translate3d(0, ${ceilingTranslateY}px, 0)`, willChange: 'transform' }}>
            <polygon points="0,0 1920,0 990,500 930,500" fill="url(#ceilingGranite)" />

            {/* Deep Ceiling Stone Ribs & Crossbeams */}
            {[
              { y: 30, h: 26, stroke: '#5A402D', gold: '#D4AF37' },
              { y: 110, h: 22, stroke: '#4D3624', gold: '#B38F2D' },
              { y: 195, h: 18, stroke: '#402C1B', gold: '#947422' },
              { y: 275, h: 14, stroke: '#352415', gold: '#785D1A' },
              { y: 345, h: 11, stroke: '#2A1B0F', gold: '#5C4612' },
              { y: 405, h: 8, stroke: '#20140A', gold: '#42320A' },
              { y: 455, h: 6, stroke: '#170E07', gold: '#2B2005' },
              { y: 485, h: 4, stroke: '#100904', gold: '#1F1703' },
            ].map((beam, i) => (
              <g key={i}>
                <line x1="0" y1={beam.y} x2="1920" y2={beam.y} stroke={beam.stroke} strokeWidth={beam.h} />
                <line x1="0" y1={beam.y - beam.h * 0.4} x2="1920" y2={beam.y - beam.h * 0.4} stroke="#040302" strokeWidth="2" />
                <line x1="0" y1={beam.y + beam.h * 0.4} x2="1920" y2={beam.y + beam.h * 0.4} stroke={beam.gold} strokeWidth="1.5" strokeOpacity="0.6" />
              </g>
            ))}

            {/* Carved Ceiling Lotus Relief Medallions (Receding Perspective) */}
            <g filter="drop-shadow(0 4px 12px rgba(0,0,0,0.9))">
              {/* Medallion 1 - Foreground Master Lotus */}
              <ellipse cx="960" cy="70" rx="160" ry="46" fill="#2E1F12" stroke="#D4AF37" strokeWidth="3" />
              <ellipse cx="960" cy="70" rx="110" ry="32" fill="#4A341E" stroke="#8C6E4E" strokeWidth="2" />
              <ellipse cx="960" cy="70" rx="55" ry="16" fill="#7A2209" stroke="#FFF2B2" strokeWidth="1.5" />
              <circle cx="960" cy="70" r="8" fill="#F5D67B" />

              {/* Medallion 2 */}
              <ellipse cx="960" cy="165" rx="110" ry="30" fill="#2A1B0F" stroke="#B38F2D" strokeWidth="2.5" />
              <ellipse cx="960" cy="165" rx="70" ry="19" fill="#3D2916" stroke="#785B3F" strokeWidth="1.5" />
              <ellipse cx="960" cy="165" rx="35" ry="10" fill="#611A05" stroke="#F5D67B" strokeWidth="1" />

              {/* Medallion 3 */}
              <ellipse cx="960" cy="245" rx="75" ry="20" fill="#24170D" stroke="#8C6E4E" strokeWidth="2" />
              <ellipse cx="960" cy="245" rx="45" ry="12" fill="#332010" stroke="#5E4834" strokeWidth="1" />

              {/* Medallion 4 */}
              <ellipse cx="960" cy="315" rx="50" ry="13" fill="#1C1209" stroke="#6E5336" strokeWidth="1.5" />

              {/* Medallions 5 & 6 */}
              <ellipse cx="960" cy="375" rx="32" ry="8" fill="#150D06" stroke="#523D26" strokeWidth="1" />
              <ellipse cx="960" cy="425" rx="18" ry="5" fill="#100904" stroke="#D4AF37" strokeWidth="0.8" />
              <ellipse cx="960" cy="465" rx="10" ry="2.5" fill="#F5D67B" />
            </g>
          </g>

          {/* --- BASALT STONE FLOOR WITH PERSPECTIVE FLAGSTONES --- */}
          <g style={{ transform: `translate3d(0, ${floorTranslateY}px, 0)`, willChange: 'transform' }}>
            <polygon points="0,1080 1920,1080 990,530 930,530" fill="url(#basaltFloor)" />

            {/* Golden oil lamp light reflections spilling across polished stone floor */}
            <polygon points="550,1080 1370,1080 980,530 940,530" fill="url(#floorReflection)" />

            {/* Deep Perspective Stone Joint Lines */}
            {[-500, -200, 100, 400, 700, 960, 1220, 1520, 1820, 2120, 2420].map((x, i) => (
              <line key={i} x1={x} y1="1080" x2="960" y2="530" stroke="#080604" strokeWidth="3" />
            ))}

            {/* Horizontal Stone Masonry Joints (Receding) */}
            {[560, 600, 650, 715, 800, 910, 1040].map((y, i) => {
              const span = (y - 530) * 1.9;
              return (
                <g key={i}>
                  <line x1={960 - span} y1={y} x2={960 + span} y2={y} stroke="#050403" strokeWidth="2.5" />
                  <line x1={960 - span} y1={y + 1} x2={960 + span} y2={y + 1} stroke="#543E2B" strokeWidth="1" strokeOpacity="0.4" />
                </g>
              );
            })}
          </g>

          {/* --- COLONNADE PILLARS & DIYAS WITH PARALLAX DEPTH --- */}
          <g style={{ transform: `translate3d(0, ${pillarsTranslateY}px, 0)`, willChange: 'transform' }}>
            {/* Left Colonnade Pillars */}
            {[
              { x: -70, topY: 10, botY: 1070, w: 220, diya: true, diyaY: 620 },
              { x: 190, topY: 110, botY: 940, w: 165, diya: true, diyaY: 570 },
              { x: 410, topY: 195, botY: 830, w: 120, diya: false },
              { x: 580, topY: 275, botY: 735, w: 85, diya: true, diyaY: 530 },
              { x: 705, topY: 345, botY: 660, w: 60, diya: false },
              { x: 800, topY: 405, botY: 600, w: 40, diya: false },
              { x: 865, topY: 455, botY: 555, w: 24, diya: false },
              { x: 910, topY: 485, botY: 530, w: 14, diya: false },
            ].map((col, i) => (
              <g key={i}>
                <rect x={col.x - 10} y={col.topY} width={col.w + 20} height={col.botY - col.topY} fill="#060403" opacity="0.8" />
                <rect x={col.x} y={col.topY} width={col.w} height={col.botY - col.topY} fill="url(#leftPillarShade)" stroke="#060403" strokeWidth="2" />
                <line x1={col.x + col.w * 0.25} y1={col.topY} x2={col.x + col.w * 0.25} y2={col.botY} stroke="#78563A" strokeWidth={col.w * 0.07} />
                <line x1={col.x + col.w * 0.5} y1={col.topY} x2={col.x + col.w * 0.5} y2={col.botY} stroke="#382517" strokeWidth={col.w * 0.08} />
                <line x1={col.x + col.w * 0.75} y1={col.topY} x2={col.x + col.w * 0.75} y2={col.botY} stroke="#1A1009" strokeWidth={col.w * 0.09} />

                <polygon
                  points={`${col.x - col.w * 0.25},${col.topY} ${col.x + col.w * 1.25},${col.topY} ${col.x + col.w * 1.1},${col.topY + col.w * 0.35} ${col.x - col.w * 0.1},${col.topY + col.w * 0.35}`}
                  fill="#3A281A"
                  stroke="#D4AF37"
                  strokeWidth={col.w * 0.015}
                />
                <rect x={col.x - col.w * 0.05} y={col.topY + col.w * 0.35} width={col.w * 1.1} height={col.w * 0.15} fill="#1E140C" />
                <rect x={col.x - col.w * 0.15} y={col.botY - col.w * 0.25} width={col.w * 1.3} height={col.w * 0.25} fill="#24180F" stroke="#050302" strokeWidth="2" />

                {col.diya && (
                  <g transform={`translate(${col.x + col.w * 0.95}, ${col.diyaY})`}>
                    <ellipse cx="0" cy="10" rx="14" ry="5" fill="#D4AF37" stroke="#8B6B1F" strokeWidth="1" />
                    <path d="M -14 10 Q 0 24 14 10 Z" fill="#8B6B1F" />
                    <rect x="-2" y="16" width="4" height="18" fill="#574213" />
                    <circle cx="0" cy="4" r="50" fill="url(#diyaLightAura)" />
                    <path d="M 0 -8 Q 6 2 0 8 Q -6 2 0 -8 Z" fill="url(#diyaFlame)" className="animate-diya" />
                    <circle cx="0" cy="2" r="2.5" fill="#FFFFFF" />
                  </g>
                )}
              </g>
            ))}

            {/* Right Colonnade Pillars */}
            {[
              { x: 1770, topY: 10, botY: 1070, w: 220, diya: true, diyaY: 620 },
              { x: 1565, topY: 110, botY: 940, w: 165, diya: true, diyaY: 570 },
              { x: 1390, topY: 195, botY: 830, w: 120, diya: false },
              { x: 1255, topY: 275, botY: 735, w: 85, diya: true, diyaY: 530 },
              { x: 1155, topY: 345, botY: 660, w: 60, diya: false },
              { x: 1080, topY: 405, botY: 600, w: 40, diya: false },
              { x: 1030, topY: 455, botY: 555, w: 24, diya: false },
              { x: 996, topY: 485, botY: 530, w: 14, diya: false },
            ].map((col, i) => (
              <g key={i}>
                <rect x={col.x - 10} y={col.topY} width={col.w + 20} height={col.botY - col.topY} fill="#060403" opacity="0.8" />
                <rect x={col.x} y={col.topY} width={col.w} height={col.botY - col.topY} fill="url(#rightPillarShade)" stroke="#060403" strokeWidth="2" />
                <line x1={col.x + col.w * 0.25} y1={col.topY} x2={col.x + col.w * 0.25} y2={col.botY} stroke="#1A1009" strokeWidth={col.w * 0.09} />
                <line x1={col.x + col.w * 0.5} y1={col.topY} x2={col.x + col.w * 0.5} y2={col.botY} stroke="#382517" strokeWidth={col.w * 0.08} />
                <line x1={col.x + col.w * 0.75} y1={col.topY} x2={col.x + col.w * 0.75} y2={col.botY} stroke="#78563A" strokeWidth={col.w * 0.07} />

                <polygon
                  points={`${col.x - col.w * 0.25},${col.topY} ${col.x + col.w * 1.25},${col.topY} ${col.x + col.w * 1.1},${col.topY + col.w * 0.35} ${col.x - col.w * 0.1},${col.topY + col.w * 0.35}`}
                  fill="#3A281A"
                  stroke="#D4AF37"
                  strokeWidth={col.w * 0.015}
                />
                <rect x={col.x - col.w * 0.05} y={col.topY + col.w * 0.35} width={col.w * 1.1} height={col.w * 0.15} fill="#1E140C" />
                <rect x={col.x - col.w * 0.15} y={col.botY - col.w * 0.25} width={col.w * 1.3} height={col.w * 0.25} fill="#24180F" stroke="#050302" strokeWidth="2" />

                {col.diya && (
                  <g transform={`translate(${col.x + col.w * 0.05}, ${col.diyaY})`}>
                    <ellipse cx="0" cy="10" rx="14" ry="5" fill="#D4AF37" stroke="#8B6B1F" strokeWidth="1" />
                    <path d="M -14 10 Q 0 24 14 10 Z" fill="#8B6B1F" />
                    <rect x="-2" y="16" width="4" height="18" fill="#574213" />
                    <circle cx="0" cy="4" r="50" fill="url(#diyaLightAura)" />
                    <path d="M 0 -8 Q 6 2 0 8 Q -6 2 0 -8 Z" fill="url(#diyaFlame)" className="animate-diya" />
                    <circle cx="0" cy="2" r="2.5" fill="#FFFFFF" />
                  </g>
                )}
              </g>
            ))}
          </g>

          {/* Deep Sacred Sanctum Garbhagriha Archway */}
          <g transform="translate(960, 520)">
            <path
              d="M -42 10 L -42 -40 C -42 -68, 42 -68, 42 -40 L 42 10 Z"
              fill="#060301"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <circle cx="0" cy="-35" r="25" fill="#FFF2B2" opacity="0.95" filter="drop-shadow(0 0 20px #FFD700)" />
            <circle cx="0" cy="-35" r="12" fill="#D4AF37" />
            <ellipse cx="0" cy="-10" rx="6" ry="12" fill="#FF4500" />
            <ellipse cx="0" cy="-10" rx="3" ry="7" fill="#FFFFE0" />
          </g>

          {/* Floating Subtle Neo-Classical Temple Geometry & Motifs Layer 1 (Parallax up) */}
          <g style={{ transform: `translate3d(0, ${motifsTranslateY1}px, 0)`, willChange: 'transform' }} opacity="0.25">
            {/* Sacred Sri Yantra Interlocking Triangles & Rings Motif */}
            <g transform="translate(320, 320)">
              <circle cx="0" cy="0" r="90" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="0" cy="0" r="70" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1.5" />
              <polygon points="0,-60 52,30 -52,30" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1.2" />
              <polygon points="0,60 52,-30 -52,-30" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4" fill="#fae17d" />
            </g>

            {/* Sacred Sthapathi Star Mandala */}
            <g transform="translate(1600, 360)">
              <circle cx="0" cy="0" r="80" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="0" cy="0" r="50" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1.2" />
              <rect x="-35" y="-35" width="70" height="70" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1" />
              <rect x="-35" y="-35" width="70" height="70" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1" transform="rotate(45)" />
            </g>
          </g>

          {/* Floating Subtle Neo-Classical Temple Geometry & Motifs Layer 2 (Parallax down) */}
          <g style={{ transform: `translate3d(0, ${motifsTranslateY2}px, 0)`, willChange: 'transform' }} opacity="0.2">
            {/* Sacred Kolam Continuous Knot Watermark */}
            <g transform="translate(960, 880)">
              <circle cx="0" cy="0" r="140" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1" strokeDasharray="12 8" />
              <circle cx="0" cy="0" r="90" fill="none" stroke="url(#motifGoldLine)" strokeWidth="1.2" />
              <path
                d="M -60,0 C -60,-40 -20,-60 0,-60 C 20,-60 60,-40 60,0 C 60,40 20,60 0,60 C -20,60 -60,40 -60,0 Z"
                fill="none"
                stroke="url(#motifGoldLine)"
                strokeWidth="1.5"
              />
              <path
                d="M 0,-60 C 40,-60 60,-20 60,0 C 60,20 40,60 0,60 C -40,60 -60,20 -60,0 C -60,-20 -40,-60 0,-60 Z"
                fill="none"
                stroke="url(#motifGoldLine)"
                strokeWidth="1.5"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Atmospheric Cinematic Haze and Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,3,2,0.7)_80%,rgba(5,3,2,0.95)_100%)] pointer-events-none" />
    </div>
  );
};

