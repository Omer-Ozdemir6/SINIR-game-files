import { styles as S } from "../../styles/theme";

/* POMPA A — vana: dokundukça çark döner (turns kadar dokunuş) */
export function ValveOverlay({ deg, done, onTurn, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>POMPA A — VANAYI ÇEVİR</div>
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
          {done ? "AÇILDI ✓" : "ÇEVİR"}
        </button>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>Vazgeç</button>
        )}
      </div>
    </div>
  );
}

/* POMPA B — şalter: basılı tut; bırakırsan kol geri kayar */
export function LeverOverlay({ prog, done, onDown, onUp, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>POMPA B — ŞALTERİ KALDIR</div>
        <div style={S.leverTrack}>
          <div style={{ ...S.leverArm, bottom: (prog * 72) + "%" }} />
        </div>
        <div style={S.mechProgTrack}>
          <div style={{ ...S.mechProgFill, width: (prog * 100) + "%" }} />
        </div>
        <button className="s1-btn s1-key" style={S.bigActionBtn}
          onPointerDown={onDown} onPointerUp={onUp} onPointerLeave={onUp} onPointerCancel={onUp}>
          {done ? "KALKTI ✓" : "BASILI TUT"}
        </button>
        <div style={S.lightsHintText}>Bırakırsan kol geri kayar.</div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>Vazgeç</button>
        )}
      </div>
    </div>
  );
}

/* POMPA C — sigorta: gidip gelen ibre yeşil bölgedeyken bas */
export function FuseOverlay({ marker, hits, needed, msg, done, onTap, onCancel }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.keypadPanel} className="s1-panel">
        <div style={S.keypadTitle}>POMPA C — SİGORTAYI HİZALA</div>
        <div style={S.fuseTrack}>
          <div style={S.fuseZone} />
          <div style={{ ...S.fuseMarkerEl, left: "calc(" + marker + "% - 2px)" }} />
        </div>
        {msg && (
          <div style={{ ...S.keypadMsg, color: msg.ok ? "#7fae86" : "#c23b2e" }}>{msg.text}</div>
        )}
        <button className="s1-btn s1-key" style={S.bigActionBtn} onClick={onTap}>
          {done ? "OTURDU ✓" : "TAK (" + hits + "/" + needed + ")"}
        </button>
        <div style={S.lightsHintText}>Yeşil bölge dışında basarsan kıvılcım çıkar — gürültü artar.</div>
        {!done && (
          <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onCancel}>Vazgeç</button>
        )}
      </div>
    </div>
  );
}
