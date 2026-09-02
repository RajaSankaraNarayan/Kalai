import React, { useEffect, useState } from 'react';

export const GoldenGlowCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const hoverable = target.closest('button, a, input, textarea, [data-cursor-hover="true"], [role="button"]');
        setIsHovered(!!hoverable);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] select-none"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer Golden Aura Ring */}
      <div
        className={`absolute -top-4 -left-4 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 -top-5 -left-5 bg-[#d4af37]/25 border-2 border-[#f5d67b] shadow-[0_0_25px_rgba(245,214,123,0.8),0_0_50px_rgba(212,175,55,0.4)] scale-110'
            : isMouseDown
            ? 'w-6 h-6 -top-3 -left-3 bg-[#d4af37]/30 border border-[#f5d67b] shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-90'
            : 'w-8 h-8 -top-4 -left-4 bg-[#d4af37]/15 border border-[#d4af37]/70 shadow-[0_0_16px_rgba(212,175,55,0.5)] scale-100'
        }`}
      >
        {/* Secondary Inner Glow Radial */}
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,242,178,0.4)_0%,transparent_70%)]" />
      </div>

      {/* Center Core Golden Particle Dot */}
      <div
        className={`absolute rounded-full transition-transform duration-100 ease-out bg-[#fff9db] ${
          isHovered
            ? 'w-2 h-2 -top-1 -left-1 shadow-[0_0_10px_#ffffff,0_0_18px_#f5d67b] scale-125'
            : isMouseDown
            ? 'w-2.5 h-2.5 -top-[5px] -left-[5px] bg-[#ffd700] shadow-[0_0_12px_#d4af37]'
            : 'w-1.5 h-1.5 -top-[3px] -left-[3px] shadow-[0_0_8px_#f5d67b,0_0_14px_#d4af37]'
        }`}
      />
    </div>
  );
};

// Backwards compatibility export
export const VelCursor = GoldenGlowCursor;
