/* ============================================================
   SINIR-1 — BÖLÜM 3: "K-4 / EV"  (tam sürüm)
   Katın sahibi: ŞEF HARUN OKUR — istasyon şefi, "Aile"nin babası.
   (Deniz onun oğlu: EP02'de "Babama selam söyle" demişti.)

   TON: RE7 Baker evi + sofra dehşeti. Kat bir EV gibi düzenli:
   sofra salonu, mutfak, çocuk odası, şefin odası, soğuk depo,
   interkom nişi. Harun evde DEVRİYE gezer; sesle değil, alışkanlıkla
   avlanır — nerede olman gerektiğini bilir, "yerinde olmayan"ı bulur.

   ANA MEKANİK — YEM / İNTERKOM:
   · İnterkom nişinden sesi başka bir odaya yönlendirirsin → Harun
     o odaya gider → sen boşalan yere geçersin. Yanlış oda seçersen
     (Harun zaten oradaysa) kendini ele verirsin.

   PARÇA-KİLİT: Şefin odasındaki kilitli sandık üç AİLE YADİGARI
   ister (fotoğraf, yüzük, süt dişi) — üç odaya saçılı. Üçü toplanıp
   sandık açılınca 'ambar anahtarı' çıkar; K-3'e iniş onunla açılır.

   ZORUNLU SOFRA SAHNESI: Harun seni "aile yemeği"ne oturtur.
   Ne yaptığın (yeme / reddetme / kaçma) sonuç doğurur.

   TAŞINAN DURUM (EP01-02'den):
   · eceEleVerildi → Ece interkomdan yardım eder / etmez
   · sefFarkindalik → Harun'un başlangıç agresifliği
   · denizSoruldu → Deniz'in K-4 anonslarına sızması
   ============================================================ */

