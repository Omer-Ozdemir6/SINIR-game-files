/* ================= ===========================================
   PERISHED — BÖLÜM 2: "K-5 / SINAV" (v4 — SERT PSİKOLOJİK GERİLİM & TABLET IŞIĞI)
   Katın sahibi: DENİZ OKUR — sistemden konuşan mühendis.

   YAPI & ATMOSFER (PERISHED psikolojik gerçekçilik):
   · n_hub: dört dala açılır; oyuncu sınavların sırasını SEÇER.
   · Oyuncunun elinde GECE GÖRÜŞÜ veya vizör yok. Sadece TABLET var.
   · Tabletin ekran ışığı (ya da feneri) tek ışık kaynağı; pili bittiğinde mutlak karanlık ve ölüm kaçınılmaz.
   · Anlatım dili çaresizlik, ağır psikolojik gerilim, bedensel korku ve klostrofobik baskı üzerine kuruldu.
   · Kod yapısı, bayraklar, etkileşimler eksiksiz korundu; metinler PERISHED'ın kendi vahşeti ve kapalı istasyon atmosferine göre revize edildi.
   ============================================================ */

export const EP02 = {
  nodes: {

    /* ================= GİRİŞ — KİLİTLENEN KAT ================= */

    n_k5_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k5_sinir_dread" },
        { type: "system", text: "KAT: K-5 — YAŞAM DESTEK · ÖLÜMÜN EŞİĞİ · SU VE KAN DÖNGÜSÜ" },
        { type: "narrate", text: "Merdivenlerden indiğin an ciğerlerine dolan hava pas, küf ve çürüyen etle ağırlaşıyor. K-5 bir kat gibi değil, içine girilmiş bir organ gibi çalışıyor. Borular zonkluyor, filtreler boğulur gibi tıslıyor. Buradaki makineler arızalı değil; arıza bahanesiyle canlı tutulmuş. Sanki biri burayı yardım etmek için değil, nefes alışını ölçmek için tasarlamış." },
        { type: "narrate", text: "Burada korku rastgele değil. Duvarlardaki kameralar, hoparlörler ve paneller öyle düzenli yerleştirilmiş ki K-5 bir kat değil, gözlem odası olmayan dev bir deney kafesi gibi. Her koridorun sonunda seni ölçen bir şey var: ne kadar ses çıkarıyorsun, ne kadar hızlı panikliyorsun, yalvarmadan önce kaç saniye dayanıyorsun." },
        { type: "narrate", text: "Öne doğru üç titrek adım atıyorsun. Arkandaki ağır çelik kapı birden öyle bir gürültüyle kapanıyor ki, darbe dalgası sırtında patlıyor. Kilidin yuvasına oturma sesi: TIK. TIK. Bir farenin kapana kısılması gibi, burası bir deney sahası ve sen sadece can çekişmesi izlenecek bir kurbansın." },
        { type: "narrate", text: "Karanlığı yırtan tek şey, parmaklarının arasında titreyen tabletin çiğ, beyaz ekran ışığı. Bu ışık seni kurtarmıyor; sadece seni avlayacak şeylere nerede olduğunu gösteren bir fener gibi yüzünü aydınlatıyor. Pil çubuğu yavaşça göz kırpıyor." },
        { type: "waitTap" },
        { type: "glitch", ms: 300 },
        { type: "anons", text: "「İşte oradasın... Canlı taze et. Ben Deniz. Bu labirentin tanrısı da benim, kasabı da. Her kapı, her kör kamera, her paslı hoparlör benim gözüm, benim dilim. Sen ise... sadece biraz daha uzun süre çırpınmasını umduğum yeni oyuncağımsın.」" },
        { type: "anons", text: "「Kurallar canını yakacak kadar basit: Bu katta üç acımasız ders var. Her ders sana etinden cımbızla çekip alacağın bir KART PARÇASI verecek. Üçünü de kanlı parmaklarınla birleştirip çıkış kapısına sokamazsan, burada çürürsün. Seçim senin, hangi acıdan başlayacağını izlemek nefesimi kesiyor...」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "objective", text: "Üç kart parçasını topla." },
        { type: "note", id: "not_deniz", title: "Deniz Okur — Hücremin Gardiyanı", text: "Deniz bu katı yönetmiyor; bu katın dili olmuş. Kapılar onun dişleri, kameralar gözleri, hoparlörler ağzı. Bana 'ders' dediği şeyler işkence istasyonları. Üç kart parçası istiyor. Bu bir oyun değil, ama o bunu oyun sanmak zorunda; yoksa aynada kendisinin de kafese kilitli olduğunu görecek." },
        { type: "document", open: false, doc: {
          id: "d_deniz_protokol", title: "Davranış Ölçüm Protokolü — K-5",
          body: "From: d.okur@sinir1.local\nTo: h.tekin@sinir1.local\nSubject: Yeni bakım personeli / K-5 davranış ölçümü\n\nŞef,\n\nYeni personel K-6'dan canlı çıktı. Bu istatistiksel olarak rahatsız edici.\nK-5'e alındığında standart protokolü uygulayacağım:\n\n1. Çıkış bilgisi verilmeyecek.\n2. Üç görev hattı ayrı ayrı açılacak.\n3. Yardım çağrısı kayda alınacak, sonra kesilecek.\n4. Adını söylerse test kişiselleştirilecek. İsim, deneğin paniğini uzatıyor.\n\nÖnceki üç adayda üçüncü görevden sonra konuşma isteği belirgin biçimde azaldı.\nBu sessizlik itaat değil; kişinin kendi içinden çekilmeye başlaması.\n\nNot: Eğer bu aday da dayanırsa onu Aile'ye vermeden önce ben görmek istiyorum.\nMerak bilimsel değildir, biliyorum. Ama burada bilim diye başladığımız şeyin\nne zamandır başka bir şeye dönüştüğünü ikimiz de biliyoruz.\n\nD. Okur\nSistem Denetimi" } },
      ],
      choices: [
        { id: "ilerle", text: "Tabletin titrek ışığını önüme tutarak koridora sız", next: "n_hub" },
      ],
    },

    /* ================= MERKEZ HUB ================= */

    n_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Dört vahşi karanlığa açılan boğucu bir dağıtım kavşağı. Zeminde pıhtılaşmış, kararmış bir sıvı birikintisi var — kokusu genzini yakıyor. Tavandaki cansız kameralardan biri, içindeki dişliler çığlık ata ata dönüyor ve merceğini doğrudan gözlerine saplıyor. Tabletinin ışığı, etraftaki gölgeleri duvarlarda devasa canavarlara dönüştürüyor.", if: { flag: "hubIlk", equals: false } },
        { type: "flag", set: { hubIlk: true } },
        { type: "status", items: [
          { label: "KART I", flag: "kart1" },
          { label: "KART II", flag: "kart2" },
          { label: "KART III", flag: "kart3" },
        ] },
        { type: "ambient", text: "Duvarda pas ve pislikle kaplanmış yön levhaları: BASINÇ ODASI · TÜNEL AĞI · GÖZLEM ODASI · ÇIKIŞ. Levhaların hemen altına, muhtemelen tırnakları sökülene kadar kazımış biri: 'Sırayla ölmediler, sen de hazır olduğunda geber.'" },
      ],
      choices: [
        { id: "basinc", text: "Basınç çığlıklarının yükseldiği ıslak, kan kokulu koridora sap", next: "n_s1_kapi", if: { flag: "kart1", equals: false } },
        { id: "tunel", text: "Tavan şaftlarının bir tabut gibi alçaldığı kapkara dehlize sürün", next: "n_s2_kapi", if: { flag: "kart2", equals: false } },
        { id: "gozlem", text: "Kırık camların arkasından ölüm sessizliği yayan koridora sız", next: "n_s3_kapi", if: { flag: "kart3", equals: false } },
        { id: "destek", text: "Kıvılcımlar saçarak can çekişen yaşam destek paneline yaklaş", next: "n_destek_panel", if: { flag: "destekOnarildi", equals: false } },
        { id: "cikis", text: "Zemini zincirlenmiş o devasa çelik çıkış kapısına yürü", next: "n_cikis" },
        { id: "dinlen", text: "Karanlık bir borunun gölgesine sinip hıçkırıklarını bastırmaya çalış", next: "n_hub_dinlen", ifStat: { stat: "gurultu", gte: 30 } },
      ],
    },

    /* yaşam destek paneli — wires bulmacası */
    n_destek_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kavşağın en karanlık köşesinde yaşam destek paneli sallanıyor. Kapağı baltayla açılmış gibi; içerideki beş kablo, damarları sökülmüş bir göğüs kafesinden dışarı sarkıyor. Etikette hâlâ resmi bir sakinlik var: \"K-5 HAVA DÖNGÜSÜ — YAŞAM / ÖLÜM DENGESİ\". Bu denge değil. Bu, boğulmayı kalibre eden bir düzenek. Deniz paneli kırmışsa, seni öldürmek için değil; nefes almak uğruna nelere dokunacağını görmek için kırmış." },
        { type: "note", id: "not_destek", title: "Can Çekişen Hava Paneli", text: "K-5'in akciğerleri sökülmüş. Beş çıplak kablo kıvılcım saçıyor, dokunursam parmaklarımı yakacak kadar sıcaklar. Doğru portları bulmam gerek. Eğer beceremezsem, bu zehirli hava beni boğacak ve çıkardığım hırıltılar yüzünden yerimi anında bulacaklar." },
      ],
      interaction: {
        kind: "wires",
        title: "NEFES ALMAK İÇİN — KABLOLARI ETİNE DOKUNDURMADAN BAĞLA",
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
        penalty: { gurultu: 12, text: "GÜM! Yanlış bağlantı. Yüksek voltaj parmaklarında patladı ve çelik duvarlarda yankılandı. GÜRÜLTÜ +12" },
        success: "n_destek_onarildi",
        cancel: "n_hub",
      },
    },

    n_destek_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "HAVA DÖNGÜSÜ: KANLI GAZ TAHLİYE EDİLDİ" },
        { type: "narrate", text: "Son kabloyu yuvasına ittirdiğin an panel amansız bir hırıltıyla canlanıyor. Fanlar dönmeye başlıyor ve o genzini yırtan, çürümüş demir kokusu yavaşça dağılıyor. İlk kez göğsün körük gibi inip kalkarken derin bir nefes alabiliyorsun. Kurtulmak için aklını başında tutmalısın." },
        { type: "flag", set: { destekOnarildi: true } },
        { type: "stat", stat: "akil", delta: 6, note: "AKIL +6 — Ciğerlerine giren taze hava can verdi", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "O ölümcül kavşağa geri dön", next: "n_hub" },
      ],
    },

    n_hub_dinlen: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sırtını sırılsıklam, buz gibi bir boruya yaslayıp dizlerini göğsüne çekiyorsun. Kalbin göğüs kafesini parçalamak istercesine vuruyor. Bir... İki... Tabletinin ışığını bacaklarının arasına saklıyorsun. Kameranın tepesindeki kan kırmızısı ışık yavaşça sönüyor; Deniz şimdilik başka bir kurbanın can çekişmesini izliyor olmalı." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Nefesin düzene girdi — GÜRÜLTÜ azaldı", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Işığı yeniden karanlığa doğrult ve kavşağa dön", next: "n_hub" },
      ],
    },

    /* ================= SINAV 1 — BASINÇ (kart parçası I) ================= */

    n_s1_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Birinci ders: BASINÇ. İçeride etini kemiğinden ayırabilecek güçte üç vana var. Eğer doğru sırayla çevirmezsen, o çok güvendiğin kulak zarlarının kafanın içinde nasıl patladığını dinleriz. Başla bakalım fare.」" },
        { type: "narrate", text: "Ağır demir kapının yanında paslı bir pano var. Kurumuş kanın altında bir şema duruyor; biri ölmeden önce bunu temizlemeye çalışmış olmalı. Panoya yaklaşınca fark ediyorsun: Bu bir ipucu değil, kurumun kendini aklama biçimi. Talimat vardı. Okusaydı yaşardı. Böyle yazacaklar. Okumak için pisliği parmaklarınla kazıman gerek. İçeri doğrudan girmek ise intihar değil; onların raporuna kolaylık sağlamak." },
      ],
      choices: [
        { id: "oku", text: "Tablet ışığını panoya daya, pisliği kazıyıp oku", next: "n_s1_sema" },
        { id: "gir", text: "Zamanım yok, piller tükeniyor! Doğruca içeri dal", next: "n_s1" },
      ],
    },

    n_s1_sema: {
      cost: 1,
      events: [
        { type: "flag", set: { s1SemaOkundu: true } },
        { type: "document", open: true, doc: {
          id: "d_havasema", title: "Dehşet Altında Basınç Protokolü",
          meta: "PERISHED · K-5 ÖLÜM HESAPLARI · TALİMAT 3-C",
          body: "BASINÇ ODASI — ACİL MANUEL BOŞALTMA PROTOKOLÜ\n\nGİZLİLİK: KURUM İÇİ / TIBBİ OLAY KAYDI EKLİDİR\n\nUygulama sırası değiştirilmeyecektir:\n\n  1) DENGELEME  (sarı)   — kraniyal basınç artışını keser\n  2) TAHLİYE    (kırmızı)— kanlı gazı sintine hattına verir\n  3) ANA BESLEME(yeşil)  — kapı kilidini serbest bırakır\n\nVAKA 12-TD: Sıra ihlali sonrası sol kulak zarı yırtığı,\ngöz içi damar patlaması ve 43 saniyelik bilinç kaybı kaydedildi.\nPersonel canlı çıkarıldı; konuşma yetisi geri dönmedi.\n\nNot: Odadaki çığlık kayıtları eğitim materyali değildir.\nTekrar dinletilmesi yasaktır." } },
        { type: "note", id: "not_havasema", title: "Kulaklarımı Kurtaracak Sıra", text: "Önce SARI vana (denge), sonra KIRMIZI (tahliye), en son o devasa YEŞİL çark. Yanlış bir hareket yaparsam kafam patlayacak." },
      ],
      choices: [
        { id: "gir", text: "Şemayı aklına kazı ve basınç odasına gir", next: "n_s1" },
      ],
    },

    n_s1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Odaya adım attığın an kulaklarında korkunç bir zonklama başlıyor, gözlerin yuvalarından fırlayacak gibi geriliyor. Duvarlardan sızan buhar çığlık atarak yükseliyor. Üç vana karşında duruyor: Sarı, kırmızı ve en dipte loş köşede yeşil boyalı devasa bir çark. Basınç göstergesi kıpkırmızı bölgede titriyor.", if: { flag: "s1Ilk", equals: false } },
        { type: "flag", set: { s1Ilk: true } },
        { type: "alert", text: "HAVA BASINCI ÖLÜMCÜL SEVİYEDE — KAFAN PATLAMADAN ÖNCE SEÇ" },
        { type: "narrate", text: "Şemayı okumadan geldin. Karanlıkta el yordamıyla hangi vanayı çevireceksin? Yapacağın tek bir hata, kulaklarından kan gelmesine sebep olacak.", if: { flag: "s1SemaOkundu", equals: false } },
      ],
      choices: [
        { id: "sari", text: "SARI vanaya yapış ve tüm gücünle çevir", next: "n_s1_b" },
        { id: "kirmizi", text: "KIRMIZI vanayı çılgınca döndür", next: "n_s1_yanlis" },
        { id: "yesil", text: "O devasa YEŞİL çarkı zorla", next: "n_s1_yanlis" },
      ],
    },

    n_s1_yanlis: {
      cost: 1,
      events: [
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "Vanayı çevirdiğin an odada korkunç bir patlama yankılanıyor! Yüksek basınç dalgası kulaklarına iki kızgın demir gibi saplanıyor. Çığlık atarak dizlerinin üzerine çöküyorsun ama kendi sesini bile duyamıyorsun; kafanın içi sadece saf, delirten bir çınlamayla kaplı. Burnundan sızan sıcak kanı hissediyorsun." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Kulaklarından kan sızıyor, çınlama delirtici", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "GÜRÜLTÜ +10 — Bu korkunç patlama kattaki her şeyi uyandırdı", noteKind: "alert" },
        { type: "anons", text: "「Ahahaha! Tanrım, o kemik çatlaması sesini buradan bile duydum! O panodaki kağıda bakmak bu kadar mı zordu? Hadi, kalk ayağa ve baştan acı çek!」" },
      ],
      choices: [
        { id: "tekrar", text: "Gözlerindeki yaşları sil, acıyla toparlanıp vanalara dön", next: "n_s1" },
        { id: "cik", text: "Can havliyle dışarı kaç, panodaki şemayı oku", next: "n_s1_kapi", if: { flag: "s1SemaOkundu", equals: false } },
      ],
    },

    n_s1_b: {
      cost: 1,
      events: [
        { type: "system", text: "DENGELEME VANASI: AÇILDI — KAFATASI BASINCI DÜŞÜYOR" },
        { type: "narrate", text: "Sarı vana tiz bir çığlıkla dönüyor, kulaklarındaki o korkunç patlama hissi bir nebze olsun hafifliyor. Ama duramazsın, tabletin ışığı titriyor. Şimdi ikincisi." },
      ],
      choices: [
        { id: "kirmizi", text: "KIRMIZI vanaya atla ve çevir", next: "n_s1_c" },
        { id: "yesil", text: "YEŞİL çarkı zorla", next: "n_s1_yanlis" },
      ],
    },

    n_s1_c: {
      cost: 1,
      events: [
        { type: "system", text: "TAHLİYE VANASI: AÇILDI — ZEHİRLİ GAZ SİNTİNEYE KUSULUYOR" },
        { type: "narrate", text: "Basınç ibresi o ölümcül kırmızı bölgeden aşağıya doğru kayıyor. Son bir hamle kaldı: Ana besleme çarkı. Paslanmış, devasa ve yeşil." },
      ],
      interaction: { kind: "valve", title: "KAYALARI SÖKER GİBİ — ÇARKI TÜM GÜCÜNLE ÇEVİR", turns: 6, success: "n_s1_ok", cancel: "n_s1_c" },
    },

    n_s1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav1: true, kart1: true } },
        { type: "system", text: "ODA DENGELENDİ — KART PARÇASI I ETTEN SÖKÜLEREK ALINDI" },
        { type: "anons", text: "「...Bak sen şu işe. Sadece bir et yığını değilsin demek, okuyabiliyorsun. Senden önceki üç zavallı et parçasından daha dayanıklısın. İlk parça senin, şimdilik sevin bakalım.」" },
        { type: "battery", spares: 1 },
        { type: "note", id: "not_sinav1", title: "İlk Kanlı Parça (I / III)", text: "İlk parçayı aldım. Basınç odası bir bulmaca değil, insan kafatasının ne kadar basınca kadar kişilik taşıyabildiğini ölçen bir mezar makinesi. Deniz benden önce üç adaydan bahsetti. Aday. Kurban demiyorlar. İnsan öldürmeyi bile kurum diline çevirince masumlaştığını sanıyorlar." },
      ],
      choices: [
        { id: "hub", text: "Kart parçasını göğsüme saklayıp kavşağa dön", next: "n_ara1" },
      ],
    },

    /* ===== ECE İLK TEMAS ===== */

    n_ara1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kavşağa doğru titreyerek adımlarken, duvardaki parçalanmış, içi dışına çıkmış interkom paneli aniden cızırdıyor. Bir kez. İki kez. Statiğin, o boğucu cızırtının altından derinden gelen, dehşet içinde ama insan— gerçek bir kadın sesi yükseliyor:" },
        { type: "ambient", text: "«Yalvarırım ses çıkarma, sadece dinle... Bu hat eski sonar hattı, Deniz'in o iğrenç kulakları burayı duyamaz. ...K-6 cehenneminden çıktın. Kimse oradan canlı çıkamamıştı. Sen hangi cehennemden geldin? Kimsin sen?»" },
      ],
      choices: [
        { id: "ad", text: "Korkudan titreyen sesimle adımı fısılda", next: "n_ara1_ad" },
        { id: "adyok", text: "\"İsimler burada ölüm demek. Sadece hayatta kalmaya çalışan bir teknisyenim.\"", next: "n_ara1_adyok" },
      ],
    },

    n_ara1_ad: {
      cost: 1,
      events: [
        { type: "flag", set: { adSoylendi: true } },
        { type: "stat", stat: "eceGuven", delta: 15, note: "ECE bu dehşetin içinde sana tutundu", noteKind: "system" },
        { type: "ambient", text: "«...Üç koca haftadır bu karanlıkta kimse bana adını söylemedi. Herkes sadece çığlık attı ya da bir numara gibi geberdi...» Sesin arkasında hıçkırıklarını yutmaya çalıştığını duyuyorsun. «Ben Ece. Sonar operatörüyüm. Beni dinle, yaşamak istiyorsan dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Tablet ışığını yere tutup pürdikkat dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_adyok: {
      cost: 1,
      events: [
        { type: "ambient", text: "«...Doğru. Çok haklısın. Deniz isimleri avlar. İsim verirsen o ismi zihnine kazır ve seni delirene kadar evcil hayvanı yapar...» Kısa, boğucu bir duraksama. «Çok korkuyorsun ama aklını kaybetmemişsin. Bu katta bu tek silahın. Beni iyi dinle:»" },
      ],
      choices: [
        { id: "devam", text: "Korkuyla dinle", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_bilgi: {
      cost: 1,
      events: [
        { type: "ambient", text: "«Tünel sınavını mutlak karanlıkta yapacak... Işıkları kapatıp seni avlayacak. Ve o tüneller tam bir insan öğütücü, kör bir labirent. Haritasız girenlerin duvarlara vurarak kafalarını nasıl parçaladığını günlerce interkomdan dinledim... Gözlem odasının yanındaki o kanlı bakım dolabında eski tünel şeması var. Oraya gir ve ONU AL!»" },
        { type: "ambient", text: "«Bir şey daha var... Tünellerin derinliklerinde, o lağımların dibinde yaşayan başka bir şey var... Deniz bile bilmiyor, kimse ona söyleyemedi çünkü tünele giren herkes yendi. Eğer aşağıda ıslak, sürünme bir ses duyarsan... DUR. Sakın nefes alma, donup kal. Söz ver bana.»" },
        { type: "note", id: "not_ece2", title: "Ece'nin Tünel Uyarısı", text: "Ece gizli hattan konuşuyor, Deniz kör. Tünel cehennemine haritasız girmek intihar. Harita gözlem odasının yanındaki dolaptaymış. Ama asıl korkunç olan... Tünellerdeki 'o şey'. Tek kurtuluş: Durmak ve nefes almamak. Bu kız üç haftadır bu mezarlıkta yaşıyor, dedikleri tek kurtuluş biletim." },
      ],
      choices: [
        { id: "hub", text: "Tablet ışığını koridora doğrultup kavşağa süzül", next: "n_hub" },
      ],
    },

    /* ================= SINAV 2 — TÜNEL (kart parçası II) ================= */

    n_s2_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「İkinci ders: YÖN DUYGUSU. O daracık çelik bağırsaklara gir, öbür uçtan etini kazıyarak çık ve ikinci parçayı al. Çok kolay değil mi? Ama küçük bir sürpriz—」" },
        { type: "system", text: "K-5 TÜNEL BÖLGESİ: TÜM IŞIKLAR KESİLDİ · MUTLAK KARANLIK" },
        { type: "anons", text: "「—ışıklar bende kalıyor! O elindeki minik tabletin zavallı ekran ışığı seni ne kadar koruyacak bakalım? Pillerin bittiğinde karanlıkta seni nelerin beklediğini göreceksin...」" },
        { type: "narrate", text: "Tünelin ağzı, dişlerini açmış devasa, simsiyah bir gırtlak gibi önünde duruyor. İçeriden buz gibi çürük bir hava üflüyor. Haritan var mı? Yoksa Ece'nin dediği o dolaba uğradın mı?", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "gir", text: "Korkudan titreyerek o siyah deliğe doğru emekle", next: "n_t1" },
        { id: "dolap", text: "Önce gözlem odasının yanındaki o tekinsiz dolabı patlat", next: "n_s2_dolap", if: { flag: "tHarita", equals: false } },
      ],
    },

    n_s2_dolap: {
      cost: 1,
      events: [
        { type: "flag", set: { tHarita: true } },
        { type: "narrate", text: "Dolabın kapağını zorlayarak açıyorsun. Paslı aletler, kurumuş fareler, yağlı bezler. Kapağın iç yüzüne çivilerle tutturulmuş bir tünel şeması var; kağıt sararmış, kenarları kanla sertleşmiş. Bu harita birinin zekâsı değil, paniğinin kalıntısı. Bir insan tünelde kaybolmadan önce yönleri değil, hayatta kalma ihtimalini duvara çakmış. Bezlerin altında bir yedek pil parlıyor. Bu tesis bazen yemini ödül gibi paketliyor." },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_tunelharita", title: "K-5 İnsan Öğütücü Tünel Şeması",
          meta: "PERISHED TEKNİK ÇİZİM 5-H · ÖLÜM ROTASI",
          body: "KORIDOR GİRİŞİ\n   |\n   +- KAVŞAK 1 -- SOL -> Kurtuluş hattı\n   |              SAĞ -> Kör uç (Eski çürümüş filtreler)\n   |\n   +- KAVŞAK 2 -- DÜZ -> Dar boğaz (Sıkışma riski)\n   |\n   +- KAVŞAK 3 -- SOL -> ÇIKIŞ KAPISI\n                  SAĞ -> Kör cep (Ölüm tuzağı)\n\nKANLI EL NOTU: Giriş yap -> SOLA DÖN -> DÜZ GİT -> SOLA DÖN VE KAÇ. Ezberle.\nTünelde tablet ışığı yetmez, piller biterse burası mezarın olur. — T.D." } },
        { type: "note", id: "not_tunelharita", title: "Zihnime Kazıdığım Rota", text: "Rota net: SOL → DÜZ → SOL. Sağ kollar tamamen çıkmaz sokak ve ölüm tuzağı. İçeride mutlak karanlık olacak, haritayı açıp bakacak vaktim olmayacak." },
      ],
      choices: [
        { id: "gir", text: "Tableti göğsüme bastırıp o dar dehlize sürünerek gir", next: "n_t1" },
      ],
    },

    n_t1: {
      checkpoint: true,
      cost: 3,
      events: [
        { type: "narrate", text: "Alüminyum, daracık, buz gibi bir tabutun içindesin. Dirseklerinle ilerlerken çelik etini soyuyor. Tablet ışığı sadece birkaç metreyi gösteriyor; arkanda kalan karanlık hemen kapanıyor, sanki geçtiğin yolu inkâr ediyor. İlk kavşak önünde. Sol kol aşağı iniyor, sağdan çürük bir rüzgar geliyor. Haritada bunun basit bir yön seçimi olduğu yazıyordu. Bedense bunun bir mezar seçimi olduğunu biliyor.", if: { flag: "t1Ilk", equals: false } },
        { type: "flag", set: { t1Ilk: true } },
        { type: "alert", text: "Harita yanında yok! Karanlıkta atacağın her adım ölümcül bir kumar!", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "sol", text: "SOLA doğru, karanlığın kalbine sürün", next: "n_t2" },
        { id: "sag", text: "SAĞA doğru, o garip hırıltılı esintiye git", next: "n_t_korucuk" },
      ],
    },

    n_t_korucuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "Hava akımı seni parçalanmış, paslı filtrelerin olduğu bir kör uca çıkarıyor. Burası tamamen çıkmaz sokak! Duvarlarda eski kurbanların parmak izleri var. Dehşet içinde, daracık yerde dizlerini vura vura, küfrederek ve ağlayarak geri geri sürünüyorsun." },
        { type: "anons", text: "「Hahaha! Sağa gitti, gerizekalı sağa gitti! Haritan yok değil mi? Karanlıkta kaybolup orada kendi etini kemirmeni izlemek için sabırsızlanıyorum!」" },
      ],
      choices: [
        { id: "geri", text: "Can havliyle o lanet kavşağa geri geri sürün", next: "n_t1" },
      ],
    },

    n_t2: {
      cost: 3,
      events: [
        { type: "narrate", text: "Sol kol seni o kadar dar bir boğaza sokuyor ki, omuzların iki yandan çeliğe sıkışıyor, nefes alamıyorsun. Tam o dar kapanda kalmışken, tam önünden... Islak, ağır, insana benzemeyen bir şeyin alüminyum çeliği tırmalayarak sana doğru sürünme sesini duyuyorsun. Yaklaşıyor!" },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Dur... Dur! O ne lan... O şeyin tünelde ne işi var?! BU BENİM OYUNUM! Bakım, hemen sağındaki menfeze gir, HEMEN SAKLAN, SİKTİR—」" },
        { type: "waitTap" },
        { type: "narrate", text: "Deniz'in sesindeki o sapkın neşe bir anda yok oluyor. İlk kez rol yapmıyor. Sağında küçük bir servis menfezi var. Ece 'dur' demişti, Deniz 'saklan' diye bağırıyor. İkisi de farklı şeylerden korkuyor. O an anlıyorsun: Bu katta seni yöneten adam bile sistemin tamamını bilmiyor. Kafesin içinde başka bir kafes daha var." },
        { type: "note", id: "not_denizpanik", title: "Sistem Delindi", text: "Tünellerde yaşayan o 'İnleyen' denen şey içeri girdi ve Deniz bunu BİLMİYORDU. Kapılar onun olabilir ama o canavar bu sistemin tamamen dışında. Deniz her şeyi görmüyor, o da korkuyor." },
      ],
      choices: [
        { id: "menfez", text: "Kendini menfezin içine sıkıştır, tableti kapat ve nefesini tut!", next: "n_t2_nefes" },
        { id: "kos", text: "Dehşet içinde geri geri sürünerek kaçmaya çalış!", next: "n_olum_tahliye" },
      ],
    },

    n_olum_tahliye: {
      death: true,
      deathText: "Bu daracık tabutta sürünerek kaçamazsın! Attığın her panik dolu adım çeliği çılgınca çınlatıyor ve yerini haykırıyor. O ıslak, devasa ağırlık arkandan üzerine biniyor; kemiklerinin kırılma sesini duyuyorsun. Deniz hoparlörleri o gece tamamen kapatıyor, sadece senin çığlıkların tünelde yankılanıyor.",
      events: [{ type: "glitch", ms: 900 }],
    },

    n_t2_nefes: {
      events: [
        { type: "narrate", text: "Burada nefesini tek seferde tutup ölmeyi beklemek yetmeyecek. O şey tünelin önünden geçerken bazı anlarda kendi hırıltısı metalin içinde boğuluyor; işte sadece o kısa aralıklarda ciğerinden minicik bir hava kaçırabilirsin. Yanlış anda bırakırsan, en küçük hıçkırığın bile bu sac tabutu mezarına çevirecek." },
        { type: "narrate", text: "Kendini o dikey küçük menfezin içine etini yırtarak sokuyorsun. Çelik sac göğsünü bir mengene gibi sıkıştırıyor. Tabletini göğsüne bastırıp o çiğ ışığı tamamen vücudunla gömüyorsun. Tam o sırada, o ıslak, salyalı canavar tam önünden, bir parmak ötendeki tünelden hırıldayarak geçmeye başlıyor. Kokusu leş gibi." },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_t3", fail: "n_olum_tunel" },
    },

    n_olum_tunel: {
      death: true,
      deathText: "Ciğerlerin patlayacak gibi oluyor, o dar yerde nefesini daha fazla tutamıyorsun ve boğuk bir hıçkırık kaçıyor. O an hırıltı kesiliyor. Menfezin ağzında parçalanmış, ıslak bir el belirdiğinde, tünel ağı etinin kemiğinden ayrılma sesleriyle doluyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_t3: {
      cost: 3,
      events: [
        { type: "narrate", text: "O ıslak sürünme sesi tünelin derinliklerinde yavaşça eriyerek kayboluyor. Menfezden titreyerek çıkıp sürünmeye devam ediyorsun; kolların ve bacakların korkudan öyle sarsılıyor ki kontrol edemiyorsun. Üçüncü kavşak karşında: Sol ve sağ.", if: { flag: "t3Ilk", equals: false } },
        { type: "flag", set: { t3Ilk: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sol", text: "SOLA doğru sürün, çıkış orada olmalı", next: "n_t4" },
        { id: "sag", text: "SAĞA doğru sürün, belki bir şey vardır", next: "n_t_cep", if: { flag: "tCep", equals: false } },
      ],
    },

    n_t_cep: {
      cost: 2,
      events: [
        { type: "flag", set: { tCep: true } },
        { type: "narrate", text: "Sağ kol kısa ve kapkara bir kör uçta bitiyor. Tabletinin ışığını köşeye tuttuğunda kanlı bir bez torba görüyorsun. İçinde, vakumlu ambalajında pırıl pırıl parlayan bir tablet pili var! Sanki burada mahsur kalıp ölen biri... Ya da burada yaşayan o canavar için bırakılmış bir yem gibi." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Pili kap, hemen arkana dön ve SOLA sürün", next: "n_t4" },
      ],
    },

    n_t4: {
      cost: 2,
      events: [
        { type: "narrate", text: "Sol kol genişliyor, hava nihayet biraz olsun tazeleniyor. Tabletinin çiğ ışığı, tünelin sonundaki çelik çıkış kapağının paslı koluna çarpıyor. Bu yaylı bir kol; sonuna kadar basılı tutup o ağırlığı itmen gerek." },
      ],
      interaction: { kind: "lever", title: "KAPANMADAN ÖNCE — KOLU SONUNA KADAR BASTIRIP İT", holdMs: 2000, success: "n_s2_ok", cancel: "n_t4" },
    },

    n_s2_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { sinav2: true, kart2: true } },
        { type: "system", text: "TÜNEL CEHENNEMİ AŞILDI — KART PARÇASI II ALINDI" },
        { type: "narrate", text: "Kapakla birlikte koridorun soğuk betonuna adeta dökülüyorsun; dizlerin titriyor, ciğerlerin gerçek havayı açlıkla çekiyor. Hoparlör çok uzun süre sessiz kalıyor. Deniz sonunda konuştuğunda o sapık sesinde ince, korku dolu bir çatlak var:" },
        { type: "anons", text: "「...Çıktın demek. Bak, o içeride gördüğün... o tüneldeki şeyi unut tamam mı? Kimseye anlatmana gerek yok. O bizim aile içi küçük bir meselemiz. İkinci parça senin, hadi git şimdi.」" },
      ],
      choices: [
        { id: "hub", text: "Toparlan ve titreyen adımlarla kavşağa dön", next: "n_hub" },
      ],
    },

    /* ================= SINAV 3 — GÖZLEM ODASI / DÜRÜSTLÜK (kart parçası III) ===== */

    n_s3_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Camları indirilmiş bir gözlem odasına giriyorsun. Işık beyaz, soğuk ve suçsuz görünmeye çalışan türden. Ortada paslı bir sandalye var; insanın oturması için değil, cevap vermesi için yapılmış. Tavanda tek hoparlör, karşında kanlı kamera lensi. Sandalyenin altında lekeli bir defter duruyor. Unutulmuş gibi değil. Özellikle bırakılmış gibi. Kurbanların okunması da sınavın parçası." },
        { type: "document", open: true, doc: {
          id: "d_sinavdefteri", title: "Deniz'in Kanlı Av Defteri", style: "hand",
          meta: "— kapağında vahşi bir karalamayla: 'DENEYLER. D.' —",
          body: "ADAY 01 — Kaynakçı\nDS-1'i tesadüfen geçti. DS-2 tünelinde 41 dakika ağladı.\nDS-3 sırasında aynı cevabı üç kez değiştirdi.\nSONUÇ: Aile'ye teslim edildi. Temizlik tamamlandı.\n\nADAY 02 — Revir görevlisi\nDS-1 ve DS-2'yi harita yardımıyla geçti.\nDS-3 sırasında deneği yöneten kişiye doğrudan hakaret etti.\nKaçış denemesi şaft girişinde sonlandırıldı.\nSONUÇ: Ses telleri çıkarıldıktan sonra Aile'ye teslim.\n\nADAY 03 — Kimliği doğrulanamadı\nDS-3 boyunca tek kelime etmedi. Tırnak çekimi sırasında dahi\ntepki vermedi.\nSONUÇ: Aile'ye teslim. Şu an çevreyi izliyor ve yalnızca sayıyor.\n\nADAY 04 —\n(Kayıt alanı boş. Üst satırda taze mürekkeple senin görev numaran var.)" } },
        { type: "note", id: "not_sinavdefteri", title: "Ölüm Defteri", text: "Defterde üç insanı okudum. Kaynakçı, revir görevlisi, adı silinmiş biri. Deniz onları öldürdüğünü yazmıyor; 'teslim edildi' diyor. Sanki kargo takip formu. Dördüncü satırda benim görev numaram var. Eğer bu sayfa benden sonra dolarsa, bilinsin: ona cevap verdim, yalan söyledim, korktum, ama onun oyuncağı olmayı kabul etmedim." },
        { type: "anons", text: "「Otur o sandalyeye. Üçüncü ders: DÜRÜSTLÜK. Sana üç soru soracağım. Yalan söyleyebilirsin, etini keserken anlarım ama serbest. Tek kural: Cevap ver. Susarsan, tırnaklarından başlarız.」" },
      ],
      choices: [
        { id: "otur", text: "O soğuk, paslı demir sandalyeye otur ve kameraya bak", next: "n_soru1" },
      ],
    },

    n_soru1: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru bir. K-6 revirine burnunu soktun, tüm sensörlerim kaydetti. Orada Baturay'ı buldun değil mi? O pislik nasıl görünüyordu? Can çekişiyor muydu?」" },
      ],
      choices: [
        { id: "durust", text: "\"Ölmüştü. Masanın üzerindeydi. Yüzü... en azından artık sakindi.\"", next: "n_soru1_a" },
        { id: "yalan", text: "\"Revir tamamen boştu. Yemin ederim kimseyi görmedim.\"", next: "n_soru1_b" },
        { id: "sessiz", text: "Tablet ekranına bakarak sessiz kal, dişlerini sık", next: "n_soru1_c" },
      ],
    },

    n_soru1_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5, note: "Deniz'in sesindeki vahşet hafifçe dindi", noteKind: "system" },
        { type: "anons", text: "「...Sakin miydi?」 Çok uzun, ağır bir sessizlik oluyor; hoparlördeki statik bile utanmış gibi titriyor. 「Güzel... Acı çekmeden gebermesi güzel. O bana... Her neyse. Soru iki!」" },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [{ id: "d", text: "Korkuyla yutkun ve bekle", next: "n_soru2" }],
    },

    n_soru1_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10, note: "Deniz yalanını zihnine kazıdı", noteKind: "alert" },
        { type: "anons", text: "「Revir kapısını tam 04:31'de açtın, 04:39'da o cesedin yanından çıktın! Sekiz dakika içeride kör taklidi mi yaptın lan?!」 Hoparlörden kuru, hastalıklı bir kahkaha yükseliyor. 「Yalan söylerken biraz emek ver, etini hemen kesmeyeyim. Soru iki!」" },
      ],
      choices: [{ id: "d", text: "Sırtından aşağı soğuk terler akarken bekle", next: "n_soru2" }],
    },

    n_soru1_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「Sessizlik... Demek o aciz gururdan sende de var. Üçüncü kurban da böyle susmuştu.」 Bir kalemin deftere sertçe vurulma sesini duyuyorsun; seni de ölüler listesine yazıyor. 「Sustuğunuzda her şey daha eğlenceli oluyor. Soru iki!」" },
      ],
      choices: [{ id: "d", text: "Nefesini tutarak bekle", next: "n_soru2" }],
    },

    n_soru2: {
      cost: 1,
      events: [
        { type: "anons", text: "「Soru iki. O eski sonar hattını kurcaladın. Ben orayı göremem ama o kirli duvarlarla fısıldaşan zavallı yüzünü izledim. Ece'yle konuşuyorsun! O kaltak nerede saklanıyor?! Söyle bana!」" },
      ],
      choices: [
        { id: "soyle", text: "Canımı kurtarmak için Ece'nin saklandığı bölmeyi anlat", next: "n_soru2_a" },
        { id: "yalan", text: "\"Kim olduğunu bilmiyorum. Hat tek yönlüydü, sadece ses duyuluyordu.\"", next: "n_soru2_b" },
        { id: "reddet", text: "\"Bu soruya cevap vermeyeceğim. Sana o kızı vermem!\"", next: "n_soru2_c" },
      ],
    },

    n_soru2_a: {
      cost: 1,
      events: [
        { type: "flag", set: { eceEleVerildi: true } },
        { type: "stat", stat: "eceGuven", delta: -40, note: "ECE'Yİ KURBAN ETTİN — Güven tamamen parça pinçik oldu", noteKind: "alert" },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「...Demek sonar bölmesi. Sonunda...」 Beklediğin o vahşi kahkaha gelmiyor, ses buz gibi oluyor. 「Zaten biliyordum biliyor musun? Üç haftadır oraya bakıyordum. Sadece senin o zavallı sadakatini ne zaman satacağını merak ettim. Ve sattın. Not alındı. Soru üç.」" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — İhanetin soğukluğu zihnini kemiriyor", noteKind: "alert" },
        { type: "note", id: "not_ihanet", title: "Kendi Canım İçin Onu Sattım", text: "Ece'nin yerini bu canavara söyledim... 'Zaten biliyordum' dedi ama bu beni temize çıkarmaz. Ben bir hainim. Sırf hayatta kalmak için o kızı ölüme fırlattım. Bu leke asla çıkmayacak." },
      ],
      choices: [{ id: "d", text: "Utanç ve korku içinde bekle", next: "n_soru3" }],
    },

    n_soru2_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「Tek yönlü hat ha?」 Bu kez gülüşü uzun, adeta bir yılanın tıslaması gibi keyifli. 「Yalan... Ama zekice bir yalan. Bir omurgası var. Bana o hemşireyi hatırlattın... Soru üç.」" },
      ],
      choices: [{ id: "d", text: "Bekle", next: "n_soru3" }],
    },

    n_soru2_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "stat", stat: "eceGuven", delta: 10, note: "Ece'yi o canavardan korudun", noteKind: "system" },
        { type: "anons", text: "「'Sana değil' demek...」 Sesindeki teller geriliyor, sanki hoparlör patlayacak. 「Sadakat... O yamyam sürüsü, o Aile buna bayılır biliyor musun? Şef senin gibi sadık etleri çiğnemeyi çok sever. Soru üç!」" },
      ],
      choices: [{ id: "d", text: "Titreyerek son soruyu bekle", next: "n_soru3" }],
    },

    n_soru3: {
      cost: 1,
      events: [
        { type: "anons", text: "「Son soru... Bunu buraya gelen her ete sordum, hepsi korkudan yalan söyledi.」 Statik derinleşiyor, Deniz'in sesindeki o hastalıklı oyun ilk kez tamamen kayboluyor. 「O vahşi Aileye katılmayı, onlardan biri olmayı düşündün mü hiç? Tek başına bu karanlıkta parçalanmaktansa, o deliliğin bir parçası olmayı... Dürüst ol, etimi ne zaman keseceksiniz diye sor kendine.」" },
      ],
      choices: [
        { id: "hayir", text: "\"Hayır! Sizin gibi canavarlarla asla bir olmam!\"", next: "n_soru3_a" },
        { id: "bilmiyorum", text: "\"...Bilmiyorum... Bu karanlık ve yalnızlık beni delirtiyor...\"", next: "n_soru3_b" },
        { id: "karsi", text: "\"Peki sen Deniz? Sen onlara katıldın mı yoksa hâlâ korkak bir seyirci misin?\"", next: "n_soru3_c" },
      ],
    },

    n_soru3_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「'Asla'... Hepiniz önce böyle büyük laflar edersiniz. İlk kurban da öyle demişti. Şimdi o kanlı sofrada oturuyor ve önüne atılan etleri büyük bir iştahla kemiriyor! Sınav bitti, defol sandalyeden!」" },
      ],
      choices: [{ id: "d", text: "Demir sandalyeden fırlayarak ayağa kalk", next: "n_s3_ok" }],
    },

    n_soru3_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "anons", text: "「...Bilmiyorsun demek.」 Çok uzun bir ölüm sessizliği kaplıyor odayı. Kalem tıkırtısı kesiliyor. 「Dört aday arasından bu soruya verilen ilk dürüst, çıplak cevap... Yalnızlık zor, evet. İnsanı kendi etini yemeye zorlayacak kadar zor... Sınav bitti.」" },
      ],
      choices: [{ id: "d", text: "Ayağa kalk, bacakların seni zor taşıyor", next: "n_s3_ok" }],
    },

    n_soru3_c: {
      cost: 1,
      events: [
        { type: "flag", set: { denizSoruldu: true } },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「—」" },
        { type: "narrate", text: "Hoparlör açık, hat canlı ama Deniz'den çıt çıkmıyor. Beş saniye... On saniye... Kameranın arkasındaki o hastalıklı ruhun nefes alamadığını hissediyorsun. Sonunda, maskesi tamamen düşmüş, yapayalnız ve yaşlı bir adam sesiyle fısıldıyor: 「...Sıradaki soru iptal. Sınav bitti. Git buradan.」" },
        { type: "note", id: "not_denizsoru", title: "Canavarı Yaraladım", text: "\"Sen katıldın mı?\" diye sordum ve o her şeyi izleyen sadist herif cevap veremedi. O yamyam sürüsünün bir parçası mı yoksa kafeste sırasını bekleyen bir sonraki et mi, kendisi de bilmiyor. Bu çaresizliği onu daha da tehlikeli yapacak." },
      ],
      choices: [{ id: "d", text: "Sandalyeden kalk, tablet ışığını önüne doğrult", next: "n_s3_ok" }],
    },

    n_s3_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav3: true, kart3: true } },
        { type: "system", text: "SON DERS BİTTİ — KART PARÇASI III ALINDI · ANAHTAR TAMAMLANDI" },
        { type: "anons", text: "「Son parça da senin... Kart tamamlandı fare. Çıkış kapısında görüşürüz. Orası artık benim güvenli bölgem değil ama kemiklerinin nasıl kırılacağını izlemek için ekran başında olacağım.」" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "hub", text: "Son parçayı da cebime atıp o lanet kavşağa koş", next: "n_hub" },
      ],
    },

    /* ================= ÇIKIŞ — PARÇA KİLİDİ ================= */

    n_cikis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Karşında duran devasa, paslı çelik çıkış kapısı. Ortasında vahşice oyulmuş üç yuvalı bir kart okuyucu var; bu yuvalara o kanlı üç parçayı yerleştirmen gerek. Tabletinin titrek ışığı yuvaların boşluğunda geziniyor." },
        { type: "alert", text: "OKUYUCU HINÇLA ÖTÜYOR: KART PARÇALARI EKSİK! Tüm sınavları bitirmeden bu kapı açılmayacak!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "Hâlâ eksik parçalar var! Pillerin tükenmeden o canavarların odalarına dönüp sınavları bitirmek zorundasın!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "Üç parça da parmaklarının arasında titriyor. Okuyucuya tek tek, etini yırtarcasına bastırıyorsun — ÇIT, ÇIT, ÇIT. Kapının içindeki devasa hidrolik kilitler derin, can çekişen bir iniltiyle çözülüyor!", if: { flag: "kart3", equals: true } },
      ],
      choices: [
        { id: "gec", text: "Ağır çelik kapıyı tüm gücünle it ve o karanlık koridora sız", next: "n_mezun", if: { flag: "kart3", equals: true } },
        { id: "geri", text: "Eksik kalan o dehşet odalarına geri dön", next: "n_hub", if: { flag: "kart3", equals: false } },
      ],
    },

    /* ================= MEZUNİYET + HARUN ================= */

    n_mezun: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { mezun: true } },
        { type: "system", text: "ÇIKIŞ KİLİDİ AÇILDI — K-4 CEHENNEMİNE GEÇİŞ SERBEST" },
        { type: "anons", text: "「Tebrikler kurban... Dört ette bir mezun. Al bakalım, bu benden sana bir ödül olsun.」 Tependeki karanlık menfez aniden sarsılıyor ve ayağının dibine taze, ambalajlı bir tablet pili düşüyor! 「Küçük bir kıyak... Kimseye söyleme, buradaki sadist imajımı bozmak istemem.」" },
        { type: "battery", spares: 1 },
        { type: "waitTap" },
        { type: "anons", text: "「Sana son bir bedava ders: K-4 kapısından çıktığında önünde uzanan o sonsuz koridor... Orası artık benim oyun alanım değil. Orası kimsenin değil. Oraya ölümün gerçek amiri hükmeder... Babama benden selam söyle fare.」" },
        { type: "objective", text: "Ana havalandırma bacasına ulaş." },
      ],
      choices: [
        { id: "cik", text: "K-4 geçiş kapısını arala ve o bilinmezliğe adım at", next: "n_harun1" },
      ],
    },

    n_harun1: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sonsuz, çıplak, duvarlarından kan sızan bir bağlantı koridoru. Yarı yola geldiğinde öbür uçtan sarı bir fener dönüyor; acele etmeyen, görevini bilen bir ışık. Arkasından kapı boşluğuna sığmayan kasap önlüklü bir gövde beliriyor. Bu bir canavarın gelişi gibi değil, vardiya amirinin denetime çıkması gibi. En yanlış olan da bu: dehşetin burada mesai düzeni var." },
        { type: "narrate", text: "\"Yeni kurban...\" Ses o kadar sakin, o kadar derinden geliyor ki; sanki bir fabrikanın vardiya amiri, bir BABA gibi konuşuyor. \"Mesai saatinde koridorlarda başıboş geziyorsun. Senin için çok ağır bir ceza tutanağı hazırlamam gerekecek evlat...\" Devasa fener havaya kalkıyor ve doğrudan senin o korkudan donmuş gözlerine saplanıyor!" },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "ŞEF SENİ GÖRDÜ — Artık onun av listesindesin!", noteKind: "alert" },
        { type: "waitTap" },
        { type: "alert", text: "⚠ O DEVASA ADIMLARLA ÜZERİNE YÜRÜMEYE BAŞLADI — KARAR VER!" },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "kos", text: "ARKANA DÖN VE TÜM GÜCÜNLE KOŞUYORUM!", next: "n_harun2" },
        { id: "don", text: "Donakal! Tüneldeki o canavarda işe yaramıştı, bunda da yarar belki?!", next: "n_olum_harun1", default: true },
      ],
    },

    n_olum_harun1: {
      death: true,
      deathText: "Büyük bir hata! O tüneldeki kör canavar sesle görüyordu... Ama Şef seni gözleriyle, o dev feneriyle görüyor! Sen donakalmışken adımları hiç hızlanmıyor; çünkü kaçamayacağını biliyor. Devasa elini boğazına geçirip seni havaya kaldırırken, \"Kaçmadın... Aferin evlat. Aile, etini zorlaştırmayan uslu çocukları çok sever,\" diyor. Kemiklerinin kırılma sesiyle tablet yere düşüyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_harun2: {
      cost: 1,
      events: [
        { type: "narrate", text: "ÇILGINLAR GİBİ KOŞUYORSUN! Kalbin kulaklarında patlıyor. Arkandaki o devasa adam feneri sallayarak geliyor; adımları ağır ama o kadar büyük ki aradaki mesafe imkansız bir hızla kapanıyor! Önünde iki vahşi seçenek var: Sağdaki servis merdiveninin çelik kapısı ya da zemindeki o paslı havalandırma menfezi!" },
      ],
      choices: [
        { id: "menfez", text: "Menfeze doğru hamle yap ve kapağını zorla", next: "n_harun2_chase" },
        { id: "kapi", text: "Çelik kapıyı açmayı dene", next: "n_olum_harun2" },
      ],
    },

    n_harun2_chase: {
      interaction: {
        kind: "chase",
        title: "K-5 KORİDORU",
        enemy: "ŞEF HARUN SENİ ARIYOR",
        success: "n_menfez",
        fail: "n_olum_harun_kovalama",
        startDanger: 30,
        phaseMs: 1320,
        hints: {
          patrol: "Fener duvarı tarıyor. Birkaç adım kazan.",
          search: "Başını çevirdi. Dolap gölgelerine sin.",
          near: "Tam arkanda. Nefesini bile duyarsa biter.",
        },
      },
    },

    n_olum_harun_kovalama: {
      death: true,
      deathText: "Fener sırtına yapışıyor. Koşmaya devam ediyorsun ama zemin ayağının altından çekilmiş gibi; her adımın aynı kirli fayansa geri düşüyor. Şef Harun seni yakaladığında bağırmıyor. Sadece kulağına eğilip, \"Böyle koşunca et kasılır evlat,\" diyor. Sonra karanlık, kemiklerinin içinden gelen ıslak bir sesle kapanıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_olum_harun2: {
      death: true,
      deathText: "Kapı kilitli! Elektronik şifreli kilit ve bu kilitlerin kimin elinde olduğunu biliyorsun. Tam o sırada başının üzerindeki hoparlörden Deniz'in o fısıltısı yükseliyor: 「Ders dört bakım: Bana asla güvenmemeliydin.」 O devasa fener sırtını aydınlatırken, Şef'in paslı baltası etine gömülüyor. Görüşün kararıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez: {
      events: [
        { type: "narrate", text: "Menfez kapağını tırnaklarını sökerek, parmaklarını kanatarak yerinden çıkarıyor ve kendini o dar deliğe fırlatıyorsun. Bir saniye sonra, o dev fenerin sarı ışığı ızgaranın aralıklarından yüzüne sızıyor. Çizgi çizgi ışık gözlerini yakıyor. Şef'in devasa postalları tam menfezin önünde duruyor. Bekliyor... Her bir nefesini, korku dolu kalp atışını DİNLİYOR!" },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_menfez_ok", fail: "n_olum_menfez" },
    },

    n_olum_menfez: {
      death: true,
      deathText: "Izgaranın hemen altında nefesin dayanamıyor ve boğucu bir hırıltı kaçırıyorsun. İşte bu kadar. Şef anında eğiliyor ve o devasa menfez kapağını bir konserve kutusu gibi tek hamlede söküp atıyor! Seni bacağından yakalayıp dışarı çekerken, \"Saklambaç mesai saatinde oynanmaz evlat...\" diyor. Kafanı betona vurduğunda her şey kararıyor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "O postallar, ömründen yıllar alan sonsuz bir dakikanın ardından yavaşça dönüp uzaklaşıyor. Fenerin o tehditkar gölgesi duvarlardan çekiliyor. Koridorun ucundan o derin ses kendi kendine mırıldanıyor: \"Tutanak yarına kalsın... Aile sofrada taze et bekler...\" Kurtuldun." },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "narrate", text: "Menfezin içindeki o pisliğin, tozun ve kurumuş kanların arasından yukarıya doğru — ana bacanın o buz gibi esen hava akımına doğru çılgınca tırmanmaya başlıyorsun." },
      ],
      choices: [
        { id: "baca", text: "Ana bacanın demir basamaklarına yapış ve tırman", next: "n_baca" },
      ],
    },

    /* ================= BÖLÜM SONU ================= */

    n_baca: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Ana baca: K-5 cehennemini K-4'e bağlayan dikey, kapkara bir çelik boğaz. Tutunduğun demir basamaklar ellerini donduruyor ama yukarılardan — o yamyamların yaşam alanlarından — sıcak, mide bulandırıcı, tuhaf bir haşlanmış et kokusu aşağıya doğru iniyor. Ağlayarak tırmanıyorsun." },
        { type: "ambient", text: "Aşağıda, Deniz'in hoparlörleri son bir kez cızırdıyor: 「...İyi dersti fare. Yukarısı artık benim kameramın olduğu yer değil. Yukarısı EVDİR... Evdekiler açtır...」", if: { flag: "denizSoruldu", equals: false } },
        { type: "ambient", text: "Aşağıda, Deniz'in hoparlörleri son bir kez cızırdıyor: 「...O sorduğun soru vardı ya...」 Uzun bir statik cızırtı. 「O soruyu yukarıda sakın kimseye sorma. Özellikle orada... Çünkü yukarısı EVDİR ve evdeki herkes o soruya çoktan kendi etini vererek cevap vermiştir...」", if: { flag: "denizSoruldu", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Cebindeki o minik sonar telsizinden Ece'nin titrek sesi geliyor: «Hâlâ hayattayım... Sen tırmanırken hattı K-4'ün interkomlarına bağlamaya çalışacağım. Ne olur kaybolma... Lütfen orada ölme...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Telsiz tüm tırmanış boyunca ölüm sessizliğine gömülüyor. Ece'nin orada, o karanlıkta olduğunu biliyorsun... Ama artık senin gibi bir hain için asla konuşmayacak. Yalnızsın.", if: { flag: "eceEleVerildi", equals: true } },
      ],
      choices: [
        { id: "son", text: "K-4'ün çıkış kapağına kanlı ellerini uzat", next: "n_k5_son" },
      ],
    },

    n_k5_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapağa dokunduğun an tüm o devasa baca, geçtiğin tüm o kanlı tüneller, K-5'in o çelikten ciğerleri aynı anda sanki delirmiş gibi fısıldamaya başlıyor:" },
        { type: "ambient", text: "«Beş... Dört... Üç...» Bir kadının derinden gelen sesi. Uykusunda, kâbuslar görerek ölen birinin sayıklaması gibi yumuşak ve hastalıklı." },
        { type: "waitTap" },
        { type: "narrate", text: "Sonra tüm kat aniden susuyor; geriye sadece yukarılardan gelen o sıcak, yanlış ev yemeği kokusu kalıyor. Kapağı tüm gücünle itiyorsun: Karşında K-4'ün loş, tekinsiz ışığı ve seni bekleyen o büyük delilik. Kimin evine girdin... Birazdan kemiklerinde hissedeceksin." },
        { type: "system", text: "—SINAV BİTTİ, ASIL DEHŞET BAŞLIYOR —" },
      ],
      choices: [
        { id: "k4", text: "Kapakla birlikte K-4'ün loş koridoruna tırman", next: "n_k4_giris" },
      ],
    },
  },
};

export const EP02_FLAGS = {
  destekOnarildi: false,
  hubIlk: false, s1Ilk: false, t1Ilk: false, t3Ilk: false,
  s1SemaOkundu: false, tHarita: false, tCep: false,
  kart1: false, kart2: false, kart3: false,
  sinav1: false, sinav2: false, sinav3: false, mezun: false,
  adSoylendi: false, eceEleVerildi: false,
  denizSoruldu: false,
};
