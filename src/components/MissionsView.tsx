import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2, AlertCircle, Sparkles, Filter, FileText, Lock, Globe, ArrowRight } from 'lucide-react';
import { Tradition, Mission, Submission, SubmissionConsent } from '../types';
import { TRADITIONS } from '../data/traditions';

interface MissionsViewProps {
  submissions: Submission[];
  onSubmitMission: (submission: Submission) => void;
  onSelectTradition: (tradition: Tradition) => void;
  prefillMissionData?: { photoUrl?: string; notes?: string } | null;
  traditions?: Tradition[];
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  submissions,
  onSubmitMission,
  onSelectTradition,
  prefillMissionData,
  traditions = TRADITIONS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [activeTradition, setActiveTradition] = useState<Tradition | null>(null);

  // Form state for submission modal
  const [evidenceText, setEvidenceText] = useState(prefillMissionData?.notes || '');
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(prefillMissionData?.photoUrl || null);
  const [consent, setConsent] = useState<SubmissionConsent>('public');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Aggregate all missions across traditions
  const allMissions = traditions.flatMap((t) =>
    t.missions.map((m) => ({ ...m, tradition: t }))
  );

  const filteredMissions = allMissions.filter((m) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'available') return m.status === 'available';
    if (selectedCategory === 'roadmap') return m.status === 'roadmap';
    return m.category === selectedCategory;
  });

  const handleOpenMission = (mission: Mission, tradition: Tradition) => {
    setActiveMission(mission);
    setActiveTradition(tradition);
    setEvidenceText(prefillMissionData?.notes || '');
    setEvidencePhoto(prefillMissionData?.photoUrl || null);
    setConsent('public');
    setSubmittedSuccess(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setEvidencePhoto(evt.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMission || !activeTradition) return;

    const newSub: Submission = {
      submissionId: `sub-${Date.now()}`,
      traditionId: activeTradition.id,
      missionId: activeMission.id,
      consent,
      evidence: {
        text: evidenceText,
        photoUrl: evidencePhoto,
      },
      submittedAt: new Date().toISOString(),
      vitalityDelta: activeMission.vitalityDelta || 5,
    };

    onSubmitMission(newSub);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setActiveMission(null);
      setActiveTradition(null);
      setSubmittedSuccess(false);
    }, 1800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a24] border border-[#c89d42]/30 text-[#e5c158] text-xs font-['Cinzel'] tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c89d42]" />
          <span>FIELD MISSIONS // PARTICIPATORY CULTURAL ACTION</span>
        </div>
        <h2 className="font-['Cinzel'] font-bold text-3xl sm:text-4xl text-slate-100 tracking-wide">
          Community Documentation Missions
        </h2>
        <p className="font-['Cormorant_Garamond'] text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Directly lift UNESCO vitality benchmarks by contributing verified audio, video, and motif field observations with strict practitioner lineage consent.
        </p>
      </div>

      {/* Filter Tabs with Sacred Pattern Motifs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
        {[
          { id: 'all', label: 'All Missions' },
          { id: 'available', label: 'Available' },
          { id: 'documentation', label: 'Documentation' },
          { id: 'transmission', label: 'Transmission' },
          { id: 'livelihood', label: 'Livelihood' },
          { id: 'roadmap', label: 'Roadmap' },
        ].map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              data-cursor-hover="true"
              className={`group px-3.5 py-1.5 rounded-xl font-['Cinzel'] text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black font-bold shadow-md'
                  : 'bg-[#12151d] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-[#c89d42]/30'
              }`}
            >
              <Sparkles
                className={`w-3 h-3 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-black' : 'text-[#c89d42]'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMissions.map((mission) => {
          const isCompleted = submissions.some((s) => s.missionId === mission.id);
          return (
            <div
              key={mission.id}
              className="p-5 rounded-2xl bg-[#12151d] border border-[#c89d42]/25 shadow-lg flex flex-col justify-between space-y-4 hover:border-[#c89d42]/50 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#c89d42] tracking-wider uppercase px-2 py-0.5 rounded bg-[#181c26] border border-[#c89d42]/30">
                    {mission.category}
                  </span>
                  {isCompleted ? (
                    <span className="text-[11px] text-emerald-400 font-['Cinzel'] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : mission.status === 'available' ? (
                    <span className="text-[11px] text-[#e5c158] font-mono font-bold">
                      +{mission.vitalityDelta || 5} Vitality
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">
                      Roadmap // Stage 2
                    </span>
                  )}
                </div>

                <h3 className="font-['Cinzel'] font-bold text-base text-slate-100 group-hover:text-[#fae17d] transition-colors">
                  {mission.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Tradition: <span className="text-slate-300 font-medium">{mission.tradition.name}</span>
                </p>
                {mission.whyItMatters && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
                    {mission.whyItMatters}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectTradition(mission.tradition)}
                  data-cursor-hover="true"
                  className="text-xs text-[#c89d42] hover:text-[#fae17d] font-['Cinzel'] flex items-center gap-1"
                >
                  <span>Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                {mission.status === 'available' && !isCompleted && (
                  <button
                    onClick={() => handleOpenMission(mission, mission.tradition)}
                    data-cursor-hover="true"
                    className="px-4 py-1.5 rounded-lg bg-[#c89d42] hover:bg-[#e5c158] text-black font-['Cinzel'] font-bold text-xs shadow transition-all"
                  >
                    Accept Mission
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeMission && activeTradition && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#12151d] border border-[#c89d42]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
            {submittedSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-['Cinzel'] font-bold text-2xl text-slate-100">
                  Field Evidence Recorded!
                </h3>
                <p className="text-sm text-[#e5c158] font-sans">
                  +{activeMission.vitalityDelta || 5} Vitality points contributed to {activeTradition.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-[#c89d42] uppercase tracking-wider">
                      Field Mission Verification
                    </span>
                    <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100">
                      {activeMission.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMission(null)}
                    className="text-slate-400 hover:text-white text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                {activeMission.prompt && (
                  <div className="p-3 rounded-xl bg-[#0b0c10] border border-slate-800 text-xs text-slate-300">
                    {activeMission.prompt}
                  </div>
                )}

                {/* Evidence Text */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Cinzel'] text-slate-300">
                    Field Notes & Observations:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                    placeholder="Describe the artisan encounter, techniques witnessed, materials, and verification details..."
                    className="w-full rounded-xl bg-[#0c0e14] border border-slate-700 p-3 text-xs text-slate-200 focus:border-[#c89d42] focus:outline-none"
                  />
                </div>

                {/* Evidence Photo */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-['Cinzel'] text-slate-300">
                    Attach Field Photo / Evidence:
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 rounded-xl bg-[#181c26] hover:bg-[#222836] border border-slate-700 text-xs text-slate-200 cursor-pointer flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5 text-[#c89d42]" />
                      <span>{evidencePhoto ? 'Change Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    {evidencePhoto && (
                      <span className="text-xs text-emerald-400 font-mono">
                        Photo Attached
                      </span>
                    )}
                  </div>
                </div>

                {/* Consent Sovereignty Selector */}
                <div className="p-3.5 rounded-xl bg-[#0c0e14] border border-slate-800 space-y-2">
                  <span className="text-xs font-['Cinzel'] text-[#c89d42] tracking-wider uppercase block">
                    Practitioner Lineage Consent:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConsent('public')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                        consent === 'public'
                          ? 'bg-[#181c26] border-[#c89d42] text-[#fae17d]'
                          : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5 text-[#c89d42]" />
                      <span>Public Open Archive</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsent('community-only')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                        consent === 'community-only'
                          ? 'bg-[#181c26] border-[#c89d42] text-[#fae17d]'
                          : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5 text-[#c89d42]" />
                      <span>Community-Only Tier</span>
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  data-cursor-hover="true"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs tracking-wider shadow-lg transition-all"
                >
                  Submit Field Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
