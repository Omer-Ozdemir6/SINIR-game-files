// Yayın modu: true iken geliştirici araçları (bulmaca testi) gizlenir.
export const IS_RELEASE = true;

/* SINIR-1 — MOTOR SABİTLERİ
   Bölüme özel veriler (bayraklar, hikaye) src/story/ altındadır;
   burada yalnız motorun genel ayarları durur. */

export const STAT_MAX = { gurultu: 100, akil: 100, eceGuven: 100, denizOfke: 100, sefFarkindalik: 100 };

export const BATTERY_START = 42;   // yeni oyunda pil yüzdesi
export const SPARES_START = 0;     // yeni oyunda yedek pil sayısı

// gurultu/akil ekranda görünür; diğerleri gizli anlatı statlarıdır:
// eceGuven (Ece'nin sana güveni), denizOfke (Deniz'in tavrı),
// sefFarkindalik (Harun'un seni ne kadar bildiği — pusu baskısı)
export const INITIAL_STATS = { gurultu: 0, akil: 100, eceGuven: 0, denizOfke: 0, sefFarkindalik: 0 };

// Lights-Out bulmacası başlangıç dizilimi (çözüm: 2. ve 4. butonlar)
export const LIGHTS_INIT = [false, false, true, false, false];

export const DOC_LINES_PER_PAGE = 14;

export const SPEED_OPTIONS = [
  { labelKey: "settings.speedSlow", mult: 1.5 },
  { labelKey: "settings.speedNormal", mult: 1 },
  { labelKey: "settings.speedFast", mult: 0.45 },
];

// Karanlık modu: pil %0'a inince oyun DURMAZ — ekran pırpırlı
// karanlığa düşer, oyuncu bu süre içinde pil bulup takamazsa ölür.
export const DARK_MS = 75000;
