import React from 'react';

export default function RadioTuner({ frequency, onFrequencyChange, onSignalFound }) {
  const targetFrequency = 92.7;
  
  // Hedef frekansa ne kadar yakın olduğumuzu hesaplayalım (Sinyal gücü için)
  const distance = Math.abs(frequency - targetFrequency);
  
  // Sinyal kalitesini belirle
  let signalStatus = '❌ NO SIGNAL (STATIC CIZZZ...)';
  let signalColor = 'text-zinc-650';

  if (distance === 0) {
    signalStatus = '⚡ CANLI YAYIN: SOS YARDIM ÇAĞRISI RECEIVING...';
    signalColor = 'text-green-500 font-bold animate-pulse';
    // Sinyal tam yakalandığında App.jsx'teki başarı fonksiyonunu tetikle
    setTimeout(() => onSignalFound(), 500);
  } else if (distance <= 0.4) {
    signalStatus = '⚠️ ZAYIF SİNYAL (PARAZİTLİ SESLER...)';
    signalColor = 'text-yellow-600 animate-pulse';
  }

  return (
    <div className="w-full bg-zinc-950 p-3 rounded border border-zinc-900 font-mono my-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-zinc-500 tracking-widest uppercase">📻 ACİL DURUM TELSİZ ALICISI</span>
        <span className="text-xs font-bold text-amber-500 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/30">
          {frequency.toFixed(1)} MHz
        </span>
      </div>

      {/* ANALOG FREKANS KAYDIRMA ÇUBUĞU (SLIDER) */}
      <div className="my-3 relative">
        <input 
          type="range" 
          min="87.5" 
          max="100.0" 
          step="0.1" 
          value={frequency}
          onChange={(e) => onFrequencyChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        {/* Hedef noktanın altına minik bir işaret koyalım */}
        <div className="absolute left-[41.6%] top-3 text-[9px] text-zinc-700 select-none">▲ 92.7</div>
      </div>

      {/* SİNYAL MONITORÜ */}
      <div className="bg-black/40 p-2 rounded border border-zinc-900 text-center mt-2">
        <p className={`text-xs tracking-wide ${signalColor}`}>
          {signalStatus}
        </p>
        {distance === 0 && (
          <p className="text-[11px] text-gray-400 italic mt-1 leading-normal">
            "...yardım... kimse var mı? B03 kapısı acil durum kodu..."
          </p>
        )}
      </div>
    </div>
  );
}