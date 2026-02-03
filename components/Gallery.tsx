
import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for editable captions
  const [captions, setCaptions] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    // Initialize captions from local storage or constants
    const savedCaptions = localStorage.getItem('wedding_gallery_captions');
    if (savedCaptions) {
      try {
        const parsed = JSON.parse(savedCaptions);
        // Ensure the array length matches or fallback
        if (Array.isArray(parsed) && parsed.length === GALLERY_IMAGES.length) {
          setCaptions(parsed);
        } else {
          setCaptions(GALLERY_IMAGES.map(img => img.alt));
        }
      } catch (e) {
        setCaptions(GALLERY_IMAGES.map(img => img.alt));
      }
    } else {
      setCaptions(GALLERY_IMAGES.map(img => img.alt));
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('carousel');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, [viewMode]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setEditingIndex(null); // Stop editing on slide change
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    setEditingIndex(null); // Stop editing on slide change
  };

  const startEditing = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setEditingIndex(index);
    setEditValue(captions[index]);
  };

  const saveCaption = () => {
    if (editingIndex === null) return;
    const newCaptions = [...captions];
    newCaptions[editingIndex] = editValue;
    setCaptions(newCaptions);
    localStorage.setItem('wedding_gallery_captions', JSON.stringify(newCaptions));
    setEditingIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveCaption();
    if (e.key === 'Escape') setEditingIndex(null);
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Our Memories
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-950 mb-8">Captured Moments</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-10"></div>
          
          {!isMobile && (
            <div className="inline-flex p-1 bg-emerald-50 rounded-full shadow-inner mb-8">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${viewMode === 'grid' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900/60 hover:text-emerald-900'}`}
              >
                Grid View
              </button>
              <button 
                onClick={() => setViewMode('carousel')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${viewMode === 'carousel' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900/60 hover:text-emerald-900'}`}
              >
                Carousel View
              </button>
            </div>
          )}
        </div>
        
        <div className={`transition-all duration-700 transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY_IMAGES.map((img, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 bg-gray-50 aspect-[4/5]"
                >
                  <img 
                    src={img.url} 
                    alt={captions[index] || img.alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x1000?text=Your+Photo+Here';
                    }}
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-8 h-px bg-amber-400 mb-2"></div>
                      
                      {editingIndex === index ? (
                        <div className="flex gap-2">
                          <input
                            autoFocus
                            className="bg-white/10 border-b border-amber-400 text-white font-serif text-sm italic w-full outline-none py-1"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={saveCaption}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group/caption">
                          <p className="text-white font-serif text-lg italic">{captions[index]}</p>
                          <button 
                            onClick={(e) => startEditing(e, index)}
                            className="text-amber-400 opacity-0 group-hover/caption:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative group max-w-4xl mx-auto">
              <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border-4 border-white bg-gray-100">
                {GALLERY_IMAGES.map((img, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      index === carouselIndex ? 'opacity-100 translate-x-0 scale-100' : 
                      index < carouselIndex ? 'opacity-0 -translate-x-full scale-95' : 'opacity-0 translate-x-full scale-95'
                    }`}
                  >
                    <img 
                      src={img.url} 
                      alt={captions[index] || img.alt} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1600x1000?text=Placeholder+Photo';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-emerald-950/90 to-transparent">
                      <div className="w-12 h-1 bg-amber-400 mb-4"></div>
                      
                      {editingIndex === index ? (
                        <div className="max-w-md">
                          <input
                            autoFocus
                            className="bg-white/10 border-b-2 border-amber-400 text-white font-serif text-xl md:text-3xl italic w-full outline-none py-1"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={saveCaption}
                          />
                          <p className="text-amber-400/60 text-[10px] mt-2 uppercase tracking-widest">Press Enter to save</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 group/caption">
                          <p className="text-white font-serif text-xl md:text-3xl italic leading-tight">
                            {captions[index]}
                          </p>
                          <button 
                            onClick={(e) => startEditing(e, index)}
                            className="text-amber-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full backdrop-blur-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 backdrop-blur-md text-emerald-950 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-400 hover:text-white transition-all transform active:scale-90 z-10"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/90 backdrop-blur-md text-emerald-950 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-400 hover:text-white transition-all transform active:scale-90 z-10"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
