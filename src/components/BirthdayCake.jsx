import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Beautiful vector/CSS illustrated pastel birthday cake with interactive candles.
 */
export const BirthdayCake = ({ isLit, onToggleCandles, candlesCount = 3 }) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4">
      {/* Candles Row */}
      <div 
        className="flex items-end justify-center gap-5 sm:gap-7 z-20 -mb-2 cursor-pointer group"
        onClick={onToggleCandles}
        title={isLit ? "Click to blow out the candles! 💨" : "Click to relight! 🕯️"}
        role="button"
        tabIndex={0}
        aria-label={isLit ? "Lit birthday candles. Click to blow out." : "Blown out candles. Click to relight."}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggleCandles()}
      >
        {Array.from({ length: candlesCount }).map((_, idx) => {
          const candleStyles = [
            { body: 'from-rose-300 via-rose-200 to-rose-300', stripe: 'border-rose-400' },
            { body: 'from-amber-200 via-yellow-100 to-amber-200', stripe: 'border-amber-300' },
            { body: 'from-purple-300 via-purple-200 to-purple-300', stripe: 'border-purple-400' },
            { body: 'from-emerald-200 via-teal-100 to-emerald-200', stripe: 'border-teal-300' },
          ][idx % 4];

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Candle Flame / Smoke */}
              <div className="h-9 flex items-end justify-center relative">
                {isLit ? (
                  <div className="relative group-hover:scale-110 transition-transform">
                    {/* Flame Glow */}
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-xs animate-pulse" />
                    {/* Flame Teardrop */}
                    <div 
                      className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 animate-flicker shadow-sm"
                      style={{
                        borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%',
                        animationDelay: `${idx * 0.25}s`
                      }}
                    />
                    {/* Inner White Hot Core */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2.5 rounded-full bg-white opacity-80" />
                  </div>
                ) : (
                  /* Rising Smoke Puff */
                  <div className="w-2.5 h-4 flex items-center justify-center animate-smoke pointer-events-none">
                    <span className="text-stone-400/70 text-xs">☁️</span>
                  </div>
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-stone-700 -mb-0.5" />

              {/* Candle Stick */}
              <div 
                className={`w-3.5 sm:w-4 h-12 rounded-t-sm bg-gradient-to-r ${candleStyles.body} shadow-sm relative overflow-hidden border-x border-stone-200/50`}
              >
                {/* Diagonal stripes */}
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,white_4px,white_7px)]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D Tiered Cake Illustration */}
      <div className="relative flex flex-col items-center z-10">
        
        {/* Tier 1 (Top Small Tier) */}
        <div className="relative w-36 sm:w-44 h-12 bg-gradient-to-b from-[#FFF5F6] to-[#FFE4E8] rounded-t-2xl border-2 border-rose-200 shadow-md flex items-center justify-around px-3">
          {/* Frosting Drips */}
          <div className="absolute -bottom-1 inset-x-0 flex justify-between px-2 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-4 h-2.5 bg-[#FFF5F6] rounded-b-full shadow-xs" />
            ))}
          </div>

          {/* Strawberry / Cherry Toppers */}
          <div className="absolute -top-2 inset-x-0 flex justify-around px-4 pointer-events-none">
            <span className="text-xs">🍓</span>
            <span className="text-xs">🌸</span>
            <span className="text-xs">🍓</span>
          </div>

          {/* Ribbon Decor */}
          <div className="w-full h-1 bg-rose-300/60 rounded-full" />
        </div>

        {/* Tier 2 (Middle Tier) */}
        <div className="relative w-48 sm:w-56 h-14 bg-gradient-to-b from-[#FFF9F2] to-[#FFECD9] rounded-t-2xl border-2 border-orange-200 shadow-md flex flex-col items-center justify-center px-4 -mt-1">
          {/* Frosting Scallops */}
          <div className="absolute top-0 inset-x-0 flex justify-between px-1.5 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-4 h-2 bg-white rounded-b-full shadow-xs" />
            ))}
          </div>

          <div className="flex items-center gap-3 text-stone-500 font-handwriting text-sm font-bold tracking-widest uppercase">
            <span>✨</span>
            <span className="text-rose-500">HAPPY BIRTHDAY</span>
            <span>✨</span>
          </div>
        </div>

        {/* Tier 3 (Base Large Tier) */}
        <div className="relative w-60 sm:w-72 h-16 bg-gradient-to-b from-[#FAF4FF] to-[#EFE3FA] rounded-t-3xl border-2 border-purple-200 shadow-lg flex flex-col items-center justify-center px-6 -mt-1">
          {/* Base Cream Swirls */}
          <div className="absolute top-0 inset-x-0 flex justify-between px-2 pointer-events-none">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="w-4 h-2 bg-white rounded-b-full shadow-xs" />
            ))}
          </div>

          {/* Sprinkles Decor */}
          <div className="flex items-center justify-around w-full opacity-60 text-xs">
            <span>⭐</span>
            <span>💖</span>
            <span>✨</span>
            <span>🌸</span>
            <span>⭐</span>
          </div>

          {/* Bottom Piping */}
          <div className="absolute bottom-1 inset-x-0 flex justify-around px-1 pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-3.5 h-2 bg-white rounded-t-full shadow-inner" />
            ))}
          </div>
        </div>

        {/* Ceramic Cake Plate / Stand */}
        <div className="w-68 sm:w-80 h-4 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-md border border-stone-300 -mt-1" />
        <div className="w-28 sm:w-36 h-3 bg-stone-300 rounded-b-xl shadow-inner -mt-0.5" />
      </div>
    </div>
  );
};
