import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="relative z-20 bg-ivory text-navy py-20 md:py-32 paper-texture border-t border-gold/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
            Real Results
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-navy mb-4">
            Before &amp; <span className="italic font-normal text-gold">After</span> Transformations
          </h2>

          <p className="font-sans text-base text-navy/70 max-w-xl font-light leading-relaxed">
            Drag the gold slider to reveal porcelain veneer and smile architecture results.
          </p>
        </div>

        {/* Draggable Slider Container */}
        <div className="relative max-w-4xl mx-auto aspect-[16/10] rounded-sm border border-gold/40 shadow-luxury overflow-hidden select-none">
          
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => (isDragging.current = true)}
            onTouchEnd={() => (isDragging.current = false)}
            onTouchMove={handleTouchMove}
            className="relative w-full h-full cursor-ew-resize"
          >
            {/* After Image */}
            <img
              src="/images/smile-after.webp"
              alt="After Smile Transformation"
              width="900"
              height="562"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <span className="absolute top-4 right-4 px-3 py-1 bg-navy/80 backdrop-blur-md text-gold text-xs uppercase tracking-widest font-sans border border-gold/30 rounded-sm">
              After Treatment
            </span>

            {/* Before Image */}
            <div
              className="absolute inset-0 h-full overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/images/smile-before.webp"
                alt="Before Smile"
                width="900"
                height="562"
                loading="lazy"
                className="absolute top-0 left-0 h-full max-w-none object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-navy/80 backdrop-blur-md text-ivory text-xs uppercase tracking-widest font-sans border border-gold/30 rounded-sm">
                Before
              </span>
            </div>

            {/* Vertical Gold Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gold pointer-events-none shadow-gold-glow"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Central Handle Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-navy text-gold border border-gold shadow-gold-glow flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
