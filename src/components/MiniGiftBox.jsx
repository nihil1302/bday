import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Check, Ticket, X } from 'lucide-react';
import { WashiTape, fireBirthdayConfetti } from './ScrapbookDecorations';

export const MiniGiftBox = ({ giftData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      fireBirthdayConfetti(0.6);
    }
  };

  return (
    <div className="relative my-8 max-w-md mx-auto w-full select-none">
      {/* Decorative Washi Tape */}
      <WashiTape variant="teal" rotation="-3deg" width="w-24" className="-top-3 left-6 z-20" />

      {/* Main Container */}
      <div className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border-2 border-dashed border-rose-200/90 shadow-sm">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/60">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-rose-400" />
            <span>{giftData.tag || "BONUS SURPRISE"}</span>
          </div>
          <span className="text-[11px] font-handwriting text-stone-400 text-base">
            {isOpen ? "Secret unboxed!" : "A little something extra"}
          </span>
        </div>

        {/* Closed State: Cute 3D Gift Parcel */}
        {!isOpen ? (
          <div 
            id="secret-gift-box"
            onClick={handleToggle}
            className="group cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#FFF5F6] to-[#FFE8EB] border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"
            role="button"
            tabIndex={0}
            aria-label="Click to open the secret gift box"
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
          >
            {/* 3D Gift Box Graphic */}
            <div className="relative w-20 h-20 mb-3 group-hover:scale-110 transition-transform">
              {/* Ribbon Bow on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="w-5 h-5 rounded-full bg-rose-500 border-2 border-white shadow-xs -mr-1" />
                <div className="w-5 h-5 rounded-full bg-rose-500 border-2 border-white shadow-xs -ml-1" />
                <div className="absolute w-3 h-3 rounded-full bg-amber-300 border border-white" />
              </div>

              {/* Gift Box Lid */}
              <div className="w-20 h-6 bg-rose-400 rounded-t-md shadow-sm relative overflow-hidden flex items-center justify-center">
                <div className="w-3.5 h-full bg-rose-200" />
              </div>

              {/* Gift Box Body */}
              <div className="w-18 h-14 mx-auto bg-rose-300 rounded-b-md shadow-md relative overflow-hidden flex items-center justify-center border-t border-rose-400/30">
                {/* Vertical Ribbon */}
                <div className="w-3.5 h-full bg-rose-200" />
                {/* Horizontal Ribbon */}
                <div className="absolute inset-x-0 h-3 bg-rose-200" />
              </div>

              {/* Glow sparkles */}
              <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-2 animate-spin" />
            </div>

            <h4 className="font-serif font-bold text-lg text-stone-800 group-hover:text-rose-600 transition-colors">
              {giftData.heading || "A Secret Gift Box for You 🎁"}
            </h4>

            <p className="font-handwriting text-stone-500 text-lg mt-0.5">
              "{giftData.subtext || "Tap the ribbon to unwrap a little hidden bestie voucher"}"
            </p>

            <div className="mt-3 px-4 py-1.5 rounded-full bg-white text-rose-600 text-xs font-semibold shadow-xs border border-rose-200 group-hover:bg-rose-50 transition-colors flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>Tap to Open Gift</span>
            </div>
          </div>
        ) : (
          /* Opened State: Golden Voucher Ticket */
          <div className="relative p-5 sm:p-6 bg-gradient-to-br from-amber-50 via-[#FFFDF5] to-orange-50 rounded-2xl border-2 border-dashed border-amber-300 shadow-md animate-fadeIn">
            {/* Voucher Notch Accents */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#FAF7EE] rounded-full border-r border-amber-300" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#FAF7EE] rounded-full border-l border-amber-300" />

            {/* Voucher Header */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/80 mb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                <span className="font-serif font-bold text-lg text-stone-800">
                  {giftData.voucherTitle || "Golden Bestie Coupon 🎟️"}
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                {giftData.voucherTag || "100% REDEEMABLE"}
              </span>
            </div>

            {/* Voucher Content */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans mb-4">
              "{giftData.voucherContent}"
            </p>

            {/* Voucher Sign & Close button */}
            <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 text-xs">
              <span className="font-handwriting text-stone-500 text-base">
                {giftData.voucherSign}
              </span>

              <button
                onClick={handleToggle}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-stone-100 border border-amber-200 text-stone-600 font-semibold text-xs transition-colors shadow-2xs"
                title="Fold back into the box"
              >
                <span>{giftData.closeButtonText || "Fold Back Box 🎀"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
