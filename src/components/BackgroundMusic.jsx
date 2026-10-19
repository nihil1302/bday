import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * BackgroundMusic Component
 * Provides cozy ambient music with an integrated Web Audio synthesizer
 * that plays a gentle chime melody, or optionally plays an audio file URL.
 *
 * Autoplay behaviour:
 *  - Attempts to start on mount automatically.
 *  - If the browser blocks autoplay (common on mobile), starts on the
 *    visitor's very first interaction with the page (click or keydown).
 *  - Music continues across all stage transitions because this component
 *    lives at the App level and never unmounts.
 */
export const BackgroundMusic = ({ customAudioUrl = null }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);
  const audioElementRef = useRef(null);
  const hasStartedRef = useRef(false); // prevent duplicate starts

  // Gentle music box notes for "Happy Birthday" (frequencies in Hz)
  const melodyNotes = [
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // Hap-
    { freq: 261.63, dur: 0.35, pause: 0.1 }, // py
    { freq: 293.66, dur: 0.70, pause: 0.15 }, // birth-
    { freq: 261.63, dur: 0.70, pause: 0.15 }, // day
    { freq: 349.23, dur: 0.70, pause: 0.15 }, // to
    { freq: 329.63, dur: 1.20, pause: 0.35 }, // you

    { freq: 261.63, dur: 0.35, pause: 0.1 },
    { freq: 261.63, dur: 0.35, pause: 0.1 },
    { freq: 293.66, dur: 0.70, pause: 0.15 },
    { freq: 261.63, dur: 0.70, pause: 0.15 },
    { freq: 392.00, dur: 0.70, pause: 0.15 },
    { freq: 349.23, dur: 1.20, pause: 0.35 },

    { freq: 261.63, dur: 0.35, pause: 0.1 },
    { freq: 261.63, dur: 0.35, pause: 0.1 },
    { freq: 523.25, dur: 0.70, pause: 0.15 },
    { freq: 440.00, dur: 0.70, pause: 0.15 },
    { freq: 349.23, dur: 0.70, pause: 0.15 },
    { freq: 329.63, dur: 0.70, pause: 0.15 },
    { freq: 293.66, dur: 1.00, pause: 0.35 },

    { freq: 466.16, dur: 0.35, pause: 0.1 },
    { freq: 466.16, dur: 0.35, pause: 0.1 },
    { freq: 440.00, dur: 0.70, pause: 0.15 },
    { freq: 349.23, dur: 0.70, pause: 0.15 },
    { freq: 392.00, dur: 0.70, pause: 0.15 },
    { freq: 349.23, dur: 1.40, pause: 1.50 },
  ];

  const playSynthesizedChime = (freq, duration) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  };

  const startMelodyLoop = () => {
    let noteIndex = 0;
    const playNext = () => {
      if (!hasStartedRef.current) return;
      const current = melodyNotes[noteIndex];
      playSynthesizedChime(current.freq, current.dur);
      const delay = (current.dur + current.pause) * 1000;
      noteIndex = (noteIndex + 1) % melodyNotes.length;
      timerRef.current = setTimeout(playNext, delay);
    };
    playNext();
  };

  // ── Autoplay on mount; fallback to first user interaction ──
  useEffect(() => {
    const tryStart = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setIsPlaying(true);
    };

    // 1. Attempt immediate autoplay
    tryStart();

    // 2. Also hook first interaction so mobile browsers unblock audio
    const onInteraction = () => {
      tryStart();
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('keydown', onInteraction);
    };
    document.addEventListener('click', onInteraction, { once: true });
    document.addEventListener('keydown', onInteraction, { once: true });

    return () => {
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('keydown', onInteraction);
    };
  }, []);

  // ── Play / pause logic ──
  useEffect(() => {
    if (isPlaying) {
      if (customAudioUrl && audioElementRef.current) {
        audioElementRef.current.volume = 0.3;
        audioElementRef.current.loop = true;
        audioElementRef.current.play().catch(() => {});
      } else {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContext();
        }
        startMelodyLoop();
      }
    } else {
      if (customAudioUrl && audioElementRef.current) {
        audioElementRef.current.pause();
      }
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, customAudioUrl]);

  const toggleSound = () => {
    if (!isPlaying) hasStartedRef.current = true;
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {customAudioUrl && <audio ref={audioElementRef} src={customAudioUrl} loop />}

      <button
        onClick={toggleSound}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-md transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-rose-100/90 border-rose-300 text-rose-700 shadow-rose-200/50 scale-105'
            : 'bg-white/80 border-stone-200 text-stone-600 hover:bg-rose-50 hover:text-rose-600'
        }`}
        title={isPlaying ? 'Mute birthday melody' : 'Play birthday melody'}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-xs font-medium tracking-wide">Melody ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-rose-500" />
            <span className="text-xs font-medium tracking-wide text-stone-500 group-hover:text-rose-600">
              Music 🎵
            </span>
          </>
        )}
      </button>
    </div>
  );
};
