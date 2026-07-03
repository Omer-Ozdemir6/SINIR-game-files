/* ============================================================
   SINIR-1 — BÖLÜM 04: "K-3 / ARKEOLOJİ AMBARI" (GÜNCELLENMİŞ v2)
   Saf hikaye verisi. Bölüm 5 (Final) geçiş köprüsü entegre edilmiştir.
   ============================================================ */

export const EP04 = {
  start: "n_k3_giris",
  nodes: {
    n_k3_giris: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-3 ARKEOLOJİ AMBARI — YEREL SAAT 05:20" },
        { type: "objective", text: "Konteyner 7'ye ulaş ve içindeki numunenin ne olduğunu öğren." },
        { type: "narrate", text: "Asansör kabini büyük bir sarsıntıyla duruyor. Kapılar iki yana açıldığında, devasa bir hangarın içine adım atıyorsun. Burası K-3 Arkeoloji Ambarı. Etraf paslı nakliye konteynerleri, kırık projektörler ve kazı aletleriyle dolu." },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Hangarın tavanından sarkan hoparlörlerden Deniz'in statik sesi bu kez daha derinden, adeta fısıldayarak geliyor: 'Sonunda evine geldin teknisyen. Bak, kardeşlerin burada seni bekliyor...'" },
      ],
      choices: [
        { id: "sefin_odasi", text: "Sağdaki revir ve Şefin Odası'na yönel", next: "n_sefin_odasi" },
        { id: "ambara_dal", text: "Doğrudan konteynerlerin arasındaki karanlık koridora gir", next: "n_ambar_koridor" },
      ],
    },

    /* --- ŞEFİN ODASI (HARUN'UN İPUCU) --- */
    n_sefin_odasi: {
      cost: 2,
      events: [
        { type: "narrate", text: "Şef Harun'un odasındasın. Masanın üzerinde devrilmiş kahve fincanları ve eski vardiya defterleri var. Duvara asılı büyük haritada Konteyner 7'nin üzeri kırmızı kalemle defalarca çizilmiş." },
        { type: "narrate", text: "Harun'un sana verdiği anahtar kartı, masanın altındaki gizli çelik çekmeceyi tık diye açıyor.", if: { flag: "harunIknaOldu", equals: true } },
        { type: "narrate", text: "Çekmece kilitli ama sert bir cisimle zorlayarak kilidi patlatıyorsun.", if: { flag: "harunIknaOldu", equals: false } },
      ],
      choices: [
        { id: "cekmece_ara", text: "Çekmecenin içini incele", next: "n_gizli_kayit" }
      ],
    },

    n_gizli_kayit: {
      cost: 3,
      events: [
        { type: "battery", spares: 1 },
        { type: "flag", set: { harunSesKaydiBulundu: true } },
        {
          type: "document",
          doc: {
            id: "d_harun_itiraf",
            title: "Harun'un Gizli Ses Kaydı Dökümü",
            meta: "SINIR-1 ÖZEL ARŞİV · SES BANDI #09",
            body: "O şey... Konteyner 7'nin içindeki kütle... Canlı değil. Ama ölü de değil. Bir radyo vericisi gibi frekans yayıyor. Deniz o frekansı ilk duyduğunda günlerce uyumadı. 'Bize isimlerimizi geri veriyor' dedi. Sonra hepimizin zihnini o dalgaya sabitledi. İstasyonun altını kazan biz değiliz, o kütle bizi aşağıya, daha derine çağırıyor. Eğer oraya gidersen... `437.4` çocuk frekansını tersine çevirmen gerek."
          }
        },
        { type: "stat", stat: "akil", delta: -5 }
      ],
      choices: [{ id: "ambara_gec", text: "Kayıtları al ve ambar koridoruna ilerle", next: "n_ambar_koridor" }],
    },

    /* --- AMBAR KORİDORLARI VE PUSU --- */
    n_ambar_koridor: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Konteynerlerin oluşturduğu labirent gibi koridorlarda ilerliyorsun. Her köşede metalik tırnak kazıma sesleri yankılanıyor. Aile'nin diğer üyeleri karanlıkta, konteynerlerin tepesinde dolanıyor." },
      ],
      choices: [
        { id: "sessiz_gecis", text: "Karanlığı kullanarak gölgelerden ilerle", next: "n_ambar_sessiz" },
        { id: "ses_fark", text: "Telsiz frekansını açıp çocuk sesini dinle", next: "n_ambar_radyo_radar", if: { flag: "frekansCocukSayimi", equals: true } }
      ],
    },

    n_ambar_sessiz: {
      cost: 4,
      noiseGate: [{ min: 50, once: "ambar_baskin", node: "n_olum_ambar" }],
      events: [
        { type: "narrate", text: "Tam önündeki Konteyner 6'nın üzerinden ıslak ve derisi soyulmuş bir el aşağı sarkıyor. Aile'den biri tam üstünde durmuş, aşağıyı dinliyor. Nefesini tutmak zorundasın." },
        { type: "system", text: "NEFESİNİ TUT VE KIPIRDAMA" },
      ],
      interaction: { kind: "breath", holdMs: 9000, lungMs: 12000, success: "n_ambar_kurtulus", fail: "n_olum_ambar" },
    },

    n_ambar_radyo_radar: {
      cost: 2,
      events: [
        { type: "narrate", text: "Telsizden `437.4` frekansını açıyorsun. Çocuk sesinin sayma hızı bir anda çılgına dönüyor: '...iki... bir...' Arkandaki konteynerin üzerinden bir şeyin aşağı atladığını fark edip yana fırlıyorsun!" },
        { type: "stat", stat: "gurultu", delta: 15 },
      ],
      choices: [{ id: "kos", text: "Doğrudan ilerideki mühürlü kapıya doğru koş!", next: "n_konteyner7_kapi" }],
    },

    n_ambar_kurtulus: {
      cost: 1,
      events: [
        { type: "narrate", text: "Üstündeki yaratık burnundan sızan sıcak nefesi hissedebileceğin kadar yaklaşıyor, sonra karanlığın derinliklerine doğru sürünerek uzaklaşıyor. Yavaşça burnunu silip ilerliyorsun." },
      ],
      choices: [{ id: "kapı", text: "Mühürlü Konteyner 7 kapısına yaklaş", next: "n_konteyner7_kapi" }],
    },

    n_olum_ambar: {
      death: true, cost: 0,
      deathText: "Aile seni aralarına kabul etti. Artık isimlerini hatırlamıyorsun.",
      events: [
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Çıkardığın ufacık bir ses tırnakların metale sürtünme sesini kesiyor. Yukarıdaki siluet doğrudan üzerine çöküyor ve seni karanlığa çekiyor." },
      ],
    },

    /* --- KONTEYNER 7 VE KADİM FREKANS BULMACASI --- */
    n_konteyner7_kapi: {
      checkpoint: true, cost: 3,
      events: [
        { type: "narrate", text: "Sonunda hangarının en arkasındaki devasa, kalın zincirlerle ve kurşun levhalarla kaplanmış **Konteyner 7**'nin önüne ulaşıyorsun. Kapının üzerindeki dijital mühür panelinde yoğun bir statik parazit var. Kadim kütlenin radyasyonu telsizini delirtiyor." },
        { type: "system", text: "FREKANS SENKRONİZASYONU GEREKLİ" },
        { type: "narrate", text: "Harun'un ses kaydındaki ipucunu hatırlıyorsun: Çocuk frekansını (`437.4`) tersine çevir, paraziti bastır.", if: { flag: "harunSesKaydiBulundu", equals: true } },
      ],
      choices: [
        { id: "frekans_ayarla", text: "Telsiz kadrandaki paraziti bastırmak için frekansı ayarla", next: "n_k7_frekans_etkilesim" }
      ],
    },

    n_k7_frekans_etkilesim: {
      cost: 2,
      events: [
        { type: "narrate", text: "Kadranı çevirerek Konteyner 7'nin yaydığı o ağır, zihin tırmalayıcı parazit dalgasını sıfırlamaya çalışıyorsun." },
        { type: "system", text: "TELSİZ KADRANINI DOĞRU FREKANSA GETİR (Hedef: 437.4 veya Tersi)" },
      ],
      interaction: { kind: "radio", target: 437.4, success: "n_k7_kapi_acilis" },
    },

    n_k7_kapi_acilis: {
      checkpoint: true, cost: 2,
      events: [
        { type: "system", text: "MÜHÜR ÇÖZÜLDÜ — KONTEYNER 7 KAPAKLARI AÇILIYOR" },
        { type: "narrate", text: "Ağır hidrolik kapak tıslayarak iki yana açılıyor. İçeriden dışarıya buz gibi dondurucu bir hava ve kelimelerle tarif edilemez, obsidyen siyahı bir parıltı sızıyor." },
        { type: "narrate", text: "Konteynerin tam ortasında, havada asılı duruyormuş gibi görünen, üzeri geometrik çatlaklarla kaplı devasa bir kaya kütlesi var. Ve o kütleye düzinelerce kabloyla bağlı olan... Deniz Okur'un ta kendisi." },
        { type: "pause", ms: 900 },
        { type: "system", text: "DENİZ: \"Bak... Sonunda neyi kazdığımızı gördün teknisyen. Şimdi yukarı gel, K-2 Komuta Merkezinde senin için hazırladığım tahta otur...\"" },
      ],
      choices: [
        { id: "k7_icine_bak", text: "Kütleye daha yakından bak ve veri diskini terminale tak", next: "n_k3_son_karar" }
      ],
    },

    /* --- BÖLÜM ÇIKIŞI --- */
    n_k3_son_karar: {
      checkpoint: true, cost: 0, // ending: true kaldırıldı!
      events: [
        { type: "narrate", text: "Kütlenin yanındaki ana terminale yaklaşıp veri diskini yuvaya sokuyorsun. İstasyonun tüm katlarındaki acil durum kilitleri birer birer patlıyor. Artık Harun'un asansörü doğrudan en üst kata, K-2 Komuta Merkezine doğru hareket etmeye hazır." },
        { type: "stat", stat: "akil", delta: -20, note: "KADİM KÜTLE ZİHNİNİ ZEHİRLİYOR" },
        { type: "flag", set: { k7Görüldü: true } },
        { type: "pause", ms: 800 },
        { type: "system", text: "K-3 ARKEOLOJİ AMBARINDAN ÇIKILDI — FINAL KATINA DOĞRU YÜKSELEN ASANSÖR" },
        { type: "objective", text: "BÖLÜM SONU. K-2: KOMUTA MERKEZİ VE FİNAL KATINA GEÇİLİYOR." },
      ],
      choices: [
        {
          id: "final_kat_gecis",
          text: "Asansöre Dön ve K-2 Komuta Merkezine Yüksel",
          next: "n_k2_giris" // Bölüm 5 (Final) başlangıç node ID'si
        }
      ]
    },
  },
};

export const EP04_FLAGS = {
  harunSesKaydiBulundu: false,
  k7Görüldü: false,
};