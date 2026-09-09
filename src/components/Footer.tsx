import React from 'react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'services') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-text text-surface pt-12 pb-24 md:pb-12 border-t border-text">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-surface/15">
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-surface">
              Class Beauty Salon
            </h3>
            <p className="text-xs text-surface/80 leading-relaxed max-w-sm">
              Precise cuts, eyebrow threading, and hair styling in Withington, Manchester. Friendly staff, fair prices, and a relaxing atmosphere on Burton Rd.
            </p>
            <div className="text-xs text-accent font-medium">
              📍 12 Burton Rd, Withington, Manchester M20 3ED
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-serif text-sm font-bold text-surface uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-surface/80">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Services & Transparent Prices
                </button>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Verified Reviews
                </a>
              </li>
              <li>
                <a
                  href="#hours-map"
                  className="hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Map & Opening Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-surface uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-surface/80">
              <div>
                <span className="block text-surface/60">Phone Line:</span>
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="text-sm font-bold text-accent hover:underline focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {SALON_INFO.phone}
                </a>
              </div>
              <div>
                <span className="block text-surface/60">Mon - Sat:</span>
                <span className="font-semibold text-surface">9:30 AM - 6:00 PM</span>
              </div>
              <div>
                <span className="block text-surface/60">Sunday:</span>
                <span className="font-semibold text-surface">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-surface/60 gap-2">
          <p>© {new Date().getFullYear()} Class Beauty Salon, 12 Burton Rd, Withington. All rights reserved.</p>
          <p>Local beauty salon in Manchester, UK.</p>
        </div>
      </div>
    </footer>
  );
};
