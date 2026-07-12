/* ============================================================
   SINIR-1 — SES DOSYASI HARİTASI
   Bir sese GERÇEK KAYIT bağlamak için: dosyayı public/audio/
   altına koy ve buradaki yolunu doldur. Boş ("") bırakılan her
   isim SESSİZ kalır — sentetik/sahte bir sesle telafi edilmez.
   Dosya ekledikçe oyun parça parça sese kavuşur, kod değişikliği
   gerekmez.

   Örnek: blip: "/audio/sfx/blip.ogg"
   Desteklenen formatlar: mp3 / ogg / wav (tarayıcı ne çalarsa)
   ============================================================ */

export const SFX_FILES = {
  blip: "",       // arayüz bip'i (tuşlar, onaylar)
  buzz: "/audio/sfx/buzz.mp3",       // hata vızıltısı
  clank: "/audio/sfx/clank.mp3",      // metal darbe (vana turu, kilit)
  tick: "/audio/sfx/tick.mp3",       // klavye tık'ı (intro)
  click: "",      // arayüz buton tıklaması
  mouseButton: "/audio/sfx/mouse_button.mp3", // fare tık'ı (intro ekranı butonları)
  scratch: "/audio/sfx/scratch.mp3",    // kalemle not yazma
  page: "/audio/sfx/page.mp3",       // kâğıt/sayfa hışırtısı
  pickup: "/audio/sfx/pickup.mp3",     // pil/eşya alma
  valve: "/audio/sfx/valve.mp3",      // vana gıcırtısı
  fuse: "/audio/sfx/fuse.mp3",       // sigorta oturması
  objective: "/audio/sfx/objective.mp3",  // yeni görev çanı
  boom: "",       // ölüm/darbe vuruşu
  glitch: "/audio/sfx/glitch.mp3",     // parazit patlaması
  heartbeat: "/audio/sfx/heartbeat.mp3",  // TEK kalp vuruşu (ritmi motor tekrarlar)
  batteryLow: "/audio/sfx/batterylow.mp3", // pil zayıf uyarısı
  panelSound: "/audio/sfx/panelsound.mp3", // ana kontrol paneli — büyük kırmızı buton aktivasyonu
  radioStatic: "/audio/sfx/radiostatic.mp3", // radyo frekans ayarı — arama sırasında döngüde çalar (kısık ses)
  keypadButton: "/audio/sfx/keypad_button.mp3", // şifre paneli — her tuşa (rakam/sil/onayla) basışta
  puzzleButton: "/audio/sfx/puzzle_button.mp3", // bulmaca dokunuşu — kablo seçme, karo/hexagon çevirme vb.

  // Outlast tarzı kısa gerilim müzikleri (sting) — her biri SADECE 5 katın
  // giriş anında, birer kere çalan kendine özgü bir parça. Genel/tekrarlı
  // bir sistem değil: 5 parça, 5 sabit yer. Çalarken ambiyansı/müziği
  // kısar, bitince geri getirir. Dosyayı buraya koyunca (mp3/ogg/wav)
  // otomatik devreye girer, kod değişikliği gerekmez.
  stingK6: "/audio/sfx/sting_k6.mp3",  // K-6 girişi (ep01)
  stingK5: "/audio/sfx/sting_k5.mp3",  // K-5 girişi (ep02)
  stingK4: "/audio/sfx/sting_k4.mp3",  // K-4 girişi (ep03)
  stingK3: "/audio/sfx/sting_k3.mp3",  // K-3 girişi (ep04)
  stingK2: "/audio/sfx/sting_k2.mp3",  // K-2 girişi (ep05, final)
};

export const MUSIC_FILES = {
  // Menü / arayüz parçaları
  menu: "/audio/music/main_menu.mp3",   // ana menü müziği (New Game/Continue'a kadar çalar)
  intro: "/audio/music/intro.mp3",     // intro mail sekansı müziği
  credits: "/audio/music/credits.mp3",   // credits ekranı müziği
  // NOT: "archive" (ayarlar/arşiv menü müziği) artık burada sabit bir
  // dosya değil — AudioSys.music() bunu AMBIENCE_POOL'dan rastgele
  // seçiyor (bkz. aşağıdaki havuz).
  endsound: "/audio/music/endsound.mp3", // final ekranı (EndingCards) — siyah ekranda yazılar akarken çalar

  // Bölüm giriş parçaları — hikayede { type: "music", track: "k6" }
  // ile başlar, { type: "music" } (track'siz) ile susar.
  k6: "/audio/music/ep01.mp3",  // K-6 girişi
  k5: "/audio/music/ep02.mp3",  // K-5 girişi
  k4: "/audio/music/ep03.mp3",  // K-4 girişi
  k3: "/audio/music/ep04.mp3",  // K-3 girişi
  k2: "/audio/music/ep05.mp3",  // K-2 girişi (final)

  // Bölüm "ikinci perde" parçaları — o bölümün dönüşü olmayan/final
  // sahnesine girerken devreye giriyor (bkz. hikaye dosyalarındaki
  // ilgili checkpoint düğümleri).
  k6b: "/audio/music/ep01-2.mp3",
  k5b: "/audio/music/ep02-2.mp3",
  k4b: "/audio/music/ep03-2.mp3",
  k3b: "/audio/music/ep04-2.mp3",
  k2b: "/audio/music/ep05-2.mp3",

  epRandom: "/audio/music/ep-random.mp3", // ep05'teki opsiyonel gizli tünel keşfi

  chase: "/audio/music/chase.mp3",      // kovalamaca
  hide: "/audio/music/hide.mp3",       // saklanma gerilimi
  safe: "/audio/music/safe.wav",       // checkpoint/güvenli an nefesi (rastgele döngü havuzunun bir parçası)
};

// Bölüm müziği bittiğinde ya da "güvenli an" durumuna dönüldüğünde bu
// havuzdan RASTGELE bir parça seçilip döngüde çalınır (hep aynı "safe"
// yerine çeşitlilik için).
export const LOOP_POOL = [
  "/audio/music/safe.wav",
  "/audio/music/loop2.mp3",
  "/audio/music/loop3.mp3",
  "/audio/music/underwater_loop.mp3",
];

// Sürekli dip ambiyans — oyun başında bu havuzdan RASTGELE bir parça
// seçilip döngüde arka planda çalar (46Hz sentetik uğultunun yerine
// geçer). Havuz boşsa sentetik uğultuya düşülür.
export const AMBIENCE_POOL = [
  "/audio/music/ambience1.mp3",
  "/audio/music/ambience2.mp3",
  "/audio/music/ambience3.mp3",
  "/audio/music/ambience4.mp3",
  "/audio/music/ambience5.mp3",
  "/audio/music/ambience6.mp3",
];

// Tekil sabit dip ambiyans dosyası (eski tek-dosya sistemi) — havuz
// tanımlıysa kullanılmaz, sadece AMBIENCE_POOL boşsa devreye girer.
export const AMBIENT_FILE = ""; // örn "/audio/amb/derin-ugultu.ogg"

// Vana çevirme sesi havuzu — her dokunuşta bu havuzdan rastgele bir dosya
// seçilir (bir öncekiyle aynısı tekrar gelmez), böylece art arda aynı vana
// çevrilse bile her basışta biraz farklı bir gıcırtı duyulur.
export const VALVE_POOL = [
  "/audio/sfx/valve.mp3",
  "/audio/sfx/valve1.mp3",
  "/audio/sfx/valve2.mp3",
  "/audio/sfx/valve3.mp3",
];
