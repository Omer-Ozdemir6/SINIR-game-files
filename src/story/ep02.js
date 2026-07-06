/* ============================================================
   SINIR-1 — BÖLÜM 2: "K-5 / SINAV"  (birleşik tasarım v2)
   Katın sahibi: DENİZ OKUR — anons sisteminden konuşan mühendis.
   Yapı: 3 sınav (basınç / karanlık tünel / dürüstlük) + Ece'nin
   ilk gerçek diyalogları + Harun'un girişi (ilk kovalamaca).
   Gizli statlar işlemeye başlar: denizOfke, eceGuven, sefFarkindalik.
   Gizli frekans: geri dönüşüm pompasının ritminde bir NİNNİ.
   ============================================================ */

export const EP02 = {
  nodes: {

    /* ================= GİRİŞ ================= */

    n_k5_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "KAT: K-5 — YAŞAM DESTEK · HAVA İŞLEME · SU GERİ DÖNÜŞÜMÜ" },
        { type: "narrate", text: "Merdiven, seni dev hava santrallerinin uğultusuna bırakıyor. K-5 nefes alan bir kat: borular soluyup veriyor, filtreler tıslıyor, tavan boyunca havalandırma tünellerinin ağzı karanlık dişler gibi sıralanıyor." },
        { type: "narrate", text: "Üç adım atıyorsun — ve arkandaki kapı, kendi kendine, nazikçe KİLİTLENİYOR. Ardından öndeki. Ardından yandaki. Tık. Tık. Tık." },
        { type: "glitch", ms: 300 },
        { type: "anons", text: "「İşte geldin. Prosedürü biliyorsun: yeni personel oryantasyondan geçer. Üç ders. Geçersen K-4 kapısı açılır. Kalırsan... aile büyür.」" },
        { type: "anons", text: "「Kurallar: kopya serbest, yalan serbest, ağlamak serbest. Sadece SIKICI olmak yasak. Başlıyoruz.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "objective", text: "Deniz'in üç 'dersini' atlat" },
        { type: "note", id: "not_deniz", title: "Deniz Okur", text: "Anonstaki adam: Deniz. Sistem mühendisi — kapılar, kameralar, hoparlörler onun. Beni bir laboratuvar faresi gibi koridorlarına saldı. Sesinde nefret yok. Daha kötüsü var: EĞLENCE." },
      ],
      choices: [
        { id: "ilerle", text: "Açık kalan tek koridordan ilerle", next: "n_s1_kapi" },
      ],
    },

    /* ================= SINAV 1 — BASINÇ ODASI ================= */

    n_s1_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Ders bir: BASINÇ. İçeride üç vana var. Doğru sırayla açarsan oda dengelenir. Yanlış sırayla açarsan... kulakların bana hak verir.」" },
        { type: "narrate", text: "Kapının yanındaki panoda, yağlanmış bir şema asılı. Birileri — muhtemelen Deniz'den önce, normal zamanlarda — prosedürü buraya asmış." },
        { type: "document", doc: {
          id: "d_havasema", title: "Basınç Dengeleme Prosedürü",
          meta: "SINIR-1 · K-5 YAŞAM DESTEK · TALİMAT 3-C",
          body: "BASINÇ ODASI — VANA AÇILIŞ SIRASI\n\nUYARI: Sıralamaya kesinlikle uyulacaktır.\n\n  1) DENGELEME VANASI  (sarı)\n     — iç/dış basıncı eşitler\n  2) TAHLİYE VANASI    (kırmızı)\n     — fazla basıncı sintineye atar\n  3) ANA BESLEME       (yeşil, büyük çark)\n     — hattı açar\n\nSIRAYI BOZAN, KULAKLARIYLA ÖDER.\n(bkz. revir kaydı, hafta 12: T. Demir,\nsol kulak, kalıcı)" } },
      ],
      choices: [
        { id: "gir", text: "Basınç odasına gir", next: "n_s1" },
      ],
    },

    n_s1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Oda, kulak zarında hissedilen bir gerginlikle dolu. Üç vana: sarı, kırmızı ve dipte, yeşil boyalı büyük çark. Duvardaki basınç ibresi turuncu bölgede titriyor.", if: { flag: "s1Ilk", equals: false } },
        { type: "flag", set: { s1Ilk: true } },
        { type: "alert", text: "ODA BASINCI: YÜKSEK — SIRALAMAYI DOĞRU SEÇ" },
      ],
      choices: [
        { id: "sari", text: "Önce SARI vanayı aç (dengeleme)", next: "n_s1_b" },
        { id: "kirmizi", text: "Önce KIRMIZI vanayı aç (tahliye)", next: "n_s1_yanlis" },
        { id: "yesil", text: "Doğruca YEŞİL çarka git (ana besleme)", next: "n_s1_yanlis" },
      ],
    },

    n_s1_yanlis: {
      cost: 1,
      events: [
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Vana döner dönmez oda üstüne ÇÖKÜYOR: basınç dalgası kulaklarına iki çivi gibi giriyor. Dizlerinin üstünde, ağzın açık, sesin sana ait olmayan bir çınlamayla doluyorsun." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Kulakların hâlâ çınlıyor", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 8, note: "GÜRÜLTÜ +8 — Basınç dalgası tüm katta duyuldu", noteKind: "alert" },
        { type: "anons", text: "「Uuu. Şemayı okumadın demek. Klasik. Baştan — ve bu kez panodaki kağıda bir zahmet göz at.」" },
      ],
      choices: [
        { id: "tekrar", text: "Toparlan ve vanalara dön", next: "n_s1" },
      ],
    },

    n_s1_b: {
      cost: 1,
      events: [
        { type: "system", text: "DENGELEME VANASI: AÇIK — İÇ/DIŞ BASINÇ EŞİTLENİYOR" },
        { type: "narrate", text: "Sarı vana tıslayarak açılıyor ve kulaklarındaki baskı bir kademe gevşiyor. Şimdi ikincisi." },
      ],
      choices: [
        { id: "kirmizi", text: "KIRMIZI vanayı aç (tahliye)", next: "n_s1_c" },
        { id: "yesil", text: "YEŞİL çarka geç (ana besleme)", next: "n_s1_yanlis" },
      ],
    },

    n_s1_c: {
      cost: 1,
      events: [
        { type: "system", text: "TAHLİYE VANASI: AÇIK — FAZLA BASINÇ SİNTİNEYE VERİLİYOR" },
        { type: "narrate", text: "İbre turuncudan sarıya, sarıdan yeşile süzülüyor. Kaldı son adım: ana besleme çarkı. Büyük, ağır, yeşil — ve seninle K-4 arasındaki ilk imza." },
      ],
      interaction: { kind: "valve", turns: 6, success: "n_s1_ok", cancel: "n_s1_c" },
    },

    n_s1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav1: true } },
        { type: "system", text: "BASINÇ ODASI: DENGEDE — DERS 1 TAMAMLANDI" },
        { type: "anons", text: "「...Vay. Okuyabiliyorsun. Son üç adayın toplamından iyisin şimdiden. Kapı açık — ilerle.」" },
        { type: "note", id: "not_sinav1", title: "Ders 1: geçti", text: "'Son üç aday' dedi. Benden önce üç kişi bu koridorlardan geçirilmiş. Hiçbirinin adını söylemiyor. Hiçbirinin AKIBETİNİ de." },
      ],
      choices: [
        { id: "ilerle", text: "Koridora çık", next: "n_ara1" },
      ],
    },

    /* ================= ARA — ECE HATTI ================= */

    n_ara1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Koridorun duvarındaki eski interkom paneli — ölü olması gereken panel — kendi kendine cızırdıyor. Bir kez. İki kez. Sonra, statiğin altından, tanıdık bir ses:" },
        { type: "ambient", text: "«Benim. Konuşma, dinle. Deniz'in hoparlörleri her yerde ama bu hat eski — sonar bakım hattı. Bunu duyamaz. ...K-6'dan çıktın. Kimse K-6'dan çıkamadı. Sen kimsin?»" },
      ],
      choices: [
        { id: "ad", text: "Adını söyle", next: "n_ara1_ad" },
        { id: "adyok", text: "\"İsimler tehlikeli. Bakım teknisyeniyim, bu yeter.\"", next: "n_ara1_adyok" },
      ],
    },

    n_ara1_ad: {
      cost: 1,
      events: [
        { type: "flag", set: { adSoylendi: true } },
        { type: "stat", stat: "eceGuven", delta: 10 },
        { type: "ambient", text: "«...Üç haftadır kimse bana adını söylememişti. Herkes numara, vardiya, rütbe.» Kısa bir sessizlik; sesin gülümsediğini duyabiliyorsun. «Tamam. Ben de Ece. Gerçekten. Şimdi dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_adyok: {
      cost: 1,
      events: [
        { type: "ambient", text: "«...Haklısın aslında. Deniz isimleri toplar. İsim verirsen seninle OYNAR.» Bir duraksama. «Akıllısın. Ya da çok korkuyorsun. İkisi de işe yarar burada. Dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_bilgi: {
      cost: 1,
      events: [
        { type: "ambient", text: "«İkinci dersi tünellerde yapar. Işıkları KAPATIR — pilin ne kadar doluysa o kadar şanslısın. Ve tünel ağı bir labirenttir; haritasız gireni günlerce dinlemiştim, duvarlara vura vura...» Ses bir an kısılıyor. «Bakım dolabında eski tünel şeması olmalı. Koridorun sonunda. AL ONU.»" },
        { type: "ambient", text: "«Bir şey daha. Tünellerde... bazen aşağıdan bir şey çıkıyor. Deniz onun tünellere girdiğini bilmiyor. Kimse ona söylemiyor çünkü kimse onunla konuşmuyor artık. Sesini duyarsan DUR. Sadece dur. Söz ver.»" },
        { type: "note", id: "not_ece2", title: "Ece — sonar bakım hattı", text: "Ece eski sonar hattından ulaşıyor; Deniz bu hattı duyamıyor. Tüneller için haritayı almamı söyledi. Ve tünellerdeki 'şey' hakkında tek tavsiye: durmak. Üç haftadır burada tek başına hayatta — tavsiyesi altın değerinde." },
      ],
      choices: [
        { id: "dolap", text: "Bakım dolabını aç", next: "n_ara1_dolap", if: { flag: "dolapAcildi", equals: false } },
        { id: "devam", text: "Dolabı boşver — sınav kapısına git", next: "n_s2_kapi" },
      ],
    },

    n_ara1_dolap: {
      cost: 1,
      events: [
        { type: "flag", set: { dolapAcildi: true } },
        { type: "narrate", text: "Dolap, on yıllık bakım hurdasıyla dolu — ve kapağın iç yüzüne yapıştırılmış, sararmış bir tünel şeması. Rafta da, yağlı bezlerin altında, bir yedek pil." },
        { type: "battery", spares: 1 },
        { type: "document", doc: {
          id: "d_tunelharita", title: "K-5 Havalandırma Tünel Şeması",
          meta: "SINIR-1 TEKNİK ÇİZİM 5-H · REV.2",
          body: "ANA GİRİŞ (sınav kapısı tarafı)\n   │\n   ├─ KAVŞAK 1 ── SOL → ana hat devamı\n   │              SAĞ → kör uç (eski filtre yuvası)\n   │\n   ├─ KAVŞAK 2 ── düz geçiş (dar boğaz)\n   │\n   └─ KAVŞAK 3 ── SOL → ÇIKIŞ KAPAĞI\n                  SAĞ → yedek malzeme cebi (kör uç)\n\nEL YAZISI NOT (kenarda):\ngiriş → SOL → düz → SOL. ezberle.\ntünelde harita okunmaz. tünelde hiçbir şey\nokunmaz. — T.D." } },
      ],
      choices: [
        { id: "devam", text: "Sınav kapısına git", next: "n_s2_kapi" },
      ],
    },

    /* ================= SINAV 2 — KARANLIK TÜNELLER ================= */

    n_s2_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Ders iki: YÖN DUYGUSU. Tünel ağına gireceksin, öbür uçtan çıkacaksın. Basit. Ha, bir detay—」" },
        { type: "system", text: "K-5 TÜNEL BÖLGESİ AYDINLATMASI: KAPATILDI" },
        { type: "anons", text: "「—ışıklar bende kalacak. Pilin ne durumda bakım? İçeride öğrenirsin.」" },
        { type: "narrate", text: "Tünel ağzı, önünde simsiyah bir boğaz gibi açılıyor. Tabletinin ışığı içeride bir adımlık dünya yaratıyor, gerisi yok." },
      ],
      choices: [
        { id: "gir", text: "Tünele gir", next: "n_t1" },
      ],
    },

    n_t1: {
      cost: 3,
      events: [
        { type: "narrate", text: "Dar, soğuk, alüminyum bir bağırsak. Dirseklerinin üstünde sürünüyorsun; tabletin ışığı önündeki üç metreyi kesip atıyor. İlk kavşak: sol kol aşağı meyilli, sağ koldan hafif bir hava akımı geliyor.", if: { flag: "t1Ilk", equals: false } },
        { type: "flag", set: { t1Ilk: true } },
      ],
      choices: [
        { id: "sol", text: "SOLA sürün", next: "n_t2" },
        { id: "sag", text: "SAĞA sürün (hava akımı oradan)", next: "n_t_kayip1" },
      ],
    },

    n_t_kayip1: {
      cost: 2,
      events: [
        { type: "narrate", text: "Hava akımı seni eski bir filtre yuvasına getiriyor: kör uç. Akım, çürümüş filtrenin deliklerinden sızıyormuş. Geri geri, dar boğazda, küfrederek sürünüyorsun." },
        { type: "anons", text: "「Sağa gitti. SAĞA GİTTİ. Haritayı ya almadın ya okuyamıyorsun — ikisi de puan kırdırır.」" },
      ],
      choices: [
        { id: "geri", text: "Kavşağa geri dön", next: "n_t1" },
      ],
    },

    n_t2: {
      cost: 3,
      events: [
        { type: "narrate", text: "Sol kol seni dar bir boğaza sokuyor — omuzların iki yandan sıyırıyor, ilerlemek için başını yan yatırman gerekiyor. Tam ortasındayken... duyuyorsun. Önden. Islak bir şeyin, alüminyumun üstünde, SANA DOĞRU sürünme sesi." },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Dur. DUR. O ne— o tünelde ne arıyor?! O aşağıda kalmalıydı, K-6'da— BU BENİM SINAVIM! Hey! ÇIK ORADAN! Bakım, beni dinle, yandaki menfeze gir, HEMEN—」" },
        { type: "narrate", text: "Deniz'in sesindeki neşe İLK KEZ yok. Sağında, bir kol boyu ötede, dikey bir servis menfezi var. Islak sürünme yaklaşıyor." },
        { type: "note", id: "not_denizpanik", title: "Deniz panikledi", text: "İnleyen tünellere girmiş — ve Deniz bunu BİLMİYORDU. Kapılar, kameralar, hoparlörler onun; ama o şey onun sisteminin dışında. Aile bile ondan korkuyor. Bunu unutma: Deniz her şeyi görmüyor." },
      ],
      choices: [
        { id: "menfez", text: "Menfeze sıkış — nefesini tut", next: "n_t2_nefes" },
      ],
    },

    n_t2_nefes: {
      events: [
        { type: "narrate", text: "Kendini dikey menfeze zorluyorsun; çelik, göğsünü sıkıyor. Tableti göğsüne bastırıp ışığı gömüyorsun. Islak sürünme, bir kol boyu ötendeki tünelden — yavaşça — geçmeye başlıyor." },
      ],
      interaction: { kind: "breath", holdMs: 6000, lungMs: 9000, success: "n_t3", fail: "n_olum_tunel" },
    },

    n_olum_tunel: {
      death: true,
      deathText: "Dar yerde nefes daha çabuk biter — bunu o da biliyor. Menfezin ağzında ıslak bir el belirdiğinde, tünel ağı son kez senin sesinle doluyor. Deniz, hoparlörleri o gece hiç açmıyor.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_t3: {
      cost: 3,
      events: [
        { type: "narrate", text: "Ses, tünelin derinliğinde eriyip gidiyor. Menfezden kayıp sürünmeye devam ediyorsun — kollarında yeni bir titreme var ve gitmiyor. Üçüncü kavşak: sol ve sağ.", if: { flag: "t3Ilk", equals: false } },
        { type: "flag", set: { t3Ilk: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sol", text: "SOLA sürün (haritaya göre çıkış)", next: "n_t4" },
        { id: "sag", text: "SAĞA sürün — malzeme cebine bak", next: "n_t_cep", if: { flag: "tCep", equals: false } },
      ],
    },

    n_t_cep: {
      cost: 2,
      events: [
        { type: "flag", set: { tCep: true } },
        { type: "narrate", text: "Sağ kol kısa bir kör uçta bitiyor: yedek malzeme cebi. İçinde bağlanmış bir bez torba — ve torbanın içinde, vakumlu ambalajında, bir tablet pili. Birileri tünellerde mahsur kalanlar için bırakmış. Ya da tünellerde YAŞAYANLAR için." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Kavşağa dön, SOLDAN çıkışa sürün", next: "n_t4" },
      ],
    },

    n_t4: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sol kol genişliyor, hava tazeleniyor — ve ışığın, tünelin sonundaki çıkış kapağının koluna çarpıyor. Yaylı kol: sonuna kadar basılı tutman gerek." },
      ],
      interaction: { kind: "lever", holdMs: 2000, success: "n_s2_ok", cancel: "n_t4" },
    },

    n_s2_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { sinav2: true } },
        { type: "system", text: "TÜNEL ÇIKIŞI: AÇIK — DERS 2 TAMAMLANDI" },
        { type: "narrate", text: "Kapaktan koridora dökülüyorsun; dizlerin çelikte, ciğerlerin gerçek havada. Hoparlör uzun süre sessiz kalıyor. Konuştuğunda, neşesi yerinde ama altında ince bir çatlak var:" },
        { type: "anons", text: "「...Çıktın. Güzel. O konuyu— tüneldeki şeyi kimseye anlatmana gerek yok. Aile içi mesele. Anladın mı? AİLE İÇİ.」" },
        { type: "narrate", text: "Koridor panosunda, cam çerçevede, eski şikayet formları asılı duruyor. Birinin bunları ÇERÇEVELETMİŞ olması başlı başına bir cevap." },
        { type: "document", doc: {
          id: "d_sikayet", title: "Personel Şikayet Formları (çerçeveli)",
          meta: "SINIR-1 İK DOSYASI · 3 ADET · SERGİ AMAÇLI (?)",
          body: "FORM 1 — konu: D. Okur\n'Deniz geceleri anons sistemini açıp SAYI SAYIYOR.\nUyarınca gülüyor. Sistem kayıtlarını silmiş.'\nKARAR: sözlü uyarı. (H.T.)\n\nFORM 2 — konu: D. Okur\n'Kamarama hoparlör döşemiş. Uykumda konuştuklarımı\nbana dinletti. Bunu KOMİK buluyor.'\nKARAR: yazılı uyarı. (H.T.)\n\nFORM 3 — konu: D. Okur\n'Artık uyarı istemiyorum. Onu durdurun. O çocuk\nyalnızlıktan tehlikeli bir şeye dönüşüyor.'\nKARAR: — (karar bölümü boş; kenarında el\nyazısı, H.T.: 'Aile, evladını dışarı vermez.')" } },
      ],
      choices: [
        { id: "ilerle", text: "Koridordan ilerle", next: "n_ece_rica" },
      ],
    },

    /* ================= ECE'NİN RİCASI ================= */

    n_ece_rica: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Su geri dönüşüm ünitelerinin yanından geçerken duvardaki sonar hattı yeniden cızırdıyor. Ece'nin sesi bu kez daha ince, daha nefessiz:" },
        { type: "ambient", text: "«İyisin. İyisin, duydum, tünelden çıktın.» Bir soluk. «...Benim bir şeye ihtiyacım var ve bunu istemekten nefret ediyorum. Saklandığım bölmenin hava hattı zayıflıyor. K-5'ten yönlendirilebilir — geri dönüşüm ünitelerinin arkasındaki dağıtım vanası. Ama orası GÜRÜLTÜLÜ iş; vana paslı, ünite inler.»" },
        { type: "ambient", text: "«Yapmak zorunda değilsin. Yolundan saparsın, ses çıkarırsın, o şey— ...Sadece söylemem gerekiyordu. Nefes almak için birine muhtacım ve bundan nefret ediyorum.»" },
      ],
      choices: [
        { id: "yardim", text: "Vanaya git — Ece'nin havasını aç", next: "n_hava" },
        { id: "ninni", text: "Önce şu geri dönüşüm pompasını dinle — ritmi... tuhaf", next: "n_ninni", if: { flag: "frekansNinni", equals: false } },
        { id: "devam", text: "\"Yapamam. Vaktim yok.\" — yola devam et", next: "n_ece_red" },
      ],
    },

    n_ninni: {
      cost: 1,
      events: [
        { type: "flag", set: { frekansNinni: true } },
        { type: "narrate", text: "Pompanın ritmine kulak veriyorsun. Tık-tık... tık. Tık-tık... tık. Mekanik değil bu. Mekanik şeyler ARA VERMEZ. Tableti gövdeye dayayıp kayda alıyorsun ve kulaklıktan geri dinliyorsun—" },
        { type: "ambient", text: "Ritmin altında, titreşimin içine gömülü, bir kadın sesinin hayaleti: bir NİNNİ. Hece hece, su borularının diliyle söylenmiş. Pompayı kim kurduysa... ya da pompaya kim ÖĞRETTİYSE." },
        { type: "stat", stat: "akil", delta: -5, note: "AKIL −5 — Makineler ninni bilmez. Bilmemeli.", noteKind: "alert" },
        { type: "note", id: "not_ninni", title: "Pompadaki ninni", text: "Geri dönüşüm pompası bir ninninin ritmiyle çalışıyor. Kaydettim. Revir kaydındaki 'uykuda sayanlar', Baturay'ın defteri, şimdi bu... Bu tesiste sesler bir yerden ÖĞRENİLİYOR. Kaynağı bulmam gereken bir yerden." },
      ],
      choices: [
        { id: "yardim", text: "Vanaya git — Ece'nin havasını aç", next: "n_hava" },
        { id: "devam", text: "\"Yapamam. Vaktim yok.\" — yola devam et", next: "n_ece_red" },
      ],
    },

    n_ece_red: {
      cost: 1,
      events: [
        { type: "flag", set: { eceKirgin: true } },
        { type: "ambient", text: "«...Anlıyorum.» İki kelime, düz bir tonda — ve tonun düzlüğü, kırgınlığın ta kendisi. «Haklısın da. Kendi yolunu düşün. Ben üç haftadır nefes alıyorum, biraz daha alırım.» Hat, veda etmeden kapanıyor." },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "devam", text: "Üçüncü sınav kapısına git", next: "n_s3_kapi" },
      ],
    },

    n_hava: {
      cost: 2,
      events: [
        { type: "flag", set: { eceYardim: true } },
        { type: "narrate", text: "Geri dönüşüm ünitelerinin arkasına sıkışıp dağıtım vanasını buluyorsun. Paslı, inatçı ve Ece haklı: her turda ünite bir hayvan gibi İNLİYOR. Sesin katta nereye kadar gittiğini düşünmemeye çalışıyorsun." },
        { type: "stat", stat: "gurultu", delta: 12, note: "GÜRÜLTÜ +12 — Ünitenin iniltisi tüm katta yankılandı", noteKind: "alert" },
      ],
      interaction: { kind: "valve", turns: 7, success: "n_hava2", cancel: "n_ece_rica" },
    },

    n_hava2: {
      cost: 1,
      events: [
        { type: "system", text: "HAVA DAĞITIMI: YÖNLENDİRİLDİ — SONAR BÖLMESİ HATTI: AKTİF" },
        { type: "stat", stat: "eceGuven", delta: 25 },
        { type: "ambient", text: "Hat açılır açılmaz sonar hattından derin, titrek bir nefes duyuyorsun — taze havanın ciğerlere ilk inişi. «...Geldi. Hava geldi.» Uzun bir sessizlik. Sonra, çok kısık: «Kimse benim için yolundan sapmamıştı. Üç haftadır değil. Hiç. ...Sağ ol.»" },
        { type: "ambient", text: "«Karşılığında tek bildiğimi vereyim: üçüncü derste DOĞRU cevap diye bir şey yoktur. Sadece BEDELİ olan cevaplar vardır. Deniz yalanı anlar ama yalana saygı duyar. Gerçeğe ise... gerçeğe ne yaptığını kimse bilmiyor.»" },
      ],
      choices: [
        { id: "devam", text: "Üçüncü sınav kapısına git", next: "n_s3_kapi" },
      ],
    },

    /* ================= SINAV 3 — DÜRÜSTLÜK ================= */

    n_s3_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Üçüncü kapının ardında boş, beyaz ışıklı bir oda: ortada tek bir sandalye, tavanda tek bir hoparlör, sandalyenin karşısında tek bir kamera. Sandalyenin altında bir defter unutulmuş — ya da BIRAKILMIŞ." },
        { type: "document", doc: {
          id: "d_sinavdefteri", title: "Deniz'in Sınav Defteri", style: "hand",
          meta: "— kapağında: 'ORYANTASYON. dokunma. D.' —",
          body: "ADAY 1 — kaynakçı, adı neydi ya\nders1: geçti (şanstı)  ders2: 41 dakika!! rezalet\nders3: hepsinde yalan. sıkıcı yalanlar hem de.\nSONUÇ: aileye. şef çok sevindi.\n\nADAY 2 — revirdeki kadın\nders1: geçti  ders2: geçti (haritayı bulmuş, zeki)\nders3: bana 'sen busun işte, seyirci arıyorsun'\ndedi. kızmadım. NOT ALDIM.\nSONUÇ: kaçmayı denedi. şaftı denedi. yazık.\n\nADAY 3 — ismini söylemedi (saygı)\nders1: 2 hata  ders2: girmeyi reddetti\nders3: tek kelime etmedi. bütün gece.\nSONUÇ: aileye. artık konuşuyor ama. hep aynı\nsayıları.\n\nADAY 4 —\n(boş sayfa. en üstte, taze mürekkeple,\nsenin görev numaran.)" } },
        { type: "anons", text: "「Otur. Ders üç: DÜRÜSTLÜK. Üç soru soracağım. Yalan serbest — anlarım ama serbest. Tek kural: cevap ver. Sessizlik de bir cevaptır bu arada. En kötüsüdür.」" },
      ],
      choices: [
        { id: "otur", text: "Sandalyeye otur", next: "n_soru1" },
      ],
    },

    n_soru1: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru bir. K-6'da revire girdin — sensörler benim, biliyorsun. Baturay'ı buldun mu? ...Nasıl görünüyordu?」" },
      ],
      choices: [
        { id: "durust", text: "\"Ölmüştü. Muayene masasında. Yüzü... sakindi.\"", next: "n_soru1_a" },
        { id: "yalan", text: "\"Revir boştu. Kimseyi görmedim.\"", next: "n_soru1_b" },
        { id: "sessiz", text: "Sessiz kal", next: "n_soru1_c" },
      ],
    },

    n_soru1_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「...Sakin miydi?」 Uzun bir duraklama; hoparlörün statiği bile utanmış gibi. 「Güzel. Sakin olması güzel. O bana... boşver. Soru iki.」" },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru1_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "anons", text: "「Revir kapısını 04:31'de açtın, 04:39'da çıktın. İçeride sekiz dakika 'kimseyi görmemişsin'.」 Kuru bir gülüş. 「Yalan söyleyeceksen EMEK ver bakım. Bu, tembel yalandı. Soru iki.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru1_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「Sessizlik. Hm. Aday 3 de sessizdi.」 Bir kalem tıkırtısı — not alıyor. 「Sessizler hep aynı yere varıyor. Neyse. Soru iki.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru2" }],
    },

    n_soru2: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru iki. Sonar hattını buldun — evet, hattı göremiyorum ama SENİ görüyorum ve duvarlarla konuşan adam pek olağan sayılmaz. Ece'yle konuşuyorsun.」 Sesi bir kademe alçalıyor, oyunlaşıyor. 「Nerede saklanıyor?」" },
      ],
      choices: [
        { id: "soyle", text: "Saklandığı bölmeyi tarif et", next: "n_soru2_a" },
        { id: "yalan", text: "\"Kim olduğunu bile bilmiyorum. Hat tek yönlü.\"", next: "n_soru2_b" },
        { id: "reddet", text: "\"Bu soruya cevap yok. Sana değil.\"", next: "n_soru2_c" },
      ],
    },

    n_soru2_a: {
      cost: 1,
      events: [
        { type: "flag", set: { eceEleVerildi: true } },
        { type: "stat", stat: "eceGuven", delta: -30 },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「...Sonar bölmesi. Evet.」 Bir sessizlik — beklediğin kahkaha gelmiyor. 「Biliyordum zaten. Üç haftadır biliyorum. Merak ettiğim SENİN söyleyip söylemeyeceğindi.」 Kalem tıkırtısı. 「Söyledin. Not alındı. Soru üç.」" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL −10 — Ne yaptın sen?", noteKind: "alert" },
        { type: "note", id: "not_ihanet", title: "Söyledim", text: "Ece'nin yerini söyledim. Deniz 'zaten biliyordum' dedi — belki doğru, belki test. Fark etmez. Ben söyledim. Bu, geri alınmıyor." },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru2_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「Tek yönlü hat.」 Bu kez gülüş uzun ve neredeyse keyifli. 「Yalan — ama bak, bu İYİ yalan. Omurgası var, detayı var. Aday 2'yi hatırlattın bana.」 Kalem tıkırtısı duruyor. 「...Neyse. Soru üç.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru2_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "stat", stat: "eceGuven", delta: 10 },
        { type: "anons", text: "「'Sana değil.'」 Sesinde bir şey geriliyor — ama kopmuyor. 「Sadakat. Vay. Ailede çok makbuldür sadakat, biliyor musun? Şef bayılır buna.」 Tehdit mi iltifat mı, ayıramıyorsun. 「Soru üç.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru3: {
      cost: 1,
      events: [
        { type: "anons", text: "「Son soru. Bunu herkese soruyorum ve herkes yalan söylüyor.」 Statik bir an derinleşiyor; sesi ilk kez oyunsuz. 「Aileye katılmayı düşündün mü? Bir saniye bile. Şu koridorlarda tek başına ölmektense... kalabalık olmayı. Dürüst ol.」" },
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
        { type: "anons", text: "「'Asla.'」 Kuru bir ses. 「Herkes önce 'asla' der. Aday 1 de demişti. Şimdi sofrada oturuyor ve yemeği ÇOK beğeniyor.」 Kalem tıkırtısı. 「Sınav bitti.」" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_mezun" }],
    },

    n_soru3_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "anons", text: "「...Bilmiyorsun.」 Uzun bir sessizlik. Kalem tıkırtısı YOK. 「Üç adaydır bu soruya ilk dürüst cevap. Yalnızlık zor, evet. Ne kadar zor, bilemezsin.」 Bir soluk. 「...Ya da bilirsin. Sınav bitti.」" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_mezun" }],
    },

    n_soru3_c: {
      cost: 1,
      events: [
        { type: "flag", set: { denizSoruldu: true } },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「—」 Hoparlör açık; duyuyorsun, hat CANLI — ama Deniz konuşmuyor. Beş saniye. On. Kamera merceği üstünde, kımıltısız. Sonra, bambaşka, yaşında bir sesle: 「...Sıradaki soru yok. Sınav bitti.」" },
        { type: "note", id: "not_denizsoru", title: "Soruyu ona sordum", text: "'Sen katıldın mı?' — ve Deniz, kapıları kilitleyip insanlarla oynayan Deniz, cevap VEREMEDİ. Aileden mi değil mi, kendisi de bilmiyor olabilir. Bu onu daha az tehlikeli yapmıyor. Daha yalnız yapıyor. Ve yalnızlık, bu tesiste, her şeyin başladığı yer." },
      ],
      choices: [{ id: "d", text: "Ayağa kalk", next: "n_mezun" }],
    },

    /* ================= MEZUNİYET + HARUN ================= */

    n_mezun: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { mezun: true } },
        { type: "system", text: "ORYANTASYON: TAMAMLANDI — K-4 GEÇİŞ KİLİDİ: AÇIK" },
        { type: "anons", text: "「Tebrikler bakım. Mezunsun. Dört adayda bir ilk.」 Tependeki menfez takırdıyor ve içinden ayaklarının dibine bir şey düşüyor: ambalajlı bir tablet pili. 「Kıyak. Kimseye söyleme — imajım var.」" },
        { type: "battery", spares: 1 },
        { type: "anons", text: "「Son ders bedava: K-4 kapısından çıkınca uzun koridor. O koridor benim değil. O koridor kimsenin değil.」 Bir duraklama. 「...Babama selam söyle.」" },
        { type: "objective", text: "K-4 geçiş koridorunu aş" },
      ],
      choices: [
        { id: "cik", text: "K-4 geçiş kapısından çık", next: "n_harun1" },
      ],
    },

    n_harun1: {
      cost: 1,
      events: [
        { type: "narrate", text: "Uzun, çıplak bir bağlantı koridoru. Yarı yolda, koridorun öbür ucundaki köşeden, bir FENER IŞIĞI dönüyor — sarı, ağır, acele etmeyen bir ışık. Ve arkasından, doldurduğu kapı boşluğuna sığmayan bir gövde." },
        { type: "narrate", text: "\"Yeni personel.\" Ses, sakin ve derin — bir vardiya amirinin, bir BABANIN sesi. \"Mesai başladı, sen koridorlardasın. Devamsızlık tutanağı tutmam gerekecek evlat.\" Fener kalkıyor. Işık, yüzünü buluyor." },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "ŞEF SENİ GÖRDÜ — Artık bir söylenti değilsin", noteKind: "alert" },
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
      deathText: "Donakalmak İnleyen'de işe yarar — o, sesle görür. Şef gözleriyle görür. Fener ışığı üstünde sabitlenirken adımları hiç hızlanmıyor; hızlanmasına gerek yok. \"Kaçmadın. Aferin evlat,\" diyor. \"Aile, kaçmayanları sever.\"",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_harun2: {
      cost: 1,
      events: [
        { type: "narrate", text: "KOŞUYORSUN. Arkanda fener ışığı duvarlarda sallanıyor ve adımlar — o sakin, ağır adımlar — imkansız bir şekilde ARAYI KAPATIYOR. Önünde iki seçenek: sağdaki servis merdiveni kapısı ve zemindeki havalandırma menfezi." },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "menfez", text: "Menfez kapağını söküp içine dal", next: "n_menfez" },
        { id: "merdiven", text: "Servis merdiveni kapısına yüklen", next: "n_olum_harun2", default: true },
      ],
    },

    n_olum_harun2: {
      death: true,
      deathText: "Kapı kilitli. Elektronik kilit — ve elektronik kilitler kimin, biliyorsun. Hoparlörden, çok yumuşak: 「Ders dört, bakım: bana güvenme.」 Fener ışığı sırtını bulurken Deniz'in hattı kapanıyor. Nezaketen.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_menfez: {
      events: [
        { type: "narrate", text: "Menfez kapağını tırnaklarınla söküp kendini içeri çekiyorsun. Bir saniye sonra fener ışığı ızgaranın çubuklarında — yüzünün üstünde çizgi çizgi. Botları, ızgaranın hemen ötesinde duruyor. Bekliyor. DİNLİYOR." },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_menfez_ok", fail: "n_olum_menfez" },
    },

    n_olum_menfez: {
      death: true,
      deathText: "Izgaranın ardında nefesin çözülüyor — küçücük bir ses, ama ona yetiyor. Menfez kapağı, bir konserve kapağı gibi sökülüyor. \"Saklambaç mesai saatinde oynanmaz evlat,\" diyor Şef, neredeyse şefkatle. Fener sönüyor.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_menfez_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar, sonsuz bir dakika sonra, dönüp uzaklaşıyor. Fener ışığı duvarlardan çekiliyor. \"Tutanak yarına kalsın,\" diyor ses, kendi kendine, koridorun ucunda. \"Aile sofrada bekler.\"" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "narrate", text: "Menfezin içinden, tozun ve karanlığın içinden, yukarı — ana bacanın soğuk hava akımına doğru sürünüyorsun." },
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
        { type: "narrate", text: "Ana baca: K-5'i K-4'e bağlayan dikey çelik boğaz. Basamak demirleri soğuk, hava akımı yukarıdan — yaşam alanlarından — sıcak ve tuhaf bir yemek kokusu taşıyor. Tırmanıyorsun." },
        { type: "ambient", text: "Aşağıda, Deniz'in hoparlörleri son kez cızırdıyor: 「...İyi dersin bakım. Yukarısı benim bölgem değil. Yukarısı EVDİR.」 İlk kez, sesindeki neşe sana değil kendine sahte geliyor.", if: { flag: "denizSoruldu", equals: false } },
        { type: "ambient", text: "Aşağıda, Deniz'in hoparlörleri son kez cızırdıyor: 「...Sorduğun soru var ya.」 Uzun statik. 「Kimseye sorma onu bir daha. Özellikle yukarıda. Yukarısı EVDİR — ve evde herkes çoktan cevap vermiştir.」", if: { flag: "denizSoruldu", equals: true } },
        { type: "pause", ms: 1000 },
        { type: "ambient", text: "Sonar hattının minik hoparlörü, cebinde: «Hâlâ oradayım,» diyor Ece. «Sen tırmanırken hattı K-4'ün eski interkomlarına bağlamaya çalışacağım. Kaybolma. ...Lütfen kaybolma.»", if: { flag: "eceKirgin", equals: false } },
        { type: "ambient", text: "Sonar hattı, cebinde, bütün tırmanış boyunca sessiz. Ece hâlâ orada — bunu biliyorsun. Sadece artık senin için konuşmuyor.", if: { flag: "eceKirgin", equals: true } },
      ],
      choices: [
        { id: "son", text: "K-4 çıkış kapağına uzan", next: "n_k5_son" },
      ],
    },

    n_k5_son: {
      ending: true,
      events: [
        { type: "narrate", text: "Kapağa uzandığın an, bütün baca — bütün tünel ağı, bütün menfezler, K-5'in bütün çelik ciğerleri — aynı anda FISILDIYOR:" },
        { type: "ambient", text: "«beş... dört...» Bir kadın sesi. Uykulu, yumuşak, rüyasının içinden sayan bir kadın. Ninnideki sesin ta kendisi.", if: { flag: "frekansNinni", equals: true } },
        { type: "ambient", text: "«beş... dört...» Bir kadın sesi. Uykulu, yumuşak — rüyasının içinden sayan biri. Kim olduğunu bilmiyorsun. Henüz.", if: { flag: "frekansNinni", equals: false } },
        { type: "pause", ms: 1200 },
        { type: "narrate", text: "Sonra baca susuyor ve geriye yalnız hava akımı kalıyor. Kapağı itiyorsun: üstünde, K-4'ün loş ışığı ve o sıcak, yanlış yemek kokusu. Ev kokusu. Kimin evi — birazdan öğreneceksin." },
        { type: "system", text: "SINAV TAMAMLANDI" },
        { type: "system", text: "K-4: 'EV' — Şef Harun'un katı — yakında" },
      ],
    },
  },
};

// Bu bölümün başlangıç bayrakları:
export const EP02_FLAGS = {
  // keşif
  s1Ilk: false, t1Ilk: false, t3Ilk: false, dolapAcildi: false, tCep: false,
  // ilerleme
  sinav1: false, sinav2: false, mezun: false,
  // Ece hattı
  adSoylendi: false, eceYardim: false, eceKirgin: false, eceEleVerildi: false,
  // Deniz
  denizSoruldu: false,
  // gizli frekans
  frekansNinni: false,
};
