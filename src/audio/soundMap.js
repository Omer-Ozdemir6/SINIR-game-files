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
  buzz: "/audio/sfx/buzz.mp3",       // hata vızıltısı
  clank: "/audio/sfx/clank.mp3",      // metal darbe (vana turu, kilit)
  tick: "/audio/sfx/tick.mp3",       // klavye tık'ı (intro)
  click: "",      // arayüz buton tıklaması
  scratch: "/audio/sfx/scratch.mp3",    // kalemle not yazma
  page: "/audio/sfx/page.mp3",       // kâğıt/sayfa hışırtısı
  pickup: "/audio/sfx/pickup.mp3",     // pil/eşya alma
  valve: "/audio/sfx/valve.mp3",      // vana gıcırtısı
  fuse: "/audio/sfx/fuse.mp3",       // sigorta oturması
  objective: "/audio/sfx/objective.mp3",  // yeni görev çanı
  boom: "",       // ölüm/darbe vuruşu
  glitch: "/audio/sfx/glitch.mp3",     // parazit patlaması
  heartbeat: "/audio/sfx/heartbeat.mp3",  // TEK kalp vuruşu (ritmi motor tekrarlar)
};

export const MUSIC_FILES = {
  // Menü / arayüz parçaları
  menu: "/audio/music/menu.wav",      // ana menü müziği (New Game/Continue'a kadar çalar)
  intro: "/audio/music/intro.wav",     // intro mail sekansı müziği
  credits: "/audio/music/credits.wav",   // credits ekranı müziği
  archive: "/audio/music/archive.wav",   // ayarlar / arşiv menü müziği
  // Bölüm/atmosfer parçaları — hikayede { type: "music", track: "k6" }
  // ile başlar, { type: "music" } (track'siz) ile susar.
  k6: "/audio/music/k6.wav",         // makine dairesi ambiyansı
  k5: "/audio/music/k5.wav",         // yaşam destek / Deniz'in katı
  k2: "/audio/music/k2.wav",         // buluntu / kazı — final
  k3: "/audio/music/k3.wav",         // bahçe / Dr. Nevin'in katı
  k4: "/audio/music/k4.wav",         // ev / Şef Harun'un katı
  chase: "/audio/music/chase.wav",      // kovalamaca
  hide: "/audio/music/hide.wav",       // saklanma gerilimi
  safe: "/audio/music/safe.wav",       // checkpoint/güvenli an nefesi
};

// Sürekli dip ambiyans (46Hz sentetik uğultunun yerine geçer):
export const AMBIENT_FILE = ""; // örn "/audio/amb/derin-ugultu.ogg"
