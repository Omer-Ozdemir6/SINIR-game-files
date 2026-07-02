import React, { useState, useEffect, useRef } from 'react';

export default function LockpickPuzzle({ config, onSuccess, onFail }) {
  const { requiredPins, speed, targetMin, targetMax } = config;

  const [completedPins, setCompletedPins] = useState(0);
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [direction, setDirection] = useState(1); // 1: Sağa, -1: Sola
  const [message, setMessage] = useState('FEEL THE VIBRATION...');
  const [lives, setLives] = useState(3);

  // Animasyon döngüsü (Pimin sağa sola gitmesi)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndicatorPos((prev) => {
        let next = prev + direction * 2;
        if (next >= 100) {
          setDirection(-1);
          return 100;
        }
        if (next <= 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, speed]);

  const handleUnlockAttempt = () => {
    // Pimin tam yeşil bölgede olup olmadığını kontrol et
    const isSuccess = indicatorPos >= targetMin && indicatorPos <= targetMax;

    if (isSuccess) {
      const nextPins = completedPins + 1;
      setCompletedPins(nextPins);
      setMessage(`[ CLICK! ] PIN ${nextPins} LOCKED IN PLACE.`);
      
      if (nextPins >= requiredPins) {
        setMessage('LOCK CLEARED SUCCESSFULLY.');
        setTimeout(() => onSuccess(), 1000);
      }
    } else {
      const nextLives = lives - 1;
      setLives(nextLives);
      setMessage('[ SNAP! ] MISSED THE TIMING. LOCK PRESSURE RESET!');
      setCompletedPins(0); // Hata yapınca tüm pimler sıfırlanır
      
      if (nextLives <= 0) {
        onFail();
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 p-6 rounded shadow-[0_0_25px_rgba(0,0,0,0.7)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4">
        <span className="text-xs text-amber-500 tracking-widest uppercase">🔑 MECHANICAL LOCKPICK</span>
        <span className="text-[10px] bg-red-950 text-red-500 px-2 py-0.5 border border-red-900 rounded animate-pulse">
          TRIES LEFT: {lives}
        </span>
      </div>

      {/* PİMLERİN DURUM GÖSTERGESİ */}
      <div className="flex justify-center space-x-4 my-4">
        {Array.from({ length: requiredPins }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-4 h-12 border rounded-sm flex flex-col justify-end p-0.5 ${i < completedPins ? 'border-emerald-500 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-900'}`}>
              <div className={`w-full rounded-sm transition-all duration-300 ${i < completedPins ? 'h-full bg-emerald-500' : 'h-2 bg-zinc-700'}`} />
            </div>
            <span className="text-[9px] text-zinc-500 mt-1">P{i+1}</span>
          </div>
        ))}
      </div>

      {/* KİLİT MEKANİZMASI SİLİNDİRİ VE KAYDIRICI BAR */}
      <div className="bg-zinc-950 border border-zinc-900 p-4 rounded my-4 relative">
        <div className="w-full h-6 bg-zinc-900 rounded border border-zinc-800 relative overflow-hidden">
          
          {/* Hedef Yeşil Bölge (Safe/Target Zone) */}
          <div 
            className="absolute h-full bg-emerald-500/20 border-x border-emerald-500/60"
            style={{ left: `${targetMin}%`, width: `${targetMax - targetMin}%` }}
          />

          {/* Hareket Eden Pim Göstergesi */}
          <div 
            className="absolute top-0 w-2 h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-75"
            style={{ left: `${indicatorPos}%`, transform: 'translateX(-50%)' }}
          />
        </div>

        {/* Hizalama Rehber Çizgileri */}
        <div className="flex justify-between text-[8px] text-zinc-600 mt-1 px-1">
          <span>0%</span>
          <span className="text-emerald-600 font-bold">LOCK ZONE</span>
          <span>100%</span>
        </div>
      </div>

      {/* ANLIK GERİ BİLDİRİM METNİ */}
      <div className="min-h-[35px] bg-zinc-950/40 border border-zinc-900 p-2 rounded text-center flex items-center justify-center">
        <span className={`text-[10px] uppercase tracking-wider ${message.includes('CLICK') ? 'text-emerald-400 font-bold' : message.includes('SNAP') ? 'text-red-400' : 'text-zinc-500'}`}>
          {message}
        </span>
      </div>

      {/* TRIGGER BUTONU */}
      <button
        onClick={handleUnlockAttempt}
        className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-3 text-xs text-zinc-200 rounded font-bold tracking-widest active:scale-98 transition-all uppercase"
      >
        [ PRESS AT THE RIGHT VIBRATION ]
      </button>
    </div>
  );
}