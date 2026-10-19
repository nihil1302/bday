import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  Flame, 
  RotateCcw,
  Star,
  PartyPopper
} from 'lucide-react';
import { BirthdayCake } from './BirthdayCake';
import { MiniGiftBox } from './MiniGiftBox';
import { WashiTape, fireBirthdayConfetti } from './ScrapbookDecorations';
import { FlowerDoodle, SparkleDoodle } from './DoodleDecorations';

export const InteractiveSurpriseStage = ({ data, onBack, onNext }) => {
  const surpriseData = data.interactiveSurprise;
  const [isLit, setIsLit] = useState(true);
  const [hasBlownCandles, setHasBlownCandles] = useState(false);

  // Toggle or blow out candles
  const handleMakeWish = () => {
    if (isLit) {
      setIsLit(false);
      setHasBlownCandles(true);

      // Check reduced motion
      const prefersReducedMotion = 
        typeof window !== 'undefined' && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Celebrate with confetti
      fireBirthdayConfetti(0.5);
    } else {
      // Relight candles
      setIsLit(true);
    }
  };

  const handleRelight = () => {
    setIsLit(true);
  };

  return (
    <div className="relative min-h-[90vh] px-4 py-8 max-w-4xl mx-auto select-none">
      {/* Decorative Doodles in Viewport Margins */}
      <div className="absolute top-10 left-3 sm:left-10 pointer-events-none opacity-60 animate-float-gentle hidden sm:block">
        <SparkleDoodle className="w-6 h-6 text-amber-300" />
      </div>
      <div className="absolute top-12 right-4 sm:right-12 pointer-events-none opacity-60 animate-float-reverse hidden sm:block">
        <FlowerDoodle className="w-7 h-7 text-rose-300" />
      </div>

      {/* Header Section */}
      <header className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider font-mono uppercase mb-3 border border-rose-200">
          <Cake className="w-3.5 h-3.5 text-rose-500" />
          <span>{surpriseData.badge || "CHAPTER 04 • MAKE A WISH"}</span>
        </div>

        <div className="relative inline-block px-4">
          <WashiTape 
            variant="yellow" 
            width="w-36 sm:w-44" 
            rotation="-2deg" 
            className="-top-3 left-1/2 -translate-x-1/2 opacity-70" 
          />
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-800 tracking-tight leading-tight pt-1">
            {surpriseData.headline || "Make a Birthday Wish, Elizaaa! 🎂"}
          </h1>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-3 max-w-lg mx-auto leading-relaxed">
          "{surpriseData.subtext}"
        </p>
      </header>

      {/* Main Cake Stage Card */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-scrapbook border-2 border-stone-200/90 text-center max-w-2xl mx-auto my-6">
        {/* Washi Tape Corner Pieces */}
        <WashiTape variant="pink" rotation="-4deg" width="w-24 sm:w-28" className="-top-3 -left-3 z-30" />
        <WashiTape variant="lavender" rotation="4deg" width="w-24 sm:w-28" className="-top-3 -right-3 z-30" />

        {/* The Illustrated Birthday Cake */}
        <div className="my-2">
          <BirthdayCake 
            isLit={isLit} 
            onToggleCandles={handleMakeWish} 
            candlesCount={3}
          />
        </div>

        {/* Action Button: "Make a Birthday Wish" */}
        <div className="mt-8 flex flex-col items-center">
          {isLit ? (
            <button
              onClick={handleMakeWish}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:brightness-105 active:scale-95 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all duration-300 animate-pulse-slow"
              aria-label="Blow out candles and make a birthday wish"
            >
              <Flame className="w-5 h-5 text-amber-200 group-hover:scale-125 transition-transform" />
              <span>{surpriseData.wishButtonText || "Make a Birthday Wish ♡"}</span>
              <Sparkles className="w-5 h-5 text-amber-100 group-hover:rotate-45 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col items-center animate-fadeIn w-full">
              {/* Revealed Wish Confirmation Card */}
              <div className="w-full bg-gradient-to-r from-rose-50 via-amber-50 to-purple-50 p-6 rounded-2xl border-2 border-rose-200/80 shadow-sm my-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-3 shadow-inner">
                  <Star className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 leading-tight">
                  {surpriseData.blownMessage || "I hope this year brings you all the happiness you deserve ♡"}
                </h3>

                <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-2 max-w-md mx-auto leading-snug">
                  "{surpriseData.blownSubMessage || "Your wish has been whispered to the stars! May every single dream of yours turn into reality, elii."}"
                </p>

                {/* Relight button to replay smoothly */}
                <div className="mt-4">
                  <button
                    onClick={handleRelight}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 text-xs font-semibold shadow-xs transition-colors"
                    title="Relight candles to make another wish"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>{surpriseData.relightButtonText || "Relight the Candles 🕯️"}</span>
                  </button>
                </div>
              </div>

              {/* Next Step Primary Button: "There's One Last Thing..." */}
              <div className="mt-6">
                <button
                  onClick={onNext}
                  className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:brightness-105 active:scale-95 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-300 transition-all duration-300 animate-pulse"
                >
                  <PartyPopper className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                  <span>{surpriseData.nextStageButtonText || "There's One Last Thing..."}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-stone-400 font-handwriting text-lg mt-3">
            {isLit ? "Click the button or tap the candles to blow them out!" : "Candles blown out! Tap above to proceed to the celebration ➔"}
          </p>
        </div>
      </div>

      {/* Optional Mini-Interaction: Secret Gift Box */}
      {surpriseData.giftBox && (
        <section aria-label="Secret Mini Gift Box Interaction">
          <MiniGiftBox giftData={surpriseData.giftBox} />
        </section>
      )}

      {/* Bottom Stage Navigation Controls */}
      <footer className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Back to Heartfelt Letter Stage */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Letter</span>
        </button>

        {/* Continue to Final Celebration Stage */}
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-95"
        >
          <span>Final Celebration 🥂</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>
    </div>
  );
};
