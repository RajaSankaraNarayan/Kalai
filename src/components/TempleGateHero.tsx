import React, { useState, useEffect } from 'react';
import { SikkuKolamMedallion } from './SikkuKolamMedallion';
import { YaazhiPillar } from './YaazhiPillar';
import { TempleCorridorBackground } from './TempleCorridorBackground';
import { audioEngine } from '../utils/audioEngine';
import { ActiveLayer } from '../types';
import { useParallaxScroll } from '../hooks/useParallaxScroll';
import { Sparkles, Compass, Camera, BookOpen, ShieldCheck } from 'lucide-react';

interface TempleGateHeroProps {
  isOpen: boolean;
  onOpenGate: () => void;
  onNavigateLayer: (layer: ActiveLayer) => void;
}

export const TempleGateHero: React.FC<TempleGateHeroProps> = ({
  isOpen,
  onOpenGate,
  onNavigateLayer,
}) => {
  const scrollY = useParallaxScroll();
  const [medallionHovered, setMedallionHovered] = useState(false);
  const [doorsSwung, setDoorsSwung] = useState(isOpen);
  const [guardiansReceded, setGuardiansReceded] = useState(isOpen);
  const [contentRevealed, setContentRevealed] = useState(isOpen);

  // Sync state if isOpen prop changes externally
  useEffect(() => {
    if (isOpen) {
      setDoorsSwung(true);
      setGuardiansReceded(true);
      setContentRevealed(true);
    } else {
      setDoorsSwung(false);
      setGuardiansReceded(false);
      setContentRevealed(false);
    }
  }, [isOpen]);

  const handleMedallionClick = () => {
    if (isOpen) return;

    // Trigger acoustic temple bell chime & ambient tanpura drone
    audioEngine.playTempleBell(1.0);
    audioEngine.startAmbientDrone();

    onOpenGate();

    // Smooth physical gate opening sequence
    setTimeout(() => {
      setDoorsSwung(true);
    }, 150);

    setTimeout(() => {
      setGuardiansReceded(true);
    }, 350);

    setTimeout(() => {
      setContentRevealed(true);
    }, 850);
  };

  // Subtle Parallax displacements for atrium elements
  const atriumParallaxY = scrollY * 0.18;
  const wordmarkParallaxY = scrollY * 0.1;
  const cardsParallaxY = scrollY * 0.22;

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#07080b] flex items-center justify-center select-none pt-12 sm:pt-0">
      {/* 1. Realistic Temple Corridor Sanctuary Background with Parallax */}
      <TempleCorridorBackground isRevealed={isOpen} scrollYOffset={scrollY} />

      {/* 1.5. Flanking Realistic Yaazhi Guardian Monolithic Pillars with Parallax */}
      <div className="absolute inset-0 z-10 pointer-events-none flex justify-between items-center px-1 sm:px-4 md:px-8">
        <YaazhiPillar side="left" isReceded={guardiansReceded} scrollYOffset={scrollY} parallaxSpeed={0.14} />
        <YaazhiPillar side="right" isReceded={guardiansReceded} scrollYOffset={scrollY} parallaxSpeed={0.14} />
      </div>

      {/* 2. Realistic Heavy Weathered Teakwood Doors Assembly & Sikku Kolam Medallion */}
      <div
        className={`absolute inset-0 z-20 flex transition-all duration-[1600ms] ${
          doorsSwung
            ? 'pointer-events-none opacity-0 delay-[1000ms]'
            : 'pointer-events-auto opacity-100'
        }`}
        style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}
      >
        {/* Left Door Leaf */}
        <div
          className="w-1/2 h-full relative transition-transform duration-[2000ms] ease-[cubic-bezier(0.65,0,0.35,1)] border-r-2 border-[#100a06]"
          style={{
            transformOrigin: 'left center',
            transform: doorsSwung ? 'rotateY(-115deg)' : 'rotateY(0deg)',
            background: 'linear-gradient(90deg, #110904 0%, #1c1109 25%, #25160c 60%, #150d07 90%, #0d0703 100%)',
            boxShadow: doorsSwung
              ? 'none'
              : 'inset 0 0 160px rgba(0,0,0,0.95), inset -30px 0 60px rgba(0,0,0,0.9), 25px 0 60px rgba(0,0,0,0.95)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Vertical Timber Plank Grooves */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-25">
            <div className="w-[1px] h-full bg-[#000000]" />
            <div className="w-[1px] h-full bg-[#3d2716]" />
            <div className="w-[1px] h-full bg-[#000000]" />
            <div className="w-[1px] h-full bg-[#3d2716]" />
            <div className="w-[1px] h-full bg-[#000000]" />
          </div>

          {/* Heavy Matte Iron & Brass Cross Straps (Top) */}
          <div className="absolute top-[18%] left-0 right-0 h-9 bg-gradient-to-b from-[#2a1d13] via-[#140d08] to-[#0a0502] border-y border-[#4a321f] flex items-center justify-around px-4 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-b from-[#b38f2d] to-[#4a3610] border border-[#1a1109] shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#fde68a]" />
              </div>
            ))}
          </div>
          {/* Heavy Matte Iron & Brass Cross Straps (Bottom) */}
          <div className="absolute bottom-[22%] left-0 right-0 h-9 bg-gradient-to-b from-[#2a1d13] via-[#140d08] to-[#0a0502] border-y border-[#4a321f] flex items-center justify-around px-4 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-b from-[#b38f2d] to-[#4a3610] border border-[#1a1109] shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#fde68a]" />
              </div>
            ))}
          </div>

          {/* Carved Teak Frame */}
          <div className="absolute inset-4 sm:inset-8 md:inset-14 border border-[#382618] p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
            <div className="h-24 sm:h-28 border border-[#4a321f]/50 bg-[#120a05] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#8c6d1f]/40 flex items-center justify-center bg-[#0a0502]">
                <div className="w-8 h-8 rotate-45 border border-[#c89d42]/40 bg-[#c89d42]/10" />
              </div>
            </div>

            <div className="flex-1 my-3 sm:my-4 border border-[#332014]/60 bg-[#0e0703] grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-[#26160d] flex items-center justify-center bg-[#070402]">
                  <div className="w-6 h-6 rounded-full border border-[#8c6d1f]/30 bg-[#140d06]" />
                </div>
              ))}
            </div>

            <div className="h-16 sm:h-20 border border-[#4a321f]/50 bg-[#120a05] flex items-center justify-center">
              <div className="w-1/2 h-1.5 bg-[#c89d42]/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Door Leaf */}
        <div
          className="w-1/2 h-full relative transition-transform duration-[2000ms] ease-[cubic-bezier(0.65,0,0.35,1)] border-l-2 border-[#100a06]"
          style={{
            transformOrigin: 'right center',
            transform: doorsSwung ? 'rotateY(115deg)' : 'rotateY(0deg)',
            background: 'linear-gradient(270deg, #110904 0%, #1c1109 25%, #25160c 60%, #150d07 90%, #0d0703 100%)',
            boxShadow: doorsSwung
              ? 'none'
              : 'inset 0 0 160px rgba(0,0,0,0.95), inset 30px 0 60px rgba(0,0,0,0.9), -25px 0 60px rgba(0,0,0,0.95)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Vertical Timber Plank Grooves */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-25">
            <div className="w-[1px] h-full bg-[#000000]" />
            <div className="w-[1px] h-full bg-[#3d2716]" />
            <div className="w-[1px] h-full bg-[#000000]" />
            <div className="w-[1px] h-full bg-[#3d2716]" />
            <div className="w-[1px] h-full bg-[#000000]" />
          </div>

          {/* Heavy Matte Iron & Brass Cross Straps (Top) */}
          <div className="absolute top-[18%] left-0 right-0 h-9 bg-gradient-to-b from-[#2a1d13] via-[#140d08] to-[#0a0502] border-y border-[#4a321f] flex items-center justify-around px-4 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-b from-[#b38f2d] to-[#4a3610] border border-[#1a1109] shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#fde68a]" />
              </div>
            ))}
          </div>
          {/* Heavy Matte Iron & Brass Cross Straps (Bottom) */}
          <div className="absolute bottom-[22%] left-0 right-0 h-9 bg-gradient-to-b from-[#2a1d13] via-[#140d08] to-[#0a0502] border-y border-[#4a321f] flex items-center justify-around px-4 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-b from-[#b38f2d] to-[#4a3610] border border-[#1a1109] shadow-inner flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#fde68a]" />
              </div>
            ))}
          </div>

          {/* Carved Teak Frame */}
          <div className="absolute inset-4 sm:inset-8 md:inset-14 border border-[#382618] p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
            <div className="h-24 sm:h-28 border border-[#4a321f]/50 bg-[#120a05] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#8c6d1f]/40 flex items-center justify-center bg-[#0a0502]">
                <div className="w-8 h-8 rotate-45 border border-[#c89d42]/40 bg-[#c89d42]/10" />
              </div>
            </div>

            <div className="flex-1 my-3 sm:my-4 border border-[#332014]/60 bg-[#0e0703] grid grid-cols-2 gap-2 sm:gap-3 p-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-[#26160d] flex items-center justify-center bg-[#070402]">
                  <div className="w-6 h-6 rounded-full border border-[#8c6d1f]/30 bg-[#140d06]" />
                </div>
              ))}
            </div>

            <div className="h-16 sm:h-20 border border-[#4a321f]/50 bg-[#120a05] flex items-center justify-center">
              <div className="w-1/2 h-1.5 bg-[#c89d42]/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Center Embedded Sikku Kolam Medallion Door Seal / Knocker */}
        <button
          onClick={handleMedallionClick}
          onMouseEnter={() => setMedallionHovered(true)}
          onMouseLeave={() => setMedallionHovered(false)}
          aria-label="Unlock the sanctum gate with Sikku Kolam medallion"
          data-cursor-hover="true"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto p-4 rounded-full transition-all duration-700 focus:outline-none cursor-pointer ${
            doorsSwung ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100 hover:scale-105'
          }`}
        >
          {/* Embedded Sacred Sikku Kolam Medallion Artwork */}
          <SikkuKolamMedallion isHovered={medallionHovered} isOpen={doorsSwung} />

          {/* Archival Instruction Pill */}
          <div className="mt-5 flex flex-col items-center">
            <span className="px-5 py-2 rounded-full bg-[#0b0c10]/95 border-2 border-[#c89d42]/60 text-[#fae17d] text-xs sm:text-sm font-['Cinzel'] tracking-widest uppercase shadow-[0_8px_25px_rgba(0,0,0,0.9)] backdrop-blur-md flex items-center gap-2.5 hover:border-[#fae17d] hover:shadow-[0_0_20px_rgba(200,157,66,0.5)] transition-all">
              <span className="w-2 h-2 rounded-full bg-[#fae17d] animate-ping" />
              Touch Medallion to Open Sanctum Gate
            </span>
          </div>
        </button>
      </div>

      {/* 3. Neo-Classical Sanctum Grand Atrium with Subtle Parallax Float (Revealed upon entrance) */}
      <div
        className={`relative z-[15] max-w-5xl px-6 text-center flex flex-col items-center justify-center gap-8 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          contentRevealed
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{
          transform: `translate3d(0, ${atriumParallaxY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Archival Classification Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#12141a]/90 border border-[#c89d42]/30 text-[#e5c158] text-xs tracking-widest uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#c89d42]" />
          <span className="font-['Cinzel'] font-medium">LIVING CULTURAL REPOSITORY & VITALITY BENCHMARK</span>
        </div>

        {/* Neo-Classical Wordmark */}
        <div
          className="space-y-3"
          style={{
            transform: `translate3d(0, ${wordmarkParallaxY}px, 0)`,
            willChange: 'transform',
          }}
        >
          <h1 className="font-['Cinzel'] font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-[#f8fafc] drop-shadow-[0_4px_20px_rgba(200,157,66,0.25)]">
            KALAI
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl md:text-4xl text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            "Every living tradition still has a pulse. Come find it."
          </p>
        </div>

        {/* Classical Multi-Layer Navigation Hub Quick-Launch Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-3xl mx-auto px-4 z-10"
          style={{
            transform: `translate3d(0, ${cardsParallaxY}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Layer 1: Heritage Index */}
          <button
            onClick={() => onNavigateLayer('traditions')}
            data-cursor-hover="true"
            className="p-4 rounded-xl bg-[#13161f]/80 hover:bg-[#1c202c]/90 border border-[#c89d42]/25 hover:border-[#c89d42]/60 transition-all duration-300 group flex flex-col justify-between shadow-lg"
          >
            <div className="flex items-center justify-between text-[#c89d42]">
              <Compass className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400">LAYER 01</span>
            </div>
            <div className="mt-3">
              <h3 className="font-['Cinzel'] text-sm font-semibold text-slate-100 group-hover:text-[#fae17d] transition-colors">
                Living Traditions
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal font-sans">
                Curated dossiers, master voices & 9-factor UNESCO metrics.
              </p>
            </div>
          </button>

          {/* Layer 2: Kalai Lens */}
          <button
            onClick={() => onNavigateLayer('lens')}
            data-cursor-hover="true"
            className="p-4 rounded-xl bg-[#13161f]/80 hover:bg-[#1c202c]/90 border border-[#c89d42]/25 hover:border-[#c89d42]/60 transition-all duration-300 group flex flex-col justify-between shadow-lg"
          >
            <div className="flex items-center justify-between text-[#c89d42]">
              <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400">LAYER 02</span>
            </div>
            <div className="mt-3">
              <h3 className="font-['Cinzel'] text-sm font-semibold text-slate-100 group-hover:text-[#fae17d] transition-colors">
                Kalai Lens AI
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal font-sans">
                Visual motif camera grounding & inscription matching.
              </p>
            </div>
          </button>
          {/* Layer 4: Field Missions */}
          <button
            onClick={() => onNavigateLayer('missions')}
            data-cursor-hover="true"
            className="p-4 rounded-xl bg-[#13161f]/80 hover:bg-[#1c202c]/90 border border-[#c89d42]/25 hover:border-[#c89d42]/60 transition-all duration-300 group flex flex-col justify-between shadow-lg"
          >
            <div className="flex items-center justify-between text-[#c89d42]">
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400">LAYER 04</span>
            </div>
            <div className="mt-3">
              <h3 className="font-['Cinzel'] text-sm font-semibold text-slate-100 group-hover:text-[#fae17d] transition-colors">
                Field Missions
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-normal font-sans">
                Community fieldwork with lineage consent protocols.
              </p>
            </div>
          </button>
        </div>

        {/* Direct Primary Action Button */}
        <div className="mt-2">
          <button
            onClick={() => onNavigateLayer('traditions')}
            data-cursor-hover="true"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c89d42] via-[#e5c158] to-[#b38838] text-[#0a0c10] font-['Cinzel'] font-bold text-sm tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_25px_rgba(200,157,66,0.35)] flex items-center gap-3"
          >
            <span>Explore Living Heritage Archive</span>
            <span className="text-base">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};


