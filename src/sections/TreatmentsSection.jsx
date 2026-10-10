import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function TreatmentsSection({ onSelectTreatment }) {
  const [activeTab, setActiveTab] = useState('dental'); // 'dental' | 'aesthetic'

  const dentalTreatments = [
    {
      id: 'veneers',
      title: 'Porcelain Veneers & Smile Design',
      desc: 'Hand-sculpted ultra-thin ceramic veneers tailored to your facial proportions for a luminous, natural smile.',
      tags: ['Cosmetic', 'Micro-thin', 'Custom Shade'],
    },
    {
      id: 'implants',
      title: 'Precision Dental Implants',
      desc: 'Permanent biological tooth replacement using Swiss biocompatible titanium and ceramic crowns.',
      tags: ['Surgical', 'Lifelong', 'Guided 3D'],
    },
    {
      id: 'aligners',
      title: 'Invisible Orthodontic Aligners',
      desc: 'Discreet alignment treatment planned with digital 3D kinematics for comfortable smile perfection.',
      tags: ['Clear', 'Removable', 'Predictable'],
    },
    {
      id: 'whitening',
      title: 'Laser Teeth Whitening',
      desc: 'Gentle, non-sensitivity laser whitening restoring your enamel to its optimal natural brightness.',
      tags: ['Pain-free', 'Instant', 'Enamel Safe'],
    },
    {
      id: 'root-canal',
      title: 'Microscopic Endodontics (Root Canal)',
      desc: 'High-precision painless root therapy performed under high magnification for tooth preservation.',
      tags: ['Preservation', 'Microscope', 'Comfort'],
    },
    {
      id: 'full-mouth',
      title: 'Full Mouth Restoration',
      desc: 'Comprehensive rehabilitation combining implants, crowns, and aesthetic symmetry.',
      tags: ['Rehabilitation', 'Holistic', 'Function'],
    },
  ];

  const aestheticTreatments = [
    {
      id: 'facial-sculpting',
      title: 'Facial Aesthetics & Contour Mapping',
      desc: 'Non-surgical facial harmonization enhancing chin projection, jawline definition, and cheek volume.',
      tags: ['Non-surgical', 'Symmetry', 'Refined'],
    },
    {
      id: 'wrinkle-relaxing',
      title: 'Precision Muscle Relaxing Therapy',
      desc: 'Subtle aesthetic injections designed to smooth expression lines while preserving dynamic emotion.',
      tags: ['Subtle', 'Natural', 'Targeted'],
    },
    {
      id: 'lip-architecture',
      title: 'Lip Architecture & Hydration',
      desc: 'Bespoke lip shaping prioritizing natural volume, crisp borders, and subtle hydration.',
      tags: ['Hyaluronic', 'Proportional', 'Soft'],
    },
    {
      id: 'skin-booster',
      title: 'Polynucleotide Skin Boosters',
      desc: 'Advanced bio-rejuvenation stimulating collagen synthesis and cellular repair for glowing skin.',
      tags: ['Collagen', 'Rejuvenation', 'Luminous'],
    },
  ];

  const currentList = activeTab === 'dental' ? dentalTreatments : aestheticTreatments;

  return (
    <section id="treatments" className="relative z-20 bg-navy text-ivory py-24 md:py-36 overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
            Clinical Artistry
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ivory mb-6">
            Bespoke <span className="italic font-normal text-gold">Treatments</span> &amp; Procedures
          </h2>

          <p className="font-sans text-base text-ivory/70 max-w-2xl font-light leading-relaxed mb-10">
            Every procedure is executed with microscopic precision using biocompatible luxury materials and non-invasive methods.
          </p>

          {/* Category Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-navy-surface border border-gold/30 backdrop-blur-md shadow-luxury">
            <button
              onClick={() => setActiveTab('dental')}
              className={`px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                activeTab === 'dental'
                  ? 'bg-gold text-navy shadow-gold-glow'
                  : 'text-ivory/70 hover:text-gold'
              }`}
            >
              Dental Artistry
            </button>
            <button
              onClick={() => setActiveTab('aesthetic')}
              className={`px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                activeTab === 'aesthetic'
                  ? 'bg-gold text-navy shadow-gold-glow'
                  : 'text-ivory/70 hover:text-gold'
              }`}
            >
              Facial Aesthetics
            </button>
          </div>
        </div>

        {/* Treatments Card Grid with Subtle 3D Tilt Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTreatment?.(item.title)}
              className="group relative bg-navy-surface/80 border border-gold/20 hover:border-gold/80 rounded-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold-glow cursor-pointer flex flex-col justify-between"
            >
              {/* Gold Edge Trace Highlight on Hover */}
              <div className="absolute inset-0 border border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors duration-300" />
                </div>

                <h3 className="font-serif text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-300 mb-3">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-ivory/70 font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/10">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy/60 text-gold/90 border border-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
