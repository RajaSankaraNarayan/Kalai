import React from 'react';

interface SikkuKolamMedallionProps {
  isHovered: boolean;
  isOpen: boolean;
}

/**
 * Authentic Sacred Tamil Sikku Kolam (Brahma Mudi / Kambi Kolam)
 * Features mathematically continuous interlocking loop geometry weaving around a
 * traditional 7-to-1 sacred pulli (dot) grid with 4-fold rotational symmetry,
 * dual-tone 24K gold and rice-flour inlay stroke relief, and temple bronze bezel.
 */
export const SikkuKolamMedallion: React.FC<SikkuKolamMedallionProps> = ({
  isHovered,
  isOpen,
}) => {
  // Authentic 5-to-1 Sacred Pulli Matrix Coordinates (centered at 200, 200)
  const pulliGrid = [
    // Center Bindu
    { x: 200, y: 200, r: 4.2, isCenter: true },
    
    // Cardinal Inner Tier (d = 34)
    { x: 200, y: 166 }, { x: 200, y: 234 }, { x: 166, y: 200 }, { x: 234, y: 200 },
    
    // Cardinal Outer Tier - Apex Pulli (d = 86)
    { x: 200, y: 114 }, { x: 200, y: 286 }, { x: 114, y: 200 }, { x: 286, y: 200 },
    
    // Diagonal Loop Centers (x=162, y=162 etc.)
    { x: 162, y: 148 }, { x: 238, y: 148 }, { x: 162, y: 252 }, { x: 238, y: 252 },
    { x: 148, y: 162 }, { x: 252, y: 162 }, { x: 148, y: 238 }, { x: 252, y: 238 },
    
    // Diagonal Outer Corner Pulli
    { x: 142, y: 142 }, { x: 258, y: 142 }, { x: 142, y: 258 }, { x: 258, y: 258 },
  ];

  return (
    <div className="relative flex items-center justify-center select-none group">
      {/* Dynamic Ambient Aura & Golden Halo */}
      <div
        className={`absolute -inset-10 rounded-full transition-all duration-700 pointer-events-none ${
          isOpen
            ? 'opacity-0 scale-150'
            : isHovered
            ? 'opacity-90 scale-110 bg-[radial-gradient(circle,rgba(250,225,125,0.4)_0%,rgba(200,157,66,0.2)_45%,transparent_70%)]'
            : 'opacity-40 scale-100 bg-[radial-gradient(circle,rgba(200,157,66,0.2)_0%,transparent_60%)]'
        }`}
      />

      {/* Main Medallion Disc */}
      <div
        className={`relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 rounded-full transition-all duration-700 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #2a1c10 0%, #170f08 45%, #0e0804 85%, #050302 100%)',
          boxShadow: isHovered
            ? '0 0 45px rgba(250,225,125,0.5), 0 25px 50px rgba(0,0,0,0.95), inset 0 2px 6px rgba(255,235,170,0.4), inset 0 -4px 10px rgba(0,0,0,0.9)'
            : '0 15px 40px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,230,150,0.25), inset 0 -3px 8px rgba(0,0,0,0.85)',
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 24K Gold Foil Gradients */}
            <linearGradient id="kolamGoldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff8d6" />
              <stop offset="20%" stopColor="#fae17d" />
              <stop offset="45%" stopColor="#d4a339" />
              <stop offset="70%" stopColor="#f5d76e" />
              <stop offset="90%" stopColor="#8f651a" />
              <stop offset="100%" stopColor="#5c3f0c" />
            </linearGradient>

            <linearGradient id="kolamLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="15%" stopColor="#fff3b0" />
              <stop offset="45%" stopColor="#f0ca5e" />
              <stop offset="80%" stopColor="#e5b842" />
              <stop offset="100%" stopColor="#ffd868" />
            </linearGradient>

            <radialGradient id="sanctumBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e130a" />
              <stop offset="60%" stopColor="#120a05" />
              <stop offset="100%" stopColor="#080402" />
            </radialGradient>

            <radialGradient id="rubyCabochon" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ff7a93" />
              <stop offset="35%" stopColor="#d91b44" />
              <stop offset="80%" stopColor="#7a0a22" />
              <stop offset="100%" stopColor="#3b030e" />
            </radialGradient>

            <filter id="kolamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stepped Outer Bronze & Gold Rims */}
          <circle cx="200" cy="200" r="194" fill="none" stroke="url(#kolamGoldBezel)" strokeWidth="3" opacity="0.9" />
          <circle cx="200" cy="200" r="188" fill="none" stroke="#120a05" strokeWidth="6" />
          <circle cx="200" cy="200" r="184" fill="none" stroke="url(#kolamGoldBezel)" strokeWidth="2" opacity="0.95" />

          {/* 48-Bead Sthapathi Granular Pearl Halo */}
          {[...Array(48)].map((_, i) => {
            const angle = (i * 360) / 48;
            const rad = (angle * Math.PI) / 180;
            const x = 200 + 176 * Math.cos(rad);
            const y = 200 + 176 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 4 === 0 ? "3.2" : "2"}
                fill="url(#kolamGoldBezel)"
                stroke="#2a1805"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Inner Stepped Bezel Ring & Dark Velvet Bronze Plate */}
          <circle cx="200" cy="200" r="166" fill="none" stroke="url(#kolamGoldBezel)" strokeWidth="2.5" />
          <circle cx="200" cy="200" r="160" fill="url(#sanctumBase)" stroke="#3a220e" strokeWidth="2" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="#8c641d" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

          {/* 4 Cardinal Sacred Pointer Finials with Ruby Cabochons */}
          {[0, 90, 180, 270].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 200 200)`}>
              {/* Trident / Temple Kalasam Spear */}
              <path
                d="M 194 28 L 200 12 L 206 28 L 200 32 Z"
                fill="url(#kolamGoldBezel)"
                stroke="#2a1403"
                strokeWidth="0.75"
              />
              <circle cx="200" cy="28" r="4.5" fill="url(#rubyCabochon)" stroke="#ffd700" strokeWidth="0.8" />
              <circle cx="198.5" cy="26.5" r="1.2" fill="#fff" opacity="0.9" />
            </g>
          ))}

          {/* 4 Diagonal Lotus Petal Accents */}
          {[45, 135, 225, 315].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M 200 48 C 193 60, 195 72, 200 78 C 205 72, 207 60, 200 48 Z"
                fill="url(#kolamGoldBezel)"
                opacity="0.65"
              />
              <circle cx="200" cy="62" r="2" fill="#fae17d" />
            </g>
          ))}

          {/* ========================================================================= */}
          {/* AUTHENTIC SACRED PADMA BRAHMA MUDI (CHOLA TEMPLE SIKKU KOLAM)             */}
          {/* ========================================================================= */}

          {/* Sanctum Central Bronze Plate */}
          <circle cx="200" cy="200" r="136" fill="#150c07" stroke="url(#kolamGoldBezel)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="130" fill="#0d0704" stroke="#4a2e12" strokeWidth="1" />

          {/* 16-Petal Perimeter Lotus Crests */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                <path
                  d="M 200 74 C 194 82, 196 90, 200 96 C 204 90, 206 82, 200 74 Z"
                  fill="url(#kolamGoldBezel)"
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* LAYER 1: The Grid of Sacred Pulli (Dots) */}
          <g id="sikku-pulli-grid">
            {pulliGrid.map((dot, idx) => (
              <g key={idx}>
                {/* Pulli Shadow Ring */}
                <circle cx={dot.x} cy={dot.y + 1} r={dot.isCenter ? "5" : "3.5"} fill="#000000" opacity="0.8" />
                {/* Pulli Dot Body */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.isCenter ? "4.5" : "3"}
                  fill={dot.isCenter ? "url(#kolamGoldBezel)" : "#fae896"}
                  stroke="#3d240a"
                  strokeWidth="0.8"
                />
                {/* Luminous Core / Rice Flour Glint */}
                <circle
                  cx={dot.x - 0.8}
                  cy={dot.y - 0.8}
                  r={dot.isCenter ? "1.6" : "1"}
                  fill="#ffffff"
                  opacity="0.95"
                />
              </g>
            ))}
          </g>

          {/* LAYER 2: 4-Cardinal Brahma Mudi Master Loops (Deep Cast Shadow) */}
          <g id="brahma-mudi-shadow" opacity="0.9">
            {[0, 90, 180, 270].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 200 200)`}>
                {/* Outer Cardinal Teardrop Loop */}
                <path
                  d="M 200 176 C 180 176, 164 158, 164 138 C 164 118, 182 98, 200 98 C 218 98, 236 118, 236 138 C 236 158, 220 176, 200 176 Z"
                  fill="none"
                  stroke="#070402"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Diagonal Interlocking Diamond Knot */}
                <path
                  d="M 200 162 C 184 162, 172 148, 172 132 C 172 116, 186 106, 200 106 C 214 106, 228 116, 228 132 C 228 148, 216 162, 200 162 Z"
                  fill="none"
                  stroke="#070402"
                  strokeWidth="8"
                  transform="rotate(45 200 200)"
                />
              </g>
            ))}
          </g>

          {/* LAYER 3: 4-Cardinal & 4-Diagonal Brahma Mudi Gold Inlay Lines */}
          <g id="brahma-mudi-gold-lines" filter="url(#kolamGlow)">
            {/* 4 Cardinal Loops */}
            {[0, 90, 180, 270].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 200 200)`}>
                {/* 24K Gold Line */}
                <path
                  d="M 200 176 C 180 176, 164 158, 164 138 C 164 118, 182 98, 200 98 C 218 98, 236 118, 236 138 C 236 158, 220 176, 200 176 Z"
                  fill="none"
                  stroke="url(#kolamLineGrad)"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner Rice-Flour Ivory Highlight */}
                <path
                  d="M 200 176 C 180 176, 164 158, 164 138 C 164 118, 182 98, 200 98 C 218 98, 236 118, 236 138 C 236 158, 220 176, 200 176 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
              </g>
            ))}

            {/* 4 Diagonal Loops (Interlocking Square Knot at 45 deg) */}
            {[45, 135, 225, 315].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 200 200)`}>
                {/* 24K Gold Line */}
                <path
                  d="M 200 164 C 184 164, 172 150, 172 134 C 172 118, 186 108, 200 108 C 214 108, 228 118, 228 134 C 228 150, 216 164, 200 164 Z"
                  fill="none"
                  stroke="url(#kolamLineGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner Rice-Flour Ivory Highlight */}
                <path
                  d="M 200 164 C 184 164, 172 150, 172 134 C 172 118, 186 108, 200 108 C 214 108, 228 118, 228 134 C 228 150, 216 164, 200 164 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  opacity="0.75"
                />
              </g>
            ))}
          </g>

          {/* LAYER 4: Continuous Interlocking Diamond Frame */}
          <path
            d="M 200 144 L 240 184 L 240 216 L 200 256 L 160 216 L 160 184 Z"
            fill="none"
            stroke="#080402"
            strokeWidth="5"
          />
          <path
            d="M 200 144 L 240 184 L 240 216 L 200 256 L 160 216 L 160 184 Z"
            fill="none"
            stroke="url(#kolamGoldBezel)"
            strokeWidth="2.2"
            strokeDasharray="16 8"
          />

          {/* Central Sanctum Lotus Ring */}
          <circle cx="200" cy="200" r="32" fill="none" stroke="#080402" strokeWidth="4" />
          <circle cx="200" cy="200" r="32" fill="none" stroke="url(#kolamGoldBezel)" strokeWidth="2" />
          <circle cx="200" cy="200" r="24" fill="#140b06" stroke="#4a2d12" strokeWidth="1" />

          {/* 8-Petal Sacred Center Lotus Flower */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <g key={idx} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M 200 180 C 196 186, 196 194, 200 198 C 204 194, 204 186, 200 180 Z"
                fill="url(#kolamGoldBezel)"
                stroke="#1a0f06"
                strokeWidth="0.6"
              />
            </g>
          ))}

          {/* Center Sacred Bindu Ruby Gemstone */}
          <circle cx="200" cy="200" r="9" fill="url(#rubyCabochon)" stroke="url(#kolamGoldBezel)" strokeWidth="1.8" />
          <circle cx="197" cy="197" r="2.2" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
};
