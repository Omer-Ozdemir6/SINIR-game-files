import { useState } from "react";
import { styles as S } from "../styles/theme";
import { AudioSys } from "../audio/AudioSys";
import { ShadowOverlay, WiresOverlay, MixOverlay, SymbolsOverlay, RingsOverlay, TilesOverlay, ColorGridOverlay } from "./interactions/PuzzleOverlays";

/* GEÇİCİ GELİŞTİRİCİ EKRANI — bulmacaları bölüm beklemeden dene.
   Bölümlere entegre edilince menüden kaldırılabilir. */

const CFG_SHADOW = { targetOuter: 150, targetInner: 255, step: 15 };

const CFG_WIRES = {
  title: "İNTERKOM YAMASI — HATLARI EŞLE",
  cables: [
    { id: "k1", label: "SES", color: "#d8b34a" },
    { id: "k2", label: "GÜÇ", color: "#c24a3a" },
    { id: "k3", label: "VERİ", color: "#4a8ac2" },
  ],
  ports: [
    { id: "p1", label: "V-IN" },
    { id: "p2", label: "12V" },
    { id: "p3", label: "MIC" },
  ],
  pairs: { k1: "p3", k2: "p2", k3: "p1" },
};

const CFG_SYMBOLS = {
  glyphs: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
  sequence: ["g4", "g1", "g7", "g5"],
};

const CFG_RINGS = {
  rings: [
    { color: "#4a6ac2", step: 45, start: 135 },
    { color: "#4aa26a", step: 60, start: 240 },
    { color: "#c24a3a", step: 90, start: 180 },
  ],
};

const CFG_TILES = {
  scramble: [4, 2, 8, 6, 0, 7, 1, 5, 3],
};

const CFG_COLOR = {
  palette: ["#d8d4c8", "#c2903a", "#141a18", "#4a8ac2"],
  target: [3, 0, 1, 0, 1, 2, 1, 3, 3],
  showTarget: true,
};

const CFG_MIX = {
  title: "NUMUNE TEZGAHI — TARİF: 2 ÖZÜT · 1 ÇÖZÜCÜ · 3 SABİT",
  bottles: [
    { id: "a", label: "ÖZÜT", color: "#c2903a" },
    { id: "b", label: "ÇÖZÜCÜ", color: "#4aa26a" },
    { id: "c", label: "SABİT", color: "#4a6ac2" },
  ],
  target: { a: 2, b: 1, c: 3 },
};

export default function PuzzleTest({ onBack }) {
  const [open, setOpen] = useState(null);
  const [msg, setMsg] = useState(null);

  const fail = (p) => {
    AudioSys.buzzSfx();
    setMsg({ text: p?.text || "HATALI HAMLE", ok: false });
    setTimeout(() => setMsg(null), 2200);
  };
  const win = (name) => {
    setOpen(null);
    setMsg({ text: name + " — ÇÖZÜLDÜ ✓", ok: true });
    setTimeout(() => setMsg(null), 2600);
  };
  const cancel = () => setOpen(null);

  return (
    <div style={S.menuRoot}>
      <div style={S.menuVignette} />
      <div style={S.menuInner}>
        <div style={S.menuSub}>GELİŞTİRİCİ — BULMACA TESTİ</div>
        <div style={S.mmButtons}>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("shadow")}>
            Gölge Hizalama
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("wires")}>
            Kablo Eşleştirme
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("mix")}>
            Kimyasal Karışım
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("symbols")}>
            Sembol Kilidi
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("rings")}>
            Vitray Halkaları
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("tiles")}>
            Karo Kapısı
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("colorgrid")}>
            Renk Panosu
          </button>
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={onBack}>
            Geri
          </button>
        </div>
        {msg && (
          <div style={{
            fontFamily: "'Courier New', ui-monospace, monospace", fontSize: 12,
            letterSpacing: "0.12em", marginTop: 24,
            color: msg.ok ? "#7fae86" : "#c23b2e",
          }}>
            {msg.text}
          </div>
        )}
      </div>

      {open === "shadow" && (
        <ShadowOverlay config={CFG_SHADOW} onSuccess={() => win("GÖLGE")} onFail={fail} onCancel={cancel} />
      )}
      {open === "wires" && (
        <WiresOverlay config={CFG_WIRES} onSuccess={() => win("KABLO")} onFail={fail} onCancel={cancel} />
      )}
      {open === "mix" && (
        <MixOverlay config={CFG_MIX} onSuccess={() => win("KARIŞIM")} onFail={fail} onCancel={cancel} />
      )}
      {open === "symbols" && (
        <SymbolsOverlay config={CFG_SYMBOLS} onSuccess={() => win("SEMBOL")} onFail={fail} onCancel={cancel} />
      )}
      {open === "rings" && (
        <RingsOverlay config={CFG_RINGS} onSuccess={() => win("VİTRAY")} onFail={fail} onCancel={cancel} />
      )}
      {open === "tiles" && (
        <TilesOverlay config={CFG_TILES} onSuccess={() => win("KARO")} onFail={fail} onCancel={cancel} />
      )}
      {open === "colorgrid" && (
        <ColorGridOverlay config={CFG_COLOR} onSuccess={() => win("RENK")} onFail={fail} onCancel={cancel} />
      )}
    </div>
  );
}
