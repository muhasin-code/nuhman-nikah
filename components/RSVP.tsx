
import React, { useState } from 'react';
import { BRIDE_NAME, GROOM_NAME, WHATSAPP_NUMBER, GOOGLE_SHEET_SCRIPT_URL } from '../constants';

const Wishes: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      timestamp: new Date().toLocaleString(),
      recipient: `${GROOM_NAME} & ${BRIDE_NAME}`
    };

    try {
      if (GOOGLE_SHEET_SCRIPT_URL) {
        // Send to Google Sheet via Apps Script
        await fetch(GOOGLE_SHEET_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        setSubmitted(true);
      } else {
        // Warning for developer/user during setup
        console.error("Missing GOOGLE_SHEET_SCRIPT_URL in constants.tsx. Follow the setup instructions!");
        setError("Setup Incomplete: Please add the Google Sheet Script URL in constants.tsx.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please check your internet or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const messageText = `*Wedding Wishes for ${GROOM_NAME} & ${BRIDE_NAME}*%0A%0A*From:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${messageText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="wishes" className="bg-emerald-950 py-24 px-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-wedding-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 reveal reveal-up">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Send Your Blessings</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-emerald-100/70 italic text-lg max-w-lg mx-auto">
            Your prayers and well-wishes are the most precious gifts we can receive.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl text-center border border-emerald-800 animate-fadeIn reveal reveal-scale active">
            <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#064e3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-amber-400 mb-2">Jazakallah Khairan!</h3>
            <p className="text-emerald-100 mb-8">Thank you for your beautiful message. It has been recorded in our digital guestbook!</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleWhatsAppRedirect}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold uppercase text-[10px] tracking-widest transition-all shadow-lg"
                >
                  Also Send via WhatsApp
                </button>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', message: '' });
                  }}
                  className="px-8 py-3 bg-emerald-900/50 hover:bg-emerald-900 border border-white/10 rounded-full text-emerald-300 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-all"
                >
                  Send Another Wish
                </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#064e3b]/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl reveal reveal-up delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-emerald-300 ml-1">Your Name</label>
                    <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-emerald-950/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 text-white placeholder:text-emerald-100/20 transition-all"
                    placeholder="E.g. Mohammed Ali"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-emerald-300 ml-1">Phone Number</label>
                    <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-emerald-950/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 text-white placeholder:text-emerald-100/20 transition-all"
                    placeholder="E.g. +91 98765 43210"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-emerald-300 ml-1">Your Wish / Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-emerald-950/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 text-white placeholder:text-emerald-100/20 resize-none transition-all"
                  placeholder={`Write your prayers for ${GROOM_NAME} & ${BRIDE_NAME}...`}
                ></textarea>
              </div>

              {error && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 text-[11px] text-center uppercase tracking-widest animate-pulse">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-[0.98] text-xs uppercase tracking-[0.4em] mt-4 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Recording...
                    </>
                ) : 'Send Blessings'}
              </button>
              
              <p className="text-center text-[9px] text-emerald-100/40 uppercase tracking-widest">
                Your wishes will be saved to our digital guestbook
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishes;
