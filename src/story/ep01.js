/* ============================================================
   SINIR-1 — BÖLÜM 01: "K-6 / GECE VARDİYASI" (GÜNCELLENMİŞ v2 - DÜZELTİLDİ)
   Tüm haklar saklıdır. Bölüm 2 geçiş kilidi düzeltilmiştir.
   ============================================================ */

export const EP01 = {
  start: "n_uyanis",
  nodes: {
    n_uyanis: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-6 MAKİNE DAİRESİ — YEREL SAAT 03:47" },
        { type: "objective", text: "Kaçış kapsüllerine ulaşmak için yukarı tırman." },
        { type: "pause", ms: 600 },
        { type: "narrate", text: "Soğuk ve ıslak metal zeminde gözlerini açıyorsun. Etraf zifiri karanlık; yalnızca ileride, kapının altındaki aralıktan sızan soluk bir ışık var." },
        { type: "pause", ms: 700 },
        { type: "ambient", text: "Gövdenin derinliklerinden boğuk, derinden gelen paslı bir dalış kıyafetinin sürtünme sesi ve ıslak bir inilti yükseliyor." },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Doğrulmaya çalışırken ağır kapının kolu dışarıdan zorlanıyor. Bir kez. İki kez. İçeride kimsenin olmaması gerekiyormuş gibi." },
      ],
      choices: [
        { id: "saklan", text: "Masanın altına gir ve saklan (İnleyen'den kaç)", next: "n_saklan" },
        { id: "kapi", text: "Kapıyı tutmaya çalış", next: "n_olum_kapi" },
        { id: "kal", text: "Olduğun yerde kal, nefesini tut", next: "n_hareketsiz" },
      ],
    },

    n_olum_kapi: {
      death: true, cost: 0,
      deathText: "İnleyen'in gücü, üzerindeki ağır dalış başlığı kadar paslı ve ağırdı.",
      events: [
        { type: "narrate", text: "Karanlıkta kapıya atılıyorsun, omzunu metale dayıyorsun. Kol bir kez daha dönüyor — sonra kapı büyük bir güçle içeri kırılıyor." },
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Menteşeler sökülüyor. Üzerine eğilen şey devasa, sızdıran paslı bir dalış kıyafeti. İçinden insan dışı, gramersiz bir inilti fırlıyor." },
      ],
    },

    /* --- NEFES TUTMA (İNLEYEN YÜZLEŞMESİ) --- */
    n_saklan: {
      cost: 3,
      events: [
        { type: "narrate", text: "Masanın altına giriyorsun ve tabletini göğsüne bastırıyorsun. Kapı ağır bir gıcırtıyla açılıyor. Islak, devasa, metalik adımlar odaya sızıyor." },
        { type: "system", text: "NEFESİNİ TUT — BASILI TUT VE BIRAKMA" },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_saklan2", fail: "n_olum_nefes" },
    },

    n_saklan2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Paslı basıç kıyafetinin içinden gelen o ıslak nefes tam başının üzerinde duruyor. Sonra adımlar ağır ağır uzaklaşıyor. Havayı titreyerek bırakıyorsun." },
        { type: "stat", stat: "akil", delta: -5, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "cik", text: "Masanın altından çık", next: "n_tablet" }],
    },

    n_olum_nefes: {
      death: true, cost: 0,
      deathText: "Ciğerlerindeki son hava, İnleyen'in paslı başlığına çarparak söndü.",
      events: [
        { type: "glitch", ms: 700 },
        { type: "narrate", text: "Nefesin göğsünden bir yabancı gibi kaçıyor. Islak adımlar anında duruyor. Masa, üzerindeki çelik levhalarla birlikte tek bir hamlede kenara fırlatılıyor." },
      ],
    },

    n_hareketsiz: {
      cost: 3,
      events: [
        { type: "narrate", text: "Kımıldamıyorsun. Kapı açılıyor. İçeri giren o devasa, ıslak siluet seni karanlıkta seçemiyor — ama geri çekilirken dirseğin yerdeki yağ tenekesine çarpıyor." },
        { type: "stat", stat: "gurultu", delta: 20, note: "GÜRÜLTÜ SEVİYESİ ARTTI" },
        { type: "flag", set: { isaretlendin: true } },
        { type: "glitch", ms: 600 },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "İnleyen donakalıyor. Sana doğru ağır bir adım atıyor... ancak tam o sırada üst katlardan gelen mekanik bir tıkırtıyla başını kaldırıp koridora geri dönüyor." },
      ],
      choices: [{ id: "kalk", text: "Ayağa kalk", next: "n_tablet" }],
    },

    n_tablet: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Masanın üzerinde bakım tabletin duruyor — ekranı çatlak ama çalışıyor. Bu derinlikte sana ait olan tek şey." },
        { type: "note", id: "nt_inleyen", title: "İnleyen (Kerem)", text: "O odadaki şey... ilk uzun maruziyet dalgıcı Kerem'di. Dalış kıyafetinin içinde ne kaldığını kimse bilmiyor. Aile bile ondan korkup buraya, en dibe sürgün etmiş." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Etrafta kurulmuş ama tamamen çürümüş bir yemek sofrası duruyor. Duvara asılı vardiya çizelgesi dün tarihli, ama üzeri anlamsız harflerle doldurulmuş. Revir köşesinde ise Aile'ye katılmayı reddeden Baturay'ın cansız bedeni var." },
      ],
      choices: [
        { id: "ara", text: "Odayı ve Baturay'ın üstünü ara", next: "n_arama", if: { flag: "odaArandi", equals: false } },
        { id: "menfez", text: "Havalandırma menfezini sök", next: "n_menfez" },
      ],
    },

    n_arama: {
      cost: 5,
      events: [
        { type: "flag", set: { odaArandi: true } },
        { type: "narrate", text: "Baturay'ın ceplerini karıştırıyorsun. Elinde buruşuk bir İSG tutanağı kalıyor. Ayrıca göğüs cebinde şifreli bir kartvizit var, üzerinde '21...' yazıyor. Devamı kanla silinmiş." },
        { type: "battery", spares: 1 },
        { type: "pause", ms: 700 },
        {
          type: "document",
          doc: {
            id: "d_isg",
            title: "İSG İhlal Tutanağı — K-2 Ambarı",
            meta: "SINIR-1 İDARİ KAYIT · VARDİYA 214-G",
            body: "SINIR-1 ARAŞTIRMA TESİSİ\nİSG İHLAL TUTANAĞI\n\nİlgili: K-2 Arkeoloji Ambarı, Konteyner 7.\n\nKonteyner 7'nin mühürleri, karantina protokolü tamamlanmadan İstasyon Şefi'nin sözlü talimatıyla açılmıştır. Numunenin korunma durumu, gömülme yaşıyla (tahminî 7.400 year) uyumlu DEĞİLDİR.\n\nİmza: Baturay\nOnay: H. TEKİN\nNot: 'Gereği yok. Arşivle.'",
          },
        },
      ],
      choices: [{ id: "geri", text: "Havalandırma menfezini sök", next: "n_menfez" }],
    },

    n_menfez: {
      checkpoint: true, cost: 3,
      events: [
        { type: "narrate", text: "Menfezi söküp dar kanala tırmanıyorsun. Borulardan gelen ıslak nefes seslerini (`421.8` frekansı) dinleyerek K-6 üst platformuna ulaşıyorsun." },
        { type: "flag", set: { frekansIslakNefes: true } },
      ],
      choices: [{ id: "plat", text: "Platforma çık", next: "n_platform" }],
    },

    /* --- PLATFORM HUB --- */
    n_platform: {
      checkpoint: true, cost: 2,
      noiseGate: [{ min: 50, once: "enc1", node: "n_enc1" }],
      events: [
        { type: "narrate", text: "Geniş bir bakım platformu. Üç ana su pompası karanlıkta duruyor. Ortada ana kontrol paneli, solda elektrik dolabı, sağ dipte RADYO ODASI.", if: { flag: "platformGoruldu", equals: false } },
        { type: "objective", text: "Ana su hattını çalıştır — Tüm kuleye burada olduğunu duyuracaksın.", if: { flag: "platformGoruldu", equals: false } },
        { type: "narrate", text: "Platformdasın. İnleyen'in aşağıda bir yerlerde dolandığını biliyorsun. O buradayken Harun yukarıda bekliyor olmalı.", if: { flag: "platformGoruldu", equals: true } },
        { type: "flag", set: { platformGoruldu: true } },
      ],
      choices: [
        { id: "pa", text: "POMPA A'ya git — vanayı aç", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "POMPA B'ye git — şalteri kaldır", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "pc", text: "POMPA C'ye git — sigortayı tak", next: "n_pompaC", if: { flag: "pompaC", equals: false } },
        { id: "panel", text: "Ana kontrol paneline git", next: "n_anapanel", if: { flag: "gucAcik", equals: false } },
        { id: "elek", text: "Elektrik dolabını incele — devre paneli", next: "n_elektrik", if: { flag: "kilerAcik", equals: false } },
        { id: "ara", text: "Platformu ara", next: "n_platform_ara", if: { flag: "platformArandi", equals: false } },
        { id: "bekle", text: "Karanlıkta hareketsiz bekle — sesin dinsin", next: "n_bekle", ifStat: { stat: "gurultu", gte: 25 } },
        { id: "radyokapi", text: "Radyo odası kapısına git (kod paneli)", next: "n_kapipanel", if: { flag: "gucAcik", equals: true } },
      ],
    },

    n_bekle: {
      cost: 1,
      events: [
        { type: "narrate", text: "Bir köşeye çöküp bekliyorsun. İnleyen'in ağır dalış adımları uzaklaşıyor." },
        { type: "stat", stat: "gurultu", delta: -25, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_platform" }],
    },

    /* --- PUSULAR (İNLEYEN DEVRİYESİ) --- */
    n_enc1: {
      cost: 2,
      events: [
        { type: "narrate", text: "Platformda attığın gürültülü bir adım alt kattaki tüm inlemeleri kesiyor. İnleyen ses çıkarmayı bıraktı. Dinliyor." },
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Merdiven boşluğundan ıslak bir sürtünme sesi hızla yükseliyor. Üzerine geliyor!" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "sin", text: "Pompaların arasındaki gölgeye sin", next: "n_enc1_ok" },
        { id: "don", text: "Işığı kapatıp donakal", next: "n_olum_enc1", default: true },
      ],
    },

    n_enc1_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompaların arasına sıkışıyorsun. İnleyen korkuluğu aşıp az önce durduğun yeri kokluyor. Seni bulamadan merdivenlere geri süzülüyor." },
        { type: "stat", stat: "gurultu", delta: -15, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "d", text: "Gölgeden çık", next: "n_platform" }],
    },

    n_olum_enc1: {
      death: true, cost: 0,
      deathText: "İnleyen karanlıkta görmez, o sızan korkuyu koklar.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "Karanlıkta taş kesiliyorsun ama o devasa paslı başlık doğrudan üzerine dönüyor. Doğruca sana yürüyor." },
      ],
    },

    n_enc2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kod paneline uzanırken acil durum ışıkları uzaktan yakına doğru teker teker sönüyor. Karanlık seni sıkıştırıyor." },
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
        { type: "narrate", text: "Aşağı çöküyorsun. Karanlığın içinden geçen İnleyen, pompaların ritmini dinleyerek uzaklaşıyor." },
        { type: "stat", stat: "gurultu", delta: -20, note: "GÜRÜLTÜ AZALDI", noteKind: "system" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "d", text: "Kod paneline dön", next: "n_kapipanel" }],
    },

    n_olum_enc2: {
      death: true, cost: 0,
      deathText: "Kodu bitirmene izin vermediler.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "Hırsla tuşlara basıyorsun. Panelin yeşil ışığında arkandaki devasa vizörün yansımasını görüyorsun." },
      ],
    },

    /* --- POMPA ETKİLEŞİMLERİ --- */
    n_pompaA: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa A'nın vanası paslanmış. İki elinle kavrayıp asılıyorsun." },
        { type: "system", text: "VANAYI ÇEVİR — DOKUNARAK DÖNDÜR" },
      ],
      interaction: { kind: "valve", turns: 9, success: "n_pompaA2", cancel: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Vana teslim oluyor, borularda su gürlüyor. Pompa yeşile dönüyor." },
        { type: "flag", set: { pompaA: true } },
        { type: "system", text: "POMPA A: AKTİF ▮" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_pompaB: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa B'nin yanında devasa, ıslak bir el izi var. Şalteri kavrıyorsun." },
        { type: "glitch", ms: 500 },
        { type: "system", text: "ŞALTERİ KALDIR — BASILI TUT" },
      ],
      interaction: { kind: "lever", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Şalter oturuyor, lamba yeşile dönüyor." },
        { type: "flag", set: { pompaB: true } },
        { type: "system", text: "POMPA B: AKTİF ▮" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_pompaC: {
      cost: 4,
      events: [
        { type: "narrate", text: "Pompa C en dipte. Kapının çelik yüzeyine hırsla kazınmış bir şey görüyorsun: '...47. UNUTMA.'" },
        { type: "system", text: "SİGORTAYI TAK — İBRE YEŞİL BÖLGEDEYKEN BAS (2 KEZ)" },
      ],
      interaction: { kind: "fuse", hits: 2, success: "n_pompaC2", cancel: "n_platform" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sigorta oturuyor, Pompa C yeşile dönüyor. But çıkardığın ses İnleyen'i buraya çekti!" },
        { type: "flag", set: { pompaC: true } },
        { type: "system", text: "POMPA C: AKTİF ▮" },
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
        { type: "narrate", text: "Gövdeye yapışıyorsun. İnleyen platformu tarayıp tekrar aşağı iniyor." },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_olum_platform: {
      death: true, cost: 0,
      deathText: "Gürültüyle koşan her şey bu derinlikte av olur.",
      events: [
        { type: "glitch", ms: 800 },
        { type: "narrate", text: "Koşuyorsun, adımların davul gibi yankılanıyor ve önündeki karanlık anında katılaşıyor." },
      ],
    },

    n_platform_ara: {
      cost: 5,
      events: [
        { type: "flag", set: { platformArandi: true } },
        { type: "narrate", text: "Alet dolabından bir zimmet formu buluyorsun: RADYO ODASI (K-6 ÜST): 21▮▮. Son iki hane nemden okunmuyor. Baturay'ın kod yarısıyla (21...) birleşince kapı kodu netleşiyor: 2147." },
        { type: "battery", spares: 1 },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    n_elektrik: {
      cost: 2,
      events: [
        { type: "narrate", text: "Elektrik dolabını açıyorsun. Yağlı kalemle yazılmış: 'HEPSİNİ YAK. SIRAYLA DEĞİL, AKILLA.'" },
      ],
      interaction: { kind: "lights", success: "n_kiler", cancel: "n_platform" },
    },

    n_kiler: {
      cost: 1,
      events: [
        { type: "flag", set: { kilerAcik: true } },
        { type: "system", text: "DEVRE SENKRONİZE — MALZEME DOLABI AÇILDI" },
        { type: "narrate", text: "İçeriden D. Okur'un (Deniz) günlüğü çıkıyor: 'Gün 124: Bugün pompaları kapattım. Sebep yok. Sadece ne olacağını izlemek istedim.'" },
        { type: "battery", spares: 1 },
        { type: "stat", stat: "akil", delta: -5, note: "AKIL SAĞLIĞI SARSILIYOR" },
      ],
      choices: [{ id: "d", text: "Platforma dön", next: "n_platform" }],
    },

    /* --- ANA GÜÇ VE REAKSİYON --- */
    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ana kontrol paneli. Üç pompanın da hazır olmasını bekliyor." },
      ],
      interaction: {
        kind: "panel",
        title: "ANA KONTROL PANELİ — SU HATTI",
        rows: [
          { label: "POMPA A", flag: "pompaA" },
          { label: "POMPA B", flag: "pompaB" },
          { label: "POMPA C", flag: "pompaC" },
        ],
        require: ["pompaA", "pompaB", "pompaC"],
        success: "n_guc",
        cancel: "n_platform",
      },
    },

    n_guc: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Ana şalteri indiriyorsun. Üç pompa aynı anda gürlüyor! Kule sarsılıyor." },
        { type: "flag", set: { gucAcik: true } },
        { type: "system", text: "ANA SU HATTI: ÇEVRİMİÇİ — GÜRÜLTÜ MAKSİMUM" },
        { type: "stat", stat: "gurultu", delta: 25, note: "GÜRÜLTÜ SEVİYESİ ARTTI" },
        { type: "pause", ms: 500 },
        { type: "flag", set: { isaretlendin: true } },
        { type: "narrate", text: "Ve aniden, üst katlardaki hoparlörlerden hışırtılı, neşeli, genç bir erkek sesi yankılanıyor. Deniz Okur'un sesi:" },
        { type: "system", text: "ANONS (Deniz): \"Dikkat dikkat! Makine dairesinde ışık var. Yeni personelin oryantasyonunu ben yaparım. Aileye duyurulur...\"" },
        { type: "objective", text: "Radyo odasına gir, hemen!" },
      ],
      choices: [
        { id: "kapi", text: "Radyo odası kapısına git (Kod: 2147)", next: "n_kapipanel" },
        { id: "d", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_kapipanel: {
      cost: 1,
      noiseGate: [{ min: 80, once: "enc2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "Kod paneli yeşil ışıkla bekliyor. Dört hane istiyor." },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_radyo", cancel: "n_platform" },
    },

    /* --- RADYO ODASI VE ECE HATI --- */
    n_radyo: {
      checkpoint: true, cost: 2,
      events: [
        { type: "system", text: "KAPI AÇILDI — RADYO ODASI" },
        { type: "narrate", text: "Eski telsiz konsolunun başına oturuyorsun. Frekansı ayarlamaya çalışırken parazitlerin arasından bir child sesinin sayı saydığını işitiyorsun (`437.4` frekansı)." },
        { type: "flag", set: { frekansCocukSayimi: true } },
        { type: "objective", text: "Frekansı acil durum bandına (432.0) sabitle." },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_ece_baglanti" },
    },

    n_ece_baglanti: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kadran kilitleniyor. Cızırtıların arkasından titreyen, genç bir kadın sesi yükseliyor. Bu yüzey değil:" },
        { type: "system", text: "TELSİZ (Ece): \"Yüzey mi? Yüzey üç haftadır cevap vermiyor. Sen... sen normal misin? Sayı saymıyor musun? — Dinle. Işıkları kapat. Şef ışıkları görür. Ve o kata sakın—\"" },
      ],
      choices: [{ id: "devam", text: "Dinlemeye devam et", next: "n_kesinti" }],
    },

    n_kesinti: {
      checkpoint: true, cost: 0, // ending: true kaldırıldı!
      events: [
        { type: "glitch", ms: 1100 },
        { type: "narrate", text: "Telsiz pat diye kesiliyor. Deniz hattı yukarıdan kopardı: 'Yeni personelin oryantasyonunu ben yaparım demiştim!' sesi interkomdan gülüyor." },
        { type: "pause", ms: 900 },
        { type: "narrate", text: "K-5'e açılan hava kilidinin ağır çelik kapısı arkandan büyük bir basınçla kapanıyor. Kapak kilitlenirken hoparlör son bir kez cızlıyor." },
        { type: "pause", ms: 800 },
        { type: "system", text: "KAPAK HOPARLÖRÜ (Bir Çocuk Sesi): \"...altı... beş...\"" },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL SAĞLIĞI BÜYÜK DARBE ALDI" },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "ŞEF HARUN ARTIK SENİ DUYDU" },
        { type: "objective", text: "BÖLÜM SONU. K-5: YAŞAM DESTEK KATINA GEÇİLİYOR." },
      ],
      choices: [
        {
          id: "bolum2_gecis",
          text: "K-5 Yaşam Destek Katına İlerle",
          next: "n_k5_giris" // EP02 dosyanızdaki ilk/başlangıç düğümünün ID'si ile birebir aynı olmalıdır!
        }
      ]
    },
  },
};

export const EP01_FLAGS = {
  odaArandi: false, platformGoruldu: false, platformArandi: false,
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false, kilerAcik: false,
  enc1: false, enc2: false,
  isaretlendin: false,
  frekansIslakNefes: false,
  frekansCocukSayimi: false
};