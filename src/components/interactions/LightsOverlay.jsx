import React, { useState, useEffect } from 'react';
import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";
import { AudioSys } from "../../audio/AudioSys";

// Global ses motoru tetikleyicileri
const playSwitchSound = () => {
  AudioSys.uiClick();
};

const playResetSound = () => {
  AudioSys.clank();
};

export default function LightsOverlay({ lights, done, onPress, onReset, onCancel }) {
  const [isGlitching, setIsGlitching] = useState(false);

  // Oyuncu bir düğmeye her bastığında kısa bir voltaj dalgalanması efekti yaratır
  const handlePress = (index) => {
    if (done) return;
    playSwitchSound();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 80);
    onPress(index);
  };

  const handleReset = () => {
    playResetSound();
    onReset();
  };

  // Bulmaca çözüldüğünde başarı sesi tetiklemesi
  useEffect(() => {
    if (done) {
      AudioSys.objectiveSfx();
    }
  }, [done]);

  return (
    <div 
      style={S.overlayDim} 
      onPointerDown={(e) => e.stopPropagation()}
      className="backdrop-blur-sm bg-black/60 flex items-center justify-center transition-all duration-300"
    >
      <div 
        style={S.keypadPanel} 
        className={`s1-panel max-w-sm bg-zinc-950 border-2 border-zinc-900 p-6 rounded-xl font-mono shadow-[0_0_40px_rgba(0,0,0,0.95)] transition-all relative overflow-hidden ${
          isGlitching ? 'skew-x-1 brightness-150 border-amber-900/40 bg-zinc-900/10' : ''
        }`}
      >
        {/* CRT Tarama Çizgileri */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20"></div>

        {/* BAŞLIK: DEVRE PANELİ GÖSTERGESİ */}
        <div 
          style={S.keypadTitle}
          className={`text-xs font-bold tracking-widest uppercase border-b border-zinc-900 pb-2 mb-4 flex justify-between items-center ${
            done ? 'text-emerald-500' : 'text-amber-600'
          }`}
        >
          <span>⚡ {t("lights.title")}</span>
          <span className="text-[8px] text-zinc-600 font-normal">SYS_RELAY_v2</span>
        </div>

        {/* SİGORTA LAMBALARI (FUSE LAMPS) */}
        <div 
          style={S.lightsRow}
          className="flex justify-center space-x-3 my-6 bg-black/40 border border-zinc-900/60 p-4 rounded-md"
        >
          {lights.map((on, i) => (
            <div 
              key={i} 
              style={{
                ...S.lamp,
                // Eğer bitti ise kararlı yeşil, aksi halde yanma durumuna göre titreyen turuncu/amber/siyah
                backgroundColor: done ? "#10b981" : on ? "#f59e0b" : "#111",
                boxShadow: done 
                  ? "0 0 16px #10b981" 
                  : on 
                  ? "0 0 14px rgba(245,158,11,0.6), inset 0 0 4px rgba(255,255,255,0.2)" 
                  : "inset 0 0 8px rgba(0,0,0,0.9)",
              }}
              className={`w-6 h-6 rounded-full border-2 border-zinc-900 transition-all duration-200 ${
                on && !done ? 'animate-pulse' : ''
              }`}
            />
          ))}
        </div>

        {/* İPUCU METNİ */}
        <div 
          style={S.lightsHintText}
          className="text-[10px] text-zinc-500 text-center uppercase tracking-wider mb-4 leading-normal select-none"
        >
          {t("lights.hint")}
        </div>

        {/* INTERAKTİF ŞALTER DÜĞMELERİ */}
        <div 
          style={S.lightsRow}
          className="flex justify-center space-x-3 mb-6"
        >
          {lights.map((_, i) => (
            <button 
              key={i} 
              disabled={done}
              className="s1-btn s1-key group w-10 h-10 border-2 border-zinc-800 rounded bg-zinc-900 font-black text-xs text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center shadow-md" 
              style={{
                ...S.lightBtn,
                // Özel durum buton tasarımları
                background: 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',
              }}
              onClick={() => handlePress(i)}
            >
              <span className="group-active:translate-y-0.5 transition-transform">{i + 1}</span>
            </button>
          ))}
        </div>

        {/* BAŞARI DURUMU */}
        {done && (
          <div 
            style={S.radioLockText}
            className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs font-bold py-2 rounded text-center mb-4 tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            ✓ {t("lights.done")}
          </div>
        )}

        {/* KONTROL BUTONLARI (RESET & CANCEL) */}
        <div 
          style={{ display: "flex", gap: 14 }}
          className="w-full mt-2"
        >
          <button 
            className="s1-btn s1-menuitem flex-1 bg-zinc-900/60 border border-zinc-800 p-2 text-xs font-bold text-zinc-500 rounded hover:bg-zinc-800 hover:text-zinc-300 transition-colors" 
            style={S.menuClose} 
            onClick={handleReset}
          >
            {t("lights.reset")}
          </button>
          <button 
            className="s1-btn s1-menuitem flex-1 bg-zinc-900/60 border border-zinc-800 p-2 text-xs font-bold text-zinc-500 rounded hover:bg-zinc-800 hover:text-zinc-300 transition-colors" 
            style={S.menuClose} 
            onClick={onCancel}
          >
            {t("lights.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
