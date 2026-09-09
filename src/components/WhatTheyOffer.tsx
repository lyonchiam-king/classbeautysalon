import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { WHAT_THEY_OFFER, SALON_INFO } from '../data/salonData';

interface WhatTheyOfferProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const WhatTheyOffer: React.FC<WhatTheyOfferProps> = ({ onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleCardClick = (service: ServiceItem) => {
    // Toggle expand state or open modal
    setSelectedService(service);
  };

  return (
    <section className="py-12 sm:py-16 bg-bg" id="what-they-offer">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-surface px-3 py-1 rounded-badge border border-accent/20 inline-block mb-2">
            Burton Rd Beauty Essentials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-3">
            What They Offer
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
            Honest pricing, precision technique, and a relaxing experience tailored to your style.
          </p>
        </motion.div>

        {/* 4 Cards Grid in exact requested order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHAT_THEY_OFFER.map((service, index) => {
            const isExpanded = expandedCardId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
                layoutId={`card-container-${service.id}`}
                className="bg-surface rounded-card border border-muted/15 shadow-card overflow-hidden flex flex-col justify-between hover:border-accent/40 transition-colors group cursor-pointer"
                onClick={() => handleCardClick(service)}
              >
                <div>
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] bg-bg overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-badge text-xs font-bold text-text shadow-sm border border-muted/10">
                      {service.price}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-bg text-muted text-[11px] font-bold px-2 py-0.5 rounded-badge border border-muted/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Service Name */}
                    <h3 className="font-serif text-lg font-bold text-text group-hover:text-accent transition-colors mb-1">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-muted text-xs sm:text-sm line-clamp-2 mb-3">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(service);
                    }}
                    className="w-full text-xs font-bold py-2 px-3 rounded-btn bg-bg text-text group-hover:bg-accent group-hover:text-surface transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`View price details for ${service.name}`}
                  >
                    <span>View Details & Price</span>
                    <svg className="w-4 h-4 text-accent group-hover:text-surface transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Showcase Modal with shared-element feel */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/60 backdrop-blur-sm">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-surface rounded-card max-w-lg w-full border border-muted/20 shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 z-10 p-2 bg-surface/80 hover:bg-surface text-text rounded-full shadow transition-all focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close details"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header Image */}
              <div className="relative aspect-[16/9] bg-bg overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-surface">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-accent bg-text/50 px-2 py-0.5 rounded-badge backdrop-blur-sm">
                      {selectedService.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-surface">
                      {selectedService.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-surface/80 block">Standard Rate</span>
                    <span className="text-lg sm:text-xl font-bold text-accent bg-text/80 px-2.5 py-0.5 rounded-badge backdrop-blur-sm">
                      {selectedService.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedService.tags.map((tag) => (
                    <span key={tag} className="bg-bg text-text text-xs font-bold px-2.5 py-1 rounded-badge border border-muted/15">
                      {tag}
                    </span>
                  ))}
                  <span className="bg-bg text-muted text-xs font-semibold px-2.5 py-1 rounded-badge border border-muted/15">
                    Est. {selectedService.duration}
                  </span>
                </div>

                <p className="text-text text-sm sm:text-base leading-relaxed">
                  {selectedService.fullDesc}
                </p>

                <div className="bg-bg p-3.5 rounded-card border border-muted/15 text-xs text-muted flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Friendly staff, fair prices, and precise results guaranteed at 12 Burton Rd.</span>
                </div>

                {/* Modal Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="flex-1 bg-accent text-surface text-center font-bold text-sm py-3 rounded-btn shadow hover:bg-accent-hover active:bg-accent-pressed transition-all focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Call to Book Now
                  </a>

                  <button
                    onClick={() => {
                      const name = selectedService.name;
                      setSelectedService(null);
                      onSelectServiceForBooking(name);
                    }}
                    className="flex-1 bg-bg text-text hover:text-accent text-center font-bold text-sm py-3 rounded-btn border border-muted/20 transition-all focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Pre-select for Enquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
