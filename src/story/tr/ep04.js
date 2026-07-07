/* ============================================================
   SINIR-1 — BÖLÜM 4: "K-3 / BAHÇE"  (tam sürüm)
   Katın sahibi: DR. NEVIN ARAS — biyolog, "bahçeye verilmiş".
   Buluntu'nun sporlarıyla bir bitki-varlığa dönüşmüş; ama içinde
   hâlâ bir insan kalıntısı var. Şef onu K-4'ten buraya sürmüştü.

   YENİ TEHDİT TİPİ: Nevin hareketsizdir ama HER YERDEDİR —
   kökleri tüm katı sarar. Sesle değil, İZLE avlanır: zemindeki
   spor yataklarına basarsan kökler titrer, yerini bulur. Yani
   tehlike gürültü değil; nereye BASTIĞIN.

   YENİ MEKANİK — SPOR/NEFES: bazı geçitler spor bulutuyla dolu;
   nefes tutmadan geçersen 'enfeksiyon' artar (gizli sayaç gibi
   akil üstünden işler). Temiz hava cepleri checkpoint'tir.

   PARÇA-KİLİT + KİMYA: Nevin'in tohum kasası üç ÖRNEK ister
   (mavi spor, kök özütü, Selin'in kan örneği). Üçü toplanınca
   laboratuvarda KİMYA bulmacası (mix) ile SERUM yapılır. Serum
   iki işe yarar: Nevin'i geçmek/uyutmak, ya da onu KURTARMAK.

   AHLAKİ SEÇİM (final): Nevin hâlâ kısmen insan.
   · Serumu ona ver → onu insanlığına döndür (zor yol, iz bırakır)
   · Serumu içip/kullanıp geç → hayatta kal, onu bırak (kolay yol)
   · Kompost yolundan kaç → Selin'in rotası (gizli, tehlikeli)

   TAŞINAN DURUM:
   · sofraYedi/sofraReddetti → Nevin seni "koklar"
   · eceEleVerildi → Ece'nin K-3 sonar desteği
   · denizSoruldu → arşiv bozulmasında Deniz'in izi
   ============================================================ */

