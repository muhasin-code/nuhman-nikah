
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
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-emerald-950">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-emerald-950">
        <img 
          src={HERO_IMAGE} 
          alt="Wedding Backdrop" 
          className={`w-full h-full object-cover transition-all duration-[2000ms] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} animate-slow-pan`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-emerald-900/40 animate-pulse"></div>
        )}

        {/* Dynamic Overlays for Maximum Legibility */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-wedding-pattern opacity-[0.05] mix-blend-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center text-white px-4 max-w-5xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-4'}`}>
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-400/20 bg-black/20 backdrop-blur-md mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-200">The Wedding Invitation</span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-arabic mb-10 tracking-widest text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
        </div>
        
        <p className="text-xs md:text-sm font-medium mb-12 italic text-emerald-50/80 uppercase tracking-[0.5em] drop-shadow-lg">
          We Invite You To Celebrate The Marriage Of
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-16">
          <div className="text-center group">
            <h1 className="text-7xl md:text-9xl font-cursive text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105">
              {GROOM_NAME}
            </h1>
            <div className="h-[2px] w-16 bg-amber-400/40 mx-auto mt-6 mb-3 rounded-full"></div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-300 font-bold opacity-90 drop-shadow-md">
              {GROOM_PARENTS}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-amber-400/20 rounded-full animate-pulse"></div>
            <span className="relative text-5xl md:text-8xl font-cursive text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-float">&</span>
          </div>
          
          <div className="text-center group">
            <h1 className="text-7xl md:text-9xl font-cursive text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105">
              {BRIDE_NAME}
            </h1>
            <div className="h-[2px] w-16 bg-amber-400/40 mx-auto mt-6 mb-3 rounded-full"></div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-300 font-bold opacity-90 drop-shadow-md">
              {BRIDE_PARENTS}
            </p>
          </div>
        </div>

        <div className="relative inline-block group">
            <div className="absolute -inset-4 bg-amber-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative py-10 px-12 md:px-20 bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                {/* Ornate Gold Corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-400/60 rounded-tl-[2.5rem]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-400/60 rounded-tr-[2.5rem]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-400/60 rounded-bl-[2.5rem]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-400/60 rounded-br-[2.5rem]"></div>
                
                <p className="text-4xl md:text-6xl font-serif tracking-[0.15em] font-light text-white mb-2">{formattedDate}</p>
                <div className="w-16 h-px bg-amber-500/50 mx-auto my-4"></div>
                <p className="text-[10px] uppercase tracking-[0.6em] font-black text-amber-400 animate-pulse">Save Our Date</p>
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-float">
        <span className="text-[8px] uppercase tracking-[0.5em] text-white">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
        .animate-slow-pan {
          animation: slow-pan 30s ease-in-out infinite alternate;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
