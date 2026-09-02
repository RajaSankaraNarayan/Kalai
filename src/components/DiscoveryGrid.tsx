import React, { useState } from 'react';
import { Tradition } from '../types';
import { Heartbeat } from './Heartbeat';
import { ShieldAlert, Compass, ArrowRight, Activity, Award, Sparkles, Volume2, Layers } from 'lucide-react';

interface DiscoveryGridProps {
  traditions: Tradition[];
  onSelectTradition: (traditionId: string) => void;
}

export const DiscoveryGrid: React.FC<DiscoveryGridProps> = ({
  traditions,
  onSelectTradition,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Traditions', match: () => true },
    { id: 'textile', label: 'Silk Mat Weaving', match: (cat: string) => cat.toLowerCase().includes('textile') || cat.toLowerCase().includes('mat') },
    { id: 'architecture', label: 'Tile & Architecture', match: (cat: string) => cat.toLowerCase().includes('architecture') || cat.toLowerCase().includes('tile') },
    { id: 'metallurgy', label: 'Bronze Metallurgy', match: (cat: string) => cat.toLowerCase().includes('metallurgy') || cat.toLowerCase().includes('sculpture') },
  ];

  const filteredTraditions = traditions.filter((t) => {
    if (activeCategory === 'all') return true;
    const catObj = categories.find((c) => c.id === activeCategory);
    return catObj ? catObj.match(t.category) : true;
  });

  return (
    <section
      id="discovery"
      className="relative min-h-screen py-16 md:py-20 px-4 sm:px-6 lg:px-10 bg-[#07080b] text-slate-100 overflow-hidden z-[20] select-none"
    >
      {/* Subtle Classical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#c89d4210_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-[2] max-w-7xl mx-auto space-y-10">
        {/* Neo-Classical Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#c89d42]/20 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12151d] border border-[#c89d42]/30 text-[11px] font-['Cinzel'] tracking-widest text-[#e5c158] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#c89d42]" />
              <span>LIVING HERITAGE INDEX // LAYER 01</span>
            </div>
            <h2 className="font-['Cinzel'] font-bold text-3xl sm:text-5xl text-slate-100 tracking-wide">
              Living Traditions Archive
            </h2>
            <p className="font-['Cormorant_Garamond'] italic text-slate-300 text-lg sm:text-2xl max-w-2xl leading-relaxed">
              "Curated artisanal lineages with verified oral histories, Geographical Indications, and UNESCO 9-factor vitality ratings."
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  data-cursor-hover="true"
                  className={`group px-3.5 py-2 rounded-xl text-xs font-['Cinzel'] tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black font-bold shadow-md'
                      : 'bg-[#12151d] text-slate-300 hover:text-white border border-slate-800 hover:border-[#c89d42]/40'
                  }`}
                >
                  <Sparkles
                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                      isSelected ? 'text-black' : 'text-[#c89d42]'
                    }`}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Traditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredTraditions.map((tradition) => {
            const hasConcentrationRisk = tradition.vitalityProfile.concentrationRisk;
            return (
              <article
                key={tradition.id}
                className="rounded-2xl bg-[#10131a] hover:bg-[#141822] border border-[#c89d42]/25 hover:border-[#c89d42]/60 p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Hero Image Banner */}
                  {tradition.heroImageUrl && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#c89d42]/30 shadow-md group-hover:border-[#c89d42]/60 transition-all">
                      <img
                        src={tradition.heroImageUrl}
                        alt={tradition.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-transparent to-black/30" />
                      
                      {/* Floating GI Tag on Image */}
                      {tradition.giTag && (
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#c89d42]/50 text-[10px] font-mono text-[#fae17d] tracking-wider uppercase flex items-center gap-1 shadow-lg">
                          <Award className="w-3 h-3 text-[#fae17d]" />
                          <span>{tradition.giTag}</span>
                        </div>
                      )}

                      {/* Region Badge */}
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#0a0c10]/90 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-slate-300">
                        {tradition.region.split(',')[0]}
                      </div>
                    </div>
                  )}

                  {/* Top Status & Risk Badges */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#181c26] border border-[#c89d42]/30 text-[10px] font-mono text-[#c89d42] tracking-wider uppercase">
                      {tradition.category}
                    </span>
                    {hasConcentrationRisk ? (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800 text-[10px] font-mono text-rose-300 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-rose-400" />
                        Concentration Risk
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        Active Lineage
                      </span>
                    )}
                  </div>

                  {/* Title & Tamil Name */}
                  <div className="space-y-1">
                    <h3 className="font-['Cinzel'] font-bold text-2xl text-slate-100 group-hover:text-[#fae17d] transition-colors">
                      {tradition.name}
                    </h3>
                    {tradition.tamilName && (
                      <p className="text-xs font-['Cormorant_Garamond'] italic text-[#e5c158]">
                        {tradition.tamilName} • {tradition.activePractitionersSummary}
                      </p>
                    )}
                  </div>

                  {/* One-liner quote */}
                  <div className="p-3.5 rounded-xl bg-[#0a0c10] border border-slate-800">
                    <p className="font-['Cormorant_Garamond'] text-sm sm:text-base text-slate-200 italic leading-relaxed">
                      "{tradition.oneLiner}"
                    </p>
                  </div>

                  {/* Telemetry Block */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-[#0a0c10] border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Vitality Index
                      </span>
                      <div className="text-xl font-['Cinzel'] font-bold text-[#fae17d]">
                        {tradition.vitalityProfile.vitalityScore}
                        <span className="text-xs text-slate-500 font-sans font-normal"> / 100</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0a0c10] border border-slate-800/80 space-y-1 flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Oral Voice
                      </span>
                      <div className="text-xs font-mono text-slate-200 truncate font-semibold flex items-center gap-1">
                        <Volume2 className="w-3 h-3 text-[#c89d42] shrink-0" />
                        <span className="truncate">{tradition.audio.speaker.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Oscilloscope Mini Pulse */}
                  <div className="p-2.5 rounded-xl bg-[#08090d] border border-slate-900 flex items-center justify-center">
                    <Heartbeat vitalityScore={tradition.vitalityProfile.vitalityScore} size="mini" />
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-sans">
                    {tradition.missions.length} Missions Active
                  </span>
                  <button
                    onClick={() => onSelectTradition(tradition.id)}
                    data-cursor-hover="true"
                    className="px-4 py-2 rounded-xl bg-[#181c26] group-hover:bg-gradient-to-r group-hover:from-[#c89d42] group-hover:to-[#b38838] border border-[#c89d42]/40 text-[#fae17d] group-hover:text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Inspect Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
