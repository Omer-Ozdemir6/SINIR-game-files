import { useState } from "react";
import { styles as S } from "../styles/theme";
import { AudioSys } from "../audio/AudioSys";
import { ShadowOverlay, WiresOverlay, MixOverlay, PlateLinkerOverlay } from "./interactions/PuzzleOverlays";

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
          {/* Ekran görüntüsü 2026-07-04 115527.png modelinden esinlenilen 7'li altıgen resim hizalama oyunu */}
          <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setOpen("hexPlates")}>
            Altıgen Taş Entegrasyonu
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
      {open === "hexPlates" && (
        <PlateLinkerOverlay config={{}} onSuccess={() => win("ANTİK ALTIGEN MATRİSİ")} onFail={fail} onCancel={cancel} />
      )}
    </div>
  );
}