import React, { useState, useRef, useEffect } from 'react';
import { Tradition, Mission, SubmissionConsent, ConfidenceLevel } from '../types';
import { Heartbeat } from './Heartbeat';
import { audioEngine } from '../utils/audioEngine';
import {
  Volume2,
  Play,
  Square,
  Upload,
  CheckCircle2,
  Lock,
  Globe,
  ArrowLeft,
  Activity,
  Sparkles,
  Compass,
  FileText,
  Layers,
  Award,
  Info,
  AlertTriangle,
  Mic,
} from 'lucide-react';

interface SanctumModalProps {
  tradition: Tradition;
  isOpen: boolean;
  onClose: () => void;
  onSubmitMission: (
    traditionId: string,
    missionId: string,
    consent: SubmissionConsent,
    evidence: { text: string; photoUrl?: string | null }
  ) => void;
}

// Confidence tag color palette per spec (must be visually distinct from demo room distance)
const CONFIDENCE_STYLES: Record<ConfidenceLevel, { pill: string; dot: string; label: string; tooltip: string }> = {
  High: {
    pill: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700',
    dot: 'bg-emerald-400',
    label: 'High',
    tooltip: 'This score is based on direct field research, published surveys, or official GI registry data.',
  },
  Medium: {
    pill: 'bg-amber-950/80 text-amber-300 border border-amber-700',
    dot: 'bg-amber-400',
    label: 'Medium',
    tooltip: 'This score is based on secondary sources, partial field data, or community estimates with some uncertainty.',
  },
  'Low-proxy': {
    pill: 'bg-rose-950/80 text-rose-300 border border-rose-700',
    dot: 'bg-rose-400',
    label: 'Low-proxy',
    tooltip: 'This score is a proxy estimate — the real figure is unknown or unverified. Treat this as an informed approximation, not a researched fact.',
  },
};

/** Small tooltip wrapper — shows on hover */
function ConfidenceTooltip({ level, children }: { level: ConfidenceLevel; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const style = CONFIDENCE_STYLES[level];

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
    >
      {children}
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2.5 rounded-xl bg-[#0e1118] border border-[#c89d42]/40 shadow-2xl text-[11px] text-slate-200 font-sans leading-relaxed pointer-events-none animate-fadeIn">
          <span className={`inline-flex items-center gap-1.5 mb-1 font-bold text-[10px] uppercase tracking-wider ${style.pill} px-1.5 py-0.5 rounded-md`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {style.label} Confidence
          </span>
          <p>{style.tooltip}</p>
        </div>
      )}
    </div>
  );
}

