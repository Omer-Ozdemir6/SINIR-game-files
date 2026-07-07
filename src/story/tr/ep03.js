/* ============================================================
   SINIR-1 — BÖLÜM 3: "K-4 / EV"  (tam sürüm)
   Katın sahibi: ŞEF HARUN OKUR — istasyon şefi, "Aile"nin babası.
   (Deniz onun oğlu: EP02'de "Babama selam söyle" demişti.)

   TON: OUTLAST + RE7 Baker evi + sofra dehşeti. Kat bir EV gibi düzenli:
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
        { type: "narrate", text: "Baca kapağından bir eve tırmanıyorsun. Ama burası bir yuva değil, akıl hastanesinin ortasına kurulmuş bir mezbaha. Çelik duvarların üzerine hışırdayan çiçekli duvar kâğıtları yapıştırılmış, zemine kalın halılar serilmiş. Elindeki tek şey, ekranının çiğ ve pikselli ışığı yüzünü aydınlatan soluk bir tablet. Tabletin ışığı zifiri karanlığı yırtmaya yetmiyor; duvar kağıtlarının arkasından gelen pas ve lağım kokusunu, nemden kabarmış çürümeyi çıplak kılacak kadar zayıf." },
        { type: "narrate", text: "Bu ev taklit edilmemiş, ezberlenmiş. Birileri aile olmanın şeklini fotoğraflardan, yemek saatlerinden, çocuk odası ölçülerinden öğrenmiş ve hepsini çeliğin içine yanlış sırayla çakmış. Burada sevgi yok; sevginin prosedürü var. Otur, ye, gülümse, itaat et. Etmezsen sofranın bir parçası ol." },
        { type: "narrate", text: "İleride, koridorun mutlak karanlığında uzun bir yemek masası uzanıyor. On iki sandalye. Ve masanın başında, sırtı sana dönük, kımıldamadan oturan o devasa, kambur gövde. Elindeki çatalı paslı ve boş bir tabağa vuruyor: tık. Tık. Tık. Karanlıkta yankılanan bu metalik ses, bir sonraki kurbanın sen olacağını fısıldıyor." },
        { type: "waitTap" },
        { type: "ambient", text: "Tabletin hoparlöründen Ece'nin titreyen fısıltısı statik gürültüyle bölünüyor: «Oraya çıktın demek... K-4. O canavarın katı. Sakın ışığını doğrudan ona tutma... Beni duyuyorsan iki kez öksür — hattı K-4 interkomlarına bağladım.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Tabletin parıldayan cam ekranı cebinde sessiz. Ece hattı bağlamış olabilir ama seninle konuşmuyor. Tamamen yalnızsın. Sadece tabletinin şarjı ve karanlık var.", if: { flag: "eceEleVerildi", equals: true } },
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
        { type: "narrate", text: "Arkana dönüp kapağı çılgınlar gibi itiyorsun — ama dışarıdan ağır sürgülerle kilitlenmiş! K-5 seni geri almıyor, kapana kısıldın. Aşağıdan, o derin dehlizlerden Deniz'in hoparlörü delirmiş gibi cızlıyor: 「Söylemiştim... Yukarısı benim değil. Babam yerinde olmayan her şeyi keser.」 Dehşet sarmalında tek yön var: ileri." },
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
        { type: "narrate", text: "Tabletin zayıf ekran ışığını önünü görebilmek için titreyen ellerinle ileri uzatıyorsun. Masaya yaklaştıkça o devasa gövde karanlıkta daha da büyüyor, gölgesi duvara bir iblis gibi vuruyor. Sonra, sen nefes bile alamadan çatal sesleri bıçak gibi kesiliyor. O boğuk, gırtlaktan gelen vahşi baba sesi odayı inletiyor:" },
        { type: "narrate", text: "\"Geç kaldın.\" Arkasını dönmüyor. \"Ailede yemek birlikte yenir. Otur. Tabağın hazır.\" Sandalyenin önünde, gerçekten, paslı bir tabak var — üstü kapalı, içinden ağır, mideni bulandıran bir et buğusu tütüyor." },
        { type: "waitTap" },
        { type: "alert", text: "Kaçış yok — koridorun tek çıkışı bu psikopatın arkasında. Oturman gerekiyor." },
      ],
      choices: [
        { id: "otur", text: "Sandalyeye otur", next: "n_sofra_otur" },
        { id: "kac", text: "Arkanı dön ve koridora kaç", next: "n_sofra_kac" },
      ],
    },

    n_sofra_kac: {
      cost: 1,
      events: [
        { type: "narrate", text: "Arkanı dönüp deliler gibi karanlığa koşuyorsun — o an tavandaki cılız ışık patlıyor. Zifiri karanlık. Sadece tabletinin yaydığı o hastalıklı mavi ışık kalıyor. Tam o sırada arkandan et kokan devasa, nasırlı bir el ensene kapanıyor ve seni muazzam bir güçle havaya kaldırıp sandalyeye fırlatıyor! Kemiklerin gıcırdıyor. O sakin ama deliliğin sınırındaki ses tam kulağının dibinde bitiyor: \"Aile sofrasından kaçılmaz evlat. Bir daha dene, bacaklarını keserim.\"" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Gözlerin karanlıkta dehşeti gördü, kalbin durma noktasında!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 10 },
        { type: "narrate", text: "Cılız avize kırpışarak geri yanıyor. Titreyerek sandalyede oturuyorsun. Tabak tam önünde duruyor. O ise masanın başında, sanki yerinden hiç kalkmamış gibi duruyor ama ağır nefes alıp verişi odayı dolduruyor." },
      ],
      choices: [
        { id: "devam", text: "Tabağa bak", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_otur: {
      cost: 1,
      events: [
        { type: "narrate", text: "Soğuk sandalyeye çaresizce oturuyorsun. Çeliğin dondurucu soğukluğu pantolonundan etine, etinden iliğine işliyor. Masanın başındaki dev, ilk kez yavaşça sana doğru dönüyor... ama yüzünün üst kısmı karanlıkta; sadece çarpık çenesinin hattı ve tabletinin ışığında ıslakça parlayan, çılgın bir göz yuvarlağı görünüyor." },
        { type: "narrate", text: "\"Aferin. Bak ne kadar kolaymış.\" Paslı çatalı masaya saplıyor. \"Şimdi ye. Annen senin için hazırladı. Günlerdir taze malzeme arıyorduk.\"" },
      ],
      choices: [
        { id: "devam", text: "Tabağa bak", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_tabak: {
      cost: 1,
      events: [
        { type: "narrate", text: "Korkudan titreyen parmaklarınla tabağın kapağını kaldırıyorsun. İçinde... insani uzuvları andıran, dumanı tüten, baharatlanmış et parçaları var. Kokusu dehşet verici derecede iyi kokuyor ve bu seni kusmanın eşiğine getiriyor, çünkü açsın! Tabağın hemen kenarında, kanlı yağların arasında parıldayan küçük bir personel künyesi var: 'AYKUT D., teknisyen'." },
        { type: "note", id: "not_kunye", title: "Tabaktaki künye", text: "Tabağın yanında 'AYKUT D.' yazan bir personel künyesi vardı. Etin içinde değil, yanında. Bu daha kötü. Harun onun kim olduğunu biliyordu. İsmini korumuş, bedenini pişirmiş. Bunu yazıyorum çünkü beynim birkaç dakika sonra bunun gerçek olmadığına karar verebilir. Gerçekti. Kokusu hâlâ ağzımda." },
        { type: "waitTap" },
        { type: "narrate", text: "\"Ye,\" diyor, sesi bu sefer derin bir hırıltıya dönüşüyor. \"Reddetmek... anneni üzer. Ve inan bana, o üzülürse bu masayı senin kanınla boyarım.\" Çatalı kaldırıyorsun. Miden, hatıraların ve insan kalmaya çalışan son parçan aynı anda kasılıyor." },
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
        { type: "narrate", text: "Gözlerini sımsıkı kapatıp o çiğ, insani eti ağzına atıyorsun. Çiğniyorsun. Dişlerinin arasında ezilen dokular mideni altüst ediyor, kusmamak için boğazını sıkıyorsun. Yutuyorsun. Şef'in gölgedeki o sapkın yüzü gevşiyor, dudakları yukarı doğru kıvrılıyor: \"İşte... İşte benim güzel evladım. Artık ailemizin bir parçasısın.\"" },
        { type: "flag", set: { sofraYedi: true } },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — Bir insanın etini çiğnedin. Geri dönüşü olmayan eşik geçildi!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: -15, note: "Şef sana güvenmeye başladı", noteKind: "system" },
        { type: "narrate", text: "\"Karnın doydu. Şimdi ev işleri.\" Ayağa kalkıyor — ayakta adeta devasa bir kitle gibi duruyor. \"Ben mutfakta yeni malzemeleri hazırlayacağım. Sen etrafı topla. Ama yukarı kata, odama sakın girme. Ve o soğuk depoya... eğer girersen seni o kancalara canlı canlı asarım.\" Ağır, sürüklenen adımlarla mutfağa yürüyor." },
      ],
      choices: [
        { id: "devam", text: "Masadan kalk", next: "n_hol" },
      ],
    },

    n_sofra_sakla: {
      cost: 1,
      events: [
        { type: "narrate", text: "Et lokmasını ağzına götürüyor, dudaklarını kapatıp tiksinç sıvının parmaklarından akmasına izin vererek lokmayı avucuna, oradan cebine sıkıştırıyorsun. Çeneni büyük hareketlerle oynatarak yutkunma taklidi yapıyorsun. Şef, o ıslak ve çılgın gözüyle tabletinin ışığı altında seni izliyor... Kalbin göğüs kafesini parçalayacak gibi vuruyor." },
        { type: "narrate", text: "Sonra başını yavaşça sallıyor. \"...İyi çocuk. Söz dinleyen çocukları severim.\" Numaran işe yaradı ama cebinden sızan sıcak kan ceketini kirletiyor. \"Karnın doydu. Ev işlerine bak. Odama girme, soğuk depoya girme.\" Ağır adımlarla mutfağa gidiyor." },
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
        { type: "narrate", text: "Çatalı tabağa fırlatıyorsun. Metalin çınlaması o uğursuz odada yankılanıyor. \"Bunu yemem,\" diyorsun sesin titreyerek. Ölümcül bir sessizlik çöküyor. Şef ayağa fırlıyor ve tabletinin loş ışığı yüzüne vuruyor... Keşke bakmasaydın. Yüzünün sağ yarısı tamamen yüzülmüş; yerine dikişlerle, paslı zımbalarla tutturulmuş, morarmış başka bir kurbanın et parçası dikilmiş!" },
        { type: "stat", stat: "akil", delta: -18, note: "AKIL -18 — O zımbalanmış, çürüyen yüz rüyalarına musallat olacak!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 20, note: "ŞEF sana kırıldı — artık seni gözlüyor", noteKind: "alert" },
        { type: "flag", set: { sofraReddetti: true } },
        { type: "narrate", text: "\"Annenin yemeğine hakaret ettin!\" diye kükrüyor ama sesi aniden fısıltıya dönüyor — bu ani geçiş deliliğin dik alası. \"Bu evde nankörlerin derisi yüzülür. Ama acelem yok... Bütün gece buradasın, avucumun içindesin.\" Ağır adımlarla mutfağa dönüyor. \"Toparlan. Odama girme. Soğuk depoya girme. Ve benden... asla kaçamayacağını kafana sok.\"" },
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
        { type: "narrate", text: "Evin holündesin. Elindeki tabletin loş ışığı duvarda asılı çerçeveli 'aile fotoğraflarına' vuruyor. Fotoğraflardaki insanların yüzleri bıçakla kazınmış ve hepsinin yerine kan kırmızısı mürekkeple çarpık, devasa gülümsemeler çizilmiş. Manyakça bir el işi.", if: { flag: "holIlk", equals: false } },
        { type: "flag", set: { holIlk: true } },
        { type: "status", items: [
          { label: "FOTOĞRAF", flag: "yadigar1" },
          { label: "YÜZÜK", flag: "yadigar2" },
          { label: "SÜT DİŞİ", flag: "yadigar3" },
        ] },
        { type: "ambient", text: "Mutfaktan satır sesleri ve kemik kırılma gürültüleri geliyor — Şef orada bir şeyler parçalıyor. Tabletinin ekranındaki zayıf parıltı önündeki beş karanlık kapıyı aydınlatıyor: mutfak, çocuk odası, şefin üst kattaki odası, soğuk depo ve o dar interkom nişi." },
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
        { type: "narrate", text: "Holün duvarında, renkli camlardan yapılmış bir panel duruyor. Eski bir aile portresi bu. Ama camlar kırılmış, sanki üzerlerine kan sıçramış gibi yanlış, hastalıklı renklerle yamanmış. Yüzler birbirine karışmış birer kâbus tablosu gibi. Panelin hemen altında Deniz'in çocuksu ama titrek el yazısı kazınmış: 'Annem doğru renkleri bilir. Ben unuttum. Babam canavarlaştı.' Renkleri doğru desene getirirsen arkadaki gizli oyuk açılacak." },
        { type: "document", open: false, doc: {
          id: "d_aile_uyum", title: "Aile Uyum Gözlem Formu",
          body: "SINIR-1 DAVRANIŞ GÖZLEM FORMU\nBİRİM: K-4 yerleşik aile simülasyonu\nGÖZLEMCİ: D. Okur\nDURUM: Aktif / temas halinde yaklaşılmamalı\n\nGözlenen ritüeller:\n- Sofra çağrısı duyulduğunda tüm bireyler oturur.\n- Yemek reddi, baba figüründe aşırı koruyucu şiddet doğurur.\n- Çocuk odası sesi, baba figüründe yönelim kaybı yaratır.\n- Anneye ait renk/desen uyaranları kilitli bölmelerde olumlu tepki üretir.\n\nKlinik yorum:\nAile davranışı sevgiye değil, tekrar edilen ceza ve ödül döngüsüne bağlıdır.\nBaba figürü kayıp eşin yerine yeni bireyleri koyarak yas tepkisini sürdürüyor.\nDışarıdan gelen kişi 'evlat' rolünü yeterince taklit ederse kısa süreli\nhayatta kalabilir.\n\nUyarı:\nBu bir tedavi vakası değildir. K-4 artık konut değil, ritüel alanıdır.\nHarun Tekin'e aile bireyi olmadığınızı belli etmeyin." } },
        { type: "note", id: "not_vitray", title: "Aile vitrayı", text: "Holdeki renkli cam aile portresi yanlış renklerle yamanmış. Doğru desene getirmem gerek — hücrelere dokununca renk değişiyor. Deniz'in notu: doğru renkler annesinin hatırası. Arkasında bir oyuk var." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "AİLE VİTRAYI — DESENİ ONAR",
        palette: ["#2a2a30", "#b23a3a", "#c2a24a", "#3a6a9a", "#5a9a6a"],
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
        { type: "narrate", text: "Son parça yerine oturduğunda panel klik sesiyle geriye doğru açılıyor. Tabletinin çiğ ışığı, arkadaki tozlu oyuğa vuruyor. İçeride hayat kurtarıcı bir yedek pil ve eski, kırışmış bir kağıt parçası var. Notu hızla okuyorsun." },
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
        { type: "narrate", text: "Duvara gömülmüş paslı, eski bir interkom paneli. Evin her odasındaki hoparlörler bu lanet mekanizmaya bağlı. Buradan bir odaya ses dalgası gönderirsen, o manyak Şef adımlarını oraya yönlendirecek. Onu manipüle etmek için elindeki tek koz bu.", if: { flag: "interkomIlk", equals: false } },
        { type: "flag", set: { interkomIlk: true } },
        { type: "document", open: true, if: { flag: "interkomIlk", equals: false }, doc: {
          id: "d_interkom", title: "İnterkom Kullanım Notu (elle)", style: "hand",
          meta: "— nişin içine iğnelenmiş, aceleyle yazılmış —",
          body: "DİNLE, kim bulursan:\nBaba sesi takip eder. Bir odaya ses ver,\noraya gider. O giderken ÖBÜR odaya geç.\n\nAMA: zaten bulunduğu odaya ses verme —\nseni duyar, nereden geldiğini anlar.\nMutfakta o. Sesi BAŞKA yere gönder.\n\nÜç yadigâr lazım kapı için:\n- fotoğraf: child odasında\n- yüzük: soğuk depoda (dikkat)\n- diş: onun cebinde. onu uyut.\n         — önceki 'evlat'" } },
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
        { type: "narrate", text: "Çocuk odası düğmesine basıp mikrofona sertçe vuruyorsun. Mutfaktaki satır sesleri anında bıçak gibi kesiliyor. Ağır, hımbıl ama ölümcül adımlar holü dövüyor. Koridordan gırtlaksı bir ses yükseliyor: \"...Kim var orada? Yavrum? Deniz? Yine mi dolaba saklandın?\" Oraya gidiyor." },
        { type: "flag", set: { yemCocuk: true, sefNerede: "cocuk" } },
        { type: "system", text: "ŞEF: ÇOCUK ODASINA GİTTİ — orası artık BOŞ değil, o orada" },
        { type: "ambient", text: "Şimdi mutfak ve soğuk depo boşaldı. Ama çocuk odasındaki o fotoğrafı almak için delilik etmen gerekir; çünkü o canavar şu an orada, karanlığı kokluyor." },
      ],
      choices: [
        { id: "hol", text: "Hole dön ve boşalan yeri kullan", next: "n_hol" },
      ],
    },

    n_yem_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "Soğuk depo düğmesine basıyorsun. Hoparlörden cızırtılı bir çığlık sesi simüle ediyorsun. Mutfaktan bir homurtu kopuyor: \"Deponun kapısını kim kurcalıyor lan yine!\" Ağır adımlar soğuk depoya yöneliyor, belindeki paslı anahtarlar şıngırdıyor." },
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
        { type: "narrate", text: "Sofra salonunun düğmesine basıp boş tabak gıcırtısı gönderiyorsun. \"...Yemeğe geri mi döndün evlat? Güzel... Geliyorum, etleri tazeleyeceğim,\" diyerek salona yöneliyor." },
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
        { type: "narrate", text: "Çocuk odasından, bozuk bir televizyondan gelen cızırtılı çizgi film müziği yükseliyor — aynı dehşet verici üç saniyelik melodi sonsuz bir döngüde dönüyor. Ranzanın yanındaki duvarda boy çizgileri var ama bir çocuğun gelişimi değil bu... En alttan en üste kadar farklı kurbanların isimleri kazınmış ve hepsinin yanına vahşice 'Evlat' notu düşülmüş.", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "alert", text: "DEHŞET AN KIL PAYI — ŞEF BURADA! Tabletinin ışığı duvara vurursa öldün! HEMEN ÇIK!", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "Çizgi film melodisi bozuk kasetten odaya yayılıyor. Komodinin üstünde, camı çatlamış, üzeri kurumuş kan lekeleriyle kaplı bir çerçeve var. Tabletinin loş parıltısını çerçeveye doğrultuyorsun.", if: { flag: "sefNerede", equals: "cocuk", negate: true } },
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
        { type: "narrate", text: "Kapıya doğru fırlıyorsun ama o devasa gölge çoktan eşiği kapatmış! Hiçbir fener veya ışık kaynağı yok, tabletinin mavi ekranı onun zımbalanmış, terli ve kanlı yüzünü aydınlatıyor. Çılgın gözlerini sana dikiyor: \"Odana geldin demek yaramaz çocuk... Çocuklar geceleri odalarında uslu uslu beklemeli!\" Ağır çelik kapıyı arkasından kilitliyor!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "sakla", text: "Ranzanın altına sıkış, nefesini tut", next: "n_cocuk_nefes" },
      ],
    },

    n_cocuk_nefes: {
      events: [
        { type: "narrate", text: "Tabletinin ekranını göğsüne bastırıp ışığı tamamen boğarak ranzanın altındaki pisliklerin, kurumuş kanların içine kayıyorsun. Devasa botları odaya giriyor. Ağır, hırıltılı nefes alışverişi tam tepende. Yerdeki plastik bir oyuncağa basıyor — çıtırtı! Duruyor... Yavaşça yere doğru eğiliyor, ağır et kokusu burnunu dolduruyor." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_cocuk_kurtul", fail: "n_olum_cocuk" },
    },

    n_olum_cocuk: {
      death: true,
      deathText: "Nefesin ranzanın altında patlıyor, hıçkırarak nefes alıyorsun! O an devasa, kıllı bir el karanlığın içinden fırlayıp saçlarından yakalıyor ve seni fırlatarak dışarı çekiyor! Kafan ranzanın demirine çarpıyor. \"Seni buldum küçük fare. Saklambaç bitti!\" Satır havaya kalkıyor, çizgi film müziği eşliğinde her yer kararıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_cocuk_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar sonunda kapıya doğru yöneliyor ve odadan çıkıyor. \"...Neyse, sonra oynarız,\" diye fısıldıyor koridordan. İdrar ve ter kokan ranzanın altından sürünerek çıkıyorsun. Kalbin adeta kulaklarında atıyor, tabletinin ekranı terinden sırılsıklam." },
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
        { type: "narrate", text: "Çatlak çerçevedeki fotoğrafı söküp alıyorsun. Fotoğrafta genç, henüz delirerek canavara dönüşmemiş bir Harun, yanında temiz yüzlü bir kadın ve küçük bir çocuk var. Arkasını çeviriyorsun, tablet ışığında okuyorsun: 'Harun, Sevgi, küçük Deniz — 2009.' Demek bu kâbus bir zamanlar gerçek bir aileydi..." },
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
        { type: "narrate", text: "Ranzanın altındaki toz ve pisliklerin arasında eski, lekeli bir çocuk günlüğü buluyorsun. Yazılar ilk sayfalarda çocuksu, sonlara doğru ise tamamen şizofrenik bir hal alıyor." },
        { type: "document", open: true, doc: {
          id: "d_cocukgunluk", title: "Bir Çocuğun Günlüğü", style: "hand",
          meta: "— ranzanın altında —",
          body: "babam bugün yeni bir abi getirdi. adı aykut.\nannem çok sevindi. artık kalabalığız.\n\nabim aykut kaçmaya çalıştı. babam üzüldü.\nşimdi abim hep sofrada, hiç konuşmuyor ama.\n\nbaba diyor ki aile hiç küçülmez, hep büyür.\nyeni gelenler eski gidenlerin yerini alır.\nben büyüyünce ben de baba olacakmışım.\naşağı kata inip kendi aileni kur diyor babam.\n\n(son satır, farklı, olgun el yazısı:)\nindim. kurdum. adım artık Deniz. — K-5" } },
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
        { type: "narrate", text: "Soğuk deponun ağır, çelik kapısının önündesin. Kenarlardan sızan buzlu hava tabletinin ekranını buğulandırıyor. Şef buraya kesinlikle 'girme' demişti. SINIR-1'in kayıt dışı, kapısı içeriden çizilmiş ölüm odalarından biri tam önünde duruyor." },
        { type: "alert", text: "SENSÖR ALARMI — ŞEF ŞU AN İÇERİDE! İçeriden gelen et parçalama seslerini tabletinin mikrofonu bile algılıyor. Giremezsin!", if: { flag: "sefNerede", equals: "depo" } },
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
        { type: "narrate", text: "Kapıyı aralayıp içeri süzülüyorsun. Deponun içi dondurucu. Nefesin havada yoğun bir buhar bulutuna dönüşüyor, parmakların tableti tutamayacak kadar uyuşuyor. Başını yukarı kaldırdığında tabletin cılız ışığı tavandaki et kancalarına asılı insan gövdelerini aydınlatıyor... Derileri yüzülmüş, donmuş cesetler. Gözlerini kaçırmak zorundasın yoksa kusacaksın." },
        { type: "narrate", text: "Arka duvarda kalın buz tabakasıyla kaplanmış bir tahliye kapağı daha var. Ama önce o alyansı bulmalısın." },
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
        { type: "narrate", text: "Buz tutmuş kutuları, donmuş et yığınlarını çıplak ellerinle kazıyorsun. Parmak uçların donup çatlıyor, kanıyor. Sonunda paslı bir teneke kutu buluyorsun. İçinde kanlı bir alyans, bir tutam dökülmüş saç ve bir not var: 'Sevgi'nin. Onu kaybettim ama aile büyümek zorunda... Herkes onun yerini almalı.' Bu deliliğin kökeni bu alyansta saklı." },
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
        { type: "narrate", text: "Kapağın üzerindeki buzları tabletinin kenarıyla kazıyorsun. Altından donmuş bir yazı çıkıyor: 'K-3 TAHLİYE — YALNIZCA AMBAR ANAHTARIYLA'. Buradan aşağı kaçabilirsin ama anahtar o psikopatın odasındaki sandıkta kilitli. Acele etmelisin, donmak üzeresin." },
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
        { type: "narrate", text: "Mutfak kapısının aralığından bakıyorsun. Şef orada! Sırtı dönük, devasa bir satırla tezgaha bir şeyler indiriyor: TAK! TAK! TAK! Tezgahtan sıçrayan kanlar duvar kağıtlarını boyuyor. Vahşi bir ritim.", if: { flag: "sefNerede", equals: "", negate: true } },
        { type: "narrate", text: "Mutfak şu an boş, Şef çocuk odasında. Ocakta devasa bir kazan kaynıyor, içinden insan saçları fışkırıyor. Duvardaki bıçak askısından devasa bir et satırı eksik...", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "Mutfak boş, Şef depoda. Çekmecelerden sızan pis kokuları tabletinin ışığı altında inceleme şansın var.", if: { flag: "sefNerede", equals: "depo" } },
        { type: "narrate", text: "Mutfak boş, Şef salonda. Elini çabuk tut yoksa seni burada kıstıracak.", if: { flag: "sefNerede", equals: "salon" } },
      ],
      choices: [
        { id: "cabuk", text: "Boş mutfağı çabucak ara", next: "n_mutfak_ara", if: { flag: "sefNerede", equals: "", negate: true } },
        { id: "geri", text: "Şef orada — sessizce geri çekil", next: "n_hol", if: { flag: "sefNerede", equals: "" } },
      ],
    },

    n_mutfak_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "Boş mutfağa dalıp çekmeceleri çılgınlar gibi karıştırıyorsun. Yağ ve kan lekeleri içindeki vardiya defterini buluyorsun. Şef'in kurban listesi bu. Son sayfayı açtığında, tabletinin loş mavi ışığı kendi görev numaranın üzerinde parlıyor... Yanındaki onay kutusu henüz boş. Seni kesip bu kazana atmak için bekliyor." },
        { type: "flag", set: { mutfakArandi: true } },
        { type: "document", open: true, doc: {
          id: "d_sefdefter", title: "Şef'in Vardiya Defteri",
          meta: "SINIR-1 · İSTASYON ŞEFİ · H. OKUR",
          body: "AİLEYE KATILANLAR:\n\n· Aykut D. — sofrada 'ikna' edildi. iyi evlat.\n· Nevin A. — direndi. bahçeye verildi (K-3).\n· Selin ? — kaçtı. hâlâ arıyorum.\n· [senin no'n] — [ ] henüz\n\nNOT: Deniz aşağıda kendi ailesini kurdu.\nGurur duyuyorum. Sıra bunda. Sofrada\nyerse — evlat. Reddederse — malzeme.\n\nYÜZÜK hâlâ depoda. Sevgi'yi\ngeri getiremedim ama aileyi büyüttüm.\nO da isterdi. İsterdi, değil mi?" } },
        { type: "note", id: "not_sefdefter", title: "Şef'in listesi", text: "Harun'un defteri bir aile albümü gibi düzenlenmiş, sadece fotoğrafların yerinde infaz yöntemleri var. Aykut sofrada. Nevin bahçede. Selin kayıp. Benim numaram en altta, kutu boş. Burada insan iki şeye dönüşebiliyor: evlat ya da malzeme. İkisi de aynı masaya çıkıyor." },
      ],
      choices: [
        { id: "cik", text: "Şef dönmeden çık", next: "n_hol" },
      ],
    },

    /* ================= ŞEF'İN ODASI — sandık (parça kilidi) ================= */

    n_sef_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Gıcırdayan ahşap merdivenlerden üst kata, manyağın odasına tırmanıyorsun. Burası bir odadan ziyade, kurbanların kemikleriyle donatılmış sapkın bir tapınak. Duvarlarda insan derisinden yapılmış örtüler var. Karşıda kilitli bir sandık, üzerinde ise cam bir fanusun içinde korunan uğursuz bir şey duruyor." },
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
        { type: "narrate", text: "Tabletinin ekran parıltısını cam fanusa yaklaştırıyorsun. İçinde kurumuş kanlı bir bebek dişi ve saç teli var. Altındaki etikette: 'Deniz'in ilk dişi. Bir parçası hep bende kalacak,' yazıyor. Bu üçüncü yadigâr! Ama fanusun altındaki kablolar duvardaki bir düzeneğe bağlı. Dokunduğun an evin içindeki mekanik alarmlar patlayacak!" },
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
        { type: "narrate", text: "Cam fanusu vurup parçalıyorsun! Keskin şarapnel parçaları elini kesiyor, kanlar tablete bulaşıyor. O an evin her köşesindeki hoparlörlerden canavarın kulakları tırmalayan, delirmiş kükremesi yükseliyor: \"KUTSALIMA DOKUNDUN! SENİ PARÇALARA AYIRACAĞIM!\" Merdivenlerden yukarı doğru gelen çok hızlı, gümbür gümbür koşan ayak sesleri... Dişi kapıp fırlıyorsun!" },
        { type: "flag", set: { yadigar3: true, sefKizgin: true, sefNerede: "sef_odasi" } },
        { type: "stat", stat: "sefFarkindalik", delta: 25, note: "ŞEF DELİRDİ — BURAYA KOŞUYOR!", noteKind: "alert" },
        { type: "alert", text: "⚠ CANAVAR MERDİVENDE — SAKLANACAK YER YOK, KOŞ YA DA ÖL!" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "yatak", text: "Yatağın altına dal", next: "n_fanus_yatak" },
        { id: "kos", text: "Merdivenden aşağı, onun yanından geç, hole fırla", next: "n_fanus_kos", default: true },
      ],
    },

    n_fanus_yatak: {
      events: [
        { type: "narrate", text: "Leş gibi kokan yatağın altına kendini fırlatıyorsun. Tabletinin ekranını kıyafetinin içine sokup kapkaranlık kalıyorsun. Kapı kırılırcasına açılıyor! İçeri giren devasa botlar yeri sarsıyor. Elindeki satırı sağa sola savuruyor, ahşap mobilyaları parçalıyor. Ağzından salyalar akarak soluyor: \"Kokunu alıyorum... Annemin etini yedin, bizim gibi kokuyorsun! Çık dışarı!\" Tam önünde yere doğru eğiliyor!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9500, success: "n_fanus_kurtul", fail: "n_olum_yatak" },
    },

    n_olum_yatak: {
      death: true,
      deathText: "Korkudan ciğerlerin patlıyor, nefesini tutamayıp hıçkırıyorsun! Harun'un o zımbalı dehşet yüzü yatağın altında beliriyor. Dev el ayak bileğine yapışıp seni tek hamlede dışarı fırlatıyor! Duvara çarpıp bilincini kaybederken satırın göğüs kafesine inişini hissediyorsun. \"Yeni malzeme hazır!\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fanus_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "Botlar duraksıyor, hırlayarak odadan dışarı, koridora doğru fırlıyor. Seni kaçtı sanıyor! Yatağın altından sürünerek çıkıyorsun, üstün başın kurbanların kanıyla kaplanmış. Tabletini kavrayıp sessizce aşağı hole süzülüyorsun. Diş cebinde, üç yadigâr da hazır." },
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
        { type: "narrate", text: "Merdivenlerden aşağı çılgınlar gibi atılıyorsun! Merdivenin ortasında Şef ile burun buruna geliyorsun, o iğrenç dikişli yüzünün sıcak salyası yüzüne sıçrıyor! Satırı savuruyor, ceketini yırtıyor ama çevik bir hamleyle kollarının altından sıyrılıp hole yuvarlanıyorsun. Kalbin göğsünü delmek üzere, tablet sarsıntıdan neredeyse elinden düşecek!" },
        { type: "flag", set: { sefNerede: "sef_odasi" } },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Ölümün nefesini yüzünde hissettin!", noteKind: "alert" },
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
        { type: "narrate", text: "Sandığın önündesin. Üzerinde üç yuva ve paslı mekanik halkalar var. Parçaları yerleştirip bu hastalıklı ailenin armasını tamamlaman gerekiyor. Kaç parçan var?" },
        { type: "alert", text: "KAPALI VE KİLİTLİ — Eksik parçalar var! Fotoğraf, alyans ve süt dişini bulmadan bu sandık açılmaz!", if: { flag: "yadigar3", equals: false } },
        { type: "narrate", text: "Üç kanlı yadigâr da elinde. Fotoğrafı, alyansı ve dişi yuvalara yerleştiriyorsun. Sandığın mekanizması paslı çarklarla inleyerek dönmeye hazır hale geliyor.", if: { flag: "yadigar3", equals: true } },
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
        { type: "narrate", text: "Yadigârlar kilitleri serbest bıraktı. Şimdi parmaklarınla paslı çelik halkaları çevirerek bu yamyam hanedanlığın çürümüş mührünü bir araya getir." },
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
        { type: "narrate", text: "Sandık ağır bir tabut kapağı gibi açılıyor. İçinden yayılan çürüme kokusu yüzüne vuruyor. En üstte paslı, ağır bir AMBAR ANAHTARI ve yedek piller duruyor. Onları hızla cebine atıyorsun. En altta ise kanla yazılmış bir mektup var." },
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
        { type: "narrate", text: "Hole indiğin an tüm ev kırmızı bir cehennem ışığına boğuluyor! Hoparlörler cızırdayarak patlıyor ve Harun'un tamamen delirdiğini gösteren o vahşi feryadı evi inletiyor: \"ANAHTARIMI ALDIN! ANNESİNİN YÜZÜĞÜNÜ ÇALDIN! SENİ YAŞATMAYACAĞIM!\" Artık yemler bitti, seni kokundan avlayacak!" },
        { type: "alert", text: "⚠ O ETİ YEMEDİN! KOKUNU ALDI VE ÖFKEDEN DELİRDİ — DEPOYA DOĞRU KOŞ!", if: { flag: "sofraReddetti", equals: true } },
        { type: "narrate", text: "Soğuk depo koridorun ta sonunda. Elindeki tabletin ışığı sarsıntıdan titrerken önündeki tek engelin o devasa yamyam olduğunu görüyorsun.", if: { flag: "sofraReddetti", equals: false } },
        { type: "narrate", text: "Midendeki o lokma taş gibi ağır, canavar feryat ediyor: \"Bizden kokuyorsun ama hırsızsın!\" Kaçmaktan başka çare yok. Depoya koş!", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Holü koş, soğuk depoya ulaş", next: "n_final_kos" },
      ],
    },

    n_final_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "Deliler gibi koşuyorsun! Adımlarının sesi evde yankılanıyor. Harun holün tam ortasında devasa cüssesiyle bitiyor, elindeki satırı havaya kaldırmış hırıldıyor: \"Gel evlat... Baban seni kucaklayacak!\" Önünde iki ölümcül seçenek var: ya yanından sıyrılacaksın ya da devrilmiş dolabın üzerinden fırlayacaksın." },
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
        { type: "narrate", text: "Duvara çarparak, canavarın satırı savurduğu kolunun altından sıyrılıyorsun! Satır duvarı parçalıyor, ahşap tozları yüzünü yakıyor. Soğuk deponun kapısına ulaşıp anahtarı o buğulu, buz tutmuş kilide çılgınlar gibi sokuyorsun." },
      ],
      choices: [
        { id: "in", text: "Anahtarı çevir, depodan K-3'e in", next: "n_k4_son" },
      ],
    },

    n_final_atla: {
      cost: 1,
      events: [
        { type: "narrate", text: "Dolabın üzerine atlıyorsun ama zemin kurbanların kanıyla o kadar kaygan ki ayağın kayıyor! Yere kapaklanıyorsun, tablet elinden fırlayıp uzağa düşüyor. Tam o sırada devasa bir el ayak bileğini kavrayıp seni yerde sürüklemeye başlıyor!", if: { flag: "sofraYedi", equals: false } },
        { type: "narrate", text: "Dolabın üzerinden hızla atlıyorsun. Şef tam satırı indirecekken burnunu çekiyor — üzerindeki o insan eti kokusu içgüdülerini bir anlığına felç ediyor! O saliselik duraksama hayatını kurtarıyor, dolabın öbür tarafına geçip depoya fırlıyorsun.", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "in", text: "Depo kapısına ulaş, anahtarı çevir", next: "n_k4_son", if: { flag: "sofraYedi", equals: true } },
        { id: "tut", text: "Yakalandın — kurtulmaya çalış", next: "n_olum_final", if: { flag: "sofraYedi", equals: false } },
      ],
    },

    n_olum_final: {
      death: true,
      deathText: "Bileğin onun nasırlı avucunun içinde eziliyor. \"Yakaladım seni nankör evlat!\" Çığlıklarına aldırmadan seni sürükleyerek o kanlı masaya götürüyor... Sırtüstü masaya fırlatılıyorsun. Satır havaya kalkarken son gördüğüm şey, tabletinin köşede ters dönmüş ekranından tavana vuran hastalıklı mavi ışık oluyor. \"Evimiz hep büyüyecek...\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_k4_son: {
      cost: 1,
      events: [
        { type: "system", text: "AMBAR KAPAĞI: AÇIK — K-3'E İNİŞ" },
        { type: "narrate", text: "Anahtarı kilitte çılgınca çeviriyorsun, kapak büyük bir gıcırtıyla açılıyor. Aşağıdan keskin bir çürüme, ıslak toprak ve bitki kokusu dalgası yüzüne vuruyor. Kendini aşağı fırlatıp kapağı üstünden kapatıyor ve sürgülüyorsun! Tam o anda kapağın üzerine devasa darbeler inmeye başlıyor — GÜM! GÜM! Çelik bükülüyor ama sürgü dayanıyor. Sonra darbeler kesiliyor." },
        { type: "waitTap" },
        { type: "ambient", text: "Kapağın hemen arkasından, o canavarın ağlamaklı, şizofrenik sesi yükseliyor: \"...Herkes beni terk ediyor. Sevgi gitti... Deniz aşağı indi... Sen de kaçtın. Ben hep bu sofrada tek başıma mı kalacağım?\" Sonra derin, tekinsiz bir sessizlik çöküyor." },
        { type: "ambient", text: "Tabletin hoparlöründen Ece'nin hırıltılı sesi geliyor: «Aman Tanrım... O sesleri duydum. Başardın... K-3'e indin. Orası Dr. Nevin'in laboratuvar katı... Biyolog. O herif gibi delirmemiş olabilir... Dikkat et, orada garip şeyler nefes alıyor...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "narrate", text: "Merdivenlerden aşağı, mutlak bir karanlığa doğru iniyorsun. Elindeki tabletin ışığı aşağıda kıpırdayan devasa, bitkisel ve devasa sarmaşıkları aydınlatıyor. Canlı bir bahçe burası... Ve karanlıkta bir şey çok ağır nefes alıyor. 'Bahçe' yeni kurbanını bekliyor." },
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
  sofraYedi: false, sofraSakladi: false, sofraReddetti: false,
  holIlk: false, interkomIlk: false, cocukRanza: false,
  mutfakArandi: false, fanusBakildi: false, sefOdaAcik: false,
  cocukBitti: false,
  sefNerede: "", yemCocuk: false, yemDepo: false, yemSalon: false,
  yadigar1: false, yadigar2: false, yadigar3: false,
  sefKizgin: false, ambarAnahtari: false,
};
