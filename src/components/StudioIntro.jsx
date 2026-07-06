import { useState, useEffect } from "react";
import { AudioSys } from "../audio/AudioSys";

/* ============================================================
   YAPIMCI LOGOSU — RED DOORS.
   Akış: bekle → fade-in → 2× glitch (TÜM EKRAN) → fade-out.
   Glitch anında bütün ekran kayıyor/titriyor (sadece logo değil).
   Logo: public/reddoors-logo.png
   ============================================================ */
export default function StudioIntro({ onDone }) {
  const [phase, setPhase] = useState("wait");   // wait | in | hold | out
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let alive = true;
    const seq = [
      [1400, () => setPhase("in")],
      [2600, () => setPhase("hold")],
      [3300, () => { setGlitch(true); AudioSys.burst?.(140); }],
      [3520, () => setGlitch(false)],
      [4050, () => { setGlitch(true); AudioSys.burst?.(120); }],
      [4300, () => setGlitch(false)],
      [5000, () => setPhase("out")],
      [6000, () => { if (alive) onDone(); }],
    ];
    const timers = seq.map(([ms, fn]) => setTimeout(() => { if (alive) fn(); }, ms));
    return () => { alive = false; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = phase === "in" ? "s1-fadein" : phase === "out" ? "s1-fadeout" : "";
  const visible = phase !== "wait";

  return (
    <div
      onClick={onDone}
      className={cls + (glitch ? " s1-glitch" : "")}
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* glitch anında tüm ekranı kaplayan renk kayması katmanları */}
      {glitch && (
        <>
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 4px)",
            mixBlendMode: "screen",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(90deg, rgba(194,59,46,0.12), transparent 30%, transparent 70%, rgba(58,122,154,0.12))",
            transform: "translateX(4px)",
          }} />
          {/* yatay kayma bantları */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: "38%", height: "8%", zIndex: 4,
            background: "rgba(0,0,0,0.6)", transform: "translateX(-8px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, top: "62%", height: "4%", zIndex: 4,
            background: "rgba(255,255,255,0.05)", transform: "translateX(10px)", pointerEvents: "none",
          }} />
        </>
      )}

      <div
        style={{
          position: "relative", zIndex: 1,
          width: "min(52vw, 300px)",
          opacity: visible ? undefined : 0,
          filter: glitch
            ? "drop-shadow(3px 0 #c23b2e) drop-shadow(-3px 0 #3a7a9a)"
            : "none",
          transform: glitch ? "translateX(-3px) skewX(-1deg)" : "none",
        }}
      >
        <img
          src="/reddoors-logo.png"
          alt="RED DOORS"
          style={{ width: "100%", height: "auto", display: "block" }}
          draggable={false}
        />
      </div>
    </div>
  );
}
