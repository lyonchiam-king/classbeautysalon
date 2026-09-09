import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ServiceItem } from '../types';
import { ALL_SERVICES, SALON_INFO } from '../data/salonData';

interface InteractiveServiceFilterProps {
  onProceedToBookingWithSelection: (selectedNames: string[], totalPrice: number) => void;
}

export const InteractiveServiceFilter: React.FC<InteractiveServiceFilterProps> = ({
  onProceedToBookingWithSelection
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hair' | 'Brows'>('All');
  const [expandedServiceIds, setExpandedServiceIds] = useState<Set<string>>(new Set(['eyebrow-threading']));
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const filteredServices = ALL_SERVICES.filter(service => {
    if (activeCategory === 'All') return true;
    return service.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedServiceIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectService = (service: ServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedServices(prev => {
      const exists = prev.some(item => item.id === service.id);
      if (exists) {
        return prev.filter(item => item.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const isSelected = (id: string) => selectedServices.some(item => item.id === id);

  const totalPrice = selectedServices.reduce((sum, item) => sum + item.priceNumeric, 0);

  return (
    <section className="py-12 sm:py-16 bg-surface border-t border-b border-bg relative" id="services-prices">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-bg px-3 py-1 rounded-badge border border-muted/15 inline-block mb-2">
            Interactive Price List & Selection
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2">
            Services & Transparent Pricing
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto">
            Tap any service to reveal exact prices and duration. Select your items to calculate total and book directly.
          </p>
        </div>

        {/* Filter Tabs - Thumb Friendly */}
        <div className="flex justify-center mb-8">
          <div className="bg-bg p-1.5 rounded-badge border border-muted/20 flex gap-1 shadow-inner max-w-md w-full sm:w-auto">
            {(['All', 'Hair', 'Brows'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 sm:flex-initial sm:px-6 py-2.5 rounded-badge text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                  activeCategory === cat
                    ? 'bg-accent text-surface shadow-sm'
                    : 'text-muted hover:text-text hover:bg-surface/50'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat === 'All' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Cards List */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredServices.map(service => {
            const isExpanded = expandedServiceIds.has(service.id);
            const itemSelected = isSelected(service.id);

            return (
              <div
                key={service.id}
                className={`bg-bg rounded-card border transition-all duration-200 overflow-hidden ${
                  itemSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent'
                    : isExpanded
                    ? 'border-accent/40 shadow-sm'
                    : 'border-muted/15 hover:border-muted/30'
                }`}
              >
                {/* Expandable Card Header */}
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none gap-3"
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(service.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Select Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => toggleSelectService(service, e)}
                      className={`w-6 h-6 rounded-btn shrink-0 border flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                        itemSelected
                          ? 'bg-accent border-accent text-surface'
                          : 'border-muted/30 hover:border-accent bg-surface'
                      }`}
                      aria-label={`Select ${service.name}`}
                    >
                      {itemSelected && (
                        <svg className="w-4 h-4 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {/* Service Name & Badges */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-text truncate">
                          {service.name}
                        </h3>
                        <span className="text-[10px] uppercase font-bold text-muted bg-surface px-2 py-0.5 rounded-badge border border-muted/10">
                          {service.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {service.tags.map(tag => (
                          <span key={tag} className="text-[11px] text-muted font-medium">
                            • {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Expand Indicator */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-base sm:text-lg text-text bg-surface px-3 py-1 rounded-badge border border-muted/15 shadow-2xs">
                      {service.price}
                    </span>
                    <button
                      type="button"
                      className="p-1 text-muted hover:text-accent transition-colors"
                      aria-label="Toggle details"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-accent' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeInOut' }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-muted/10 bg-surface/60"
                    >
                      <div className="pt-3 space-y-3">
                        <p className="text-xs sm:text-sm text-text leading-relaxed">
                          {service.fullDesc}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                          <span className="text-muted font-medium flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Estimated duration: <strong className="text-text">{service.duration}</strong>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => toggleSelectService(service, e)}
                            className={`px-3 py-1.5 rounded-btn font-bold text-xs transition-all ${
                              itemSelected
                                ? 'bg-accent/20 text-accent-pressed hover:bg-accent/30'
                                : 'bg-accent text-surface hover:bg-accent-hover'
                            }`}
                          >
                            {itemSelected ? '✓ Added to Selection' : '+ Add to Selection'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Selected Services Sticky / Floating Drawer summary */}
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky bottom-20 z-30 mt-8 bg-text text-surface p-4 sm:p-5 rounded-card shadow-xl border border-accent/30 max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-accent text-surface text-xs font-bold px-2 py-0.5 rounded-badge">
                    {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected
                  </span>
                  <span className="font-bold text-lg text-accent">
                    Est. £{totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-surface/80 mt-1 line-clamp-1">
                  {selectedServices.map(s => s.name).join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="flex-1 sm:flex-none bg-accent text-surface hover:bg-accent-hover font-bold text-xs sm:text-sm px-4 py-2.5 rounded-btn shadow transition-all text-center"
                >
                  Call to Book (£{totalPrice.toFixed(2)})
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const names = selectedServices.map(s => s.name);
                    onProceedToBookingWithSelection(names, totalPrice);
                  }}
                  className="flex-1 sm:flex-none bg-surface/20 text-surface hover:bg-surface/30 font-bold text-xs sm:text-sm px-3 py-2.5 rounded-btn border border-surface/30 transition-all text-center"
                >
                  Enquire Online
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
