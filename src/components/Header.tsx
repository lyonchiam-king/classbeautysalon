import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  activeTab: 'home' | 'services';
  setActiveTab: (tab: 'home' | 'services') => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-bg shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('home')}
            className="text-left group focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1"
            aria-label="Class Beauty Salon Home"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-text block group-hover:text-accent-hover transition-colors">
              Class Beauty Salon
            </span>
            <span className="text-xs text-muted block flex items-center gap-1 font-medium">
              <svg className="w-3 h-3 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              12 Burton Rd, Withington
            </span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1 ${
              activeTab === 'home' ? 'text-accent border-b-2 border-accent' : 'text-text hover:text-accent-hover'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1 ${
              activeTab === 'services' ? 'text-accent border-b-2 border-accent' : 'text-text hover:text-accent-hover'
            }`}
          >
            Services & Prices
          </button>

          <button
            onClick={() => scrollToSection('reviews')}
            className="text-sm font-semibold text-text hover:text-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
          >
            Reviews
          </button>

          <button
            onClick={() => scrollToSection('hours-map')}
            className="text-sm font-semibold text-text hover:text-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1"
          >
            Map & Hours
          </button>
        </nav>

        {/* Contact Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-text hover:text-accent-hover px-2.5 py-1.5 rounded-btn border border-muted/30 hover:border-accent transition-all focus-visible:ring-2 focus-visible:ring-accent"
            title="Call Class Beauty Salon"
          >
            <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {SALON_INFO.phone}
          </a>

          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="bg-accent text-surface font-bold text-xs sm:text-sm px-3.5 py-2 rounded-btn shadow-sm hover:bg-accent-hover active:bg-accent-pressed transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent"
          >
            Call to Book
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text hover:text-accent focus-visible:ring-2 focus-visible:ring-accent rounded-btn"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-bg px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`w-full text-left py-2 px-3 rounded-btn font-semibold text-sm ${
              activeTab === 'home' ? 'bg-bg text-accent' : 'text-text'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`w-full text-left py-2 px-3 rounded-btn font-semibold text-sm ${
              activeTab === 'services' ? 'bg-bg text-accent' : 'text-text'
            }`}
          >
            Services & Prices
          </button>

          <button
            onClick={() => scrollToSection('reviews')}
            className="w-full text-left py-2 px-3 rounded-btn font-semibold text-sm text-text"
          >
            Customer Reviews
          </button>

          <button
            onClick={() => scrollToSection('hours-map')}
            className="w-full text-left py-2 px-3 rounded-btn font-semibold text-sm text-text"
          >
            Opening Hours & Map
          </button>

          <div className="pt-2 border-t border-bg flex flex-col gap-2">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="w-full text-center py-2.5 bg-accent text-surface font-bold text-sm rounded-btn shadow-sm"
            >
              Call {SALON_INFO.phone}
            </a>
            
            <a
              href={SALON_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 bg-emerald-600 text-surface font-bold text-xs rounded-btn flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
