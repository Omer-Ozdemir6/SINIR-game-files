import { useState, useRef, useEffect } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";
import { t } from "../../i18n";

const mono = "'Courier New', ui-monospace, monospace";

const P = {
  hint: { fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "#5f7075", textAlign: "center", lineHeight: 1.7 },
  msgOk: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#4aa26a", textAlign: "center", minHeight: 15, fontWeight: 700 },
  msgBad: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c23b2e", textAlign: "center", minHeight: 15, fontWeight: 700 },
  ctrlRow: { display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap" },
};

export function MixOverlay({ config, onSuccess, onFail, onCancel }) {
  const [mix, setMix] = useState({});
  const [state, setState] = useState("idle"); // idle | fizz | done
  const [drips, setDrips] = useState([]);
  const bottles = config.bottles;
  const capacity = config.capacity || Object.values(config.target).reduce((a, b) => a + b, 0);
  const total = Object.values(mix).reduce((a, b) => a + b, 0);

  // Dynamic pH and Temp simulation (room defaults: pH 7.0, Temp 22.0°C)
  let pH = 7.0;
  let temp = 22.0;
  bottles.forEach((bt, idx) => {
    const count = mix[bt.id] || 0;
    if (idx === 0) {
      pH += count * -0.9;
      temp += count * 6.5;
    } else if (idx === 1) {
      pH += count * 0.45;
      temp += count * 3.8;
    } else {
      pH += count * 0.6;
      temp += count * 5.2;
    }
  });

  // Calculate target pH and Temp
  let targetPH = 7.0;
  let targetTemp = 22.0;
  bottles.forEach((bt, idx) => {
    const count = config.target[bt.id] || 0;
    if (idx === 0) {
      targetPH += count * -0.9;
      targetTemp += count * 6.5;
    } else if (idx === 1) {
      targetPH += count * 0.45;
      targetTemp += count * 3.8;
    } else {
      targetPH += count * 0.6;
      targetTemp += count * 5.2;
    }
  });

  const blend = () => {
    if (total === 0) return "#101a17";
    let r = 0, g = 0, b = 0;
    bottles.forEach((bt) => {
      const w = (mix[bt.id] || 0) / total;
      const c = bt.color.match(/\w\w/g).map((h) => parseInt(h, 16));
      r += c[0] * w; g += c[1] * w; b += c[2] * w;
    });
    return `rgb(${r | 0},${g | 0},${b | 0})`;
  };

  const add = (id, color) => {
    if (state !== "idle" || total >= capacity) return;
    
    // Spawn drop drip animation
    const dripId = Date.now() + Math.random();
    setDrips((prev) => [...prev, { id: dripId, color }]);
    setTimeout(() => {
      setDrips((prev) => prev.filter((d) => d.id !== dripId));
    }, 450);

    // Play high quality mechanical click / drop sound
    AudioSys.blipSfx(420 + Math.random() * 120);

    const next = { ...mix, [id]: (mix[id] || 0) + 1 };
    setMix(next);
    
    const tVal = Object.values(next).reduce((a, b) => a + b, 0);
    if (tVal >= capacity) {
      const ok = bottles.every((bt) => (next[bt.id] || 0) === (config.target[bt.id] || 0));
      if (ok) {
        setState("done");
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1200);
      } else {
        setState("fizz");
        // Buzz tone for fail
        try { AudioSys.buzzSfx(); } catch(e){}
        onFail(config.penalty || { akil: -5, text: t("puzzle.mixPenalty") });
        setTimeout(() => { setMix({}); setState("idle"); }, 1400);
      }
    }
  };

  const empty = () => {
    if (state !== "idle" || total === 0) return;
    AudioSys.blipSfx(300);
    setMix({});
  };

  const fillH = (total / capacity) * 96;
  const liquidY = 116 - (total / capacity) * 96;
  
  // Wavy liquid surface coordinates
  const liquidPath = total > 0
    ? `M 50 ${liquidY} Q 75 ${liquidY - 3} 100 ${liquidY} T 150 ${liquidY} L 150 125 L 50 125 Z`
    : `M 50 116 L 150 116 L 150 125 L 50 125 Z`;

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <style>{`
        @keyframes liquid-wave {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-4px) translateY(0.5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes bubble-rise {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-75px); opacity: 0; }
        }
        @keyframes drip-fall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(85px); opacity: 0.3; }
        }
        .chem-bubble {
          animation: bubble-rise 2.2s infinite ease-in;
        }
        .beaker-shake {
          animation: beaker-shake-anim 0.12s infinite;
        }
        @keyframes beaker-shake-anim {
          0% { transform: translate(1px, 1px); }
          20% { transform: translate(-2px, -1px); }
          40% { transform: translate(-1px, 2px); }
          60% { transform: translate(2px, 1px); }
          80% { transform: translate(-1px, -2px); }
          100% { transform: translate(1px, 1px); }
        }
      `}</style>

      <div style={{ ...S.keypadPanel, maxWidth: 460, width: "92%", padding: "16px 20px" }} className="s1-panel">
        <div style={{ ...S.keypadTitle, fontSize: 13, borderBottom: "1px solid rgba(100,160,220,0.25)", paddingBottom: 6 }}>
          {config.title || t("puzzle.mixTitle")}
        </div>

        {/* 2 Column Lab Layout */}
        <div style={{ display: "flex", gap: 20, width: "100%", alignItems: "center", justifyContent: "center", flexWrap: "wrap", margin: "14px 0" }}>
          
          {/* Beaker column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg
              viewBox="0 0 200 130"
              style={{ width: "100%", maxWidth: 175, overflow: "visible" }}
              className={state === "fizz" ? "beaker-shake" : ""}
            >
              <defs>
                <clipPath id="beaker-clip">
                  <path d="M 78 12 L 78 40 L 62 104 Q 60 116 72 116 L 128 116 Q 140 116 138 104 L 122 40 L 122 12 Z" />
                </clipPath>
                <mask id="liquid-mask">
                  <rect x="0" y="0" width="200" height="200" fill="black" />
                  <path d={liquidPath} fill="white" />
                </mask>
              </defs>

              {/* Beaker back depth ellipse lip */}
              <ellipse cx="100" cy="12" rx="22" ry="3" fill="none" stroke="rgba(100, 160, 220, 0.12)" strokeWidth="1.5" />
              
              {/* Liquid, Bubbles masked under the beaker limits */}
              <g clipPath="url(#beaker-clip)">
                {/* Background base fill */}
                <rect x="30" y="0" width="140" height="130" fill="rgba(10, 14, 20, 0.45)" />

                {/* Liquid */}
                <path
                  d={liquidPath}
                  fill={state === "fizz" ? "#c23b2e" : blend()}
                  opacity={state === "fizz" ? 0.9 : 0.8}
                  style={{
                    transition: "fill 300ms",
                    animation: total > 0 ? "liquid-wave 3s infinite ease-in-out" : "none",
                  }}
                />

                {/* Rising Bubbles inside the liquid */}
                <g mask="url(#liquid-mask)">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const bubbleX = 66 + i * 11 + Math.random() * 4;
                    const size = 1.2 + (i % 3) * 0.7;
                    const delay = i * 0.32;
                    return (
                      <circle
                        key={i}
                        cx={bubbleX}
                        cy="114"
                        r={size}
                        fill="rgba(255, 255, 255, 0.32)"
                        className="chem-bubble"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    );
                  })}
                </g>
              </g>

              {/* Beaker Glass Body outline */}
              <path
                d="M 78 12 L 78 40 L 62 104 Q 60 116 72 116 L 128 116 Q 140 116 138 104 L 122 40 L 122 12"
                fill="none"
                stroke="#688fa8"
                strokeWidth="2.5"
              />

              {/* Front lip ellipse overlay */}
              <ellipse cx="100" cy="12" rx="22" ry="3" fill="none" stroke="#9bc6e0" strokeWidth="1.5" />

              {/* Falling Drips */}
              {drips.map((drip) => (
                <circle
                  key={drip.id}
                  cx="100"
                  cy="15"
                  r="2.5"
                  fill={drip.color}
                  style={{
                    animation: "drip-fall 450ms forwards cubic-bezier(0.5, 0.05, 1, 0.5)"
                  }}
                />
              ))}

              {/* Scale measurement markings */}
              {Array.from({ length: capacity }).map((_, i) => {
                const markY = 112 - ((i + 1) / capacity) * 96;
                return (
                  <line
                    key={i}
                    x1="131"
                    x2="137"
                    y1={markY}
                    y2={markY}
                    stroke="rgba(100, 160, 220, 0.35)"
                    strokeWidth="1.2"
                  />
                );
              })}
            </svg>
            <div style={{ fontFamily: mono, fontSize: 10, color: "#7faac7", marginTop: 8, letterSpacing: "0.08em" }}>
              {total} / {capacity} ML
            </div>
          </div>

          {/* Real-time analytics panel */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 11,
            minWidth: 200, flex: 1, padding: "10px 14px",
            background: "rgba(6, 10, 14, 0.65)", border: "1px solid rgba(100, 160, 220, 0.2)",
            borderRadius: 6,
          }}>
            <div style={{ fontFamily: mono, fontSize: 9, color: "#4c606b", borderBottom: "1px solid rgba(100,160,220,0.2)", paddingBottom: 4, letterSpacing: "0.05em" }}>
              {t("puzzle.mixAnalysis") || "LABORATUVAR ANALİZİ (GERÇEK ZAMANLI)"}
            </div>

            {/* pH gauge */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, color: "#9bb0b8" }}>
                <span>{t("puzzle.mixPH") || "pH Seviyesi"}:</span>
                <span style={{ color: pH < 6.5 ? "#c27a3a" : pH > 7.5 ? "#4a8ac2" : "#4aa26a", fontWeight: 700 }}>
                  {pH.toFixed(2)} {pH < 6.5 ? `(${t("puzzle.mixAcid") || "ASİT"})` : pH > 7.5 ? `(${t("puzzle.mixBase") || "BAZ"})` : `(${t("puzzle.mixNeutral") || "NÖTR"})`}
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginTop: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: `${((targetPH - 3) / 8) * 100}%`, width: 2, height: "100%", background: "#ffffff", zIndex: 2 }} />
                <div style={{
                  width: `${Math.min(100, Math.max(0, ((pH - 3) / 8) * 100))}%`,
                  height: "100%",
                  background: `linear-gradient(to right, #a23a3a, #4aa26a, #4a6ac2)`,
                  transition: "width 350ms",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 8, color: "#475963", marginTop: 2 }}>
                <span>pH 3.0</span>
                <span>{t("puzzle.mixTarget") || "Hedef"}: {targetPH.toFixed(2)}</span>
                <span>pH 11.0</span>
              </div>
            </div>

            {/* Temperature gauge */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, color: "#9bb0b8" }}>
                <span>{t("puzzle.mixTemp") || "Sıcaklık"}:</span>
                <span style={{ color: temp > 40 ? "#c23b2e" : "#5b8eb8", fontWeight: 700 }}>
                  {temp.toFixed(1)} °C
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginTop: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: `${((targetTemp - 15) / 50) * 100}%`, width: 2, height: "100%", background: "#ffffff", zIndex: 2 }} />
                <div style={{
                  width: `${Math.min(100, Math.max(0, ((temp - 15) / 50) * 100))}%`,
                  height: "100%",
                  background: temp > 40 ? "#c23b2e" : "#5185ab",
                  boxShadow: temp > 40 ? "0 0 6px rgba(194,59,46,0.6)" : "none",
                  transition: "width 350ms, background 350ms",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 8, color: "#475963", marginTop: 2 }}>
                <span>15.0 °C</span>
                <span>{t("puzzle.mixTarget") || "Hedef"}: {targetTemp.toFixed(1)}°C</span>
                <span>65.0 °C</span>
              </div>
            </div>

            {/* Reaction report */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 8, color: "#475963" }}>{t("puzzle.mixReaction") || "REAKSİYON DURUMU"}:</div>
              <div style={{
                fontFamily: mono, fontSize: 9, color: state === "fizz" ? "#c23b2e" : state === "done" ? "#4aa26a" : "#7faac7",
                background: "rgba(0,0,0,0.3)", padding: "4px 8px", borderRadius: 4, marginTop: 2, letterSpacing: "0.02em"
              }}>
                {state === "fizz" ? (t("puzzle.mixFizz") || "⚠️ REAKSİYON BAŞARISIZ — KARIŞIM TEPKİDİ") : state === "done" ? (t("puzzle.mixDone") || "✓ KARIŞIM KARARLI — SENTEZ TAMAMLANDI") : total > 0 ? "REAKTİF KARIŞIM AKTİF..." : "BEKLEMEDE (NUMUNE EKLEYİN)"}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div style={P.ctrlRow}>
          {bottles.map((bt) => (
            <button
              key={bt.id}
              className="s1-btn s1-key"
              style={{
                ...S.keyBtn,
                borderColor: bt.color,
                color: "#dfe8ec",
                minWidth: 80,
                boxShadow: `0 0 8px ${bt.color}33`,
              }}
              onClick={() => add(bt.id, bt.color)}
            >
              {bt.label} +1 <span style={{ color: bt.color }}>({mix[bt.id] || 0})</span>
            </button>
          ))}
          <button className="s1-btn s1-key" style={S.keyAlt} onClick={empty}>
            {t("puzzle.mixEmpty")}
          </button>
        </div>

        {/* Dynamic Status / Hint Output */}
        <div style={{ margin: "10px 0 6px", minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={state === "done" ? P.msgOk : state === "fizz" ? P.msgBad : P.hint}>
            {state === "done" ? t("puzzle.mixDone")
              : state === "fizz" ? t("puzzle.mixFizz")
              : t("puzzle.mixHint")}
          </div>
        </div>

        {state !== "done" && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>
            {t("puzzle.cancel")}
          </button>
        )}
      </div>
    </div>
  );
}
