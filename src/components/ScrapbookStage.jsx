import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Maximize2,
  Bookmark,
  Pin
} from 'lucide-react';
import { WashiTape, CuteSticker } from './ScrapbookDecorations';
import { PhotoLightbox } from './PhotoLightbox';
import { FlowerDoodle, SparkleDoodle, HeartDoodle } from './DoodleDecorations';

export const ScrapbookStage = ({ data, onBack, onNext }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const memories = data.scrapbook.memories || [];
  const stickyNotes = data.scrapbook.stickyNotes || [];

  const handleOpenLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <div className="relative min-h-[90vh] px-4 py-8 max-w-5xl mx-auto select-none">
      {/* Decorative Floating Stickers & Doodles */}
      <div className="absolute top-4 left-2 sm:left-6 pointer-events-none opacity-80 animate-float-gentle hidden sm:block">
        <CuteSticker emoji="📸" label="Memories" rotation="-4deg" />
      </div>
      <div className="absolute top-8 right-3 sm:right-8 pointer-events-none opacity-80 animate-float-reverse hidden sm:block">
        <CuteSticker emoji="💫" label="Core Moments" rotation="6deg" />
      </div>

      {/* Header Section */}
      <header className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider font-mono uppercase mb-3 border border-rose-200">
          <Bookmark className="w-3.5 h-3.5 text-rose-500" />
          <span>{data.scrapbook.badge || "CHAPTER 02 • OUR MEMORIES"}</span>
        </div>

        <div className="relative inline-block px-4">
          <WashiTape 
            variant="pink" 
            width="w-36 sm:w-44" 
            rotation="-2deg" 
            className="-top-3 left-1/2 -translate-x-1/2 opacity-70" 
          />
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-800 tracking-tight leading-tight pt-1">
            {data.scrapbook.title || "Little Moments, Big Memories ♡"}
          </h1>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
          "{data.scrapbook.subtitle}"
        </p>

        <p className="text-xs text-stone-400 font-mono mt-2">
          ✨ Tap any photograph to view in full size & details ✨
        </p>
      </header>

      {/* Scrapbook Collage Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start my-6">
        {memories.map((photo, index) => {
          return (
            <div
              key={photo.id || index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative bg-white rounded-xl p-3 sm:p-4 shadow-polaroid border border-stone-200/90 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:z-30 hover:-translate-y-1.5 animate-fadeIn"
              style={{
                transform: `rotate(${photo.rotation || '0deg'})`,
                animationDelay: `${index * 120}ms`
              }}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.title}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenLightbox(index)}
            >
              {/* Corner Washi Tape Accent */}
              <WashiTape 
                variant={photo.tapeColor || (index % 2 === 0 ? "pink" : "yellow")} 
                rotation={index % 2 === 0 ? "-4deg" : "3deg"}
                width="w-24 sm:w-28" 
                height="h-6"
                className="-top-3 left-1/2 -translate-x-1/2" 
              />

              {/* Photo Image Container: Adapts naturally to photo dimensions */}
              <div className="relative overflow-hidden rounded-lg bg-stone-50 w-full min-h-[160px] flex items-center justify-center">
                <img 
                  src={photo.image} 
                  alt={photo.title}
                  loading="lazy"
                  onError={(e) => {
                    const src = photo.image;
                    if (src.endsWith('.jpg')) {
                      e.currentTarget.src = src.replace(/\.jpg$/, '.jpeg');
                    } else if (src.endsWith('.jpeg')) {
                      e.currentTarget.src = src.replace(/\.jpeg$/, '.jpg');
                    }
                  }}
                  className="w-full h-auto max-h-[460px] object-cover sm:object-contain rounded-lg group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Subtle Hover Overlay with Magnify Icon */}
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-2.5 rounded-full bg-white/90 text-stone-700 shadow-md">
                    <Maximize2 className="w-5 h-5 text-rose-500" />
                  </div>
                </div>

                {/* Scrapbook Tag Badge */}
                {photo.tag && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/60 backdrop-blur-sm text-white text-[10px] font-mono tracking-wider uppercase">
                    #{photo.tag}
                  </div>
                )}
              </div>

              {/* Scrapbook Sticker Corner Accent */}
              {photo.sticker && (
                <div className="absolute -bottom-2 -right-2 text-2xl filter drop-shadow-sm group-hover:rotate-12 transition-transform select-none">
                  {photo.sticker}
                </div>
              )}

              {/* Polaroid Caption Area */}
              <div className="pt-3 pb-1 text-center">
                <div className="flex items-center justify-between px-1 mb-1">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-800 group-hover:text-rose-600 transition-colors text-left line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.date && (
                    <span className="text-[10px] font-mono text-stone-400 shrink-0">
                      {photo.date}
                    </span>
                  )}
                </div>

                <p className="font-handwriting text-lg sm:text-xl text-stone-600 leading-snug text-left line-clamp-2 px-1">
                  "{photo.caption}"
                </p>
              </div>
            </div>
          );
        })}

        {/* Scattered Sticky Notes for True Scrapbook Feel */}
        {stickyNotes.map((note, noteIdx) => (
          <div
            key={note.id || noteIdx}
            className={`p-4 sm:p-5 rounded-2xl shadow-md border relative select-none transform transition-transform hover:rotate-0 hover:scale-105 duration-300 ${note.color || 'bg-amber-100 text-amber-900 border-amber-200'}`}
            style={{ transform: `rotate(${note.rotation || '-2deg'})` }}
          >
            {/* Pinned pushpin icon */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-400 border-2 border-white shadow-sm flex items-center justify-center text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
            </div>

            <div className="pt-2 text-center">
              <span className="text-xs uppercase font-mono tracking-wider font-bold opacity-60 block mb-1">
                BESTIE MEMO 📌
              </span>
              <p className="font-handwriting text-xl sm:text-2xl leading-snug font-semibold">
                {note.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Inside Jokes Strip */}
      {data.scrapbook.insideJokes && data.scrapbook.insideJokes.length > 0 && (
        <div className="my-10 p-5 sm:p-6 bg-[#FFFDF9] rounded-3xl border-2 border-dashed border-rose-200/90 shadow-sm relative">
          <WashiTape variant="teal" width="w-28" rotation="-3deg" className="-top-3 left-6" />
          <h4 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Our Classified Inside Jokes & Code Phrases:</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.scrapbook.insideJokes.map((joke, idx) => (
              <li 
                key={idx}
                className="bg-rose-50/70 p-3 rounded-xl border border-rose-100 text-stone-700 text-xs sm:text-sm font-handwriting text-lg leading-snug flex items-start gap-2"
              >
                <span className="text-rose-400 select-none">💬</span>
                <span>{joke}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Stage Navigation Controls */}
      <footer className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Back to Previous Stage */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Envelope</span>
        </button>

        {/* Continue to Next Stage */}
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-95"
        >
          <span>Continue to Heartfelt Letter ♡</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightbox
        photos={memories}
        currentIndex={selectedPhotoIndex || 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
};
