
import React, { useState, useEffect } from 'react';
import { WEDDING_DATE } from '../constants';
import { CountdownTime } from '../types';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string; index: number }> = ({ value, label, index }) => {
    const max = label === 'Days' ? 365 : label === 'Hours' ? 24 : 60;
    const fillPercent = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div 
        className="flex flex-col items-center group flex-1 min-w-0" 
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="relative w-full aspect-[4/6] flex flex-col items-center justify-center overflow-hidden rounded-t-[1.8rem] sm:rounded-t-[5rem] rounded-b-md sm:rounded-b-2xl bg-white border border-amber-200/40 shadow-xl transition-all duration-700 group-hover:border-amber-500 group-hover:-translate-y-2">
          
          <div className="absolute inset-0 bg-wedding-pattern opacity-[0.03] pointer-events-none"></div>
          
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out opacity-50 group-hover:opacity-70"
            style={{ 
              height: `${fillPercent}%`,
              background: 'linear-gradient(to top, rgba(5, 46, 22, 0.3) 0%, rgba(217, 119, 6, 0.2) 70%, rgba(251, 191, 36, 0.4) 100%)'
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-amber-400/40 blur-[0.5px]"></div>
          </div>

          <div className="absolute inset-1 sm:inset-3 border border-amber-100/30 rounded-t-[1.6rem] sm:rounded-t-[4.5rem] rounded-b-sm sm:rounded-b-xl pointer-events-none overflow-hidden">
             <div className="absolute inset-0 opacity-20 animate-border-shimmer bg-gradient-to-tr from-transparent via-amber-400 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span 
              key={value}
              className="text-xl sm:text-4xl md:text-6xl font-serif text-emerald-950 font-black tracking-tighter animate-number-pop select-none"
            >
              {value.toString().padStart(2, '0')}
            </span>
            <div className="w-4 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-1 sm:my-3"></div>
          </div>

          <div className="absolute top-1 sm:top-4 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-80 transition-all duration-500">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500 sm:w-4 sm:h-4">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
            </svg>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-4 text-center">
          <span className="text-[7px] sm:text-[9px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.3em] text-emerald-900/50 font-black group-hover:text-amber-600 transition-colors">
            {label}
          </span>
          <div className="h-0.5 w-0 bg-amber-400 group-hover:w-full mx-auto transition-all duration-700 mt-1 rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#fdfbf7] relative overflow-hidden">
      <style>{`
        @keyframes number-pop {
          0% { transform: scale(1) translateY(0); filter: brightness(1); }
          50% { transform: scale(1.1) translateY(-3px); filter: brightness(1.2); color: #d97706; }
          100% { transform: scale(1) translateY(0); filter: brightness(1); }
        }
        @keyframes border-shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
        }
        .animate-number-pop { animation: number-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-border-shimmer { animation: border-shimmer 6s infinite ease-in-out; }
      `}</style>

      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-emerald-900/5 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px]"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-12 sm:mb-16">
            <h3 className="font-arabic text-3xl text-emerald-900 mb-4 opacity-70">بَارَكَ اللهُ لَكُمَا</h3>
            <span className="text-amber-600 font-cursive text-3xl sm:text-4xl block mb-6">Countdown to the Celebration</span>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-amber-200"></div>
              <div className="w-2 h-2 rotate-45 border border-amber-400"></div>
              <div className="h-[1px] w-12 bg-amber-200"></div>
            </div>
        </div>
        
        <div className="flex justify-center gap-2.5 sm:gap-6 md:gap-8 max-w-sm sm:max-w-4xl mx-auto px-2">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>

        <div className="mt-12 sm:mt-16">
          <p className="text-emerald-900/40 font-serif italic text-sm md:text-lg tracking-wide max-w-lg mx-auto leading-relaxed px-4">
            Counting down the moments until our souls unite in prayer and celebration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
