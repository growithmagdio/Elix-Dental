import React from 'react';
import { ShieldCheck, Sparkles, Compass, HeartHandshake } from 'lucide-react';

export default function TrustStrip() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Biocompatible Care',
      desc: 'Precision materials engineered for maximum longevity and biological harmony.',
    },
    {
      icon: Sparkles,
      title: 'Digital Smile Design',
      desc: '3D facial mapping and natural tooth architecture before treatment.',
    },
    {
      icon: Compass,
      title: 'Conservative Dentistry',
      desc: 'Micro-invasive techniques preserving natural enamel and structure.',
    },
    {
      icon: HeartHandshake,
      title: 'Private Concierge',
      desc: 'Serene consultation suites designed around complete personal comfort.',
    },
  ];

  return (
    <section className="relative z-20 bg-ivory text-navy py-12 md:py-16 border-y border-gold/20 paper-texture">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-lg font-normal text-navy leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-navy/70 font-sans font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
