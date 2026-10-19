import React from 'react';
import confetti from 'canvas-confetti';

/**
 * Decorative washi tape snippet that appears stuck to cards, photos, and headers.
 */
export const WashiTape = ({ 
  className = "", 
  variant = "pink", 
  rotation = "-2deg",
  width = "w-28",
  height = "h-7" 
}) => {
  const variantStyles = {
    pink: "bg-rose-200/60 border-y border-rose-300/40",
    yellow: "bg-amber-100/70 border-y border-amber-200/50",
    teal: "bg-emerald-100/60 border-y border-emerald-200/40",
    lavender: "bg-purple-100/60 border-y border-purple-200/40",
    peach: "bg-orange-100/70 border-y border-orange-200/40"
  };

  return (
    <div 
      className={`absolute pointer-events-none select-none z-20 backdrop-blur-[1px] shadow-sm ${variantStyles[variant] || variantStyles.pink} ${width} ${height} ${className}`}
      style={{ 
        transform: `rotate(${rotation})`,
        maskImage: 'repeating-linear-gradient(90deg, #000, #000 3px, transparent 3px, transparent 4px)',
        WebkitMaskImage: 'radial-gradient(circle at left, transparent 2px, black 3px), radial-gradient(circle at right, transparent 2px, black 3px)',
      }}
    />
  );
};

/**
 * Handmade postage stamp element with serrated scalloped border.
 */
export const PostageStamp = ({ label = "SPECIAL DELIVERY", date = "BIRTHDAY ED.", icon = "💌" }) => {
  return (
    <div className="relative inline-flex flex-col items-center justify-center p-3 bg-white border-2 border-dashed border-rose-300/70 rounded shadow-sm select-none transform rotate-3 hover:rotate-0 transition-transform">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase">{label}</span>
      <span className="text-[8px] tracking-widest text-stone-400 font-mono">{date}</span>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-400/20" />
    </div>
  );
};

/**
 * Cute floating sticker with optional tilt and glow.
 */
export const CuteSticker = ({ emoji, label, rotation = "0deg", className = "" }) => {
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-stone-200/80 text-stone-700 select-none hover:scale-105 transition-transform ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <span className="text-lg leading-none">{emoji}</span>
      {label && <span className="text-xs font-handwriting text-base font-bold text-stone-600">{label}</span>}
    </div>
  );
};

/**
 * Helper to trigger cute party confetti bursts
 */
export const fireBirthdayConfetti = (originY = 0.6) => {
  // Pastel and warm celebration colors
  const colors = ['#FFA8B5', '#CCAFF0', '#FED8BF', '#FEF08A', '#A7F3D0', '#F43F64'];

  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: originY },
    colors: colors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.1,
  });

  // Secondary delayed burst for fireworks effect
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: originY },
      colors: colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: originY },
      colors: colors,
    });
  }, 250);
};
