import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

export default function BreathOverlay({ breath, holdMs, lungMs, onDown, onUp }) {
  const releaseWindows = breath.releaseWindows || [];
  const title = breath.phase === "release"
    ? t("breath.release")
    : breath.phase === "vent"
      ? "KISA BIRAK"
      : t("breath.hold");

  const rhythmTrack = (
    <div style={{
      position: "relative",
      height: 12,
      width: "100%",
      border: "1px solid #263c38",
      backgroundColor: "#050807",
      boxShadow: "inset 0 0 12px rgba(0,0,0,0.75)",
      overflow: "hidden",
    }}>
      {releaseWindows.map(([a, b], i) => (
        <div key={i} style={{
          position: "absolute",
          left: Math.max(0, Math.min(100, (a / holdMs) * 100)) + "%",
          width: Math.max(3, ((b - a) / holdMs) * 100) + "%",
          top: 0,
          bottom: 0,
          backgroundColor: breath.phase === "vent" ? "#9fbf8a" : "#5f7f62",
          boxShadow: breath.phase === "vent" ? "0 0 14px rgba(150,210,130,0.55)" : "none",
        }} />
      ))}
      <div style={{
        position: "absolute",
        left: Math.min(100, (breath.t / holdMs) * 100) + "%",
        top: -4,
        bottom: -4,
        width: 2,
        backgroundColor: "#e8e4d2",
        boxShadow: "0 0 8px rgba(255,255,255,0.55)",
      }} />
    </div>
  );

  const hint = breath.phase === "vent" && !breath.holding
    ? "SESSIZCE BIRAK - CIGERINI TOPARLA"
    : breath.phase === "vent" && breath.holding
      ? "SIMDI KISA BIRAK"
      : breath.spike && breath.holding
        ? t("breath.spike")
        : breath.holding ? "" : breath.phase === "wait" ? t("breath.start") : "";

  return (
    <div
      style={{
        ...S.breathOverlay,
        pointerEvents: "auto",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDown();
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onUp();
      }}
      onPointerCancel={(e) => {
        e.stopPropagation();
        onUp();
      }}
    >
      <div style={S.breathTitle}>{title}</div>
      <div style={S.breathPhaseText}>
        {breath.t < 2500 ? t("breath.ph1")
          : breath.t < 5000 ? t("breath.ph2")
          : breath.t < 7000 ? t("breath.ph3")
          : t("breath.ph4")}
      </div>
      <div style={S.breathBars}>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>RITIM</span>
          {rhythmTrack}
        </div>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>{t("breath.danger")}</span>
          <div style={S.mechProgTrack}>
            <div style={{
              ...S.mechProgFill,
              width: Math.min(100, (breath.t / holdMs) * 100) + "%",
              backgroundColor: "#7fae86",
            }} />
          </div>
        </div>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>{t("breath.lung")}</span>
          <div style={S.mechProgTrack}>
            <div style={{
              ...S.mechProgFill,
              width: Math.min(100, (breath.lung / lungMs) * 100) + "%",
              backgroundColor: breath.safeRelease ? "#d0a64a" : "#c23b2e",
            }} />
          </div>
        </div>
      </div>
      <div style={{
        ...S.breathHint,
        color: breath.phase === "vent" ? "#d6c56f" : S.breathHint.color,
      }}>
        {hint}
      </div>
    </div>
  );
}
