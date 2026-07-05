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
        background: "#04070a",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 32px", cursor: "pointer",
      }}
    >
      <p style={{
        fontFamily: "'Courier New', ui-monospace, monospace",
        fontSize: 13, lineHeight: 2.1, letterSpacing: "0.06em",
        color: "#7a8f84", textAlign: "center", maxWidth: 460,
      }}>
        {t("disclaimer.body")}
      </p>
    </div>
  );
}
