import React, { useState } from 'react';
import { HeritageRewardCard, Submission } from '../types';
import { SpotifyHeritageCard } from './SpotifyHeritageCard';
import {
  Award,
  Sparkles,
  Flame,
  ShieldCheck,
  Share2,
  Download,
  Filter,
  UserCheck,
  Layers,
  Heart,
  ChevronRight,
} from 'lucide-react';

interface RewardsSectionViewProps {
  submissions?: Submission[];
  onNavigateLayer?: (layer: any) => void;
}

const DEFAULT_REWARD_CARDS: HeritageRewardCard[] = [
  {
    id: 'rew_pattamadai',
    traditionId: 'pattamadai-mats',
    traditionName: 'Pattamadai Silk Mat Weaving',
    tamilName: 'பத்தமடை பட்டுப்பாய்',
    tierTitle: 'Pattamadai Silk Vanguard',
    badgeName: 'Loom Master Sentinel • 120-Count Reeds',
    vitalityContribution: 10,
    unlockedAt: '2026-09-02',
    cardTheme: 'obsidian-gold',
    imageArtwork: '/images/pathamadai_paai.webp',
    quote: 'We split each Tambraparani river reed into 8 silky strands with our thumbnails to weave royal mats.',
    giTag: 'GI App No. 195',
    audioBarcodeTrackId: 'KALAI-PM-195-VOX',
    serialNumber: 'GRD-0195-2026',
  },
  {
    id: 'rew_aathangudi',
    traditionId: 'aathangudi-tiles',
    traditionName: 'Aathangudi Handmade Tiles',
    tamilName: 'ஆத்தங்குடி ஓடுகள்',
    tierTitle: 'Chettinad Master Mason',
    badgeName: 'Mineral Stencil Artisan • Chettinad Guild',
    vitalityContribution: 10,
    unlockedAt: '2026-09-02',
    cardTheme: 'chettinad-ruby',
    imageArtwork: '/images/athangudi_tiles.jpg',
    quote: 'Sun-cured local alluvial clay and mineral pigments hand-cast over flat glass plates without kiln-firing.',
    giTag: 'GI App No. 872',
    audioBarcodeTrackId: 'KALAI-AT-872-VOX',
    serialNumber: 'GRD-0872-2026',
  },
  {
    id: 'rew_swamimalai',
    traditionId: 'swamimalai-bronze',
    traditionName: 'Swamimalai Bronze Icons',
    tamilName: 'சுவாமிமலை வெண்கலச் சிலைகள்',
    tierTitle: 'Chola Lost-Wax Sthapati',
    badgeName: 'Panchaloha Metallurgical Medal • Dasa Tala',
    vitalityContribution: 15,
    unlockedAt: '2026-09-02',
    cardTheme: 'temple-granite',
    imageArtwork: '/images/Swamimalai_bronze_statue.webp',
    quote: 'Shaping beeswax freehand according to the sacred Shilpa Shastras canon and Kaveri alluvial clay moulds.',
    giTag: 'GI App No. 126',
    audioBarcodeTrackId: 'KALAI-SB-126-VOX',
    serialNumber: 'GRD-0126-2026',
  },
  {
    id: 'rew_masks',
    traditionId: 'tamil-masks',
    traditionName: 'Tamil Nadu Folk Masks & Terukkuttu',
    tamilName: 'நாட்டுப்புற முகமூடிகள்',
    tierTitle: 'Theyyam Mask Guardian',
    badgeName: 'Sacred Ritual Theatre • Celestial Ray Medal',
    vitalityContribution: 10,
    unlockedAt: '2026-09-02',
    cardTheme: 'chettinad-ruby',
    imageArtwork: '/images/Masks of india- Tamil Nadu.jpg',
    quote: 'Ornate wooden and papier-mâché masks representing guardian deities and centuries-old folk theatrical epics.',
    giTag: 'Folk Heritage',
    audioBarcodeTrackId: 'KALAI-TM-770-VOX',
    serialNumber: 'GRD-7701-2026',
  },
  {
    id: 'rew_thoyyil',
    traditionId: 'sangam-thoyyil',
    traditionName: 'Ancient Sangam Thoyyil & Body Motifs',
    tamilName: 'சங்ககாலத் தொய்யில்',
    tierTitle: 'Sangam Lineage Chronicler',
    badgeName: 'Botanical Sandalwood Art • Chola Aesthetics',
    vitalityContribution: 15,
    unlockedAt: '2026-09-02',
    cardTheme: 'kaveri-teal',
    imageArtwork: '/images/தொய்யில்_Thoyyil I can’t emphasise just how much we NEED to bring this back😩 [Leander_scribbles, Tamil, Tamil art, Tamil Tarot, Tamil history, Tamil culture, thoyyil, sangam, Chola, body art, line art, tattoo, ta.jpg',
    quote: 'Delicate sugarcane and botanical motifs painted with fragrant sandalwood paste documented in classical Sangam poetry.',
    giTag: 'Intangible Poetics',
    audioBarcodeTrackId: 'KALAI-TH-990-VOX',
    serialNumber: 'GRD-9904-2026',
  },
  {
    id: 'rew_pillars',
    traditionId: 'nellaiappar-pillars',
    traditionName: 'Nellaiappar Acoustic Stone Columns',
    tamilName: 'இசைத் தூண்கள்',
    tierTitle: 'Acoustic Granite Architect',
    badgeName: 'Sapthaswara Colonnettes • Nayaka Masonry',
    vitalityContribution: 10,
    unlockedAt: '2026-09-02',
    cardTheme: 'obsidian-gold',
    imageArtwork: '/images/musical_stone_pillar_Nellaippar_temple.jpg',
    quote: 'Monolithic resonant granite pillars tuned by ancient master sculptors to emit distinct musical frequencies.',
    giTag: 'Architectural Monument',
    audioBarcodeTrackId: 'KALAI-NP-440-VOX',
    serialNumber: 'GRD-4402-2026',
  },
];

