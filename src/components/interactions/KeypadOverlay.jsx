import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

const keys = () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", t("keypad.del"), "0", t("keypad.enter")];

/* 4 haneli erişim kodu paneli */
export default function KeypadOverlay({ title, entry, msg, onKey, onCancel }) {
  const KEYS = keys();
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("keypad.title")}</div>
        <div style={S.keypadDisplay}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={S.keypadDigit}>{entry[i] || "▮"}</span>
          ))}
        </div>
        {msg && (
          <div style={{ ...S.keypadMsg, color: msg.ok ? "#7fae86" : "#c23b2e" }}>{msg.text}</div>
        )}
        <div style={S.keypadGrid}>
          {KEYS.map((k) => (
            <button key={k} className="s1-btn s1-key"
              style={k === t("keypad.enter") ? S.keyEnter : k === t("keypad.del") ? S.keyAlt : S.keyBtn}
              onClick={() => onKey(k)}>
              {k}
            </button>
          ))}
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("keypad.cancel")}</button>
      </div>
    </div>
  );
}
