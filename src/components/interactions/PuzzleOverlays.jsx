import { useState, useRef, useEffect } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";
import { t } from "../../i18n";

/* ============================================================
   SINIR-1 — BULMACA BİLEŞENLERİ v2
   Hepsi kendi durumunu tutar; dış kancalar: onSuccess / onFail / onCancel.
   Story kullanımı: interaction: { kind, ...config, success, cancel }

   KINDS:
   · shadow    — iki parçalı gölgeyi duvar iziyle hizala
   · wires     — kabloları doğru portlara bağla (devre yaması)
   · symbols   — dökümandaki sembolleri doğru SIRAYLA bas (RE8 çan kilidi)
   · rings     — renkli halkaları çevirip vitrayı bütünleştir (RE8 cam)
   · tiles     — karoların yerini değiştirip deseni tamamla (karo kapısı)
   · colorgrid — hücre renklerini döndürüp şemayı eşle (renk panosu)
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
   1) GÖLGE HİZALAMA v3 — nesne HER YÖNE döner.
   Üç eksen: DÖNDÜR (Z), EĞ (X — dikey basıklık), YATIR (Y — yatay
   basıklık). Sözde-3B: eğimler silüeti cos ile sıkıştırır; yanlış
   eksende doğru görüntü İMKANSIZ olur. Yeşil ipucu YOK — göz kararı.
   config: { targetRot, targetTiltX, targetTiltY, step?15,
             startRot?, startTiltX?, startTiltY? }
   ============================================================ */

const TILT_MAX = 75;
const rad = (d) => (d * Math.PI) / 180;

/* ------------------------------------------------------------
   3D GÖLGE NESNESİ — "kalıntı".
   Nesne 3B çizgi segmentlerinden oluşur. Oyuncu iki eksende
   döndürür (yaw = yatay, pitch = dikey). Her açıda nesnenin
   2B izdüşümü (gölgesi) FARKLI görünür.
   Doğru açı çiftinde gölge hedef silüete oturur → kilit.

   Nesne: PERISHED evrenine ait deforme bir kalıntı. Doğru açıda
   gölgesi BULUNTU'NUN İŞARETİ'ne (dairesel sonar + merkez göz +
   yayılan kollar) benzer.
   ------------------------------------------------------------ */

// 3B nokta [x,y,z]; segment = [i,j] iki nokta indexi
// Kalıntının düğüm noktaları (Buluntu işareti doğru açıda belirir)
const OBJ_NODES = [
  [0, 0, 0],       // 0 merkez
  [0, -58, 6],     // 1 üst kol
  [50, -20, -8],   // 2 sağ üst
  [58, 22, 8],     // 3 sağ alt
  [22, 56, -6],    // 4 alt sağ
  [-22, 58, 6],    // 5 alt sol
  [-58, 20, -8],   // 6 sol alt
  [-50, -22, 8],   // 7 sol üst
  [0, 0, 46],      // 8 öne çıkıntı (göz sapı) — derinlik ekseni
  [0, 0, -40],     // 9 arkaya çıkıntı
];
const OBJ_EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7], // yayılan kollar
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,1], // dış halka
  [0,8],[0,9],                                // derinlik çubukları
];

// nokta bulutunu yaw/pitch ile döndür ve 2B'ye izdüşür (ortografik)
function project(nodes, yawDeg, pitchDeg) {
  const cy = Math.cos(rad(yawDeg)), sy = Math.sin(rad(yawDeg));
  const cx = Math.cos(rad(pitchDeg)), sx = Math.sin(rad(pitchDeg));
  return nodes.map(([x, y, z]) => {
    // yaw: Y ekseni etrafında (x,z döner)
    let x1 = x * cy + z * sy;
    let z1 = -x * sy + z * cy;
    // pitch: X ekseni etrafında (y,z döner)
    let y1 = y * cx - z1 * sx;
    // ortografik: (x1, y1) ekrana düşer
    return [x1, y1];
  });
}

