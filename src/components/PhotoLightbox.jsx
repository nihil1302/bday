import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { WashiTape } from './ScrapbookDecorations';

export const PhotoLightbox = ({ 
  photos, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev 
}) => {
  const currentPhoto = photos[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch swipe handling for mobile
  let touchStartX = 0;
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) onNext(); // swiped left -> next
    if (diff < -50) onPrev(); // swiped right -> prev
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      {/* Lightbox Container - Click inside doesn't close */}
      <div 
        className="relative max-w-xl w-full bg-[#FAF6EE] rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-stone-200 select-none flex flex-col items-center max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Washi Tape */}
        <WashiTape variant={currentPhoto.tapeColor || "pink"} rotation="-1deg" width="w-32" className="-top-3 left-1/2 -translate-x-1/2 z-20" />

        {/* Header with counter and close button */}
        <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-dashed border-stone-300">
          <div className="flex items-center gap-2">
            <span id="lightbox-counter" className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
              {currentIndex + 1} of {photos.length}
            </span>
            {currentPhoto.tag && (
              <span className="text-xs font-medium text-stone-500 font-mono hidden sm:inline">
                #{currentPhoto.tag}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-200/80 hover:bg-rose-100 hover:text-rose-600 text-stone-600 transition-colors"
            title="Close lightbox (Esc)"
            aria-label="Close photo view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Polaroid Picture Frame */}
        <div className="relative w-full bg-white p-3 sm:p-4 rounded-xl shadow-md border border-stone-200/80 my-2">
          <div className="relative overflow-hidden rounded-lg bg-stone-50 max-h-[65vh] flex items-center justify-center p-1">
            <img 
              src={currentPhoto.image} 
              alt={currentPhoto.title}
              onError={(e) => {
                const src = currentPhoto.image;
                if (src.endsWith('.jpg')) {
                  e.currentTarget.src = src.replace(/\.jpg$/, '.jpeg');
                } else if (src.endsWith('.jpeg')) {
                  e.currentTarget.src = src.replace(/\.jpeg$/, '.jpg');
                }
              }}
              className="w-auto h-auto max-h-[62vh] max-w-full object-contain rounded-md"
              loading="eager"
            />
          </div>

          {/* Sticker on Polaroid corner */}
          {currentPhoto.sticker && (
            <div className="absolute top-2 right-2 text-2xl drop-shadow-sm pointer-events-none">
              {currentPhoto.sticker}
            </div>
          )}

          {/* Caption underneath the photo in handwriting */}
          <div className="pt-4 pb-1 text-center">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-800">
              {currentPhoto.title}
            </h3>

            {currentPhoto.date && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400 font-mono mt-1">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{currentPhoto.date}</span>
              </div>
            )}

            <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-2 leading-snug px-2">
              "{currentPhoto.caption}"
            </p>
          </div>
        </div>

        {/* Previous and Next Navigation Arrows */}
        <div className="w-full flex items-center justify-between pt-2">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-600 text-sm font-semibold transition-all shadow-sm active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-xs text-stone-400 font-handwriting text-base">
            Use arrow keys or swipe to navigate
          </span>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-600 text-sm font-semibold transition-all shadow-sm active:scale-95"
            aria-label="Next photo"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
