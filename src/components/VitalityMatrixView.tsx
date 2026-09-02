import React, { useState } from 'react';
import { BarChart3, AlertTriangle, ShieldCheck, Info, ArrowRight, Activity, Award, Sparkles } from 'lucide-react';
import { TRADITIONS } from '../data/traditions';
import { Tradition, VitalityFactor } from '../types';

interface VitalityMatrixViewProps {
  onSelectTradition: (tradition: Tradition) => void;
}

export const VitalityMatrixView: React.FC<VitalityMatrixViewProps> = ({
  onSelectTradition,
}) => {
  const [selectedTradition, setSelectedTradition] = useState<Tradition>(TRADITIONS[0]);

  // Factor definitions for UNESCO 9-factor framework
  const FACTOR_INFO: { [key: string]: { label: string; desc: string } } = {
    factor1_Transmission: {
      label: '1. Intergenerational Transmission',
      desc: 'How actively is the craft or oral knowledge passed to children and apprentices?',
    },
    factor2_Practitioners: {
      label: '2. Absolute Number of Practitioners',
      desc: 'Count of master artisans or performers capable of full execution.',
    },
    factor3_ProportionWithinCommunity: {
      label: '3. Proportion Within Community',
      desc: 'Percentage of the native settlement engaged in the practice.',
    },
    factor4_DomainsOfUse: {
      label: '4. Domains of Use',
      desc: 'Where is it used? (Daily life, temple rites, weddings, or museum exhibits).',
    },
    factor5_ResponseToNewDomains: {
      label: '5. Response to New Media & Markets',
      desc: 'Adaptation into modern architecture, fashion, or digital channels.',
    },
    factor6_MaterialsForDocumentation: {
      label: '6. Materials for Documentation',
      desc: 'Availability of botanical, metallurgical, or musical blueprints.',
    },
    factor7_InstitutionalAttitudes: {
      label: '7. Institutional Policy & Support',
      desc: 'Official state protections like GI Tags, pensions, and museum acquisitions.',
    },
    factor8_CommunityAttitudes: {
      label: '8. Community Reverence & Self-Esteem',
      desc: 'How strongly does the community revere their hereditary tradition?',
    },
    factor9_QualityOfDocumentation: {
      label: '9. Quality of Documentation',
      desc: 'Depth of scholarly recordings, audio transcripts, and CAD patterns.',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a24] border border-[#c89d42]/30 text-[#e5c158] text-xs font-['Cinzel'] tracking-widest uppercase">
          <BarChart3 className="w-3.5 h-3.5 text-[#c89d42]" />
          <span>VITALITY MATRIX // UNESCO 9-FACTOR DIAGNOSTIC</span>
        </div>
        <h2 className="font-['Cinzel'] font-bold text-3xl sm:text-4xl text-slate-100 tracking-wide">
          Living Cultural Vitality Matrix
        </h2>
        <p className="font-['Cormorant_Garamond'] text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Standardized empirical assessment measuring endangerment, transmission health, and documentation quality across South Asian heritage lineages.
        </p>
      </div>

      {/* Tradition Selector Bar with Sacred Motifs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2">
        {TRADITIONS.map((t, idx) => {
          const isSelected = selectedTradition.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTradition(t)}
              data-cursor-hover="true"
              className={`px-4 py-2 rounded-xl text-xs font-['Cinzel'] whitespace-nowrap transition-all flex items-center gap-2 group ${
                isSelected
                  ? 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black font-bold shadow-md'
                  : 'bg-[#12151d] text-slate-300 hover:text-white border border-slate-800 hover:border-[#c89d42]/30'
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-black' : 'text-[#c89d42]'
                }`}
              />
              <span>{t.name}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                isSelected ? 'bg-black/30 text-black' : 'bg-black text-[#e5c158]'
              }`}>
                {t.vitalityProfile.vitalityScore}/100
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Board */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#12151d] border border-[#c89d42]/30 shadow-2xl space-y-8">
        {/* Tradition Header & Overall Score Gauge */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#c89d42]">
                {selectedTradition.giTag || selectedTradition.region}
              </span>
              {selectedTradition.vitalityProfile.concentrationRisk && (
                <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-[10px] font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Concentration Risk
                </span>
              )}
            </div>
            <h3 className="font-['Cinzel'] font-bold text-2xl sm:text-3xl text-slate-100">
              {selectedTradition.name}
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Active Workforce: {selectedTradition.activePractitionersSummary}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Composite Vitality Index
              </span>
              <span className="font-['Cinzel'] font-black text-4xl text-[#fae17d]">
                {selectedTradition.vitalityProfile.vitalityScore}
                <span className="text-lg text-slate-500 font-sans">/100</span>
              </span>
            </div>
            <button
              onClick={() => onSelectTradition(selectedTradition)}
              data-cursor-hover="true"
              className="px-5 py-2.5 rounded-xl bg-[#181c26] hover:bg-[#222836] border border-[#c89d42]/40 text-[#fae17d] text-xs font-['Cinzel'] font-semibold flex items-center gap-2 transition-all shadow"
            >
              <span>Full Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 9-Factor Diagnostic Cards */}
        <div className="space-y-4">
          <h4 className="text-xs font-['Cinzel'] text-[#c89d42] tracking-wider uppercase">
            9-Factor Evidence Breakdown (Score Range 0 - 5)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedTradition.vitalityProfile.factors.map((factor) => {
              const meta = FACTOR_INFO[factor.id] || { label: factor.label, desc: '' };
              const scorePercent = (factor.score / 5) * 100;
              return (
                <div
                  key={factor.id}
                  className="p-4 rounded-xl bg-[#0c0e14] border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        Factor Score
                      </span>
                      <span className="font-mono font-bold text-xs text-[#fae17d]">
                        {factor.score} / 5
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#c89d42] to-[#fae17d]"
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                    <h5 className="font-['Cinzel'] font-bold text-xs text-slate-200 pt-1">
                      {meta.label}
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">
                      {factor.explanation}
                    </p>
                  </div>

                  {factor.evidence && (
                    <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono italic">
                      Evidence: {factor.evidence}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
