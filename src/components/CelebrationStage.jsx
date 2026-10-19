import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, 
  Sparkles, 
  Heart, 
  RotateCcw, 
  ArrowLeft, 
  Calendar, 
  Smile, 
  Star,
  X,
  Gift
} from 'lucide-react';
import { WashiTape, fireBirthdayConfetti } from './ScrapbookDecorations';
import { FlowerDoodle, SparkleDoodle, HeartDoodle } from './DoodleDecorations';

export const CelebrationStage = ({ data, onBack, onReplay }) => {
  const celebration = data.celebration;
  const [isHugOpen, setIsHugOpen] = useState(false);

  // Trigger celebratory confetti on initial entrance
  useEffect(() => {
    fireBirthdayConfetti(0.35);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenHug = () => {
    setIsHugOpen(true);
    fireBirthdayConfetti(0.5);
  };

  const handleCloseHug = () => {
    setIsHugOpen(false);
  };

  const handleReplayClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onReplay();
  };

  return (
    <div className="relative min-h-[90vh] px-4 py-8 max-w-4xl mx-auto select-none">
      {/* Decorative Floating Sparkles & Hearts in Viewport Margins */}
      <div className="absolute top-10 left-3 sm:left-10 pointer-events-none opacity-70 animate-float-gentle hidden sm:block">
        <SparkleDoodle className="w-6 h-6 text-amber-300" />
      </div>
      <div className="absolute top-12 right-4 sm:right-12 pointer-events-none opacity-70 animate-float-reverse hidden sm:block">
        <FlowerDoodle className="w-7 h-7 text-rose-300" />
      </div>
      <div className="absolute top-1/2 left-4 pointer-events-none opacity-60 animate-petal-drift hidden sm:block">
        <HeartDoodle className="w-5 h-5 text-rose-400" />
      </div>
      <div className="absolute bottom-28 right-6 pointer-events-none opacity-60 animate-petal-drift hidden sm:block" style={{ animationDelay: '3s' }}>
        <FlowerDoodle className="w-6 h-6 text-purple-300" />
      </div>

      {/* Header Section */}
      <header className="text-center mb-10 relative z-10 animate-fadeIn">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider font-mono uppercase mb-3 border border-rose-200">
          <PartyPopper className="w-3.5 h-3.5 text-rose-500" />
          <span>{celebration.badge || "CHAPTER 05 • THE GRAND FINALE"}</span>
        </div>

        <div className="relative inline-block px-4">
          <WashiTape 
            variant="pink" 
            width="w-36 sm:w-48" 
            rotation="-2deg" 
            className="-top-3 left-1/2 -translate-x-1/2 opacity-70" 
          />
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-800 tracking-tight leading-tight pt-1">
            {celebration.headline || "Happy Birthday, Elizaaa! 🥂✨"}
          </h1>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-3 max-w-xl mx-auto leading-relaxed">
          "{celebration.subheadline}"
        </p>
      </header>

      {/* Favourite Photo in an Elegant Polaroid Frame */}
      {celebration.favouritePhoto && (
        <div className="relative max-w-lg mx-auto my-8 animate-fadeIn">
          {/* Top Washi Tape */}
          <WashiTape 
            variant="yellow" 
            rotation="-3deg" 
            width="w-32" 
            className="-top-3 left-1/2 -translate-x-1/2 z-20" 
          />

          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-polaroid border-2 border-stone-200/90 hover:shadow-2xl transition-all duration-300">
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-2xl bg-stone-50 w-full min-h-[220px] max-h-[500px] flex items-center justify-center border border-stone-100">
              <img 
                src={celebration.favouritePhoto.image} 
                alt={celebration.favouritePhoto.title}
                onError={(e) => {
                  const src = celebration.favouritePhoto.image;
                  if (src.endsWith('.jpeg')) e.currentTarget.src = src.replace(/\.jpeg$/, '.jpg');
                  else if (src.endsWith('.jpg')) e.currentTarget.src = src.replace(/\.jpg$/, '.jpeg');
                  else e.currentTarget.src = '/images/memory-8.jpeg';
                }}
                className="w-full h-auto max-h-[480px] object-cover sm:object-contain rounded-xl"
                loading="eager"
              />

              {/* Tag Badge */}
              {celebration.favouritePhoto.tag && (
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/60 backdrop-blur-sm text-white text-[10px] font-mono tracking-wider uppercase">
                  #{celebration.favouritePhoto.tag}
                </div>
              )}
            </div>

            {/* Photo Caption */}
            <div className="pt-4 pb-1 text-center">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-800">
                {celebration.favouritePhoto.title}
              </h3>

              {celebration.favouritePhoto.date && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400 font-mono mt-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  <span>{celebration.favouritePhoto.date}</span>
                </div>
              )}

              <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-2 leading-snug px-2">
                "{celebration.favouritePhoto.caption}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Large Heartfelt Birthday Message Card */}
      <article className="relative bg-[#FAF6EE] rounded-3xl p-6 sm:p-12 shadow-scrapbook border-2 border-[#EBDDCB] my-10 max-w-2xl sm:max-w-3xl mx-auto animate-fadeIn">
        {/* Corner Washi Tapes */}
        <WashiTape variant="teal" rotation="-4deg" width="w-24 sm:w-28" className="-top-3 -left-3 z-20" />
        <WashiTape variant="pink" rotation="4deg" width="w-24 sm:w-28" className="-top-3 -right-3 z-20" />

        {/* Message Header */}
        <div className="border-b-2 border-dashed border-[#E3D6C1] pb-4 mb-6 flex items-center justify-between">
          <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 tracking-wide">
            {celebration.messageTitle || "To My Partner in Crime & Dearest Bestie,"}
          </h2>
          <span className="text-xl">🥂✨</span>
        </div>

        {/* Message Paragraphs */}
        <div className="space-y-4 sm:space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
          {celebration.messageParagraphs && celebration.messageParagraphs.map((para, idx) => (
            <p key={idx} className="text-justify sm:text-left">
              {para}
            </p>
          ))}
        </div>

        {/* Closing Signature */}
        <div className="mt-8 pt-6 border-t border-dashed border-[#E3D6C1] flex flex-col items-end text-right">
          <p className="font-serif italic text-sm text-stone-500 mb-1">
            Always & forever in your corner,
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 tracking-wider">
            {data.sender.name} 💖
          </p>
        </div>
      </article>

      {/* Final Keepsake Card: "Made with love, just for you ♡" */}
      <section className="relative bg-white/90 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-stone-200/90 text-center max-w-xl mx-auto my-8 select-none">
        <WashiTape variant="yellow" rotation="-2deg" width="w-28" className="-top-3 left-1/2 -translate-x-1/2 z-20" />

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-2 shadow-inner">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800">
          {celebration.closingCard?.title || "Made with love, just for you ♡"}
        </h3>

        <p className="font-handwriting text-xl text-stone-600 mt-1 max-w-md mx-auto">
          "{celebration.closingCard?.subtext || "A digital keepsake crafted for the most wonderful friend in the universe."}"
        </p>

        <p className="text-xs text-stone-400 font-mono mt-3 uppercase tracking-wider">
          {celebration.closingCard?.craftedNote || "Designed with cherished memories & infinite appreciation."}
        </p>

        {/* Final Hug Interaction Button */}
        <div className="mt-6 pt-5 border-t border-dashed border-stone-200 flex flex-col items-center">
          <button
            onClick={handleOpenHug}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold text-sm sm:text-base transition-all duration-300 shadow-sm active:scale-95"
            aria-label="One last hug?"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">🤗</span>
            <span>{celebration.hugInteraction?.buttonLabel || "One last hug? 🤗"}</span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </button>
          <span className="text-[11px] text-stone-400 font-handwriting text-base mt-1">
            Tap for a virtual bear hug
          </span>
        </div>
      </section>

      {/* Experience Replay & Navigation Controls */}
      <footer className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Back to Cake & Make a Wish */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Make a Wish</span>
        </button>

        {/* Replay Entire Surprise */}
        <button
          onClick={handleReplayClick}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-95 animate-pulse-slow"
          title="Start the surprise experience again from Stage 1"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
          <span>{celebration.replayButtonText || "Replay Experience From Beginning 🔄"}</span>
        </button>
      </footer>

      {/* "One Last Hug" Modal Popup */}
      {isHugOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseHug}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hug-modal-title"
        >
          <div 
            className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200 text-center select-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'radial-gradient(#F5EDE0 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          >
            <WashiTape variant="pink" width="w-28" rotation="-2deg" className="-top-3 left-1/2 -translate-x-1/2 z-20" />

            {/* Close Button */}
            <button
              onClick={handleCloseHug}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-rose-100 hover:text-rose-600 text-stone-500 transition-colors"
              title="Close modal"
              aria-label="Close hug modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hug Illustration */}
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
              🫂
            </div>

            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase tracking-wider block w-fit mx-auto mb-2">
              {celebration.hugInteraction?.modalTag || "UNLIMITED HUGS ENCLOSED"}
            </span>

            <h3 id="hug-modal-title" className="font-serif text-2xl font-bold text-stone-800 leading-tight mb-2">
              {celebration.hugInteraction?.modalTitle || "A Warm Bear Hug Just For You! 🫂💖"}
            </h3>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-sans my-4 bg-white/80 p-4 rounded-2xl border border-stone-200/70 shadow-xs">
              "{celebration.hugInteraction?.message || "Wrapping you in the biggest, warmest, and tightest bestie hug across any distance! Thank you for being you. Happy Birthday, my dearest elii! ✨"}"
            </p>

            <button
              onClick={handleCloseHug}
              className="mt-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-all shadow-md shadow-rose-200 active:scale-95"
            >
              {celebration.hugInteraction?.closeLabel || "Hug Received ♡"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
