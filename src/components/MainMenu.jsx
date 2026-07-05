import { useState } from "react";
import { t } from "../i18n";

/* ============================================================
   ANA MENÜ — Outlast 2 tarzı.
   Atmosferik arka plan (su altı tesisi), sol hizalı liste,
   üzerine gelinen/seçili öğe vurgulu (kutu + parlaklık).
   ============================================================ */
export default function MainMenu({ gameExists, confirmNew, onResume, onNewGame, onSettings, onCredits, onPuzzleTest }) {
  const [hover, setHover] = useState(null);

  const items = [];
  if (gameExists) items.push({ key: "resume", label: t("menu.resume"), fn: onResume });
  items.push({ key: "new", label: gameExists && confirmNew ? t("menu.newGameConfirm") : t("menu.newGame"), fn: onNewGame });
  items.push({ key: "settings", label: t("menu.settings"), fn: onSettings });
  items.push({ key: "credits", label: t("menu.credits"), fn: onCredits });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10,
      backgroundColor: "#05090a",
      backgroundImage: "url(/menu-bg.jpg)",
      backgroundSize: "cover", backgroundPosition: "center",
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: "0 clamp(28px, 9vw, 90px)",
      userSelect: "none",
    }} className="s1-fadein">
      {/* kenar karartma (vignette) */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 30% 45%, transparent 30%, rgba(3,6,7,0.75) 100%)",
      }} />

      {/* başlık */}
      <div style={{ position: "relative", marginBottom: "6vh" }}>
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: "clamp(38px, 11vw, 68px)", fontWeight: 700,
          letterSpacing: "0.28em", paddingLeft: "0.28em",
          color: "#dfe6df",
          textShadow: "0 0 24px rgba(90,140,110,0.35), 0 2px 8px rgba(0,0,0,0.9)",
        }}>
          SINIR<span style={{ color: "#7a3a3a" }}>-</span>1
        </div>
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: 11, letterSpacing: "0.3em", color: "#5f7573",
          marginTop: 6, paddingLeft: "0.3em",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
        }}>
          {t("menu.depth")}
        </div>
      </div>

      {/* menü listesi (sol hizalı) */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((it) => {
          const on = hover === it.key;
          return (
            <button
              key={it.key}
              onClick={it.fn}
              onMouseEnter={() => setHover(it.key)}
              onMouseLeave={() => setHover(null)}
              onTouchStart={() => setHover(it.key)}
              style={{
                textAlign: "left",
                background: on ? "rgba(20,30,26,0.72)" : "transparent",
                border: "none",
                borderLeft: on ? "3px solid #7a9a86" : "3px solid transparent",
                cursor: "pointer",
                padding: "13px 20px",
                fontFamily: "'Courier New', ui-monospace, monospace",
                fontSize: "clamp(17px, 4.6vw, 22px)",
                letterSpacing: "0.14em",
                color: on ? "#eef4ee" : "#9db0a6",
                textShadow: on ? "0 0 12px rgba(150,200,170,0.4)" : "0 1px 3px rgba(0,0,0,0.8)",
                transition: "all 120ms ease",
                width: "fit-content", minWidth: 220,
              }}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {/* geliştirici: bulmaca testi */}
      {onPuzzleTest && (
        <button className="s1-btn" onClick={onPuzzleTest} style={{
          position: "relative", marginTop: 30, alignSelf: "flex-start",
          background: "transparent", border: "none", cursor: "pointer",
          fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10,
          letterSpacing: "0.2em", color: "#2f4a42", padding: 8,
        }}>
          {t("menu.puzzleTest")}
        </button>
      )}
    </div>
  );
}
