import { SFX_FILES, MUSIC_FILES, AMBIENT_FILE, LOOP_POOL, AMBIENCE_POOL, VALVE_POOL } from "./soundMap";

export const AudioSys = {
  _bgAmbientTrack: "safe",
  _activeGameTrack: "safe",
  _isEpisodeTrack: false,
  _episodeTimer: null,
  _pausedGameTrack: null,
  _pausedGameTime: 0,
  _pausedMusicSrc: null,
  _pool: {},
  _musicEl: null,
  _musicTrack: null,
  _ambEl: null,
  _ambientOn: false,
  inited: false,
  enabled: true,
  heartId: null,

  // Tone.js/sentetik ses üretimi tamamen kaldırıldı — artık sadece gerçek
  // ses dosyaları çalınır. Dosya tanımlı değilse o ses sessizce çalınmaz
  // (sahte/üretilmiş bir sesle telafi edilmez).
  async init() {
    if (this.inited) return;
    this.inited = true;
    // Tarayıcı autoplay politikası, kullanıcı hiç dokunmadan otomatik
    // başlayan müziği sessizce engelleyebilir — ilk gerçek etkileşimde
    // bunu bir kez deneyip o an duraklamış olan parçayı devam ettiriyoruz.
    this.resumeIfBlocked();
  },

  playSample(name, vol = 1) {
    if (!this.enabled) return true;
    const src = SFX_FILES[name];
    if (!src) return false;
    try {
      const list = (this._pool[name] = this._pool[name] || []);
      let a = list.find((x) => x.paused || x.ended);
      if (!a) {
        a = new Audio(src);
        list.push(a);
      }
      a.volume = vol;
      a.currentTime = 0;
      a.play().catch(() => {});
      return true;
    } catch (e) {
      return false;
    }
  },

  music(track) {
    try {
      if (!track) {
        this._stopSampleMusic();
        this._activeGameTrack = null;
        this._pausedGameTrack = null;
        this._pausedGameTime = 0;
        return;
      }

      // Menü veya alet parçası mı kontrol et
      const isMenuTrack = (track === "menu" || track === "credits" || track === "intro" || track === "archive" || track === "endsound");

      if (!isMenuTrack) {
        this._activeGameTrack = track;
        this._isEpisodeTrack = (track !== this._bgAmbientTrack);

        if (this._episodeTimer) {
          clearTimeout(this._episodeTimer);
          this._episodeTimer = null;
        }
      }

      // "Güvenli an" döngüsü ve arşiv/ayarlar müziği sabit tek dosya
      // yerine kendi havuzlarından rastgele seçilir — her girişte
      // çeşitlilik olsun diye.
      const file = (track === this._bgAmbientTrack && LOOP_POOL.length)
        ? LOOP_POOL[Math.floor(Math.random() * LOOP_POOL.length)]
        : (track === "archive" && AMBIENCE_POOL.length)
        ? AMBIENCE_POOL[Math.floor(Math.random() * AMBIENCE_POOL.length)]
        : MUSIC_FILES[track];
      if (!file) return; // dosya tanımlı değil — sessiz kal, sentetiğe düşme

      if (this._musicTrack === track && this._musicEl) return;
      this._stopSampleMusic();

      const a = new Audio(file);
      // Menü ve arka plan müzikleri loop, bölüm/etkinlik müzikleri tek sefer çalar
      a.loop = isMenuTrack || (track === this._bgAmbientTrack);
      a.volume = 0.55;
      this._musicEl = a;
      this._musicTrack = track;

      // Bölüm/etkinlik müzikleri bittiğinde arka plan müziğine dön
      if (!isMenuTrack && this._isEpisodeTrack) {
        a.addEventListener("ended", () => {
          if (this._musicTrack === track) {
            this.fadeOutMusic(2500);
            setTimeout(() => {
              this.music(this._bgAmbientTrack);
            }, 2500);
          }
        });
      }

      if (this.enabled) a.play().catch(() => {});
    } catch (e) {}
  },

  // Bazı tarayıcılar, bir ses elemanının İLK çalışının doğrudan gerçek bir
  // tıklama anında olmasını şart koşar. "Sil"/"Hayır" gibi butonlar bilgisayar
  // ekranındaki imleç animasyonuyla PROGRAMATİK tıklanıyor (gerçek tıklama
  // değil) — sayfada daha önce gerçek tıklama olsa bile bu yüzden sessiz
  // kalabiliyorlar. Sayfadaki ilk gerçek tıklamada bu elemanları sessizce
  // (ses seviyesi 0) bir kez çalıp durdurarak önceden "kilidini açıyoruz".
  unlockSfx() {
    if (this._sfxUnlocked) return;
    this._sfxUnlocked = true;
    [["_tickEl", SFX_FILES.tick], ["_mouseEl", SFX_FILES.mouseButton]].forEach(([prop, src]) => {
      if (!src) return;
      try {
        const el = this[prop] || (this[prop] = new Audio(src));
        const vol = el.volume;
        el.volume = 0;
        el.play().then(() => {
          el.pause();
          el.currentTime = 0;
          el.volume = vol;
        }).catch(() => { el.volume = vol; });
      } catch (e) {}
    });
  },

  resumeIfBlocked() {
    try {
      if (this.enabled && this._musicEl && this._musicEl.paused) {
        this._musicEl.play().catch(() => {});
      }
    } catch (e) {}
  },

  fadeOutMusic(durationMs = 2500) {
    try {
      const audioEl = this._musicEl;
      if (!audioEl) return;
      // Elemanı hemen ayır ki bunun hemen ardından başlayacak yeni bir
      // parça (music()'in sert _stopSampleMusic çağrısı) bu fade'i
      // yarıda kesmesin; arka planda kendi başına sessizleşip dursun.
      this._musicEl = null;
      this._musicTrack = null;
      const startVol = audioEl.volume;
      const steps = 20;
      const intervalMs = durationMs / steps;
      let count = 0;
      const timer = setInterval(() => {
        count++;
        audioEl.volume = Math.max(0, startVol * (1 - count / steps));
        if (count >= steps) {
          clearInterval(timer);
          audioEl.pause();
        }
      }, intervalMs);
    } catch (e) {}
  },

  pauseGameMusic() {
    try {
      if (this._musicTrack && this._musicTrack !== "credits" && this._musicTrack !== "menu" && this._musicTrack !== "intro" && this._musicTrack !== "archive") {
        this._pausedGameTrack = this._musicTrack;
        if (this._musicEl) {
          this._pausedGameTime = this._musicEl.currentTime;
          this._pausedMusicSrc = this._musicEl.src; // hangi dosya çalıyordu — devam ederken aynısına dönmek için
          this._musicEl.pause();
          this._musicEl = null;
        }
        this._musicTrack = null;
      }
    } catch (e) {}
  },

  resumeGameMusic() {
    try {
      if (this._pausedGameTrack) {
        const track = this._pausedGameTrack;
        this._pausedGameTrack = null;

        // Duraklatılan dosya bellidir (_pausedMusicSrc) — "güvenli an" döngüsü
        // olsa bile rastgele yeni bir seçim yapmadan AYNI parçadan devam eder.
        const file = this._pausedMusicSrc || MUSIC_FILES[track];
        this._pausedMusicSrc = null;
        if (!file) return;

        // Arşiv/ayarlar müziği hâlâ çalıyor olabilir — yeni parçayı
        // başlatmadan önce KESİN durdur, yoksa iki müzik üst üste biner.
        this._stopSampleMusic();

        const a = new Audio(file);
        a.loop = (track === this._bgAmbientTrack);
        a.volume = 0.55;
        this._musicEl = a;
        this._musicTrack = track;
        if (this._pausedGameTime) {
          a.currentTime = this._pausedGameTime;
          this._pausedGameTime = 0;
        }
        if (this.enabled) a.play().catch(() => {});
      } else {
        this.music(this._bgAmbientTrack);
      }
    } catch (e) {}
  },

  _stopSampleMusic() {
    if (this._musicEl) this._musicEl.pause();
    this._musicEl = null;
    this._musicTrack = null;
  },

  ambient(on) {
    this._ambientOn = !!on;
    // Sürekli dip ambiyans: havuzdan rastgele seçilir (ilk açılışta bir kere),
    // sonra o parça döngüde çalar. Havuz boşsa tekil AMBIENT_FILE'a düşülür;
    // o da yoksa sessiz kalınır (sentetik uğultu artık yok).
    if (!AMBIENCE_POOL.length && !AMBIENT_FILE) return;
    try {
      if (on) {
        if (!this._ambEl) {
          const src = AMBIENCE_POOL.length ? AMBIENCE_POOL[Math.floor(Math.random() * AMBIENCE_POOL.length)] : AMBIENT_FILE;
          this._ambEl = new Audio(src);
          this._ambEl.loop = true;
          this._ambEl.volume = 0.35;
        }
        if (this.enabled) this._ambEl.play().catch(() => {});
      } else if (this._ambEl) {
        this._ambEl.pause();
      }
    } catch (e) {}
  },

  // Radyo frekans arama ekranı açıkken döngüde çalan statik parazit.
  // Dosya uzun olabileceği için kısık sesle döngüye alınır — oyunun
  // diğer seslerini bastırmaz, ekran kapanınca durur.
  radioStatic(on) {
    if (!SFX_FILES.radioStatic) return;
    try {
      if (on) {
        if (!this._radioStaticEl) {
          this._radioStaticEl = new Audio(SFX_FILES.radioStatic);
          this._radioStaticEl.loop = true;
          this._radioStaticEl.volume = 0.22;
        }
        if (this.enabled) this._radioStaticEl.play().catch(() => {});
      } else if (this._radioStaticEl) {
        this._radioStaticEl.pause();
        this._radioStaticEl.currentTime = 0;
      }
    } catch (e) {}
  },

  // Outlast tarzı kısa gerilim müziği (sting): yeni mekana giriş, tehlike
  // yaklaşması ya da önemli bir olay öncesi çalınır. Çalarken alttaki
  // müziği/ambiyansı kısa süreliğine kısar (duck), bitince geri getirir.
  // Dosya tanımlı değilse (henüz eklenmemişse) sessizce hiçbir şey yapmaz.
  sting(name) {
    if (!this.enabled) return;
    const src = SFX_FILES[name];
    if (!src) return;
    const now = Date.now();
    if (now - (this._lastStingAt || 0) < 4000) return; // art arda spam olmasın
    this._lastStingAt = now;
    try {
      const el = new Audio(src);
      el.volume = 0.9;
      const musicEl = this._musicEl;
      const prevMusicVol = musicEl ? musicEl.volume : null;
      if (musicEl) musicEl.volume = prevMusicVol * 0.3;
      const ambEl = this._ambEl;
      const prevAmbVol = ambEl ? ambEl.volume : null;
      if (ambEl) ambEl.volume = prevAmbVol * 0.3;
      const restore = () => {
        if (musicEl && this._musicEl === musicEl) musicEl.volume = prevMusicVol;
        if (ambEl && this._ambEl === ambEl) ambEl.volume = prevAmbVol;
      };
      el.addEventListener("ended", restore);
      el.play().catch(() => restore());
    } catch (e) {}
  },

  heart(intervalMs) {
    if (this.heartId) {
      clearInterval(this.heartId);
      this.heartId = null;
    }
    if (!intervalMs) return;
    this.heartId = setInterval(() => {
      if (!this.enabled) return;
      this.playSample("heartbeat", 0.9);
    }, intervalMs);
  },

  // Radyo statiği seviyesi — gerçek dosya tabanlı bir karşılığı yok,
  // sentetik üretim kaldırıldığı için artık hiçbir şey yapmaz.
  staticLevel() {},

  burst(ms = 160) {
    if (!this.enabled) return;
    const src = SFX_FILES.glitch;
    if (!src) return;
    try {
      const list = (this._pool.glitch = this._pool.glitch || []);
      let a = list.find((x) => x.paused || x.ended);
      if (!a) {
        a = new Audio(src);
        list.push(a);
      }
      a.volume = 0.55;
      a.currentTime = 0;
      a.play().catch(() => {});
      setTimeout(() => {
        try { a.pause(); } catch (e) {}
      }, ms);
    } catch (e) {}
  },

  blipSfx() {
    this.playSample("blip");
  },

  uiClick() {
    this.playSample("click");
  },

  buzzSfx() {
    this.playSample("buzz");
  },

  clank() {
    this.playSample("clank");
  },

  scratch() {
    this.playSample("scratch");
  },

  page() {
    this.playSample("page");
  },

  pickup() {
    this.playSample("pickup");
  },

  valveSfx() {
    // Vana her çevrildiğinde havuzdan rastgele bir dosya seçilir; bir
    // öncekiyle aynısı gelmesin diye tekrar çıkarsa yeniden çekilir.
    if (!this.enabled || !VALVE_POOL.length) return;
    let src = VALVE_POOL[Math.floor(Math.random() * VALVE_POOL.length)];
    if (VALVE_POOL.length > 1 && src === this._lastValveSrc) {
      src = VALVE_POOL[(VALVE_POOL.indexOf(src) + 1) % VALVE_POOL.length];
    }
    this._lastValveSrc = src;
    try {
      const a = new Audio(src);
      a.volume = 1;
      a.play().catch(() => {});
    } catch (e) {}
  },

  keypadButtonSfx() {
    this.playSample("keypadButton");
  },

  puzzleButtonSfx() {
    this.playSample("puzzleButton");
  },

  fuseSfx() {
    this.playSample("fuse");
  },

  tick() {
    // Klavye tıkı hızlı ardışık gelir; havuzdan yeni eleman almak yerine
    // TEK elemanı her seferinde baştan başlatıyoruz ki sesler üst üste
    // binip birbirine karışmasın (önceki tık kesilir, yenisi başlar).
    if (!this.enabled || !SFX_FILES.tick) return;
    if (!this._tickEl) this._tickEl = new Audio(SFX_FILES.tick);
    try { this._tickEl.currentTime = 0; } catch (e) {}
    this._tickEl.play().catch(() => {});
  },

  mouseClick() {
    if (!this.enabled || !SFX_FILES.mouseButton) return;
    if (!this._mouseEl) this._mouseEl = new Audio(SFX_FILES.mouseButton);
    try { this._mouseEl.currentTime = 0; } catch (e) {}
    this._mouseEl.play().catch(() => {});
  },

  batteryLowSfx() {
    // Gerçek dosya varsa onu çal; yoksa hafif bir "dı-dıt" uyarı bipi
    // üret (Tone.js değil, ham Web Audio API — tek amaçlı basit bir
    // uyarı tonu, atmosferik bir "sahte ses" değil).
    if (this.playSample("batteryLow")) return;
    if (!this.enabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const beep = (freq, vol, delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(vol * 0.12, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.08);
      };
      beep(520, 0.85, 0);
      beep(360, 0.72, 0.115);
      setTimeout(() => { try { ctx.close(); } catch (e) {} }, 300);
    } catch (e) {}
  },

  objectiveSfx() {
    this.playSample("objective");
  },

  boom() {
    this.playSample("boom");
  },

  setEnabled(on) {
    this.enabled = on;
    if (!on) this.heart(null);
    try {
      if (this._musicEl) {
        on ? this._musicEl.play().catch(() => {}) : this._musicEl.pause();
      }
      if (this._ambEl) {
        on ? this._ambEl.play().catch(() => {}) : this._ambEl.pause();
      }
      if (this._radioStaticEl) {
        on ? this._radioStaticEl.play().catch(() => {}) : this._radioStaticEl.pause();
      }
    } catch (e) {}
  },
};
