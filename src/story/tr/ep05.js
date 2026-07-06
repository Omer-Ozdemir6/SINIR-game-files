/* ============================================================
   SINIR-1 — BÖLÜM 5 (FİNAL): "K-2 / BULUNTU"  (tam sürüm)
   Sahibi yok — Buluntu bir varlık değil, bir KAYNAK. İstasyonun
   altına oyulmuş kadim bir kazı. 432 Hz'te "sayarak" zihinleri
   tek bir "aile" bilincine bağlıyor. Geri sayım gerçek: sıfıra
   ulaşırsa istasyondaki herkes — belki yüzey — tek bilinç olur.

   SON İNSAN MÜTTEFİK: Selin. Buluntu'yu susturma planı var ama
   tek başına yapamıyor. Ece (ele verilmediyse) sonar desteği verir.

   TAŞINAN KARARLARIN KARŞILIĞI (hepsi burada toplanır):
   · eceEleVerildi   → Ece'nin frekans desteği yok → final zorlaşır
   · nevinKurtarildi → Nevin'in kökleri son anda yol açar
   · sofraYedi       → Buluntu seni "aileden" sayar (sızma / risk)
   · denizSoruldu    → Deniz beklenmedik anda hattı açar
   · frekanslariDuydun→ Buluntu'nun dilini kısmen çözersin (kolaylık)

   FİNAL BULMACA: Buluntu'nun sayma frekansını TERSİNE çevirmek —
   sembol dizisi (onun dili) + radyo frekansı (432'yi devirmek).

   BEŞ SON:
   · YÜZEY    — sustur + kaç (en iyi): Selin + Ece + doğru seçimler
   · SESSİZLİK— yok et ama kendini feda et
   · DERİN    — Buluntu'ya katıl (karanlık)
   · KAYIT    — belgele ve öl (whistleblower sonu)
   · SIFIR    — geri sayımı durduramamak (kötü son / gizli değil)
   ============================================================ */

