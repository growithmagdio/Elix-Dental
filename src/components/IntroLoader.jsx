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
      <div className="relative flex flex-col items-center px-6">
        {/* Official ELIX Brand Logo Animation */}
        <picture className="inline-block transition-all duration-700">
          <source type="image/webp" srcSet="/images/elix-logo-full.webp" />
          <img
            src="/images/elix-logo-full.png"
            alt="ELIX Dental & Aesthetic Clinic"
            width="300"
            height="174"
            className={`w-64 sm:w-80 h-auto object-contain transition-all duration-1000 ${
              stage === 'drawing' ? 'opacity-90 scale-95' : 'opacity-100 scale-100'
            }`}
          />
        </picture>

        {/* Fine Gold Line Divider */}
        <div className="mt-8 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
}
