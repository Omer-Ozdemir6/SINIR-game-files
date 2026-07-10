import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

const keyList = () => ["1", "2", "3", "4", "5", "6", "7", "8", "9", t("keypad.del"), "0", t("keypad.enter")];

export default function KeypadOverlay({ title, entry, msg, onKey, onCancel }) {
  const KEYS = keyList();
  const isOk = msg?.ok;
  const isBad = msg && !msg.ok;
  const filled = Math.min(4, entry.length);

  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className={"s1-panel" + (isBad ? " s1-keypad-error" : "")}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: 400, alignItems: "center", gap: 12, margin: "auto" }}>
          <div style={S.keypadTopRail}>
            <span style={S.keypadScrew} />
            <span style={{ ...S.keypadStatusLamp, backgroundColor: isOk ? "#80bcd8" : isBad ? "#c23b2e" : "#d0a441" }} />
            <span style={S.keypadScrew} />
          </div>

          <div style={S.keypadFace}>
            <div style={S.keypadHeaderRow}>
              <div>
                <div style={S.keypadTinyLabel}>K-6 ACCESS NODE</div>
                <div style={S.keypadTitle}>{title || t("keypad.title")}</div>
              </div>
              <div style={{
                ...S.keypadBadge,
                color: isOk ? "#96c2dc" : isBad ? "#d96a58" : "#bca76d",
                borderColor: isOk ? "#345264" : isBad ? "#633026" : "#4d4428",
              }}>
                {isOk ? "OPEN" : isBad ? "DENY" : "LOCK"}
              </div>
            </div>

            <div style={S.keypadScreen}>
              <div style={S.keypadScreenGlow} />
              <div style={S.keypadCodeRow}>
                {[0, 1, 2, 3].map((i) => {
                  const active = i < filled;
                  return (
                    <span key={i} style={{
                      ...S.keypadDigitCell,
                      borderColor: active ? "#2f6e80" : "rgba(50,82,90,0.45)",
                      boxShadow: active ? "0 0 16px rgba(90,195,220,0.18), inset 0 0 12px rgba(90,195,220,0.08)" : "none",
                    }}>
                      <span style={{
                        ...S.keypadDigit,
                        color: active ? "#9fd6f0" : "rgba(100,132,145,0.55)",
                      }}>
                        {entry[i] || "-"}
                      </span>
                    </span>
                  );
                })}
              </div>
              <div style={S.keypadProgress}>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} style={{
                    ...S.keypadProgressSeg,
                    backgroundColor: i < filled ? (isBad ? "#9f2b23" : "#4ca7b8") : "rgba(74,88,96,0.28)",
                  }} />
                ))}
              </div>
              <div style={S.keypadSignalLine}>
                <span>{isBad ? "AUTH FAILURE" : isOk ? "RELAY ACCEPTED" : "WAITING INPUT"}</span>
                <span>{filled}/4</span>
              </div>
            </div>

            {msg && (
              <div style={{ ...S.keypadMsg, color: msg.ok ? "#8bc4d4" : "#d85b49" }}>{msg.text}</div>
            )}

            <div style={S.keypadBodyGrid}>
              <div style={S.keypadWireBay}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} style={{
                    ...S.keypadWire,
                    backgroundColor: ["#6f3129", "#294c4d", "#6d5c2d", "#333b40", "#4e2c55"][i],
                  }} />
                ))}
              </div>

              <div style={S.keypadGrid}>
                {KEYS.map((k) => {
                  const enter = k === t("keypad.enter");
                  const del = k === t("keypad.del");
                  return (
                    <button key={k} className="s1-btn s1-key"
                      style={enter ? S.keyEnter : del ? S.keyAlt : S.keyBtn}
                      onClick={() => onKey(k)}>
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("keypad.cancel")}</button>
        </div>
      </div>
    </div>
  );
}
