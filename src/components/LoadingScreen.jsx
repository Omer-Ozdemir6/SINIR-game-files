import { useState, useEffect } from "react";
import { t } from "../i18n";

/* ============================================================
   YÜKLEME EKRANI — dairesel dönen noktalar (Outlast tarzı).
   12 nokta bir çember üzerinde; "aktif" nokta çemberde döner,
   ona yakın noktalar daha parlak. Karanlık, atmosferik zemin.
   ============================================================ */
const DOTS = 12;

export default function LoadingScreen({ onDone }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;
    // dönen nokta
    const spin = setInterval(() => setActive((a) => (a + 1) % DOTS), 70);
    // yükleme süresi (görünmez; sadece geçiş zamanlaması)
    let p = 0;
    const step = () => {
      if (!alive) return;
      p = Math.min(100, p + (Math.random() < 0.25 ? 12 + Math.random() * 14 : 2 + Math.random() * 5));
      if (p >= 100) { setTimeout(() => { if (alive) onDone(); }, 550); }
      else setTimeout(step, 100 + Math.random() * 240);
    };
    setTimeout(step, 300);
    return () => { alive = false; clearInterval(spin); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const R = 30;   // çember yarıçapı
  const cx = 50, cy = 50;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 58,
      background: "radial-gradient(ellipse at 50% 45%, #10171a 0%, #080c0e 55%, #030506 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }} className="s1-fadein">
      {/* hafif doku/leke (atmosfer) */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none",
        background: "radial-gradient(circle at 22% 30%, rgba(60,80,70,0.12) 0%, transparent 30%), radial-gradient(circle at 78% 68%, rgba(50,70,60,0.10) 0%, transparent 28%)",
      }} />

      <svg width="150" height="150" viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))" }}>
        {Array.from({ length: DOTS }).map((_, i) => {
          const ang = (i / DOTS) * Math.PI * 2 - Math.PI / 2;
          const x = cx + R * Math.cos(ang);
          const y = cy + R * Math.sin(ang);
          // aktif noktaya yakınlık → parlaklık ve boyut
          let d = (i - active + DOTS) % DOTS;         // ileri mesafe
          const near = Math.min(d, DOTS - d);          // dairesel mesafe
          const bright = Math.max(0.16, 1 - near * 0.22);
          const rad = 2.6 + (near === 0 ? 2.2 : near === 1 ? 1.0 : 0);
          return (
            <circle key={i} cx={x} cy={y} r={rad}
              fill="#cdd6cf" opacity={bright} />
          );
        })}
      </svg>

      <div style={{
        marginTop: 26,
        fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10,
        letterSpacing: "0.35em", color: "#5f7573",
      }}>
        {t("sys.loading")}
      </div>
    </div>
  );
}
