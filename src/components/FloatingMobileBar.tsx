import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SALON_INFO } from '../data/salonData';

export const FloatingMobileBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Reveal floating bar once scrolled past 280px (after hero section)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-bg p-3 shadow-2xl md:hidden"
          id="floating-mobile-bar"
        >
          <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
            {/* Call Now Button */}
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="bg-accent hover:bg-accent-hover active:bg-accent-pressed text-surface font-bold text-sm py-3 px-3 rounded-btn shadow text-center flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent"
              id="mobile-bar-call-now"
            >
              <svg className="w-4 h-4 text-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Call Now</span>
            </a>

            {/* Get Directions Button */}
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg text-text hover:text-accent font-bold text-sm py-3 px-3 rounded-btn border border-muted/20 text-center flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent"
              id="mobile-bar-get-directions"
            >
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
