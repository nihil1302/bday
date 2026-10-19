import React from 'react';
import { Mail, BookHeart, FileText, Cake, PartyPopper } from 'lucide-react';

export const StageProgressBar = ({ currentStage, onSelectStage }) => {
  const stages = [
    { id: 1, label: "Surprise", icon: Mail },
    { id: 2, label: "Memories", icon: BookHeart },
    { id: 3, label: "Letter", icon: FileText },
    { id: 4, label: "Make a Wish", icon: Cake },
    { id: 5, label: "Celebration", icon: PartyPopper },
  ];

  return (
    <nav aria-label="Surprise Journey Progress" className="w-full max-w-xl mx-auto px-4 py-3 select-none">
      <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-200/80 shadow-sm flex items-center justify-between gap-1 sm:gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          const isCompleted = currentStage > stage.id;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => onSelectStage(stage.id)}
                className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 text-xs sm:text-sm font-medium ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-300 scale-105'
                    : isCompleted
                    ? 'text-rose-600 hover:bg-rose-50'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
                title={`Stage ${stage.id}: ${stage.label}`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">{stage.label}</span>
              </button>

              {idx < stages.length - 1 && (
                <div 
                  className={`h-0.5 flex-1 transition-colors duration-300 rounded ${
                    isCompleted ? 'bg-rose-300' : 'bg-stone-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
