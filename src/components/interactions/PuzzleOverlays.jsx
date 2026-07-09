import { useState, useRef, useEffect } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";
import { t } from "../../i18n";

/* ============================================================
   SINIR-1 â€” BULMACA BÄ°LEÅENLERÄ° v2
   Hepsi kendi durumunu tutar; dÄ±ÅŸ kancalar: onSuccess / onFail / onCancel.
   Story kullanÄ±mÄ±: interaction: { kind, ...config, success, cancel }

   KINDS:
   Â· shadow    â€” iki parÃ§alÄ± gÃ¶lgeyi duvar iziyle hizala
   Â· wires     â€” kablolarÄ± doÄŸru portlara baÄŸla (devre yamasÄ±)
   Â· symbols   â€” dÃ¶kÃ¼mandaki sembolleri doÄŸru SIRAYLA bas (RE8 Ã§an kilidi)
   Â· rings     â€” renkli halkalarÄ± Ã§evirip vitrayÄ± bÃ¼tÃ¼nleÅŸtir (RE8 cam)
   Â· tiles     â€” karolarÄ±n yerini deÄŸiÅŸtirip deseni tamamla (karo kapÄ±sÄ±)
   Â· colorgrid â€” hÃ¼cre renklerini dÃ¶ndÃ¼rÃ¼p ÅŸemayÄ± eÅŸle (renk panosu)
   ============================================================ */

const mono = "'Courier New', ui-monospace, monospace";

const P = {
  hint: { fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "#5f7075", textAlign: "center", lineHeight: 1.7 },
  msgOk: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#7f9eb5", textAlign: "center", minHeight: 15 },
  msgBad: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c23b2e", textAlign: "center", minHeight: 15 },
  ctrlRow: { display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap" },
};

const puzzlePanel = {
  ...S.keypadPanel,
  backgroundColor: "#120f0b",
  backgroundImage: [
    "linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 42px)",
    "linear-gradient(180deg, rgba(60,38,22,0.5), rgba(6,8,7,0.96))",
    "radial-gradient(ellipse at 50% 0%, rgba(120,92,52,0.28), rgba(0,0,0,0) 55%)",
  ].join(", "),
  border: "1px solid #4a3524",
  boxShadow: "0 24px 70px rgba(0,0,0,0.82), inset 0 0 0 1px rgba(210,170,95,0.08)",
};

const puzzleFace = {
  backgroundColor: "#1a140f",
  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 34px), linear-gradient(180deg, rgba(84,55,32,0.45), rgba(11,12,10,0.9))",
  border: "2px solid #3f2c1d",
  boxShadow: "inset 0 0 18px rgba(0,0,0,0.85), 0 10px 26px rgba(0,0,0,0.45)",
};

const near = (a, b, tol) => Math.abs(((a - b) % 360 + 540) % 360 - 180) <= tol;

/* ============================================================
   1) GÃ–LGE HÄ°ZALAMA v3 â€” nesne HER YÃ–NE dÃ¶ner.
   ÃœÃ§ eksen: DÃ–NDÃœR (Z), EÄ (X â€” dikey basÄ±klÄ±k), YATIR (Y â€” yatay
   basÄ±klÄ±k). SÃ¶zde-3B: eÄŸimler silÃ¼eti cos ile sÄ±kÄ±ÅŸtÄ±rÄ±r; yanlÄ±ÅŸ
   eksende doÄŸru gÃ¶rÃ¼ntÃ¼ Ä°MKANSIZ olur. YeÅŸil ipucu YOK â€” gÃ¶z kararÄ±.
   config: { targetRot, targetTiltX, targetTiltY, step?15,
             startRot?, startTiltX?, startTiltY? }
   ============================================================ */

const TILT_MAX = 75;
const rad = (d) => (d * Math.PI) / 180;

/* ------------------------------------------------------------
   3D GÃ–LGE NESNESÄ° â€” "kalÄ±ntÄ±".
   Nesne 3B Ã§izgi segmentlerinden oluÅŸur. Oyuncu iki eksende
   dÃ¶ndÃ¼rÃ¼r (yaw = yatay, pitch = dikey). Her aÃ§Ä±da nesnenin
   2B izdÃ¼ÅŸÃ¼mÃ¼ (gÃ¶lgesi) FARKLI gÃ¶rÃ¼nÃ¼r.
   DoÄŸru aÃ§Ä± Ã§iftinde gÃ¶lge hedef silÃ¼ete oturur â†’ kilit.

   Nesne: PERISHED evrenine ait deforme bir kalÄ±ntÄ±. DoÄŸru aÃ§Ä±da
   gÃ¶lgesi BULUNTU'NUN Ä°ÅARETÄ°'ne (dairesel sonar + merkez gÃ¶z +
   yayÄ±lan kollar) benzer.
   ------------------------------------------------------------ */

// 3B nokta [x,y,z]; segment = [i,j] iki nokta indexi
// KalÄ±ntÄ±nÄ±n dÃ¼ÄŸÃ¼m noktalarÄ± (Buluntu iÅŸareti doÄŸru aÃ§Ä±da belirir)
const OBJ_NODES = [
  [0, -70, 10],    // 0: Haç üst ucu
  [0, 70, -15],    // 1: Haç alt ucu
  [-45, -15, -20],  // 2: Yatay sol uç
  [45, -15, 20],   // 3: Yatay sağ uç
  [-25, -15, -12], // 4: Çember sol orta (r=25)
  [0, -40, 18],    // 5: Çember üst (r=25)
  [25, -15, -18],  // 6: Çember sağ orta (r=25)
  [0, 10, 12],     // 7: Çember alt (r=25)
  [-18, -33, -15], // 8: Çember sol-üst
  [18, -33, 15],   // 9: Çember sağ-üst
  [18, 3, -15],    // 10: Çember sağ-alt
  [-18, 3, 15],    // 11: Çember sol-alt
];
const OBJ_EDGES = [
  [0, 1],          // Dikey gövde çizgisi
  [2, 3],          // Yatay kol çizgisi
  [4, 8], [8, 5], [5, 9], [9, 6], [6, 10], [10, 7], [7, 11], [11, 4] // Hüzme dairesi (Halo çemberi)
];


// nokta bulutunu yaw/pitch ile dÃ¶ndÃ¼r ve 2B'ye izdÃ¼ÅŸÃ¼r (ortografik)
function project(nodes, yawDeg, pitchDeg) {
  const cy = Math.cos(rad(yawDeg)), sy = Math.sin(rad(yawDeg));
  const cx = Math.cos(rad(pitchDeg)), sx = Math.sin(rad(pitchDeg));
  return nodes.map(([x, y, z]) => {
    // yaw: Y ekseni etrafÄ±nda (x,z dÃ¶ner)
    let x1 = x * cy + z * sy;
    let z1 = -x * sy + z * cy;
    // pitch: X ekseni etrafÄ±nda (y,z dÃ¶ner)
    let y1 = y * cx - z1 * sx;
    // ortografik: (x1, y1) ekrana dÃ¼ÅŸer
    return [x1, y1];
  });
}

