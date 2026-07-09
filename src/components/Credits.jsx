import { useEffect, useRef } from "react";
import { t } from "../i18n";

/* ============================================================
   KAYAN CREDITS — RED DOORS tarzı, sinematik ve YAVAŞ.
   Her şey (logo + oyun ismi + yazılar) TEK blok olarak yukarı
   akar — videodaki gibi logo da hareket eder, sabit kalmaz.
   İki yerde: ana menü "Hakkında" ve oyun sonu.
   Bitince (ya da dokununca) onClose çağrılır.
   ============================================================ */
export default function Credits({ onClose }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);
  const onCloseRef = useRef(onClose);
  const mountTimeRef = useRef(Date.now());
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    let alive = true;
    const el = scrollRef.current;
    if (!el) return;
    
    let y = window.innerHeight || 800;          // Start from the bottom of the viewport
    el.style.transform = `translateY(${y}px)`;
    const speed = 0.032;                         // px/ms — yavaş, sinematik

    let last = performance.now();
    const tick = (now) => {
      if (!alive) return;
      const dt = now - last; last = now;
      y -= speed * dt;
      el.style.transform = `translateY(${y}px)`;
      
      const currentTotal = el.scrollHeight || 1000;
      if (y < -currentTotal - 100) { 
        if (onCloseRef.current) onCloseRef.current(); 
        return; 
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { alive = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    // Prevent accidental instant close due to event bubbling or fast clicking
    if (Date.now() - mountTimeRef.current > 350) {
      if (onCloseRef.current) onCloseRef.current();
    }
  };

  return (
    <div
      onClick={handleClose}
      className="s1-fadein"
      style={{
        position: "fixed", inset: 0, zIndex: 55,
        background: "#000", overflow: "hidden", cursor: "pointer",
      }}
    >
      {/* TEK kayan blok: logo + isim + yazılar birlikte akar */}
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}>
        <div
          ref={scrollRef}
          style={{
            width: "88%", maxWidth: 440, willChange: "transform",
            display: "flex", flexDirection: "column", alignItems: "center",
            fontFamily: "'Courier New', ui-monospace, monospace",
            textAlign: "center",
          }}
        >
          {/* RED DOORS logosu (kayan bloğun tepesinde) */}
          <img src="/red-doors-studio-logo.jpeg" alt="RED DOORS"
            style={{ width: "min(38vw, 170px)", height: "auto", marginBottom: 22 }} draggable={false} />

          {/* oyun ismi */}
          <div style={{
            fontSize: "clamp(24px, 8vw, 38px)", fontWeight: 700,
            letterSpacing: "0.32em", paddingLeft: "0.32em",
            color: "#dfe8ec", textShadow: "0 0 18px rgba(160,195,220,0.35)",
          }}>PERISHED</div>

          {/* slogan */}
          <div style={{
            fontSize: 11, letterSpacing: "0.12em", color: "#5f7075",
            marginTop: 14, marginBottom: 60, padding: "0 20px",
          }}>{t("credits.tagline")}</div>

          {/* kayan yazılar */}
          <div style={{
            fontSize: 13, lineHeight: 2.2, letterSpacing: "0.08em",
            color: "#a8b6bc", whiteSpace: "pre-wrap",
          }}>{t("credits.roll")}</div>
        </div>
      </div>

      {/* alt: dokun-kapat ipucu (sabit) */}
      <div style={{
        position: "absolute", bottom: 20, left: 0, right: 0, textspan: "center",
        textAlign: "center",
        fontFamily: "'Courier New', ui-monospace, monospace",
        fontSize: 9, letterSpacing: "0.2em", color: "#2f3e4a", pointerEvents: "none",
      }}>{t("credits.close").toUpperCase()} · DOKUN</div>
    </div>
  );
}
