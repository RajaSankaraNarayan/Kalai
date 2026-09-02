import React, { useRef, useState } from 'react';
import { HeritageRewardCard } from '../types';
import {
  Download,
  Share2,
  Sparkles,
  Volume2,
  CheckCircle2,
  Award,
  Copy,
  ExternalLink,
  ShieldCheck,
  Flame,
  Music,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface SpotifyHeritageCardProps {
  card: HeritageRewardCard;
  userName?: string;
  userRole?: string;
  onShare?: () => void;
  className?: string;
}

const THEME_STYLES = {
  'obsidian-gold': {
    bg: 'from-[#12151e] via-[#0a0c10] to-[#18150f]',
    border: 'border-[#c89d42]/40 hover:border-[#fae17d]/70',
    accentText: 'text-[#fae17d]',
    badgeBg: 'bg-[#fae17d]/10 text-[#fae17d] border-[#fae17d]/30',
    glow: 'shadow-[0_0_40px_rgba(200,157,66,0.25)]',
    barColor: '#fae17d',
  },
  'chettinad-ruby': {
    bg: 'from-[#220d13] via-[#12080c] to-[#1a0f12]',
    border: 'border-rose-700/50 hover:border-rose-400/80',
    accentText: 'text-rose-300',
    badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-700/40',
    glow: 'shadow-[0_0_40px_rgba(225,29,72,0.25)]',
    barColor: '#fda4af',
  },
  'kaveri-teal': {
    bg: 'from-[#0d1e22] via-[#081215] to-[#0a1818]',
    border: 'border-teal-600/50 hover:border-teal-400/80',
    accentText: 'text-teal-300',
    badgeBg: 'bg-teal-950/60 text-teal-300 border-teal-700/40',
    glow: 'shadow-[0_0_40px_rgba(20,184,166,0.25)]',
    barColor: '#5eead4',
  },
  'temple-granite': {
    bg: 'from-[#1e1c18] via-[#11100e] to-[#1a1712]',
    border: 'border-amber-600/50 hover:border-amber-400/80',
    accentText: 'text-amber-300',
    badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-700/40',
    glow: 'shadow-[0_0_40px_rgba(217,119,6,0.25)]',
    barColor: '#fcd34d',
  },
};

export const SpotifyHeritageCard: React.FC<SpotifyHeritageCardProps> = ({
  card,
  userName = 'Cultural Guardian',
  userRole = 'Field Sentinel',
  onShare,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(card.cardTheme || 'obsidian-gold');

  const theme = THEME_STYLES[selectedTheme] || THEME_STYLES['obsidian-gold'];

  // Audio Barcode heights to simulate Spotify soundwave barcode
  const barcodeHeights = [22, 14, 28, 8, 32, 18, 24, 12, 30, 16, 26, 10, 34, 20, 14, 28, 16, 22, 12, 30, 18, 26, 8, 24, 16, 32, 20, 14, 28, 18];

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopVoiceStory();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const audioPrompt = `This is the official Living Heritage Guardian Card awarded to ${userName} for safeguarding ${card.traditionName}. "${card.quote}"`;
      audioEngine.playVoiceStory(audioPrompt, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleCopyLink = () => {
    const textToCopy = `🏛️ I was awarded the "${card.tierTitle}" on KALAI for documenting ${card.traditionName}! Check out India's Living Heritage Sanctum: http://localhost:3000`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `🏛️ Proud to be recognized as "${card.tierTitle}" for safeguarding ${card.traditionName} on KALAI! 🇮🇳✨ #LivingHeritage #SIH2026 #Kalai #CulturalPreservation`
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleDownloadCard = () => {
    if (!cardRef.current) return;
    
    // Create an anchor download with custom SVG data
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900">
      <rect width="100%" height="100%" fill="#0a0c10"/>
      <rect x="20" y="20" width="560" height="860" rx="24" fill="#12151e" stroke="#c89d42" stroke-width="3"/>
      <text x="50%" y="80" fill="#fae17d" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">KALAI // GUARDIAN REWARD</text>
      <text x="50%" y="120" fill="#ffffff" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">${card.tierTitle}</text>
      <text x="50%" y="160" fill="#c89d42" font-size="18" font-family="sans-serif" text-anchor="middle">${card.traditionName}</text>
      <text x="50%" y="780" fill="#fae17d" font-size="16" font-family="sans-serif" text-anchor="middle">+${card.vitalityContribution} Vitality Points • Awarded to ${userName}</text>
      <text x="50%" y="820" fill="#94a3b8" font-size="14" font-family="sans-serif" text-anchor="middle">Verified on KALAI Living Sanctum // SIH 2026</text>
    </svg>`;
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Kalai_Reward_${card.id}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={`flex flex-col items-center space-y-4 max-w-sm sm:max-w-md w-full mx-auto ${className}`}>
      {/* Theme Switcher Chips */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0d0f15] border border-slate-800 text-[10px] font-mono">
        <span className="text-slate-500 px-2 uppercase font-semibold">Theme:</span>
        {[
          { id: 'obsidian-gold', label: 'Obsidian' },
          { id: 'chettinad-ruby', label: 'Ruby' },
          { id: 'kaveri-teal', label: 'Teal' },
          { id: 'temple-granite', label: 'Amber' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTheme(t.id as any)}
            className={`px-2.5 py-1 rounded-full transition-all ${
              selectedTheme === t.id
                ? 'bg-[#c89d42] text-black font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Spotify-Style Heritage Card */}
      <div
        ref={cardRef}
        className={`w-full rounded-3xl bg-gradient-to-b ${theme.bg} border-2 ${theme.border} ${theme.glow} p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden select-none transition-all duration-500`}
      >
        {/* Subtle Background Watermark Mask / Yantra Geometry */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-radial from-[#c89d42]/15 to-transparent rounded-full pointer-events-none blur-xl" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Card Header (Spotify Style) */}
        <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#c89d42] to-[#fae17d] flex items-center justify-center text-black font-bold text-xs shadow-md">
              க
            </div>
            <div>
              <span className="font-['Cinzel'] font-bold text-xs tracking-widest text-slate-200 block uppercase">
                KALAI // SANCTUM
              </span>
              <span className="text-[9px] font-mono text-slate-400 block leading-tight">
                LIVING HERITAGE WRAPPED
              </span>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase font-semibold flex items-center gap-1 ${theme.badgeBg}`}>
            <Sparkles className="w-3 h-3" />
            <span>Verified Mint</span>
          </div>
        </div>

        {/* Centerpiece Artwork Frame */}
        <div className="relative z-10 space-y-4">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#c89d42]/40 shadow-2xl group">
            <img
              src={card.imageArtwork}
              alt={card.traditionName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Guardian Name Badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#c89d42]/40 text-xs font-mono text-slate-100 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">{userName}</span>
              <span className="text-[10px] text-[#fae17d]">({userRole})</span>
            </div>

            {/* Circular Official Seal */}
            <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-black/85 border border-[#fae17d]/60 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-md">
              <Award className="w-4 h-4 text-[#fae17d]" />
              <span className="text-[7px] font-mono text-[#fae17d] uppercase tracking-tighter leading-none mt-0.5">
                GI 100%
              </span>
            </div>

            {/* Vitality Contribution Floating Pill */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#c89d42] text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1 shadow-md">
              <Flame className="w-3.5 h-3.5 fill-black" />
              <span>+{card.vitalityContribution} Vitality</span>
            </div>
          </div>

          {/* Titles & Quote */}
          <div className="space-y-1.5 text-left">
            <span className="text-[11px] font-mono text-[#c89d42] tracking-wider uppercase font-semibold block">
              {card.badgeName}
            </span>
            <h3 className="font-['Cinzel'] font-bold text-2xl sm:text-3xl text-slate-100 leading-tight">
              {card.tierTitle}
            </h3>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-xs font-['Cinzel'] text-slate-300 font-semibold">
                {card.traditionName}
              </span>
              {card.tamilName && (
                <span className="text-xs font-['Cormorant_Garamond'] italic text-[#fae17d]">
                  • {card.tamilName}
                </span>
              )}
            </div>
            <p className="text-xs font-['Cormorant_Garamond'] italic text-slate-300 leading-relaxed pt-1 border-l-2 border-[#c89d42]/50 pl-3">
              "{card.quote}"
            </p>
          </div>
        </div>

        {/* Spotify Soundwave Barcode & Audio Player Bar */}
        <div className="relative z-10 pt-2 border-t border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                data-cursor-hover="true"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-[#fae17d] hover:bg-[#c89d42] text-black'
                } shadow-md`}
                title="Play Audio Story"
              >
                {isPlayingAudio ? <Music className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-300 block font-semibold leading-none">
                  {isPlayingAudio ? 'Playing Oral History...' : 'Living Heritage Audio'}
                </span>
                <span className="text-[9px] font-mono text-slate-500 block leading-none mt-0.5">
                  Track ID: {card.audioBarcodeTrackId}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-400">
              #{card.serialNumber}
            </span>
          </div>

          {/* Spotify Style Soundwave Audio Barcode Graphic */}
          <div className="w-full h-8 px-2 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between gap-1 overflow-hidden">
            {barcodeHeights.map((h, i) => (
              <div
                key={i}
                style={{
                  height: `${h}px`,
                  backgroundColor: theme.barColor,
                  opacity: isPlayingAudio ? (i % 2 === 0 ? 0.95 : 0.6) : 0.75,
                }}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlayingAudio ? 'animate-pulse' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Share & Download Action Bar */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-1">
        <button
          onClick={handleDownloadCard}
          data-cursor-hover="true"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Card</span>
        </button>

        <button
          onClick={handleShareTwitter}
          data-cursor-hover="true"
          className="px-4 py-2.5 rounded-xl bg-[#1e2330] hover:bg-[#283042] border border-[#c89d42]/40 text-[#fae17d] font-['Cinzel'] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share on X</span>
        </button>

        <button
          onClick={handleCopyLink}
          data-cursor-hover="true"
          className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all"
        >
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};
