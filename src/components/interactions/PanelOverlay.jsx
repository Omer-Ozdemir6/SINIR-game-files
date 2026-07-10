import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

/* Ana kontrol paneli: CRT durum ekranı + büyük kırmızı buton.
   Tüm require bayrakları açık değilse buton hata verir (App'te). */
export default function PanelOverlay({ interaction, flags, msg, onPress, onCancel }) {
  const allOk = interaction.require.every((f) => flags[f]);
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.ironPanel} className="s1-panel">
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 330, alignItems: "center", gap: 16, margin: "auto" }}>
          <div style={S.ironTitle}>{interaction.title}</div>
          <div style={S.crtScreen}>
            {interaction.rows.map((r, i) => {
              const on = !!flags[r.flag];
              return (
                <div key={r.flag} style={{
                  ...S.crtRow,
                  borderBottom: i < interaction.rows.length - 1 ? "1px solid rgba(120,220,170,0.16)" : "none",
                }}>
                  <span style={S.crtLabel}>{r.label}</span>
                  <span style={{
                    ...S.crtMark,
                    color: on ? "#7fce8d" : "#d24234",
                    textShadow: on ? "0 0 8px rgba(120,230,150,0.8)" : "0 0 8px rgba(230,70,50,0.7)",
                  }}>
                    {on ? "▮" : "✕"}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={S.panelLightRow}>
            <div style={{
              ...S.panelLight,
              backgroundColor: allOk ? "#7fce8d" : "#c23b2e",
              boxShadow: allOk ? "0 0 14px rgba(120,230,150,0.9)" : "0 0 14px rgba(220,50,30,0.9)",
            }} className={allOk ? "" : "s1-critical"} />
            <span style={S.panelLightLabel}>{allOk ? t("panel.ready") : t("panel.missing")}</span>
          </div>
          {msg && (
            <div style={{ ...S.keypadMsg, color: msg.ok ? "#7f9eb5" : "#d24234" }}>{msg.text}</div>
          )}
          <button className="s1-btn s1-redbtn" style={S.redButton} onClick={onPress} aria-label={t("panel.start")} />
          <div style={S.redButtonLabel}>{t("panel.start")}</div>
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("panel.away")}</button>
        </div>
      </div>
    </div>
  );
}
