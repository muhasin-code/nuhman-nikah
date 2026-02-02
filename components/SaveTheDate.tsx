import React from 'react';
import { WEDDING_DATE } from '../constants';

const SaveTheDate: React.FC = () => {
  const day = WEDDING_DATE.toLocaleDateString('en-IN', { day: '2-digit' });
  const month = WEDDING_DATE.toLocaleDateString('en-IN', { month: 'long' });
  const year = WEDDING_DATE.toLocaleDateString('en-IN', { year: 'numeric' });
  const weekday = WEDDING_DATE.toLocaleDateString('en-IN', { weekday: 'long' });

  return (
    <section className="py-20 px-4 bg-[#fdfbf7] text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Ornate Top Separator */}
        <div className="flex items-center justify-center gap-4 mb-12 opacity-40 reveal reveal-scale">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-600"></div>
          <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
          </svg>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-600"></div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-cursive text-4xl text-amber-600 mb-2 reveal reveal-up delay-100">Save the Date</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <div className="text-right hidden md:block reveal reveal-left delay-200">
              <span className="block text-emerald-900 font-serif text-2xl uppercase tracking-widest">{weekday}</span>
              <span className="block text-amber-700 text-sm font-bold uppercase tracking-[0.3em]">Reception</span>
            </div>
            
            <div className="relative reveal reveal-scale delay-300">
              <span className="text-7xl md:text-9xl font-serif text-emerald-950 font-black opacity-10 absolute inset-0 -translate-y-4 select-none">2026</span>
              <div className="relative z-10">
                <span className="block text-5xl md:text-7xl font-serif text-emerald-950 border-y border-amber-200 py-4 px-8">
                  {day} <span className="text-amber-600">.</span> 02 <span className="text-amber-600">.</span> 26
                </span>
              </div>
            </div>

            <div className="text-left hidden md:block reveal reveal-right delay-200">
              <span className="block text-emerald-900 font-serif text-2xl uppercase tracking-widest">{month}</span>
              <span className="block text-amber-700 text-sm font-bold uppercase tracking-[0.3em]">5:00 PM onwards</span>
            </div>

            {/* Mobile View for Details */}
            <div className="md:hidden space-y-2 reveal reveal-up delay-200">
              <span className="block text-emerald-900 font-serif text-2xl uppercase tracking-widest">{weekday}, {month} {year}</span>
              <span className="block text-amber-700 text-sm font-bold uppercase tracking-[0.3em]">Reception at 5:00 PM</span>
            </div>
          </div>
        </div>

        {/* Ornate Bottom Separator */}
        <div className="flex items-center justify-center gap-4 mt-12 opacity-40 reveal reveal-scale delay-500">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-600"></div>
          <div className="w-2 h-2 rounded-full border border-amber-600"></div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-600"></div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;