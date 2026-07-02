import React, { useState } from 'react';

export default function ValveSequencePuzzle({ config, onSuccess, onFail }) {
  const { sequence, valves } = config;

  const [currentInput, setCurrentInput] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  const handleValveClick = (valveId) => {
    // Eğer vana zaten bu turda tıklandıysa bir şey yapma
    if (currentInput.includes(valveId)) return;

    const nextInput = [...currentInput, valveId];
    const currentIndex = currentInput.length;

    // Tıklanan vana, doğru sıralamadaki o indeksle eşleşiyor mu?
    if (sequence[currentIndex] === valveId) {
      setCurrentInput(nextInput);
      
      // Tüm sıralama doğru tamamlandıysa
      if (nextInput.length === sequence.length) {
        onSuccess();
      }
    } else {
      // Yanlış vana: Girdileri sıfırla ve hata sayısını artır
      setCurrentInput([]);
      setErrorCount((prev) => {
        const updated = prev + 1;
        if (updated >= 3) {
          onFail();
        }
        return updated;
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 p-6 rounded shadow-[0_0_25px_rgba(245,158,11,0.05)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4">
        <span className="text-xs text-amber-500 tracking-widest uppercase">💨 PRESSURE VALVE CONTROL</span>
        <span className="text-[10px] bg-red-950 text-red-500 px-2 py-0.5 border border-red-900 rounded animate-pulse">
          PRESSURE CRITICAL: {errorCount}/3
        </span>
      </div>

      {/* VANALARIN GÖRSEL ALANI */}
      <div className="grid grid-cols-3 gap-3 my-6">
        {valves.map((valve) => {
          const isTurned = currentInput.includes(valve.id);
          
          return (
            <button
              key={valve.id}
              onClick={() => handleValveClick(valve.id)}
              className={`flex flex-col items-center justify-center p-4 rounded border text-center transition-all aspect-square ${
                isTurned
                  ? 'border-emerald-600 bg-emerald-950/20 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-300 active:scale-95'
              }`}
            >
              {/* Vana Çarkı İkonu (Basit CSS Çizimi) */}
              <div className={`w-10 h-10 rounded-full border-4 border-current flex items-center justify-center mb-2 transition-transform duration-500 ${isTurned ? 'rotate-180' : ''}`}>
                <div className="w-1.5 h-6 bg-current absolute"></div>
                <div className="w-6 h-1.5 bg-current absolute"></div>
              </div>
              <span className="text-xs font-bold">{valve.id}</span>
              <span className="text-[8px] text-zinc-500 mt-1 uppercase tracking-tighter leading-none">{isTurned ? 'OPEN' : 'LOCKED'}</span>
            </button>
          );
        })}
      </div>

      {/* İLERLEME VE GÖSTERGE */}
      <div className="bg-zinc-950 border border-zinc-900 p-3 rounded text-center">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Current Sequence Status</div>
        <div className="flex justify-center space-x-2">
          {sequence.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border ${
                index < currentInput.length
                  ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}