// bir aÃ§Ä± Ã§iftindeki gÃ¶lgeyi SVG path'e Ã§evir (segmentleri kalÄ±n Ã§izgi olarak)
function shadowPath(pts2d) {
  return OBJ_EDGES.map(([a, b]) => {
    const [ax, ay] = pts2d[a], [bx, by] = pts2d[b];
    return `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }).join(" ");
}

export function ShadowOverlay({ config, onSuccess, onFail, onCancel }) {
  const step = config.step || 10;
  const tol = config.tol ?? 6;                        // derece toleransÄ±
  const targetYaw = config.targetYaw ?? 0;
  const targetPitch = config.targetPitch ?? 0;
  const [yaw, setYaw] = useState(config.startYaw ?? 130);
  const [pitch, setPitch] = useState(config.startPitch ?? -55);
  const [locked, setLocked] = useState(false);

  const dragRef = useRef({ active: false, startX: 0, startY: 0, startYaw: 0, startPitch: 0 });
  const lastSoundRef = useRef(0);

  const angNear = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180) <= tol;
  const check = (yw, pt) => angNear(yw, targetYaw) && angNear(pt, targetPitch);

  // hedef gÃ¶lge (sabit, hafif ipucu olarak arkada)
  const targetPts = project(OBJ_NODES, targetYaw, targetPitch);
  const targetD = shadowPath(targetPts);
  // gÃ¼ncel gÃ¶lge
  const curPts = project(OBJ_NODES, yaw, pitch);
  const curD = shadowPath(curPts);

  // ne kadar yakÄ±nÄ±z (0..1) â†’ yaklaÅŸtÄ±kÃ§a gÃ¶lge parlar
  const dist = Math.min(1,
    (Math.abs(((yaw - targetYaw) % 360 + 540) % 360 - 180) +
     Math.abs(((pitch - targetPitch) % 360 + 540) % 360 - 180)) / 180);
  const glow = locked ? 1 : Math.max(0, 1 - dist);
  const precision = Math.round(glow * 100);

  const move = (axis, dir) => {
    if (locked) return;
    AudioSys.clank();
    let yw = yaw, pt = pitch;
    if (axis === "yaw") yw = (yw + dir * step) % 360;
    if (axis === "pitch") pt = Math.max(-TILT_MAX, Math.min(TILT_MAX, pt + dir * step));
    if (yw < 0) yw += 360;
    setYaw(yw); setPitch(pt);
    if (check(yw, pt)) {
      setLocked(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1400);
    }
  };

  const handlePointerDown = (e) => {
    if (locked) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startYaw: yaw,
      startPitch: pitch,
      active: true,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active || locked) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    let newYaw = (dragRef.current.startYaw + dx * 0.48) % 360;
    if (newYaw < 0) newYaw += 360;
    let newPitch = Math.max(-TILT_MAX, Math.min(TILT_MAX, dragRef.current.startPitch - dy * 0.48));
    
    setYaw(newYaw);
    setPitch(newPitch);

    const now = performance.now();
    if (now - lastSoundRef.current > 160) {
      AudioSys.blipSfx(380 + Math.random() * 80);
      lastSoundRef.current = now;
    }

    if (check(newYaw, newPitch)) {
      setLocked(true);
      dragRef.current.active = false;
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1400);
    }
  };

  const handlePointerUp = (e) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const shadowWallBg = locked
    ? "radial-gradient(ellipse at center, #183e44 0%, #061517 72%, #020608 100%)"
    : `radial-gradient(ellipse at center, rgba(${Math.round(48 + glow * 50)}, ${Math.round(62 + glow * 98)}, ${Math.round(68 + glow * 148)}, 0.9) 0%, #071013 70%, #020405 100%)`;

  const customPanel = {
    ...puzzlePanel,
    backgroundColor: "#070c10",
    backgroundImage: [
      "linear-gradient(90deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 42px)",
      "linear-gradient(180deg, rgba(16,28,40,0.45), rgba(4,6,8,0.98))",
      "radial-gradient(ellipse at 50% 0%, rgba(100,160,220,0.18), rgba(0,0,0,0) 58%)",
    ].join(", "),
    border: "1px solid rgba(100, 160, 220, 0.25)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(100,160,220,0.05)",
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={customPanel} className="s1-panel">
        <div style={{ ...S.keypadTitle, borderBottom: "1px solid rgba(100,160,220,0.25)", paddingBottom: 6 }}>
          {config.title || t("puzzle.shadowTitle")}
        </div>

        {/* Drag to rotate target zone */}
        <svg
          viewBox="0 0 420 210"
          style={{ width: "100%", maxWidth: 430, cursor: locked ? "default" : "grab", overflow: "visible" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <defs>
            <linearGradient id="s1-shadow-frame" x1="0" x2="1">
              <stop offset="0%" stopColor="#2c3a44" />
              <stop offset="42%" stopColor="#12181d" />
              <stop offset="100%" stopColor="#3c505e" />
            </linearGradient>
            <linearGradient id="s1-relic-block" x1="0" x2="1">
              <stop offset="0%" stopColor="#2c4256" />
              <stop offset="48%" stopColor="#182c3c" />
              <stop offset="100%" stopColor="#3c5870" />
            </linearGradient>
            <filter id="s1-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>
          </defs>

          {/* Dynamic Light projector wall bg */}
          <rect x="0" y="0" width="420" height="210" fill="none" style={{ fill: shadowWallBg, transition: "fill 300ms" }} />

          {/* Spotlight beams */}
          <path d="M236 48 L360 32 L360 176 L236 160 Z" fill="#b0ccdb" opacity={locked ? 0.22 : 0.08 + glow * 0.08} />
          <path d="M222 70 L360 42 L360 166 L222 140 Z" fill="#9dbcdb" opacity={0.05 + glow * 0.05} />

          {/* Shadow Canvas box */}
          <g transform="translate(22 40)">
            <rect x="0" y="0" width="164" height="118" fill="url(#s1-shadow-frame)" />
            <rect x="9" y="9" width="146" height="100" fill="#18242c" />
            <rect x="13" y="13" width="138" height="92" fill="#0f161c" opacity="0.82" />
            
            {/* Background wireframe grids for laboratory scan feedback */}
            <path d="M18 90 C48 58 84 82 146 36" fill="none" stroke="#253844" strokeWidth="1.5" opacity="0.32" />
            <path d="M20 70 C48 44 70 64 92 48 C112 34 130 44 146 24" fill="none" stroke="#1c2d3a" strokeWidth="1" opacity="0.25" />

            <g transform="translate(82 59) scale(0.62)">
              {/* Target Outline Shadow (Hint) */}
              <path d={targetD} fill="none"
                stroke="#0e171c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
                filter="url(#s1-soft-shadow)"
                opacity={locked ? 0.12 : config.showTarget ? 0.38 : 0.15} />

              {/* Dynamic Relic Shadow */}
              <path d={curD} fill="none"
                stroke={locked ? "#40a5b8" : `rgba(${Math.round(80 + glow * 80)}, ${Math.round(140 + glow * 80)}, ${Math.round(180 + glow * 75)}, 0.88)`}
                strokeWidth={locked ? 8 : 7}
                strokeLinecap="round" strokeLinejoin="round"
                style={{
                  transition: "d 120ms linear",
                  filter: glow > 0.45 ? `drop-shadow(0 0 ${glow * 6}px rgba(100,180,220,${0.3 + glow * 0.45}))` : "url(#s1-soft-shadow)",
                }} />
              {locked && <circle cx={curPts[0][0]} cy={curPts[0][1]} r="8" fill="#40a5b8" opacity="0.8" style={{ filter: "drop-shadow(0 0 4px #40a5b8)" }} />}
            </g>
          </g>

          {/* 3D Relic Hologram Preview */}
          <g transform="translate(308 105) scale(0.72)">
            <path d={curD} fill="none"
              stroke="#5885a0" strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter"
              opacity="0.95"
              style={{ filter: "drop-shadow(10px 10px 8px rgba(0,0,0,0.8))" }} />
            <path d={curD} fill="none"
              stroke="#1d2e3c" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"
              opacity="0.75" />
            
            {/* Relic node junctions */}
            {curPts.map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${(yaw + i * 23) % 360})`}>
                <rect x="-13" y="-8" width="26" height="16" rx="1.5"
                  fill="url(#s1-relic-block)" stroke="#2c4256" strokeWidth="1.4" />
                <line x1="-9" y1="0" x2="9" y2="0" stroke="#7faac7" strokeWidth="1" opacity="0.45" />
              </g>
            ))}
            <circle cx="0" cy="0" r="8" fill={locked ? "#5bf0e2" : "#243c50"} stroke="#80c0e0" strokeWidth="1.2" style={{ transition: "fill 300ms" }} />
          </g>

          {/* Light bulb/Projector lens mockup */}
          <circle cx="385" cy="105" r="19" fill="#1b2e3e" opacity="0.45" />
          <circle cx="385" cy="105" r="5" fill="#a0ccff" opacity="0.85" style={{ filter: "drop-shadow(0 0 6px #a0ccff)" }} />
          <rect x="0" y="0" width="420" height="210" fill="none" stroke="rgba(100,160,220,0.18)" strokeWidth="2" />
        </svg>

        {/* Dynamic lock status / Match percentage */}
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", padding: "0 16px", margin: "6px 0 10px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontFamily: mono, fontSize: 9, color: "#4c606b" }}>
              HÄ°ZALAMA KÄ°LÄ°DÄ° (ALIGNMENT MATRIX):
            </span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 120, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  width: `${precision}%`,
                  height: "100%",
                  background: locked ? "#40a5b8" : `linear-gradient(to right, #243c50, #5b8eb8, #5bf0e2)`,
                  transition: "width 150ms",
                }} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 10, color: locked ? "#40a5b8" : precision > 80 ? "#5bf0e2" : "#9bb0b8", fontWeight: 700 }}>
                {precision}% {locked ? "LOCKED" : precision > 80 ? "ALIGNING" : ""}
              </span>
            </div>
          </div>
          
          <div style={{ fontFamily: mono, fontSize: 10, color: "#5f7075", textAlign: "right" }}>
            YAW: {Math.round(yaw)}Â° | PIT: {Math.round(pitch)}Â°
          </div>
        </div>

        {/* Buttons Row (Accessibility / Arrow Fallbacks) */}
        <div style={P.ctrlRow}>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("yaw", -1)}>âŸ² {t("puzzle.rot")}</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("yaw", 1)}>{t("puzzle.rot")} âŸ³</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("pitch", -1)}>â–² {t("puzzle.tilt")}</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("pitch", 1)}>{t("puzzle.tilt")} â–¼</button>
        </div>

        <div style={{ minHeight: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 0" }}>
          <div style={locked ? P.msgOk : P.hint}>
            {locked ? t("puzzle.shadowDone") : t("puzzle.shadowHint")}
          </div>
        </div>

        {!locked && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   2) KABLO EÅLEÅTÄ°RME (v2) â€” yanlÄ±ÅŸ baÄŸlantÄ± artÄ±k KIRMIZI hat
   olarak bir an Ã§izilir, kÄ±vÄ±lcÄ±m sayacÄ± iÅŸler; dolu portlar
   kablosunun rengiyle yanar.
   config: { cables:[{id,label,color}], ports:[{id,label}],
             pairs:{cableId: portId}, penalty? }
   ============================================================ */

export function WiresOverlay({ config, onSuccess, onFail, onCancel }) {
  const [sel, setSel] = useState(null);
  const [conn, setConn] = useState({});
  const [spark, setSpark] = useState(null); // {ci, pi}
  const [errors, setErrors] = useState(0);
  const [done, setDone] = useState(false);
  const [dragPos, setDragPos] = useState(null); // { x, y } local coords

  const svgRef = useRef(null);
  const cables = config.cables;
  const ports = config.ports;
  const selectedCable = cables.find((c) => c.id === sel);

  const yOf = (i, n) => 34 + i * (150 / Math.max(1, n - 1));
  
  const wire = (ci, pi) =>
    `M 44 ${yOf(ci, cables.length)} C 120 ${yOf(ci, cables.length)}, 150 ${yOf(pi, ports.length)}, 214 ${yOf(pi, ports.length)}`;

  const dragWire = (ci, tx, ty) =>
    `M 44 ${yOf(ci, cables.length)} C ${(44 + tx) / 2} ${yOf(ci, cables.length)}, ${(44 + tx) / 2} ${ty}, ${tx} ${ty}`;

  const portOwner = (pid) => cables.find((c) => conn[c.id] === pid);

  const getSVGCoords = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 260;
    const y = ((e.clientY - rect.top) / rect.height) * 200;
    return { x, y };
  };

  const pickCable = (id) => {
    if (done || conn[id]) return;
    AudioSys.blipSfx(500);
    setSel(id === sel ? null : id);
    setDragPos(null);
  };

  const pickPort = (pid) => {
    if (done || !sel || portOwner(pid)) return;
    const ci = cables.findIndex((c) => c.id === sel);
    const pi = ports.findIndex((p) => p.id === pid);
    if (config.pairs[sel] === pid) {
      AudioSys.clank();
      const next = { ...conn, [sel]: pid };
      setConn(next);
      setSel(null);
      setDragPos(null);
      if (Object.keys(next).length === cables.length) {
        setDone(true);
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1000);
      }
    } else {
      setSpark({ ci, pi });
      setErrors((e) => e + 1);
      setSel(null);
      setDragPos(null);
      onFail(config.penalty || { gurultu: 4, text: t("puzzle.wiresSpark") });
      setTimeout(() => setSpark(null), 550);
    }
  };

  const handlePointerDown = (e, cid) => {
    if (done || conn[cid]) return;
    e.stopPropagation();
    setSel(cid);
    const coords = getSVGCoords(e);
    setDragPos(coords);
  };

  const handlePointerMove = (e) => {
    if (!sel || done) return;
    const coords = getSVGCoords(e);
    setDragPos(coords);
  };

  const handlePointerUp = (e) => {
    if (!sel || done) return;
    const coords = getSVGCoords(e);
    if (coords.x > 185 && coords.x < 255) {
      let closestPi = -1;
      let minDist = 9999;
      for (let i = 0; i < ports.length; i++) {
        const portY = yOf(i, ports.length);
        const dist = Math.abs(coords.y - portY);
        if (dist < minDist) {
          minDist = dist;
          closestPi = i;
        }
      }
      if (closestPi !== -1 && minDist < 24) {
        const targetPort = ports[closestPi];
        pickPort(targetPort.id);
        return;
      }
    }
    setSel(null);
    setDragPos(null);
  };

  const customPanel = {
    ...puzzlePanel,
    backgroundColor: "#060a0d",
    backgroundImage: [
      "linear-gradient(90deg, rgba(255,255,255,0.01) 0 1px, transparent 1px 30px)",
      "linear-gradient(180deg, rgba(14,24,35,0.4), rgba(3,4,6,0.99))",
      "radial-gradient(ellipse at 50% 0%, rgba(100,160,220,0.15), rgba(0,0,0,0) 60%)",
    ].join(", "),
    border: "1px solid rgba(100, 160, 220, 0.22)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(100,160,220,0.04)",
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <style>{`
        @keyframes flow-offset {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .wire-flow {
          stroke-dasharray: 6 5;
          animation: flow-offset 1.4s infinite linear;
        }
        @keyframes spark-burst-anim {
          0% { transform: scale(0.4); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .spark-shockwave {
          animation: spark-burst-anim 0.5s forwards ease-out;
        }
      `}</style>

      <div style={customPanel} className="s1-panel">
        <div style={{ ...S.keypadTitle, borderBottom: "1px solid rgba(100,160,220,0.22)", paddingBottom: 6 }}>
          {config.title || t("puzzle.wiresTitle")}
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 260 200"
          style={{ width: "100%", maxWidth: 280, cursor: sel ? "grabbing" : "default", overflow: "visible" }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <rect x="0" y="0" width="260" height="200" rx="6" fill="#04080b" stroke="#12222e" strokeWidth="1.5" />
          <line x1="44" y1="0" x2="44" y2="200" stroke="rgba(100,160,220,0.08)" strokeDasharray="3 3" />
          <line x1="214" y1="0" x2="214" y2="200" stroke="rgba(100,160,220,0.08)" strokeDasharray="3 3" />

          {Object.entries(conn).map(([cid, pid]) => {
            const ci = cables.findIndex((c) => c.id === cid);
            const pi = ports.findIndex((p) => p.id === pid);
            const color = cables[ci].color;
            return (
              <g key={cid}>
                <path d={wire(ci, pi)} fill="none" stroke={color} strokeWidth="5.5" opacity="0.18" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
                <path d={wire(ci, pi)} fill="none" stroke={color} strokeWidth="3" opacity="0.9" />
                <path d={wire(ci, pi)} fill="none" stroke="#ffffff" strokeWidth="1.8" className="wire-flow" opacity="0.75" />
              </g>
            );
          })}

          {spark && (
            <path d={wire(spark.ci, spark.pi)} fill="none"
              stroke="#e06a4a" strokeWidth="3.2" strokeDasharray="5 4" opacity="0.95" />
          )}

          {sel && dragPos && (
            <path
              d={dragWire(cables.findIndex((c) => c.id === sel), dragPos.x, dragPos.y)}
              fill="none"
              stroke={selectedCable.color}
              strokeWidth="2.8"
              strokeDasharray="5 3"
              opacity="0.88"
              style={{ filter: `drop-shadow(0 0 6px ${selectedCable.color})` }}
            />
          )}

          {sel && selectedCable && ports.map((p, pi) => {
            if (portOwner(p.id)) return null;
            const ci = cables.findIndex((c) => c.id === sel);
            const exact = config.pairs[sel] === p.id;
            return (
              <path key={`ghost-${p.id}`} d={wire(ci, pi)} fill="none"
                stroke={selectedCable.color}
                strokeWidth={exact ? 2.5 : 1.2}
                strokeDasharray={exact ? "none" : "4 6"}
                opacity={exact ? 0.38 : 0.08}
                style={{ filter: exact ? `drop-shadow(0 0 6px ${selectedCable.color})` : "none" }} />
            );
          })}

          {cables.map((c, i) => (
            <g
              key={c.id}
              onPointerDown={(e) => handlePointerDown(e, c.id)}
              onClick={() => pickCable(c.id)}
              style={{ cursor: conn[c.id] ? "default" : "grab" }}
            >
              <path d={`M8 ${yOf(i, cables.length) - 5} C16 ${yOf(i, cables.length) - 12}, 24 ${yOf(i, cables.length) - 12}, 38 ${yOf(i, cables.length) - 5} L38 ${yOf(i, cables.length) + 5} C24 ${yOf(i, cables.length) + 12}, 16 ${yOf(i, cables.length) + 12}, 8 ${yOf(i, cables.length) + 5} Z`}
                fill={conn[c.id] ? "#060c0e" : "#0d161c"}
                stroke={sel === c.id ? "#ffffff" : c.color}
                strokeWidth={sel === c.id ? 2.6 : 1.6}
                style={{ filter: sel === c.id ? `drop-shadow(0 0 4px ${c.color})` : "none" }}
              />
              <path d={`M13 ${yOf(i, cables.length)} H35 M18 ${yOf(i, cables.length) - 6} L18 ${yOf(i, cables.length) + 6} M26 ${yOf(i, cables.length) - 6} L26 ${yOf(i, cables.length) + 6}`}
                stroke={c.color} strokeWidth="1.8" opacity={conn[c.id] ? 0.25 : 0.95} strokeLinecap="round" />
              <text x="30" y={yOf(i, cables.length) + 26} textAnchor="middle"
                fontFamily={mono} fontSize="8" fill="#4c606b" opacity="0.8">{c.label}</text>
            </g>
          ))}

          {ports.map((p, i) => {
            const owner = portOwner(p.id);
            const sparking = spark && ports[spark.pi]?.id === p.id;
            const isCandidate = !!sel && !owner;
            const isExact = isCandidate && config.pairs[sel] === p.id;
            return (
              <g key={p.id} onClick={() => pickPort(p.id)} style={{ cursor: owner ? "default" : "pointer" }}>
                <rect x="212" y={yOf(i, ports.length) - 13} width="34" height="26" rx="3"
                  fill={sparking ? "#330b05" : owner ? "#050b0f" : isExact ? "#0e1a22" : isCandidate ? "#0a1014" : "#03070a"}
                  stroke={sparking ? "#e06a4a" : owner ? owner.color : isExact ? selectedCable.color : isCandidate ? "#5f7075" : "#1b3541"}
                  strokeWidth={isExact ? 2.6 : 1.6}
                  style={{
                    filter: isExact ? `drop-shadow(0 0 6px ${selectedCable.color})` : sparking ? "drop-shadow(0 0 8px #e06a4a)" : "none",
                    transition: "fill 200ms, stroke 200ms"
                  }} />
                <path d={`M219 ${yOf(i, ports.length) - 6} H239 M219 ${yOf(i, ports.length)} H239 M219 ${yOf(i, ports.length) + 6} H239`}
                  stroke={owner ? owner.color : isExact ? selectedCable.color : "#203642"}
                  strokeWidth="1.2" opacity="0.65" />
                {isCandidate && (
                  <circle cx="229" cy={yOf(i, ports.length)} r={isExact ? 16 : 13}
                    fill="none"
                    stroke={isExact ? selectedCable.color : "#5f7075"}
                    strokeWidth="1"
                    strokeDasharray={isExact ? "none" : "3 3"}
                    opacity={isExact ? 0.65 : 0.25} />
                )}
                <text x="229" y={yOf(i, ports.length) + 3} textAnchor="middle"
                  fontFamily={mono} fontSize={sparking ? "12" : "7.5"}
                  fill={sparking ? "#f0a060" : isExact ? "#ffffff" : "#637c8a"}>
                  {sparking ? "âš¡" : p.label}
                </text>
              </g>
            );
          })}

          {spark && (
            <g transform={`translate(229, ${yOf(spark.pi, ports.length)})`}>
              <circle cx="0" cy="0" r="18" fill="none" stroke="#e06a4a" strokeWidth="2.2" className="spark-shockwave" />
              {Array.from({ length: 8 }).map((_, idx) => {
                const angle = (idx * 45 * Math.PI) / 180;
                const x1 = Math.cos(angle) * 7;
                const y1 = Math.sin(angle) * 7;
                const x2 = Math.cos(angle) * 22;
                const y2 = Math.sin(angle) * 22;
                return (
                  <line
                    key={idx}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#e06a4a"
                    strokeWidth="1.5"
                    style={{ animation: "spark-burst-anim 0.5s forwards ease-out" }}
                  />
                );
              })}
            </g>
          )}

          {errors > 0 && !done && (
            <text x="10" y="192" fontFamily={mono} fontSize="8" fill="#c25844" fontWeight="bold">âš¡ VOLTAGE WARNING Ã—{errors}</text>
          )}
        </svg>

        <div style={{ minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" }}>
          <div style={done ? P.msgOk : P.hint}>
            {done ? t("puzzle.wiresDone") : sel ? t("puzzle.wiresHintPort") : t("puzzle.wiresHintPick")}
          </div>
        </div>

        {!done && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   3) SEMBOL KÄ°LÄ°DÄ° â€” RE8 Ã§an paneli: 8 iÅŸaret Ã§ember dizilir,
   dÃ¶kÃ¼mandaki semboller doÄŸru SIRAYLA basÄ±lÄ±r. YanlÄ±ÅŸ = dizi
   sÄ±fÄ±rlanÄ±r + ceza.
   config: { glyphs:["g1".."g8"] (dizilim), sequence:["g4","g1","g7"],
             penalty? }
   ============================================================ */

export const GLYPHS = {
  g1: "M20 7 A13 13 0 1 0 20.1 7 M20 13 A7 7 0 1 0 20.1 13 M20 20 V34 M14 28 H26",
  g2: "M9 20 H31 M20 9 V31 M13 13 L27 27 M27 13 L13 27",
  g3: "M12 10 C17 15 23 15 28 10 M12 20 C17 25 23 25 28 20 M12 30 C17 35 23 35 28 30",
  g4: "M20 8 L31 16 L27 31 L13 31 L9 16 Z M14 18 H26 M17 25 H23",
  g5: "M20 7 C10 15 11 27 20 34 C29 27 30 15 20 7 Z M15 21 H25",
  g6: "M8 28 C13 16 20 12 32 12 M10 28 C18 22 22 22 30 28 M20 12 V34",
  g7: "M11 11 H29 M14 16 H26 M17 21 H23 M14 26 H26 M11 31 H29",
  g8: "M20 8 V32 M12 16 C16 12 24 12 28 16 M12 24 C16 28 24 28",
}; // ihtiyaÃ§ olursa yeni iÅŸaretler buraya eklenir

export function SymbolsOverlay({ config, onSuccess, onFail, onCancel }) {
  const [progress, setProgress] = useState(0); // dizide kaÃ§ doÄŸru basÄ±ldÄ±
  const [flash, setFlash] = useState(null);    // {id, ok}
  const [done, setDone] = useState(false);
  const glyphs = config.glyphs;
  const seq = config.sequence;
  const litSet = new Set(seq.slice(0, progress));

  const press = (id) => {
    if (done) return;
    if (seq[progress] === id) {
      AudioSys.blipSfx(640 + progress * 90);
      setFlash({ id, ok: true });
      setTimeout(() => setFlash(null), 300);
      const next = progress + 1;
      setProgress(next);
      if (next >= seq.length) {
        setDone(true);
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1100);
      }
    } else {
      setFlash({ id, ok: false });
      setProgress(0);
      onFail(config.penalty || { gurultu: 3, text: t("puzzle.symbolsWrong") });
      setTimeout(() => setFlash(null), 450);
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={puzzlePanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.symbolsTitle")}</div>
        <svg viewBox="-112 -112 224 224" style={{ width: "100%", maxWidth: 270 }}>
          <defs>
            <radialGradient id="s1-brass-face" cx="45%" cy="35%" r="68%">
              <stop offset="0%" stopColor="#6f5b36" />
              <stop offset="58%" stopColor="#2c2418" />
              <stop offset="100%" stopColor="#100d09" />
            </radialGradient>
            <radialGradient id="s1-stone-button" cx="38%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#4c4a40" />
              <stop offset="62%" stopColor="#171812" />
              <stop offset="100%" stopColor="#090a08" />
            </radialGradient>
          </defs>
          <polygon points="0,-100 71,-71 100,0 71,71 0,100 -71,71 -100,0 -71,-71"
            fill="url(#s1-brass-face)" stroke="#6e5530" strokeWidth="4" />
          <polygon points="0,-91 64,-64 91,0 64,64 0,91 -64,64 -91,0 -64,-64"
            fill="none" stroke="rgba(230,190,105,0.2)" strokeWidth="2" />
          {glyphs.map((id, i) => {
            const ang = (i / glyphs.length) * Math.PI * 2 - Math.PI / 2;
            const cx = Math.cos(ang) * 68, cy = Math.sin(ang) * 68;
            const lit = litSet.has(id) && !done ? true : done;
            const fl = flash?.id === id;
            return (
              <g key={id} transform={`translate(${cx},${cy})`}
                onClick={() => press(id)} style={{ cursor: "pointer" }}>
                <circle r="27" fill="#0a0806" opacity="0.65" transform="translate(2,3)" />
                <circle r="25"
                  fill="url(#s1-stone-button)"
                  stroke={fl ? (flash.ok ? "#d8b34a" : "#d23b2e") : lit ? "#c8332a" : "#7b6844"}
                  strokeWidth={fl || lit ? 4 : 2.4}
                  style={{ transition: "stroke 200ms, fill 200ms" }} />
                {(lit || fl) && (
                  <circle r="28" fill="none"
                    stroke={fl && !flash.ok ? "#ff2b20" : "#c82018"}
                    strokeWidth="3.5" opacity="0.9" />
                )}
                <path d={GLYPHS[id]} fill="none"
                  stroke={lit || fl ? "#e5d08a" : "#9a885e"} strokeWidth="2.2"
                  strokeLinecap="round" transform="translate(-20,-20)" />
              </g>
            );
          })}
          <text x="0" y="5" textAnchor="middle" fontFamily={mono} fontSize="11"
            fill={done ? "#7f9eb5" : "#3f525a"}>
            {progress}/{seq.length}
          </text>
        </svg>
        <div style={done ? P.msgOk : flash && !flash.ok ? P.msgBad : P.hint}>
          {done ? t("puzzle.symbolsDone") : flash && !flash.ok ? t("puzzle.symbolsWrong") : t("puzzle.symbolsHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   4) VÄ°TRAY v2 â€” RE4 kilise camÄ±: halkalar CAM KIRIKLARI ve altÄ±n
   figÃ¼rÃ¼n PARÃ‡ALARINI taÅŸÄ±r. Ã‡entik/iÅŸaret YOK â€” figÃ¼r ancak Ã¼Ã§
   halka doÄŸru aÃ§Ä±lara gelince BÃœTÃœNLEÅÄ°R; oyuncu resme bakarak
   Ã§Ã¶zer. KÄ±rÄ±klar dÃ¶nerek gÃ¶rsel gÃ¼rÃ¼ltÃ¼ yaratÄ±r.
   config: { rings:[{color, step, offset}] } â€” offset: baÅŸlangÄ±cÄ±n
   hedeften sapmasÄ± (step'in katÄ± olmalÄ± ki Ã§Ã¶zÃ¼lebilsin).
   ============================================================ */

const GLASS_SHARDS = [
  // 1. Ä°Ã§ Halka: 8 ParÃ§a (YeÅŸil tonlarÄ± ve krem)
  ["#8ec5a0", "#e8e4d4", "#72ad87", "#8ec5a0", "#e8e4d4", "#619675", "#8ec5a0", "#e8e4d4"],
  // 2. Orta Halka: 10 ParÃ§a (Pembe tonlarÄ± ve krem)
  ["#d4a0a8", "#e8e4d4", "#be868f", "#d4a0a8", "#e8e4d4", "#a96f78", "#d4a0a8", "#e8e4d4", "#be868f", "#d4a0a8"],
  // 3. DÄ±ÅŸ Halka: 12 ParÃ§a (Lavanta/mor tonlarÄ± ve krem)
  ["#c4a4c8", "#e8e4d4", "#aa84b0", "#c4a4c8", "#e8e4d4", "#926899", "#c4a4c8", "#e8e4d4", "#aa84b0", "#c4a4c8", "#926899", "#e8e4d4"],
];

const wedge = (r0, r1, a0, a1) => {
  const p = (r, a) => `${r * Math.sin(rad(a))} ${-r * Math.cos(rad(a))}`;
  return `M ${p(r0, a0)} A ${r0} ${r0} 0 0 1 ${p(r0, a1)} L ${p(r1, a1)} A ${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
};

// Altın mühür parçaları (Uçları birbirine değen ve ortada çember oluşturan Sacred Sun/Key Sigil)
const FIGURE = [
  // İç: Merkez çember + 4 yöne uzanan kollar (r=16'dan r=38'e)
  [
    "M -16 0 A 16 16 0 1 1 16 0 A 16 16 0 1 1 -16 0 Z", // Merkez çember (Ortada çıkan şekil)
    "M 0 -16 V -38", // Üst kol
    "M 0 16 V 38",   // Alt kol
    "M -16 0 H -38", // Sol kol
    "M 16 0 H 38",   // Sağ kol
  ],
  // Orta: 4 yöne uzanan devam çizgileri (r=42'den r=68'e) ve bağlayıcı çember (r=55)
  [
    "M -55 0 A 55 55 0 1 1 55 0 A 55 55 0 1 1 -55 0 Z", // Bağlayıcı çember
    "M 0 -42 V -68", // Üst kol devamı
    "M 0 42 V 68",   // Alt kol devamı
    "M -42 0 H -68", // Sol kol devamı
    "M 42 0 H 68",   // Sağ kol devamı
  ],
  // Dış: 4 yöne uzanan uç çizgileri (r=72'den r=96'e) ve ok uçları
  [
    "M 0 -72 V -96 M -12 -86 L 0 -96 L 12 -86", // Üst uç + ok
    "M 0 72 V 96 M -12 86 L 0 96 L 12 86",     // Alt uç + ok
    "M -72 0 H -96 M -86 -12 L -96 0 L -86 12", // Sol uç + ok
    "M 72 0 H 96 M 86 -12 L 96 0 L 86 12",     // Sağ uç + ok
  ],
];

// Toz zerreleri iÃ§in rastgele koordinatlar
const DUST_PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  x: -80 + Math.random() * 160,
  y: -80 + Math.random() * 160,
  dx: -25 + Math.random() * 50,
  delay: i * 0.45,
  size: 1.2 + Math.random() * 2.2,
  duration: 4.5 + Math.random() * 3.5,
}));

export function RingsOverlay({ config, flags = {}, onSuccess, onFail, onCancel }) {
  const rings = config.rings;
  const radii = [[16, 38], [42, 68], [72, 96]];
  const [rots, setRots] = useState(rings.map((r) => r.offset)); // 0 = Ã§Ã¶zÃ¼m
  const [done, setDone] = useState(false);
  const pieces = config.pieces || [];
  const missing = pieces.filter((p) => !flags[p.flag]);
  
  const holeAt = (ring, shard) => missing.some((p) => p.ring === ring && p.shard === shard);
  const placedAt = (ring, shard) => pieces.some((p) => p.ring === ring && p.shard === shard && flags[p.flag]);
  const figHidden = (ring, k) => missing.some((p) => p.ring === ring && (p.fig ?? 0) === k);

  // Hizalama hesaplamasÄ± (yakÄ±nlÄ±k toleransÄ±)
  const normRot = (r) => ((r % 360) + 360) % 360;
  const isAligned = rots.every((r, j) => {
    const nr = normRot(r);
    const diff = Math.min(nr, 360 - nr);
    return diff <= Math.max(7, rings[j].step / 2 - 1);
  });

  // 0.0 (hizalanmamÄ±ÅŸ) ile 1.0 (tam hizalanmÄ±ÅŸ) arasÄ± yakÄ±nlÄ±k katsayÄ±sÄ±
  const getProximity = () => {
    const sumDiff = rots.reduce((sum, r) => {
      const nr = normRot(r);
      const diff = Math.min(nr, 360 - nr);
      return sum + diff;
    }, 0);
    return Math.max(0, 1 - sumDiff / 180); // 180 derecede 0, tam hizada 1.0
  };

  const proximity = getProximity();

  const rotate = (i) => {
    if (done) return;
    AudioSys.blipSfx(380 + i * 120);
    const next = rots.slice();
    // Sadece saat yÃ¶nÃ¼nde (clockwise-only) dÃ¶ndÃ¼rme
    next[i] = (next[i] + rings[i].step) % 360;
    setRots(next);

    const ok = next.every((r, j) => {
      const nr = normRot(r);
      const diff = Math.min(nr, 360 - nr);
      return diff <= Math.max(7, rings[j].step / 2 - 1);
    });

    if (ok && missing.length === 0) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 2200);
    } else if (ok && missing.length > 0) {
      AudioSys.buzzSfx(); // Cam eksikse kilit direnir
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <style>{`
        @keyframes dust-drift {
          0% { transform: translate(0, 0); opacity: 0; }
          12% { opacity: 0.38; }
          85% { opacity: 0.38; }
          100% { transform: translate(var(--dx), -115px); opacity: 0; }
        }
        @keyframes success-flash {
          0% { opacity: 0; }
          22% { opacity: 0.88; }
          100% { opacity: 0; }
        }
        .rosette-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 3px solid var(--border-color);
          background-color: var(--bg-color);
          color: #1a1510;
          cursor: pointer;
          padding: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.35);
          transition: transform 120ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 150ms;
        }
        .rosette-btn:hover {
          box-shadow: 0 0 15px var(--glow-color), inset 0 2px 4px rgba(255,255,255,0.45);
        }
        .rosette-btn:active {
          transform: scale(0.92);
        }
      `}</style>
      <div style={{
        ...puzzlePanel,
        backgroundColor: "#0d0906",
        backgroundImage: [
          "radial-gradient(ellipse at 50% 25%, rgba(85,60,40,0.22), rgba(0,0,0,0) 65%)",
          "linear-gradient(180deg, rgba(22,17,13,0.7), rgba(4,3,2,0.99))",
        ].join(", "),
        border: "1px solid #2b1f15",
        filter: done ? "brightness(1.15)" : "none",
        transition: "filter 1.8s ease-in-out",
      }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#a58b6f", letterSpacing: "0.14em" }}>
          {config.title || t("puzzle.ringsTitle")}
        </div>

        {/* === VÄ°TRAY SVG PANEL === */}
        <svg viewBox="-112 -112 224 224" style={{
          width: "100%", maxWidth: 286,
          filter: proximity > 0.8 && !done ? "drop-shadow(0 0 6px rgba(255,217,125,0.4))" : "none",
          transition: "filter 300ms",
        }}>
          <defs>
            <radialGradient id="s1-glass-back" cx="47%" cy="44%" r="64%">
              <stop offset="0%" stopColor="#f3efd9" stopOpacity="0.48" />
              <stop offset="60%" stopColor="#3d4f40" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#050807" stopOpacity="0.98" />
            </radialGradient>
          </defs>

          {/* DÄ±ÅŸ ahÅŸap/taÅŸ plaket dairesi */}
          <circle r="108" fill="#140f0b" />
          <circle r="103" fill="#2d2218" stroke="#4f3e2d" strokeWidth="4.5" />

          {/* 24 adet taÅŸ gravÃ¼r Ã§izgisi */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line key={`eng-${i}`}
                x1={103 * Math.sin(rad(angle))} y1={-103 * Math.cos(rad(angle))}
                x2={108 * Math.sin(rad(angle))} y2={-108 * Math.cos(rad(angle))}
                stroke="#1c140d" strokeWidth="2.5" />
            );
          })}

          <circle r="96" fill="url(#s1-glass-back)" stroke="#0c0e0b" strokeWidth="2.8" />

          {/* IÅŸÄ±k kÄ±rÄ±lÄ±m Ä±ÅŸÄ±nlarÄ± (HizalandÄ±kÃ§a parlar) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <line key={`ray-${i}`}
                x1="0" y1="0"
                x2={120 * Math.sin(rad(angle))} y2={-120 * Math.cos(rad(angle))}
                stroke="#ffd97d" strokeWidth="0.8" opacity={proximity * 0.22}
                style={{ transition: "opacity 300ms" }} />
            );
          })}

          {/* CAM HALKALAR & ALTIN FÄ°GÃœRLER */}
          {rings.map((r, i) => {
            const [r0, r1] = radii[i];
            const shards = GLASS_SHARDS[i % GLASS_SHARDS.length];
            const n = shards.length;
            return (
              <g key={i} style={{ transition: "transform 320ms ease" }} transform={`rotate(${rots[i]})`}>
                {shards.map((c, k) => {
                  const hole = holeAt(i, k);
                  const placed = placedAt(i, k);
                  return (
                    <path key={k}
                      d={wedge(r1, r0, (k / n) * 360 + (k % 3) * 4, ((k + 1) / n) * 360 - (k % 2) * 5)}
                      fill={hole ? "#040605" : c}
                      opacity={hole ? 0.98 : done ? 0.8 : 0.44}
                      stroke={hole ? "#242c23" : placed ? "#e8c95a" : "#131713"}
                      strokeWidth={placed ? 2.5 : 1.8}
                      strokeDasharray={hole ? "4 3" : "none"}
                      style={{ transition: "fill 300ms, stroke 300ms, opacity 300ms" }}
                    />
                  );
                })}
                {/* AltÄ±n MÃ¼hÃ¼r ParÃ§asÄ± */}
                {FIGURE[i].map((d, k) => {
                  if (figHidden(i, k)) return null;
                  const isClosed = d.endsWith("Z") || d.endsWith("z");
                  return (
                    <path key={"f" + k}
                      d={d}
                      fill={isClosed ? "rgba(255,217,125,0.22)" : "none"}
                      stroke={done ? "#e8c95a" : "#c8a94a"}
                      strokeWidth={done ? 4.5 : 3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "stroke 400ms, stroke-width 400ms",
                        filter: done ? "drop-shadow(0 0 8px rgba(255,217,125,0.85))" : proximity > 0.75 ? "drop-shadow(0 0 4px rgba(255,217,125,0.45))" : "none",
                      }}
                      opacity={done ? 1 : 0.85 + proximity * 0.15}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* BÃ¶lme/KurÅŸun Halka SÄ±nÄ±rlarÄ± */}
          <circle r="38" fill="none" stroke="rgba(12,15,11,0.72)" strokeWidth="2" />
          <circle r="68" fill="none" stroke="rgba(12,15,11,0.72)" strokeWidth="2" />
          <circle r="96" fill="none" stroke="rgba(12,15,11,0.82)" strokeWidth="2.5" />

          {/* Havada sÃ¼zÃ¼len toz zerreleri */}
          {!done && DUST_PARTICLES.map((p, idx) => (
            <circle
              key={`dust-${idx}`}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill="#ffffff"
              style={{
                opacity: 0,
                animation: `dust-drift ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
                pointerEvents: "none",
                "--dx": `${p.dx}px`,
              }}
            />
          ))}

          {/* Ã‡Ã¶zÃ¼m AltÄ±n FlaÅŸ Overlay */}
          {done && <circle r="100" fill="#ffd97d" style={{ animation: "success-flash 2.2s ease-out forwards" }} />}
        </svg>

        {/* === ROZET BUTONLAR (Ã‡iÃ§ek SVG desenli) === */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginTop: 12,
          marginBottom: 6
        }}>
          {rings.map((r, i) => {
            const styles = [
              { border: "#5e9470", bg: "#8ec5a0", glow: "rgba(142,197,160,0.6)" }, // YeÅŸil (Ä°Ã‡)
              { border: "#a8727a", bg: "#d4a0a8", glow: "rgba(212,160,168,0.6)" }, // Pembe (ORTA)
              { border: "#98749a", bg: "#c4a4c8", glow: "rgba(196,164,200,0.6)" }, // Mor (DIÅ)
            ][i];

            return (
              <button
                key={i}
                className="rosette-btn"
                style={{
                  "--border-color": styles.border,
                  "--bg-color": styles.bg,
                  "--glow-color": styles.glow,
                }}
                onClick={() => rotate(i)}
                disabled={done}
                title={r.label || "DÃ¶ndÃ¼r"}
              >
                {/* Rozet iÃ§i SVG Ã§iÃ§ek deseni */}
                <svg viewBox="0 0 64 64" style={{ width: "100%", height: "100%", display: "block" }}>
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(26,21,16,0.3)" strokeWidth="1.5" />
                  {/* 8 petal yapraÄŸÄ± deseni */}
                  {Array.from({ length: 8 }).map((_, pIdx) => {
                    const angle = pIdx * 45;
                    return (
                      <path
                        key={pIdx}
                        d="M 32 32 C 27 12, 37 12, 32 32"
                        transform={`rotate(${angle} 32 32)`}
                        fill="rgba(26,21,16,0.72)"
                      />
                    );
                  })}
                  {/* Merkez mÃ¼cevher noktasÄ± */}
                  <circle cx="32" cy="32" r="5" fill="#ffffff" stroke="#1a1510" strokeWidth="1.5" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Durum metni */}
        <div style={done ? P.msgOk : isAligned && missing.length > 0 ? P.msgBad : P.hint}>
          {done ? t("puzzle.ringsDone")
            : isAligned && missing.length > 0 ? t("puzzle.ringsMissing", { n: missing.length })
            : t("puzzle.ringsHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   5) KARO KAPISI â€” karÄ±ÅŸmÄ±ÅŸ karolarÄ± ikiÅŸer ikiÅŸer deÄŸiÅŸtirerek
   bÃ¼yÃ¼k deseni tamamla (dÃ¶kÃ¼mandaki bilgi doÄŸru dizilimi anlatÄ±r).
   config: { scramble:[2,0,1,...] (baÅŸlangÄ±Ã§ permÃ¼tasyonu, 9 eleman) }
   Desen tek bÃ¼yÃ¼k SVG'dir; her karo kendi doÄŸru penceresini gÃ¶sterir.
   ============================================================ */

const TILE_ART = [
  // Arka Plandaki Gotik Kemer (Crypt Arch)
  { d: "M 15 110 V 50 A 45 45 0 0 1 105 50 V 110", stroke: "#5a4835", strokeWidth: 2.2, fill: "none" },
  { d: "M 20 110 V 52 A 40 40 0 0 1 100 52 V 110", stroke: "#2e2217", strokeWidth: 1, fill: "none" },

  // Sol ve Sağ Şeytani Yarasa Kanatları (Bat Wings extending across outer tiles)
  { d: "M 38 48 C 10 30, 5 62, 35 72 C 24 62, 24 52, 38 48 Z", fill: "#241a12", stroke: "#120d09", strokeWidth: 1.5 },
  { d: "M 82 48 C 110 30, 115 62, 85 72 C 96 62, 96 52, 82 48 Z", fill: "#241a12", stroke: "#120d09", strokeWidth: 1.5 },
  
  // Şeytani Boynuzlar (Left and right curved horns)
  { d: "M 46 36 C 30 18, 18 38, 36 48 C 38 44, 32 28, 46 36 Z", fill: "#423224", stroke: "#1c140c", strokeWidth: 1.2 },
  { d: "M 74 36 C 90 18, 102 38, 84 48 C 82 44, 88 28, 74 36 Z", fill: "#423224", stroke: "#1c140c", strokeWidth: 1.2 },

  // Kuru Kafa Kemik Gövdesi (Skull core)
  { d: "M 44 40 Q 60 22, 76 40 C 79 50, 73 66, 73 76 L 47 76 C 47 66, 41 50, 44 40 Z", fill: "#dcd6c8", stroke: "#3d3324", strokeWidth: 2 },
  
  // Çene ve Dişler
  { d: "M 50 76 V 84 H 70 V 76 M 54 76 V 84 M 58 76 V 84 M 62 76 V 84 M 66 76 V 84", stroke: "#3d3324", strokeWidth: 1.5, fill: "none" },

  // Burun deliği (Nasal cavity)
  { d: "M 58 58 L 60 52 L 62 58 Z", fill: "#1c0d02", stroke: "#3d3324", strokeWidth: 0.8 },

  // Ürkütücü Boş Göz Çukurları (Hollow creepy eyes - çözülünce kırmızı parlar)
  { d: "M 48 48 Q 54 44, 58 48 Q 54 53, 48 48 Z", fill: "#1a0802", stroke: "#4a0a0a", strokeWidth: 1, glow: "#d0021b", isEye: true },
  { d: "M 62 48 Q 66 44, 72 48 Q 66 53, 62 48 Z", fill: "#1a0802", stroke: "#4a0a0a", strokeWidth: 1, glow: "#d0021b", isEye: true },
];

export function TilesOverlay({ config, onSuccess, onFail, onCancel }) {
  const n = 3;
  const [perm, setPerm] = useState(config.scramble || [8, 6, 7, 2, 5, 4, 3, 0, 1]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const [moves, setMoves] = useState(0);

  const tap = (pos) => {
    if (done) return;
    if (sel === null) {
      AudioSys.blipSfx(500);
      setSel(pos);
      return;
    }
    if (sel === pos) {
      setSel(null);
      return;
    }
    
    AudioSys.clank();
    const next = perm.slice();
    [next[sel], next[pos]] = [next[pos], next[sel]];
    setPerm(next);
    setSel(null);
    setMoves((m) => m + 1);

    if (next.every((v, i) => v === i)) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1800);
    }
  };

  const correctCount = perm.filter((v, i) => v === i).length;

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <style>{`
        @keyframes eye-pulse {
          0%, 100% { fill: #1a0802; filter: drop-shadow(0 0 1px rgba(208,2,27,0.3)); }
          50% { fill: #d0021b; filter: drop-shadow(0 0 6px rgba(208,2,27,0.95)); }
        }
        @keyframes tile-solve-flash {
          0% { filter: brightness(1) contrast(1); }
          30% { filter: brightness(1.4) contrast(1.1) drop-shadow(0 0 12px rgba(200,169,74,0.7)); }
          100% { filter: brightness(1.08) contrast(1.02); }
        }
      `}</style>
      <div style={{
        ...puzzlePanel,
        backgroundColor: "#0d0a08",
        backgroundImage: [
          "radial-gradient(ellipse at 50% 25%, rgba(75,55,35,0.25), rgba(0,0,0,0) 65%)",
          "linear-gradient(180deg, rgba(24,18,14,0.75), rgba(4,3,2,0.98))",
        ].join(", "),
        border: "1px solid #332418",
        maxWidth: 320,
        animation: done ? "tile-solve-flash 1.8s ease-out forwards" : "none",
      }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#9a836a", letterSpacing: "0.14em" }}>
          {config.title || t("puzzle.tilesTitle")}
        </div>

        {/* Moves & Correct count tracker */}
        <div style={{
          fontFamily: mono, fontSize: 9, color: "#6a5c4e",
          letterSpacing: "0.12em", textAlign: "center", marginBottom: 8,
        }}>
          HAMLE: {moves} &nbsp;|&nbsp; DOĞRU KONUM: {correctCount}/9
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 4,
          width: "100%", maxWidth: 240, padding: 8,
          backgroundColor: "#16100c", border: "3px solid #281d15",
          boxShadow: "inset 0 0 16px rgba(0,0,0,0.85)",
          borderRadius: 4,
          margin: "0 auto",
        }}>
          {perm.map((tile, pos) => {
            const tx = (tile % n) * 40, ty = Math.floor(tile / n) * 40;
            const right = tile === pos;
            return (
              <div key={pos} onClick={() => tap(pos)} style={{
                aspectRatio: "1", cursor: "pointer", borderRadius: 2,
                backgroundColor: "#2c2117",
                outline: sel === pos ? "2.5px solid #d4b850" : right && !done ? "1px solid rgba(212,184,80,0.3)" : "1px solid #140d08",
                overflow: "hidden", transition: "outline 150ms, transform 150ms",
                transform: sel === pos ? "translateY(-2px)" : "none",
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
                opacity: done ? 1 : 0.94,
              }}>
                <svg viewBox={`${tx} ${ty} 40 40`} style={{ width: "100%", height: "100%", display: "block", background: "radial-gradient(circle at center, #1b120c, #0c0805)" }}>
                  {/* Gravür arkaplan taş doku çizgileri */}
                  <rect x={tx} y={ty} width="40" height="40" fill="none" stroke="#0e0804" strokeWidth="0.8" opacity="0.35" />
                  
                  {/* Master gothic eye paths */}
                  {TILE_ART.map((item, i) => {
                    const strokeColor = done && item.glow ? item.glow : item.stroke;
                    return (
                      <path
                        key={i}
                        d={item.d}
                        fill={item.fill || "none"}
                        stroke={strokeColor}
                        strokeWidth={item.strokeWidth}
                        strokeLinecap="round"
                        style={{
                          transition: "stroke 600ms, filter 600ms",
                          filter: done && item.glow ? `drop-shadow(0 0 4px ${item.glow})` : "none",
                          animation: item.isEye && done ? "eye-pulse 2s infinite ease-in-out" : "none",
                        }}
                      />
                    );
                  })}
                  
                  {/* Birleşme kılavuz kurşun çizgisi */}
                  <rect x={tx} y={ty} width="40" height="40" fill="none" stroke="#0c0704" strokeWidth="1.2" opacity="0.8" />
                </svg>
              </div>
            );
          })}
        </div>
        <div style={done ? P.msgOk : P.hint}>
          {done ? t("puzzle.tilesDone") : sel !== null ? t("puzzle.tilesSwap") : t("puzzle.tilesHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   6) HEKSAGON LAHÄ°T BULMACASI â€”
   Kozmik GÃ¼neÅŸ ve Ay gÃ¶rseline sahip 7 heksagonal taÅŸtan oluÅŸan lahit.
   Oyuncu dÄ±ÅŸ karolara dokunarak baÄŸlÄ± olduÄŸu 3'lÃ¼ grubu seÃ§er ve yandÄ±rÄ±r.
   AynÄ± karoya tekrar dokunulduÄŸunda bu 3'lÃ¼ grup saat yÃ¶nÃ¼nde 120 derece dÃ¶ner.
   ============================================================ */

const SLOTS = [
  { x: 150, y: 150 },      // 0: Merkez
  { x: 150, y: 66.86 },    // 1: Ãœst
  { x: 222, y: 108.43 },   // 2: Ãœst-SaÄŸ
  { x: 222, y: 191.57 },   // 3: Alt-SaÄŸ
  { x: 150, y: 233.14 },   // 4: Alt
  { x: 78, y: 191.57 },    // 5: Alt-Sol
  { x: 78, y: 108.43 },    // 6: Ãœst-Sol
];

const GROUPS = [
  null,
  { slots: [1, 2, 0], knob: { x: 174, y: 108.43 } }, // 1: Ãœst (Ãœst, Ãœst-SaÄŸ, Merkez)
  { slots: [2, 3, 0], knob: { x: 198, y: 150 } },    // 2: Ãœst-SaÄŸ (Ãœst-SaÄŸ, Alt-SaÄŸ, Merkez)
  { slots: [3, 4, 0], knob: { x: 174, y: 191.57 } }, // 3: Alt-SaÄŸ (Alt-SaÄŸ, Alt, Merkez)
  { slots: [4, 5, 0], knob: { x: 126, y: 191.57 } }, // 4: Alt (Alt, Alt-Sol, Merkez)
  { slots: [5, 6, 0], knob: { x: 102, y: 150 } },    // 5: Alt-Sol (Alt-Sol, Ãœst-Sol, Merkez)
  { slots: [6, 1, 0], knob: { x: 126, y: 108.43 } }, // 6: Ãœst-Sol (Ãœst-Sol, Ãœst, Merkez)
];

const MASTER_ART = [
  // Medalyon dış çerçevesi (altın metalik çember)
  { type: "circle", cx: 150, cy: 150, r: 128, fill: "none", stroke: "#8a6f4e", strokeWidth: 5 },
  { type: "circle", cx: 150, cy: 150, r: 122, fill: "none", stroke: "#0f172a", strokeWidth: 1.5 },
  // Derin gotik zemin arka planı (Karanlık orman yeşili/siyah)
  { type: "circle", cx: 150, cy: 150, r: 120, fill: "#0c0d0a", stroke: "none" },

  // Kesikli radyal kılavuz çizgileri (Hafifçe görünür, gold tonlarında)
  { type: "path", d: "M 150 150 L 150 67", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },
  { type: "path", d: "M 150 150 L 222 108.43", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },
  { type: "path", d: "M 150 150 L 222 191.57", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },
  { type: "path", d: "M 150 150 L 150 233.14", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },
  { type: "path", d: "M 150 150 L 78 191.57", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },
  { type: "path", d: "M 150 150 L 78 108.43", stroke: "#3d3224", strokeWidth: 1.2, strokeDasharray: "3 3" },

  // --- DİKENLİ TAÇ (Continuous thorny circle at radius 82, connecting all outer parts) ---
  { type: "path", d: "M 150 68 A 82 82 0 1 1 149.9 68", stroke: "#4f6345", strokeWidth: 3, fill: "none" },
  
  // Altın Dikenler (Çözüldüğünde parıldar)
  { type: "path", d: "M 150 68 L 150 54 L 154 66 Z", fill: "#ab8532", glow: "#ffd97d" },
  { type: "path", d: "M 222 108.43 L 238 98 L 227 106 Z", fill: "#ab8532", glow: "#ffd97d" },
  { type: "path", d: "M 222 191.57 L 238 202 L 227 194 Z", fill: "#ab8532", glow: "#ffd97d" },
  { type: "path", d: "M 150 233.14 L 150 247 L 146 235 Z", fill: "#ab8532", glow: "#ffd97d" },
  { type: "path", d: "M 78 191.57 L 62 202 L 73 194 Z", fill: "#ab8532", glow: "#ffd97d" },
  { type: "path", d: "M 78 108.43 L 62 98 L 73 106 Z", fill: "#ab8532", glow: "#ffd97d" },

  // Gothic Leaves (Dış parçalara bağlı yeşil yaprak detayları)
  { type: "path", d: "M 150 68 Q 138 52, 150 42 Q 162 52, 150 68 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },
  { type: "path", d: "M 222 108.43 Q 236 122, 246 112 Q 232 102, 222 108.43 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },
  { type: "path", d: "M 222 191.57 Q 236 178, 246 188 Q 232 198, 222 191.57 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },
  { type: "path", d: "M 150 233.14 Q 162 249, 150 259 Q 138 249, 150 233.14 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },
  { type: "path", d: "M 78 191.57 Q 64 178, 54 188 Q 68 198, 78 191.57 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },
  { type: "path", d: "M 78 108.43 Q 64 122, 54 112 Q 68 102, 78 108.43 Z", fill: "#354f2c", stroke: "#20301a", strokeWidth: 1 },

  // --- MERKEZ (Slot 0): Kan Kırmızı Gül ---
  { type: "circle", cx: 150, cy: 150, r: 16, fill: "#73101b", stroke: "#3d0810", strokeWidth: 1.5, glow: "#b22435" },
  { type: "path", d: "M 136 144 C 142 126, 158 126, 164 144 Q 150 152, 136 144 Z", fill: "#9e1625" },
  { type: "path", d: "M 132 152 C 124 162, 142 174, 150 162 Q 138 154, 132 152 Z", fill: "#9e1625" },
  { type: "path", d: "M 160 148 C 168 158, 150 170, 148 160 Q 156 152, 160 148 Z", fill: "#800c19" },
  { type: "path", d: "M 142 138 Q 150 130, 158 138", stroke: "#b22435", strokeWidth: 2, fill: "none" },
];


export function ColorGridOverlay({ config, onSuccess, onFail, onCancel }) {
  // Scramble hexagons by performing random group rotations around random outer slots (1-6)
  const scrambleHexagons = () => {
    let list = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      slotIdx: i,
      rot: 0,
    }));
    // 12 random group rotations
    for (let step = 0; step < 12; step++) {
      const activeSlot = Math.floor(Math.random() * 6) + 1; // 1 to 6
      const group = GROUPS[activeSlot];
      const knob = group.knob;

      const sorted = group.slots.map((slotIdx) => {
        const s = SLOTS[slotIdx];
        const angle = Math.atan2(s.y - knob.y, s.x - knob.x);
        return { slotIdx, angle };
      }).sort((a, b) => a.angle - b.angle);

      const hex0 = list.find((h) => h.slotIdx === sorted[0].slotIdx);
      const hex1 = list.find((h) => h.slotIdx === sorted[1].slotIdx);
      const hex2 = list.find((h) => h.slotIdx === sorted[2].slotIdx);

      list = list.map((h) => {
        if (h.id === hex0.id) return { ...h, slotIdx: sorted[1].slotIdx };
        if (h.id === hex1.id) return { ...h, slotIdx: sorted[2].slotIdx };
        if (h.id === hex2.id) return { ...h, slotIdx: sorted[0].slotIdx };
        return h;
      });
    }
    // Verify it is not solved initially, if it is, rotate group 1 once
    if (list.every((h) => h.slotIdx === h.id)) {
      const group = GROUPS[1];
      const hex0 = list.find((h) => h.slotIdx === group.slots[0]);
      const hex1 = list.find((h) => h.slotIdx === group.slots[1]);
      const hex2 = list.find((h) => h.slotIdx === group.slots[2]);
      list = list.map((h) => {
        if (h.id === hex0.id) return { ...h, slotIdx: group.slots[1] };
        if (h.id === hex1.id) return { ...h, slotIdx: group.slots[2] };
        if (h.id === hex2.id) return { ...h, slotIdx: group.slots[0] };
        return h;
      });
    }
    return list;
  };

  const [hexagons, setHexagons] = useState(() => scrambleHexagons());
  const [selectedGroup, setSelectedGroup] = useState(null); // slotIdx of the outer hexagon that selects the group (1-6)
  const [done, setDone] = useState(false);
  const [moves, setMoves] = useState(0);

  const tapHexagon = (hexId) => {
    if (done) return;
    const hex = hexagons.find((h) => h.id === hexId);
    const slotIdx = hex.slotIdx;

    if (slotIdx === 0) {
      // Tapping the center hexagon rotates the currently selected outer group if one is active
      if (selectedGroup !== null) {
        rotateGroup(selectedGroup);
      }
      return;
    }

    // Tapping any outer hexagon (slots 1-6)
    if (selectedGroup === slotIdx) {
      // Tap again to rotate
      rotateGroup(slotIdx);
    } else {
      // Select the group corresponding to this outer slot
      AudioSys.blipSfx(420);
      setSelectedGroup(slotIdx);
    }
  };

  const rotateGroup = (activeSlot) => {
    const group = GROUPS[activeSlot];
    const knob = group.knob;

    // Sort slots clockwise based on center relative to knob
    const sorted = group.slots.map((sIdx) => {
      const s = SLOTS[sIdx];
      const angle = Math.atan2(s.y - knob.y, s.x - knob.x);
      return { slotIdx: sIdx, angle };
    }).sort((a, b) => a.angle - b.angle);

    const hex0 = hexagons.find((h) => h.slotIdx === sorted[0].slotIdx);
    const hex1 = hexagons.find((h) => h.slotIdx === sorted[1].slotIdx);
    const hex2 = hexagons.find((h) => h.slotIdx === sorted[2].slotIdx);

    AudioSys.clank();

    const next = hexagons.map((h) => {
      if (h.id === hex0.id) return { ...h, slotIdx: sorted[1].slotIdx };
      if (h.id === hex1.id) return { ...h, slotIdx: sorted[2].slotIdx };
      if (h.id === hex2.id) return { ...h, slotIdx: sorted[0].slotIdx };
      return h;
    });

    setHexagons(next);
    setMoves((m) => m + 1);

    // Check solution
    if (next.every((h) => h.slotIdx === h.id && h.rot === 0)) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1800);
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <style>{`
        @keyframes hex-selected-pulse {
          0%, 100% { stroke: #d4b850; stroke-width: 2.5; filter: drop-shadow(0 0 3px rgba(212,184,80,0.5)); }
          50% { stroke: #ffffff; stroke-width: 3.5; filter: drop-shadow(0 0 10px rgba(212,184,80,0.95)); }
        }
        @keyframes hex-solve-flash {
          0% { opacity: 0; }
          25% { opacity: 0.45; }
          100% { opacity: 0.08; }
        }
        @keyframes hex-solve-glow {
          0% { filter: brightness(1); }
          40% { filter: brightness(1.4); }
          100% { filter: brightness(1.15); }
        }
      `}</style>
      <div style={{
        ...puzzlePanel,
        backgroundColor: "#0d0a08",
        backgroundImage: [
          "radial-gradient(ellipse at 50% 25%, rgba(95,65,40,0.3), rgba(0,0,0,0) 65%)",
          "linear-gradient(180deg, rgba(30,22,16,0.65), rgba(4,3,2,0.98))",
        ].join(", "),
        border: "1px solid #332418",
        maxWidth: 350,
      }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#a0886a", letterSpacing: "0.14em" }}>
          {config.title || t("puzzle.colorTitle")}
        </div>

        {/* Moves & Correct count tracker */}
        <div style={{
          fontFamily: mono, fontSize: 9, color: "#6a5c4e",
          letterSpacing: "0.12em", textAlign: "center", marginBottom: 6,
        }}>
          HAMLE: {moves} &nbsp;|&nbsp; HÄ°ZALI: {hexagons.filter(h => h.slotIdx === h.id).length}/7
        </div>

        {/* === HEXAGON PANEL === */}
        <svg viewBox="0 0 300 300" style={{
          width: "100%", maxWidth: 300,
          animation: done ? "hex-solve-glow 1.8s ease-out forwards" : "none",
        }}>
          <defs>
            {/* Hexagon Clip Path */}
            <clipPath id="hex-clip">
              <polygon points="0,-48 41.57,-24 41.57,24 0,48 -41.57,24 -41.57,-24" />
            </clipPath>
          </defs>

          {/* Wooden board background plaque */}
          <circle cx="150" cy="150" r="136" fill="#18100a" stroke="#080402" strokeWidth="5" />
          <circle cx="150" cy="150" r="130" fill="#1b120c" stroke="#2a1e16" strokeWidth="2" opacity="0.6" />
          {/* Wood texture detail lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`wt-${i}`}
              x1={30 + i * 16} y1="20"
              x2={30 + i * 16 + (i % 2 === 0 ? 5 : -5)} y2="280"
              stroke="#0f0906" strokeWidth="1.2" opacity="0.45" />
          ))}

          {/* === HEXAGONS === */}
          {hexagons.map((hex) => {
            const slot = SLOTS[hex.slotIdx];
            const origSlot = SLOTS[hex.id];
            
            // Check if this hexagon belongs to the currently active selected group
            const isInActiveGroup = selectedGroup !== null && GROUPS[selectedGroup].slots.includes(hex.slotIdx);

            return (
              <g
                key={hex.id}
                transform={`translate(${slot.x}, ${slot.y})`}
                onClick={() => tapHexagon(hex.id)}
                cursor={done ? "default" : "pointer"}
                style={{
                  transition: "transform 480ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <g style={{ transition: "transform 480ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                  {/* Hexagon body with clipping path */}
                  <g clipPath="url(#hex-clip)">
                    {/* Stone tile background */}
                    <polygon points="0,-48 41.57,-24 41.57,24 0,48 -41.57,24 -41.57,-24" fill="#322a22" stroke="#1f1814" strokeWidth="2" />
                    {/* Master Artwork slice */}
                    <g transform={`translate(${-origSlot.x}, ${-origSlot.y})`}>
                      {/* Render master artwork paths inside the hexagon */}
                      {MASTER_ART.map((item, idx) => {
                        if (item.type === "circle") {
                          return (
                            <circle
                              key={idx} cx={item.cx} cy={item.cy} r={item.r}
                              fill={item.fill} stroke={done && item.glow ? item.glow : item.stroke}
                              strokeWidth={item.strokeWidth} opacity={item.opacity}
                              style={{
                                transition: "stroke 500ms, filter 500ms",
                                filter: done && item.glow ? `drop-shadow(0 0 5px ${item.glow})` : "none",
                              }}
                            />
                          );
                        }
                        if (item.type === "path") {
                          return (
                            <path
                              key={idx} d={item.d} fill={item.fill || "none"}
                              stroke={done && item.glow ? item.glow : item.stroke}
                              strokeWidth={item.strokeWidth} opacity={item.opacity}
                              strokeLinecap={item.strokeLinecap}
                              style={{
                                transition: "stroke 500ms, filter 500ms",
                                filter: done && item.glow ? `drop-shadow(0 0 5px ${item.glow})` : "none",
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </g>
                  </g>
                  {/* Decorative internal golden/stone relief rim */}
                  <polygon points="0,-46 39.8,-23 39.8,23 0,46 -39.8,23 -39.8,-23" fill="none" stroke="#4a3e35" strokeWidth="1.5" opacity="0.5" />
                  
                  {/* Hexagon Border */}
                  <polygon 
                    points="0,-48 41.57,-24 41.57,24 0,48 -41.57,24 -41.57,-24" 
                    fill="none" 
                    stroke={isInActiveGroup ? "#d4b850" : "#15100c"} 
                    strokeWidth={isInActiveGroup ? 3 : 1}
                    style={{
                      animation: isInActiveGroup && !done ? "hex-selected-pulse 1.5s ease-in-out infinite" : "none",
                    }}
                  />
                </g>
              </g>
            );
          })}

          {/* Done flash overlay */}
          {done && <circle cx="150" cy="150" r="130" fill="#d4b850" style={{ animation: "hex-solve-flash 2.2s ease-out forwards" }} />}
        </svg>

        {/* Status Hint */}
        <div style={done ? P.msgOk : P.hint}>
          {done ? t("puzzle.colorDone") : t("puzzle.colorHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 4 }} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* MixOverlay (kimyasal karÄ±ÅŸÄ±m) â€” deÄŸiÅŸmeden korunur */
export { MixOverlay } from "./MixOverlay";
