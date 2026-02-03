
import React, { useState, useEffect } from 'react';
import { BRIDE_NAME, BRIDE_PARENTS, GROOM_NAME, GROOM_PARENTS, WEDDING_DATE, HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const formattedDate = WEDDING_DATE.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-emerald-950 py-12 md:py-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-emerald-950">
        <img 
          src={HERO_IMAGE} 
          alt="Wedding Backdrop" 
          className={`w-full h-full object-cover transition-all duration-[2000ms] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} animate-slow-pan`}
          onLoad={() => setIsLoaded(true)}
          crossOrigin="anonymous"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-emerald-900/40 animate-pulse"></div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-wedding-pattern opacity-[0.05] mix-blend-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center text-white px-4 max-w-5xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'}`}>
        <div className="mb-4 md:mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full border border-amber-400/20 bg-black/20 backdrop-blur-md mb-6 md:mb-8">
            <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-200">The Wedding Invitation</span>
            <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
          </div>
          
          <h2 className="text-xl md:text-6xl font-arabic mb-4 md:mb-10 tracking-[0.05em] md:tracking-widest text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] px-2">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
        </div>
        
        <p className="text-[9px] md:text-sm font-medium mb-6 md:mb-12 italic text-emerald-50/70 uppercase tracking-[0.2em] md:tracking-[0.5em]">
          We Invite You To Celebrate The Marriage Of
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-20 mb-10 md:mb-16">
          <div className="text-center group">
            <h1 className="text-5xl md:text-9xl font-cursive text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105 leading-tight">
              {GROOM_NAME}
            </h1>
            <div className="h-[1px] w-10 md:w-16 bg-amber-400/40 mx-auto mt-1 md:mt-6 mb-2 md:mb-3 rounded-full"></div>
            <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] text-amber-300 font-bold opacity-80">
              {GROOM_PARENTS}
            </p>
          </div>

          <div className="relative my-1 md:my-0">
            <div className="absolute inset-0 blur-2xl bg-amber-400/20 rounded-full animate-pulse"></div>
            <span className="relative text-3xl md:text-8xl font-cursive text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-float">&</span>
          </div>
          
          <div className="text-center group">
            <h1 className="text-5xl md:text-9xl font-cursive text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105 leading-tight">
              {BRIDE_NAME}
            </h1>
            <div className="h-[1px] w-10 md:w-16 bg-amber-400/40 mx-auto mt-1 md:mt-6 mb-2 md:mb-3 rounded-full"></div>
            <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] text-amber-300 font-bold opacity-80">
              {BRIDE_PARENTS}
            </p>
          </div>
        </div>

        <div className="relative inline-block group mt-4">
            <div className="absolute -inset-4 bg-amber-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative py-4 px-8 md:py-10 md:px-20 bg-black/40 backdrop-blur-xl rounded-[1.2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="absolute top-0 left-0 w-6 h-6 md:w-12 md:h-12 border-t border-l border-amber-400/60 rounded-tl-[1.2rem] md:rounded-tl-[2.5rem]"></div>
                <div className="absolute top-0 right-0 w-6 h-6 md:w-12 md:h-12 border-t border-r border-amber-400/60 rounded-tr-[1.2rem] md:rounded-tr-[2.5rem]"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 md:w-12 md:h-12 border-b border-l border-amber-400/60 rounded-bl-[1.2rem] md:rounded-bl-[2.5rem]"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 md:w-12 md:h-12 border-b border-r border-amber-400/60 rounded-br-[1.2rem] md:rounded-br-[2.5rem]"></div>
                
                <p className="text-xl md:text-6xl font-serif tracking-[0.1em] md:tracking-[0.15em] font-light text-white mb-1 md:mb-2">{formattedDate}</p>
                <div className="w-8 md:w-16 h-px bg-amber-500/50 mx-auto my-2 md:my-4"></div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-amber-400 animate-pulse">Save Our Date</p>
            </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-20 animate-float">
        <span className="text-[7px] uppercase tracking-[0.4em] text-white">Scroll</span>
        <div className="w-[0.5px] h-6 md:h-10 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
        .animate-slow-pan { animation: slow-pan 30s ease-in-out infinite alternate; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
