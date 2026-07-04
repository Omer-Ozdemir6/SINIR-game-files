import { useState } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";
import { t } from "../../i18n";

const mono = "'Courier New', ui-monospace, monospace";

const P = {
  hint: { fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "#5f7573", textAlign: "center", lineHeight: 1.7 },
  msgOk: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#7fae86", textAlign: "center", minHeight: 15 },
  msgBad: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c23b2e", textAlign: "center", minHeight: 15 },
  ctrlRow: { display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap" },
};

/* ============================================================
   3) KİMYASAL KARIŞIM — Nevin'in laboratuvarı (RE7 serum mantığı)
   Üç özütten, tarifteki ölçülerle kaba damlat. Kap dolduğunda
   oran yanlışsa karışım TEPKİR: kap boşalır, ceza yazılır.
   Tarif oyuncuya döküman/bilmece ile verilir.
   config: { bottles:[{id,label,color}], target:{id:count},
             capacity? (toplam), penalty? }
   ============================================================ */

export function MixOverlay({ config, onSuccess, onFail, onCancel }) {
  const [mix, setMix] = useState({});
  const [state, setState] = useState("idle"); // idle | fizz | done
  const bottles = config.bottles;
  const capacity = config.capacity || Object.values(config.target).reduce((a, b) => a + b, 0);
  const total = Object.values(mix).reduce((a, b) => a + b, 0);

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

  const add = (id) => {
    if (state !== "idle" || total >= capacity) return;
    AudioSys.blipSfx(420 + Math.random() * 120);
    const next = { ...mix, [id]: (mix[id] || 0) + 1 };
    setMix(next);
    const t = Object.values(next).reduce((a, b) => a + b, 0);
    if (t >= capacity) {
      const ok = bottles.every((bt) => (next[bt.id] || 0) === (config.target[bt.id] || 0));
      if (ok) {
        setState("done");
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1200);
      } else {
        setState("fizz");
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

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.mixTitle")}</div>
        <svg viewBox="0 0 200 130" style={{ width: "100%", maxWidth: 230 }}>
          {/* kap */}
          <path d="M 78 12 L 78 40 L 62 104 Q 60 116 72 116 L 128 116 Q 140 116 138 104 L 122 40 L 122 12"
            fill="none" stroke="#3f6a5e" strokeWidth="2.5" />
          <rect x="63" y={112 - fillH} width="74" height={fillH} rx="3"
            fill={state === "fizz" ? "#c23b2e" : blend()}
            opacity={state === "fizz" ? 0.85 : 0.8}
            style={{ transition: "height 300ms, y 300ms, fill 300ms" }} />
          {state === "fizz" && (
            <text x="100" y="70" textAnchor="middle" fontFamily={mono} fontSize="12" fill="#f0d0c0">✶ ✶ ✶</text>
          )}
          {/* ölçek çizgileri */}
          {Array.from({ length: capacity }).map((_, i) => (
            <line key={i} x1="140" x2="148" y1={112 - ((i + 1) / capacity) * 96} y2={112 - ((i + 1) / capacity) * 96}
              stroke="#2a4a42" strokeWidth="1.5" />
          ))}
          <text x="158" y="70" fontFamily={mono} fontSize="9" fill="#5f7573">{total}/{capacity}</text>
        </svg>
        <div style={P.ctrlRow}>
          {bottles.map((bt) => (
            <button key={bt.id} className="s1-btn s1-key"
              style={{ ...S.keyBtn, borderColor: bt.color, color: "#d8e4dc", minWidth: 74 }}
              onClick={() => add(bt.id)}>
              {bt.label} +1 <span style={{ color: bt.color }}>({mix[bt.id] || 0})</span>
            </button>
          ))}
          <button className="s1-btn s1-key" style={S.keyAlt} onClick={empty}>{t("puzzle.mixEmpty")}</button>
        </div>
        <div style={state === "done" ? P.msgOk : state === "fizz" ? P.msgBad : P.hint}>
          {state === "done" ? t("puzzle.mixDone")
            : state === "fizz" ? t("puzzle.mixFizz")
            : t("puzzle.mixHint")}
        </div>
        {state !== "done" && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}
