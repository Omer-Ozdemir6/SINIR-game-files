/* ============================================================
   SINIR-1 — BÖLÜM 02: "K-5 / YAŞAM DESTEK" (GÜNCELLENMİŞ v2)
   Saf hikaye verisi. Bölüm 3 geçiş kilidi düzeltilmiştir.
   ============================================================ */

export const EP02 = {
  start: "n_k5_giris",
  nodes: {
    n_k5_giris: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-5 YAŞAM DESTEK KATINA GİRİLDİ — YEREL SAAT 04:12" },
        { type: "objective", text: "Geri sayım bitmeden interkom ağını sabote et veya kodu çöz." },
        { type: "narrate", text: "Hava kilidinin ağır çelik kapısı arkandan kilitlendi. Önünde loş, yeşil acil durum ışıklarıyla aydınlatılmış dar bir koridor uzanıyor. Duvarlardaki hoparlörlerden o statik çocuk sesi yankılanmaya devam ediyor:" },
        { type: "pause", ms: 800 },
        { type: "system", text: "HOPARLÖR: \"...dört... üç...\"" },
        { type: "narrate", text: "Hemen sağında interkom ana dağıtım kutusu var. Sol tarafta ise Nevin'in mühürlü laboratuvar kapısı duruyor." },
      ],
      choices: [
        { id: "interkom", text: "İnterkom kutusuna müdahale et", next: "n_interkom_bulmaca" },
        { id: "laboratuvar", text: "Nevin'in laboratuvar kapısını zorla", next: "n_lab_kapi" },
        { id: "kos", text: "Karantina koridoruna doğru hırsla koş", next: "n_karantina_kos", default: true },
      ],
    },

    /* --- DENİZ'İN İNTERKOM BULMACASI --- */
