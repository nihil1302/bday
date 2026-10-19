import React, { useEffect, useCallback } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { WashiTape } from './ScrapbookDecorations';

export const NoteModal = ({ note, isOpen, onClose }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !note) return null;

  const accentStyles = {
    rose: {
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-700',
      tape: 'pink',
      glow: 'shadow-rose-100'
    },
    amber: {
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      tape: 'yellow',
      glow: 'shadow-amber-100'
    },
    purple: {
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-700',
      tape: 'lavender',
      glow: 'shadow-purple-100'
    }
  }[note.accent || 'rose'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-modal-title"
    >
      <div 
        className={`relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 ${accentStyles.border} ${accentStyles.glow} select-none transition-all`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: 'radial-gradient(#F5EDE0 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Washi tape accent on top */}
        <WashiTape 
          variant={accentStyles.tape} 
          width="w-28" 
          rotation="-2deg" 
          className="-top-3.5 left-1/2 -translate-x-1/2 z-20" 
        />

        {/* Header with tag and close button */}
        <div className="flex items-center justify-between border-b border-dashed border-stone-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">{note.emoji}</span>
            <span className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${accentStyles.badge}`}>
              {note.tag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-100 hover:bg-rose-100 hover:text-rose-600 text-stone-500 transition-colors"
            title="Close note (Esc)"
            aria-label="Close note"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note Title */}
        <h3 id="note-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 leading-tight mb-3">
          {note.title}
        </h3>

        {/* Note Message Content */}
        <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-inner">
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
            "{note.content}"
          </p>
        </div>

        {/* Footer with warm seal */}
        <div className="mt-5 pt-3 border-t border-dashed border-stone-200 flex items-center justify-between text-xs text-stone-400 font-handwriting text-lg">
          <span className="flex items-center gap-1 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            Sealed with love for elii
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold font-sans transition-colors"
          >
            Keep in heart ♡
          </button>
        </div>
      </div>
    </div>
  );
};
