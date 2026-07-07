import { useState } from "react";
import { t } from "../i18n";

/* ============================================================
   ANA MENÜ — SINIR-1 karanlık menü.
   Atmosferik arka plan (su altı tesisi), sol hizalı liste,
   üzerine gelinen/seçili öğe vurgulu (kutu + parlaklık).
   ============================================================ */
export default function MainMenu({ gameExists, confirmNew, afterEnding = false, onResume, onNewGame, onSettings, onCredits, onHowTo, onPuzzleTest }) {
  const [hover, setHover] = useState(null);
  const bgUrl = afterEnding ? "/menu-bg-sinir1-after.png" : "/menu-bg-sinir1.png";

  const items = [];
  if (gameExists) items.push({ key: "resume", label: t("menu.resume"), fn: onResume });
  items.push({ key: "new", label: gameExists && confirmNew ? t("menu.newGameConfirm") : t("menu.newGame"), fn: onNewGame });
  items.push({ key: "howto", label: t("menu.howto"), fn: onHowTo });
  items.push({ key: "settings", label: t("menu.settings"), fn: onSettings });
  items.push({ key: "credits", label: t("menu.credits"), fn: onCredits });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10,
      backgroundColor: "#05090a",
      backgroundImage: [
        "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.56) 35%, rgba(0,0,0,0.2) 68%, rgba(0,0,0,0.62) 100%)",
        "linear-gradient(180deg, rgba(2,5,6,0.45) 0%, rgba(2,5,6,0.08) 45%, rgba(0,0,0,0.72) 100%)",
      ].join(", "),
      backgroundSize: "cover, cover",
      backgroundPosition: "center, center",
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: "0 clamp(28px, 9vw, 90px)",
      userSelect: "none",
      overflow: "hidden",
    }} className="s1-fadein">
      <img
        src={bgUrl}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          opacity: 0.96,
          pointerEvents: "none",
        }}
      />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: [
          "linear-gradient(90deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 35%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.64) 100%)",
          "linear-gradient(180deg, rgba(2,5,6,0.46) 0%, rgba(2,5,6,0.08) 45%, rgba(0,0,0,0.74) 100%)",
        ].join(", "),
      }} />

      {/* kenar karartma (vignette) */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 26% 44%, rgba(10,22,20,0.08) 0%, rgba(3,6,7,0.38) 48%, rgba(0,0,0,0.82) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18,
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 2px, transparent 5px)",
        mixBlendMode: "screen",
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
          SINIR<span style={{ color: afterEnding ? "#b9c9bd" : "#7a3a3a" }}>-</span>1
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
