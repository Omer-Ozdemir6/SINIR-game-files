import { useState } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";
import { t } from "../../i18n";

/* ============================================================
   SINIR-1 — BULMACA BİLEŞENLERİ v2 (Outlast / RE7 / RE8 esintili)
   Hepsi kendi durumunu tutar; dış kancalar: onSuccess / onFail / onCancel.
   Story kullanımı: interaction: { kind, ...config, success, cancel }

   KINDS:
   · shadow    — iki parçalı gölgeyi duvar iziyle hizala (RE7 projektör)
   · wires     — kabloları doğru portlara bağla (devre yaması)
   · symbols   — dökümandaki sembolleri doğru SIRAYLA bas (RE8 çan kilidi)
   · rings     — renkli halkaları çevirip vitrayı bütünleştir (RE8 cam)
   · tiles     — karoların yerini değiştirip deseni tamamla (karo kapısı)
   · colorgrid — hücre renklerini döndürüp şemayı eşle (renk panosu)
   ============================================================ */

const mono = "'Courier New', ui-monospace, monospace";

const P = {
  hint: { fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "#5f7573", textAlign: "center", lineHeight: 1.7 },
  msgOk: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#7fae86", textAlign: "center", minHeight: 15 },
  msgBad: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c23b2e", textAlign: "center", minHeight: 15 },
  ctrlRow: { display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap" },
};

const near = (a, b, tol) => Math.abs(((a - b) % 360 + 540) % 360 - 180) <= tol;

/* ============================================================
   1) GÖLGE HİZALAMA v3 — RE7 projektör: nesne HER YÖNE döner.
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
   2B izdüşümü (gölgesi) FARKLI görünür — gerçek RE7 mekaniği.
   Doğru açı çiftinde gölge hedef silüete oturur → kilit.

   Nesne: SINIR-1 evrenine ait deforme bir kalıntı. Doğru açıda
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
  const step = config.step || 15;
  const tol = config.tol ?? 12;                       // derece toleransı
  const targetYaw = config.targetYaw ?? 0;
  const targetPitch = config.targetPitch ?? 0;
  const [yaw, setYaw] = useState(config.startYaw ?? 65);
  const [pitch, setPitch] = useState(config.startPitch ?? -40);
  const [locked, setLocked] = useState(false);

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

  const move = (axis, dir) => {
    if (locked) return;
    AudioSys.clank();
    let yw = yaw, pt = pitch;
    if (axis === "yaw") yw = (yw + dir * step) % 360;
    if (axis === "pitch") pt = Math.max(-TILT_MAX, Math.min(TILT_MAX, pt + dir * step));
    setYaw(yw); setPitch(pt);
    if (check(yw, pt)) {
      setLocked(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1400);
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.shadowTitle")}</div>
        <svg viewBox="-110 -110 220 220" style={{ width: "100%", maxWidth: 260 }}>
          <defs>
            <radialGradient id="s1lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={locked ? "#4a6a52" : "#2f3d32"} />
              <stop offset="55%" stopColor="#12191400" />
              <stop offset="55%" stopColor="#141d18" />
              <stop offset="100%" stopColor="#070a08" />
            </radialGradient>
          </defs>
          {/* projeksiyon lambası (duvar) */}
          <circle cx="0" cy="0" r="104" fill="url(#s1lamp)" />
          {/* hedef silüet — soluk kesikli, ne yapman gerektiğini gösterir */}
          <path d={targetD} fill="none"
            stroke="#5a8a6a" strokeWidth="2.4" strokeLinecap="round"
            strokeDasharray="4 5" opacity={locked ? 0 : 0.32} />
          {/* nesnenin gölgesi — açı değiştikçe ŞEKİL değişir */}
          <path d={curD} fill="none"
            stroke={locked ? "#7cc39a" : "#05080799"}
            strokeWidth={locked ? 3.4 : 3}
            strokeLinecap="round" strokeLinejoin="round"
            style={{
              transition: "d 120ms linear",
              filter: glow > 0.5 ? `drop-shadow(0 0 ${glow * 6}px rgba(120,200,150,${glow * 0.7}))` : "none",
            }} />
          {/* merkez göz — kilitlenince açılır */}
          {locked && <circle cx={curPts[0][0]} cy={curPts[0][1]} r="6" fill="#7cc39a" opacity="0.9" />}
        </svg>
        <div style={P.ctrlRow}>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => move("yaw", -1)}>⟲ {t("puzzle.rot")}</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => move("yaw", 1)}>{t("puzzle.rot")} ⟳</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => move("pitch", -1)}>▲ {t("puzzle.tilt")}</button>
          <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => move("pitch", 1)}>{t("puzzle.tilt")} ▼</button>
        </div>
        <div style={locked ? P.msgOk : P.hint}>
          {locked ? t("puzzle.shadowDone") : t("puzzle.shadowHint")}
        </div>
        {!locked && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
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
  const cables = config.cables;
  const ports = config.ports;

  const yOf = (i, n) => 34 + i * (150 / Math.max(1, n - 1));
  const wire = (ci, pi) =>
    `M 44 ${yOf(ci, cables.length)} C 120 ${yOf(ci, cables.length)}, 150 ${yOf(pi, ports.length)}, 214 ${yOf(pi, ports.length)}`;

  const portOwner = (pid) => cables.find((c) => conn[c.id] === pid);

  const pickCable = (id) => {
    if (done || conn[id]) return;
    AudioSys.blipSfx(500);
    setSel(id === sel ? null : id);
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
      if (Object.keys(next).length === cables.length) {
        setDone(true);
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1000);
      }
    } else {
      setSpark({ ci, pi });
      setErrors((e) => e + 1);
      setSel(null);
      onFail(config.penalty || { gurultu: 4, text: t("puzzle.wiresSpark") });
      setTimeout(() => setSpark(null), 480);
    }
  };

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.wiresTitle")}</div>
        <svg viewBox="0 0 260 200" style={{ width: "100%", maxWidth: 280 }}>
          <rect x="0" y="0" width="260" height="200" rx="6" fill="#070d0c" stroke="#14312c" />
          {Object.entries(conn).map(([cid, pid]) => {
            const ci = cables.findIndex((c) => c.id === cid);
            const pi = ports.findIndex((p) => p.id === pid);
            return (
              <path key={cid} d={wire(ci, pi)} fill="none"
                stroke={cables[ci].color} strokeWidth="3" opacity="0.9" />
            );
          })}
          {spark && (
            <path d={wire(spark.ci, spark.pi)} fill="none"
              stroke="#e06a4a" strokeWidth="3" strokeDasharray="6 5" opacity="0.9" />
          )}
          {cables.map((c, i) => (
            <g key={c.id} onClick={() => pickCable(c.id)} style={{ cursor: "pointer" }}>
              <circle cx="30" cy={yOf(i, cables.length)} r="12"
                fill={conn[c.id] ? "#0c1514" : "#0a1210"}
                stroke={sel === c.id ? "#e8e4d8" : c.color}
                strokeWidth={sel === c.id ? 3 : 2} />
              <circle cx="30" cy={yOf(i, cables.length)} r="5" fill={c.color} opacity={conn[c.id] ? 0.4 : 1} />
              <text x="30" y={yOf(i, cables.length) + 26} textAnchor="middle"
                fontFamily={mono} fontSize="8" fill="#5f7573">{c.label}</text>
            </g>
          ))}
          {ports.map((p, i) => {
            const owner = portOwner(p.id);
            const sparking = spark && ports[spark.pi]?.id === p.id;
            return (
              <g key={p.id} onClick={() => pickPort(p.id)} style={{ cursor: "pointer" }}>
                <rect x="216" y={yOf(i, ports.length) - 11} width="26" height="22" rx="3"
                  fill={sparking ? "#3a120c" : owner ? "#0c1a16" : "#0a1210"}
                  stroke={sparking ? "#e06a4a" : owner ? owner.color : "#235248"}
                  strokeWidth="2" />
                <text x="229" y={yOf(i, ports.length) + 4} textAnchor="middle"
                  fontFamily={mono} fontSize={sparking ? "12" : "8"}
                  fill={sparking ? "#f0a060" : "#7fae9c"}>
                  {sparking ? "⚡" : p.label}
                </text>
              </g>
            );
          })}
          {errors > 0 && !done && (
            <text x="10" y="192" fontFamily={mono} fontSize="8" fill="#8a4a3a">⚡ ×{errors}</text>
          )}
        </svg>
        <div style={done ? P.msgOk : P.hint}>
          {done ? t("puzzle.wiresDone") : sel ? t("puzzle.wiresHintPort") : t("puzzle.wiresHintPick")}
        </div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("puzzle.cancel")}</button>
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
  g1: "M20 8 A12 12 0 1 0 20.1 8 M20 15 A5 5 0 1 1 19.9 15",
  g2: "M13 10 V30 M27 10 V30 M13 20 H27",
  g3: "M20 8 V32 M12 14 L28 26 M28 14 L12 26",
  g4: "M12 12 Q28 20 12 28 M28 12 Q12 20 28 28",
  g5: "M20 8 L30 20 L20 32 L10 20 Z M20 15 V25",
  g6: "M10 24 Q20 8 30 24 M20 24 V32 M15 30 H25",
  g7: "M11 13 Q16 9 20 13 Q24 17 29 13 M11 20 Q16 16 20 20 Q24 24 29 20 M11 27 Q16 23 20 27 Q24 31 29 27",
  g8: "M20 8 Q10 18 20 22 Q30 26 20 34 M13 14 L27 14",
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
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.symbolsTitle")}</div>
        <svg viewBox="-105 -105 210 210" style={{ width: "100%", maxWidth: 250 }}>
          <polygon points="0,-100 71,-71 100,0 71,71 0,100 -71,71 -100,0 -71,-71"
            fill="#0d1210" stroke="#2a3a30" strokeWidth="2" />
          {glyphs.map((id, i) => {
            const ang = (i / glyphs.length) * Math.PI * 2 - Math.PI / 2;
            const cx = Math.cos(ang) * 68, cy = Math.sin(ang) * 68;
            const lit = litSet.has(id) && !done ? true : done;
            const fl = flash?.id === id;
            return (
              <g key={id} transform={`translate(${cx},${cy})`}
                onClick={() => press(id)} style={{ cursor: "pointer" }}>
                <circle r="24"
                  fill={fl ? (flash.ok ? "#16302a" : "#3a120c") : lit ? "#132420" : "#0a0e0c"}
                  stroke={fl ? (flash.ok ? "#7fae86" : "#e06a4a") : lit ? "#7fae86" : "#3a4a40"}
                  strokeWidth="2.5" style={{ transition: "stroke 200ms, fill 200ms" }} />
                <path d={GLYPHS[id]} fill="none"
                  stroke={lit || fl ? "#d8cfa0" : "#8a7f5a"} strokeWidth="2"
                  strokeLinecap="round" transform="translate(-20,-20)" />
              </g>
            );
          })}
          <text x="0" y="5" textAnchor="middle" fontFamily={mono} fontSize="11"
            fill={done ? "#7fae86" : "#3f5a52"}>
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
  ["M0 -36 V36", "M-12 26 H12", "M-9 36 H9"],
  ["M0 -70 V-40", "M0 40 V48", "M-66 8 H-42", "M42 8 H66", "M-42 8 L-24 8", "M24 8 L42 8"],
  ["M0 -92 V-74", "M-7 -84 L0 -94 L7 -84", "M-84 8 H-70", "M70 8 H84"],
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
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.ringsTitle")}</div>
        <svg viewBox="-105 -105 210 210" style={{ width: "100%", maxWidth: 260 }}>
          <circle r="100" fill="#d8d2c2" opacity="0.14" />
          <circle r="100" fill="none" stroke="#3a4438" strokeWidth="4" />
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
                      d={wedge(r1, r0, (k / n) * 360 + (k % 3) * 4, ((k + 1) / n) * 360 - (k % 2) * 6)}
                      fill={hole ? "#070908" : c}
                      opacity={hole ? 0.95 : done ? 0.5 : 0.34}
                      stroke={hole ? "#3a4438" : placed ? "#e8c95a" : "#1a1f1a"}
                      strokeWidth={placed ? 2 : 1.2}
                      strokeDasharray={hole ? "4 3" : "none"} />
                  );
                })}
                {FIGURE[i].map((d, k) => figHidden(i, k) ? null : (
                  <path key={"f" + k} d={d} fill="none"
                    stroke={done ? "#e8c95a" : "#c8a94a"} strokeWidth="4"
                    strokeLinecap="round"
                    style={{ transition: "stroke 400ms" }}
                    opacity={done ? 1 : 0.9} />
                ))}
              </g>
            );
          })}
          {done && <circle r="100" fill="#e8c95a" opacity="0.07" />}
        </svg>
        <div style={P.ctrlRow}>
          {rings.map((r, i) => (
            <span key={i} style={{ display: "flex", gap: 6 }}>
              <button className="s1-btn s1-key"
                style={{ ...S.keyBtn, borderColor: r.color, minWidth: 46 }}
                onClick={() => rotate(i, -1)}>⟲</button>
              <button className="s1-btn s1-key"
                style={{ ...S.keyBtn, borderColor: r.color, minWidth: 46 }}
                onClick={() => rotate(i, 1)}>⟳</button>
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
  "M60 12 A48 48 0 1 0 60.1 12",                       // dış çember
  "M60 24 V96",                                         // gövde
  "M36 44 H84",                                         // kollar
  "M60 24 L46 38 M60 24 L74 38",                        // çapa uçları
  "M42 96 Q60 82 78 96",                                // taban yayı
  "M24 60 Q40 52 44 60 M96 60 Q80 52 76 60",            // yan işaretler
  "M52 70 A8 8 0 1 0 68 70 A8 8 0 1 0 52 70",           // göz
];

export function TilesOverlay({ config, onSuccess, onFail, onCancel }) {
  const n = 3;
  const [perm, setPerm] = useState(config.scramble || [4, 2, 8, 6, 0, 7, 1, 5, 3]);
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
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.tilesTitle")}</div>
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 4,
          width: "100%", maxWidth: 240, padding: 8,
          backgroundColor: "#0c0f0d", border: "2px solid #2a3a30", borderRadius: 6,
        }}>
          {perm.map((tile, pos) => {
            const tx = (tile % n) * 40, ty = Math.floor(tile / n) * 40;
            const right = tile === pos;
            return (
              <div key={pos} onClick={() => tap(pos)} style={{
                aspectRatio: "1", cursor: "pointer", borderRadius: 3,
                backgroundColor: "#e8e2d0",
                outline: sel === pos ? "2px solid #d8b34a" : right && !done ? "1px solid #7fae8644" : "1px solid #b8b09a",
                overflow: "hidden", transition: "outline 150ms",
                opacity: done ? 1 : 0.96,
              }}>
                <svg viewBox={`${tx} ${ty} 40 40`} style={{ width: "100%", height: "100%", display: "block" }}>
                  {TILE_ART.map((d, i) => (
                    <path key={i} d={d} fill="none" stroke="#7a6248" strokeWidth="3" strokeLinecap="round" />
                  ))}
                  <rect x={tx} y={ty} width="40" height="40" fill="none" />
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
      backgroundColor: "#0c0f0d", border: "2px solid #2a3a30", borderRadius: 5,
    }}>
      {vals.map((v, i) => (
        <div key={i} onClick={clickable ? () => tap(i) : undefined} style={{
          aspectRatio: "1", borderRadius: 2, cursor: clickable ? "pointer" : "default",
          backgroundColor: palette[v], border: "1px solid rgba(0,0,0,0.4)",
          transition: "background-color 200ms",
        }} />
      ))}
    </div>
  );

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{config.title || t("puzzle.colorTitle")}</div>
        {config.showTarget && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.2em", color: "#5f7573" }}>
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
