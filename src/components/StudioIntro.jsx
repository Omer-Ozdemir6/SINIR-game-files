import { useState, useEffect } from "react";
import { AudioSys } from "../audio/AudioSys";

export default function StudioIntro({ onDone }) {
  const [phase, setPhase] = useState("pre"); // pre | black | in | hold | out
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let alive = true;
    const seq = [
      [4200, () => setPhase("black")],
      [5600, () => setPhase("in")],
      [7200, () => setPhase("hold")],
      [8200, () => { setGlitch(true); AudioSys.burst?.(140); }],
      [8420, () => setGlitch(false)],
      [9400, () => { setGlitch(true); AudioSys.burst?.(120); }],
      [9650, () => setGlitch(false)],
      [10800, () => setPhase("out")],
      [11800, () => { if (alive) onDone(); }],
    ];
    const timers = seq.map(([ms, fn]) => setTimeout(() => { if (alive) fn(); }, ms));
    return () => { alive = false; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = phase === "out" ? "s1-fadeout" : "";
  const logoCls = phase === "in" ? "s1-fadein" : "";
  const visible = phase !== "pre" && phase !== "black";

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
      {phase === "pre" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse at 48% 48%, rgba(37,50,68,0.78) 0%, rgba(18,24,31,0.78) 38%, rgba(3,5,6,0.98) 100%)",
          overflow: "hidden",
        }} className="s1-fadein">
          <div style={{
            position: "absolute", inset: 0,
            background: [
              "radial-gradient(circle at 14% 18%, rgba(205,215,225,0.12), transparent 4%)",
              "radial-gradient(circle at 72% 16%, rgba(205,215,225,0.09), transparent 5%)",
              "radial-gradient(circle at 82% 66%, rgba(170,190,205,0.12), transparent 7%)",
              "radial-gradient(circle at 38% 66%, rgba(205,215,225,0.08), transparent 5%)",
              "linear-gradient(90deg, rgba(0,0,0,0.55), transparent 18%, transparent 82%, rgba(0,0,0,0.65))",
            ].join(", "),
            filter: "blur(1px)",
            opacity: 0.96,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "repeating-radial-gradient(circle at 45% 45%, rgba(215,225,235,0.09) 0 1px, transparent 1px 7px)",
            opacity: 0.12,
            mixBlendMode: "screen",
          }} />
          <div style={{
            position: "absolute", left: "6%", right: "6%", top: "43%",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(18px, 6.5vw, 86px)",
            color: "rgba(220,230,245,0.86)",
            fontFamily: "'Courier New', ui-monospace, monospace",
            fontSize: "clamp(24px, 5vw, 56px)",
            letterSpacing: "0.2em",
            textShadow: "0 0 12px rgba(210,220,245,0.42), 0 0 2px rgba(255,255,255,0.65)",
            filter: "blur(0.15px)",
          }}>
            {["P", "E", "R", "I", "S", "H", "E", "D"].map((ch, i) => (
              <span key={i} style={{
                transform: i === 4 ? "translateY(-8px) scaleY(1.35)" : "none",
                opacity: 1,
              }}>{ch}</span>
            ))}
          </div>
          <div style={{
            position: "absolute", left: "50%", top: "38%",
            width: 86, height: 122, transform: "translate(-50%, -50%)",
            opacity: 0.72,
            filter: "drop-shadow(0 0 9px rgba(210,225,245,0.5))",
          }}>
            <svg viewBox="0 0 90 130" style={{ width: "100%", height: "100%" }}>
              <path d="M45 8 L45 118 M25 80 L65 80 M31 72 L59 72 M36 64 L54 64" stroke="#dfe8f4" strokeWidth="3" strokeLinecap="round" opacity="0.82" />
              <path d="M45 14 C36 28 42 38 35 52 C49 45 42 28 55 17" fill="none" stroke="#dfe8f4" strokeWidth="2" opacity="0.55" />
              <path d="M20 90 C32 82 58 82 70 90 M24 98 C38 92 52 92 66 98" fill="none" stroke="#dfe8f4" strokeWidth="2" opacity="0.7" />
              <path d="M45 8 L45 118" stroke="#dfe8f4" strokeWidth="1" strokeDasharray="2 4" opacity="0.9" />
            </svg>
          </div>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.34) 72%, rgba(0,0,0,0.78))",
          }} />
        </div>
      )}

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
        className={logoCls}
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
