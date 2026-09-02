/**
 * Web Audio Engine for Virasat Loop
 * Provides temple bell chimes, ambient tanpura resonance, and voice narration playback.
 * Supports real MP3 audio files with graceful speech-synthesis fallback.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private activeSpeech: SpeechSynthesisUtterance | null = null;
  private activeAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(muted ? 0 : 0.08, this.ctx.currentTime, 0.2);
    }
    if (muted) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (this.activeAudio) {
        this.activeAudio.pause();
        this.activeAudio = null;
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays an authentic rich temple bell chime with harmonic overtones and long decay
   */
  public playTempleBell(pitchMultiplier = 1.0) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const baseFreq = 260 * pitchMultiplier; // Fundamental bell tone (C4-ish)

      // Harmonics characteristic of bronze South Indian temple bells
      const harmonics = [
        { mult: 1.0, gain: 0.4, decay: 3.5 },
        { mult: 2.02, gain: 0.25, decay: 2.8 },
        { mult: 3.01, gain: 0.18, decay: 2.0 },
        { mult: 4.15, gain: 0.12, decay: 1.6 },
        { mult: 5.43, gain: 0.08, decay: 1.2 },
        { mult: 6.8, gain: 0.04, decay: 0.8 },
      ];

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, now);
      masterGain.connect(this.ctx.destination);

      harmonics.forEach(h => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h.mult, now);

        // Strike transient (instant attack, exponential decay)
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(h.gain, now + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

        osc.connect(g);
        g.connect(masterGain);

        osc.start(now);
        osc.stop(now + h.decay + 0.1);
      });
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  /**
   * Plays a celebratory golden chime upon mission completion
   */
  public playCelebrationChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major pentatonic sparkle
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx || this.isMuted) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 1.9);
        }, idx * 120);
      });
    } catch {
      // Fallback
    }
  }

  /**
   * Toggles ambient meditative temple tanpura drone
   */
  public startAmbientDrone() {
    if (this.isAmbientPlaying || this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(0.06, now + 2.0);
      this.ambientGain.connect(this.ctx.destination);

      // Tanpura frequencies: Pa (G#3: ~207.65Hz) and Sa (C#3: ~138.59Hz)
      const freqs = [138.59, 207.65, 277.18, 415.3];

      this.ambientOscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        osc.connect(this.ambientGain!);
        osc.start(now);
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // Audio not permitted yet
    }
  }

  public stopAmbientDrone() {
    if (!this.isAmbientPlaying) return;
    try {
      if (this.ambientGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
        setTimeout(() => {
          this.ambientOscs.forEach(o => {
            try { o.stop(); o.disconnect(); } catch { /* no-op */ }
          });
          this.ambientOscs = [];
          this.isAmbientPlaying = false;
        }, 900);
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Plays an audio file from a URL. Falls back to speech synthesis with the transcript text if file is absent.
   * @param clipUrl  Optional path to a real .mp3 / audio file in /public/audio/
   * @param fallbackText  Transcript text used as TTS fallback when clipUrl is absent/fails
   * @param onEnd  Called when playback (or TTS) ends
   */
  public playVoiceStory(fallbackText: string, onEnd?: () => void, clipUrl?: string) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    // Stop any currently playing audio
    this.stopVoiceStory();

    // Try real audio file first if a clipUrl is given
    if (clipUrl) {
      try {
        const audio = new Audio(clipUrl);
        audio.volume = 1.0;

        audio.onended = () => {
          this.activeAudio = null;
          if (onEnd) onEnd();
        };

        audio.onerror = () => {
          // File missing or error — fall through to TTS
          this.activeAudio = null;
          this._playTTS(fallbackText, onEnd);
        };

        this.activeAudio = audio;
        audio.play().catch(() => {
          this.activeAudio = null;
          this._playTTS(fallbackText, onEnd);
        });
        return;
      } catch {
        // Fallthrough to TTS
      }
    }

    // No clipUrl provided — use speech synthesis
    this._playTTS(fallbackText, onEnd);
  }

  /**
   * Cleans markdown formatting, asterisks, hashes, bullets, and symbols
   * so browser speech synthesis speaks natural prose instead of literal punctuation.
   */
  public cleanSpeechText(text: string): string {
    if (!text) return '';
    return text
      // Remove code blocks and inline code
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown header hashes (#, ##, ###, ####)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold and italic formatting asterisks and underscores
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
      // Remove markdown links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove bullet markers at line start (*, -, +, •, ◆)
      .replace(/^[\*\-\+\•\◆]\s+/gm, '')
      // Remove blockquotes >
      .replace(/^>\s+/gm, '')
      // Remove horizontal separator lines (---, ***, ___)
      .replace(/^[*\-_]{3,}\s*$/gm, '')
      // Remove numbered list prefixes like "1. ", "2. "
      .replace(/^(\d+)\.\s+/gm, '$1. ')
      // Remove remaining stray symbols (*, #, ~, `, _, ^, |, <, >)
      .replace(/[\*#~`_\^\|<>]/g, '')
      // Remove straight quotes and normalize whitespace
      .replace(/['"]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Internal TTS fallback using browser SpeechSynthesis
   */
  private _playTTS(text: string, onEnd?: () => void) {
    if (!window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const cleaned = this.cleanSpeechText(text);
      if (!cleaned) {
        if (onEnd) onEnd();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.88; // Reverent, deliberate pacing
      utterance.pitch = 0.92; // Warm, mature vocal tone
      utterance.lang = 'en-IN'; // Indian English cadence if available

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'));
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => {
        this.activeSpeech = null;
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        this.activeSpeech = null;
        if (onEnd) onEnd();
      };

      this.activeSpeech = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stopVoiceStory() {
    // Stop real audio file
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.src = '';
      this.activeAudio = null;
    }
    // Stop speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.activeSpeech = null;
  }

  /**
   * Returns whether real audio is currently playing (file or TTS)
   */
  public isPlaying(): boolean {
    if (this.activeAudio && !this.activeAudio.paused) return true;
    if (this.activeSpeech && window.speechSynthesis?.speaking) return true;
    return false;
  }
}

export const audioEngine = new AudioEngine();
