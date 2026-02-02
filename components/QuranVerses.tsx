import React, { useState, useEffect } from 'react';
import { QURAN_VERSES } from '../constants';

const QuranVerses: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % QURAN_VERSES.length);
        setFade(true);
      }, 500);
    }, 8000); // Increased time slightly to allow reading both texts
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 text-center bg-white relative overflow-hidden reveal reveal-up">
      {/* Decorative Background Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg className="w-96 h-96 text-emerald-900" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto min-h-[300px] flex flex-col justify-center transition-all duration-500 relative z-10">
        <div className={`transition-all duration-700 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Arabic Text */}
          <h2 className="text-3xl md:text-5xl font-arabic text-emerald-900 mb-8 leading-relaxed dir-rtl">
            {QURAN_VERSES[currentIndex].arabic}
          </h2>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-20">
            <div className="h-px w-12 bg-amber-600"></div>
            <div className="w-1 h-1 rotate-45 bg-amber-600"></div>
            <div className="h-px w-12 bg-amber-600"></div>
          </div>

          {/* Translation */}
          <p className="text-xl md:text-2xl font-serif text-emerald-950/80 mb-6 italic leading-relaxed max-w-3xl mx-auto">
            "{QURAN_VERSES[currentIndex].text}"
          </p>
          
          {/* Reference */}
          <p className="text-amber-700 uppercase tracking-[0.3em] text-xs font-bold">
            — {QURAN_VERSES[currentIndex].ref}
          </p>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {QURAN_VERSES.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-emerald-100'}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default QuranVerses;