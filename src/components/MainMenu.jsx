import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* Ana menü: Devam Et / Yeni Oyun / Ayarlar / Hakkında (+ bulmaca testi) */
export default function MainMenu({ gameExists, confirmNew, onResume, onNewGame, onSettings, onCredits, onPuzzleTest }) {
  return (
    <div style={S.menuRoot}>
      <div style={S.menuVignette} />
      <div style={S.menuInner}>
        <div style={S.menuTitle}>SINIR<span style={{ color: "#5a8a6a" }}>-</span>1</div>
        <div style={S.menuSub}>{t("menu.depth")}</div>
        <div style={S.mmButtons}>
          {gameExists && (
            <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onResume}>
              {t("menu.resume")}
            </button>
          )}
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onNewGame}>
            {gameExists && confirmNew ? t("menu.newGameConfirm") : t("menu.newGame")}
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onSettings}>
            {t("menu.settings")}
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onCredits}>
            {t("menu.credits")}
          </button>
        </div>
        {onPuzzleTest && (
          <button className="s1-btn" onClick={onPuzzleTest} style={{
            marginTop: 34, background: "transparent", border: "none", cursor: "pointer",
            fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10,
            letterSpacing: "0.2em", color: "#2f4a42", padding: 8,
          }}>
            {t("menu.puzzleTest")}
          </button>
        )}
      </div>
    </div>
  );
}
