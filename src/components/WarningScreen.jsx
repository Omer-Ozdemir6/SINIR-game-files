import { useState } from "react";
import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* Yeni oyun öncesi içerik uyarısı — fade-in/out */
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
        <p style={S.warnText}>{t("warn.p1")}</p>
        <p style={S.warnText}>{t("warn.p2")}</p>
      </div>
      <button className="s1-btn s1-mm" style={S.warnContinue} onClick={go}>
        {t("warn.cont")}
      </button>
    </div>
  );
}
