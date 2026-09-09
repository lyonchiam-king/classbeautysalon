import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const MapAndHours: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-surface border-t border-bg" id="hours-map">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-bg px-3 py-1 rounded-badge border border-muted/15 inline-block mb-2">
            Visit Us On Burton Rd
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2">
            Opening Hours & Location
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
            Conveniently located in the heart of Withington, Manchester.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Info & Hours Panel */}
          <div className="bg-bg p-6 sm:p-8 rounded-card border border-muted/15 space-y-6 shadow-sm">
            {/* Address */}
            <div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-surface rounded-badge text-accent shadow-2xs border border-muted/10 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text mb-1">
                    Salon Address
                  </h3>
                  <p className="text-sm text-text font-medium leading-relaxed">
                    {SALON_INFO.address}
                  </p>
                  <a
                    href={SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover mt-2 underline focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Open in Google Maps
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone */}
            <div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-surface rounded-badge text-accent shadow-2xs border border-muted/10 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text mb-1">
                    Phone & Bookings
                  </h3>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-base font-bold text-accent hover:text-accent-hover underline block focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {SALON_INFO.phone}
                  </a>
                  <p className="text-xs text-muted mt-1">
                    Call directly or walk in on Burton Rd
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Table */}
            <div className="pt-2 border-t border-muted/15">
              <h3 className="font-serif text-lg font-bold text-text mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Opening Times
              </h3>
              <div className="space-y-2">
                {SALON_INFO.hours.map((h) => (
                  <div key={h.days} className="flex justify-between text-sm py-1.5 px-3 bg-surface rounded-btn border border-muted/10">
                    <span className="font-bold text-text">{h.days}</span>
                    <span className="font-semibold text-accent">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Static Map Graphic Card with Navigation Link */}
          <div className="bg-bg rounded-card border border-muted/15 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-muted/20 overflow-hidden flex items-center justify-center group">
              {/* Static Map Image / Map Graphic */}
              <iframe
                title="Class Beauty Salon Google Map"
                src="https://maps.google.com/maps?q=12%20Burton%20Rd%2C%20Withington%2C%20Manchester%20M20%203ED%2C%20UK&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                allowFullScreen
              ></iframe>

              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-badge text-xs font-bold text-text shadow-sm border border-muted/15">
                📍 12 Burton Rd, Withington
              </div>
            </div>

            <div className="p-5 bg-surface border-t border-muted/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-text block">Standing on Burton Rd?</span>
                <span className="text-xs text-muted">Walk in or navigate directly in Google Maps.</span>
              </div>

              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-accent text-surface hover:bg-accent-hover font-bold text-xs sm:text-sm px-4 py-2.5 rounded-btn shadow transition-all text-center flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
