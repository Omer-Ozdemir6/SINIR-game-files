import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   SINIR-1 v5 — Metin Tabanlı Korku Prototipi
   YENİ: BULMACA & MİNİ OYUN SİSTEMİ
   · FLAG SİSTEMİ — kalıcı dünya durumu (pompalar, aramalar)
   · HUB KEŞFİ — platformda gezinip pompaları aktif et,
     ana panelde durumu gör; hepsi açılınca ana buton açılır
   · TUŞ PANELİ — kod iki parça: dökümanda "21▮▮",
     Pompa C'de kazınmış "…47" → panele girilir
   · RADYO — frekansı ayarla, sinyal kilitlensin…
     ve tam o anda hat kopsun (senaryolu kayıp)
   ============================================================ */

const STORY = {
  start: "n_uyanis",
  nodes: {
    /* ---------- BÖLÜM 1: ODA ---------- */
    n_uyanis: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-6 MAKİNE DAİRESİ — YEREL SAAT 03:47" },
        { type: "objective", text: "Hayatta kal." },
        { type: "pause", ms: 600 },
        { type: "narrate", text: "Soğuk metal zeminde gözlerini açıyorsun. Etraf zifiri karanlık; yalnızca ileride, kapının altındaki aralıktan sızan soluk bir ışık var." },
        { type: "pause", ms: 700 },
        { type: "ambient", text: "Gövdenin derinliklerinden boğuk bir metal iniltisi geliyor." },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Doğrulmaya çalışırken kapının kolu zorlanıyor. Bir kez. İki kez." },
      ],
      choices: [
        { id: "saklan", text: "Masanın altına gir ve saklan", next: "n_saklan" },
        { id: "kapi", text: "Kapıyı tutmaya çalış", next: "n_olum_kapi" },
        { id: "kal", text: "Olduğun yerde kal, nefesini tut", next: "n_hareketsiz" },
      ],
    },

    n_olum_kapi: {
      death: true, cost: 0,
      deathText: "Son duyduğun şey, kendi kalp atışın değildi.",
      events: [
        { type: "narrate", text: "Karanlıkta kapıya atılıyorsun, omzunu metale dayıyorsun. Kol bir kez daha dönüyor — sonra kapı karar veriyor, sen değil." },
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Menteşeler sökülüyor. Üzerine eğilen şeyin yüzü yok; yalnızca su damlıyor." },
      ],
    },

    n_saklan: {
      cost: 3,
      events: [
        { type: "narrate", text: "Masanın altına giriyorsun ve fenerini kapatıyorsun. Kapı açılıyor. Islak, ağır adımlar odada dolanıyor; nefesi, dolu bir borunun gurultusuna benziyor." },
        { type: "glitch", ms: 400 },
        { type: "pause", ms: 900 },
        { type: "narrate", text: "Adımlar duruyor. Bir an — sonsuz bir an — sonra uzaklaşıyor. Kapı açık kalıyor." },
      ],
      choices: [{ id: "cik", text: "Masanın altından çık", next: "n_tablet" }],
    },

    n_hareketsiz: {
      cost: 3,
      events: [
        { type: "narrate", text: "Kımıldamıyorsun. Kol, kırılan bir eklem sesiyle dönüyor ve kapı açılıyor. İçeri giren şey seni görmüyor — ama dirseğin, yerdeki boş yağ tenekesine değiyor." },
        { type: "stat", stat: "gurultu", delta: 20, note: "GÜRÜLTÜ SEVİYESİ ARTTI" },
        { type: "glitch", ms: 600 },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Şey duruyor. Sana doğru bir adım... sonra yukarıdan gelen boğuk bir alarmla başını kaldırıyor ve çıkıyor." },
      ],
      choices: [{ id: "kalk", text: "Ayağa kalk", next: "n_tablet" }],
    },

    n_tablet: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Masanın üzerinde bakım tabletin duruyor — ekranı çatlak ama çalışıyor. Bu tesiste kalan tek ışığın." },
        { type: "note", id: "nt_sey", title: "İçeri Giren Şey", text: "Ne olduğunu görmedim. Görmek istemedim. Ama yürüyüşü... bir insanın yürüyüşüydü. Unutmuş bir insanın." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Tabletin ekranında bir mesaj beliriyor:" },
        { type: "system", text: "\"K-6'DAN ÇIK. HAVALANDIRMAYI KULLAN. KAPIYI KULLANMA. — E.\"" },
        { type: "objective", text: "Havalandırmadan üst platforma çık." },
      ],
      choices: [
        { id: "ara", text: "Odayı ara — pil ve malzeme olabilir", next: "n_arama", if: { flag: "odaArandi", equals: false } },
        { id: "menfez", text: "Havalandırma menfezini sök", next: "n_menfez" },
      ],
    },

    n_arama: {
      cost: 5,
      events: [
        { type: "flag", set: { odaArandi: true } },
        { type: "narrate", text: "Dolapları açıyorsun. Birinin iç yüzeyinde içeriden açılmış tırnak izleri var. Üçüncüsünde bir bakım çantası: yedek güç hücresi." },
        { type: "battery", spares: 1 },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Çantanın altında dörde katlanmış ıslak bir tutanak. Cebine koyuyorsun." },
        {
          type: "document",
          doc: {
            id: "d_isg",
            title: "İSG İhlal Tutanağı — K-2 Ambarı",
            meta: "SINIR-1 İDARİ KAYIT · VARDİYA 214-G",
            body: "SINIR-1 ARAŞTIRMA TESİSİ\nİSG İHLAL TUTANAĞI · KAYIT NO: 214-G/077\n\nİlgili: K-2 Arkeoloji Ambarı, Konteyner 7.\n\nKonteyner 7'nin mühürleri, karantina protokolü (Md. 12/3) tamamlanmadan İstasyon Şefi'nin sözlü talimatıyla açılmıştır. İtirazım tutanağa geçirilmemiştir.\n\nNumunenin korunma durumu, gömülme yaşıyla (tahminî 7.400 yıl) uyumlu DEĞİLDİR.\n\nİmza: [okunmuyor]\nOnay: H. TEKİN — \"Gereği yok. Arşivle.\"",
          },
        },
        { type: "note", id: "nt_konteyner", title: "Konteyner 7", text: "Karantina bitmeden açmışlar. Şef'in el yazısını tanıyorum — 'Gereği yok.' İki hafta önce her şey normaldi. Değil miydi?" },
      ],
      choices: [{ id: "geri", text: "Havalandırma menfezini sök", next: "n_menfez" }],
    },

    n_menfez: {
      checkpoint: true, cost: 3,
      events: [
        { type: "narrate", text: "Izgarayı söküp dar kanala giriyorsun. Soğuk hava akımını takip ederek yukarı tırmanıyorsun — ve kendini K-6 üst platformunda buluyorsun." },
      ],
      choices: [{ id: "plat", text: "Platforma çık", next: "n_platform" }],
    },

    /* ---------- BÖLÜM 2: PLATFORM HUB — POMPA BULMACASI ---------- */
    n_platform: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Geniş bir bakım platformu. Karşıda üç ana su pompası karanlıkta duruyor; hepsinin uyarı lambası sönük. Ortada ana kontrol paneli, sağ dipte ağır bir kapı: RADYO ODASI.", if: { flag: "platformGoruldu", equals: false } },
        { type: "objective", text: "Ana su hattını çalıştır — 3 pompayı aktif et.", if: { flag: "platformGoruldu", equals: false } },
        { type: "narrate", text: "Platformdasın. Pompaların gölgeleri karanlıkta bekliyor.", if: { flag: "platformGoruldu", equals: true } },
        { type: "flag", set: { platformGoruldu: true } },
      ],
      choices: [
        { id: "pa", text: "POMPA A'ya git — vanayı aç", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "POMPA B'ye git — şalteri kaldır", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "pc", text: "POMPA C'ye git — sigortayı tak", next: "n_pompaC", if: { flag: "pompaC", equals: false } },
        { id: "panel", text: "Ana kontrol paneline git", next: "n_anapanel" },
        { id: "ara", text: "Platformu ara", next: "n_platform_ara", if: { flag: "platformArandi", equals: false } },
        { id: "radyokapi", text: "Radyo odası kapısına git (kod paneli)", next: "n_kapipanel", if: { flag: "gucAcik", equals: true } },
      ],
    },

    n_pompaA: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa A'nın vanası paslanmış. Bütün ağırlığını verip çeviriyorsun; metal iniltiyle dönüyor ve pompanın üzerindeki lamba yeşile dönüyor." },
        { type: "flag", set: { pompaA: true } },
        { type: "system", text: "POMPA A: AKTİF ▮" },
        { type: "ambient", text: "Boruların içinde bir şey harekete geçiyor. Umarım sadece su." },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_pompaB: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa B'nin şalter kutusuna uzanırken tabletin ışığı titreşiyor. Kutunun yanındaki duvarda, ıslak bir el izi var. Senin elinden büyük." },
        { type: "glitch", ms: 500 },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Şalteri kaldırıyorsun. Pompa öksürerek çalışıyor; lamba yeşil." },
        { type: "flag", set: { pompaB: true } },
        { type: "system", text: "POMPA B: AKTİF ▮" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_pompaC: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa C en dipte, en karanlıkta. Sigorta yuvası boş — ama yuvanın hemen yanında yedek sigorta asılı duruyor. Birisi buraya gelmiş ve takmadan gitmiş." },
        { type: "pause", ms: 600 },
        { type: "narrate", text: "Sigortayı yuvaya iterken gözün kapının çelik yüzeyine kazınmış yazıya takılıyor:" },
        { type: "system", text: "KAZINMIŞ YAZI: \"…47. UNUTMA.\"" },
        { type: "note", id: "nt_47", title: "…47", text: "Birisi kapıya '…47' kazımış. Bir kodun sonu gibi. Neyin kodu? Ve neden 'unutma'?" },
        { type: "glitch", ms: 700 },
        { type: "narrate", text: "Sigorta oturuyor — ve aynı anda, platformun öteki ucunda bir şey metale çarpıyor. Sesi duydu." },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "sok", text: "Pompanın arkasına sin ve bekle", next: "n_pompaC_sakla" },
        { id: "kos", text: "Panele doğru koş", next: "n_olum_platform", default: true },
      ],
    },

    n_pompaC_sakla: {
      cost: 2,
      events: [
        { type: "narrate", text: "Pompanın gövdesine yapışıyorsun. Islak adımlar platformu bir uçtan öbürüne tarıyor... sonra aşağı, merdivenlere doğru uzaklaşıyor." },
        { type: "flag", set: { pompaC: true } },
        { type: "system", text: "POMPA C: AKTİF ▮" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_olum_platform: {
      death: true, cost: 0,
      deathText: "Işığa doğru koşan her şey, karanlıkta bir hedef olur.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "Panelin ışığına doğru koşuyorsun. Ayak seslerin platformda davul gibi yankılanıyor — ve önündeki karanlık, bir anda katılaşıyor." },
      ],
    },

    n_platform_ara: {
      cost: 5,
      events: [
        { type: "flag", set: { platformArandi: true } },
        { type: "narrate", text: "Alet dolaplarını karıştırıyorsun. Birinde yedek güç hücresi — cebe." },
        { type: "battery", spares: 1 },
        { type: "pause", ms: 600 },
        { type: "narrate", text: "Panelin altındaki çekmecede laminasyonlu bir zimmet formu. Nem, kâğıdın yarısını yemiş." },
        {
          type: "document",
          doc: {
            id: "d_kod",
            title: "Erişim Kodları Zimmet Formu",
            meta: "SINIR-1 GÜVENLİK · SINIFLANDIRILMIŞ",
            body: "SINIR-1 ERİŞİM KODLARI — VARDİYA PERSONELİ\n\nK-6 MAKİNE DAİRESİ: 8830\nK-6 ÜST PLATFORM: 5512\nRADYO ODASI (K-6 ÜST): 21▮▮\n   [nem hasarı — son iki hane okunmuyor]\nK-5 YAŞAM DESTEK: ▮▮▮▮\n\nKodların paylaşılması disiplin suçudur.\nGÜVENLİK AMİRİ: D. OKUR",
          },
        },
        { type: "note", id: "nt_kod", title: "Yarım Kod", text: "Radyo odası: 21-bilmemne. Formun gerisini nem yemiş. Bu tesiste birisi bir yere kodun devamını yazmış olmalı. Herkes unutur. Teknisyenler bilir." },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ana kontrol paneli. Çatlak ekranda pompa hattının şeması titreşiyor." },
        { type: "status", items: [
          { label: "POMPA A", flag: "pompaA" },
          { label: "POMPA B", flag: "pompaB" },
          { label: "POMPA C", flag: "pompaC" },
        ] },
      ],
      choices: [
        {
          id: "baslat", text: "ANA HATTI BAŞLAT",
          next: "n_guc",
          requireFlags: ["pompaA", "pompaB", "pompaC"],
          lockText: "ANA HATTI BAŞLAT — pompalar eksik",
        },
        { id: "d", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_guc: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Ana şalteri indiriyorsun. Bir saniyelik sessizlik — sonra üç pompa aynı anda gürlüyor ve platformun acil aydınlatması kesik kesik canlanıyor." },
        { type: "flag", set: { gucAcik: true } },
        { type: "system", text: "ANA SU HATTI: ÇEVRİMİÇİ — KISMİ GÜÇ SAĞLANDI" },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Radyo odasının kapı paneli yeşil bir ışıkla uyanıyor. Kod istiyor." },
        { type: "objective", text: "Radyo odasına gir — kapı kodunu bul." },
        { type: "ambient", text: "Ve pompaların gürültüsü... artık nerede olduğunu herkes biliyor." },
        { type: "stat", stat: "gurultu", delta: 25, note: "GÜRÜLTÜ SEVİYESİ ARTTI" },
      ],
      choices: [
        { id: "kapi", text: "Radyo odası kapısına git (kod paneli)", next: "n_kapipanel" },
        { id: "d", text: "Platforma dön", next: "n_platform" },
      ],
    },

    /* ---------- BÖLÜM 3: TUŞ PANELİ ---------- */
    n_kapipanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kod paneli soluk yeşil ışıkla bekliyor. Dört hane." },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_radyo", cancel: "n_platform" },
    },

    /* ---------- BÖLÜM 4: RADYO ODASI ---------- */
    n_radyo: {
      checkpoint: true, cost: 2,
      events: [
        { type: "system", text: "KAPI AÇILDI — RADYO ODASI" },
        { type: "narrate", text: "Dar bir oda; duvar boyunca eski telsiz konsolu uzanıyor. Kısmi güç sayesinde cihaz uyanık — kadran, statik bir uğultuyla nefes alıyor." },
        { type: "note", id: "nt_radyo", title: "Radyo Odası", text: "Yüzeye sinyal gönderebilirsem sahil güvenlik duyar. 432 civarı acil durum bandı olmalı. Ellerim titriyor. Bu işe yarayacak. Yaramak zorunda." },
        { type: "objective", text: "Frekansı acil durum bandına kilitle ve sinyal gönder." },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_kesinti" },
    },

    n_kesinti: {
      checkpoint: true, ending: true, cost: 0,
      events: [
        { type: "narrate", text: "Kulaklıkta bir kadın sesi: \"SINIR-1, sizi alıyoruz, tekrar ed—\"" },
        { type: "glitch", ms: 1100 },
        { type: "narrate", text: "Ses kesiliyor. Kadran ölüyor. Konsolun arkasından, duvarın içinden, kablonun KOPARILMA sesi geliyor. Birisi hattı kesti. Şu anda. Bu duvarın arkasında." },
        { type: "pause", ms: 900 },
        { type: "ambient", text: "İnce metal duvarın öbür yüzünde, bir tırnak yavaşça aşağı çekiliyor." },
        { type: "note", id: "nt_kesinti", title: "Hat Koptu", text: "Duydular beni. Yüzey duydu. Ve buradaki şey de duydu. Kabloyu kesti — düşünerek, bilerek. Bunlar hayvan değil. Hâlâ düşünüyorlar." },
        { type: "objective", text: "Radyo odasından çık. K-5'e ulaş. Yardım gelmiyor." },
        { type: "pause", ms: 800 },
        { type: "system", text: "PROTOTİP SONU — K-5: YAŞAM DESTEK yazılacak" },
      ],
    },
  },
};

