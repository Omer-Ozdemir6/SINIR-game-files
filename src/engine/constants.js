// Yayın modu: true iken geliştirici araçları (bulmaca testi) gizlenir.
export const IS_RELEASE = true;

/* SINIR-1 — MOTOR SABİTLERİ
   Bölüme özel veriler (bayraklar, hikaye) src/story/ altındadır;
   burada yalnız motorun genel ayarları durur. */

export const STAT_MAX = { gurultu: 100, akil: 170, eceGuven: 100, denizOfke: 100, sefFarkindalik: 100 };

export const BATTERY_START = 25;   // yeni oyunda pil yüzdesi (düşük — yedek yönetimi kritik)
export const SPARES_START = 1;     // yeni oyunda 1 yedek pil (başlangıç güvencesi)
export const SPARES_MAX = 5;       // taşınabilecek maksimum yedek pil

// gurultu/akil ekranda görünür; diğerleri gizli anlatı statlarıdır:
// eceGuven (Ece'nin sana güveni), denizOfke (Deniz'in tavrı),
// sefFarkindalik (Harun'un seni ne kadar bildiği — pusu baskısı)
export const INITIAL_STATS = { gurultu: 0, akil: 85, eceGuven: 0, denizOfke: 0, sefFarkindalik: 0 };

// Lights-Out bulmacası başlangıç dizilimi (çözüm: 2. ve 4. butonlar)
export const LIGHTS_INIT = [false, true, true, true, false];

export const DOC_LINES_PER_PAGE = 14;

export const SPEED_OPTIONS = [
  { labelKey: "settings.speedSlow", mult: 1.5 },
  { labelKey: "settings.speedNormal", mult: 1 },
  { labelKey: "settings.speedFast", mult: 0.45 },
];

// Karanlık modu: pil %0'a inince oyun DURMAZ — ekran pırpırlı
// karanlığa düşer, oyuncu bu süre içinde pil bulup takamazsa ölür.
export const DARK_MS = 75000;

/* ---- OTOMATİK PİL AZALMASI (Outlast tarzı) ----
   Pil oyun boyunca SÜREKLI azalır — tablet açık, eriyor.
   Oyuncu yedek pille değiştirmek zorunda. Bu, pili gerçek
   bir kaynak baskısına dönüştürür.
   BATTERY_DRAIN_MS: kaç ms'de bir %1 azalır (normal durum).
   Düşük = hızlı tükenir. */
export const BATTERY_DRAIN_MS = 3000;      // her 6 sn'de %1 (normal) → ~%42 pil ≈ 4 dk
export const BATTERY_DRAIN_TENSE = 1500;   // gerilim/keşif anında daha hızlı

/* ---- MERKEZÎ EŞİK SİSTEMİ (her bölümde otomatik çalışır) ----
   Gürültü ve akıl sürekli izlenir; eşik aşılınca sistem tetiklenir.
   Geri dönüşü yoktur — oyuncu dikkatli oynamalı.
   'noise' eşikleri: gürültü YÜKSELİNCE tehlike artar.
   'sanity' eşikleri: akıl DÜŞÜNCE tehlike artar. */
export const NOISE_THRESHOLDS = [
  { at: 45, key: "noiseWarn60", kind: "warn" },   // erken uyarı: avcı dikkatini çektin
  { at: 70, key: "noiseWarn80", kind: "warn" },   // ciddi uyarı: son şans, sessizleş
  { at: 90, key: "noiseDeath", kind: "death" },   // gürültü tavan: avcı bulur → ölüm
];
export const SANITY_THRESHOLDS = [
  { at: 50, key: "sanityWarn40", kind: "warn" },  // uyarı: gerçeklik kayıyor
  { at: 25, key: "sanityWarn20", kind: "warn" },  // ciddi: zihin dağılıyor
  { at: 0,  key: "sanityDeath",  kind: "death" }, // akıl sıfır: çöküş → ölüm
];
