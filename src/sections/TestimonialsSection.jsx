import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const charterPrinciples = [
    {
      id: 1,
      quote: "Every smile transformation is an intimate collaboration. We listen to your desires and craft natural restorations that preserve your genuine personality.",
      title: "Personalized Smile Design",
      tag: "ELIX Principle I",
    },
    {
      id: 2,
      quote: "We prioritize non-invasive biological techniques that preserve maximum healthy enamel and support long-term dental health.",
      title: "Enamel Preservation Standard",
      tag: "ELIX Principle II",
    },
    {
      id: 3,
      quote: "From calm private consultation suites to serene treatment rooms, every detail is curated to remove anxiety and elevate your experience.",
      title: "Sanctuary Environment",
      tag: "ELIX Principle III",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? charterPrinciples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === charterPrinciples.length - 1 ? 0 : prev + 1));
  };

  const current = charterPrinciples[currentIndex];

  return (
    <section className="relative z-20 bg-navy text-ivory py-20 md:py-32 overflow-hidden">
      {/* Hairlines */}
      <div className="absolute top-0 left-0 right-0 gold-hairline opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 gold-hairline opacity-30" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Header */}
        <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3 inline-block">
          Patient Care Standard
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ivory mb-14">
          The ELIX <span className="italic font-normal text-gold">Clinical Charter</span>
        </h2>

        {/* Display Card */}
        <div className="relative bg-navy-surface border border-gold/30 rounded-sm p-8 md:p-14 shadow-luxury max-w-3xl mx-auto">
          
          {/* Gold Quotation Mark Icon */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-navy border border-gold/50 flex items-center justify-center text-gold shadow-gold-glow">
            <Quote className="w-6 h-6 fill-gold text-gold" />
          </div>

          <span className="text-xs uppercase tracking-widest text-gold font-sans font-medium mb-4 block pt-2">
            {current.tag}
          </span>

          <p className="font-serif text-xl sm:text-2xl font-light leading-relaxed text-ivory/90 mb-8 italic">
            "{current.quote}"
          </p>

          <div className="flex flex-col items-center">
            <span className="font-serif text-lg font-medium text-gold">
              {current.title}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold/20">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-navy transition-all duration-300"
              aria-label="Previous Principle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {charterPrinciples.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'bg-gold w-8' : 'bg-gold/30 hover:bg-gold/60'
                  }`}
                  aria-label={`Go to principle ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-navy transition-all duration-300"
              aria-label="Next Principle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
