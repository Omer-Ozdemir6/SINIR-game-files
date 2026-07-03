import { styles as S } from "../../styles/theme";

/* Telsiz konsolu: frekans ayarı, sinyal barı, frekansa göre ipuçları */
export default function RadioOverlay({ freq, phase, signal, hint, glitchFx, onAdjust }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.radioPanel} className={"s1-panel" + (phase === "cut" && glitchFx ? " s1-glitch" : "")}>
        <div style={S.keypadTitle}>TELSİZ KONSOLU — ACİL DURUM BANDI</div>
        <div style={S.radioFreqDisplay}>
          {freq.toFixed(1)} <span style={S.radioMhz}>MHz</span>
        </div>
        <div style={S.radioSignalRow}>
          <span style={S.statLabel}>SİNYAL</span>
          <div style={S.radioSignalTrack}>
            <div style={{
              ...S.radioSignalFill,
              width: (phase === "cut" ? 0 : signal) + "%",
              backgroundColor: signal > 85 ? "#7fae86" : signal > 50 ? "#c79a52" : "#5f7573",
            }} />
          </div>
        </div>
        <div style={{
          ...S.radioHint,
          color: phase === "cut" ? "#c23b2e" : phase === "lock" ? "#7fae86" : "#8a9a97",
        }}>
          {hint}
        </div>
        <div style={S.radioButtons}>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => onAdjust(-1)}>−1.0</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => onAdjust(-0.1)}>−0.1</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => onAdjust(0.1)}>+0.1</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => onAdjust(1)}>+1.0</button>
        </div>
        {phase === "lock" && <div style={S.radioLockText}>SİNYAL KİLİTLENDİ — BAĞLANTI KURULUYOR…</div>}
        {phase === "cut" && <div style={{ ...S.radioLockText, color: "#c23b2e" }}>HAT FİZİKSEL OLARAK KESİLDİ</div>}
      </div>
    </div>
  );
}