export const SanctumModal: React.FC<SanctumModalProps> = ({
  tradition,
  isOpen,
  onClose,
  onSubmitMission,
}) => {
  // Active Dossier Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'audio' | 'markers' | 'vitality' | 'missions'>('overview');

  // Audio Player State
  const [isPlayingMainStory, setIsPlayingMainStory] = useState(false);
  const [activeQAIndex, setActiveQAIndex] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioProgressRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mission Submission Form State
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [missionText, setMissionText] = useState('');
  const [missionPhoto, setMissionPhoto] = useState<string | null>(null);
  const [consent, setConsent] = useState<SubmissionConsent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebrationBurst, setShowCelebrationBurst] = useState(false);
  // Mission submission confirmation state — stores before/after scores
  const [submissionResult, setSubmissionResult] = useState<{
    missionTitle: string;
    scoreBefore: number;
    scoreAfter: number;
    delta: number;
  } | null>(null);

  if (!isOpen) return null;

  const vp = tradition.vitalityProfile;

  // Cleanup on unmount
  const stopAll = () => {
    audioEngine.stopVoiceStory();
    setIsPlayingMainStory(false);
    setActiveQAIndex(null);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  // Play Main Story Audio
  const handleToggleMainStory = () => {
    if (isPlayingMainStory) {
      audioEngine.stopVoiceStory();
      setIsPlayingMainStory(false);
    } else {
      audioEngine.stopVoiceStory();
      setActiveQAIndex(null);
      setIsPlayingMainStory(true);
      audioEngine.playVoiceStory(
        tradition.audio.transcript,
        () => setIsPlayingMainStory(false),
        tradition.audio.clipUrl
      );
    }
  };

  // Play Q&A Audio Clip
  const handlePlayQA = (index: number) => {
    if (activeQAIndex === index) {
      audioEngine.stopVoiceStory();
      setActiveQAIndex(null);
    } else {
      audioEngine.stopVoiceStory();
      setIsPlayingMainStory(false);
      setActiveQAIndex(index);
      const qa = tradition.audio.qaClips[index];
      audioEngine.playVoiceStory(
        qa.transcript,
        () => setActiveQAIndex(null),
        qa.clipUrl
      );
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMissionPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Mission Action with before/after confirmation
  const handleSubmit = (mission: Mission) => {
    if (!consent) return;
    setIsSubmitting(true);

    const scoreBefore = vp.vitalityScore;
    const delta = mission.vitalityDelta || 5;
    const scoreAfter = Math.min(100, scoreBefore + delta);

    audioEngine.playCelebrationChime();
    setShowCelebrationBurst(true);

    setTimeout(() => {
      onSubmitMission(tradition.id, mission.id, consent, {
        text: missionText || 'Verified documentation record submitted.',
        photoUrl: missionPhoto,
      });

      setIsSubmitting(false);
      setActiveMissionId(null);
      setMissionText('');
      setMissionPhoto(null);
      setConsent(null);

      // Show confirmation state
      setSubmissionResult({
        missionTitle: mission.title,
        scoreBefore,
        scoreAfter,
        delta,
      });

      setTimeout(() => setShowCelebrationBurst(false), 2000);
    }, 400);
  };

  const dismissSubmissionResult = () => {
    setSubmissionResult(null);
    // Switch to vitality tab to show the updated heartbeat
    setActiveTab('vitality');
  };

  return (
    <div
      id="sanctum-modal"
      className="fixed inset-0 z-[100] bg-[#07080b]/95 backdrop-blur-xl text-slate-100 overflow-y-auto select-none transition-all duration-300 animate-fadeIn"
    >
      {/* Background Subtle Radial Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#c89d4212_0%,transparent_70%)]" />

      {/* Celebration Flash on Mission Complete */}
      {showCelebrationBurst && (
        <div className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center">
          <div className="w-[200vmax] h-[200vmax] rounded-full animate-ping bg-[#c89d42]/30 opacity-90" />
        </div>
      )}

      {/* Mission Submission Confirmation Overlay */}
      {submissionResult && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-8 bg-[#07080b]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0e1118] border border-[#c89d42]/50 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn text-center">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <span className="font-['Cinzel'] font-bold text-2xl text-emerald-300">Mission Completed</span>
            </div>

            <p className="font-['Cormorant_Garamond'] italic text-lg text-slate-300">
              "{submissionResult.missionTitle}"
            </p>

            {/* Before / After Vitality Score with live Heartbeat */}
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="space-y-1 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Before</span>
                <span className="font-['Cinzel'] font-bold text-3xl text-slate-400">
                  {submissionResult.scoreBefore}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-emerald-400 font-mono font-bold text-xl">
                  +{submissionResult.delta}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Vitality</span>
              </div>
              <div className="space-y-1 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">After</span>
                <span className="font-['Cinzel'] font-bold text-3xl text-[#fae17d]">
                  {submissionResult.scoreAfter}
                </span>
              </div>
            </div>

            {/* Live Heartbeat — shows the NEW score animating */}
            <div className="py-4 px-6 rounded-xl bg-[#090b0f] border border-slate-800">
              <Heartbeat vitalityScore={submissionResult.scoreAfter} size="full" showScoreLabel={false} />
              <p className="text-[11px] font-mono text-slate-500 text-center mt-2 uppercase tracking-widest">
                Cultural Heartbeat — Updated Live
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs font-sans text-emerald-200 leading-relaxed">
              Your field documentation has been recorded with <strong>{consent === 'public' ? 'public archive' : 'community-only'}</strong> visibility. 
              This evidence directly strengthens the tradition's vitality index.
            </div>

            <button
              onClick={dismissSubmissionResult}
              data-cursor-hover="true"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs tracking-wider shadow-lg transition-all"
            >
              View Updated UNESCO Matrix
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#c89d42]/25">
          <button
            onClick={() => {
              stopAll();
              onClose();
            }}
            data-cursor-hover="true"
            className="px-4 py-2 rounded-xl bg-[#12151d] hover:bg-[#1c202c] border border-[#c89d42]/30 hover:border-[#c89d42]/70 text-slate-200 hover:text-white font-['Cinzel'] text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#c89d42]" />
            <span>Return to Archive</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#c89d42] bg-[#12151d] px-3.5 py-1.5 rounded-lg border border-[#c89d42]/30 shadow-md">
              DOSSIER // {tradition.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Concentration Risk Banner — PROMINENT per spec FR2.3 */}
        {vp.concentrationRisk && (
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-rose-950/50 border-2 border-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-fadeIn">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-['Cinzel'] font-bold text-rose-300 text-sm uppercase tracking-wider">
                Concentration Risk — Critical Survival Alert
              </p>
              <p className="text-sm font-sans text-rose-200 leading-relaxed">
                This tradition currently survives through <strong>2 or fewer practitioners or families</strong> — its extinction risk may be significantly higher than the vitality score alone suggests. Immediate documentation and practitioner support is urgent.
              </p>
            </div>
          </div>
        )}

        {/* Hero Dossier Header */}
        <header className="relative p-6 sm:p-8 rounded-2xl bg-[#10131a] border border-[#c89d42]/30 shadow-2xl overflow-hidden space-y-4">
          {tradition.heroImageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src={tradition.heroImageUrl} alt={tradition.name} className="w-full h-full object-cover mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-[#10131a]/80 to-transparent" />
            </div>
          )}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-[#181c26] text-[#fae17d] border border-[#c89d42]/40 font-mono text-xs uppercase font-medium">
                {tradition.region}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-['Cinzel'] text-slate-300 uppercase">{tradition.category}</span>
              {tradition.giTag && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#181c26] text-xs font-mono text-emerald-400 border border-emerald-800">
                    GI Tag Certified
                  </span>
                </>
              )}
            </div>

            {/* Vitality Pill + Community Validation Status */}
            <div className="flex items-center gap-3">
              {/* Community Validation Status with tooltip */}
              <div className="group relative flex items-center gap-1.5 cursor-default">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold border flex items-center gap-1.5 ${
                  vp.communityValidationStatus === 'community-reviewed'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                    : 'bg-slate-900/60 text-slate-400 border-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${vp.communityValidationStatus === 'community-reviewed' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  {vp.communityValidationStatus === 'community-reviewed' ? 'Community Reviewed' : 'Unverified'}
                </span>
                <Info className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#c89d42] transition-colors" />
                <div className="absolute z-50 bottom-full right-0 mb-2 w-64 px-3 py-2.5 rounded-xl bg-[#0e1118] border border-[#c89d42]/40 shadow-2xl text-[11px] text-slate-200 font-sans leading-relaxed pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {vp.communityValidationStatus === 'community-reviewed'
                    ? 'This tradition\'s data has been cross-checked and validated by community members or traditional practitioners.'
                    : 'This tradition\'s data is currently unverified — scores are based on researcher estimates and proxy sources. Community review is needed to confirm accuracy.'}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Vitality Score</span>
                <span className="font-['Cinzel'] font-bold text-2xl text-[#fae17d]">
                  {vp.vitalityScore}<span className="text-xs text-slate-500 font-normal"> / 100</span>
                </span>
              </div>
              <div className="w-24 h-10 flex items-center justify-center p-1 bg-[#090b0f] rounded-lg border border-slate-800">
                <Heartbeat vitalityScore={vp.vitalityScore} size="mini" />
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="font-['Cinzel'] font-bold text-3xl sm:text-5xl text-slate-100">
              {tradition.name}
            </h2>
            {tradition.tamilName && (
              <p className="font-['Cormorant_Garamond'] italic text-lg text-[#c89d42]">
                {tradition.tamilName} • {tradition.activePractitionersSummary}
              </p>
            )}
          </div>

          <div className="relative z-10 p-4 rounded-xl bg-[#0a0c10] border-l-2 border-[#c89d42] border-y border-r border-slate-800 flex flex-col md:flex-row gap-4 items-center">
            {tradition.heroImageUrl && (
               <div className="shrink-0">
                 <img src={tradition.heroImageUrl} alt={tradition.name} className="w-32 h-32 object-cover rounded-lg border border-[#c89d42]/50 shadow-md" />
               </div>
            )}
            <p className="font-['Cormorant_Garamond'] text-lg sm:text-xl text-slate-200 leading-relaxed italic">
              {tradition.fullDescription}
            </p>
          </div>
        </header>


        {/* Dossier Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & History', icon: Compass },
            { id: 'audio', label: 'Oral Testimony', icon: Volume2 },
            { id: 'markers', label: 'Visual Markers', icon: Layers },
            { id: 'vitality', label: 'UNESCO Matrix', icon: Activity },
            { id: 'missions', label: `Missions (${tradition.missions.length})`, icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                data-cursor-hover="true"
                className={`group px-3.5 py-2 rounded-xl text-xs font-['Cinzel'] whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black font-bold shadow-md'
                    : 'bg-[#10131a] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-[#c89d42]/30'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-black' : 'text-[#c89d42]/70 group-hover:text-[#c89d42]'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & History */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {/* Historical Context */}
            <div className="p-6 rounded-2xl bg-[#10131a] border border-[#c89d42]/25 shadow-xl space-y-3">
              <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c89d42]" />
                <span>Historical Lineage & Geography</span>
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {tradition.historicalContext}
              </p>
              <div className="pt-2 space-y-2 text-xs font-sans text-slate-400">
                <p><span className="text-slate-300 font-medium">Primary Hub:</span> {tradition.region}</p>
                <p><span className="text-slate-300 font-medium">Workforce Status:</span> {tradition.activePractitionersSummary}</p>
                <p><span className="text-slate-300 font-medium">Verification Method:</span> Oral testimony, field recordings & GI Registry verification.</p>
              </div>
            </div>

            {/* Cultural Significance */}
            <div className="p-6 rounded-2xl bg-[#10131a] border border-[#c89d42]/25 shadow-xl space-y-3">
              <h3 className="font-['Cinzel'] font-bold text-lg text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c89d42]" />
                <span>Preservation Priority</span>
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed italic">
                "{tradition.oneLiner}"
              </p>
              <div className="p-3.5 rounded-xl bg-[#0a0c10] border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-['Cinzel'] text-[#c89d42] text-[11px] uppercase tracking-wider block">
                  Concentration Risk Level:
                </span>
                <p className="font-sans leading-relaxed">
                  {vp.concentrationRisk
                    ? 'CRITICAL — Survival depends on establishing sustainable fair-wage patron channels for the few remaining hereditary families. Community documentation missions are highest priority.'
                    : 'TRANSMISSION VITALITY — Focus on documenting apprentice techniques and expanding ethical modern commissions and market access.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Oral Testimony — Echoes of Home */}
        {activeTab === 'audio' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#10131a] border border-[#c89d42]/30 shadow-2xl space-y-6 animate-fadeIn">
            {/* Echoes of Home header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#c89d42] uppercase tracking-widest block">
                  Echoes of Home // Authentic Oral Record
                </span>
                <h3 className="font-['Cinzel'] font-bold text-2xl text-slate-100">
                  {tradition.audio.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  {tradition.audio.speaker} • {tradition.audio.speakerRole}
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  Duration: {tradition.audio.duration} &nbsp;|&nbsp; {tradition.audio.clipUrl ? '🎵 Real audio file' : '📖 Transcript read-aloud (TTS fallback)'}
                </p>
              </div>

              <button
                onClick={handleToggleMainStory}
                data-cursor-hover="true"
                className={`px-6 py-2.5 rounded-xl font-['Cinzel'] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shrink-0 ${
                  isPlayingMainStory
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black hover:brightness-110'
                }`}
              >
                {isPlayingMainStory ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Oral Record</span>
                  </>
                )}
              </button>
            </div>

            {/* Playing indicator */}
            {isPlayingMainStory && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c89d42]/10 border border-[#c89d42]/30">
                <div className="flex gap-0.5 items-end h-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className="w-1 bg-[#c89d42] rounded-full"
                      style={{
                        height: `${40 + Math.sin(i * 1.5) * 40}%`,
                        animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#fae17d] uppercase tracking-wider">Now Playing — Oral Testimony</span>
              </div>
            )}

            {/* Transcript — always visible for accessibility (NFR5) */}
            <div className="p-5 rounded-xl bg-[#090b0f] border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#c89d42]" />
                <span className="text-[11px] font-['Cinzel'] text-[#c89d42] tracking-wider uppercase">
                  Spoken Oral Transcript:
                </span>
                <span className="text-[10px] font-mono text-slate-500 ml-auto">Accessibility fallback</span>
              </div>
              <p className="font-['Cormorant_Garamond'] italic text-lg sm:text-xl text-slate-200 leading-relaxed">
                {tradition.audio.transcript}
              </p>
            </div>

            {/* Pitch framing per spec §4 */}
            <div className="p-4 rounded-xl bg-[#0a0c10] border border-[#c89d42]/20 flex items-start gap-3 text-xs font-sans text-slate-400 leading-relaxed">
              <Mic className="w-4 h-4 text-[#c89d42] shrink-0 mt-0.5" />
              <p>
                <em>Family members record answers to questions their children and grandchildren actually ask — the tradition-holder always controls exactly what is said.</em>
              </p>
            </div>

            {/* Ask a Question — Q&A Clips */}
            <div className="space-y-3">
              <span className="text-xs font-['Cinzel'] text-slate-300 uppercase tracking-wider block">
                Direct Practitioner Inquiries — Ask a Question:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tradition.audio.qaClips.map((qa, index) => {
                  const isQAActive = activeQAIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handlePlayQA(index)}
                      data-cursor-hover="true"
                      className={`p-3.5 rounded-xl text-left border transition-all flex items-start justify-between gap-3 ${
                        isQAActive
                          ? 'bg-[#181c26] border-[#c89d42] text-[#fae17d]'
                          : 'bg-[#090b0f] hover:bg-[#12151d] border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <span className="text-xs font-sans italic">"{qa.question}"</span>
                        {qa.audioDuration && (
                          <span className="block text-[10px] font-mono text-slate-500">{qa.audioDuration}</span>
                        )}
                      </div>
                      <span className={`text-xs font-mono shrink-0 ${isQAActive ? 'text-[#c89d42]' : 'text-slate-500'}`}>
                        {isQAActive ? '▶ Playing' : '▶ Listen'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Q&A transcript */}
              {activeQAIndex !== null && (
                <div className="p-4 rounded-xl bg-[#12151d] border border-[#c89d42]/40 text-xs font-sans text-slate-200 space-y-1 animate-fadeIn">
                  <span className="font-['Cinzel'] text-[#c89d42] uppercase block">Answer Transcript:</span>
                  <p className="font-['Cormorant_Garamond'] italic text-base text-slate-100 leading-relaxed">
                    {tradition.audio.qaClips[activeQAIndex].transcript}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Visual Markers */}
        {activeTab === 'markers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {tradition.visualMarkers.map((marker) => (
              <div
                key={marker.id}
                className="p-6 rounded-2xl bg-[#10131a] border border-[#c89d42]/25 shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#c89d42] uppercase tracking-wider block">
                    Visual Marker Specification
                  </span>
                  <h4 className="font-['Cinzel'] font-bold text-lg text-slate-100">
                    {marker.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {marker.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                  Grounded in Kalai Lens AI Vision Model
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: UNESCO 9-Factor Vitality Matrix */}
        {activeTab === 'vitality' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#10131a] border border-[#c89d42]/30 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-['Cinzel'] font-bold text-2xl text-slate-100">
                  UNESCO 9-Factor Diagnostic
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Intangible Cultural Heritage Vitality Index — Adapted Language Vitality & Endangerment Framework
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Confidence tag legend */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  {(['High', 'Medium', 'Low-proxy'] as ConfidenceLevel[]).map(level => (
                    <span
                      key={level}
                      className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${CONFIDENCE_STYLES[level].pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${CONFIDENCE_STYLES[level].dot}`} />
                      {level}
                    </span>
                  ))}
                </div>
                <span className="font-['Cinzel'] font-bold text-2xl text-[#fae17d]">
                  {vp.vitalityScore} / 100
                </span>
              </div>
            </div>

            {/* Full-size Heartbeat — spec says it must be the most visually confident element */}
            <div className="py-2 px-4 rounded-xl bg-[#090b0f] border border-slate-800">
              <Heartbeat vitalityScore={vp.vitalityScore} size="full" showScoreLabel={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vp.factors.map((f) => {
                const style = CONFIDENCE_STYLES[f.confidence];
                return (
                  <div
                    key={f.id}
                    className="p-4 rounded-xl bg-[#090b0f] border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-['Cinzel'] font-bold text-slate-200 leading-tight">
                        {f.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#fae17d] shrink-0">
                        {f.score}/5
                      </span>
                    </div>

                    {/* Score bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1">
                      <div
                        className="h-1 rounded-full bg-gradient-to-r from-[#c89d42] to-[#fae17d] transition-all duration-700"
                        style={{ width: `${(f.score / 5) * 100}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-400 font-sans leading-normal">
                      {f.explanation}
                    </p>

                    {f.evidence && (
                      <p className="text-[10px] text-slate-500 font-mono italic pt-1 border-t border-slate-900">
                        Evidence: {f.evidence}
                      </p>
                    )}

                    {/* Confidence tag with tooltip — must be visible from demo room */}
                    <ConfidenceTooltip level={f.confidence}>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md cursor-help ${style.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {style.label} Confidence
                        <Info className="w-2.5 h-2.5 opacity-60" />
                      </span>
                    </ConfidenceTooltip>
                  </div>
                );
              })}
            </div>

            {/* Rollup formula transparency note */}
            <div className="p-3.5 rounded-xl bg-[#0a0c10] border border-slate-800 flex items-start gap-3 text-[11px] font-mono text-slate-500">
              <Info className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
              <p>
                Vitality Score = round(sum of 9 factor scores / 45 × 100). Formula adapted from UNESCO Language Vitality & Endangerment framework. concentrationRisk flag is independent of the numeric rollup — it surfaces categorical risk that averaging would hide.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Missions */}
        {activeTab === 'missions' && (
          <div className="space-y-4 animate-fadeIn">
            {tradition.missions.map((mission) => {
              const isCompleted = mission.status === 'completed';
              const isRoadmap = mission.status === 'roadmap';
              const isFormOpen = activeMissionId === mission.id;

              return (
                <div
                  key={mission.id}
                  className={`p-6 rounded-2xl border shadow-xl space-y-4 transition-all ${
                    isRoadmap
                      ? 'bg-[#0c0e14] border-slate-800 opacity-70'
                      : isCompleted
                      ? 'bg-[#0d1612] border-emerald-900/60'
                      : 'bg-[#10131a] border-[#c89d42]/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#181c26] text-[10px] font-mono text-[#c89d42] uppercase">
                          {mission.category}
                        </span>
                        {!isRoadmap && (
                          <span className="text-xs font-mono text-emerald-400 font-semibold">
                            +{mission.vitalityDelta || 5} Vitality Points
                          </span>
                        )}
                        {isRoadmap && (
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                            Coming in full version
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Completed this session
                          </span>
                        )}
                      </div>
                      <h4 className={`font-['Cinzel'] font-bold text-xl ${isRoadmap ? 'text-slate-500' : 'text-slate-100'}`}>
                        {mission.title}
                      </h4>
                      {mission.prompt && (
                        <p className="text-xs text-slate-300 font-sans leading-relaxed">{mission.prompt}</p>
                      )}
                      {mission.whyItMatters && (
                        <p className="text-xs text-[#c89d42]/80 font-sans italic">
                          Why it matters: {mission.whyItMatters}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isCompleted ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-['Cinzel'] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Submitted</span>
                        </div>
                      ) : isRoadmap ? (
                        <div className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-slate-500 text-xs font-['Cinzel'] cursor-not-allowed">
                          Roadmap
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveMissionId(isFormOpen ? null : mission.id)}
                          data-cursor-hover="true"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 text-black font-['Cinzel'] font-bold text-xs shadow-md transition-all"
                        >
                          {isFormOpen ? 'Cancel' : 'Accept Mission'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Working Submission Form — only for available documentation missions */}
                  {isFormOpen && !isCompleted && !isRoadmap && (
                    <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                      {/* Evidence input */}
                      <div className="space-y-1">
                        <label className="block text-xs font-['Cinzel'] text-slate-300">
                          Field Documentation Notes: <span className="text-rose-400">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={missionText}
                          onChange={(e) => setMissionText(e.target.value)}
                          placeholder="Describe the artisan verification, techniques witnessed, and details..."
                          className="w-full rounded-xl bg-[#090b0f] border border-slate-700 p-3 text-xs text-slate-200 focus:border-[#c89d42] focus:outline-none resize-none"
                        />
                      </div>

                      {(mission.evidenceType === 'photo' || mission.evidenceType === 'text+photo') && (
                        <div className="flex items-center gap-4">
                          <label className="px-4 py-2 rounded-xl bg-[#181c26] border border-slate-700 hover:border-[#c89d42]/50 text-xs text-slate-200 cursor-pointer flex items-center gap-2 transition-all">
                            <Upload className="w-3.5 h-3.5 text-[#c89d42]" />
                            <span>{missionPhoto ? '✓ Photo Attached' : 'Attach Photo'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                          {missionPhoto && (
                            <img src={missionPhoto} alt="Evidence" className="w-12 h-12 object-cover rounded-lg border border-[#c89d42]/40" />
                          )}
                        </div>
                      )}

                      {/* Consent Toggle — mandatory per spec, no default, submit disabled until chosen */}
                      <div className="p-4 rounded-xl bg-[#090b0f] border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-['Cinzel'] text-[#c89d42] uppercase tracking-wider">
                            Consent Protocol: <span className="text-rose-400">*</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">(Required — no default)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setConsent('public')}
                            className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${
                              consent === 'public'
                                ? 'bg-[#181c26] border-[#c89d42] text-[#fae17d] shadow-sm'
                                : 'border-slate-800 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            <Globe className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Public Archive</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">Visible to all researchers and the public</p>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConsent('community-only')}
                            className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${
                              consent === 'community-only'
                                ? 'bg-[#181c26] border-[#c89d42] text-[#fae17d] shadow-sm'
                                : 'border-slate-800 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Community-Only</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">Visible only to verified community members</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      <button
                        disabled={!consent || isSubmitting}
                        onClick={() => handleSubmit(mission)}
                        data-cursor-hover="true"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-black font-['Cinzel'] font-bold text-xs tracking-wider shadow-lg transition-all"
                      >
                        {isSubmitting ? 'Recording Submission...' : !consent ? 'Select Consent to Submit' : 'Submit Field Verification'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
