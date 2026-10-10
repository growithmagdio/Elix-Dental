import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustStrip from './sections/TrustStrip';
import AboutSection from './sections/AboutSection';
import TreatmentsSection from './sections/TreatmentsSection';
import ExperienceSection from './sections/ExperienceSection';
import DoctorsSection from './sections/DoctorsSection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import TestimonialsSection from './sections/TestimonialsSection';
import GallerySection from './sections/GallerySection';
import BookingSection from './sections/BookingSection';
import Footer from './sections/Footer';

export default function App() {
  const [selectedTreatment, setSelectedTreatment] = useState('');

  const scrollToBooking = (treatmentName = '') => {
    if (treatmentName) setSelectedTreatment(treatmentName);
    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-navy text-ivory selection:bg-gold selection:text-navy">
      {/* Custom Ring Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Sticky Header Navigation */}
      <Navbar onBookClick={() => scrollToBooking()} />

      {/* Main Single Page Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero onBookClick={() => scrollToBooking()} />

        {/* Section 2: Trust Pillars */}
        <TrustStrip />

        {/* Section 3: About Clinic */}
        <AboutSection />

        {/* Section 4: Treatments Grid */}
        <TreatmentsSection onSelectTreatment={(t) => scrollToBooking(t)} />

        {/* Section 5: The Elix Experience */}
        <ExperienceSection />

        {/* Section 6: Meet the Practitioners */}
        <DoctorsSection />

        {/* Section 7: Draggable Before & After Slider */}
        <BeforeAfterSection />

        {/* Section 8: Patient Charter */}
        <TestimonialsSection />

        {/* Section 9: Clinic Gallery */}
        <GallerySection />

        {/* Section 10: Booking & WhatsApp Section */}
        <BookingSection preselectedTreatment={selectedTreatment} />
      </main>

      {/* Section 11: Footer */}
      <Footer />
    </div>
  );
}