const STAT_MAX = { gurultu: 100 };
const BATTERY_START = 42;
const SPARES_START = 0;
const INITIAL_FLAGS = {
  odaArandi: false, platformGoruldu: false, platformArandi: false,
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false,
};

const batteryColorOf = (lvl) => {
  if (lvl <= 20) return "#c23b2e";
  const t = Math.min(1, (lvl - 20) / 80);
  return "hsl(" + Math.round(10 + t * 100) + ", 42%, 46%)";
};

export default function Sinir1V5() {
  const [lines, setLines] = useState([]);
  const [stats, setStats] = useState({ gurultu: 0 });
  const [battery, setBattery] = useState(BATTERY_START);
  const [spares, setSpares] = useState(SPARES_START);
  const [flags, setFlags] = useState({ ...INITIAL_FLAGS });
  const [docs, setDocs] = useState([]);
  const [notes, setNotes] = useState([]);
  const [objective, setObjective] = useState("—");
  const [objectiveFlash, setObjectiveFlash] = useState(null);
  const [toast, setToast] = useState(null);
  const [glitching, setGlitching] = useState(false);
  const [dying, setDying] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [death, setDeath] = useState(null);
  const [ended, setEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [started, setStarted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [screen, setScreen] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [interaction, setInteraction] = useState(null);
  // keypad
  const [kpEntry, setKpEntry] = useState("");
  const [kpMsg, setKpMsg] = useState(null);
  const [kpFails, setKpFails] = useState(0);
  // radio
  const [radioFreq, setRadioFreq] = useState(425.0);
  const [radioPhase, setRadioPhase] = useState("tune"); // tune | lock | cut

  const runIdRef = useRef(0);
  const skipRef = useRef(false);
  const statsRef = useRef({ gurultu: 0 });
  const batteryRef = useRef(BATTERY_START);
  const sparesRef = useRef(SPARES_START);
  const flagsRef = useRef({ ...INITIAL_FLAGS });
  const docsRef = useRef([]);
  const notesRef = useRef([]);
  const objectiveRef = useRef("—");
  const checkpointRef = useRef(null);
  const timerRef = useRef(null);
  const flashRef = useRef(null);
  const toastRef = useRef(null);
  const timeoutsRef = useRef([]);
  const scrollRef = useRef(null);
  const clockRef = useRef(227);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimeLeft(null);
  };
  const clearPending = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (flashRef.current) { clearTimeout(flashRef.current); flashRef.current = null; }
    if (toastRef.current) { clearTimeout(toastRef.current); toastRef.current = null; }
  };
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timeoutsRef.current.push(t); };

  const fmtClock = () => {
    const m = clockRef.current;
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  };

  const wait = (ms, runId) =>
    new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        if (runIdRef.current !== runId) return resolve();
        if (skipRef.current || Date.now() - start >= ms) { skipRef.current = false; return resolve(); }
        later(check, 60);
      };
      check();
    });

  const hardWait = (ms) => new Promise((resolve) => later(resolve, ms));

  const typeLine = (kind, text, runId, speed = 26) =>
    new Promise((resolve) => {
      setLines((ls) => [...ls, { kind, text: "" }]);
      setTyping(true);
      let i = 0;
      const tick = () => {
        if (runIdRef.current !== runId) { setTyping(false); return resolve(); }
        if (skipRef.current) { i = text.length; skipRef.current = false; }
        else i++;
        const slice = text.slice(0, i);
        setLines((ls) => {
          const copy = ls.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: slice };
          return copy;
        });
        if (i >= text.length) { setTyping(false); resolve(); }
        else later(tick, speed);
      };
      tick();
    });

  const setBatteryBoth = (v) => { batteryRef.current = v; setBattery(v); };
  const setSparesBoth = (v) => { sparesRef.current = v; setSpares(v); };
  const setFlagsBoth = (updates) => {
    flagsRef.current = { ...flagsRef.current, ...updates };
    setFlags(flagsRef.current);
  };
  const flagOk = (cond) => {
    if (!cond) return true;
    const want = cond.equals !== undefined ? cond.equals : true;
    return !!flagsRef.current[cond.flag] === want;
  };

  const showObjective = (text) => {
    objectiveRef.current = text;
    setObjective(text);
    setObjectiveFlash({ text, key: Date.now() });
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setObjectiveFlash(null), 4200);
  };

  const showToast = (icon, text, color) => {
    setToast({ icon, text, color, key: Date.now() });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const glitchBurst = (ms) => {
    setGlitching(true);
    later(() => setGlitching(false), ms);
  };

  const runGlitch = async (ms) => {
    setGlitching(true);
    await hardWait(ms);
    setGlitching(false);
  };

  const playEvent = async (ev, runId) => {
    if (ev.if && !flagOk(ev.if)) return;
    switch (ev.type) {
      case "narrate": return typeLine("narrate", ev.text, runId, 26);
      case "ambient": return typeLine("ambient", ev.text, runId, 30);
      case "system": return typeLine("system", ev.text, runId, 12);
      case "pause": return wait(ev.ms || 800, runId);
      case "glitch": return runGlitch(ev.ms || 600);
      case "flag": { setFlagsBoth(ev.set); return; }
      case "status": {
        for (const item of ev.items) {
          const on = !!flagsRef.current[item.flag];
          await typeLine("system", item.label + ": " + (on ? "AKTİF ▮" : "DEVRE DIŞI ▯"), runId, 8);
          if (runIdRef.current !== runId) return;
        }
        return;
      }
      case "objective": { showObjective(ev.text); return wait(1800, runId); }
      case "stat": {
        const next = { ...statsRef.current };
        next[ev.stat] = Math.max(0, Math.min(STAT_MAX[ev.stat] || 100, (next[ev.stat] || 0) + ev.delta));
        statsRef.current = next;
        setStats(next);
        if (ev.note) return typeLine("alert", "⚠ " + ev.note, runId, 14);
        return;
      }
      case "battery": {
        if (ev.spares) {
          setSparesBoth(sparesRef.current + ev.spares);
          showToast("▲", "Yedek Pil +" + ev.spares, "#7fae86");
        }
        if (ev.delta) setBatteryBoth(Math.max(0, Math.min(100, batteryRef.current + ev.delta)));
        return wait(600, runId);
      }
      case "document": {
        if (!docsRef.current.find((d) => d.id === ev.doc.id)) {
          docsRef.current = [...docsRef.current, { ...ev.doc, read: false }];
          setDocs(docsRef.current);
        }
        showToast("▤", "Döküman Eklendi", "#d0b06a");
        return wait(600, runId);
      }
      case "note": {
        clockRef.current += 3 + Math.floor(Math.random() * 4);
        if (!notesRef.current.find((n) => n.id === ev.id)) {
          notesRef.current = [...notesRef.current, { id: ev.id, title: ev.title, text: ev.text, time: fmtClock(), read: false }];
          setNotes(notesRef.current);
        }
        showToast("✎", "Not Alındı", "#cbb794");
        return wait(600, runId);
      }
      default: return;
    }
  };

  const startTimer = (node) => {
    const total = node.timer.seconds;
    let left = total;
    setTimeLeft({ left, total });
    timerRef.current = setInterval(() => {
      left -= 0.1;
      if (left <= 0) {
        clearTimer();
        const avail = node.choices.filter((c) => flagOk(c.if));
        const def = avail.find((c) => c.default) || avail[avail.length - 1];
        handleChoice(def, true);
      } else {
        setTimeLeft({ left, total });
      }
    }, 100);
  };

  const die = (payload) => {
    setDying(true);
    later(() => setDeath(payload), 2000);
  };

  const playNode = useCallback(async (nodeId) => {
    const runId = ++runIdRef.current;
    const node = STORY.nodes[nodeId];
    if (!node) return;
    setCurrentNodeId(nodeId);
    setChoicesVisible(false);
    setInteraction(null);
    clearTimer();

    if (node.cost) {
      let left = batteryRef.current - node.cost;
      if (left <= 0) {
        if (sparesRef.current > 0) {
          setSparesBoth(sparesRef.current - 1);
          setBatteryBoth(100);
          showToast("⚡", "Son Anda Pil Takıldı", "#7fae86");
        } else {
          setBatteryBoth(0);
          await typeLine("alert", "⚠ TABLET BATARYASI TÜKENDİ", runId, 14);
          die({ text: "Ekran sönüyor. Karanlık, beklediği şeyi sonunda alıyor. Bu derinlikte ışıksız kalmak, çoktan ölmüş olmaktır.", battery: true });
          return;
        }
      } else {
        setBatteryBoth(left);
        if (left <= 20) {
          await typeLine("alert", "⚠ BATARYA KRİTİK: %" + left + " — PİL BUL", runId, 14);
        }
      }
    }

    if (node.checkpoint) {
      checkpointRef.current = {
        nodeId,
        stats: { ...statsRef.current },
        battery: batteryRef.current,
        spares: sparesRef.current,
        flags: { ...flagsRef.current },
        docs: docsRef.current.map((d) => ({ ...d })),
        notes: notesRef.current.map((n) => ({ ...n })),
        objective: objectiveRef.current,
        clock: clockRef.current,
      };
    }

    for (const ev of node.events) {
      if (runIdRef.current !== runId) return;
      await playEvent(ev, runId);
    }
    if (runIdRef.current !== runId) return;
    if (node.death) { die({ text: node.deathText }); return; }
    if (node.ending) { setEnded(true); return; }
    if (node.interaction) {
      if (node.interaction.kind === "keypad") { setKpEntry(""); setKpMsg(null); setKpFails(0); }
      if (node.interaction.kind === "radio") { setRadioFreq(425.0); setRadioPhase("tune"); }
      setInteraction({ ...node.interaction });
      return;
    }
    setChoicesVisible(true);
    if (node.timer) startTimer(node);
  }, []);

  const handleChoice = (choice, auto = false) => {
    if (!choice) return;
    clearTimer();
    setChoicesVisible(false);
    clockRef.current += 1 + Math.floor(Math.random() * 3);
    setLines((ls) => [...ls, { kind: "choice", text: (auto ? "· · · " : "» ") + choice.text }]);
    playNode(choice.next);
  };

  const handleSkipTap = () => { if (!screen && !interaction) skipRef.current = true; };

  const swapBattery = () => {
    if (sparesRef.current <= 0 || batteryRef.current >= 100 || death || dying) return;
    setSparesBoth(sparesRef.current - 1);
    setBatteryBoth(100);
    showToast("⚡", "Pil Değiştirildi · %100", "#7fae86");
  };

  const markRead = (kind, id) => {
    if (kind === "doc") {
      docsRef.current = docsRef.current.map((d) => (d.id === id ? { ...d, read: true } : d));
      setDocs(docsRef.current);
    } else {
      notesRef.current = notesRef.current.map((n) => (n.id === id ? { ...n, read: true } : n));
      setNotes(notesRef.current);
    }
  };

  /* ---- TUŞ PANELİ ---- */
  const kpPress = (d) => {
    if (kpEntry.length >= 4) return;
    setKpMsg(null);
    setKpEntry(kpEntry + d);
  };
  const kpClear = () => { setKpEntry(""); setKpMsg(null); };
  const kpSubmit = () => {
    if (kpEntry.length < 4 || !interaction) return;
    if (kpEntry === interaction.code) {
      setKpMsg({ text: "KOD KABUL EDİLDİ", ok: true });
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 900);
    } else {
      const fails = kpFails + 1;
      setKpFails(fails);
      setKpEntry("");
      glitchBurst(250);
      if (fails === 3) {
        statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + 10) };
        setStats(statsRef.current);
        setKpMsg({ text: "HATALI KOD — PANEL BİPLİYOR. GÜRÜLTÜ ARTTI.", ok: false });
      } else {
        setKpMsg({ text: "HATALI KOD", ok: false });
      }
    }
  };
  const kpCancel = () => {
    if (!interaction) return;
    const target = interaction.cancel;
    setInteraction(null);
    setLines((ls) => [...ls, { kind: "choice", text: "» Panelden uzaklaş" }]);
    playNode(target);
  };

  /* ---- RADYO ---- */
  const radioAdjust = (delta) => {
    if (radioPhase !== "tune" || !interaction) return;
    const f = Math.round(Math.max(410, Math.min(450, radioFreq + delta)) * 10) / 10;
    setRadioFreq(f);
    if (Math.abs(f - interaction.target) <= 0.05) {
      setRadioPhase("lock");
      const target = interaction.success;
      later(() => {
        setRadioPhase("cut");
        glitchBurst(900);
        later(() => {
          setInteraction(null);
          playNode(target);
        }, 1600);
      }, 2200);
    }
  };
  const radioSignal = Math.max(0, Math.round(100 - Math.abs(radioFreq - (interaction?.target || 432)) * 14));
  const radioHint = (() => {
    if (!interaction || interaction.kind !== "radio") return "";
    const f = radioFreq;
    if (radioPhase === "lock") return "\"SINIR-1, sizi alıyoruz, konumunuzu—\"";
    if (radioPhase === "cut") return "— HAT KOPTU —";
    if (Math.abs(f - 437.4) < 0.4) return "…karanlıkta bir çocuk sayı sayıyor… yedi… altı…";
    if (Math.abs(f - 421.8) < 0.4) return "…ıslak, ritmik bir nefes. Dinliyor.";
    if (Math.abs(f - interaction.target) < 0.8) return "…'—NIR-1, duyuyor mus—' … bir insan sesi!";
    if (Math.abs(f - interaction.target) < 2.5) return "…statiğin içinde kelime kırıntıları…";
    return "…statik…";
  })();

  const respawn = () => {
    const cp = checkpointRef.current;
    setDeath(null);
    setDying(false);
    clearPending();
    if (!cp) return restart();
    statsRef.current = { ...cp.stats };
    setStats({ ...cp.stats });
    setBatteryBoth(cp.battery);
    setSparesBoth(cp.spares);
    flagsRef.current = { ...cp.flags };
    setFlags(flagsRef.current);
    docsRef.current = cp.docs.map((d) => ({ ...d }));
    setDocs(docsRef.current);
    notesRef.current = cp.notes.map((n) => ({ ...n }));
    setNotes(notesRef.current);
    objectiveRef.current = cp.objective;
    setObjective(cp.objective);
    clockRef.current = cp.clock;
    setLines([{ kind: "system", text: "SON KONTROL NOKTASINDAN DEVAM EDİLİYOR..." }]);
    playNode(cp.nodeId);
  };

  const restart = () => {
    clearPending();
    clearTimer();
    setDeath(null);
    setDying(false);
    setEnded(false);
    statsRef.current = { gurultu: 0 };
    setStats({ gurultu: 0 });
    setBatteryBoth(BATTERY_START);
    setSparesBoth(SPARES_START);
    flagsRef.current = { ...INITIAL_FLAGS };
    setFlags({ ...INITIAL_FLAGS });
    docsRef.current = [];
    setDocs([]);
    notesRef.current = [];
    setNotes([]);
    objectiveRef.current = "—";
    setObjective("—");
    setObjectiveFlash(null);
    setToast(null);
    setInteraction(null);
    clockRef.current = 227;
    checkpointRef.current = null;
    setScreen(null);
    setOpenItem(null);
    setLines([]);
    playNode(STORY.start);
  };

  const begin = () => { setStarted(true); playNode(STORY.start); };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, choicesVisible, timeLeft]);

  useEffect(() => () => { clearPending(); clearTimer(); }, []);

  const node = currentNodeId ? STORY.nodes[currentNodeId] : null;
  const gurultuPct = Math.round((stats.gurultu / (STAT_MAX.gurultu || 100)) * 100);
  const bColor = batteryColorOf(battery);
  const S = styles;

  const visibleChoices = (node?.choices || []).filter((c) => flagOk(c.if));
  // flags state renderda kullanılıyor ki koşullu seçimler güncel kalsın
  void flags;

  return (
    <div style={S.root} onPointerDown={handleSkipTap}>
      <style>{css}</style>

      <div style={S.gameLayer} className={glitching ? "s1-glitch" : ""}>
        {/* ÜST BAR */}
        <div style={S.header}>
          <div style={S.headerLeft}>
            <span style={S.stationTag}>SINIR-1</span>
            <span style={S.sectorTag}>K-6</span>
          </div>
          <div style={S.headerRight}>
            <div style={S.gauge}>
              <span style={S.statLabel}>GÜRÜLTÜ</span>
              <div style={S.statTrack}>
                <div style={{ ...S.statFill, width: gurultuPct + "%", backgroundColor: gurultuPct > 50 ? "#b8503f" : "#7a8c46" }} />
              </div>
            </div>
            <button className="s1-btn" style={S.batteryWrap} title="Yedek pil takmak için dokun"
              onClick={(e) => { e.stopPropagation(); swapBattery(); }}>
              <div style={S.batteryShell}>
                <div className={battery <= 20 ? "s1-critical" : ""}
                  style={{ ...S.batteryFill, width: battery + "%", backgroundColor: bColor }} />
              </div>
              <div style={S.batteryCap} />
              <span style={{ ...S.spareText, color: spares > 0 ? "#b8b49a" : "#5a584a" }}>×{spares}</span>
            </button>
            {started && (
              <button className="s1-btn" style={S.archiveBtn}
                onClick={(e) => { e.stopPropagation(); setScreen("menu"); setOpenItem(null); }}>
                ARŞİV
              </button>
            )}
          </div>
        </div>

        {/* GİRİŞ */}
        {!started && (
          <div style={S.introWrap}>
            <div style={S.introTitle}>SINIR<span style={{ color: "#4d6b6e" }}>-</span>1</div>
            <div style={S.introSub}>DERİNLİK: 214 M — KARADENİZ ANOKSİK TABAKASI</div>
            <div style={S.introText}>
              Gece bakım vardiyasındasın. Yüzeyle bağlantı üç saat önce kesildi.
              Tabletinde %{BATTERY_START} batarya var — ve bu tesiste senden başka bir şey daha uyanık.
            </div>
            <button style={S.beginBtn} onClick={begin} className="s1-btn">VARDİYAYA BAŞLA</button>
            <div style={S.introHint}>Yazı akarken dokunmak metni hızlandırır. Pil göstergesine dokunarak yedek pil takabilirsin.</div>
          </div>
        )}

        {/* AKIŞ */}
        {started && (
          <div ref={scrollRef} style={S.stream}>
            {lines.map((l, i) => (
              <p key={i} style={S.lineBase[l.kind] || S.lineBase.narrate} className="s1-line">
                {l.text}
                {i === lines.length - 1 && typing && <span className="s1-cursor">▌</span>}
              </p>
            ))}

            {timeLeft && (
              <div style={S.timerWrap}>
                <div style={S.timerLabel}>KARAR VER</div>
                <div style={S.timerTrack}>
                  <div style={{ ...S.timerFill, width: (timeLeft.left / timeLeft.total) * 100 + "%" }} />
                </div>
              </div>
            )}

            {choicesVisible && visibleChoices.length > 0 && (
              <div style={S.choices}>
                {visibleChoices.map((c) => {
                  const locked = c.requireFlags && !c.requireFlags.every((f) => flagsRef.current[f]);
                  const activeCount = c.requireFlags ? c.requireFlags.filter((f) => flagsRef.current[f]).length : 0;
                  return (
                    <button key={c.id} className={"s1-btn" + (locked ? "" : " s1-choice")}
                      style={locked ? S.choiceLocked : S.choiceBtn}
                      onClick={(e) => { e.stopPropagation(); if (!locked) handleChoice(c); }}>
                      {locked
                        ? (c.lockText || c.text) + " (" + activeCount + "/" + c.requireFlags.length + ")"
                        : c.text}
                    </button>
                  );
                })}
              </div>
            )}

            {ended && (
              <div style={S.endWrap}>
                <div style={S.endTitle}>HAYATTASIN</div>
                <div style={S.endText}>
                  Şimdilik. — Döküman: {docs.length} · Not: {notes.length} · Batarya: %{battery} · Yedek pil: {spares}
                </div>
                <button className="s1-btn" style={S.beginBtn} onClick={(e) => { e.stopPropagation(); restart(); }}>
                  BAŞTAN OYNA
                </button>
              </div>
            )}
            <div style={{ height: 40 }} />
          </div>
        )}
      </div>

      {/* GÖREV BANDI */}
      {objectiveFlash && (
        <div key={objectiveFlash.key} style={S.objectiveBand} className="s1-objective">
          <span style={S.objectiveText}>Görev: {objectiveFlash.text}</span>
        </div>
      )}

      {/* KÖŞE İBARESİ */}
      {toast && (
        <div key={toast.key} style={{ ...S.toast, color: toast.color, borderColor: toast.color + "55" }} className="s1-toast">
          <span style={S.toastIcon}>{toast.icon}</span> {toast.text}
        </div>
      )}

      {/* ============ TUŞ PANELİ ============ */}
      {interaction?.kind === "keypad" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.keypadPanel} className="s1-panel">
            <div style={S.keypadTitle}>ERİŞİM PANELİ — RADYO ODASI</div>
            <div style={S.keypadDisplay}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={S.keypadDigit}>{kpEntry[i] || "▮"}</span>
              ))}
            </div>
            {kpMsg && (
              <div style={{ ...S.keypadMsg, color: kpMsg.ok ? "#7fae86" : "#c23b2e" }}>{kpMsg.text}</div>
            )}
            <div style={S.keypadGrid}>
              {["1","2","3","4","5","6","7","8","9","SİL","0","GİR"].map((k) => (
                <button key={k} className="s1-btn s1-key" style={k === "GİR" ? S.keyEnter : k === "SİL" ? S.keyAlt : S.keyBtn}
                  onClick={() => { if (k === "SİL") kpClear(); else if (k === "GİR") kpSubmit(); else kpPress(k); }}>
                  {k}
                </button>
              ))}
            </div>
            <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={kpCancel}>Vazgeç</button>
          </div>
        </div>
      )}

      {/* ============ RADYO ============ */}
      {interaction?.kind === "radio" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.radioPanel} className={"s1-panel" + (radioPhase === "cut" ? " s1-glitch" : "")}>
            <div style={S.keypadTitle}>TELSİZ KONSOLU — ACİL DURUM BANDI</div>
            <div style={S.radioFreqDisplay}>
              {radioFreq.toFixed(1)} <span style={S.radioMhz}>MHz</span>
            </div>
            <div style={S.radioSignalRow}>
              <span style={S.statLabel}>SİNYAL</span>
              <div style={S.radioSignalTrack}>
                <div style={{
                  ...S.radioSignalFill,
                  width: (radioPhase === "cut" ? 0 : radioSignal) + "%",
                  backgroundColor: radioSignal > 85 ? "#7fae86" : radioSignal > 50 ? "#c79a52" : "#5f7573",
                }} />
              </div>
            </div>
            <div style={{
              ...S.radioHint,
              color: radioPhase === "cut" ? "#c23b2e" : radioPhase === "lock" ? "#7fae86" : "#8a9a97",
            }}>
              {radioHint}
            </div>
            <div style={S.radioButtons}>
              <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => radioAdjust(-1)}>−1.0</button>
              <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => radioAdjust(-0.1)}>−0.1</button>
              <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => radioAdjust(0.1)}>+0.1</button>
              <button className="s1-btn s1-key" style={S.keyBtn} onClick={() => radioAdjust(1)}>+1.0</button>
            </div>
            {radioPhase === "lock" && <div style={S.radioLockText}>SİNYAL KİLİTLENDİ — BAĞLANTI KURULUYOR…</div>}
            {radioPhase === "cut" && <div style={{ ...S.radioLockText, color: "#c23b2e" }}>HAT FİZİKSEL OLARAK KESİLDİ</div>}
          </div>
        </div>
      )}

      {/* ARŞİV: ANA MENÜ */}
      {screen === "menu" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.menuPanel} className="s1-panel">
            <div style={S.menuObjective}>Görev: {objective}</div>
            <div style={S.menuButtons}>
              <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={() => setScreen("notes")}>Notlar</button>
              <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={() => setScreen("docs")}>Dökümanlar</button>
            </div>
            <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={() => setScreen(null)}>Kapat</button>
          </div>
        </div>
      )}

      {/* ARŞİV: LİSTELER */}
      {(screen === "notes" || screen === "docs") && !openItem && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.listPanel} className="s1-panel">
            <div style={S.listTitle}>{screen === "notes" ? "Notlar" : "Dökümanlar"}</div>
            <div style={S.listBody}>
              {(screen === "notes" ? notes : docs).length === 0 && (
                <div style={S.emptyText}>
                  {screen === "notes" ? "Henüz not yazılmadı." : "Henüz döküman toplanmadı. Ortalığı aramayı dene."}
                </div>
              )}
              {(screen === "notes" ? notes : docs).map((item) => (
                <button key={item.id} className="s1-btn s1-row" style={S.listRow}
                  onClick={() => {
                    markRead(screen === "notes" ? "note" : "doc", item.id);
                    setOpenItem({ kind: screen === "notes" ? "note" : "doc", item });
                  }}>
                  <span style={S.rowDotSlot}>{!item.read && <span style={S.redDot} />}</span>
                  <span style={S.rowText}>{item.title}</span>
                </button>
              ))}
            </div>
            <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={() => setScreen("menu")}>Geri</button>
          </div>
        </div>
      )}

      {/* NOT KAĞIDI */}
      {openItem?.kind === "note" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.notePaper} className="s1-paper">
            <div style={S.noteTitleRow}>
              <span style={S.notePaperTitle}>{openItem.item.title}</span>
              <span style={S.notePaperTime}>{openItem.item.time}</span>
            </div>
            <div style={S.notePaperBody}>{openItem.item.text}</div>
            <button className="s1-btn s1-menuitem" style={S.paperBack} onClick={() => setOpenItem(null)}>Geri</button>
          </div>
        </div>
      )}

      {/* DÖKÜMAN EVRAKI */}
      {openItem?.kind === "doc" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.docPaper} className="s1-paper">
            <div style={S.docPaperMeta}>{openItem.item.meta}</div>
            <div style={S.docPaperBody}>{openItem.item.body}</div>
            <button className="s1-btn s1-menuitem" style={S.paperBackDark} onClick={() => setOpenItem(null)}>Kapat</button>
          </div>
        </div>
      )}

      {/* ÖLÜM: KARARMA + PANEL */}
      {dying && <div style={S.dyingVignette} className="s1-dying" />}
      {death && (
        <div style={S.deathOverlay} className="s1-death">
          <div style={S.deathTitle}>{death.battery ? "GÜÇ KAYBI" : "KAYIT SONLANDI"}</div>
          <div style={S.deathText}>{death.text}</div>
          <button className="s1-btn" style={S.deathBtn} onClick={(e) => { e.stopPropagation(); respawn(); }}>
            SON KONTROL NOKTASINDAN DEVAM ET
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------ STİLLER ------------------ */

const mono = "'Courier New', ui-monospace, 'SF Mono', Menlo, monospace";
const serif = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const hand = "'Bradley Hand', 'Segoe Script', 'Noteworthy', 'Comic Sans MS', cursive";

const styles = {
  root: {
    position: "fixed", inset: 0, backgroundColor: "#04090b",
    color: "#aebfbc", fontFamily: serif, overflow: "hidden", userSelect: "none",
  },
  gameLayer: {
    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
    backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(20,42,46,0.35) 0%, rgba(4,9,11,0) 60%)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 14px", borderBottom: "1px solid #10201f",
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", flexShrink: 0, gap: 10,
  },
  headerLeft: { display: "flex", gap: 8, alignItems: "baseline" },
  stationTag: { color: "#d7e4e0", fontWeight: 700 },
  sectorTag: { color: "#4d6b6e" },
  headerRight: { display: "flex", gap: 14, alignItems: "center" },
  gauge: { display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" },
  statLabel: { color: "#4d6b6e", fontSize: 9, fontFamily: mono, letterSpacing: "0.15em" },
  statTrack: { width: 52, height: 4, backgroundColor: "#0c1718", borderRadius: 2, overflow: "hidden" },
  statFill: { height: "100%", transitionProperty: "width", transitionDuration: "500ms" },

  batteryWrap: {
    display: "flex", alignItems: "center", gap: 2, backgroundColor: "transparent",
    border: "none", padding: "4px 2px", cursor: "pointer",
  },
  batteryShell: {
    width: 36, height: 14, border: "1px solid #7d7a68", borderRadius: 3,
    padding: 2, backgroundColor: "rgba(0,0,0,0.5)",
  },
  batteryFill: {
    height: "100%", borderRadius: 1,
    transitionProperty: "width, background-color", transitionDuration: "600ms",
  },
  batteryCap: { width: 3, height: 7, backgroundColor: "#7d7a68", borderRadius: "0 2px 2px 0" },
  spareText: { fontFamily: mono, fontSize: 11, marginLeft: 5, letterSpacing: "0.05em" },

  archiveBtn: {
    fontFamily: mono, fontSize: 10, letterSpacing: "0.12em",
    padding: "8px 12px", backgroundColor: "transparent", color: "#8ba3a0",
    border: "1px solid #1b3234", borderRadius: 3, cursor: "pointer",
  },

  objectiveBand: {
    position: "fixed", top: 64, left: 0, right: 0,
    backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.92) 12%, rgba(0,0,0,0.92) 88%, rgba(0,0,0,0) 100%)",
    padding: "16px 32px", textAlign: "center", zIndex: 8, pointerEvents: "none",
  },
  objectiveText: {
    fontFamily: mono, fontSize: 15, letterSpacing: "0.14em", color: "#e8d98a",
    textShadow: "0 1px 3px rgba(0,0,0,1)",
  },

  toast: {
    position: "fixed", right: 14, bottom: 18, zIndex: 9, pointerEvents: "none",
    fontFamily: mono, fontSize: 12, letterSpacing: "0.1em",
    padding: "9px 14px", backgroundColor: "rgba(4,8,9,0.9)",
    border: "1px solid", borderRadius: 4,
  },
  toastIcon: { marginRight: 4 },

  introWrap: {
    flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", padding: "0 28px", textAlign: "center", gap: 16,
  },
  introTitle: { fontFamily: mono, fontSize: 44, letterSpacing: "0.3em", color: "#d7e4e0", fontWeight: 700 },
  introSub: { fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "#4d6b6e" },
  introText: { maxWidth: 420, lineHeight: 1.7, fontSize: 16, color: "#8ba3a0", fontStyle: "italic" },
  introHint: { fontFamily: mono, fontSize: 10, color: "#3a5254", marginTop: 8, lineHeight: 1.7 },

  beginBtn: {
    fontFamily: mono, fontSize: 12, letterSpacing: "0.15em", padding: "14px 28px",
    backgroundColor: "transparent", color: "#d7e4e0", border: "1px solid #2a4548",
    borderRadius: 3, cursor: "pointer", marginTop: 8,
  },

  stream: { flex: 1, overflowY: "auto", padding: "24px 20px 0", maxWidth: 620, width: "100%", margin: "0 auto" },

  lineBase: {
    narrate: { fontSize: 17, lineHeight: 1.75, margin: "0 0 18px", color: "#aebfbc" },
    ambient: { fontSize: 15, lineHeight: 1.7, margin: "0 0 18px", color: "#5f7573", fontStyle: "italic" },
    system: { fontFamily: mono, fontSize: 12, lineHeight: 1.6, margin: "0 0 18px", color: "#c79a52", letterSpacing: "0.05em" },
    alert: { fontFamily: mono, fontSize: 12, lineHeight: 1.6, margin: "0 0 18px", color: "#c05a48", letterSpacing: "0.05em" },
    choice: { fontFamily: mono, fontSize: 13, lineHeight: 1.6, margin: "0 0 22px", color: "#5f7573" },
  },

  timerWrap: { margin: "4px 0 14px" },
  timerLabel: { fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "#c05a48", marginBottom: 6 },
  timerTrack: { height: 4, backgroundColor: "#180e0d", borderRadius: 2, overflow: "hidden" },
  timerFill: { height: "100%", backgroundColor: "#c05a48" },

  choices: { display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 20px" },
  choiceBtn: {
    fontFamily: mono, fontSize: 13, textAlign: "left", padding: "14px 16px",
    backgroundColor: "rgba(13,26,27,0.6)", color: "#c3d4d1",
    border: "1px solid #1b3234", borderRadius: 3, cursor: "pointer", lineHeight: 1.5,
  },
  choiceLocked: {
    fontFamily: mono, fontSize: 13, textAlign: "left", padding: "14px 16px",
    backgroundColor: "rgba(10,14,14,0.5)", color: "#48544f",
    border: "1px dashed #1b2626", borderRadius: 3, cursor: "default", lineHeight: 1.5,
  },

  endWrap: { textAlign: "center", padding: "30px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  endTitle: { fontFamily: mono, fontSize: 22, letterSpacing: "0.25em", color: "#d7e4e0" },
  endText: { color: "#5f7573", fontStyle: "italic", fontSize: 14, lineHeight: 1.6 },

  overlayDim: {
    position: "fixed", inset: 0, backgroundColor: "rgba(2,4,5,0.85)",
    display: "flex", justifyContent: "center", alignItems: "center",
    padding: "20px 14px", zIndex: 20,
  },

  /* Tuş paneli */
  keypadPanel: {
    width: "100%", maxWidth: 340, borderRadius: 10,
    backgroundColor: "rgba(7,12,11,0.97)", border: "1px solid #1d3230",
    boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(10,30,28,0.4)",
    padding: "24px 22px 16px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 16,
  },
  keypadTitle: { fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", color: "#5f8a7e", textAlign: "center" },
  keypadDisplay: {
    display: "flex", gap: 14, padding: "12px 22px",
    backgroundColor: "#050a09", border: "1px solid #16403a", borderRadius: 6,
  },
  keypadDigit: { fontFamily: mono, fontSize: 26, color: "#7fdcc3", width: 22, textAlign: "center", textShadow: "0 0 8px rgba(90,220,190,0.4)" },
  keypadMsg: { fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textAlign: "center" },
  keypadGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, width: "100%" },
  keyBtn: {
    fontFamily: mono, fontSize: 16, padding: "14px 0", backgroundColor: "rgba(13,26,25,0.8)",
    color: "#b9d4cc", border: "1px solid #1d3a36", borderRadius: 6, cursor: "pointer",
  },
  keyAlt: {
    fontFamily: mono, fontSize: 12, padding: "14px 0", backgroundColor: "rgba(26,18,13,0.8)",
    color: "#c7a985", border: "1px solid #3a2d1d", borderRadius: 6, cursor: "pointer",
  },
  keyEnter: {
    fontFamily: mono, fontSize: 12, padding: "14px 0", backgroundColor: "rgba(13,26,17,0.9)",
    color: "#8fce9d", border: "1px solid #1d3a26", borderRadius: 6, cursor: "pointer",
  },

  /* Radyo */
  radioPanel: {
    width: "100%", maxWidth: 380, borderRadius: 10,
    backgroundColor: "rgba(10,9,7,0.97)", border: "1px solid #2e2a1e",
    boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 50px rgba(30,26,14,0.35)",
    padding: "24px 22px 20px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 16,
  },
  radioFreqDisplay: {
    fontFamily: mono, fontSize: 40, color: "#e8c86a", letterSpacing: "0.05em",
    textShadow: "0 0 14px rgba(230,190,90,0.35)",
    padding: "8px 26px", backgroundColor: "#0a0805", border: "1px solid #3a3020",
    borderRadius: 6,
  },
  radioMhz: { fontSize: 15, color: "#8a7a4a" },
  radioSignalRow: { display: "flex", alignItems: "center", gap: 10, width: "100%" },
  radioSignalTrack: { flex: 1, height: 6, backgroundColor: "#0f0d08", borderRadius: 3, overflow: "hidden" },
  radioSignalFill: { height: "100%", transitionProperty: "width, background-color", transitionDuration: "300ms" },
  radioHint: {
    fontFamily: serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.6,
    textAlign: "center", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center",
  },
  radioButtons: { display: "flex", gap: 10, width: "100%", justifyContent: "center" },
  radioLockText: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#7fae86", textAlign: "center" },

  /* Arşiv */
  menuPanel: {
    width: "100%", maxWidth: 520, borderRadius: 14,
    backgroundColor: "rgba(8,9,7,0.94)", border: "1px solid #23241c",
    boxShadow: "0 0 60px rgba(0,0,0,0.9)",
    padding: "34px 24px 22px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 26,
  },
  menuObjective: { fontFamily: mono, fontSize: 15, letterSpacing: "0.12em", color: "#e8d98a", textAlign: "center", lineHeight: 1.6 },
  menuButtons: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },
  menuItem: {
    fontFamily: mono, fontSize: 14, letterSpacing: "0.35em",
    padding: "10px 26px", backgroundColor: "transparent", color: "#d6cfa8",
    border: "1px solid transparent", borderRadius: 999, cursor: "pointer",
  },
  menuClose: {
    fontFamily: mono, fontSize: 12, letterSpacing: "0.35em", padding: "8px 22px",
    backgroundColor: "transparent", color: "#8f8a70", border: "1px solid transparent",
    borderRadius: 999, cursor: "pointer",
  },

  listPanel: {
    width: "100%", maxWidth: 560, maxHeight: "82vh", borderRadius: 12,
    backgroundColor: "rgba(8,9,7,0.94)", border: "1px solid #23241c",
    boxShadow: "0 0 60px rgba(0,0,0,0.9)",
    padding: "22px 20px 16px", display: "flex", flexDirection: "column", gap: 14,
  },
  listTitle: { fontFamily: mono, fontSize: 16, letterSpacing: "0.35em", color: "#d6cfa8" },
  listBody: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
  listRow: {
    display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left",
    padding: "11px 6px", backgroundColor: "transparent",
    border: "none", borderBottom: "1px solid #1c1d16", cursor: "pointer",
  },
  rowDotSlot: { width: 12, display: "flex", justifyContent: "center", flexShrink: 0 },
  redDot: { width: 7, height: 7, borderRadius: "50%", backgroundColor: "#c23b2e", display: "block" },
  rowText: { fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", color: "#cfc9a4" },
  emptyText: { fontFamily: mono, fontSize: 12, color: "#5a584a", textAlign: "center", marginTop: 30, lineHeight: 1.8 },

  notePaper: {
    width: "100%", maxWidth: 480, maxHeight: "84vh", overflowY: "auto",
    backgroundColor: "#f3f0e6",
    backgroundImage: "repeating-linear-gradient(transparent, transparent 30px, #c8d3df 31px)",
    boxShadow: "0 10px 50px rgba(0,0,0,0.95)",
    padding: "30px 26px 20px", display: "flex", flexDirection: "column", gap: 6,
  },
  noteTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 },
  notePaperTitle: { fontFamily: hand, fontSize: 22, color: "#2f4496", fontWeight: 700 },
  notePaperTime: { fontFamily: hand, fontSize: 14, color: "#5a6da8" },
  notePaperBody: { fontFamily: hand, fontSize: 19, lineHeight: "31px", color: "#31469a" },
  paperBack: {
    alignSelf: "center", marginTop: 24, fontFamily: mono, fontSize: 12,
    letterSpacing: "0.3em", padding: "8px 20px", backgroundColor: "transparent",
    color: "#7a7a6a", border: "none", cursor: "pointer",
  },

  docPaper: {
    width: "100%", maxWidth: 480, maxHeight: "84vh", overflowY: "auto",
    backgroundColor: "#edeadf",
    boxShadow: "0 10px 50px rgba(0,0,0,0.95)",
    padding: "34px 30px 20px", display: "flex", flexDirection: "column",
  },
  docPaperMeta: { fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", color: "#6b675a", marginBottom: 18 },
  docPaperBody: { fontFamily: mono, fontSize: 13.5, lineHeight: 1.85, color: "#2e2c26", whiteSpace: "pre-wrap" },
  paperBackDark: {
    alignSelf: "center", marginTop: 26, fontFamily: mono, fontSize: 12,
    letterSpacing: "0.3em", padding: "8px 20px", backgroundColor: "transparent",
    color: "#6b675a", border: "1px solid #b9b4a2", borderRadius: 999, cursor: "pointer",
  },

  dyingVignette: { position: "fixed", inset: 0, zIndex: 25, pointerEvents: "none" },

  deathOverlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(8,3,3,0.96)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 18, padding: "0 28px", textAlign: "center", zIndex: 30,
  },
  deathTitle: { fontFamily: mono, fontSize: 20, letterSpacing: "0.3em", color: "#b8503f" },
  deathText: { fontFamily: serif, fontStyle: "italic", fontSize: 16, color: "#8a6b64", maxWidth: 380, lineHeight: 1.7 },
  deathBtn: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "14px 22px",
    backgroundColor: "transparent", color: "#c9a49a", border: "1px solid #4a2b26",
    borderRadius: 3, cursor: "pointer", marginTop: 10,
  },
};

