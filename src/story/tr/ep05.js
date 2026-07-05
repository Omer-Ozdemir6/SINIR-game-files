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
        { id: "ilerle", text: "Kazının merkezine, Buluntu'ya doğru ilerle", next: "n_gecit" },
        { id: "sor", text: "\"Sıfıra ne kadar var?\" diye sor", next: "n_selin_sifir" },
      ],
    },

    n_selin_sifir: {
      cost: 1,
      events: [
        { type: "narrate", text: "«Bilmiyorum,» diyor Selin, dürüstçe. «Ben geldiğimde 'yedi' diyordu. Şimdi 'üç'. Günler mi, saatler mi — Buluntu'nun zamanı bizimki gibi akmıyor. Ama üçten sonra iki, ikiden sonra bir var. Ve bir'den sonra...» Durup kayaya bakıyor. «Acele etmemiz gerektiğini biliyorsun.»" },
        { type: "narrate", text: "Sen gizli frekansları dinlemiştin — Buluntu'nun sesini tanıyorsun. Selin'in bilmediğini biliyorsun: sayı düzenli değil. Hızlanıyor.", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      choices: [
        { id: "ilerle", text: "Merkeze ilerle", next: "n_gecit" },
      ],
    },

    /* ================= GEÇİT — BULUNTU'NUN ÖNÜ ================= */

    n_gecit: {
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
        { id: "kos", text: "Vericiye koş", next: "n_verici", if: { flag: "nevinKurtarildi", equals: true } },
        { id: "kos2", text: "Vericiye koş (aileden sayılıyorsun)", next: "n_verici", if: { flag: "sofraYedi", equals: true } },
        { id: "kos3", text: "Vericiye koş (Deniz yolu açtı)", next: "n_verici", if: { flag: "denizSoruldu", equals: true } },
        { id: "direncsiz", text: "Sayıya diren, iradenle geç", next: "n_gecis_irade" },
      ],
    },

    n_gecis_irade: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ne kökün ne aile bağın var — sadece iraden. Buluntu'nun sesi zihnine dolarken her adımı kendi adınla sayıyorsun, onun sayısını bastırmak için. Bir. İki. Üç — hayır, o değil, KENDİ üçün. Terli, titrek, ama insan kalarak platforma ulaşıyorsun." },
        { type: "stat", stat: "akil", delta: -15, note: "AKIL -15 — İradenle geçtin ama bedeli ağır", noteKind: "alert" },
      ],
      choices: [
        { id: "verici", text: "Verici platformuna ulaş", next: "n_verici" },
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
        success: "n_verici_frekans",
        cancel: "n_verici",
        penalty: { akil: -8, gurultu: 5, text: "YANLIŞ DİZİ — Buluntu öfkelendi, AKIL -8" },
      },
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
        success: "n_sustur",
        cancel: "n_verici_frekans",
      },
    },

    /* ================= SUSTURMA ANI — SON DALLANMASI ================= */

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
        { id: "yuzey", text: "Frekansı kilitle, Selin'le yüzeye kaç", next: "n_son_yuzey", if: { flag: "eceEleVerildi", equals: false } },
        { id: "feda", text: "Vericiyi aşır — Buluntu'yu tamamen yok et (kendini feda et)", next: "n_son_sessizlik" },
        { id: "katil", text: "Direnmeyi bırak — sayıya katıl, huzuru seç", next: "n_son_derin" },
        { id: "kayit", text: "Tableti kaldır, her şeyi kaydet (belgele)", next: "n_son_kayit" },
        { id: "yuzey_zor", text: "Selin'le kaçmayı dene (Ece desteği yok)", next: "n_son_sifir", if: { flag: "eceEleVerildi", equals: true } },
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
  k2Ilk: false,
};
