import React from 'react';
import { BADGE_HIGHLIGHTS } from '../data/salonData';

export const BadgeStrip: React.FC = () => {
  return (
    <section className="bg-surface border-b border-bg py-4 shadow-sm" id="badge-strip">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center">
          {BADGE_HIGHLIGHTS.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-badge bg-bg/80 border border-muted/15 text-text font-bold text-sm sm:text-base tracking-tight"
            >
              {badge.icon === 'smile' && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {badge.icon === 'sparkles' && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              )}
              {badge.icon === 'tag' && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5a1 1 0 01.707.293l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013 12V7a4 4 0 014-4z" />
                </svg>
              )}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