// bir açı çiftindeki gölgeyi SVG path'e çevir (segmentleri kalın çizgi olarak)
function shadowPath(pts2d) {
  return OBJ_EDGES.map(([a, b]) => {
    const [ax, ay] = pts2d[a], [bx, by] = pts2d[b];
    return `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }).join(" ");
}

export function ShadowOverlay({ config, onSuccess, onFail, onCancel }) {
  const step = config.step || 10;
  const tol = config.tol ?? 6;                        // derece toleransı
  const targetYaw = config.targetYaw ?? 0;
  const targetPitch = config.targetPitch ?? 0;
  const [yaw, setYaw] = useState(config.startYaw ?? 130);
  const [pitch, setPitch] = useState(config.startPitch ?? -55);
  const [locked, setLocked] = useState(false);

  const dragRef = useRef({ active: false, startX: 0, startY: 0, startYaw: 0, startPitch: 0 });
  const lastSoundRef = useRef(0);

  const angNear = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180) <= tol;
  const check = (yw, pt) => angNear(yw, targetYaw) && angNear(pt, targetPitch);

  // hedef gölge (sabit, hafif ipucu olarak arkada)
  const targetPts = project(OBJ_NODES, targetYaw, targetPitch);
  const targetD = shadowPath(targetPts);
  // güncel gölge
  const curPts = project(OBJ_NODES, yaw, pitch);
  const curD = shadowPath(curPts);

  // ne kadar yakınız (0..1) → yaklaştıkça gölge parlar
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
              HİZALAMA KİLİDİ (ALIGNMENT MATRIX):
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
            YAW: {Math.round(yaw)}° | PIT: {Math.round(pitch)}°
          </div>
        </div>

        {/* Buttons Row (Accessibility / Arrow Fallbacks) */}
        <div style={P.ctrlRow}>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("yaw", -1)}>⟲ {t("puzzle.rot")}</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("yaw", 1)}>{t("puzzle.rot")} ⟳</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("pitch", -1)}>▲ {t("puzzle.tilt")}</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, borderColor: "rgba(100,160,220,0.3)", color: "#dfe8ec", minWidth: 70 }} onClick={() => move("pitch", 1)}>{t("puzzle.tilt")} ▼</button>
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
   2) KABLO EŞLEŞTİRME (v2) — yanlış bağlantı artık KIRMIZI hat
   olarak bir an çizilir, kıvılcım sayacı işler; dolu portlar
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
                  {sparking ? "⚡" : p.label}
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
            <text x="10" y="192" fontFamily={mono} fontSize="8" fill="#c25844" fontWeight="bold">⚡ VOLTAGE WARNING ×{errors}</text>
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
   3) SEMBOL KİLİDİ — RE8 çan paneli: 8 işaret çember dizilir,
   dökümandaki semboller doğru SIRAYLA basılır. Yanlış = dizi
   sıfırlanır + ceza.
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
}; // ihtiyaç olursa yeni işaretler buraya eklenir

export function SymbolsOverlay({ config, onSuccess, onFail, onCancel }) {
  const [progress, setProgress] = useState(0); // dizide kaç doğru basıldı
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
   4) VİTRAY v2 — RE4 kilise camı: halkalar CAM KIRIKLARI ve altın
   figürün PARÇALARINI taşır. Çentik/işaret YOK — figür ancak üç
   halka doğru açılara gelince BÜTÜNLEŞİR; oyuncu resme bakarak
   çözer. Kırıklar dönerek görsel gürültü yaratır.
   config: { rings:[{color, step, offset}] } — offset: başlangıcın
   hedeften sapması (step'in katı olmalı ki çözülebilsin).
   ============================================================ */

const GLASS_SHARDS = [
  // her halka için kırık cam parçaları: [iç yarıçap bandı] açılarla
  ["#5a72b8", "#4a9a6a", "#b87a8a", "#8a9a5a", "#6a8ab8", "#b8a05a", "#7a5ab8", "#4a8a9a"],
  ["#4a9a6a", "#b8a05a", "#5a72b8", "#8a5a7a", "#6ab88a", "#b87a5a", "#5a8ab8", "#9a5a5a", "#7aa06a"],
  ["#b87a8a", "#5a8ab8", "#8a9a5a", "#4a9a8a", "#b8a05a", "#6a5ab8", "#9ab86a", "#b85a6a", "#5a9ab8", "#8a7a5a"],
];

const wedge = (r0, r1, a0, a1) => {
  const p = (r, a) => `${r * Math.sin(rad(a))} ${-r * Math.cos(rad(a))}`;
  return `M ${p(r0, a0)} A ${r0} ${r0} 0 0 1 ${p(r0, a1)} L ${p(r1, a1)} A ${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
};

// altın figür — halkalara bölünmüş bir "anahtar/kılıç" mührü:
// iç: gövde+kabza · orta: kollar+gövde devamı · dış: uç+tepe sivri
const FIGURE = [
  ["M0 -34 A34 34 0 1 0 0.1 -34", "M0 -20 A20 20 0 1 0 0.1 -20", "M0 -8 V32", "M-10 22 H10"],
  ["M0 -70 A70 70 0 1 0 0.1 -70", "M-66 0 H-38", "M38 0 H66", "M-48 -48 L-28 -28", "M48 -48 L28 -28", "M-48 48 L-28 28", "M48 48 L28 28"],
  ["M0 -96 V-76", "M-96 0 H-74", "M74 0 H96", "M-18 -86 H18", "M-18 86 H18"],
];

export function RingsOverlay({ config, flags = {}, onSuccess, onFail, onCancel }) {
  /* EKSİK PARÇA SİSTEMİ: config.pieces = [{flag, ring, shard, fig}]
     Bayrağı henüz alınmamış her parça camda DELİK olarak görünür ve
     figürün o segmenti çizilmez — halkalar hizalansa bile kilit
     açılmaz; oyuncu parçaları DÜNYADA bulup (flag) geri gelmeli. */
  const rings = config.rings;
  const radii = [[16, 38], [42, 68], [72, 96]];
  const [rots, setRots] = useState(rings.map((r) => r.offset)); // 0 = çözüm
  const [done, setDone] = useState(false);
  const pieces = config.pieces || [];
  const missing = pieces.filter((p) => !flags[p.flag]);
  const holeAt = (ring, shard) => missing.some((p) => p.ring === ring && p.shard === shard);
  const placedAt = (ring, shard) => pieces.some((p) => p.ring === ring && p.shard === shard && flags[p.flag]);
  const figHidden = (ring, k) => missing.some((p) => p.ring === ring && (p.fig ?? 0) === k);
  const aligned = rots.every((r, j) => near(r, 0, Math.max(7, rings[j].step / 2 - 1)));
  const clockwiseOnly = config.clockwiseOnly || config.variant === "vitray";

  const rotate = (i, dir) => {
    if (done) return;
    AudioSys.blipSfx(380 + i * 120);
    const next = rots.slice();
    next[i] = next[i] + dir * rings[i].step;
    setRots(next);
    const ok = next.every((r, j) => near(r, 0, Math.max(7, rings[j].step / 2 - 1)));
    if (ok && missing.length === 0) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1600);
    } else if (ok && missing.length > 0) {
      AudioSys.buzzSfx(); // hizada ama cam eksik — kilit direnir
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={puzzlePanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.ringsTitle")}</div>
        <svg viewBox="-112 -112 224 224" style={{ width: "100%", maxWidth: 286 }}>
          <defs>
            <radialGradient id="s1-glass-back" cx="47%" cy="44%" r="64%">
              <stop offset="0%" stopColor="#f3efd9" stopOpacity="0.58" />
              <stop offset="58%" stopColor="#5f7d64" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#050807" stopOpacity="0.96" />
            </radialGradient>
          </defs>
          <circle r="108" fill="#15110d" />
          <circle r="103" fill="#3b3022" stroke="#6a5736" strokeWidth="5" />
          <circle r="96" fill="url(#s1-glass-back)" stroke="#171c16" strokeWidth="3" />
          {rings.map((r, i) => {
            const [r0, r1] = radii[i];
            const shards = r.shards || GLASS_SHARDS[i % GLASS_SHARDS.length];
            const n = shards.length;
            return (
              <g key={i} style={{ transition: "transform 320ms ease" }} transform={`rotate(${rots[i]})`}>
                {shards.map((c, k) => {
                  const hole = holeAt(i, k);
                  const placed = placedAt(i, k);
                  return (
                    <path key={k}
                      d={wedge(r1, r0, (k / n) * 360 + (k % 3) * 4, ((k + 1) / n) * 360 - (k % 2) * 6)}
                      fill={hole ? "#070908" : c}
                      opacity={hole ? 0.95 : done ? 0.78 : 0.48}
                      stroke={hole ? "#3a4438" : placed ? "#e8c95a" : "#1a1f1a"}
                      strokeWidth={placed ? 2.4 : 1.8}
                      strokeDasharray={hole ? "4 3" : "none"} />
                  );
                })}
                {FIGURE[i].map((d, k) => figHidden(i, k) ? null : (
                  <path key={"f" + k} d={d} fill="none"
                    stroke={done ? "#e8c95a" : "#c8a94a"} strokeWidth="4"
                    strokeLinecap="round"
                    style={{ transition: "stroke 400ms", filter: done ? "drop-shadow(0 0 5px rgba(232,201,90,0.7))" : "none" }}
                    opacity={done ? 1 : 0.9} />
                ))}
              </g>
            );
          })}
          <circle r="38" fill="none" stroke="rgba(20,24,18,0.65)" strokeWidth="2" />
          <circle r="68" fill="none" stroke="rgba(20,24,18,0.65)" strokeWidth="2" />
          <circle r="96" fill="none" stroke="rgba(20,24,18,0.78)" strokeWidth="2" />
          {done && <circle r="100" fill="#e8c95a" opacity="0.07" />}
        </svg>
        <div style={P.ctrlRow}>
          {rings.map((r, i) => (
            <span key={i} style={{ display: "flex", gap: 6, flexDirection: clockwiseOnly ? "column" : "row", alignItems: "center" }}>
              {!clockwiseOnly && (
                <button className="s1-btn s1-key"
                  style={{
                    ...S.keyBtn,
                    width: 48, minWidth: 48, height: 42, borderRadius: "50%",
                    borderColor: r.color,
                    backgroundColor: r.color + "33",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.75)",
                  }}
                  onClick={() => rotate(i, -1)}>⟲</button>
              )}
              <button className="s1-btn s1-key"
                style={{
                  ...S.keyBtn,
                  width: clockwiseOnly ? 76 : 48,
                  minWidth: clockwiseOnly ? 76 : 48,
                  height: clockwiseOnly ? 48 : 42,
                  borderRadius: clockwiseOnly ? 6 : "50%",
                  borderColor: r.color,
                  backgroundColor: r.color + (clockwiseOnly ? "55" : "33"),
                  color: "#efe9d2",
                  boxShadow: `inset 0 0 10px rgba(0,0,0,0.75), 0 0 12px ${r.color}33`,
                }}
                onClick={() => rotate(i, 1)}>
                {clockwiseOnly ? (r.label || "RENK") : "⟳"}
              </button>
            </span>
          ))}
        </div>
        <div style={done ? P.msgOk : aligned && missing.length > 0 ? P.msgBad : P.hint}>
          {done ? t("puzzle.ringsDone")
            : aligned && missing.length > 0 ? t("puzzle.ringsMissing", { n: missing.length })
            : t("puzzle.ringsHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   5) KARO KAPISI — karışmış karoları ikişer ikişer değiştirerek
   büyük deseni tamamla (dökümandaki bilgi doğru dizilimi anlatır).
   config: { scramble:[2,0,1,...] (başlangıç permütasyonu, 9 eleman) }
   Desen tek büyük SVG'dir; her karo kendi doğru penceresini gösterir.
   ============================================================ */

const TILE_ART = [
  "M60 10 A50 50 0 1 0 60.1 10",
  "M60 22 A38 38 0 1 0 60.1 22",
  "M60 12 V108 M26 60 H94",
  "M36 34 L84 86 M84 34 L36 86",
  "M22 28 H42 M78 28 H98 M22 92 H42 M78 92 H98",
  "M45 60 C50 50 70 50 75 60 C70 70 50 70 45 60",
  "M54 60 A6 6 0 1 0 66 60 A6 6 0 1 0 54 60",
  "M30 112 C40 101 50 101 60 112 C70 101 80 101 90 112",
];

export function TilesOverlay({ config, onSuccess, onFail, onCancel }) {
  const n = 3;
  const [perm, setPerm] = useState(config.scramble || [8, 6, 7, 2, 5, 4, 3, 0, 1]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);

  const tap = (pos) => {
    if (done) return;
    if (sel === null) {
      AudioSys.blipSfx(500);
      setSel(pos);
      return;
    }
    if (sel === pos) { setSel(null); return; }
    AudioSys.clank();
    const next = perm.slice();
    [next[sel], next[pos]] = [next[pos], next[sel]];
    setPerm(next);
    setSel(null);
    if (next.every((v, i) => v === i)) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1300);
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={puzzlePanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.tilesTitle")}</div>
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 4,
          width: "100%", maxWidth: 240, padding: 8,
          ...puzzleFace,
          borderRadius: 3,
        }}>
          {perm.map((tile, pos) => {
            const tx = (tile % n) * 40, ty = Math.floor(tile / n) * 40;
            const right = tile === pos;
            return (
              <div key={pos} onClick={() => tap(pos)} style={{
                aspectRatio: "1", cursor: "pointer",
                clipPath: "polygon(8% 0, 88% 4%, 100% 24%, 92% 92%, 20% 100%, 0 78%, 4% 16%)",
                backgroundColor: "#c9c3b3",
                outline: sel === pos ? "2px solid #d8b34a" : right && !done ? "1px solid #7f9eb544" : "1px solid #4a3a28",
                overflow: "hidden", transition: "outline 150ms, transform 150ms",
                transform: sel === pos ? "translateY(-2px)" : "none",
                boxShadow: "inset 0 0 12px rgba(0,0,0,0.35)",
                opacity: done ? 1 : 0.96,
              }}>
                <svg viewBox={`${tx} ${ty} 40 40`} style={{ width: "100%", height: "100%", display: "block", background: "linear-gradient(135deg, #ded8c8, #a69b82)" }}>
                  <rect x={tx} y={ty} width="40" height="40" fill="rgba(255,255,255,0.08)" />
                  {TILE_ART.map((d, i) => (
                    <path key={i} d={d} fill="none" stroke={done ? "#8f6f38" : "#6e5538"} strokeWidth="3" strokeLinecap="round" />
                  ))}
                  <path d={`M${tx} ${ty + 19} L${tx + 40} ${ty + 15} M${tx + 18} ${ty} L${tx + 22} ${ty + 40}`}
                    stroke="rgba(80,64,45,0.32)" strokeWidth="1.2" />
                </svg>
              </div>
            );
          })}
        </div>
        <div style={done ? P.msgOk : P.hint}>
          {done ? t("puzzle.tilesDone") : sel !== null ? t("puzzle.tilesSwap") : t("puzzle.tilesHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   6) RENK PANOSU — hücrelere dokun: renk döner; dökümandaki
   şemayı birebir kur (RE8 kale jeneratörü).
   config: { palette:["#.."], target:[0,1,2,...9 indeks],
             start?:[...], showTarget?:bool (test için) }
   ============================================================ */

export function ColorGridOverlay({ config, onSuccess, onFail, onCancel }) {
  const palette = config.palette;
  const [cells, setCells] = useState(config.start || config.target.map(() => 0));
  const [done, setDone] = useState(false);

  const tap = (i) => {
    if (done) return;
    AudioSys.blipSfx(440 + (cells[i] % palette.length) * 60);
    const next = cells.slice();
    next[i] = (next[i] + 1) % palette.length;
    setCells(next);
    if (next.every((v, j) => v === config.target[j])) {
      setDone(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1200);
    }
  };

  const grid = (vals, size, clickable) => (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${config.cols || 3}, 1fr)`, gap: 3,
      width: size, padding: 5,
      backgroundColor: "#080908",
      backgroundImage: "radial-gradient(ellipse at 50% 35%, rgba(230,220,170,0.14), rgba(0,0,0,0) 70%)",
      border: "4px solid #2d2418",
      boxShadow: "inset 0 0 18px rgba(0,0,0,0.85)",
      borderRadius: 4,
    }}>
      {vals.map((v, i) => (
        <div key={i} onClick={clickable ? () => tap(i) : undefined} style={{
          aspectRatio: "1",
          clipPath: i % 2 === 0
            ? "polygon(8% 0, 100% 10%, 92% 100%, 0 88%)"
            : "polygon(0 12%, 88% 0, 100% 92%, 10% 100%)",
          cursor: clickable ? "pointer" : "default",
          backgroundColor: palette[v],
          border: "2px solid rgba(0,0,0,0.68)",
          boxShadow: "inset 0 0 10px rgba(255,255,255,0.16), inset 0 0 18px rgba(0,0,0,0.42)",
          transition: "background-color 200ms, filter 200ms",
          filter: done ? "brightness(1.18)" : "brightness(0.92)",
        }}>
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent 45%, rgba(0,0,0,0.22))",
            position: "relative",
          }}>
            <svg viewBox="0 0 40 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.48 }}>
              <path
                d={[
                  "M20 6 A14 14 0 1 0 20.1 6 M20 12 V34",
                  "M8 21 H32 M20 8 V32 M13 13 L27 27",
                  "M9 29 C15 18 25 18 31 29 M20 10 V35",
                  "M11 12 H29 M14 20 H26 M11 28 H29",
                ][v % 4]}
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 7 L36 5 M7 36 L35 31"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={puzzlePanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.colorTitle")}</div>
        {config.showTarget && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.2em", color: "#5f7075" }}>
              {t("puzzle.colorTarget")}
            </span>
            {grid(config.target, 90, false)}
          </div>
        )}
        {grid(cells, 190, true)}
        <div style={done ? P.msgOk : P.hint}>
          {done ? t("puzzle.colorDone") : t("puzzle.colorHint")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* MixOverlay (kimyasal karışım) — değişmeden korunur */
export { MixOverlay } from "./MixOverlay";
