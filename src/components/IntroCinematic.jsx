import { useState, useEffect, useRef } from "react";
import { styles as S } from "../styles/theme";
import { AudioSys } from "../audio/AudioSys";
import { t } from "../i18n";

/* ============================================================
   AÇILIŞ SİNEMATİĞİ v2 — "İHBARCI" (PERISHED kayıt akışı)
   1) Mail YARISI YAZILMIŞ halde açılır — sadece SONUNUN yazılışını
      izleriz (Baturay'ın ihbar maili, bir gazeteciye).
   2) Bekleme → imleç SİL'e gider, basar → "TASLAK SİLİNSİN Mİ?"
      → tereddüt → HAYIR.
   3) Ekranda talimat belirir: "MESAJI GÖNDERMEK İÇİN GÖNDER'E BAS"
      — GÖNDER'e OYUNCU basar (ihbarı oyuncu yollar).
   4) Basar basmaz: kapkara ekranda OYUN İSMİ parlar
      → yavaş fade-out → "Birkaç gün sonra." → oyun.
   ============================================================ */

const PREFILLED =
"Beni tanımıyorsunuz. Hızlı yazmak zorundayım — ağı izliyor olabilirler.\n\nPERISHED'da gece vardiya amiriyim. Karadeniz'de, hiçbir haritada olmayan bir araştırma istasyonu. Burada korkunç şeyler oluyor ve gördüklerimin yarısına kendim de inanmıyorum.\n\nMürettebat uykusunda sayı sayıyor. Hepsi. Aynı sayıları. İstasyon şefi buna 'aile düzeni' diyor. Revir kayıtları saklanıyor, denetim taleplerim";

const TYPED_END =
" cevapsız kalıyor.\n\nK-2 ambarında bir şey tutuyorlar. Kazıdan çıkan bir şey. Adına 'Buluntu' diyorlar ve ona dua eder gibi bakıyorlar.\n\nBu mail size ulaşırsa: buraya kimseyi tek başına göndermeyin. Ve gece üçten sonra telsiz bandını taramayın.\n\n— Baturay Soylu, gece vardiya amiri";

