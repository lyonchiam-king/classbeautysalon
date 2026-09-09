import React, { useState, useEffect } from 'react';
import { SALON_INFO } from '../data/salonData';
import { BookingFormState, EnquiryResponse } from '../types';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  prefilledService = ''
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    name: '',
    phone: '',
    service: prefilledService || 'Eyebrow Threading',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<EnquiryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data: EnquiryResponse = await res.json();

      if (res.ok && data.success) {
        setSubmittedResponse(data);
      } else {
        setErrorMsg('Could not record booking. Please call us directly at +44 7440 391599');
      }
    } catch {
      setErrorMsg('Network error. Please call +44 7440 391599 or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-surface rounded-card max-w-lg w-full border border-muted/20 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted hover:text-text rounded-full focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submittedResponse ? (
          /* Success View */
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-serif text-2xl font-bold text-text">
              Booking Logged!
            </h3>

            <p className="text-sm text-muted max-w-sm mx-auto">
              Your request has been added directly to the Class Beauty Salon spreadsheet. The team on Burton Rd will contact you shortly.
            </p>

            <div className="bg-bg p-3.5 rounded-btn text-xs text-muted border border-muted/15 text-left font-mono space-y-1">
              <div>Ref: <strong className="text-text">{submittedResponse.enquiry?.id}</strong></div>
              <div>Logged: {new Date(submittedResponse.enquiry?.timestamp || '').toLocaleString()}</div>
              <div>Service: {submittedResponse.enquiry?.service}</div>
              <div>Spreadsheet Row #{submittedResponse.rowCount}</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="w-full bg-accent text-surface text-sm font-bold py-3 rounded-btn shadow hover:bg-accent-hover transition-all text-center"
              >
                Call Salon Now ({SALON_INFO.phone})
              </a>

              <button
                onClick={() => {
                  setSubmittedResponse(null);
                  onClose();
                }}
                className="w-full bg-bg text-text text-sm font-bold py-2.5 rounded-btn hover:bg-muted/10 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-accent bg-bg px-2.5 py-0.5 rounded-badge border border-muted/15 inline-block mb-1">
                Direct Salon Spreadsheet Logger
              </span>
              <h3 className="font-serif text-2xl font-bold text-text">
                Book / Enquire Online
              </h3>
              <p className="text-xs text-muted mt-1">
                Prefer instant answers? <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-accent font-bold underline">Call {SALON_INFO.phone}</a> or <a href={SALON_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">WhatsApp us</a> directly.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-btn border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-sm text-text focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-sm text-text focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text mb-1">
                  Requested Service *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eyebrow Threading, Layers Cut"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-sm text-text focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-text mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-xs text-text focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-text mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-xs text-text focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <option value="">Any time</option>
                    <option value="Morning (9:30 AM - 12 PM)">Morning (9:30 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                    <option value="Late Afternoon (3 PM - 6 PM)">Late Afternoon (3 PM - 6 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific requests or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-bg border border-muted/30 rounded-btn text-sm text-text focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>

              {/* Action Buttons: Submit & WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-accent text-surface hover:bg-accent-hover active:bg-accent-pressed font-bold text-sm py-3 rounded-btn shadow transition-all disabled:opacity-50"
                >
                  {loading ? 'Logging Request...' : 'Submit to Spreadsheet'}
                </button>

                {/* WhatsApp button right next to form */}
                <a
                  href={SALON_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-emerald-700 hover:bg-emerald-800 text-surface font-bold text-xs py-3 rounded-btn shadow transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  WhatsApp Chat
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
