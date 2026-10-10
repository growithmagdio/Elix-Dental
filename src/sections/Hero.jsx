import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-navy text-ivory overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background Subtle Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,151,90,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-ultra text-gold font-medium">
                Dental &amp; Aesthetic Clinique
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-ivory leading-[1.08] mb-6">
              Architects of <br className="hidden sm:block" />
              <span className="italic font-normal text-gold">Beautiful Smiles</span>
            </h1>

            {/* Fine Gold Line Divider */}
            <div className="w-16 h-[1px] bg-gold/40 mb-6" />

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg text-ivory/80 font-light leading-relaxed mb-10 max-w-xl">
              Exceptional dental care, advanced treatments and personalised smile transformations delivered with precision and comfort.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookClick}
                className="px-8 py-4 bg-gold hover:bg-gold-light text-navy text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-3 group"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="#treatments"
                className="px-8 py-4 bg-navy-surface/80 hover:bg-gold/10 text-ivory hover:text-gold border border-gold/30 text-xs uppercase tracking-[0.2em] font-medium rounded-sm backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Explore Treatments</span>
              </a>
            </div>
          </div>

          {/* Right Column: Luxury Clinic Image Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[14/10] rounded-sm p-2 border border-gold/30 bg-navy-surface/50 shadow-luxury group">
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-gold/20">
                <picture className="w-full h-full block">
                  <source
                    type="image/avif"
                    srcSet="/images/dental-hero-sm.avif 480w, /images/dental-hero-md.avif 800w, /images/dental-hero.avif 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 800px"
                  />
                  <source
                    type="image/webp"
                    srcSet="/images/dental-hero-sm.webp 480w, /images/dental-hero-md.webp 800w, /images/dental-hero.webp 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 800px"
                  />
                  <img
                    src="/images/dental-hero-md.jpg"
                    srcSet="/images/dental-hero-sm.jpg 480w, /images/dental-hero-md.jpg 800w, /images/dental-hero.jpg 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 800px"
                    alt="ELIX Dental & Aesthetic Clinique Interior"
                    width="800"
                    height="571"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </picture>
                {/* Subtle Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Gold Crest Accent Mark */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-navy text-gold p-1 border border-gold/40 shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-gold/20 flex items-center justify-center">
                  <span className="font-serif text-xl font-light text-gold">E</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
