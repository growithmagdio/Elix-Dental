import React, { useState } from 'react';
import { Compass, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ExperienceSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Consultation & Facial Mapping',
      icon: Compass,
      desc: 'We begin in our quiet private suite with 3D facial architecture mapping and digital photography to analyze natural bone symmetry and proportion.',
    },
    {
      num: '02',
      title: 'Digital Smile Design',
      icon: Sparkles,
      desc: 'Test drive your future smile before any physical work begins. We craft digital mockups tailored strictly around your personality and facial contours.',
    },
    {
      num: '03',
      title: 'Micro-Precise Treatment',
      icon: ShieldCheck,
      desc: 'Painless biological precision using luxury biocompatible ceramics and non-invasive laser tech in a relaxing lounge environment.',
    },
    {
      num: '04',
      title: 'Reformed Confidence & Smile',
      icon: HeartHandshake,
      desc: 'Step into the world with a radiant, natural, and timeless smile backed by our lifelong heritage maintenance standard.',
    },
  ];

  return (
    <section id="experience" className="relative z-20 bg-ivory text-navy py-24 md:py-36 paper-texture overflow-hidden border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
            The Elix Protocol
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-navy mb-6">
            The <span className="italic font-normal text-gold">Elix Experience</span>
          </h2>

          <p className="font-sans text-base text-navy/70 max-w-xl font-light leading-relaxed">
            Four quiet steps designed to remove anxiety and elevate dental care into a serene luxury experience.
          </p>
        </div>

        {/* 4 Steps Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps Navigator List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`group p-6 rounded-sm border transition-all duration-500 cursor-pointer flex items-start gap-6 ${
                    isActive
                      ? 'bg-navy text-ivory border-gold shadow-gold-glow translate-x-2'
                      : 'bg-ivory/80 text-navy border-gold/30 hover:border-gold hover:bg-parchment'
                  }`}
                >
                  <div className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-colors ${
                    isActive ? 'border-gold text-gold bg-navy-surface' : 'border-gold/30 text-gold/80 bg-ivory'
                  }`}>
                    <span className="font-serif text-xl font-light leading-none">{step.num}</span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className={`font-serif text-xl font-light mb-2 transition-colors ${
                      isActive ? 'text-gold' : 'text-navy group-hover:text-gold'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`font-sans text-sm font-light leading-relaxed ${
                      isActive ? 'text-ivory/80' : 'text-navy/70'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Preview Display Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-sm bg-navy text-ivory p-8 border border-gold/40 shadow-luxury flex flex-col justify-between overflow-hidden">
              {/* Gold Hairline Backdrop Decorative Circles */}
              <div className="absolute -top-16 -right-16 w-64 h-64 border border-gold/20 rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-gold/15 rounded-full pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-ultra text-gold font-medium">Step {steps[activeStep].num} / 04</span>
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                  {React.createElement(steps[activeStep].icon, { className: 'w-5 h-5' })}
                </div>
              </div>

              <div className="relative z-10 my-auto">
                <h3 className="font-serif text-3xl font-light text-gold mb-4">
                  {steps[activeStep].title}
                </h3>
                <p className="font-sans text-base text-ivory/80 font-light leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-gold/20">
                <span className="text-xs text-ivory/60 uppercase tracking-widest font-sans">Elix Standard</span>
                <span className="text-xs text-gold font-serif italic">Restrained Perfection</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
