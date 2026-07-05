import { useState, useEffect } from "react";
import { AudioSys } from "../audio/AudioSys";

/* ============================================================
   YAPIMCI LOGOSU — RED DOORS.
   Akış: fade-in → 2× glitch (ayrı ayrı) → fade-out → biter.
   Logo: public/reddoors-logo.png
   ============================================================ */
export default function StudioIntro({ onDone }) {
  const [phase, setPhase] = useState("in");   // in | hold | out
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let alive = true;
    const seq = [
      [1000, () => setPhase("hold")],                            // fade-in bitti
      [1600, () => { setGlitch(true); AudioSys.burst?.(140); }], // 1. glitch
      [1780, () => setGlitch(false)],
      [2350, () => { setGlitch(true); AudioSys.burst?.(120); }], // 2. glitch
      [2540, () => setGlitch(false)],
      [3300, () => setPhase("out")],                             // fade-out
      [4300, () => { if (alive) onDone(); }],                    // bitti
    ];
    const timers = seq.map(([ms, fn]) => setTimeout(() => { if (alive) fn(); }, ms));
    return () => { alive = false; timers.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = phase === "in" ? "s1-fadein" : phase === "out" ? "s1-fadeout" : "";

  return (
    <div
      onClick={onDone}
      className={cls}
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        className={glitch ? "s1-glitch" : ""}
        style={{
          width: "min(52vw, 300px)",
          filter: glitch
            ? "drop-shadow(3px 0 #c23b2e) drop-shadow(-3px 0 #3a7a9a)"
            : "none",
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
