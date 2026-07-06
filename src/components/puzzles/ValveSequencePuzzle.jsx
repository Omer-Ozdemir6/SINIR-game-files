import React, { useState, useEffect } from 'react';

// Projendeki global ses yöneticisi için tetikleyiciler
const playValveSound = () => {
  if (window.audioManager && window.audioManager.valveCreak) {
    window.audioManager.valveCreak(); // Metalik vana gıcırtısı
  }
};

const playErrorSound = () => {
  if (window.audioManager && window.audioManager.steamVent) {
    window.audioManager.steamVent(); // Tıslayan yüksek basınçlı buhar sesi
  }
};

export default function ValveSequencePuzzle({ config, onSuccess, onFail }) {
  const { sequence, valves } = config;

  const [currentInput, setCurrentInput] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [failedValveId, setFailedValveId] = useState(null); // Hatalı basılan vanayı kırmızı yakmak için
  const [isResetting, setIsResetting] = useState(false); // Hata anında butonları geçici kilitlemek için

  const handleValveClick = (valveId) => {
    if (isResetting) return; // Sıfırlanma animasyonu oynarken tıklamayı engelle
    if (currentInput.includes(valveId)) return; // Zaten çevrilmiş vanayı es geç

    playValveSound();
    const nextInput = [...currentInput, valveId];
    const currentIndex = currentInput.length;

    // Doğru vana mı kontrolü
    if (sequence[currentIndex] === valveId) {
      setCurrentInput(nextInput);
      
      // Tüm sıralama başarıyla tamamlandıysa
      if (nextInput.length === sequence.length) {
        if (window.audioManager && window.audioManager.objectiveSfx) {
          window.audioManager.objectiveSfx(); // Başarı klik sesi veya kilit açılması
        }
        setTimeout(() => onSuccess(), 800);
      }
    } else {
      // Yanlış vana: Ceza mekanizmasını başlat
      playErrorSound();
      setFailedValveId(valveId);
      setIsResetting(true);
      
      const updatedErrors = errorCount + 1;
      setErrorCount(updatedErrors);

      // 1 saniye boyunca hatayı ekranda göster, sonra paneli sıfırla
      setTimeout(() => {
        setCurrentInput([]);
        setFailedValveId(null);
        setIsResetting(false);

        if (updatedErrors >= 3) {
          onFail();
        }
      }, 1000);
    }
  };

  // Hata sayısına göre dinamik tehlike seviyesi hesaplama (Gauge barı için)
  const pressurePercent = Math.min(100, Math.floor((errorCount / 3) * 100));

  return (
    <div className="w-full max-w-md bg-zinc-950 border-2 border-zinc-900 p-6 rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.9)] font-mono my-4 select-none relative overflow-hidden">
      {/* Endüstriyel Monitör Tarama Efekti */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-30"></div>

      {/* HEADER: KRİTİK BASINÇ BİLGİSİ */}
      <div className="flex justify-between items-baseline border-b border-zinc-900 pb-3 mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-amber-600 font-bold tracking-widest uppercase">PRESSURE SYSTEM CONTROL</span>
          <span className="text-[9px] text-zinc-600 mt-0.5">VALVE ISOLATION PROTOCOL</span>
        </div>
        <div className={`text-[10px] px-2 py-0.5 border font-bold rounded transition-colors duration-300 ${
          errorCount >= 2 
            ? 'bg-red-950/80 text-red-400 border-red-800 animate-pulse' 
            : errorCount === 1 
            ? 'bg-amber-950 text-amber-500 border-amber-900' 
            : 'bg-zinc-900 text-zinc-500 border-zinc-800'
        }`}>
          OVERLOAD: {errorCount}/3
        </div>
      </div>

      {/* ANALOG BASINÇ BAR GÖSTERGESİ */}
      <div className="bg-black border border-zinc-900 p-3 rounded mb-5 relative">
        <div className="flex justify-between text-[9px] text-zinc-600 font-bold mb-1">
          <span>MAIN PIPELINE PRESSURE</span>
          <span className={errorCount >= 2 ? 'text-red-500 animate-pulse' : 'text-zinc-500'}>
            {errorCount === 0 ? 'STABLE' : errorCount === 1 ? 'WARNING' : 'CRITICAL OVERFLOW'}
          </span>
        </div>
        <div className="w-full bg-zinc-950 h-3 rounded border border-zinc-900 p-0.5 relative overflow-hidden">
          <div 
            className={`h-full rounded-sm transition-all duration-500 shadow-[0_0_8px_currentColor] ${
              errorCount >= 2 ? 'bg-red-600 text-red-500 animate-pulse' : errorCount === 1 ? 'bg-amber-600 text-amber-500' : 'bg-emerald-700 text-emerald-600'
            }`}
            style={{ width: `${pressurePercent === 0 ? 15 : pressurePercent}%` }}
          ></div>
        </div>
      </div>

      {/* VANALARIN FİZİKSEL YERLEŞİM ALANI */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {valves.map((valve) => {
          const isTurned = currentInput.includes(valve.id);
          const isThisFailed = failedValveId === valve.id;
          
          return (
            <button
              key={valve.id}
              disabled={isResetting || isTurned}
              onClick={() => handleValveClick(valve.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 text-center transition-all aspect-square relative overflow-hidden ${
                isThisFailed
                  ? 'border-red-600 bg-red-950/40 text-red-400 animate-bounce'
                  : isTurned
                  ? 'border-emerald-700 bg-emerald-950/20 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.1)]'
                  : 'border-zinc-900 bg-zinc-900/50 hover:border-zinc-800 hover:bg-zinc-900 text-zinc-400 disabled:opacity-40 active:scale-95'
              }`}
            >
              {/* Metalik Vana Çarkı Çizimi */}
              <div className={`w-12 h-12 rounded-full border-4 border-current flex items-center justify-center mb-2 transition-transform duration-700 ease-out ${isTurned ? 'rotate-180' : ''}`}>
                {/* Çarkın İç Milleri */}
                <div className="w-1 h-8 bg-current absolute"></div>
                <div className="w-8 h-1 bg-current absolute"></div>
                {/* Göbek deliği */}
                <div className="w-3 h-3 rounded-full bg-black border-2 border-current z-10"></div>
              </div>
              
              <span className="text-xs font-black tracking-wider">{valve.id}</span>
              <span className={`text-[8px] font-bold mt-1 uppercase tracking-wider ${isTurned ? 'text-emerald-500' : isThisFailed ? 'text-red-400' : 'text-zinc-600'}`}>
                {isTurned ? 'OPENED' : isThisFailed ? 'BLOCKED' : 'READY'}
              </span>
            </button>
          );
        })}
      </div>

      {/* ALT İLERLEME SİNYAL IŞIKLARI */}
      <div className="bg-black border border-zinc-900 p-3 rounded-md flex flex-col items-center justify-center">
        <div className="text-[8px] text-zinc-600 uppercase tracking-widest mb-2 font-bold">SEQUENCE COUPLING STATUS</div>
        <div className="flex justify-center space-x-3">
          {sequence.map((_, index) => {
            const isPassed = index < currentInput.length;
            const isCurrentError = isResetting && index === currentInput.length;

            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isCurrentError
                    ? 'bg-red-500 border-red-400 shadow-[0_0_8px_#ef4444] animate-ping'
                    : isPassed
                    ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_8px_#10b981]'
                    : 'bg-zinc-950 border-zinc-900'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}