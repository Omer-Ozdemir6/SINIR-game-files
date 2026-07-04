import { useState, useEffect, useRef } from "react";
import { styles as S } from "../styles/theme";
import { AudioSys } from "../audio/AudioSys";

/* ============================================================
   AÇILIŞ SİNEMATİĞİ — "BATURAY'IN MAİLİ"
   Uyarı ekranı söndükten sonra otomatik oynar:
   1) Kurumsal posta terminali belirir (fade in)
   2) Baturay GERÇEĞİ yazar... durur... hepsini siler
   3) Evcil bir "denetim talebi" yazar
   4) İmleç SİL'e gider → "TASLAK SİLİNSİN Mİ?" → HAYIR
   5) İmleç GÖNDER'e gider → GÖNDERİLDİ — YANIT BEKLENİYOR
   6) Ekran kararır → "BİRKAÇ GÜN SONRA" → oyun başlar
   Her an sağ alttan GEÇ ile atlanabilir.
   ============================================================ */

// Yazılıp SİLİNECEK gerçek:
const TXT_GERCEK =
  "Mürettebat geceleri uykusunda sayı sayıyor. Hepsi aynı yerden başlıyor. " +
  "Şef Tekin iki haftadır uyumuyor ve bize 'aile' diyor. " +
  "K-2'deki buluntuyu gören herkes";

// Gönderilecek evcil sürüm:
const TXT_EVCIL =
  "Sayın yetkili,\n\n" +
  "K-6 bakım biriminde rutin dışı durumlar gözlemlemekteyim. " +
  "Personel sağlığı açısından acil denetim talep ediyorum. " +
  "Ayrıntılı kayıtlar ektedir.\n\n" +
  "Saygılarımla,\nB. Soylu — Gece Vardiya Amiri";

const KONU = "K-6 — DENETİM TALEBİ (İVEDİ)";

