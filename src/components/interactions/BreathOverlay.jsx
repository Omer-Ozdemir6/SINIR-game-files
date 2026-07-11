import React, { useState, useEffect, useRef, useCallback } from "react";
import { t } from "../../i18n";
import { AudioSys } from "../../audio/AudioSys";

// Renk havuzu — zorluk arttıkça devreye giren renk sayısı artar.
const COLORS = [
  { id: "red", hex: "#c23b2e", glow: "rgba(194,59,46,0.55)" },
  { id: "blue", hex: "#7f9eb5", glow: "rgba(127,158,181,0.55)" },
  { id: "amber", hex: "#c79a52", glow: "rgba(199,154,82,0.55)" },
];

export default function BreathOverlay({ interaction, onSuccess, onFail }) {
  const holdMs = interaction.holdMs || 7000;
  const failTo = interaction.fail;
  const successTo = interaction.success;

  // Generate dynamic rhythm template based on a hash of the node ID
  const nodeHash = (successTo || "nx").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // 3 rhythm variations: 0 = Steady, 1 = Accelerating Panic, 2 = Double Thumps (Doublets)
  const rhythmType = nodeHash % 3;

  // Zorluk katmanı: holdMs kısaldıkça zorluk artar (kolay/orta/zor).
  const difficulty = holdMs <= 7000 ? "hard" : holdMs <= 7800 ? "medium" : "easy";
  // Kolayda tek renk (tek düğme), orta ve zorda 3 renk karışık gelir.
  const colorCount = difficulty === "easy" ? 1 : 3;
  // Zor modda notalar çok daha hızlı akar; orta ve kolay arasındaki fark daha ölçülü.
  const baseScroll = difficulty === "hard" ? 600 : difficulty === "medium" ? 1000 : 1400;
  // Zor modda isabet penceresi de biraz daralır.
  const windowMs = difficulty === "hard" ? 100 : difficulty === "medium" ? 120 : 150;

  const [gameStarted, setGameStarted] = useState(() => {
    try {
      return localStorage.getItem("sinir1_breath_tutorial_seen") === "1";
    } catch (e) {
      return false;
    }
  });
  const [adrenaline, setAdrenaline] = useState(30); // Starts with minor stress
  const [spikes, setSpikes] = useState([]);
  const [flash, setFlash] = useState(null); // 'hit' or 'miss'
  const [currentTime, setCurrentTime] = useState(0);

  const gameStartedRef = useRef(false);
  const spikesRef = useRef([]);
  const adrenalineRef = useRef(30);
  const startTimeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const gameTimeRef = useRef(0);
  const animationFrameId = useRef(null);
  const lastPressRef = useRef(0); // en son basılan renk düğmesi — sadece görsel geri bildirim için

  const onSuccessRef = useRef(onSuccess);
  const onFailRef = useRef(onFail);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onFailRef.current = onFail;
  }, [onSuccess, onFail]);

  // Generate heartbeat notes based on the chosen rhythm template
  useEffect(() => {
    const list = [];
    let cur = 1500; // start note after 1.5s to let player react
    let noteId = 0;
    // Kolayda tüm tur boyunca tek sabit renk; orta/zorda her nota rastgele renk alır.
    // Seçim her zaman EKRANDA GÖSTERİLEN buton sayısı (colorCount) kadar renk
    // arasından yapılmalı — yoksa kolay modda basılacak buton hiç olmayan bir
    // renk gelip bulmaca çözülemez hale gelebiliyordu.
    const fixedColor = colorCount === 1 ? Math.floor(Math.random() * colorCount) : null;
    const pickColor = () => (fixedColor !== null ? fixedColor : Math.floor(Math.random() * colorCount));

    if (rhythmType === 1) {
      // Template 1: Accelerating panic (notes get progressively faster)
      let interval = 1200;
      while (cur < holdMs - 600) {
        list.push({ id: noteId++, time: cur, hit: false, missed: false, color: pickColor() });
        cur += interval;
        interval = Math.max(650, interval - 200);
      }
    } else if (rhythmType === 2) {
      // Template 2: Double thumps (lub-dub ... lub-dub)
      while (cur < holdMs - 600) {
        list.push({ id: noteId++, time: cur, hit: false, missed: false, color: pickColor() });
        list.push({ id: noteId++, time: cur + 260, hit: false, missed: false, color: pickColor() });
        cur += 1100 + Math.random() * 200;
      }
    } else {
      // Template 0: Steady rhythmic beats
      while (cur < holdMs - 600) {
        list.push({ id: noteId++, time: cur, hit: false, missed: false, color: pickColor() });
        cur += 800 + Math.random() * 250;
      }
    }

    setSpikes(list);
    spikesRef.current = list;
  }, [holdMs, rhythmType, colorCount]);

  // Adjust heart sound loop according to adrenaline level
  useEffect(() => {
    if (!gameStarted) return;

    const updateHeartRate = () => {
      const adr = adrenalineRef.current;
      if (adr >= 80) {
        AudioSys.heart(280); // Fast heartbeat
      } else if (adr >= 50) {
        AudioSys.heart(380); // Moderate heartbeat
      } else {
        AudioSys.heart(520); // Normal heartbeat
      }
    };

    updateHeartRate();
    const iv = setInterval(updateHeartRate, 1000);
    return () => {
      clearInterval(iv);
      AudioSys.heart(null);
    };
  }, [gameStarted]);

  // Game loop using requestAnimationFrame
  useEffect(() => {
    if (!gameStarted) return;

    lastTimeRef.current = performance.now();
    gameTimeRef.current = 0;
    gameStartedRef.current = true;

    const tick = () => {
      if (!gameStartedRef.current) return;

      const now = performance.now();
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Speed up notes movement dynamically based on stress (up to 45% faster)
      const speedFactor = 1 + (adrenalineRef.current / 100) * 0.45;
      gameTimeRef.current += dt * speedFactor;

      const elapsed = gameTimeRef.current;
      setCurrentTime(elapsed);

      // Check for missed notes that scrolled past
      let adrenalineChanged = false;
      let nextAdrenaline = adrenalineRef.current;

      const nextSpikes = spikesRef.current.map((s) => {
        if (!s.hit && !s.missed && elapsed > s.time + 120) {
          nextAdrenaline = Math.min(100, nextAdrenaline + 20);
          adrenalineChanged = true;
          setFlash("miss");
          AudioSys.blipSfx(180); // Low failure sound
          setTimeout(() => setFlash(null), 250);
          return { ...s, missed: true };
        }
        return s;
      });

      if (adrenalineChanged) {
        adrenalineRef.current = nextAdrenaline;
        spikesRef.current = nextSpikes;
        setAdrenaline(nextAdrenaline);
        setSpikes(nextSpikes);
      }

      // Check failure condition
      if (adrenalineRef.current >= 100) {
        gameStartedRef.current = false;
        AudioSys.heart(null);
        AudioSys.blipSfx(100); // Death sound
        if (onFailRef.current) onFailRef.current(failTo);
        return;
      }

      // Check success condition (scrolled past the end time)
      if (elapsed >= holdMs + 1000) {
        gameStartedRef.current = false;
        AudioSys.heart(null);
        if (onSuccessRef.current) onSuccessRef.current(successTo);
        return;
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      gameStartedRef.current = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameStarted, holdMs, failTo, successTo]);

  // Attempt to hit the closest active note — colorIdx must match the note's color
  const registerHit = useCallback((colorIdx) => {
    if (!gameStartedRef.current) return;

    const elapsed = gameTimeRef.current;
    if (elapsed > holdMs - 400) return; // Ignore input during final success transition

    // Find the closest unhit, not-yet-missed note
    let closestNote = null;
    let minDiff = Infinity;

    spikesRef.current.forEach((s) => {
      if (!s.hit && !s.missed) {
        const diff = Math.abs(elapsed - s.time);
        if (diff < minDiff) {
          minDiff = diff;
          closestNote = s;
        }
      }
    });

    const isHit = closestNote && minDiff <= windowMs && closestNote.color === colorIdx;

    if (isHit) {
      // HIT Success
      const nextSpikes = spikesRef.current.map((s) =>
        s.id === closestNote.id ? { ...s, hit: true } : s
      );
      spikesRef.current = nextSpikes;
      adrenalineRef.current = Math.max(0, adrenalineRef.current - 15);
      setAdrenaline(adrenalineRef.current);
      setSpikes(nextSpikes);
      setFlash("hit");
      AudioSys.blipSfx(560); // High positive blip
      setTimeout(() => setFlash(null), 200);
    } else {
      // Wrong button, wrong timing, or empty press — all count as a MISS
      adrenalineRef.current = Math.min(100, adrenalineRef.current + 15);
      setAdrenaline(adrenalineRef.current);
      setFlash("miss");
      AudioSys.blipSfx(180);
      setTimeout(() => setFlash(null), 200);
    }
  }, [holdMs, windowMs]);



  // UI layout measurements
  const targetX = 15; // Target zone is located at 15% from left of the container

  const startMinigame = () => {
    AudioSys.blipSfx(520);
    try {
      localStorage.setItem("sinir1_breath_tutorial_seen", "1");
    } catch (e) {}
    setGameStarted(true);
  };

  const getRhythmName = () => {
    if (rhythmType === 1) return t("lang") === "tr" ? "Ritim: Hızlanan Çarpıntı" : "Rhythm: Accelerating Panic";
    if (rhythmType === 2) return t("lang") === "tr" ? "Ritim: Çift Atışlar" : "Rhythm: Double Thumps";
    return t("lang") === "tr" ? "Ritim: Düzgün Ritim" : "Rhythm: Steady Beats";
  };

  const getDifficultyLabel = () => {
    const tr = t("lang") === "tr";
    if (difficulty === "hard") return tr ? "Zorluk: YÜKSEK" : "Difficulty: HIGH";
    if (difficulty === "medium") return tr ? "Zorluk: ORTA" : "Difficulty: MEDIUM";
    return tr ? "Zorluk: KOLAY" : "Difficulty: LOW";
  };

  const descText = t("breath.desc");

  if (!gameStarted) {
    return (
      <div style={styles.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
        <div style={styles.tutorialPanel}>
          <div style={styles.tutorialTitle}>⚠️ {t("breath.title")}</div>
          <div style={styles.tutorialDesc}>
            {descText}
          </div>

          <div style={styles.rhythmIndicator}>
            <span>{getRhythmName()}</span>
            <span style={styles.speedLabel}>{getDifficultyLabel()}</span>
          </div>

          <div style={styles.tutorialPreviewBox}>
            <div style={styles.previewTrack}>
              <div style={styles.previewTargetZone}>
                <div style={styles.previewTargetLine} />
              </div>
              <svg width="40" height="60" viewBox="0 0 40 60" style={styles.previewHeartbeat}>
                <path d="M 0 30 L 12 30 L 16 45 L 20 5 L 24 55 L 28 30 L 40 30" fill="none" stroke={COLORS[0].hex} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={styles.previewBtnRow}>
              {COLORS.slice(0, colorCount).map((c) => (
                <div key={c.id} style={{ ...styles.previewColorDot, backgroundColor: c.hex, boxShadow: `0 0 8px ${c.glow}` }} />
              ))}
            </div>
          </div>

          <button style={styles.startBtn} onClick={startMinigame}>
            {t("breath.startBtn")}
          </button>
        </div>
      </div>
    );
  }

  // Calculate visual jitter based on adrenaline level to simulate panic camera shake
  const jitterX = adrenaline > 70 ? (Math.random() - 0.5) * 8.5 : adrenaline > 45 ? (Math.random() - 0.5) * 3 : 0;
  const jitterY = adrenaline > 70 ? (Math.random() - 0.5) * 8.5 : adrenaline > 45 ? (Math.random() - 0.5) * 3 : 0;
  const jitterRotate = adrenaline > 70 ? (Math.random() - 0.5) * 2.5 : 0;
  const panelTransform = `translate(${jitterX}px, ${jitterY}px) rotate(${jitterRotate}deg)`;

  // Make the target zone flicker under high adrenaline to raise difficulty
  const targetFlicker = adrenaline > 75 && Math.random() > 0.6 ? 0.35 : 1;

  return (
    <div style={styles.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...styles.gamePanel, transform: panelTransform }} onClick={(e) => e.stopPropagation()}>
        <div style={styles.gameHeader}>
          <span style={styles.gameTitle}>{t("breath.title")}</span>
          <span style={{
            ...styles.gameStatus,
            color: adrenaline > 70 ? "#c23b2e" : adrenaline > 40 ? "#c79a52" : "#9fc8a4",
            textShadow: adrenaline > 70 ? "0 0 10px rgba(194,59,46,0.5)" : "none",
          }}>
            {adrenaline > 70 ? t("breath.panic") : t("breath.calm")}
          </span>
        </div>

        {/* Adrenaline Meter */}
        <div style={styles.meterContainer}>
          <div style={styles.meterLabelRow}>
            <span style={styles.meterLabel}>{t("breath.adrenaline")}</span>
            <span style={styles.meterValue}>{Math.round(adrenaline)}%</span>
          </div>
          <div style={styles.meterTrack}>
            <div style={{
              ...styles.meterFill,
              width: `${adrenaline}%`,
              backgroundColor: adrenaline > 70 ? "#c23b2e" : adrenaline > 40 ? "#c79a52" : "#7f9eb5",
              boxShadow: adrenaline > 70 ? "0 0 12px #c23b2e" : "none",
            }} />
          </div>
        </div>

        {/* Scrolling Track */}
        <div style={styles.trackContainer}>
          {/* Target Zone */}
          <div style={{
            ...styles.targetZone,
            opacity: targetFlicker,
            borderColor: flash === "hit" ? "#7f9eb5" : flash === "miss" ? "#c23b2e" : "#454a3f",
            boxShadow: flash === "hit" ? "inset 0 0 18px rgba(127,174,134,0.5), 0 0 15px rgba(127,148,174,0.3)" 
                     : flash === "miss" ? "inset 0 0 18px rgba(194,59,46,0.5), 0 0 15px rgba(194,59,46,0.3)" 
                     : "none",
            backgroundColor: flash === "hit" ? "rgba(127,174,134,0.08)" : flash === "miss" ? "rgba(194,59,46,0.08)" : "rgba(0,0,0,0.15)",
          }}>
            <div style={{
              ...styles.targetLine,
              backgroundColor: flash === "hit" ? "#7f9eb5" : flash === "miss" ? "#c23b2e" : "#525a60",
            }} />
          </div>

          {/* Grid lines background */}
          <div style={styles.trackGrid} />

          {/* Scrolling Heartbeats */}
          {spikes.map((s) => {
            const elapsed = currentTime;
            const x = targetX + ((s.time - elapsed) / baseScroll) * (100 - targetX);

            if (x < -10 || x > 110) return null;

            const noteColor = COLORS[s.color] || COLORS[0];

            return (
              <div
                key={s.id}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "none",
                  opacity: s.hit ? 0.35 : 1,
                  filter: s.hit
                    ? "drop-shadow(0 0 2px rgba(127,174,134,0.4))"
                    : s.missed
                      ? "drop-shadow(0 0 4px rgba(194,59,46,0.7))"
                      : `drop-shadow(0 0 7px ${noteColor.glow})`,
                }}
              >
                <svg width="42" height="64" viewBox="0 0 42 64" style={{ overflow: "visible" }}>
                  <path
                    d="M 0 32 L 12 32 L 16 48 L 21 8 L 26 56 L 30 32 L 42 32"
                    fill="none"
                    stroke={s.hit ? "#7f9eb5" : s.missed ? "#c23b2e" : noteColor.hex}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Input area — gelen notanın rengiyle eşleşen düğmeye bas */}
        <div style={styles.inputArea}>
          <div style={styles.colorBtnRow}>
            {COLORS.slice(0, colorCount).map((c, idx) => (
              <button
                key={c.id}
                style={{
                  ...styles.colorBtn,
                  backgroundColor: c.hex,
                  transform: flash && lastPressRef.current === idx ? "scale(0.9)" : "scale(1)",
                  boxShadow: flash === "hit" && lastPressRef.current === idx
                    ? `0 0 20px ${c.glow}, inset 0 0 10px rgba(255,255,255,0.4)`
                    : `0 4px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)`,
                  opacity: flash === "miss" && lastPressRef.current === idx ? 0.55 : 1,
                }}
                onPointerDown={(e) => { e.stopPropagation(); lastPressRef.current = idx; registerHit(idx); }}
              />
            ))}
          </div>
          <div style={styles.inputTip}>
            {t("breath.target")}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlayDim: {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  },
  tutorialPanel: {
    width: "min(92vw, 420px)",
    backgroundColor: "#121413",
    border: "2px solid #5a523b",
    boxShadow: "0 20px 60px rgba(0,0,0,0.9), inset 0 0 25px rgba(90,82,59,0.15)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "4px",
    color: "#d7d0b8",
  },
  tutorialTitle: {
    fontSize: "20px",
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    color: "#e8e4d2",
    textAlign: "center",
    borderBottom: "1px solid #4a4538",
    paddingBottom: "12px",
  },
  tutorialDesc: {
    fontSize: "14px",
    fontFamily: "system-ui, sans-serif",
    lineHeight: "1.6",
    color: "#b0ab97",
    textAlign: "justify",
  },
  rhythmIndicator: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    color: "#c79a52",
    borderBottom: "1px dashed #30372f",
    paddingBottom: "6px",
  },
  speedLabel: {
    color: "#8a9a97",
  },
  tutorialPreviewBox: {
    backgroundColor: "#080909",
    border: "1px solid #3c382b",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    position: "relative",
  },
  previewTrack: {
    width: "160px",
    height: "50px",
    border: "1px dashed #4a5148",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#0f1110",
  },
  previewTargetZone: {
    position: "absolute",
    left: "15%",
    top: 0,
    bottom: 0,
    width: "24px",
    transform: "translateX(-50%)",
    border: "1.5px solid rgba(127,174,134,0.6)",
    backgroundColor: "rgba(127,174,134,0.12)",
    display: "flex",
    justifyContent: "center",
  },
  previewTargetLine: {
    width: "1.5px",
    backgroundColor: "#7f9eb5",
    height: "100%",
  },
  previewHeartbeat: {
    position: "absolute",
    left: "42%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.8,
    filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))",
  },
  previewBtnRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  previewColorDot: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.35)",
  },
  startBtn: {
    padding: "14px",
    backgroundColor: "#7f9eb5",
    border: "none",
    color: "#050706",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(127,148,174,0.3)",
    transition: "background-color 0.2s",
  },
  gamePanel: {
    width: "min(92vw, 440px)",
    backgroundColor: "#0d0f0e",
    border: "2px solid #30372f",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.95)",
  },
  gameHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameTitle: {
    fontFamily: "'Courier New', monospace",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#8a9a97",
    letterSpacing: "0.08em",
  },
  gameStatus: {
    fontFamily: "'Courier New', monospace",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.08em",
  },
  meterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  meterLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "'Courier New', monospace",
    fontSize: "11px",
    color: "#8a9a97",
  },
  meterLabel: {
    letterSpacing: "0.05em",
  },
  meterValue: {
    fontWeight: "bold",
  },
  meterTrack: {
    height: "10px",
    backgroundColor: "#171d1b",
    border: "1px solid #232c29",
    borderRadius: "2px",
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    transition: "width 150ms ease, background-color 150ms ease",
  },
  trackContainer: {
    position: "relative",
    height: "90px",
    border: "2px solid #232c29",
    backgroundColor: "#050706",
    overflow: "hidden",
    boxShadow: "inset 0 0 25px rgba(0,0,0,0.9)",
  },
  trackGrid: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "linear-gradient(rgba(35,44,41,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(35,44,41,0.2) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  },
  targetZone: {
    position: "absolute",
    left: "15%",
    top: 0,
    bottom: 0,
    width: "36px",
    transform: "translateX(-50%)",
    borderLeft: "2px solid",
    borderRight: "2px solid",
    zIndex: 10,
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
    transition: "all 100ms ease",
  },
  targetLine: {
    width: "2px",
    height: "100%",
    opacity: 0.8,
  },
  inputArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },
  colorBtnRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  colorBtn: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    padding: 0,
    transition: "transform 100ms ease, box-shadow 100ms ease, opacity 100ms ease",
    touchAction: "none",
  },
  inputTip: {
    fontFamily: "'Courier New', monospace",
    fontSize: "11px",
    color: "#6c7a77",
    letterSpacing: "0.05em",
  },
};
