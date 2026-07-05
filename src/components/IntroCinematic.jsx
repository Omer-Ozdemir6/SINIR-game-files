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

/* ---- SECURE MAIL — Outlast görseline birebir:
   açık gri pencere, mavi başlık bandı, düz MAVİ yazı ---- */
const ui = "Tahoma, 'Segoe UI', Arial, sans-serif";
const W = {
  backdrop: {
    position: "fixed", inset: 0, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 0, overflow: "hidden",
    backgroundColor: "#1a1410",
    backgroundImage: "url(/desktop-bg.jpg)",
    backgroundSize: "cover", backgroundPosition: "center",
  },
  // pencere: ekrana SIĞAR (kaydırma yok), sabit iç oran, viewport'a göre ölçek
  win: {
    position: "relative",
    width: "min(94vw, 680px)",
    maxHeight: "92vh",
    display: "flex", flexDirection: "column",
    backgroundColor: "#d7d4cc", border: "1px solid #55524a",
    boxShadow: "0 18px 70px rgba(0,0,0,0.85), inset 0 1px 0 #eceade",
    fontFamily: ui, overflow: "hidden",
  },
  // pencere başlık çubuğu (koyu gri)
  titleBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "3px 6px", fontSize: 10, color: "#e8e6de",
    background: "linear-gradient(#7c8590, #5f6771)", flexShrink: 0,
  },
  winBtns: { display: "flex", gap: 3 },
  winBtn: { width: 15, height: 12, textAlign: "center", lineHeight: "11px", fontSize: 8, backgroundColor: "#c8c4b8", color: "#3a3a34", border: "1px solid #6a675c" },
  menuRow: { display: "flex", gap: 11, padding: "2px 8px", fontSize: 9, color: "#3a382f", borderBottom: "1px solid #b0ac9f", backgroundColor: "#ece9df", flexShrink: 0 },
  urlRow: { display: "flex", alignItems: "center", gap: 6, padding: "3px 8px", borderBottom: "1px solid #b0ac9f", backgroundColor: "#e4e1d6", flexShrink: 0 },
  urlBox: {
    flex: 1, fontSize: 9, color: "#2a3a2e", backgroundColor: "#fbfaf4",
    border: "1px solid #9a978a", padding: "2px 7px",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    display: "flex", alignItems: "center", gap: 5,
  },
  // MAVİ "SECURE MAIL" bandı
  bandRow: {
    display: "flex", alignItems: "center", gap: 8, padding: "7px 12px",
    background: "linear-gradient(#3f5876, #2f4560)", color: "#eef2f6",
    fontSize: 13, letterSpacing: "0.12em", fontWeight: 700, flexShrink: 0,
  },
  // araç çubuğu (Send / Spelling / Attach...)
  toolRow: { display: "flex", gap: 16, padding: "5px 12px", fontSize: 9.5, color: "#3a382f", borderBottom: "1px solid #b0ac9f", backgroundColor: "#e8e5da", flexShrink: 0 },
  bodyWrap: { display: "flex", alignItems: "stretch", backgroundColor: "#d7d4cc", flex: 1, minHeight: 0 },
  // solda Attachments paneli
  attach: {
    width: "22%", minWidth: 78, flexShrink: 0, borderRight: "1px solid #b0ac9f",
    backgroundColor: "#dedbd0", padding: "6px 7px", fontSize: 9, color: "#55524a",
  },
  attachTitle: { borderBottom: "1px solid #b0ac9f", paddingBottom: 4, marginBottom: 6, fontSize: 9.5, color: "#3a382f" },
  rightCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  field: { display: "flex", gap: 8, alignItems: "baseline", padding: "3px 10px", fontSize: 10, color: "#2e2c26", flexShrink: 0 },
  fieldLabel: { width: 44, flexShrink: 0, color: "#6a675c", fontSize: 9 },
  fieldVal: { flex: 1, borderBottom: "1px solid #bdbaad", paddingBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  subLinks: { display: "flex", gap: 8, padding: "1px 10px 3px 62px", fontSize: 8, color: "#4a6a9a", flexShrink: 0 },
  // yazı sayfası — BEYAZ, DÜZ MAVİ yazı; yazıldıkça otomatik alta kayar
  page: {
    margin: "6px 10px", backgroundColor: "#ffffff",
    border: "1px solid #b0ac9f", flex: 1, minHeight: 0, overflowY: "auto",
    padding: "14px 18px",
  },
  ink: {
    fontFamily: ui, fontSize: "clamp(11px, 2.7vw, 14px)", fontWeight: 700,
    lineHeight: 1.5, color: "#1a3fb8", whiteSpace: "pre-wrap", wordBreak: "break-word",
  },
  status: { padding: "3px 12px 0", fontSize: 9, minHeight: 14, textAlign: "right", color: "#4a6a4e", fontFamily: ui, letterSpacing: "0.06em", flexShrink: 0 },
  btnRow: { display: "flex", gap: 8, padding: "6px 10px 9px", flexShrink: 0 },
  btn: {
    fontFamily: ui, fontSize: 10, color: "#2e2c26", cursor: "default",
    padding: "4px 13px", backgroundColor: "#e4e1d6",
    border: "1px solid #8a8778", boxShadow: "inset 0 1px 0 #faf8ee, 0 1px 0 #9a978a",
  },
  btnDown: { boxShadow: "inset 0 1px 3px rgba(0,0,0,0.35)", transform: "translateY(1px)", backgroundColor: "#d4d1c6" },
  dialog: {
    position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
    backgroundColor: "#e4e1d6", border: "1px solid #6a675c",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)", zIndex: 3, minWidth: 230,
  },
  dialogTitle: { padding: "4px 8px", fontSize: 10, color: "#e8e6de", background: "linear-gradient(#7c8590, #5f6771)" },
  dialogBody: { padding: "16px 16px 12px", fontSize: 11, color: "#2e2c26", textAlign: "center" },
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
  const pageRef = useRef(null);
  const silRef = useRef(null);
  const gonderRef = useRef(null);
  const evetRef = useRef(null);
  const hayirRef = useRef(null);
  const aliveRef = useRef(true);
  const doneRef = useRef(false);
  const phaseRef = useRef("mail");
  const setPh = (p) => { phaseRef.current = p; setPhase(p); };

  // yazı yazıldıkça mail sayfasını otomatik en alta kaydır (manuel kaydırma gerekmez)
  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTop = pageRef.current.scrollHeight;
  }, [body]);

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
      let i = 0;
      let blipCount = 0;
      while (i < text.length) {
        if (!alive()) return;
        // yeni satırda dur; aksi halde 2-5 karakterlik öbek ekle
        if (text[i] === "\n") {
          setBody((b) => b + "\n");
          i += 1;
          await sleep(220);
          continue;
        }
        // öbek boyu: 2-5 karakter, ama satır sonunu aşma
        let chunk = 2 + Math.floor(Math.random() * 4);   // 2..5
        let end = i + chunk;
        const nl = text.indexOf("\n", i);
        if (nl !== -1 && nl < end) end = nl;              // satır sonuna kadar
        const piece = text.slice(i, end);
        setBody((b) => b + piece);
        i = end;
        if (blipCount++ % 2 === 0) AudioSys.blipSfx(190);
        await sleep(base + Math.random() * 55);
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
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 9 }}>🔒</span> GÜVENLİ POSTA
          </span>
          <span style={W.winBtns}>
            <span style={W.winBtn}>_</span>
            <span style={W.winBtn}>□</span>
            <span style={{ ...W.winBtn, backgroundColor: "#c0504a", color: "#fff" }}>✕</span>
          </span>
        </div>
        <div style={W.menuRow}>
          <span>Dosya</span><span>Düzen</span><span>Görünüm</span><span>Geçmiş</span><span>Yer İmleri</span><span>Araçlar</span><span>Yardım</span>
        </div>
        <div style={W.urlRow}>
          <span style={{ fontSize: 9, color: "#5a574c" }}>◀ ▶</span>
          <div style={W.urlBox}>
            <span style={{ fontSize: 8 }}>🔒</span>
            https://www.gposta.tr/?gorev=posta&_id=19319410214&_eylem=yaz
          </div>
          <span style={{ fontSize: 9, color: "#5a574c" }}>☆ ⟳</span>
        </div>

        {/* MAVİ SECURE MAIL bandı */}
        <div style={W.bandRow}>
          <span style={{ fontSize: 12 }}>🔒</span> GÜVENLİ POSTA
        </div>

        {/* araç çubuğu */}
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
            <div style={W.subLinks}>
              <span>Cc Ekle</span><span>|</span><span>Bcc Ekle</span><span>|</span><span>Yanıt Adresi Ekle</span>
            </div>
            <div style={W.field}>
              <span style={W.fieldLabel}>Konu</span>
              <span style={W.fieldVal}>İHBAR / SINIR-1 Araştırma İstasyonu'nda Yasadışı Faaliyet</span>
            </div>
            <div style={W.page} ref={pageRef}>
              <div style={W.ink}>
                {body}
                <span className="s1-cursor" style={{ color: "#1a3fb8" }}>▌</span>
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
                  ...(phase === "waitSend" ? { cursor: "pointer", borderColor: "#5a7a4e", boxShadow: "inset 0 1px 0 #faf8ee, 0 0 10px rgba(120,180,90,0.55)" } : {}),
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
