import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

/* POMPA A — vana: dokundukça çark döner (turns kadar dokunuş) */
export function ValveOverlay({ title, deg, done, onTurn, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.valveTitle")}</div>
        <div style={S.valveWrap}>
          <div style={{ ...S.valveWheel, transform: "rotate(" + deg + "deg)" }}>
            <div style={S.valveSpokeV} />
            <div style={S.valveSpokeH} />
            <div style={S.valveHub} />
          </div>
        </div>
        <div style={S.mechProgTrack}>
          <div style={{ ...S.mechProgFill, width: Math.min(100, (deg / 360) * 100) + "%" }} />
        </div>
        <button className="s1-btn s1-key" style={S.bigActionBtn} onClick={onTurn}>
          {done ? t("mech.valveDone") : t("mech.valveTurn")}
        </button>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("mech.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* POMPA B — şalter: basılı tut; bırakırsan kol geri kayar */
export function LeverOverlay({ title, prog, done, onDown, onUp, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.leverTitle")}</div>
        <div style={S.leverTrack}>
          <div style={{ ...S.leverArm, bottom: (prog * 72) + "%" }} />
        </div>
        <div style={S.mechProgTrack}>
          <div style={{ ...S.mechProgFill, width: (prog * 100) + "%" }} />
        </div>
        <button className="s1-btn s1-key" style={S.bigActionBtn}
          onPointerDown={onDown} onPointerUp={onUp} onPointerLeave={onUp} onPointerCancel={onUp}>
          {done ? t("mech.leverDone") : t("mech.leverHold")}
        </button>
        <div style={S.lightsHintText}>{t("mech.leverHint")}</div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("mech.cancel")}</button>
        )}
      </div>
    </div>
  );
}

/* POMPA C — sigorta: gidip gelen ibre yeşil bölgedeyken bas */
export function FuseOverlay({ title, marker, hits, needed, msg, done, onTap, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.fuseTitle")}</div>
        <div style={S.fuseTrack}>
          <div style={S.fuseZone} />
          <div style={{ ...S.fuseMarkerEl, left: "calc(" + marker + "% - 2px)" }} />
        </div>
        {msg && (
          <div style={{ ...S.keypadMsg, color: msg.ok ? "#7fae86" : "#c23b2e" }}>{msg.text}</div>
        )}
        <button className="s1-btn s1-key" style={S.bigActionBtn} onClick={onTap}>
          {done ? t("mech.fuseDone") : t("mech.fuseTap", { a: hits, b: needed })}
        </button>
        <div style={S.lightsHintText}>{t("mech.fuseHint")}</div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>{t("mech.cancel")}</button>
        )}
      </div>
    </div>
  );
}
