import { useState } from "react";
import { styles as S } from "../styles/theme";

/* Yeni oyun öncesi içerik uyarısı — fade-in ile gelir,
   Devam Et'e basılınca fade-out olup açılış sinematiğine geçer. */
export default function WarningScreen({ onContinue }) {
  const [leaving, setLeaving] = useState(false);
  const go = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onContinue, 850);
  };
  return (
    <div style={S.warnRoot} className={leaving ? "s1-fadeout" : "s1-fadein"}>
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
      <button className="s1-btn s1-mm" style={S.warnContinue} onClick={go}>
        Devam Et
      </button>
    </div>
  );
}
