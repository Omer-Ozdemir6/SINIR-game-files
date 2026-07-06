/* ============================================================
   SINIR-1 — BÖLÜM 2: "K-5 / SINAV"  (v3 — tam, labirent + parça kilidi)
   Katın sahibi: DENİZ OKUR — sistemden konuşan mühendis.

   YAPI (hub + serbest sıra):
   · n_hub: dört dala açılır; oyuncu sınavların sırasını SEÇER
   · üç sınav = üç KART PARÇASI (kart1/kart2/kart3)
   · üç parça toplanmadan n_cikis kapısı BOŞA döner (parça-kilit)
   · Ece hattı: adını verme kararı → eceGuven; ele verme → ihanet
   · Deniz sınavı: cevaplar denizOfke'yi oynatır, sonuçlar taşınır
   · mezuniyet → Harun kovalamacası (sefFarkindalik doğar) → final

   SEBEP-SONUÇ (oyuncu HATA yapabilir):
   · basınç şemasını okumadan Sınav 1 → yanlış vana → akıl −, gürültü +
   · tünel haritasını almadan Sınav 2 → kaybolma + ölümcül tahliye
   · Ece'ye adını verirsen Deniz sınav 3'te kullanır
   · Ece'yi ele verirsen eceGuven çöker (EP03'e taşınır)
   · Harun'da yanlış kaçış = ölüm; donakalmak İnleyen'de işe yarar,
     Şef'te YARAMAZ (o gözle görür) — önceki dersi yanlış genelleme
   ============================================================ */

