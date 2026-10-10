import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

export default function DoctorsSection() {
  const doctors = [
    {
      id: 'doc1',
      name: 'Clinical Specialist Team',
      role: 'Aesthetic Dentistry & Smile Design',
      qualifications: 'Cosmetic & Conservative Dentistry',
      bio: 'Specializing in microscopic porcelain veneers, smile rehabilitation design, and conservative ceramic restorations.',
      image: '/images/doctor1.webp',
    },
    {
      id: 'doc2',
      name: 'Facial Aesthetics Team',
      role: 'Facial Aesthetics & Implantology',
      qualifications: 'Implantology & Facial Harmonization',
      bio: 'Expert in biological dental implants, bone preservation, and non-surgical facial sculpture tailored to natural facial balance.',
      image: '/images/doctor2.webp',
    },
  ];

  return (
    <section id="doctors" className="relative z-20 bg-navy text-ivory py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
            Clinical Leadership
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ivory mb-4">
            Our <span className="italic font-normal text-gold">Clinical Practitioners</span>
          </h2>

          <p className="font-sans text-base text-ivory/70 max-w-xl font-light leading-relaxed">
            Dedicated to precision, biological integrity, and patient-first comfort.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="group bg-navy-surface border border-gold/30 hover:border-gold rounded-sm p-6 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden mb-6 border border-gold/20">
                <img
                  src={doc.image}
                  alt={doc.name}
                  width="500"
                  height="625"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 text-xs font-sans text-gold uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold" />
                  <span>{doc.qualifications}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-serif text-2xl font-light text-gold mb-1">
                  {doc.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-ivory/80 font-medium mb-3">
                  {doc.role}
                </span>

                <p className="font-sans text-sm text-ivory/70 font-light leading-relaxed mb-6 flex-grow">
                  {doc.bio}
                </p>

                <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-gold font-sans">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    ELIX Standard
                  </span>
                  <span className="uppercase tracking-widest text-[10px] text-ivory/60 font-medium">Verified Practice</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
