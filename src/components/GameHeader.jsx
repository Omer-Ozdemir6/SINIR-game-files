import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* Üst bar: çark menüsü, istasyon bilgisi, pil, arşiv */
export default function GameHeader({ battery, bColor, spares, sparesMax, onGear, onBattery, onArchive }) {
  const critical = battery > 0 && battery <= 30;
  const segmentCount = 10;
  const segsOn = battery <= 0 ? 0 : Math.max(1, Math.ceil(battery / 10));
  return (
    <div style={S.header}>
      <div style={S.headerLeft}>
        <button className="s1-btn" style={S.gearBtn} title={t("hud.menuBtnTitle")}
          onClick={(e) => { e.stopPropagation(); onGear(); }}>
          ⚙
        </button>
      </div>
      <div style={S.headerRight}>
        <button className="s1-btn"
          style={S.batteryWrap} title={t("hud.batteryTitle")}
          onClick={(e) => { e.stopPropagation(); onBattery(); }}>
          <span style={{ ...S.spareText, color: spares > 0 ? "#b8b49a" : "#5a584a" }}>{spares}/{sparesMax}</span>
          <div className={critical ? "s1-batblink" : ""} style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{
              ...S.batteryCap,
              backgroundColor: critical ? "#c23b2e" : "#d8d8d0",
            }} />
            <div style={{
              ...S.batteryShell,
              borderColor: critical ? "#c23b2e" : "#d8d8d0",
            }}>
              {Array.from({ length: segmentCount }).map((_, i) => (
                <div key={i}
                  style={{ ...S.batterySeg, backgroundColor: i >= segmentCount - segsOn ? bColor : "transparent" }} />
              ))}
            </div>
          </div>
        </button>
        <button className="s1-btn" style={S.archiveBtn}
          onClick={(e) => { e.stopPropagation(); onArchive(); }}>
          {t("hud.archive")}
        </button>
      </div>
    </div>
  );
}
