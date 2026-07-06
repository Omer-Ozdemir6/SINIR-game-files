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
        { type: "narrate", text: "Bastığın son metal basamak da kırılıp arkanda çınlarken, ayakların ıslak, soğuk ve yabancı bir KAYAYA basıyor. Burası K-2. İstasyonun bir parçası değil; bu lanet deliyi o çiğ çelik yapının altına gizlemişler. Elindeki tek şey, yüzünü keskin, hastalıklı bir beyazlıkla aydınlatan tabletin ekranı. Işık hüzmesi duvardaki binlerce yıllık lekelere vuruyor... Hayır, leke değil. Deriye kazınır gibi taşa oyulmuş çentikler. Azalan, tükenen bir geri sayım. Karanlık, tabletinin ışığını adeta yutmak için üzerine çullanıyor." },
        { type: "narrate", text: "Boşluğun ortasında paslı iskeleler, birbirine dolanmış kalın siyah kablolar ve adeta tapan kör bir tarikat gibi dizilmiş çürüyen ekipmanlar var... Hepsi merkezdeki o dipsiz anomalinin etrafını sarmış. Onu göremiyorsun, çünkü tabletinin zayıf ışığı o zifiri karanlığı yırtmaya yetmiyor. Ama kusma hissiyle gelen o berbat titreşimi HİSSEDİYORSUN. Diş köklerin sızlıyor, kulak zarların patlayacak gibi parazit yapıyor ve zihninin içine kirli bir pas gibi bir sayı çakılıyor: Üç." },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Zihnine etli, ıslak bir şey dokundu", noteKind: "alert" },
        { type: "narrate", text: "«Kımıldama... Nefes bile alma...» Gölgelerin içinden çiğ, dehşet dolu bir fısıltı yükseliyor. Gerçek bir insan sesi. Toz fırtınasından çıkmış gibi hırpalanmış bir kazı tulumu içinde, elinde titreyen bir fener ve kan lekeli paslı bir levye tutan bir kadın belikliyor. Tabletinin ışığı yüzüne vurduğunda göz bebeklerinin korkudan büyüdüğünü görüyorsun. «Sen... senin bilincin hâlâ yerinde. Gözlerin etrafı görüyor... Tanrım, üç haftadır buradaki tek canlı insan sensin.» Selin.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "«Kımıldama... Sakın ses çıkarma...» Kaya yarığından fırlayan ıslak bir el neredeyse tabletini düşürmene sebep oluyor. Bir kadın, kazı tulumu içinde nefes nefese. «Sonar hattındaki ölü frekanstan bir çığlık geldi... Ece. Seni söyledi. Sana güveniyor. Ben Selin. Ve eğer buradan canlı çıkmak istiyorsan, ikimizin o şeyi gebertmesi gerekiyor.» ", if: { flag: "eceEleVerildi", equals: false } },
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
        { type: "narrate", text: "Selin seni sertçe bir kaya çıkıntısının arkasına çekiyor. Sırtını taşa yasladığında nefes alış verişleri hırıltılı, elleri tırnak etlerine kadar parçalanmış ama gözlerinde hayatta kalma çılgınlığı var. «Dinle beni, zamanımız saniyelerle ölçülüyor. Kafanın içinde çınlayan o sayı... Üç... Bir halüsinasyon değil. Buluntu kusuyor, geri sayıyor ve o sayı sıfıra vurduğunda...» Boğazından kuru bir hıçkırık kaçıyor. «Nevin'in o çürüyen cesedinden kalan kayıtları okumadın mı? Herkes tek bir et yığını olacak. Tek bir kovan zihni. Yüzeydeki herkes dahil.»" },
        { type: "narrate", text: "«Buluntu saniyede 432 hertz dalga yayan canlı bir frekans. Onu GEBERTMENİN tek yolu, kendi kusmuğunu onun boğazına geri tıkamak: onun leş dilini tersten okuyacağız. Ben o duvarlardaki habis sembolleri çözdüm. Ama verici paneline ulaşmak tek başına intihar. Sen o lanet radyoyu frekansa kilitleyeceksin, bense o sembolleri panele kusacağım.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«Ama can alıcı berbat bir detay var. Vericiye ulaşmak için o şeyin tam önünden, o kör edici karanlığın göbeğinden geçmek zorundasın. Seni görecek. Ruhunun en pis köşesine kadar seni okuyacak... Söyle bana, yukarı katlarda ne bok yedin? O delilerin sofrasına oturdun mu? Onların kusmuk kokan etlerinden yediysen, Buluntu seni kendi kanından sayar. Bu lanet bir avantaj olabilir... Ya da tamamen yutulacağın bir tuzak.» Sana baka kalıyor.", if: { flag: "sofraYedi", equals: true } },
        { type: "narrate", text: "«İyi haber: en azından ruhun hâlâ pisliğe batmamış. Onların o kokuşmuş yemeklerine dokunmamışsın, tenin hâlâ insan kokuyor. Ama bu aynı zamanda Buluntu'nun seni gördüğü an yok edilmesi gereken vahşi bir tümör, yabancı bir tehdit olarak algılayacağı anlamına geliyor. Önünden geçerken nefesini tut.»", if: { flag: "sofraYedi", equals: false } },
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
        { type: "narrate", text: "Selin parmaklarını omzuna geçirip seni karanlığa doğru itiyor: «Ben burada kalıp konsolu uyaracağım. Sen bu leş kokulu labirente gir — ölenlerin arkalarında bıraktığı her hurda işimize yarayabilir. Ama sakın unutma: attığın her adım, çıkardığın her sürtünme sesi Buluntu'yu daha da uyandıracak. Ve tabletinin o lanet ışığıyla etrafa ne kadar BAKARSAN, o şey aklına o kadar derinden tecavüz edecek.»" },
        { type: "narrate", text: "Önündeki saha tam bir mezarlık: devrilmiş iskeleler, içinde kurtların fink attığı terk edilmiş çadırlar, zifiri tüneller... Önünde dört yırtık yol var: ceset kokan kamp alanı, oymalarla kaplı galeri, dipsiz sondaj kuyusu ve tam ortada... O yaratığa açılan o kadim, korkunç kapı. Kafanın içindeki ses nabız gibi gümleyerek yerinde sayıyor: Üç... Hâlâ üç. Ama beyninin içinde bir ur gibi büyüyor." },
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
        { type: "narrate", text: "Sonar odasına adım attığın an burnuna yanmış plastik ve çürümüş et kokusu çarpıyor. Duvarlardaki monitörler çatlamış, osiloskoplar çılgın gibi parazit kusuyor. Sadece tek bir ekran çalışıyor ve yeşil ekranda ölümcül, kusursuz bir dalga formu çiziyor: 432 hertz. Sabit. Hipnotik. Canlı bir canavarın nabzı. Masanın ortasında eski bir teyp duruyor, üzerine kurumuş kanla bir not karalanmış: 'DİNLEME. OYNATMA. SAKIN.'" },
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
        { type: "narrate", text: "Parmağın titreyerek teybin paslı düğmesine basıyor. Önce kulak tırmalayan bir cızırtı, ardından kazı ekibinin delirmeden hemen önceki hıçkırıkları, ağlamaları duyuluyor... Sonra o sesler teker teker eriyip tek bir leş korosuna dönüşüyor, hep birlikte sayıyorlar. Ve teybin en sonunda, tüylerini diken diken eden o şeyi duyuyorsun: Kendi sesin. Henüz ağzından çıkmamış, gelecekteki çığlığın. Buluntu şimdiden senin zamanını kemiriyor. Kendi ölüm çığlığını dinliyorsun." },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Gelecekteki çığlığın zihnine çakıldı", noteKind: "alert" },
        { type: "flag", set: { sonarGoruldu: true, sonarTeyp: true } },
      ],
      choices: [
        { id: "cik", text: "Odadan çık", next: "n_kazi_hub" },
      ],
    },

    n_sonar_cik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Teybe dokunmuyorsun — ölenlerin o dehşet dolu uyarısı içini ürpertiyor. Elindeki tabletin çiğ ışığını ekrana tutarak o 432 hertzlik dalga formunun her kıvrımını hafızana, beyninin arkasına kazıyorsun. O canavarı kendi silahıyla vururken bu frekansı bilmek zorundasın. Odadan çıkarken arkandaki karanlık sanki seni fısıltıyla uğurluyor." },
        { type: "flag", set: { sonarGoruldu: true, sonarBildi: true } },
        { type: "stat", stat: "akil", delta: 3 },
        { type: "note", id: "not_sonar", title: "Sonar dizisi", text: "Kazı ekibinin sonar odasında Buluntu'sunun sesini gördüm: 432 hertz, sabit. Teybe dokunmadım. Bu frekansı tanımak vericide işime yarayacak." },
      ],
      choices: [
        { id: "cik", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_kazi_dinlen: {
      cost: 1,
      events: [
        { type: "narrate", text: "Yırtık, küf kokan bir çadırın zifiri karanlığına süzülüyorsun. Tabletinin ekranını göğsüne bastırıp ışığını kapatıyorsun; etraf kapkara, göz gözü görmüyor. Ağzını kapatıp nefesini tutuyorsun, dışarıda bir şeylerin kayayı tırmalayan seslerini dinleyerek bekliyorsun. Beyninin içindeki uğultu yavaşça geri çekiliyor, kalbinin göğüs kafesini kıran gümlemesi hafifliyor. Şimdilik seni fark etmedi." },
        { type: "stat", stat: "gurultu", delta: -25, note: "Karanlıkta nefesini tuttun — GÜRÜLTÜ azaldı", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Kazı sahasına dön", next: "n_kazi_hub" },
      ],
    },

    n_kamp: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Kamp alanı tam bir vahşet sahnesi: devrilmiş kanlı sandalyeler, kurumuş irin gibi masaya yayılmış haritalar... İnsanlar burayı panikle terk etmemiş, sanki hipnotize olup düzgünce yürüyerek ölüme gitmişler. Duvarda, bir insanın kendi parmak uçlarını parçalayarak kanla yazdığı o delilik okunuyor: 'SAYMAYI BIRAKMA. EĞER SAYARSAN SENİ İÇERİDEN DUYAR.'" },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_kazi_gunluk", title: "Kazı Şefi'nin Günlüğü", style: "type",
          meta: "— Dr. R. Vardar, sondaj ekibi —",
          body: "14. gün. Buluntu'yu ilk çıkardığımızda tek parçaydı.\nSimdi buyuyor mu, yoksa biz mi kuculuyoruz\nbilmiyorum. Ekipten ucu uykusunda sayiyor.\n\n19. gun. Sayi herkesin kafasinda. 'Yedi' diyorlar,\nhep bir agizdan. Ben duymuyorum, henuz. Kulak\ntikaci ise yaramiyor; ses disaridan degil, iceriden\ngeliyor.\n\n21. gun. Yarisi gitti. Asagi indiler, Buluntu'ya.\nGulumseyerek. Ben son kalanim. Bu gunlugu bulan\nkisiye: sayma. Ne olursa olsun, o sayiyi zihninde\ntekrarlama. Saydigin an, seni bulur." } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL -8 — Kelimeler zihninde bir ur gibi büyüyor", noteKind: "alert" },
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
        { type: "narrate", text: "Tabletinin çiğ ekran ışığını devrilmiş bir malzeme sandığına doğrultup çıplak ellerinle pisliği karıştırıyorsun. Kırık matkap uçları parmaklarını kesiyor, boş konserve kutularından sızan leş suları ellerine bulaşıyor. Ama en altta, pıhtılaşmış bir kan bezine sarılı iki adet yedek pil ve ezilmiş bir kulak tıkacı buluyorsun. Kulak tıkaçları o içteki sesi kesmeyecek, ama en azından dışarıdaki o delirtici çığlıkları biraz olsun boğabilir. Pilleri hemen cebe atıyorsun." },
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
        { type: "narrate", text: "Galeri dedikleri yer, tavanından sülük gibi ıslak bir şeylerin damladığı daracık bir ölüm tüneli. Duvarlar tamamen insanı delirten cinsten oymalarla kaplı: gökten düşen devasa etsi bir kütle, ona dokunan ve saniyeler içinde yüzleri eriyip pürüzsüz birer et parçasına dönen insanlar... Son oymadaki figürlerin yüzü tamamen silinmiş, yerlerinde sadece kara delikler var. Göz hizandaki o oyuk sanki tabletinin ışığı altında kımıldıyor, seni izliyor!" },
        { type: "waitTap" },
        { type: "narrate", text: "Oymalara baktıkça kulaklarında yoğun bir çınlama başlıyor, miden bulanıyor. Taş sanki canlı bir deri gibi nefes alıyor, üzerindeki çentikler titreyerek azalıyor. Zihninin içindeki o lanet ses çekiçle vuruyor: Üç... Üç... Selin’in o fısıltısı beyninde patlıyor: Ne kadar bakarsan, o şey ruhunu o kadar çabuk kirletecek!" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Habis oymalar beyninin kıvrımlarına kazındı", noteKind: "alert" },
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
        { type: "narrate", text: "Gözlerini karartıp titreyen elini o iğrenç oymaya sürüyorsun. Taş buz gibi değil; aksine ateşler içinde yanan bir hastanın teni gibi sıcak, nemli ve canlı. Parmaklarının altında oymalar yer değiştirirken beyninde şimşekler çakıyor: Bu lanet şey bir dil! O yaratığın frekansını kusacak olan panelin şifresi bu! Selin’in aradığı o kayıp sembolü buldun. Ama kafanın içinde berbat bir boşluk oluşuyor... Bir saniyeliğine annenin yüzünü, hatta kendi adını hatırlayamıyorsun. Bilgi ruhundan bir parça kopardı." },
        { type: "flag", set: { galeriSembol: true } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL -8 — Kadim dil hafızanın bir kısmını sildi", noteKind: "alert" },
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
        { type: "narrate", text: "Sondaj kuyusunun kenarındasın. Zemine açılmış, tabletinin ışığını ne kadar tutarsan tut sonunu göremeyeceğin, cehennem gibi kara ve derin bir yırtık. Kazı ekibi o laneti bu kuyunun dibinden söküp çıkarmış olmalı. Hemen yanında can çekişen bir jeneratör hırıldıyor — motoru çılgın gibi sarsılıyor, çıkardığı gürültü kulakları sağır edecek cinsten ama etrafı aydınlatan son birkaç lambayı o besliyor. Eğer onu kapatırsan zifiri bir sessizlik kazanacaksın; ama o an etrafındaki tüm dünya kapkara olacak, sadece elindeki küçük tabletin ışığı kalacak." },
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
        { type: "narrate", text: "Gözünü karartıp jeneratörün yağlı paslı şalterini aşağı indiriyorsun. O sağır edici motor hırıltısı bıçak gibi kesiliyor... Ve onunla birlikte yukarından sarkan soluk sarı lambalar patlayarak sönüyor. Her yer kapkara. Sadece elindeki tabletin ekranı yüzünü ölü gibi aydınlatıyor. Ama bu korkunç sessizlikte, ilk kez beyninin içindeki sesin sustuğunu duyuyorsun. Buluntu’nun o iğrenç uğultusu bile geri çekildi. Sessizlik şu an senin tek sığınağın." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Jeneratör sustu — GÜRÜLTÜ azaldı, karanlık çöktü", noteKind: "system" },
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
        { type: "narrate", text: "Dizlerinin üstüne çöküp kuyunun o leş kokan ıslak kenarından aşağı eğiliyorsun. Kör bir karanlık... Ama saniyeler sonra, o karanlığın en dibinde, damarlarda akan kirli kan gibi parıldayan, soluk kırmızı lifler görüyorsun. Buluntu’nun kökleri, etsi uzantıları binlerce metre aşağı yayılmış. Ve sen o lağıma baktığın an, o dipsiz karanlıktan milyonlarca görünmez gözün SANA baktığını hissediyorsun. Kafanın içindeki sayı bir anda çığlığa dönüşüyor — Geri çekil, hemen kusmamak için geri fırla!" },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — Karanlık ruhunu dikizledi", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15, note: "Dehşetle geri fırladın — GÜRÜLTÜ arttı", noteKind: "alert" },
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
        { type: "narrate", text: "Kazının tam kalbine giden yol, taştan devasa bir kapıyla kesilmiş durumda. Üzerinde tek bir oyuk var: Deforme olmuş geniş bir göz işareti ve o gözden fışkıran etsi kollar. Selin arkandan titreyen bir sesle fısıldıyor: «Kazı ekibi burayı açmak için haftalarca duvarı balyozla dövdü ama çizemediler bile. Kilidi açmanın tek yolu şu kaidedeki şeyi doğru açıyla projektörün önüne koymak...»" },
        { type: "narrate", text: "Kaideye yaklaşıyorsun. Projektör lambasının tam önünde duran şey... Tanrım, metal ve insan kemiğinin birbirine kaynamış olduğu iğrenç, deforme bir tümör parçası; Buluntu'nun etinden kopmuş bir kalıntı. Ona dokunup çevirdikçe arkadaki devasa taş duvara düşen gölgesi şekil değiştiriyor — Bir açıda karmakarışık bağırsak yığını gibi dururken, başka bir açıda... Gölge canlanıyor. Gölgeyi duvardaki o açık göz sembolünün üstüne tam oturtmalısın." },
        { type: "waitTap" },
        { type: "note", id: "not_kadim", title: "Kadim kapı", text: "Kazının merkezine giden kapı, gölge bilmecesiyle kilitli. Kaidedeki kalıntıyı çevirip eğerek, gölgesini kapıdaki işarete (dairesel göz + yayılan kollar) oturtmam gerek. Her açıda gölge farklı düşüyor." },
      ],
      interaction: {
        kind: "shadow",
        title: "KADİM KİLİT — GÖLGEYİ BUL",
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
        { type: "narrate", text: "Gölge duvardaki o iğrenç etsi göze tam oturduğu an, kaidedeki kemik parçasından tiz, canlı bir çığlık yükseliyor — ve o devasa taş kapı, kemiklerin kırılma sesine benzer bir iniltiyle, milim milim yana kayarak açılıyor. Ardından fışkıran hava yüzüne mezarlık soğukluğu gibi çarpıyor." },
        { type: "flag", set: { kadimAcildi: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Selin duvardaki gölgeye bakarken nefesini tutuyor, dehşet içinde kalmış. «O koca profesörler aylarca bu kapının önünde delirdi... Sen... Sen bunu saniyeler içinde nasıl yaptın?» Cevap veremiyorsun, çünkü parmakların o kemiği çevirirken sanki senin iradenle değil, beynine sızan o şeyin emriyle hareket etti. Buluntu seni içeri çağırıyor." },
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
        { type: "narrate", text: "Kapının ardındaki sığınak, o leş kokulu cehennemin son eşiği. Duvarlar boyunca insan sığacak büyüklükte oyuklar var; buralar kazıya inip bir daha asla gökyüzünü göremeyenlerin mezarları. Buluntu onların zihinlerini yutmuş ama geriye kalan kokuşmuş bedenleri buraya birer sunak gibi dizilmiş. Üç oyuktan hâlâ taze kan ve irin sızıyor. O tulumları, o eşyaları tanıyorsun. Onlar buradalar." },
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
        { type: "narrate", text: "Tabletinin ışığını o üç mezara birden doğrultuyorsun: Baturay, Deniz, Nevin. Bir teknisyen, bir küçük çocuk, bir botanikçi... Buluntu onların bedenlerini birer kukla gibi kullanıp ruhlarını o lanet kovanın içine hapsetmiş. Her biri kendi cehennem sayısını sayıyor. Ama sen dördüncü kurban olmayacaksın. Bu pislere yapılacak tek bir merhamet kaldı: O lanet frekansı sonsuza dek susturmak." },
        { type: "waitTap" },
        { type: "narrate", text: "Göğsünün ortasındaki o yoğun korku dalgası yerini vahşi bir öfkeye bırakıyor. Dişlerini birbirine bastırıyorsun. Onlar için... Ve yukarıda hâlâ kendi adını hatırlayan son insanlar için o canavarı susturacaksın.", ifStat: { stat: "akil", gte: 30 } },
        { type: "stat", stat: "akil", delta: 6, note: "AKIL +6 — Korku vahşi bir amaca dönüştü", noteKind: "system" },
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
        { type: "narrate", text: "Sığınağın tam köşesinde, aşağıya doğru spiral çizen daracık, yapışkan bir tünel var. Bu insan eliyle kazılmamış; Buluntu’nun o etsi, ıslak köklerinin kayayı asitle eriterek açtığı organik bir boğaz sanki. İçeriden insanı kusan sıcak, nemli bir hava ve mideni bulandıran alçak bir bağırsak gurultusu yükseliyor. Oraya girmek tam bir delilik. Ama o karanlığın içinden bir şey senin adını sayıklıyor gibi." },
        { type: "waitTap" },
        { type: "flag", set: { tunelGoruldu: true } },
        { type: "narrate", text: "Selin arkandan giysini yakalayıp çekiştiriyor, gözleri fal taşı gibi açılmış: «Oraya girme! Oraya inen iki koruma çığlık bile atamadan o et liflerinin arasında eridi... Ama karar senin. O deliğin dibinde her ne varsa canlı, bunu hissediyorum.»" },
      ],
      choices: [
        { id: "in", text: "Tünele in (riskli — derin keşif)", next: "n_tunel_derin" },
        { id: "vazgec", text: "Vazgeç, sığınağa dön", next: "n_siginak" },
      ],
    },

    n_tunel_derin: {
      cost: 1,
      events: [
        { type: "narrate", text: "Dar tünelden aşağı doğru sürünüyorsun, etraftaki o ıslak, etsi duvarlar omuzlarına, saçlarına sürtünüyor. Duvarlar nabız gibi güm güm atıyor; attığın her santimde beynindeki o şifre çığlık atıyor. En dipte, tamamen pıhtılaşmış siyah bir sıvının ortasında kazı ekibinin son üyelerinden kalan parçalanmış eşyalar var... Ve önünde duran dehşet verici bir seçim." },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Canlı et tünelinin dibindesin", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "Yaratığın bağırsak gurultusu etrafını sardı — GÜRÜLTÜ arttı", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sandik", text: "Kazı ekibinin bıraktığı sandığı aç", next: "n_tunel_sandik" },
        { id: "fisilti", text: "Uğultunun içindeki fısıltıyı dinle (compl. riskli)", next: "n_tunel_fisilti" },
        { id: "cik", text: "Fazla derine indin — geri tırman", next: "n_siginak" },
      ],
    },

    n_tunel_sandik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Tabletinin ışığını çamurlu kasaya doğrultup mandallarını kırarak açıyorsun. İçinde kana bulanmış bir günlük, üç tane yedek pil ve kazıcıların o delirtici sesi kesmek için yaptığı ilkel bir kulaklık düzeneği duruyor. Günlüğün son yaprağı vahşice yırtılmış ama alt kısımda tırnakla kazınmış o cümle okunuyor: 'Frekansı tersine çevirmek o piçi öldürmeyecek, sadece uyutacak... Bir gün başka bir kurban gelip onu tekrar uyandırana kadar.'" },
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
        { type: "narrate", text: "Gözlerini kapatıp o ıslak duvardan gelen uğultuya kulağını dayıyorsun. Ve o fısıltı birden netleşiyor... Binlerce ölü insanın kusmuklu korosu tek bir ağızdan senin adını haykırıyor! Baturay, Deniz, Nevin, yukarıda parçalanan tüm mürettebat... «Bize katıl... Yalnızlık çok soğuk... Bizimle say... Üç... Üç... Üç...» İraden un ufak oluyor, dizlerin çözülüyor; o an sadece duvara sarılmak ve o etin içinde eriyip gitmek istiyorsun." },
        { type: "stat", stat: "akil", delta: -20, note: "AKIL -20 — Ölüler korosu ruhunu yakaladı", noteKind: "alert" },
        { type: "waitTap" },
        { type: "narrate", text: "Tam bilincini kaybederken, o leş korunun en dibinde kendi titrek sesini duyuyorsun. 'Hayır!' İlkel kulaklığı çılgın gibi kulaklarına geçirip o bağı yırtıyorsun ve tırnaklarını kayaya geçirerek yukarı doğru tırmanıyorsun. Bir dahaki sefere oradan çıkamayacağını biliyorsun." },
        { type: "flag", set: { tunelFisilti: true } },
      ],
      choices: [
        { id: "cik", text: "Kendini topla, yukarı tırman", next: "n_siginak" },
      ],
    },

    n_siginak_baturay: {
      cost: 1,
      events: [
        { type: "narrate", text: "İlk oyuktaki tulumun üzerine tabletinin ışığını tutuyorsun. Göğsündeki plastik etiket çamura batmış: B. SOYLU. Baturay. Seni bu cehenneme sürükleyen, o ihbar mailini atan ilk kurban. Cesedini K-6 revirinde tamamen parçalanmış bulmuştun... Ama meğer ruhunun o lanet yankısı hep buradaki etlerin arasındaymış. Kasılmış, çürümüş parmaklarının arasında sıkı sıkıya tuttuğu kanlı bir kağıt parçası var." },
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
        { type: "narrate", text: "İkinci oyuktaki o küçücük bedene tabletinin ışığını doğrulttuğunda kalbin sıkışıyor. Küçük bir çocuk boyutu. Yanında pilleri akmış bir walkie-talkie ve duvara kendi kanıyla çizdiği o iğrenç aile resmi duruyor: Bir anne, bir baba ve ortalarında yüzü olmayan bir çocuk, el ele... Deniz. K-5 katında telsiz parazitlerinin arasından sana ağlayan o sübyan. Resmin hemen altında taş çiviyle kazınmış: 'ben iyi bir çocuk oldum. artık hep birlikteyiz.'" },
        { type: "waitTap" },
        { type: "narrate", text: "Deniz’e yukarıda sormuştu o can alıcı soruyu: 'Sen de mi katıldın?' İşte cevabı, buradaki taş mezarda kanla yazılı duruyor. Ama eğer yukarıda sana o kapıları açtıysa, o küçücük ruhun bir parçası hâlâ o canavarın midesinde çırpınıyor demektir.", if: { flag: "denizSoruldu", equals: true } },
        { type: "flag", set: { iz遊Deniz: true } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "geri", text: "Sığınağa dön", next: "n_siginak" },
      ],
    },

    n_siginak_nevin: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üçüncü oyuk tamamen küf, kara sülükler ve damarlı sarmaşıklarla kaplanmış durumda: Dr. Nevin Aras’ın çürüyen bedeni. Botanikçi. K-3 katının o deliren bahçıvanı. O etsi kökler hâlâ canlı, üzerindeki kıllarla birlikte hafifçe titreyerek nefes alıyorlar. Eğer yukarı katlarda ona merhamet edip kurtardıysan, bu kökler o canavarın karşısında sana siper olacak. Kurtaramadıysan... Sadece leş kokan bir çukur." },
        { type: "waitTap" },
        { type: "ambient", text: "Islak bir sarmaşık bileğine dolanıyor — ama etini sıkmıyor, aksine şefkatle, adeta yön gösterir gibi seni yukarı itiyor. Nevin’in o deliren hırıltılı sesi beyninde yankılanıyor: «Kök sabırlıdır, yavrum... Toprak her pisliği yutar. Ben seni burada bekledim. Şimdi ben senin etine zırh olurum, sen o kapıdan geç...»", if: { flag: "nevinKurtarildi", equals: true } },
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
        { type: "narrate", text: "«Bilmiyorum...» diyor Selin, gözlerindeki o vahşi çaresizlikle dişlerini sıkarak. «Ben bu lağıma ilk indiğimde beynimin içinde 'Yedi' diye böğürüyordu. Şimdi 'Üç'... Günler mi kaldı, yoksa saniyeler mi bilmiyorum — O canavarın zaman algısı bizimki gibi akmıyor. Ama üçten sonra iki gelecek, sonra o lanet bir... Ve sıfır vurduğunda...» Durup karanlığa bakıyor. «Acele et, yoksa kafan patlayacak.»" },
        { type: "narrate", text: "Oysa sen yukarıda o gizli ölü frekansları dinlemiştin — O sesin ritmini biliyorsun. Selin’in bilmediği o korkunç gerçeği fark ediyorsun: Sayı sabit değil. Giderek hızlanıyor, süre daralıyor!", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      choices: [
        { id: "nasil", text: "\"Sen buraya nasıl geldin?\" diye sor", next: "n_selin_gecmis" },
        { id: "ilerle", text: "Kazı sahasını keşfetmeye başla", next: "n_kazi_hub" },
      ],
    },

    n_selin_gecmis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Selin sırtını ıslak kayaya yaslayıp gözlerini kapatıyor. «Kazı ekibinin sonar teknisyeniydim. Yüzeyde, o temiz havada güvendedir güya... Ama aşağıdaki ekipten telsiz parazitleri dışında ses gelmeyince 'İn bir bak' dediler. On bir ay önceydi.» Vahşi, deli gibi bir gülüş atıyor. «İndiğimde herkes çırılçıplak soyunmuş, o et kütlesine sarılıp gülümsüyordu... Ben sağır doğdum. Sol kulağım hiçbir şeyi duymaz. Belki de o yüzden o canavarın leş sesi beynimi tam çürütemedi. Yarım duyuyorum onu. Yarım insan kaldım.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«Bu yüzden sana muhtacım. Ben o paneli doldururum ama radyoyu o frekansa kilitleyemem — senin o sesi net duyman, benim o sağır kulağımla yapamadığımı yapman gerek. İki yarım adam, tek bir silah ediyor. Komik değil mi? Buluntu herkesi et yığını yapmak için birleştirdi; bizi de ona karşı tek bir mermi olarak birleştirdi.»" },
        { type: "stat", stat: "akil", delta: 5, note: "AKIL +5 — Karanlıkta sırtını yaslayacağın bir canlı var", noteKind: "system" },
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
        { type: "narrate", text: "Sığınağın çıkışındaki o son yarıkta duruyorsun. Önü tamamen o yaratığın inine açılıyor. Selin elini omzuna koyuyor, parmakları titriyor: «Bu eşikten tek bir adım attığın an geri dönüşün yok. O canavarın önünde durduğumuz an ruhumuzu ameliyat masasına yatıracak. Hazır mısın? Tabletini, pillerini, aklından kalan son kırıntıları kontrol et... Orada hata yaparsan seni kurtaramam.»" },
        { type: "waitTap" },
        { type: "narrate", text: "Kamp alanından bulduğun o kulak tıkaçları cebinde... O içteki lağım sesini tamamen kesmeyecek ama tam delireceğin an beynine bir saniye nefes aldırabilir.", if: { flag: "kampArandi", equals: true } },
        { type: "narrate", text: "O tünelin dibinde duyduğun o iğrenç ölülerin korosu hâlâ kulaklarında parazit yapıyor. Artık o sesin nereden vuracağını biliyorsun — ona karşı kendini nasıl savunacağını şimdiden ezberledin.", if: { flag: "tunelFisilti", equals: true } },
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
        { type: "narrate", text: "Gözlerini sıkıca kapatıyorsun. Tabletini göğsüne bastırıp zifiri karanlıkta derin bir nefes alıyorsun. Bir. İki. Beynindeki o yabancı sayıyı değil, sadece göğsünü yırtan kendi kalp atışını dinliyorsun. Yavaşça o kirli uğultu beyninden geri çekiliyor. Hazırsın." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Karanlıkta nefeslendin — GÜRÜLTÜ azaldı", noteKind: "system" },
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
        { type: "narrate", text: "Ve o yarıktan dışarı adım atıyorsun... Canavarın tam önündesin. Tabletinin ışığı o devasa kütleye vurduğu an kusmamak için kendini zor tutuyorsun." },
        { type: "waitTap" },
        { type: "narrate", text: "Kayanın içine ur gibi gömülmüş, devasa, ıslak, titreyen etsi bir kütle... Ne bitki, ne hayvan, ne de bir makine... Üçünün de en iğrenç hallerinin birleşimi. Üzerinde düzensizce açılıp kapanan, içinden irin sızan delikler var; göz olabilir, ağız olabilir ya da sadece nefes alan yaralar... Ondan yayılan o devasa radyoaktif titreşim kemiklerini sızatıyor. Ve beyninin tam ortasında, ölmüş annenin o yumuşak, hileli sesi fısıldıyor: «Üç... Neden geç kaldın evladım... Üç... Hadi gel...»" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — O yaratık ruhunu ameliyat ediyor", noteKind: "alert" },
        { type: "narrate", text: "Verici platformu o leş havuzunun tam karşı ucunda duruyor. Aranızda sadece o devasa kütle ve onun açılan delikleri var. Selin bağırıyor: «Sana yol açıyorum! Nevin’in o lanet kökleri hareket ediyor! Yukarıda ne yaptıysan, şimdi canını kurtarıyor!»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "Verici platformu tam karşıda ama aranızda bomboş, korumasız bir ölüm alanı var. Selin çaresizce fısıldıyor: «Hiçbir siper yok! Sadece deli gibi koş ve o seni okurken ruhun için dua et! Nevin’i yukarıda kurtarabilseydik o kökler siper olurdu ama şimdi yalnızız!»", if: { flag: "nevinKurtarildi", equals: false } },
      ],
      choices: [
        { id: "gec", text: "Buluntu'nun önünden geç", next: "n_gecis_dene" },
      ],
    },

    n_gecis_dene: {
      cost: 1,
      events: [
        { type: "narrate", text: "O habis bakışların tam ortasına adım atıyorsun. Bilincin ikiye bölünüyor: Bir yanın deli gibi karşıya koşmak için yırtınırken, öbür yanın diz çöküp o et kütlesine sarılmak, o hileli huzurun içinde erimek istiyor. «Üç... Ayakların kanıyor, neden koşuyorsun... Üç... Burası çok sıcak, herkes burada... Annen de seni bekliyor...»" },
        { type: "narrate", text: "Tam o esnada Nevin’in kurtardığın o devasa kökleri kayayı patlatarak fışkırıyor ve Buluntu’nun o irinli deliklerinin önünü kapatarak sana etten bir siper oluyor! «Şimdi! Koş! Durma!» diye yırtınıyor Selin.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "Midenize oturan o ağır lokma — Şef’in o pis yemeği — seni bir anlığına o canavarın kovan bilincine 'aileden' biri gibi gösteriyor. Buluntu bir an duraksıyor, seni yabancı bir tümör sanmıyor. O bir saniyelik duraksama sana can suyu oluyor!", if: { flag: "sofraYedi", equals: true } },
        { type: "ambient", text: "Ve aniden, hiç beklemediğin bir şey oluyor — Elindeki o küçük tabletin hoparlöründen, kilometrelerce yukarıdaki sonar hattından küçük Deniz’in o çocuksu parazitli sesi patlıyor: 「Bana yukarıda sormuştun... 'Katıldın mı' diye... Cevabımı hâlâ bilmiyorum abi. Ama şimdi senin için o kat kapılarını patlatıyorum. Hepsini! Koş abi, babama sakın yakalanma!」 Bütün mağaradaki mekanik kilitler çınlayarak açılıyor!", if: { flag: "denizSoruldu", equals: true } },
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
        { type: "narrate", text: "O et yığınının tam önündesin. Islak, devasa delikleri sana doğru dönüyor, yaydığı radyoaktif uğultu iç organlarını titretiyor. Tam yarı yoldasın — Bir adım daha, ciğerlerin patlayana kadar bir adım daha... Buluntu ruhunun en derinindeki korkuyu cımbızla çekmeye çalışıyor: Eğer çok ses çıkardıysan, eğer aklını yukarı katlarda yediysen seni anında yakalayacak." },
        { type: "waitTap" },
        { type: "narrate", text: "Şanslısın ki buraya gelene kadar sessizliğini korumayı başarmışsın — Buluntu zihninde tutunacak bir delilik kırıntısı bulamıyor, ellerinin arasından kayıp gidiyorsun. Verici paneli hemen önünde!", ifStat: { stat: "gurultu", lte: 50 } },
      ],
      choices: [
        { id: "ulas", text: "Platforma ulaş", next: "n_platform_ulas", ifStat: { stat: "gurultu", lte: 50 } },
        { id: "yakala", text: "İlerle (Buluntu seni hissediyor)", next: "n_gecis_yakala", ifStat: { stat: "gurultu", gte: 51 } },
      ],
    },

    n_gecis_yakala: {
      cost: 1,
      events: [
        { type: "narrate", text: "Çok fazla ses çıkardın, nefes alışların o canavarı uyandırdı! Buluntu’nun gölgemsi, etsi bir kolu kayadan fırlayıp sol bileğine dolanıyor! Etini asit gibi yakıyor bu dokunuş. O berbat uğultu beynini felç ediyor, o sayı bir emre dönüşüyor: DUR VE BİZE KATIL. Bir an bacaklarındaki tüm güç çekiliyor, duruyorsun. Selin’in uzaktan gelen o çığlığı kulak zarlarını yırtıyor: «Savaş onunla! Kendi adını söyle! Sayıyı unut!»" },
        { type: "stat", stat: "akil", delta: -12, note: "AKIL -12 — Habis et lifleri bileğini kavradı", noteKind: "alert" },
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
        { type: "narrate", text: "Gırtlağından kan gelene kadar kendi adını haykırıyorsun! O canavarın şifresine karşı kendi kimliğini kusuyorsun duvara! Bir an için tüm mağara buz kesiyor, o uğultu bıçak gibi duruyor. O etsi bağ bileğinden eriyerek çözülüyor ve sen kendini öne, verici platformunun üstüne fırlatıyorsun. Üstün başın o iğrenç sıvıyla kaplı, nefes nefese ama hâlâ sensin!" },
        { type: "stat", stat: "gurultu", delta: -15, note: "Adını haykırarak eti yırttın — GÜRÜLTÜ düştü", noteKind: "system" },
      ],
      choices: [
        { id: "ulas", text: "Platforma ulaş", next: "n_platform_ulas" },
      ],
    },

    n_gecis_irade: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ne siper olacak bir kökün var ne de seni koruyan bir bağ — sadece saf hayatta kalma çılgınlığın var! O iğrenç ses zihnine lağım gibi akarken, attığın her adımı kendi adınla sayıyorsun. O 'Üç' dedikçe sen 'Ben!' diyorsun. Bir! İki! Üç — Hayır, onun üçü değil, KENDİ ÜÇÜN! Alnından kanlı terler sızarak, beyninin yarısını orada bırakarak kendini platforma atıyorsun." },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — Saf iradeyle geçtin ama beynin hasar aldı", noteKind: "alert" },
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
        { type: "narrate", text: "Platformun üstündesin. O iğrenç kütle arkanda kaldı, yaydığı o sıcak rüzgâr sırtını yalıyor ama artık konsolun başındasın. Selin saklandığı kaya yarığından fırlayıp yanına çöküyor, suratı kireç gibi: «Başardın... Tanrım, o cehennemden sağ çıktın!» Nefes nefese bağırıyor. «Şimdi en berbat kısım başlıyor.»" },
        { type: "narrate", text: "Bu verici, ölen kazı ekibinin o canavarla konuşmak için yaptığı ama beceremediği ilkel bir sonar paneli. Ama ekranların yarısı ölü — Jeneratörden gelen ana hat kopuk. Önce bu hurdaya can vermen gerek: Kesik kabloları bağla. Selin titreyen elleriyle eski bir şemayı tabletinin ışığına tutuyor: «Kabloları renk kodlarına göre oturt! Sakın yanlış bağlama, kıvılcım çıkarsa çıkacak ses o piçi tamamen uyandırır!»" },
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
        { type: "narrate", text: "Konsolun yağlı arka panelini tırnaklarınla sökerek açıyorsun. Beş adet kalın, ucu çıplak kesik kablo jeneratörden gelecek akımı bekliyor. Selin tabletinin ışığını panelin içine tutuyor, nefesi boynunu yakıyor: «Çabuk ol... Ama sakın titreme. Her kıvılcım o et yığınını üzerimize salacak.»" },
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
        penalty: { gurultu: 14, akil: -5, text: "KIVILCIM — Metal çarpıştı, Buluntu irkildi! GÜRÜLTÜ +14" },
        success: "n_verici_guc_ok",
        cancel: "n_platform_ulas",
      },
    },

    n_verici_guc_ok: {
      cost: 1,
      events: [
        { type: "system", text: "VERİCİ: GÜÇ AKTİF" },
        { type: "narrate", text: "Son kabloyu da yuvasına kilitlediğin an konsol vahşi bir hayvany gibi canlanıyor — Ekranlar yeşil parazitler kusarak uyanıyor, tepedeki devasa sonar çanağı paslı bir iniltiyle dönmeye başlıyor. Buluntu bu metal akımını anında hissediyor: Kulaklarındaki o ses sivriliyor, sayı öfkeyle kafatasını zorluyor: «...ÜÇ... NE BOK YİYORSUNUZ... ÜÇ...» Selin tuşlara çöküyor: «Elektrik geldi! Şimdi o lanet şifreyi gireceğiz, çabuk!»" },
        { type: "flag", set: { vericiGuc: true } },
        { type: "stat", stat: "gurultu", delta: 10, note: "Sonar çanağı dönüyor — GÜRÜLTÜ arttı", noteKind: "alert" },
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
        { type: "narrate", text: "Bu paslı sonar konsolu şimdi önünde bir ölüm faturası gibi parıldıyor. İki ölümcül aşama var: Önce Buluntu’nun o duvardaki habis oymalarından çözdüğümüz o sembol dizisini panele kusacaksın, ardından radyoyu o 432 hertzlik canavar frekansın tam zıttına kilitleyeceksin." },
        { type: "narrate", text: "Selin konsolun üstüne abanmış, ağzından köpükler sızıyor: «Diziyi ben okuyorum, sen o lanet düğmelere basacaksın! Sıra şu: Üçgen-göz, Kıvrım, Dört-çentik ve Dalga... Bu o piçin dilinde 'GEBER' demek! Hazırsın de bana!»" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sembol", text: "Sembol dizisini gir (Selin okuyor)", next: "n_verici_sembol" },
      ],
    },

    n_verici_sembol: {
      cost: 1,
      events: [
        { type: "narrate", text: "Konsolun üstündeki sekiz adet çürümüş tuş... Her birinin üzerinde o delirtici oymalar var. Selin arkandan avazı çıktığı kadar bağırıyor. Eğer tek bir tuşa yanlış basarsan, Buluntu bunu beynine yapılacak bir lobotomi saldırısı olarak geri çevirecek." },
      ],
      interaction: {
        kind: "symbols",
        title: "BULUNTU'NUN DİLİ — 'SUS' DİZİSİNİ GİR",
        glyphs: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
        sequence: ["g5", "g4", "g6", "g7"],
        success: "n_sembol_ok",
        cancel: "n_verici",
        penalty: { akil: -15, gurultu: 10, text: "YANLIŞ TUŞ — Beyninde şimşekler çaktı! AKIL -15" },
      },
    },

    /* Buluntu diziliş girilince direniyor — gerilim anı */
    n_sembol_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Son sembole bastığın an konsol şifreyi yutuyor — Ve Buluntu etinin kesildiğini HİSSEDİYOR! Bütün mağara deprem oluyormuş gibi sarsılıyor; tavandan kafana taşlar, pislikler yağıyor, projektör lambaları çılgın gibi patlıyor. O uğultu artık bir anne sesi değil, kulaklarından kan getiren bir canavar çığlığı: «HAYIR— AİLE— BİZİ BIRAKMA— SAYMA DURMASIN—»" },
        { type: "stat", stat: "akil", delta: -10, note: "AKIL -10 — Canavar beynini tırmalıyor", noteKind: "alert" },
        { type: "waitTap" },
        { type: "ambient", text: "Tam o sırada sonar hattından Ece’nin hırıltılı, ağlamaklı sesi patlıyor telsizden: «Onu tutuyorum! Sonar ağından ters sinyal basıp beynini baskılıyorum, sana kalkan oluyorum — Ama kafam patlamak üzere, dayanamıyorum! Frekansı ayarla, BİTİR ŞU İŞİ!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Ece yok... Onu yukarıda bir yem gibi satmıştın. Koruyucu ters sinyal desteği gelmiyor! Buluntu’nun o devasa zihinsel ağırlığı doğrudan senin kafatasının içine çöküyor, beynin kan ağlıyor, tek başına dayanmak zorundasın!", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Selin seni yakasından tutup çılgın gibi sarsıyor, gözlerinden kan sızıyor: «Dağılma! Bilincini kaybetme! Son hamle — Lanet radyoyu ayarla! Vur şu piçi!»" },
      ],
      choices: [
        { id: "frekans", text: "Radyo frekansına geç", next: "n_verici_frekans" },
      ],
    },

    n_verici_frekans: {
      cost: 1,
      events: [
        { type: "narrate", text: "Semboller paneli kırmızı kırmızı yanıp sönüyor, konsol patlayacak gibi titriyor. Şimdi o son darbe: Radyonun ibresini Buluntu’nun 432 hertzlik ölüm dalgasını kıracak anti-frekansa getireceksin. Selin bağırıyor: «433.6’ya çek! Ben hesapladım, o et kütlesini bu çökertecek! Ama tek bir şansın var, ıskalarsan o dalga bizi kül eder!»" },
        { type: "narrate", text: "Ama sen o gizli ölü yayınları dinlemiştin... Kulağın o parazitin ritmini tanıyor. Selin’in o panikle 433.6 dediği yerde bir hata var; senin içgüdün, o yarım deliren beynin ibrenin 433.8’e oturması gerektiğini söylüyor. Kime güveneceksin? Kendi deliliğine mi, Selin’e mi?", if: { flag: "frekanslariDuydun", equals: true } },
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
        { type: "narrate", text: "Her şey hazır, parmağın o ölüm düğmesinin üzerinde. Ama tetiğe basmadan önce son bir kez... O iğrenç et yığınına bakıyorsun. O açık delikleriyle doğrudan senin ruhunun içine bakıyor. Ve o delirtici sayının altında, ilk kez başka bir his duyuyorsun: Vahşi, kadim bir yalnızlık. Milyonlarca yıl bu karanlık lağımda yapayalnız kalmış bir yaratık... İnsanları avlayıp et yığını yapması bir katliam değil, yalnız kalmamak için atılmış iğrenç bir çığlık olabilir mi? Sadece bir aile istiyor." },
        { type: "waitTap" },
        { type: "narrate", text: "Selin tırnaklarını omzuna geçirip seni sarsıyor: «Ne düşündüğünü biliyorum... O pisliğe acıma! O merhamet değil, onun senin beynine sıktığı son kurşun! Seni de o kovanın içine çekmeye çalışıyor! Kararını ver, sıfıra saniyeler kaldı!»" },
        { type: "narrate", text: "Sen o canavarın dilini yukarıda çözmüştün... Ve o an beyninde şimşek çakıyor: 'Üç' bir geri sayım değil! O bir kurban listesi! O bugüne kadar üç kez seslendi ve üç ruhu yuttu: Baturay, Deniz, Nevin. Sen o kovanın dördüncü duvarı olmayı reddeden ilk canlı et parçasısın.", if: { flag: "frekanslariDuydun", equals: true } },
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
        { type: "narrate", text: "Gözlerini kapatıp tetiğe basıyorsun! Konsol vahşi bir çığlıkla o anti-frekansı fırlatıyor! Bütün mağara ortadan ikiye bölünüyor sanki; o kadim duvarlar çatlıyor, kalan son lambalar bomba gibi patlıyor. Buluntu’nun o hipnotik sesi ilk kez değişiyor — O sakin sayı, yerini can çekişen vahşi bir hayvan ulumasına bırakıyor: «ÜÜÜÇÇÇ— ÜÜÜÇÇÇ— HAAAYYIIIRRR—»" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "waitTap" },
        { type: "narrate", text: "«Ölüyor! Can çekişiyor!» diye bağırıyor Selin, kulaklarından akan kanları silerek. «Ama frekans yetmiyor, tam gebermiyor! Son bir karar vermek zorundayız, şimdi!» O yaratığın can çekişirken yaydığı o son radyasyon dalgası tabletinin ekranını titretirken, önündeki o berbat yollar belikliyor." },
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
        { type: "narrate", text: "Frekans kilitleniyor, Buluntu’nun o et kütlesi kendi içine doğru büzülerek inliyor. Selin elini kavrıyor ama gitmeden önce son bir kez arkaya... O sığınaktaki üç taze mezara bakıyor. «Onları o etin içinde bıraktık...» diyor boğazı hırıldayarak. «Baturay’ı... O küçücük sübyanı... Nevin’i... Kurtaramadık onları.»" },
        { type: "waitTap" },
        { type: "ambient", text: "Tam o an Nevin’in o kurtardığın damarlı kökleri son bir can havliyle kıpırdıyor, size saldırmak için değil, Selin’in ayağının dibinden yukarıya, o karanlık merdivenlere doğru uzanarak size etten bir kaçış yolu inşa ediyorlar. Onları geride bırakmadın; onlar sizi yukarı taşıyor.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "«Ama sen buradasın...» diyor Selin, gözlerindeki kanlı yaşları silip sana bakarak. «Ve ben. İki canlı insan. Bu lanet delikte bu bir mucize... Koş! Onların anısı için koş!» Sığınağın ötesindeki o paslı yukarı giden merdivenler, tabletinin zayıflayan ışığı altında tek çıkış kapısı." },
      ],
      choices: [
        { id: "kac", text: "Selin'le yukarı, yüzeye koş", next: "n_son_yuzey" },
      ],
    },

    /* ===== SON 1: YÜZEY (en iyi) ===== */
    n_son_yuzey: {
      ending: true,
      events: [
        { type: "narrate", text: "Frekansı tamamen kilitliyorsun. Buluntu’nun o delirtici uğultusu sönen bir ocak gibi alçalıyor, hırıldıyor... Ve bitiyor. İlk kez, on bir uzun aydır ilk kez, bu lanet istasyon TAMAMEN sessizliğe gömülüyor. Sadece sizin nefes alışlarınız var." },
        { type: "waitTap" },
        { type: "ambient", text: "Sonar hattından Ece’nin hıçkırarak ağlama sesi geliyor: «Durdu... O piç kurusu sustu. Yukarı katlardaki işçiler uyanıyor... Gözlerindeki o kırmızılık gidiyor. Başardın... Tanrım, başardın!»" },
        { type: "narrate", text: "Selin elini sıkıca tutuyor: «Kaçış kapsülü K-1 komuta katında! İstasyon susmuşken tüm elektronik kilitler açık! KOŞ!» Birlikte yukarıya, o zifiri katlara doğru tırmanıyorsunuz. Elinde sadece o zayıf tabletin ışığı... Altı kat. Beş kat. Dört kat." },
        { type: "waitTap" },
        { type: "narrate", text: "Kaçış kapsülünün kalın camından arkaya baktığında, SINIR-1 o karanlık denizin dibinde ölü bir balık gibi küçülüyor. Selin yanındaki koltukta nefes nefese, hem ağlıyor hem gülüyor. Ece’nin parazitli sesi telsizden geliyor: «Yüzeyde görüşürüz, temiz havada...» Kafanın üstünde, yüzlerce metre yukarıda gerçek bir gökyüzü, gerçek yıldızlar var. Ve beyninin içinde artık hiçbir canavar saymıyor." },
        { type: "waitTap" },
        { type: "ambient", text: "Tam kapsül deniz yüzeyine fırlayacakken, kalın çelik gövdeye dışarıdan devasa bir şey çarpıyor. Bir kez. Sonra düzenli aralıklarla: Üç vuruş. Baturay’ın o yırtık günlüğündeki gibi... Ama bu ses İÇERİDEN gelmiyor. DIŞARIDAN, o karanlık okyanusun en dibinden vuruyor. Buluntu’yu susturdun; ama o et kütlesini bunca yıl orada besleyen, o gövdeye vuran devasa şey hâlâ orada... Ve artık onu besleyecek kimse kalmadı. O şey aç." },
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
        { type: "narrate", text: "Radyonun ibresini son kademeye kadar kırıyorsun — Konsolun içindeki trafolar patlıyor, yüzüne kıvılcımlar fışkırıyor. Selin çığlık atıyor: «Hayır! O kadar akım yüklenirsen o frekans senin de beynini eritir—» Ama elini düğmeden çekmiyorsun. O yaratığın tüm zehrini alıp kendi canın pahasına ona geri kusuyorsun!" },
        { type: "waitTap" },
        { type: "narrate", text: "Bütün mağara kör edici beyaz bir ışıkla kaplanıyor. Buluntu’nun o acı feryadı ile senin gırtlağından yükselen çığlık aynı frekansta birleşip havayı yakıyor. Onu hücrelerine kadar yok ediyorsun — Ama o devasa enerji patlaması senin de bedenini kayaya çiviliyor. Son hissettiğin, Selin’in seni kurtarmak için kapıya doğru çekiştirmesi ama senin onu itmen oluyor: «Git... Kendini kurtar...»" },
        { type: "waitTap" },
        { type: "ambient", text: "Selin kendini zar zor dışarı fırlatıyor ve kalın çelik kapak aranızda kapanıyor. Sen o beyaz cehennemin tam merkezinde kalıyorsun. O et kütlesi küle dönerken, zihnine son bir hediye bırakıyor: Artık kulaklarında ne parazit var ne de o lanet sayılar... Sadece mutlak, temiz bir sessizlik. Ve bu sessizlik sonsuza dek senin." },
        { type: "narrate", text: "Selin tek başına yüzeye çıkacak. İstasyon kurtuldu. Kimse aşağıda o canavarı kendi canıyla boğan o teknisyenin adını bilmeyecek... Ama o gece yüzeydeki herkes, göğsünde tuhaf bir hafiflikle uykusundan uyandı. Sanki biri onların yerine o ağır laneti taşımış ve feda olmuştu." },
        { type: "system", text: "— SON: SESSİZLİK —" },
        { type: "system", text: "Buluntu'yu yok ettin. Kendini feda ederek istasyonu — belki dünyayı — kurtardın. Selin kaçtı ve gerçeği anlatacak." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 3: DERİN (karanlık) ===== */
    n_son_derin: {
      ending: true,
      events: [
        { type: "narrate", text: "Artık direnecek tek bir hücren bile kalmadı. On bir ay süren bu klostrofobik kabus, altı katlık ceset yığınları ve bitmeyen ölümler... Ve Buluntu’nun beyninin içindeki o hileli sesi o kadar yumuşak, o kadar sıcak ki: «Üç... Bırak o tabletini... Üç... Burada hiç acı yok... Herkes burada, seni bekliyor...» Kasılan parmaklarını konsoldan yavaşça çekiyorsun." },
        { type: "waitTap" },
        { type: "narrate", text: "«Ne yapıyorsun?! Kendine gel, bas o düğmeye!» Selin’in o dehşet dolu çığlığı beyninin içinde giderek uzaklaşıyor, eriyor... O etsi kütleden yayılan o sıcak dalga ruhunu kaplarken ilk kez direnmiyorsun, kendini o ıslak akıntıya bırakıyorsun. Ve o sahte huzur... Tanrım, o kadar güzel ki. Aykut orada gülümsüyor. Nevin orada. Baturay, küçük Deniz... Hepsi el ele tutuşmuş. Aile." },
        { type: "narrate", text: "Selin arkasına bakıp dehşet içinde tek başına yüzeye kaçıyor, geride o kovanın yuttuğu bir kurban daha bırakarak. Sen o et kütlesinin bir hücresi oldun artık. Kendi adın yok, kendi bilincin yok; sen artık 'Biz'sin. Ve Biz o karanlıkta sabırla sayıyoruz... Sonsuza dek. Yukarıdan yeni bir et parçasının, elinde bir tabletle altı kat aşağı inip bizi bulmasını bekleyerek." },
        { type: "ambient", text: "«...Üç... İki... Üç... İki... Kardeşimiz geldi... Hoş geldin...»" },
        { type: "system", text: "— SON: DERİN —" },
        { type: "system", text: "Buluntu'ya katıldın. Acı bitti. Sen de artık Aile'densin — ve bir sonraki 'evladı' bekliyorsun." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 4: KAYIT (belgeleme) ===== */
    n_son_kayit: {
      ending: true,
      events: [
        { type: "narrate", text: "O canavarı susturmak yerine titreyen ellerinle tabletini havaya kaldırıyorsun. Kamerası yok, evet; ama o canavarın yaydığı tüm o habis ses frekanslarını, radyoaktif dalgaları, oymaların dijital haritasını — her şeyi o küçük tabletin hafızasına kazıyorsun. Baturay’ın o son sözü aklında: 'Her şeyi belgele.' Dünya bu pisliği görmeli! Bu lağımda çürüyen herkesin bir kanıtı olmalı!" },
        { type: "waitTap" },
        { type: "narrate", text: "«Ne bok yiyorsun sen?! Bırak o lanet cihazı, geri sayım bitiyor, KAÇMAMIZ GEREK!» diye yırtınıyor Selin. Ama sen parmaklarını ekrana vurarak kaydı durdurmuyorsun. Buluntu can çekişiyor ama ölmedi, geri sayım beyninin içinde son sürat devam ediyor. «İki» diyor o ses. Sonra «Bir»." },
        { type: "narrate", text: "Selin sana dehşet ve acıyla karışık son bir kez bakıp o tabletten aldığı veri kopyasıyla merdivenlere doğru fırlıyor. O kaçıyor, elinde o dünyayı sarsacak kanıtla. Sen burada kalıyorsun, o etin karşısında. Buluntu o son sayıyı fısıldarken tabletinin belleği doluyor ve veriyi yukarı fırlatıyor. Selin o kapıdan çıktığında dünya bu cehennemi öğrenecek... Senin sayende." },
        { type: "ambient", text: "Tabletinin sönen ekran ışığının yansımasında kendi yüzünü görüyorsun: Tamamen sakin. Baturay gibi. Görevini bitirmiş gerçek bir whistleblower gibi. Ve beyninin içindeki o etsi delik son kez fısıldıyor: «...Sıfır.»" },
        { type: "system", text: "— SON: KAYIT —" },
        { type: "system", text: "Kaçmadın — belgelemeyi seçtin. Öldün, ama Selin kanıtı yüzeye çıkardı. Gerçek artık saklanamaz. Baturay gurur duyardı." },
        { type: "system", text: "SINIR-1 · TEŞEKKÜRLER" },
      ],
    },

    /* ===== SON 5: SIFIR (başarısızlık — Ece yoksa) ===== */
    n_son_sifir: {
      ending: true,
      events: [
        { type: "narrate", text: "Selin’le birlikte o paslı merdivenlere doğru deli gibi atılıyorsunuz — Ama Ece yok! Sonar hattı zifiri bir sessizliğe gömülmüş; hangi koridor açık, hangi kapının kodu ne, güvenli rota neresi bilen hiçbir akıl yok arkada. Ece’yi K-5 katında o delilere yem etmiştin ve şimdi tam da can pazarında rehbersiz kaldınız." },
        { type: "waitTap" },
        { type: "narrate", text: "Tabletinin zayıflayan ışığı altında yanlış bir koridora sapıyorsunuz. Önünüzde kalın, hidrolik kilitli devasa bir çelik kapı... Açılmıyor! Çaresizce geri dönüyorsunuz ama arkadaki o et kütlesi beyninizin içinde «İki» diye böğürüyor artık! Titreşim o kadar güçlü ki kulaklarınızdan ve burnunuzdan sıcak kanlar sızıyor, çünkü onu susturamadınız. Selin kapının kolunu yumrukluyor: «Bir yol olmalı... Bir yol olmalı—» Ama yok. Burası kapalı." },
        { type: "narrate", text: "«Bir...» diye fısıldıyor o habis et kütlesi. Bütün istasyon, duvarlardaki tüm çelik yapılar canlanıp uğulduyor. Yukarı katlarda, yataklarında uyuyan tüm o zombi mürettebat aynı saniyede gözlerini fal taşı gibi açıyor — Hepsi birden ayağa kalkıyor. «Sıfır...»" },
        { type: "ambient", text: "Ve o an o ses duruyor. Çünkü artık beyninin içinde sayacak yabancı bir güç kalmamıştır. Herkes — Sen, yanındaki Selin, yukarıda etleri eriyen işçiler ve belki de telsizin ucundaki tüm o masum yüzey... Artık tek bir et parçasısınız. Tek bir devasa kovan. Tek bir sonsuz, sakin, içi tamamen boşaltılmış ölü bir zihin." },
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