import * as Tone from "tone";
import { SFX_FILES, MUSIC_FILES, AMBIENT_FILE } from "./soundMap";

const MUSIC_PROFILES = {
  menu: { drone: 42, bass: "E1", notes: ["E2", "F2", "D2", "E1"], interval: 5200, gain: 0.07, noise: 0.012 },
  intro: { drone: 38, bass: "D1", notes: ["D2", "A1", "C2"], interval: 4300, gain: 0.06, noise: 0.018 },
  credits: { drone: 49, bass: "G1", notes: ["G2", "A2", "D2"], interval: 6200, gain: 0.045, noise: 0.006 },
  archive: { drone: 56, bass: "B1", notes: ["B2", "E2", "F#2"], interval: 6800, gain: 0.04, noise: 0.005 },
  k6: { drone: 36, bass: "C1", notes: ["C2", "Db2", "G1", "C1"], interval: 3600, gain: 0.085, noise: 0.024 },
  k5: { drone: 33, bass: "B0", notes: ["B1", "F1", "C2"], interval: 3900, gain: 0.08, noise: 0.02 },
  k2: { drone: 31, bass: "A0", notes: ["A1", "Bb1", "E1", "A0"], interval: 3200, gain: 0.095, noise: 0.026 },
  k3: { drone: 44, bass: "F1", notes: ["F2", "Gb2", "C2"], interval: 4700, gain: 0.065, noise: 0.015 },
  k4: { drone: 40, bass: "D1", notes: ["D2", "E2", "Bb1"], interval: 5000, gain: 0.06, noise: 0.013 },
  chase: { drone: 29, bass: "F0", notes: ["F1", "Gb1", "C1", "F0"], interval: 1250, gain: 0.12, noise: 0.032 },
  hide: { drone: 35, bass: "C1", notes: ["C2", "G1", "Db2"], interval: 2600, gain: 0.075, noise: 0.019 },
  safe: { drone: 54, bass: "A1", notes: ["A2", "E2"], interval: 7200, gain: 0.035, noise: 0.004 },
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export const AudioSys = {
  _bgAmbientTrack: "safe",
  _activeGameTrack: "safe",
  _isEpisodeTrack: false,
  _episodeTimer: null,
  _pausedGameTrack: null,
  _pausedGameTime: 0,
  _pool: {},
  _musicEl: null,
  _musicTrack: null,
  _pendingMusic: null,
  _ambEl: null,
  _musicTimer: null,
  _musicMetalTimer: null,
  _ambientTimer: null,
  _ambientOn: false,
  inited: false,
  enabled: true,
  heartId: null,
  n: {},

  async init() {
    if (this.inited) {
      try {
        if (Tone.context && Tone.context.state !== "running") {
          await Tone.context.resume();
        }
      } catch (e) {}
      return;
    }
    try {
      await Tone.start();

      const ambOsc = new Tone.Oscillator(46, "sine");
      const ambGain = new Tone.Gain(0).toDestination();
      ambOsc.connect(ambGain);
      ambOsc.start();

      const rumble = new Tone.Noise("brown");
      const rumbleF = new Tone.Filter(120, "lowpass");
      const rumbleG = new Tone.Gain(0).toDestination();
      rumble.chain(rumbleF, rumbleG);
      rumble.start();

      const statNz = new Tone.Noise("pink");
      const statG = new Tone.Gain(0).toDestination();
      statNz.connect(statG);
      statNz.start();

      const burstNz = new Tone.Noise("white");
      const burstG = new Tone.Gain(0).toDestination();
      burstNz.connect(burstG);
      burstNz.start();

      const memb = new Tone.MembraneSynth({ volume: -13 }).toDestination();
      const blip = new Tone.Synth({
        oscillator: { type: "triangle" },
        volume: -18,
        envelope: { attack: 0.004, decay: 0.09, sustain: 0, release: 0.05 },
      }).toDestination();
      const buzz = new Tone.Synth({
        oscillator: { type: "square" },
        volume: -20,
        envelope: { attack: 0.01, decay: 0.22, sustain: 0.08, release: 0.1 },
      }).toDestination();

      const musicGain = new Tone.Gain(0).toDestination();
      const musicDrone = new Tone.Oscillator(40, "sine").connect(musicGain);
      const musicDroneGain = new Tone.Gain(0.45).connect(musicGain);
      musicDrone.disconnect();
      musicDrone.connect(musicDroneGain);
      musicDrone.start();

      const musicNoise = new Tone.Noise("brown");
      const musicNoiseFilter = new Tone.Filter(360, "lowpass");
      const musicNoiseGain = new Tone.Gain(0).connect(musicGain);
      musicNoise.chain(musicNoiseFilter, musicNoiseGain);
      musicNoise.start();

      const musicBass = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.08, decay: 0.35, sustain: 0.25, release: 1.6 },
        volume: -18,
      }).connect(musicGain);
      const musicHit = new Tone.Synth({
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.02, decay: 0.28, sustain: 0.03, release: 0.55 },
        volume: -24,
      }).connect(musicGain);
      const metal = new Tone.MetalSynth({
        frequency: 55,
        envelope: { attack: 0.001, decay: 0.22, release: 0.08 },
        harmonicity: 4.6,
        modulationIndex: 14,
        resonance: 2400,
        octaves: 1.1,
        volume: -30,
      }).connect(musicGain);

      this.n = {
        ambOsc,
        ambGain,
        rumble,
        rumbleG,
        statG,
        burstG,
        memb,
        blip,
        buzz,
        musicGain,
        musicDrone,
        musicDroneGain,
        musicNoiseGain,
        musicBass,
        musicHit,
        metal,
      };
      this.inited = true;

      if (this._pendingMusic) this._startSyntheticMusic(this._pendingMusic);
    } catch (e) {
      // Browser audio can fail before user interaction. The game continues silently.
    }
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
        this._pendingMusic = null;
        this._stopSampleMusic();
        this._stopSyntheticMusic();
        this._activeGameTrack = null;
        this._pausedGameTrack = null;
        this._pausedGameTime = 0;
        return;
      }

      // Menü veya alet parçası mı kontrol et
      const isMenuTrack = (track === "menu" || track === "credits" || track === "intro" || track === "archive");
      
      if (!isMenuTrack) {
        this._activeGameTrack = track;
        this._isEpisodeTrack = (track !== this._bgAmbientTrack);
        
        if (this._episodeTimer) {
          clearTimeout(this._episodeTimer);
          this._episodeTimer = null;
        }
      }

      const file = MUSIC_FILES[track];
      if (file) {
        this._pendingMusic = null;
        this._stopSyntheticMusic();
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
        return;
      }

      this._stopSampleMusic();
      if (!this.inited) {
        this._pendingMusic = track;
        this.init();
        return;
      }
      this._startSyntheticMusic(track);

      // Sentetik bölüm müzikleri de belirli bir süre sonra otomatik bitip arka plana dönmeli
      if (!isMenuTrack && this._isEpisodeTrack) {
        this._episodeTimer = setTimeout(() => {
          if (this._musicTrack === track) {
            this.fadeOutMusic(3000);
            setTimeout(() => {
              this.music(this._bgAmbientTrack);
            }, 3000);
          }
        }, 30000); // 30 saniye boyunca çalsın ve bitsin
      }
    } catch (e) {}
  },

  fadeOutMusic(durationMs = 2500) {
    try {
      const audioEl = this._musicEl;
      if (audioEl) {
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
        return;
      }
      if (this.inited) {
        try {
          this.n.musicGain.gain.rampTo(0, durationMs / 1000);
          this.n.musicNoiseGain.gain.rampTo(0, durationMs / 1000);
        } catch (e) {}
        setTimeout(() => {
          this._stopSyntheticMusic();
        }, durationMs);
      }
    } catch (e) {}
  },

  pauseGameMusic() {
    try {
      if (this._musicTrack && this._musicTrack !== "credits" && this._musicTrack !== "menu" && this._musicTrack !== "intro" && this._musicTrack !== "archive") {
        this._pausedGameTrack = this._musicTrack;
        if (this._musicEl) {
          this._pausedGameTime = this._musicEl.currentTime;
          this._musicEl.pause();
          this._musicEl = null;
        } else {
          this._stopSyntheticMusic(false);
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
        
        const file = MUSIC_FILES[track];
        if (file) {
          this._stopSyntheticMusic();
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
          this._stopSampleMusic();
          this._startSyntheticMusic(track);
        }
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

  _startSyntheticMusic(track) {
    if (!this.inited) return;
    const profile = MUSIC_PROFILES[track] || MUSIC_PROFILES.menu;
    this._pendingMusic = null;
    if (this._musicTrack === track && !this._musicEl) return;
    this._stopSyntheticMusic(false);
    this._musicTrack = track;

    try {
      this.n.musicDrone.frequency.rampTo(profile.drone, 0.8);
      this.n.musicNoiseGain.gain.rampTo(profile.noise, 1.2);
      this.n.musicGain.gain.rampTo(this.enabled ? profile.gain : 0, 1.4);
    } catch (e) {}

    const playPulse = () => {
      if (!this.enabled || !this.inited) return;
      try {
        const note = profile.notes[Math.floor(Math.random() * profile.notes.length)];
        this.n.musicBass.triggerAttackRelease(profile.bass, "2n", undefined, 0.55);
        setTimeout(() => {
          try { this.n.musicHit.triggerAttackRelease(note, "8n", undefined, randomBetween(0.22, 0.42)); } catch (e) {}
        }, randomBetween(160, 520));
      } catch (e) {}
    };

    playPulse();
    this._musicTimer = setInterval(playPulse, profile.interval + randomBetween(-600, 900));
    this._musicMetalTimer = setInterval(() => {
      if (!this.enabled || track === "safe") return;
      try {
        this.n.metal.triggerAttackRelease("32n", undefined, randomBetween(0.12, track === "chase" ? 0.42 : 0.24));
      } catch (e) {}
    }, track === "chase" ? 1900 : 7600);
  },

  _stopSyntheticMusic(clearTrack = true) {
    if (this._musicTimer) clearInterval(this._musicTimer);
    if (this._musicMetalTimer) clearInterval(this._musicMetalTimer);
    this._musicTimer = null;
    this._musicMetalTimer = null;
    if (this.inited) {
      try {
        this.n.musicGain.gain.rampTo(0, 0.7);
        this.n.musicNoiseGain.gain.rampTo(0, 0.45);
      } catch (e) {}
    }
    if (clearTrack) this._musicTrack = null;
  },

  ambient(on) {
    this._ambientOn = !!on;
    if (AMBIENT_FILE) {
      try {
        if (on) {
          if (!this._ambEl) {
            this._ambEl = new Audio(AMBIENT_FILE);
            this._ambEl.loop = true;
            this._ambEl.volume = 0.5;
          }
          if (this.enabled) this._ambEl.play().catch(() => {});
        } else if (this._ambEl) {
          this._ambEl.pause();
        }
      } catch (e) {}
      return;
    }
    if (!this.inited) return;
    try {
      this.n.ambGain.gain.rampTo(on && this.enabled ? 0.028 : 0, 0.8);
      this.n.rumbleG.gain.rampTo(on && this.enabled ? 0.014 : 0, 1.1);
    } catch (e) {}

    if (this._ambientTimer) clearInterval(this._ambientTimer);
    this._ambientTimer = null;
    if (on) {
      this._ambientTimer = setInterval(() => {
        if (!this.enabled || !this.inited || Math.random() < 0.45) return;
        this.burst(randomBetween(70, 150));
      }, 9000);
    }
  },

  heart(intervalMs) {
    if (this.heartId) {
      clearInterval(this.heartId);
      this.heartId = null;
    }
    if (!intervalMs || !this.inited) return;
    this.heartId = setInterval(() => {
      if (!this.enabled) return;
      try {
        if (!this.playSample("heartbeat", 0.9)) this.n.memb.triggerAttackRelease("C1", "16n");
        setTimeout(() => {
          try { this.n.memb.triggerAttackRelease("G0", "16n"); } catch (e) {}
        }, 140);
      } catch (e) {}
    }, intervalMs);
  },

  staticLevel(level) {
    if (!this.inited) return;
    try { this.n.statG.gain.rampTo(this.enabled ? level : 0, 0.15); } catch (e) {}
  },

  burst(ms = 160) {
    if (!this.enabled) return;
    const name = "glitch";
    const src = SFX_FILES[name];
    if (src) {
      try {
        const list = (this._pool[name] = this._pool[name] || []);
        let a = list.find((x) => x.paused || x.ended);
        if (!a) {
          a = new Audio(src);
          list.push(a);
        }
        a.volume = 0.55;
        a.currentTime = 0;
        a.play().catch(() => {});
        setTimeout(() => {
          try {
            a.pause();
          } catch (e) {}
        }, ms);
        return;
      } catch (e) {}
    }
    if (!this.inited) return;
    try {
      this.n.burstG.gain.setValueAtTime(0.045, Tone.now());
      this.n.burstG.gain.exponentialRampToValueAtTime(0.0001, Tone.now() + ms / 1000);
    } catch (e) {}
  },

  blipSfx(freq = 90) {
    if (this.playSample("blip")) return;
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(freq, "16n"); } catch (e) {}
  },

  uiClick() {
    if (this.playSample("click")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(110, "64n");
      setTimeout(() => {
        try { this.n.memb.triggerAttackRelease("C2", "64n"); } catch (e) {}
      }, 35);
    } catch (e) {}
  },

  buzzSfx() {
    if (this.playSample("buzz")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.buzz.triggerAttackRelease(96, "8n");
      this.burst(80);
    } catch (e) {}
  },

  clank() {
    if (this.playSample("clank")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("E1", "32n");
      this.n.metal.triggerAttackRelease("32n", undefined, 0.32);
    } catch (e) {}
  },

  scratch() {
    if (this.playSample("scratch")) return;
    if (!this.inited || !this.enabled) return;
    try {
      let i = 0;
      const id = setInterval(() => {
        try {
          this.n.burstG.gain.rampTo(0.016, 0.015);
          setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.06); } catch (e) {} }, 55 + Math.random() * 60);
        } catch (e) {}
        if (++i >= 5) clearInterval(id);
      }, 140);
    } catch (e) {}
  },

  page() {
    if (this.playSample("page")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.028, 0.07);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.14); } catch (e) {} }, 190);
    } catch (e) {}
  },

  pickup() {
    if (this.playSample("pickup")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(220, "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(110, "32n"); } catch (e) {} }, 110);
    } catch (e) {}
  },

  valveSfx() {
    if (this.playSample("valve")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("G1", "16n");
      this.n.metal.triggerAttackRelease("16n", undefined, 0.22);
      this.n.burstG.gain.rampTo(0.02, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.12); } catch (e) {} }, 150);
    } catch (e) {}
  },

  fuseSfx() {
    if (this.playSample("fuse")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("C2", "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(240, "32n"); } catch (e) {} }, 70);
      setTimeout(() => this.burst(70), 115);
    } catch (e) {}
  },

  tick() {
    // Klavye tıkı hızlı ardışık gelir; havuzdan yeni eleman almak yerine
    // TEK elemanı her seferinde baştan başlatıyoruz ki sesler üst üste
    // binip birbirine karışmasın (önceki tık kesilir, yenisi başlar).
    if (this.enabled && SFX_FILES.tick) {
      if (!this._tickEl) this._tickEl = new Audio(SFX_FILES.tick);
      // currentTime ataması, dosya henüz yüklenmemişken bazı tarayıcılarda
      // hata fırlatabilir — bu durumda bile play() denenmeye devam etsin,
      // sentetik sese düşmesin.
      try { this._tickEl.currentTime = 0; } catch (e) {}
      this._tickEl.play().catch(() => {});
      return;
    }
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(180, "64n"); } catch (e) {}
  },

  mouseClick() {
    if (this.enabled && SFX_FILES.mouseButton) {
      if (!this._mouseEl) this._mouseEl = new Audio(SFX_FILES.mouseButton);
      try { this._mouseEl.currentTime = 0; } catch (e) {}
      this._mouseEl.play().catch(() => {});
      return;
    }
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(520, "64n"); } catch (e) {}
  },

  batteryLowSfx() {
    if (!this.enabled) return;
    // 1. Önce soundMap'ten bir dosya tanımlanmışsa onu çalmayı dene
    if (this.playSample("batteryLow")) return;

    // 2. Tone.js aktif ve çalışıyorsa sentetik sesi kullan
    if (this.inited && Tone.context && Tone.context.state === "running") {
      try {
        this.n.blip.triggerAttackRelease(520, "64n", undefined, 0.85);
        setTimeout(() => {
          try { this.n.blip.triggerAttackRelease(360, "64n", undefined, 0.72); } catch (e) {}
        }, 115);
        return;
      } catch (e) {}
    }

    // 3. Fallback: Tarayıcının ham Web Audio API'si ile "dı-dıt" bip sesi oluştur
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const tempCtx = new AudioCtx();
        const playBeep = (freq, vol, delay) => {
          const osc = tempCtx.createOscillator();
          const gainNode = tempCtx.createGain();
          osc.connect(gainNode);
          gainNode.connect(tempCtx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, tempCtx.currentTime + delay);
          gainNode.gain.setValueAtTime(vol * 0.12, tempCtx.currentTime + delay);
          gainNode.gain.exponentialRampToValueAtTime(0.001, tempCtx.currentTime + delay + 0.08);
          osc.start(tempCtx.currentTime + delay);
          osc.stop(tempCtx.currentTime + delay + 0.08);
        };
        // Dı-dıt çift ses
        playBeep(520, 0.85, 0);
        playBeep(360, 0.72, 0.115);
        setTimeout(() => {
          try { tempCtx.close(); } catch (e) {}
        }, 300);
      }
    } catch (err) {
      console.warn("Fallback battery beep failed:", err);
    }
  },

  objectiveSfx() {
    if (this.playSample("objective")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(160, "8n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(120, "4n"); } catch (e) {} }, 140);
      setTimeout(() => this.burst(90), 260);
    } catch (e) {}
  },

  boom() {
    if (this.playSample("boom")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("A0", "2n");
      this.n.musicGain?.gain?.rampTo(0.12, 0.03);
      setTimeout(() => {
        try { this.n.musicGain.gain.rampTo(this._musicTrack ? (MUSIC_PROFILES[this._musicTrack]?.gain || 0.06) : 0, 0.6); } catch (e) {}
      }, 140);
    } catch (e) {}
  },

  setEnabled(on) {
    this.enabled = on;
    try { Tone.Destination.mute = !on; } catch (e) {}
    if (!on) this.heart(null);
    try {
      if (this._musicEl) {
        on ? this._musicEl.play().catch(() => {}) : this._musicEl.pause();
      }
      if (this._ambEl) {
        on ? this._ambEl.play().catch(() => {}) : this._ambEl.pause();
      }
      if (this.inited) {
        const profile = MUSIC_PROFILES[this._musicTrack] || null;
        this.n.musicGain.gain.rampTo(on && profile ? profile.gain : 0, 0.25);
        this.n.ambGain.gain.rampTo(on && this._ambientOn ? 0.028 : 0, 0.25);
        this.n.rumbleG.gain.rampTo(on && this._ambientOn ? 0.014 : 0, 0.25);
        this.n.statG.gain.rampTo(0, 0.1);
      }
    } catch (e) {}
  },
};