export const EP03 = {
  nodes: {

    /* ================= GİRİŞ — EVİN EŞİĞİ ================= */

    n_k4_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k4" },
        { type: "system", text: "KAT: K-4 — PERSONEL YAŞAM ALANI · YEMEKHANE · KAMARALAR" },
        { type: "narrate", text: "Baca kapağından bir eve çıkıyorsun. Gerçekten bir ev: çelik duvarların üstüne çiçekli duvar kağıdı yapıştırılmış, zemine halı serilmiş, tavandan kısık sarı bir avize sarkıyor. Ama halının altından pas sızıyor, duvar kağıdı nemden kabarmış ve avizenin ışığı bir morg kadar sıcak." },
        { type: "narrate", text: "İleride, koridorun sonunda, uzun bir yemek masası. On iki sandalye. Ve masanın başında, sırtı sana dönük, kımıldamadan oturan geniş bir gövde. Çatalını tabağına vuruyor: tık. Tık. Tık. Boş tabağa." },
        { type: "waitTap" },
        { type: "ambient", text: "Tabletinin sonar hoparlöründen Ece'nin fısıltısı geliyor: «Oraya çıktın demek. K-4. Baba'nın katı. Beni duyuyorsan iki kez öksür — hattı K-4 interkomlarına bağladım.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Tabletinin sonar hoparlörü cebinde sessiz. Ece hattı bağlamış olabilir ama seninle konuşmuyor. Yalnızsın.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "objective", text: "Bu kattan bir çıkış yolu bul" },
        { type: "note", id: "not_ev", title: "K-4: Ev", text: "Kat bir eve dönüştürülmüş — duvar kağıdı, halı, avize. Masanın başında biri oturuyor, boş tabağa çatal vuruyor. Deniz 'babama selam söyle' demişti. Bu, Şef Harun olmalı. Ailenin babası." },
      ],
      choices: [
        { id: "yaklas", text: "Sessizce masaya yaklaş", next: "n_sofra_ilk" },
        { id: "geri", text: "Baca kapağından geri dönmeyi dene", next: "n_baca_kilit" },
      ],
    },

    n_baca_kilit: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapağı geri itiyorsun — ama dışarıdan sürgülenmiş. K-5 seni geri almıyor. Aşağıdan, çok uzaktan, Deniz'in hoparlörü bir kez cızırdıyor: 「Söylemiştim. Yukarısı benim değil.」 Tek yön var: ileri." },
      ],
      choices: [
        { id: "yaklas", text: "Masaya yaklaş", next: "n_sofra_ilk" },
      ],
    },

    /* ================= ZORUNLU SOFRA SAHNESİ ================= */

    n_sofra_ilk: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Masaya yaklaştıkça gövde büyüyor. Sonra, sen daha bir kelime etmeden, çatal duruyor ve o boğuk, baba sesi bütün odayı dolduruyor:" },
        { type: "narrate", text: "\"Geç kaldın.\" Dönmüyor. \"Ailede yemek birlikte yenir. Otur. Tabağın hazır.\" Masanın senin tarafındaki tek boş sandalyenin önünde, gerçekten, bir tabak var — üstü kapaklı, buğu tütüyor." },
        { type: "waitTap" },
        { type: "alert", text: "Kaçış yok — koridorun tek çıkışı onun arkasında. Oturman gerekiyor." },
      ],
      choices: [
        { id: "otur", text: "Sandalyeye otur", next: "n_sofra_otur" },
        { id: "kac", text: "Arkanı dön ve koridora kaç", next: "n_sofra_kac" },
      ],
    },

    n_sofra_kac: {
      cost: 1,
      events: [
        { type: "narrate", text: "Arkanı dönüyorsun — ve avize sönüyor. Zifiri karanlıkta o sakin ses hemen yanında, kulağının dibinde: \"Aile sofrasından kaçılmaz evlat.\" Bir el ensene kapanıp seni geri, sandalyeye oturtuyor. Nazikçe. Bir baba gibi." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — O kadar hızlıydı ki göremedin", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 10 },
        { type: "narrate", text: "Avize geri yanıyor. Sen artık oturuyorsun. Tabak önünde. O yine masanın başında, sanki hiç kalkmamış gibi." },
      ],
      choices: [
        { id: "devam", text: "Tabağa bak", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_otur: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sandalyeye oturuyorsun. Çelik soğukluğu haltan geçiyor. O, masanın başında, ilk kez hafifçe sana dönüyor — ama yüzü avizenin gölgesinde, sadece çenesinin hattı ve ıslak parlayan bir göz görünüyor." },
        { type: "narrate", text: "\"Aferin. Bak ne kadar kolaymış.\" Çatalını tabağına koyuyor. \"Şimdi ye. Annen senin için hazırladı.\" Masada anne yok. Kimse yok. Sadece siz ikiniz ve on boş sandalye." },
      ],
      choices: [
        { id: "devam", text: "Tabağa bak", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_tabak: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapağı kaldırıyorsun. Tabakta... et. Pişmiş, baharatlanmış, özenle dizilmiş. Kokusu iyi — ve bu en kötüsü, çünkü aç olduğunu fark ediyorsun ve bu etin nereden geldiğini düşünmek istemiyorsun. Tabağın kenarında, çatalın yanında, küçük bir personel künyesi: başkasının adı." },
        { type: "note", id: "not_kunye", title: "Tabaktaki künye", text: "Tabağın yanında bir personel künyesi vardı — 'AYKUT D., teknisyen'. Etin yanında. Bunu düşünmeyeceğim. Düşünemem." },
        { type: "waitTap" },
        { type: "narrate", text: "\"Ye,\" diyor tekrar, bu kez daha alçak. \"Reddetmek... anneni üzer. Ve annen üzülünce, ben üzülürüm.\" Çatalı kaldırıyorsun. Karar senin." },
      ],
      choices: [
        { id: "ye", text: "Bir lokma al — hayatta kalmak için", next: "n_sofra_ye" },
        { id: "sakla", text: "Yiyormuş gibi yap, lokmayı sakla", next: "n_sofra_sakla" },
        { id: "reddet", text: "Çatalı bırak — \"Bunu yemem.\"", next: "n_sofra_reddet" },
      ],
    },

    n_sofra_ye: {
      cost: 1,
      events: [
        { type: "narrate", text: "Gözlerini kapatıp bir lokma alıyorsun. Çiğniyorsun. Yutuyorsun. Mideni bir taş gibi dolduruyor ama Şef'in gölgedeki yüzü gevşiyor — neredeyse mutlu. \"İşte. İşte bu. Artık ailedensin.\"" },
        { type: "flag", set: { sofraYedi: true } },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — Ne yaptığını biliyorsun", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: -15, note: "Şef sana güvenmeye başladı", noteKind: "system" },
        { type: "narrate", text: "\"Karnın doydu. Şimdi ev işleri.\" Ayağa kalkıyor — ayakta bir dolap gibi. \"Ben mutfakta olacağım. Sen etrafı topla. Ama yukarı kata, benim odama girme. Ve soğuk depoya... hiç girme.\" Ağır adımlarla mutfağa yürüyor." },
      ],
      choices: [
        { id: "devam", text: "Masadan kalk", next: "n_hol" },
      ],
    },

    n_sofra_sakla: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çatalı ağzına götürüyor, dudaklarını kapatıp lokmayı avucuna, oradan cebine indiriyorsun. Çiğniyormuş gibi çeneni oynatıyorsun. Şef seni izliyor — o ıslak göz kımıldamadan — ve bir an her şeyin bittiğini sanıyorsun." },
        { type: "narrate", text: "Sonra başını sallıyor. \"...İyi çocuk.\" Yutkunma taklidin işe yaradı. \"Karnın doydu. Ev işlerine bak. Odama girme, soğuk depoya girme.\" Ağır adımlarla mutfağa gidiyor." },
        { type: "flag", set: { sofraSakladi: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "devam", text: "Masadan kalk", next: "n_hol" },
      ],
    },

    n_sofra_reddet: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çatalı tabağa bırakıyorsun. Çelik çınlaması odada çok uzun sürüyor. \"...Yemem,\" diyorsun. Sessizlik. Sonra Şef ayağa kalkıyor ve ilk kez avizenin ışığına giriyor — ve keşke girmeseydi. Yüzünün yarısı yok; yerine dikişlerle tutturulmuş, başka birinden alınmış bir yüz parçası var." },
        { type: "stat", stat: "akil", delta: -18, note: "AKIL -18 — O yüzü unutamayacaksın", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 20, note: "ŞEF sana kırıldı — artık seni gözlüyor", noteKind: "alert" },
        { type: "flag", set: { sofraReddetti: true } },
        { type: "narrate", text: "\"Annenin yemeğini reddettin.\" Sesi hâlâ sakin — ve bu sakinlik, bir çığlıktan bin kat korkunç. \"Bu evde bunun bir bedeli var. Ama acelem yok. Bütün gece bizimlesin.\" Mutfağa dönüyor, ağır ağır. \"Toparlan. Odama girme. Soğuk depoya girme. Ve benden... kaçabileceğini sanma.\"" },
      ],
      choices: [
        { id: "devam", text: "Masadan kalk", next: "n_hol" },
      ],
    },

    /* ================= MERKEZ: EV HOLÜ (HUB) ================= */

    n_hol: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Evin holü: sofra salonundan çıkan beş kapı. Duvarda çerçeveli 'aile fotoğrafları' asılı — hepsinde farklı insanlar, hepsinin yüzüne aynı gülümseme çizilmiş. Kalın kalemle. Sonradan.", if: { flag: "holIlk", equals: false } },
        { type: "flag", set: { holIlk: true } },
        { type: "status", items: [
          { label: "FOTOĞRAF", flag: "yadigar1" },
          { label: "YÜZÜK", flag: "yadigar2" },
          { label: "SÜT DİŞİ", flag: "yadigar3" },
        ] },
        { type: "ambient", text: "Mutfaktan tencere sesleri geliyor — Şef orada. Ama ev büyük ve o her yerde olamaz. Beş kapı: mutfak, çocuk odası, şefin odası (üst kat), soğuk depo, ve küçük interkom nişi." },
      ],
      choices: [
        { id: "cocuk", text: "Çizgi film sesi gelen odaya gir", next: "n_cocuk", if: { flag: "cocukBitti", equals: false } },
        { id: "interkom", text: "Duvardaki interkom nişine git", next: "n_interkom" },
        { id: "sef", text: "Üst kata, kapısı kilitli odaya çık", next: "n_sef_kapi" },
        { id: "depo", text: "Soğuk hava sızan ağır kapıya yaklaş", next: "n_depo_kapi" },
        { id: "mutfak", text: "Mutfağa göz at (Şef orada)", next: "n_mutfak" },
        { id: "vitray", text: "Sofanın üstündeki renkli cam paneli incele", next: "n_vitray_panel", if: { flag: "vitrayCozuldu", equals: false } },
        { id: "sandik", text: "Şefin odasındaki sandığı açmayı dene", next: "n_sef_sandik", if: { flag: "sefOdaAcik", equals: true } },
      ],
    },

    /* YENİ: aile vitrayı — colorgrid bulmacası (renk deseni) */
    n_vitray_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Holün duvarında, eskiden güzel olduğu belli renkli bir cam panel — bir aile portresi: baba, anne, bir çocuk, hepsi el ele. Ama camlar kırılıp yanlış renklerle yamanmış; portre bir kâbusa dönmüş, yüzler karışmış. Panelin altında Deniz'in çocuk el yazısı: 'annem doğru renkleri bilir. ben unuttum.' Renkleri doğru desene getirirsen panel ışığı geçirir — ve arkasındaki oyuk açığa çıkar." },
        { type: "note", id: "not_vitray", title: "Aile vitrayı", text: "Holdeki renkli cam aile portresi yanlış renklerle yamanmış. Doğru desene getirmem gerek — hücrelere dokununca renk değişiyor. Deniz'in notu: doğru renkler annesinin hatırası. Arkasında bir oyuk var." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "AİLE VİTRAYI — DESENİ ONAR",
        palette: ["#2a2a30", "#b23a3a", "#c2a24a", "#3a6a9a", "#5a9a6a"],
        // 4x4 = 16 hücre; hedef desen: aile figürü (koyu zemin, kırmızı/altın/mavi/yeşil figürler)
        target: [0,3,3,0, 3,1,1,3, 2,1,1,2, 0,4,4,0],
        start:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
        cols: 4,
        success: "n_vitray_cozuldu",
        cancel: "n_hol",
      },
    },

    n_vitray_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "VİTRAY: TAMAMLANDI" },
        { type: "narrate", text: "Son renk yerine oturduğu an panel canlanıyor — arkadan sızan soluk ışık, aile portresini bütünlüyor. Bir an, gerçekten güzel: mutlu bir aile, el ele. Sonra ışık kayıyor ve panelin arkasındaki oyuk beliriyor. İçinde küçük bir teselli: yedek pil ve annenin bir notu." },
        { type: "flag", set: { vitrayCozuldu: true } },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_anne", title: "Annenin Notu", style: "hand",
          meta: "— vitrayın arkasındaki oyukta —",
          body: "Denizim,\n\nBabası değişti. O aşağıdaki şeyi bulduklarından\nberi. Artık 'aile' derken bambaşka bir şey\nkastediyor. Seni de katmak istiyor.\n\nBu paneli senin için yaptım — doğru renkleri\nhatırlarsan, hâlâ benim oğlum olduğunu\nbilirim. Kaç. Yukarı çık. Beni bekleme.\n\n— Annen" } },
        { type: "stat", stat: "akil", delta: 4 },
      ],
      choices: [
        { id: "geri", text: "Hole dön", next: "n_hol" },
      ],
    },

    /* ================= İNTERKOM NİŞİ — YEM MEKANİĞİ ================= */

    n_interkom: {
      cost: 1,
      events: [
        { type: "narrate", text: "Duvara gömülü eski bir interkom paneli: her odaya giden bir düğme ve bir mikrofon. Şef'in evindeki her hoparlör buraya bağlı. Bir odaya ses gönderirsen — bir tıkırtı, bir ses — Şef onu duyar ve KONTROL ETMEYE gider.", if: { flag: "interkomIlk", equals: false } },
        { type: "flag", set: { interkomIlk: true } },
        { type: "document", open: true, if: { flag: "interkomIlk", equals: false }, doc: {
          id: "d_interkom", title: "İnterkom Kullanım Notu (elle)", style: "hand",
          meta: "— nişin içine iğnelenmiş, aceleyle yazılmış —",
          body: "DİNLE, kim bulursan:\nBaba sesi takip eder. Bir odaya ses ver,\noraya gider. O giderken ÖBÜR odaya geç.\n\nAMA: zaten bulunduğu odaya ses verme —\nseni duyar, nereden geldiğini anlar.\nMutfakta o. Sesi BAŞKA yere gönder.\n\nÜç yadigâr lazım kapı için:\n- fotoğraf: çocuk odasında\n- yüzük: soğuk depoda (dikkat)\n- diş: onun cebinde. onu uyut.\n         — önceki 'evlat'" } },
        { type: "note", id: "not_interkom", title: "Yem sistemi", text: "İnterkom: bir odaya ses gönder, Şef oraya gider, ben boşalan odaya geçerim. AMA Şef'in zaten bulunduğu odaya ses gönderirsem beni fark eder. Üç yadigâr: fotoğraf (çocuk odası), yüzük (soğuk depo), diş (Şef'in cebinde — onu uyutmam gerek)." },
      ],
      choices: [
        { id: "cocuga", text: "Çocuk odasına ses gönder (yem)", next: "n_yem_cocuk" },
        { id: "depoya", text: "Soğuk depoya ses gönder (yem)", next: "n_yem_depo" },
        { id: "salona", text: "Sofra salonuna ses gönder (yem)", next: "n_yem_salon" },
        { id: "geri", text: "Nişten çık, hole dön", next: "n_hol" },
      ],
    },

    n_yem_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çocuk odası düğmesine basıp mikrofona bir tıkırtı gönderiyorsun. Mutfaktaki tencere sesleri duruyor. Ağır adımlar — mutfaktan çıkıp çocuk odasına yöneliyor. \"...Kim var orada? Yavrum, sen mi?\"" },
        { type: "flag", set: { yemCocuk: true, sefNerede: "cocuk" } },
        { type: "system", text: "ŞEF: ÇOCUK ODASINA GİTTİ — orası artık BOŞ değil, o orada" },
        { type: "ambient", text: "Şimdi mutfak, soğuk depo ve üst kat boş. Ama çocuk odasındaki fotoğrafı almak için oraya giremezsin — o orada." },
      ],
      choices: [
        { id: "hol", text: "Hole dön ve boşalan yeri kullan", next: "n_hol" },
      ],
    },

    n_yem_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "Soğuk depo düğmesine basıyorsun. Bir tıkırtı. Mutfaktan homurtu: \"...Depo mu? Kapağı yine mi açık kaldı.\" Ağır adımlar soğuk depoya yöneliyor. Anahtarlarını şıngırdatıyor." },
        { type: "flag", set: { yemDepo: true, sefNerede: "depo" } },
        { type: "system", text: "ŞEF: SOĞUK DEPOYA GİTTİ — mutfak ve üst kat şimdi boş" },
      ],
      choices: [
        { id: "hol", text: "Hole dön", next: "n_hol" },
      ],
    },

    n_yem_salon: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sofra salonu düğmesine basıyorsun. Sandalyelerin gıcırtısını taklit eden bir ses gönderiyorsun. \"...Sofraya mı oturdun? Aferin evlat, geliyorum.\" Adımlar salona yöneliyor." },
        { type: "flag", set: { yemSalon: true, sefNerede: "salon" } },
        { type: "system", text: "ŞEF: SOFRA SALONUNA GİTTİ — mutfak, depo ve üst kat boş" },
      ],
      choices: [
        { id: "hol", text: "Hole dön", next: "n_hol" },
      ],
    },

    /* ================= ÇOCUK ODASI — yadigar 1 (fotoğraf) ================= */

    n_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çizgi film sesi bozuk bir kasetten geliyor — aynı üç saniye, sonsuz döngüde. Oda bir çocuk odası: ranza, oyuncaklar, duvarda boy çizgileri. Ama boy çizgileri bir çocuğun değil; en alttan en üste, farklı isimler, farklı yıllar — hepsi 'evlat' diye işaretlenmiş.", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "alert", text: "ŞEF BURADA — sesini duyurdun, seni arıyor. ÇIK.", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "Çizgi film sesi bozuk bir kasetten geliyor — aynı üç saniye, sonsuz döngüde. Oda bir çocuk odası: ranza, oyuncaklar, duvarda boy çizgileri — farklı isimler, farklı yıllar, hepsi 'evlat'. Komodinin üstünde çerçeveli bir aile fotoğrafı, camı çatlak.", if: { flag: "sefNerede", equals: "cocuk", negate: true } },
      ],
      choices: [
        { id: "kac_c", text: "Hemen çık — o burada", next: "n_cocuk_yakalandi", if: { flag: "sefNerede", equals: "cocuk" } },
        { id: "fotograf", text: "Çatlak çerçeveli fotoğrafı al", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "arastir", text: "Ranzanın altına bak", next: "n_cocuk_ranza", if: { flag: "cocukRanza", equals: false } },
        { id: "cik", text: "Odadan çık", next: "n_hol" },
      ],
    },

    n_cocuk_yakalandi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapıya koşuyorsun ama o çoktan eşikte. Fener değil — bu kez sadece o, gölgesi bütün kapıyı dolduruyor. \"Odana geldin demek. İyi. Çocuklar odalarında olmalı.\" Kapıyı kapatıyor." },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "sakla", text: "Ranzanın altına sıkış, nefesini tut", next: "n_cocuk_nefes" },
      ],
    },

    n_cocuk_nefes: {
      events: [
        { type: "narrate", text: "Ranzanın altındaki karanlığa kayıyorsun. Onun botları odaya giriyor, yavaş yavaş, oyuncakların arasında. Bir oyuncağı eziyor — çıtırtı. Duruyor. Eğiliyor." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_cocuk_kurtul", fail: "n_olum_cocuk" },
    },

    n_olum_cocuk: {
      death: true,
      deathText: "Nefesin ranzanın altında çözülüyor. Bir el karanlığa uzanıp bileğini buluyor. \"Buldum seni. Saklambaç bitti.\" Çizgi film hâlâ o üç saniyeyi tekrarlıyor, sen artık duymuyorsun.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_cocuk_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar sonunda dönüp çıkıyor. \"...Sonra oynarız,\" diyor kapıda. Bir dakika daha bekleyip ranzanın altından çıkıyorsun. Kalbin kulaklarında." },
        { type: "flag", set: { sefNerede: "", cocukBitti: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "fotograf", text: "Fotoğrafı al", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Odadan çık", next: "n_hol" },
      ],
    },

    n_cocuk_foto: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çatlak çerçeveli fotoğrafı alıyorsun. İçinde genç bir Harun, bir kadın ve bir çocuk — gerçek bir aile, gerçek gülümsemelerle. Fotoğrafın arkasında el yazısı: 'Harun, Sevgi, küçük Deniz — 2009.' Demek bir zamanlar gerçekti. Bir zamanlar." },
        { type: "flag", set: { yadigar1: true } },
        { type: "note", id: "not_yadigar1", title: "Yadigâr 1/3: Fotoğraf", text: "Aile fotoğrafı: Harun, karısı Sevgi, ve küçük DENİZ — 2009. Deniz gerçekten Harun'un oğlu. Bu aile bir zamanlar gerçekti. Sandık için üç yadigârdan biri bu." },
      ],
      choices: [
        { id: "cik", text: "Odadan çık", next: "n_hol" },
      ],
    },

    n_cocuk_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { cocukRanza: true } },
        { type: "narrate", text: "Ranzanın altında, tozun içinde, eski bir çocuk günlüğü. Yazı çocuksu, sonra giderek bozuluyor." },
        { type: "document", open: true, doc: {
          id: "d_cocukgunluk", title: "Bir Çocuğun Günlüğü", style: "hand",
          meta: "— ranzanın altında —",
          body: "babam bugün yeni bir abi getirdi. adı aykut.\nannem çok sevindi. artık kalabalığız.\n\nabim aykut kaçmaya çalıştı. babam üzüldü.\nşimdi abim hep sofrada, hiç konuşmuyor ama.\n\nbabam diyor ki aile hiç küçülmez, hep büyür.\nyeni gelenler eski gidenlerin yerini alır.\nben büyüyünce ben de baba olacakmışım.\naşağı kata inip kendi aileni kur diyor babam.\n\n(son satır, farklı, olgun el yazısı:)\nindim. kurdum. adım artık Deniz. — K-5" } },
        { type: "note", id: "not_cocukgunluk", title: "Deniz'in çocukluğu", text: "Ranzadaki günlük Deniz'e ait. Harun onu burada 'yetiştirmiş', sonra Deniz aşağı inip K-5'te 'kendi ailesini' kurmuş. Aile böyle çoğalıyor: her evlat büyüyünce bir alt kata inip yeni bir baba oluyor. Hasta bir hanedan." },
      ],
      choices: [
        { id: "fotograf", text: "Fotoğrafı al", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Odadan çık", next: "n_hol" },
      ],
    },

    /* ================= SOĞUK DEPO — yadigar 2 (yüzük) + ölüm ================= */

    n_depo_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Soğuk depo kapısı: ağır, buğulu, kenarlarından buz sızıyor. Şef 'girme' dedi — ki bu tam olarak girmen gereken yer demek. Ama içerisi dondurucu; uzun kalırsan donarsın, ve Şef depoya ses gelirse gelir." },
        { type: "alert", text: "ŞEF DEPODA — şu an giremezsin.", if: { flag: "sefNerede", equals: "depo" } },
      ],
      choices: [
        { id: "gir", text: "Kapıyı arala, içeri gir", next: "n_k4_depo", if: { flag: "sefNerede", equals: "depo", negate: true } },
        { id: "bekle", text: "Şef çıkana kadar bekle (hole dön)", next: "n_hol", if: { flag: "sefNerede", equals: "depo" } },
      ],
    },

    n_k4_depo: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Soğuk depo. Nefesin buhar oluyor, parmakların hemen uyuşuyor. Tavandan kancalara asılı... şekiller. Bakma. Aramaya geldiğin şey burada bir yerde: raflarda, buz tutmuş kutuların arasında." },
        { type: "narrate", text: "Ve arka duvarda — bir kapak daha. Buzla kaplı bir tahliye kapağı. Belki bir çıkış. Ama önce yüzüğü bul; el yazısı not onu 'depoda' diyordu." },
      ],
      choices: [
        { id: "yuzuk", text: "Buz tutmuş kutuları ara (yüzük)", next: "n_depo_yuzuk", if: { flag: "yadigar2", equals: false } },
        { id: "kapak", text: "Arka duvardaki buzlu kapağı incele", next: "n_depo_kapak" },
        { id: "cik", text: "Fazla üşüdün — çık", next: "n_hol" },
      ],
    },

    n_depo_yuzuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "Kutuları tek tek açıyorsun — donmuş erzak, buz, ve sonunda küçük bir teneke kutu. İçinde bir alyans, bir tutam saç ve bir not: 'Sevgi'nin. Onu kaybettim. Ama aile hiç küçülmez — herkes onun yerini doldurmaya çalıştı. Kimse olamadı.' Şef'in karısı. Ölmüş." },
        { type: "flag", set: { yadigar2: true } },
        { type: "note", id: "not_yadigar2", title: "Yadigâr 2/3: Yüzük", text: "Sevgi'nin alyansı, soğuk depoda bir teneke kutuda. Harun'un karısı ölmüş; bütün bu 'aile' çılgınlığı onun yokluğunu doldurma çabası. Yüzük sandık için ikinci yadigâr." },
      ],
      choices: [
        { id: "kapak", text: "Arka duvardaki kapağa git", next: "n_depo_kapak" },
        { id: "cik", text: "Depodan çık", next: "n_hol" },
      ],
    },

    n_depo_kapak: {
      cost: 2,
      events: [
        { type: "narrate", text: "Buzlu kapağı kazıyorsun. Altından bir uyarı levhası çıkıyor: 'K-3 TAHLİYE — YALNIZCA AMBAR ANAHTARIYLA'. Yani buradan inilir ama anahtar gerek — ve anahtar, Şef'in odasındaki sandıkta. Depo seni dondurmadan çıkmalısın." },
        { type: "note", id: "not_depokapak", title: "K-3 tahliyesi", text: "Soğuk deponun arkasında K-3'e inen bir tahliye kapağı var — ama 'ambar anahtarı' gerekiyor. Anahtar Şef'in odasındaki kilitli sandıkta. Sandık üç yadigâr istiyor. Çıkış yolu belli: sandığı aç, anahtarı al, buradan in." },
        { type: "objective", text: "Üç yadigârı bul, sandığı aç, ambar anahtarıyla depodan K-3'e in" },
      ],
      choices: [
        { id: "cik", text: "Donmadan depodan çık", next: "n_hol" },
      ],
    },

    /* ================= MUTFAK — Şef'in yeri (tehlike) ================= */

    n_mutfak: {
      cost: 1,
      events: [
        { type: "narrate", text: "Mutfak kapısından bakıyorsun. Şef orada — sırtı dönük, dev bir tencerenin başında, bir şeyler doğruyor. Bıçağı tahtaya iniyor: tak, tak, tak. Ritmi hiç bozulmuyor.", if: { flag: "sefNerede", equals: "", negate: true } },
        { type: "narrate", text: "Mutfak şu an boş — Şef başka yerde. Ocakta tencere kaynıyor, tahtada yarım doğranmış bir şey. Duvarda bir bıçak askısı; bir yuva boş.", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "Mutfak boş — Şef depoda. Tencere kaynıyor. Çekmecelerden birini karıştırabilirsin.", if: { flag: "sefNerede", equals: "depo" } },
        { type: "narrate", text: "Mutfak boş — Şef salonda. Aceleci ol.", if: { flag: "sefNerede", equals: "salon" } },
      ],
      choices: [
        { id: "cabuk", text: "Boş mutfağı çabucak ara", next: "n_mutfak_ara", if: { flag: "sefNerede", equals: "", negate: true } },
        { id: "geri", text: "Şef orada — sessizce geri çekil", next: "n_hol", if: { flag: "sefNerede", equals: "" } },
      ],
    },

    n_mutfak_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "Boş mutfağı hızla arıyorsun. Çekmecede bir şey: Şef'in vardiya defteri, yağ lekeli. Son sayfada bir liste — 'aileye katılanlar' ve tarihler. En altta, taze mürekkeple, senin görev numaran ve yanında boş bir kutu. Henüz işaretlenmemiş." },
        { type: "flag", set: { mutfakArandi: true } },
        { type: "document", open: true, doc: {
          id: "d_sefdefter", title: "Şef'in Vardiya Defteri",
          meta: "SINIR-1 · İSTASYON ŞEFİ · H. OKUR",
          body: "AİLEYE KATILANLAR:\n\n· Aykut D. — sofrada 'ikna' edildi. iyi evlat.\n· Nevin A. — direndi. bahçeye verildi (K-3).\n· Selin ? — kaçtı. hâlâ arıyorum.\n· [senin no'n] — [ ] henüz\n\nNOT: Deniz aşağıda kendi ailesini kurdu.\nGurur duyuyorum. Sıra bunda. Sofrada\nyerse — evlat. Reddederse — malzeme.\n\nYÜZÜK hâlâ depoda. Sevgi'yi\ngeri getiremedim ama aileyi büyüttüm.\nO da isterdi. İsterdi, değil mi?" } },
        { type: "note", id: "not_sefdefter", title: "Şef'in listesi", text: "Şef'in defteri: 'aileye katılanlar'. Aykut (sofrada), Nevin (K-3'e, 'bahçeye'), Selin (kaçmış, hâlâ aranıyor). Benim numaram en altta, kutu boş. Yersem 'evlat', reddedersem 'malzeme'. Nevin K-3'te — bir sonraki katta biri var." },
      ],
      choices: [
        { id: "cik", text: "Şef dönmeden çık", next: "n_hol" },
      ],
    },

    /* ================= ŞEF'İN ODASI — sandık (parça kilidi) ================= */

    n_sef_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üst kata dar bir merdiven çıkıyor. Şef'in odası: kapısı kilitli değil ama eşikte durmak bile zor — içerisi bir tapınak gibi. Karşı duvarda büyük bir sandık, üç yuvalı bir kilit ve sandığın üstünde, cam bir fanus altında... bir şey. Onu görmek için içeri girmen gerek." },
        { type: "flag", set: { sefOdaAcik: true } },
      ],
      choices: [
        { id: "sandik", text: "Sandığa yaklaş", next: "n_sef_sandik" },
        { id: "fanus", text: "Fanusun altındakine bak", next: "n_sef_fanus", if: { flag: "fanusBakildi", equals: false } },
        { id: "cik", text: "Odadan çık", next: "n_hol" },
      ],
    },

    n_sef_fanus: {
      cost: 1,
      events: [
        { type: "flag", set: { fanusBakildi: true } },
        { type: "narrate", text: "Cam fanusun altında bir süt dişi ve bir tutam bebek saçı — ve küçük bir etiket: 'Deniz'in ilk dişi. Oğlum aşağı indi ama bir parçası hep bende.' Üçüncü yadigâr bu: diş. Ama fanus alarmlı — Şef, biri dokununca ANLAR. El yazısı not 'onu uyut' demişti; bu fanusu değil, ŞEF'i uyutmak demekti belki." },
        { type: "note", id: "not_fanus", title: "Yadigâr 3/3: Süt dişi", text: "Üçüncü yadigâr: Deniz'in süt dişi, Şef'in odasında cam fanusta. Fanus alarmlı — dokununca Şef anlar. 'Onu uyut' notu: fanusu almadan önce Şef'i etkisiz bırakmam gerek. Ya da alıp koşmayı göze alırım." },
      ],
      choices: [
        { id: "al", text: "Fanusu kır, dişi kap (Şef gelecek)", next: "n_fanus_al" },
        { id: "birak", text: "Şimdilik dokunma, geri çekil", next: "n_sef_kapi" },
      ],
    },

    n_fanus_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "Fanusu deviriyorsun — cam kırılıyor, alarm değil ama ondan beteri: evin her yerindeki hoparlörlerden aynı anda Şef'in sesi. \"Fanusuma dokundun.\" Ve merdivende ağır adımlar, hızlı, ilk kez HIZLI. Dişi kapıp dönüyorsun." },
        { type: "flag", set: { yadigar3: true, sefKizgin: true, sefNerede: "sef_odasi" } },
        { type: "stat", stat: "sefFarkindalik", delta: 25, note: "ŞEF GELİYOR — çok kızgın", noteKind: "alert" },
        { type: "alert", text: "⚠ ŞEF MERDİVENDE — SAKLANACAK YER YOK, KOŞ" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "yatak", text: "Yatağın altına dal", next: "n_fanus_yatak" },
        { id: "kos", text: "Merdivenden aşağı, onun yanından geç, hole fırla", next: "n_fanus_kos", default: true },
      ],
    },

    n_fanus_yatak: {
      events: [
        { type: "narrate", text: "Yatağın altına kayıyorsun. Botları odaya giriyor, yavaşlıyor. \"Biliyorum buradasın. Kokunu alıyorum — annenin yemeğini yedin, artık bizden kokuyorsun.\" Eğiliyor." },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9500, success: "n_fanus_kurtul", fail: "n_olum_yatak" },
    },

    n_olum_yatak: {
      death: true,
      deathText: "Nefesin yatağın altında çözülüyor. Bir el ayak bileğini yakalayıp seni çekiyor. \"Bulundun. Malzeme oldun.\" Süt dişi avucundan kayıp yuvarlanıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fanus_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar duraksıyor, sonra pencereye yöneliyor — seni başka yerde sanıyor. Yatağın altından süzülüp merdivene, oradan hole iniyorsun. Diş cebinde, üçü de tamam." },
        { type: "flag", set: { sefNerede: "" } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "sandik", text: "Sandığı açmaya dön", next: "n_sef_sandik" },
        { id: "hol", text: "Hole in", next: "n_hol" },
      ],
    },

    n_fanus_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "Merdivenden aşağı atılıyorsun; Şef tam çıkarken omuz omuza geçiyorsunuz — nefesi yüzünde, eli havayı yalıyor ama seni ıskalıyor. Hole yuvarlanıyorsun, diş cebinde, kalbin göğsünü yırtıyor." },
        { type: "flag", set: { sefNerede: "sef_odasi" } },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Kıl payı", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15 },
      ],
      choices: [
        { id: "sandik", text: "Sandığı açmaya git (Şef hâlâ yukarıda arıyor)", next: "n_sef_sandik" },
      ],
    },

    n_sef_sandik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Sandık: üç yuvalı bir kilit ve üstünde renkli camdan küçük bir pano — üç yadigâr yerine oturunca desen tamamlanıp açılıyor. Kaç yadigârın var?" },
        { type: "alert", text: "SANDIK KİLİTLİ — üç yadigâr eksik. Fotoğraf, yüzük, diş: hepsini bulmalısın.", if: { flag: "yadigar3", equals: false } },
        { type: "narrate", text: "Üç yadigâr da cebinde: fotoğraf, yüzük, süt dişi. Üçünü yuvalara yerleştiriyorsun — ve sandığın camı, bir aile armasına dönüşmek için dönmeyi bekliyor.", if: { flag: "yadigar3", equals: true } },
      ],
      choices: [
        { id: "coz", text: "Cam panoyu çevir — armayı tamamla", next: "n_sandik_puzzle", if: { flag: "yadigar3", equals: true } },
        { id: "ara", text: "Eksik yadigârları aramaya dön", next: "n_hol", if: { flag: "yadigar3", equals: false } },
        { id: "cik", text: "Sandığı bırak, hole dön", next: "n_hol", if: { flag: "yadigar3", equals: true } },
      ],
    },

    n_sandik_puzzle: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üç yadigâr üç halkanın eksik camlarını tamamladı. Şimdi halkaları çevirip aile armasını — Okur ailesinin çürümüş mührünü — bütünle." },
      ],
      interaction: {
        kind: "rings",
        title: "OKUR SANDIĞI — AİLE ARMASINI TAMAMLA",
        rings: [
          { color: "#8a6a3a", step: 30, offset: 120 },
          { color: "#6a3a3a", step: 45, offset: 225 },
          { color: "#3a5a6a", step: 40, offset: 160 },
        ],
        pieces: [
          { flag: "yadigar1", ring: 0, shard: 2, fig: 0 },
          { flag: "yadigar2", ring: 1, shard: 4, fig: 1 },
          { flag: "yadigar3", ring: 2, shard: 6, fig: 2 },
        ],
        success: "n_sandik_acik",
        cancel: "n_sef_sandik",
      },
    },

    n_sandik_acik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "OKUR SANDIĞI: AÇILDI" },
        { type: "narrate", text: "Sandık bir tabut gibi açılıyor. İçinde: paslı bir AMBAR ANAHTARI, birkaç yedek pil, ve en altta katlanmış bir mektup. Anahtarı ve pilleri alıyorsun." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { ambarAnahtari: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_sefmektup", title: "Şef'in Mektubu (gönderilmemiş)", style: "hand",
          meta: "— sandığın dibinde, katlanmış —",
          body: "Sevgi'ye,\n\nSeni kaybettiğimde istasyon da benimle öldü.\nAma buldum onu — aşağıda, K-2'deki Buluntu.\nO bize aileyi geri veriyor. Herkesi bir arada\ntutuyor. Sesini duyunca herkes duruyor,\nsayıyor, ait oluyor.\n\nDeniz'i büyüttüm. O da aşağı indi, kendi\nailesini kurdu. Ben de büyütmeye devam\nediyorum. Sen olmasan da aile büyüyor.\n\nBir gün Buluntu'ya inersen — ona teşekkür et.\nBizi yeniden bir araya getirdi.\n\n— H." } },
        { type: "note", id: "not_sefmektup", title: "Buluntu — K-2", text: "Şef'in mektubu her şeyi bağlıyor: K-2'deki 'Buluntu' bütün bunun kaynağı. Sesini duyunca herkes 'duruyor, sayıyor, ait oluyor' — uykuda sayanlar, ninni, 432 Hz. Aile onun etrafında kurulmuş. Ambar anahtarı elimde; soğuk depodan K-3'e inebilirim." },
        { type: "objective", text: "Soğuk depoya dön, ambar anahtarıyla K-3'e in" },
      ],
      choices: [
        { id: "depo", text: "Soğuk depoya yönel", next: "n_final_yol" },
      ],
    },

    /* ================= FİNAL — DEPODAN KAÇIŞ ================= */

    n_final_yol: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Hole iniyorsun — ve ev değişmiş. Avize kırmızı yanıyor, bütün hoparlörlerden aynı anda Şef'in sesi geliyor, her yönden: \"Anahtarımı aldın. Sandığımı açtın. Sevgi'nin yüzüğünü aldın.\" Artık yem işe yaramaz; o her yerde, çünkü ev onun bedeni." },
        { type: "alert", text: "⚠ ŞEF ARTIK SESLE DEĞİL ÖFKEYLE AVLANIYOR — soğuk depoya koş", if: { flag: "sofraReddetti", equals: true } },
        { type: "narrate", text: "Soğuk depo koridorun sonunda. Oraya varıp anahtarı buzlu kapağa sokman gerek — ama Şef ile depo arasında bütün hol var.", if: { flag: "sofraReddetti", equals: false } },
        { type: "narrate", text: "Karnındaki lokma taş gibi ağır. Şef 'bizden kokuyorsun' demişti — belki bu, onu bir an yanıltır. Soğuk depoya koş.", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Holü koş, soğuk depoya ulaş", next: "n_final_kos" },
      ],
    },

    n_final_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "Koşuyorsun. Şef holün ortasında beliriyor — bütün gövdesiyle, kollarını açmış, seni kucaklamak ister gibi. \"Gel evlat. Kaçma. Aile seni bekliyor.\" İki yol: yanından sıyrılıp geçmek ya da devrik bir dolabın üstünden atlamak." },
        { type: "stat", stat: "sefFarkindalik", delta: 10 },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "siyril", text: "Duvara yapışıp yanından sıyrıl", next: "n_final_siyril" },
        { id: "atla", text: "Devrik dolabın üstünden atla", next: "n_final_atla", default: true },
      ],
    },

    n_final_siyril: {
      cost: 1,
      events: [
        { type: "narrate", text: "Duvara yapışıp kollarının altından süzülüyorsun; parmakları ceketini sıyırıyor ama tutamıyor. Soğuk depo kapısı önünde. Anahtarı buzlu kilide sokuyorsun." },
      ],
      choices: [
        { id: "in", text: "Anahtarı çevir, depodan K-3'e in", next: "n_k4_son" },
      ],
    },

    n_final_atla: {
      cost: 1,
      events: [
        { type: "narrate", text: "Dolaba atlıyorsun — ama ayağın kayıyor, bir an dengeni kaybediyorsun ve o an ona yetiyor. Bir el ayak bileğini yakalıyor.", if: { flag: "sofraYedi", equals: false } },
        { type: "narrate", text: "Dolaba atlıyorsun. Şef bir an duraksıyor — 'bizden kokan' birine saldırmak içgüdüsüne ters — ve o duraksama sana yetiyor. Öbür tarafa geçiyorsun.", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "in", text: "Depo kapısına ulaş, anahtarı çevir", next: "n_k4_son", if: { flag: "sofraYedi", equals: true } },
        { id: "tut", text: "Yakalandın — kurtulmaya çalış", next: "n_olum_final", if: { flag: "sofraYedi", equals: false } },
      ],
    },

    n_olum_final: {
      death: true,
      deathText: "Bileğin onun avucunda. \"Yakaladım seni evlat.\" Seni yavaşça, şefkatle sofraya doğru sürüklüyor — ve biliyorsun, artık tabaktaki değil, tabaktakini hazırlayan olacaksın. Ev hiç küçülmez. Ev hep büyür.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_k4_son: {
      cost: 1,
      events: [
        { type: "system", text: "AMBAR KAPAĞI: AÇIK — K-3'E İNİŞ" },
        { type: "narrate", text: "Anahtar buzlu kilitte dönüyor, kapak açılıyor, aşağıdan nemli toprak ve çürüyen bitki kokusu yükseliyor. Ardından kapağı çekip kilitliyorsun. Öbür yanından Şef'in yumrukları iniyor — bir, iki — sonra duruyor." },
        { type: "waitTap" },
        { type: "ambient", text: "Çelik kapağın ardından, boğuk, neredeyse ağlamaklı: \"...Herkes gidiyor. Sevgi gitti. Deniz indi. Sen de indin. Ben hep burada, sofrada, tek başıma kalıyorum.\" Sonra sessizlik." },
        { type: "ambient", text: "Sonar hattı cebinde canlanıyor: «Başardın. K-3'e iniyorsun — orası Nevin'in katı. Biyolog. O... o hâlâ kendisi olabilir. Belki. Dikkatli ol.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "narrate", text: "Merdiven aşağı, karanlığa iniyor. Yukarıda ev susuyor; aşağıda, K-3'te, bir şey nefes alıyor — büyük, yavaş, bitkisel. 'Bahçe' seni bekliyor." },
        { type: "system", text: "— BÖLÜM 3 SONU: EV —" },
        { type: "system", text: "K-3: 'BAHÇE' — Dr. Nevin'in katı — yakında" },
      ],
      choices: [
        { id: "k3", text: "K-3'e in", next: "n_k3_giris" },
      ],
    },

  },
};

export const EP03_FLAGS = {
  vitrayCozuldu: false,
  // giriş / sofra
  sofraYedi: false, sofraSakladi: false, sofraReddetti: false,
  // hub / keşif
  holIlk: false, interkomIlk: false, cocukRanza: false,
  mutfakArandi: false, fanusBakildi: false, sefOdaAcik: false,
  cocukBitti: false,
  // yem sistemi (Şef'in konumu)
  sefNerede: "", yemCocuk: false, yemDepo: false, yemSalon: false,
  // yadigârlar (sandık kilidi)
  yadigar1: false, yadigar2: false, yadigar3: false,
  sefKizgin: false, ambarAnahtari: false,
};
