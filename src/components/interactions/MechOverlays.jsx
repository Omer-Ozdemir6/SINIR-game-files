import { styles as S } from "../../styles/theme";
import { t } from "../../i18n";

const VALVE_BOLTS = 8;
const VALVE_SPOKE_ANGLES = [0, 45, 90, 135];

/* POMPA A — vana: dokundukça çark döner (turns kadar dokunuş) */
export function ValveOverlay({ title, deg, done, busy, turns = 6, onTurn, onCancel }) {
  const segs = Math.max(1, turns);
  const filled = Math.min(segs, Math.round((deg / 360) * segs));
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.valveTitle")}</div>
        <div style={S.valveWrap}>
          <div style={S.valveRim}>
            {Array.from({ length: VALVE_BOLTS }).map((_, i) => (
              <div key={i} style={{ ...S.valveBolt, transform: `rotate(${(360 / VALVE_BOLTS) * i}deg) translateY(-60px)` }} />
            ))}
            <div
              key={Math.floor(deg / 3)}
              style={{ ...S.valveWheel, transform: "rotate(" + deg + "deg)" }}
              className={busy ? "s1-mech-pulse" : done ? "s1-mech-done" : ""}
            >
              {VALVE_SPOKE_ANGLES.map((a) => (
                <div key={a} style={{ ...S.valveSpoke, transform: `translate(-50%, -50%) rotate(${a}deg)` }} />
              ))}
              <div style={S.valveHandle} />
              <div style={S.valveHub}>
                <div style={{
                  ...S.valveHubDot,
                  backgroundColor: done ? "#7ad696" : "#3a4038",
                  boxShadow: done ? "0 0 8px #7ad696" : "none",
                }} />
              </div>
            </div>
          </div>
        </div>
        <div style={S.mechSegRow}>
          {Array.from({ length: segs }).map((_, i) => (
            <div key={i} style={{
              ...S.mechSeg,
              backgroundColor: i < filled ? "#7fbcdc" : "#1a2228",
              boxShadow: i < filled ? "0 0 8px rgba(127,188,220,0.7)" : "none",
            }} />
          ))}
        </div>
        <button className="s1-btn s1-key" style={{
          ...S.bigActionBtn,
          opacity: busy && !done ? 0.62 : 1,
          pointerEvents: busy && !done ? "none" : "auto",
        }} disabled={busy && !done} onClick={onTurn}>
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
  const glow = 0.15 + prog * 0.55;
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.leverTitle")}</div>
        <div style={S.leverTrack}>
          {[20, 38, 56, 74].map((p) => (
            <div key={p} style={{ ...S.leverTick, bottom: p + "%" }} />
          ))}
          <div style={{ ...S.leverFill, height: (prog * 72 + 4) + "%" }} />
          <div
            style={{
              ...S.leverArm,
              bottom: (prog * 72) + "%",
              boxShadow: `0 3px 8px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 ${Math.round(glow * 26)}px rgba(127,190,220,${glow.toFixed(2)})`,
            }}
            className={done ? "s1-mech-done" : ""}
          >
            <div style={S.leverGrip} />
          </div>
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
export function FuseOverlay({ title, marker, hits, needed, msg, done, zoneMin = 44, zoneMax = 56, onTap, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>{title || t("mech.fuseTitle")}</div>
        <div style={S.fuseTrack} className={msg && !msg.ok ? "s1-keypad-error" : ""}>
          <div style={S.fuseTicks} />
          <div style={{ ...S.fuseZone, left: zoneMin + "%", width: (zoneMax - zoneMin) + "%" }} className="s1-mech-zone" />
          <div style={{ ...S.fuseMarkerEl, left: "calc(" + marker + "% - 1.5px)" }} />
          {msg && (
            <div
              key={msg.key}
              className="s1-mech-spark"
              style={{
                ...S.fuseSpark,
                left: marker + "%",
                backgroundImage: msg.ok
                  ? "radial-gradient(circle, rgba(122,214,150,0.9), rgba(122,214,150,0) 70%)"
                  : "radial-gradient(circle, rgba(194,59,46,0.9), rgba(194,59,46,0) 70%)",
              }}
            />
          )}
        </div>
        {msg && (
          <div style={{ ...S.keypadMsg, color: msg.ok ? "#7f9eb5" : "#c23b2e" }}>{msg.text}</div>
        )}
        <div style={S.mechSegRow}>
          {Array.from({ length: needed }).map((_, i) => (
            <div key={i} style={{
              ...S.mechSeg,
              backgroundColor: i < hits ? "#7ad696" : "#1a2228",
              boxShadow: i < hits ? "0 0 8px rgba(122,214,150,0.7)" : "none",
            }} />
          ))}
        </div>
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
