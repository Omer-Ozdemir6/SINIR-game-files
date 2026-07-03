import { useState, useEffect } from "react";
import { styles as S } from "../styles/theme";

/* Yeni oyun öncesi içerik uyarısı + giriş metni.
   Yumuşak fade-in ile gelir; Devam Et'e basılınca fade-out olur,
   ardından açılış sinematiği başlar. */
export default function WarningScreen({ onContinue }) {
  const [opacity, setOpacity] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpacity(1), 60);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (leaving) return;
    setLeaving(true);
    setOpacity(0);
    setTimeout(onContinue, 1150);
  };

  return (
    <div style={{ ...S.warnRoot, opacity, transitionProperty: "opacity", transitionDuration: "1100ms" }}>
      <div style={S.warnBody}>
        <p style={S.warnText}>
          SINIR-1 yoğun gerilim, şiddet ve rahatsız edici temalar içerir. Lütfen keyfini çıkarın.
        </p>
        <p style={S.warnText}>
          SINIR-1 su altı araştırma tesisinde gece bakım vardiyasındaki teknisyensin. Yüzeyle bağlantı
          üç saat önce kesildi ve tesiste bir şeyler korkunç derecede yanlış. Elinde yalnızca çatlak
          ekranlı bakım tabletin var: ışığın, kaydın ve tek dostun. Hayatta kalabildiğin kadar kal.
          Her şeyi belgele. Savaşçı değilsin; bu derinlikte hayatta kalmanın tek yolu koşmak, saklanmak
          ya da ölmek.
        </p>
      </div>
      <button className="s1-btn s1-mm" style={S.warnContinue} onClick={handleContinue}>
        Devam Et
      </button>
    </div>
  );
}