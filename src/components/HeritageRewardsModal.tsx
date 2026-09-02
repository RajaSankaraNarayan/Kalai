import React, { useState } from 'react';
import {
  Award,
  X,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  Volume2,
  Flame,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export interface TempleRewardCard {
  id: string;
  tier: string;
  points: number;
  title: string;
  tamilTitle: string;
  badgeName: string;
  image: string;
  description: string;
  iconography: string[];
  quote: string;
  serialNumber: string;
}

export const REWARD_CARDS: TempleRewardCard[] = [
  {
    id: 'card-ancient-elite',
    tier: 'ANCIENT ELITE TIER',
    points: 1000,
    title: 'Sacred Sanctum Sentinel',
    tamilTitle: 'மூலவர் கருவறைப் பாதுகாவலர்',
    badgeName: 'Imperial Vahana & Ganesha Seal',
    image: '/images/heritage_reward_card_1.jpg',
    description: 'The supreme honour conferred upon master guardians who document endangered classical temple architecture, sacred rock-cut friezes, and unbroken oral dynasties.',
    iconography: [
      'Murugan & Ganesha Vahana Sanctum Arch',
      'Kirtimukha Face of Glory crest',
      'Flanking Yaazhi granite colonnettes',
      'Sacred Pulli Kolam borders',
    ],
    quote: 'Guarding the sacred threshold of classical Dravidian temple iconography and living ritual sculpture.',
    serialNumber: 'KALAI-ELITE-1000-01',
  },
  {
    id: 'card-chola-sthapati',
    tier: 'CHOLA STHAPATI TIER',
    points: 750,
    title: 'Cosmic Nataraja & Yantra Sthapati',
    tamilTitle: 'சோழ ஸ்தபதி வெண்கலப் பதக்கம்',
    badgeName: 'Panchaloha Fire & Tala Seal',
    image: '/images/heritage_reward_card_2.jpg',
    description: 'Awarded for verifying thousand-year-old lost-wax metallurgical casting (Madhu-ucchishta Vidhana), sacred Tala proportions, and Kaveri clay mould lineages.',
    iconography: [
      'Anandatandava Nataraja in Tiruvasi ring of fire',
      'Sacred Yantra lotus petal geometries',
      'Celestial apsara sculptural reliefs',
      'Dasa Tala proportional canon',
    ],
    quote: 'Preserving the sacred metallurgical lost-wax bronze casting traditions of Swamimalai and Thanjavur.',
    serialNumber: 'KALAI-CHOLA-0750-02',
  },
  {
    id: 'card-royal-guild',
    tier: 'ROYAL GUILD TIER',
    points: 500,
    title: 'Theyyam & Silk Weave Master',
    tamilTitle: 'ராஜ நெசவு & முகமூடிக் காவலர்',
    badgeName: 'Mayil & Lotus Guild Seal',
    image: '/images/heritage_reward_card_3.jpg',
    description: 'Earned by documenting indigenous handloom warps (120-count Pattamadai Korai grass), folk ritual performance masks, and grassroots artisan guilds.',
    iconography: [
      'Sacred Theyyam celestial ray mask headdress',
      'Majestic flanking Mayil (Peacock) plumage',
      'Woven Korai reed & silk lotus mandala',
      'Anjali Mudra reverence base',
    ],
    quote: 'Sustaining the delicate handloom weaving and folk theatrical mask traditions of South Asia.',
    serialNumber: 'KALAI-GUILD-0500-03',
  },
];

interface HeritageRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints?: number;
}

