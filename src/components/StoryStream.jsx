import { styles as S } from "../styles/theme";
import { corruptText, obscureText } from "../engine/textFx";
import { t } from "../i18n";

/* Hikaye akışı: satırlar (akıl bozulması + pil karartması uygulanır),
   karar zamanlayıcısı, seçim butonları ve bölüm sonu ekranı. */
export default function StoryStream({
  scrollRef, lines, typing, akil, wordsObscured, choicesObscured,
  timeLeft, choicesVisible, choices, flags, onChoice,
  ended, endInfo, onRestart, onMainMenu, tapWait,
}) {
  return (
    <div ref={scrollRef} style={S.stream}>
      {lines.map((l, i) => {
        let txt = l.text;
        if (l.kind === "narrate" || l.kind === "ambient") {
          txt = corruptText(txt, akil);
          if (wordsObscured) txt = obscureText(txt);
        }
        return (
          <p key={i} style={S.lineBase[l.kind] || S.lineBase.narrate} className="s1-line">
            {txt}
            {i === lines.length - 1 && typing && <span className="s1-cursor">▌</span>}
          </p>
        );
      })}

      {timeLeft && (
        <div style={S.timerWrap}>
          <div style={S.timerLabel}>{t("stream.decide")}</div>
          <div style={S.timerTrack}>
            <div style={{ ...S.timerFill, width: (timeLeft.left / timeLeft.total) * 100 + "%" }} />
          </div>
        </div>
      )}

      {choicesVisible && choices.length > 0 && (
        <div style={S.choices}>
          {choices.map((c, idx) => {
            const locked = c.requireFlags && !c.requireFlags.every((f) => flags[f]);
            const activeCount = c.requireFlags ? c.requireFlags.filter((f) => flags[f]).length : 0;
            const hidden = choicesObscured && !locked && idx % 2 === 1;
            return (
              <button key={c.id} className={"s1-btn" + (locked ? "" : " s1-choice")}
                style={locked ? S.choiceLocked : S.choiceBtn}
                onClick={(e) => { e.stopPropagation(); if (!locked) onChoice(c); }}>
                {locked
                  ? (c.lockText || c.text) + " (" + activeCount + "/" + c.requireFlags.length + ")"
                  : hidden ? t("stream.hidden") : c.text}
              </button>
            );
          })}
        </div>
      )}

      {ended && (
        <div style={S.endWrap}>
          <button className="s1-btn" style={S.beginBtn} onClick={(e) => { e.stopPropagation(); onRestart(); }}>
            {t("end.again")}
          </button>
          {onMainMenu && (
            <button className="s1-btn s1-menuitem" style={{ ...S.menuClose, marginTop: 12 }}
              onClick={(e) => { e.stopPropagation(); onMainMenu(); }}>
              {t("end.menu")}
            </button>
          )}
        </div>
      )}
      {tapWait && (
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 10,
          letterSpacing: "0.18em", color: "#5f7573", textAlign: "center",
          padding: "10px 0 4px",
        }}>
          <span className="s1-cursor">▸</span> {t("stream.tap")}
        </div>
      )}
      <div style={{ height: 40 }} />
    </div>
  );
}
