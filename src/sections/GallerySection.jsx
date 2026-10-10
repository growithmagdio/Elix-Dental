import React from 'react';

export default function GallerySection() {
  const images = [
    {
      baseName: '/images/dental-hero',
      title: 'Grand Reception Lounge',
      subtitle: 'Ivory Travertine & Brass Details',
      width: 800,
      height: 550,
    },
    {
      baseName: '/images/about',
      title: 'Private Consultation Suite',
      subtitle: 'Cathedral Arch Architecture',
      width: 600,
      height: 750,
    },
    {
      baseName: '/images/doctor1',
      title: 'Microscopic Treatment Suite',
      subtitle: 'Precision Ergonomic Care',
      width: 500,
      height: 625,
    },
    {
      baseName: '/images/doctor2',
      title: 'Aesthetic Diagnostics Suite',
      subtitle: '3D Kinematic Facial Scanner',
      width: 500,
      height: 625,
    },
  ];

  return (
    <section id="gallery" className="relative z-20 bg-ivory text-navy py-20 md:py-32 paper-texture overflow-hidden border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
            Sanctuary Atmosphere
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-navy mb-4">
            Clinique <span className="italic font-normal text-gold">Gallery</span>
          </h2>

          <p className="font-sans text-base text-navy/70 max-w-xl font-light leading-relaxed">
            Designed to feel like a heritage suite rather than a medical clinic.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[16/11] rounded-sm overflow-hidden border border-gold/30 shadow-luxury bg-navy cursor-pointer"
            >
              <picture className="w-full h-full block">
                <source
                  type="image/avif"
                  srcSet={`${img.baseName}-sm.avif 480w, ${img.baseName}-md.avif 800w, ${img.baseName}.avif 1200w`}
                  sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 800px"
                />
                <source
                  type="image/webp"
                  srcSet={`${img.baseName}-sm.webp 480w, ${img.baseName}-md.webp 800w, ${img.baseName}.webp 1200w`}
                  sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 800px"
                />
                <img
                  src={`${img.baseName}-md.jpg`}
                  srcSet={`${img.baseName}-sm.jpg 480w, ${img.baseName}-md.jpg 800w, ${img.baseName}.jpg 1200w`}
                  sizes="(max-width: 640px) 480px, (max-width: 1024px) 600px, 800px"
                  alt={img.title}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col text-ivory">
                <span className="font-serif text-2xl font-light text-gold mb-1">
                  {img.title}
                </span>
                <span className="text-xs font-sans uppercase tracking-widest text-ivory/70">
                  {img.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
