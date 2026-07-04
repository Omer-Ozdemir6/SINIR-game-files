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
" cevapsız kalıyor.\n\nK-2 ambarında bir şey tutuyorlar. Kazıdan çıkan bir şey. Adına 'Buluntu' diyorlar ve ona dua eder gibi bakıyorlar.\n\nBu mail size ulaşırsa: buraya kimseyi tek başına göndermeyin. Ve gece üçten sonra telsiz bandını taramayın.\n\n— B.S.";

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
    <div ref={rootRef} style={S.introRoot} className={phase === "sent" && status === "GÖNDERİLDİ ✓" ? "s1-fadeout" : "s1-fadein"}>
      <div style={S.mailWindow}>
        <div style={S.mailTitle}>
          <span>SINIR-1 · GÜVENLİ POSTA UÇBİRİMİ</span>
          <span>ŞİFRELİ HAT</span>
        </div>
        <div style={S.mailField}>
          <span style={S.mailFieldLabel}>KİME:</span>
          <span>t.ergin — derin deniz muhabiri (yüzey)</span>
        </div>
        <div style={S.mailField}>
          <span style={S.mailFieldLabel}>KONU:</span>
          <span>İHBAR / SINIR-1 Araştırma İstasyonu</span>
        </div>
        <div style={S.mailBody}>
          {body}
          <span className="s1-cursor" style={S.mailCursor}>▌</span>
        </div>
        <div style={{
          ...S.mailStatus,
          ...(phase === "waitSend" ? { color: "#d8c27a", textShadow: "0 0 10px rgba(215,190,110,0.4)" } : {}),
        }} className={phase === "waitSend" ? "s1-critical" : ""}>
          {status}
        </div>
        <div style={S.mailButtons}>
          <div ref={silRef}
            style={{ ...S.mailBtn, borderColor: "#4a2620", color: "#c0776a", ...(pressed === "sil" ? S.mailBtnActive : {}) }}>
            SİL
          </div>
          <div ref={gonderRef}
            onClick={playerSend}
            style={{
              ...S.mailBtn,
              ...(pressed === "gonder" ? S.mailBtnActive : {}),
              ...(phase === "waitSend"
                ? { cursor: "pointer", borderColor: "#7fae86", color: "#aee0c0", boxShadow: "0 0 14px rgba(120,200,150,0.25)" }
                : {}),
            }}>
            GÖNDER
          </div>
        </div>

        {dialog && (
          <div style={S.mailDialog}>
            <div style={S.mailDialogText}>TASLAK SİLİNSİN Mİ?</div>
            <div style={S.mailDialogRow}>
              <div ref={evetRef} style={{ ...S.mailBtn, borderColor: "#4a2620", color: "#c0776a" }}>EVET</div>
              <div ref={hayirRef} style={{ ...S.mailBtn, ...(pressed === "hayir" ? S.mailBtnActive : {}) }}>HAYIR</div>
            </div>
          </div>
        )}
      </div>

      {cursor.visible && (
        <div style={{
          position: "absolute", left: cursor.x, top: cursor.y, zIndex: 6, pointerEvents: "none",
          width: 0, height: 0,
          borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
          borderBottom: "18px solid #e8e4d8",
          transform: "rotate(-38deg)",
          filter: "drop-shadow(0 0 3px rgba(0,0,0,0.9))",
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
