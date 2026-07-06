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
  clank: "/public/audio/sfx/clank.mp3",      // metal darbe (vana turu, kilit)
  tick: "/public/audio/sfx/tick.mp3",       // klavye tık'ı (intro)
  click: "/public/audio/sfx/click.mp3",      // arayüz buton tıklaması
  scratch: "/public/audio/sfx/scratch.mp3",    // kalemle not yazma
  page: "/public/audio/sfx/page.mp3",       // kâğıt/sayfa hışırtısı
  pickup: "/public/audio/sfx/pickup.mp3",     // pil/eşya alma
  valve: "/public/audio/sfx/valve.mp3",      // vana gıcırtısı
  fuse: "/public/audio/sfx/fuse.mp3",       // sigorta oturması
  objective: "/public/audio/sfx/objective.mp3",  // yeni görev çanı
  boom: "/public/audio/sfx/boom.mp3",       // ölüm/darbe vuruşu
  glitch: "/public/audio/sfx/glitch.mp3",     // parazit patlaması
  heartbeat: "/public/audio/sfx/heartbeat.mp3",  // TEK kalp vuruşu (ritmi motor tekrarlar)
};

export const MUSIC_FILES = {
  // Menü / arayüz parçaları
  menu: "",      // ana menü müziği (New Game/Continue'a kadar çalar)
  intro: "",     // intro mail sekansı müziği
  credits: "",   // credits ekranı müziği
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
