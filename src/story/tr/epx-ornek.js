/* ============================================================
   PERISHED — ÖRNEK BÖLÜM: "VİTRAY KAPISI" (mekanik şablonu)
   Amaç: bölüm sonundaki bulmaca, DÜNYADA dağılmış üç cam parçası
   bulunmadan çözülemez. Oyuncu hub'da dolaşmak, çıkmazlara girmek,
   dökümanları okumak ZORUNDA. Parçalar toplanınca (flag) bulmaca
   açılır ve bölüm geçilir.

   Bu bölüm K-4 ve sonrası için ŞABLONDUR:
   · hub + 3 dal (biri çıkmaz-ödül, biri döngü, biri ölümcül)
   · yön bilgisi yalnız dökümanlarda
   · seçenek metni yolu ele vermez
   · final kapısı = parça-kilitli bulmaca
   ============================================================ */

export const EPX = {
  start: "nx_giris",
  nodes: {

    nx_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "KAT: K-4 · İBADETHANE KORİDORU" },
        { type: "narrate", text: "Merdiven seni loş, tütsü kokan bir koridora bırakıyor. İleride, koridorun sonunu tıkayan devasa bir çelik kapı: ortasında renkli camdan bir çember — bir vitray — ama camın üç yeri KARANLIK. Delik. Eksik." },
        { type: "narrate", text: "Kapının yanındaki kaidede paslı bir kitabe var." },
        { type: "document", open: true, doc: {
          id: "dx_kitabe", title: "Kaidedeki Kitabe", style: "hand",
          meta: "— kapının yanında, çelik kaideye kazılı —",
          body: "AİLE'NİN KAPISI ANCAK BÜTÜN CAMLA AÇILIR.\n\nÜç kırık, üç yere saçıldı:\n— biri revirin soğuğunda, ölülerin yanında,\n— biri ambarın karanlığında, sandığın dibinde,\n— biri BİZDEN olmayanın cebinde, koridorda gezen.\n\nCamı bütünle. Deseni kur. Kapı seni tanır.\n(Camlar yerine gelmeden çark boşa döner.)" } },
        { type: "objective", text: "Üç cam parçasını bul, vitrayı tamamla, kapıyı aç" },
        { type: "ambient", text: "Koridor üç yöne ayrılıyor: soğuk hava akımı gelen sol geçit, aşağı inen karanlık bir rampa, ve tütsü kokusunun yoğunlaştığı sağ kemer." },
      ],
      choices: [
        { id: "sol", text: "Soğuk hava akımına doğru yürü", next: "nx_revir" },
        { id: "rampa", text: "Aşağı inen karanlık rampaya gir", next: "nx_ambar_giris" },
        { id: "sag", text: "Tütsü kokusunu izle", next: "nx_koridor_dolan" },
        { id: "kapi", text: "Doğruca kapının çarkını dene", next: "nx_kapi_dene" },
        { id: "test_kirik", text: "[TEST] Tableti Demir Korkuluklara Çarp (Ekranı Kır)", next: "nx_test_ekran_kir" },
      ],
    },

    nx_test_ekran_kir: {
      cost: 0,
      events: [
        { type: "narrate", text: "Tableti sertçe çelik korkuluğun köşesine çarpıyorsun. Şiddetli bir statik çatırtı duyuluyor..." },
        { type: "glitch", ms: 900 },
        { type: "flag", set: { tabletKirik: true } },
        { type: "narrate", text: "Ekranın sol alt köşesi tuzla buz oldu! Çatlaklar tüm ekrana yayılıyor. (Artık kırık ekranı test edebilirsiniz. Koridora geri dönüyorsunuz.)" }
      ],
      choices: [
        { id: "geri", text: "Koridora geri dön", next: "nx_giris" }
      ]
    },

    /* --- parça 1: revir (soğuk dal) --- */
    nx_revir: {
      cost: 1,
      events: [
        { type: "narrate", text: "Soğuk hava seni revire getiriyor. Buz gibi. Çelik masalarda örtülü şekiller — sayma. Köşedeki ilaç dolabının üstünde, bir tepside, ışığı yakalayan mavi bir cam kırığı parlıyor." },
        { type: "flag", set: { camMavi: true } },
        { type: "battery", spares: 1 },
        { type: "note", id: "nx_not_revir", title: "Cam 1/3", text: "İlk cam parçası: revirdeki tepside, mavi. Aldım. İki tane daha var — ambarda ve 'koridorda gezen' birinin cebinde." },
        { type: "ambient", text: "Örtülü şekillerden biri, sen çıkarken, çok hafif — belki de hayal — kımıldıyor." },
      ],
      choices: [
        { id: "geri", text: "Koridora geri dön", next: "nx_giris" },
      ],
    },

    /* --- parça 2: ambar (ölümcül dal + döngü) --- */
    nx_ambar_giris: {
      cost: 1,
      events: [
        { type: "narrate", text: "Rampa aşağı, zifiri bir ambara iniyor. Tabletinin ışığı sandık sıralarında bir adımlık tünel açıyor. İki yöne gidebilirsin: sağda devrilmiş raflardan bir geçit, solda düzgün ama fazla sessiz bir koridor." },
      ],
      choices: [
        { id: "sag", text: "Devrilmiş raflardan geç", next: "nx_ambar_sandik" },
        { id: "sol", text: "Sessiz koridora gir", next: "nx_ambar_olum" },
        { id: "geri", text: "Rampadan yukarı dön", next: "nx_giris" },
      ],
    },

    nx_ambar_olum: {
      death: true,
      deathText: "Sessizlik bir tuzaktı. Koridorun ortasında zemin yok — karanlıkta ağzını açmış bir tahliye boşluğu. Ayağın boşluğa değdiğinde geri dönüş yok; K-4'ün dibi seni yutuyor.",
      events: [{ type: "glitch", ms: 900 }],
    },

    nx_ambar_sandik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Devrilmiş rafların ardında, mühürlü bir arkeoloji sandığı. Kapağı aralık. İçinde, saman ve toz arasında, kehribar renginde bir cam kırığı — kenarı hâlâ keskin." },
        { type: "flag", set: { camKehribar: true } },
        { type: "note", id: "nx_not_ambar", title: "Cam 2/3", text: "İkinci cam: ambardaki sandıkta, kehribar. Aldım. Bir tane kaldı — 'bizden olmayanın cebinde, koridorda gezen'. Bu bir kişi. Ve geziyor." },
        { type: "ambient", text: "Sandığın dibinde, camın altında, kazınmış bir not: 'buluntuya dokunan sayılır.'" },
      ],
      choices: [
        { id: "geri", text: "Ambardan çık", next: "nx_giris" },
      ],
    },

    /* --- parça 3: koridorda gezen (döngü + karşılaşma) --- */
    nx_koridor_dolan: {
      cost: 1,
      events: [
        { type: "narrate", text: "Tütsü kokusu seni dönen bir galeriye çekiyor. Duvarlarda aile portreleri — hepsinin yüzü kazınmış. Galeri kendi üstüne kıvrılıyor; iki kez aynı kazınmış portreden geçtiğini fark ediyorsun. Sonra ileride bir fener ışığı beliriyor: biri geliyor." },
        { type: "objective", text: "Koridorda gezen 'ondan' üçüncü camı al" },
      ],
      choices: [
        { id: "sakla", text: "Bir portre nişine sıkış, geçmesini bekle", next: "nx_gezen_sakla" },
        { id: "izle", text: "Uzaktan takip et, nereye gittiğini gör", next: "nx_gezen_izle" },
      ],
    },

    nx_gezen_izle: {
      cost: 1,
      events: [
        { type: "narrate", text: "Işığı takip ediyorsun. Dalgıç kıyafetinden arta kalmış bir şey, elinde fenerle galeriyi arşınlıyor; boynunda ipe geçirilmiş yeşil bir cam parçası sallanıyor. Ama çok yaklaştın — durup başını çeviriyor." },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sakla", text: "Hemen bir nişe sıkış, nefesini tut", next: "nx_gezen_sakla" },
        { id: "kac", text: "Geri kaç", next: "nx_koridor_dolan" },
      ],
    },

    nx_gezen_sakla: {
      events: [
        { type: "narrate", text: "Portre nişine sıkışıyorsun. Fener ışığı yüzünün bir karış önünden geçiyor; boynundaki yeşil cam, tam gözünün hizasında sallanıyor. Uzansan alabilirsin — ama nefesini tutman gerek." },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "nx_gezen_al", fail: "nx_olum_gezen" },
    },

    nx_olum_gezen: {
      death: true,
      deathText: "Nefesin çözülüyor. Fener duruyor, sana dönüyor. Yeşil cam son kez sallanıyor — sonra ışık sönüyor ve galeri, bir portreyi daha kazımaya hazırlanıyor.",
      events: [{ type: "glitch", ms: 900 }],
    },

    nx_gezen_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "O uzaklaşırken, ipteki cam bir yere takılıp kopuyor ve ayağının dibine düşüyor. Yeşil. Soğuk. Seninki artık." },
        { type: "flag", set: { camYesil: true } },
        { type: "note", id: "nx_not_gezen", title: "Cam 3/3", text: "Üçüncü cam: koridorda gezenin boynundan düştü, yeşil. Üçü de bende. Artık kapıdaki vitrayı tamamlayabilirim." },
      ],
      choices: [
        { id: "geri", text: "Kapıya dön", next: "nx_giris" },
      ],
    },

    /* --- final kapısı: parça-kilitli bulmaca --- */
    nx_kapi_dene: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kapının soğuk çarkına yükleniyorsun. Vitrayın ardından bir mekanizma inliyor ama dönmüyor — camdaki üç delik, üç boş göz gibi sana bakıyor.", if: { flag: "camYesil", equals: false } },
        { type: "alert", text: "CAM EKSİK — ÇARK BOŞA DÖNÜYOR. Kitabe doğruydu.", if: { flag: "camYesil", equals: false } },
        { type: "narrate", text: "Üç cam da cebinde. Onları deliklere yerleştiriyorsun — mavi, kehribar, yeşil çıt diye oturuyor. Şimdi vitrayı çevirip deseni kurman gerek.", if: { flag: "camYesil", equals: true } },
      ],
      choices: [
        { id: "coz", text: "Vitrayı çevir — deseni tamamla", next: "nx_vitray", if: { flag: "camYesil", equals: true } },
        { id: "ara", text: "Eksik camları aramaya dön", next: "nx_giris", if: { flag: "camYesil", equals: false } },
      ],
    },

    nx_vitray: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üç renkli halka, üç eksik parça artık yerinde. Camı çevir, altın figürü bütünle." },
      ],
      interaction: {
        kind: "rings",
        title: "AİLE'NİN KAPISI — VİTRAYI TAMAMLA",
        rings: [
          { color: "#4a6ac2", step: 30, offset: 150 },
          { color: "#4aa26a", step: 45, offset: 225 },
          { color: "#c24a3a", step: 40, offset: 120 },
        ],
        // Bu üç parça, üç flag toplanınca yerine gelir.
        // ring = hangi halka, shard = o halkadaki hangi cam dilimi,
        // fig = o halkadaki figür segmenti (gizlenen çizgi).
        pieces: [
          { flag: "camMavi", ring: 0, shard: 3, fig: 0 },
          { flag: "camKehribar", ring: 1, shard: 5, fig: 2 },
          { flag: "camYesil", ring: 2, shard: 7, fig: 1 },
        ],
        success: "nx_son",
        cancel: "nx_kapi_dene",
      },
    },

    nx_son: {
      ending: true,
      events: [
        { type: "system", text: "VİTRAY BÜTÜNLENDİ — AİLE'NİN KAPISI AÇILIYOR" },
        { type: "narrate", text: "Altın figür camda tamamlanır tamamlanmaz kapı, bir iç çekişle içeri doğru açılıyor. Ardından sıcak, yanlış bir yemek kokusu ve uzaktan gelen çatal-bıçak sesleri. Sofra kurulmuş. Seni bekliyorlar." },
        { type: "system", text: "— ÖRNEK BÖLÜM SONU —" },
      ],
    },
  },
};

export const EPX_FLAGS = {
  camMavi: false, camKehribar: false, camYesil: false,
};
