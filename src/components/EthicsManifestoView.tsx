import React from 'react';
import { BookOpen, ShieldCheck, HeartHandshake, MicOff, Lock, CheckCircle2 } from 'lucide-react';

export const EthicsManifestoView: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a24] border border-[#c89d42]/30 text-[#e5c158] text-xs font-['Cinzel'] tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5 text-[#c89d42]" />
          <span>ETHICAL CHARTER // CULTURAL SOVEREIGNTY</span>
        </div>
        <h2 className="font-['Cinzel'] font-bold text-3xl sm:text-4xl text-slate-100 tracking-wide">
          The Kalai Archival Manifesto
        </h2>
        <p className="font-['Cormorant_Garamond'] text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Our core commitments to hereditary practitioners, uncompromised oral history ethics, and community-owned data sovereignty.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-[#12151d] border border-[#c89d42]/30 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#181c26] border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42]">
            <MicOff className="w-6 h-6" />
          </div>
          <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100">
            Elder Voice Integrity & AI Policy
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            We will never replicate or clone any elder's uploaded voice. Every master testimony is preserved and used strictly as it is in its authentic original recording with lineage consent. For all other assistive narration and scholarship purposes, we only generate completely new synthetic voices.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-[#12151d] border border-[#c89d42]/30 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#181c26] border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100">
            Lineage Consent Protocols
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Communities retain full sovereignty over their sacred techniques. Field documentation can be designated as Open Public Archive or Community-Only Sacred Tier to prevent commercial exploitation of sacred formulas.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-[#12151d] border border-[#c89d42]/30 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#181c26] border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100">
            Direct-to-Artisan Value
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Every tradition profile directly links to authenticated Geographical Indication (GI) registries, master cooperatives, and fair-wage commissioning links without predatory middlemen cuts.
          </p>
        </div>
      </div>

      {/* Roadmap & Honesty Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#12151d] border border-[#c89d42]/30 shadow-2xl space-y-6">
        <h3 className="font-['Cinzel'] font-bold text-xl text-slate-100 pb-3 border-b border-slate-800">
          Honest Archival Roadmap // Phase 1 to Phase 3
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2 p-4 rounded-xl bg-[#0c0e14] border border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
              Phase 1 // Active Now
            </span>
            <h4 className="font-['Cinzel'] font-semibold text-sm text-slate-200">
              Grounded Index & Lens AI
            </h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Curated living tradition dossiers, oral audio repositories, UNESCO 9-factor diagnostic matrix, and camera-based motif grounding.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#0c0e14] border border-slate-800">
            <span className="text-[10px] font-mono text-[#c89d42] font-bold uppercase block">
              Phase 2 // Q3 2026
            </span>
            <h4 className="font-['Cinzel'] font-semibold text-sm text-slate-200">
              Cooperative Direct Trade
            </h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Blockchain-stamped GI authenticity certificates and direct commissioning portals linking architects and patrons to village workshops.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#0c0e14] border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">
              Phase 3 // Q4 2026
            </span>
            <h4 className="font-['Cinzel'] font-semibold text-sm text-slate-200">
              National Ethno-CAD Repository
            </h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Parametric CAD blueprints of Shilpa Shastra proportions, brass tile stencils, and thread-count algorithms for educational institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
