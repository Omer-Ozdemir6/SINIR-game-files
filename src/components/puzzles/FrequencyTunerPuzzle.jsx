import React, { useState, useEffect } from 'react';

// Not: Projendeki global ses yöneticisini (AudioManager) buraya import edebilirsin.
// Şimdilik window.audioManager veya doğrudan fonksiyonel tetikleme yapabileceğini varsayıyoruz.
const playClickSound = () => {
  if (window.audioManager && window.audioManager.uiClick) {
    window.audioManager.uiClick();
  }
};

const playTuneSound = (freq) => {
  if (window.audioManager && window.audioManager.blipSfx) {
    window.audioManager.blipSfx(freq);
  }
};

export default function FrequencyTunerPuzzle({ config, onSuccess }) {
  const { target, tolerance, startFrequency, endFrequency, rewardText } = config;

  const [currentFreq, setCurrentFreq] = useState(startFrequency);
  const [signalStrength, setSignalStrength] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // 1. Frekans Değişimi, Sinyal Gücü Hesaplama ve Parazit (Static) Seviyesi Yönetimi
  useEffect(() => {
    const distance = Math.abs(currentFreq - target);
    
    // İnce ayar hissi için mesafe çarpanını biraz daha hassaslaştırdık
    let strength = Math.max(0, 100 - Math.floor(distance * 40));
    
    if (distance <= tolerance) {
      strength = 100;
    }
    
    setSignalStrength(strength);

    // Oyuncu hedeften uzaklaştıkça arkadaki parazit (static) sesini artır
    // Hedef %100 yakalandığında parazit tamamen sıfırlanır.
    if (window.audioManager && window.audioManager.staticLevel) {
      const staticVolume = (100 - strength) / 100;
      window.audioManager.staticLevel(staticVolume * 0.4); // Maksimum %40 parazit sesi
    }

    if (strength === 100) {
      setIsLocked(true);
      if (window.audioManager && window.audioManager.objectiveSfx) {
        window.audioManager.objectiveSfx(); // Kilitlenme anında telsiz sinyali
      }
    } else {
      setIsLocked(false);
      setLockTimer(0);
    }
  }, [currentFreq, target, tolerance]);

  // 2. Sinyal Yakalandığında Rastgele Ekran ve Ses Glitch'leri Çıkarma (Telsiz Bozulması)
  useEffect(() => {
    if (signalStrength >= 80 && signalStrength < 100) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.6) {
          setIsGlitching(true);
          if (window.audioManager && window.audioManager.burst) {
            window.audioManager.burst(120); // Ses motorundaki parazit patlamasını tetikle
          }
          setTimeout(() => setIsGlitching(false), 100);
        }
      }, 500);
      return () => clearInterval(glitchInterval);
    }
  }, [signalStrength]);

  // 3. Telsizi Sabitleme ve Kilitleme Sayacı (Lock-on mekanizması)
  useEffect(() => {
    let interval;
    if (isLocked) {
      interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Başarılı olduğunda static gürültüyü tamamen kes
            if (window.audioManager && window.audioManager.staticLevel) {
              window.audioManager.staticLevel(0);
            }
            setTimeout(() => onSuccess(), 1200);
            return 100;
          }
          // Düzenli aralıklarla kalp atışına benzer derin bir mekanik çıt sesi ver
          if (prev % 30 === 0 && window.audioManager && window.audioManager.blipSfx) {
            window.audioManager.blipSfx(60); 
          }
          return prev + 10;
        });
      }, 150);
    }
  }, [isLocked, onSuccess]);

  // Buton Fonksiyonu (Analog potansiyometre çevirme hissi için ses frekansını dinamik verir)
  const tune = (amount) => {
    playClickSound();
    setCurrentFreq((prev) => {
      const next = prev + amount;
      const bounded = Math.max(startFrequency, Math.min(endFrequency, parseFloat(next.toFixed(1))));
      
      // Frekansı yükseltirken sesi de hafif tize, düşürürken basa çekerek gerçek radyo hissi veriyoruz
      const soundFreq = bounded > prev ? 140 : 90;
      playTuneSound(soundFreq);

      return bounded;
    });
  };

  return (
    <div className="w-full max-w-md bg-zinc-950 border-2 border-zinc-900 p-6 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.95)] font-mono my-4 select-none relative overflow-hidden">
      {/* Cam Ekran Tarama Çizgisi Efekti (Scanlines) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-40"></div>

      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4 relative z-10">
        <span className="text-xs text-emerald-600 font-bold tracking-widest uppercase flex items-center gap-1">
          <span className={`inline-block w-2 h-2 rounded-full ${signalStrength === 100 ? 'bg-emerald-500 animate-ping' : 'bg-amber-600'}`}></span>
          REC-LINK TERMINAL v4.5
        </span>
        <span className="text-[9px] text-zinc-600 tracking-wider">FREQ_MODE: MANUAL</span>
      </div>

      {/* ANA ANALOG EKRAN */}
      <div className={`bg-black border border-zinc-900 p-5 rounded transition-all duration-75 relative overflow-hidden z-10 ${isGlitching ? 'skew-x-3 translate-y-0.5 border-emerald-900/50 bg-zinc-900/20' : ''}`}>
        <div className="absolute top-1 left-2 text-[8px] text-zinc-700 tracking-widest">MONITOR FEED</div>
        
        {/* Dijital Frekans Numarası */}
        <div className={`text-4xl font-sans font-black tracking-widest text-center my-2 transition-colors duration-150 ${signalStrength === 100 ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'text-emerald-700/80'}`}>
          {currentFreq.toFixed(1)} <span className="text-sm text-emerald-900 font-mono font-normal">MHz</span>
        </div>

        {/* Sinyal Gücü Çubuğu */}
        <div className="w-full bg-zinc-950 h-3 rounded overflow-hidden mt-4 border border-zinc-900 p-0.5">
          <div 
            className={`h-full transition-all duration-150 rounded-sm ${signalStrength === 100 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-700/70'}`}
            style={{ width: `${signalStrength}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[9px] text-zinc-600 mt-2 font-bold tracking-tight">
          <span>SIGNAL: {signalStrength}%</span>
          {signalStrength === 100 ? (
            <span className="text-emerald-400 animate-pulse">[ FEED SECURED ]</span>
          ) : signalStrength >= 80 ? (
            <span className="text-amber-500 animate-pulse">[ COMLINK DISTORTION ]</span>
          ) : (
            <span className="text-zinc-700">[ NO CARRIER ]</span>
          )}
        </div>
      </div>

      {/* DEŞİFRE METİN ALANI / SES SES SİNYAL DURUMU */}
      <div className="min-h-[60px] bg-black/40 border border-zinc-900 p-3 rounded-md my-4 flex items-center justify-center relative z-10">
        {signalStrength === 100 ? (
          <p className="text-xs text-emerald-300 font-medium tracking-wide text-center leading-relaxed animate-fade-in">
            {rewardText}
          </p>
        ) : signalStrength >= 85 ? (
          <p className="text-xs text-zinc-500 italic tracking-wide text-center select-none">
            {isGlitching ? "..KRRR_X__.." : "...para--zi--...ya--dım...--kod..."}
          </p>
        ) : (
          <p className="text-[10px] text-zinc-800 tracking-widest text-center select-none font-bold animate-pulse">
            [ STATIC NOISE BURST ]
          </p>
        )}
      </div>

      {/* KİLİTLENME İLERLEME ÇUBUĞU */}
      <div className="h-1.5 w-full bg-zinc-950 rounded overflow-hidden mb-4 relative z-10 border border-zinc-900">
        {isLocked && (
          <div className="h-full bg-emerald-500 shadow-[0_0_6px_#10b981] transition-all" style={{ width: `${lockTimer}%` }}></div>
        )}
      </div>

      {/* ANALOG AYAR BUTONLARI */}
      <div className="grid grid-cols-4 gap-2 mt-2 relative z-10">
        <button 
          onClick={() => tune(-1.0)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900/60 border border-zinc-800/80 p-2.5 text-[11px] font-bold text-zinc-500 rounded hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30 active:scale-95 transition-all shadow-inner"
        >
          &lt;&lt; -1.0
        </button>
        <button 
          onClick={() => tune(-0.1)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2.5 text-[11px] font-black text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-30 active:scale-95 transition-all"
        >
          &lt; -0.1
        </button>
        <button 
          onClick={() => tune(0.1)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900 border border-zinc-800 p-2.5 text-[11px] font-black text-zinc-200 rounded hover:bg-zinc-800 hover:text-white disabled:opacity-30 active:scale-95 transition-all"
        >
          +0.1 &gt;
        </button>
        <button 
          onClick={() => tune(1.0)} 
          disabled={lockTimer > 0}
          className="bg-zinc-900/60 border border-zinc-800/80 p-2.5 text-[11px] font-bold text-zinc-500 rounded hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30 active:scale-95 transition-all shadow-inner"
        >
          +1.0 &gt;&gt;
        </button>
      </div>
    </div>
  );
}