export const EP02 = {
  nodes: {

    /* ================= GİRİŞ — KİLİTLENEN KAT ================= */

    n_k5_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k5" },
        { type: "system", text: "KAT: K-5 — YAŞAM DESTEK · HAVA İŞLEME · SU GERİ DÖNÜŞÜMÜ" },
        { type: "narrate", text: "Merdiven seni dev hava santrallerinin uğultusuna bırakıyor. K-5 nefes alan bir kat: borular soluyup veriyor, filtreler tıslıyor, tavanda havalandırma ağızları karanlık dişler gibi sıralanıyor." },
        { type: "narrate", text: "Üç adım atıyorsun — ve arkandaki kapı kendi kendine, nazikçe kilitleniyor. Ardından öndeki. Tık. Tık. Bir tuzağın değil, bir OYUNUN içine düştüğünü anlıyorsun." },
        { type: "waitTap" },
        { type: "glitch", ms: 300 },
        { type: "anons", text: "「İşte geldin. Ben Deniz. Sistem burada benim: her kapı, her kamera, her hoparlör. Sen ise... yeni oyuncaksın.」" },
        { type: "anons", text: "「Kural basit: bu katta üç ders var, her ders bir KART PARÇASI verir. Üçünü birleştirip çıkış kapısını açarsan K-4'e geçersin. Sırasını sana bırakıyorum — nereden başlayacağını görmek eğlenceli.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "objective", text: "Üç dersten kartın üç parçasını topla, çıkışı aç" },
        { type: "note", id: "not_deniz", title: "Deniz Okur", text: "Anonstaki adam: Deniz, sistem mühendisi. Kapılar, kameralar, hoparlörler onun. Beni laboratuvar faresi gibi koridorlara saldı. Sesinde nefret yok — eğlence var, ki bu daha kötü. Üç 'ders', üç kart parçası; kartı tamamlamadan çıkış yok." },
      ],
      choices: [
        { id: "ilerle", text: "Açık kalan tek koridordan ilerle", next: "n_hub" },
      ],
    },

    /* ================= MERKEZ HUB ================= */

    n_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Dört yöne açılan bir dağıtım kavşağı. Zeminde kuruyan bir su birikintisi, tavanda cansız kameralar — biri seni takip ediyormuş gibi hafifçe dönüyor.", if: { flag: "hubIlk", equals: false } },
        { type: "flag", set: { hubIlk: true } },
        { type: "status", items: [
          { label: "KART I", flag: "kart1" },
          { label: "KART II", flag: "kart2" },
          { label: "KART III", flag: "kart3" },
        ] },
        { type: "ambient", text: "Duvarda paslı yön levhaları: BASINÇ ODASI · TÜNEL AĞI · GÖZLEM ODASI · ÇIKIŞ. Levhaların altına biri tırnakla kazımış: 'sırayla değil, hazır olduğunda'." },
      ],
      choices: [
        { id: "basinc", text: "Basınç sesinin geldiği ıslak koridora sap", next: "n_s1_kapi", if: { flag: "kart1", equals: false } },
        { id: "tunel", text: "Tavan ağızlarının alçaldığı dar geçide gir", next: "n_s2_kapi", if: { flag: "kart2", equals: false } },
        { id: "gozlem", text: "Cam bölmeli sessiz koridoru izle", next: "n_s3_kapi", if: { flag: "kart3", equals: false } },
        { id: "destek", text: "Kıvılcım saçan yaşam destek paneline bak", next: "n_destek_panel", if: { flag: "destekOnarildi", equals: false } },
        { id: "cikis", text: "Ağır çıkış kapısına git", next: "n_cikis" },
        { id: "dinlen", text: "Bir borunun gölgesinde durup soluklan", next: "n_hub_dinlen", ifStat: { stat: "gurultu", gte: 30 } },
      ],
    },

    /* YENİ: yaşam destek paneli — wires bulmacası (kablo eşleştirme) */
    n_destek_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kavşağın köşesinde, sökülmüş bir yaşam destek panelinin kapağı sarkıyor. İçeride beş kablo yuvalarından çıkmış, uçları çıplak, ara sıra kıvılcım atıyor. Panel etiketi: \"K-5 HAVA DÖNGÜSÜ — O2/CO2 DENGE\". Deniz'in — ya da başka birinin — bu paneli kasten sabote ettiği belli. Kabloları doğru portlara bağlarsan bu kattaki hava temizlenir; gürültün daha az iz bırakır." },
        { type: "note", id: "not_destek", title: "Yaşam destek paneli", text: "K-5 hava döngüsü paneli sabote edilmiş — beş kablo yuvalarından sökülmüş. Renkleri portlarla eşleştirmem gerek. Onarırsam hava temizlenir, hareketim daha sessiz olur." },
      ],
      interaction: {
        kind: "wires",
        title: "HAVA DÖNGÜSÜ — KABLOLARI BAĞLA",
        cables: [
          { id: "c_o2", label: "O₂", color: "#4aa2c2" },
          { id: "c_co2", label: "CO₂", color: "#8a8a8a" },
          { id: "c_pmp", label: "POMPA", color: "#c2a24a" },
          { id: "c_fan", label: "FAN", color: "#5aa26a" },
          { id: "c_val", label: "VALF", color: "#c25a5a" },
        ],
        ports: [
          { id: "p1", label: "1" },
          { id: "p2", label: "2" },
          { id: "p3", label: "3" },
          { id: "p4", label: "4" },
          { id: "p5", label: "5" },
        ],
        pairs: { c_o2: "p3", c_co2: "p1", c_pmp: "p5", c_fan: "p2", c_val: "p4" },
        penalty: { gurultu: 4, text: "YANLIŞ BAĞLANTI — kıvılcım, kısa devre" },
        success: "n_destek_onarildi",
        cancel: "n_hub",
      },
    },

    n_destek_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "HAVA DÖNGÜSÜ: DENGELENDİ" },
        { type: "narrate", text: "Son kablo yuvasına oturduğu an panel canlanıyor; fanlar dönmeye başlıyor, havadaki o ağır, metalik koku dağılıyor. İlk kez K-5'te derin bir nefes alabiliyorsun. Temiz hava, temiz kafa demek." },
        { type: "flag", set: { destekOnarildi: true } },
        { type: "stat", stat: "akil", delta: 6, note: "AKIL +6 — Temiz hava", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Kavşağa dön", next: "n_hub" },
      ],
    },

    n_hub_dinlen: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sırtını soğuk boruya verip nefesini sayıyorsun. Bir. İki. Kameranın kırmızı ışığı yavaşça sönüyor — Deniz başka bir şeye bakıyor. Şimdilik." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Ortalık sakinleşti — GÜRÜLTÜ azaldı", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Kavşağa dön", next: "n_hub" },
      ],
    },

    /* ================= SINAV 1 — BASINÇ (kart parçası I) ================= */

    n_s1_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Ders bir: BASINÇ. İçeride üç vana. Doğru sırayla açarsan oda dengelenir ve kartın ilk parçasını alırsın. Yanlış sırayla açarsan... kulakların bana teşekkür eder.」" },
        { type: "narrate", text: "Kapının yanında yağ lekeli bir pano. Üstünde bir şema — ama birikmiş kir yüzünde. Okumak için eğilip silmen gerekecek; ya da şansını denersin." },
      ],
      choices: [
        { id: "oku", text: "Panoya eğil, şemayı sil ve oku", next: "n_s1_sema" },
        { id: "gir", text: "Vakit kaybetme, doğruca içeri gir", next: "n_s1" },
      ],
    },

    n_s1_sema: {
      cost: 1,
      events: [
        { type: "flag", set: { s1SemaOkundu: true } },
        { type: "document", open: true, doc: {
          id: "d_havasema", title: "Basınç Dengeleme Prosedürü",
          meta: "SINIR-1 · K-5 YAŞAM DESTEK · TALİMAT 3-C",
          body: "BASINÇ ODASI — VANA AÇILIŞ SIRASI\n\nUYARI: Sıralamaya kesinlikle uyulacaktır.\n\n  1) DENGELEME  (sarı)  — iç/dış basıncı eşitler\n  2) TAHLİYE    (kırmızı)— fazla basıncı sintineye atar\n  3) ANA BESLEME(yeşil)  — hattı açar\n\nSIRAYI BOZAN, KULAĞIYLA ÖDER.\n(revir, hafta 12: T. Demir — sol kulak, kalıcı)" } },
        { type: "note", id: "not_havasema", title: "Basınç sırası", text: "Vana sırası: önce SARI (dengeleme), sonra KIRMIZI (tahliye), en son YEŞİL (ana besleme). Yanlış sıra kulak zarı demek." },
      ],
      choices: [
        { id: "gir", text: "Basınç odasına gir", next: "n_s1" },
      ],
    },

    n_s1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Oda, kulak zarında hissedilen bir gerginlikle dolu. Üç vana: sarı, kırmızı ve dipte yeşil boyalı büyük çark. Basınç ibresi turuncu bölgede titriyor.", if: { flag: "s1Ilk", equals: false } },
        { type: "flag", set: { s1Ilk: true } },
        { type: "alert", text: "ODA BASINCI: YÜKSEK — SIRALAMAYI DOĞRU SEÇ" },
        { type: "narrate", text: "Şemayı okumadın. Hangi vana önce? Bir tahmin — ve tahminin bedeli kulağın.", if: { flag: "s1SemaOkundu", equals: false } },
      ],
      choices: [
        { id: "sari", text: "SARI vanayı aç", next: "n_s1_b" },
        { id: "kirmizi", text: "KIRMIZI vanayı aç", next: "n_s1_yanlis" },
        { id: "yesil", text: "YEŞİL çarkı aç", next: "n_s1_yanlis" },
      ],
    },

    n_s1_yanlis: {
      cost: 1,
      events: [
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Vana döner dönmez oda üstüne çöküyor: basınç dalgası kulaklarına iki çivi gibi giriyor. Dizlerinin üstünde, ağzın açık, sesin sana ait olmayan bir çınlamayla doluyor." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Kulakların hâlâ çınlıyor", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "GÜRÜLTÜ +10 — Basınç dalgası tüm katta duyuldu", noteKind: "alert" },
        { type: "anons", text: "「Uuu. Şemayı okumadın demek. Panodaki kağıda bir zahmet göz atsaydın. Baştan.」" },
      ],
      choices: [
        { id: "tekrar", text: "Toparlan, vanalara dön", next: "n_s1" },
        { id: "cik", text: "Odadan çık, önce şemayı bul", next: "n_s1_kapi", if: { flag: "s1SemaOkundu", equals: false } },
      ],
    },

    n_s1_b: {
      cost: 1,
      events: [
        { type: "system", text: "DENGELEME VANASI: AÇIK — İÇ/DIŞ BASINÇ EŞİTLENİYOR" },
        { type: "narrate", text: "Sarı vana tıslayarak açılıyor, kulaklarındaki baskı bir kademe gevşiyor. Şimdi ikincisi." },
      ],
      choices: [
        { id: "kirmizi", text: "KIRMIZI vanayı aç", next: "n_s1_c" },
        { id: "yesil", text: "YEŞİL çarkı aç", next: "n_s1_yanlis" },
      ],
    },

    n_s1_c: {
      cost: 1,
      events: [
        { type: "system", text: "TAHLİYE VANASI: AÇIK — FAZLA BASINÇ SİNTİNEYE VERİLİYOR" },
        { type: "narrate", text: "İbre turuncudan sarıya, sarıdan yeşile süzülüyor. Son adım: ana besleme çarkı. Büyük, ağır, yeşil." },
      ],
      interaction: { kind: "valve", title: "ANA BESLEME — ÇARKI ÇEVİR", turns: 6, success: "n_s1_ok", cancel: "n_s1_c" },
    },

    n_s1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav1: true, kart1: true } },
        { type: "system", text: "BASINÇ ODASI: DENGEDE — DERS 1 TAMAMLANDI · KART PARÇASI I ALINDI" },
        { type: "anons", text: "「...Vay. Okuyabiliyorsun. Son üç adayın toplamından iyisin. İlk parça senin.」" },
        { type: "battery", spares: 1 },
        { type: "note", id: "not_sinav1", title: "Kart I / III", text: "İlk kart parçası: basınç sınavı. 'Son üç aday' dedi — benden önce üç kişi bu koridorlardan geçirilmiş. Hiçbirinin adını, akıbetini söylemiyor." },
      ],
      choices: [
        { id: "hub", text: "Kavşağa dön", next: "n_ara1" },
      ],
    },

    /* ===== ECE İLK TEMAS ===== */

    n_ara1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kavşağa dönerken duvardaki ölü interkom paneli kendi kendine cızırdıyor. Bir kez. İki kez. Statiğin altından tanıdık olmayan ama insan — gerçek — bir ses:" },
        { type: "ambient", text: "«Konuşma, dinle. Bu hat eski sonar bakım hattı; Deniz'in hoparlörleri bunu duyamaz. ...K-6'dan çıktın. Kimse K-6'dan çıkamadı. Sen kimsin?»" },
      ],
      choices: [
        { id: "ad", text: "Adını söyle", next: "n_ara1_ad" },
        { id: "adyok", text: "\"İsimler tehlikeli. Bakım teknisyeniyim, o kadar.\"", next: "n_ara1_adyok" },
      ],
    },

    n_ara1_ad: {
      cost: 1,
      events: [
        { type: "flag", set: { adSoylendi: true } },
        { type: "stat", stat: "eceGuven", delta: 15, note: "ECE sana güvenmeye başladı", noteKind: "system" },
        { type: "ambient", text: "«...Üç haftadır kimse bana adını söylememişti. Herkes numara, rütbe.» Sesin gülümsediğini duyuyorsun. «Ben de Ece. Sonar operatörü. Dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_adyok: {
      cost: 1,
      events: [
        { type: "ambient", text: "«...Haklısın. Deniz isimleri toplar. İsim verirsen seninle OYNAR.» Bir duraksama. «Akıllısın ya da çok korkuyorsun. İkisi de işe yarar. Dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_bilgi: {
      cost: 1,
      events: [
        { type: "ambient", text: "«Tünel dersini karanlıkta yaptırır — ışıkları o tutar. Ve tünel ağı labirenttir; haritasız gireni duvarlara vura vura dinlemiştim, günlerce. Gözlem odasının yanındaki bakım dolabında eski tünel şeması var. Tünele girmeden ONU AL.»" },
        { type: "ambient", text: "«Bir şey daha: tünellerde bazen aşağıdan bir şey çıkar. Deniz bunu bilmiyor — kimse ona söylemiyor, çünkü kimse artık onunla konuşmuyor. Sesini duyarsan DUR. Sadece dur. Söz ver.»" },
        { type: "note", id: "not_ece2", title: "Ece — sonar hattı", text: "Ece eski sonar hattından ulaşıyor; Deniz duyamıyor. Tünel için haritayı almamı söyledi — gözlem odası yanındaki dolapta. Tünellerdeki 'şey' için tek tavsiye: durmak. Üç haftadır tek başına hayatta; sözü altın." },
      ],
      choices: [
        { id: "hub", text: "Kavşağa dön", next: "n_hub" },
      ],
    },

    /* ================= SINAV 2 — TÜNEL (kart parçası II) ================= */

    n_s2_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Ders iki: YÖN DUYGUSU. Tünel ağına gir, öbür uçtan çık, kartın ikinci parçasını al. Basit. Ha—」" },
        { type: "system", text: "K-5 TÜNEL BÖLGESİ AYDINLATMASI: KAPATILDI" },
        { type: "anons", text: "「—ışıklar bende kalacak. Pilin ne durumda bakım? İçeride öğrenirsin.」" },
        { type: "narrate", text: "Tünel ağzı önünde simsiyah bir boğaz gibi açılıyor. Haritan var mı? Yoksa Ece'nin dediği dolaba mı uğradın?", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "gir", text: "Tünele gir", next: "n_t1" },
        { id: "dolap", text: "Önce gözlem yanındaki dolaba uğra", next: "n_s2_dolap", if: { flag: "tHarita", equals: false } },
      ],
    },

    n_s2_dolap: {
      cost: 1,
      events: [
        { type: "flag", set: { tHarita: true } },
        { type: "narrate", text: "Dolap on yıllık bakım hurdasıyla dolu — ve kapağın iç yüzüne yapıştırılmış sararmış bir tünel şeması. Rafta, yağlı bezlerin altında bir yedek pil." },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_tunelharita", title: "K-5 Havalandırma Tünel Şeması",
          meta: "SINIR-1 TEKNİK ÇİZİM 5-H · REV.2",
          body: "ANA GİRİŞ\n   |\n   +- KAVŞAK 1 -- SOL -> ana hat\n   |              SAĞ -> kör uç (eski filtre)\n   |\n   +- KAVŞAK 2 -- düz -> dar boğaz\n   |\n   +- KAVŞAK 3 -- SOL -> ÇIKIŞ\n                  SAĞ -> malzeme cebi (kör uç)\n\nEL NOTU: giriş -> SOL -> düz -> SOL. ezberle.\ntünelde harita okunmaz. tünelde hiçbir şey\nokunmaz. — T.D." } },
        { type: "note", id: "not_tunelharita", title: "Tünel rotası", text: "Tünel şeması: SOL → düz → SOL çıkışa götürüyor. Sağ kollar kör uç (biri filtre, biri malzeme cebi). Karanlıkta okuyamam — ezberledim." },
      ],
      choices: [
        { id: "gir", text: "Tünele gir", next: "n_t1" },
      ],
    },

    n_t1: {
      checkpoint: true,
      cost: 3,
      events: [
        { type: "narrate", text: "Dar, soğuk, alüminyum bir bağırsak. Dirseklerinin üstünde sürünüyorsun; tabletinin ışığı önündeki üç metreyi kesip atıyor. İlk kavşak: sol kol aşağı meyilli, sağdan hafif hava akımı geliyor.", if: { flag: "t1Ilk", equals: false } },
        { type: "flag", set: { t1Ilk: true } },
        { type: "alert", text: "Harita sende yok. Yön bir tahmin.", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "sol", text: "SOLA sürün", next: "n_t2" },
        { id: "sag", text: "SAĞA sürün (hava akımı orada)", next: "n_t_korucuk" },
      ],
    },

    n_t_korucuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "Hava akımı seni eski bir filtre yuvasına getiriyor: kör uç. Akım çürümüş filtrenin deliklerinden sızıyormuş. Geri geri, dar boğazda küfrederek sürünüyorsun." },
        { type: "anons", text: "「Sağa gitti. SAĞA. Haritan yok galiba — ya da okuyamıyorsun. İkisi de puan kırar.」" },
      ],
      choices: [
        { id: "geri", text: "Kavşağa geri dön", next: "n_t1" },
      ],
    },

    n_t2: {
      cost: 3,
      events: [
        { type: "narrate", text: "Sol kol dar bir boğaza sokuyor — omuzların iki yandan sıyırıyor. Tam ortasındayken duyuyorsun: önden, ıslak bir şeyin alüminyum üstünde sana doğru sürünme sesi." },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Dur. DUR. O ne— o tünelde ne arıyor?! BU BENİM SINAVIM! Bakım, yandaki menfeze gir, HEMEN—」" },
        { type: "waitTap" },
        { type: "narrate", text: "Deniz'in sesindeki neşe ilk kez yok. Sağında, bir kol boyu ötede dikey bir servis menfezi. Ece de 'dur' demişti. Deniz de 'menfeze gir' diyor. İkisi de aynı şeyi söylüyor: SAKLAN." },
        { type: "note", id: "not_denizpanik", title: "Deniz panikledi", text: "İnleyen tünellere girmiş — ve Deniz bunu BİLMİYORDU. Kapılar onun; ama o şey sisteminin dışında. Aile bile ondan korkuyor. Deniz her şeyi görmüyor." },
      ],
      choices: [
        { id: "menfez", text: "Menfeze sıkış, nefesini tut", next: "n_t2_nefes" },
        { id: "kos", text: "Geri, hızla sürünerek kaç", next: "n_olum_tahliye" },
      ],
    },

    n_olum_tahliye: {
      death: true,
      deathText: "Dar tünelde sürünerek kaçılmaz — her hareketin çeliği çınlatıyor, yerini haykırıyor. Islak ağırlık arkandan boğazına biniyor. Deniz hoparlörleri o gece hiç açmıyor.",
      events: [{ type: "glitch", ms: 900 }],
    },

    n_t2_nefes: {
      events: [
        { type: "narrate", text: "Kendini dikey menfeze zorluyorsun; çelik göğsünü sıkıyor. Tableti göğsüne bastırıp ışığı gömüyorsun. Islak sürünme bir kol boyu ötendeki tünelden yavaşça geçmeye başlıyor." },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_t3", fail: "n_olum_tunel" },
    },

    n_olum_tunel: {
      death: true,
      deathText: "Dar yerde nefes daha çabuk biter — o da bunu bilir. Menfezin ağzında ıslak bir el belirdiğinde tünel ağı son kez senin sesinle doluyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_t3: {
      cost: 3,
      events: [
        { type: "narrate", text: "Ses tünelin derinliğinde eriyip gidiyor. Menfezden kayıp sürünmeye devam ediyorsun; kollarında yeni bir titreme var, gitmiyor. Üçüncü kavşak: sol ve sağ.", if: { flag: "t3Ilk", equals: false } },
        { type: "flag", set: { t3Ilk: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sol", text: "SOLA sürün", next: "n_t4" },
        { id: "sag", text: "SAĞA sürün", next: "n_t_cep", if: { flag: "tCep", equals: false } },
      ],
    },

    n_t_cep: {
      cost: 2,
      events: [
        { type: "flag", set: { tCep: true } },
        { type: "narrate", text: "Sağ kol kısa bir kör uçta bitiyor: malzeme cebi. Bağlanmış bir bez torba — içinde, vakumlu ambalajında bir tablet pili. Tünellerde mahsur kalanlar için bırakılmış. Ya da tünellerde YAŞAYANLAR için." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Kavşağa dön, SOLA sürün", next: "n_t4" },
      ],
    },

    n_t4: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sol kol genişliyor, hava tazeleniyor; ışığın tünel sonundaki çıkış kapağının koluna çarpıyor. Yaylı kol — sonuna kadar basılı tutman gerek." },
      ],
      interaction: { kind: "lever", title: "TÜNEL ÇIKIŞI — KOLU BASILI TUT", holdMs: 2000, success: "n_s2_ok", cancel: "n_t4" },
    },

    n_s2_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { sinav2: true, kart2: true } },
        { type: "system", text: "TÜNEL ÇIKIŞI: AÇIK — DERS 2 TAMAMLANDI · KART PARÇASI II ALINDI" },
        { type: "narrate", text: "Kapaktan koridora dökülüyorsun; dizlerin çelikte, ciğerlerin gerçek havada. Hoparlör uzun süre sessiz. Konuştuğunda neşesi yerinde ama altında ince bir çatlak var:" },
        { type: "anons", text: "「...Çıktın. O konuyu— tüneldeki şeyi kimseye anlatmana gerek yok. Aile içi mesele. İkinci parça senin.」" },
      ],
      choices: [
        { id: "hub", text: "Kavşağa dön", next: "n_hub" },
      ],
    },

    /* ===== SINAV 3 — GÖZLEM ODASI / DÜRÜSTLÜK (kart parçası III) ===== */

    n_s3_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Cam bölmeli koridorun sonunda boş, beyaz ışıklı bir gözlem odası: ortada tek sandalye, tavanda tek hoparlör, karşıda tek kamera. Sandalyenin altında bir defter bırakılmış — ya da unutulmuş." },
        { type: "document", open: true, doc: {
          id: "d_sinavdefteri", title: "Deniz'in Sınav Defteri", style: "hand",
          meta: "— kapağında: 'ORYANTASYON. dokunma. D.' —",
          body: "ADAY 1 — kaynakçı\nds1 geçti (şanstı)  ds2: 41 dk!! rezalet\nds3: hep yalan, sıkıcı yalanlar. -> aileye.\n\nADAY 2 — revirdeki kadın\nds1 geçti  ds2 geçti (haritayı bulmuş)\nds3: bana 'seyirci arıyorsun' dedi. NOT ALDIM.\n-> kaçmayı denedi. şaftı denedi. yazık.\n\nADAY 3 — ismini söylemedi (saygı)\nds3: tek kelime etmedi, bütün gece.\n-> aileye. artık konuşuyor. hep aynı sayıları.\n\nADAY 4 —\n(boş. en üstte taze mürekkeple senin görev no'n.)" } },
        { type: "note", id: "not_sinavdefteri", title: "Sınav defteri", text: "Deniz üç adayın kaydını tutmuş; dördüncü sayfa boş, üstünde benim numaram. Sınav 3 'dürüstlük'. Defter diyor ki: yalan da sessizlik de not alınıyor, ikisi de aileye götürüyor. Aday 2 ona karşılık vermiş — 'not aldım' demiş." },
        { type: "anons", text: "「Otur. Ders üç: DÜRÜSTLÜK. Üç soru. Yalan serbest — anlarım ama serbest. Tek kural: cevap ver. Sessizlik de bir cevaptır, en kötüsü.」" },
      ],
      choices: [
        { id: "otur", text: "Sandalyeye otur", next: "n_soru1" },
      ],
    },

    n_soru1: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru bir. K-6 revirine girdin — sensörler benim. Baturay'ı buldun mu? Nasıl görünüyordu?」" },
      ],
      choices: [
        { id: "durust", text: "\"Ölmüştü. Masada. Yüzü... sakindi.\"", next: "n_soru1_a" },
        { id: "yalan", text: "\"Revir boştu. Kimseyi görmedim.\"", next: "n_soru1_b" },
        { id: "sessiz", text: "Sessiz kal", next: "n_soru1_c" },
      ],
    },

    n_soru1_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5, note: "Deniz yumuşadı", noteKind: "system" },
        { type: "anons", text: "「...Sakin miydi?」 Uzun bir duraklama; statik bile utanmış gibi. 「Güzel. Sakin olması güzel. O bana— boşver. Soru iki.」" },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru1_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10, note: "Deniz yalanını yakaladı", noteKind: "alert" },
        { type: "anons", text: "「Revir kapısını 04:31'de açtın, 04:39'da çıktın. Sekiz dakika 'kimseyi görmemişsin'.」 Kuru bir gülüş. 「Yalan söyleyeceksen EMEK ver. Soru iki.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru1_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「Sessizlik. Hm. Aday 3 de sessizdi.」 Bir kalem tıkırtısı — not alıyor. 「Sessizler hep aynı yere varıyor. Soru iki.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru2: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru iki. Sonar hattını buldun — hattı göremiyorum ama SENİ görüyorum, duvarlarla konuşan adam olağan değil. Ece'yle konuşuyorsun. Nerede saklanıyor?」" },
      ],
      choices: [
        { id: "soyle", text: "Saklandığı bölmeyi tarif et", next: "n_soru2_a" },
        { id: "yalan", text: "\"Kim olduğunu bilmiyorum. Hat tek yönlü.\"", next: "n_soru2_b" },
        { id: "reddet", text: "\"Bu soruya cevap yok. Sana değil.\"", next: "n_soru2_c" },
      ],
    },

    n_soru2_a: {
      cost: 1,
      events: [
        { type: "flag", set: { eceEleVerildi: true } },
        { type: "stat", stat: "eceGuven", delta: -40, note: "ECE'yi ele verdin — güven çöktü", noteKind: "alert" },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「...Sonar bölmesi. Evet.」 Beklediğin kahkaha gelmiyor. 「Biliyordum zaten. Üç haftadır biliyorum. Merak ettiğim SENİN söyleyip söylemeyeceğindi. Söyledin. Not alındı. Soru üç.」" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Ne yaptın sen?", noteKind: "alert" },
        { type: "note", id: "not_ihanet", title: "Söyledim", text: "Ece'nin yerini söyledim. Deniz 'zaten biliyordum' dedi — belki doğru, belki tuzak. Fark etmez: ben söyledim. Bu geri alınmıyor." },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru2_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「Tek yönlü hat.」 Bu kez gülüş uzun, neredeyse keyifli. 「Yalan — ama İYİ yalan. Omurgası var. Aday 2'yi hatırlattın. ...Soru üç.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru2_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "stat", stat: "eceGuven", delta: 10, note: "Ece'yi korudun", noteKind: "system" },
        { type: "anons", text: "「'Sana değil.'」 Sesinde bir şey geriliyor ama kopmuyor. 「Sadakat. Ailede çok makbuldür, biliyor musun? Şef bayılır buna. Soru üç.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru3: {
      cost: 1,
      events: [
        { type: "anons", text: "「Son soru. Bunu herkese soruyorum, herkes yalan söyler.」 Statik derinleşiyor; sesi ilk kez oyunsuz. 「Aileye katılmayı düşündün mü? Bir saniye bile. Tek başına ölmektense kalabalık olmayı. Dürüst ol.」" },
      ],
      choices: [
        { id: "hayir", text: "\"Hayır. Asla.\"", next: "n_soru3_a" },
        { id: "bilmiyorum", text: "\"...Bilmiyorum. Yalnızlık zor.\"", next: "n_soru3_b" },
        { id: "karsi", text: "\"Sen katıldın mı Deniz? Yoksa hâlâ seyirci misin?\"", next: "n_soru3_c" },
      ],
    },

    n_soru3_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「'Asla.'」 Kuru bir ses. 「Herkes önce 'asla' der. Aday 1 de demişti. Şimdi sofrada oturuyor, yemeği ÇOK beğeniyor. Sınav bitti.」" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_s3_ok" }],
    },

    n_soru3_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "anons", text: "「...Bilmiyorsun.」 Uzun sessizlik. Kalem tıkırtısı YOK. 「Üç adaydır bu soruya ilk dürüst cevap. Yalnızlık zor, evet. Ne kadar zor, bilemezsin. ...Ya da bilirsin. Sınav bitti.」" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_s3_ok" }],
    },

    n_soru3_c: {
      cost: 1,
      events: [
        { type: "flag", set: { denizSoruldu: true } },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「—」 Hoparlör açık, hat CANLI, ama Deniz konuşmuyor. Beş saniye. On. Sonra bambaşka, yaşında bir sesle: 「...Sıradaki soru yok. Sınav bitti.」" },
        { type: "note", id: "not_denizsoru", title: "Soruyu ona sordum", text: "'Sen katıldın mı?' — ve Deniz, insanlarla oynayan Deniz, cevap VEREMEDİ. Aileden mi değil mi, kendisi de bilmiyor olabilir. Bu onu daha az tehlikeli yapmıyor; daha yalnız yapıyor." },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_s3_ok" }],
    },

    n_s3_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav3: true, kart3: true } },
        { type: "system", text: "DERS 3 TAMAMLANDI · KART PARÇASI III ALINDI" },
        { type: "anons", text: "「Üçüncü parça senin. Kartın tamam sayılır. Çıkışta görüşürüz bakım — orası benim değil ama seyretmeyi severim.」" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "hub", text: "Kavşağa dön", next: "n_hub" },
      ],
    },

    /* ================= ÇIKIŞ — PARÇA KİLİDİ ================= */

    n_cikis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ağır çıkış kapısı. Ortasında üç yuvalı bir okuyucu — kartın üç parçası buraya oturmalı. Yuvaların kaçı dolu?" },
        { type: "alert", text: "OKUYUCU: KART EKSİK — Üç dersin hepsini bitirmeden bu kapı açılmaz.", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "Eksik parçalar var. Kavşağa dönüp tamamlamadığın dersleri bitirmelisin.", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "Üç parça da cebinde. Okuyucuya tek tek yerleştiriyorsun — çıt, çıt, çıt. Kapı derin bir iç çekişle çözülüyor.", if: { flag: "kart3", equals: true } },
      ],
      choices: [
        { id: "gec", text: "Kartı tak, kapıdan geç", next: "n_mezun", if: { flag: "kart3", equals: true } },
        { id: "geri", text: "Eksik dersleri bitirmeye dön", next: "n_hub", if: { flag: "kart3", equals: false } },
      ],
    },

    /* ================= MEZUNİYET + HARUN ================= */

    n_mezun: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { mezun: true } },
        { type: "system", text: "ÇIKIŞ KİLİDİ: AÇIK — K-4 GEÇİŞİ HAZIR" },
        { type: "anons", text: "「Tebrikler bakım. Dört adayda bir mezun.」 Tependeki menfez takırdıyor, ayağının dibine ambalajlı bir tablet pili düşüyor. 「Kıyak. Kimseye söyleme — imajım var.」" },
        { type: "battery", spares: 1 },
        { type: "waitTap" },
        { type: "anons", text: "「Son ders bedava: K-4 kapısından çıkınca uzun bir koridor. O koridor benim değil. O koridor kimsenin değil.」 Bir duraklama. 「...Babama selam söyle.」" },
        { type: "objective", text: "K-4 geçiş koridorunu aş — ana bacaya ulaş" },
      ],
      choices: [
        { id: "cik", text: "K-4 geçiş kapısından çık", next: "n_harun1" },
      ],
    },

    n_harun1: {
      cost: 1,
      events: [
        { type: "narrate", text: "Uzun, çıplak bir bağlantı koridoru. Yarı yolda, öbür uçtaki köşeden bir FENER IŞIĞI dönüyor — sarı, ağır, acele etmeyen. Arkasından, kapı boşluğuna sığmayan bir gövde." },
        { type: "narrate", text: "\"Yeni personel.\" Ses sakin, derin — bir vardiya amirinin, bir BABANIN sesi. \"Mesai başladı, sen koridorlardasın. Devamsızlık tutanağı tutmam gerekecek evlat.\" Fener kalkıyor, yüzünü buluyor." },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "ŞEF SENİ GÖRDÜ — Artık söylenti değilsin", noteKind: "alert" },
        { type: "waitTap" },
        { type: "alert", text: "⚠ O YÜRÜMEYE BAŞLADI — KARAR VER" },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "kos", text: "Geri dön ve KOŞ", next: "n_harun2" },
        { id: "don", text: "Donakal — İnleyen'de işe yaramıştı", next: "n_olum_harun1", default: true },
      ],
    },

    n_olum_harun1: {
      death: true,
      deathText: "Donakalmak İnleyen'de işe yarar — o, sesle görür. Şef gözleriyle görür. Fener üstünde sabitlenirken adımları hiç hızlanmıyor; gerek yok. \"Kaçmadın. Aferin evlat,\" diyor. \"Aile, kaçmayanları sever.\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_harun2: {
      cost: 1,
      events: [
        { type: "narrate", text: "KOŞUYORSUN. Arkanda fener duvarlarda sallanıyor, adımlar — o sakin, ağır adımlar — imkansız biçimde arayı kapatıyor. Önünde iki seçenek: sağdaki servis merdiveni kapısı ve zemindeki havalandırma menfezi." },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "menfez", text: "Menfez kapağını söküp içine dal", next: "n_menfez" },
        { id: "merdiven", text: "Servis merdiveni kapısına yüklen", next: "n_olum_harun2", default: true },
      ],
    },

    n_olum_harun2: {
      death: true,
      deathText: "Kapı kilitli. Elektronik kilit — ve elektronik kilitler kimin, biliyorsun. Hoparlörden çok yumuşak: 「Ders dört bakım: bana güvenme.」 Fener sırtını bulurken Deniz'in hattı nezaketen kapanıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez: {
      events: [
        { type: "narrate", text: "Menfez kapağını tırnaklarınla söküp kendini içeri çekiyorsun. Bir saniye sonra fener ızgaranın çubuklarında — yüzünün üstünde çizgi çizgi. Botları ızgaranın hemen ötesinde duruyor. Bekliyor. DİNLİYOR." },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_menfez_ok", fail: "n_olum_menfez" },
    },

    n_olum_menfez: {
      death: true,
      deathText: "Izgaranın ardında nefesin çözülüyor — küçücük bir ses, ama ona yetiyor. Menfez kapağı konserve gibi sökülüyor. \"Saklambaç mesai saatinde oynanmaz evlat,\" diyor Şef, neredeyse şefkatle. Fener sönüyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar, sonsuz bir dakika sonra, dönüp uzaklaşıyor. Fener duvarlardan çekiliyor. \"Tutanak yarına kalsın,\" diyor ses kendine, koridorun ucunda. \"Aile sofrada bekler.\"" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "narrate", text: "Menfezin içinden, tozun ve karanlığın içinden yukarı — ana bacanın soğuk hava akımına doğru sürünüyorsun." },
      ],
      choices: [
        { id: "baca", text: "Ana bacaya tırman", next: "n_baca" },
      ],
    },

    /* ================= BÖLÜM SONU ================= */

    n_baca: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Ana baca: K-5'i K-4'e bağlayan dikey çelik boğaz. Basamak demirleri soğuk, yukarıdan — yaşam alanlarından — sıcak, tuhaf bir yemek kokusu iniyor. Tırmanıyorsun." },
        { type: "ambient", text: "Aşağıda Deniz'in hoparlörleri son kez cızırdıyor: 「...İyi dersin bakım. Yukarısı benim bölgem değil. Yukarısı EVDİR.」", if: { flag: "denizSoruldu", equals: false } },
        { type: "ambient", text: "Aşağıda Deniz'in hoparlörleri son kez cızırdıyor: 「...Sorduğun soru var ya.」 Uzun statik. 「Kimseye sorma onu bir daha. Özellikle yukarıda. Yukarısı EVDİR — ve evde herkes çoktan cevap vermiştir.」", if: { flag: "denizSoruldu", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Sonar hattının minik hoparlörü cebinde: «Hâlâ oradayım,» diyor Ece. «Sen tırmanırken hattı K-4 interkomlarına bağlamaya çalışacağım. Kaybolma. ...Lütfen kaybolma.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Sonar hattı cebinde bütün tırmanış boyunca sessiz. Ece hâlâ orada — bunu biliyorsun. Sadece artık senin için konuşmuyor.", if: { flag: "eceEleVerildi", equals: true } },
      ],
      choices: [
        { id: "son", text: "K-4 çıkış kapağına uzan", next: "n_k5_son" },
      ],
    },

    n_k5_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapağa uzandığın an bütün baca — bütün tünel ağı, bütün menfezler, K-5'in bütün çelik ciğerleri — aynı anda fısıldıyor:" },
        { type: "ambient", text: "«beş... dört...» Bir kadın sesi. Uykulu, yumuşak, rüyasının içinden sayan biri." },
        { type: "waitTap" },
        { type: "narrate", text: "Sonra baca susuyor; geriye yalnız hava akımı kalıyor. Kapağı itiyorsun: üstünde K-4'ün loş ışığı ve o sıcak, yanlış yemek kokusu. Ev kokusu. Kimin evi — birazdan öğreneceksin." },
        { type: "system", text: "— BÖLÜM 2 SONU: SINAV —" },
      ],
      choices: [
        { id: "k4", text: "Kapaktan K-4'e çık", next: "n_k4_giris" },
      ],
    },
  },
};

// Bölüm başlangıç bayrakları:
export const EP02_FLAGS = {
  destekOnarildi: false,
  // hub / ilerleme
  hubIlk: false, s1Ilk: false, t1Ilk: false, t3Ilk: false,
  s1SemaOkundu: false, tHarita: false, tCep: false,
  // kart parçaları (çıkış kilidi)
  kart1: false, kart2: false, kart3: false,
  sinav1: false, sinav2: false, sinav3: false, mezun: false,
  // Ece hattı
  adSoylendi: false, eceEleVerildi: false,
  // Deniz
  denizSoruldu: false,
};
