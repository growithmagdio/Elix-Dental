import React, { useEffect, useState } from 'react';

export default function IntroLoader({ onComplete }) {
  const [stage, setStage] = useState('drawing'); // 'drawing' -> 'lifting' -> 'done'

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStage('done');
      onComplete?.();
      return;
    }

    // Step 1: Draw gold crest lines (1.2s)
    const drawTimer = setTimeout(() => {
      setStage('lifting');
    }, 1400);

    // Step 2: Lift curtain overlay (0.9s transition)
    const liftTimer = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 2300);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(liftTimer);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-navy transition-transform duration-1000 cubic-bezier(0.77, 0, 0.175, 1) ${
        stage === 'lifting' ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* SVG Crest Line Drawing */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
            {/* Outer Circle line animation */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="animate-draw-circle"
              style={{
                strokeDasharray: 280,
                strokeDashoffset: stage === 'drawing' ? 280 : 0,
                transition: 'stroke-dashoffset 1.3s ease-in-out',
              }}
            />
            {/* Inner Ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 2"
              opacity="0.7"
            />
          </svg>

          {/* Monogram E stroke */}
          <span
            className={`absolute font-serif text-4xl text-gold font-light transition-opacity duration-700 ${
              stage === 'drawing' ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            E
          </span>
        </div>

        {/* Title Fade */}
        <div className="mt-6 flex flex-col items-center text-center">
          <span className="font-serif text-xl tracking-[0.25em] uppercase text-ivory">
            ELIX
          </span>
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-gold/80 mt-1">
            Dental & Aesthetic Clinique
          </span>
        </div>

        {/* Fine Gold Line Divider */}
        <div className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
}
