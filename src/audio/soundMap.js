/* ============================================================
   SINIR-1 — SES DOSYASI HARİTASI
   Bir sese GERÇEK KAYIT bağlamak için: dosyayı public/audio/
   altına koy ve buradaki yolunu doldur. Boş ("") bırakılan her
   isim otomatik olarak sentetik (Tone.js) sese düşer — yani
   dosya ekledikçe oyun parça parça gerçek sese geçer, hiçbir
   kod değişikliği gerekmez.

   Örnek: blip: "/audio/sfx/blip.ogg"
   Desteklenen formatlar: mp3 / ogg / wav (tarayıcı ne çalarsa)
   ============================================================ */

export const SFX_FILES = {
  blip: "",       // arayüz bip'i (tuşlar, onaylar)
  buzz: "",       // hata vızıltısı
  clank: "",      // metal darbe (vana turu, kilit)
  tick: "",       // klavye tık'ı (intro)
  scratch: "",    // kalemle not yazma
  page: "",       // kâğıt/sayfa hışırtısı
  pickup: "",     // pil/eşya alma
  valve: "",      // vana gıcırtısı
  fuse: "",       // sigorta oturması
  objective: "",  // yeni görev çanı
  boom: "",       // ölüm/darbe vuruşu
  glitch: "",     // parazit patlaması
  heartbeat: "",  // TEK kalp vuruşu (ritmi motor tekrarlar)
};

export const MUSIC_FILES = {
  // Bölüm/atmosfer parçaları — hikayede { type: "music", track: "k6" }
  // ile başlar, { type: "music" } (track'siz) ile susar.
  k6: "",         // makine dairesi ambiyansı
  k5: "",         // yaşam destek / Deniz'in katı
  k2: "",         // buluntu / kazı — final
  k3: "",         // bahçe / Dr. Nevin'in katı
  k4: "",         // ev / Şef Harun'un katı
  chase: "",      // kovalamaca
  hide: "",       // saklanma gerilimi
  safe: "",       // checkpoint/güvenli an nefesi
};

// Sürekli dip ambiyans (46Hz sentetik uğultunun yerine geçer):
export const AMBIENT_FILE = ""; // örn "/audio/amb/derin-ugultu.ogg"
