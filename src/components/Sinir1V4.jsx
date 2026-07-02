import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

/* ============================================================
   SINIR-1 v7 — Metin Tabanlı Korku Prototipi
   YENİ:
   · PİL KRİZİ — %12 altında ekran pırpır; %0'da simsiyah:
     geri sayım + BASILI TUTARAK pil takma; başaramazsan ölüm
   · İNTERAKTİF MEKANİK — vana ÇEVİRME (dokunarak döndür),
     şalter KALDIRMA (basılı tut), sigorta TAKMA (zamanlama)
   · GÜRÜLTÜNÜN SONUCU — %50+ ve %80+ gürültüde pusu sahneleri;
     "hareketsiz bekle" ile gürültü düşürme
   · SES — Tone.js: ambiyans, kalp atışı, radyo statiği,
     glitch paraziti, tuş/uyarı sesleri (Ayarlar'dan kapatılır)
   · NEFES TUTMA — saklanırken basılı tut; erken bırakma= ölüm,
     ciğer dolarsa = ölüm
   · AKIL SAĞLIĞI — düştükçe metin bozulur, kelimeler değişir
   ============================================================ */

/* ---------------- SES SİSTEMİ ---------------- */
const AudioSys = {
  inited: false, enabled: true, heartId: null, n: {},
  async init() {
    if (this.inited) return;
    try {
      await Tone.start();
      const ambOsc = new Tone.Oscillator(46, "sine");
      const ambGain = new Tone.Gain(0.03).toDestination();
      ambOsc.connect(ambGain);
      const rumble = new Tone.Noise("brown");
      const rumbleF = new Tone.Filter(140, "lowpass");
      const rumbleG = new Tone.Gain(0.018).toDestination();
      rumble.chain(rumbleF, rumbleG);
      const statNz = new Tone.Noise("pink");
      const statG = new Tone.Gain(0).toDestination();
      statNz.connect(statG);
      statNz.start();
      const burstNz = new Tone.Noise("white");
      const burstG = new Tone.Gain(0).toDestination();
      burstNz.connect(burstG);
      burstNz.start();
      const memb = new Tone.MembraneSynth({ volume: -13 }).toDestination();
      const blip = new Tone.Synth({
        oscillator: { type: "triangle" }, volume: -18,
        envelope: { attack: 0.004, decay: 0.09, sustain: 0, release: 0.05 },
      }).toDestination();
      const buzz = new Tone.Synth({
        oscillator: { type: "square" }, volume: -20,
        envelope: { attack: 0.01, decay: 0.22, sustain: 0.08, release: 0.1 },
      }).toDestination();
      this.n = { ambOsc, rumble, statG, burstG, memb, blip, buzz };
      this.inited = true;
    } catch (e) { /* ses başlatılamadı — sessiz devam */ }
  },
  ambient(on) {
    if (!this.inited) return;
    try {
      const { ambOsc, rumble } = this.n;
      if (on) {
        if (ambOsc.state !== "started") ambOsc.start();
        if (rumble.state !== "started") rumble.start();
      } else { ambOsc.stop(); rumble.stop(); }
    } catch (e) {}
  },
  heart(intervalMs) {
    if (this.heartId) { clearInterval(this.heartId); this.heartId = null; }
    if (!intervalMs || !this.inited) return;
    this.heartId = setInterval(() => {
      if (!this.enabled) return;
      try {
        this.n.memb.triggerAttackRelease("C1", "16n");
        setTimeout(() => { try { this.n.memb.triggerAttackRelease("G0", "16n"); } catch (e) {} }, 140);
      } catch (e) {}
    }, intervalMs);
  },
  staticLevel(level) {
    if (!this.inited) return;
    try { this.n.statG.gain.rampTo(this.enabled ? level : 0, 0.15); } catch (e) {}
  },
  burst(ms = 160) {
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.11, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.08); } catch (e) {} }, ms);
    } catch (e) {}
  },
  blipSfx(freq = 740) {
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(freq, "32n"); } catch (e) {}
  },
  buzzSfx() {
    if (!this.inited || !this.enabled) return;
    try { this.n.buzz.triggerAttackRelease(96, "8n"); } catch (e) {}
  },
  clank() {
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("E1", "32n"); } catch (e) {}
  },
  boom() {
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("A0", "2n"); } catch (e) {}
  },
  setEnabled(on) {
    this.enabled = on;
    try { Tone.Destination.mute = !on; } catch (e) {}
    if (!on) this.heart(null);
  },
};

