import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  MailOpen, 
  FastForward, 
  RotateCcw,
  BookHeart,
  Feather
} from 'lucide-react';
import { WashiTape, fireBirthdayConfetti } from './ScrapbookDecorations';
import { NoteModal } from './NoteModal';
import { FlowerDoodle, HeartDoodle } from './DoodleDecorations';

export const HeartfeltLetterStage = ({ data, onBack, onNext }) => {
  const letter = data.letter;
  const [isUnfolded, setIsUnfolded] = useState(true); // default unfolded or ready
  const [activeNote, setActiveNote] = useState(null);

  // Typewriter state
  const fullText = letter.bodyParagraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(fullText.length); // default full or typing
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef(null);

  // Start typewriter effect
  const startTypewriter = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedLength(0);
    setIsTyping(true);

    typingTimerRef.current = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev >= fullText.length) {
          clearInterval(typingTimerRef.current);
          setIsTyping(false);
          return fullText.length;
        }
        // Advance by 3 characters for smooth, non-sluggish reading pace
        return Math.min(prev + 3, fullText.length);
      });
    }, 25);
  };

  // Instant reveal button handler
  const handleRevealAll = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedLength(fullText.length);
    setIsTyping(false);
  };

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  // Split displayed text back into paragraphs
  const currentText = fullText.slice(0, displayedLength);
  const currentParagraphs = currentText.split('\n\n');

  return (
    <div className="relative min-h-[90vh] px-4 py-8 max-w-4xl mx-auto select-none">
      {/* Sparingly Placed Floating Petals & Hearts in Margins */}
      <div className="absolute top-12 left-3 sm:left-8 pointer-events-none opacity-60 animate-petal-drift">
        <FlowerDoodle className="w-5 h-5 text-rose-300" />
      </div>
      <div className="absolute top-36 right-4 sm:right-10 pointer-events-none opacity-50 animate-petal-drift" style={{ animationDelay: '2.5s' }}>
        <HeartDoodle className="w-4 h-4 text-rose-300" />
      </div>
      <div className="absolute bottom-28 left-4 sm:left-12 pointer-events-none opacity-60 animate-petal-drift" style={{ animationDelay: '4.5s' }}>
        <FlowerDoodle className="w-4 h-4 text-purple-200" />
      </div>

      {/* Header Section */}
      <header className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold tracking-wider font-mono uppercase mb-3 border border-rose-200">
          <BookHeart className="w-3.5 h-3.5 text-rose-500" />
          <span>{letter.badge || "CHAPTER 03 • HEARTFELT LETTER"}</span>
        </div>

        <div className="relative inline-block px-4">
          <WashiTape 
            variant="pink" 
            width="w-36 sm:w-44" 
            rotation="-2deg" 
            className="-top-3 left-1/2 -translate-x-1/2 opacity-70" 
          />
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-800 tracking-tight leading-tight pt-1">
            {letter.title || "A Letter From My Heart ♡"}
          </h1>
        </div>

        <p className="font-handwriting text-xl sm:text-2xl text-stone-600 mt-3 max-w-lg mx-auto leading-relaxed">
          "{letter.subtitle}"
        </p>
      </header>

      {/* Main Stationery Card */}
      <div className="relative my-6 max-w-2xl sm:max-w-3xl mx-auto">
        {/* Washi Tape Accents on Stationery */}
        <WashiTape variant="yellow" rotation="-5deg" width="w-24 sm:w-28" className="-top-3 -left-3 z-30" />
        <WashiTape variant="teal" rotation="4deg" width="w-24 sm:w-28" className="-top-3 -right-3 z-30" />

        {/* Paper Letter Sheet */}
        <article 
          onClick={isTyping ? handleRevealAll : undefined}
          className="relative bg-[#FAF6EE] rounded-3xl p-6 sm:p-12 shadow-scrapbook border-2 border-[#EBDDCB] text-stone-800 transition-all duration-500 animate-fadeIn"
          style={{
            backgroundImage: 'radial-gradient(#EDE3D3 0.8px, transparent 0.8px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Top Letterhead: Date & Postal Stamp */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#E3D6C1] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono tracking-widest uppercase text-stone-500 font-bold">
                {letter.date}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/80 text-[10px] font-mono font-bold text-rose-600 uppercase">
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>{letter.paperStamp}</span>
            </div>
          </div>

          {/* Typewriter Controls Toolbar */}
          <div className="flex items-center justify-between gap-2 mb-6 pb-2 border-b border-stone-200/60 text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              {isTyping ? "Writing letter..." : "Handwritten with love"}
            </span>

            <div className="flex items-center gap-2">
              {isTyping ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRevealAll();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-colors shadow-sm"
                  title="Reveal all text immediately"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Reveal Full Letter ⚡</span>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startTypewriter();
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 transition-colors"
                  title="Replay typewriter writing effect"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay Typewriter</span>
                </button>
              )}
            </div>
          </div>

          {/* Salutation */}
          <div className="mb-6">
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-rose-600 tracking-wide">
              {letter.salutation}
            </h2>
          </div>

          {/* Letter Body Paragraphs (Clean, high-legibility font for comfortable reading) */}
          <div className="space-y-4 sm:space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
            {currentParagraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-justify sm:text-left">
                {para}
              </p>
            ))}

            {isTyping && (
              <span className="inline-block w-2 h-5 bg-rose-500 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Letter Closing & Signature */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#E3D6C1] flex flex-col items-end text-right">
            <p className="font-serif italic text-sm sm:text-base text-stone-500 mb-1">
              {letter.closing}
            </p>
            <p className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 tracking-wider">
              {letter.signature}
            </p>
          </div>

          {/* Postscript */}
          {letter.postscript && (
            <div className="mt-6 pt-4 border-t border-stone-200/60">
              <p className="font-handwriting text-lg sm:text-xl text-stone-500 leading-snug">
                {letter.postscript}
              </p>
            </div>
          )}
        </article>
      </div>

      {/* Three Clickable Secret Notes Section */}
      <section className="my-10 relative z-10" aria-label="Secret Clickable Notes">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-stone-200 text-stone-600 text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>Interactive Bestie Notes</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800">
            Open Whenever You Need Them ♡
          </h3>
          <p className="text-xs text-stone-500 font-handwriting text-lg mt-1">
            Tap each note to unfold a personal message
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {letter.clickableNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="group relative p-4 rounded-2xl bg-white hover:bg-[#FFFDF9] border-2 border-stone-200/90 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between hover:-translate-y-1 active:scale-95"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {note.emoji}
                </span>
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-500 group-hover:bg-rose-50 group-hover:text-rose-600">
                  {note.tag}
                </span>
              </div>

              <h4 className="font-serif font-bold text-base text-stone-800 group-hover:text-rose-600 transition-colors leading-snug mb-1">
                {note.buttonLabel}
              </h4>

              <span className="text-xs text-stone-400 font-handwriting text-base">
                Click to read note ➔
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Stage Navigation Controls */}
      <footer className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Back to Scrapbook Stage */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Scrapbook</span>
        </button>

        {/* Continue to Next Stage (Birthday Surprise & Cake) */}
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all active:scale-95"
        >
          <span>Next: Birthday Surprise 🎂</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </footer>

      {/* Note Modal Popup */}
      <NoteModal
        note={activeNote}
        isOpen={activeNote !== null}
        onClose={() => setActiveNote(null)}
      />
    </div>
  );
};