const ui = "Tahoma, 'Segoe UI', Arial, sans-serif";
const W = {
  backdrop: {
    position: "fixed", inset: 0, zIndex: 5,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 0, overflow: "hidden",
    backgroundColor: "#130d0b",
    backgroundImage: [
      "radial-gradient(circle at 82% 58%, rgba(255,221,151,0.82) 0 4%, rgba(214,111,55,0.42) 5%, transparent 17%)",
      "linear-gradient(180deg, rgba(80,45,43,0.95) 0%, rgba(143,82,49,0.92) 45%, rgba(31,20,14,0.96) 78%, #050403 100%)",
    ].join(", "),
    backgroundSize: "cover", backgroundPosition: "center",
  },
  win: {
    position: "relative",
    width: "min(78vw, 860px)",
    minWidth: "min(94vw, 320px)",
    maxHeight: "92vh",
    display: "flex", flexDirection: "column",
    backgroundColor: "#d7dce7", border: "2px solid #5a708c",
    boxShadow: "0 18px 70px rgba(0,0,0,0.82), inset 0 1px 0 rgba(255,255,255,0.75)",
    fontFamily: ui, overflow: "hidden",
  },
  titleBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "3px 6px", fontSize: 10, color: "#e8e6de",
    background: "linear-gradient(#8ca5c4, #526b8b)", flexShrink: 0,
  },
  winBtns: { display: "flex", gap: 3 },
  winBtn: { width: 15, height: 12, textAlign: "center", lineHeight: "11px", fontSize: 8, backgroundColor: "#c8c4b8", color: "#3a3a34", border: "1px solid #6a675c" },
  menuRow: { display: "flex", gap: 11, padding: "2px 8px", fontSize: 9, color: "#26384f", borderBottom: "1px solid #9aabc0", backgroundColor: "#edf3fb", flexShrink: 0 },
  urlRow: { display: "flex", alignItems: "center", gap: 6, padding: "3px 8px", borderBottom: "1px solid #9aabc0", backgroundColor: "#e2eaf5", flexShrink: 0 },
  urlBox: {
    flex: 1, fontSize: 9, color: "#26384f", backgroundColor: "#fbfdff",
    border: "1px solid #91a5bf", padding: "2px 7px",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    display: "flex", alignItems: "center", gap: 5,
  },
  bandRow: {
    display: "flex", alignItems: "center", gap: 8, padding: "7px 12px",
    background: "linear-gradient(#3e5879, #263f5d)", color: "#eef2f6",
    fontSize: 13, letterSpacing: "0.12em", fontWeight: 700, flexShrink: 0,
  },
  toolRow: { display: "flex", gap: 16, padding: "5px 12px", fontSize: 9.5, color: "#26384f", borderBottom: "1px solid #9aabc0", backgroundColor: "#e7eef8", flexShrink: 0 },
  bodyWrap: { display: "flex", alignItems: "stretch", backgroundColor: "#d7dce7", flex: 1, minHeight: 0 },
  attach: {
    width: "22%", minWidth: 78, flexShrink: 0, borderRight: "1px solid #b0ac9f",
    backgroundColor: "#d8e2f0", padding: "6px 7px", fontSize: 9, color: "#465b75",
  },
  attachTitle: { borderBottom: "1px solid #b0ac9f", paddingBottom: 4, marginBottom: 6, fontSize: 9.5, color: "#3a382f" },
  rightCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  field: { display: "flex", gap: 8, alignItems: "baseline", padding: "3px 10px", fontSize: 10, color: "#2e2c26", flexShrink: 0 },
  fieldLabel: { width: 44, flexShrink: 0, color: "#6a675c", fontSize: 9 },
  fieldVal: { flex: 1, borderBottom: "1px solid #bdbaad", paddingBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  subLinks: { display: "flex", gap: 8, padding: "1px 10px 3px 62px", fontSize: 8, color: "#4a6a9a", flexShrink: 0 },
  page: {
    margin: "6px 10px", backgroundColor: "#ffffff",
    border: "1px solid #9aabc0", flex: 1, minHeight: 0, overflowY: "auto",
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

function SinirTitleCard({ leaving }) {
  return (
    <div className={leaving ? "s1-fadeout" : "s1-fadein"} style={{
      position: "absolute", inset: 0,
      overflow: "hidden",
      backgroundColor: "#000",
      animationDuration: leaving ? "2600ms" : "1400ms",
    }}>
      <img
        src="/intro-title-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          opacity: 0.86,
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(circle at 14% 18%, rgba(205,215,225,0.16), transparent 5%)",
          "radial-gradient(circle at 72% 16%, rgba(205,215,225,0.11), transparent 6%)",
          "radial-gradient(circle at 82% 66%, rgba(170,195,205,0.16), transparent 8%)",
          "radial-gradient(circle at 38% 66%, rgba(205,215,225,0.1), transparent 6%)",
          "linear-gradient(120deg, transparent 0 38%, rgba(220,230,245,0.05) 39%, transparent 43%)",
          "linear-gradient(63deg, transparent 0 57%, rgba(220,230,245,0.04) 58%, transparent 62%)",
          "linear-gradient(90deg, rgba(0,0,0,0.58), transparent 18%, transparent 82%, rgba(0,0,0,0.68))",
        ].join(", "),
        filter: "blur(1.4px)",
        opacity: 0.98,
      }} />
      <div style={{
        position: "absolute", left: "9%", top: "18%",
        width: "18vw", maxWidth: 220, aspectRatio: "1",
        border: "1px solid rgba(220,230,245,0.14)",
        transform: "rotate(21deg)",
        boxShadow: "0 0 26px rgba(190,210,225,0.08)",
      }} />
      <div style={{
        position: "absolute", right: "12%", bottom: "17%",
        width: "24vw", maxWidth: 280, height: 1,
        background: "rgba(220,230,245,0.2)",
        boxShadow: "0 0 30px rgba(220,230,245,0.18)",
        transform: "rotate(-13deg)",
      }} />
      <div style={{
        position: "absolute", right: "19%", top: "24%",
        width: 92, height: 92,
        borderRadius: "50%",
        border: "1px dashed rgba(220,230,245,0.16)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-radial-gradient(circle at 45% 45%, rgba(215,225,235,0.12) 0 1px, transparent 1px 8px)",
        opacity: 0.18,
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "absolute", left: "50%", top: "38%",
        width: 88, height: 122, transform: "translate(-50%, -50%)",
        opacity: 0.62,
        filter: "drop-shadow(0 0 9px rgba(210,225,245,0.5))",
      }}>
        <svg viewBox="0 0 90 130" style={{ width: "100%", height: "100%" }}>
          <path d="M45 8 L45 118 M25 80 L65 80 M31 72 L59 72 M36 64 L54 64" stroke="#dfe8f4" strokeWidth="3" strokeLinecap="round" opacity="0.82" />
          <path d="M45 14 C36 28 42 38 35 52 C49 45 42 28 55 17" fill="none" stroke="#dfe8f4" strokeWidth="2" opacity="0.55" />
          <path d="M20 90 C32 82 58 82 70 90 M24 98 C38 92 52 92 66 98" fill="none" stroke="#dfe8f4" strokeWidth="2" opacity="0.7" />
          <path d="M45 8 L45 118" stroke="#dfe8f4" strokeWidth="1" strokeDasharray="2 4" opacity="0.9" />
        </svg>
      </div>
      <div style={{
        position: "absolute", left: "6%", right: "6%", top: "47%",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "clamp(14px, 3.8vw, 54px)",
        color: "rgba(232,242,248,0.94)",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "clamp(30px, 5.5vw, 72px)",
        fontWeight: 900,
        letterSpacing: "0.24em",
        textShadow: "0 0 18px rgba(220,232,248,0.68), 0 0 3px rgba(255,255,255,0.84)",
        filter: "blur(0.05px)",
      }}>
        {["P", "E", "R", "I", "S", "H", "E", "D"].map((ch, i) => (
          <span key={i} style={{
            transform: i === 4 ? "translateY(-5px) scaleY(1.16)" : "none",
            opacity: 1,
          }}>{ch}</span>
        ))}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.36) 72%, rgba(0,0,0,0.82))",
      }} />
    </div>
  );
}

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

  useEffect(() => {
    if (pageRef.current) pageRef.current.scrollTop = pageRef.current.scrollHeight;
  }, [body]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onFinish();
  };

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
      setTimeout(() => { if (!doneRef.current) { setPh("title"); AudioSys.boom(); } }, 900);
      setTimeout(() => { if (!doneRef.current) setPh("titleout"); }, 7200);
      setTimeout(() => { if (!doneRef.current) setPh("card"); }, 10100);
      setTimeout(() => { if (!doneRef.current) finish(); }, 13400);
    }, 1300);
  };

  useEffect(() => {
    aliveRef.current = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const alive = () => aliveRef.current && !doneRef.current;

    // Harf harf ve noktalama duraksamalı gerçekçi yazım fonksiyonu
    const typeText = async (text) => {
      let i = 0;
      while (i < text.length) {
        if (!alive()) return;
        
        const currentChar = text[i];
        setBody((b) => b + currentChar);
        
        // Klavye ses taklidi
        if (i % 2 === 0) AudioSys.blipSfx(180);
        
        i += 1;

        // Gerçekçi klavye duraksama dinamikleri
        if (currentChar === "\n") {
          await sleep(400); // Alt satıra geçerken düşünme süresi
        } else if (currentChar === "." || currentChar === ":" || currentChar === "—") {
          await sleep(550); // Cümle sonlarında derin duraksama
        } else if (currentChar === ",") {
          await sleep(250); // Virgüllerde kısa nefes alma
        } else {
          // Normal harfler arası stabil ve sinematik tempo (70ms - 110ms arası)
          await sleep(70 + Math.random() * 40);
        }
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
      await sleep(1800);
      // 1) Metnin kalanı gözümüzün önünde yavaşça yazılır
      await typeText(TYPED_END);
      if (!alive()) return;
      await sleep(2500); // Yazılan metne bakarak duraksama süresi
      
      // 2) İmleç uyanır ve SİL (Vazgeç) butonuna gider
      await moveTo(silRef, 1100);
      await click("sil");
      if (!alive()) return;
      AudioSys.buzzSfx();
      setDialog(true);
      await sleep(1200);
      
      // 3) Tereddüt anı: İmleç EVET'in üzerine gider, bekler ama basamaz...
      await moveTo(evetRef, 900);
      await sleep(2200);
      
      // Vazgeçip HAYIR'a kayar
      await moveTo(hayirRef, 800);
      await click("hayir");
      if (!alive()) return;
      setDialog(false);
      setCursor((c) => ({ ...c, visible: false }));
      await sleep(900);
      
      // 4) Kontrol oyuncuya devredilir: GÖNDER talimatı çıkar
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
        <SinirTitleCard leaving={phase === "titleout"} />
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
      <div style={{
        position: "absolute", left: "4%", bottom: "20%",
        width: "20%", height: "24%",
        borderLeft: "2px solid rgba(6,5,4,0.9)",
        borderBottom: "2px solid rgba(6,5,4,0.9)",
        transform: "skewX(-8deg)",
        opacity: 0.64,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.64) 100%)",
          "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.62) 78%, rgba(0,0,0,0.86))",
        ].join(", "),
        pointerEvents: "none",
      }} />
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
              <span style={W.fieldVal}>İHBAR / PERISHED Araştırma İstasyonu'nda Yasadışı Faaliyet</span>
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
