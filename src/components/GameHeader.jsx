import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* Üst bar: çark menüsü, GÜRÜLTÜ/AKIL göstergeleri, pil, arşiv */
export default function GameHeader({ gurultuPct, akil, battery, bColor, spares, sparesMax, onGear, onBattery, onArchive }) {
  // Outlast tarzı dilimli pil: 10 dikey dilim, doluluk kadar yanar
  const segsOn = battery <= 0 ? 0 : Math.max(1, Math.ceil(battery / 10));
  return (
    <div style={S.header}>
      <div style={S.headerLeft}>
        <button className="s1-btn" style={S.gearBtn} title={t("hud.menuBtnTitle")}
          onClick={(e) => { e.stopPropagation(); onGear(); }}>
          ⚙
        </button>
        <span style={S.stationTag}>SINIR-1</span>
        <span style={S.sectorTag}>K-6</span>
      </div>
      <div style={S.headerRight}>
        <div style={S.gaugeCol}>
          <div style={S.gauge}>
            <span style={S.statLabel}>{t("hud.noise")}</span>
            <div style={S.statTrack}>
              <div style={{ ...S.statFill, width: gurultuPct + "%", backgroundColor: gurultuPct > 50 ? "#b8503f" : "#7a8c46" }} />
            </div>
          </div>
          <div style={S.gauge}>
            <span style={S.statLabel}>{t("hud.mind")}</span>
            <div style={S.statTrack}>
              <div style={{ ...S.statFill, width: akil + "%", backgroundColor: akil > 60 ? "#6a8fae" : akil > 40 ? "#c79a52" : "#b8503f" }} />
            </div>
          </div>
        </div>
        <button className={"s1-btn" + (battery <= 20 && battery > 0 ? " s1-batblink" : "")}
          style={S.batteryWrap} title={t("hud.batteryTitle")}
          onClick={(e) => { e.stopPropagation(); onBattery(); }}>
          <div style={{
            ...S.batteryShell,
            borderColor: battery <= 20 && battery > 0 ? "#c23b2e" : "#9a9884",
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}
                style={{ ...S.batterySeg, backgroundColor: i < segsOn ? bColor : "transparent" }} />
            ))}
          </div>
          <div style={{
            ...S.batteryCap,
            backgroundColor: battery <= 20 && battery > 0 ? "#c23b2e" : "#9a9884",
          }} />
          <span style={{ ...S.spareText, color: spares > 0 ? "#b8b49a" : "#5a584a" }}>{spares}/{sparesMax}</span>
        </button>
        <button className="s1-btn" style={S.archiveBtn}
          onClick={(e) => { e.stopPropagation(); onArchive(); }}>
          {t("hud.archive")}
        </button>
      </div>
    </div>
  );
}
