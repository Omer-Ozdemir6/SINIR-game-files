/* ============================================================
   SINIR-1 — BÖLÜM 1 v2: "K-6 / GECE VARDİYASI" (LABİRENT DOKUMASI)
   Tasarım kuralları uygulanır: hedef söylenir YOL SÖYLENMEZ;
   kat bir mini haritadır; çıkmazlar, döngüler ve ölümcül yanlış
   yol vardır; yön bilgisi DÖKÜMANLARDADIR; kapılar geri dönüş
   ister (pompa C'nin sigortası DEPODA).

   K-6 HARİTASI:
   YATAKHANE ─ KORİDOR 6-A ┬ REVİR (çıkmaz, ödüllü)
                           ├ KANTİN ═(servis kapısı)═ DEPO   ← DÖNGÜ 1
                           └ KAVŞAK ┬ merdiven → PLATFORM → SİNTİNE → POMPA C
                                    ├ bakım geçidi → DEPO    ← DÖNGÜ 2
                                    ├ 6-B KORİDORU (güçle açılır) → RADYO
                                    └ ESKİ ASANSÖR (ÖLÜM — şaft boş)
   ============================================================ */

export const EP01 = {
  start: "n_uyanis",
  nodes: {

    /* ================= YATAKHANE ================= */

    n_uyanis: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k6" },
        { type: "system", text: "SINIR-1 BAKIM TABLETİ v2.3 — YENİDEN BAŞLATILIYOR…" },
        { type: "system", text: "SAAT: 03:47 · DERİNLİK: 214M · HARİCİ BAĞLANTI: YOK (3 SA 12 DK)" },
        { type: "pause", ms: 900 },
        { type: "system", text: "ATANMA: BAKIM TEKNİSYENİ · SİCİL YENİ · GÖREV: RUTİN DENETİM" },
        { type: "narrate", text: "Üç gün önce bir işe alım maili aldın: 'SINIR-1 araştırma istasyonu, bakım teknisyeni pozisyonu — bir önceki personel görevi bıraktı, acil ihtiyaç.' Maaş fazla iyiydi, sorular fazla azdı. Denizaltıyla indirildiğinde kimse seni karşılamadı. On bir aydır çalışan bir istasyon için burası fazla sessizdi." },
        { type: "narrate", text: "Seni uyandıran alarm değil. Alarmın SUSMASI. İlk gecen ve jeneratör çoktan susmuş; K-6'nın çelik sessizliği üstüne bir tabut kapağı gibi kapanıyor." },
        { type: "narrate", text: "Ranzadan doğruluyorsun. Acil aydınlatmanın kırmızısı dışında her şey karanlık. Elin, refleksle, sana verilen bakım tabletini buluyor. Çatlak ekran yüzüne soluk bir ışık vuruyor — şu an tüm dünyandaki tek ışık bu. Önceki teknisyenden kalma; kilit ekranında silinmemiş bir isim: 'B. Soylu'." },
        { type: "note", id: "not_uyanis", title: "İlk gece", text: "SINIR-1'e bakım teknisyeni olarak atandım — önceki personel 'görevi bırakmış'. İlk gecem ve jeneratör çoktan susmuş, alarm yok, yüzeyle bağlantı üç saattir kopuk. Kimse beni karşılamadı, kimse uyandırmadı. Tablet önceki teknisyene aitmiş: B. Soylu. O nerede?" },
        { type: "waitTap" },
        { type: "objective", text: "Güç kesintisinin kaynağını bul" },
        { type: "ambient", text: "Koridordan, çok uzaktan, ıslak bir şeyin sürüklenme sesi geliyor. Bir kez. Sonra yine sessizlik." },
      ],
      choices: [
        { id: "ranza", text: "Diğer ranzaları ve dolapları ara", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "cik", text: "Sessizce koridora çık", next: "n_koridor" },
      ],
    },

    n_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { ranzaArandi: true } },
        { type: "narrate", text: "Sekiz ranza, sekizi de boş — ama bozulmamış. Battaniyeler katlı, yastıklar düzgün. Kimse kaçmamış buradan. Herkes... kalkıp gitmiş. Düzenle." },
        { type: "narrate", text: "Vedat'ın dolabını çekiştiriyorsun. Kilit direniyor, asılıyorsun — dolap bütün gövdesiyle devrilip zemine ÇARPILIYOR. Gürültü, çelik koridorlarda bir yumruk gibi yankılanıyor." },
        { type: "stat", stat: "gurultu", delta: 8, note: "GÜRÜLTÜ +8 — Ses, boş koridorlarda uzun süre yankılandı", noteKind: "alert" },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Dolabın içinden bir yedek pil yuvarlanıyor — ve iç kapağa bantlanmış, elden ele kopyalanmış bir kağıt: katın krokisi. Vedat'ın el yazısıyla köşesine bir şeyler karalanmış." },
        { type: "document", open: true, doc: {
          id: "d_kroki", title: "K-6 Kat Krokisi (el kopyası)",
          meta: "resmi çizimden kopya · V.K. eliyle",
          body: "YATAKHANE ─ KORİDOR 6-A ─┬─ REVİR\n                         ├─ KANTİN ═(servis kapısı)═ DEPO\n                         └─ KAVŞAK\n\nKAVŞAK ─┬─ merdiven → POMPA PLATFORMU\n        │      (platformdan → SİNTİNE GEÇİDİ → C PANOSU)\n        ├─ bakım geçidi → DEPO\n        ├─ 6-B KORİDORU → radyo odası (ELEKTRONİK KİLİT —\n        │                  güç yoksa açılmaz)\n        └─ ESKİ ASANSÖR\n\n(V.K. el yazısı, üstü iki kez çizilmiş:)\nASANSÖRÜ KULLANMA. KABİN YOK. Aşağıda ne\nolduğuna bakma.\n\n(daha küçük:)\nsintinede SES YAPMA. o, suyu duyar." } },
      ],
      choices: [
        { id: "cik", text: "Koridora çık", next: "n_koridor" },
      ],
    },

    /* ================= KORİDOR 6-A (HUB 1) ================= */

    n_koridor: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "K-6 ana koridoru. Acil lambaların kırmızısı, ıslak zeminde titriyor. Ve zeminde... bir iz var. Ayak izi değil. Islak, geniş, KESİNTİSİZ bir sürüklenme izi — koridor boyunca uzanıp kavşağın karanlığında kayboluyor.", if: { flag: "korIlk", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "korIlk", equals: false } },
        { type: "narrate", text: "Panoda dünkü vardiyanın devir raporu asılı. Kağıdın kenarı, ıslak bir elle tutulmuş gibi buruşuk.", if: { flag: "korIlk", equals: false } },
        { type: "document", open: true, if: { flag: "korIlk", equals: false }, doc: {
          id: "d_devir", title: "Vardiya Devir Raporu — 6. Gece",
          meta: "SINIR-1 · K-6 BAKIM · FORM 12-B · VARDİYA AMİRİ: B. SOYLU",
          body: "DEVREDEN: Baturay Soylu (gece)\nDEVRALAN: — (imza yok)\n\nAÇIK İŞLER:\n· Alt platform tahliye pompaları (A/B/C) arızalı.\n  Manuel ilk çalıştırma gerekiyor.\n· POMPA C'NİN SİGORTASI YANDI VE ÇIKARILDI.\n  Yedek sigortalar B-2 DEPOSUNDA.\n· Radyo odası erişim paneli yeniden kodlandı.\n  Kod, güvenlik gereği İKİYE BÖLÜNDÜ. (bkz. tutanak 7)\n· Ana hat, üç pompa da açılmadan BAŞLATILMAYACAK.\n\nUYARILAR:\n· Eski personel asansörü HİZMET DIŞI. Kabin yok,\n  şaft boş. Kapıyı KULLANMAYIN.\n· Sintine seviyesi yükseliyor. Tahliye 24 saat içinde\n  yapılmazsa K-6 su altında kalır.\n\nDİPNOT (el yazısı, farklı kalem):\nGece 3'ten sonra platforma tek başına inilmeyecek.\nSebep sorma. İn ve say: eksik miyiz?" } },
        { type: "flag", set: { korIlk: true } },
        { type: "ambient", text: "Sol tarafta ilaç kokusu sızdıran aralık bir kapı var. İleride, tuhaf biçimde, kantinin ışığı hâlâ yanıyor. Ve koridorun sonunda: kavşağın ağzı, kapkara." },
      ],
      choices: [
        { id: "revir", text: "İlaç kokusunun geldiği aralık kapıya bak", next: "n_revir", if: { flag: "revirGezildi", equals: false } },
        { id: "kantin", text: "Işığı hâlâ yanan kantine bak", next: "n_kantin", if: { flag: "kantinGezildi", equals: false } },
        { id: "kavsak", text: "Koridorun sonundaki karanlık kavşağa yürü", next: "n_kavsak" },
        { id: "yatak", text: "Yatakhaneye geri dön", next: "n_uyanis_geri" },
      ],
    },

    n_uyanis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "Yatakhane olduğu gibi duruyor: sekiz boş ranza, katlı battaniyeler. Kapıdan bakıp geri dönüyorsun — burada senin için bir şey kalmadı." },
      ],
      choices: [
        { id: "ranza", text: "Ranzaları ve dolapları ara", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "geri", text: "Koridora dön", next: "n_koridor" },
      ],
    },

    /* ================= REVİR (çıkmaz — ödüllü) ================= */

    n_revir: {
      cost: 2,
      events: [
        { type: "flag", set: { revirGezildi: true } },
        { type: "narrate", text: "Revir. İlaç dolabı ardına kadar açık, boş. Ve muayene masasında — bir ceset. Göğüs cebindeki isimlik: 'B. SOYLU'. Tabletini taşıdığın adam. Yerini almaya geldiğin adam. Gözleri tavana dönük, yüzü... sakin. Bu gece gördüğün en korkunç şey bu sakinlik. 'Görevi bıraktı' demişlerdi. Bırakmamış — bırakılmış." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "Yumruğu sıkılı. Parmaklarını tek tek açıyorsun — avucunda buruşuk bir kağıt: iki rakam, acele bir el yazısıyla: \"21\". Gerisi yırtık." },
        { type: "note", id: "not_kod21", title: "Kod parçası: 21··", text: "Baturay'ın avucundan çıktı. Radyo odasının kodu ikiye bölünmüştü — bu ilk yarısı: 21. Devir raporundaki 'tutanak 7' buydu demek. Diğer yarısı nerede?" },
        { type: "flag", set: { kod21: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_revir", title: "Revir Kaydı — Hafta 42",
          meta: "SINIR-1 SAĞLIK BİRİMİ · GİZLİLİK: KURUM İÇİ",
          body: "TOPLU SEMPTOM BİLDİRİMİ (son 14 gün):\n\n· Kulak çınlaması ....................... 19 personel\n· Uyku bozukluğu ........................ 16 personel\n· \"Duvarlardan ses geldiği\" hissi ....... 11 personel\n· UYKUDA SAYI SAYMA ..................... 9 personel\n\nNot: Uykuda sayanların tamamı, birbirinden habersiz,\nAYNI diziyi sayıyor. Kayıtlar karşılaştırıldı.\nAçıklama bulunamadı.\n\nÖNERİ: Toplu psikolojik değerlendirme + yüzeye\ntahliye talebi. (RED — H. Tekin: 'Vardiya düzeni\nbozulamaz. Aile işini bilir.')\n\nSON KAYIT: B. Soylu tedaviyi reddetti. 'Uyumamak\nyeterli' dedi. Kendisine uyarıcı verildi." } },
      ],
      choices: [
        { id: "gunluk", text: "Baturay'ın göğüs cebindeki defteri al", next: "n_revir2" },
        { id: "cik", text: "Onu rahat bırak — çık", next: "n_koridor" },
      ],
    },

    n_revir2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ceketinin cebinden küçük, şişkin bir defter çıkıyor. Kapağında tek kelime: SAYMA. Sayfaları ıslak, ama okunuyor." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "document", open: true, doc: {
          id: "d_gunluk", title: "Baturay'ın Günlüğü", style: "hand",
          meta: "— gece vardiyası defteri —",
          body: "3 Ekim\nKulaklarım bütün gün çınladı. Jeneratörün sesi\nsandım. Değilmiş. Jeneratörü kapattırdım, çınlama\ndurmadı. Ses makinede değil. Ses BENDE.\n\n9 Ekim\nMakinedeki ses; sanki kafamın içindeki sesin aynısı.\nGözümü kırpınca cızırtı görüyorum. Yağlı, karanlık\nbir şey iniyor göz kapaklarımın arkasından. Ama ses\nduvarların İÇİNDEN de geliyor. O sesi tanıyorum.\n\n14 Ekim\nVedat uykusunda sayı sayıyor. Altı. Beş. Dört.\nUyandırdım, hatırlamıyor. Bu gece revirde dokuz\nkişi saydık. HEPSİ AYNI YERDEN başlıyor.\n\n21 Ekim\nŞef 'aile toplantısı' yaptı. Kimse toplantıdan\nkonuşmuyor ama herkes gülümsüyor artık. Aynı\ngülümseme. Radyo odasının kodunu değiştirdim ve\nİKİYE BÖLDÜM. Yarısı hep yanımda. Diğer yarısını\nsu basan tarafta, C panosunun oraya kazıdım.\nİkisi bir arada olmaz. Bana bir şey olursa:\nönce say. Sonra kaç.\n\n(son sayfa, bozuk el yazısı)\nBurada tek kurban ben değilim, hem de hiç.\nAdamın biri bu yerde kalmaktansa yanarak ölmeyi\nbekledi. Ben o kadar cesur değilim. Ben sadece\nuyumayacağım." } },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Defterin arasından bir yedek pil kayıyor avucuna. Baturay'ın son iyiliği. \"Önce say. Sonra kaç.\"" },
      ],
      choices: [
        { id: "cik", text: "Revirden çık", next: "n_koridor" },
      ],
    },

    /* ================= KANTİN (+ servis kapısı → DEPO) ================= */

    n_kantin: {
      cost: 1,
      events: [
        { type: "flag", set: { kantinGezildi: true } },
        { type: "narrate", text: "Kantin ışığı yanıyor çünkü sofra KURULU. On iki kişilik masa, on iki tabak, on iki bardak. Yemekler günler önce konmuş — üstü yeşil-siyah bir örtüyle kaplı. Ve masanın başındaki tabak... temiz. Bekliyor.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "narrate", text: "Duvar panosunda vardiya çizelgesi. Yaklaşınca miden buruluyor.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "document", open: true, if: { flag: "kantinIlkGoruldu", equals: false }, doc: {
          id: "d_cizelge", title: "Vardiya Çizelgesi — ?? Hafta",
          meta: "SINIR-1 PERSONEL PLANLAMA · onay: H.T.",
          body: "PAZARTESİ\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nSALI\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nÇARŞAMBA\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nPERŞEMBE\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nCUMA\n  00-08: A İ L E   08-16: A İ L E   16-24: AİLE\nCUMARTESİ\n  00-08: AİLEAİLE  08-16: AİLEAİLEAİLE\nPAZAR\n  hep birlikte hep birlikte hep birlikte hep\n\n(alt köşe, kurşun kalem, minicik:)\ngeç kalan personel için yer ayrıldı" } },
        { type: "flag", set: { kantinIlkGoruldu: true } },
        { type: "ambient", text: "Masanın başındaki temiz tabağın yanında bir isim kartı var. Üstünde senin görev numaran yazıyor. Mutfağın arkasında, buhar borularının gölgesinde, bir servis kapısı seçiliyor." },
      ],
      choices: [
        { id: "servis", text: "Mutfağın arkasındaki servis kapısını zorla", next: "n_servis" },
        { id: "cik", text: "Koridora dön", next: "n_koridor" },
      ],
    },

    n_servis: {
      cost: 2,
      events: [
        { type: "narrate", text: "Servis kapısı yarıya kadar açılıp sıkışıyor; omuz atıyorsun — menteşe İNLEYEREK teslim oluyor.", if: { flag: "servisAcildi", equals: false } },
        { type: "stat", stat: "gurultu", delta: 5, note: "GÜRÜLTÜ +5 — Menteşe bütün kata duyuldu", noteKind: "alert", if: { flag: "servisAcildi", equals: false } },
        { type: "flag", set: { servisAcildi: true } },
        { type: "narrate", text: "Dar bir servis geçidi: erzak kolileri, boru hatları, tavandan sarkan et kancaları — boş kancalar, kendine bunu tekrarlıyorsun. Geçit, ileride daha geniş bir karanlığa açılıyor." },
      ],
      choices: [
        { id: "depo", text: "Geçidin açıldığı karanlığa ilerle", next: "n_depo" },
        { id: "geri", text: "Kantine geri dön", next: "n_kantin" },
      ],
    },

    /* ================= KAVŞAK (HUB 2) ================= */

    n_kavsak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kavşak: K-6'nın dört yolunun düğümü. Sağda, aşağı kıvrılan merdivenden SU SESİ yankılanıyor — düzenli, ağır bir çalkantı. Karşıda dar bir bakım geçidi soğuk hava üflüyor. Solda ise çelik bir çift kapı: ESKİ ASANSÖR — üstünde sarkmış, yırtık bir uyarı bandı.", if: { flag: "kavsakIlk", equals: false } },
        { type: "flag", set: { kavsakIlk: true } },
        { type: "narrate", text: "İleride bir kapı daha var: 6-B koridorunun elektronik kilidi. Panelinin ışığı ÖLÜ — güç olmadan bu kapı bir duvar.", if: { flag: "gucAcik", equals: false } },
        { type: "narrate", text: "6-B koridorunun elektronik kilidi artık YEŞİL yanıyor. Güç geldi — kapı seni bekliyor.", if: { flag: "gucAcik", equals: true } },
        { type: "ambient", text: "Zemindeki ıslak sürüklenme izi burada ikiye ayrılıyor: biri merdivenden aşağı, suya. Öbürü... asansör kapısının ALTINDAN içeri." },
      ],
      choices: [
        { id: "merdiven", text: "Su sesine doğru merdivenden aşağı in", next: "n_platform" },
        { id: "gecit", text: "Soğuk hava üfleyen dar bakım geçidine gir", next: "n_gecit" },
        { id: "asansor", text: "Asansör kapısını zorla — en hızlı iniş bu olmalı", next: "n_olum_asansor" },
        { id: "kapib", text: "6-B kapısından geç", next: "n_koridor2", if: { flag: "gucAcik", equals: true } },
        { id: "geri", text: "Ana koridora geri dön", next: "n_koridor" },
      ],
    },

    n_olum_asansor: {
      death: true,
      deathText: "Kapı, iki asılışta teslim oluyor — çünkü tutan bir şey yok. Kabin de yok. Sadece 214 metrelik tesisin dibine inen boş, ıslak bir boğaz. Uyarı bandı bir şey söylüyordu. Rapor da. Kroki de. Karanlıkta düşerken aklına hepsi birden geliyor — ve aşağıda, seni yumuşak bir şey karşılıyor. Yumuşak ve UYANIK.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    /* ================= BAKIM GEÇİDİ → DEPO (döngü 2) ================= */

    n_gecit: {
      cost: 2,
      events: [
        { type: "narrate", text: "Bakım geçidi omuz genişliğinde. Boru hatları iki yandan sıkıştırıyor; bir yerlerde bir vana sızdırıyor, damlalar çelikte saat gibi vuruyor. Tık. Tık. Tık.", if: { flag: "gecitIlk", equals: false } },
        { type: "flag", set: { gecitIlk: true } },
        { type: "ambient", text: "Damlaların ritmi bir an BOZULUYOR — sanki araya başka bir tık karıştı. Sonra düzeliyor. Saymadın. Saymayacaksın." },
      ],
      choices: [
        { id: "depo", text: "Geçidin sonundaki kapıyı omuzla", next: "n_depo" },
        { id: "geri", text: "Kavşağa geri dön", next: "n_kavsak" },
      ],
    },

    /* ================= DEPO (B-2 — sigorta burada) ================= */

    n_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "B-2 deposu: raf raf yedek parça, konserve kuleleri, yağ bidonları. Tavandaki tek acil lamba, tozun içinde ölü bir güneş gibi asılı. İki girişi var: geldiğin taraf ve karşıdaki — biri kantinin servis geçidine, öbürü kavşağın bakım geçidine çıkıyor.", if: { flag: "depoIlk", equals: false } },
        { type: "document", open: true, if: { flag: "depoIlk", equals: false }, doc: {
          id: "d_basinc", title: "Basınç Günlüğü — K-6 Dış Gövde",
          meta: "OTOMATİK SENSÖR ÇIKTISI + VARDİYA EL KAYDI · depo arşivi",
          body: "GECE 1 — 03:00-04:00\n  Dış gövde temas: 6 vuruş. Kaynak: DIŞ. Balina? (V.)\n\nGECE 2 — 03:10-03:40\n  Dış gövde temas: 5 vuruş. Düzenli aralık.\n  Balinalar düzenli vurmaz. (B.S.)\n\nGECE 3 — 03:20-03:55\n  Temas: 4 vuruş. SENSÖR NOTU: titreşim imzası\n  İÇ kaynak paterni gösteriyor. Teknik hata? (B.S.)\n\nGECE 4 — 03:47\n  Temas: 3 vuruş. İçeriden. Kesin. Üç vuruş,\n  sintine tarafından. Aşağıda kimse yoktu.\n  KİMSE YOKTU. (B.S.)\n\nGECE 5 —\n  (kayıt yok)\n\nGECE 6 —\n  (bu gece)" } },
        { type: "flag", set: { depoIlk: true } },
        { type: "ambient", text: "Rafların birinde, göz hizasında, şablon harflerle: \"ELEKTRİK YEDEK — SİGORTA/RÖLE\"." },
      ],
      choices: [
        { id: "sigorta", text: "Sigorta kutusunu ara", next: "n_depo_sigorta", if: { flag: "sigortaAlindi", equals: false } },
        { id: "pano", text: "Duvardaki bozuk devre panosunu incele", next: "n_devre_pano", if: { flag: "devreOnarildi", equals: false } },
        { id: "servis", text: "Servis geçidinden kantin tarafına geç", next: "n_servis_geri" },
        { id: "gecit", text: "Bakım geçidinden kavşağa dön", next: "n_kavsak" },
      ],
    },

    /* YENİ: devre panosu — tiles bulmacası (kayan parça) */
    n_devre_pano: {
      cost: 1,
      events: [
        { type: "narrate", text: "Deponun arka duvarında, cam kapağı çatlamış bir devre panosu. İçindeki dokuz modül yerinden oynamış, sökülmüş ve yanlış yuvalara tıkılmış — sanki biri aceleyle karıştırmış. Panonun üstünde küçük bir etiket: \"K-6 YEDEK AYDINLATMA HATTI\". Modülleri doğru sıraya dizersen deponun ölü lambaları geri gelebilir." },
        { type: "note", id: "not_devre", title: "Devre panosu", text: "Depodaki yedek aydınlatma panosu karışmış — dokuz modül yanlış yuvalarda. Doğru sıraya dizersem K-6'nın yedek ışıkları çalışır. Işık, karanlıkta avantaj demek." },
      ],
      interaction: {
        kind: "tiles",
        title: "DEVRE PANOSU — MODÜLLERİ SIRALA",
        scramble: [4, 2, 8, 6, 0, 7, 1, 5, 3],
        success: "n_devre_onarildi",
        cancel: "n_depo",
      },
    },

    n_devre_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "YEDEK AYDINLATMA HATTI: AKTİF" },
        { type: "narrate", text: "Son modül yerine oturduğu an pano vızıldıyor ve deponun tavan lambaları — biri biri — titreyerek uyanıyor. Kirli sarı bir ışık odayı dolduruyor. Karanlık geri çekiliyor; en azından burada, bir süreliğine, görebiliyorsun." },
        { type: "flag", set: { devreOnarildi: true, yolAydinlik: true } },
        { type: "stat", stat: "akil", delta: 5, note: "AKIL +5 — Işık, küçük bir zafer", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Depoya dön", next: "n_depo" },
      ],
    },

    n_depo_sigorta: {
      cost: 1,
      events: [
        { type: "flag", set: { sigortaAlindi: true } },
        { type: "narrate", text: "Kutunun içinde tek bir yedek sigorta kalmış — ağır, cam gövdeli, avucunu dolduran cinsten. Birileri diğerlerini çoktan almış. Ya da SAKLAMIŞ." },
        { type: "note", id: "not_sigorta", title: "Yedek sigorta (C pompası)", text: "B-2 deposundan aldım. Devir raporu 'C'nin sigortası yandı ve çıkarıldı' diyordu — demek pompa C'nin panosuna bunu takacağım. Pano su basan tarafta olmalı: Baturay 'su basan tarafta, C panosunun oraya' diye yazmıştı." },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Kutunun dibinde bir de yedek tablet pili — depo, bu gece cömert davranıyor. Bir şeyler hep kötü gitmeden hemen önce cömert davranır." },
      ],
      choices: [
        { id: "servis", text: "Servis geçidinden kantin tarafına geç", next: "n_servis_geri" },
        { id: "gecit", text: "Bakım geçidinden kavşağa dön", next: "n_kavsak" },
      ],
    },

    n_servis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "Servis geçidinden kantine süzülüyorsun. Sofranın yanından geçerken gözlerini tabaklardan kaçırıyorsun — ama masadaki temiz tabağın SANDALYESİ, hatırladığından bir karış geride duruyor sanki. Bakma. Yürü." },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "koridor", text: "Koridora çık", next: "n_koridor" },
      ],
    },

    /* ================= POMPA PLATFORMU (HUB 3) ================= */

    n_platform: {
      checkpoint: true,
      cost: 1,
      noiseGate: [{ min: 50, once: "pusu1", node: "n_enc1" }],
      events: [
        { type: "narrate", text: "Merdiven, bileğe kadar kara suya iniyor. Pompa platformu: sağda A hattının gemi dümeni büyüklüğündeki vanası, solda B odasının aralık kapısı. Köşede, kırmızı acil lambasının altında ana kontrol paneli bekliyor. Ve platformun dibinde, suyun İÇİNDEN devam eden dar bir geçit: sintine tarafı.", if: { flag: "platIlk", equals: false } },
        { type: "objective", text: "Üç pompayı elle aç, ana panelden hattı başlat", if: { flag: "platIlk", equals: false } },
        { type: "flag", set: { platIlk: true } },
        { type: "status", items: [
          { label: "POMPA A", flag: "pompaA" },
          { label: "POMPA B", flag: "pompaB" },
          { label: "POMPA C", flag: "pompaC" },
        ] },
        { type: "ambient", text: "Su, ayak bileklerinde nabız gibi atıyor. C pompası ortalıkta görünmüyor — hat, suyun içindeki geçidin karanlığına doğru kayboluyor." },
      ],
      choices: [
        { id: "pa", text: "Dev vananın olduğu A hattına git", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "Aralık duran B odasının kapısına git", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "sintine", text: "Suyun içindeki dar geçide gir", next: "n_sintine" },
        { id: "panel", text: "Ana kontrol paneline git", next: "n_anapanel", if: { flag: "gucAcik", equals: false } },
        { id: "bekle", text: "Hareketsiz bekle ve ortalığın yatışmasını dinle", next: "n_bekle", ifStat: { stat: "gurultu", gte: 25 } },
        { id: "geri", text: "Merdivenden kavşağa dön", next: "n_kavsak" },
      ],
    },

    n_bekle: {
      cost: 2,
      events: [
        { type: "narrate", text: "Bir borunun gölgesine çöküp KIMILDAMIYORSUN. Nefesini sayıyorsun. Bir. İki. Su yatışıyor, metal susuyor, tesis seni unutuyor — ya da unutmuş gibi yapıyor." },
        { type: "stat", stat: "gurultu", delta: -25, note: "Ortalık sakinleşti — GÜRÜLTÜ azaldı", noteKind: "system" },
        { type: "ambient", text: "Çok derinden, düzenli bir tıkırtı: tık... tık... tık. Dış gövdeye vuruluyor. İçeriden mi, dışarıdan mı — artık emin değilsin." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_pompaA: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa A: ana tahliye hattı. Vanası en az on yıllık pasla kaynamış. Yanındaki askıda, basınç günlüğünün asılması gereken pano BOŞ sallanıyor — köşesine tebeşirle karalanmış: \"günlük depoya kaldırıldı — B.S.\"" },
      ],
      interaction: { kind: "valve", title: "POMPA A — VANAYI ÇEVİR", turns: 9, success: "n_pompaA2", cancel: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaA: true } },
        { type: "system", text: "POMPA A: AKTİF ▮ — TAHLİYE HATTI 1 AÇIK" },
        { type: "narrate", text: "Vana son turda teslim oluyor ve hat, boğulan bir adamın ilk nefesi gibi suyu emmeye başlıyor. Kollarında pas ve yağ, kulaklarında pompanın homurtusu. Bir tanesi tamam." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_pompaB: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa B odası zifiri. Tabletin ışığı üç adım öteyi ancak gösteriyor. Şalter panosu karşı duvarda — ve sağdaki rafta, kabloların arasında, bir yedek pilin turuncu etiketi parlıyor." },
        { type: "ambient", text: "Odanın köşesinde, ışığın ucunda, dalış kıyafetine benzer bir şey asılı. Ya da asılı olan şey bir kıyafet değil. Işığı oraya bir daha tutmuyorsun." },
      ],
      choices: [
        { id: "raf", text: "Rafa uzan — pili al (raf sağlam görünmüyor)", next: "n_pompaB_raf", if: { flag: "rafAlindi", equals: false } },
        { id: "salter", text: "Doğruca şaltere geç", next: "n_pompaB_int" },
        { id: "geri", text: "Odadan çık", next: "n_platform" },
      ],
    },

    n_pompaB_raf: {
      cost: 1,
      events: [
        { type: "flag", set: { rafAlindi: true } },
        { type: "narrate", text: "Parmakların pile değiyor — ve raf, on yıllık yorgunluğunu tek seferde bırakıyor: bütün içindekilerle birlikte çelik zemine BOŞALIYOR. Karanlıkta gözlerini kapatıp bitmesini bekliyorsun. Bitmiyor gibi geliyor." },
        { type: "stat", stat: "gurultu", delta: 6, note: "GÜRÜLTÜ +6 — Raf devrildi", noteKind: "alert" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "salter", text: "Şaltere geç", next: "n_pompaB_int" },
        { id: "geri", text: "Odadan çık", next: "n_platform" },
      ],
    },

    n_pompaB_int: {
      cost: 1,
      events: [
        { type: "narrate", text: "Şalter kolu ağır ve yaylı — bırakırsan geri kaçacak türden. Tek hamlede, sonuna kadar. Karanlıkta derin bir nefes alıyorsun." },
      ],
      interaction: { kind: "lever", title: "POMPA B — ŞALTERİ KALDIR", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaB: true } },
        { type: "system", text: "POMPA B: AKTİF ▮ — TAHLİYE HATTI 2 AÇIK" },
        { type: "narrate", text: "Kol yuvasına oturuyor ve karanlık oda titreşimle doluyor. Asılı duran şey — kıyafet ya da her neyse — titreşimle birlikte hafifçe SALLANIYOR. Çıkarken arkana bakmıyorsun." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    /* ================= SİNTİNE GEÇİDİ → POMPA C ================= */

    n_sintine: {
      cost: 2,
      events: [
        { type: "narrate", text: "Geçit, bel hizasına kadar suyun içinde. Her adım, istemesen de ses çıkarıyor — su, yürüyeni İHBAR eden cinsten. Tavan alçalıyor, boru hatları saça sürtüyor.", if: { flag: "sintineIlk", equals: false } },
        { type: "stat", stat: "gurultu", delta: 4, note: "GÜRÜLTÜ +4 — Suda sessiz yürünmez", noteKind: "alert", if: { flag: "sintineIlk", equals: false } },
        { type: "flag", set: { sintineIlk: true } },
        { type: "ambient", text: "İleride, geçidin dibinde, bir panonun ölü ekranı seçiliyor. Ve suyun yüzeyinde, senin yarattığın dalgalara KARIŞMAYAN, başka bir yerden gelen halkalar var." },
      ],
      choices: [
        { id: "pano", text: "Dipteki panoya kadar ilerle", next: "n_pompaC" },
        { id: "geri", text: "Geri, platforma dön", next: "n_platform" },
      ],
    },

    n_pompaC: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa C panosu — ve yuvasında sigorta YOK: boş yuva, yanık izleriyle çerçeveli bir göz çukuru gibi bakıyor. Panonun yanında, çelik duvara bir anahtarla KAZINMIŞ iki rakam: \"47\". Altında aynı elden: \"öbürü bende\".", if: { flag: "kod47", equals: false } },
        { type: "note", id: "not_kod47", title: "Kod parçası: ··47", text: "C panosunun duvarına kazınmış: 47. 'Öbürü bende' diyor — Baturay'ın el yazısı bu. Demek kod: [ilk yarı][47]. İki parçayı birleştirmem gerek.", if: { flag: "kod47", equals: false } },
        { type: "flag", set: { kod47: true } },
        { type: "narrate", text: "Boş yuva bir yedek sigorta istiyor — sende yok. Devir raporu bir şey söylüyordu... yedekler nerede tutuluyordu?", if: { flag: "sigortaAlindi", equals: false } },
        { type: "alert", text: "POMPA C: SİGORTA YOK — YEDEK GEREKLİ", if: { flag: "sigortaAlindi", equals: false } },
        { type: "narrate", text: "Depodan aldığın cam gövdeli sigorta avucunda ağırlaşıyor. İbre yeşil bölgeden geçerken takman gerek — ıskalarsan pano, bu su dolu çukurda kıvılcım kusar.", if: { flag: "sigortaAlindi", equals: true } },
      ],
      choices: [
        { id: "tak", text: "Sigortayı yuvaya yerleştir", next: "n_pompaC_int", if: { flag: "sigortaAlindi", equals: true } },
        { id: "geri", text: "Sudan geri dön — platforma", next: "n_platform" },
      ],
    },

    n_pompaC_int: {
      events: [
        { type: "narrate", text: "Nefesini tutup ibreyi izliyorsun. Su, dizlerinin etrafında bekliyor. O da bekliyor." },
      ],
      interaction: { kind: "fuse", title: "POMPA C — SİGORTAYI HİZALA", hits: 2, success: "n_pompaC2", cancel: "n_pompaC" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaC: true } },
        { type: "system", text: "POMPA C: AKTİF ▮ — TAHLİYE HATTI 3 AÇIK" },
        { type: "narrate", text: "Sigorta yuvaya çıt diye oturuyor ve üçüncü hat da koroya katılıyor. Su, gözle görülür biçimde çekilmeye başlıyor — sintine geçidinden geri dönerken artık diz hizasında. Şimdi ana panel. Şimdi kırmızı buton." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    /* ================= PUSU 1 + ANA PANEL ================= */

    n_enc1: {
      events: [
        { type: "glitch", ms: 500 },
        { type: "alert", text: "⚠ SU HATTINDA HAREKET — YAKIN" },
        { type: "narrate", text: "Pompaların uğultusunun altından BAŞKA bir ses sıyrılıyor: suyu yararak, acele etmeden, sana doğru gelen ıslak bir ağırlık. Işığını kapatacak vaktin yok. Düşünecek vaktin yok." },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "don", text: "Sudan çık ve DONAKAL", next: "n_enc1_ok" },
        { id: "kos", text: "Merdivene koş", next: "n_olum_su", default: true },
      ],
    },

    n_enc1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "Kendini platform iskelesine çekip TAŞLAŞIYORSUN. Ses üç adım ötende duruyor. Su damlıyor — ondan, tavana değecek kadar yüksek bir yerden. Sonra, sonsuz bir dakika sonra, ağırlık geri dönüyor ve karanlıkta çözülüyor." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Onu duydun. Çok yakındı.", noteKind: "alert" },
        { type: "ambient", text: "Gittiği yönden, kısık, metalik bir İNLEME geliyor. Acı çeken bir makine. Ya da makine taklidi yapan bir acı." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_olum_su: {
      death: true,
      deathText: "Suda koşulmaz. Su, her adımını tesisin her köşesine ilan eder. Merdivene üç basamak kala ıslak ağırlık sırtına biniyor — ve K-6'nın kara suyu, bir sır gibi üstüne kapanıyor.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ana kontrol paneli. Kırmızı acil lambasının altında, çatlak CRT ekran pompa hattını listeliyor. Camında senin yansımandan başka bir şey yok — şimdilik. Ekranın altında, tozlu koruma kapağının ardında: büyük, kırmızı buton." },
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
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { gucAcik: true } },
        { type: "system", text: "ANA HAT BAŞLATILDI — GÜÇ DAĞITIMI: K-6 %100" },
        { type: "narrate", text: "Işıklar katar katar uyanıyor: platform, merdiven, koridorlar. On bir aydır duyduğun o jeneratör homurtusu geri geliyor ve bir an — sadece bir an — her şey normalmiş gibi." },
        { type: "pause", ms: 1200 },
        { type: "ambient", text: "Sonra, çok yukarıdan, katların arasından, metalik bir İNLEME cevap veriyor. Uzun. Sabırlı. Neredeyse... minnettar." },
        { type: "stat", stat: "gurultu", delta: 15, note: "GÜRÜLTÜ +15 — Işık ve makine sesi. Artık herkes biliyor.", noteKind: "alert" },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Dikkat dikkat. Makine dairesinde ışık görüldü. Aile bilgilendirildi.」" },
        { type: "anons", text: "「...Hoş geldin, geç kalan personel. Ben Deniz. Oryantasyonun başlamıştır.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "waitTap" },
        { type: "note", id: "not_anons", title: "Anonstaki ses", text: "Hoparlörden bir adam konuştu. Genç. Neşeli. 'Aile bilgilendirildi' dedi. Deniz — mühendislerden. Sesi... normaldi. En korkuncu bu: sesi tamamen normaldi." },
        { type: "objective", text: "Radyo odasına ulaş, yüzeyden yardım çağır" },
        { type: "system", text: "K-6 ELEKTRONİK KİLİTLER: AKTİF — 6-B KORİDOR KAPISI AÇILDI" },
      ],
      choices: [
        { id: "yukari", text: "Merdivenden yukarı, kavşağa çık", next: "n_kavsak" },
      ],
    },

    /* ================= 6-B KORİDORU → RADYO ================= */

    n_koridor2: {
      cost: 1,
      noiseGate: [{ min: 65, once: "pusu2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "6-B koridoru artık aydınlık. Keşke olmasaydı. Gözlem camlarının İÇİ buğulu — biri az önce camlara nefes vermiş gibi. Ve üçüncü camda, buğunun ortasında, YENİ silinmiş bir el izi: parmaklar fazla uzun, fazla ince.", if: { flag: "kor2Ilk", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kor2Ilk", equals: false } },
        { type: "flag", set: { kor2Ilk: true } },
        { type: "narrate", text: "Koridorun sonunda radyo odasının çelik kapısı: yeşil ekranlı erişim paneli sabırla bekliyor." },
      ],
      choices: [
        { id: "kapi", text: "Erişim paneline git", next: "n_kapipanel" },
        { id: "geri", text: "Kavşağa geri dön", next: "n_kavsak" },
      ],
    },

    n_enc2: {
      events: [
        { type: "glitch", ms: 600 },
        { type: "alert", text: "⚠ KORİDOR IŞIKLARI SIRAYLA PATLIYOR — SANA DOĞRU" },
        { type: "narrate", text: "Koridorun öbür ucundaki lamba patlıyor. Sonra bir sonraki. Sonra bir sonraki — karanlık, sana doğru KOŞUYOR ve içinde bir şey var." },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "duvar", text: "Duvara yapış, gözlerini kapat, BEKLE", next: "n_enc2_ok" },
        { id: "kac", text: "Geldiğin yöne koş", next: "n_olum_koridor", default: true },
      ],
    },

    n_enc2_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "Sırtını çeliğe yapıştırıp gözlerini kapatıyorsun. Karanlık üstünden geçiyor — soğuk, ıslak bir rüzgar ve keskin bir deniz dibi kokusu. Bir şey yüzünün bir karış önünde DURUYOR. Nefes almıyorsun. Saymıyorsun bile." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Yüzünü hatırlamana gerek yok. Kokusu yeter.", noteKind: "alert" },
        { type: "narrate", text: "Geçiyor. Koridorun ucunda lambalar tek tek geri geliyor — sanki hiçbir şey olmamış gibi. Camdaki el izi artık İKİ tane." },
      ],
      choices: [
        { id: "kapi", text: "Erişim paneline git — hemen", next: "n_kapipanel" },
      ],
    },

    n_olum_koridor: {
      death: true,
      deathText: "Karanlıktan kaçılmaz. Karanlık, koridorun iki ucunu da bilir. Işıklar geri geldiğinde koridor bomboş — sadece camlardaki buğu artık içeriden değil.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapipanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Erişim paneli dört haneli kod istiyor. Ekranında tek satır: 'YENİDEN KODLANDI — B.S.'" },
        { type: "system", text: "İPUCU: Kod iki parçaya bölünmüş durumda. Arşivindeki notları birleştir.", if: { flag: "kod21", equals: true } },
        { type: "alert", text: "Kodun ilk yarısı sende YOK. Baturay 'yarısı hep yanımda' yazmıştı... O şimdi nerede?", if: { flag: "kod21", equals: false } },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_radyo", cancel: "n_koridor2" },
    },

    n_radyo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "KOD KABUL — RADYO ODASI KİLİDİ AÇILDI" },
        { type: "narrate", text: "Radyo odası: bir duvar dolusu ölü ekipman ve ortada, tozun altında, acil durum telsiz konsolu. Masada yarım kalmış bir evrak, çekmecede bir şeyler tıkırdıyor." },
        { type: "document", open: true, doc: {
          id: "d_talep", title: "Numune Transfer Talebi — RED",
          meta: "SINIR-1 İÇ YAZIŞMA · FORM 4-A · ARŞİV KOPYASI",
          body: "TALEP EDEN: Dr. Nevin Aras (K-3 Biyoloji)\nTALEP: K-2 arkeoloji ambarındaki 'BULUNTU-1'\nüzerinden ek doku örneği alınması ve K-3\nlaboratuvarına transferi.\n\nGEREKÇE: ████████████████████████████████\n█████████ sayma davranışı ████████████\n██████████ kızımın kayıtları ██████████\n████████████ cevap veriyor ████████\n\nKARAR: RED.\n'Buluntuya kimse dokunmayacak. O, ailenin.\nAnlaşıldı mı Nevin? AİLENİN.'\n— H. Tekin, İstasyon Şefi" } },
        { type: "narrate", text: "Telsiz konsolu ölü. Arka panelini açıyorsun: güç devresinin beş lambalık sigorta dizisi karışmış — biri yanıyor, dördü kör. Devreyi dizmeden bu telsiz tek kelime etmez." },
      ],
      choices: [
        { id: "cekmece", text: "Çekmeceyi aç", next: "n_radyo_cek", if: { flag: "cekmeceAcik", equals: false } },
        { id: "devre", text: "Güç devresini diz", next: "n_lights" },
        { id: "geri", text: "Koridora dön", next: "n_koridor2" },
      ],
    },

    n_radyo_cek: {
      cost: 1,
      events: [
        { type: "flag", set: { cekmeceAcik: true } },
        { type: "narrate", text: "Çekmecede: bir avuç boş kovan gibi dizilmiş kalem pilleri — hepsi ölü — ve en arkada, ambalajında, DOLU bir tablet pili. Birinin sakladığı. Birinin geri gelmeyi planladığı." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devre", text: "Güç devresini diz", next: "n_lights" },
        { id: "geri", text: "Koridora dön", next: "n_koridor2" },
      ],
    },

    n_lights: {
      events: [
        { type: "narrate", text: "Beş lamba, beş anahtar. Her anahtar kendisiyle birlikte komşularını da değiştiriyor. Baturay olsa bir bakışta çözerdi. Baturay artık hiçbir şeye bakmıyor." },
      ],
      interaction: { kind: "lights", success: "n_radyo2", cancel: "n_radyo" },
    },

    n_radyo2: {
      cost: 1,
      events: [
        { type: "system", text: "TELSİZ GÜÇ DEVRESİ: AKTİF — BANT TARAMASI HAZIR" },
        { type: "narrate", text: "Konsol ısınırken hoparlörden yükselen statik, odayı dolduruyor. 410 ile 450 arasında bir yerde — birileri olmalı. Yüzey. Sahil güvenlik. Herhangi biri." },
        { type: "objective", text: "Acil durum bandını tara — 432.0 MHz civarını dene" },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_ece", cancel: "n_radyo" },
    },

    n_ece: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "ambient", text: "«Yüzey mi? ...Yüzey üç haftadır cevap vermiyor.» Kadın sesi. Genç, bitkin, GERÇEK. Statiğin içinden sana tutunuyor." },
        { type: "ambient", text: "«Sen... K-6'dan mı geliyorsun? Sen normal misin? Sayı saymıyorsun, değil mi? — Cevap verme. Sayıyorsan zaten anlardım.»" },
        { type: "ambient", text: "«Beni dinle. Adım Ece, sonar operatörüyüm, hâlâ... hâlâ benim. Işıkları neden açtın?! ŞEF ışıkları görür. Işıkları kapat ve sakın kantindeki masaya—»" },
        { type: "glitch", ms: 800 },
        { type: "alert", text: "— HAT KESİLDİ — TAŞIYICI SİNYAL KAYBI —" },
        { type: "pause", ms: 900 },
        { type: "anons", text: "「Karışma Ece. Yeni personelin oryantasyonu benim işim.」" },
        { type: "anons", text: "「...Duydun mu bakım? Adını da öğrendik. Yukarıda görüşürüz.」" },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: 10, note: "AKIL +10 — Bu tesiste hâlâ bir İNSAN var. Yalnız değilsin.", noteKind: "system" },
        { type: "flag", set: { eceIlkTemas: true, frekanslariDuydun: true } },
        { type: "note", id: "not_ece", title: "Ece — sonar operatörü", text: "432.0'da bir kadın: Ece. Dönüşmemiş, saklanıyor, üç haftadır tek başına. 'Şef ışıkları görür' dedi ve kantindeki masa hakkında bir şey söyleyecekti ki hat kesildi. Deniz kesti. İkisi birbirini tanıyor. Ece'yi bulmalıyım — ama önce bu geceden çıkmalıyım." },
        { type: "pause", ms: 1000 },
        { type: "narrate", text: "Sonra duyuyorsun: koridordan gelen ıslak, ağır adımlar. Kapının buzlu camında bir gölge büyüyor. Kapı kulpu — yavaşça — dönmeye başlıyor." },
        { type: "objective", text: "SAKLAN. HEMEN." },
      ],
      choices: [
        { id: "dolap", text: "Ekipman dolabına gir — nefesini tut", next: "n_saklan" },
      ],
    },

    n_saklan: {
      events: [
        { type: "narrate", text: "Dolabın çelik karanlığına sığınıyorsun. Menfez aralığından odanın bir dilimi görünüyor. Kapı açılıyor. Islak bir ağırlık içeri giriyor — ve dalış kıyafetinden arta kalan şeyin içinde, bir zamanlar insan olan bir şey, İNLİYOR." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_saklan_ok", fail: "n_olum_nefes" },
    },

    n_olum_nefes: {
      death: true,
      deathText: "Ciğerlerin, korkundan önce pes etti. Dolabın kapağı açılırken son duyduğun, kendi nefesin. Son gördüğün ise — bir dalgıç maskesinin arkasında — sana bakan, tanıdık, İNSAN bir çift göz.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_saklan_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Adımlar uzaklaşıyor. Kapı çarpıyor. Bir dakika daha sayıyorsun — Baturay'ın dediği gibi: önce say, sonra kaç — ve dolaptan çıkıyorsun." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "Telsiz konsolu paramparça. Hoparlör, bir göğüs kafesi gibi sökülüp açılmış. O şey konuşamadığın şeyi ANLAMIŞ ve sesini kopardığın yeri cezalandırmış. Ece'ye buradan bir daha ulaşamazsın." },
        { type: "alert", text: "RADYO: KALICI HASAR — K-6'DAN YAYIN ARTIK MÜMKÜN DEĞİL" },
        { type: "waitTap" },
        { type: "objective", text: "K-5 hava kilidine ulaş — bu kattan çık" },
        { type: "ambient", text: "Koridordan, hâlâ yakından, o metalik inleme geliyor. Gitmedi. BEKLİYOR." },
      ],
      choices: [
        { id: "kacis", text: "Kapıya yaklaş ve koridoru dinle", next: "n_kacis" },
      ],
    },

    /* ================= KAÇIŞ ================= */

    n_kacis: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kapı aralığından bakıyorsun: İnleyen, koridorun ortasında, sırtı sana dönük, SAYIYOR gibi sallanıyor. K-5 hava kilidi koridorun öbür ucunda. İki yol var ve ikisi de onun yanından geçiyor." },
        { type: "narrate", text: "Soldaki duvarda kat şalteri: indirirsen K-6 kör olur — o yavaşlar, ama tabletin son ışığıyla karanlıkta yürürsün. Ya da ışıklar açıkken, gürültüyü göze alıp KOŞARSIN." },
        { type: "alert", text: "KARAR VER — UZUN DÜŞÜNENLERİ BU TESİS SEVMEZ" },
      ],
      timer: { seconds: 8 },
      choices: [
        { id: "karanlik", text: "Şalteri indir — KARANLIK YOL (sessiz, pil yer)", next: "n_yolA" },
        { id: "isikli", text: "Işıklar açık — KOŞ (hızlı, gürültülü)", next: "n_yolB", default: true },
      ],
    },

    n_yolA: {
      cost: 4,
      events: [
        { type: "system", text: "K-6 GÜÇ HATTI: MANUEL KESİNTİ — TÜM KAT KARANLIK" },
        { type: "narrate", text: "Şalter inince kat, tek kalp atışında ölüyor. Şimdi evrendeki tek ışık avucundaki çatlak ekran — ve o ekran her adımda biraz daha soluyor. İnleme bir an duruyor. Kafası karışmış gibi. İyi." },
        { type: "ambient", text: "Karanlıkta duvarı sayarak yürüyorsun. Bir menfez. Bir yangın dolabı. Bir duvar nişi — içinde bir şey tıkırdadı mı?" },
      ],
      choices: [
        { id: "nis", text: "Duvar nişini yokla (vakit kaybı — ama belki...)", next: "n_yolA_nis", if: { flag: "nisYoklandi", equals: false } },
        { id: "devam", text: "Durmadan ilerle", next: "n_yolA2" },
      ],
    },

    n_yolA_nis: {
      cost: 2,
      events: [
        { type: "flag", set: { nisYoklandi: true } },
        { type: "narrate", text: "Parmakların nişin içinde örümcek ağı, vida kutusu ve — işte: acil durum kiti. Yırtık, yağmalanmış, ama en dibinde ambalajlı bir tablet pili duruyor. Karanlıkta biri sana göz kırpıyor sanki." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devam", text: "İlerle", next: "n_yolA2" },
      ],
    },

    n_yolA2: {
      cost: 4,
      events: [
        { type: "narrate", text: "Karanlığın son on metresi en uzunu. İnlemenin yönünü kaybettin — arkanda mı, önünde mi, yoksa duvarların içinde mi? Elin hava kilidinin soğuk çarkına değdiğinde neredeyse sesli güleceksin." },
      ],
      choices: [
        { id: "kapak", text: "Hava kilidi çarkını çevir", next: "n_kapak" },
      ],
    },

    n_yolB: {
      cost: 1,
      noiseGate: [{ min: 70, once: "pusu3", node: "n_enc3" }],
      events: [
        { type: "flag", set: { yolAydinlik: true } },
        { type: "stat", stat: "gurultu", delta: 20, note: "GÜRÜLTÜ +20 — Çelik zeminde koşan botlar", noteKind: "alert" },
        { type: "narrate", text: "KOŞUYORSUN. Botların çelikte davul çalıyor, umurunda değil. İnleyen dönüyor — dalış maskesinin ölü camı bir an ışığı yakalıyor — ve HAREKET EDİYOR. Islak bir şey için imkansız bir hızla." },
      ],
      choices: [
        { id: "kapak", text: "Hava kilidine atıl", next: "n_kapak" },
      ],
    },

    n_enc3: {
      events: [
        { type: "alert", text: "⚠ ÖNÜNDEKİ BORU HATTI ÇÖKÜYOR" },
        { type: "narrate", text: "Tavandaki boru, tam önüne, bir tuzak gibi iniyor — buhar ve çelik!" },
      ],
      timer: { seconds: 3 },
      choices: [
        { id: "kay", text: "Altından KAY", next: "n_enc3_ok" },
        { id: "dur", text: "Durup geri çekil", next: "n_olum_boru", default: true },
      ],
    },

    n_enc3_ok: {
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "Dizlerinin üstünde, buharın altından kayıyorsun; sırtını çelik sıyırıyor ama ayaktasın ve hava kilidi ORADA." },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "kapak", text: "Hava kilidine atıl", next: "n_kapak" },
      ],
    },

    n_olum_boru: {
      death: true,
      deathText: "Geri çekildiğin yarım saniye, onun kapattığı mesafeydi. Buhar perdesinin arkasından uzanan şey soğuk — ve bu derinlikte kimse çığlığını duymuyor. Duyanlar ise... zaten dinliyordu.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "K-5 hava kilidi: bir tabut kapısı kadar ağır çelik çark. Her tur, on bir aylık pasa karşı bir güreş. Ve arkanda, koridorun ucunda, inleme YENİDEN başlıyor — bu kez yaklaşarak." },
      ],
      interaction: { kind: "valve", title: "K-5 HAVA KİLİDİ — ÇARKI ÇEVİR", turns: 6, success: "n_kapak2", cancel: "n_kapak" },
    },

    n_kapak2: {
      cost: 1,
      events: [
        { type: "system", text: "HAVA KİLİDİ: AÇIK — K-5 GEÇİŞİ HAZIR" },
        { type: "narrate", text: "Son turda kapak teslim oluyor. Ve tam eşikten geçerken — dönüp bakıyorsun. Yarım saniye. Işıklı koridorun ucunda: dalış kıyafeti, eğik duran bir baş ve maske camının ardında seni izleyen bir KARALTI.", if: { flag: "yolAydinlik", equals: true } },
        { type: "narrate", text: "Son turda kapak teslim oluyor. Ve tam eşikten geçerken — karanlığın içinde, tabletinin son ışığının değdiği yerde: bir dalış maskesinin camı, yarım saniye, seni YANSITIYOR.", if: { flag: "yolAydinlik", equals: false } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "kapat", text: "İçeri gir ve kapağı ARDINDAN çevir", next: "n_son" },
      ],
    },

    n_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapak oturuyor, sürgü kilitleniyor. Sırtını çeliğe verip kayıyorsun; ciğerlerin ancak şimdi, izinli, boşalıyor." },
        { type: "narrate", text: "Kapağın öbür yüzüne, tam kulağının hizasına, bir şey YASLANIYOR. Vurmuyor. Zorlamıyor. Sadece... duruyor. Sonra, çeliğin içinden, neredeyse nazik: tık. Tek bir vuruş. Sanki 'biliyorum' der gibi.", if: { flag: "isaret", equals: true } },
        { type: "narrate", text: "Kapağın öbür yüzü sessiz. Ne vuruş ne inleme. Bu gece boyunca ilk kez, kimse nerede olduğunu bilmiyor. Küçük bir zafer — ama senin.", if: { flag: "isaret", equals: false } },
        { type: "pause", ms: 1200 },
        { type: "glitch", ms: 400 },
        { type: "ambient", text: "Ve cebinde, kapalı duran tablet, kendi kendine cızırdıyor. Bir çocuk sesi. Sayıyor: «altı... beş...» Sonra susuyor. K-5'in karanlığı, merdivenin dibinde seni bekliyor." },
        { type: "ambient", text: "Cızırtının altında, çok daha derinde, ikinci bir katman duyuyorsun: ıslak nefes ve bir ninninin kırıntısı. Sen dinlediğini sanıyordun. Oysa bütün gece, DİNLENEN sendin.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "system", text: "— BÖLÜM 1 SONU: GECE VARDİYASI —" },
      ],
      choices: [
        { id: "k5", text: "Merdiveni tırman — K-5: Yaşam Destek", next: "n_k5_giris" },
      ],
    },
  },
};

// Bu bölümün başlangıç bayrakları:
export const EP01_FLAGS = {
  devreOnarildi: false,
  // keşif
  ranzaArandi: false, korIlk: false, revirGezildi: false,
  kantinGezildi: false, kantinIlkGoruldu: false,
  kavsakIlk: false, gecitIlk: false, depoIlk: false, sintineIlk: false,
  servisAcildi: false, platIlk: false, kor2Ilk: false,
  rafAlindi: false, cekmeceAcik: false, nisYoklandi: false,
  // ilerleme
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false,
  kod21: false, kod47: false, sigortaAlindi: false,
  // pusular ve işaret
  pusu1: false, pusu2: false, pusu3: false, isaret: false,
  // hikaye
  eceIlkTemas: false, yolAydinlik: false,
  // gizli frekanslar (motor set eder)
  frekansCocuk: false, frekansNefes: false, frekanslariDuydun: false,
};
