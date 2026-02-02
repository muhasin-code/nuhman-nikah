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
        className="flex flex-col items-center group flex-1 min-w-[100px] sm:min-w-[140px]" 
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {/* Arch Container */}
        <div className="relative w-full aspect-[4/6] flex flex-col items-center justify-center overflow-hidden rounded-t-[5rem] rounded-b-2xl bg-white border-[1px] border-amber-200/50 shadow-2xl transition-all duration-500 group-hover:border-amber-500 group-hover:-translate-y-2">
          
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-wedding-pattern opacity-[0.03] pointer-events-none"></div>
          
          {/* Luxurious Gradient Fill */}
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out opacity-40 group-hover:opacity-60"
            style={{ 
              height: `${fillPercent}%`,
              background: 'linear-gradient(to top, rgba(5, 46, 22, 0.4) 0%, rgba(217, 119, 6, 0.2) 50%, transparent 100%)'
            }}
          ></div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
          </div>

          {/* Golden Arch Border Inner */}
          <div className="absolute inset-2 border border-amber-100/30 rounded-t-[4.5rem] rounded-b-xl pointer-events-none"></div>

          {/* The Number with update animation */}
          <div className="relative z-10 flex flex-col items-center">
            <span 
              key={value}
              className="text-4xl md:text-6xl font-serif text-emerald-950 font-black tracking-tighter animate-number-pop"
            >
              {value.toString().padStart(2, '0')}
            </span>
            <div className="w-8 h-[1px] bg-amber-400/40 my-2"></div>
          </div>

          {/* Decorative Top Element */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
              <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
            </svg>
          </div>
        </div>
        
        {/* Label */}
        <div className="mt-4 text-center">
          <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-emerald-900/60 font-bold group-hover:text-amber-600 transition-colors">
            {label}
          </span>
          <div className="h-0.5 w-0 bg-amber-400 group-hover:w-full mx-auto transition-all duration-500 mt-1 rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 bg-[#fdfbf7] relative overflow-hidden">
      <style>{`
        @keyframes number-pop {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.3); color: #d97706; }
          100% { transform: scale(1); filter: brightness(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .animate-shimmer {
          animation: shimmer 4s infinite ease-in-out;
        }
        .animate-number-pop {
          animation: number-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* Background Motifs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-16">
            <h3 className="font-arabic text-3xl text-emerald-900 mb-4 opacity-70">بَارَكَ اللهُ لَكُمَا</h3>
            <span className="text-amber-600 font-cursive text-4xl block mb-6">Countdown to the Celebration</span>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-amber-200"></div>
              <div className="w-2 h-2 rotate-45 border border-amber-400"></div>
              <div className="h-[1px] w-12 bg-amber-200"></div>
            </div>
        </div>
        
        {/* Counter Arches Grid */}
        <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
        </div>

        <div className="mt-16">
          <p className="text-emerald-900/40 font-serif italic text-base md:text-lg tracking-wide max-w-lg mx-auto leading-relaxed">
            Counting down the moments until we join together in faith and happiness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;