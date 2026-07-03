import { useEffect, useState } from "react";
import { styles as S } from "../styles/theme";
import ProducerLogoAnimation from "./ProducerLogoAnimation";

/* Logo -> Warning -> Loading -> Saf Siyah Ana Menü Akışı */
export default function MainMenu({ 
  gameExists, 
  confirmNew, 
  onResume, 
  onNewGame, 
  onSettings, 
  onCredits 
}) {
  const [introStep, setIntroStep] = useState("producerLogo");
  const [warningStage, setWarningStage] = useState(0);

  // 1. ADIM: Warning Ekranı Geçiş Zamanlayıcısı
  useEffect(() => {
    if (introStep !== "warnings") return;
    
    const t1 = setTimeout(() => setWarningStage(1), 1000);
    const t2 = setTimeout(() => setIntroStep("initialLoading"), 3500);
    
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [introStep]);

  // 2. ADIM: Initial Loading Ekranı Zamanlayıcısı
  useEffect(() => {
    if (introStep !== "initialLoading") return;
    
    const menuTimer = setTimeout(() => setIntroStep("menu"), 2500);
    
    return () => clearTimeout(menuTimer);
  }, [introStep]);

  // --- INTRO ADIMLARININ RENDER KOŞULLARI ---

  // A. Giriş Logosu (S.menuRoot ezilerek flex/grid çakışmaları engellendi, arka plan saf siyah yapıldı)
  if (introStep === "producerLogo") {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        backgroundColor: "#000000", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 9999 
      }}>
        <ProducerLogoAnimation
          src="/red-door-logo.jpg"
          alt="Red Door"
          onComplete={() => setIntroStep("warnings")}
        />
      </div>
    );
  }

  // B. Warning (Uyarı) Ekranı (Yeşil degradeler tamamen engellendi)
  if (introStep === "warnings") {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        backgroundColor: "#000000", 
        display: "grid", 
        placeItems: "center", 
        fontFamily: "monospace", 
        color: "#d6d3d1",
        zIndex: 9999
      }}>
        <div style={{ textAlign: "center", maxWidth: "600px", padding: "0 20px" }}>
          <p style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#e11d48", fontWeight: "bold", marginBottom: "10px" }}>
            [ UYARI ]
          </p>
          <p style={{ fontSize: "15px", lineHeight: "1.6", opacity: warningStage >= 1 ? 1 : 0, transition: "opacity 0.8s ease" }}>
            Bu oyun rahatsız edici ses frekansları, ani ışık patlamaları ve yüksek klostrofobik ögeler içermektedir.
          </p>
        </div>
      </div>
    );
  }

  // C. Initial Loading Ekranı
  if (introStep === "initialLoading") {
    return (
      <div style={{ 
        position: "fixed", 
        inset: 0, 
        backgroundColor: "#000000", 
        fontFamily: "monospace",
        zIndex: 9999
      }}>
        <div style={{ position: "absolute", bottom: "32px", right: "32px", display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#d97706", fontWeight: "bold", opacity: 0.7 }}>
            TUNNEL SIGNAL SEARCH
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#f59e0b",
                  borderRadius: "50%",
                  animation: "s1-pulse 1s infinite alternate",
                  animationDelay: `${i * 0.2}s`
                }} 
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes s1-pulse {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    );
  }

  // D. ANA MENÜ (Arka plan yeşilliği / vinyet tamamen kaldırıldı, saf siyah yapıldı)
  return (
    <div style={{ 
      ...S.menuRoot, 
      backgroundColor: "#000000", 
      backgroundImage: "none" // Temadan gelebilecek olası arka plan görsellerini engeller
    }}>
      {/* Yeşil renk sızdıran S.menuVignette kaldırıldı veya pasif yapıldı */}
      <div style={{ ...S.menuInner, zIndex: 2 }}>
        <div style={S.menuTitle}>SINIR<span style={{ color: "#5a8a6a" }}>-</span>1</div>
        <div style={S.menuSub}>DERİNLİK: 214 M</div>
        <div style={S.mmButtons}>
          {gameExists && (
            <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onResume}>
              Devam Et
            </button>
          )}
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onNewGame}>
            {gameExists && confirmNew ? "Emin misin? — İlerleme silinir" : "Yeni Oyun"}
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onSettings}>
            Ayarlar
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onCredits}>
            Hakkında
          </button>
        </div>
      </div>
    </div>
  );
}