export default function IntroCinematic({ onFinish }) {
  const [rootOpacity, setRootOpacity] = useState(0);
  const [konu, setKonu] = useState("");
  const [body, setBody] = useState("");
  const [caret, setCaret] = useState(true);
  const [status, setStatus] = useState("");
  const [cursor, setCursor] = useState({ left: "50%", top: "110%", visible: false });
  const [pressed, setPressed] = useState(null); // "sil" | "hayir" | "gonder"
  const [dialog, setDialog] = useState(false);
  const [black, setBlack] = useState({ show: false, opacity: 0, text: false });
  const [showSkip, setShowSkip] = useState(false);

  const cancelledRef = useRef(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    cancelledRef.current = true;
    onFinish();
  };

  useEffect(() => {
    let alive = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const guard = () => !alive || cancelledRef.current;

    // karakter karakter yaz (ara sıra tuş tıkırtısı)
    const typeText = async (text, setFn, base, speed) => {
      for (let i = 1; i <= text.length; i++) {
        if (guard()) return;
        setFn(base + text.slice(0, i));
        if (i % 4 === 0) AudioSys.blipSfx(190);
        // insani duraksamalar
        const c = text[i - 1];
        await sleep(c === "\n" ? 260 : c === "." || c === "," ? 140 : speed + Math.random() * 30);
      }
    };
    // geriye doğru sil
    const deleteText = async (getLen, setFn, base, text) => {
      for (let i = text.length - 1; i >= 0; i--) {
        if (guard()) return;
        setFn(base + text.slice(0, i));
        if (i % 3 === 0) AudioSys.blipSfx(150);
        await sleep(14);
      }
    };
    const moveCursor = async (left, top, ms = 800) => {
      setCursor({ left, top, visible: true });
      await sleep(ms + 150);
    };
    const press = async (key) => {
      AudioSys.blipSfx(340);
      setPressed(key);
      await sleep(230);
      setPressed(null);
    };

    (async () => {
      await sleep(150);
      if (guard()) return;
      setRootOpacity(1);                      // fade in
      setTimeout(() => setShowSkip(true), 2200);
      await sleep(1600);

      // konu satırı
      await typeText(KONU, setKonu, "", 42);
      await sleep(700);

      // 1) GERÇEK yazılır...
      await typeText(TXT_GERCEK, setBody, "", 46);
      if (guard()) return;
      await sleep(1500);                      // ...durur. Okur. Korkar.
      // 2) ...ve hepsi silinir.
      await deleteText(null, setBody, "", TXT_GERCEK);
      if (guard()) return;
      await sleep(900);

      // 3) evcil sürüm
      await typeText(TXT_EVCIL, setBody, "", 34);
      if (guard()) return;
      await sleep(1200);

      // 4) imleç SİL'e süzülür
      await moveCursor("13%", "88%", 900);
      if (guard()) return;
      await press("sil");
      setDialog(true);
      AudioSys.buzzSfx();
      await sleep(900);
      // ...HAYIR
      await moveCursor("62%", "46%", 700);
      if (guard()) return;
      await sleep(600);                       // tereddüt
      await press("hayir");
      setDialog(false);
      await sleep(700);

      // 5) GÖNDER
      await moveCursor("78%", "88%", 900);
      if (guard()) return;
      await press("gonder");
      setCursor((c) => ({ ...c, visible: false }));
      setCaret(false);
      setStatus("GÖNDERİLİYOR…");
      AudioSys.blipSfx(520);
      await sleep(1400);
      if (guard()) return;
      setStatus("GÖNDERİLDİ — YANIT BEKLENİYOR");
      AudioSys.blipSfx(720);
      await sleep(2000);

      // 6) karartma + "BİRKAÇ GÜN SONRA"
      setBlack({ show: true, opacity: 0, text: false });
      await sleep(60);
      setBlack({ show: true, opacity: 1, text: false });
      await sleep(1500);
      if (guard()) return;
      setBlack({ show: true, opacity: 1, text: true });
      await sleep(2600);
      if (guard()) return;
      setBlack({ show: true, opacity: 1, text: false });
      await sleep(1000);
      finish();
    })();

    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ ...S.introRoot, opacity: rootOpacity }}>
      <div style={S.mailWindow}>
        <div style={S.mailTitle}>SINIR-1 KURUMSAL POSTA — TERMİNAL 6/2</div>
        <div style={S.mailField}>
          <span style={S.mailFieldLabel}>KİMDEN</span>
          <span>b.soylu@sinir1.iç</span>
        </div>
        <div style={S.mailField}>
          <span style={S.mailFieldLabel}>KİME</span>
          <span>denetim@yuzey-operasyon</span>
        </div>
        <div style={S.mailField}>
          <span style={S.mailFieldLabel}>KONU</span>
          <span>{konu}{konu.length < KONU.length && caret ? <span className="s1-cursor">▌</span> : null}</span>
        </div>
        <div style={S.mailBody}>
          {body}
          {konu.length >= KONU.length && caret ? <span className="s1-cursor">▌</span> : null}
        </div>
        <div style={S.mailStatus}>{status}</div>
        <div style={S.mailButtons}>
          <span style={{ ...S.mailBtn, ...(pressed === "sil" ? S.mailBtnActive : null) }}>SİL</span>
          <span style={S.mailBtn}>TASLAK</span>
          <span style={{ ...S.mailBtn, ...(pressed === "gonder" ? S.mailBtnActive : null) }}>GÖNDER</span>
        </div>

        {dialog && (
          <div style={S.mailDialog}>
            <div style={S.mailDialogText}>TASLAK SİLİNSİN Mİ?</div>
            <div style={S.mailDialogRow}>
              <span style={S.mailBtn}>EVET</span>
              <span style={{ ...S.mailBtn, ...(pressed === "hayir" ? S.mailBtnActive : null) }}>HAYIR</span>
            </div>
          </div>
        )}

        {cursor.visible && (
          <div style={{ ...S.mailCursor, left: cursor.left, top: cursor.top }} />
        )}
      </div>

      {black.show && (
        <div style={{ ...S.introBlack, opacity: black.opacity }}>
          <span style={{ ...S.introBlackText, opacity: black.text ? 1 : 0 }}>
            BİRKAÇ GÜN SONRA
          </span>
        </div>
      )}

      {showSkip && !doneRef.current && (
        <button className="s1-btn" style={S.introSkip} onClick={finish}>GEÇ ▸</button>
      )}
    </div>
  );
}
