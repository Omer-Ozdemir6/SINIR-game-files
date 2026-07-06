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
        { type: "system", text: "KAT: K-3 — BİYOLOJİ · SERA · SU GERİ KAZANIMI" },
        { type: "narrate", text: "Merdivenin dibinde sıcak, nemli bir karanlık seni karşılıyor. K-3 nefes alıyor — ama akciğerlerle değil. Duvarları kökler sarmış, tavandan etli sarmaşıklar sarkıyor, zemin yer yer nabız gibi atan yumuşak bir yosunla kaplı. Bir sera; ama içinde yetişen şey bitki değil." },
        { type: "narrate", text: "Uzaktan bir kadın sesi geliyor — şarkı değil, fısıltı; bitkilere bir şeyler anlatıyor, tek tek, sabırla. Ara sıra bir isim: 'Selin... Selin nerede...'" },
        { type: "waitTap" },
        { type: "ambient", text: "Tabletinin sonar hoparlörü canlanıyor: «K-3'e indin. Nevin orada — biyolog. Duydun mu beni? Kökler her yerde; nereye bastığına dikkat et. O seni ayak izinden bulur, sesinden değil.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Sonar hattı sessiz. Ece hâlâ küs — ama K-3'ün nemli havasında, çok kısık, bir kez cızırdıyor. Belki hâlâ dinliyordur. Belki.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Karnındaki lokma hâlâ ağır. Ve fark ediyorsun: bitkiler sen geçerken sana DOĞRU kıvrılıyor — Şef'in yemeğini yiyen birini kokluyorlar.", if: { flag: "sofraYedi", equals: true } },
        { type: "objective", text: "K-3'ten aşağı, K-2'ye inen yolu bul" },
        { type: "note", id: "not_k3", title: "K-3: Bahçe", text: "Kat bir seraya dönüşmüş. Dr. Nevin burada — biyolog, 'bahçeye verilmiş'. Kökler her yeri sarmış; Ece dedi ki o beni AYAK İZİMDEN buluyor, sesimden değil. Yerdeki spor yataklarına basmamalıyım." },
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
        { type: "narrate", text: "Merkez sera: dev bir kubbe, kırık cam panellerinden K-3'ün kızıl acil ışığı süzülüyor. Ortada, toprağa yarı gömülü, kımıldamayan bir figür — Nevin. Sırtından kökler fışkırıp zemine dalıyor; o katın kalbi, katın kendisi. Etrafında beş patika, her biri bir bölüme.", if: { flag: "seraIlk", equals: false } },
        { type: "flag", set: { seraIlk: true } },
        { type: "status", items: [
          { label: "MAVİ SPOR", flag: "ornek1" },
          { label: "KÖK ÖZÜTÜ", flag: "ornek2" },
          { label: "KAN ÖRNEĞİ", flag: "ornek3" },
        ] },
        { type: "ambient", text: "Nevin kımıldamıyor ama başı hafifçe sana dönük. \"...Yeni fide,\" diyor, gözleri kapalı. \"Yürü, yavrum. Nereye bastığını hissediyorum. Acele etme. Kök sabırlıdır.\" Beş patika: fide odası, laboratuvar, su deposu, kompost, ve tohum kasası." },
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
        { type: "narrate", text: "Seranın bir köşesinde, köklerin henüz sarmadığı bir iklim kontrol paneli. Dokuz gösterge, her biri bir ışık spektrumunu temsil ediyor ama hepsi yanlış renkte yanıyor — bu yüzden fideler çıldırmış, insan tenine benzemiş. Panelin yanında Nevin'in eski, insani el yazısı: 'doğru spektrum onları uyutur. kırmızı büyütür, mavi durdurur.' Renkleri doğru desene getirirsen bu bölümdeki kökler bir süreliğine uyuşur." },
        { type: "note", id: "not_iklim", title: "Sera iklim paneli", text: "Seranın ışık spektrumu paneli yanlış ayarlı — bu yüzden fideler kontrolden çıkmış. Nevin'in notu: doğru spektrum kökleri uyutur (mavi durdurur, kırmızı büyütür). Doğru desene getirirsem kökler uyuşur, geçişim güvenli olur." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "IŞIK SPEKTRUMU — DOĞRU DESENİ AYARLA",
        palette: ["#1a1a22", "#3a5a9a", "#5a9a6a", "#c2a24a"],
        // 3x3 = 9 hücre; hedef: mavi baskın (uyutucu) desen
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
        { type: "system", text: "IŞIK SPEKTRUMU: MAVİ — UYUTUCU" },
        { type: "narrate", text: "Spektrum maviye döndüğü an sera değişiyor: köklerin gerilimi çözülüyor, sarmaşıklar gevşiyor, fideler başlarını eğip uykuya dalıyor. Nevin'in bile nefesi yavaşlıyor. Bir süreliğine bahçe, sadece bir bahçe. Bu pencereyi iyi kullan." },
        { type: "flag", set: { iklimCozuldu: true } },
        { type: "stat", stat: "akil", delta: 5, note: "AKIL +5 — Bahçe sakinleşti", noteKind: "system" },
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
        { type: "narrate", text: "Fide odası: raf raf saksı, her birinde solgun, insan tenine yakın renkte filizler. Bazıları küçük ellere benziyor. Ortadaki en büyük saksıda parlak MAVİ bir spor kesesi nabız gibi atıyor — Buluntu'nun tohumu, Nevin'in en değerli 'çocuğu'." },
        { type: "narrate", text: "Rafın birinde bir ses kaydedici, hâlâ çalışıyor. Nevin'in eski sesi — insan sesi — dökülüyor." },
        { type: "document", open: true, doc: {
          id: "d_nevin_kayit", title: "Dr. Nevin — Ses Kaydı Dökümü", style: "hand",
          meta: "— fide odasındaki kaydediciden —",
          body: "Kayıt 1: Şef 'Buluntu'dan bir örnek verdi.\nK-2'den. Canlı doku. Sesle iletişim kuruyor —\n432 hertz. Bitkiler ona tepki veriyor. İnsanlar da.\n\nKayıt 9: Kızımın uyku kayıtlarını dinlettim ona.\nBuluntu sayıyor artık. Altı, beş, dört... Kızımın\nsesiyle. Onu geri getirdi sandım. Aptaldım.\n\nKayıt 14: Direniyorum. Şef beni 'bahçeye'\nvermek istiyor. Ama Selin kaçtı — kızım gibi\nolan tek kişi. Ona bir kan örneği bıraktım,\nkompost yolunda. Panzehir onunla yapılır.\n\nKayıt son: Artık dallarım var. Fena değil.\nBüyüyorum. Sadece... Selin'i bulamıyorum." } },
        { type: "note", id: "not_nevin_kayit", title: "Nevin'in dönüşümü", text: "Nevin, Buluntu'nun K-2'den gelen canlı örneğiyle deney yapmış — 432 Hz, sayma, hepsi ondan. Kızının uyku kayıtlarını dinletmiş (bu KATMAN lore'uyla örtüşüyor). Selin diye biri kaçmış; Nevin ona kompost yolunda bir kan örneği bırakmış — 'panzehir onunla yapılır'. Panzehir = serum." },
        { type: "waitTap" },
        { type: "narrate", text: "Mavi spor kesesini almak için saksıya uzanman gerek — ama dokunduğun an bir spor bulutu salacak. Nefesini hazır tut." },
      ],
      choices: [
        { id: "al", text: "Mavi spor kesesini kop — nefesini tut", next: "n_fide_spor" },
        { id: "cik", text: "Şimdilik dokunma, çık", next: "n_sera" },
      ],
    },

    n_fide_spor: {
      events: [
        { type: "narrate", text: "Keseyi koparıyorsun — mavi spor bulutu yüzüne patlıyor. Nefesini tutuyorsun; gözlerin yanıyor, ciğerlerin temiz hava için haykırıyor ama nefes alırsan sporları içine çekersin." },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9000, success: "n_fide_al", fail: "n_olum_spor" },
    },

    n_olum_spor: {
      death: true,
      deathText: "Nefes alıyorsun — ve mavi sporlar ciğerlerine doluyor. Bir sıcaklık göğsünden yayılıyor, tatlı, davetkâr. Son hissettiğin, köklerin teninin altından filizlenişi. Nevin fısıldıyor: \"Hoş geldin bahçeye, yavrum.\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fide_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "Bulut dağılırken keseyi cebine mühürlüyorsun. Mavi spor — birinci örnek. Ciğerlerin hâlâ yanıyor ama temiz." },
        { type: "flag", set: { ornek1: true, fideBitti: true } },
        { type: "note", id: "not_ornek1", title: "Örnek 1/3: Mavi spor", text: "Buluntu'nun mavi spor kesesi. Serum için üç örnekten biri. Diğerleri: kök özütü ve Selin'in kan örneği." },
      ],
      choices: [
        { id: "cik", text: "Fide odasından çık", next: "n_sera" },
      ],
    },

    /* ================= SU DEPOSU GEÇİDİ — örnek 2 (kök özütü) ================= */

    n_su_gecit: {
      cost: 1,
      events: [
        { type: "narrate", text: "Su deposuna giden geçit yoğun bir spor bulutuyla dolu — havada asılı, parlayan bir sis. Karşı tarafta, boru kavşağında, damıtılmış koyu bir sıvı toplanmış: kök özütü, serumun ikinci bileşeni. Geçit uzun; tek nefeste koşman gerek." },
        { type: "alert", text: "SPOR BULUTU — nefes tutmadan geçilmez" },
      ],
      choices: [
        { id: "gec", text: "Nefesini tut, geçidi koş", next: "n_su_nefes" },
        { id: "geri", text: "Geri çekil, başka yol ara", next: "n_sera" },
      ],
    },

    n_su_nefes: {
      events: [
        { type: "narrate", text: "Derin bir nefes alıp buluta dalıyorsun. Sis yoğun, göremiyorsun, sadece ileriye koşuyorsun; sporlar tenine yapışıyor, ciğerlerin yanıyor, ama duramazsın — durursan nefes alırsın." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9000, success: "n_su_depo", fail: "n_olum_spor" },
    },

    n_su_depo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Geçidin sonunda temiz hava cebi — nefes nefese, dizlerinin üstüne çöküyorsun. Su deposu odası: dev tanklar, boru kavşağında toplanan koyu kök özütü. Bir kavanoza dolduruyorsun." },
        { type: "flag", set: { ornek2: true } },
        { type: "note", id: "not_ornek2", title: "Örnek 2/3: Kök özütü", text: "Damıtılmış kök özütü, su deposunda. İkinci serum bileşeni. Bir de Selin'in kan örneği kaldı — kompost yolunda." },
        { type: "ambient", text: "Tankların birinin camında, içeriden, bir el izi. Avuç içi. Biri bu tankın içinde boğulmamak için tırmalamış. İz küçük — bir kadının." },
      ],
      choices: [
        { id: "geri", text: "Nefesini toparla, geçidi geri koş", next: "n_su_geri" },
      ],
    },

    n_su_geri: {
      events: [
        { type: "narrate", text: "Temiz havayı ciğerlerine doldurup buluta yeniden dalıyorsun — bu kez geri. Aynı yoğun sis, aynı yanma." },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_sera", fail: "n_olum_spor" },
    },

    /* ================= KOMPOST — örnek 3 (kan) + Selin + ölüm ================= */

    n_kompost_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kompost çukuru: katın en dibindeki çürüme havuzu. Buraya 'işe yaramayan' fideler atılıyor — ve koku, düşünmek istemediğin şeyleri söylüyor. Ama Nevin'in kaydı Selin'in kan örneğini burada, kompost yolunda bıraktığını söylemişti. Çukurun kenarında dar bir geçit var." },
        { type: "alert", text: "Kompost gazı zehirli ve zemin kaygan — dikkatli hareket et." },
      ],
      choices: [
        { id: "gecit", text: "Kenardaki dar geçitten ilerle", next: "n_kompost_gecit" },
        { id: "cukur", text: "Çukurun içine, atılanların arasına in", next: "n_olum_kompost" },
        { id: "geri", text: "Geri çekil", next: "n_sera" },
      ],
    },

    n_olum_kompost: {
      death: true,
      deathText: "Çukura iniyorsun — ve zemin zemin değil. Yarı çürümüş, yarı canlı bir kütle, seni yavaşça içine çekiyor. Bağırmak nefes almak demek, nefes almak gaz demek. Kompost hiçbir şeyi boşa harcamaz; sen de yeni bir fide olacaksın.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_kompost_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Dar geçitte, duvara sıkıştırılmış bir saklanma yeri: eski bir tulum, boş konserveler, ve bir soğutucu kutu. İçinde buz aküleri arasında bir kan örneği tüpü ve bir not. Selin buradaymış — kaçmadan önce." },
        { type: "flag", set: { ornek3: true } },
        { type: "document", open: true, doc: {
          id: "d_selin", title: "Selin'in Notu", style: "hand",
          meta: "— soğutucu kutunun içinde —",
          body: "Kim bulursa:\n\nAdım Selin. Nevin beni kızı sandı — ona\nbenzediğimi söyledi. Beni bahçeye vermek\nyerine sakladı. İnsanlığından kalan son parça\nbendim sanırım.\n\nKan örneğimi bıraktım. Nevin'in tarifi:\nmavi spor + kök özütü + benim kanım.\nDoğru oranda karışırsa PANZEHİR olur —\nNevin'i geri getirebilir. Yanlış oranda\nkarışırsa hızlandırıcı olur, onu tamamen\nbitkiye çevirir.\n\nBen aşağı iniyorum. K-2'ye. Buluntu'yu\nsusturmanın tek yolu kaynağa inmek.\nBeni bekleme. Ama panzehri yaparsan —\nlütfen önce Nevin'i dene. O iyi biriydi.\n\n— S." } },
        { type: "note", id: "not_selin", title: "Örnek 3/3 + tarif", text: "Selin'in kan örneği ve notu. Serum tarifi: mavi spor + kök özütü + kan, DOĞRU oranda = panzehir (Nevin'i kurtarır), yanlış oranda = hızlandırıcı (onu bitkiye çevirir). Selin K-2'ye inmiş, Buluntu'yu susturmaya. Üç örnek de bende — laboratuvara gidebilirim." },
        { type: "objective", text: "Üç örneği laboratuvara götür, serumu doğru oranda karıştır" },
      ],
      choices: [
        { id: "geri", text: "Geçitten seraya dön", next: "n_sera" },
      ],
    },

    /* ================= LABORATUVAR — serum (kimya bulmacası) ================= */

    n_lab: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nevin'in eski laboratuvarı: devrik mikroskoplar, kırık şişeler, ve köklerin henüz ele geçirmediği bir tezgâh. Duvarda tarif hâlâ asılı — Nevin insanken yazmış. Ama örnekler olmadan bir işe yaramaz.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "Laboratuvar tezgâhı. Üç örnek de cebinde: mavi spor, kök özütü, kan. Tarife göre doğru oranda karıştırman gerek — yanlış oran Nevin'i kurtaramaz, onu bitirir.", if: { flag: "ornek3", equals: true } },
        { type: "document", open: true, if: { flag: "labTarif", equals: false }, doc: {
          id: "d_tarif", title: "Serum Tarifi (duvarda)", style: "hand",
          meta: "— laboratuvar duvarında, Nevin'in eski elinden —",
          body: "PANZEHİR — kök geri çekilmesi\n\nHassas oran. Yanlışı öldürür değil,\nDAHA KÖTÜSÜNÜ yapar.\n\n  MAVİ SPOR ...... 1 ölçü  (baskılayıcı)\n  KÖK ÖZÜTÜ ...... 2 ölçü  (taşıyıcı)\n  KAN ............ 3 ölçü  (bağlayıcı, en çok)\n\nKarışım sırası önemsiz, ORAN önemli.\nToplam 6 ölçü. Az kan = etkisiz.\nÇok spor = hızlandırıcı. Dikkat." } },
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
        { type: "narrate", text: "Tezgâhta üç örnek. Tarif: 1 spor, 2 özüt, 3 kan — toplam 6 ölçü. Oranı tuttur; yanlışı Nevin'i kurtarmaz, tamamen bitkiye çevirir." },
      ],
      interaction: {
        kind: "mix",
        title: "PANZEHİR — ORANI TUTTUR (1 SPOR · 2 ÖZÜT · 3 KAN)",
        bottles: [
          { id: "spor", label: "SPOR", color: "#4a6ac2" },
          { id: "ozut", label: "ÖZÜT", color: "#4aa26a" },
          { id: "kan", label: "KAN", color: "#a23a3a" },
        ],
        target: { spor: 1, ozut: 2, kan: 3 },
        success: "n_serum_hazir",
        cancel: "n_lab",
        penalty: { akil: -12, gurultu: 6, text: "YANLIŞ ORAN — zehirli gaz! AKIL -12" },
      },
    },

    n_serum_hazir: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "PANZEHİR: HAZIR — bir şırıngaya çekildi" },
        { type: "narrate", text: "Berrak, altın rengi bir sıvı şırıngada. Selin'in notu 'önce Nevin'i dene' diyordu. Ama bu serum senin de kaçış biletin olabilir — Nevin'i geçmek için. Karar seraya döndüğünde." },
        { type: "flag", set: { serumHazir: true } },
        { type: "battery", spares: 1 },
        { type: "objective", text: "Seraya dön, Nevin'le yüzleş" },
      ],
      choices: [
        { id: "sera", text: "Seraya dön", next: "n_kasa" },
      ],
    },

    /* ================= TOHUM KASASI — parça kilidi (örnekler) ================= */

    n_kasa: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nevin'in tohum kasası: köklerle sarılmış çelik bir kabin. Üç yuvalı bir okuyucu — ama yuvalar tohum değil, ÖRNEK istiyor. Üç örneği takarsan kasa açılıyor ve içindeki K-2 iniş kartını veriyor. Kaç örneğin var?" },
        { type: "alert", text: "KASA KİLİTLİ — üç örnek eksik: mavi spor, kök özütü, kan.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "Üç örnek de cebinde. Ama serumu yaptıysan örnekler serumda tükendi — kasa artık serumun kendisini 'anahtar' olarak kabul ediyor; köklü okuyucu altın sıvıya tepki veriyor.", if: { flag: "serumHazir", equals: true } },
        { type: "narrate", text: "Üç örnek de cebinde ama henüz serum yapmadın. Örnekleri kasaya takarsan iniş kartını alırsın — ama o zaman serum yapamazsın. Ya da önce laboratuvarda serumu yap.", if: { flag: "ornek3", equals: true, }, },
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
        { type: "system", text: "TOHUM KASASI: AÇILDI" },
        { type: "narrate", text: "Kasa açılıyor; içinde K-2 iniş kartı, birkaç yedek pil ve Nevin'in son, en insani notu." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { inisKarti: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_nevin_son", title: "Nevin'in Son Notu", style: "hand",
          meta: "— kasanın içinde —",
          body: "Buraya kadar geldiysen serumu yaptın demektir.\nO altın sıvı beni geri getirebilir.\n\nAma dürüst olacağım: geri gelmek istiyor\nmuyum, bilmiyorum. Kök olmak... sessiz.\nKorkusuz. Buluntu'nun sesi olmadan bir\nyer yok bu istasyonda.\n\nSeçim senin. Beni uyandır ve ikimiz de\nacı çekelim — ya da geç git, bırak\nbüyüyeyim.\n\nHangisini seçersen seç: K-2'ye in.\nSelin orada. Buluntu orada. Her şey\norada bitiyor. Ya da başlıyor.\n\n— N." } },
        { type: "objective", text: "Nevin'le yüzleş, K-2'ye in" },
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
        { type: "narrate", text: "Sera merkezi. Nevin, toprağa gömülü, kökleriyle katın kalbi. K-2 iniş kapağı tam onun arkasında — geçmek için onun yanından geçmelisin. Gözlerini açıyor; yeşil, ışıldayan, ama içinde hâlâ bir insan yorgunluğu var." },
        { type: "narrate", text: "\"Serumu yaptın,\" diyor. \"Kokusunu alıyorum. Selin'in kanı... hâlâ sıcak.\" Kökleri kımıldıyor, seni çevreliyor ama saldırmıyor. \"Karar ver, fide. Ne yapacaksın benimle?\"" },
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
        { type: "narrate", text: "Şırıngayı Nevin'in boynundaki en kalın köke saplıyorsun. Altın sıvı damarlarına — köklerine — yayılıyor. Bir çığlık; insan ve bitki aynı anda. Kökler senden geri çekiliyor, kıvranıyor, ve Nevin'in yüzü bir an — sadece bir an — tamamen insan oluyor." },
        { type: "stat", stat: "akil", delta: 10, note: "AKIL +10 — Doğru olanı yaptın", noteKind: "system" },
        { type: "flag", set: { nevinKurtarildi: true } },
        { type: "waitTap" },
        { type: "narrate", text: "\"...Teşekkür ederim,\" diye fısıldıyor Nevin, gerçek sesiyle. \"Ama geri dönemem, çok geç. Sadece... acısı olmadan gitmeme izin verdin.\" Kökler yavaşça gevşiyor, K-2 kapağını açığa çıkarıyor. \"Selin'i bul. Ona iyi biri olduğumu söyle. ...Olmaya çalıştığımı.\"" },
        { type: "ambient", text: "Nevin'in bedeni toprağa çöküyor — huzurla. Kökler kuruyor. İlk kez K-3 gerçekten sessiz.", if: { flag: "eceEleVerildi", equals: false } },
      ],
      choices: [
        { id: "in", text: "K-2 kapağını aç, in", next: "n_k3_son" },
      ],
    },

    n_final_gec: {
      cost: 1,
      events: [
        { type: "narrate", text: "Serumu cebinde tutuyorsun — bu senin sigortan. Nevin'in kökleri arasından, nefesini tutup, yana yana süzülüyorsun. \"...Gidiyorsun,\" diyor arkandan, kırgın değil, yorgun. \"Herkes gidiyor. Aşağıya. Hep aşağıya.\"" },
        { type: "flag", set: { nevinBirakildi: true } },
        { type: "stat", stat: "sefFarkindalik", delta: -5 },
        { type: "narrate", text: "K-2 kapağına ulaşıyorsun. Ardına baktığında Nevin yine gözlerini kapatmış — bahçesine dönmüş. Onu böyle bıraktığın, ileride ağırlık yapacak. Ama şimdi hayattasın." },
      ],
      choices: [
        { id: "in", text: "K-2 kapağını aç, in", next: "n_k3_son" },
      ],
    },

    n_final_kompost: {
      cost: 2,
      events: [
        { type: "narrate", text: "Nevin'le yüzleşmek yerine kompost yoluna dönüyorsun — Selin'in kaçış rotası. Çürüme geçidi, dar ve zehirli, ama Nevin'in kökleri buraya ulaşmıyor; burası ölü bölge. Selin buradan inmiş." },
        { type: "narrate", text: "Geçidin sonunda, kompostun dibinde, K-2'ye açılan gizli bir tahliye. Selin'in ayak izleri çamurda hâlâ taze. Ama zehirli gaz ciğerlerini yakıyor — çabuk in." },
        { type: "flag", set: { selinRotasi: true } },
        { type: "stat", stat: "akil", delta: -8, note: "AKIL -8 — Zehirli gaz", noteKind: "alert" },
      ],
      choices: [
        { id: "in", text: "Gizli tahliyeden K-2'ye in", next: "n_k3_son" },
      ],
    },

    /* ================= BÖLÜM SONU ================= */

    n_k3_son: {
      cost: 1,
      events: [
        { type: "system", text: "K-2 İNİŞİ: AÇIK" },
        { type: "narrate", text: "Kapak açılıyor; aşağıdan bambaşka bir hava yükseliyor — soğuk, mineralli, çok eski. Toprak değil artık; kaya. Kazı. K-2 doğal bir katman değil, İSTASYONUN altına oyulmuş bir kazı sahası." },
        { type: "waitTap" },
        { type: "ambient", text: "Sonar hattı: «K-2'ye iniyorsun. Orada... orada ne olduğunu ben bile bilmiyorum. Buluntu orada. Selin orada. Dikkatli ol. Ve — sağ ol. Beni ele vermediğin için.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Sonar hattı son kez cızırdıyor, sonra kalıcı olarak ölüyor. Ece'yi ele vermiştin; K-2'nin derinliğinde artık kimse seni dinlemiyor. Yalnızsın. Tamamen.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Ve aşağıdan, kayanın içinden, o ses geliyor — artık net, artık yakın: «...üç... iki...» Buluntu sayıyor. Ve bu kez sıfıra çok yakın.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "ambient", text: "Ve aşağıdan, kayanın içinden, düzenli bir titreşim geliyor. Bir kalp değil. Bir sayaç. Geri sayıyor.", if: { flag: "frekanslariDuydun", equals: false } },
        { type: "narrate", text: "Merdiven kayanın içine, karanlığa iniyor. Beş kat indin. Bir kat kaldı. Ve o katta, her şeyin başladığı yerde, Buluntu seni bekliyor." },
        { type: "system", text: "— BÖLÜM 4 SONU: BAHÇE —" },
        { type: "system", text: "K-2: 'BULUNTU' — kazı sahası — yakında" },
      ],
      choices: [
        { id: "k2", text: "K-2'ye in", next: "n_k2_giris" },
      ],
    },

  },
};

export const EP04_FLAGS = {
  iklimCozuldu: false,
  // giriş / hub
  seraIlk: false, fideBitti: false,
  // örnekler (kasa + serum)
  ornek1: false, ornek2: false, ornek3: false,
  labTarif: false, serumHazir: false, inisKarti: false,
  // final seçimleri
  nevinKurtarildi: false, nevinBirakildi: false, selinRotasi: false,
};
