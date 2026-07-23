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
export function SettingsOverlay({ speedIdx, glitchFx, soundOn, hapticsOn, lang, onSpeed, onGlitch, onSound, onHaptics, onLang, onBack }) {
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
        {onHaptics && (
          <div style={S.settingsBlock}>
            <div style={S.settingsLabel}>{t("settings.haptics")}</div>
            <div style={S.segRow}>
              <button className="s1-btn" style={hapticsOn ? S.segActive : S.segBtn} onClick={() => onHaptics(true)}>{t("settings.on")}</button>
              <button className="s1-btn" style={!hapticsOn ? S.segActive : S.segBtn} onClick={() => onHaptics(false)}>{t("settings.off")}</button>
            </div>
          </div>
        )}
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
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 9, letterSpacing: "0.06em", color: "#3f525a", marginTop: 6, lineHeight: 1.6 }}>
              {t("settings.langNote")}
            </div>
          </div>
        )}
        <div style={{ width: "100%", marginTop: 14, borderTop: "1px dashed #30372f", paddingTop: 14, marginBottom: 8 }}>
          <button className="s1-btn s1-menuitem" style={{ ...S.menuItem, width: "100%", margin: 0 }} onClick={(e) => { e.stopPropagation(); window.open("https://play.google.com/store/apps/details?id=com.reddoors.perished", "_blank"); }}>
            {t("settings.rateApp")}
          </button>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onBack}>{t("settings.back")}</button>
      </div>
    </div>
  );
}

/* Hakkında */

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

/* Çıkış Onay Modalı */
export function ExitConfirmOverlay({ onConfirm, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.listPanel, maxWidth: 360, padding: 24, textAlign: "center" }} className="s1-panel">
        <div style={{ ...S.listTitle, color: "#c23b2e", marginBottom: 20, fontSize: 13, letterSpacing: "0.1em" }}>
          {t("exitConfirm.title")}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="s1-btn s1-menuitem" style={{ ...S.menuItem, flex: 1, backgroundColor: "#c23b2e", margin: 0 }} onClick={onConfirm}>
            {t("exitConfirm.yes")}
          </button>
          <button className="s1-btn s1-menuitem" style={{ ...S.menuItem, flex: 1, margin: 0 }} onClick={onCancel}>
            {t("exitConfirm.no")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Yeni Oyuncu Oryantasyon Rehberi */
export function OnboardingOverlay({ onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={{ ...S.listPanel, maxWidth: 440, padding: 24 }} className="s1-panel">
        <div style={{ ...S.listTitle, color: "#d0b06a", textAlign: "center", marginBottom: 16, fontSize: 14 }}>
          {t("onboarding.title")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: "60vh", overflowY: "auto", paddingRight: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...S.settingsLabel, color: "#d0b06a", fontSize: 10 }}>{t("onboarding.batTitle")}</div>
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10, color: "#b8b49a", lineHeight: 1.6 }}>
              {t("onboarding.batBody")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...S.settingsLabel, color: "#d0b06a", fontSize: 10 }}>{t("onboarding.noiseTitle")}</div>
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10, color: "#b8b49a", lineHeight: 1.6 }}>
              {t("onboarding.noiseBody")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...S.settingsLabel, color: "#d0b06a", fontSize: 10 }}>{t("onboarding.arcTitle")}</div>
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10, color: "#b8b49a", lineHeight: 1.6 }}>
              {t("onboarding.arcBody")}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...S.settingsLabel, color: "#d0b06a", fontSize: 10 }}>{t("onboarding.navTitle")}</div>
            <div style={{ fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10, color: "#b8b49a", lineHeight: 1.6 }}>
              {t("onboarding.navBody")}
            </div>
          </div>
        </div>
        <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 20 }} onClick={onClose}>
          {t("onboarding.startBtn")}
        </button>
      </div>
    </div>
  );
}
