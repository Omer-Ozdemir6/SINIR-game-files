import { useState, useEffect, useRef } from "react";
import { t } from "../i18n";

/* ============================================================
   KAYAN CREDITS — RED DOORS tarzı, sinematik ve YAVAŞ.
   Üstte sabit logo, altından yavaşça yukarı akan yazılar.
   İki yerde: ana menü "Hakkında" ve oyun sonu.
   Bitince (ya da dokununca) onClose çağrılır.
   ============================================================ */
export default function Credits({ onClose }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    let alive = true;
    const el = scrollRef.current;
    if (!el) return;
    let y = el.parentElement.clientHeight;      // alttan başla
    el.style.transform = `translateY(${y}px)`;
    const total = el.scrollHeight;
    const speed = 0.032;                         // px/ms — YAVAŞ, sinematik (videodaki tempo)

    let last = performance.now();
    const tick = (now) => {
      if (!alive) return;
      const dt = now - last; last = now;
      y -= speed * dt;
      el.style.transform = `translateY(${y}px)`;
      if (y < -total - 60) { if (onClose) onClose(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { alive = false; cancelAnimationFrame(rafRef.current); };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="s1-fadein"
      style={{
        position: "fixed", inset: 0, zIndex: 55,
        background: "#000", overflow: "hidden", cursor: "pointer",
      }}
    >
      {/* üstte sabit RED DOORS logosu + oyun ismi */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
        paddingTop: "7vh", paddingBottom: 26,
        display: "flex", flexDirection: "column", alignItems: "center",
        background: "linear-gradient(#000 62%, rgba(0,0,0,0))",
        pointerEvents: "none",
      }}>
        <img src="/reddoors-logo.png" alt="RED DOORS"
          style={{ width: "min(34vw, 150px)", height: "auto", marginBottom: 16 }} draggable={false} />
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: "clamp(20px, 6vw, 30px)", fontWeight: 700,
          letterSpacing: "0.35em", paddingLeft: "0.35em",
          color: "#e8ecdf", textShadow: "0 0 16px rgba(160,220,180,0.3)",
        }}>SINIR-1</div>
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: 10, letterSpacing: "0.12em", color: "#5f7573",
          marginTop: 10, textAlign: "center", padding: "0 24px",
        }}>{t("credits.tagline")}</div>
      </div>

      {/* aşağıdan yukarı akan yazı */}
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}>
        <div ref={scrollRef} style={{
          width: "86%", maxWidth: 420, willChange: "transform",
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: 13, lineHeight: 2.2, letterSpacing: "0.08em",
          color: "#a8bcae", textAlign: "center", whiteSpace: "pre-wrap",
        }}>{t("credits.roll")}</div>
      </div>

      <div style={{
        position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
        fontFamily: "'Courier New', ui-monospace, monospace",
        fontSize: 9, letterSpacing: "0.2em", color: "#2f4a42", pointerEvents: "none",
      }}>{t("credits.close").toUpperCase()} · DOKUN</div>
    </div>
  );
}
