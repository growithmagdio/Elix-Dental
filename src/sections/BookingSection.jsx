import React, { useState } from 'react';
import { Phone, CheckCircle, Send, MessageSquare } from 'lucide-react';

export default function BookingSection({ preselectedTreatment = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: preselectedTreatment || 'Porcelain Veneers',
    date: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative z-20 bg-navy text-ivory py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs uppercase tracking-ultra text-gold font-medium mb-3">
              Reserve Your Consultation
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ivory mb-6">
              Begin Your <span className="italic font-normal text-gold">Transformation</span>
            </h2>

            <p className="font-sans text-base text-ivory/70 font-light leading-relaxed mb-8">
              Schedule your private consultation with our master practitioners. Experience bespoke dental artistry in a serene environment.
            </p>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-6 rounded-sm bg-navy-surface border border-gold/30 mb-8 flex flex-col gap-4 shadow-luxury">
              <div className="flex items-center gap-3 text-gold">
                <MessageSquare className="w-5 h-5 text-gold" />
                <span className="font-serif text-lg text-ivory">Direct Concierge Booking</span>
              </div>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                Prefer direct messaging or private inquiries? Connect with our clinical concierge via WhatsApp.
              </p>
              <a
                href="https://wa.me/15550192837"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gold hover:bg-gold-light text-navy text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Concierge via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-navy-surface/90 border border-gold/40 rounded-sm p-8 md:p-12 shadow-luxury backdrop-blur-md">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold mb-6 shadow-gold-glow">
                    <CheckCircle className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-gold mb-3">
                    Appointment Requested
                  </h3>
                  <p className="font-sans text-sm text-ivory/80 max-w-md font-light leading-relaxed mb-6">
                    Thank you, <strong className="text-gold font-medium">{formData.name}</strong>. Our clinical concierge will contact you shortly to confirm your consultation details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-gold/10 text-gold border border-gold/40 text-xs uppercase tracking-widest rounded-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria Spencer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-navy/80 border border-gold/30 rounded-sm text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-medium">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2837"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-navy/80 border border-gold/30 rounded-sm text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-gold font-medium">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3.5 bg-navy/80 border border-gold/30 rounded-sm text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-medium">
                      Desired Treatment *
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3.5 bg-navy/80 border border-gold/30 rounded-sm text-sm text-ivory focus:outline-none focus:border-gold transition-colors font-sans"
                    >
                      <option value="Porcelain Veneers">Porcelain Veneers &amp; Smile Design</option>
                      <option value="Dental Implants">Precision Dental Implants</option>
                      <option value="Invisible Aligners">Invisible Orthodontic Aligners</option>
                      <option value="Facial Aesthetics">Facial Aesthetics &amp; Sculpting</option>
                      <option value="Laser Whitening">Laser Teeth Whitening</option>
                      <option value="Full Mouth">Full Mouth Rehabilitation</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-gold font-medium">
                      Personal Notes / Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention any specific preferences or scheduling requirements..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3.5 bg-navy/80 border border-gold/30 rounded-sm text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold-light text-navy text-xs uppercase tracking-[0.25em] font-medium rounded-sm transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group mt-2"
                  >
                    <span>Request Private Consultation</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