/* ---------------- HİKAYE ---------------- */
const STORY = {
  start: "n_uyanis",
  nodes: {
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

    /* --- NEFES TUTMA --- */
    n_saklan: {
      cost: 3,
      events: [
        { type: "narrate", text: "Masanın altına giriyorsun ve fenerini kapatıyorsun. Kapı açılıyor. Islak, ağır adımlar odaya giriyor." },
        { type: "system", text: "NEFESİNİ TUT — BASILI TUT VE BIRAKMA" },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_saklan2", fail: "n_olum_nefes" },
    },

    n_saklan2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Adımlar uzaklaşıyor. Ciğerlerindeki havayı sessizce, titreyerek bırakıyorsun. Kapı açık kalıyor." },
        { type: "stat", stat: "akil", delta: -5, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "cik", text: "Masanın altından çık", next: "n_tablet" }],
    },

    n_olum_nefes: {
      death: true, cost: 0,
      deathText: "Ciğerlerin, korkundan önce pes etti.",
      events: [
        { type: "glitch", ms: 700 },
        { type: "narrate", text: "Nefesin, göğsünden bir yabancı gibi kaçıyor. Islak adımlar duruyor. Sonra masa, üzerinden kaldırılıyor — bir kapak gibi." },
      ],
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
            body: "SINIR-1 ARAŞTIRMA TESİSİ\nİSG İHLAL TUTANAĞI\nKAYIT NO: 214-G/077\n\nİlgili: K-2 Arkeoloji Ambarı,\nKonteyner 7.\n\nKonteyner 7'nin mühürleri, karantina\nprotokolü (Md. 12/3) tamamlanmadan\nİstasyon Şefi'nin sözlü talimatıyla\naçılmıştır.\n\nİtirazım tutanağa geçirilmemiştir.\n\nKonteyner içeriği: Kazı sahası KG-4'ten\nçıkarılan organik numune.\n\nNumunenin korunma durumu, gömülme\nyaşıyla (tahminî 7.400 yıl) uyumlu\nDEĞİLDİR.\n\nGereğinin yapılmasını arz ederim.\n\nİmza: [okunmuyor]\n\nOnay: H. TEKİN\nNot: \"Gereği yok. Arşivle.\"",
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

    /* --- PLATFORM HUB --- */
    n_platform: {
      checkpoint: true, cost: 2,
      noiseGate: [{ min: 50, once: "enc1", node: "n_enc1" }],
      events: [
        { type: "narrate", text: "Geniş bir bakım platformu. Karşıda üç ana su pompası karanlıkta duruyor; hepsinin uyarı lambası sönük. Ortada ana kontrol paneli, solda bir elektrik dolabı, sağ dipte ağır bir kapı: RADYO ODASI.", if: { flag: "platformGoruldu", equals: false } },
        { type: "objective", text: "Ana su hattını çalıştır — 3 pompayı aktif et.", if: { flag: "platformGoruldu", equals: false } },
        { type: "narrate", text: "Platformdasın. Pompaların gölgeleri karanlıkta bekliyor.", if: { flag: "platformGoruldu", equals: true } },
        { type: "flag", set: { platformGoruldu: true } },
      ],
      choices: [
        { id: "pa", text: "POMPA A'ya git — vanayı aç", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "POMPA B'ye git — şalteri kaldır", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "pc", text: "POMPA C'ye git — sigortayı tak", next: "n_pompaC", if: { flag: "pompaC", equals: false } },
        { id: "panel", text: "Ana kontrol paneline git", next: "n_anapanel" },
        { id: "elek", text: "Elektrik dolabını incele — devre paneli", next: "n_elektrik", if: { flag: "kilerAcik", equals: false } },
        { id: "ara", text: "Platformu ara", next: "n_platform_ara", if: { flag: "platformArandi", equals: false } },
        { id: "bekle", text: "Karanlıkta hareketsiz bekle — sesin dinsin", next: "n_bekle", ifStat: { stat: "gurultu", gte: 25 } },
        { id: "radyokapi", text: "Radyo odası kapısına git (kod paneli)", next: "n_kapipanel", if: { flag: "gucAcik", equals: true } },
      ],
    },

    n_bekle: {
      cost: 1,
      events: [
        { type: "narrate", text: "Bir köşeye çöküyorsun ve tabletin ışığını göğsüne bastırıyorsun. Dakikalar geçiyor. Tesisin sesleri yavaş yavaş senin üstünden akıp gidiyor — artık seni aramıyorlar." },
        { type: "stat", stat: "gurultu", delta: -25, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_platform" }],
    },

    /* --- GÜRÜLTÜ PUSULARI --- */
    n_enc1: {
      cost: 2,
      events: [
        { type: "narrate", text: "Platforma adım atarken alt kattaki bütün sesler aynı anda kesiliyor. Kötü işaret. Bir şey, ses çıkarmayı bırakıp DİNLEMEYE başladı." },
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Merdiven boşluğundan ıslak bir sürtünme sesi yükseliyor. Yukarı tırmanıyor — çıkardığın gürültünün izini sürdü." },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "sin", text: "Pompaların arasındaki gölgeye sin", next: "n_enc1_ok" },
        { id: "don", text: "Işığı kapatıp olduğun yerde donakal", next: "n_olum_enc1", default: true },
      ],
    },

    n_enc1_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompaların arasına sıkışıyorsun. Islak bir şey platform korkuluğunu aşıyor ve az önce durduğun yerde duruyor. Uzun bir süre. Sonra, aradığını bulamamış bir sabırla, merdivenlere geri süzülüyor." },
        { type: "stat", stat: "gurultu", delta: -15, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "d", text: "Gölgeden çık", next: "n_platform" }],
    },

    n_olum_enc1: {
      death: true, cost: 0,
      deathText: "Hareketsizlik seni saklamaz. Kokunu değiştirmez.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "Işığı kapatıyorsun ve taş kesiliyorsun. Islak sürtünme sesi korkuluğu aşıyor... ve doğruca sana geliyor. O, karanlıkta görmüyor. Karanlıkta KOKLUYOR." },
      ],
    },

    n_enc2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kod paneline uzanırken platformun acil aydınlatması teker teker sönmeye başlıyor. En uzaktan sana doğru. Bu bir arıza değil. Bu bir tercih." },
        { type: "glitch", ms: 700 },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "cok", text: "Panelin altındaki gölgeye çök", next: "n_enc2_ok" },
        { id: "devam", text: "Kodu girmeye devam et", next: "n_olum_enc2", default: true },
      ],
    },

    n_enc2_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Panelin altına çöküyorsun. Sönen ışıkların karanlığı üzerinden geçiyor — ve arkasından gelen şey de. Ayak sesleri panelin önünde yavaşlıyor, sonra pompaların gürültüsüne doğru uzaklaşıyor. Pompaları dinliyor. Seni değil." },
        { type: "stat", stat: "gurultu", delta: -20, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "d", text: "Kod paneline dön", next: "n_kapipanel" }],
    },

    n_olum_enc2: {
      death: true, cost: 0,
      deathText: "Parmakların dördüncü haneye hiç ulaşamadı.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "İlk üç haneyi giriyorsun. Panelin yeşil ışığında kendi yansımanı görüyorsun — ve yansımanın arkasında, sönen ışıkların getirdiği şeyi." },
      ],
    },

    /* --- POMPA A: VANA ÇEVİRME --- */
    n_pompaA: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa A'nın vanası paslanmış — yıllardır kimse çevirmemiş gibi. İki elinle kavrıyorsun." },
        { type: "system", text: "VANAYI ÇEVİR — DOKUNARAK DÖNDÜR" },
      ],
      interaction: { kind: "valve", turns: 9, success: "n_pompaA2", cancel: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Vana son tur direnip teslim oluyor. Boruların içinde su gürlemeye başlıyor ve pompanın lambası yeşile dönüyor." },
        { type: "flag", set: { pompaA: true } },
        { type: "system", text: "POMPA A: AKTİF ▮" },
        { type: "ambient", text: "Boruların içinde bir şey harekete geçiyor. Umarım sadece su." },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    /* --- POMPA B: ŞALTER KALDIRMA --- */
    n_pompaB: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa B'nin şalter kutusuna uzanırken tabletin ışığı titreşiyor. Kutunun yanındaki duvarda, ıslak bir el izi var. Senin elinden büyük." },
        { type: "glitch", ms: 500 },
        { type: "system", text: "ŞALTERİ KALDIR — BASILI TUT" },
      ],
      interaction: { kind: "lever", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Şalter, omuzlarının bütün gücüyle yukarı oturuyor. Pompa öksürerek çalışıyor; lamba yeşil." },
        { type: "flag", set: { pompaB: true } },
        { type: "system", text: "POMPA B: AKTİF ▮" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    /* --- POMPA C: SİGORTA (ZAMANLAMA) --- */
    n_pompaC: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa C en dipte, en karanlıkta. Sigorta yuvası boş — ama yuvanın hemen yanında yedek sigorta asılı duruyor. Birisi buraya gelmiş ve takmadan gitmiş." },
        { type: "system", text: "SİGORTAYI TAK — İBRE YEŞİL BÖLGEDEYKEN BAS (2 KEZ)" },
      ],
      interaction: { kind: "fuse", hits: 2, success: "n_pompaC2", cancel: "n_platform" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sigorta yuvaya oturuyor. Tam o sırada gözün, kapının çelik yüzeyine kazınmış yazıya takılıyor:" },
        { type: "system", text: "KAZINMIŞ YAZI: \"…47. UNUTMA.\"" },
        { type: "note", id: "nt_47", title: "…47", text: "Birisi kapıya '…47' kazımış. Bir kodun sonu gibi. Neyin kodu? Ve neden 'unutma'?" },
        { type: "flag", set: { pompaC: true } },
        { type: "system", text: "POMPA C: AKTİF ▮" },
        { type: "glitch", ms: 700 },
        { type: "narrate", text: "Ve aynı anda, platformun öteki ucunda bir şey metale çarpıyor. Sesi duydu." },
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
            body: "SINIR-1 ERİŞİM KODLARI\nVARDİYA PERSONELİ\n\nK-6 MAKİNE DAİRESİ: 8830\n\nK-6 ÜST PLATFORM: 5512\n\nRADYO ODASI (K-6 ÜST): 21▮▮\n   [nem hasarı — son iki hane\n    okunmuyor]\n\nK-5 YAŞAM DESTEK: ▮▮▮▮\n\nKodların paylaşılması disiplin\nsuçudur.\n\nGÜVENLİK AMİRİ: D. OKUR",
          },
        },
        { type: "note", id: "nt_kod", title: "Yarım Kod", text: "Radyo odası: 21-bilmemne. Formun gerisini nem yemiş. Bu tesiste birisi bir yere kodun devamını yazmış olmalı. Herkes unutur. Teknisyenler bilir." },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_elektrik: {
      cost: 2,
      events: [
        { type: "narrate", text: "Elektrik dolabının kapağını açıyorsun. İçeride beş sönük gösterge lambası ve altlarında beş buton var. Kapağın içine yağlı kalemle yazılmış: \"HEPSİNİ YAK. SIRAYLA DEĞİL, AKILLA.\"" },
        { type: "ambient", text: "Her buton birden fazla lambayı etkiliyor gibi." },
      ],
      interaction: { kind: "lights", success: "n_kiler", cancel: "n_platform" },
    },

    n_kiler: {
      cost: 1,
      events: [
        { type: "flag", set: { kilerAcik: true } },
        { type: "system", text: "DEVRE SENKRONİZE — MALZEME DOLABI KİLİDİ AÇILDI" },
        { type: "narrate", text: "Beş lamba aynı anda yanıyor ve dolabın alt bölmesindeki manyetik kilit tık diye açılıyor. İçeride bir yedek güç hücresi ve spiralli bir defter var." },
        { type: "battery", spares: 1 },
        {
          type: "document",
          doc: {
            id: "d_bakim",
            title: "Bakım Günlüğü — D.O.",
            meta: "KİŞİSEL KAYIT · YETKİSİZ ERİŞİM",
            body: "BAKIM GÜNLÜĞÜ — D.O.\n\nGün 112:\nDevre panelini yine ben senkronladım.\nKimse okumuyor bunları. Kimse\nteşekkür etmiyor.\n\nGün 118:\nŞef, Konteyner 7 için üst platformdan\nekipman istedi. Vermedim. Sonra\nemir geldi. Verdim.\n\nGün 121:\nNevin laboratuvarı kilitledi.\nİçeriden. Üç gündür çıkmıyor.\nYemeklerini kapının önüne\nbırakıyoruz. Tabaklar boşalıyor\nama kimse kapıyı açarken\ngörmüyor.\n\nGün 124:\nBugün pompaları kapattım.\nSebep yok.\nSadece ne olacağını izlemek istedim.",
          },
        },
        { type: "note", id: "nt_do", title: "D.O.", text: "Güvenlik amiri D. Okur. Pompaları o kapatmış — 'izlemek için'. Bu tesiste her şey bozulmadan önce de bozuk olan biri varmış." },
        { type: "stat", stat: "akil", delta: -5, note: "AKIL SAĞLIĞI SARSILIYOR" },
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

    n_kapipanel: {
      cost: 1,
      noiseGate: [{ min: 80, once: "enc2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "Kod paneli soluk yeşil ışıkla bekliyor. Dört hane." },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_radyo", cancel: "n_platform" },
    },

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
        { type: "stat", stat: "akil", delta: -15, note: "AKIL SAĞLIĞI SARSILIYOR" },
        { type: "note", id: "nt_kesinti", title: "Hat Koptu", text: "Duydular beni. Yüzey duydu. Ve buradaki şey de duydu. Kabloyu kesti — düşünerek, bilerek. Bunlar hayvan değil. Hâlâ düşünüyorlar." },
        { type: "objective", text: "Radyo odasından çık. K-5'e ulaş. Yardım gelmiyor." },
        { type: "pause", ms: 800 },
        { type: "system", text: "PROTOTİP SONU — K-5: YAŞAM DESTEK yazılacak" },
      ],
    },
  },
  start: "n_k5_giris",
  nodes: {
    /* ========================================================
       BÖLÜM II: K-5 YAŞAM DESTEK (OKSİJEN VE LABORATUVAR)
       ======================================================== */
    n_k5_giris: {
      checkpoint: true,
      cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-5 YAŞAM DESTEK ÜNİTESİ — YEREL SAAT 04:12" },
        { type: "objective", text: "Ana yaşam koridorunu geç ve Nevin'in laboratuvarına ulaş." },
        { type: "pause", ms: 600 },
        { type: "narrate", text: "Radyo odasından can havliyle kaçıp kendini K-5'in sızdırmaz hidrolik kapısından içeri atıyorsun. Arkandaki metal kapı tıslayarak kapanıyor ama burası da güvenli değil. Havalandırma peteklerinden yeşilimsi, ağır bir gaz sızıyor." },
        { type: "pause", ms: 700 },
        { type: "ambient", text: "Tavan panellerinin içinden geçen kalın pleksiglas borulardan koyu renkli, organik bir sıvının pompalandığını görüyorsun." },
        { type: "stat", stat: "akil", delta: -5, note: "KLİMA SESİ AKLI ZORLUYOR" }
      ],
      choices: [
        { id: "koridor", text: "Ana tıbbi koridora doğru ilerle", next: "n_k5_koridor" },
        { id: "filtre", text: "Hemen yandaki hava filtre kabinini incele", next: "n_k5_filtre", if: { flag: "filtreKontrol", equals: false } }
      ]
    },

    n_k5_filtre: {
      cost: 3,
      events: [
        { type: "flag", set: { filtreKontrol: true } },
        { type: "narrate", text: "Kabin kapağını zorlayarak açıyorsun. Filtre kartuşları çürümüş organik bir dokuyla kaplanmış, adeta nefes alıyorlar. Buradaki gazı temizlemek imkansız. Ancak panonun arkasındaki bir şemada elle çizilmiş bir acil durum notu görüyorsun." },
        {
          type: "document",
          doc: {
            id: "d_filtrasyon",
            title: "Protokol Dışı Gaz Salınımı",
            meta: "K-5 İÇ NOT · KİŞİSELLEŞTİRİLMİŞ",
            body: "Filtreler yetmiyor. \nLaboratuvardan salınan şey gaz değil, bir tür hücresel aerosol. \n\nEğer ana karantina valfini kapatmak isterseniz sıralama hayati: \nÖnce Basınç (B), sonra Tahliye (T). \nTersini yaparsanız içerideki her şey dışarı püskürür.\n\nKodu laboratuvarın camına yazdım. N."
          }
        },
        { type: "note", id: "nt_filtre", title: "Nevin'in Notu", text: "Nevin bir şeyleri kapatmaya çalışmış. 'Önce Basınç, sonra Tahliye'. Kodu laboratuvar camına kazıdığını söylüyor." }
      ],
      choices: [{ id: "geri", text: "Tıbbi koridora geri dön", next: "n_k5_koridor" }]
    },

    n_k5_koridor: {
      checkpoint: true,
      cost: 2,
      noiseGate: [{ min: 60, once: "enc_k5", node: "n_k5_pusu" }],
      events: [
        { type: "narrate", text: "Uzun, beyaz laminat kaplı koridordasın. Yerlerde kırılmış sedyeler ve kurumuş kan izleri var. Koridorun sonundaki kalın cam bölmenin arkası Nevin'in laboratuvarı. Camın üzerinde içeriden kanla yazılmış devasa rakamlar parlıyor: '93▮▮'. Son iki hane aşağıdaki gölgelerin içinde kalmış." }
      ],
      choices: [
        { id: "yaklas", text: "Laboratuvar kapısına yaklaş ve kod panelini incele", next: "n_k5_lab_kapi" },
        { id: "oda1", text: "Yandaki Dekontaminasyon Odası'na gir", next: "n_k5_dekon", if: { flag: "dekonArandi", equals: false } },
        { id: "nefes", text: "Ağırlaşan gaz yüzünden dinlen — ciğerlerini rahatlat", next: "n_k5_nefes_al", ifStat: { stat: "gurultu", gte: 30 } }
      ]
    },

    n_k5_nefes_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "Bir köşeye çöküp yakandaki temiz hava maskesi kalıntısını yüzüne bastırıyorsun. Kalp atışlarını yavaşlatırken koridorun tavanındaki havalandırma boşluklarından gelen tırnak seslerini dinliyorsun. Sesler yavaşça uzaklaşıyor." },
        { type: "stat", stat: "gurultu", delta: -30, note: "GÜRÜLTÜ AZALDI" }
      ],
      choices: [{ id: "kalk", text: "Ayağa kalk", next: "n_k5_koridor" }]
    },

    /* --- BÖLÜM II DİNAMİK GÜRÜLTÜ ETKİNLİĞİ --- */
    n_k5_pusu: {
      cost: 2,
      events: [
        { type: "narrate", text: "Metal bir parça yere düşüyor. Koridorun tavanındaki büyük havalandırma menfezi büyük bir gürültüyle aşağı fırlıyor. İçinden, insan uzuvlarına benzeyen ama çok daha uzun ve eklemleri ters dönmüş bir silüet koridorun ortasına düşüyor!" },
        { type: "glitch", ms: 600 },
        { type: "system", text: "HIZLI REAKSİYON GEREKLİ — ZAMAN DARALIYOR" }
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "dekon_kos", text: "Soldaki Dekontaminasyon kabinine kendini fırlat", next: "n_k5_pusu_kurtul" },
        { id: "don", text: "Gözlerini kapat ve duvara yaslan", next: "n_k5_olum_pusu", default: true }
      ]
    },

    n_k5_pusu_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kabine dalıp ağır kurşun kapıyı üzerine çekiyorsun. Şey, dışarıdan kapının camına tüm gövdesiyle vuruyor. Cam çatlıyor ama kırılmıyor. Yaratık, içerideki dezenfektan kimyasallarının kokusundan rahatsız olup koridorun derinliklerine doğru sürüklenerek uzaklaşıyor." },
        { type: "stat", stat: "akil", delta: -15, note: "TRAVMATİK AN" },
        { type: "stat", stat: "gurultu", delta: -20, note: "İZİNİ KAYBETTİRDİN" }
      ],
      choices: [{ id: "cik", text: "Kabinden dikkatlice çık", next: "n_k5_koridor" }]
    },

    n_k5_olum_pusu: {
      death: true,
      cost: 0,
      deathText: "Kör olmak, av olmanı engellemedi.",
      events: [
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Duvara sinip bekliyorsun. Ters dönmüş eklemlerin üzerindeki o çıplak, ıslak ayak sesleri tam önünde duruyor. Şeyin sıcak ve asidik nefesini yüzünde hissediyorsun. Son duyduğun şey, etinin yırtılma sesi oluyor." }
      ]
    },

    /* --- DEKONTAMİNASYON ODASI VE KODUN DEVAMI --- */
    n_k5_dekon: {
      cost: 4,
      events: [
        { type: "flag", set: { dekonArandi: true } },
        { type: "narrate", text: "Oda darmadağın. Devrilmiş kimyasal varillerinin arasında bir ceset duruyor; bu Nevin'in asistanı Tolga. Elinde sıkıca tuttuğu bir terminal ekranı var. Ekranda son hatanın logları kalmış." },
        { type: "battery", spares: 1 },
        {
          type: "document",
          doc: {
            id: "d_tolga_log",
            title: "Terminal Hata Raporu #09",
            meta: "SİSTEM GÜNLÜĞÜ",
            body: "K-5 Ana Giriş Kilidi: PASİF\nLaboratuvarda Karantina: AKTİF\n\nNevin içeride kaldı. Kapıyı kilitlerken kodun son iki hanesini kendi doğum yılı yaptı (1984'ün son iki hanesi?). \n\nTanrım, havalandırmadan sesler geliyor. Geliyorlar."
          }
        },
        { type: "note", id: "nt_tolga", title: "Doğum Yılı", text: "Tolga not düşmüş: '84'ün son iki hanesi'. Camdaki kod 93 ile başlıyordu. Şifre netleşti: 9384." }
      ],
      choices: [{ id: "don", text: "Koridora geri dön", next: "n_k5_koridor" }]
    },

    /* --- LABORATUVAR GİRİŞİ VE ETKİLEŞİM --- */
    n_k5_lab_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Laboratuvarın çelik kapısının önündesin. Elektronik tuş takımı mavi bir ışıkla parazitli şekilde yanıp sönüyor. Kod girilmeyi bekliyor." }
      ],
      interaction: { kind: "keypad", code: "9384", success: "n_k5_lab_iceri", cancel: "n_k5_koridor" }
    },

    /* --- LABORATUVAR İÇİ VE FİNAL SEÇİM --- */
    n_k5_lab_iceri: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "system", text: "KONTROL SAĞLANDI — LABORATUVAR BÖLGESİ" },
        { type: "narrate", text: "İçerisi zifiri karanlık ve soğuk. Tıbbi cihazların bip sesleri yankılanıyor. Odanın ortasında, büyük bir cam fanusun içinde Konteyner 7'den çıkarılan organik numune duruyor: Devasa, siyah bir tümör gibi sürekli genişleyip daralan bir doku. Nevin masada cansız yatıyor. Elindeki enjektör boş." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Masanın üzerindeki ana konsolda iki büyük vana duruyor: BASINÇ (B) ve TAHLİYE (T). Filtre odasındaki notu hatırlıyorsun. Gaz sızıntısını tamamen kesmek için doğru etkileşim şart." }
      ],
      choices: [
        { id: "dogru_sira", text: "Önce BASINÇ (B) vanasını çevir, sonra TAHLİYE (T)'yi aktif et", next: "n_k5_basari" },
        { id: "yanlis_sira", text: "Önce TAHLİYE (T) şalterini kaldır", next: "n_k5_olum_gaz" }
      ]
    },

    n_k5_olum_gaz: {
      death: true,
      cost: 0,
      deathText: "Sıralama hatası mutlak sonu getirdi.",
      events: [
        { type: "glitch", ms: 1000 },
        { type: "narrate", text: "Tahliye şalterini indirdiğin an laboratuvardaki tüm yüksek basınç tersine dönüyor. Cam fanus büyük bir patlamayla infilak ediyor. Konsantre aerosol gazı doğrudan ciğerlerine doluyor. Birkaç saniye içinde kendi hücrelerinin mutasyona uğradığını hissederek bilincini kaybediyorsun." }
      ]
    },

    n_k5_basari: {
      checkpoint: true,
      ending: true,
      cost: 0,
      events: [
        { type: "system", text: "FİLTRASYON SENKRONİZASYONU BAŞARILI — K-5 KARANTİNA KİLİTLERİ AÇILIYOR" },
        { type: "narrate", text: "Büyük bir hidrolik tıslamasıyla koridordaki yeşil gaz çekilmeye başlıyor. Fanusun içindeki organik doku büzülerek hareket etmeyi bırakıyor. Laboratuvarın arka tarafındaki gizli bir zemin kapağı ağır ağır yukarı doğru açılıyor: K-4 Asansör Boşluğu." },
        { type: "pause", ms: 900 },
        { type: "ambient", text: "Aşağıdaki derin boşluktan devasa bir asansör kabininin yukarı doğru tırmanma sesi geliyor. Yalnız değilsin. Şeyler yukarı çıkıyor." },
        { type: "stat", stat: "akil", delta: -10, note: "KORKU DERİNLEŞİYOR" },
        { type: "objective", text: "Asansör boşluğuna atla. K-4 Kazı Sahası ve Çekirdek Merkezine in. Geri dönüş yok." },
        { type: "pause", ms: 800 },
        { type: "system", text: "BÖLÜM II SONU — BÖLÜM III (K-4: ARKEOLOJİK ÇEKİRDEK) YÜKLENİYOR..." }
      ]
    }
  },
};

