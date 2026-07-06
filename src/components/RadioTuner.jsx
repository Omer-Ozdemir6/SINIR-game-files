import React, { useState, useEffect } from 'react';

// Global ses yöneticisi tetikleyicileri (Varsayılan olarak projendeki yapıya uyumlu)
const playTuningTick = () => {
  if (window.audioManager && window.audioManager.blipSfx) {
    window.audioManager.blipSfx(80); // İnce çıt sesi
  }
};

export default function RadioTuner({ frequency, onFrequencyChange, onSignalFound }) {
  const targetFrequency = 92.7;
  const distance = Math.abs(frequency - targetFrequency);
  
  const [isGlitching, setIsGlitching] = useState(false);

  // 1. Sinyal Yakalama ve Başarı Durumu Yönetimi (React Standartlarına Uygun Safe Effect)
  useEffect(() => {
    if (distance === 0) {
      if (window.audioManager && window.audioManager.objectiveSfx) {
        window.audioManager.objectiveSfx(); // Sinyal kilitlenme tınısı
      }
      
      const successTimeout = setTimeout(() => {
        onSignalFound();
      }, 1200); // Sesin ve deşifre metninin oyuncu tarafından idrak edilmesi için hafif süre

      return () => clearTimeout(successTimeout);
    }
  }, [distance, onSignalFound]);

  // 2. Yakın Frekanslarda Rastgele Telsiz Parazit Efektleri (Glitch)
  useEffect(() => {
    if (distance > 0 && distance <= 0.4) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.5) {
          setIsGlitching(true);
          if (window.audioManager && window.audioManager.burst) {
            window.audioManager.burst(80); // Kısa parazit patlaması ses motoru tetiklemesi
          }
          setTimeout(() => setIsGlitching(false), 80);
        }
      }, 400);
      return () => clearInterval(glitchInterval);
    }
  }, [distance]);

  // Sinyal Kalitesine Göre Renk ve Durum Belirleme
  let signalStatus = '❌ NO CARRIER (STATIC NOISE)';
  let signalColor = 'text-zinc-700';

  if (distance === 0) {
    signalStatus = '⚡ COM-FEED SECURED: DECRYPTING...';
    signalColor = 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]';
  } else if (distance <= 0.2) {
    signalStatus = '⚠️ STRONG DISTORTION (SIGNAL COUPLING)';
    signalColor = 'text-amber-500 animate-pulse';
  } else if (distance <= 0.5) {
    signalStatus = '⚠️ WEAK CARRIER (BROKEN AUDIO)';
    signalColor = 'text-amber-700';
  }

  // Dinamik statik seviyesini ses motoruna bildirme
  useEffect(() => {
    if (window.audioManager && window.audioManager.staticLevel) {
      // Mesafeye göre parazit yoğunluğu (Uzaklaştıkça ses artar, hedefte sıfırlanır)
      const calculatedStatic = Math.min(0.5, distance * 0.3);
      window.audioManager.staticLevel(calculatedStatic);
    }
  }, [distance]);

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    if (val !== frequency) {
      playTuningTick();
      onFrequencyChange(val);
    }
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-900 p-4 rounded-lg font-mono my-3 select-none relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.95)]">
      {/* CRT Ekran Çizgileri */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20"></div>

      <div className="flex justify-between items-center mb-2 relative z-10">
        <span className="text-[10px] text-zinc-500 tracking-widest uppercase flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${distance === 0 ? 'bg-emerald-500 animate-ping' : 'bg-zinc-800'}`}></span>
          VHF COMLINK RECEIVER
        </span>
        <span className="text-xs font-black text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30 shadow-inner">
          {frequency.toFixed(1)} <span className="text-[9px] font-normal text-amber-700">MHz</span>
        </span>
      </div>

      {/* ANALOG FREKANS KAYDIRMA SÜRÜCÜSÜ */}
      <div className="my-4 relative z-10 px-1">
        <input 
          type="range" 
          min="87.5" 
          max="100.0" 
          step="0.1" 
          value={frequency}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-amber-600 border border-zinc-800/50"
        />
        {/* Sabit Hedef Frekans İşaretçisi */}
        <div className="absolute left-[41.6%] top-4 transform -translate-x-1/2 flex flex-col items-center select-none pointer-events-none">
          <span className="text-[8px] text-zinc-700 leading-none">▲</span>
          <span className="text-[8px] text-zinc-600 font-bold tracking-tighter mt-0.5">92.7</span>
        </div>
      </div>

      {/* DİNAMİK SİNYAL MONİTÖRÜ (OSİLOSKOP / WAVEFORM SIMULATION) */}
      <div className={`bg-black border border-zinc-900/80 p-3 rounded-md text-center mt-6 transition-all duration-75 relative overflow-hidden ${isGlitching ? 'skew-x-2 bg-zinc-900/10 border-amber-900/40' : ''}`}>
        <div className="absolute top-1 left-2 text-[7px] text-zinc-700 tracking-widest font-bold">SIGNAL WAVEFORM</div>
        
        {/* Basit CSS Sinyal Dalgası Simülasyonu */}
        <div className="h-4 flex items-center justify-center space-x-0.5 my-1.5 opacity-60">
          {[...Array(12)].map((_, i) => {
            // Sinyal durumuna göre barların yüksekliğini ayarla
            let h = "h-0.5";
            if (distance === 0) {
              h = i % 2 === 0 ? "h-3" : "h-1"; // Düzenli, temiz dalga
            } else if (distance <= 0.4) {
              h = Math.random() > 0.4 ? "h-4" : "h-1"; // Bozuk, zıplayan dalga
            } else {
              h = Math.random() > 0.8 ? "h-1.5" : "h-0.5"; // Düz cızırtı çizgisi
            }
            return (
              <div 
                key={i} 
                className={`w-1 transition-all duration-700 ${distance === 0 ? 'bg-emerald-500' : distance <= 0.4 ? 'bg-amber-600' : 'bg-zinc-800'} ${h}`}
              />
            );
          })}
        </div>

        <p className={`text-[11px] tracking-wide mt-2 font-bold ${signalColor}`}>
          {isGlitching ? '⚠️ STATIC BURST DETECTED' : signalStatus}
        </p>

        {distance === 0 && (
          <p className="text-[11px] text-zinc-400 italic mt-1.5 border-t border-zinc-900/50 pt-1.5 leading-relaxed animate-fade-in px-2">
            "...yardım... kimse var mı? B03 kapısı acil durum kodu..."
          </p>
        )}
      </div>
    </div>
  );
}