import React, { useState, useEffect } from 'react';

export default function FrequencyTunerPuzzle({ config, onSuccess }) {
  const { target, tolerance, startFrequency, endFrequency, rewardText } = config;

  const [currentFreq, setCurrentFreq] = useState(startFrequency);
  const [signalStrength, setSignalStrength] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Frekans her değiştiğinde sinyal gücünü hesapla
  useEffect(() => {
    const distance = Math.abs(currentFreq - target);
    
    // Maksimum uzaklığa göre bir sinyal yüzdesi çıkar (İnce ayar hissi için)
    let strength = Math.max(0, 100 - Math.floor(distance * 30));
    
    // Eğer tolerans sınırları içindeyse sinyali %100 yap
    if (distance <= tolerance) {
      strength = 100;
    }
    
    setSignalStrength(strength);

    // %100 sinyalde kilitlenme sayacını başlat
    if (strength === 100) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
      setLockTimer(0);
    }
  }, [currentFreq, target, tolerance]);

  // %100 sinyalde 2 saniye beklerse puzzle çözülür (Telsizi sabitleme hissi)
  useEffect(() => {
    let interval;
    if (isLocked) {
      interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onSuccess(), 1500); // Başarılı mesajı okunsun diye hafif gecikme
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isLocked, onSuccess]);

  // İnce ve kalın ayar buton fonksiyonları
  const tune = (amount) => {
    setCurrentFreq((prev) => {
      const next = prev + amount;
      return Math.max(startFrequency, Math.min(endFrequency, parseFloat(next.toFixed(1))));
    });
  };

  return (
    <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 p-6 rounded shadow-[0_0_25px_rgba(0,0,0,0.8)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4">
        <span className="text-xs text-emerald-500 tracking-widest uppercase">📡 COMLINK FREQUENCY TUNER</span>
        <span className="text-[10px] text-zinc-500">BAND: FM / VHF</span>
      </div>

      {/* FREKANS GÖSTERGE EKRANI */}
      <div className="bg-zinc-950 border border-zinc-900 p-4 rounded text-center my-4 relative overflow-hidden">
        <div className="absolute top-1 left-2 text-[8px] text-zinc-600 tracking-widest uppercase">TUNING MONITOR</div>
        
        {/* Dijital Frekans Numarası */}
        <div className="text-3xl font-sans font-bold tracking-widest text-emerald-400 my-2">
          {currentFreq.toFixed(1)} <span className="text-xs text-emerald-600 font-mono">MHz</span>
        </div>

        {/* Sinyal Gücü Çubuğu */}
        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-3 border border-zinc-800">
          <div 
            className={`h-full transition-all duration-150 ${signalStrength === 100 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'}`}
            style={{ width: `${signalStrength}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[9px] text-zinc-500 mt-1">
          <span>SIGNAL STRENGTH: {signalStrength}%</span>
          {signalStrength === 100 && <span className="text-emerald-400 animate-pulse">[ SIGNAL LOCKED ]</span>}
        </div>
      </div>

      {/* DEŞİFRE OLAN METİN ALANI */}
      <div className="min-h-[50px] bg-zinc-950/60 border border-zinc-900 p-3 rounded my-3 text-center flex items-center justify-center">
        {signalStrength >= 90 ? (
          <p className="text-xs text-zinc-300 italic tracking-wide animate-fade-in">
            {signalStrength === 100 ? rewardText : "...parazi--...ya--dım...--kod..."}
          </p>
        ) : (
          <p className="text-xs text-zinc-700 uppercase tracking-widest animate-pulse">
            [ CIZZZZZZZZZZZZZZZZZZ ]
          </p>
        )}
      </div>

      {/* KİLİTLENME DEVRİ İLERLEME ÇUBUĞU */}
      {isLocked && (
        <div className="w-full bg-zinc-900 h-1 mb-4">
          <div className="h-full bg-emerald-400 transition-all" style={{ width: `${lockTimer}%` }}></div>
        </div>
      )}

      {/* KONTROL BUTONLARI */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button 
          onClick={() => tune(-1.0)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-400 rounded hover:bg-zinc-800 active:scale-95 transition-all"
        >
          &lt;&lt; -1.0
        </button>
        <button 
          onClick={() => tune(-0.1)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-300 rounded hover:bg-zinc-800 active:scale-95 transition-all font-bold"
        >
          &lt; -0.1
        </button>
        <button 
          onClick={() => tune(0.1)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-300 rounded hover:bg-zinc-800 active:scale-95 transition-all font-bold"
        >
          +0.1 &gt;
        </button>
        <button 
          onClick={() => tune(1.0)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-400 rounded hover:bg-zinc-800 active:scale-95 transition-all"
        >
          +1.0 &gt;&gt;
        </button>
      </div>
    </div>
  );
}