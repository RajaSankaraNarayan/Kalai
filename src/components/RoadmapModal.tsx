import React from 'react';
import { X, CheckCircle2, Clock, ShieldAlert, Sparkles, Terminal, Mic, MapPin } from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0e0f14] border-4 border-black p-6 sm:p-10 shadow-brutal-lg text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor-hover="true"
          className="absolute top-6 right-6 w-10 h-10 bg-black border-2 border-slate-700 hover:border-[#d4af37] text-slate-400 hover:text-white flex items-center justify-center shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 border-b-4 border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border-2 border-[#d4af37] text-[11px] font-mono font-black uppercase text-[#f5d67b] mb-3 shadow-brutal-gold">
            <Terminal className="w-3.5 h-3.5" />
            <span>HONESTY & ARCHITECTURAL MANIFESTO // VIRASAT LOOP</span>
          </div>
          <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl text-white uppercase">
            Built vs. Roadmap Scope
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-lg sm:text-xl text-slate-300 mt-1">
            "A verified prototype that opens with real human voices, not synthetic hallucinations."
          </p>
        </div>

        {/* Two-Column Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Column 1: Built Features — exact per 03_FEATURE_SPEC.md §5 */}
          <div className="p-6 bg-black border-3 border-emerald-500 shadow-brutal-emerald space-y-4">
            <div className="flex items-center justify-between border-b-2 border-emerald-900/60 pb-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="font-['Cinzel'] font-bold text-lg uppercase">
                  Built (Live in Demo)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 border border-emerald-500 font-black">
                VERIFIED
              </span>
            </div>

            <ul className="space-y-4 font-mono text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">One real recorded voice + mixed soundscape.</strong>{' '}
                  Per-tradition oral testimonies with authentic practitioner voices, embedded as playable audio with full text transcripts as accessibility fallback.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">Animated Cultural Heartbeat with live updates.</strong>{' '}
                  ECG-style SVG pulse waveform (0–100 vitality score) that visibly morphs in 1.8s when a mission is completed — not a snap, a transition.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">Full 9-factor Vitality Profile with confidence tagging + concentration-risk flag.</strong>{' '}
                  All 9 UNESCO-adapted factors, each with a High / Medium / Low-proxy confidence tag, hover tooltip, and a separate concentration-risk alert banner.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">One complete Documentation mission with a working consent toggle.</strong>{' '}
                  Full submission flow: text + photo evidence, mandatory Public / Community-only consent (no default), and a live before/after score confirmation screen.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">2–3 pre-recorded "ask a question" answers.</strong>{' '}
                  Each tradition has 3 pre-written Q&A clips (with transcripts). Real MP3 files play when available; TTS reads transcript as fallback.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">Kalai Lens AI vision grounding.</strong>{' '}
                  Gemini-powered image recognition matching uploaded/photographed artifacts to the curated tradition dataset with strict grounding rules.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-black shrink-0">✓</span>
                <span>
                  <strong className="text-emerald-300">Stone Epigraphia inscription archive.</strong>{' '}
                  Historical temple inscriptions linked to living traditions, providing archival depth and UNESCO context.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Roadmap — named, not built per spec */}
          <div className="p-6 bg-black border-3 border-slate-700 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-indigo-300">
                <Clock className="w-4 h-4 text-indigo-400" />
                <h3 className="font-['Cinzel'] font-bold text-lg uppercase">
                  Roadmap (Named, Not Built)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 border border-indigo-700 font-black">
                PHASE 4+
              </span>
            </div>

            <ul className="space-y-4 font-mono text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-black shrink-0">•</span>
                <span>
                  <strong className="text-slate-300">Full community/practitioner verification workflow.</strong>{' '}
                  Currently a single status field ("unverified" / "community-reviewed"). Real multi-role review pipeline with traditional council sign-off was deliberately excluded — out of scope for a 3-day solo build.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-black shrink-0">•</span>
                <span>
                  <strong className="text-slate-300">Transmission, Livelihood, and Community mission categories as full working flows.</strong>{' '}
                  All four categories are named and visible in the UI. Only Documentation has a working end-to-end submission flow.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-black shrink-0">•</span>
                <span>
                  <strong className="text-slate-300">Real practitioner partnerships at scale.</strong>{' '}
                  All tradition data is researcher-sourced. Actual on-ground community validation is a Phase 4+ effort requiring real consent agreements.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-black shrink-0">•</span>
                <span>
                  <strong className="text-slate-300">Persistent cross-device backend.</strong>{' '}
                  Currently uses in-memory session state (Mode A). Firebase Firestore persistence exists as a path but was not needed for the demo.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 font-black shrink-0">•</span>
                <span>
                  <strong className="text-slate-300">Encrypted Indigenous Vaults for restricted cultural knowledge.</strong>{' '}
                  Zero-knowledge storage for sacred or community-restricted content was scoped but requires deeper community co-design.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Stance on Voice Cloning — verbatim from spec §3 reasoning */}
        <div className="p-5 bg-black border-3 border-rose-600 shadow-brutal-crimson flex items-start gap-4 text-rose-200 mb-6">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono leading-relaxed">
            <strong className="text-rose-300 block font-black uppercase mb-1">
              ETHICAL DIRECTIVE // ZERO VOICE CLONING — WHY:
            </strong>
            <p className="text-slate-300">
              AI voice cloning of real, identifiable tradition-holders fabricates statements they never made — creating consent violations, spiritual misattribution risk, and misinformation. In Kalai, all oral history clips are strictly real, consented recordings. Generative AI is restricted to wordsmithing mission prompts and organizing research data — never inventing the voices or facts of real practitioners. This is not a technical limitation; it is a deliberate ethical boundary.
            </p>
          </div>
        </div>

        {/* Echoes of Home pitch framing — per spec §4 */}
        <div className="p-4 bg-black border-2 border-[#d4af37]/40 flex items-start gap-3 text-xs font-mono text-slate-400 mb-8">
          <Mic className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <p>
            <em className="text-slate-300">"Family members record answers to questions their children and grandchildren actually ask — the tradition-holder always controls exactly what is said."</em>
            {' '}— Echoes of Home design principle.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            data-cursor-hover="true"
            className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#f5d67b] text-black font-mono font-black text-xs uppercase tracking-widest border-2 border-black shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            [CLOSE_MANIFESTO]
          </button>
        </div>
      </div>
    </div>
  );
};