export const EP04 = {
  nodes: {

    /* ================= GİRİŞ — SICAK KARANLIK ================= */

    n_k3_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k3" },
        { type: "system", text: "DEHŞET KATMANI: K-3 — TERK EDİLMİŞ SERA VE ET VE KÖK" },
        { type: "narrate", text: "Merdivenin dibinde seni boğucu, leş gibi kokan sıcak ve nemli bir zifiri karanlık karşılıyor. K-3 nefes alıyor... Ama ciğerlerle değil. Duvarlardan etli sülükler gibi sarkan kalın kökler sıvanmış, tavan damar gibi atan sarmaşıklarla kaplı. Adım attığın zemin, basılmaması gereken canlı bir deri gibi altından kayıyor. Elindeki tabletin soğuk, çiğ ekran ışığı bu çürümeden başka bir şeyi aydınlatmıyor. Işık yüzüne vururken karanlığın içinde tamamen savunmasız ve açık bir hedefsin." },
        { type: "narrate", text: "Buradaki her şey büyümüş ama hiçbir şey yaşamıyor. Kökler damar gibi atıyor, yapraklar deri gibi terliyor, çiçekler açmak yerine küçük ağızlar gibi aralanıp kapanıyor. K-3 doğa değil; laboratuvarın Tanrı’yı taklit etmeye çalışırken yaptığı düşük, yarım ve acı çeken bir kopya." },
        { type: "narrate", text: "Karanlığın derinliklerinden derisi yüzülmüş bir insanın iniltisini andıran hırıltılı bir kadın fısıltısı yayılıyor. Şarkı söylemiyor; çürüyen tohumlara çocuklarıymış gibi delice sayıklıyor: 'Selin... Selin nerede... Bebeğimi benden aldılar...'" },
        { type: "waitTap" },
        { type: "ambient", text: "Tabletinin hoparlöründen parazitler arasından Ece'nin titreyen sesi yükseliyor: «K-3'e indin... Tanrım, o koku buraya kadar geliyor. Nevin orada. Şef onu o şeye yem etti. Beni dinle, sakın basma! Ses çıkarmak umurunda değil, bastığın her kök direkt onun sinir ucuna bağlı. Nereye basarsan doğrudan üzerine çullanacak!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Karanlıkta sadece kendi ağır nefes alışın var. Telsiz hattı tamamen ölü. Ece'yi satmandan sonra K-3'ün bu yaşayan mezarında tamamen yapayalnızsın. Sadece hoparlörden gelen ölü bir cızırtı içindeki suçluluk duygusunu tırmalıyor.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Şef'in sofrasında yuttuğun o çiğ et midende adeta canlı gibi kasılıyor. Ve fark ediyorsun: sen yaklaştıkça duvardaki etli filizler aç kurtlar gibi sana doğru uzanıyor, titriyor... Şef'in ziyafetinin o iğrenç kokusunu aldılar. Seni tanıyorlar.", if: { flag: "sofraYedi", equals: true } },
        { type: "objective", text: "Hayatta kalmak için K-3 cehenneminden çıkış yolunu bul ve K-2 kazı alanına sığın." },
        { type: "note", id: "not_k3", title: "K-3: Canlı Mezar", text: "K-3 bir sera değil. Birinin acısını köklendirip kat planına çevirmişler. Nevin hâlâ burada; belki bedeninin yarısı, belki tamamı, belki de yalnızca kızının adını söyleyen kısmı. Ses çıkarmak sorun değil. Yere basmak sorun. Bu kat seni duymuyor, seni hissediyor." },
      ],
      choices: [
        { id: "ilerle", text: "Yosunun ince olduğu kenardan ilerle", next: "n_sera" },
      ],
    },

    /* ================= MERKEZ: SERA (HUB) ================= */

    n_sera: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Merkez sera: Üzerindeki devasa cam kubbe kırılmış, yukarıdan süzülen acil durumun kan kırmızısı ışığı etrafı cehennem tasvirine çeviriyor. Tam ortada, çürümüş toprağın ve et kütlelerinin içine yarı beline kadar gömülmüş, kımıldamayan o korkunç figür duruyor: Nevin. Omurgasından fırlayan kalın kökler tüm katın zeminine damarlar gibi pompalanıyor. Katın kalbi o, tüm bu ıstırabın kendisi... Etrafında zifiri karanlığa açılan beş tane ölümcül patika var.", if: { flag: "seraIlk", equals: false } },
        { type: "flag", set: { seraIlk: true } },
        { type: "status", items: [
          { label: "MAVİ SPOR", flag: "ornek1" },
          { label: "KÖK ÖZÜTÜ", flag: "ornek2" },
          { flag: "ornek3", label: "KAN ÖRNEĞİ" },
        ] },
        { type: "ambient", text: "Nevin kımıldamıyor ama boynu çıtırdayarak aç bir hayvan gibi hafifçe senin tabletinin ışığına doğru dönüyor. \"...Yeni bir et parçası...\" diye fısıldıyor kapalı, çürümüş göz kapaklarının arkasından. \"Yürü, küçük fide. Attığın her adımın sarsıntısı omuriliğimden beynime ulaşıyor. Kaçamazsın. Kökler sabırlıdır... Seni sindirmemi bekle.\"" },
      ],
      choices: [
        { id: "fide", text: "Fide fısıltılarının geldiği nemli odaya gir", next: "n_fide", if: { flag: "fideBitti", equals: false } },
        { id: "lab", text: "Cam kırıklı laboratuvara yönel", next: "n_lab" },
        { id: "su", text: "Su damlayan deponun geçidine gir (spor bulutu)", next: "n_su_gecit" },
        { id: "iklim", text: "Yanıp sönen sera iklim paneline bak", next: "n_iklim_panel", if: { flag: "iklimCozuldu", equals: false } },
        { id: "kompost", text: "Çürük kokan çukura yaklaş", next: "n_kompost_kapi" },
        { id: "kasa", text: "Nevin'in tohum kasasını açmayı dene", next: "n_kasa" },
      ],
    },

    /* YENİ: sera iklim paneli — colorgrid bulmacası (ışık spektrumu) */
    n_iklim_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "Seranın köşesinde, üzeri sümüksü bir sıvıyla kaplı eski bir iklim kontrol paneli can çekişiyor. Dokuz adet gösterge bozuk bir nabız gibi ritimsizce yanıyor. Bu yanlış spektrum yüzünden fideler mutasyona uğramış, adeta canlı insan uzuvlarına benzemişler. Panelin yanındaki paslı duvara Nevin pençeleriyle kazımış: 'Doğru spektrum canavarları uyutur. Kırmızı aç bırakır, mavi çürümeyi durdurur.' Eğer bu ışıkları doğru sıraya sokamazsan, kökler seni acımasızca parçalayacak." },
        { type: "note", id: "not_iklim", title: "İklim Paneli Çaresizliği", text: "Işık spektrumu delirme noktasında. Fideler insan eti gibi büyüyor. Eğer paneli maviye çekebilirsem, o iğrenç köklerin gerginliği sönecek ve bana bir parça nefes alma şansı tanıyacak." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "IŞIK SPEKTRUMU — CANAVARLARI UYUT",
        palette: ["#1a1a22", "#3a5a9a", "#5a9a6a", "#c2a24a"],
        target: [1,2,1, 2,1,2, 1,2,1],
        start:  [0,0,0, 0,0,0, 0,0,0],
        cols: 3,
        success: "n_iklim_cozuldu",
        cancel: "n_sera",
      },
    },

    n_iklim_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "IŞIK SPEKTRUMU: ÖLÜ MAVİ — GEÇİCİ SESSİZLİK" },
        { type: "narrate", text: "Kızıl ışık yerini soğuk, hastalıklı bir mavi spektruma bıraktığı an etraftaki etli kökler acı dolu bir tıslamayla gevşiyor. Duvarlardan sarkan sarmaşıklar sanki felç geçirmiş gibi yere yığılıyor. Nevin'in hırıltısı bile yavaşlıyor, ağır bir kış uykusuna çekiliyor. Bu lanet ölüm sessizliğini iyi kullan, çünkü sonsuza kadar sürmeyecek." },
        { type: "flag", set: { iklimCozuldu: true } },
        { type: "stat", stat: "akil", delta: 5, note: "PSİKOLOJİK RAHATLAMA +5 — Kökler uykuya daldı", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Seraya dön", next: "n_sera" },
      ],
    },

    /* ================= FİDE ODASI — örnek 1 (mavi spor) + lore ================= */

    n_fide: {
      cost: 1,
      events: [
        { type: "narrate", text: "Fide odası: Küf kokulu raflarda yan yana dizilmiş yüzlerce saksı... Ve her birinin içinden fırlayan, insan derisi renginde, kesik çocuk ellerine benzeyen solgun filizler titriyor. Ortadaki devasa saksıda ise parlayan, irin dolu bir çıban gibi şişmiş MAVİ bir spor kesesi nabız gibi atıyor. Bu, SINIR-1 biyoloji biriminin canlı doku üzerinde yaptığı o yasak deneyin ta kendisi." },
        { type: "document", open: false, doc: {
          id: "d_spor_test", title: "Biyolojik Uyum Testi — Mavi Spor",
          body: "BİRİM: K-3 Biyoloji / Kapalı Kök Ağı\nTEST: Spor kesesi temas protokolü\n\nGözlem 12-A: Spor bulutu solunduğunda deneklerde ilk 9 saniyede göz kanaması, 14 saniyede kontrolsüz kasılma, 31 saniyede deri altı filizlenme görüldü.\n\nGözlem 12-B: Nefesini tutan deneklerde spor yüzeyde kaldı. Panik anında alınan tek nefes bile köklenmeyi başlatmaya yetti.\n\nSONUÇ: Spor, akciğer dokusunu giriş kapısı olarak kullanıyor. Koruyucu maske yetersiz. Tek geçici yöntem: temas anında kontrollü nefes kesme ve aralıklı sessiz boşaltma.\n\nUYARI: Deneklerden biri ölmeden önce 'beni toprağa geri koymayın' cümlesini 46 kez tekrarladı." } },
        { type: "narrate", text: "Raflardan birinin üzerinde paslı, kana bulanmış bir ses kayıt cihazı kırmızı ışığını yakıp söndürüyor. Nevin'in henüz delirmeden önceki, korkudan titreyen insan sesi odada yankılanıyor:" },
        { type: "document", open: true, doc: {
          id: "d_nevin_kayit", title: "Dr. Nevin Aras — Gizli Ses Kaydı", style: "hand",
          meta: "— Odadaki Kanlı Kaydediciden —",
          body: "SES KAYDI DÖKÜMÜ — DR. NEVİN ARAS\nGİZLİLİK: K-3 BİYOLOJİ / OLAY SONRASI İNCELEME\n\nKayıt 01: Şef, K-2 arkeoloji ambarından canlı doku örneği getirdi.\nÖrnek 432 Hz çevresinde işitilebilir olmayan bir titreşim üretiyor.\nBitki dokuları bu titreşime yöneliyor. Personelde burun kanaması başladı.\n\nKayıt 09: Merhum kızımın uyku kaydı örneğe dinletildi. Doku,\nkayıttaki çocuk sesiyle geriye doğru saydı. Ses analizi birebir eşleşiyor.\nAçıklama yok. Kayıt odasında bulunan üç personel aynı anda ağladı.\n\nKayıt 14: H. Tekin disiplin gerekçesiyle beni K-3'te tuttu. Deri altında\nköklenme başladı. Selin kaçtı. Kompost dondurucusuna kan örneği bıraktım.\nFormül hâlâ çalışabilir.\n\nSon kayıt: Parmaklar işlevini yitirdi. Uçlarda dal benzeri sertleşme var.\nAğrı azaldı. Selin'in adını duyduğumda kökler hâlâ geri çekiliyor." } },
        { type: "note", id: "not_nevin_kayit", title: "Nevin'in Deliliği", text: "K-2'deki o yaratık insan seslerini taklit ediyor. Nevin'i delirtip bu seraya kurban etmişler. Selin adında biri kaçarken kompost yoluna kan bırakmış. Mavi spor, kök özütü ve o kan... Eğer ölmek istemiyorsam o serumu yapmak zorundayım." },
        { type: "waitTap" },
        { type: "narrate", text: "Mavi spor kesesini almak için elini o iğrenç saksıya sokman gerek. Dokunduğun an zehirli spor bulutu doğrudan yüzüne patlayacak. Nefesini tutmazsan ciğerlerin saniyeler içinde eriyecek." },
      ],
      choices: [
        { id: "al", text: "Mavi spor kesesini kop — nefesini tut", next: "n_fide_spor" },
        { id: "cik", text: "Şimdilik dokunma, çık", next: "n_sera" },
      ],
    },

    n_fide_spor: {
      events: [
        { type: "narrate", text: "Keseyi hızla koparıyorsun! Mavi, parıltılı ama ölümcül bir toz bulutu bir bomba gibi yüzüne patlıyor. Gözlerin asitle yıkanmış gibi yanıyor, boğazın hıçkırarak nefes almak için yırtılıyor ama havayı içine çekersen bu senin sonun olur. Dayanmak zorundasın!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9000, success: "n_fide_al", fail: "n_olum_spor" },
    },

    n_olum_spor: {
      death: true,
      deathText: "Gözlerin yuvalarından fırlayacak gibi oluyor ve dayanamayıp o zehirli mavi havayı ciğerlerine çekiyorsun. Boğazından aşağı kaynar kaynar dökülmüş gibi bir his yayılıyor. Kan kusarak yere yığılıyorsun. Son gördüğün şey, kendi teninin altından filizlenerek dışarı çıkan ince kökler oluyor. Nevin tepende beliriyor ve fısıldıyor: 'Aramıza hoş geldin, taze et...'",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fide_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "Zehirli bulut yavaşça havada dağılırken keseyi cebine tıkıp ağzını sıkıca kapatıyorsun. Göğsün patlayacak gibi, kalbin delice çarpıyor ama başardın. Mavi spor artık elinde." },
        { type: "flag", set: { ornek1: true, fideBitti: true } },
        { type: "note", id: "not_ornek1", title: "Örnek 1/3: İrinli Spor", text: "Yaratığın mavi spor kesesi bende. Geriye sadece kök özütü ve Selin'in kanı kaldı. Zaman daralıyor." },
      ],
      choices: [
        { id: "cik", text: "Fide odasından çık", next: "n_sera" },
      ],
    },

    /* ================= SU DEPOSU GEÇİDİ — örnek 2 (kök özütü) ================= */

    n_su_gecit: {
      cost: 1,
      events: [
        { type: "narrate", text: "Su deposuna giden koridor tamamen yoğun, parıltılı bir sis tabakasıyla kaplanmış. Görüş mesafen sıfır. Koridorun sonundaki kırık boru kavşağında, köklerden süzülen simsiyah, viskoz bir sıvı damlıyor: Kök özütü. Geçit çok uzun ve elindeki tabletin ışığı bu siste sadece bir duvar gibi geri yansıyor. Tek bir nefesle bu cehennemi boydan boya koşmak zorundasın." },
        { type: "alert", text: "ZEHİRLİ SPOR KORIDORU — Tek nefeste geçmezsen ciğerlerin parçalanacak!" },
      ],
      choices: [
        { id: "gec", text: "Nefesini tut, geçidi koş", next: "n_su_nefes" },
        { id: "geri", text: "Geri çekil, başka yol ara", next: "n_sera" },
      ],
    },

    n_su_nefes: {
      events: [
        { type: "narrate", text: "Ciğerlerine alabildiğin kadar temiz hava doldurup o yoğun sisin içine atılıyorsun! Koridorda hiçbir şey görünmüyor, sadece ayaklarının altındaki sümüksü köklere takılmamaya çalışarak delice ileriye koşuyorsun. Sporlar yüzüne, gözlerine yapışıyor. Göğsün daralıyor, zihnin pes et diye haykırıyor!" },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9000, success: "n_su_depo", fail: "n_olum_spor" },
    },

    n_su_depo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Koridorun sonuna ulaştığında kendini temiz hava olan küçük bir odaya fırlatıyor ve dizlerinin üstüne çöküp vahşi bir hayvan gibi soluyorsun. Su deposu odası... Dev tankların üzerini kalın damarlar sarmış. Borudan akan o katran karası kök özütünü yerdeki paslı bir şişeye dolduruyorsun." },
        { type: "flag", set: { ornek2: true } },
        { type: "note", id: "not_ornek2", title: "Örnek 2/3: Siyah Özüt", text: "İkinci bileşeni aldım. Tankların birinin içinde bir şey var... Korkunç." },
        { type: "ambient", text: "Tanklardan birinin kalın camına elindeki tabletin ışığını tutuyorsun. İçeride, suyun içinde çürümüş bir kadına ait el izi var. Tırnaklarıyla camı delicesine tırmalamış... Boğulurken can çekiştiği anın izi." },
      ],
      choices: [
        { id: "geri", text: "Nefesini toparla, geçidi geri koş", next: "n_su_geri" },
      ],
    },

    n_su_geri: {
      events: [
        { type: "narrate", text: "Son bir kez daha derin bir nefes alıp o kabus gibi parıldayan sis bulutunun içine dalıyorsun. Bu sefer geri dönmek için. Zaman algın kayboluyor, ciğerlerin isyan ediyor!" },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_sera", fail: "n_olum_spor" },
    },

    /* ================= KOMPOST — örnek 3 (kan) + Selin + ölüm ================= */

    n_kompost_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kompost çukuru: Katın en altındaki devasa lağım ve çürüme havuzu. Kokusu o kadar ağır ki burnundan beynine bir bıçak saplanıyor gibi hissediyorsun. Burası istasyonun başarısız deneyleri, atık dokuları ve kayıtsız cesetleri fırlattığı bir kuyu. Nevin'in bahsettiği Selin'in kanı bu yolun üzerinde bir yerde olmalı. Çukurun kenarında, balçıkla kaplı tehlikeli bir patika uzanıyor." },
        { type: "alert", text: "Kompost gazı halüsinasyonlara sebep olur, zemin tamamen ceset parçalarıyla kaplı ve kaygan!" },
      ],
      choices: [
        { id: "gecit", text: "Kenardaki dar geçitten ilerle", next: "n_kompost_gecit" },
        { id: "cukur", text: "Çukurun içine, atılanların arasına in", next: "n_olum_kompost" },
        { id: "geri", text: "Geri çekil", next: "n_sera" },
      ],
    },

    n_olum_kompost: {
      death: true,
      deathText: "Çukurun içine adım atıyorsun ama bastığın şey zemin değil! Yarı çürümüş, sülük gibi kaynaşan insan bedenlerinden oluşan canlı bir bataklık... Seni hızla aşağıya doğru çekiyorlar. Çığlık atmaya çalışıyorsun ama ağzına dolan o pis gaz ve balçık seni boğuyor. Kompost havuzu seni yutuyor; sen de bu katın çürüyen gübrelerinden biri oluyorsun.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_kompost_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Daracık, kaygan geçitte ilerlerken duvara gizlenmiş küçük bir sığınak buluyorsun. Yırtık pırtık bir tulum, etrafa saçılmış paslı konserve kutuları ve köşede hafifçe vızıldayan tıbbi bir soğutucu çanta... Çantayı açtığında buz akülerinin arasında donmak üzere olan bir tüp dolusu taze insan kanı ve titrek bir el yazısıyla yazılmış bir not buluyorsun. Selin... Kaçmadan önce buraya sığınmış." },
        { type: "flag", set: { ornek3: true } },
        { type: "document", open: true, doc: {
          id: "d_selin", title: "Selin'in Kanlı Notu", style: "hand",
          meta: "— Parçalanmış Soğutucu Çantadan —",
          body: "Bunu her kim bulduysa...\n\nBenim adım Selin. Eğer bu çantayı bulduysan Nevin hâlâ kapıda bekliyor olabilir.\nO beni ölen kızı sandı. Bunu yazarken bile bu cümlenin bana sağladığı\nhayattan utanıyorum. Beni korudu, çünkü artık kim olduğumu değil, kimi\nkaybettiğini görüyor.\n\nKanımı buraya bıraktım. Formül:\nMavi spor + kök özütü + benim kanım.\nOran: 1 / 2 / 3.\nYanlış karışım onu öldürmez. Keşke öldürse. Yanlış karışım Nevin'in içinde\nkalan son insan parçasını da köklere teslim eder.\n\nBen K-2'ye iniyorum. Buluntu orada. Bütün bu ailenin, saymanın, uykuda\nkonuşan ölülerin kaynağı orada.\n\nBeni arama. Ama serumu yaparsan önce Nevin'i kurtar.\nO bu cehennemin doktoru değildi. İlk hastasıydı.\n\n— S." } },
          { type: "note", id: "not_selin", title: "Son Parça ve Tarif", text: "Selin kendi kanını soğutucu çantada bırakmış. Nevin onu kızı sandığı için hayatta tutmuş. Bu tesisin en merhametli hareketi bile bir deliliğin yan etkisi. Tarif net: 1 spor, 2 özüt, 3 kan. Yanlış karışım Nevin'i öldürmeyecek; onu tamamen burada bırakacak. Bunu yaparsam hata yapma hakkım yok." },
        { type: "objective", text: "Üç hayati örneği laboratuvara ulaştır ve hatasız serumu üret." },
      ],
      choices: [
        { id: "geri", text: "Geçitten seraya dön", next: "n_sera" },
      ],
    },

    /* ================= LABORATUVAR — serum (kimya bulmacası) ================= */

    n_lab: {
      cost: 1,
      events: [
        { type: "narrate", text: "Laboratuvardan geriye tam bir yıkım kalmış: Devrilmiş dolaplar, yerlerde kırık tüpler ve her yeri kaplamaya başlayan kılcal damarlar... Masanın üzerinde Nevin'in insanken duvara kanla kazıdığı o tarif duruyor. Ama elinde malzemeler yoksa bu sadece bir ölüm fermanı.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "Laboratuvar tezgâhındasın. Tabletinin ışığını masaya sabitledin. Üç ölümcül parça da önünde duruyor: Mavi spor, siyah özüt ve Selin'in kanı. Şimdi bu kimyasal dehşeti tam oranında birleştirmen gerek. Tek bir miligramlık hata Nevin'i tamamen delirtecek.", if: { flag: "ornek3", equals: true } },
        { type: "document", open: true, if: { flag: "labTarif", equals: false }, doc: {
          id: "d_tarif", title: "Duvara Kazınmış Formül", style: "hand",
          meta: "— Nevin'in Kendi Kanıyla Yazdığı Formül —",
          body: "PANZEHİR — Hücresel Geri Çekilme\n\nÇok hassas oran. Yanlış karışım öldürmez, ÖLÜMDEN DAHA KÖTÜ bir şeye sebep olur.\n\n  MAVİ SPOR ...... 1 ÖLÇÜ (Hücre baskılayıcı)\n  KÖK ÖZÜTÜ ...... 2 ÖLÇÜ (Taşıyıcı katran)\n  KAN ............ 3 ÖLÇÜ (Bağlayıcı hayat özü)\n\nSıra önemsiz, ORAN mutlak olmalı. Toplam 6 ölçü. Kan az olursa etkisiz kalır. Spor fazla olursa canavarı besler. Dikkat et!" } },
        { type: "flag", set: { labTarif: true } },
      ],
      choices: [
        { id: "yap", text: "Serumu karıştır", next: "n_lab_mix", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "Önce üç örneği topla (eksik)", next: "n_sera", if: { flag: "ornek3", equals: false } },
        { id: "cik", text: "Laboratuvardan çık, seraya dön", next: "n_sera", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_lab_mix: {
      cost: 1,
      events: [
        { type: "narrate", text: "Ellerin korkudan ve titremekten tüpleri sabitleyemiyor. Formül net: 1 spor, 2 özüt, 3 kan. Toplam 6 ölçü. Gözlerini karart ve şırıngayı doldur. Hata yaparsan odadan canlı çıkamazsın." },
      ],
      interaction: {
        kind: "mix",
        title: "KABUS KARIŞIMI — ORANI TUTTUR (1 SPOR · 2 ÖZÜT · 3 KAN)",
        bottles: [
          { id: "spor", label: "SPOR", color: "#4a6ac2" },
          { id: "ozut", label: "ÖZÜT", color: "#4aa26a" },
          { id: "kan", label: "KAN", color: "#a23a3a" },
        ],
        target: { spor: 1, ozut: 2, kan: 3 },
        success: "n_serum_hazir",
        cancel: "n_lab",
        penalty: { gurultu: 6, text: "KORKUNÇ HATA — Tüp patladı, odaya asit gazı yayıldı. GÜRÜLTÜ +6" },
      },
    },

    n_serum_hazir: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "SERUM ÜRETİLDİ: Altın sarısı, parıldayan bir şırınga dolusu hayat." },
        { type: "narrate", text: "Şırınganın içindeki altın sıvı tabletinin ışığında parıldıyor. Selin'in vasiyeti 'Nevin'i kurtar' diyordu. Ama bu serum, Nevin'in seni parçalamasını engellemek için tek kaçış biletin de olabilir. Seçim anı yaklaşıyor." },
        { type: "flag", set: { serumHazir: true } },
        { type: "battery", spares: 1 },
        { type: "objective", text: "Seraya geri dön ve kaderini tayin edecek o canavarla yüzleş." },
      ],
      choices: [
        { id: "sera", text: "Seraya dön", next: "n_kasa" },
      ],
    },

    /* ================= TOHUM KASASI — parça kilidi (örnekler) ================= */

    n_kasa: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nevin'in tohum kasası: Kalın köklerin arkasına gizlenmiş çelik bir SINIR-1 güvenlik kabini. Üzerinde biyometrik üç adet yuva var ama parmak izi değil, kanlı canlı ÖRNEK istiyorlar. Kasa açılırsa içindeki K-2 anahtar kartını alabilirsin. Durumun ne?" },
        { type: "alert", text: "SİSTEM KİLİTLİ — Malzemeler eksik! Mavi spor, kök özütü ve kanı bulmadan bu çelik kapı açılmaz.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "Üç örneği de kullandın ve serumu yaptın. Kasanın üzerindeki köklü okuyucu mekanizma, şırıngadaki altın sıvıya doğru aç bir sülük gibi uzanıyor. Serumu bir anahtar gibi kabul edecek.", if: { flag: "serumHazir", equals: true } },
        { type: "narrate", text: "Üç örnek de cebinde ama henüz kimya masasına dokunmadın. Bu ham malzemeleri doğrudan kasaya kurban edip kartı alabilirsin ama o zaman Nevin'i kurtaracak bir serumun asla olmayacak. Karar ver.", if: { flag: "ornek3", equals: true, }, },
      ],
      choices: [
        { id: "serum_ac", text: "Serumu okuyucuya değdir, kasayı aç", next: "n_kasa_acik", if: { flag: "serumHazir", equals: true } },
        { id: "lab_git", text: "Önce laboratuvarda serumu yap", next: "n_lab", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "Eksik örnekleri aramaya dön", next: "n_sera", if: { flag: "ornek3", equals: false } },
      ],
    },

    n_kasa_acik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "GÜVENLİK KASASI AÇILDI — Çelik hidrolik tıslayarak aralandı." },
        { type: "narrate", text: "Kasanın ağır kapağı açılıyor. İçeride K-2 asansör iniş kartı, iki adet dolu pil ve Nevin'in tamamen insan aklıyla yazdığı son mektup duruyor." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { inisKarti: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_nevin_son", title: "Nevin'in Son İtirafı", style: "hand",
          meta: "— Çelik Kasanın Tabanından —",
          body: "Eğer bu yazıyı okuyorsan o altın sıvıyı yapmayı başarmışsın demektir. Beni bu etten hapishaneden çekip çıkarabilir.\n\nAma sana dürüst olacağım: Geri dönmek istiyor muyum, emin değilim. Kök olmak... Duyguların olmaması, korkunun bitmesi demek. Bu istasyonun cehenneminde insan kalmak saf acıdan başka bir şey değil.\n\nSeçim senin. Beni uyandır ve ikimiz de bu istasyonun vahşetini çekmeye devam edelim... Ya da beni burada bırak, bu katın bir parçası olarak çürüyeyim.\n\nNe yaparsan yap, K-2'ye in. Selin orada. O yaratık orada. Bu kabus orada bitecek.\n\n— N." } },
        { type: "objective", text: "Nevin ile son kez yüzleş ve K-2 cehennemine giden kapıyı aç." },
      ],
      choices: [
        { id: "yuzles", text: "Sera merkezine, Nevin'e git", next: "n_final" },
      ],
    },

    /* ================= FİNAL — NEVİN'LE YÜZLEŞME (ahlaki seçim) ================= */

    n_final: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Sera merkezi... Nevin, toprağa gömülmüş etten bir kütle halinde orada duruyor. K-2'ye giden ağır demir kapı tam onun arkasında; geçmek için bu canavarın dibine kadar sokulmak zorundasın. Tabletinin çiğ ışığı yüzüne vurduğu an yeşil, fosforlu, irinli gözlerini yavaşça açıyor. Bakışlarında tarifsiz bir insan yorgunluğu ve delilik var." },
        { type: "narrate", text: "\"Serumu kokluyorum...\" diye inliyor, ağzından sümüksü sıvılar dökülerek. \"Selin'in kanı... Hâlâ taze, hâlâ sıcak.\" Etraftaki devasa kökler bir kırbaç gibi havaya kalkıyor, etrafını sarıyor ama henüz darbe indirmiyor. \"Karar ver, küçük böcek. Bu acıyı bitirecek misin, yoksa beni bu kabusa mahkum mu edeceksin?\"" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtar", text: "Serumu Nevin'e ver — onu kurtarmayı dene", next: "n_final_kurtar" },
        { id: "gec", text: "Serumu kendine sakla, yanından sıvışıp geç", next: "n_final_gec" },
        { id: "kompost_kac", text: "Kompost yolundan kaç (Selin'in rotası)", next: "n_final_kompost", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_final_kurtar: {
      cost: 1,
      events: [
        { type: "narrate", text: "Gözlerini kapatıp ileri fırlıyorsun ve şırıngayı Nevin'in boynundaki en kalın, atan damara saplıyorsun! Altın sıvı damarlarına pompalandığı an odada kulakları sağır eden bir çığlık kopuyor — hem bir insan kadının hem de can çekişen bir canavarın feryadı! Kökler çılgına dönmüş gibi duvara vuruyor, Nevin'in yüzü bir anlığına pürüzsüzleşiyor ve tamamen insan oluyor." },
        { type: "stat", stat: "akil", delta: 10, note: "AKIL SAĞLIĞI +10 — İnsanlığını kaybetmedin", noteKind: "system" },
        { type: "flag", set: { nevinKurtarildi: true } },
        { type: "waitTap" },
        { type: "narrate", text: "\"...Teşekkür ederim...\" diye fısıldıyor Nevin, ağlayarak. Gerçek, yumuşak bir insan sesiyle. \"Çok geç... Benim için çok geç ama... En azından acımı bitirdin.\" Kökleri tamamen kuruyup un ufak olurken arkasındaki ağır demir kapı büyük bir gürültüyle açılıyor. \"Selin'i bul... Ona iyi bir anne olmaya çalıştığımı söyle...\"" },
        { type: "ambient", text: "Nevin'in bedeni çürümüş bir yaprak gibi toprağa karışıyor. K-3 katındaki o lanet bitki kokusu uçup gidiyor. Kat nihayet tamamen sessiz ve ölü.", if: { flag: "eceEleVerildi", equals: false } },
      ],
      choices: [
        { id: "in", text: "K-2 kapağını aç, in", next: "n_k3_son" },
      ],
    },

    n_final_gec: {
      cost: 1,
      events: [
        { type: "narrate", text: "Serumu cebinde saklıyorsun, onu harcayamazsın; o senin tek hayatta kalma garantin. Tabletinin ışığını kapatıp, nefesini tamamen tutarak Nevin'in canavarca köklerinin altından bir fare gibi süzülüyorsun. \"...Gidiyorsun...\" diye fısıldıyor arkandan, sesi derinden ve kırgın geliyor. \"Herkes gibi... Aşağıya... Ölüme gidiyorsun...\"" },
        { type: "flag", set: { nevinBirakildi: true } },
        { type: "stat", stat: "sefFarkindalik", delta: -5 },
        { type: "narrate", text: "K-2 kapısına ulaşıp kendini koridora atıyorsun. Arkana baktığında Nevin'in gözlerini tekrar kapattığını, o etten karanlığa gömüldüğünü görüyorsun. Bir insanı arkada böyle çürümeye bırakmak zihnini sonsuza kadar tırmalayacak. Ama şimdilik hayattasın." },
      ],
      choices: [
        { id: "in", text: "K-2 kapağını aç, in", next: "n_k3_son" },
      ],
    },

    n_final_kompost: {
      cost: 2,
      events: [
        { type: "narrate", text: "Nevin'in o korkunç yüzünü görmeye cesaret edemiyorsun ve Selin'in kaçtığı o lağım pisliği kokan kompost yoluna geri dönüyorsun. Burası leş gibi kokan, daracık ve zehirli gazlarla dolu bir dehliz. Ama Nevin'in kökleri bu ölü bölgeye sızamamış. Tamamen karanlıkta, sürünerek ilerliyorsun." },
        { type: "narrate", text: "Dehlizin sonunda, insan pisliklerinin ve kimyasalların biriktiği yerde K-2'ye açılan paslı bir tahliye borusu buluyorsun. Selin'in çamura batmış ayak izleri hâlâ taze. Ancak borudan sızan gaz ciğerlerini bir alev gibi yakıyor; acele etmezsen burada boğulacaksın!" },
        { type: "flag", set: { selinRotasi: true } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL SAĞLIĞI -8 — Boğucu Gaz Solundu", noteKind: "alert" },
      ],
      choices: [
        { id: "in", text: "Gizli tahliyeden K-2'ye in", next: "n_k3_son" },
      ],
    },

    /* ================= BÖLÜM SONU ================= */

    n_k3_son: {
      cost: 1,
      events: [
        { type: "system", text: "K-2 TAHLİYE KAPISI AÇILDI" },
        { type: "narrate", text: "Kapı ağır ağır açılıyor ve aşağıdan yüzüne çarpan hava tüylerini diken diken ediyor... Buz gibi, mineral kokan, antik bir hava. Burası artık istasyonun beton duvarları değil; burası doğrudan yerin altına, kadim kayaların içine oyulmuş devasa bir maden ve kazı sahası. Delilik burada başladı." },
        { type: "waitTap" },
        { type: "ambient", text: "Tablet ekranı cızırdayarak Ece'nin ağlamaklı sesini veriyor: «K-2'ye iniyorsun... Tanrım, orası asıl cehennem. Orada ne olduğunu istasyon yönetimi bile kontrol edemedi. Buluntu orada... Selin orada... Lütfen dikkat et. Ve... beni Şef'e satmadığın, beni koruduğun için teşekkür ederim. Yaşa lütfen.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Tabletinin ekranı son bir kez güçlüce titriyor, parazit yapıyor ve tamamen sessizliğe gömülüyor. Ece'yi satmıştın; yerin kilometrelerce altındaki bu zifiri karanlık madende artık çığlıklarını duyacak hiç kimse yok. Tamamen yapayalnızsın. Sadece tabletinin soğuk ışığı ve sen.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Ve aşağıdan, o simsiyah kayalıkların derinliklerinden, bozuk bir çocuk frekansıyla o ses yükseliyor. Artık çok net, artık tam kulağının dibinde: «...Üç... İki...» Buluntu geri sayımını sürdürüyor. Ve sıfıra neredeyse hiçbir şey kalmadı.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "ambient", text: "Ve aşağıdan, dipsiz karanlığın içinden mekanik, devasa bir metalin kalp atışını andıran bir titreşim dalgası yayılıyor. Bu bir canlı değil. Bu bir sayaç. Ve son saniyelerine yaklaşıyor.", if: { flag: "frekanslariDuydun", equals: false } },
        { type: "narrate", text: "Önündeki paslı merdiven kayalığın içindeki o dipsiz, mutlak karanlığa doğru iniyor. Beş kat geçtin, geriye sadece tek bir kat kaldı. Ve o son katta, lanetin kaynağında, Buluntu seni karşılamak için sabırsızlanıyor." },
        { type: "system", text: "— BÖLÜM 4 TAMAMLANDI: BAHÇENİN ÇÜRÜYÜŞÜ —" },
        { type: "system", text: "K-2: 'BULUNTU' — KAÇIŞ VEYA ÖLÜM — ÇOK YAKINDA" },
      ],
      choices: [
        { id: "k2", text: "K-2'ye in", next: "n_k2_giris" },
      ],
    },

  },
};

export const EP04_FLAGS = {
  iklimCozuldu: false,
  seraIlk: false, fideBitti: false,
  ornek1: false, ornek2: false, ornek3: false,
  labTarif: false, serumHazir: false, inisKarti: false,
  nevinKurtarildi: false, nevinBirakildi: false, selinRotasi: false,
};
