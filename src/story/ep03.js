/* ============================================================
   SINIR-1 — BÖLÜM 03: "K-4 / ASANSÖR BOŞLUĞU VE TÜNELLER"
   Saf hikaye verisi. Bölüm 4 geçiş yapısı entegre edilmiştir.
   ============================================================ */

export const EP03 = {
  start: "n_k4_baslangic",
  nodes: {
    n_k4_baslangic: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-4 ASANSÖR BOŞLUĞU — YEREL SAAT 04:45" },
        { type: "objective", text: "Asansör motorunu elle çalıştır ve K-3 seviyesine tırman." },
        { type: "narrate", text: "K-5'ten çıkan koridor, devasa bir dikey boşluğa açılıyor. Burası tüm istasyonu yukarı bağlayan asansör kuyusu. Ancak asansör kabini yukarıda kilitli kalmış, paslı çelik halatlar gerim gerim gergin duruyor." },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Yukarıdan, asansörün motor dairesinden sert, emredici ve yaşlı bir ses telsizine sızıyor. Şef Harun:" },
        { type: "system", text: "TELSİZ (Harun): \"Aşağıdaki teknisyen... Sesini duyuyorum. Pompaları açıp istasyonu Deniz'in eğlence parkına çevirdin. Ama asansörün anahtarı bende. Yukarı çıkmak istiyorsan, Aile'nin kurallarına uymak zorundasın.\"" },
      ],
      choices: [
        { id: "halat", text: "Halatları ve bakım merdivenlerini kullanarak tırmanmaya baş", next: "n_tirmanis" },
        { id: "kontrol", text: "Kuyu tabanındaki acil durum jeneratörünü incele", next: "n_kuyu_taban" },
      ],
    },

    /* --- DIKEY TIRMANIŞ VE TEHLİKE --- */
    n_tirmanis: {
      cost: 3,
      events: [
        { type: "narrate", text: "Merdivenlerin yarısı çürümüş. Halatlara tutunarak yukarı doğru tırmanıyorsun. Tam o sırada yukarıdan büyük bir metal gıcırtısı kopuyor. Asansör kabini milim milim aşağı kayıyor!" },
        { type: "glitch", ms: 400 },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "saga_atla", text: "Sağdaki dar havalandırma tüneline kendini fırlat", next: "n_tunel_kacis" },
        { id: "siki_tutun", text: "Merdiven profilinin arkasına geç, sıkıca tutun", next: "n_olum_halat", default: true },
      ],
    },

    n_olum_halat: {
      death: true, cost: 0,
      deathText: "Gerilen çelik halatların kopma anındaki gücü, bir insanı ikiye bölmeye yetecek düzeydeydi.",
      events: [
        { type: "glitch", ms: 900 },
        { type: "narrate", text: "Olduğun yerde kalıyorsun. Yukarıdan kopan devasa bir kılavuz makarası tam üstüne düşüyor ve merdivenlerle birlikte seni kuyunun dibine sürüklüyor." },
      ],
    },

    /* --- TÜNEL AĞI --- */
    n_tunel_kacis: {
      cost: 2,
      events: [
        { type: "narrate", text: "Son anda dar bir tünel ağının içine yuvarlanıyorsun. Arkanda, asansör boşluğunda kopan halatların çıkardığı kıvılcımlar karanlığı aydınlatıyor. Bu tüneller K-4'ün eski bakım dehlizleri." },
        { type: "stat", stat: "gurultu", delta: 10 },
      ],
      choices: [
        { id: "ilerle", text: "Tünelin içindeki ışığa doğru sürün", next: "n_motor_odasi_on" }
      ],
    },

    n_kuyu_taban: {
      cost: 4,
      events: [
        { type: "narrate", text: "Kuyunun dibindeki balçık ve paslı suyun içinde eski bir alet çantası buluyorsun. İçinde asansörün fren mekanizmasını manuel olarak gevşetecek bir hidrolik kol var." },
        { type: "battery", spares: 1 },
        { type: "flag", set: { hidrolikKolAlindi: true } },
      ],
      choices: [{ id: "tirman", text: "Şimdi yukarı tırmanmaya baş", next: "n_tirmanis" }],
    },

    /* --- ASANSÖR MOTOR ODASI --- */
    n_motor_odasi_on: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Tünelin sonundaki menfezi iterek motor dairesine çıkıyorsun. Büyük hidrolik motor tam ortada duruyor ama kilitlenmiş. Yanında ise... Şef Harun ayakta bekliyor. Elinde ağır bir boru anahtarı var, gözleri tamamen kararmış." },
        { type: "system", text: "ŞEF HARUN SİZİ İZLİYOR — FARKINDALIK: YÜKSEK", ifStat: { stat: "sefFarkindalik", gte: 30 } },
      ],
      choices: [
        { id: "harun_konus", text: "Harun ile konuşmayı dene", next: "n_harun_diyalog" },
        { id: "motora_atla", text: "Harun'u boş ver, doğrudan motor vanasına atla", next: "n_motor_vana_hizli", if: { flag: "hidrolikKolAlindi", equals: true } },
        { id: "saldir", text: "Karanlıktan faydalanıp Harun'a arkadan saldır", next: "n_harun_saldir" },
      ],
    },

    /* --- HARUN YÜZLEŞMESİ (DİYALOG VE SEÇENEKLER) --- */
    n_harun_diyalog: {
      cost: 1,
      events: [
        { type: "narrate", text: "Harun'a doğru bir adım atıyorsun. 'Yukarı çıkmak zorundayım, istasyon çöküyor' diyorsun. Harun acı bir tebessümle boru anahtarını kaldırıyor: 'Çöken istasyon değil evlat, senin zihnin. Aile bizi koruyor. Nevin de bunu anlamadı, gitmek istedi...'" },
      ],
      choices: [
        { id: "nevin_kanit", text: "Nevin'in laboratuvar notunu yüzüne vur", next: "n_harun_nevin_etki", if: { flag: "labKanitBulundu", equals: true } },
        { id: "ikna_et", text: "Onu istasyonun durumuna ikna etmeye çalış", next: "n_harun_ikna_hata" },
      ],
    },

    n_harun_nevin_etki: {
      cost: 2,
      events: [
        { type: "narrate", text: "Nevin'in diskini ve son notunu çıkarıp ona gösteriyorsun: 'Onun hücre bazında değil, insanlığını unutarak öldüğünü biliyordun! Seni de burada unuttular Harun!' diyorsun." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Harun elindeki boru anahtarını yavaşça indiriyor. Gözlerindeki o katı, kararmış ifade yerini derin bir çökmüşlüğe bırakıyor. Ağlamaya başlıyor: 'Ben... ben sadece onu korumak istemiştim... Al. Asansörün anahtar kartı bu. Git buradan.'" },
        { type: "flag", set: { harunIknaOldu: true } },
        { type: "stat", stat: "akil", delta: 10, note: "BİR İNSANI KURTARDIN — AKIL SAĞLIĞI DÜZELDİ" },
      ],
      choices: [{ id: "motor_ac", text: "Asansör vanasını çevirerek sistemi başlat", next: "n_motor_vana_etkilesim" }],
    },

    n_harun_ikna_hata: {
      cost: 1,
      events: [
        { type: "narrate", text: "Sözlerin onun o sarsılmaz Aile inancına çarpıp geri dönüyor. 'Yalan söylüyorsun! Deniz bize yeni bir hayat vadetti!' diye kükrüyor ve üzerimize doğru hamle yapıyor." },
        { type: "stat", stat: "gurultu", delta: 20 },
      ],
      choices: [{ id: "kac_vana", text: "Darbeden kaç ve motor vanasına sığın", next: "n_motor_vana_etkilesim" }],
    },

    n_harun_saldir: {
      cost: 2,
      events: [
        { type: "narrate", text: "Karanlıktan atılıp Harun'un elindeki anahtarı almaya çalışıyorsun. Büyük bir boğuşma başlıyor. İhtiyar beklenmedik bir güçle seni motora doğru fırlatıyor." },
        { type: "stat", stat: "akil", delta: -15 },
        { type: "stat", stat: "gurultu", delta: 25 },
      ],
      choices: [{ id: "savun", text: "Yerden kalk ve motor vanasına asıl", next: "n_motor_vana_etkilesim" }],
    },

    /* --- MOTOR AKTİVASYONU (`valve`) --- */
    n_motor_vana_hizli: {
      cost: 2,
      events: [
        { type: "narrate", text: "Harun ne olduğunu anlayamadan hidrolik kolu mekanizmaya sokup asılıyorsun! Sistem hızla hidrolik boşaltıyor." },
      ],
      choices: [{ id: "devam", text: "Vanayı sonuna kadar çevir", next: "n_motor_vana_etkilesim" }],
    },

    n_motor_vana_etkilesim: {
      cost: 3,
      events: [
        { type: "narrate", text: "Asansörü yukarı çekecek ana hidrolik basınç vanasını iki elinle kavrayıp tüm gücünle döndürmeye başlıyorsun." },
        { type: "system", text: "HİDROLİK VANAYI DÖNDÜR — MAKSIMUM BASINCA ULAŞ" },
      ],
      interaction: { kind: "valve", turns: 12, success: "n_asansor_calisti", cancel: "n_motor_odasi_on" },
    },

    n_asansor_calisti: {
      checkpoint: true, cost: 1,
      events: [
        { type: "system", text: "ASANSÖR MOTORU: AKTİF ▮ — KABİN K-4 SEVİYESİNE İNDİ" },
        { type: "narrate", text: "Büyük bir metalik gümbürtüyle asansör kabini önümüzdeki platforma oturuyor. Eğer Harun'u ikna edemediysen arkandan öfkeyle geliyor; eğer ikna ettiysen orada öylece çöküp kalıyor." },
        { type: "narrate", text: "Harun arkandan yaşlı gözlerle bakıyor: 'Yukarıda... K-3 Arkeoloji Ambarı'nda... Şefin odasına git. Gerçek orada.'", if: { flag: "harunIknaOldu", equals: true } },
      ],
      choices: [
        { id: "kabine_bin", text: "Asansör kabinine bin ve kapıyı kapat", next: "n_k4_sonislem" }
      ],
    },

    /* --- BÖLÜM ÇIKIŞI --- */
    n_k4_sonislem: {
      checkpoint: true, cost: 0, // ending: true kaldırıldı!
      events: [
        { type: "narrate", text: "Kabine girip çelik sürgüyü çekiyorsun. Kabin büyük bir sarsıntıyla yukarı, K-3 seviyesine doğru ivmeleniyor. K-4'ün karanlık tünelleri aşağıda kalırken telsizinden bir kez daha o çocuk frekansı statik gürültüyle cızlıyor." },
        { type: "pause", ms: 700 },
        { type: "system", text: "K-4 ASANSÖR BOŞLUĞUNDAN ÇIKILDI — ÜST KATLARA İLERLENİYOR" },
        { type: "objective", text: "K-3: ARKEOLOJİ AMBARI KATINA GEÇİLİYOR." },
      ],
      choices: [
        {
          id: "bolum4_gecis",
          text: "K-3 Arkeoloji Ambarı'na Giriş Yap",
          next: "n_k3_giris" // Bölüm 4 dosyanızın başlangıç node ID'si
        }
      ]
    },
  },
};

export const EP03_FLAGS = {
  hidrolikKolAlindi: false,
  harunIknaOldu: false,
};