/* --- DENİZ'İN İNTERKOM BULMACASI (SEÇENEKLİ VERSİYON) --- */
    n_interkom_bulmaca: {
      cost: 2,
      events: [
        { type: "narrate", text: "Kutunun kapağını açıyorsun. Kabloların üzerine yağlı kalemle bir soru kazınmış. Deniz'in sesi interkomdan araya giriyor: 'Oryantasyon testi! Konteyner 7 kaç yıldır uykudaydı? Doğru kabloyu kesmezsen hoparlörler patlar, Aile yerini öğrenir.'" },
        { type: "system", text: "SORU: Konteyner 7'deki numunenin tahminî gömülme yaşı kaçtır?" }
      ],
      choices: [
        { id: "cevap_yanlis_1", text: "3500 Yıl (Mavi Kabloyu Kes)", next: "n_interkom_hata" },
        { id: "cevap_dogru", text: "7400 Yıl (Kırmızı Kabloyu Kes)", next: "n_interkom_iptal" },
        { id: "cevap_yanlis_2", text: "12000 Yıl (Sarı Kabloyu Kes)", next: "n_interkom_hata" }
      ]
    },

    n_interkom_iptal: {
      cost: 1,
      events: [
        { type: "narrate", text: "Doğru frekans hattını kesiyorsun. Çocuk sesli gerisayım bir anda tıslayarak kesiliyor. Deniz interkomdan homurdanıyor: 'Dersine çalışmış bir teknisyen... Eğlenceli.'" },
        { type: "flag", set: { interkomSusturuldu: true } },
        { type: "stat", stat: "gurultu", delta: -15, note: "GERİSAYIM DURDURULDU, GÜRÜLTÜ AZALDI" },
      ],
      choices: [{ id: "ilerle", text: "Karantina Koridoru'na ilerle", next: "n_karantina" }],
    },

    n_interkom_hata: {
      cost: 1,
      events: [
        { type: "narrate", text: "Yanlış kabloyu çekiyorsun! Hoparlörlerden kulak tırmalayıcı, yüksek frekanslı bir çığlık kopuyor. Ses tüm katta yankılanıyor." },
        { type: "stat", stat: "gurultu", delta: 30, note: "GÜRÜLTÜ PATLAMASI SİNYALİ VERDİ" },
        { type: "stat", stat: "sefFarkindalik", delta: 20, note: "ŞEF HARUN YERİNİ MERKEZİNDEN İZLİYOR" },
        { type: "system", text: "HOPARLÖR: \"...SIFIR. OYUN BAŞLADI.\"" },
      ],
      choices: [{ id: "ilerle", text: "Aceleyle Karantina Koridoru'na kaç", next: "n_karantina" }],
    },

    /* --- NEVİN'İN LABORATUVARI --- */
    n_lab_kapi: {
      cost: 3,
      events: [
        { type: "narrate", text: "Kapı kilitli. Elektronik panelde 'NEVİN' yazıyor. Kapının önünde boş yemek tabakları var, üzerleri tozlanmış ama tabaklar tertemiz sıyrılmış. İçeriden tırnak kazıma sesleri geliyor." },
      ],
      choices: [
        { id: "frekans_dene", text: "Telsizden 'Islak Nefes' (421.8) frekansını kapıya dinlet", next: "n_lab_acildi", if: { flag: "frekansIslakNefes", equals: true } },
        { id: "vazgec", text: "Kapıyı bırak ve koridora dön", next: "n_karantina" }
      ],
    },

    n_lab_acildi: {
      cost: 2,
      events: [
        { type: "narrate", text: "Frekans sesini duyan manyetik kilit sarsılarak açılıyor. İçeri süzülüyorsun. Nevin ortada yok, ama masanın üzerinde parlayan bir biyolojik veri diski ve yedek parça var." },
        { type: "flag", set: { labKanitBulundu: true } },
        { type: "battery", spares: 1 },
        {
          type: "document",
          doc: {
            id: "d_nevin_not",
            title: "Nevin'in Son Laboratuvar Notu",
            meta: "SINIR-1 BİYOLOJİK ARŞİV · K-5",
            body: "Onlar hücre bazında ölmüyor. Unutuyorlar. Önce isimlerini, sonra acıyı, en son da insan olduklarını. Kerem kıyafetin içinde hâlâ inliyor çünkü Aile oka bir görev verdi. Harun ise yukarıda, bizi yüzeye bağlayan asansörün anahtarını elinde tutuyor. Eğer bu notu okuyan biri varsa: Deniz'e güvenme. O hâlâ insan ama insaniyetini tamamen kaybetmiş."
          }
        },
        { type: "stat", stat: "akil", delta: -10, note: "GERÇEKLER AKIL SAĞLIĞINI ZORLUYOR" }
      ],
      choices: [{ id: "cik", text: "Laboratuvardan çık ve koridora geç", next: "n_karantina" }],
    },

    /* --- KARANTİNA KORİDORU DEVRİYESİ --- */
    n_karantina_kos: {
      cost: 1,
      events: [
        { type: "stat", stat: "gurultu", delta: 20, note: "KOŞMA SESLERİ KORİDORDA YANKILANDI" }
      ],
      choices: [{ id: "devam", text: "Koridora gir", next: "n_karantina" }],
    },

    n_karantina: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Karantina koridorunun tavanındaki havalandırma boruları sırılsıklam. Aşağıya sürekli paslı su damlıyor. İleride K-5 ana çıkış kapısı görünüyor." },
        { type: "narrate", text: "Bölüm 1'de bıraktığın gürültü izleri ve İnleyen'in farkındalığı yüzünden koridorun sonundaki gölge hareketleniyor.", if: { flag: "isaretlendin", equals: true } },
        { type: "narrate", text: "Koridor şu an için sakin görünüyor ancak tetiktesin.", if: { flag: "isaretlendin", equals: false } },
      ],
      choices: [
        { id: "sessiz_ilerle", text: "Duvara yaslanarak sessizce süzül", next: "n_karantina_sessiz" },
        { id: "pusu_kontrol", text: "Telsiz frekanslarını (437.4) tarayarak ilerle", next: "n_karantina_tarama", if: { flag: "frekansCocukSayimi", equals: true } },
      ],
    },

    n_karantina_sessiz: {
      cost: 3,
      noiseGate: [{ min: 40, once: "koridor_pusu", node: "n_koridor_yakalanma" }],
      events: [
        { type: "narrate", text: "Adımlarını milim milim atıyorsun. Tavandaki devasa borulardan birinin içinden ağır bir inleme geliyor. İnleyen tam üstünde!" },
        { type: "system", text: "NEFESİNİ TUT VE HAREKETSİZ KAL" },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 11000, success: "n_koridor_gecis", fail: "n_koridor_yakalanma" },
    },

    n_karantina_tarama: {
      cost: 2,
      events: [
        { type: "narrate", text: "Telsizden çocuk sesinin sayım frekansını (`437.4`) açıyorsun. Parazitlerin hızı, tavan borularındaki canlının hareketine göre değişiyor. Resmen bir radar!" },
        { type: "narrate", text: "Sesin en yoğun olduğu an durup, uzaklaştığı an ilerleyerek tehlikeyi tamamen atlatıyorsun." },
        { type: "stat", stat: "gurultu", delta: -10 },
      ],
      choices: [{ id: "kapı", text: "K-5 Ana Çıkış Kapısına Ulaş", next: "n_k5_kapi" }],
    },

    n_koridor_gecis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Borulardan sızan paslı su omzuna dökülüyor ama gıkını bile çıkarmıyorsun. İnleyen üst platformdaki tünellere doğru tırmanarak gözden kayboluyor." },
      ],
      choices: [{ id: "kapi", text: "Ana kapıya yaklaş", next: "n_k5_kapi" }],
    },

    n_koridor_yakalanma: {
      death: true, cost: 0,
      deathText: "İnleyen seni boruların arasından tek bir hamlede söküp aldı.",
      events: [
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Ciğerlerin pes ediyor veya çıkardığın ses tavan sacını patlatıyor. Yukarıdan sarkan o paslı, devasa dalış eldiveni boğazına yapışıyor." },
      ],
    },

    /* --- FEDA MEKANİZMASI VE BÖLÜM ÇIKIŞI --- */
    n_k5_kapi: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "K-5 Yaşam Destek katının çıkış kapısındasın. Bu kapı yukarıya, asansör sığınağına açılıyor. Ancak panel tamamen kararmış; manyetik kilidi açmak için büyük bir enerji patlaması veya sistem bypass'ı gerekiyor." },
        { type: "system", text: "SİSTEM BYPASS SEÇENEKLERİ" },
      ],
      choices: [
        { id: "feda_pil", text: "Yedek Güç Hücresini feda et (Paneli aşırı yükle)", next: "n_cikis_pil", ifBattery: { gte: 1 } },
        { id: "feda_kan", text: "Biyometrik iğneye kendi kanını ver (Sistemi manipüle et)", next: "n_cikis_kan" },
      ],
    },

    n_cikis_pil: {
      cost: 1,
      events: [
        { type: "battery", spares: -1 },
        { type: "system", text: "YEDEK GÜÇ HÜCRESİ TÜKENDİ — PANEL AŞIRI YÜKLENDİ" },
        { type: "narrate", text: "Güç hücresini panele kısa devre yaptırıyorsun. Kıvılcımlar saçarak yanan panel son bir gayretle ağır çelik kapıyı iki yana doğru açıyor." },
      ],
      choices: [{ id: "bitir", text: "Açılan aralıktan K-4 Tünellerine kaç", next: "n_k5_son" }],
    },

    n_cikis_kan: {
      cost: 1,
      events: [
        { type: "stat", stat: "akil", delta: -25, note: "AKIL SAĞLIĞI VE FİZİKSEL DİRENÇ BÜYÜK DARBE ALDI" },
        { type: "narrate", text: "Elini biyometrik acil durum iğnesine bastırıyorsun. Sistem kanındaki yoğun adrenalini ve korkuyu tarıyor. Deniz interkomdan kahkaha atıyor: 'Kendi canından veren teknisyen... Harun bunu sevecek.'" },
        { type: "flag", set: { kanVerildi: true } },
      ],
      choices: [{ id: "bitir", text: "Halsizce kapıdan geç", next: "n_k5_son" }],
    },

    n_k5_son: {
      checkpoint: true, cost: 0, // ending: true kaldırıldı!
      events: [
        { type: "system", text: "K-5 YAŞAM DESTEK KATINDAN ÇIKILDI" },
        { type: "narrate", text: "Arkanızdan kapanan kapının sesiyle K-5'in o ıslak iniltileri geride kalıyor. Önünde dik, karanlık ve merdivenleri çökmüş bir tünel ağı uzanıyor: K-4 Asansör Boşluğu." },
        { type: "pause", ms: 600 },
        { type: "system", text: "BÖLÜM SONU. BÖLÜM 3: K-4 TÜNEL VE ASANSÖR SAVAŞINA GEÇİLİYOR." },
      ],
      choices: [
        {
          id: "bolum3_gecis",
          text: "K-4 Tünellerine Doğru Tırman",
          next: "n_k4_giris" // Bölüm 3 dosyasındaki başlangıç node ID'si
        }
      ]
    },
  },
};

export const EP02_FLAGS = {
  interkomSusturuldu: false,
  labKanitBulundu: false,
  kanVerildi: false,
};