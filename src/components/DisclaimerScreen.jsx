import { useState, useEffect } from "react";
import { t } from "../i18n";

/* KURGU UYARISI — yapımcı logosundan sonra, loading'den önce.
   "Bu bir kurgudur; kişi ve kurumlar hayal ürünüdür."
   Otomatik ilerler (dokunulursa hızlanır). */
export default function DisclaimerScreen({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  
  const go = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 800);
  };

  useEffect(() => {
    const timer = setTimeout(go, 4200); // otomatik geçiş
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={go}
      className={leaving ? "s1-fadeout" : "s1-fadeslow"}
      style={{
        position: "fixed", inset: 0, zIndex: 58,
        background: "#000000", // Tam siyah arka plan
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 24px", cursor: "pointer",
        userSelect: "none", WebkitUserSelect: "none"
      }}
    >
      <p style={{
        // Görseldeki modern, hafif köşeli sans-serif oyun fontu yapısı
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "clamp(14px, 3.2vw, 20px)", // Ekran boyutuna göre dinamik ölçeklenen yazı boyutu
        fontWeight: 500,
        lineHeight: 1.6, 
        letterSpacing: "0.03em",
        color: "#ffffff", // Net beyaz yazı rengi
        textAlign: "center", 
        maxWidth: 820, // İki satırın yanlara doğru görseldeki gibi geniş yayılması için artırıldı
      }}>
        {t("disclaimer.body")}
      </p>
    </div>
  );
}