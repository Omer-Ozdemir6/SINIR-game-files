import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* HUD katmanı: pil karartması, görev bandı ve köşe bildirimi (toast) */
export default function Hud({ dimOpacity, objectiveFlash, toast }) {
  return (
    <>
      {dimOpacity > 0 && (
        <div style={{ ...S.dimLayer, backgroundColor: "rgba(0,0,0," + dimOpacity + ")" }} />
      )}

      {objectiveFlash && (
        <div key={objectiveFlash.key} style={S.objectiveBand} className="s1-objective">
          <span style={S.objectiveText}>{t("hud.objective")}{objectiveFlash.text}</span>
        </div>
      )}

      {toast && (
        <div
          key={toast.key}
          style={
            toast.plain
              ? { ...S.toast, color: toast.color, border: "none", backgroundColor: "transparent", animationDuration: (toast.dur || 3200) + "ms" }
              : { ...S.toast, color: toast.color, borderColor: toast.color + "55" }
          }
          className={toast.plain ? "s1-toast-fade" : "s1-toast"}
        >
          {toast.icon ? <><span style={S.toastIcon}>{toast.icon}</span> {toast.text}</> : toast.text}
        </div>
      )}
    </>
  );
}
