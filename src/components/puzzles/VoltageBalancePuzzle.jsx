import React, { useState, useEffect } from 'react';

export default function VoltageBalancePuzzle({ config, onSuccess, onFail }) {
  const { initialLeft, initialRight, targetMin, targetMax, maxTime } = config;

  const [leftGrid, setLeftGrid] = useState(initialLeft);
  const [rightGrid, setRightGrid] = useState(initialRight);
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [isStabilized, setIsStabilized] = useState(false);
  const [stableSeconds, setStableSeconds] = useState(0);

  // 1. Geri Sayım Zamanlayıcısı (Zaman biterse patlar)
  useEffect(() => {
    if (timeLeft <= 0) {
      onFail();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onFail]);

  // 2. Denge Kontrol Mekanizması
  useEffect(() => {
    const leftOk = leftGrid >= targetMin && leftGrid <= targetMax;
    const rightOk = rightGrid >= targetMin && rightGrid <= targetMax;

    if (leftOk && rightOk) {
      setIsStabilized(true);
    } else {
      setIsStabilized(false);
      setStableSeconds(0);
    }
  }, [leftGrid, rightGrid, targetMin, targetMax]);

  // 3. 2 Saniye Boyunca Dengede Tutma Zorunluluğu (Gerçekçi bir kilitlenme hissi)
  useEffect(() => {
    let interval;
    if (isStabilized) {
      interval = setInterval(() => {
        setStableSeconds(prev => {
          if (prev >= 2) {
            clearInterval(interval);
            onSuccess();
            return 2;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStabilized, onSuccess]);

  // Sol taraftan sağ tarafa güç aktar
  const shiftPowerRight = () => {
    if (leftGrid <= 5) return;
    setLeftGrid(prev => prev - 10);
    setRightGrid(prev => Math.min(100, prev + 10));
  };

  // Sağ taraftan sol tarafa güç aktar
  const shiftPowerLeft = () => {
    if (rightGrid <= 5) return;
    setRightGrid(prev => prev - 10);
    setLeftGrid(prev => Math.min(100, prev + 10));
  };

  // Bar görselleştirme yardımcı fonksiyonu
  const renderBar = (value) => {
    const blocks = Math.floor(value / 10);
    const isTargetZone = value >= targetMin && value <= targetMax;
    
    return (
      <div className="flex items-center space-x-1 font-mono text-sm w-full bg-zinc-950 p-2 border border-zinc-900 rounded">
        <span className={isTargetZone ? 'text-emerald-500 font-bold animate-pulse' : 'text-zinc-600'}>
          {String(value).padStart(3, '0')}V
        </span>
        <div className="flex-1 flex space-x-0.5 bg-zinc-900 h-4 p-0.5 rounded-sm">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-all ${
                i < blocks 
                  ? isTargetZone 
                    ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' 
                    : 'bg-amber-600'
                  : 'bg-zinc-950'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 p-6 rounded shadow-[0_0_30px_rgba(220,38,38,0.1)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4">
        <span className="text-xs text-amber-500 tracking-widest uppercase">⚡ VOLTAGE REGULATOR</span>
        <span className={`text-xs px-2 py-0.5 border rounded ${timeLeft <= 5 ? 'bg-red-950 border-red-800 text-red-500 animate-ping' : 'border-zinc-800 text-zinc-400'}`}>
          CRITICAL: {timeLeft}s
        </span>
      </div>

      <div className="space-y-4 my-4">
        {/* SOL KANAL */}
        <div>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">GRID CHANNEL [LEFT]</span>
          {renderBar(leftGrid)}
        </div>

        {/* SAĞ KANAL */}
        <div>
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">GRID CHANNEL [RIGHT]</span>
          {renderBar(rightGrid)}
        </div>
      </div>

      {/* DURUM BİLGİSİ */}
      <div className="bg-zinc-950 border border-zinc-900 p-2.5 rounded text-center my-3 min-h-[40px] flex items-center justify-center">
        {isStabilized ? (
          <span className="text-xs text-emerald-400 font-bold tracking-widest animate-pulse uppercase">
            [ STABILIZING SYSTEM... {3 - stableSeconds}s ]
          </span>
        ) : (
          <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
            Target Zone: {targetMin}V - {targetMax}V for both grids
          </span>
        )}
      </div>

      {/* TRANSFER REGÜLATÖR BUTONLARI */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={shiftPowerLeft}
          disabled={isStabilized}
          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-3 text-xs text-zinc-200 rounded active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>◀ SHIFT POWER LEFT</span>
        </button>
        <button
          onClick={shiftPowerRight}
          disabled={isStabilized}
          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-3 text-xs text-zinc-200 rounded active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>SHIFT POWER RIGHT ▶</span>
        </button>
      </div>
    </div>
  );
}