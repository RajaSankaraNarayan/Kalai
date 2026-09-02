import React, { useEffect, useRef, useState } from 'react';

interface HeartbeatProps {
  vitalityScore: number;
  size?: 'mini' | 'full';
  showScoreLabel?: boolean;
  className?: string;
}

export const Heartbeat: React.FC<HeartbeatProps> = ({
  vitalityScore,
  size = 'full',
  showScoreLabel = false,
  className = '',
}) => {
  const isFull = size === 'full';
  const width = isFull ? 600 : 180;
  const height = isFull ? 160 : 48;

  const [displayScore, setDisplayScore] = useState(vitalityScore);
  const scoreRef = useRef(vitalityScore);
  const currentScoreRef = useRef(vitalityScore);
  const pathRef = useRef<SVGPathElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);
  const tweenStartRef = useRef<{ startScore: number; targetScore: number; startTime: number } | null>(null);

  // Handle score change tweening smoothly over 1.8s
  useEffect(() => {
    if (vitalityScore !== scoreRef.current) {
      tweenStartRef.current = {
        startScore: currentScoreRef.current,
        targetScore: vitalityScore,
        startTime: performance.now(),
      };
      scoreRef.current = vitalityScore;
    }
  }, [vitalityScore]);

  useEffect(() => {
    const loop = (time: number) => {
      // Handle tweening
      if (tweenStartRef.current) {
        const { startScore, targetScore, startTime } = tweenStartRef.current;
        const duration = 1800; // 1.8s ease-out cubic
        const elapsed = time - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = startScore + (targetScore - startScore) * eased;
        currentScoreRef.current = current;
        setDisplayScore(Math.round(current));

        if (t >= 1) {
          tweenStartRef.current = null;
          currentScoreRef.current = targetScore;
          setDisplayScore(targetScore);
        }
      }

      // Increment phase for pulse movement
      phaseRef.current = (phaseRef.current + (isFull ? 1.4 : 1.0)) % 99999;

      if (pathRef.current) {
        const pathData = buildHeartbeatPath(
          currentScoreRef.current,
          width,
          height,
          phaseRef.current
        );
        pathRef.current.setAttribute('d', pathData);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [width, height, isFull]);

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full overflow-visible ${isFull ? 'h-28 md:h-36' : 'h-10'}`}
        preserveAspectRatio="none"
        style={{
          filter: isFull
            ? 'drop-shadow(0 0 10px rgba(245, 214, 123, 0.45)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.2))'
            : 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.4))',
        }}
      >
        <defs>
          <linearGradient id={`hbGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6B1F" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF2B2" />
            <stop offset="80%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6B1F" stopOpacity="0.4" />
          </linearGradient>
          {/* Subtle horizontal baseline grid */}
          <linearGradient id="baselineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Thin faint baseline */}
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="url(#baselineGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Dynamic ECG Waveform */}
        <path
          ref={pathRef}
          stroke={`url(#hbGrad-${size})`}
          strokeWidth={isFull ? '3' : '1.8'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showScoreLabel && (
        <div className="mt-2 text-center">
          <span className="font-['Cinzel'] text-xl font-bold text-[#F5D67B]">
            {displayScore}
          </span>
          <span className="font-['Catamaran'] text-xs text-[#f5ecd6]/60 tracking-wider ml-1.5 uppercase">
            / 100 Vitality
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Builds the ECG waveform path data based on vitality score
 */
function buildHeartbeatPath(score: number, width: number, height: number, phase: number): string {
  const midY = height / 2;
  // Amplitude scales with score: 0-30 -> low/flat, 66-100 -> energetic peak
  const maxAmp = (height * 0.42);
  const amplitude = Math.max(3, (score / 100) * maxAmp);
  
  // Frequency: lower score has sparse/irregular beats, higher score has steady rhythmic cadence
  const baseBeats = score < 30 ? 3 : score < 60 ? 4 : 5;
  const segment = width / baseBeats;
  
  // Jitter and arrhythmia for at-risk traditions (<35)
  const jitterIntensity = score < 35 ? ((35 - score) / 35) * (height * 0.12) : 0;

  let d = `M 0 ${midY}`;

  for (let i = -1; i <= baseBeats + 1; i++) {
    const x0 = i * segment - (phase % segment);
    const wobble = Math.sin(i * 4.2 + phase * 0.02) * jitterIntensity;
    
    // Wave components: P-wave, Q-dip, R-peak, S-dip, T-wave
    const p1X = x0 + segment * 0.2;
    const pWaveAmp = amplitude * 0.15;
    
    const qX = x0 + segment * 0.38;
    const qDip = amplitude * 0.18;
    
    const rX = x0 + segment * 0.45;
    const rPeak = amplitude + wobble;
    
    const sX = x0 + segment * 0.52;
    const sDip = amplitude * 0.35;
    
    const tX = x0 + segment * 0.72;
    const tWaveAmp = amplitude * 0.25;
    
    const endX = x0 + segment;

    if (endX < 0) continue;
    if (x0 > width) break;

    // Line segments
    d += ` L ${Math.max(0, Math.min(width, p1X - segment * 0.06))} ${midY}`;
    // P wave bump
    d += ` Q ${p1X} ${midY - pWaveAmp}, ${p1X + segment * 0.06} ${midY}`;
    // Flat baseline
    d += ` L ${qX} ${midY}`;
    // Q dip
    d += ` L ${qX + segment * 0.03} ${midY + qDip}`;
    // High R spike
    d += ` L ${rX} ${midY - rPeak}`;
    // Deep S dip
    d += ` L ${sX} ${midY + sDip}`;
    // Return to baseline
    d += ` L ${sX + segment * 0.05} ${midY}`;
    // T wave
    d += ` Q ${tX} ${midY - tWaveAmp}, ${tX + segment * 0.08} ${midY}`;
    // Baseline stretch
    d += ` L ${endX} ${midY}`;
  }

  return d;
}