export const RewardsSectionView: React.FC<RewardsSectionViewProps> = ({
  submissions = [],
  onNavigateLayer,
}) => {
  const [userName, setUserName] = useState('Guardian Raja');
  const [userRole, setUserRole] = useState('Field Sentinel • Tier III');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'primary' | 'folk' | 'architecture'>('all');
  const [activeCard, setActiveCard] = useState<HeritageRewardCard>(DEFAULT_REWARD_CARDS[0]);

  // Calculate live user stats
  const totalSubmissions = submissions.length;
  const totalPoints = 35 + totalSubmissions * 5;

  const filteredCards = DEFAULT_REWARD_CARDS.filter((c) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'primary') return ['pattamadai-mats', 'aathangudi-tiles', 'swamimalai-bronze'].includes(c.traditionId || '');
    if (selectedFilter === 'folk') return ['tamil-masks', 'sangam-thoyyil'].includes(c.traditionId || '');
    if (selectedFilter === 'architecture') return ['nellaiappar-pillars', 'aathangudi-tiles'].includes(c.traditionId || '');
    return true;
  });

  return (
    <div className="relative min-h-screen py-16 md:py-20 px-4 sm:px-6 lg:px-10 text-slate-100 z-10 select-none">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#c89d42]/20 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12151d] border border-[#c89d42]/30 text-[11px] font-['Cinzel'] tracking-widest text-[#e5c158] uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Sanctum Hall of Guardians</span>
            </div>
            <h1 className="font-['Cinzel'] font-bold text-3xl sm:text-5xl text-slate-100 tracking-wide">
              Living Heritage Rewards & Social Cards
            </h1>
            <p className="font-['Cormorant_Garamond'] text-base sm:text-lg text-slate-300 italic max-w-2xl">
              Spotify-styled custom cultural badges earned by completing field missions, verifying oral lineages, and protecting endangered traditions. Share your sovereign impact card with the world!
            </p>
          </div>

          {/* User Scorecard Telemetry Block */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#10131a] border border-[#c89d42]/30 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c89d42] to-[#fae17d] flex items-center justify-center text-black font-bold text-xl shadow-lg">
              <Flame className="w-6 h-6 fill-black" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Total Vitality Minted
              </span>
              <div className="text-2xl font-['Cinzel'] font-bold text-[#fae17d]">
                +{totalPoints} <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                {DEFAULT_REWARD_CARDS.length} Badges Unlocked
              </span>
            </div>
          </div>
        </div>

        {/* User Customizer Control Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0e14] border border-[#c89d42]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-full bg-[#181c26] border border-[#c89d42]/40 flex items-center justify-center text-[#fae17d] shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 w-full md:w-auto">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Customize Your Guardian Profile:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="px-3 py-1.5 rounded-lg bg-[#141822] border border-slate-700 focus:border-[#fae17d] text-xs font-mono text-slate-100 outline-none w-36 sm:w-44"
                />
                <input
                  type="text"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  placeholder="Enter Title"
                  className="px-3 py-1.5 rounded-lg bg-[#141822] border border-slate-700 focus:border-[#fae17d] text-xs font-mono text-[#fae17d] outline-none w-44 sm:w-52"
                />
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141822] border border-slate-800 text-xs font-mono self-stretch md:self-auto overflow-x-auto">
            {[
              { id: 'all', label: 'All Badges' },
              { id: 'primary', label: 'Primary GI' },
              { id: 'folk', label: 'Folk & Sangam' },
              { id: 'architecture', label: 'Architecture' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? 'bg-[#c89d42] text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Showcase Grid (Active Card Inspector + Grid of Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Spotify Hero Preview & Share Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-['Cinzel'] text-[#fae17d] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c89d42]" />
                <span>Live Shareable Card Preview:</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Ready for Instagram / X</span>
            </div>

            <SpotifyHeritageCard
              card={activeCard}
              userName={userName}
              userRole={userRole}
            />
          </div>

          {/* Right: Unlocked Rewards Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-['Cinzel'] text-slate-300 font-semibold uppercase tracking-wider">
                Select Badge to Customize & Export ({filteredCards.length}):
              </span>
              <span className="text-[10px] font-mono text-[#c89d42]">Click any card to inspect</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCards.map((card) => {
                const isSelected = activeCard.id === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveCard(card)}
                    data-cursor-hover="true"
                    className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group shadow-lg ${
                      isSelected
                        ? 'bg-[#181c26] border-2 border-[#fae17d] shadow-[0_0_25px_rgba(250,225,125,0.2)]'
                        : 'bg-[#10131a] hover:bg-[#141822] border border-[#c89d42]/25 hover:border-[#c89d42]/60'
                    }`}
                  >
                    {/* Artwork Preview Thumbnail */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-700">
                      <img
                        src={card.imageArtwork}
                        alt={card.traditionName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Floating Category Pill */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-[#c89d42]/40 text-[9px] font-mono text-[#fae17d]">
                        {card.giTag}
                      </span>

                      {/* Vitality Pill */}
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#c89d42] text-black text-[10px] font-mono font-bold">
                        +{card.vitalityContribution} pts
                      </span>
                    </div>

                    {/* Card Meta Info */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono text-[#c89d42] uppercase tracking-wider block font-semibold">
                        {card.badgeName.split('•')[0]}
                      </span>
                      <h4 className="font-['Cinzel'] font-bold text-lg text-slate-100 group-hover:text-[#fae17d] transition-colors leading-snug">
                        {card.tierTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate font-sans">
                        {card.traditionName}
                      </p>
                    </div>

                    {/* Select Indicator */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="text-[10px]">#{card.serialNumber}</span>
                      <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-[#fae17d]' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {isSelected ? 'Currently Selected' : 'Customize Card'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
