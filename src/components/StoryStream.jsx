import { memo, useMemo } from "react";
import { styles as S } from "../styles/theme";
import { obscureText } from "../engine/textFx";
import { t } from "../i18n";

const MAX_VISIBLE_LINES = 90;

const StoryLine = memo(function StoryLine({ line, cursor, wordsObscured }) {
  let txt = line.text;
  if ((line.kind === "narrate" || line.kind === "ambient") && wordsObscured) {
    txt = obscureText(txt);
  }

  return (
    <p style={S.lineBase[line.kind] || S.lineBase.narrate} className="s1-line">
      {txt}
      {cursor && <span className="s1-cursor">▌</span>}
    </p>
  );
});

export default function StoryStream({
  scrollRef, lines, typing, wordsObscured, choicesObscured,
  timeLeft, choicesVisible, choices, flags, onChoice,
  ended, onEndContinue, tapWait, onSkipTap,
}) {
  const visibleLines = useMemo(() => {
    if (lines.length <= MAX_VISIBLE_LINES) return lines.map((line, i) => ({ line, key: i }));
    const offset = lines.length - MAX_VISIBLE_LINES;
    return lines.slice(offset).map((line, i) => ({ line, key: offset + i }));
  }, [lines]);
  const lastLineKey = lines.length - 1;

  return (
    <div ref={scrollRef} style={S.stream} onPointerDown={(e) => {
      if (e.target.closest("button, .s1-btn, [role='button']")) return;
      onSkipTap && onSkipTap();
    }}>
      {lines.length > MAX_VISIBLE_LINES && (
        <div style={S.streamTrimNotice}>ONCEKI KAYITLAR ARSIVDE</div>
      )}

      {visibleLines.map(({ line, key }) => (
        <StoryLine
          key={key}
          line={line}
          cursor={key === lastLineKey && typing}
          wordsObscured={wordsObscured}
        />
      ))}

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
          <button className="s1-btn" style={{ ...S.beginBtn, animation: "s1-blink 1.6s infinite" }}
            onClick={(e) => { e.stopPropagation(); onEndContinue && onEndContinue(); }}>
            {t("end.continue")}
          </button>
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
