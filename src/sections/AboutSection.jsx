import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="relative z-20 bg-ivory text-navy py-20 md:py-32 paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Cathedral-Arched Image Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-t-full border border-gold/40 p-2 bg-ivory shadow-luxury group">
              {/* Inner Arch Container */}
              <div className="relative w-full h-full rounded-t-full overflow-hidden">
                <picture className="w-full h-full block">
                  <source
                    type="image/avif"
                    srcSet="/images/about-sm.avif 480w, /images/about-md.avif 800w, /images/about.avif 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 600px"
                  />
                  <source
                    type="image/webp"
                    srcSet="/images/about-sm.webp 480w, /images/about-md.webp 800w, /images/about.webp 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 600px"
                  />
                  <img
                    src="/images/about-md.jpg"
                    srcSet="/images/about-sm.jpg 480w, /images/about-md.jpg 800w, /images/about.jpg 1200w"
                    sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 600px"
                    alt="PANACEA DENTAL CARE Consultation Suite"
                    width="600"
                    height="750"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-50" />
              </div>

              {/* Ornamental Gold Monogram Badge - PANACEA Tooth & Leaf */}
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-navy text-gold p-1 shadow-gold-glow flex items-center justify-center border border-gold/50">
                <div className="w-full h-full rounded-full border border-gold/30 flex flex-col items-center justify-center text-center p-2 bg-[#061710] overflow-hidden">
                  <img src="/images/panacea-emblem.png" alt="PANACEA DENTAL CARE" className="w-8 h-8 object-contain" />
                  <span className="text-[7px] tracking-[0.2em] uppercase font-sans mt-0.5 text-gold font-medium">PANACEA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Philosophy Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
              Philosophy &amp; Artistry
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-navy leading-[1.15] mb-6">
              Where Restrained Luxury Meets <span className="italic font-normal text-gold">Clinical Precision</span>
            </h2>

            <div className="w-16 h-[1px] bg-gold mb-6" />

            <p className="font-sans text-base text-navy/80 font-light leading-relaxed mb-6">
              At PANACEA DENTAL CARE, we reject the impersonal, sterile environment of traditional practices. Inspired by the quiet dignity of timeless heritage suites, our clinic offers an environment of calm, privacy, and clinical mastery.
            </p>

            <p className="font-sans text-sm md:text-base text-navy/70 font-light leading-relaxed mb-8">
              Every treatment is approached with tailored care. Utilizing digital facial mapping, handcrafted porcelain veneers, and biological implant techniques, our practitioners restore natural harmony, proportion, and effortless confidence.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-6 border-t border-gold/20">
              <div className="flex flex-col">
                <span className="font-serif text-lg text-navy font-semibold mb-1">Tailored Facial Aesthetics</span>
                <span className="text-xs text-navy/60 font-sans">Proportional harmony designed strictly around your natural facial structure.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg text-navy font-semibold mb-1">Painless Modern Care</span>
                <span className="text-xs text-navy/60 font-sans">Advanced conservative techniques designed for maximum comfort and longevity.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
