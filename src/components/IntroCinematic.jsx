import { useState, useEffect, useRef } from "react";
import { styles as S } from "../styles/theme";
import { AudioSys } from "../audio/AudioSys";
import { t } from "../i18n";

/* ============================================================
   AÇILIŞ SİNEMATİĞİ v2 — "İHBARCI" (Outlast: Whistleblower akışı)
   1) Mail YARISI YAZILMIŞ halde açılır — sadece SONUNUN yazılışını
      izleriz (Baturay'ın ihbar maili, bir gazeteciye).
   2) Bekleme → imleç SİL'e gider, basar → "TASLAK SİLİNSİN Mİ?"
      → tereddüt → HAYIR.
   3) Ekranda talimat belirir: "MESAJI GÖNDERMEK İÇİN GÖNDER'E BAS"
      — GÖNDER'e OYUNCU basar (ihbarı oyuncu yollar).
   4) Basar basmaz: kapkara ekranda OYUN İSMİ parlar (Whistleblower
      başlık kartı) → yavaş fade-out → "Birkaç gün sonra." → oyun.
   ============================================================ */

// Ekran açıldığında ZATEN yazılmış olan kısım:
const PREFILLED =
"Beni tanımıyorsunuz. Hızlı yazmak zorundayım — ağı izliyor olabilirler.\n\nSINIR-1'de gece vardiya amiriyim. Karadeniz'de, hiçbir haritada olmayan bir araştırma istasyonu. Burada korkunç şeyler oluyor ve gördüklerimin yarısına kendim de inanmıyorum.\n\nMürettebat uykusunda sayı sayıyor. Hepsi. Aynı sayıları. İstasyon şefi buna 'aile düzeni' diyor. Revir kayıtları saklanıyor, denetim taleplerim";

// Gözümüzün önünde yazılan SON kısım:
const TYPED_END =
" cevapsız kalıyor.\n\nK-2 ambarında bir şey tutuyorlar. Kazıdan çıkan bir şey. Adına 'Buluntu' diyorlar ve ona dua eder gibi bakıyorlar.\n\nBu mail size ulaşırsa: buraya kimseyi tek başına göndermeyin. Ve gece üçten sonra telsiz bandını taramayın.\n\n— Baturay Soylu, gece vardiya amiri";

/* ---- WHISTLEBLOWER GÖRÜNÜMÜ: açık gri pencere, beyaz sayfa,
   mavi el yazısı — Outlast'ın SECURE MAIL ekranı ---- */
