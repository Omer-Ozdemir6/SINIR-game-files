import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

/* Nefes tutma: tüm ekran basılı tutulur. Kurallar App'te;
   burada yalnız görsel: fazlar, TEHLİKE ve CİĞER barları. */
export default function BreathOverlay({ breath, holdMs, lungMs, onDown, onUp }) {
  return (
    <div style={S.breathOverlay}
      onPointerDown={(e) => { e.stopPropagation(); onDown(); }}
      onPointerUp={(e) => { e.stopPropagation(); onUp(); }}
      onPointerCancel={(e) => { e.stopPropagation(); onUp(); }}>
      <div style={S.breathTitle}>
        {breath.phase === "release" ? t("breath.release") : t("breath.hold")}
      </div>
      <div style={S.breathPhaseText}>
        {breath.t < 2500 ? t("breath.ph1")
          : breath.t < 5000 ? t("breath.ph2")
          : breath.t < 7000 ? t("breath.ph3")
          : t("breath.ph4")}
      </div>
      <div style={S.breathBars}>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>{t("breath.danger")}</span>
          <div style={S.mechProgTrack}>
            <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.t / holdMs) * 100) + "%", backgroundColor: "#7fae86" }} />
          </div>
        </div>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>{t("breath.lung")}</span>
          <div style={S.mechProgTrack}>
            <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.lung / lungMs) * 100) + "%", backgroundColor: "#c23b2e" }} />
          </div>
        </div>
      </div>
      <div style={S.breathHint}>
        {breath.spike && breath.holding
          ? t("breath.spike")
          : breath.holding ? "" : breath.phase === "wait" ? t("breath.start") : ""}
      </div>
    </div>
  );
}
