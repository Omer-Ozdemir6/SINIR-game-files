import { styles as S } from "../styles/theme";
import { SPEED_OPTIONS } from "../engine/constants";
import { t, LANGS } from "../i18n";

/* Çark (pause) menüsü */
export function PauseMenu({ onResume, onRespawn, onSettings, onMainMenu, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.listTitle}>{t("pause.title")}</div>
        <div style={S.menuButtons}>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onResume}>{t("pause.resume")}</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onRespawn}>{t("pause.respawn")}</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onSettings}>{t("pause.settings")}</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onMainMenu}>{t("pause.mainMenu")}</button>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>{t("pause.close")}</button>
      </div>
    </div>
  );
}

/* Ayarlar: yazı hızı / glitch / ses / DİL */
export function SettingsOverlay({ speedIdx, glitchFx, soundOn, lang, onSpeed, onGlitch, onSound, onLang, onBack }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.listTitle}>{t("settings.title")}</div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>{t("settings.speed")}</div>
          <div style={S.segRow}>
            {SPEED_OPTIONS.map((opt, i) => (
              <button key={opt.labelKey} className="s1-btn"
                style={i === speedIdx ? S.segActive : S.segBtn}
                onClick={() => onSpeed(i)}>
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
        </div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>{t("settings.glitch")}</div>
          <div style={S.segRow}>
            <button className="s1-btn" style={glitchFx ? S.segActive : S.segBtn} onClick={() => onGlitch(true)}>{t("settings.on")}</button>
            <button className="s1-btn" style={!glitchFx ? S.segActive : S.segBtn} onClick={() => onGlitch(false)}>{t("settings.off")}</button>
          </div>
        </div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>{t("settings.sound")}</div>
          <div style={S.segRow}>
            <button className="s1-btn" style={soundOn ? S.segActive : S.segBtn} onClick={() => onSound(true)}>{t("settings.on")}</button>
            <button className="s1-btn" style={!soundOn ? S.segActive : S.segBtn} onClick={() => onSound(false)}>{t("settings.off")}</button>
          </div>
        </div>
        {onLang && (
          <div style={S.settingsBlock}>
            <div style={S.settingsLabel}>{t("settings.lang")}</div>
            <div style={S.segRow}>
              {LANGS.map((l) => (
                <button key={l.code} className="s1-btn"
                  style={lang === l.code ? S.segActive : S.segBtn}
                  onClick={() => onLang(l.code)}>
                  {l.label}
                </button>
              ))}
            </div>
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 9, letterSpacing: "0.06em", color: "#3f5a52", marginTop: 6, lineHeight: 1.6 }}>
              {t("settings.langNote")}
            </div>
          </div>
        )}
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onBack}>{t("settings.back")}</button>
      </div>
    </div>
  );
}

/* Hakkında */
export function CreditsOverlay({ onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.listTitle}>SINIR-1</div>
        <div style={S.creditsText}>{t("credits.body")}</div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>{t("credits.close")}</button>
      </div>
    </div>
  );
}

/* Ölüm ekranı */
export function DeathOverlay({ death, onRespawn }) {
  return (
    <div style={S.deathOverlay} className="s1-death">
      <div style={S.deathBloodEdges} />
      <div style={S.deathTitle}>{death.battery ? t("death.power") : t("death.record")}</div>
      <div style={S.deathText}>{death.text}</div>
      <button className="s1-btn" style={S.deathBtn} onClick={(e) => { e.stopPropagation(); onRespawn(); }}>
        {t("death.respawn")}
      </button>
    </div>
  );
}
