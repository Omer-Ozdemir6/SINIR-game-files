import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

const mono = "'Courier New', ui-monospace, monospace";

const pct = (freq) => ((freq - 410) / 40) * 100;

export default function RadioOverlay({ freq, target = 432, phase, signal, lock = 0, hint, glitchFx, onAdjust }) {
  const needle = Math.max(0, Math.min(100, pct(freq)));
  const targetMark = Math.max(0, Math.min(100, pct(target)));
  const targetGlow = phase === "lock";

  const knob = (label, delta, strong) => (
    <button
      className="s1-btn"
      onClick={() => onAdjust(delta)}
      style={{
        width: strong ? 74 : 58,
        height: strong ? 56 : 48,
        borderRadius: "50%",
        border: "2px solid #4a5148",
        background: "radial-gradient(circle at 36% 28%, #7a7565, #2b2c27 58%, #080908 100%)",
        boxShadow: "inset 0 0 12px rgba(0,0,0,0.9), 0 8px 18px rgba(0,0,0,0.45)",
        color: "#d7d0b8",
        fontFamily: mono,
        fontSize: strong ? 12 : 10,
        letterSpacing: "0.08em",
        cursor: phase === "cut" ? "default" : "pointer",
        opacity: phase === "cut" ? 0.55 : 1,
      }}
      disabled={phase === "cut"}
    >
      {label}
    </button>
  );

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{
        ...S.radioPanel,
        width: "100vw",
        height: "100vh",
        maxWidth: "none",
        maxHeight: "none",
        borderRadius: 0,
        backgroundColor: "#111411",
        backgroundImage: [
          "linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 36px)",
          "linear-gradient(180deg, rgba(70,75,64,0.34), rgba(5,7,7,0.96))",
          "radial-gradient(ellipse at 52% 0%, rgba(150,130,78,0.16), rgba(0,0,0,0) 58%)",
        ].join(", "),
        border: "none",
        boxShadow: "inset 0 0 45px rgba(0,0,0,0.72)",
        padding: "24px 16px",
      }} className={"s1-panel" + (phase === "cut" && glitchFx ? " s1-glitch" : "")}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 400, alignItems: "center", gap: 16, margin: "auto" }}>
          <div style={S.keypadTitle}>{t("radio.title")}</div>

          <div style={{
            border: "2px solid #30372f",
            background: "linear-gradient(180deg, #171d1b, #050706)",
            padding: "14px 14px 16px",
            boxShadow: "inset 0 0 22px rgba(0,0,0,0.85)",
            width: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              fontFamily: mono,
              color: targetGlow ? "#d8ead8" : "#b9c5b9",
              fontSize: 34,
              letterSpacing: "0.08em",
              textAlign: "center",
              textShadow: targetGlow ? "0 0 14px rgba(140,210,150,0.45)" : "0 0 8px rgba(120,150,120,0.25)",
            }}>
              {freq.toFixed(1)} <span style={{ fontSize: 13, color: "#78877c" }}>MHz</span>
            </div>

            <div style={{
              position: "relative",
              height: 66,
              marginTop: 12,
              border: "1px solid #525a60",
              background: "linear-gradient(180deg, #d8cfad, #7f765a)",
              boxShadow: "inset 0 0 18px rgba(0,0,0,0.65)",
              overflow: "hidden",
            }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: `${(i / 8) * 100}%`,
                  top: 22,
                  bottom: 8,
                  width: 1,
                  background: "#2c2a22",
                  opacity: i % 2 === 0 ? 0.9 : 0.5,
                }} />
              ))}
              <div style={{
                position: "absolute",
                left: `${needle}%`,
                top: 4,
                bottom: 5,
                width: 3,
                background: phase === "cut" ? "#9a3328" : targetGlow ? "#7f9eb5" : "#211f18",
                boxShadow: targetGlow ? "0 0 10px rgba(127,174,134,0.75)" : "0 0 8px rgba(0,0,0,0.5)",
                transition: "left 160ms ease",
              }} />

              {phase === "transmit" && (
                <div style={{
                  position: "absolute",
                  left: `${targetMark}%`,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "#4aa26a",
                  opacity: 0.8,
                }} />
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: mono, color: "#788277", marginTop: 8 }}>
              <span>410.0</span>
              <span>{t("radio.signal")}: {Math.round(signal * 100)}%</span>
              <span>450.0</span>
            </div>
          </div>

          <div style={S.radioSignalRow}>
            <span style={{ fontSize: 9, color: "#505851", fontFamily: mono }}>{t("radio.noise")}:</span>
            <div style={S.radioSignalTrack}>
              <div style={{
                ...S.radioSignalFill,
                width: `${Math.round(lock * 100)}%`,
                backgroundColor: lock > 0.85 ? "#4aa26a" : lock > 0.4 ? "#d8a441" : "#c23b2e",
                boxShadow: lock > 0.85 ? "0 0 10px rgba(74,162,106,0.5)" : "none",
              }} />
            </div>
          </div>

          <div style={{ ...S.radioHint, color: targetGlow ? "#dfeae1" : "#5d6b5e" }}>
            {hint || t("radio.hint")}
          </div>

          <div style={{ display: "flex", gap: 14, width: "100%", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {knob("-1.0", -1, true)}
              {knob("-0.1", -0.1, false)}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {knob("+0.1", 0.1, false)}
              {knob("+1.0", 1, true)}
            </div>
          </div>

          {phase === "lock" && <div style={{ ...S.radioLockText, width: "100%" }}>{t("radio.locked")}</div>}
          {phase === "cut" && <div style={{ ...S.radioLockText, width: "100%", color: "#c23b2e" }}>{t("radio.cut")}</div>}
          {phase === "transmit" && <div style={{ ...S.radioLockText, width: "100%", color: "#7f9eb5" }}>{t("radio.transmit")}</div>}

          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4, width: "100%" }} onClick={onCancel}>
            {t("radio.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
