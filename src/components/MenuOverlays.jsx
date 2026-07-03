import { styles as S } from "../styles/theme";
import { SPEED_OPTIONS } from "../engine/constants";

/* Çark (pause) menüsü */
export function PauseMenu({ onResume, onRespawn, onSettings, onMainMenu, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.listTitle}>MENÜ</div>
        <div style={S.menuButtons}>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onResume}>Devam Et</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onRespawn}>Son Kayıttan Devam Et</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onSettings}>Ayarlar</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onMainMenu}>Ana Menüye Dön</button>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
}

/* Ayarlar: yazı hızı / glitch / ses */
export function SettingsOverlay({ speedIdx, glitchFx, soundOn, onSpeed, onGlitch, onSound, onBack }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.listTitle}>AYARLAR</div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>YAZI HIZI</div>
          <div style={S.segRow}>
            {SPEED_OPTIONS.map((opt, i) => (
              <button key={opt.label} className="s1-btn"
                style={i === speedIdx ? S.segActive : S.segBtn}
                onClick={() => onSpeed(i)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>GLITCH EFEKTLERİ</div>
          <div style={S.segRow}>
            <button className="s1-btn" style={glitchFx ? S.segActive : S.segBtn} onClick={() => onGlitch(true)}>AÇIK</button>
            <button className="s1-btn" style={!glitchFx ? S.segActive : S.segBtn} onClick={() => onGlitch(false)}>KAPALI</button>
          </div>
        </div>
        <div style={S.settingsBlock}>
          <div style={S.settingsLabel}>SES</div>
          <div style={S.segRow}>
            <button className="s1-btn" style={soundOn ? S.segActive : S.segBtn} onClick={() => onSound(true)}>AÇIK</button>
            <button className="s1-btn" style={!soundOn ? S.segActive : S.segBtn} onClick={() => onSound(false)}>KAPALI</button>
          </div>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onBack}>Geri</button>
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
        <div style={S.creditsText}>
          Metin tabanlı korku prototipi.{"\n"}Karadeniz'in dibinde, ölümün çalışmadığı yerde.{"\n\n"}Tasarım & Hikaye: Sahip
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
}

/* Ölüm ekranı */
export function DeathOverlay({ death, onRespawn }) {
  return (
    <div style={S.deathOverlay} className="s1-death">
      <div style={S.deathBloodEdges} />
      <div style={S.deathTitle}>{death.battery ? "GÜÇ KAYBI" : "KAYIT SONLANDI"}</div>
      <div style={S.deathText}>{death.text}</div>
      <button className="s1-btn" style={S.deathBtn} onClick={(e) => { e.stopPropagation(); onRespawn(); }}>
        SON KONTROL NOKTASINDAN DEVAM ET
      </button>
    </div>
  );
}
