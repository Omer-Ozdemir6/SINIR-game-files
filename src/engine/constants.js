// Yayın modu: true iken geliştirici araçları (bulmaca testi) gizlenir.
export const IS_RELEASE = false;

/* SINIR-1 — MOTOR SABİTLERİ
   Bölüme özel veriler (bayraklar, hikaye) src/story/ altındadır;
   burada yalnız motorun genel ayarları durur. */

export const STAT_MAX = { gurultu: 100, eceGuven: 100, denizOfke: 100, sefFarkindalik: 100 };

export const BATTERY_START = 25;   // yeni oyunda pil yüzdesi (düşük — yedek yönetimi kritik)
export const SPARES_START = 1;     // yeni oyunda 1 yedek pil (başlangıç güvencesi)
export const SPARES_MAX = 5;       // taşınabilecek maksimum yedek pil

// Gürültü oyun baskısıdır; diğerleri gizli anlatı statlarıdır:
// eceGuven (Ece'nin sana güveni), denizOfke (Deniz'in tavrı),
// sefFarkindalik (Harun'un seni ne kadar bildiği — pusu baskısı)
export const INITIAL_STATS = { gurultu: 0, eceGuven: 0, denizOfke: 0, sefFarkindalik: 0 };

// Lights-Out bulmacası başlangıç dizilimi (çözüm daha uzun: 1, 3, 5, 7)
export const LIGHTS_INIT = [false, true, false, true, false, true, false];

export const DOC_LINES_PER_PAGE = 14;

export const SPEED_OPTIONS = [
  { labelKey: "settings.speedSlow", mult: 1.85 },
  { labelKey: "settings.speedNormal", mult: 1.25 },
  { labelKey: "settings.speedFast", mult: 0.75 },
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
   Gürültü sürekli izlenir; eşik aşılınca sistem tetiklenir.
   Geri dönüşü yoktur — oyuncu dikkatli oynamalı.
   'noise' eşikleri: gürültü YÜKSELİNCE tehlike artar. */
export const NOISE_THRESHOLDS = [
  { at: 45, key: "noiseWarn60", kind: "warn" },   // erken uyarı: avcı dikkatini çektin
  { at: 70, key: "noiseWarn80", kind: "warn" },   // ciddi uyarı: son şans, sessizleş
  { at: 90, key: "noiseDeath", kind: "death" },   // gürültü tavan: avcı bulur → ölüm
];
