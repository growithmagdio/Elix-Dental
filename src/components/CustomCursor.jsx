import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch / mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp trailing ring animation
  useEffect(() => {
    if (isMobile) return;
    let animFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const followCursor = () => {
      setRingPos((prev) => ({
        x: lerp(prev.x, pos.x, 0.15),
        y: lerp(prev.y, pos.y, 0.15),
      }));
      animFrame = requestAnimationFrame(followCursor);
    };

    animFrame = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animFrame);
  }, [pos, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Center Gold Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Trailing Gold Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-gold/60 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovered ? 'w-12 h-12 bg-gold/10 border-gold shadow-gold-glow scale-110' : 'w-8 h-8 opacity-70'
        }`}
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
      />
    </>
  );
}
