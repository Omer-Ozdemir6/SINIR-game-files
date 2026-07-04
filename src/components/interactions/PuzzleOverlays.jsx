import { useState, useEffect } from "react";
import { styles as S } from "../../styles/theme";
import { AudioSys } from "../../audio/AudioSys";

const mono = "'Courier New', ui-monospace, monospace";

const P = {
  hint: { fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: "#5f7573", textAlign: "center", lineHeight: 1.7 },
  msgOk: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#7fae86", textAlign: "center", minHeight: 15, textShadow: "0 0 8px rgba(127,174,134,0.6)" },
  msgBad: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#ff4d4d", textAlign: "center", minHeight: 15, textShadow: "0 0 8px rgba(255,77,77,0.6)" },
  ctrlRow: { display: "flex", gap: 8, width: "100%", justifyContent: "center", flexWrap: "wrap", marginTop: 12 },
};

// Simple shape definitions for other puzzles (unchanged)
const SHAPES = {
  starOuter: "0,-66 22,-52 58,-40 46,-6 62,30 30,44 12,64 -18,56 -52,42 -44,6 -60,-26 -30,-46",
  starInner: "0,-38 12,-12 34,-6 14,6 20,32 0,16 -20,32 -14,6 -34,-6 -12,-12",
  gearOuter: "0,-70 15,-70 20,-55 35,-50 48,-60 58,-50 48,-35 55,-20 70,-15 70,0 55,20 48,35 58,50 48,60 35,50 20,55 15,70 0,70 -15,70 -20,55 -35,50 -48,60 -58,50 -48,35 -55,20 -70,15 -70,0 -55,-20 -48,-35 -58,-50 -48,-60 -35,-50 -20,-55 -15,-70",
  gearInner: "0,-40 10,-35 25,-25 35,-10 35,10 25,25 10,35 0,40 -10,35 -25,25 -35,10 -35,-10 -25,-25 -10,-35",
  polygonOuter: "0,-65 45,-45 65,0 45,45 0,65 -45,45 -65,0 -45,-45",
  polygonInner: "0,-35 25,-25 35,0 25,25 0,35 -25,25 -35,0 -25,-25"
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/* ============================================================
   4) ANTİK LEVHA HİZALAMA BULMACASI (PLATE LINKER PUZZLE)
   ============================================================ */

/**
 * A helper component that samples a hexagonal section of the complete fresco image
 * and displays it. When the piece is correctly oriented, it fits perfectly.
 */
function FrescoHexagon({ cx, cy, r, id, targetIdx, currentIdx, isMatched }) {
  const getHexPoints = (x, y, radius) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angleDeg = 60 * i - 30; // 0 degree offset for vertical hexagons
      const angleRad = (Math.PI / 180) * angleDeg;
      points.push(`${x + radius * Math.cos(angleRad)},${y + radius * Math.sin(angleRad)}`);
    }
    return points.join(" ");
  };

  const clipPathId = `fresco-hex-clip-${id}`;
  const rotation = (currentIdx - targetIdx) * 60; // Rotation relative to target

  // Scale the clip path radius slightly for better visual alignment
  const innerR = r - 2;

  return (
    <>
      <defs>
        <clipPath id={clipPathId}>
          <polygon points={getHexPoints(cx, cy, innerR)} />
        </clipPath>
      </defs>
      
      {/* Hexagonal path as a boundary */}
      <polygon
        points={getHexPoints(cx, cy, r)}
        fill="none"
        stroke={isMatched ? "#639c6c" : "#3d3024"}
        strokeWidth="1.5"
      />
      
      {/* Group to clip and rotate the texture. */}
      <g
        clipPath={`url(#${clipPathId})`}
        style={{
          transformOrigin: `${cx}px ${cy}px`, // Rotate the hexagon about its own center
          transition: "transform 250ms cubic-bezier(0.25, 1, 0.5, 1)", // Apply same transition as other overlays
        }}
        transform={`rotate(${rotation})`}
      >
        {/* Use CSS positioning and transform to align a single texture for the whole board. */}
        <image
          href="/assets/image_4.png" // The generated reference image
          x={cx - 140} // Align image center (140,105) with plate center
          y={cy - 105} // Assume source image is 280x210 in size.
          width="280"
          height="210"
          style={{
            transform: `translate(${- (cx - 140)}px, ${- (cy - 105)}px)`, // Counteract image placement to fix it in board space.
          }}
        />
      </g>
    </>
  );
}

