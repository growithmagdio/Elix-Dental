import React from 'react';
import CrestLogo from '../components/CrestLogo';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark text-ivory pt-20 pb-12 border-t border-gold/30 overflow-hidden">
      {/* Top Ornamental Gold Hairline */}
      <div className="absolute top-0 left-0 right-0 gold-hairline opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gold/20">
          
          {/* Brand & Crest Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <CrestLogo className="w-12 h-12" textColor="text-ivory" />
            
            <p className="font-sans text-xs text-ivory/70 font-light leading-relaxed mt-6 mb-8 max-w-sm">
              Elix Dental &amp; Aesthetic Clinique delivers bespoke porcelain veneer design, precision implants, and facial sculpting in an atmosphere of quiet royalty.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-gold">
              <a href="#" className="p-2.5 rounded-full border border-gold/30 hover:bg-gold hover:text-navy transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full border border-gold/30 hover:bg-gold hover:text-navy transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full border border-gold/30 hover:bg-gold hover:text-navy transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 flex flex-col gap-4 text-xs font-sans text-ivory/80">
            <span className="text-gold uppercase tracking-ultra font-medium text-xs mb-2">
              Clinique Info
            </span>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ivory font-medium">Location</strong>
                <span>[CITY, FULL ADDRESS]</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ivory font-medium">Phone / WhatsApp</strong>
                <span>[NUMBER]</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="block text-ivory font-medium">Consultation Hours</strong>
                <span>[HOURS]</span>
              </div>
            </div>
          </div>

          {/* Map Embed Preview Container */}
          <div className="md:col-span-4 flex flex-col">
            <span className="text-gold uppercase tracking-ultra font-medium text-xs mb-4">
              Map Location
            </span>

            <div className="relative w-full h-44 rounded-sm border border-gold/30 overflow-hidden bg-navy-surface shadow-luxury">
              <iframe
                title="Elix Clinique Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537363153166!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.85)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-ivory/50 gap-4">
          <span>&copy; {new Date().getFullYear()} Elix Dental &amp; Aesthetic Clinique. All Rights Reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Patient Charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