export const HeritageRewardsModal: React.FC<HeritageRewardsModalProps> = ({
  isOpen,
  onClose,
  userPoints = 1250,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCard = REWARD_CARDS[selectedIndex];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % REWARD_CARDS.length);
    audioEngine.stopVoiceStory();
    setIsPlayingAudio(false);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + REWARD_CARDS.length) % REWARD_CARDS.length);
    audioEngine.stopVoiceStory();
    setIsPlayingAudio(false);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stopVoiceStory();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const promptText = `Heritage Reward Card: ${currentCard.tier}. ${currentCard.title}. ${currentCard.description}. ${currentCard.quote}`;
      audioEngine.playVoiceStory(promptText, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentCard.image;
    link.download = `Kalai_Heritage_Reward_${currentCard.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `🏛️ Conferred the "${currentCard.tier} • ${currentCard.title}" on KALAI for safeguarding living heritage and traditional crafts! 🇮🇳✨ #Kalai #LivingHeritage #SIH2026 #HeritageRewards`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn">
      {/* Dark Ambient Backdrop with Golden Hearth Blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-[#0c0e14] border-2 border-[#c89d42]/50 rounded-3xl shadow-[0_0_60px_rgba(200,157,66,0.3)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#c89d42]/30 flex items-center justify-between bg-gradient-to-r from-[#141822] via-[#0d0f15] to-[#141822]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c89d42] to-[#fae17d] flex items-center justify-center text-black font-bold shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Cinzel'] font-bold text-base sm:text-lg text-slate-100 tracking-wide">
                  HERITAGE REWARD CARDS
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#fae17d]/15 border border-[#fae17d]/40 text-[10px] font-mono text-[#fae17d]">
                  3 Master Tiers
                </span>
              </div>
              <p className="text-[11px] font-['Cormorant_Garamond'] italic text-[#c89d42]">
                Official Intangible Cultural Heritage Sovereign Badges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            data-cursor-hover="true"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Card Showcase + Right Metadata */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Interactive Card Viewer with Next/Prev (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-center space-y-3">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#c89d42]/60 shadow-2xl group bg-[#07080b]">
              <img
                src={currentCard.image}
                alt={currentCard.title}
                className="w-full h-auto object-contain max-h-[500px] transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Navigation Arrows on Card */}
              <button
                onClick={handlePrev}
                data-cursor-hover="true"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black border border-[#c89d42]/60 text-[#fae17d] flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                title="Previous Card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                data-cursor-hover="true"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black border border-[#c89d42]/60 text-[#fae17d] flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
                title="Next Card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Card Indicator Dots */}
              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-2">
                {REWARD_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedIndex(i);
                      audioEngine.stopVoiceStory();
                      setIsPlayingAudio(false);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      selectedIndex === i
                        ? 'bg-[#fae17d] w-6'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick 3-Card Thumbnail Selector */}
            <div className="flex items-center gap-2 pt-1">
              {REWARD_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    audioEngine.stopVoiceStory();
                    setIsPlayingAudio(false);
                  }}
                  data-cursor-hover="true"
                  className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedIndex === idx
                      ? 'border-[#fae17d] scale-105 shadow-md'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-center text-[#fae17d] py-0.5 leading-none">
                    {card.points} Pts
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Card Lore, Iconography & Actions (6 cols) */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#181c26] border border-[#c89d42]/40 text-[10px] font-mono font-bold text-[#fae17d] uppercase tracking-wider">
                  {currentCard.tier}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  ★ {currentCard.points} Vitality Points
                </span>
              </div>
              <h3 className="font-['Cinzel'] font-bold text-2xl sm:text-3xl text-slate-100">
                {currentCard.title}
              </h3>
              <p className="text-xs font-['Cormorant_Garamond'] italic text-[#c89d42]">
                {currentCard.tamilTitle} • {currentCard.badgeName}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs font-sans text-slate-300 leading-relaxed">
              {currentCard.description}
            </p>

            {/* Engraved Iconography Badges */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                Engraved Temple Iconography:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentCard.iconography.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#141822] border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Sovereign Quote */}
            <div className="p-3 rounded-xl bg-[#10131a] border-l-2 border-[#c89d42] text-xs font-['Cormorant_Garamond'] italic text-slate-300 leading-relaxed">
              "{currentCard.quote}"
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                data-cursor-hover="true"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Card (HD)</span>
              </button>

              <button
                onClick={handleShareTwitter}
                data-cursor-hover="true"
                className="px-4 py-2.5 rounded-xl bg-[#1e2330] hover:bg-[#283042] border border-[#c89d42]/40 text-[#fae17d] font-['Cinzel'] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Card</span>
              </button>

              <button
                onClick={handleToggleAudio}
                data-cursor-hover="true"
                className={`px-3 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  isPlayingAudio
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-[#141822] hover:bg-[#1a202c] border-slate-700 text-slate-300'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? 'Playing...' : 'Audio Lore'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