// Replace the simple design functions with our texture sampling approach
const PLATE_ARTWORKS = {
  0: (idx) => <FrescoHexagon id={0} {...idx} />,
  1: (idx) => <FrescoHexagon id={1} {...idx} />,
  2: (idx) => <FrescoHexagon id={2} {...idx} />,
  3: (idx) => <FrescoHexagon id={3} {...idx} />,
  4: (idx) => <FrescoHexagon id={4} {...idx} />,
  5: (idx) => <FrescoHexagon id={5} {...idx} />,
  6: (idx) => <FrescoHexagon id={6} {...idx} />
};

export function PlateLinkerOverlay({ config, onSuccess, onFail, onCancel }) {
  const [plates, setPlates] = useState([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const size = 33; // Fixed plate size
    const cx = 140;  // Center of the 280x210 viewbox
    const cy = 105;  // Center of the viewbox

    // Layout calculation for a perfectly centered hexagon matrix
    const hDist = size * Math.sqrt(3);
    const vDist = size * 1.5;

    // Define target and current orientations for all plates.
    const initialPlates = [
      { id: 0, cx: cx, cy: cy, r: size, isStatic: true, targetIdx: 0 },
      { id: 1, cx: cx, cy: cy - vDist, r: size, isStatic: false, targetIdx: 0 },
      { id: 2, cx: cx + hDist, cy: cy - vDist / 2, r: size, isStatic: false, targetIdx: 2 },
      { id: 3, cx: cx + hDist, cy: cy + vDist / 2, r: size, isStatic: false, targetIdx: 4 },
      { id: 4, cx: cx, cy: cy + vDist, r: size, isStatic: false, targetIdx: 1 },
      { id: 5, cx: cx - hDist, cy: cy + vDist / 2, r: size, isStatic: false, targetIdx: 5 },
      { id: 6, cx: cx - hDist, cy: cy - vDist / 2, r: size, isStatic: false, targetIdx: 3 }
    ].map(p => {
      if (p.isStatic) return { ...p, currentIdx: 0 };
      
      // Assign a random non-target starting orientation.
      let startIdx;
      do {
        startIdx = Math.floor(Math.random() * 6);
      } while (startIdx === p.targetIdx);

      return { ...p, currentIdx: startIdx };
    });

    setPlates(initialPlates);
    setLocked(false);
    setMoves(0);
  }, [config]);

  const rotatePlate = (id) => {
    if (locked) return;

    const target = plates.find(p => p.id === id);
    if (!target || target.isStatic) return; // Cannot rotate static plates

    AudioSys.blipSfx(420);
    setMoves(prev => prev + 1);

    const nextPlates = plates.map(p => {
      if (p.id === id) {
        // Increment orientation, modulo 6
        return { ...p, currentIdx: (p.currentIdx + 1) % 6 };
      }
      return p;
    });

    setPlates(nextPlates);

    // Check for success condition: All non-static plates are correctly oriented.
    const isMatched = nextPlates.every(p => p.currentIdx === p.targetIdx);
    if (isMatched) {
      setLocked(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1200);
    }
  };

  return (
    <div style={{ ...S.overlayDim, userSelect: "none" }} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.keypadPanel, border: "2px solid #2b221a", background: "#14100d" }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#d1bba0", letterSpacing: "0.12em" }}>KADİM LEVHA ENTEGRASYONU</div>

        {/* Puzzle area with background and single cohesive texture. */}
        <div style={{ backgroundColor: "#080605", padding: "20px 0", borderRadius: 8, border: "1px solid #241c15", display: "flex", justifyContent: "center", position: "relative" }}>
          
          {/* Main SVG viewbox. The cohesive fresco image covers the entire board. */}
          <svg viewBox="0 0 280 210" style={{ width: "100%", maxWidth: 280, position: "relative" }}>
            
            {/* The actual completed artwork is rendered here and serves as the source texture. */}
            {/* The FrescoHexagon component isolates and rotates sections of this texture. */}
            {plates.map((p) => {
              // Pass the entire plate state to the render function.
              const drawArt = PLATE_ARTWORKS[p.id];
              return (
                <g key={p.id} onClick={() => rotatePlate(p.id)} style={{ cursor: p.isStatic ? "default" : locked ? "not-allowed" : "pointer" }}>
                  {drawArt && drawArt({ ...p, isMatched: p.currentIdx === p.targetIdx })}
                </g>
              );
            })}

            {/* Brass alignment pins from the static central plate (unchanged) */}
            {plates.map((p) => (
              p.id === 0 && (
                <g key="brass-pins" pointerEvents="none">
                  {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                    const rad = (Math.PI / 180) * (angle - 30);
                    const pinX = p.cx + p.r * Math.cos(rad);
                    const pinY = p.cy + p.r * Math.sin(rad);
                    return (
                      <circle key={idx} cx={pinX} cy={pinY} r="2.5" fill="#bfa37a" stroke="#54432f" strokeWidth="1" />
                    );
                  })}
                </g>
              )
            ))}
          </svg>
        </div>

        {/* State and move count (unchanged) */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", marginTop: 10 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: "#8c755c" }}>HİZALAMA HAMLESİ: {moves}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: locked ? "#7fae86" : "#baa48a" }}>
            {locked ? "MÜHÜR AÇILDI" : "FİGÜRÜ BİRLEŞTİRİN"}
          </span>
        </div>

        {/* Hint and success text (unchanged) */}
        <div style={{
          fontFamily: mono, fontSize: 11, letterSpacing: "0.04em", color: locked ? "#7fae86" : "#ab947b",
          textAlign: "center", marginTop: 12, lineHeight: 1.4
        }}>
          {locked 
            ? "✓ FRESK TAMAMLANDI — KİLİT MEKANİZMASI SERBEST KALDI" 
            : "Karoları döndürerek denizden yükselen tehdidin ve çaresiz figürün resmini tamamlayın."}
        </div>

        {!locked && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 12, borderColor: "#4d3d2e", color: "#ab947b" }} onClick={onCancel}>Geri Çekil</button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Other Puzzle Types (WiresOverlay, ShadowOverlay, MixOverlay)
   Unchanged from user input.
   ============================================================ */

