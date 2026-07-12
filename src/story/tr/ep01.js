/* ============================================================
   PERISHED — BÖLÜM 1 v2: "K-6 / GECE VARDİYASI" (LABİRENT DOKUMASI)
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
        { type: "sting", name: "stingK6" },
        { type: "system", text: "PERISHED BAKIM TABLETİ v2.3 — YENİDEN BAŞLATILIYOR…" },
        { type: "system", text: "SAAT: 03:47 · DERİNLİK: 214M · HARİCİ BAĞLANTI: YOK (3 SA 12 DK)" },
        { type: "pause", ms: 900 },
        { type: "system", text: "ATANMA: BAKIM TEKNİSYENİ · SİCİL YENİ · GÖREV: RUTİN DENETİM" },
        { type: "narrate", text: "Üç gün önce gelen e-posta ilk bakışta lütuf gibiydi. 'PERISHED araştırma istasyonu, acil bakım personeli aranıyor.' Maaş akılalmazdı, mülakat yoktu, soru yoktu. Şimdi bunun bir iş ilanı değil, boşalan bir satıra yazılmış yeni isim olduğunu anlıyorsun. Denizaltının kapakları kapanınca yüzeyde kalan tek şey özgeçmişin oldu. Aşağıda seni bekleyen şey ise bir vardiya değil, düzgün dosyalanmış bir kayboluş." },
        { type: "narrate", text: "İşe alım formunda 'kapalı alan toleransı' diye tek satırlık bir kutucuk vardı. O kutucuğu işaretlediğin an bu yer seni yasal olarak yutmuş. Kimliğin, imzan, acil durumda aranacak kişinin numarası... Hepsi yüzeyde kalmış. Burada aşağıda yalnızca görev numaran var ve görev numarası çığlık atamaz." },
        { type: "narrate", text: "Seni uyandıran şey kulakları tırmalayan bir alarm değil. Jeneratörün aniden ÖLMESİ. Kulaklarındaki o uğultu bıçak gibi kesiliyor ve K-6 katının mutlak, boğucu karanlığı göğsüne bir karabasan gibi çöküyor. Kalbinin göğüs kafesini zorladığını hissediyorsun." },
        { type: "narrate", text: "Ranzadan doğrulurken nefesin daralıyor. Acil durum aydınlatmasının o hastalıklı kırmızı pırıltısı bile sönmüş, her yer kör karanlık. Panikle elini uzatıyorsun ve parmakların sana verilen şirketin bakım tabletini buluyor. Güç tuşuna bastığında tabletin ekranı aniden parlıyor; çiğ, mavi-beyaz, buz gibi bir ışık suratına çarpıyor. Şu an bu zifiri dünyadaki tek dayanağın, tek ışık kaynağın bu ekran. Önceki teknisyenden kalmış; parmak izleriyle lekelenmiş kilit ekranında silinmemiş bir isim parıldıyor: 'B. Soylu'." },
        { type: "note", id: "not_uyanis", title: "İlk gece", text: "Beni buraya iş için değil, boşalan bir ceset yuvasını doldurmak için çağırmışlar. Önceki teknisyen 'görevi bırakmış' dediler. Tablet onun. Parmak izleri hâlâ camda. Eğer Baturay gerçekten gittiyse neden bütün istasyon onun eşyasını bana miras bırakılmış bir kefen gibi veriyor? Ben paranoyak değilim. Bu yer daha ilk dakikadan yalan söylüyor." },
        { type: "waitTap" },
        { type: "objective", text: "K-6 güç kesintisini araştır." },
        { type: "ambient", text: "Yatakhanenin dışındaki koridordan, çok uzaktan, et parçası sürükleniyormuş gibi ıslak, ağır bir ses geliyor. Birkaç saniye sürüyor, sonra yerini ölümcül bir sessizliğe bırakıyor." },
        { type: "system", text: "TESİS İÇİ UYARI: Personel kaybı durumunda görev sürekliliği esastır. Kayıp personelin yerine atanan personel, önceki görevlinin ekipmanından sorumludur." },
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
        { type: "narrate", text: "Tableti havaya kaldırıp çiğ ışığı etrafa saçıyorsun. Sekiz ranza. Sekiz boşluk. Battaniyeler askeri nizamda katlanmış, yastıklar düzgün; burada panik izi yok. Bu daha kötü. İnsanlar korktuklarında dağıtır, düşürür, kırar. Buradakiler sanki tek bir komutla uyanmış, yataklarını toplamış ve karanlığın içine yürümüş. İtaat, bu odada kan izinden daha korkunç duruyor." },
        { type: "narrate", text: "Vedat yazan dolabın kapağına asılıyorsun. Kilit paslı, parmakların kayıyor, delirmiş gibi tüm gücünle çekiştiriyorsun ve koca çelik dolap büyük bir gürültüyle ÖNE DOĞRU DEVRELEREK çelik zemine PATLIYOR. Çıkan korkunç ses, dar koridorlarda bir kırbaç gibi yankılanıyor. Göğsün hızla inip kalkıyor, durup dehşetle karanlığı dinliyorsun." },
        { type: "stat", stat: "gurultu", delta: 8, note: "GÜRÜLTÜ +8 — Ses, boş koridorlarda uzun süre yankılandı", noteKind: "alert" },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Devrilen dolabın içinden bir yedek pil yuvarlanıp tabletinin ışığına çarpıyor. İç kapağa ise kan kırmızısı bir bantla yapıştırılmış, elden ele kopyalanmaktan yıpranmış bir kağıt var: katın krokisi. Vedat'ın titreyen eliyle köşesine kazıdığı notlar titrek ekran ışığında okunuyor." },
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
        { type: "narrate", text: "K-6 ana koridoruna adım atıyorsun. Tablet sadece birkaç adımı gösteriyor; geri kalan her şey yok hükmünde. Zemindeki ıslaklığı önce su sanıyorsun, çünkü beyin önce zararsız olanı seçiyor. Sonra ışık izi yakalıyor: geniş, yapışkan, kesintisiz. Bir beden böyle yürütülmez. Bir beden böyle taşınır. Ya da bir şey, artık beden sayılmayan kısmını yanında sürükler.", if: { flag: "korIlk", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "korIlk", equals: false } },
        { type: "narrate", text: "Panoda dünkü vardiyanın devir raporu asılı. Başlık, tarih, görev listesi; insanlar ölürken bile form düzenini bozmayan bir yer burası. Kağıdın kenarı kurumuş, sümüksü bir sıvıyla buruşmuş. Biri bunu okumuş, anlamış, sonra yine de aşağı inmiş. Belki emir böyleydi. Belki burada emir, içgüdüden daha güçlü.", if: { flag: "korIlk", equals: false } },
        { type: "document", open: true, if: { flag: "korIlk", equals: false }, doc: {
          id: "d_devir", title: "Vardiya Devir Raporu — 6. Gece",
          meta: "PERISHED · K-6 BAKIM · FORM 12-B · VARDİYA AMİRİ: B. SOYLU",
          body: "DEVREDEN: Baturay Soylu (gece)\nDEVRALAN: — (imza yok)\n\nAÇIK İŞLER:\n· Alt platform tahliye pompaları (A/B/C) arızalı.\n  Manuel ilk çalıştırma gerekiyor.\n· POMPA C'NİN SİGORTASI YANDI VE ÇIKARILDI.\n  Yedek sigortalar B-2 DEPOSUNDA.\n· Radyo odası erişim paneli yeniden kodlandı.\n  Kod, güvenlik gereği İKİYE BÖLÜNDÜ. (bkz. tutanak 7)\n· Ana hat, üç pompa da açılmadan BAŞLATILMAYACAK.\n\nUYARILAR:\n· Eski personel asansörü HİZMET DIŞI. Kabin yok,\n  şaft boş. Kapıyı KULLANMAYIN.\n· Sintine seviyesi yükseliyor. Tahliye 24 saat içinde\n  yapılmazsa K-6 su altında kalır.\n\nDİPNOT (el yazısı, different kalem):\nGece 3'ten sonra platforma tek başına inilmeyecek.\nSebep sorma. İn ve say: eksik miyiz?" } },
        { type: "flag", set: { korIlk: true } },
        { type: "ambient", text: "Sol tarafta, ekşimsi bir çürüme ve ağır kimyasal kokusu sızdıran aralık bir kapı var. İleride, mantığa meydan okurcasına kantinin sarı, titrek ışığı yanıp sönüyor. Koridorun ucu ise dipsiz bir kuyu gibi kapkara." },
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
        { type: "narrate", text: "Yatakhane soğuk ve ölü. Boş ranzalar tabletinin ekran ışığı altında iskelet gibi dizilmiş. Kapının eşiğinden içeri bakıp ürperiyorsun; burası artık güvenli bir sığınak değil, bir mezarlık." },
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
        { type: "narrate", text: "Revir odasındasın. Keskin antiseptik kokusu genzini yakıyor. İlaç dolabı vahşice yağmalanmış, camları yerde tuzla buz olmuş. Adımını atarken tabletinin ışığını muayene masasına doğru çeviriyorsun. Kusmamak için ağzını kapatıyorsun: orada bir ceset var. Göğsündeki kanlı isimlik zorlukla okunuyor: 'B. SOYLU'. Elindeki tabletin sahibi. Yerini almak için can attığın o adam. Gözleri sonuna kadar açılmış, donukça tavana bakıyor, ağzı açık kalmış. Yüzündeki o dehşet dolu sakinlik ruhunu kemiriyor. 'Görevi bıraktı' demişlerdi... Hayır, onu burada ölüme terk etmişler." },
        { type: "narrate", text: "Masasının yanında hâlâ açık duran medikal terminalde tek satırlık bir kayıt donup kalmış: 'Vardiya sürekliliği sağlandı.' Ölüm raporu değil. Acil tahliye değil. İnsan bedeni soğumadan önce sistemin ilk yaptığı şey, boşalan pozisyona yeni bir isim yazmak olmuş. Senin adın." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "Cesedin sağ eli sıkıca kapatılmış, kaskatı kesilmiş. Kusma dürtünü bastırarak, adamın soğuk, morarmış parmaklarını tek tek, zorlayarak açıyorsun. Derisi çıtırdıyor. Avucunun içinden kan lekeli, buruşmuş bir kağıt parçası çıkıyor. Aceleyle yazılmış iki rakam: \"58\". Devamı yırtılıp gitmiş." },
        { type: "note", id: "not_kod21", title: "Kod parçası: 58··", text: "Baturay ölürken bile bir şeyi saklamış. Avucunda iki rakam: 58. Bir insanın son refleksi dua etmek, annesini sayıklamak ya da yardım istemek olur sanırdım. Baturay şifre sakladı. Demek ki burada yardım çağırmak bile ancak ölü bir adamın parmaklarını kırarak mümkün." },
        { type: "flag", set: { kod21: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_revir", title: "Revir Kaydı — Hafta 42",
          meta: "PERISHED SAĞLIK BİRİMİ · GİZLİLİK: KURUM İÇİ",
          body: "NÖROİŞİTSEL TARAMA SONUÇLARI — ÖZET\nDÖNEM: Hafta 42 / Son 14 gün\n\nTest edilen personel: 23\nAnormal kulak çınlaması: 19\nUyku bölünmesi ve ani irkilme: 16\nDuvar içinden ses duyma beyanı: 11\nUykuda eş zamanlı sayı sayma: 9\n\nORTAK BULGU:\nUykuda sayı sayan dokuz personelin ses kayıtları karşılaştırıldı.\nDizinin başlangıcı, durakları ve nefes aralıkları aynıdır. Kayıtlar\nbirbirinden habersiz vardiyalarda alınmıştır.\n\nKLİNİK NOT:\nB. Soylu tedaviyi reddetti. 'Uyumamak yeterli' dedi. Kendisine düşük doz\nuyarıcı verildi. Nabız normale döndü; hasta çıkışta kendi gölgesine\nbakıp üç kez özür diledi.\n\nÖNERİ: Toplu tahliye ve yüzey psikiyatri sevki.\nKARAR: RED — H. Tekin / 'Vardiya düzeni bozulamaz.'" } },
      ],
      choices: [
        { id: "gunluk", text: "Baturay'ın göğüs cebindeki defteri al", next: "n_revir2" },
        { id: "cik", text: "Onu rahat bırak — çık", next: "n_koridor" },
      ],
    },

    n_revir2: {
      cost: 1,
      events: [
        { type: "narrate", text: "Baturay'ın sırılsıklam olmuş ceketinin iç cebine elini sokuyorsun. Küçük, parmak izleriyle ve kirli sıvılarla kaplı bir defter çıkarıyorsun. Kapağında delirmiş bir el yazısıyla tek bir kelime kazınmış: SAYMA. Sayfaları birbirine yapışmış, tablet ışığının soluk parıltısında zar zor seçiliyor." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "document", open: true, doc: {
          id: "d_gunluk", title: "Baturay'ın Günlüğü", style: "hand",
          meta: "— gece vardiyası defteri —",
          body: "3 Ekim\nKulaklarım bütün gün çınladı. Jeneratörün sesi\nsandım. Değilmiş. Jeneratörü kapattırdım, çınlama\ndurmadı. Ses makinede değil. Ses BENDE.\n\n9 Ekim\nMakinedeki ses; sanki kafamın içindeki sesin aynısı.\nGözümü kırpınca cızırtı görüyorum. Yağlı, karanlık\nbir şey iniyor göz kapaklarımın arkasından. Ama ses\nduvarların İÇİNDEN de geliyor. O sesi tanıyorum.\n\n14 Ekim\nVedat uykusunda sayı sayıyor. Altı. Beş. Dört.\nUyandırdım, hatırlamıyor. Bu gece revirde dokuz\nkişi saydık. HEPSİ AYNI YERDEN başlıyor.\n\n21 Ekim\nŞef 'aile toplantısı' yaptı. Kimse toplantıdan\nkonuşmuyor ama herkes gülümsüyor artık. Aynı\ngülümseme. Radyo odasının kodunu değiştirdim ve\nİKİYE BÖLÜNDÜ. Yarısı hep yanımda. Diğer yarısını\nsu basan tarafta, C panosunun oraya kazıdım.\nİkisi bir arada olmaz. Bana bir şey olursa:\nönce say. Sonra kaç.\n\n(son sayfa, bozuk el yazısı)\nBunu bulan kişi: adımı temize çıkarma. Beni kahraman\nsanma. Ben korktum, sustum, vardiyaya devam ettim.\nAma delirmedim. Bu tablet kanıt dolu. PERISHED insanları\nöldürmüyor sadece; ölmeden önce onları kullanışlı hale\ngetiriyor. Yüzeye çıkarsan herkese göster. Kimseye\n'kaza' deme. Bu bir karar." } },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Defteri silkerken arasından kayan yedek pil avucuna düşüyor. Baturay'ın bu leş çukurunda bıraktığı son şey. Zihninde o lanetli cümle yankılanıyor: 'Önce say. Sonra kaç.'" },
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
        { type: "narrate", text: "Kantine girince miden isyan ediyor. Sofra on iki kişi için kurulmuş; çatal bıçaklar hizalı, tabaklar yerli yerinde. Bu düzen bir aile yemeğine benzemeli, ama burada düzen misafirperverlik değil, tuzak. Küflü yemeklerin arasında yalnızca başköşedeki tabak tertemiz. Boş değil; ayrılmış. Birinin geç kalmasını bekleyen bir sandalye gibi. İçgüdün bunun senin için hazırlandığını söylüyor ve haklı çıkmaktan korkuyorsun.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "narrate", text: "Gözlerin duvardaki vardiya çizelgesine kayıyor. Tabletinin ekranını yaklaştırıp baktığında tüylerin diken diken oluyor.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "document", open: true, if: { flag: "kantinIlkGoruldu", equals: false }, doc: {
          id: "d_cizelge", title: "Vardiya Çizelgesi — ?? Hafta",
          meta: "PERISHED PERSONEL PLANLAMA · onay: H.T.",
          body: "PAZARTESİ\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nSALI\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nÇARŞAMBA\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nPERŞEMBE\n  00-08: AİLE      08-16: AİLE      16-24: AİLE\nCUMA\n  00-08: A İ L E   08-16: A İ L E   16-24: AİLE\nCUMARTESİ\n  00-08: AİLEAİLE  08-16: AİLEAİLEAİLE\nPAZAR\n  hep birlikte hep birlikte hep birlikte hep\n\n(alt köşe, kurşun kalem, minicik:)\ngeç kalan personel için yer ayrıldı" } },
        { type: "flag", set: { kantinIlkGoruldu: true } },
        { type: "ambient", text: "Masanın başındaki o temiz, boş tabağın hemen yanında küçük bir isim kartı var. Üzerine titreyen ışığı tuttuğunda kendi görev numaranı görüyorsun. Mutfağın gerisinde, paslı boruların gölgesinde bir servis kapısı kararıyor." },
      ],
      choices: [
        { id: "servis", text: "Mutfağın arkasındaki servis kapısını zorla", next: "n_servis" },
        { id: "cik", text: "Koridora dön", next: "n_koridor" },
      ],
    },

    n_servis: {
      cost: 2,
      events: [
        { type: "narrate", text: "Paslı servis kapısı sadece birkaç parmak açılıp sıkışıyor. Dişlerini sıkıp omuz atıyorsun, metal menteşe acı dolu bir çığlık atarak kırılıyor ve koridorda yankılanıyor.", if: { flag: "servisAcildi", equals: false } },
        { type: "stat", stat: "gurultu", delta: 5, note: "GÜRÜLTÜ +5 — Menteşe bütün kata duyuldu", noteKind: "alert", if: { flag: "servisAcildi", equals: false } },
        { type: "flag", set: { servisAcildi: true } },
        { type: "narrate", text: "Kapının ardı klostrofobik bir kabus. Daracık, pis bir geçit... Çürümüş erzak kolileri, yağlı borular ve tavandan sarkan koca et kancaları başının hemen üzerinden geçiyor. Boş kancalar... Kendini buna inandırmaya çalışıyorsun. Tabletin ekran ışığı, ilerideki daha yoğun, dipsiz bir karanlığın sınırında eriyor." },
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
        { type: "narrate", text: "Kavşaktasın; K-6'nın tüm ölümcül yolları burada birleşiyor. Sağ taraftaki merdivenlerden aşağıdan karanlık, yoğun bir su sesi geliyor — dalgaların çeliğe vuran düzenli çarpıntıları. Karşıdaki dar delik andıran bakım geçidinden yüzüne buz gibi, pis bir hava üflüyor. Solunda ise çelik kapıları eğrilmiş ESKİ ASANSÖR duruyor, üzerinde yırtılmış, adeta tırnaklanmış bir uyarı bandı var.", if: { flag: "kavsakIlk", equals: false } },
        { type: "flag", set: { kavsakIlk: true } },
        { type: "narrate", text: "İlerideki 6-B koridorunun elektronik kapısına yöneliyorsun ama panel zifiri, ölü duruyor. Güç gelmeden bu kapı aşılmaz bir duvar.", if: { flag: "gucAcik", equals: false } },
        { type: "narrate", text: "6-B koridorunun elektronik kilidi nihayet yeşil bir ışık kusuyor. Güç paneli uyanık, seni o zifiri karanlığa davet ediyor.", if: { flag: "gucAcik", equals: true } },
        { type: "ambient", text: "Zemindeki o korkunç ıslak sürüklenme izi tam burada ikiye bölünüyor: Bir kolu merdivenlerden aşağıya, suya iniyor. Diğeri ise... asansör kapısının ezilmiş alt aralığından içeri sızıyor." },
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
      deathText: "Çaresizlik gözünü kör etmiş. Kapıyı iki asılışta açıyorsun çünkü ardında kapıyı tutacak hiçbir mekanizma kalmamış. Kabin yok. Sadece 214 metrelik tesisin dibine, zifiri karanlığa inen ıslak, devasa bir boğaz. Uyarılar, raporlar, krokiler... Karanlıkta hızla aşağı düşerken hepsi zihninde patlıyor. Ve düşüşün bittiğinde seni sert bir zemin değil, aşağıda bekleyen yumuşak, vıcık vıcık ve bütünüyle UYANIK bir et yığını karşılıyor.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    /* ================= BAKIM GEÇİDİ → DEPO (döngü 2) ================= */

    n_gecit: {
      cost: 2,
      events: [
        { type: "narrate", text: "Bakım geçidi o kadar dar ki omuzların iki yandaki çeliğe sürtünüyor, paslı vidalar kıyafetini tırmalıyor. Bir yerlerdeki kaçak vana zifiri karanlıkta delice sızdırıyor, damlalar çeliğin üzerine beynini tırmalayan bir ritimle düşüyor: Tık. Tık. Tık.", if: { flag: "gecitIlk", equals: false } },
        { type: "flag", set: { gecitIlk: true } },
        { type: "ambient", text: "Damlaların ritmi bir anlığına boğuk bir şekilde kesiliyor... Sanki araya basan başka bir ağırlığın sesi karıştı. Sonra yeniden tıkırtılar başlıyor. Titreyen ellerinle tableti sıkıca kavruyorsun. Saymadın. Saymayacaksın." },
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
        { type: "narrate", text: "B-2 deposunun devasa silüeti tabletinin cılız ışığında beliriyor. Raf raf paslı parçalar, küflü konserveler, devrilmiş yağ bidonları... Tavandaki tek acil lamba içten içe kararmış, ölü bir göz gibi sarkıyor. İki çıkışın var: Biri kantinin o et kancalı pis geçidine, diğeri kavşağın dar tüneline açılıyor.", if: { flag: "depoIlk", equals: false } },
        { type: "document", open: true, if: { flag: "depoIlk", equals: false }, doc: {
          id: "d_basinc", title: "Basınç Günlüğü — K-6 Dış Gövde",
          meta: "OTOMATİK SENSÖR ÇIKTISI + VARDİYA EL KAYDI · depo arşivi",
          body: "GECE 1 — 03:00-04:00\n  Dış gövde temas: 6 vuruş. Kaynak: DIŞ. Balina? (V.)\n\nGECE 2 — 03:10-03:40\n  Dış gövde temas: 5 vuruş. Düzenli aralık.\n  Balinalar düzenli vurmaz. (B.S.)\n\nGECE 3 — 03:20-03:55\n  Temas: 4 vuruş. SENSÖR NOTU: titreşim imzası\n  İÇ kaynak paterni gösteriyor. Teknik hata? (B.S.)\n\nGECE 4 — 03:47\n  Temas: 3 vuruş. İçeriden. Kesin. Üç vuruş,\n  sintine tarafından. Aşağıda kimse yoktu.\n  KİMSE YOKTU. (B.S.)\n\nGECE 5 —\n  (kayıt yok)\n\nGECE 6 —\n  (bu gece)" } },
        { type: "flag", set: { depoIlk: true } },
        { type: "ambient", text: "Tableti raflara doğru tutuyorsun, göz hizandaki tozlu metalin üzerinde kazınmış şablon harfleri görüyorsun: \"ELEKTRİK YEDEK — SİGORTA/RÖLE\"." },
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
        { type: "narrate", text: "Deponun arkasındaki küf kokulu duvarda, koruma camı parça pinçik edilmiş bir devre panosu duruyor. İçindeki dokuz modül vahşice yuvalarından sökülmüş, ezilmiş ve rastgele yerlerine tıkıştırılmış... Sanki biri delirerek ışıkları kapatmaya çalışmış. Panonun üstündeki etiket lekeli: \"K-6 YEDEK AYDINLATMA HATTI\". Eğer bu modülleri doğru sıraya sokabilirsen, deponun can çekişen lambalarını uyarabilirsin." },
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
        { type: "narrate", text: "Son modülü yerine oturttuğun an pano yüksek sesle vızıldıyor ve deponun tavanındaki tozlu tüpler — kırpışarak — aniden uyanıyor. Hastalıklı, kirli sarı bir ışık odayı dolduruyor. Karanlık köşelere doğru çekiliyor; en azından bu odada tabletinin ışığı dışında bir şeyler görebilmek göğsünü rahatlatıyor." },
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
        { type: "narrate", text: "Kutuyu açıyorsun, içinde yalnızca tek bir ağır, cam gövdeli, içi kablo dolu yedek sigorta kalmış. Avucunu dolduruyor, buz gibi. Diğerlerini birileri kırmış ya da kasıtlı olarak bir yerlere SAKLAMIŞ." },
        { type: "note", id: "not_sigorta", title: "Yedek sigorta (C pompası)", text: "B-2 deposundan aldım. Devir raporu 'C'nin sigortası yandı ve çıkarıldı' diyordu — demek pompa C'nin panosuna bunu takacağım. Pano su basan tarafta olmalı: Baturay 'su basan tarafta, C panosunun oraya' diye yazmıştı." },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "Kutunun karanlık dibinde bir de yedek tablet pili parlıyor. Şimdilik şansın yaver gidiyor... Ama bilirsin, bu tesis bir şeyi elinden almadan hemen önce mutlaka küçük bir yem atar." },
      ],
      choices: [
        { id: "servis", text: "Servis geçidinden kantin tarafına geç", next: "n_servis_geri" },
        { id: "gecit", text: "Bakım geçidinden kavşağa dön", next: "n_kavsak" },
      ],
    },

    n_servis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "Dar servis tünelinden sürünerek kantine geri çıkıyorsun. O koku... Küflü sofranın yanından geçerken gözlerini o tabaklardan kaçırmak için kör gibi yapıyorsun. Ancak masanın başındaki o temiz tabağın sandalyesi... Hatırladığından bir karış geriye çekilmiş duruyor. Biri oraya oturmuş gibi. Bakma. Delireceksin. Yürü." },
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
        { type: "narrate", text: "Demir merdivenlerden aşağı, bileklerine kadar yükselen simsiyah, buz gibi suya iniyorsun. Pompa platformu... Sağında paslı, devasa A vanası; solunda ise karanlığa açılan B odasının kapısı duruyor. Karşıda, çiğ kırmızı bir acil durum ışığı ana paneli aydınlatıyor. Ve platformun dip tarafında, suyun İÇİNE DOĞRU gömülerek devam eden o daracık, klostrofobik sintine tüneli uzanıyor.", if: { flag: "platIlk", equals: false } },
        { type: "objective", text: "Pompa platformunu çalıştır." },
        { type: "flag", set: { platIlk: true } },
        { type: "ambient", text: "Siyah su ayak bileklerinde nabız gibi ağır ağır atıyor, tenini donduruyor. C pompası buralarda değil; boru hatları suyun içindeki o karanlık dehlize doğru batıp kayboluyor." },
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
        { type: "narrate", text: "Paslı bir borunun gölgesine sinip sırtını çeliğe yaslıyorsun ve ASLA KIMILDAMIYORSUN. Gözlerini kapatıp nefeslerini sayıyorsun. Bir... İki... Su sakinleşiyor, metal inlemeleri duruluyor. Tesis seni unuttu sanıyorsun... Ya da avını izleyen bir avcı gibi numara yapıyor." },
        { type: "stat", stat: "gurultu", delta: -25, note: "Ortalık sakinleşti — GÜRÜLTÜ azaldı", noteKind: "system" },
        { type: "ambient", text: "Çok derinden, düzenli bir metalik darbe sesi geliyor: Tık... tık... tık... Dış gövdeye içeriden vuruluyor. Emin olamıyorsun, çıldırmak üzeresin." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_pompaA: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa A dairesindesın. Dev vana kalın bir pas tabakasıyla tamamen kilitlenmiş gibi duruyor. Duvar panosunda basınç günlüğünün asılı olması gereken yer bomboş, sadece sacın üzerine beyaz tebeşirle alelacele kazınmış: \"günlük depoya kaldırıldı — B.S.\"" },
      ],
      interaction: { kind: "valve", title: "POMPA A — VANAYI ÇEVİR", turns: 9, success: "n_pompaA2", cancel: "n_platform", doneFlag: "pompaA", doneNext: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaA: true } },
        { type: "narrate", text: "Vana son bir gayretle, çığlık atarak dönüyor. Boruların içinden boğulan birinin gırtlağından çıkan o leş ses gibi su emilmeye başlıyor. Kolların pas ve kir içinde kalmış, kulaklarında pompanın canavarca homurtusu... İlki bitti." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_pompaB: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa B odası zifiri karanlığın ta kendisi. Elindeki tabletin cılız ekran ışığı önündeki üç adımdan fazlasını aydınlatmaya yetmiyor, ışık karanlığın içinde boğuluyor. Şalter panosu karşıda... Sağdaki çürümüş rafın üzerinde, kablo yığınlarının arasında turuncu renkli bir yedek pil parıldıyor." },
        { type: "ambient", text: "Odanın en karanlık köşesinde, tablet ışığının bittiği sınırda, eski bir dalış kıyafetine benzer devasa bir karaltı asılı duruyor... Ya da o asılı duran şey bir kıyafet değil, bir İNSAN bedeni. Işığı bir daha asla o köşeye tutmaya cesaret edemiyorsun." },
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
        { type: "narrate", text: "Parmakların pile değdiği an, yılların yorgunluğunu taşıyan çürük metal raf tamamen çöküyor; üzerindeki tüm ağır demir parçaları büyük bir patlamayla çelik zemine saçılıyor. Karanlık odada gözlerini sımsıkı kapatıp sesin bitmesini bekliyorsun. Kalbin ağzında atıyor." },
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
        { type: "narrate", text: "Şalter kolu paslı ve devasa, yayları gergin... Eğer yarıda bırakırsan parmaklarını kıracak kadar sertçe geri fırlayacak. Dişlerini sıkıp tüm ağırlığınla asılıyorsun. Karanlıkta soğuk terler döküyorsun." },
      ],
      interaction: { kind: "lever", title: "POMPA B — ŞALTERİ KALDIR", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform", doneFlag: "pompaB", doneNext: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaB: true } },
        { type: "narrate", text: "Metal kol yerine oturuyor ve koca oda muazzam bir titreşimle sarsılıyor. O köşede asılı duran şey — o leş kıyafet ya da her neyse — bu sarsıntıyla birlikte yavaşça SALLANMAYA başlıyor. Arkana bile bakmadan odadan fırlıyorsun." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    /* ================= SİNTİNE GEÇİDİ → POMPA C ================= */

    n_sintine: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sintine tüneline giriyorsun. Siyah su artık bel hizana kadar yükselmiş durumda, buz gibi soğuk etini dağlıyor. Her adımında su delice çalkalanıyor, çıkardığın sesler tünelde yankılanarak seni kelimenin tam anlamıyla buradaki her şeye İHBAR ediyor. Tavan iyice basıklaşıyor, sarkan paslı borular saçlarına sürtünüyor, seni daracık bir tabuta sıkıştırıyor.", if: { flag: "sintineIlk", equals: false } },
        { type: "stat", stat: "gurultu", delta: 4, note: "GÜRÜLTÜ +4 — Suda sessiz yürünmez", noteKind: "alert", if: { flag: "sintineIlk", equals: false } },
        { type: "flag", set: { sintineIlk: true } },
        { type: "ambient", text: "Önünde, tünelin dibinde bir sigorta panosunun ölü ekranı zar zor seçiliyor. Ve tam o anda fark ediyorsun: suyun yüzeyinde, senin adımlarının yaratmadığı, karşı taraftan, karanlığın içinden gelen ters dalgalar ve halkalar var... Bir şey sana doğru yüzüyor." },
      ],
      choices: [
        { id: "pano", text: "Dipteki panoya kadar ilerle", next: "n_pompaC" },
        { id: "geri", text: "Geri, platforma dön", next: "n_platform" },
      ],
    },

    n_pompaC: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pompa C panosunun önüne ulaşıyorsun. Yuvası BOMBOŞ. Sigorta yerinde değil, o boş delik yanık izleriyle çevrelenmiş simsiyah bir göz çukuru gibi sana bakıyor. Panonun hemen yanındaki çelik sacın üzerine keskin bir cisimle vahşice kazınmış iki rakam var: \"36\". Altında ise titrek bir el yazısıyla: \"öbürü bende\" yazıyor.", if: { flag: "kod47", equals: false } },
        { type: "note", id: "not_kod47", title: "Kod parçası: ··36", text: "C panosunun duvarına kazınmış: 36. 'Öbürü bende' diyor — Baturay'ın el yazısı bu. Demek kod: [ilk yarı][36]. İki parçayı birleştirmem gerek.", if: { flag: "kod47", equals: false } },
        { type: "flag", set: { kod47: true } },
        { type: "narrate", text: "Pompa C hattı artık çalışıyor. Pano hâlâ ıslak ve tehlikeli ama sigorta yuvaya kilitlenmiş; buraya tekrar dokunmanın sana kazandıracağı hiçbir şey yok.", if: { flag: "pompaC", equals: true } },
        { type: "narrate", text: "Bu aç göz çukuru bir yedek sigorta istiyor ama senin elinde hiçbir şey yok. Devir raporundaki notu hatırlamaya çalışıyorsun... Yedekler neredeydi?", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "alert", text: "POMPA C: SİGORTA YOK — YEDEK GEREKLİ", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "narrate", text: "Depodan aldığın o ağır, cam gövdeli büyük sigorta parmaklarının arasında sırılsıklam oluyor. Hat çılgınlar gibi titriyor; ibre yeşil bölgeye geldiği an sigortayı yuvaya çakman gerek. Eğer ıskalarsan bu su dolu ölüm çukurunda binlerce voltluk elektrik akımı seni kömüre çevirecek.", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
      ],
      choices: [
        { id: "tak", text: "Sigortayı yuvaya yerleştir", next: "n_pompaC_int", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
        { id: "geri", text: "Sudan geri dön — platforma", next: "n_platform" },
      ],
    },

    n_pompaC_int: {
      events: [
        { type: "narrate", text: "Nefesini tamamen tutuyorsun, kalbinin kulaklarındaki o güm güm sesini dinleyerek ibreyi kolluyorsun. Kara su dizlerinin, göğsünün etrafında yükseliyor. Karanlık da seninle birlikte bekliyor." },
      ],
      interaction: { kind: "fuse", title: "POMPA C — SİGORTAYI HİZALA", hits: 2, success: "n_pompaC2", cancel: "n_pompaC", doneFlag: "pompaC", doneNext: "n_platform" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaC: true } },
        { type: "narrate", text: "Sigorta yuvaya büyük bir 'çıt' sesiyle oturuyor ve üçüncü hat da devasa bir kükremeyle çalışmaya başlıyor. Su büyük bir girdap oluşturarak hızla çekilmeye başlıyor; tünelden geri kaçarken seviye dizlerine kadar iniyor. Şimdi tek şansın ana panel. O büyük kırmızı buton." },
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
        { type: "narrate", text: "Pompaların yırtıcı uğultusunun altından başka bir ses ayrılıyor. Su, bir bedenin değil, bir kararın önünden çekilir gibi ikiye yarılıyor. Gelen şey acele etmiyor; acele avlananlara aittir. Bu ise nerede olduğunu biliyor. Tabletini kapatıp saklanacak vaktin yok. Şimdi düşünmek bile bir tür gürültü." },
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
        { type: "narrate", text: "Kendini sudan söküp platformun demir iskelesine atıyorsun ve orada bir taş gibi DONUP KALIYORSUN. Gözlerini kapatıyorsun. O ıslak, devasa ağırlık tam üç adım önünde duruyor. Şırıl şırıl su damlıyor... Tavana değecek kadar uzun, devasa gövdesinden akan sular çeliğe vuruyor. Sonsuzluk gibi geçen bir dakikanın ardından, o yaratık arkasını dönüyor ve karanlığın içinde eriyip gidiyor." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Onu duydun. Çok yakındı.", noteKind: "alert" },
        { type: "ambient", text: "Yaratığın gittiği dehlizden kısık, derinden gelen metalik bir İNLEME yankılanıyor. Acı çeken bir makine gibi... Ya da kurbanını kandırmak için insan taklidi yapan bir iblis gibi." },
      ],
      choices: [
        { id: "don", text: "Platforma dön", next: "n_platform" },
      ],
    },

    n_olum_su: {
      death: true,
      deathText: "Aptal! Suda koşulamaz! Attığın her çılgın adım, çıkardığın her şapırtı bu katın duvarlarında yankılanarak yerini belli etti. Merdivenlere daha üç basamak kala, o ıslak, devasa ağırlık arkandan sırtına biniyor. Kemiklerinin kırılma sesini duyuyorsun ve K-6'nın simsiyah, leş suyu bir sır gibi üzerine kapanıyor.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ana kontrol panelinin önündesin. Çiğ kırmızı acil durum ışığı yüzüne vuruyor. Çatlak, tozlu CRT ekranının camında kendi korkudan delirmek üzere olan solgun yansımandan başka bir şey yok. Ekranın hemen altında, kalın bir pislik tabakasıyla kaplanmış plastik koruma kapağının ardında o duruyor: büyük, kan kırmızısı buton." },
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
        { type: "narrate", text: "Büyük kırmızı butona tüm gücünle vuruyorsun. Koca istasyon bir deprem gibi sarsılıyor; platformlar, merdivenler, koridorlar devasa sarı ışıklarla tek tek uyanıyor! O eski jeneratörlerin sağır edici canavarca homurtusu geri dönüyor ve bir anlığına... her şey çözülmüş gibi hissediyorsun." },
        { type: "pause", ms: 1200 },
        { type: "ambient", text: "Ancak hemen ardından, çok yukarılardan, katların çelik zeminlerinden dehşet verici, acı dolu bir İNLEME yükseliyor. Uzun, sabırlı ve sanki... avını bulan bir avcının minnettarlığıyla." },
        { type: "stat", stat: "gurultu", delta: 15, note: "GÜRÜLTÜ +15 — Işık ve makine sesi. Artık herkes biliyor.", noteKind: "alert" },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Dikkat dikkat. Makine dairesinde ışık görüldü. Aile bilgilendirildi.」" },
        { type: "anons", text: "「...Hoş geldin, geç kalan personel. Ben Deniz. Oryantasyonun başlamıştır.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "waitTap" },
        { type: "note", id: "not_anons", title: "Anonstaki ses", text: "Hoparlördeki adam kendini Deniz diye tanıttı. Bir cellat gibi değil, mesaide sıkılmış bir teknisyen gibi konuştu. 'Aile bilgilendirildi' dedi. Burada aile kelimesi bir sevgi biçimi değil; kapıları kilitleyen, ışıkları söndüren, insanları sıraya sokan bir prosedür. En korkuncu sesi değil. En korkuncu, sesindeki sakinlik." },
        { type: "objective", text: "Radyo odasına ulaş." },
        { type: "system", text: "K-6 ELEKTRONİK KİLİTLER: AKTİF — 6-B KORİDOR KAPISI AÇILDI" },
      ],
      choices: [
        { id: "yukari", text: "Merdivenden yukarı, kavşağa çık", next: "n_kavsak" },
      ],
    },

    /* ================= 6-B KORİDORU → RADYO ================= */

    n_koridor2: {
      checkpoint: true,
      cost: 1,
      noiseGate: [{ min: 65, once: "pusu2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "6-B koridoru artık aydınlık. Keşke karanlık kalsaydı. Gözlem odalarının camlarında buğu var; içeriden. Birileri, ya da bir şeyler, az önce camın ardında nefes almış. Üçüncü camdaki el izi yeni silinmiş gibi duruyor. Parmak boğumları insan ölçüsünü reddediyor. Bu odalar gözlem için yapılmıştı. Şimdi anlıyorsun: gözlemleyen taraf çoktan değişmiş." },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kor2Ilk", equals: false } },
        { type: "flag", set: { kor2Ilk: true } },
        { type: "narrate", text: "Koridorun tam sonunda radyo odasının ağır çelik kapısı görünüyor. Üzerindeki yeşil ekranlı kod paneli dijital bir ışık saçarak seni bekliyor." },
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
        { type: "narrate", text: "Koridorun en uzak ucundaki lamba büyük bir gürültüyle patlıyor. Hemen ardından bir sonraki... Sonra diğeri! Karanlık, aç bir canavar gibi koridorda SANA DOĞRU DELİCE KOŞUYOR ve o karanlığın içinden üzerine doğru gelen bir karaltı var!" },
      ],
      interaction: {
        kind: "chase",
        title: "6-B GÖZLEM KORİDORU",
        enemy: "KARANLIKTAKİ PERSONEL",
        success: "n_enc2_ok",
        fail: "n_olum_koridor",
        startDanger: 36,
        phaseMs: 1240,
        hints: {
          patrol: "Işıklar sırayla patlıyor. Kapıya doğru birkaç adım kazan.",
          search: "Camların arkasından nefes sesi geliyor. Duvar dibine sin.",
          near: "Koku yüzüne değdi. Nefesini tut, yoksa seni ayırt edecek.",
        },
      },
    },

    n_enc2_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "Sırtını çılgınlar gibi çelik duvara yapıştırıp gözlerini sımsıkı kapatıyorsun. Karanlık dalgası üstünden geçip gidiyor; yüzüne çarpan buz gibi, leş kokulu ıslak bir rüzgar... Keskin bir deniz dibi ve çürümüş et kokusu. Bir şey tam yüzünün bir karış önünde DURUYOR. Nefes almayı kesiyorsun, kalbin duracak gibi. Saymıyorsun bile, sadece ölmemek için dua ediyorsun." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Yüzünü hatırlamana gerek yok. Kokusu yeter.", noteKind: "alert" },
        { type: "narrate", text: "Yavaşça uzaklaşıyor. Koridorun lambaları titreyerek sanki hiçbir şey olmamış gibi yeniden yanıyor. Başını çevirip cama bakıyorsun; o buğulu camdaki el izi artık İKİ tane." },
      ],
      choices: [
        { id: "kapi", text: "Erişim paneline git — hemen", next: "n_kapipanel" },
      ],
    },

    n_olum_koridor: {
      death: true,
      deathText: "Korkuna yenik düşüp koşmaya başladın! Ama o karanlıktan kaçamazsın; o bu koridorun her deliğini biliyor. Enseni kavrayan buz gibi, ıslak parmakları hissediyorsun. Işıklar yeniden yandığında koridor bomboş... Sadece camlardaki o kanlı buğu izleri artık dışarıdan değil, içeriden yapılmış.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapipanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapıdaki panel dört haneli bir şifre istiyor. Dijital ekranda soğuk bir yazı yanıp sönüyor: 'YENİDEN KODLANDI — B.S.'" },
        { type: "system", text: "İPUCU: Kod iki parçaya bölünmüş durumda. Arşivindeki notları birleştir.", if: { flag: "kod21", equals: true } },
        { type: "alert", text: "Kodun ilk yarısı sende YOK. Baturay 'yarısı hep yanımda' yazmıştı... O şimdi nerede?", if: { flag: "kod21", equals: false } },
      ],
      interaction: { kind: "keypad", code: "5836", success: "n_radyo", cancel: "n_koridor2" },
    },

    n_radyo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "KOD KABUL — RADYO ODASI KİLİDİ AÇILDI" },
        { type: "narrate", text: "Ağır kapı tıslayarak açılıyor. Radyo odası... Bir duvar dolusu parçalanmış, kabloları dışarı sarkmış ölü cihazlar ve tam ortada acil durum telsiz konsolu duruyor. Çekmecelerden birinden gelen tuhaf bir tıkırtı sessizliği bozuyor." },
        { type: "narrate", text: "Duvarın üstündeki panoda eski yayın protokolü hâlâ asılı: 'Önce kayıt al, sonra yardım iste.' Harflerin altına birileri tırnaklarıyla ikinci bir cümle kazımış: 'Yardım gelmeyecekse en azından ölürken anlat.' Tabletini daha sıkı tutuyorsun. Bu küçük ekran artık fenerden çok mezar taşına benziyor." },
        { type: "document", open: true, doc: {
          id: "d_talep", title: "Numune Transfer Talebi — RED",
          meta: "PERISHED İÇ YAZIŞMA · FORM 4-A · ARŞİV KOPYASI",
          body: "TALEP EDEN: Dr. Nevin Aras (K-3 Biyoloji)\nTALEP: K-2 arkeoloji ambarındaki 'BULUNTU-1'\nüzerinden ek doku örneği alınması ve K-3\nlaboratuvarına transferi.\n\nGEREKÇE: ████████████████████████████████\n█████████ sayma davranışı ████████████\n██████████ kızımın kayıtları ██████████\n████████████ cevap veriyor ████████\n\nKARAR: RED.\n'Buluntuya kimse dokunmayacak. O, ailenin.\nAnlaşıldı mı Nevin? AİLENİN.'\n— H. Tekin, İstasyon Şefi" } },
        { type: "narrate", text: "Telsiz masasına çöküyorsun ama cihaz ölü. Arka kapağını telaşla söküyorsun: Beş lambalık sigorta devresi tamamen karmakarışık edilmiş, biri yanıyor, dördü kör göz gibi duruyor. Bu devreyi düzeltmeden dünyaya tek bir çığlık bile gönderemezsin." },
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
        { type: "narrate", text: "Tıkırdayan çekmeceyi çekiyorsun. İçinde boş silah kovanları gibi dizilmiş onlarca ölü pil var... Ama en arkada, ambalajı hiç açılmamış pırıl pırıl DOLU bir tablet pili duruyor. Birinin buraya geri dönebilmek için can havliyle sakladığı bir pil." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devre", text: "Güç devresini diz", next: "n_lights" },
        { id: "geri", text: "Koridora dön", next: "n_koridor2" },
      ],
    },

    n_lights: {
      events: [
        { type: "narrate", text: "Beş lamba, beş paslı anahtar... Birini çevirdiğinde yanındakiler de delirip yön değiştiriyor. Baturay olsaydı bunu hemen çözerdi ama Baturay artık revirde bir et parçasından ibaret." },
      ],
      interaction: { kind: "lights", success: "n_radyo2", cancel: "n_radyo" },
    },

    n_radyo2: {
      cost: 1,
      events: [
        { type: "system", text: "TELSİZ GÜÇ DEVRESİ: AKTİF — BANT TARAMASI HAZIR" },
        { type: "narrate", text: "Konsol büyük bir cızırtıyla ısınıyor ve odanın içini yoğun bir statik gürültü kaplıyor. Frekansların arasında bir yerlerde... Yaşayan bir insan olmalı. Sahil güvenlik, yüzey, herhangi biri..." },
        { type: "objective", text: "Acil durum bandını tara." },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_ece", cancel: "n_radyo" },
    },

    n_ece: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "ambient", text: "«Yüzey mi? ...Yüzey üç haftadır cevap vermiyor.» Statiğin içinden aniden bir kadın sesi yükseliyor. Bitkin, çaresiz ama GERÇEK bir insan sesi. Kulaklarına inanamıyorsun." },
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
        { type: "note", id: "not_ece", title: "Ece — sonar operatörü", text: "432.0'da bir insan sesi buldum. Ece. Üç haftadır karanlıkta saklanıyor ve hâlâ kendi adıyla konuşabiliyor; bu istasyonda mucize buna deniyor. Şef ışıkları görür dedi. Kantindeki masa hakkında uyaracaktı. Hat kesildi. Deniz onu tanıyor, avlıyor, eğleniyor. Eğer ölürsem bunu bulan kişi: Ece hâlâ hayatta olabilir. Onu bir anons sesi sanma. Ona inan." },
        { type: "pause", ms: 1000 },
        { type: "narrate", text: "Ve tam o anda duyuyorsun: Koridordan gelen o ıslak, ağır, sürüklenen adımlar... Kapının buzlu camına vuran sarı ışıkta devasa bir gölge büyüyor. Kapının kolu — yavaşça — aşağı doğru dönmeye başlıyor!" },
        { type: "objective", text: "Dolaba saklan." },
      ],
      choices: [
        { id: "dolap", text: "Ekipman dolabına gir — nefesini tut", next: "n_saklan" },
      ],
    },

    n_saklan: {
      events: [
        { type: "narrate", text: "Kendini çelik ekipman dolabına atıp kapağı çekiyorsun. İçerisi kapkara, ama karanlık saklanmak anlamına gelmiyor; sadece yakalanırken yüzünü görmeyeceğin anlamına geliyor. Izgaradan kapının açılışını izliyorsun. O ıslak ağırlık içeri giriyor. Parçalanmış dalış kıyafetinin içinde bir yaratık değil de görevinden çıkarılamamış bir personel var sanki. Hâlâ devriye geziyor. Hâlâ protokol uyguluyor." },
      ],
      interaction: { kind: "breath", holdMs: 8500, lungMs: 10000, success: "n_saklan_ok", fail: "n_olum_nefes" },
    },

    n_olum_nefes: {
      death: true,
      deathText: "Ciğerlerin patlamak üzere! Korkudan kalbin öyle bir çarpıyor ki dolabın sacı titriyor ve nefesini daha fazla tutamayıp hıçkırarak koyuveriyorsun. Dolabın kapağı tek bir hamlede vahşice sökülüp fırlatılıyor. Son duyduğun şey kendi çığlığın... Son gördüğün şey ise o parçalanmış dalgıç maskesinin arkasından sana bakan, kan çanağına dönmüş, delirmiş ama tanıdık bir İNSAN çift göz.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_saklan_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Ağır adımlar yavaşça odadan çıkıyor, kapı büyük bir gürültüyle çarpıyor. Dolabın içinde tam bir dakika daha sayıyorsun... Baturay'ın o altın değerindeki sözü zihninde kazılı: Önce say, sonra kaç. Titreyerek dolaptan çıkıyorsun." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "Telsiz masasına baktığında dehşete düşüyorsun: Cihaz vahşice parçalanmış, hoparlör bir göğüs kafesi gibi ikiye yarılmış. O şey... Dünyayla konuşmaya çalıştığını ANLAMIŞ ve sesini çıkardığın o makineyi cezalandırmış. Ece'ye buradan bir daha ulaşmanın imkanı yok." },
        { type: "alert", text: "RADYO: KALICI HASAR — K-6'DAN YAYIN ARTIK MÜMKÜN DEĞİL" },
        { type: "waitTap" },
        { type: "objective", text: "K-5 hava kilidine ulaş." },
        { type: "ambient", text: "Koridordan, çok yakından o tüyler ürperten metalik inleme sesi hâlâ geliyor. Gitmemiş... Kapının hemen ardında BEKLİYOR." },
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
        { type: "music", track: "k6b" },
        { type: "narrate", text: "Kapı aralığından dışarı bakıyorsun: O yaratık koridorun tam ortasında durmuş, sırtı sana dönük, kendi etrafında delice sallanarak uykusunda SAYIYOR gibi titriyor. K-5 hava kilidi koridorun tam diğer ucunda. İki yolun var ve ikisi de onun hemen yanından geçmek zorunda." },
        { type: "narrate", text: "Sol duvarda katın ana şalteri duruyor. Eğer onu indirirsen K-6 katı tamamen kör olacak; o canavar karanlıkta yavaşlayacak ama sen de tabletinin o soluk ekran ışığına mahkum kalacaksın. Ya da ışıklar açıkken, gürültüyü göze alıp deliler gibi KOŞACAKSIN." },
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
        { type: "narrate", text: "Şalteri aşağı indiriyorsun ve koca kat tek bir saniyede kapkara, sağır bir sessizliğe gömülüyor. Şimdi evrendeki tek ışığın elindeki o tabletin ekranı... Ve o ekranın ışığı her adımında biraz daha zayıflıyor, pili tükeniyor. Yaratığın inlemesi aniden kesiliyor, kafası karışmış gibi duraksıyor... Güzel." },
        { type: "ambient", text: "Kör karanlıkta elinle duvarı sayarak, sürünerek ilerliyorsun. Bir havalandırma... Bir yangın dolabı... Bir duvar nişi... O nişin içinden az önce bir şeyin tıkırtısı mı geldi?" },
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
        { type: "narrate", text: "Parmaklarını korkuyla o karanlık nişin içine sokuyorsun... Örümcek ağları, paslı vidalar ve... evet! Bir acil durum kiti buluyorsun. Parçalanmış, yağmalanmış ama en dibinde ambalajlı, sıfır bir tablet pili duruyor! Karanlığın içinde sana verilmiş bir lütuf gibi." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devam", text: "İlerle", next: "n_yolA2" },
      ],
    },

    n_yolA2: {
      cost: 4,
      events: [
        { type: "narrate", text: "Karanlıkta ilerlediğin o son on metre ömründen ömür götürüyor. O canavarın inleme sesinin yönünü kaybettin... Arkanda mı? Önünde mi? Yoksa tam tepende mi? Elin nihayet hava kilidinin o buz gibi çelik çarkına değdiğinde hıçkırarak ağlamamak için kendini zor tutuyorsun." },
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
        { type: "narrate", text: "DELİLER GİBİ KOŞUYORSUN! Ağır botların çelik zeminde adeta davul çalıyor, artık hiçbir şey umurunda değil! O inleyen canavar aniden sana doğru dönüyor —parçalanmış dalgıç maskesinin ölü camı koridor ışığını yakalayıp parlıyor— ve HAREKET EDİYOR! O hantal beden, ıslak bir et yığını için imkansız, korkunç bir hızla üzerine doğru fırlıyor!" },
      ],
      choices: [
        { id: "kapak", text: "Hava kilidine atıl", next: "n_kapak" },
      ],
    },

    n_enc3: {
      events: [
        { type: "alert", text: "⚠ ÖNÜNDEKİ BORU HATTI ÇÖKÜYOR" },
        { type: "narrate", text: "Tavandaki devasa yüksek basınç borusu büyük bir patlamayla tam önüne, bir giyotin gibi iniyor! Her yeri kızgın buhar ve çelik parçaları kaplıyor!" },
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
        { type: "narrate", text: "Kendini yere fırlatıp dizlerinin üstünde o kızgın buharın altından kayarak geçiyorsun; sırtını sıyıran çelik kıyafetini yırtıyor, etini yakıyor ama ayaktasın ve hava kilidi TAM KARŞINDA!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "kapak", text: "Hava kilidine atıl", next: "n_kapak" },
      ],
    },

    n_olum_boru: {
      death: true,
      deathText: "Korkup durakladığın o yarım saniye... Onun aradaki mesafeyi kapatması için yetti de arttı bile. Buhar perdesinin arkasından uzanan o devasa, buz gibi eller enseni kavrıyor. Bu derinlikte kimse çığlıklarını duymuyor... Duyanlar ise zaten zifiri karanlıkta senin can çekişmeni dinliyordu.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "K-5 hava kilidinin önündesin; bir tabut kapağı kadar ağır, devasa paslı bir çelik çark. Her bir turun, on bir aylık katılaşmış pasa karşı verdiğin bir ölüm kalım savaşı... Ve hemen arkanda, koridorun ucunda o korkunç inleme yeniden başlıyor; bu kez koşarak, hızla yaklaşıyor!" },
      ],
      interaction: { kind: "valve", title: "K-5 HAVA KİLİDİ — ÇARKI ÇEVİR", turns: 6, success: "n_kapak2", cancel: "n_kapak" },
    },

    n_kapak2: {
      cost: 1,
      events: [
        { type: "system", text: "HAVA KİLİDİ: AÇIK — K-5 GEÇİŞİ HAZIR" },
        { type: "narrate", text: "Son bir çılgın hamleyle çarkı çeviriyorsun ve kapak nihayet açılıyor. Tam eşikten öbür tarafa geçerken... Arkana bakma dürtüsüne yenik düşüyorsun. Yarım saniye... Aydınlık koridorun tam ucunda: O dalış kıyafeti, yana doğru tamamen kırılmış eğik bir baş ve maske camının ardındaki o simsiyah, dipsiz delilik seni izliyor.", if: { flag: "yolAydinlik", equals: true } },
        { type: "narrate", text: "Son bir çılgın hamleyle çarkı çeviriyorsun ve kapak nihayet açılıyor. Tam eşikten öbür tarafa geçerken... Kör karanlığın içinde, elindeki tabletin son nefesini veren soluk ışığının çarptığı yerde: Bir dalgıç maskesinin camı, yarım saniye boyunca senin o dehşet içindeki suratını sana GERİ YANSITIYOR.", if: { flag: "yolAydinlik", equals: false } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "kapat", text: "İçeri gir ve kapağı ARDINDAN çevir", next: "n_son" },
      ],
    },

    n_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapak büyük bir gürültüyle oturuyor, sürgüler kilitleniyor. Sırtını o kalın çeliğe verip yere çöküyorsun; ciğerlerin ancak şimdi, delice bir hıçkırıkla boşalıyor." },
        { type: "narrate", text: "Ve tam o anda, o kalın kapağın tam öbür yüzüne, kulağının hemen hizasına ağır bir şeyin YASLANDIĞINI hissediyorsun. Vurmuyor. Zorlamıyor. Sadece... Orada öylece duruyor. Sonra, çeliğin içinden gelen o ses, neredeyse nazikçe: Tık. Tek bir vuruş... Sanki 'buradayım ve seni biliyorum' der gibi.", if: { flag: "isaret", equals: true } },
        { type: "narrate", text: "Kapağın öbür yüzü tamamen sessiz. Ne bir inleme ne bir darbe sesi... Bu lanetli gece boyunca ilk kez, bu tesisteki hiçbir şey senin tam olarak nerede olduğunu bilmiyor. Küçük, zavallı bir zafer... Ama bütünüyle senin.", if: { flag: "isaret", equals: false } },
        { type: "pause", ms: 1200 },
        { type: "glitch", ms: 400 },
        { type: "ambient", text: "Ve tam cebinde kapalı duran o tablet, aniden kendi kendine cızırdayarak uyanıyor. Hoparlöründen dijital, bozuk bir çocuk sesi yükseliyor. Ağır ağır sayıyor: «...altı... beş...» Sonra aniden susuyor. K-5 katının dipsiz karanlığı, merdivenlerin dibinde seni bekliyor." },
        { type: "ambient", text: "O cızırtının altında, çok daha derinde ikinci bir ses katmanı duyuyorsun: Islak, hırıltılı bir nefes ve bozuk bir ninninin mırıltıları... Sen bütün gece etrafı dinlediğini sanıyordun. Oysa tüm bu zaman boyunca, karanlığın içinden DİNLENEN sendin.", if: { flag: "frekanslariDuydun", equals: true } },
        
      ],
      choices: [
        { id: "k5", text: "Merdiveni tırman — K-5: Yaşam Destek", next: "n_k5_giris" },
      ],
    },
  },
};

export const EP01_FLAGS = {
  devreOnarildi: false,
  ranzaArandi: false, korIlk: false, revirGezildi: false,
  kantinGezildi: false, kantinIlkGoruldu: false,
  kavsakIlk: false, gecitIlk: false, depoIlk: false, sintineIlk: false,
  servisAcildi: false, platIlk: false, kor2Ilk: false,
  rafAlindi: false, cekmeceAcik: false, nisYoklandi: false,
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false,
  kod21: false, kod47: false, sigortaAlindi: false,
  pusu1: false, pusu2: false, pusu3: false, isaret: false,
  eceIlkTemas: false, yolAydinlik: false,
  frekansCocuk: false, frekansNefes: false, frekanslariDuydun: false,
};
