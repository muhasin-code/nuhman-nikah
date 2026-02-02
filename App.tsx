
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Venue from './components/Venue';
import RSVP from './components/RSVP';
import QuranVerses from './components/QuranVerses';
import SaveTheDate from './components/SaveTheDate';
import { BRIDE_NAME, BRIDE_PARENTS, GROOM_NAME, GROOM_PARENTS } from './constants';

const Footer: React.FC = () => (
  <footer className="py-20 bg-[#052e16] text-white text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h4 className="font-cursive text-5xl text-amber-400 mb-2">{GROOM_NAME} & {BRIDE_NAME}</h4>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-emerald-100/60 text-[10px] tracking-[0.3em] uppercase mb-10 font-bold">
        <span>{GROOM_PARENTS}</span>
        <span className="hidden sm:inline">|</span>
        <span>{BRIDE_PARENTS}</span>
      </div>
      <p className="text-emerald-100 text-sm tracking-[0.4em] uppercase mb-10">08 . 02 . 2026</p>
      <div className="flex justify-center items-center gap-4 mb-10">
        <div className="h-px w-16 bg-emerald-800"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
        <div className="h-px w-16 bg-emerald-800"></div>
      </div>
      <p className="text-emerald-200 text-sm italic font-light max-w-xs mx-auto">"And We created you in pairs." (78:8)</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 80);
      setShowScrollTop(scrollPos > 600);
    };
    window.addEventListener('scroll', handleScroll);

    const setupObserver = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
      return observer;
    };

    const observer = setupObserver();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    closeMenu();
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <a 
        href="#gallery" 
        onClick={(e) => scrollToSection(e, 'gallery')}
        className={`hover:text-amber-500 transition-colors relative group block px-2 ${mobile ? 'text-2xl font-serif py-4' : 'py-2'}`}
      >
        Gallery
        {!mobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>}
      </a>
      <a 
        href="#venue" 
        onClick={(e) => scrollToSection(e, 'venue')}
        className={`hover:text-amber-500 transition-colors relative group block px-2 ${mobile ? 'text-2xl font-serif py-4' : 'py-2'}`}
      >
        Venue
        {!mobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>}
      </a>
      <a 
        href="#wishes" 
        onClick={(e) => scrollToSection(e, 'wishes')}
        className={`hover:text-amber-500 transition-colors relative group block px-2 ${mobile ? 'text-2xl font-serif py-4' : 'py-2'}`}
      >
        Wishes
        {!mobile && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>}
      </a>
    </>
  );

  return (
    <div className="min-h-screen selection:bg-amber-100 selection:text-amber-900 relative bg-[#fdfbf7]">
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-cursive text-3xl md:text-4xl transition-colors duration-500 ${scrolled ? 'text-emerald-950' : 'text-white'}`}>
              Nuhman & Rizwana
            </span>
            <div className={`h-0.5 w-0 transition-all duration-700 ${scrolled ? 'w-full bg-amber-500' : 'w-0'}`}></div>
          </div>
          
          <div className={`hidden md:flex gap-8 lg:gap-12 text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${scrolled ? 'text-emerald-900' : 'text-white/90'}`}>
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#wishes" 
              onClick={(e) => scrollToSection(e, 'wishes')}
              className={`hidden sm:inline-block px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                scrolled 
                ? 'bg-emerald-900 text-white shadow-emerald-950/20 shadow-xl hover:bg-emerald-800' 
                : 'bg-white text-emerald-950 hover:bg-amber-400'
              }`}
            >
              Send Wishes
            </a>

            <button 
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-emerald-950' : 'text-white'}`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className={`fixed inset-0 bg-emerald-950 z-[101] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex flex-col h-full p-10">
            <div className="flex justify-end mb-20">
              <button onClick={toggleMenu} className="text-white p-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 text-white">
              <NavLinks mobile />
              <a 
                href="#wishes" 
                onClick={(e) => scrollToSection(e, 'wishes')}
                className="mt-8 px-12 py-4 bg-amber-500 text-white rounded-full font-black uppercase tracking-widest"
              >
                Send a Wish
              </a>
            </div>
            <div className="mt-auto text-center text-emerald-100/30 text-xs tracking-widest uppercase">
              February 08, 2026
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="reveal active">
          <Hero />
        </div>
        
        <div className="reveal reveal-up">
          <QuranVerses />
        </div>

        <div className="reveal reveal-scale">
          <SaveTheDate />
        </div>
        
        <div id="countdown" className="reveal reveal-up">
          <Countdown />
        </div>
        
        <div id="gallery" className="reveal reveal-up">
          <Gallery />
        </div>
        
        <div id="venue" className="reveal reveal-up">
          <Venue />
        </div>
        
        <div id="wishes" className="reveal reveal-up">
          <RSVP />
        </div>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[150] p-4 rounded-full bg-emerald-900 text-amber-400 shadow-2xl transition-all duration-500 transform hover:scale-110 hover:bg-emerald-800 focus:outline-none ${
          showScrollTop ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <Footer />
    </div>
  );
};

export default App;