export function ShadowOverlay({ config, onSuccess, onFail, onCancel }) {
  const [outer, setOuter] = useState(0);
  const [inner, setInner] = useState(0);
  const [locked, setLocked] = useState(false);
  const [runtimeConfig, setRuntimeConfig] = useState(null);

  useEffect(() => {
    const step = config?.step || 15;
    const targetOuter = Math.floor(Math.random() * 12) * step;
    const targetInner = Math.floor(Math.random() * 12) * step;
    
    const shapePool = [
      { outer: SHAPES.starOuter, inner: SHAPES.starInner, type: "RADYAL KİLİT MATRİSİ" },
      { outer: SHAPES.gearOuter, inner: SHAPES.gearInner, type: "ÇARK ODAKLAMA SİSTEMİ" },
      { outer: SHAPES.polygonOuter, inner: SHAPES.polygonInner, type: "ASİMETRİK OPTİK BARAJ" }
    ];
    const chosenShape = shapePool[Math.floor(Math.random() * shapePool.length)];

    setRuntimeConfig({
      step,
      targetOuter,
      targetInner,
      shape: chosenShape,
      tol: Math.max(7, step / 2 - 1)
    });
    
    setOuter(targetOuter + 90);
    setInner(targetInner - 90);
  }, [config]);

  if (!runtimeConfig) return null;

  const near = (a, b) => {
    const d = Math.abs(((a - b) % 360 + 540) % 360 - 180);
    return d <= runtimeConfig.tol;
  };

  const rotate = (which, dir) => {
    if (locked) return;
    AudioSys.clank();
    const next = which === "o" ? outer + dir * runtimeConfig.step : inner + dir * runtimeConfig.step;
    const no = which === "o" ? next : outer;
    const ni = which === "i" ? next : inner;
    
    if (which === "o") setOuter(next); else setInner(next);
    
    if (near(no, runtimeConfig.targetOuter) && near(ni, runtimeConfig.targetInner)) {
      setLocked(true);
      AudioSys.blipSfx(980);
      setTimeout(onSuccess, 1100);
    }
  };

  return (
    <div style={{ ...S.overlayDim, userSelect: "none" }} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.keypadPanel, border: "1px solid #2e473b", boxShadow: "0 0 30px rgba(0,0,0,0.85)" }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#7fae9c", letterSpacing: "2px" }}>
          MERCİK HİZALAMA // {runtimeConfig.shape.type}
        </div>
        
        <div style={{ position: "relative", backgroundColor: "#050a08", borderRadius: 6, padding: 10, border: "1px solid #14241d" }}>
          <svg viewBox="-110 -110 220 220" style={{ width: "100%", maxWidth: 260, display: "block", margin: "0 auto" }}>
            <defs>
              <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2c4234" stopOpacity="1" />
                <stop offset="70%" stopColor="#0c1410" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#020504" stopOpacity="1" />
              </radialGradient>
              <filter id="shadowBlur">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>
            
            <circle cx="0" cy="0" r="105" fill="url(#lensGlow)" stroke="#1a3026" strokeWidth="1" />
            
            <circle cx="0" cy="0" r="85" fill="none" stroke="#223a2f" strokeWidth="0.5" strokeDasharray="3 6" />
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#1d3329" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#1d3329" strokeWidth="0.5" strokeDasharray="4 4" />

            <g opacity="0.25">
              <polygon points={runtimeConfig.shape.outer} fill="none" stroke="#a4cfb7" strokeWidth="2" strokeDasharray="4 3" transform={`rotate(${runtimeConfig.targetOuter})`} />
              <polygon points={runtimeConfig.shape.inner} fill="none" stroke="#a4cfb7" strokeWidth="2" strokeDasharray="4 3" transform={`rotate(${runtimeConfig.targetInner})`} />
            </g>
            
            <g filter="url(#shadowBlur)">
              <polygon points={runtimeConfig.shape.outer} fill="rgba(10,16,13,0.95)" stroke="#050807" strokeWidth="1.5" style={{ transition: "transform 250ms cubic-bezier(0.25, 1, 0.5, 1)" }} transform={`rotate(${outer})`} />
              <polygon points={runtimeConfig.shape.inner} fill="rgba(5,9,7,0.98)" stroke="#020403" strokeWidth="1.5" style={{ transition: "transform 250ms cubic-bezier(0.25, 1, 0.5, 1)" }} transform={`rotate(${inner})`} />
            </g>
          </svg>
        </div>

        <div style={P.ctrlRow}>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, minWidth: 65, fontSize: 10 }} onClick={() => rotate("o", -1)}>⟲ DIŞ</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, minWidth: 65, fontSize: 10 }} onClick={() => rotate("o", 1)}>DIŞ ⟳</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, minWidth: 65, fontSize: 10 }} onClick={() => rotate("i", -1)}>⟲ İÇ</button>
          <button className="s1-btn s1-key" style={{ ...S.keyBtn, minWidth: 65, fontSize: 10 }} onClick={() => rotate("i", 1)}>İÇ ⟳</button>
        </div>

        <div style={{ marginTop: 12, ...(locked ? P.msgOk : P.hint) }}>
          {locked ? "⚡ OPTİK HİZALAMA BAŞARILI — KİLİT AÇILDI" : "Mekanizmayı çevirerek arkadaki kılavuz izlerine tam oturt."}
        </div>
        
        {!locked && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 10 }} onClick={onCancel}>Geri Çekil</button>
        )}
      </div>
    </div>
  );
}