const css = `
  @keyframes s1-blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }
  @keyframes s1-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes s1-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
  @keyframes s1-objflash {
    0% { opacity: 0; transform: translateY(6px); }
    10% { opacity: 1; transform: translateY(0); }
    82% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes s1-toastblink {
    0% { opacity: 0; } 8% { opacity: 1; } 18% { opacity: 0.15; } 28% { opacity: 1; }
    38% { opacity: 0.15; } 48% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; }
  }
  @keyframes s1-panelin { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
  @keyframes s1-glitchjitter {
    0% { transform: translate(0, 0); filter: none; }
    15% { transform: translate(-4px, 2px); filter: invert(0.06) contrast(1.5); }
    30% { transform: translate(5px, -3px) skewX(0.6deg); filter: hue-rotate(-30deg); }
    45% { transform: translate(-3px, -2px); filter: contrast(1.8) brightness(1.3); }
    60% { transform: translate(3px, 3px) skewX(-0.8deg); filter: invert(0.1); }
    75% { transform: translate(-5px, 1px); filter: hue-rotate(40deg) contrast(1.4); }
    90% { transform: translate(2px, -2px); filter: brightness(0.7); }
    100% { transform: translate(0, 0); filter: none; }
  }
  @keyframes s1-closein {
    0% { box-shadow: inset 0 0 0 0 rgba(0,0,0,0); }
    100% { box-shadow: inset 0 0 35vmax 28vmax rgba(2,0,0,0.99); }
  }
  .s1-cursor { color: #7fa39f; animation-name: s1-blink; animation-duration: 0.9s; animation-iteration-count: infinite; }
  .s1-line { animation-name: s1-fade; animation-duration: 0.4s; animation-timing-function: ease-out; }
  .s1-death { animation-name: s1-fade; animation-duration: 1.2s; animation-timing-function: ease-in; }
  .s1-critical { animation-name: s1-pulse; animation-duration: 1s; animation-iteration-count: infinite; }
  .s1-objective { animation-name: s1-objflash; animation-duration: 4.2s; animation-timing-function: ease-in-out; animation-fill-mode: forwards; }
  .s1-toast { animation-name: s1-toastblink; animation-duration: 3.2s; animation-timing-function: linear; animation-fill-mode: forwards; }
  .s1-panel, .s1-paper { animation-name: s1-panelin; animation-duration: 0.25s; animation-timing-function: ease-out; }
  .s1-glitch { animation-name: s1-glitchjitter; animation-duration: 0.22s; animation-timing-function: steps(3); animation-iteration-count: infinite; }
  .s1-dying { animation-name: s1-closein; animation-duration: 2s; animation-timing-function: ease-in; animation-fill-mode: forwards; }
  .s1-btn { -webkit-tap-highlight-color: transparent; }
  .s1-btn:active { transform: translateY(1px); }
  .s1-choice:hover { border-color: #3a6165 !important; background-color: rgba(20,40,42,0.8) !important; }
  .s1-key:hover { border-color: #3a6155 !important; }
  .s1-menuitem:hover { border-color: #4a4a38 !important; }
  .s1-row:hover { background-color: rgba(30,30,22,0.5) !important; }
  @media (prefers-reduced-motion: reduce) {
    .s1-cursor, .s1-line, .s1-death, .s1-critical, .s1-objective, .s1-toast, .s1-panel, .s1-paper, .s1-glitch, .s1-dying {
      animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    }
  }
`;