const STAT_MAX = { gurultu: 100, akil: 100 };
const BATTERY_START = 42;
const SPARES_START = 0;
const INITIAL_STATS = { gurultu: 0, akil: 100 };
const INITIAL_FLAGS = {
  odaArandi: false, platformGoruldu: false, platformArandi: false,
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false, kilerAcik: false,
  enc1: false, enc2: false,
};
const LIGHTS_INIT = [false, false, true, false, false];
const DOC_LINES_PER_PAGE = 14;
const SPEED_OPTIONS = [
  { label: "YAVAŞ", mult: 1.5 },
  { label: "NORMAL", mult: 1 },
  { label: "HIZLI", mult: 0.45 },
];
const BLACKOUT_MS = 6000;
const BLACKOUT_HOLD_MS = 1300;

const batteryColorOf = (lvl) => {
  if (lvl <= 20) return "#c23b2e";
  const t = Math.min(1, (lvl - 20) / 80);
  return "hsl(" + Math.round(10 + t * 100) + ", 42%, 46%)";
};

// %15 altında bazı kelimeleri karart (deterministik)
const obscureText = (text) => {
  let h = 0;
  return text.split(" ").map((w, i) => {
    h = (h + w.length * 31 + i * 7) % 11;
    if (w.length > 2 && h < 3) return "█".repeat(Math.min(w.length, 6));
    return w;
  }).join(" ");
};

