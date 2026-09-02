import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Volume2, VolumeX, RotateCcw, Compass, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { SikkuKolamIcon } from './SacredPatterns';
import { audioEngine } from '../utils/audioEngine';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface GeminiHeritageAgentProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Explain the lost-wax casting technique of Swamimalai bronzes',
  'How does the UNESCO 9-factor framework measure transmission?',
  'What makes Pattamadai Korai grass mats feel like silk?',
  'How were Aathangudi tiles created for Chettinad mansions?',
  'What are the ethical guidelines for documenting living crafts?',
];

export const GeminiHeritageAgent: React.FC<GeminiHeritageAgentProps> = ({
  isOpen,
  onToggle,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: 'Vanakkam. I am the **Kalai AI Heritage Scholar** — an archival intelligence grounded in South Asian living heritage, UNESCO 9-factor vitality assessments, Shilpa Shastra canons, and community field documentation. How may I assist your exploration of living traditions today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputText).trim();
    if (!message || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build history
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Analysis completed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Agent chat error:', err);
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'Apologies, I encountered an issue consulting the digital archives. Please ensure your Gemini API connection is active and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechToggle = (msg: Message) => {
    if (speakingId === msg.id) {
      audioEngine.stopVoiceStory();
      setSpeakingId(null);
    } else {
      audioEngine.stopVoiceStory();
      setSpeakingId(msg.id);
      audioEngine.playVoiceStory(msg.text, () => {
        setSpeakingId(null);
      });
    }
  };

  const handleResetChat = () => {
    audioEngine.stopVoiceStory();
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: 'Dialogue archive reset. How may I assist your inquiry into South Asian living traditions?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to format basic markdown-like bullet points and bolding
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm font-sans">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-['Cinzel'] font-bold text-sm text-[#fae17d] pt-1">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="font-['Cinzel'] font-bold text-base text-[#e5c158] pt-1">
                {line.replace('## ', '')}
              </h3>
            );
          }
          if (line.startsWith('* ') || line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-[#c89d42] mt-1 text-[8px]">◆</span>
                <span>{renderInlineBold(line.substring(2))}</span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const match = line.match(/^(\d+\.)\s(.*)$/);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-mono text-[#c89d42] font-semibold">{match ? match[1] : '•'}</span>
                <span>{renderInlineBold(match ? match[2] : line)}</span>
              </div>
            );
          }
          return <p key={idx}>{renderInlineBold(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-[#fae17d] font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="text-[#e5c158] italic font-['Cormorant_Garamond'] text-sm">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Medallion Launch Button (Fixed Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-[85] pointer-events-auto">
        <button
          onClick={onToggle}
          data-cursor-hover="true"
          title="Consult Kalai AI Heritage Scholar"
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#12151e] border border-[#c89d42]/60 hover:border-[#fae17d] text-[#fae17d] shadow-[0_0_20px_rgba(200,157,66,0.35)] hover:shadow-[0_0_28px_rgba(200,157,66,0.6)] transition-all duration-300 active:scale-95 ${
            isOpen ? 'bg-[#1e2330] ring-2 ring-[#c89d42]' : ''
          }`}
        >
          {/* Animated Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(250,225,125,0.25),transparent_70%)] animate-pulse pointer-events-none" />

          {/* Kolam Icon */}
          <div className="w-6 h-6 rounded-full bg-[#0a0c10] border border-[#c89d42] p-1 flex items-center justify-center group-hover:scale-110 transition-transform">
            <SikkuKolamIcon className="w-full h-full text-[#fae17d]" />
          </div>

          <span className="font-['Cinzel'] font-bold text-xs tracking-wider uppercase text-slate-100 group-hover:text-[#fae17d] hidden sm:inline">
            AI Scholar
          </span>

          <Sparkles className="w-3.5 h-3.5 text-[#e5c158] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Slide-out Architectural Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-[90] w-full sm:w-[480px] bg-[#0d0f15]/95 backdrop-blur-2xl border-l border-[#c89d42]/30 shadow-2xl flex flex-col justify-between animate-fadeIn pointer-events-auto">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#c89d42]/20 flex items-center justify-between bg-[#12151e]/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1b202d] border border-[#c89d42]/60 flex items-center justify-center p-1.5 shadow-[0_0_10px_rgba(200,157,66,0.3)]">
                <SikkuKolamIcon className="w-full h-full text-[#fae17d]" />
              </div>
              <div>
                <h3 className="font-['Cinzel'] font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  <span>KALAI AI SCHOLAR</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] font-mono text-[#c89d42] uppercase tracking-wider">
                  LIVING HERITAGE INTELLIGENCE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                data-cursor-hover="true"
                title="Reset Conversation"
                className="w-8 h-8 rounded-lg bg-[#181c26] hover:bg-[#222836] border border-slate-700 text-slate-400 hover:text-[#fae17d] flex items-center justify-center transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                data-cursor-hover="true"
                title="Close AI Scholar Drawer"
                className="w-8 h-8 rounded-lg bg-[#181c26] hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 select-text">
            {messages.map((msg) => {
              const isModel = msg.role === 'model';
              const isSpeaking = speakingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase px-1">
                    {isModel ? (
                      <>
                        <Bot className="w-3 h-3 text-[#c89d42]" />
                        <span>AI Scholar • {msg.timestamp}</span>
                      </>
                    ) : (
                      <>
                        <span>Seeker • {msg.timestamp}</span>
                        <User className="w-3 h-3 text-slate-400" />
                      </>
                    )}
                  </div>

                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl max-w-[90%] sm:max-w-[85%] shadow-md ${
                      isModel
                        ? 'bg-[#131722] border border-[#c89d42]/30 text-slate-200'
                        : 'bg-gradient-to-r from-[#c89d42] to-[#b38838] text-black font-medium'
                    }`}
                  >
                    {isModel ? renderFormattedText(msg.text) : <p className="text-xs sm:text-sm">{msg.text}</p>}

                    {/* Audio Narration Trigger for Model Responses */}
                    {isModel && (
                      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">Living Voice Audio</span>
                        <button
                          onClick={() => handleSpeechToggle(msg)}
                          data-cursor-hover="true"
                          className="px-2 py-0.5 rounded bg-[#1c2230] hover:bg-[#252e40] border border-slate-700 text-[#fae17d] text-[10px] font-['Cinzel'] flex items-center gap-1 transition-all"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-rose-400" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-[#c89d42]" />
                              <span>Read Aloud</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#131722] border border-[#c89d42]/30 text-slate-300 max-w-[75%] animate-pulse">
                <Sparkles className="w-4 h-4 text-[#fae17d] animate-spin" />
                <span className="text-xs font-['Cinzel'] text-[#fae17d]">
                  Consulting Heritage Archives & UNESCO Grounding...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 border-t border-slate-800 bg-[#0e1017]/90 space-y-1.5">
            <span className="text-[10px] font-['Cinzel'] text-slate-400 uppercase tracking-wider block">
              Suggested Inquiries:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  data-cursor-hover="true"
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-[#141824] hover:bg-[#1f2538] border border-slate-800 hover:border-[#c89d42]/40 text-[11px] text-slate-300 hover:text-[#fae17d] transition-all truncate max-w-[220px]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 border-t border-[#c89d42]/20 bg-[#12151e] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about traditions, crafts, UNESCO metrics, or terminology..."
              disabled={isLoading}
              className="flex-1 bg-[#090b10] border border-slate-700 focus:border-[#c89d42] focus:ring-1 focus:ring-[#c89d42] rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 font-sans outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              data-cursor-hover="true"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c89d42] to-[#b38838] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 text-black font-['Cinzel'] font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-md transition-all shrink-0"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
