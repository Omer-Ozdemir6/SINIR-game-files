import { styles as S } from "../../styles/theme";

/* Lights-Out devre bulmacası: her buton kendisi + komşularını değiştirir */
export default function LightsOverlay({ lights, done, onPress, onReset, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>DEVRE PANELİ — TÜM LAMBALARI YAK</div>
        <div style={S.lightsRow}>
          {lights.map((on, i) => (
            <div key={i} style={{
              ...S.lamp,
              backgroundColor: on ? "#e8d98a" : "#161610",
              boxShadow: on ? "0 0 14px rgba(232,217,138,0.7)" : "inset 0 0 6px rgba(0,0,0,0.8)",
            }} />
          ))}
        </div>
        <div style={S.lightsHintText}>Her buton kendisiyle birlikte komşularını da değiştirir.</div>
        <div style={S.lightsRow}>
          {lights.map((_, i) => (
            <button key={i} className="s1-btn s1-key" style={S.lightBtn} onClick={() => onPress(i)}>
              {i + 1}
            </button>
          ))}
        </div>
        {done && <div style={S.radioLockText}>DEVRE TAMAM — KİLİT AÇILIYOR…</div>}
        <div style={{ display: "flex", gap: 14 }}>
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onReset}>Sıfırla</button>
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>Vazgeç</button>
        </div>
      </div>
    </div>
  );
}
