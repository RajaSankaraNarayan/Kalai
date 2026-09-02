import React, { useState } from 'react';
import { TRADITIONS } from './data/traditions';
import { Tradition, SubmissionConsent, Submission, ActiveLayer } from './types';
import { Navbar } from './components/Navbar';
import { TempleGateHero } from './components/TempleGateHero';
import { TempleCorridorBackground } from './components/TempleCorridorBackground';
import { DiscoveryGrid } from './components/DiscoveryGrid';
import { SanctumModal } from './components/SanctumModal';
import { KalaiLensView } from './components/KalaiLensView';
import { MissionsView } from './components/MissionsView';
import { VitalityMatrixView } from './components/VitalityMatrixView';
import { EthicsManifestoView } from './components/EthicsManifestoView';
import { GoldenGlowCursor } from './components/GoldenGlowCursor';
import { GeminiHeritageAgent } from './components/GeminiHeritageAgent';
import { HeritageSacredBackground } from './components/HeritageSacredBackground';
import { HeritageRewardsModal } from './components/HeritageRewardsModal';
import { useParallaxScroll } from './hooks/useParallaxScroll';

export default function App() {
  const [traditions, setTraditions] = useState<Tradition[]>(TRADITIONS);
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>('gateway');
  const [activeTraditionId, setActiveTraditionId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isAgentOpen, setIsAgentOpen] = useState<boolean>(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState<boolean>(false);
  const scrollY = useParallaxScroll();

  // State for prefilling a mission from Lens
  const [prefillMissionData, setPrefillMissionData] = useState<{
    photoUrl?: string;
    notes?: string;
  } | null>(null);

  // Gate Opening Action
  const handleOpenGate = () => {
    setIsGateOpen(true);
  };

  // Re-seal Sanctum Gate Action
  const handleResetGate = () => {
    setIsGateOpen(false);
    setActiveLayer('gateway');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch Layer
  const handleNavigateLayer = (layer: ActiveLayer) => {
    if (layer !== 'gateway') {
      setIsGateOpen(true);
    }
    setActiveLayer(layer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch discovery mission from Kalai Lens
  const handleLaunchDiscoveryMission = (photoUrl: string, initialNotes: string) => {
    setPrefillMissionData({ photoUrl, notes: initialNotes });
    setActiveLayer('missions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Tradition to open Sanctum Dossier
  const handleSelectTraditionById = (id: string) => {
    setActiveTraditionId(id);
  };

  const handleSelectTraditionObject = (trad: Tradition) => {
    setActiveTraditionId(trad.id);
  };

  // Submit Mission & Update Living Vitality
  const handleSubmitMission = (
    traditionId: string,
    missionId: string,
    consent: SubmissionConsent,
    evidence: { text: string; photoUrl?: string | null }
  ) => {
    setTraditions((prev) =>
      prev.map((trad) => {
        if (trad.id !== traditionId) return trad;

        const mission = trad.missions.find((m) => m.id === missionId);
        const delta = mission?.vitalityDelta || 5;

        // Increase factor score
        const updatedFactors = trad.vitalityProfile.factors.map((factor) => {
          if (
            factor.id === 'factor6_MaterialsForDocumentation' ||
            factor.id === 'factor9_QualityOfDocumentation'
          ) {
            return {
              ...factor,
              score: Math.min(5, factor.score + 1),
              evidence: 'Updated via verified community field mission evidence.',
            };
          }
          return factor;
        });

        // Recalculate composite vitality score
        const factorSum = updatedFactors.reduce((acc, f) => acc + f.score, 0);
        const computedScore = Math.round((factorSum / 45) * 100);
        const newVitalityScore = Math.min(100, Math.max(trad.vitalityProfile.vitalityScore + delta, computedScore));

        const updatedMissions = trad.missions.map((m) =>
          m.id === missionId ? { ...m, status: 'completed' as const } : m
        );

        return {
          ...trad,
          vitalityProfile: {
            ...trad.vitalityProfile,
            vitalityScore: newVitalityScore,
            factors: updatedFactors,
          },
          missions: updatedMissions,
        };
      })
    );

    const newSubmission: Submission = {
      submissionId: `sub_${Date.now()}`,
      traditionId,
      missionId,
      consent,
      evidence,
      submittedAt: new Date().toISOString(),
      vitalityDelta: 5,
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  const handleCustomMissionSubmit = (submission: Submission) => {
    handleSubmitMission(
      submission.traditionId,
      submission.missionId,
      submission.consent,
      submission.evidence
    );
  };

  const activeTradition = traditions.find((t) => t.id === activeTraditionId);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-slate-100 overflow-x-hidden select-none">
      {/* Custom Round Golden Glow Cursor */}
      <GoldenGlowCursor />

      {/* Neo-Classical Sticky Navigation Bar */}
      <Navbar
        activeLayer={activeLayer}
        onSelectLayer={handleNavigateLayer}
        onOpenGate={handleOpenGate}
        onResetGate={handleResetGate}
        isGateOpen={isGateOpen}
        onOpenAgent={() => setIsAgentOpen(true)}
        onOpenRewards={() => setIsRewardsOpen(true)}
      />

      {/* Global Black & Gold Sacred Heritage Background (Kolams, Embroidery, Yaazhi, Masks) */}
      <HeritageSacredBackground
        isRevealed={isGateOpen || activeLayer !== 'gateway'}
        scrollYOffset={scrollY}
      />

      {/* Ambient Temple Corridor Parallax Background for Non-Gateway Views */}
      {activeLayer !== 'gateway' && (
        <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
          <TempleCorridorBackground isRevealed={true} scrollYOffset={scrollY} />
        </div>
      )}

      {/* Main Multi-Layer Content Switcher */}
      <main className={`relative z-10 ${activeLayer === 'gateway' ? '' : 'pt-16 sm:pt-20'}`}>
        {/* Layer 0: Sanctum Gateway Hero */}
        {activeLayer === 'gateway' && (
          <TempleGateHero
            isOpen={isGateOpen}
            onOpenGate={handleOpenGate}
            onNavigateLayer={handleNavigateLayer}
          />
        )}

        {/* Layer 1: Living Heritage Traditions Archive */}
        {activeLayer === 'traditions' && (
          <div className="animate-fadeIn">
            <DiscoveryGrid
              traditions={traditions}
              onSelectTradition={handleSelectTraditionById}
            />
          </div>
        )}

        {/* Layer 2: Kalai Lens AI Vision Grounding */}
        {activeLayer === 'lens' && (
          <div className="animate-fadeIn">
            <KalaiLensView
              onSelectTradition={handleSelectTraditionObject}
              onLaunchDiscoveryMission={handleLaunchDiscoveryMission}
            />
          </div>
        )}

        {/* Layer 4: Field Missions Hub */}
        {activeLayer === 'missions' && (
          <div className="animate-fadeIn">
            <MissionsView
              submissions={submissions}
              onSubmitMission={handleCustomMissionSubmit}
              onSelectTradition={handleSelectTraditionObject}
              prefillMissionData={prefillMissionData}
              traditions={traditions}
            />
          </div>
        )}

        {/* Layer 5: Vitality Matrix (UNESCO 9-Factor Diagnostics) */}
        {activeLayer === 'vitality-matrix' && (
          <div className="animate-fadeIn">
            <VitalityMatrixView
              onSelectTradition={handleSelectTraditionObject}
            />
          </div>
        )}

        {/* Layer 6: Archival Ethics & Manifesto */}
        {activeLayer === 'ethics-manifesto' && (
          <div className="animate-fadeIn">
            <EthicsManifestoView />
          </div>
        )}
      </main>

      {/* Full-Screen Sanctum Dossier Modal */}
      {activeTradition && (
        <SanctumModal
          tradition={activeTradition}
          isOpen={!!activeTradition}
          onClose={() => setActiveTraditionId(null)}
          onSubmitMission={handleSubmitMission}
        />
      )}

      {/* Living Cultural Heritage Gemini Agent */}
      <GeminiHeritageAgent
        isOpen={isAgentOpen}
        onToggle={() => setIsAgentOpen((prev) => !prev)}
        onClose={() => setIsAgentOpen(false)}
      />

      {/* Dedicated 3-Card Heritage Rewards Modal */}
      <HeritageRewardsModal
        isOpen={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
      />

      {/* Neo-Classical Archival Footer */}
      <footer className="py-12 px-6 border-t border-[#c89d42]/20 bg-[#0a0c10] text-center text-xs text-slate-400 select-none mt-16">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c89d42] shadow-[0_0_8px_#c89d42]" />
            <p className="font-['Cinzel'] font-bold text-slate-100 text-sm sm:text-base tracking-widest uppercase">
              KALAI · LIVING CULTURAL HERITAGE SANCTUM
            </p>
          </div>

          <p className="font-['Cormorant_Garamond'] italic text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            An ethical participatory repository preserving endangered South Asian traditions through community field documentation, UNESCO 9-factor vitality tracking, and verified oral histories.
          </p>

          {/* Layer Quick Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'traditions', label: 'Living Traditions' },
              { id: 'lens', label: 'Kalai Lens' },
              { id: 'missions', label: 'Field Missions' },
              { id: 'vitality-matrix', label: 'UNESCO Matrix' },
              { id: 'ethics-manifesto', label: 'Ethics Manifesto' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigateLayer(link.id as ActiveLayer)}
                data-cursor-hover="true"
                className="px-3 py-1 rounded-lg bg-[#12151d] hover:bg-[#1c202c] border border-slate-800 hover:border-[#c89d42]/40 text-slate-300 hover:text-[#fae17d] text-[11px] font-['Cinzel'] transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest flex flex-wrap items-center justify-center gap-3">
            <span className="px-2 py-0.5 rounded bg-[#10131a] border border-slate-800">NEO-CLASSICAL ARCHITECTURE</span>
            <span className="px-2 py-0.5 rounded bg-[#10131a] border border-slate-800">UNESCO ICH 9-FACTOR FRAMEWORK</span>
            <span className="px-2 py-0.5 rounded bg-[#10131a] border border-slate-800">ZERO VOICE-CLONING ETHICS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
