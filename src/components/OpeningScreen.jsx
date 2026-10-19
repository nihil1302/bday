import React, { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WashiTape, fireBirthdayConfetti } from './ScrapbookDecorations';
import { 
  FlowerDoodle, 
  DaisyDoodle, 
  SparkleDoodle, 
  HeartDoodle, 
  LeafDoodle 
} from './DoodleDecorations';

export const OpeningScreen = ({ data, onProceed }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const triggerLockRef = useRef(false);

  // Trigger opening sequence with accidental multi-click lock
  const handleOpenSurprise = () => {
    if (triggerLockRef.current || isOpening || isTransitioning) {
      return;
    }
    triggerLockRef.current = true;
    setIsOpening(true);

    // Check for reduced motion preference
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Trigger sweet confetti sprinkles
    fireBirthdayConfetti(0.52);

    if (prefersReducedMotion) {
      // Instant path for reduced motion users
      setIsTransitioning(true);
      setTimeout(() => {
        onProceed(2);
      }, 150);
    } else {
      // Polished animation sequence
      // 1. Flap opens and card slides up (0ms - 900ms)
      // 2. Smooth fade out towards stage 2 (1200ms - 1500ms)
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          onProceed(2);
        }, 450);
      }, 1300);
    }
  };

  return (
    <div 
      className={`relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden select-none transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft Pastel Ambient Glow Layers (Pink, Cream, Lavender, Peach) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 230, 235, 0.6) 0%, rgba(254, 240, 225, 0.45) 45%, rgba(246, 240, 252, 0.5) 85%, transparent 100%)'
        }}
      />

      {/* Floating Small Hearts, Sparkles, Flowers & Subtle Decorative Doodles */}
      <div className="absolute top-10 left-5 sm:left-14 pointer-events-none animate-float-gentle text-rose-300 opacity-80">
        <FlowerDoodle className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300 drop-shadow-sm" />
      </div>

      <div className="absolute top-14 right-6 sm:right-16 pointer-events-none animate-float-reverse opacity-85">
        <DaisyDoodle className="w-8 h-8 sm:w-9 sm:h-9 text-amber-200 drop-shadow-sm" />
      </div>

      <div className="absolute top-1/4 left-3 sm:left-24 pointer-events-none animate-pulse-subtle opacity-70">
        <SparkleDoodle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
      </div>

      <div className="absolute top-1/3 right-4 sm:right-28 pointer-events-none animate-float-gentle text-rose-300 opacity-70">
        <HeartDoodle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />
      </div>

      <div className="absolute bottom-20 left-6 sm:left-20 pointer-events-none animate-float-reverse opacity-75">
        <div className="flex items-center gap-1">
          <LeafDoodle className="w-5 h-5 text-emerald-200" />
          <HeartDoodle className="w-3.5 h-3.5 text-rose-200" />
        </div>
      </div>

      <div className="absolute bottom-16 right-6 sm:right-20 pointer-events-none animate-float-gentle opacity-80">
        <FlowerDoodle className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow-sm" />
      </div>

      {/* Header with Her Name in Elegant Typography */}
      <header className="relative text-center max-w-lg mx-auto mb-6 sm:mb-8 z-10">
        {/* Subtle top badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-stone-200/60 shadow-sm text-stone-600 text-xs sm:text-sm font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>{data.openingScreen.badgeText || "A Birthday Surprise ✨"}</span>
        </div>

        {/* Prominent Her Name Display */}
        <div className="relative inline-block px-4">
          <WashiTape 
            variant="pink" 
            width="w-28 sm:w-36" 
            rotation="-2deg" 
            className="-top-2 left-1/2 -translate-x-1/2 opacity-70" 
          />
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 tracking-tight leading-tight pt-1">
            Happy Birthday,{' '}
            <span className="text-rose-500 font-extrabold block sm:inline mt-0.5 sm:mt-0 underline decoration-rose-200 decoration-wavy decoration-1 underline-offset-8">
              {data.recipient.name}
            </span>
          </h1>
        </div>

        {/* Nickname & Gentle Subtext */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="font-handwriting text-stone-500 text-xl sm:text-2xl">
            {data.recipient.nickname}
          </span>
          <span className="text-rose-300 select-none">♡</span>
          <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">
            {data.recipient.birthDate}
          </span>
        </div>
      </header>

      {/* Centered Sealed Envelope Illustration */}
      <div className="relative my-3 sm:my-5 z-20 flex justify-center w-full">
        {/* Envelope Outer Wrapper with 3D Perspective */}
        <div 
          onClick={!isOpening ? handleOpenSurprise : undefined}
          className={`relative w-[300px] sm:w-[360px] h-[210px] sm:h-[230px] perspective-1000 ${
            !isOpening ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : 'cursor-default'
          }`}
          role="button"
          tabIndex={0}
          aria-label={isOpening ? "Envelope is opening" : "Click to unwrap birthday surprise envelope"}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isOpening) {
              e.preventDefault();
              handleOpenSurprise();
            }
          }}
        >
          {/* Subtle envelope tape decoration on top-left corner */}
          <WashiTape 
            variant="yellow" 
            rotation="-6deg" 
            width="w-20" 
            height="h-5" 
            className="-top-2.5 -left-2 z-40 opacity-80" 
          />

          {/* Envelope Body / Base Container */}
          <div className="relative w-full h-full bg-[#FAF4EA] rounded-2xl border-2 border-[#E9DFCE] shadow-envelope overflow-hidden">
            
            {/* Airmail / Stamp Header Details */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10 border-b border-dashed border-[#E3D6C1] pb-2">
              <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-mono tracking-wider uppercase">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
                <span>HANDMADE AIRMAIL</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200/70 text-[9px] font-bold text-rose-500 uppercase font-mono">
                {data.openingScreen.envelopeStampText || "FOR YOU"}
              </div>
            </div>

            {/* Letter Card (Tucked inside, slides smoothly up when opening) */}
            <div 
              className={`absolute left-4 right-4 bg-white rounded-xl p-4 shadow-sm border border-stone-200/90 transition-all duration-700 ease-out z-20 flex flex-col items-center text-center ${
                isOpening 
                  ? '-translate-y-20 sm:-translate-y-24 shadow-md' 
                  : 'translate-y-9'
              }`}
            >
              <div className="w-7 h-1 rounded-full bg-rose-200 mb-2"></div>
              <span className="font-handwriting text-rose-500 font-bold text-base sm:text-lg">
                To My Best Friend in the World ♡
              </span>
              <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 mt-0.5 max-w-[240px]">
                {data.openingScreen.envelopeCoverSubtitle || "Crafted with love, laughter, and cherished memories"}
              </p>
            </div>

            {/* Lower Envelope Fold (Triangle overlay creating pocket illusion) */}
            <div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 45%, 50% 75%, 0% 45%)',
                background: 'linear-gradient(to top, #F7F0E3 0%, #FAF5EB 100%)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
              }}
            />

            {/* Side Envelope Flaps (Craft paper depth) */}
            <div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                clipPath: 'polygon(0% 0%, 42% 62%, 0% 100%)',
                background: 'linear-gradient(to right, #F5ECE0, #FAF5EB)',
                opacity: 0.8
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                clipPath: 'polygon(100% 0%, 58% 62%, 100% 100%)',
                background: 'linear-gradient(to left, #F5ECE0, #FAF5EB)',
                opacity: 0.8
              }}
            />

            {/* Top Triangular Flap (Flips open smoothly in 3D) */}
            <div 
              className={`absolute top-0 left-0 right-0 h-[65%] flap-origin-top transition-transform duration-700 ease-in-out z-40 transform-style-3d ${
                isOpening ? '-rotate-x-180 z-10' : 'rotate-x-0'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 98%)',
                background: 'linear-gradient(to bottom, #FAF5EB 0%, #F5EDE0 100%)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Back side of flap when flipped */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 98%)',
                  background: '#F0E7D8'
                }}
              />
            </div>

            {/* Wax Seal on Flap Tip (Embossed heart, dissolves/fades as envelope opens) */}
            <div 
              className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 flex items-center justify-center ${
                isOpening ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
              }`}
            >
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-rose-400/40 blur-xs animate-pulse"></div>
                {/* Seal medallion */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 border-2 border-rose-300 shadow-md flex items-center justify-center text-white">
                  <span className="text-sm font-serif select-none drop-shadow">♡</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Button & Caption Section */}
      <div className="relative z-20 mt-6 sm:mt-7 flex flex-col items-center text-center">
        {/* Main "Open Your Surprise ♡" Button */}
        <button
          onClick={handleOpenSurprise}
          disabled={isOpening || isTransitioning}
          className={`group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-md ${
            isOpening 
              ? 'bg-rose-400 text-white cursor-default scale-95 shadow-rose-200'
              : 'bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-rose-200 hover:shadow-lg hover:shadow-rose-300/50 hover:-translate-y-0.5'
          }`}
          aria-label={data.openingScreen.buttonText || "Open Your Surprise ♡"}
        >
          {/* Animated Heart in Button */}
          <Heart 
            className={`w-5 h-5 text-rose-100 transition-transform ${
              isOpening ? 'animate-ping' : 'group-hover:scale-125 group-hover:rotate-12 fill-white/80'
            }`} 
          />
          
          <span className="tracking-wide">
            {isOpening 
              ? (data.openingScreen.openingMessage || "Unwrapping with love... ♡") 
              : (data.openingScreen.buttonText || "Open Your Surprise ♡")
            }
          </span>
          
          <Sparkles 
            className={`w-4 h-4 text-rose-200 transition-transform ${
              isOpening ? 'animate-spin' : 'group-hover:rotate-45'
            }`} 
          />
        </button>

        {/* Small Caption Below Button */}
        <p className="mt-3.5 text-stone-500 text-xs sm:text-sm font-handwriting text-lg sm:text-xl tracking-wide max-w-xs sm:max-w-sm">
          {data.openingScreen.caption || "Someone made something special just for you."}
        </p>
      </div>
    </div>
  );
};
