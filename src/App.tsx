import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BadgeStrip } from './components/BadgeStrip';
import { WhatTheyOffer } from './components/WhatTheyOffer';
import { InteractiveServiceFilter } from './components/InteractiveServiceFilter';
import { ReviewTicker } from './components/ReviewTicker';
import { MapAndHours } from './components/MapAndHours';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { BookingFormModal } from './components/BookingFormModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setPrefilledService(serviceName);
    } else {
      setPrefilledService('');
    }
    setIsBookingModalOpen(true);
  };

  const handleProceedWithSelection = (selectedNames: string[], totalPrice: number) => {
    const combinedString = selectedNames.join(' + ') + ` (£${totalPrice.toFixed(2)})`;
    setPrefilledService(combinedString);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans antialiased flex flex-col pb-20 md:pb-0 selection:bg-accent/30 selection:text-text">
      {/* Top Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main View switching / page flow */}
      <main className="flex-1">
        {activeTab === 'home' ? (
          <>
            {/* 1. Hero with overlay (Instant paint, no entrance delay) */}
            <Hero onOpenBooking={() => handleOpenBooking()} />

            {/* 2. Highlights Badge Strip */}
            <BadgeStrip />

            {/* 3. What They Offer (4 Featured Cards in order) */}
            <WhatTheyOffer onSelectServiceForBooking={(service) => handleOpenBooking(service)} />

            {/* 4. Interactive Service Filter (Interactive signature moment) */}
            <InteractiveServiceFilter
              onProceedToBookingWithSelection={handleProceedWithSelection}
            />

            {/* 5. Review Ticker */}
            <ReviewTicker />

            {/* 6. Map and Hours */}
            <MapAndHours />
          </>
        ) : (
          /* Dedicated Services & Prices Page View */
          <div className="animate-fadeIn">
            <div className="bg-surface py-10 sm:py-12 border-b border-bg text-center px-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-bg px-3 py-1 rounded-badge border border-muted/15 inline-block mb-2">
                12 Burton Rd Menu
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-2">
                Services & Price List
              </h1>
              <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
                Clear, upfront prices with zero hidden fees. Tap any service to view duration and add to your booking selection.
              </p>
            </div>

            <InteractiveServiceFilter
              onProceedToBookingWithSelection={handleProceedWithSelection}
            />

            <MapAndHours />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Bottom Bar for Mobile Conversions */}
      <FloatingMobileBar />

      {/* Booking / Enquiry Form Modal with Google Sheets endpoint */}
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefilledService={prefilledService}
      />
    </div>
  );
}
