
import React from 'react';
import { MAP_LINK, MAP_EMBED_URL, VENUE_ADDRESS, VENUE_NAME } from '../constants';

const Venue: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal reveal-up">
          <div className="font-arabic text-3xl md:text-4xl text-emerald-900 mb-6 opacity-80">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
            Location Details
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-6">The Wedding Venue</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Venue Details - 7 Columns - Sliding from Left */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50 relative overflow-hidden reveal reveal-left">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
              <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor" className="text-emerald-900">
                <path d="M0,0 Q50,0 50,50 Q0,50 0,100 Z" />
              </svg>
            </div>

            <div className="space-y-12 relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-emerald-900 text-amber-400 p-5 rounded-3xl shadow-xl shadow-emerald-900/20 shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-emerald-950 mb-3 leading-tight">{VENUE_NAME}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium text-lg">{VENUE_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-emerald-900 text-amber-400 p-5 rounded-3xl shadow-xl shadow-emerald-900/20 shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-serif text-emerald-950 mb-1">Event Timing</h4>
                  <p className="text-amber-700 font-bold uppercase tracking-widest text-sm">Reception: 5:00 PM Onwards</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-emerald-50 flex flex-col sm:flex-row items-center gap-8">
              {/* Maps QR */}
              <div className="group relative shrink-0">
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white p-3 rounded-2xl border border-emerald-50 shadow-sm">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(MAP_LINK)}`} 
                    alt="Map QR Code"
                    className="w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="text-[10px] text-center mt-3 font-bold text-gray-400 uppercase tracking-widest">Scan for location</p>
              </div>

              {/* CTA Button */}
              <div className="flex-1 w-full text-center sm:text-left">
                <a 
                  href={MAP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-4 bg-emerald-900 hover:bg-emerald-800 text-white font-black py-6 px-10 rounded-2xl transition-all shadow-2xl shadow-emerald-900/30 hover:-translate-y-1 active:scale-95 text-lg"
                >
                  <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Map Section - 5 Columns - Sliding from Right with delay */}
          <div className="lg:col-span-5 relative group min-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-8 border-white reveal reveal-right delay-300">
            {/* Interactive Badge */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-emerald-50 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900">Interactive Map</span>
                </div>
            </div>

            <iframe 
              src={MAP_EMBED_URL}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location Map"
              className="w-full h-full min-h-[500px] transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
