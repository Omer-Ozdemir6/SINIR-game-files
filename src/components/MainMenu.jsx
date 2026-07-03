import { styles as S } from "../styles/theme";

/* Ana menü: Devam Et / Yeni Oyun / Ayarlar / Hakkında */
export default function MainMenu({ gameExists, confirmNew, onResume, onNewGame, onSettings, onCredits }) {
  return (
    <div style={S.menuRoot}>
      <div style={S.menuVignette} />
      <div style={S.menuInner}>
        <div style={S.menuTitle}>SINIR<span style={{ color: "#5a8a6a" }}>-</span>1</div>
        <div style={S.menuSub}>DERİNLİK: 214 M</div>
        <div style={S.mmButtons}>
          {gameExists && (
            <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onResume}>
              Devam Et
            </button>
          )}
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onNewGame}>
            {gameExists && confirmNew ? "Emin misin? — İlerleme silinir" : "Yeni Oyun"}
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onSettings}>
            Ayarlar
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onCredits}>
            Hakkında
          </button>
        </div>
      </div>
    </div>
  );
}