export function WiresOverlay({ config, onSuccess, onFail, onCancel }) {
  const [sel, setSel] = useState(null);
  const [conn, setConn] = useState({});
  const [sparkPort, setSparkPort] = useState(null);
  const [done, setDone] = useState(false);
  const [panelModel, setPanelModel] = useState(null);

  useEffect(() => {
    const architectures = [
      { name: "SIGMA-4 ELEKTRONİK YAMASI", pool: [{label:"VOLT",color:"#ff4444"}, {label:"FRQ",color:"#4488ff"}, {label:"DATA",color:"#ffcc00"}] },
      { name: "OMEGA-MNT MATRİS KÖPRÜSÜ", pool: [{label:"AMP",color:"#ff33aa"}, {label:"BUS",color:"#33ffee"}, {label:"SYS",color:"#aacc33"}] },
      { name: "THETA-KAPISI GÜVENLİK AKIMI", pool: [{label:"GND",color:"#888888"}, {label:"LINK",color:"#bb44ff"}, {label:"CORE",color:"#ff8844"}] }
    ];
    const arch = architectures[Math.floor(Math.random() * architectures.length)];
    
    const shuffledCables = shuffle(arch.pool).map((c, i) => ({ id: `c_${i}`, ...c }));
    const shuffledPorts = shuffle([{ id: "p_0", label: "TRM-A" }, { id: "p_1", label: "TRM-B" }, { id: "p_2", label: "TRM-C" }]);
    
    const pairs = {};
    const portIds = shuffledPorts.map(p => p.id);
    shuffledCables.forEach((c, idx) => {
      pairs[c.id] = portIds[idx];
    });

    setPanelModel({
      title: arch.name,
      cables: shuffledCables,
      ports: shuffle(shuffledPorts),
      pairs
    });
  }, [config]);

  if (!panelModel) return null;

  const yOf = (i, n) => 35 + i * (140 / Math.max(1, n - 1));

  const pickCable = (id) => {
    if (done || conn[id]) return;
    AudioSys.blipSfx(520);
    setSel(id === sel ? null : id);
  };

  const pickPort = (pid) => {
    if (done || !sel) return;
    if (Object.values(conn).includes(pid)) return;
    
    if (panelModel.pairs[sel] === pid) {
      AudioSys.clank();
      const next = { ...conn, [sel]: pid };
      setConn(next);
      setSel(null);
      if (Object.keys(next).length === panelModel.cables.length) {
        setDone(true);
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1000);
      }
    } else {
      setSparkPort(pid);
      setSel(null);
      AudioSys.blipSfx(220);
      onFail(config?.penalty || { gurultu: 5, text: "KISA DEVRE! ANAKARTTA KIVILCIM ÇIKTI GÜRÜLTÜ +5" });
      setTimeout(() => setSparkPort(null), 500);
    }
  };

  return (
    <div style={{ ...S.overlayDim, userSelect: "none" }} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.keypadPanel, border: "1px solid #1f3a33" }} className="s1-panel">
        <div style={S.keypadTitle}>{panelModel.title}</div>
        
        <svg viewBox="0 0 280 210" style={{ width: "100%", maxWidth: 300, backgroundColor: "#040807", borderRadius: 4, border: "1px solid #10241f" }}>
          <defs>
            <pattern id="wireGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#091411" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="280" height="210" fill="url(#wireGrid)" />

          {Object.entries(conn).map(([cid, pid]) => {
            const ci = panelModel.cables.findIndex((c) => c.id === cid);
            const pi = panelModel.ports.findIndex((p) => p.id === pid);
            const c = panelModel.cables[ci];
            if (ci === -1 || pi === -1) return null;
            return (
              <g key={cid}>
                <path d={`M 46 ${yOf(ci, panelModel.cables.length)} C 130 ${yOf(ci, panelModel.cables.length)}, 150 ${yOf(pi, panelModel.ports.length)}, 224 ${yOf(pi, panelModel.ports.length)}`}
                  fill="none" stroke={c.color} strokeWidth="5" opacity="0.25" strokeLinecap="round" />
                <path d={`M 46 ${yOf(ci, panelModel.cables.length)} C 130 ${yOf(ci, panelModel.cables.length)}, 150 ${yOf(pi, panelModel.ports.length)}, 224 ${yOf(pi, panelModel.ports.length)}`}
                  fill="none" stroke={c.color} strokeWidth="2.2" strokeLinecap="round" />
              </g>
            );
          })}

          {panelModel.cables.map((c, i) => {
            const isSelected = sel === c.id;
            const isConnected = !!conn[c.id];
            return (
              <g key={c.id} onClick={() => pickCable(c.id)} style={{ cursor: isConnected ? "not-allowed" : "pointer" }}>
                <rect x="15" y={yOf(i, panelModel.cables.length) - 14} width="32" height="28" rx="3" fill="#0b1210" stroke={isSelected ? "#e8e4d8" : "#1a2e28"} strokeWidth={isSelected ? 2 : 1} />
                <circle cx="31" cy={yOf(i, panelModel.cables.length)} r="6" fill={isConnected ? "#1c2623" : c.color} />
                {isSelected && <circle cx="31" cy={yOf(i, panelModel.cables.length)} r="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />}
                <text x="31" y={yOf(i, panelModel.cables.length) + 22} textAnchor="middle" fontFamily={mono} fontSize="7" fill={isSelected ? "#fff" : "#5f7573"}>{c.label}</text>
              </g>
            );
          })}

          {panelModel.ports.map((p, i) => {
            const isSparking = sparkPort === p.id;
            const isMatched = Object.values(conn).includes(p.id);
            return (
              <g key={p.id} onClick={() => pickPort(p.id)} style={{ cursor: isMatched ? "not-allowed" : "pointer" }}>
                <rect x="224" y={yOf(i, panelModel.ports.length) - 14} width="36" height="28" rx="3" 
                  fill={isSparking ? "#42120c" : isMatched ? "#0c1714" : "#08100e"} 
                  stroke={isSparking ? "#ff4444" : isMatched ? "#3a6356" : "#204239"} strokeWidth="1.5" />
                {isSparking ? (
                  <text x="242" y={yOf(i, panelModel.ports.length) + 5} textAnchor="middle" fontSize="11" fill="#ffaa44">⚡</text>
                ) : (
                  <text x="242" y={yOf(i, panelModel.ports.length) + 4} textAnchor="middle" fontFamily={mono} fontSize="8" fill={isMatched ? "#6bb39e" : "#4a7a6d"}>{p.label}</text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ marginTop: 12, ...(done ? P.msgOk : sparkPort ? P.msgBad : P.hint) }}>
          {done ? "✓ ŞEBEKE SENKRONİZASYONU TAMAMLANDI" : sparkPort ? "⚠ SİSTEM GÜVENLİĞİ TETİKLENDİ — KISA DEVRE!" : sel ? "Açık hattı bağlamak için sağ panelden doğru port yuvasını seç." : "Sol taraftan akım yüklemek istediğin bir terminal seç."}
        </div>

        {!done && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 10 }} onClick={onCancel}>Bırak</button>
        )}
      </div>
    </div>
  );
}