// Akıl düştükçe metin bozulur
const INTRUSIONS = ["izliyor", "duyuyor", "aşağıda", "hâlâ orada", "aç"];
const wordHash = (w, i) => {
  let h = i * 13;
  for (let k = 0; k < w.length; k++) h = (h * 31 + w.charCodeAt(k)) % 9973;
  return h;
};
const corruptText = (text, akil) => {
  if (akil > 60) return text;
  const heavy = akil <= 40;
  return text.split(" ").map((w, i) => {
    const h = wordHash(w, i);
    if (heavy && w.length > 3 && h % 19 === 7) return INTRUSIONS[h % INTRUSIONS.length];
    if (w.length > 3 && h % 9 === 4) {
      const a = w.split("");
      const t = a[1]; a[1] = a[2]; a[2] = t;
      return a.join("");
    }
    return w;
  }).join(" ");
};

const paginateDoc = (body) => {
  const linesArr = body.split("\n");
  const pages = [];
  for (let i = 0; i < linesArr.length; i += DOC_LINES_PER_PAGE) {
    pages.push(linesArr.slice(i, i + DOC_LINES_PER_PAGE).join("\n"));
  }
  return pages.length ? pages : [body];
};

export default function Sinir1V7() {
  const [mode, setMode] = useState("menu"); // menu | warning | game
  const [gameExists, setGameExists] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);

  const [lines, setLines] = useState([]);
  const [stats, setStats] = useState({ ...INITIAL_STATS });
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
  const [typing, setTyping] = useState(false);
  const [screen, setScreen] = useState(null);
  const [settingsFrom, setSettingsFrom] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [docPage, setDocPage] = useState(0);
  const [interaction, setInteraction] = useState(null);
  // ayarlar
  const [speedIdx, setSpeedIdx] = useState(1);
  const [glitchFx, setGlitchFx] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  // keypad
  const [kpEntry, setKpEntry] = useState("");
  const [kpMsg, setKpMsg] = useState(null);
  const [kpFails, setKpFails] = useState(0);
  // radio
  const [radioFreq, setRadioFreq] = useState(425.0);
  const [radioPhase, setRadioPhase] = useState("tune");
  // lights
  const [lights, setLights] = useState([...LIGHTS_INIT]);
  const [lightsDone, setLightsDone] = useState(false);
  // valve / lever / fuse
  const [valveDeg, setValveDeg] = useState(0);
  const [leverProg, setLeverProg] = useState(0);
  const [fuseMarker, setFuseMarker] = useState(0);
  const [fuseHits, setFuseHits] = useState(0);
  const [fuseMsg, setFuseMsg] = useState(null);
  const [mechDone, setMechDone] = useState(false);
  // breath
  const [breath, setBreath] = useState(null); // {t, lung, holding, phase}
  // blackout (güç kaybı)
  const [blackout, setBlackout] = useState(null); // {hasSpare}
  const [boCount, setBoCount] = useState(BLACKOUT_MS);
  const [boHold, setBoHold] = useState(0);

  const runIdRef = useRef(0);
  const skipRef = useRef(false);
  const statsRef = useRef({ ...INITIAL_STATS });
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
  const speedMultRef = useRef(1);
  const glitchFxRef = useRef(true);
  const blackoutResolveRef = useRef(null);
  const blackoutIntRef = useRef(null);
  const boHoldingRef = useRef(false);
  const leverIntRef = useRef(null);
  const leverHoldingRef = useRef(false);
  const fuseIntRef = useRef(null);
  const breathIntRef = useRef(null);
  const breathHoldingRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimeLeft(null);
  };
  const clearIntervals = () => {
    [blackoutIntRef, leverIntRef, fuseIntRef, breathIntRef].forEach((r) => {
      if (r.current) { clearInterval(r.current); r.current = null; }
    });
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
        else later(tick, Math.max(6, Math.round(speed * speedMultRef.current)));
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
  const statOk = (cond) => {
    if (!cond) return true;
    const v = statsRef.current[cond.stat] || 0;
    if (cond.gte !== undefined && v < cond.gte) return false;
    if (cond.lte !== undefined && v > cond.lte) return false;
    return true;
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
    AudioSys.blipSfx(740);
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const glitchBurst = (ms) => {
    AudioSys.burst(ms);
    if (!glitchFxRef.current) return;
    setGlitching(true);
    later(() => setGlitching(false), ms);
  };

  const runGlitch = async (ms) => {
    AudioSys.burst(Math.min(ms, 400));
    if (!glitchFxRef.current) return hardWait(Math.min(ms, 300));
    setGlitching(true);
    await hardWait(ms);
    setGlitching(false);
  };

  /* ---- GÜÇ KAYBI (blackout) ---- */
  const startBlackout = (hasSpare) =>
    new Promise((resolve) => {
      blackoutResolveRef.current = () => { blackoutResolveRef.current = null; resolve(); };
      boHoldingRef.current = false;
      setBoHold(0);
      const total = hasSpare ? BLACKOUT_MS : 2000;
      setBoCount(total);
      setBlackout({ hasSpare });
      AudioSys.heart(430);
      let left = total;
      let hold = 0;
      blackoutIntRef.current = setInterval(() => {
        left -= 50;
        if (hasSpare && boHoldingRef.current) {
          hold += 50;
          setBoHold(Math.min(1, hold / BLACKOUT_HOLD_MS));
          if (hold >= BLACKOUT_HOLD_MS) {
            clearInterval(blackoutIntRef.current);
            blackoutIntRef.current = null;
            setSparesBoth(sparesRef.current - 1);
            setBatteryBoth(100);
            setBlackout(null);
            showToast("⚡", "Pil Değiştirildi · %100", "#7fae86");
            if (blackoutResolveRef.current) blackoutResolveRef.current();
            return;
          }
        } else if (hasSpare) {
          hold = Math.max(0, hold - 90);
          setBoHold(Math.min(1, hold / BLACKOUT_HOLD_MS));
        }
        setBoCount(left);
        if (left <= 0) {
          clearInterval(blackoutIntRef.current);
          blackoutIntRef.current = null;
          setBlackout(null);
          die({
            text: hasSpare
              ? "Pil elindeydi. Karanlık daha hızlıydı."
              : "Ekran sönüyor. Karanlık, beklediği şeyi sonunda alıyor. Bu derinlikte ışıksız kalmak, çoktan ölmüş olmaktır.",
            battery: true,
          });
        }
      }, 50);
    });

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
        if (ev.note) return typeLine(ev.noteKind || "alert", "⚠ " + ev.note, runId, 14);
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
        const avail = node.choices.filter((c) => flagOk(c.if) && statOk(c.ifStat));
        const def = avail.find((c) => c.default) || avail[avail.length - 1];
        handleChoice(def, true);
      } else {
        setTimeLeft({ left, total });
      }
    }, 100);
  };

  const die = (payload) => {
    AudioSys.boom();
    AudioSys.heart(null);
    setDying(true);
    later(() => setDeath(payload), 2000);
  };

  const playNode = useCallback(async (nodeId) => {
    const runId = ++runIdRef.current;
    const node = STORY.nodes[nodeId];
    if (!node) return;

    // GÜRÜLTÜ KAPISI — pusular
    if (node.noiseGate) {
      const gates = node.noiseGate.slice().sort((a, b) => b.min - a.min);
      for (const g of gates) {
        if ((statsRef.current.gurultu || 0) >= g.min && !flagsRef.current[g.once]) {
          setFlagsBoth({ [g.once]: true });
          return playNode(g.node);
        }
      }
    }

    setCurrentNodeId(nodeId);
    setChoicesVisible(false);
    setInteraction(null);
    clearTimer();

    if (node.cost) {
      const left = batteryRef.current - node.cost;
      if (left <= 0) {
        setBatteryBoth(0);
        await startBlackout(sparesRef.current > 0);
        if (runIdRef.current !== runId) return;
        AudioSys.heart(null);
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
      const k = node.interaction.kind;
      if (k === "keypad") { setKpEntry(""); setKpMsg(null); setKpFails(0); }
      if (k === "radio") { setRadioFreq(425.0); setRadioPhase("tune"); }
      if (k === "lights") { setLights([...LIGHTS_INIT]); setLightsDone(false); }
      if (k === "valve") { setValveDeg(0); setMechDone(false); }
      if (k === "lever") { setLeverProg(0); setMechDone(false); leverHoldingRef.current = false; }
      if (k === "fuse") { setFuseHits(0); setFuseMsg(null); setMechDone(false); }
      if (k === "breath") { breathHoldingRef.current = false; setBreath({ t: 0, lung: 0, holding: false, phase: "wait" }); }
      setInteraction({ ...node.interaction });
      return;
    }
    setChoicesVisible(true);
    if (node.timer) startTimer(node);
  }, []);

  const handleChoice = (choice, auto = false) => {
    if (!choice) return;
    AudioSys.blipSfx(520);
    clearTimer();
    setChoicesVisible(false);
    clockRef.current += 1 + Math.floor(Math.random() * 3);
    setLines((ls) => [...ls, { kind: "choice", text: (auto ? "· · · " : "» ") + choice.text }]);
    playNode(choice.next);
  };

  const handleSkipTap = () => { if (!screen && !interaction && !blackout) skipRef.current = true; };

  const swapBattery = () => {
    if (sparesRef.current <= 0 || batteryRef.current >= 100 || death || dying || blackout) return;
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
    AudioSys.blipSfx(620);
    setKpMsg(null);
    setKpEntry(kpEntry + d);
  };
  const kpClear = () => { setKpEntry(""); setKpMsg(null); AudioSys.blipSfx(440); };
  const kpSubmit = () => {
    if (kpEntry.length < 4 || !interaction) return;
    if (kpEntry === interaction.code) {
      AudioSys.blipSfx(980);
      setKpMsg({ text: "KOD KABUL EDİLDİ", ok: true });
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 900);
    } else {
      const fails = kpFails + 1;
      setKpFails(fails);
      setKpEntry("");
      AudioSys.buzzSfx();
      glitchBurst(250);
      if (fails === 3) {
        statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + 10) };
        setStats({ ...statsRef.current });
        setKpMsg({ text: "HATALI KOD — PANEL BİPLİYOR. GÜRÜLTÜ ARTTI.", ok: false });
      } else {
        setKpMsg({ text: "HATALI KOD", ok: false });
      }
    }
  };
  const interactionCancel = () => {
    if (!interaction) return;
    const target = interaction.cancel;
    setInteraction(null);
    setLines((ls) => [...ls, { kind: "choice", text: "» Uzaklaş" }]);
    playNode(target);
  };

  /* ---- RADYO ---- */
  const radioAdjust = (delta) => {
    if (radioPhase !== "tune" || !interaction) return;
    AudioSys.blipSfx(340);
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

  /* ---- IŞIK DEVRESİ ---- */
  const lightsPress = (i) => {
    if (lightsDone || !interaction) return;
    AudioSys.blipSfx(560);
    const next = lights.slice();
    [i - 1, i, i + 1].forEach((j) => {
      if (j >= 0 && j < next.length) next[j] = !next[j];
    });
    setLights(next);
    if (next.every(Boolean)) {
      setLightsDone(true);
      AudioSys.blipSfx(980);
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 1000);
    }
  };
  const lightsReset = () => { if (!lightsDone) { setLights([...LIGHTS_INIT]); AudioSys.blipSfx(440); } };

  /* ---- VANA ---- */
  const valveTurn = () => {
    if (mechDone || !interaction) return;
    AudioSys.clank();
    const step = 360 / interaction.turns;
    const next = valveDeg + step;
    setValveDeg(next);
    if (next >= 360) {
      setMechDone(true);
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 800);
    }
  };

  /* ---- ŞALTER (basılı tut) ---- */
  const leverDown = () => {
    if (mechDone || !interaction) return;
    leverHoldingRef.current = true;
    if (leverIntRef.current) return;
    leverIntRef.current = setInterval(() => {
      setLeverProg((p) => {
        let next = p;
        if (leverHoldingRef.current) next = Math.min(1, p + 50 / (interaction.holdMs || 1800));
        else next = Math.max(0, p - 0.05);
        if (next >= 1) {
          clearInterval(leverIntRef.current);
          leverIntRef.current = null;
          setMechDone(true);
          AudioSys.clank();
          const target = interaction.success;
          later(() => { setInteraction(null); playNode(target); }, 700);
        }
        return next;
      });
    }, 50);
  };
  const leverUp = () => { leverHoldingRef.current = false; };

  /* ---- SİGORTA (zamanlama) ---- */
  useEffect(() => {
    if (interaction?.kind !== "fuse") {
      if (fuseIntRef.current) { clearInterval(fuseIntRef.current); fuseIntRef.current = null; }
      return;
    }
    let dir = 1, pos = 0;
    fuseIntRef.current = setInterval(() => {
      pos += dir * 2.4;
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      setFuseMarker(pos);
    }, 20);
    return () => { if (fuseIntRef.current) { clearInterval(fuseIntRef.current); fuseIntRef.current = null; } };
  }, [interaction]);

  const fuseTap = () => {
    if (mechDone || !interaction) return;
    const inZone = fuseMarker >= 40 && fuseMarker <= 60;
    if (inZone) {
      AudioSys.blipSfx(880);
      const next = fuseHits + 1;
      setFuseHits(next);
      setFuseMsg({ text: "OTURDU (" + next + "/" + interaction.hits + ")", ok: true });
      if (next >= interaction.hits) {
        setMechDone(true);
        const target = interaction.success;
        later(() => { setInteraction(null); playNode(target); }, 800);
      }
    } else {
      AudioSys.buzzSfx();
      glitchBurst(180);
      statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + 4) };
      setStats({ ...statsRef.current });
      setFuseMsg({ text: "KIVILCIM! — GÜRÜLTÜ +4", ok: false });
    }
  };

  /* ---- NEFES TUTMA ---- */
  useEffect(() => {
    if (interaction?.kind !== "breath") {
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      return;
    }
    const holdMs = interaction.holdMs || 7000;
    const lungMs = interaction.lungMs || 9500;
    const failTo = interaction.fail;
    const okTo = interaction.success;
    AudioSys.heart(520);
    let t = 0, lung = 0, resolved = false;
    const finish = (target) => {
      if (resolved) return;
      resolved = true;
      clearInterval(breathIntRef.current);
      breathIntRef.current = null;
      AudioSys.heart(null);
      setInteraction(null);
      setBreath(null);
      playNode(target);
    };
    breathIntRef.current = setInterval(() => {
      t += 60;
      const holding = breathHoldingRef.current;
      if (holding) lung += 60;
      const phase = t >= holdMs ? "release" : holding ? "hold" : "wait";
      setBreath({ t, lung, holding, phase });
      // hiç basmadan 2 sn geçti → nefesin duyuldu
      if (!holding && t < holdMs && t > 2000 && lung === 0) return finish(failTo);
      // ciğer patladı
      if (lung >= lungMs) return finish(failTo);
    }, 60);
    return () => {
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      AudioSys.heart(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interaction]);

  const breathDown = () => { breathHoldingRef.current = true; };
  const breathUp = () => {
    breathHoldingRef.current = false;
    if (!breath || !interaction || interaction.kind !== "breath") return;
    const holdMs = interaction.holdMs || 7000;
    if (breath.lung === 0) return; // hiç basılmamıştı
    if (breath.t >= holdMs) {
      // güvenli bırakış
      const target = interaction.success;
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      AudioSys.heart(null);
      setInteraction(null);
      setBreath(null);
      playNode(target);
    } else {
      // erken bıraktın
      const target = interaction.fail;
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      AudioSys.heart(null);
      setInteraction(null);
      setBreath(null);
      playNode(target);
    }
  };

  const respawn = () => {
    const cp = checkpointRef.current;
    setDeath(null);
    setDying(false);
    setBlackout(null);
    clearIntervals();
    if (blackoutResolveRef.current) blackoutResolveRef.current();
    clearPending();
    AudioSys.heart(null);
    if (!cp) return startFresh();
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
    setScreen(null);
    setLines([{ kind: "system", text: "SON KONTROL NOKTASINDAN DEVAM EDİLİYOR..." }]);
    playNode(cp.nodeId);
  };

  const startFresh = () => {
    clearPending();
    clearTimer();
    clearIntervals();
    setDeath(null);
    setDying(false);
    setBlackout(null);
    if (blackoutResolveRef.current) blackoutResolveRef.current();
    setEnded(false);
    statsRef.current = { ...INITIAL_STATS };
    setStats({ ...INITIAL_STATS });
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
    setBreath(null);
    clockRef.current = 227;
    checkpointRef.current = null;
    setScreen(null);
    setOpenItem(null);
    setLines([]);
    setGameExists(true);
    setMode("game");
    AudioSys.init().then(() => AudioSys.ambient(true));
    playNode(STORY.start);
  };

  const resumeGame = () => {
    setMode("game");
    AudioSys.init().then(() => AudioSys.ambient(true));
  };

  const applySpeed = (idx) => {
    setSpeedIdx(idx);
    speedMultRef.current = SPEED_OPTIONS[idx].mult;
  };
  const applyGlitchFx = (on) => {
    setGlitchFx(on);
    glitchFxRef.current = on;
    if (!on) setGlitching(false);
  };
  const applySound = (on) => {
    setSoundOn(on);
    AudioSys.setEnabled(on);
  };

  /* Ses durumları */
  useEffect(() => {
    if (mode !== "game") { AudioSys.ambient(false); AudioSys.heart(null); return; }
    AudioSys.ambient(true);
  }, [mode]);

  useEffect(() => {
    // kalp atışı: kriz seviyeleri
    if (mode !== "game" || death || blackout || interaction?.kind === "breath") return;
    if (battery > 0 && battery <= 8) AudioSys.heart(620);
    else if (battery > 0 && battery <= 15) AudioSys.heart(880);
    else AudioSys.heart(null);
  }, [battery, mode, death, blackout, interaction]);

  useEffect(() => {
    // radyo statiği
    if (interaction?.kind === "radio") {
      const lvl = radioPhase === "cut" ? 0.005
        : radioPhase === "lock" ? 0.006
        : 0.008 + (1 - radioSignal / 100) * 0.045;
      AudioSys.staticLevel(lvl);
    } else {
      AudioSys.staticLevel(0);
    }
  }, [interaction, radioFreq, radioPhase, radioSignal]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, choicesVisible, timeLeft]);

  useEffect(() => () => {
    clearPending(); clearTimer(); clearIntervals();
    AudioSys.heart(null); AudioSys.ambient(false); AudioSys.staticLevel(0);
  }, []);

  const node = currentNodeId ? STORY.nodes[currentNodeId] : null;
  const gurultuPct = Math.round(((stats.gurultu || 0) / (STAT_MAX.gurultu || 100)) * 100);
  const akil = stats.akil !== undefined ? stats.akil : 100;
  const bColor = batteryColorOf(battery);
  const S = styles;
  void flags;

  const visibleChoices = (node?.choices || []).filter((c) => flagOk(c.if) && statOk(c.ifStat));

  const dimOpacity = battery > 40 ? 0 : battery > 15 ? 0.2 : battery > 5 ? 0.42 : 0.58;
  const wordsObscured = battery <= 15;
  const choicesObscured = battery <= 5;
  const flickering = battery > 0 && battery <= 12 && !blackout;

  const docPages = openItem?.kind === "doc" ? paginateDoc(openItem.item.body) : [];

  /* ================= ANA MENÜ ================= */
  if (mode === "menu") {
    return (
      <div style={S.menuRoot}>
        <style>{css}</style>
        <div style={S.menuVignette} />
        <div style={S.menuInner}>
          <div style={S.menuTitle}>SINIR<span style={{ color: "#5a8a6a" }}>-</span>1</div>
          <div style={S.menuSub}>DERİNLİK: 214 M</div>
          <div style={S.mmButtons}>
            {gameExists && (
              <button className="s1-btn s1-mm" style={S.mmBtn} onClick={resumeGame}>
                Devam Et
              </button>
            )}
            <button className="s1-btn s1-mm" style={S.mmBtn}
              onClick={() => {
                if (gameExists && !confirmNew) { setConfirmNew(true); return; }
                setConfirmNew(false);
                AudioSys.init();
                setMode("warning");
              }}>
              {gameExists && confirmNew ? "Emin misin? — İlerleme silinir" : "Yeni Oyun"}
            </button>
            <button className="s1-btn s1-mm" style={S.mmBtn}
              onClick={() => { setSettingsFrom("mainmenu"); setScreen("settings"); }}>
              Ayarlar
            </button>
            <button className="s1-btn s1-mm" style={S.mmBtn} onClick={() => setScreen("credits")}>
              Hakkında
            </button>
          </div>
        </div>

        {screen === "settings" && renderSettings()}
        {screen === "credits" && (
          <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
            <div style={S.menuPanel} className="s1-panel">
              <div style={S.listTitle}>SINIR-1</div>
              <div style={S.creditsText}>
                Metin tabanlı korku prototipi.{"\n"}Karadeniz'in dibinde, ölümün çalışmadığı yerde.{"\n\n"}Tasarım & Hikaye: Sahip
              </div>
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={() => setScreen(null)}>Kapat</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ================= UYARI EKRANI ================= */
  if (mode === "warning") {
    return (
      <div style={S.warnRoot}>
        <style>{css}</style>
        <div style={S.warnBody}>
          <p style={S.warnText}>
            SINIR-1 yoğun gerilim, şiddet ve rahatsız edici temalar içerir. Lütfen keyfini çıkarın.
          </p>
          <p style={S.warnText}>
            SINIR-1 su altı araştırma tesisinde gece bakım vardiyasındaki teknisyensin. Yüzeyle bağlantı üç saat önce kesildi ve tesiste bir şeyler korkunç derecede yanlış. Elinde yalnızca çatlak ekranlı bakım tabletin var: ışığın, kaydın ve tek dostun. Hayatta kalabildiğin kadar kal. Her şeyi belgele. Savaşçı değilsin; bu derinlikte hayatta kalmanın tek yolu koşmak, saklanmak ya da ölmek.
          </p>
        </div>
        <button className="s1-btn s1-mm" style={S.warnContinue} onClick={startFresh}>
          Devam Et
        </button>
      </div>
    );
  }

  /* ================= OYUN ================= */
  return (
    <div style={S.root} onPointerDown={handleSkipTap}>
      <style>{css}</style>

      <div style={S.gameLayer} className={glitching ? "s1-glitch" : flickering ? "s1-flicker" : ""}>
        {/* ÜST BAR */}
        <div style={S.header}>
          <div style={S.headerLeft}>
            <button className="s1-btn" style={S.gearBtn} title="Menü"
              onClick={(e) => { e.stopPropagation(); setScreen("pause"); }}>
              ⚙
            </button>
            <span style={S.stationTag}>SINIR-1</span>
            <span style={S.sectorTag}>K-6</span>
          </div>
          <div style={S.headerRight}>
            <div style={S.gaugeCol}>
              <div style={S.gauge}>
                <span style={S.statLabel}>GÜRÜLTÜ</span>
                <div style={S.statTrack}>
                  <div style={{ ...S.statFill, width: gurultuPct + "%", backgroundColor: gurultuPct > 50 ? "#b8503f" : "#7a8c46" }} />
                </div>
              </div>
              <div style={S.gauge}>
                <span style={S.statLabel}>AKIL</span>
                <div style={S.statTrack}>
                  <div style={{ ...S.statFill, width: akil + "%", backgroundColor: akil > 60 ? "#6a8fae" : akil > 40 ? "#c79a52" : "#b8503f" }} />
                </div>
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
            <button className="s1-btn" style={S.archiveBtn}
              onClick={(e) => { e.stopPropagation(); setScreen("menu"); setOpenItem(null); }}>
              ARŞİV
            </button>
          </div>
        </div>

        {/* AKIŞ */}
        <div ref={scrollRef} style={S.stream}>
          {lines.map((l, i) => {
            let txt = l.text;
            if ((l.kind === "narrate" || l.kind === "ambient")) {
              txt = corruptText(txt, akil);
              if (wordsObscured) txt = obscureText(txt);
            }
            return (
              <p key={i} style={S.lineBase[l.kind] || S.lineBase.narrate} className="s1-line">
                {txt}
                {i === lines.length - 1 && typing && <span className="s1-cursor">▌</span>}
              </p>
            );
          })}

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
              {visibleChoices.map((c, idx) => {
                const locked = c.requireFlags && !c.requireFlags.every((f) => flagsRef.current[f]);
                const activeCount = c.requireFlags ? c.requireFlags.filter((f) => flagsRef.current[f]).length : 0;
                const hidden = choicesObscured && !locked && idx % 2 === 1;
                return (
                  <button key={c.id} className={"s1-btn" + (locked ? "" : " s1-choice")}
                    style={locked ? S.choiceLocked : S.choiceBtn}
                    onClick={(e) => { e.stopPropagation(); if (!locked) handleChoice(c); }}>
                    {locked
                      ? (c.lockText || c.text) + " (" + activeCount + "/" + c.requireFlags.length + ")"
                      : hidden ? "[ ??? ]" : c.text}
                  </button>
                );
              })}
            </div>
          )}

          {ended && (
            <div style={S.endWrap}>
              <div style={S.endTitle}>HAYATTASIN</div>
              <div style={S.endText}>
                Şimdilik. — Döküman: {docs.length} · Not: {notes.length} · Batarya: %{battery} · Yedek pil: {spares} · Akıl: %{akil}
              </div>
              <button className="s1-btn" style={S.beginBtn} onClick={(e) => { e.stopPropagation(); startFresh(); }}>
                BAŞTAN OYNA
              </button>
            </div>
          )}
          <div style={{ height: 40 }} />
        </div>
      </div>

      {/* PİL = IŞIK: kararma */}
      {dimOpacity > 0 && (
        <div style={{ ...S.dimLayer, backgroundColor: "rgba(0,0,0," + dimOpacity + ")" }} />
      )}

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
            <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={interactionCancel}>Vazgeç</button>
          </div>
        </div>
      )}

      {/* ============ RADYO ============ */}
      {interaction?.kind === "radio" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.radioPanel} className={"s1-panel" + (radioPhase === "cut" && glitchFx ? " s1-glitch" : "")}>
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

      {/* ============ IŞIK DEVRESİ ============ */}
      {interaction?.kind === "lights" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.keypadPanel} className="s1-panel">
            <div style={S.keypadTitle}>DEVRE PANELİ — TÜM LAMBALARI YAK</div>
            <div style={S.lightsRow}>
              {lights.map((on, i) => (
                <div key={i} style={{
                  ...S.lamp,
                  backgroundColor: on ? "#e8d98a" : "#161610",
                  boxShadow: on ? "0 0 14px rgba(232,217,138,0.7)" : "inset 0 0 6px rgba(0,0,0,0.8)",
                }} />
              ))}
            </div>
            <div style={S.lightsHintText}>Her buton kendisiyle birlikte komşularını da değiştirir.</div>
            <div style={S.lightsRow}>
              {lights.map((_, i) => (
                <button key={i} className="s1-btn s1-key" style={S.lightBtn} onClick={() => lightsPress(i)}>
                  {i + 1}
                </button>
              ))}
            </div>
            {lightsDone && <div style={S.radioLockText}>DEVRE TAMAM — KİLİT AÇILIYOR…</div>}
            <div style={{ display: "flex", gap: 14 }}>
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={lightsReset}>Sıfırla</button>
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={interactionCancel}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ VANA ============ */}
      {interaction?.kind === "valve" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.keypadPanel} className="s1-panel">
            <div style={S.keypadTitle}>POMPA A — VANAYI ÇEVİR</div>
            <div style={S.valveWrap}>
              <div style={{ ...S.valveWheel, transform: "rotate(" + valveDeg + "deg)" }}>
                <div style={S.valveSpokeV} />
                <div style={S.valveSpokeH} />
                <div style={S.valveHub} />
              </div>
            </div>
            <div style={S.mechProgTrack}>
              <div style={{ ...S.mechProgFill, width: Math.min(100, (valveDeg / 360) * 100) + "%" }} />
            </div>
            <button className="s1-btn s1-key" style={S.bigActionBtn} onClick={valveTurn}>
              {mechDone ? "AÇILDI ✓" : "ÇEVİR"}
            </button>
            {!mechDone && (
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={interactionCancel}>Vazgeç</button>
            )}
          </div>
        </div>
      )}

      {/* ============ ŞALTER ============ */}
      {interaction?.kind === "lever" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.keypadPanel} className="s1-panel">
            <div style={S.keypadTitle}>POMPA B — ŞALTERİ KALDIR</div>
            <div style={S.leverTrack}>
              <div style={{ ...S.leverArm, bottom: (leverProg * 72) + "%" }} />
            </div>
            <div style={S.mechProgTrack}>
              <div style={{ ...S.mechProgFill, width: (leverProg * 100) + "%" }} />
            </div>
            <button className="s1-btn s1-key" style={S.bigActionBtn}
              onPointerDown={leverDown} onPointerUp={leverUp} onPointerLeave={leverUp} onPointerCancel={leverUp}>
              {mechDone ? "KALKTI ✓" : "BASILI TUT"}
            </button>
            <div style={S.lightsHintText}>Bırakırsan kol geri kayar.</div>
            {!mechDone && (
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={interactionCancel}>Vazgeç</button>
            )}
          </div>
        </div>
      )}

      {/* ============ SİGORTA ============ */}
      {interaction?.kind === "fuse" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.keypadPanel} className="s1-panel">
            <div style={S.keypadTitle}>POMPA C — SİGORTAYI HİZALA</div>
            <div style={S.fuseTrack}>
              <div style={S.fuseZone} />
              <div style={{ ...S.fuseMarkerEl, left: "calc(" + fuseMarker + "% - 2px)" }} />
            </div>
            {fuseMsg && (
              <div style={{ ...S.keypadMsg, color: fuseMsg.ok ? "#7fae86" : "#c23b2e" }}>{fuseMsg.text}</div>
            )}
            <button className="s1-btn s1-key" style={S.bigActionBtn} onClick={fuseTap}>
              {mechDone ? "OTURDU ✓" : "TAK (" + fuseHits + "/" + (interaction.hits || 2) + ")"}
            </button>
            <div style={S.lightsHintText}>Yeşil bölge dışında basarsan kıvılcım çıkar — gürültü artar.</div>
            {!mechDone && (
              <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={interactionCancel}>Vazgeç</button>
            )}
          </div>
        </div>
      )}

      {/* ============ NEFES TUTMA ============ */}
      {interaction?.kind === "breath" && breath && (
        <div style={S.breathOverlay}
          onPointerDown={(e) => { e.stopPropagation(); breathDown(); }}
          onPointerUp={(e) => { e.stopPropagation(); breathUp(); }}
          onPointerCancel={(e) => { e.stopPropagation(); breathUp(); }}>
          <div style={S.breathTitle}>
            {breath.phase === "release" ? "UZAKLAŞIYOR — YAVAŞÇA BIRAK" : "NEFESİNİ TUT"}
          </div>
          <div style={S.breathPhaseText}>
            {breath.t < 2500 ? "Islak adımlar odada dolanıyor…"
              : breath.t < 5000 ? "Tam masanın yanında durdu."
              : breath.t < 7000 ? "Nefesi ensende. Eğiliyor."
              : "Doğruldu. Kapıya yöneliyor…"}
          </div>
          <div style={S.breathBars}>
            <div style={S.breathBarBlock}>
              <span style={S.statLabel}>TEHLİKE</span>
              <div style={S.mechProgTrack}>
                <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.t / (interaction.holdMs || 7000)) * 100) + "%", backgroundColor: "#7fae86" }} />
              </div>
            </div>
            <div style={S.breathBarBlock}>
              <span style={S.statLabel}>CİĞER</span>
              <div style={S.mechProgTrack}>
                <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.lung / (interaction.lungMs || 9500)) * 100) + "%", backgroundColor: "#c23b2e" }} />
              </div>
            </div>
          </div>
          <div style={S.breathHint}>
            {breath.holding ? "" : breath.phase === "wait" ? "EKRANA BAS VE TUTMAYA BAŞLA — ÇABUK" : ""}
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
                    setDocPage(0);
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

      {/* DÖKÜMAN: SAYFALI */}
      {openItem?.kind === "doc" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.docPaper} className="s1-paper">
            <div style={S.docPaperMeta}>{openItem.item.meta}</div>
            <div style={S.docPaperBody}>{docPages[docPage]}</div>
            <div style={S.docNav}>
              <button className="s1-btn" style={{ ...S.docArrow, visibility: docPage > 0 ? "visible" : "hidden" }}
                onClick={() => setDocPage(docPage - 1)}>
                ‹
              </button>
              <button className="s1-btn s1-menuitem" style={S.paperBackDark} onClick={() => setOpenItem(null)}>
                Kapat
              </button>
              <button className="s1-btn" style={{ ...S.docArrow, visibility: docPage < docPages.length - 1 ? "visible" : "hidden" }}
                onClick={() => setDocPage(docPage + 1)}>
                ›
              </button>
            </div>
            {docPages.length > 1 && (
              <div style={S.docPageInfo}>{docPage + 1} / {docPages.length}</div>
            )}
          </div>
        </div>
      )}

      {/* ÇARK MENÜSÜ */}
      {screen === "pause" && (
        <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
          <div style={S.menuPanel} className="s1-panel">
            <div style={S.listTitle}>MENÜ</div>
            <div style={S.menuButtons}>
              <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={() => setScreen(null)}>Devam Et</button>
              <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={respawn}>Son Kayıttan Devam Et</button>
              <button className="s1-btn s1-menuitem" style={S.menuItem}
                onClick={() => { setSettingsFrom("pause"); setScreen("settings"); }}>
                Ayarlar
              </button>
              <button className="s1-btn s1-menuitem" style={S.menuItem}
                onClick={() => { setScreen(null); setMode("menu"); }}>
                Ana Menüye Dön
              </button>
            </div>
            <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={() => setScreen(null)}>Kapat</button>
          </div>
        </div>
      )}

      {screen === "settings" && renderSettings()}

      {/* ============ GÜÇ KAYBI — SİMSİYAH + GERİ SAYIM ============ */}
      {blackout && (
        <div style={S.blackoutOverlay} className="s1-blackflash"
          onPointerDown={(e) => { e.stopPropagation(); if (blackout.hasSpare) boHoldingRef.current = true; }}
          onPointerUp={(e) => { e.stopPropagation(); boHoldingRef.current = false; }}
          onPointerCancel={(e) => { e.stopPropagation(); boHoldingRef.current = false; }}>
          <div style={S.blackoutTitle}>GÜÇ KAYBI</div>
          {blackout.hasSpare ? (
            <>
              <div style={S.blackoutText}>
                Zifiri karanlık. Parmakların cebindeki yedek pili buluyor — şimdi tak.
              </div>
              <div style={S.boCountTrack}>
                <div style={{ ...S.boCountFill, width: Math.max(0, (boCount / BLACKOUT_MS) * 100) + "%" }} />
              </div>
              <div style={S.boHoldBtn}>
                <div style={{ ...S.boHoldFill, width: (boHold * 100) + "%" }} />
                <span style={S.boHoldText}>PİLİ TAK — BASILI TUT (×{spares})</span>
              </div>
            </>
          ) : (
            <div style={S.blackoutText}>Cebinde boşluktan başka bir şey yok.</div>
          )}
        </div>
      )}

      {/* ÖLÜM */}
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

  function renderSettings() {
    return (
      <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
        <div style={S.menuPanel} className="s1-panel">
          <div style={S.listTitle}>AYARLAR</div>
          <div style={S.settingsBlock}>
            <div style={S.settingsLabel}>YAZI HIZI</div>
            <div style={S.segRow}>
              {SPEED_OPTIONS.map((opt, i) => (
                <button key={opt.label} className="s1-btn"
                  style={i === speedIdx ? S.segActive : S.segBtn}
                  onClick={() => applySpeed(i)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div style={S.settingsBlock}>
            <div style={S.settingsLabel}>GLITCH EFEKTLERİ</div>
            <div style={S.segRow}>
              <button className="s1-btn" style={glitchFx ? S.segActive : S.segBtn} onClick={() => applyGlitchFx(true)}>AÇIK</button>
              <button className="s1-btn" style={!glitchFx ? S.segActive : S.segBtn} onClick={() => applyGlitchFx(false)}>KAPALI</button>
            </div>
          </div>
          <div style={S.settingsBlock}>
            <div style={S.settingsLabel}>SES</div>
            <div style={S.segRow}>
              <button className="s1-btn" style={soundOn ? S.segActive : S.segBtn} onClick={() => applySound(true)}>AÇIK</button>
              <button className="s1-btn" style={!soundOn ? S.segActive : S.segBtn} onClick={() => applySound(false)}>KAPALI</button>
            </div>
          </div>
          <button className="s1-btn s1-menuitem" style={S.menuClose}
            onClick={() => setScreen(settingsFrom === "pause" ? "pause" : null)}>
            Geri
          </button>
        </div>
      </div>
    );
  }
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

  menuRoot: {
    position: "fixed", inset: 0, overflow: "hidden", userSelect: "none",
    backgroundColor: "#050b07",
    backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(30,70,45,0.5) 0%, rgba(5,11,7,0) 55%), radial-gradient(ellipse at 75% 70%, rgba(18,45,30,0.45) 0%, rgba(5,11,7,0) 50%)",
  },
  menuVignette: {
    position: "absolute", inset: 0, pointerEvents: "none",
    boxShadow: "inset 0 0 22vmax 8vmax rgba(0,0,0,0.92)",
  },
  menuInner: {
    position: "relative", height: "100%", display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center", gap: 8,
  },
  menuTitle: { fontFamily: mono, fontSize: 46, letterSpacing: "0.3em", color: "#dceade", fontWeight: 700, textShadow: "0 0 20px rgba(90,180,120,0.3)" },
  menuSub: { fontFamily: mono, fontSize: 10, letterSpacing: "0.25em", color: "#4d6e58", marginBottom: 30 },
  mmButtons: { display: "flex", flexDirection: "column", gap: 20, alignItems: "center" },
  mmBtn: {
    fontFamily: mono, fontSize: 19, fontWeight: 700, letterSpacing: "0.22em",
    color: "#eef4ee", backgroundColor: "transparent", border: "1px solid transparent",
    borderRadius: 999, padding: "10px 30px", cursor: "pointer",
    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
  },

  warnRoot: {
    position: "fixed", inset: 0, backgroundColor: "#070a08",
    backgroundImage: "radial-gradient(ellipse at 60% 20%, rgba(28,42,34,0.5) 0%, rgba(7,10,8,0) 55%)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", padding: "0 30px", userSelect: "none", gap: 40,
  },
  warnBody: { maxWidth: 560, display: "flex", flexDirection: "column", gap: 26 },
  warnText: {
    fontFamily: mono, fontSize: 14.5, lineHeight: 1.85, color: "#c9d4c9",
    letterSpacing: "0.04em", margin: 0, textShadow: "0 1px 3px rgba(0,0,0,0.9)",
  },
  warnContinue: {
    fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: "0.2em",
    color: "#eef4ee", backgroundColor: "rgba(0,0,0,0.45)",
    border: "1px solid #4a5c4e", borderRadius: 999, padding: "10px 34px", cursor: "pointer",
  },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px", borderBottom: "1px solid #10201f",
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", flexShrink: 0, gap: 8,
  },
  headerLeft: { display: "flex", gap: 8, alignItems: "center" },
  gearBtn: {
    fontFamily: mono, fontSize: 17, color: "#8ba3a0", backgroundColor: "transparent",
    border: "1px solid #1b3234", borderRadius: 3, padding: "4px 10px", cursor: "pointer", lineHeight: 1.2,
  },
  stationTag: { color: "#d7e4e0", fontWeight: 700 },
  sectorTag: { color: "#4d6b6e" },
  headerRight: { display: "flex", gap: 10, alignItems: "center" },
  gaugeCol: { display: "flex", flexDirection: "column", gap: 4 },
  gauge: { display: "flex", gap: 5, alignItems: "center", justifyContent: "flex-end" },
  statLabel: { color: "#4d6b6e", fontSize: 8, fontFamily: mono, letterSpacing: "0.12em" },
  statTrack: { width: 44, height: 4, backgroundColor: "#0c1718", borderRadius: 2, overflow: "hidden" },
  statFill: { height: "100%", transitionProperty: "width", transitionDuration: "500ms" },

  batteryWrap: {
    display: "flex", alignItems: "center", gap: 2, backgroundColor: "transparent",
    border: "none", padding: "4px 2px", cursor: "pointer",
  },
  batteryShell: {
    width: 34, height: 14, border: "1px solid #7d7a68", borderRadius: 3,
    padding: 2, backgroundColor: "rgba(0,0,0,0.5)",
  },
  batteryFill: {
    height: "100%", borderRadius: 1,
    transitionProperty: "width, background-color", transitionDuration: "600ms",
  },
  batteryCap: { width: 3, height: 7, backgroundColor: "#7d7a68", borderRadius: "0 2px 2px 0" },
  spareText: { fontFamily: mono, fontSize: 11, marginLeft: 4, letterSpacing: "0.05em" },

  archiveBtn: {
    fontFamily: mono, fontSize: 10, letterSpacing: "0.1em",
    padding: "8px 10px", backgroundColor: "transparent", color: "#8ba3a0",
    border: "1px solid #1b3234", borderRadius: 3, cursor: "pointer",
  },

  dimLayer: { position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none", transitionProperty: "background-color", transitionDuration: "800ms" },

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

  lightsRow: { display: "flex", gap: 12, justifyContent: "center" },
  lamp: {
    width: 26, height: 26, borderRadius: "50%",
    border: "2px solid #3a3a2a",
    transitionProperty: "background-color, box-shadow", transitionDuration: "250ms",
  },
  lightBtn: {
    fontFamily: mono, fontSize: 14, width: 42, padding: "12px 0",
    backgroundColor: "rgba(13,26,25,0.8)", color: "#b9d4cc",
    border: "1px solid #1d3a36", borderRadius: 6, cursor: "pointer",
  },
  lightsHintText: { fontFamily: mono, fontSize: 10, color: "#5a6e62", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.7 },

  /* Vana */
  valveWrap: { padding: 6 },
  valveWheel: {
    width: 110, height: 110, borderRadius: "50%",
    border: "8px solid #5a4f3a", position: "relative",
    transitionProperty: "transform", transitionDuration: "250ms",
    boxShadow: "inset 0 0 18px rgba(0,0,0,0.7)",
  },
  valveSpokeV: { position: "absolute", left: "50%", top: 0, bottom: 0, width: 6, marginLeft: -3, backgroundColor: "#5a4f3a" },
  valveSpokeH: { position: "absolute", top: "50%", left: 0, right: 0, height: 6, marginTop: -3, backgroundColor: "#5a4f3a" },
  valveHub: { position: "absolute", left: "50%", top: "50%", width: 22, height: 22, margin: "-11px 0 0 -11px", borderRadius: "50%", backgroundColor: "#3a3428", border: "2px solid #6b5f46" },

  /* Şalter */
  leverTrack: {
    width: 34, height: 130, borderRadius: 17,
    backgroundColor: "#0c1210", border: "1px solid #2a3830",
    position: "relative", overflow: "hidden",
  },
  leverArm: {
    position: "absolute", left: 4, right: 4, height: 30, borderRadius: 13,
    backgroundColor: "#7d7a68", boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
    transitionProperty: "bottom", transitionDuration: "80ms",
  },

  /* Sigorta */
  fuseTrack: {
    width: "100%", height: 26, borderRadius: 6, position: "relative",
    backgroundColor: "#0c1210", border: "1px solid #2a3830", overflow: "hidden",
  },
  fuseZone: {
    position: "absolute", left: "40%", width: "20%", top: 0, bottom: 0,
    backgroundColor: "rgba(127,174,134,0.25)", borderLeft: "1px solid #7fae86", borderRight: "1px solid #7fae86",
  },
  fuseMarkerEl: {
    position: "absolute", top: 0, bottom: 0, width: 4,
    backgroundColor: "#e8d98a", boxShadow: "0 0 8px rgba(232,217,138,0.8)",
  },

  mechProgTrack: { width: "100%", height: 6, backgroundColor: "#0c1210", borderRadius: 3, overflow: "hidden" },
  mechProgFill: { height: "100%", backgroundColor: "#7fae86", transitionProperty: "width", transitionDuration: "100ms" },
  bigActionBtn: {
    fontFamily: mono, fontSize: 15, letterSpacing: "0.15em", width: "100%",
    padding: "16px 0", backgroundColor: "rgba(13,26,25,0.9)", color: "#d7e4e0",
    border: "1px solid #2a4a44", borderRadius: 8, cursor: "pointer",
    touchAction: "none",
  },

  /* Nefes */
  breathOverlay: {
    position: "fixed", inset: 0, zIndex: 22,
    backgroundColor: "rgba(2,3,3,0.94)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 22, padding: "0 30px", textAlign: "center",
    cursor: "pointer", touchAction: "none",
  },
  breathTitle: { fontFamily: mono, fontSize: 17, letterSpacing: "0.25em", color: "#c9d4c9" },
  breathPhaseText: { fontFamily: serif, fontStyle: "italic", fontSize: 15, color: "#7a8c88", minHeight: 24 },
  breathBars: { display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 340 },
  breathBarBlock: { display: "flex", flexDirection: "column", gap: 5, alignItems: "stretch" },
  breathHint: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c05a48", minHeight: 16 },

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
  creditsText: {
    fontFamily: mono, fontSize: 12, lineHeight: 2, color: "#9aa393",
    letterSpacing: "0.08em", textAlign: "center", whiteSpace: "pre-wrap",
  },

  settingsBlock: { display: "flex", flexDirection: "column", gap: 10, alignItems: "center" },
  settingsLabel: { fontFamily: mono, fontSize: 11, letterSpacing: "0.25em", color: "#6e7a6a" },
  segRow: { display: "flex", gap: 10 },
  segBtn: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "9px 16px",
    backgroundColor: "transparent", color: "#7d8878",
    border: "1px solid #26302a", borderRadius: 999, cursor: "pointer",
  },
  segActive: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "9px 16px",
    backgroundColor: "rgba(40,60,48,0.5)", color: "#dbe8dc",
    border: "1px solid #4a6a54", borderRadius: 999, cursor: "pointer",
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
    width: "100%", maxWidth: 480, height: "min(84vh, 640px)",
    backgroundColor: "#edeadf",
    boxShadow: "0 10px 50px rgba(0,0,0,0.95)",
    padding: "30px 30px 14px", display: "flex", flexDirection: "column",
    overflow: "hidden",
  },
  docPaperMeta: { fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", color: "#6b675a", marginBottom: 16, flexShrink: 0 },
  docPaperBody: { fontFamily: mono, fontSize: 13.5, lineHeight: 1.8, color: "#2e2c26", whiteSpace: "pre-wrap", flex: 1, overflow: "hidden" },
  docNav: { display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginTop: 10, flexShrink: 0 },
  docArrow: {
    fontFamily: mono, fontSize: 24, lineHeight: 1, padding: "4px 14px",
    backgroundColor: "transparent", color: "#4a463a",
    border: "none", cursor: "pointer",
  },
  docPageInfo: { fontFamily: mono, fontSize: 10, color: "#8a8574", textAlign: "center", marginTop: 4, flexShrink: 0 },
  paperBackDark: {
    fontFamily: mono, fontSize: 12,
    letterSpacing: "0.3em", padding: "8px 20px", backgroundColor: "transparent",
    color: "#6b675a", border: "1px solid #b9b4a2", borderRadius: 999, cursor: "pointer",
  },

  blackoutOverlay: {
    position: "fixed", inset: 0, zIndex: 26,
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 20, padding: "0 34px", textAlign: "center",
    cursor: "pointer", touchAction: "none",
  },
  blackoutTitle: { fontFamily: mono, fontSize: 18, letterSpacing: "0.3em", color: "#6b3a34" },
  blackoutText: { fontFamily: serif, fontStyle: "italic", fontSize: 14, color: "#6a6a60", maxWidth: 340, lineHeight: 1.8 },
  boCountTrack: { width: "100%", maxWidth: 300, height: 5, backgroundColor: "#151008", borderRadius: 3, overflow: "hidden" },
  boCountFill: { height: "100%", backgroundColor: "#c23b2e" },
  boHoldBtn: {
    position: "relative", width: "100%", maxWidth: 300, height: 62,
    border: "1px solid #4a3a2e", borderRadius: 8, overflow: "hidden",
    backgroundColor: "rgba(20,14,8,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  boHoldFill: {
    position: "absolute", left: 0, top: 0, bottom: 0,
    backgroundColor: "rgba(127,174,134,0.3)",
  },
  boHoldText: { position: "relative", fontFamily: mono, fontSize: 12, letterSpacing: "0.15em", color: "#c9b89a" },

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
  @keyframes s1-flickerAnim {
    0% { opacity: 1; } 78% { opacity: 1; }
    80% { opacity: 0.55; } 82% { opacity: 1; }
    88% { opacity: 0.75; } 89% { opacity: 1; }
    94% { opacity: 0.5; } 95.5% { opacity: 1; }
    100% { opacity: 1; }
  }
  @keyframes s1-blackflashAnim {
    0% { background-color: rgba(1,1,1,0.985); }
    72% { background-color: rgba(1,1,1,0.985); }
    76% { background-color: rgba(3,6,7,0.82); }
    80% { background-color: rgba(1,1,1,0.985); }
    100% { background-color: rgba(1,1,1,0.985); }
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
  .s1-flicker { animation-name: s1-flickerAnim; animation-duration: 2.6s; animation-timing-function: steps(1); animation-iteration-count: infinite; }
  .s1-blackflash { animation-name: s1-blackflashAnim; animation-duration: 1.5s; animation-timing-function: steps(1); animation-iteration-count: infinite; }
  .s1-dying { animation-name: s1-closein; animation-duration: 2s; animation-timing-function: ease-in; animation-fill-mode: forwards; }
  .s1-btn { -webkit-tap-highlight-color: transparent; }
  .s1-btn:active { transform: translateY(1px); }
  .s1-mm:hover { border-color: #7a9a84 !important; background-color: rgba(20,35,26,0.5) !important; }
  .s1-choice:hover { border-color: #3a6165 !important; background-color: rgba(20,40,42,0.8) !important; }
  .s1-key:hover { border-color: #3a6155 !important; }
  .s1-menuitem:hover { border-color: #4a4a38 !important; }
  .s1-row:hover { background-color: rgba(30,30,22,0.5) !important; }
  @media (prefers-reduced-motion: reduce) {
    .s1-cursor, .s1-line, .s1-death, .s1-critical, .s1-objective, .s1-toast, .s1-panel, .s1-paper, .s1-glitch, .s1-flicker, .s1-blackflash, .s1-dying {
      animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    }
  }
`;