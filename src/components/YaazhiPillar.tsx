import React from 'react';
import { useParallaxScroll } from '../hooks/useParallaxScroll';

interface YaazhiPillarProps {
  side: 'left' | 'right';
  isReceded?: boolean;
  className?: string;
  parallaxSpeed?: number;
  scrollYOffset?: number;
}

export const YaazhiPillar: React.FC<YaazhiPillarProps> = ({
  side,
  isReceded = false,
  className = '',
  parallaxSpeed = 0.12,
  scrollYOffset,
}) => {
  const isLeft = side === 'left';
  const hookScrollY = useParallaxScroll();
  const scrollY = scrollYOffset !== undefined ? scrollYOffset : hookScrollY;

  // Subtle foreground vertical parallax displacement
  const parallaxY = scrollY * parallaxSpeed;

  return (
    <div
      className={`pointer-events-none select-none transition-[opacity,scale,margin] duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isReceded
          ? `opacity-40 scale-[0.93] ${isLeft ? '-translate-x-6' : 'translate-x-6'}`
          : 'opacity-100 scale-100 translate-x-0'
      } ${className}`}
      style={{
        transform: `translate3d(0, ${parallaxY}px, 0)`,
        willChange: 'transform',
        filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.25)) drop-shadow(0 15px 50px rgba(0, 0, 0, 0.95))',
      }}
    >
      <svg
        width="240"
        height="800"
        viewBox="0 0 240 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-[94vh] w-auto max-w-[280px] ${isLeft ? '' : '-scale-x-100'}`}
      >
        <defs>
          {/* Realistic Black Granite Stone Texture & Shaders */}
          <linearGradient id="graniteDeepBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A1E15" />
            <stop offset="20%" stopColor="#443224" />
            <stop offset="45%" stopColor="#1E140C" />
            <stop offset="70%" stopColor="#38261A" />
            <stop offset="90%" stopColor="#120B06" />
            <stop offset="100%" stopColor="#080402" />
          </linearGradient>

          <linearGradient id="stoneChiselHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C7A54" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A3420" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="goldFiligreePatina" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6D1F" />
            <stop offset="40%" stopColor="#F5D67B" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#543F0F" />
          </linearGradient>

          <radialGradient id="pearlSphereGlow" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFF2B2" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#5E430B" />
          </radialGradient>

          <radialGradient id="rubyEyeGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FF85A2" />
            <stop offset="40%" stopColor="#E60039" />
            <stop offset="85%" stopColor="#7A001E" />
            <stop offset="100%" stopColor="#260009" />
          </radialGradient>

          {/* Deep Ambient Occlusion Shadow */}
          <linearGradient id="carvingCreviceShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Dark Shadow silhouette behind pillar */}
        <path
          d="M 30 10 L 210 10 L 210 770 L 10 770 Z"
          fill="#030201"
          opacity="0.7"
          filter="blur(10px)"
        />

        {/* ================= TOP CORNICE & POTIKAI CAPITAL ================= */}
        {/* Layer 1: Uppermost Mandapam Beam Block */}
        <rect x="25" y="12" width="200" height="26" rx="2" fill="url(#graniteDeepBlack)" stroke="url(#goldFiligreePatina)" strokeWidth="1.8" />
        <rect x="35" y="38" width="180" height="18" fill="#1A120B" stroke="#66492F" strokeWidth="1" />
        {/* Carved Floral molding on cornice */}
        {[45, 75, 105, 135, 165, 195].map((x, i) => (
          <circle key={i} cx={x} cy="25" r="4" fill="#D4AF37" opacity="0.8" />
        ))}
        {/* Pendent Hanging Lotus Bud Bell */}
        <path d="M 185 56 L 198 90 L 172 90 Z" fill="url(#goldFiligreePatina)" stroke="#2D1F13" strokeWidth="1" />
        <circle cx="185" cy="98" r="6" fill="#F5D67B" stroke="#8C6D1F" strokeWidth="1" />

        {/* ================= MONOLITHIC PILLAR BACKBONE SHAFT ================= */}
        {/* Deep Fluted Monolithic Granite Column Core */}
        <rect x="30" y="56" width="34" height="660" fill="#140D08" stroke="#382618" strokeWidth="1.5" />
        {/* Precision Chiseled Vertical Flutes */}
        <line x1="38" y1="60" x2="38" y2="710" stroke="#6E4D30" strokeWidth="2.5" />
        <line x1="47" y1="60" x2="47" y2="710" stroke="url(#stoneChiselHighlight)" strokeWidth="3" />
        <line x1="56" y1="60" x2="56" y2="710" stroke="#0D0805" strokeWidth="3" />

        {/* ================= MAIN YAAZHI (MYTHICAL LION-DRAGON BEAST) ================= */}
        {/* Massive Arching S-Curve Sculpted Granite Body */}
        <path
          d="M 45 56
             C 85 52, 160 48, 195 58
             C 205 85, 180 110, 145 125
             C 120 138, 105 165, 110 198
             C 115 235, 155 250, 168 285
             C 180 325, 160 370, 130 400
             C 100 430, 88 470, 95 515
             C 102 560, 140 595, 150 640
             C 160 685, 135 720, 90 740
             L 45 740 L 45 56 Z"
          fill="url(#graniteDeepBlack)"
          stroke="#78563A"
          strokeWidth="2.5"
        />

        {/* --- YAAZHI FEROCIOUS HEAD & MANDIBLE --- */}
        {/* Lion Mane Frills & Flaming Foliate Scrolls */}
        <g id="yaazhi-mane-curls">
          <path d="M 100 115 C 125 90, 160 95, 172 125 C 182 155, 160 180, 135 190 Z" fill="#291B11" stroke="url(#goldFiligreePatina)" strokeWidth="1.2" />
          <path d="M 130 95 C 160 75, 185 85, 195 110 C 205 135, 185 155, 165 160 Z" fill="#1C120B" stroke="#8C6D1F" strokeWidth="1" />
          <path d="M 85 140 C 110 120, 135 130, 140 155 C 145 180, 125 195, 105 195 Z" fill="#3D2919" stroke="#6E4D30" strokeWidth="1.5" />
        </g>

        {/* Snout, Curved Elephantine Proboscis, and Snarl */}
        <path
          d="M 130 125
             C 165 118, 205 140, 210 170
             C 205 188, 180 198, 150 200
             C 125 202, 115 188, 120 170 Z"
          fill="url(#graniteDeepBlack)"
          stroke="url(#stoneChiselHighlight)"
          strokeWidth="2"
        />

        {/* Ivory Curved Tusks */}
        <path d="M 175 180 C 195 210, 205 240, 190 270 C 180 250, 175 220, 165 190 Z" fill="#FFF8E7" stroke="#8C6D1F" strokeWidth="1.5" />
        <path d="M 148 185 C 160 215, 165 245, 155 265 C 150 245, 145 220, 140 195 Z" fill="#F0E2C8" stroke="#543F0F" strokeWidth="1" />

        {/* Intricate Sacred Pearl Sphere in Open Roaring Jaws (Famous Dravidian Temple Detail) */}
        <circle cx="160" cy="178" r="11" fill="url(#pearlSphereGlow)" stroke="#382618" strokeWidth="1.5" />
        <circle cx="157" cy="175" r="4" fill="#FFFFFF" opacity="0.9" />

        {/* Piercing Bulging Gemstone Eye */}
        <ellipse cx="155" cy="150" rx="10" ry="14" fill="url(#rubyEyeGlow)" stroke="#F5D67B" strokeWidth="2.5" />
        <ellipse cx="157" cy="148" rx="4" ry="7" fill="#1A0005" />
        <circle cx="154" cy="145" r="2.5" fill="#FFFFFF" />

        {/* Golden Dragon Horn / Crown */}
        <path d="M 145 110 C 152 80, 178 75, 170 105 Z" fill="url(#goldFiligreePatina)" stroke="#2B1D12" strokeWidth="1.5" />

        {/* --- YAAZHI RIDER (ROYAL VIJAYANAGARA WARRIOR) --- */}
        <g id="warrior-rider">
          {/* Warrior Helmet / Kireedam */}
          <path d="M 75 275 L 85 250 L 95 275 Z" fill="url(#goldFiligreePatina)" stroke="#2B1D12" strokeWidth="1" />
          {/* Warrior Face & Chiseled Features */}
          <circle cx="85" cy="285" r="15" fill="#3D2919" stroke="#8C6D1F" strokeWidth="1.5" />
          <ellipse cx="90" cy="283" rx="2" ry="3" fill="#FFF2B2" />
          {/* Warrior Muscular Torso & Arm with Reins */}
          <path d="M 78 300 C 70 330, 90 365, 110 380 C 125 365, 130 335, 108 308 Z" fill="#24170D" stroke="#6E4D30" strokeWidth="2" />
          {/* Golden Reins looping into beast's bit */}
          <path d="M 98 295 C 128 285, 152 260, 165 235" stroke="url(#goldFiligreePatina)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Warrior Leg clasping beast flank */}
          <path d="M 102 365 C 125 395, 132 445, 108 480" stroke="#3D2919" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 102 365 C 125 395, 132 445, 108 480" stroke="url(#stoneChiselHighlight)" strokeWidth="2" fill="none" />
        </g>

        {/* --- POWERFUL RAMPANT BODY & CLAWS --- */}
        <g id="yaazhi-flank-scrolls">
          {/* Ribs & Musculature */}
          <path d="M 110 200 C 140 220, 165 270, 170 325 C 175 380, 150 435, 120 480 Z" fill="url(#graniteDeepBlack)" stroke="#543B25" strokeWidth="2" />
          {/* Rampant Raised Paw with Sharp Talons */}
          <path d="M 155 265 C 190 270, 215 300, 200 330 C 188 340, 170 330, 160 310" fill="#2B1D12" stroke="url(#stoneChiselHighlight)" strokeWidth="2" />
          <path d="M 200 300 L 218 308 L 205 318 Z" fill="#FFF8E7" />
          <path d="M 195 320 L 212 330 L 198 338 Z" fill="#FFF8E7" />
          
          {/* Ornate Makara Medallion on Flank */}
          <circle cx="132" cy="425" r="18" fill="#1A110A" stroke="url(#goldFiligreePatina)" strokeWidth="2" strokeDasharray="4,2" />
          <circle cx="132" cy="425" r="8" fill="#543B25" stroke="#D4AF37" strokeWidth="1.5" />
        </g>

        {/* ================= CRUSHED GAJA-ELEPHANT BASE ================= */}
        <g id="gaja-elephant-base" transform="translate(15, 30)">
          {/* Elephant Muscular Back under Yaazhi claws */}
          <path
            d="M 45 540
               C 75 505, 125 505, 155 540
               C 172 570, 165 615, 142 645
               C 118 670, 68 670, 45 645 Z"
            fill="#22160E"
            stroke="#543B25"
            strokeWidth="2.5"
          />
          {/* Wrinkled Elephant Ear & Massive Head */}
          <path d="M 130 550 C 155 550, 172 575, 165 605 C 152 622, 130 615, 125 592 Z" fill="#332115" stroke="#78563A" strokeWidth="2" />
          {/* Polished Ivory Tusk */}
          <path d="M 152 595 C 176 592, 188 578, 182 566" stroke="#FFF9EB" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          {/* Curled Trunk Raised upward */}
          <path d="M 148 605 C 166 630, 166 670, 142 692" stroke="#22160E" strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d="M 148 605 C 166 630, 166 670, 142 692" stroke="url(#stoneChiselHighlight)" strokeWidth="2" fill="none" />
        </g>

        {/* ================= PADMA PEEDAM (LOTUS PEDESTAL BASE) ================= */}
        <g id="monolithic-pedestal-base">
          {/* Stepped Granite Base Plinth */}
          <rect x="25" y="720" width="200" height="24" rx="2" fill="url(#graniteDeepBlack)" stroke="url(#goldFiligreePatina)" strokeWidth="1.8" />
          {/* Carved Double Lotus Petals (Adhopadma & Urdhvapadma) */}
          <path
            d="M 30 744
               C 42 762, 55 762, 68 744
               C 80 762, 93 762, 106 744
               C 118 762, 131 762, 144 744
               C 156 762, 169 762, 182 744
               C 194 762, 207 762, 220 744
               L 225 775 L 20 775 Z"
            fill="#1E140C"
            stroke="#8C6D1F"
            strokeWidth="1.5"
          />
          {/* Heavy Bottom Foundation Stone */}
          <rect x="15" y="775" width="220" height="20" rx="3" fill="#0A0604" stroke="url(#goldFiligreePatina)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
