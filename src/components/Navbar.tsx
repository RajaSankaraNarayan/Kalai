import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, Compass, Camera, ShieldCheck, BarChart3, DoorOpen, Menu, X, Award, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ActiveLayer } from '../types';
import { SikkuKolamIcon, MandalaIcon } from './SacredPatterns';

interface NavbarProps {
  activeLayer: ActiveLayer;
  onSelectLayer: (layer: ActiveLayer) => void;
  onOpenGate: () => void;
  onResetGate?: () => void;
  isGateOpen: boolean;
  onOpenAgent?: () => void;
  onOpenRewards?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeLayer,
  onSelectLayer,
  onOpenGate,
  onResetGate,
  isGateOpen,
  onOpenAgent,
  onOpenRewards,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  const navItems: {
    id: ActiveLayer;
    label: string;
    icon: React.FC<{ className?: string }>;
    motifType: 'kolam' | 'mandala';
  }[] = [
    { id: 'traditions', label: 'Traditions', icon: Compass, motifType: 'kolam' },
    { id: 'lens', label: 'Kalai Lens', icon: Camera, motifType: 'mandala' },
    { id: 'missions', label: 'Field Missions', icon: ShieldCheck, motifType: 'mandala' },
    { id: 'vitality-matrix', label: 'Vitality Matrix', icon: BarChart3, motifType: 'kolam' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[80] px-3 sm:px-6 py-3 flex items-center justify-between pointer-events-none select-none">
      {/* Brand Identity / Neo-Classical Header */}
      <div className="flex items-center gap-3 pointer-events-auto bg-[#0d0f14]/90 backdrop-blur-md border border-[#c89d42]/30 px-3.5 py-2 rounded-xl shadow-lg">
        {/* Brand Home / Return to Gate */}
        <button
          onClick={() => onSelectLayer('gateway')}
          data-cursor-hover="true"
          title="Return to Sanctum Entrance"
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          {/* Round Bronze Emblem with Sikku Kolam in Middle */}
          <div className="w-7 h-7 rounded-full bg-[#15100a] border border-[#c89d42]/70 p-1 flex items-center justify-center group-hover:border-[#fae17d] group-hover:scale-110 transition-all shadow-[0_0_10px_rgba(200,157,66,0.35)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,225,125,0.25),transparent_70%)]" />
            <SikkuKolamIcon className="w-full h-full text-[#fae17d] relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Cinzel'] font-bold text-sm tracking-widest text-[#f8fafc] group-hover:text-[#fae17d] transition-colors flex items-center gap-1.5">
              <span>KALAI</span>
              <SikkuKolamIcon className="w-3 h-3 text-[#c89d42] opacity-70 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[9px] text-[#c89d42] font-mono tracking-wider uppercase font-medium">
              HERITAGE SANCTUM
            </span>
          </div>
        </button>
      </div>

      {/* Center Layer Navigation Tabs with Sacred Mandala / Sikku Kolam Motifs (Desktop) */}
      {isGateOpen && (
        <nav className="hidden md:flex items-center gap-1.5 pointer-events-auto bg-[#0d0f14]/90 backdrop-blur-md border border-[#c89d42]/30 px-2.5 py-1.5 rounded-2xl shadow-xl">
          {navItems.map((item) => {
            const isActive = activeLayer === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectLayer(item.id)}
                data-cursor-hover="true"
                className={`group relative px-3.5 py-1.5 rounded-xl font-['Cinzel'] text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c89d42]/30 to-[#e5c158]/20 border border-[#c89d42]/70 text-[#fae17d] shadow-[0_0_12px_rgba(200,157,66,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                {/* Subtle Motif Icon (Mandala or Sikku Kolam) */}
                {item.motifType === 'kolam' ? (
                  <SikkuKolamIcon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45 ${
                    isActive ? 'text-[#fae17d]' : 'text-[#c89d42]/70'
                  }`} />
                ) : (
                  <MandalaIcon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90 ${
                    isActive ? 'text-[#fae17d]' : 'text-[#c89d42]/70'
                  }`} />
                )}
                <span>{item.label}</span>

                {/* Active Underline Glow Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#fae17d] to-transparent shadow-[0_0_8px_#fae17d]" />
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* Right Action Tools Group */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Living Cultural Heritage Gemini Agent Button */}
        {onOpenAgent && (
          <button
            onClick={onOpenAgent}
            data-cursor-hover="true"
            title="Open Gemini Heritage Scholar"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">AI Scholar</span>
          </button>
        )}

        {/* Small Dedicated Rewards Tab Button (Not in main tabs) */}
        {onOpenRewards && (
          <button
            onClick={onOpenRewards}
            data-cursor-hover="true"
            title="Open Heritage Reward Cards"
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#18150f] to-[#12151e] hover:from-[#241f15] hover:to-[#1a1f2c] border border-[#c89d42]/60 hover:border-[#fae17d] text-[#fae17d] text-xs font-['Cinzel'] font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all"
          >
            <Award className="w-3.5 h-3.5 text-[#fae17d]" />
            <span className="hidden sm:inline">Rewards (3)</span>
          </button>
        )}

        {/* Mobile Layer Menu Toggle (When gate is open) */}
        {isGateOpen && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor-hover="true"
            className="md:hidden w-9 h-9 rounded-xl bg-[#0d0f14]/90 backdrop-blur-md border border-[#c89d42]/30 text-[#fae17d] flex items-center justify-center shadow-md"
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        {/* Gateway toggle / Re-seal option */}
        {isGateOpen && (
          <button
            onClick={() => {
              if (activeLayer === 'gateway' && onResetGate) {
                onResetGate();
              } else {
                onSelectLayer('gateway');
              }
            }}
            data-cursor-hover="true"
            title={activeLayer === 'gateway' ? 'Re-seal Sanctum Doors' : 'Return to Sanctum Gateway'}
            className="px-3 py-2 rounded-xl bg-[#0d0f14]/90 backdrop-blur-md border border-[#c89d42]/30 hover:border-[#c89d42]/70 text-[#c89d42] hover:text-[#fae17d] transition-all flex items-center gap-1.5 text-xs font-['Cinzel'] shadow-md"
          >
            <DoorOpen className="w-4 h-4" />
            <span className="hidden lg:inline">{activeLayer === 'gateway' ? 'Re-seal Doors' : 'Gate'}</span>
          </button>
        )}

        {/* Audio Mute / Unmute Toggle */}
        <button
          onClick={toggleSound}
          data-cursor-hover="true"
          title={isMuted ? 'Unmute Acoustic Sanctuary' : 'Mute Sanctuary Sounds'}
          className="w-9 h-9 rounded-xl bg-[#0d0f14]/90 backdrop-blur-md border border-[#c89d42]/30 hover:border-[#c89d42]/70 text-slate-200 hover:text-white flex items-center justify-center transition-all shadow-md"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#e5c158]" />
          )}
        </button>

        {/* Ethics & Manifesto Button */}
        <button
          onClick={() => onSelectLayer('ethics-manifesto')}
          data-cursor-hover="true"
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#181c26] to-[#12141c] hover:from-[#222836] hover:to-[#1a1d28] border border-[#c89d42]/40 text-[#fae17d] text-xs font-['Cinzel'] font-semibold tracking-wider flex items-center gap-2 shadow-md transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#c89d42]" />
          <span className="hidden sm:inline">Manifesto</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isGateOpen && mobileMenuOpen && (
        <div className="absolute top-16 left-3 right-3 bg-[#0d0f14]/95 backdrop-blur-xl border border-[#c89d42]/40 rounded-2xl p-4 shadow-2xl space-y-2 pointer-events-auto md:hidden animate-fadeIn">
          <div className="text-[10px] font-mono text-[#c89d42] uppercase tracking-wider px-2 pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Sanctum Layers</span>
            <SikkuKolamIcon className="w-3.5 h-3.5" />
          </div>
          {navItems.map((item) => {
            const isActive = activeLayer === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectLayer(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-['Cinzel'] text-xs tracking-wider flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[#181c26] border border-[#c89d42]/60 text-[#fae17d]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.motifType === 'kolam' ? (
                    <SikkuKolamIcon className="w-4 h-4 text-[#c89d42]" />
                  ) : (
                    <MandalaIcon className="w-4 h-4 text-[#c89d42]" />
                  )}
                  <span>{item.label}</span>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#fae17d]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