export function MixOverlay({ config, onSuccess, onFail, onCancel }) {
  const [mix, setMix] = useState({});
  const [state, setState] = useState("idle");
  const [mixModel, setMixModel] = useState(null);

  useEffect(() => {
    const chemicalPool = [
      { id: "b1", label: "Bromür", color: "#d1b846" },
      { id: "b2", label: "İodin", color: "#46a8d1" },
      { id: "b3", label: "Florür", color: "#b846d1" },
      { id: "b4", label: "Eter", color: "#46d168" }
    ];
    
    const chosenChems = shuffle(chemicalPool).slice(0, 3);
    const target = {};
    let capacity = 0;
    
    chosenChems.forEach((chem) => {
      const amt = Math.floor(Math.random() * 2) + 1;
      target[chem.id] = amt;
      capacity += amt;
    });

    const vesselTypes = ["DİSTİLE KAPSÜLÜ v4", "KRİYO-FİLTER HAZNESİ", "HİBRİT REAKTÖR BEHERİ"];
    const chosenTitle = vesselTypes[Math.floor(Math.random() * vesselTypes.length)];

    setMixModel({
      title: chosenTitle,
      bottles: chosenChems,
      target,
      capacity
    });
    setMix({});
    setState("idle");
  }, [config]);

  if (!mixModel) return null;

  const total = Object.values(mix).reduce((a, b) => a + b, 0);

  const blend = () => {
    if (total === 0) return "#0c1412";
    let r = 0, g = 0, b = 0;
    mixModel.bottles.forEach((bt) => {
      const w = (mix[bt.id] || 0) / total;
      const c = bt.color.match(/\w\w/g).map((h) => parseInt(h, 16));
      r += c[0] * w; g += c[1] * w; b += c[2] * w;
    });
    return `rgba(${r | 0},${g | 0},${b | 0}, 0.85)`;
  };

  const add = (id) => {
    if (state !== "idle" || total >= mixModel.capacity) return;
    AudioSys.blipSfx(400 + Math.random() * 150);
    const next = { ...mix, [id]: (mix[id] || 0) + 1 };
    setMix(next);
    
    const t = Object.values(next).reduce((a, b) => a + b, 0);
    if (t >= mixModel.capacity) {
      const ok = mixModel.bottles.every((bt) => (next[bt.id] || 0) === (mixModel.target[bt.id] || 0));
      if (ok) {
        setState("done");
        AudioSys.blipSfx(980);
        setTimeout(onSuccess, 1200);
      } else {
        setState("fizz");
        AudioSys.blipSfx(250);
        onFail(config?.penalty || { akil: -6, text: "KARIŞIM ASİDİK TEPKİME VERDİ! AKIL KANAYIŞI -6" });
        setTimeout(() => { setMix({}); setState("idle"); }, 1500);
      }
    }
  };

  const fillH = (total / mixModel.capacity) * 88;

  return (
    <div style={{ ...S.overlayDim, userSelect: "none" }} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.keypadPanel, border: "1px solid #4a3b23" }} className="s1-panel">
        <div style={{ ...S.keypadTitle, color: "#d4a35d" }}>{mixModel.title}</div>
        
        <div style={{ backgroundColor: "#060a08", padding: "15px 0", borderRadius: 4, border: "1px solid #1c140a", display: "flex", justifyContent: "center" }}>
          <svg viewBox="0 0 200 140" style={{ width: "100%", maxWidth: 220 }}>
            <rect x="66" y={114 - fillH} width="68" height={fillH} rx="2"
              fill={state === "fizz" ? "#e63946" : blend()}
              style={{ transition: "height 320ms ease, y 320ms ease, fill 400ms" }} />
            
            {total > 0 && state === "idle" && (
              <g opacity="0.6">
                <circle cx="75" cy="90" r="1.5" fill="#fff" opacity="0.4" />
                <circle cx="115" cy="70" r="2" fill="#fff" opacity="0.3" />
                <circle cx="95" cy="100" r="1" fill="#fff" opacity="0.6" />
              </g>
            )}

            {state === "fizz" && (
              <g fill="#ff8888" opacity="0.8">
                <circle cx="80" cy="50" r="3" /> <circle cx="100" cy="45" r="4" />
                <circle cx="120" cy="55" r="2.5" /> <circle cx="90" cy="65" r="3.5" />
              </g>
            )}

            <path d="M 82 10 L 82 35 L 65 110 Q 63 116 72 116 L 128 116 Q 137 116 135 110 L 118 35 L 118 10"
              fill="none" stroke="#5c4d37" strokeWidth="2" strokeLinecap="round" />
            
            <path d="M 72 112 Q 67 112 68 106 L 81 40" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />

            {Array.from({ length: mixModel.capacity }).map((_, i) => {
              const yPos = 114 - ((i + 1) / mixModel.capacity) * 88;
              return (
                <line key={i} x1="126" x2="132" y1={yPos} y2={yPos} stroke="#423725" strokeWidth="1" />
              );
            })}
            
            <text x="142" y="75" fontFamily={mono} fontSize="9" fill="#8c7654" fontWeight="bold">
              {total} / {mixModel.capacity}
            </text>
          </svg>
        </div>

        <div style={P.ctrlRow}>
          {mixModel.bottles.map((bt) => (
            <button key={bt.id} className="s1-btn s1-key"
              style={{ ...S.keyBtn, borderColor: bt.color, color: "#e3e8e5", minWidth: 80, fontSize: 10 }}
              onClick={() => add(bt.id)}>
              {bt.label} <span style={{ color: bt.color, fontSize: 9 }}>({mix[bt.id] || 0})</span>
            </button>
          ))}
          <button className="s1-btn s1-key" style={{ ...S.keyAlt, minWidth: 70, color: "#ff6666", borderColor: "rgba(255,102,102,0.3)" }} 
            onClick={() => { if (state === "idle" && total > 0) { AudioSys.blipSfx(300); setMix({}); } }}>
            BOŞALT
          </button>
        </div>

        <div style={{ marginTop: 12, ...(state === "done" ? P.msgOk : state === "fizz" ? P.msgBad : P.hint) }}>
          {state === "done" ? "✓ SENTEZ BAŞARILI — BİLEŞEN HAZIRLANDI" : state === "fizz" ? "☣ KARIŞIM TEPKİDİ! ASİT GAZI SALINIYOR!" : "Sentez tüpüne tam ölçülerde özüt ekle. Hatalı mililitre reaksiyona neden olur."}
        </div>

        {state !== "done" && (
          <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 10 }} onClick={onCancel}>Uzaklaş</button>
        )}
      </div>
    </div>
  );
}