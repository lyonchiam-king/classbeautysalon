import React from 'react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative w-full bg-surface overflow-hidden border-b border-bg">
      {/* Background Image Container */}
      <div className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center">
        <img
          src={SALON_INFO.heroImage}
          alt="Class Beauty Salon interior on Burton Rd Withington"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        
        {/* Soft Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-text/85 via-text/60 to-text/40 backdrop-blur-[1px]" />

        {/* Content Container - No entrance animation, instant paint */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center text-surface">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-badge bg-surface/20 backdrop-blur-md text-surface text-xs font-semibold tracking-wide uppercase mb-4 border border-surface/30">
            <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Withington, Manchester M20 3ED
          </div>

          {/* Exact Required Copy */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto mb-4 text-surface drop-shadow-sm">
            Precise cuts and threading in the heart of Withington.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-surface/90 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            Friendly staff, fair prices, and a relaxing atmosphere on Burton Rd.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            {/* Primary CTA - Call to Book with touch response */}
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="w-full sm:w-auto min-w-[200px] bg-accent text-surface text-base font-bold px-6 py-3.5 rounded-btn shadow-md hover:bg-accent-hover active:bg-accent-pressed active:scale-95 transition-all text-center focus-visible:ring-2 focus-visible:ring-surface flex items-center justify-center gap-2"
              id="hero-call-to-book-btn"
            >
              <svg className="w-5 h-5 text-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call to Book
            </a>

            {/* Secondary Option: Pre-select enquiry form */}
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto text-sm text-surface hover:text-accent font-semibold px-4 py-3 rounded-btn border border-surface/40 hover:border-surface bg-surface/10 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-surface"
            >
              Send Booking Request
            </button>
          </div>

          {/* Direct Phone Indicator for quick scan */}
          <div className="mt-4 text-xs text-surface/80 flex items-center justify-center gap-2 font-medium">
            <span>Direct Phone:</span>
            <a href={`tel:${SALON_INFO.phoneRaw}`} className="underline hover:text-surface font-bold">
              {SALON_INFO.phone}
            </a>
            <span>• Walk-ins Welcome</span>
          </div>
        </div>
      </div>
    </section>
  );
};
