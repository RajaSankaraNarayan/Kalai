import { useState, useEffect } from 'react';

/**
 * High-performance Parallax Scroll Hook
 * Uses requestAnimationFrame and passive scroll listeners for 60fps/120fps fluid depth updates.
 */
export function useParallaxScroll(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial measurement
    setScrollY(window.scrollY || window.pageYOffset || 0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