const hand = "'Segoe Print', 'Comic Sans MS', 'Bradley Hand', cursive";
const ui = "Tahoma, 'Segoe UI', Arial, sans-serif";
const W = {
  backdrop: {
    position: "fixed", inset: 0, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "14px 10px",
    backgroundColor: "#1a1410",
    backgroundImage: "url(/desktop-bg.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  win: {
    position: "relative", width: "100%", maxWidth: 620,
    backgroundColor: "#c9c6bd", border: "1px solid #6a675e",
    boxShadow: "0 18px 70px rgba(0,0,0,0.85), inset 0 1px 0 #eceade",
    borderRadius: 4, overflow: "hidden",
    fontFamily: ui,
  },
  titleBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "4px 8px", fontSize: 10, color: "#f2f0e8",
    background: "linear-gradient(#8a94a0, #6a7480)",
  },
  winBtns: { display: "flex", gap: 4, fontSize: 9, color: "#dcdcd4" },
  winBtn: { width: 16, height: 13, textAlign: "center", lineHeight: "12px", backgroundColor: "#b8b4a8", color: "#3a3a34", border: "1px solid #7a776c", borderRadius: 2 },
  menuRow: { display: "flex", gap: 12, padding: "3px 8px", fontSize: 9.5, color: "#4a473e", borderBottom: "1px solid #a8a498", backgroundColor: "#d4d1c6" },
  urlRow: { display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", borderBottom: "1px solid #a8a498", backgroundColor: "#cfccc1" },
  urlBox: {
    flex: 1, fontSize: 9.5, color: "#3a4a3e", backgroundColor: "#f2f0e6",
    border: "1px solid #8a8778", borderRadius: 2, padding: "3px 7px",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  bandRow: {
    display: "flex", alignItems: "center", gap: 7, padding: "6px 10px",
    background: "linear-gradient(#4a5560, #3a444e)", color: "#e8ecdf",
    fontSize: 11, letterSpacing: "0.18em", fontWeight: 700,
  },
  toolRow: { display: "flex", gap: 14, padding: "5px 10px", fontSize: 9.5, color: "#4a473e", borderBottom: "1px solid #a8a498", backgroundColor: "#d4d1c6" },
  bodyWrap: { display: "flex", alignItems: "stretch", backgroundColor: "#c9c6bd" },
  attach: {
    width: 86, flexShrink: 0, borderRight: "1px solid #a8a498",
    backgroundColor: "#d0cdc2", padding: "6px 6px", fontSize: 9, color: "#5a574c",
  },
  attachTitle: { borderBottom: "1px solid #a8a498", paddingBottom: 3, marginBottom: 6, fontSize: 9 },
  rightCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  field: { display: "flex", gap: 6, alignItems: "baseline", padding: "3px 10px", fontSize: 10.5, color: "#3a3a32" },
  fieldLabel: { width: 46, flexShrink: 0, color: "#6a675c", fontSize: 9.5 },
  fieldVal: { flex: 1, borderBottom: "1px solid #b4b1a4", paddingBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  page: {
    margin: "8px 10px 0", backgroundColor: "#f6f4ec",
    border: "1px solid #a8a498", minHeight: 240, maxHeight: "42vh", overflowY: "auto",
    padding: "14px 16px",
  },
  ink: { fontFamily: hand, fontSize: 15, lineHeight: 1.85, color: "#2b3fae", whiteSpace: "pre-wrap", wordBreak: "break-word" },
  status: { padding: "5px 12px 0", fontSize: 9.5, minHeight: 16, textAlign: "right", color: "#5a6a4e", fontFamily: ui, letterSpacing: "0.06em" },
  btnRow: { display: "flex", gap: 8, padding: "8px 10px 10px" },
  btn: {
    fontFamily: ui, fontSize: 10.5, color: "#2e2c26", cursor: "default",
    padding: "5px 14px", backgroundColor: "#dcd9ce",
    border: "1px solid #8a8778", borderRadius: 2,
    boxShadow: "inset 0 1px 0 #f4f2e8, 0 1px 0 #9a978a",
  },
  btnDown: { boxShadow: "inset 0 1px 3px rgba(0,0,0,0.35)", transform: "translateY(1px)", backgroundColor: "#cfccc0" },
  dialog: {
    position: "absolute", top: "36%", left: "50%", transform: "translate(-50%,-50%)",
    backgroundColor: "#d4d1c6", border: "1px solid #7a776c",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)", borderRadius: 3,
    padding: 0, zIndex: 3, minWidth: 240,
  },
  dialogTitle: { padding: "4px 8px", fontSize: 10, color: "#f2f0e8", background: "linear-gradient(#8a94a0, #6a7480)" },
  dialogBody: { padding: "16px 16px 12px", fontSize: 11, color: "#3a3a32", textAlign: "center" },
  dialogRow: { display: "flex", justifyContent: "center", gap: 10, padding: "0 12px 12px" },
};

export default function IntroCinematic({ onFinish }) {
  const [body, setBody] = useState(PREFILLED);
  const [phase, setPhase] = useState("mail"); // mail | waitSend | sent | title | titleout | card | done
  const [dialog, setDialog] = useState(false);
  const [status, setStatus] = useState("");
  const [pressed, setPressed] = useState(null);
  const [cursor, setCursor] = useState({ x: "70%", y: "86%", visible: false });

  const rootRef = useRef(null);
  const silRef = useRef(null);
  const gonderRef = useRef(null);
  const evetRef = useRef(null);
  const hayirRef = useRef(null);
  const aliveRef = useRef(true);
  const doneRef = useRef(false);
  const phaseRef = useRef("mail");
  const setPh = (p) => { phaseRef.current = p; setPhase(p); };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onFinish();
  };

  /* OYUNCUNUN GÖNDER'İ — sinematiğin tek etkileşimli anı */
  const playerSend = async () => {
    if (phaseRef.current !== "waitSend" || doneRef.current) return;
    setPh("sent");
    setPressed("gonder");
    AudioSys.blipSfx(720);
    setTimeout(() => setPressed(null), 200);
    setStatus("GÖNDERİLİYOR…");
    setTimeout(() => {
      if (doneRef.current) return;
      setStatus("GÖNDERİLDİ ✓");
      AudioSys.blipSfx(880);
      // Whistleblower başlık kartı:
      setTimeout(() => { if (!doneRef.current) { setPh("title"); AudioSys.boom(); } }, 900);
      setTimeout(() => { if (!doneRef.current) setPh("titleout"); }, 3400);
      setTimeout(() => { if (!doneRef.current) setPh("card"); }, 5400);
      setTimeout(() => { if (!doneRef.current) finish(); }, 8600);
    }, 1300);
  };

  useEffect(() => {
    aliveRef.current = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const alive = () => aliveRef.current && !doneRef.current;

    const typeText = async (text, base = 60) => {
      for (let i = 0; i < text.length; i++) {
        if (!alive()) return;
        setBody((b) => b + text[i]);
        if (i % 3 === 0) AudioSys.blipSfx(190);
        await sleep(text[i] === "\n" ? 240 : base + Math.random() * 70);
      }
    };
    const moveTo = async (ref, ms = 900) => {
      if (!alive() || !ref.current || !rootRef.current) return;
      const r = ref.current.getBoundingClientRect();
      const root = rootRef.current.getBoundingClientRect();
      setCursor({
        x: r.left - root.left + r.width * 0.55 + "px",
        y: r.top - root.top + r.height * 0.6 + "px",
        visible: true,
      });
      await sleep(ms + 120);
    };
    const click = async (name) => {
      if (!alive()) return;
      setPressed(name);
      AudioSys.blipSfx(520);
      await sleep(180);
      setPressed(null);
      await sleep(240);
    };

    (async () => {
      await sleep(1600);
      // 1) yazının SONU gözümüzün önünde yazılır
      await typeText(TYPED_END, 55);
      if (!alive()) return;
      await sleep(2000); // ekran biraz bekler — yazdığına bakıyor
      // 2) imleç belirir, SİL'e gider
      await moveTo(silRef, 1000);
      await click("sil");
      if (!alive()) return;
      AudioSys.buzzSfx();
      setDialog(true);
      await sleep(900);
      // 3) tereddüt: EVET'in üstünde uzun bekleyiş...
      await moveTo(evetRef, 800);
      await sleep(1900);
      // ...ve HAYIR
      await moveTo(hayirRef, 700);
      await click("hayir");
      if (!alive()) return;
      setDialog(false);
      setCursor((c) => ({ ...c, visible: false }));
      await sleep(700);
      // 4) söz oyuncuda: GÖNDER'e o basacak
      if (!alive()) return;
      setStatus(t("intro.pressSend"));
      setPh("waitSend");
    })();

    return () => { aliveRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- BAŞLIK KARTI + ZAMAN KARTI ---- */
  if (phase === "title" || phase === "titleout") {
    return (
      <div style={S.introBlack}>
        <div className={phase === "title" ? "s1-fadein" : "s1-fadeout"} style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: "clamp(30px, 9vw, 52px)", fontWeight: 700,
          letterSpacing: "0.45em", paddingLeft: "0.45em",
          color: "#e8ecdf",
          textShadow: "0 0 18px rgba(220,240,210,0.85), 0 0 46px rgba(160,220,180,0.4)",
          whiteSpace: "nowrap",
        }}>
          SINIR-1
        </div>
      </div>
    );
  }
  if (phase === "card" || phase === "done") {
    return (
      <div style={S.introBlack}>
        <div className="s1-fadeslow" style={S.introBlackText}>{t("intro.later")}</div>
      </div>
    );
  }

  return (
    <div ref={rootRef} style={W.backdrop} className={phase === "sent" && status === "GÖNDERİLDİ ✓" ? "s1-fadeout" : "s1-fadein"}>
      <div style={W.win}>
        {/* pencere başlığı */}
        <div style={W.titleBar}>
          <span>GÜVENLİ POSTA — Ağ Tarayıcısı</span>
          <span style={W.winBtns}>
            <span style={W.winBtn}>_</span>
            <span style={W.winBtn}>□</span>
            <span style={W.winBtn}>✕</span>
          </span>
        </div>
        <div style={W.menuRow}>
          <span>Dosya</span><span>Düzen</span><span>Görünüm</span><span>Geçmiş</span><span>Araçlar</span><span>Yardım</span>
        </div>
        <div style={W.urlRow}>
          <span style={{ fontSize: 10 }}>◀ ▶</span>
          <div style={W.urlBox}>🔒 https://www.gposta.tr/?gorev=posta&_id=19319410214&_eylem=yaz</div>
          <span style={{ fontSize: 10 }}>⟳</span>
        </div>
        <div style={W.bandRow}>
          <span>🔒</span> GÜVENLİ POSTA
        </div>
        <div style={W.toolRow}>
          <span>✉ Gönder</span><span>✓ Yazım</span><span>📎 Ekle</span><span>🔒 Güvenlik</span><span>💾 Kaydet</span>
        </div>

        <div style={W.bodyWrap}>
          <div style={W.attach}>
            <div style={W.attachTitle}>Ekler</div>
          </div>
          <div style={W.rightCol}>
            <div style={W.field}>
              <span style={W.fieldLabel}>Kimden</span>
              <span style={W.fieldVal}>10260110756 (anonim)</span>
            </div>
            <div style={W.field}>
              <span style={W.fieldLabel}>Kime</span>
              <span style={W.fieldVal}>t.ergin@derinbasin.tr</span>
            </div>
            <div style={W.field}>
              <span style={W.fieldLabel}>Konu</span>
              <span style={W.fieldVal}>İHBAR / SINIR-1 Araştırma İstasyonu'nda Yasadışı Faaliyet</span>
            </div>
            <div style={W.page}>
              <div style={W.ink}>
                {body}
                <span className="s1-cursor" style={{ color: "#2b3fae" }}>▌</span>
              </div>
            </div>
            <div style={{
              ...W.status,
              ...(phase === "waitSend" ? { color: "#8a4a1e", fontWeight: 700 } : {}),
            }} className={phase === "waitSend" ? "s1-critical" : ""}>
              {status}
            </div>
            <div style={W.btnRow}>
              <div ref={gonderRef}
                onClick={playerSend}
                style={{
                  ...W.btn,
                  ...(pressed === "gonder" ? W.btnDown : {}),
                  ...(phase === "waitSend" ? { cursor: "pointer", borderColor: "#5a7a4e", boxShadow: "inset 0 1px 0 #f4f2e8, 0 0 10px rgba(120,180,90,0.55)" } : {}),
                }}>
                Mesajı gönder
              </div>
              <div ref={silRef}
                style={{ ...W.btn, ...(pressed === "sil" ? W.btnDown : {}) }}>
                Vazgeç
              </div>
            </div>
          </div>
        </div>

        {dialog && (
          <div style={W.dialog}>
            <div style={W.dialogTitle}>GÜVENLİ POSTA</div>
            <div style={W.dialogBody}>Taslak silinsin mi?</div>
            <div style={W.dialogRow}>
              <div ref={evetRef} style={W.btn}>Evet</div>
              <div ref={hayirRef} style={{ ...W.btn, ...(pressed === "hayir" ? W.btnDown : {}) }}>Hayır</div>
            </div>
          </div>
        )}
      </div>

      {cursor.visible && (
        <div style={{
          position: "absolute", left: cursor.x, top: cursor.y, zIndex: 6, pointerEvents: "none",
          width: 0, height: 0,
          borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
          borderBottom: "18px solid #1e1e1a",
          transform: "rotate(-38deg)",
          filter: "drop-shadow(0 0 2px rgba(255,255,255,0.7))",
          transitionProperty: "left, top", transitionDuration: "900ms",
          transitionTimingFunction: "ease-in-out",
        }} />
      )}

      <button className="s1-btn" style={S.introSkip}
        onClick={(e) => { e.stopPropagation(); finish(); }}>
        {t("intro.skip")}
      </button>
    </div>
  );
}
