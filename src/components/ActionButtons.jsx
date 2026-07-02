import React, { useState, useEffect } from 'react';

export default function ActionButtons({ 
  scene, 
  onChoice, 
  inventory, 
  stress,
  isBreathMiniGame, 
  onBreathSuccess 
}) {
  // --- PANIC TIMER MEKANİĞİ ---
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (scene.panicTimer) {
      setTimeLeft(scene.panicTimer);
    } else {
      setTimeLeft(null);
    }
  }, [scene]);

  useEffect(() => {
    if (timeLeft === null) return;
    
    if (timeLeft <= 0) {
      onChoice(scene.timeoutSceneId);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => +(prev - 0.1).toFixed(1));
    }, 100);

    return () => clearTimeout(timer);
  }, [timeLeft, scene]);

  // --- NEFES TUTMA MİNİ OYUNU MEKANİĞİ ---
  const [breathProgress, setBreathProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    let interval;
    if (isBreathMiniGame && isPressing) {
      interval = setInterval(() => {
        setBreathProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setBreathProgress(0);
            setIsPressing(false);
            onBreathSuccess();
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    } else if (!isPressing) {
      setBreathProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPressing, isBreathMiniGame]);

  // --- PSİKOLOJİK SİSTEM: SEÇENEK MANİPÜLASYONU ---
  const renderChoices = () => {
    let finalChoices = [...(scene.choices || [])];

    // Eğer oyuncunun stresi 75'in üzerindeyse zihni oyun oynamaya başlar
    if (stress >= 75 && !scene.isGameOver) {
      finalChoices.push({
        text: "❌ ANNENİ ARA",
        nextSceneId: "hallucination_death", // Basılırsa delirme döngüsü tetiklenir
        requiresItem: null
      });
      finalChoices.unshift({
        text: "👁️ ARKANA BAKMA ARKANA BAKMA ARKANA BAKMA",
        nextSceneId: scene.id, // Vakit kaybettirmek için sahneyi resetler
        requiresItem: null
      });
    }

    return finalChoices;
  };

  // --- MİNİ OYUN ARAYÜZÜ (RENDER) ---
  if (isBreathMiniGame) {
    return (
      <div className="w-full bg-zinc-950 p-4 rounded border border-red-900/40 flex flex-col items-center space-y-4">
        <p className="text-red-500 animate-pulse text-sm font-bold tracking-widest">⚠️ YARATIK TAM ÖNÜNDE! ⚠️</p>
        
        <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
          <div 
            className="bg-red-600 h-full transition-all duration-75"
            style={{ width: `${breathProgress}%` }}
          />
        </div>

        <button
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onTouchStart={() => setIsPressing(true)}
          onTouchEnd={() => setIsPressing(false)}
          className={`w-full py-4 rounded text-center font-bold tracking-widest border transition-all select-none text-sm
            ${isPressing 
              ? 'bg-red-950/40 border-red-500 text-red-400 animate-pulse' 
              : 'bg-zinc-900 border-zinc-700 text-gray-400 active:scale-98'}`}
        >
          {isPressing ? 'NEFESİNİ TUTUYORSUN... (BIRAKMA!)' : 'EKRANA BASILI TUTARAK NEFESİNİ TUT'}
        </button>
      </div>
    );
  }

  // --- NORMAL SEÇENEK BUTONLARI ARAYÜZÜ (RENDER) ---
  return (
    <div className="w-full flex flex-col space-y-2 bg-zinc-950/20 p-2 rounded">
      
      {timeLeft !== null && scene.panicTimer && (
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-2">
          <div 
            className="bg-red-500 h-full transition-all duration-75 ease-linear"
            style={{ width: `${(timeLeft / scene.panicTimer) * 100}%` }}
          />
        </div>
      )}

      {renderChoices().map((choice, index) => {
const isLocked = 
  (choice.requiresItem && !inventory.includes(choice.requiresItem)) ||
  (choice.requiresPower && !powerGrid[choice.requiresPower]); // <-- ELEKTRİK ŞARTI KONTROLÜ

        return (
          <button
            key={index}
            disabled={isLocked || scene.isGameOver}
            onClick={() => onChoice(choice.nextSceneId)}
            className={`w-full p-3 text-left rounded text-sm tracking-wide border transition-all active:scale-[0.99]
              ${isLocked 
                ? 'opacity-30 bg-zinc-950 border-zinc-900 text-gray-600 cursor-not-allowed' 
                : 'bg-zinc-900/80 border-zinc-800 text-gray-300 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white'}`}
          >
            {isLocked ? `🔒 [Kilitli] ${choice.text}` : `> ${choice.text}`}
          </button>
        );
      })}

      {scene.isGameOver && (
        <button
          onClick={() => window.location.reload()}
          className="w-full p-4 bg-red-950/20 border border-red-700 text-red-500 rounded text-center font-bold tracking-widest hover:bg-red-950/40"
        >
          🚨 ÖLDÜN. YENİDEN DENE 🚨
        </button>
      )}
    </div>
  );
}