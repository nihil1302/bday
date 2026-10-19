import React, { useState } from 'react';
import { birthdayData } from './data/birthdayData';
import { OpeningScreen } from './components/OpeningScreen';
import { ScrapbookStage } from './components/ScrapbookStage';
import { HeartfeltLetterStage } from './components/HeartfeltLetterStage';
import { InteractiveSurpriseStage } from './components/InteractiveSurpriseStage';
import { CelebrationStage } from './components/CelebrationStage';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Heart } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-rose-200">
      {/* Background Ambient Melody */}
      <BackgroundMusic />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentStage === 1 && (
          <OpeningScreen 
            data={birthdayData} 
            onProceed={(nextStage) => setCurrentStage(nextStage)} 
          />
        )}

        {currentStage === 2 && (
          <ScrapbookStage 
            data={birthdayData}
            onBack={() => setCurrentStage(1)}
            onNext={() => setCurrentStage(3)}
          />
        )}

        {currentStage === 3 && (
          <HeartfeltLetterStage 
            data={birthdayData}
            onBack={() => setCurrentStage(2)}
            onNext={() => setCurrentStage(4)}
          />
        )}

        {currentStage === 4 && (
          <InteractiveSurpriseStage 
            data={birthdayData}
            onBack={() => setCurrentStage(3)}
            onNext={() => setCurrentStage(5)}
          />
        )}

        {currentStage === 5 && (
          <CelebrationStage 
            data={birthdayData}
            onBack={() => setCurrentStage(4)}
            onReplay={() => setCurrentStage(1)}
          />
        )}
      </main>

      {/* Cozy Footer */}
      <footer className="py-4 text-center text-xs text-stone-400 font-handwriting text-lg border-t border-stone-200/40">
        <p className="flex items-center justify-center gap-1.5">
          Handmade with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" /> for {birthdayData.recipient.name}
        </p>
      </footer>
    </div>
  );
}