export const EP05 = {
  nodes: {

    /* ================= GİRİŞ — KAZI ================= */

    n_k2_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k2" },
        { type: "system", text: "KAT: K-2 — ARKEOLOJİ · KAZI SAHASI · [KAYIT DIŞI]" },
        { type: "narrate", text: "Merdiven seni artık çeliğe değil, KAYAYA bırakıyor. K-2 istasyonun bir parçası değil; istasyon bunun ÜSTÜNE kurulmuş. Devasa bir oyuk, kazı lambalarının soluk sarısıyla aydınlanmış, duvarları binlerce yıllık oymalarla kaplı. Ve her oyma aynı şeyi anlatıyor: bir daire, içinde azalan çentikler. Bir geri sayım." },
        { type: "narrate", text: "Oyuğun merkezinde iskeleler, kablolar, dua eder gibi dizilmiş ekipman — hepsi ortadaki şeyin etrafında. Onu henüz göremiyorsun ama HİSSEDİYORSUN: havada bir titreşim, dişlerinde bir uğultu, ve zihninde, çağrılmadan beliren bir sayı. Üç." },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Zihnine bir şey dokundu", noteKind: "alert" },
        { type: "narrate", text: "«Kımıldama.» Bir fısıltı — kayanın gölgesinden, canlı, insan. Bir kadın, kazı tulumu içinde, elinde el feneri ve paslı bir levye. «Sen... sen dönüşmemişsin. Gözlerin hâlâ senin. Tanrım, üç haftadır ilk.» Selin.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "«Kımıldama.» Bir fısıltı canlı, insan. Bir kadın, kazı tulumu içinde. «Sonar hattından bir ses seni haber verdi — Ece. Sana güveniyor. Ben Selin. Ve ikimizin yapması gereken bir şey var.» ", if: { flag: "eceEleVerildi", equals: false } },
        { type: "objective", text: "Selin'i dinle — Buluntu'yu durdurmanın yolunu öğren" },
        { type: "note", id: "not_k2", title: "K-2: Buluntu", text: "İstasyon bu kazının üstüne kurulmuş. Duvarlardaki her oyma bir geri sayım gösteriyor. Merkezde Buluntu var — henüz göremiyorum ama zihnime 'üç' diye bir sayı düştü. Selin burada, canlı, dönüşmemiş." },
      ],
      choices: [
        { id: "selin", text: "Selin'e yaklaş", next: "n_selin_plan" },
      ],
    },

    n_selin_plan: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin seni bir kaya çıkıntısının ardına çekiyor. Yüzü yorgun, elleri yara içinde ama gözleri keskin. «Dinle, vaktimiz yok. Şu an duyduğun sayı — üç — gerçek. Buluntu geri sayıyor ve sıfıra ulaştığında...» Duraksıyor. «Nevin'in kayıtlarını okudun mu? O zaman biliyorsun. Herkes 'aile' olur. Tek bir zihin. Yüzey dahil.»" },
        { type: "narrate", text: "«Buluntu bir ses. 432 hertz — sayma frekansı. Onu SUSTURMANIN tek yolu, kendi frekansını ona geri çevirmek: onun dilinde, ama tersten. Ben oymaları çözdüm — dizilimi biliyorum. Ama frekans vericisini tek başıma çalıştıramıyorum. Sen radyoyu ayarlarsın, ben dizilimi girerim.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«Ama bir sorun var. Vericiye ulaşmak için Buluntu'nun tam önünden geçmen gerek. O seni görecek. Ve seni... okuyacak.» Sana bakıyor. «Aşağıda ne yaptın? Yukarıdakilerin yemeğinden yedin mi? Çünkü Buluntu aileyi tanır. Yediyseniz, seni kendinden sayar — bu bir avantaj. Ya da bir tuzak.»", if: { flag: "sofraYedi", equals: true } },
        { type: "narrate", text: "«İyi haber: onlardan olmadığın belli. Yemeklerini yemedin, kokun temiz. Ama bu, Buluntu'nun seni bir tehdit olarak göreceği anlamına da geliyor. Dikkatli geç.»", if: { flag: "sofraYedi", equals: false } },
      ],
      choices: [
        { id: "ilerle", text: "Kazı sahasını keşfetmeye başla", next: "n_kazi_hub" },
        { id: "sor", text: "\"Sıfıra ne kadar var?\" diye sor", next: "n_selin_sifir" },
      ],
    },

    /* ================= KAZI SAHASI — KEŞİF MERKEZİ ================= */
    n_kazi_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin kaya çıkıntısının ardında kalıyor: «Ben burada kalıp vericiyi hazırlayayım. Sen etrafa bak — kazı ekibinin bıraktığı her şey işimize yarayabilir. Ama dikkat et: ne kadar çok ses çıkarırsan, Buluntu o kadar uyanır. Ve ne kadar çok BAKARSAN, o kadar içine işler.»" },
        { type: "narrate", text: "Kazı sahası bir labirent: sökülmüş iskeleler, terk edilmiş çadırlar, yarım kalmış tüneller. Dört yön: kazı ekibinin kamp alanı, oymalı galeri, sondaj kuyusu, ve ortadaki kadim kapı — Buluntu'ya giden yol. Her adımda zihnindeki sayı biraz daha yükseliyor: üç... hâlâ üç. Ama nabız gibi atıyor." },
        { type: "objective", text: "Kazı sahasını keşfet, sonra kadim kapıya git" },
      ],
      choices: [
        { id: "kamp", text: "Kazı ekibinin kamp alanına git", next: "n_kamp", if: { flag: "kampGoruldu", equals: false } },
        { id: "galeri", text: "Oymalı galeriye gir", next: "n_galeri", if: { flag: "galeriGoruldu", equals: false } },
        { id: "sondaj", text: "Sondaj kuyusuna yaklaş", next: "n_sondaj", if: { flag: "sondajGoruldu", equals: false } },
        { id: "sonar", text: "Sonar dizisi odasına gir", next: "n_sonar_oda", if: { flag: "sonarGoruldu", equals: false } },
        { id: "kapi", text: "Kadim kapıya ilerle (Buluntu)", next: "n_kadim_kapi" },
        { id: "dinlen", text: "Bir çadırın gölgesinde durup topla kendini", next: "n_kazi_dinlen", ifStat: { stat: "gurultu", gte: 35 } },
      ],
    },

    n_sonar_oda: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kazı ekibinin sonar dizisi odası: duvarları ekranlar, osiloskoplar ve dinleme cihazlarıyla kaplı. Çoğu ölü, ama biri hâlâ çalışıyor — bir dalga formu çiziyor: 432 hertz, sabit, sonsuz. Buluntu'nun sesi. Odanın ortasında bir teyp, üstünde bir not: 'DİNLEME. ÇALIŞTIRMA.'" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "calistir", text: "Teybi çalıştır (riskli)", next: "n_sonar_teyp" },
        { id: "cik", text: "Dokunma, odadan çık", next: "n_sonar_cik" },
      ],
    },

    n_sonar_teyp: {
      cost: 1,
      events: [
        { type: "narrate", text: "Teybe basıyorsun. Önce cızırtı, sonra kazı ekibinin sesleri — sonra o sesler yavaşça değişiyor, tek bir koroya dönüşüyor, sayıyor. Ve teybin sonunda, senin sesin. Henüz kaydetmediğin bir kayıt. Buluntu geleceği de duyuyor. Sen de artık onun sesini taşıyorsun." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Teyp seni de saydı", noteKind: "alert" },
        { type: "flag", set: { sonarGoruldu: true, sonarTeyp: true } },
      ],
      choices: [
        { id: "cik", text: "Odadan çık", next: "n_kazi_hub" },
      ],
    },

    n_sonar_cik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Teybe dokunmuyorsun — kazı ekibinin uyarısına saygı gösteriyorsun. Ama giderken, çalışan ekranda 432 hertzlik dalga formunu hafızana kazıyorsun. Vericide işine yarayabilir; Buluntu'nun sesini tanımak, onu susturmanın ilk adımı." },
        { type: "flag", set: { sonarGoruldu: true, sonarBildi: true } },
        { type: "stat", stat: "akil", delta: 3 },
        { type: "note", id: "not_sonar", title: "Sonar dizisi", text: "Kazı ekibinin sonar odasında Buluntu'nun sesini gördüm: 432 hertz, sabit. Teybe dokunmadım. Bu frekansı tanımak vericide işime yarayacak." },
      ],
      choices: [
        { id: "cik", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_kazi_dinlen: {
      cost: 1,
      events: [
        { type: "narrate", text: "Yırtık bir kazı çadırının içine süzülüyorsun. Bir an hareketsiz, nefesini tutarak bekliyorsun. Uğultu geri çekiliyor; kalp atışın yavaşlıyor. Buluntu'nun dikkati başka yöne kayıyor — şimdilik." },
        { type: "stat", stat: "gurultu", delta: -25, note: "Sessizlik — GÜRÜLTÜ azaldı", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_kamp: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kazı ekibinin kamp alanı: devrilmiş sandalyeler, kurumuş kahve fincanları, bir masaya yayılmış haritalar. Her şey aniden terk edilmiş gibi — sanki insanlar bir anda kalkıp gitmiş. Ya da çağrılmış. Duvarda, kırmızı sprey boyayla, titrek harfler: 'SAYMAYI BIRAKMA. SAYARSAN DUYAR.'" },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_kazi_gunluk", title: "Kazı Şefi'nin Günlüğü", style: "type",
          meta: "— Dr. R. Vardar, sondaj ekibi —",
          body: "14. gün. Buluntu'yu ilk çıkardığımızda tek parçaydı.\nSimdi buyuyor mu, yoksa biz mi kuculuyoruz\nbilmiyorum. Ekipten ucu uykusunda sayiyor.\n\n19. gun. Sayi herkesin kafasinda. 'Yedi' diyorlar,\nhep bir agizdan. Ben duymuyorum, henuz. Kulak\ntikaci ise yaramiyor; ses disaridan degil, iceriden\ngeliyor.\n\n21. gun. Yarisi gitti. Asagi indiler, Buluntu'ya.\nGulumseyerek. Ben son kalanim. Bu gunlugu bulan\nkisiye: sayma. Ne olursa olsun, o sayiyi zihninde\ntekrarlama. Saydigin an, seni bulur." } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL -8 — Okudukların içine işledi", noteKind: "alert" },
        { type: "flag", set: { kampGoruldu: true } },
      ],
      choices: [
        { id: "ara", text: "Kampı ara (kaynak)", next: "n_kamp_ara" },
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_kamp_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "Devrilmiş bir malzeme sandığını karıştırıyorsun. Çoğu işe yaramaz — kırık matkap uçları, boş konserveler. Ama en altta, bir bez parçasına sarılı, iki yedek pil ve bir de kulak tıkacı seti. Kazı şefi haklıydı: ses içeriden geliyor. Yine de pil, pildir." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { kampArandi: true } },
      ],
      choices: [
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_galeri: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Galeri, duvarları tabandan tavana oymalarla kaplı dar bir tünel. Her oyma aynı hikâyeyi anlatıyor: gökten (ya da denizden) inen bir şey, onu bulan insanlar, ve sonra insanların yüzlerinin silinişi. Sonuncu oymada yüzler yok — sadece daireler. Göz hizasında bir oyma seni izliyormuş gibi." },
        { type: "waitTap" },
        { type: "narrate", text: "Oymalara baktıkça başın dönüyor. Sanki taş kıpırdıyor, çentikler azalıyor. Zihnindeki sayı yükseliyor: üç... üç... Selin'in uyarısı aklında: ne kadar bakarsan, o kadar içine işler." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Oymalar zihnine kazınıyor", noteKind: "alert" },
        { type: "flag", set: { galeriGoruldu: true } },
      ],
      choices: [
        { id: "oku", text: "Son oymayı yakından incele (riskli)", next: "n_galeri_oyma" },
        { id: "cik", text: "Gözlerini kaçır, galeriden çık", next: "n_kazi_hub" },
      ],
    },

    n_galeri_oyma: {
      cost: 1,
      events: [
        { type: "narrate", text: "Son oymaya elini sürüyorsun. Taş soğuk değil — ılık, neredeyse canlı. Parmaklarının altında çentikler bir sıraya diziliyor ve aniden ANLIYORSUN: bu bir dizilim. Buluntu'nun dilinin bir parçası. Selin'in vericide ihtiyaç duyacağı sembollerden biri. Ama bu bilgi bedelsiz gelmedi — bir an için kendi adını hatırlayamadın." },
        { type: "flag", set: { galeriSembol: true } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL -8 — Bilgi, bir parçanı aldı", noteKind: "alert" },
        { type: "note", id: "not_galeri", title: "Galeri oyması", text: "Galerideki son oyma Buluntu'nun dilinden bir dizilim parçası içeriyor. Vericide işime yarayabilir — Selin'e söylemeliyim. Ama oymalara bakmak aklımı zorluyor." },
      ],
      choices: [
        { id: "geri", text: "Galeriden çık", next: "n_kazi_hub" },
      ],
    },

    n_sondaj: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Sondaj kuyusu: zemine açılmış, dibini göremeyeceğin kadar derin bir delik. Kazı ekibi Buluntu'ya buradan ulaşmış olmalı. Kenarında bir vinç, bir de hâlâ çalışan bir jeneratör var — gürültülü, tehlikeli ama belki işe yarar. Jeneratörü kapatırsan sessizlik kazanırsın; ama karanlık da çöker." },
        { type: "waitTap" },
        { type: "flag", set: { sondajGoruldu: true } },
      ],
      choices: [
        { id: "kapat", text: "Gürültülü jeneratörü kapat (sessizlik ama karanlık)", next: "n_sondaj_kapat" },
        { id: "bak", text: "Kuyunun dibine bak (riskli)", next: "n_sondaj_bak" },
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_sondaj_kapat: {
      cost: 1,
      events: [
        { type: "narrate", text: "Jeneratörün şalterini indiriyorsun. Uğultu kesiliyor — ve onunla birlikte kazı lambalarının yarısı sönüyor. Ama bu sessizlikte, ilk kez, kendi düşüncelerini duyabiliyorsun. Buluntu'nun uğultusu bile geri çekildi. Sessizlik bir silah." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Jeneratör sustu — GÜRÜLTÜ azaldı", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
        { type: "flag", set: { jeneratorKapali: true } },
      ],
      choices: [
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_sondaj_bak: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kuyunun kenarına eğilip dibe bakıyorsun. Karanlık... ve karanlığın içinde, çok aşağıda, soluk bir ışıltı. Buluntu'nun bir uzantısı, kökleri gibi yayılan iplikler. Ve sen baktığın an, o da SANA bakıyor. Zihnindeki sayı bir çığlığa dönüşüyor — geri çekil, HEMEN." },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — Buluntu sana baktı", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15, note: "İrkildin — GÜRÜLTÜ arttı", noteKind: "alert" },
        { type: "flag", set: { buluntuyaBakti: true } },
      ],
      choices: [
        { id: "geri", text: "Kuyudan uzaklaş", next: "n_kazi_hub" },
      ],
    },

    /* KADİM KAPI — gölge (kalıntı) bulmacası: RE7 tarzı 3D çevirme */
    n_kadim_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kazının merkezine giden yol, kayaya oyulmuş devasa bir kapıyla kesiliyor. Üstünde tek bir oyuk: dairesel bir işaret, ortasında bir göz, yayılan kollar. Selin fısıldıyor: «Bu kapıyı kazı ekibi hiç açamadı. Kilidi bir bilmece — şu kaidedeki kalıntıyı doğru açıyla tutman gerek.»" },
        { type: "narrate", text: "Kaidede, projektör lambasının önünde, deforme bir metal-kemik karışımı kalıntı duruyor; Buluntu'nun dokusundan bir parça. Onu çevirdikçe arkadaki duvara düşen gölgesi değişiyor — bir açıda anlamsız bir yumak, başka açıda... bir şeye benziyor. Doğru açıda gölgesi kapıdaki işarete dönüşmeli." },
        { type: "waitTap" },
        { type: "note", id: "not_kadim", title: "Kadim kapı", text: "Kazının merkezine giden kapı, gölge bilmecesiyle kilitli. Kaidedeki kalıntıyı çevirip eğerek, gölgesini kapıdaki işarete (dairesel göz + yayılan kollar) oturtmam gerek. Her açıda gölge farklı düşüyor." },
      ],
      interaction: {
        kind: "shadow",
        title: "KADİM KİLİT — GÖLGEYİ BUL",
        // hedef açı: kalıntının gölgesinin Buluntu işaretine döndüğü açı
        targetYaw: 0, targetPitch: 0,
        startYaw: 65, startPitch: -40,
        step: 15, tol: 12,
        success: "n_kadim_acildi",
        cancel: "n_selin_plan",
      },
    },

    n_kadim_acildi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Gölge işarete oturduğu an, kalıntı zayıf bir titreşimle karşılık veriyor — ve kadim kapı, taş üstünde taş kayarak, inleyerek açılıyor. Ardında karanlık bir sığınak, ve onun ötesinde kazının kalbi." },
        { type: "flag", set: { kadimAcildi: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Selin gölgeye bakakalıyor. «Kazı ekibi aylarca uğraştı bununla. Sen... sen nasıl bu kadar çabuk?» Cevap veremiyorsun. Sanki eller senin değil de başka birininmiş gibi doğru açıyı buldu. Buluntu seni çağırıyor olabilir mi?" },
      ],
      choices: [
        { id: "sigina", text: "Karanlık sığınağa gir", next: "n_siginak" },
      ],
    },

    /* ================= SIĞINAK — ÜÇ KURBANIN İZLERİ ================= */
    n_siginak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kapının ardındaki sığınak, Buluntu'ya açılan son eşik. Duvarlar boyunca oyuklar; her birinde, kazıya inip geri dönemeyenlerden kalanlar. Buluntu onları 'aile' yaptı — ama bedenleri burada kaldı, birer sunak gibi dizilmiş. Üç oyuk diğerlerinden taze. Ve o üçünü tanıyorsun." },
        { type: "waitTap" },
        { type: "objective", text: "Sığınağı geç — ama istersen üç izi incele" },
      ],
      choices: [
        { id: "baturay", text: "İlk oyuktaki tanıdık tulumu incele", next: "n_siginak_baturay", if: { flag: "izBaturay", equals: false } },
        { id: "deniz", text: "İkinci oyuktaki küçük figürü incele", next: "n_siginak_deniz", if: { flag: "izDeniz", equals: false } },
        { id: "nevin", text: "Üçüncü oyuktaki köklü kalıntıyı incele", next: "n_siginak_nevin", if: { flag: "izNevin", equals: false } },
        { id: "tunel", text: "Sığınaktan aşağı inen dar tünele bak", next: "n_tunel_giris", if: { flag: "tunelGoruldu", equals: false } },
        { id: "an", text: "Üç ize birlikte bak, bir an dur", next: "n_siginak_an", if: { flag: "izBaturay", equals: true } },
        { id: "gec", text: "Sığınağı geç, son eşiğe yürü", next: "n_son_hazirlik" },
      ],
    },

    n_siginak_an: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üç oyuğa birlikte bakıyorsun: Baturay, Deniz, Nevin. Bir teknisyen, bir çocuk, bir bahçıvan. Buluntu onları 'aile' yaptı ama aslında yalnızlaştırdı — her birini kendi sayısına hapsetti. Sen dördüncü olmayı reddettin. Belki de onları gerçekten onurlandırmanın tek yolu, bu sayıyı sonsuza dek susturmak." },
        { type: "waitTap" },
        { type: "narrate", text: "İçinde bir şey sertleşiyor. Korku hâlâ orada ama artık bir amacın var. Onlar için. Ve yukarıdaki, henüz dönüşmemiş herkes için.", ifStat: { stat: "akil", gte: 30 } },
        { type: "stat", stat: "akil", delta: 6, note: "AKIL +6 — Bir amacın var", noteKind: "system" },
      ],
      choices: [
        { id: "gec", text: "Sığınağı geç, son eşiğe yürü", next: "n_son_hazirlik" },
      ],
    },

    /* ================= İNİŞ TÜNELLERİ (opsiyonel derinlik) ================= */
    n_tunel_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Sığınağın köşesinde, aşağı inen dar bir tünel. Kazı ekibinin açtığı değil bu — daha eski, Buluntu'nun kendi 'kökleri'nin oyduğu bir geçit. İçeriden ılık, nemli bir hava ve alçak bir uğultu geliyor. Girmek zorunda değilsin. Ama içeride bir şey seni çağırıyor gibi." },
        { type: "waitTap" },
        { type: "flag", set: { tunelGoruldu: true } },
        { type: "narrate", text: "Selin arkandan sesleniyor: «Oraya inme. Kazı ekibinden ikisi indi, geri gelmediler. Ama... karar senin. İçeride bir şey olduğu kesin.»" },
      ],
      choices: [
        { id: "in", text: "Tünele in (riskli — derin keşif)", next: "n_tunel_derin" },
        { id: "vazgec", text: "Vazgeç, sığınağa dön", next: "n_siginak" },
      ],
    },

    n_tunel_derin: {
      cost: 1,
      events: [
        { type: "narrate", text: "Tünel seni aşağı, Buluntu'nun 'köklerinin' arasına indiriyor. Duvarlar nabız gibi atıyor; her adımda zihnindeki sayı yükseliyor. Burada, en dipte, kazı ekibinin son iki üyesinin bıraktığı şeyler var — ve bir seçim." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Kökler arasında", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "Uğultu seni sardı — GÜRÜLTÜ arttı", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sandik", text: "Kazı ekibinin bıraktığı sandığı aç", next: "n_tunel_sandik" },
        { id: "fisilti", text: "Uğultunun içindeki fısıltıyı dinle (çok riskli)", next: "n_tunel_fisilti" },
        { id: "cik", text: "Fazla derine indin — geri tırman", next: "n_siginak" },
      ],
    },

    n_tunel_sandik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sandık, su geçirmez bir kazı kasası. İçinde kuru bir günlük, üç yedek pil, ve bir de kulaklık — kazı ekibinin 'sesi bastırmak' için yaptığı bir düzenek. Günlüğün son sayfası yırtılmış ama bir cümle okunuyor: 'frekansı tersine çevirmek onu öldürmez — uyutur. Bir gün biri gelip yine uyandıracak.'" },
        { type: "battery", spares: 3 },
        { type: "document", open: true, doc: {
          id: "d_tunel_gunluk", title: "Son Kazıcının Günlüğü", style: "type",
          meta: "— tünelin dibinde —",
          body: "Ikimiz kaldik. Digerleri 'aile' oldu. Biz asagi\nindik, kaynagi gormek icin. Simdi anliyorum:\nBuluntu tek degil. Bu sadece bir ucu. Govdesi\ndaha derinde, denizin altinda, kilometrelerce.\n\nStasyon onu 'besliyor' — insanlarla. Susturursan\naclik kalir. Ve ac bir sey, er ya da gec, disari\nuzanir. Yuzeye dogru vurmaya baslar. Uc kez.\nHer zaman uc kez." } },
        { type: "flag", set: { tunelSandik: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "cik", text: "Sandığı bırak, yukarı tırman", next: "n_siginak" },
      ],
    },

    n_tunel_fisilti: {
      cost: 1,
      events: [
        { type: "narrate", text: "Uğultuya kulak veriyorsun. Ve fısıltı netleşiyor — binlerce ses, tek bir koro: sana adınla sesleniyorlar. Baturay, Deniz, Nevin, kazı ekibi, mürettebat, hepsi. «Katıl. Yalnız kalma. Say bizimle. Üç... üç... üç...» Zihnin kayıyor; bir an, gerçekten katılmak istiyorsun." },
        { type: "stat", stat: "akil", delta: -20, note: "AKIL -20 — Koro seni çağırdı", noteKind: "alert" },
        { type: "waitTap" },
        { type: "narrate", text: "Ama sonra, koronun altında, bir ses daha: kendi sesin. Titrek ama senin. Kulaklığı takıp uğultuyu kesiyorsun ve kendini geri çekiyorsun — bu sefer. Bir dahaki sefere direnebilecek misin, bilmiyorsun." },
        { type: "flag", set: { tunelFisilti: true } },
      ],
      choices: [
        { id: "cik", text: "Kendini topla, yukarı tırman", next: "n_siginak" },
      ],
    },

    n_siginak_baturay: {
      cost: 1,
      events: [
        { type: "narrate", text: "İlk oyukta bir bakım teknisyeni tulumu — seninkinin eşi. Göğsündeki isim etiketi: B. SOYLU. Baturay. Sana bu işi 'devraldığın' adam. İhbar mailini gönderen. Cesedi K-6 revirinde bulmuştun — ama bir parçası, bir 'yankısı' hep buradaymış. Elinde hâlâ sıkı sıkı tuttuğu bir kağıt var." },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_baturay_son", title: "Baturay'ın Son Notu", style: "hand",
          meta: "— sığınakta, elinde —",
          body: "Beni okuyan sensin, biliyorum. Benden sonra gelen.\nSeni buraya getirdiler cunku ben reddettim.\n\nO sana da 'uc' diyecek. Sakin sayma. Ben bir kez\nsaydim, sadece bir kez, merak ettim diye. O kadari\nyetti. Simdi hem oradayim hem burada.\n\nMaili gonderdim ama gec kaldim. Sen gec kalma.\nYukarida bir gazeteci var, Ergin. Ona ulas.\nDunya bilsin. — B." } },
        { type: "flag", set: { izBaturay: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Sığınağa dön", next: "n_siginak" },
      ],
    },

    n_siginak_deniz: {
      cost: 1,
      events: [
        { type: "narrate", text: "İkinci oyukta küçük bir figür — bir çocuğun boyutunda. Yanında bir walkie-talkie, bir çizgi film kaseti, ve duvara çizilmiş bir aile resmi: baba, anne, çocuk, el ele. Deniz. K-5'te sesini duyduğun, belki sana yol açan çocuk. Onun 'yankısı' da burada. Resmin altında titrek harfler: 'ben iyi bir çocuk oldum. artık hep birlikteyiz.'" },
        { type: "waitTap" },
        { type: "narrate", text: "Deniz'e o soruyu sormuştun — 'katıldın mı?' diye. İşte cevabı, taşa kazınmış. Ama eğer sana yukarıda yol açtıysa, bir parçası hâlâ direniyor demek.", if: { flag: "denizSoruldu", equals: true } },
        { type: "flag", set: { izDeniz: true } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "geri", text: "Sığınağa dön", next: "n_siginak" },
      ],
    },

    n_siginak_nevin: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üçüncü oyuk kök ve sarmaşıkla kaplı — Dr. Nevin Aras'ın izi. Botanikçi, K-3'ün bahçıvanı. Kökler hâlâ canlı, hafifçe kıpırdıyor, sanki nefes alıyor. Eğer onu kurtardıysan, bu kökler biraz sonra Buluntu'nun önünde sana yol açacak. Kurtaramadıysan, sadece bir mezar bu." },
        { type: "waitTap" },
        { type: "ambient", text: "Kökler bileğine dolanıyor — nazikçe, tehditkâr değil. Nevin'in sesi zihninde, son bir kez: «Kök sabırlıdır, yavrum. Ben seni bekledim. Şimdi ben yol olurum, sen geç.»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "flag", set: { izNevin: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Sığınağa dön", next: "n_siginak" },
      ],
    },

    n_selin_sifir: {
      cost: 1,
      events: [
        { type: "narrate", text: "«Bilmiyorum,» diyor Selin, dürüstçe. «Ben geldiğimde 'yedi' diyordu. Şimdi 'üç'. Günler mi, saatler mi — Buluntu'nun zamanı bizimki gibi akmıyor. Ama üçten sonra iki, ikiden sonra bir var. Ve bir'den sonra...» Durup kayaya bakıyor. «Acele etmemiz gerektiğini biliyorsun.»" },
        { type: "narrate", text: "Sen gizli frekansları dinlemiştin — Buluntu'nun sesini tanıyorsun. Selin'in bilmediğini biliyorsun: sayı düzenli değil. Hızlanıyor.", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      choices: [
        { id: "nasil", text: "\"Sen buraya nasıl geldin?\" diye sor", next: "n_selin_gecmis" },
        { id: "ilerle", text: "Kazı sahasını keşfetmeye başla", next: "n_kazi_hub" },
      ],
    },

    n_selin_gecmis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Selin bir an sessiz kalıyor. «Kazı ekibinin sonar teknisyeniydim. Yüzeyde, güvende. Ama ekipten haber kesilince beni indirdiler — 'bir bakın' dediler. On bir ay önce.» Acı bir gülüş. «İndiğimde herkes 'aile' olmuştu. Ben sağır doğdum — bir kulağım hiç duymadı. Belki de o yüzden Buluntu'nun sesi bana tam işlemedi. Yarım duyuyorum onu. Yarım insan kaldım.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«Bu yüzden sana ihtiyacım var. Ben diziyi okurum ama frekansı ayarlayamam — o sesi net duyman gerek, benim duyamadığımı. İkimiz bir bütün ediyoruz. Komik, değil mi? Buluntu herkesi birleştirdi; bizi de, ona karşı, birleştirdi.»" },
        { type: "stat", stat: "akil", delta: 5, note: "AKIL +5 — Bir müttefikin var", noteKind: "system" },
        { type: "note", id: "not_selin", title: "Selin", text: "Selin kazı ekibinin sonar teknisyeni. Bir kulağı sağır doğduğu için Buluntu'nun sesi ona tam işlememiş — yarım direnebiliyor. Diziyi o okuyacak, frekansı ben ayarlayacağım. Birbirimizi tamamlıyoruz." },
      ],
      choices: [
        { id: "ilerle", text: "Kazı sahasını keşfetmeye başla", next: "n_kazi_hub" },
      ],
    },

    /* ================= GEÇİT — BULUNTU'NUN ÖNÜ ================= */

    /* SON HAZIRLIK — geri dönüşü olmayan nokta */
    n_son_hazirlik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Sığınağın sonundaki eşikte duruyorsun. Ötesi Buluntu. Selin yanına geliyor, sesi alçak: «Bir kez geçince geri dönüş yok. Onun önünde durursak, bizi okur. Hazır mısın? Cebindekileri, aklındakileri kontrol et. Ötesinde ikinci şans olmayacak.»" },
        { type: "waitTap" },
        { type: "narrate", text: "Kulak tıkacı sende — kazı ekibinden. Buluntu'nun sesini tam kesmese de, en kötü anında sana bir saniye kazandırabilir.", if: { flag: "kampArandi", equals: true } },
        { type: "narrate", text: "Tünelde duyduğun koro hâlâ kulaklarında. Artık Buluntu'nun sesini tanıyorsun — ve ona karşı kendini nasıl toparlayacağını da.", if: { flag: "tunelFisilti", equals: true } },
        { type: "objective", text: "Hazır olduğunda Buluntu'nun önüne çık" },
      ],
      choices: [
        { id: "hazir", text: "Hazırım — Buluntu'nun önüne çık", next: "n_k2_gecit" },
        { id: "bekle", text: "Bir an dur, kendini topla (gürültü azalt)", next: "n_son_nefes" },
      ],
    },

    n_son_nefes: {
      cost: 1,
      events: [
        { type: "narrate", text: "Gözlerini kapatıyorsun. Bir nefes. İki. Kendi kalp atışını dinliyorsun, Buluntu'nun sayısını değil. Yavaşça, uğultu geri çekiliyor. Hazırsın." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Derin nefes — GÜRÜLTÜ azaldı", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
      ],
      choices: [
        { id: "hazir", text: "Buluntu'nun önüne çık", next: "n_k2_gecit" },
      ],
    },

    n_k2_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Kazının merkezine giden tek yol, Buluntu'nun tam önünden geçiyor. Ve şimdi onu görüyorsun." },
        { type: "waitTap" },
        { type: "narrate", text: "Kayanın içinde, yarı gömülü, bir şey. Ne bitki ne hayvan ne makine — üçü de, hiçbiri de. Nabız gibi atan, ıslak, kadim bir kütle; yüzeyinde açılıp kapanan şeyler göz olabilir, ağız olabilir, ya da sadece delik. Ondan yayılan titreşim kemiklerini buluyor. Ve zihnine, yumuşak bir anne sesiyle, bir sayı düşüyor: «üç... hoş geldin... üç...»" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — O zihnine bakıyor", noteKind: "alert" },
        { type: "narrate", text: "Verici platformu oyuğun öbür ucunda. Aranızda Buluntu ve onun 'gözü'. Selin fısıldıyor: «Sana bir yol açacağım — köklerle. Nevin'e ne yaptıysan, karşılığını şimdi alacaksın.»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "Verici platformu öbür uçta. Selin fısıldıyor: «Yol yok. Sadece koş ve o seni okurken dua et. Nevin'i kurtarabilseydin belki kökler yardım ederdi — ama artık yok.»", if: { flag: "nevinKurtarildi", equals: false } },
      ],
      choices: [
        { id: "gec", text: "Buluntu'nun önünden geç", next: "n_gecis_dene" },
      ],
    },

    n_gecis_dene: {
      cost: 1,
      events: [
        { type: "narrate", text: "Buluntu'nun bakışının içine adım atıyorsun. Zihnin ikiye bölünüyor: bir yanın koşuyor, öbür yanın DURMAK, sayıya katılmak, huzur bulmak istiyor. «üç... neden koşuyorsun... üç... burada herkes var... annen de var...»" },
        { type: "narrate", text: "Nevin'in kurtardığın kökleri kayadan fışkırıp Buluntu'nun 'gözünü' bir an örtüyor — sana bir pencere açıyor. «Şimdi! KOŞ!» diye bağırıyor Selin.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "Karnındaki lokma — Şef'in yemeği — seni bir an 'aileden' gösteriyor. Buluntu duraksıyor, seni tanıdık sanıyor. O duraksama sana yetiyor.", if: { flag: "sofraYedi", equals: true } },
        { type: "ambient", text: "Ve sonra, hiç beklemediğin yerden — tabletinin hoparlöründen, kilometrelerce yukarıdan, Deniz'in sesi: 「Sana bir soru sormuştun bana. 'Katıldın mı' diye. Cevabımı hâlâ bilmiyorum. Ama şu an, senin için, kat kapılarını açıyorum. Hepsini. Koş bakım — babama uğrama.」 Bütün oyuk boyunca kilitler açılıyor.", if: { flag: "denizSoruldu", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Vericiye koş", next: "n_gecis_orta", if: { flag: "nevinKurtarildi", equals: true } },
        { id: "kos2", text: "Vericiye koş (aileden sayılıyorsun)", next: "n_gecis_orta", if: { flag: "sofraYedi", equals: true } },
        { id: "kos3", text: "Vericiye koş (Deniz yolu açtı)", next: "n_gecis_orta", if: { flag: "denizSoruldu", equals: true } },
        { id: "direncsiz", text: "Sayıya diren, iradenle geç", next: "n_gecis_irade" },
      ],
    },

    /* geçişin ortası — gürültü/akıl durumuna göre yakalanma riski */
    n_gecis_orta: {
      cost: 1,
      events: [
        { type: "narrate", text: "Buluntu'nun tam önündesin. 'Gözü' sana dönüyor, uğultusu bedenini sarsıyor. Yarı yoldasın — bir adım daha, bir adım daha. Ve o an Buluntu seni 'okumaya' çalışıyor: ne kadar gürültülüysen, ne kadar aklın gitmişse, o kadar kolay yakalar." },
        { type: "waitTap" },
        { type: "narrate", text: "Sessiz ve aklı başında olman seni kurtarıyor — Buluntu bir şey yakalayamıyor, elinden kayıyorsun. Platform hemen önünde.", ifStat: { stat: "gurultu", lte: 50 } },
      ],
      choices: [
        { id: "ulas", text: "Platforma ulaş", next: "n_platform_ulas", ifStat: { stat: "gurultu", lte: 50 } },
        { id: "yakala", text: "İlerle (Buluntu seni hissediyor)", next: "n_gecis_yakala", ifStat: { stat: "gurultu", gte: 51 } },
      ],
    },

    n_gecis_yakala: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çok ses çıkardın. Buluntu'nun bir 'kolu' — kök mü, gölge mi, belli değil — bileğine dolanıyor. Uğultu zihnini dolduruyor, sayı bir emre dönüşüyor: DUR. Bir an, gerçekten duruyorsun. Selin'in çığlığı uzaktan geliyor: «SAVAŞ! KENDİ ADINI SÖYLE!»" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Buluntu seni yakaladı", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtul", text: "Kendi adını haykır, kurtul", next: "n_gecis_kurtul" },
        { id: "birak", text: "Direnme, bırak kendini (tehlikeli)", next: "n_son_derin" },
      ],
    },

    n_gecis_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Adını haykırıyorsun — kendi adını, Buluntu'nun sayısına karşı. Bir an her şey sessizleşiyor. Sonra kök bileğinden çözülüyor ve sen öne, platforma doğru atılıyorsun. Nefes nefese, titrek, ama hâlâ sen." },
        { type: "stat", stat: "gurultu", delta: -15, note: "Kurtuldun — GÜRÜLTÜ biraz düştü", noteKind: "system" },
      ],
      choices: [
        { id: "ulas", text: "Platforma ulaş", next: "n_platform_ulas" },
      ],
    },

    n_gecis_irade: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ne kökün ne aile bağın var — sadece iraden. Buluntu'nun sesi zihnine dolarken her adımı kendi adınla sayıyorsun, onun sayısını bastırmak için. Bir. İki. Üç — hayır, o değil, KENDİ üçün. Terli, titrek, ama insan kalarak platforma ulaşıyorsun." },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — İradenle geçtin ama bedeli ağır", noteKind: "alert" },
      ],
      choices: [
        { id: "verici", text: "Verici platformuna ulaş", next: "n_platform_ulas" },
      ],
    },

    /* ================= VERİCİ PLATFORMU — HAZIRLIK ================= */
    n_platform_ulas: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Platforma ulaştın. Buluntu arkanda, uğultusu sırtına vuruyor, ama artık konsolun başındasın. Selin kaya çıkıntısından koşarak yanına geliyor — ilk kez ikiniz de aynı yerde, aynı anda. «Başardın. Tanrım, gerçekten başardın.» Nefes nefese. «Şimdi zor kısım.»" },
        { type: "narrate", text: "Verici, kazı ekibinin Buluntu'yla 'konuşmak' için kurduğu bir sonar konsolu. Ama panelin yarısı ölü — jeneratör hattı kesik. Önce vericiye güç vermelisin: kesik hatları yeniden bağla. Selin elindeki şemayı gösteriyor: «Kabloları renk koduna göre bağla. Yanlış yaparsan kıvılcım çıkar — ve Buluntu gürültüyü sever.»" },
        { type: "objective", text: "Vericiye güç ver — kesik hatları bağla" },
        { type: "note", id: "not_verici_guc", title: "Verici güç hattı", text: "Verici konsolu güçsüz — kesik kabloları renk koduna göre yeniden bağlamam gerek. Yanlış bağlantı kıvılcım (gürültü) çıkarır. Güç gelince Buluntu'nun frekansını tersine çevirebiliriz." },
      ],
      choices: [
        { id: "bagla", text: "Kesik güç hatlarını bağla", next: "n_verici_guc", if: { flag: "vericiGuc", equals: false } },
        { id: "gecdur", text: "Güç geldi — dizilime geç", next: "n_verici", if: { flag: "vericiGuc", equals: true } },
      ],
    },

    n_verici_guc: {
      cost: 1,
      events: [
        { type: "narrate", text: "Konsolun arka panelini açıyorsun. Beş kesik kablo, uçları çıplak, jeneratör hattına bağlanmayı bekliyor. Selin ışık tutuyor. «Acele ama dikkatli. Her kıvılcım onu biraz daha uyandırır.»" },
      ],
      interaction: {
        kind: "wires",
        title: "VERİCİ GÜÇ HATTI — KABLOLARI BAĞLA",
        cables: [
          { id: "w_ana", label: "ANA", color: "#c2a24a" },
          { id: "w_sonar", label: "SONAR", color: "#4aa2c2" },
          { id: "w_amp", label: "AMP", color: "#c25a5a" },
          { id: "w_faz", label: "FAZ", color: "#5aa26a" },
          { id: "w_top", label: "TOPRAK", color: "#8a8a8a" },
        ],
        ports: [
          { id: "vp1", label: "I" },
          { id: "vp2", label: "II" },
          { id: "vp3", label: "III" },
          { id: "vp4", label: "IV" },
          { id: "vp5", label: "V" },
        ],
        pairs: { w_ana: "vp1", w_sonar: "vp4", w_amp: "vp2", w_faz: "vp5", w_top: "vp3" },
        penalty: { gurultu: 14, akil: -5, text: "KIVILCIM — Buluntu uyandı! GÜRÜLTÜ +14" },
        success: "n_verici_guc_ok",
        cancel: "n_platform_ulas",
      },
    },

    n_verici_guc_ok: {
      cost: 1,
      events: [
        { type: "system", text: "VERİCİ: GÜÇ AKTİF" },
        { type: "narrate", text: "Son kablo yerine oturduğu an konsol canlanıyor — ekranlar titreşerek uyanıyor, sonar tabağı yüksek bir vınlamayla dönmeye başlıyor. Buluntu bunu hissediyor: uğultusu bir an keskinleşiyor, zihnindeki sayı öfkeyle yükseliyor. «...üç... ne yapıyorsun... üç...» Selin konsola çöküyor: «Çalışıyor! Şimdi dizilim — çabuk!»" },
        { type: "flag", set: { vericiGuc: true } },
        { type: "stat", stat: "gurultu", delta: 10, note: "Verici uyandı — GÜRÜLTÜ arttı", noteKind: "alert" },
      ],
      choices: [
        { id: "dizilim", text: "Sembol dizilimine geç", next: "n_verici" },
      ],
    },

    /* ================= VERİCİ — FİNAL BULMACA ================= */

    n_verici: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Verici platformu: eski bir sonar konsolu, kazı ekibinin Buluntu'yla 'iletişim kurmak' için kurduğu ama başaramadığı düzenek. İki aşama: önce Buluntu'nun dilini — oymadaki sembol dizisini — girmen, sonra radyoyu 432'nin karşı-frekansına ayarlaman gerek." },
        { type: "narrate", text: "Selin konsolun yanına çöküyor: «Dizilimi ben okurum, sen sembolleri gireceksin. Oymalardaki sıra: üçgen-göz, kıvrım, dört-çentik, dalga. Buluntu'nun 'sus' kelimesi. Hazır mısın?»" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sembol", text: "Sembol dizisini gir (Selin okuyor)", next: "n_verici_sembol" },
      ],
    },

    n_verici_sembol: {
      cost: 1,
      events: [
        { type: "narrate", text: "Konsolun sekiz sembollü paneli — kazı ekibinin oymalardan kopyaladığı işaretler. Selin diziyi okuyor. Yanlış girersen Buluntu bunu bir saldırı sanır ve karşılık verir." },
      ],
      interaction: {
        kind: "symbols",
        title: "BULUNTU'NUN DİLİ — 'SUS' DİZİSİNİ GİR",
        glyphs: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
        sequence: ["g5", "g4", "g6", "g7"],
        success: "n_sembol_ok",
        cancel: "n_verici",
        penalty: { akil: -15, gurultu: 10, text: "YANLIŞ DİZİ — Buluntu saldırdı! AKIL -15" },
      },
    },

    /* Buluntu diziliş girilince direniyor — gerilim anı */
    n_sembol_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Dizilim kabul edildi — ve Buluntu bunu HİSSEDİYOR. Oyuk sarsılıyor; tavandan taş yağıyor, kazı lambaları çılgınca titriyor. Uğultu bir çığlığa dönüşüyor, zihnine bir çekiç gibi vuruyor. «HAYIR— aile— HAYIR— sayma durmasın—»" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Buluntu direniyor", noteKind: "alert" },
        { type: "waitTap" },
        { type: "ambient", text: "Ece'nin sesi sonar hattından, parazitli ama net: «Onu tutuyorum! Sonar hattından karşı-sinyal veriyorum, seni koruyor — ama uzun süre dayanamam. Frekansı ayarla, ÇABUK!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Ece yok — onu ele vermiştin. Karşı-sinyal desteği gelmiyor. Buluntu'nun tüm ağırlığı zihnine biniyor, tek başına dayanmak zorundasın.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Selin seni sarsıyor: «Dağılma! Son aşama — radyo frekansı! Yap şunu!»" },
      ],
      choices: [
        { id: "frekans", text: "Radyo frekansına geç", next: "n_verici_frekans" },
      ],
    },

    n_verici_frekans: {
      cost: 1,
      events: [
        { type: "narrate", text: "Semboller kabul edildi; konsol uğulduyor. Şimdi ikinci aşama: radyoyu Buluntu'nun 432 Hz'ine karşı-fazda ayarlamak. Selin: «433.6'ya çıkar — ben hesapladım. Onun frekansını tersine çevirecek. Ama bir kez şansımız var; yanlış frekans onu güçlendirir.»" },
        { type: "narrate", text: "Sen o frekansı tanıyorsun — gizli yayınları dinlemiştin. Selin'in 433.6 dediği yerde bir tereddüt var; senin kulağın 433.8'i doğru buluyor. Kime güveneceksin?", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      interaction: {
        kind: "radio",
        target: 433.6,
        success: "n_buluntu_yuz",
        cancel: "n_verici_frekans",
      },
    },

    /* ================= SUSTURMA ANI — SON DALLANMASI ================= */

    /* ================= BULUNTU İLE YÜZLEŞME ================= */
    n_buluntu_yuz: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Dizilim ve frekans hazır. Ama tetiğe basmadan önce, bir an — Buluntu'ya bakıyorsun. O da sana bakıyor. Ve ilk kez, sayının altında başka bir şey duyuyorsun: yalnızlık. Milyonlarca yıl, karanlıkta, tek başına. İnsanları 'aile' yapması bir saldırı değil, bir yalvarış olabilir mi? Yalnız kalmamak için." },
        { type: "waitTap" },
        { type: "narrate", text: "Selin omzunu sıkıyor: «Ne düşündüğünü biliyorum. Ben de düşündüm. Ama bu merhamet değil — bu, onun sesi. Seni de sayıya katmaya çalışıyor. Karar senin, ama çabuk ver. Sıfıra çok az kaldı.»" },
        { type: "narrate", text: "Sen Buluntu'nun dilini kısmen çözmüştün — ve şimdi anlıyorsun ki 'üç' bir geri sayım değil. Bir yaş. Üç... çağrı. O, üç kez çağırdı ve üç kez cevap aldı: Baturay, Deniz, Nevin. Sen dördüncü olmayı reddeden ilk kişisin.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "objective", text: "Buluntu'yu sustur — frekansı ateşle" },
      ],
      choices: [
        { id: "atesle", text: "Frekansı ateşle — Buluntu'yu sustur", next: "n_sustur" },
      ],
    },

    n_sustur: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Frekans kilitleniyor. Konsol, Buluntu'nun kendi sesini ona geri fırlatıyor — tersten. Bütün oyuk sarsılıyor; duvarlardaki oymalar çatlıyor, kazı lambaları patlıyor. Buluntu'nun sesi ilk kez DEĞİŞİYOR — sayıdan çığlığa. «üç— üç— üüü—»" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "waitTap" },
        { type: "narrate", text: "«Çalışıyor!» diye bağırıyor Selin. «Ama zayıflıyor, tam ölmüyor! Bir seçim yapmalıyız — ve şimdi yapmalıyız!» Buluntu'nun titreşimi zihnini dolduruyor; her seçenek net, korkunç bir şekilde net." },
        { type: "objective", text: "Buluntu'yla ne yapacağına karar ver" },
      ],
      choices: [
        { id: "yuzey", text: "Frekansı kilitle, Selin'le yüzeye kaç", next: "n_veda_selin", if: { flag: "eceEleVerildi", equals: false } },
        { id: "feda", text: "Vericiyi aşır — Buluntu'yu tamamen yok et (kendini feda et)", next: "n_son_sessizlik" },
        { id: "katil", text: "Direnmeyi bırak — sayıya katıl, huzuru seç", next: "n_son_derin" },
        { id: "kayit", text: "Tableti kaldır, her şeyi kaydet (belgele)", next: "n_son_kayit" },
        { id: "yuzey_zor", text: "Selin'le kaçmayı dene (Ece desteği yok)", next: "n_son_sifir", if: { flag: "eceEleVerildi", equals: true } },
      ],
    },

    /* ===== VEDA — YÜZEYE KAÇIŞ ÖNCESİ SON AN ===== */
    n_veda_selin: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Frekans kilitlendi, Buluntu inliyor. Selin bileğini kavrıyor ama bir an duruyor — sığınaktaki oyuklara, üç taze ize bakıyor. «Onları geride bırakıyoruz,» diyor boğuk bir sesle. «Baturay'ı. Çocuğu. Nevin'i. Kurtaramadık.»" },
        { type: "waitTap" },
        { type: "ambient", text: "Nevin'in kökleri son bir kez kıpırdıyor, sana yol açtığı gibi şimdi de Selin'in ayağının dibinden yükselip yukarı, çıkışa doğru uzanıyor. Onları geride bırakmıyorsun — onlar seni yukarı taşıyor.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "«Ama sen buradasın,» diyor Selin, gözlerini silerek. «Ve ben. İki kişi. Bu... bu bir şey. Koşalım. Onlar için de koşalım.» Sığınağın ötesinde, yukarı giden merdiven karanlıkta parlıyor." },
      ],
      choices: [
        { id: "kac", text: "Selin'le yukarı, yüzeye koş", next: "n_son_yuzey" },
      ],
    },

    /* ===== SON 1: YÜZEY (en iyi) ===== */
    n_son_yuzey: {
      ending: true,
      events: [
        { type: "narrate", text: "Frekansı kilitliyorsun. Buluntu'nun sesi bir inilti hâlinde alçalıyor, alçalıyor — ve susuyor. İlk kez, on bir aydır ilk kez, istasyon TAMAMEN sessiz." },
        { type: "waitTap" },
        { type: "ambient", text: "Sonar hattından Ece'nin sesi, ağlamaklı: «Durdu. Sayı durdu. Yukarıda... yukarıda insanlar uyanıyor. Kendilerine geliyorlar. Başardın. BAŞARDIN.»" },
        { type: "narrate", text: "Selin bileğini kavrıyor: «Kaçış kapsülü K-1'de, komuta katında. Buluntu susmuşken kapılar açık. KOŞ.» Birlikte yukarı, ışığa doğru koşuyorsunuz. Altı kat. Beş. Dört." },
        { type: "waitTap" },
        { type: "narrate", text: "Kaçış kapsülünün camından, SINIR-1 karanlığa gömülü bir mezar gibi küçülüyor. Selin yanında, nefes nefese, gülüyor — ya da ağlıyor. Ece'nin sesi telsizden: «Yüzeyde görüşürüz.» Üstünüzde, 214 metre yukarıda, gerçek bir gökyüzü var. Ve orada, ilk kez, hiçbir ses saymıyor." },
        { type: "waitTap" },
        { type: "ambient", text: "Kapsül yükselirken, dış gövdeye bir şey çarpıyor. Bir kez. Sonra düzenli aralıklarla: üç vuruş. Baturay'ın günlüğündeki gibi. İÇERİDEN değil — DIŞARIDAN, denizin derininden. Buluntu'yu susturdun; ama onu bunca yıl 'besleyen' şey, gövdeye vuran şey, hâlâ orada. Ve artık aç." },
        { type: "system", text: "— SON: YÜZEY —" },
        { type: "system", text: "Buluntu sustu. Selin ve Ece'yle birlikte kaçtın. Hayatta kaldın — ve gerçeği yüzeye çıkardın." },
        { type: "system", text: "Ama SINIR-1'in dibinde hâlâ vuran bir şey var. Ve birileri, senin gönderdiğin kanıtı okuyup oraya inmeye karar verecek." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 2: SESSİZLİK (fedakârlık) ===== */
    n_son_sessizlik: {
      ending: true,
      events: [
        { type: "narrate", text: "Vericiyi son kademeye zorluyorsun — konsol kıvılcımlar saçıyor, güvenli sınırın ötesine. Selin bağırıyor: «Hayır, o kadar güç seni de—» ama artık geç. Buluntu'nun sesini alıp bütün gücünle ona geri veriyorsun." },
        { type: "waitTap" },
        { type: "narrate", text: "Oyuk beyaz bir ışıkla doluyor. Buluntu'nun çığlığı ve senin çığlığın aynı frekansta birleşiyor. Onu yok ediyorsun — ama karşı-titreşim seni de içine alıyor. Son hissettiğin, Selin'in seni kapıya doğru İTMESİ: «Git! Ben hallederim demiştim ama sen— GİT!»" },
        { type: "waitTap" },
        { type: "ambient", text: "Selin dışarı fırlıyor, kapak arkasından kapanıyor. Sen içeride kalıyorsun, ışığın merkezinde. Buluntu ölürken, son bir armağan olarak, sana huzur veriyor: artık hiçbir sayı yok. Sadece sessizlik. Ve bu sessizlik, senin." },
        { type: "narrate", text: "Selin yüzeye çıkıyor. İstasyon susuyor. Kimse Buluntu'yu susturanın kim olduğunu asla bilmeyecek — ama herkes, o gece, tuhaf bir hafiflikle uyandı. Sanki biri onların yerine bir yük taşımıştı." },
        { type: "system", text: "— SON: SESSİZLİK —" },
        { type: "system", text: "Buluntu'yu yok ettin. Kendini feda ederek istasyonu — belki dünyayı — kurtardın. Selin kaçtı ve gerçeği anlatacak." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 3: DERİN (karanlık) ===== */
    n_son_derin: {
      ending: true,
      events: [
        { type: "narrate", text: "Direnmekten yorgunsun. On bir ay, altı kat, sayısız ölüm. Ve Buluntu'nun sesi çok yumuşak, çok davetkâr: «üç... bırak... üç... burada acı yok... herkes burada...» Ellerini konsoldan çekiyorsun." },
        { type: "waitTap" },
        { type: "narrate", text: "«Ne yapıyorsun?!» Selin'in sesi çok uzaktan geliyor, giderek uzaklaşıyor. Buluntu'nun titreşimi zihnini dolduruyor ve ilk kez direnmiyorsun — akıyorsun. Ve o huzur... gerçek. Aykut orada. Nevin orada. Baturay, Deniz, hepsi. Aile." },
        { type: "narrate", text: "Selin tek başına yüzeye kaçıyor, geride bir kişi daha bırakarak. Sen sayıya katıldın. Artık zihnin yok — biz'in bir parçasısın. Ve biz sayıyoruz. Sabırla. Sonsuza dek. Yeni birinin altı kat inip bizi bulmasını bekleyerek." },
        { type: "ambient", text: "«...üç... iki... üç... iki... hoş geldin...»" },
        { type: "system", text: "— SON: DERİN —" },
        { type: "system", text: "Buluntu'ya katıldın. Acı bitti. Sen de artık Aile'densin — ve bir sonraki 'evladı' bekliyorsun." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 4: KAYIT (belgeleme) ===== */
    n_son_kayit: {
      ending: true,
      events: [
        { type: "narrate", text: "Susturmak yerine tableti kaldırıyorsun. Baturay'ın ihbar maili aklında: 'her şeyi belgele.' Buluntu'nun her titreşimini, her oymayı, geri sayımı — hepsini kaydediyorsun. Dünya bunu görmeli. Bu tesiste ölen herkesin bir kanıtı olmalı." },
        { type: "waitTap" },
        { type: "narrate", text: "«Ne yapıyorsun, kaydı bırak, KAÇMAMIZ gerek!» diye bağırıyor Selin. Ama sen kaydediyorsun. Buluntu zayıflamış ama ölmemiş; geri sayım devam ediyor. «İki» diyor zihnine. Sonra «bir»." },
        { type: "narrate", text: "Selin sana son bir kez bakıp yüzeye koşuyor — tabletinin bir kopyasını alarak. O kaçıyor, kanıtla. Sen kalıyorsun, kayıtla. Buluntu 'sıfır' derken, tabletin belleği dolu ve güvende. Selin yüzeye çıkardığında dünya öğrenecek — senin sayende." },
        { type: "ambient", text: "Son karesinde, tabletin ekranında, kendi yüzün: sakin. Baturay gibi. Belgeleyen biri gibi. «...sıfır.»" },
        { type: "system", text: "— SON: KAYIT —" },
        { type: "system", text: "Kaçmadın — belgelemeyi seçtin. Öldün, ama Selin kanıtı yüzeye çıkardı. Gerçek artık saklanamaz. Baturay gurur duyardı." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 5: SIFIR (başarısızlık — Ece yoksa) ===== */
    n_son_sifir: {
      ending: true,
      events: [
        { type: "narrate", text: "Selin'le kaçmaya çalışıyorsun — ama Ece yok. Sonar hattı ölü; kapı kodlarını, güvenli rotayı bilen kimse yok. Ece'yi K-5'te ele vermiştin ve şimdi, tam da ihtiyacın olduğu anda, rehbersizsiniz." },
        { type: "waitTap" },
        { type: "narrate", text: "Yanlış koridora sapıyorsunuz. Kilitli bir kapı. Geri dönüyorsunuz — ama Buluntu 'iki' diyor artık, ve titreşim güçleniyor, çünkü onu tam susturamadın. Selin bileğini çekiştiriyor: «Başka yol, başka yol olmalı—» ama yok." },
        { type: "narrate", text: "«bir» diyor Buluntu. İstasyon uğulduyor. Yukarıda, uykudaki mürettebat aynı anda gözlerini açıyor — hepsi birden. «sıfır.»" },
        { type: "ambient", text: "Ve sayı durur. Çünkü artık saymaya gerek yoktur. Herkes — sen, Selin, yukarıdakiler, ve belki telsizin öbür ucundaki yüzey — artık tek bir şeydir. Tek bir aile. Tek bir sonsuz, sakin, boş zihin." },
        { type: "system", text: "— SON: SIFIR —" },
        { type: "system", text: "Buluntu'yu tam susturamadın ve Ece'siz kaçış yolunu bulamadın. Geri sayım sıfıra ulaştı. Aile artık herkesi kapsıyor. Belki yüzeyi de." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },
  },
};

export const EP05_FLAGS = {
  sonarGoruldu: false, sonarTeyp: false, sonarBildi: false,
  tunelGoruldu: false, tunelSandik: false, tunelFisilti: false,
  izBaturay: false, izDeniz: false, izNevin: false,
  vericiGuc: false,
  kampGoruldu: false, galeriGoruldu: false, sondajGoruldu: false, kampArandi: false, galeriSembol: false, jeneratorKapali: false, buluntuyaBakti: false,
  k2Ilk: false, kadimAcildi: false,
};
