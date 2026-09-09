import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { REVIEWS, PROOF_POINTS } from '../data/salonData';

export const ReviewTicker: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 bg-bg border-b border-muted/10 overflow-hidden" id="reviews">
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-surface px-3 py-1 rounded-badge border border-muted/15 inline-block mb-2">
            Verified Burton Rd Feedback
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-2">
            Loved by Withington Locals
          </h2>
          <p className="text-muted text-xs sm:text-sm max-w-md mx-auto">
            Real customer quotes from Google Business Profile & local walk-ins.
          </p>
        </div>
      </div>

      {/* Proof Badges Grid */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROOF_POINTS.map((proof) => (
            <div
              key={proof}
              className="bg-surface p-2.5 rounded-card border border-muted/15 text-center flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold text-text">{proof}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Cards Carousel / Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="bg-surface p-5 rounded-card border border-muted/15 shadow-card flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-xs font-bold text-muted ml-1">{review.tag}</span>
                </div>

                <p className="text-text text-sm italic leading-relaxed mb-4">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-bg">
                <span className="font-bold text-text">{review.author}</span>
                <span>{review.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
