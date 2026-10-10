import React from 'react';

export default function CrestLogo({ className = "w-10 h-10", showText = true, textColor = "text-ivory" }) {
  return (
    <div className="flex items-center gap-3.5 group cursor-pointer select-none">
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Outer decorative ring */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold transition-transform duration-700 group-hover:rotate-45">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.9" />
          {/* Corner diamond accents */}
          <polygon points="50,4 53,8 50,12 47,8" fill="currentColor" />
          <polygon points="50,88 53,92 50,96 47,92" fill="currentColor" />
          <polygon points="4,50 8,53 12,50 8,47" fill="currentColor" />
          <polygon points="88,50 92,53 96,50 92,47" fill="currentColor" />
        </svg>
        
        {/* Inner Crest Monogram E */}
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xl font-bold tracking-tight text-gold">
          E
        </span>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-lg tracking-[0.18em] uppercase leading-none ${textColor}`}>
            ELIX
          </span>
          <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-gold font-medium mt-1">
            Dental & Aesthetic
          </span>
        </div>
      )}
    </div>
  );
}
