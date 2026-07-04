import * as Tone from "tone";
import { SFX_FILES, MUSIC_FILES, AMBIENT_FILE } from "./soundMap";

/* ============================================================
   SINIR-1 — SES SİSTEMİ (Tone.js)
   Tekil (singleton) ses motoru. init() bir kullanıcı dokunuşu
   içinden çağrılmalıdır (tarayıcı autoplay kuralı).
   ============================================================ */
export const AudioSys = {
  /* ---- DOSYA TABANLI SESLER ----
     soundMap.js'te yolu dolu olan her isim gerçek kayıtla çalınır;
     boşsa çağıran metod sentetik sese düşer. */
  _pool: {},
  playSample(name, vol = 1) {
    if (!this.enabled) return true; // ses kapalıysa sentetiğe de düşme
    const src = SFX_FILES[name];
    if (!src) return false;
    try {
      // küçük havuz: aynı ses üst üste binebilsin
      const list = (this._pool[name] = this._pool[name] || []);
      let a = list.find((x) => x.paused || x.ended);
      if (!a) { a = new Audio(src); list.push(a); }
      a.volume = vol;
      a.currentTime = 0;
      a.play().catch(() => {});
      return true;
    } catch (e) { return false; }
  },
  _musicEl: null,
  _musicTrack: null,
  music(track) {
    // { type:"music", track:"k6" } → başlat · { type:"music" } → sustur
    try {
      if (!track || !MUSIC_FILES[track]) {
        if (this._musicEl) { this._musicEl.pause(); this._musicEl = null; this._musicTrack = null; }
        return;
      }
      if (this._musicTrack === track) return;
      if (this._musicEl) this._musicEl.pause();
      const a = new Audio(MUSIC_FILES[track]);
      a.loop = true;
      a.volume = 0.55;
      this._musicEl = a;
      this._musicTrack = track;
      if (this.enabled) a.play().catch(() => {});
    } catch (e) {}
  },
  _ambEl: null,
  inited: false, enabled: true, heartId: null, n: {},
  async init() {
    if (this.inited) return;
    try {
      await Tone.start();
      const ambOsc = new Tone.Oscillator(46, "sine");
      const ambGain = new Tone.Gain(0.03).toDestination();
      ambOsc.connect(ambGain);
      const rumble = new Tone.Noise("brown");
      const rumbleF = new Tone.Filter(140, "lowpass");
      const rumbleG = new Tone.Gain(0.018).toDestination();
      rumble.chain(rumbleF, rumbleG);
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
        oscillator: { type: "triangle" }, volume: -18,
        envelope: { attack: 0.004, decay: 0.09, sustain: 0, release: 0.05 },
      }).toDestination();
      const buzz = new Tone.Synth({
        oscillator: { type: "square" }, volume: -20,
        envelope: { attack: 0.01, decay: 0.22, sustain: 0.08, release: 0.1 },
      }).toDestination();
      this.n = { ambOsc, rumble, statG, burstG, memb, blip, buzz };
      this.inited = true;
    } catch (e) { /* ses başlatılamadı — sessiz devam */ }
  },
  ambient(on) {
    if (AMBIENT_FILE) {
      try {
        if (on) {
          if (!this._ambEl) { this._ambEl = new Audio(AMBIENT_FILE); this._ambEl.loop = true; this._ambEl.volume = 0.5; }
          if (this.enabled) this._ambEl.play().catch(() => {});
        } else if (this._ambEl) this._ambEl.pause();
      } catch (e) {}
      return;
    }
    if (!this.inited) return;
    try {
      const { ambOsc, rumble } = this.n;
      if (on) {
        if (ambOsc.state !== "started") ambOsc.start();
        if (rumble.state !== "started") rumble.start();
      } else { ambOsc.stop(); rumble.stop(); }
    } catch (e) {}
  },
  heart(intervalMs) {
    if (this.heartId) { clearInterval(this.heartId); this.heartId = null; }
    if (!intervalMs || !this.inited) return;
    this.heartId = setInterval(() => {
      if (!this.enabled) return;
      try {
        if (!this.playSample("heartbeat", 0.9)) this.n.memb.triggerAttackRelease("C1", "16n");
        setTimeout(() => { try { this.n.memb.triggerAttackRelease("G0", "16n"); } catch (e) {} }, 140);
      } catch (e) {}
    }, intervalMs);
  },
  staticLevel(level) {
    if (!this.inited) return;
    try { this.n.statG.gain.rampTo(this.enabled ? level : 0, 0.15); } catch (e) {}
  },
  burst(ms = 160) {
    if (this.playSample("glitch")) return;
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.11, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.08); } catch (e) {} }, ms);
    } catch (e) {}
  },
  blipSfx(freq = 740) {
    if (this.playSample("blip")) return;
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(freq, "32n"); } catch (e) {}
  },
  buzzSfx() {
    if (this.playSample("buzz")) return;
    if (!this.inited || !this.enabled) return;
    try { this.n.buzz.triggerAttackRelease(96, "8n"); } catch (e) {}
  },
  clank() {
    if (this.playSample("clank")) return;
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("E1", "32n"); } catch (e) {}
  },
  scratch() {
    if (this.playSample("scratch")) return;
    // kalemle not yazma — kısa kısık cızırtılar
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
    // sayfa/kâğıt hışırtısı — tek yumuşak süpürme
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.028, 0.07);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.14); } catch (e) {} }, 190);
    } catch (e) {}
  },
  pickup() {
    if (this.playSample("pickup")) return;
    // pil/eşya alma — iki yükselen blip
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(520, "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(840, "32n"); } catch (e) {} }, 110);
    } catch (e) {}
  },
  valveSfx() {
    if (this.playSample("valve")) return;
    // vana çevirme — gıcırtılı metal dönüş
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("G1", "16n");
      this.n.burstG.gain.rampTo(0.02, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.12); } catch (e) {} }, 150);
    } catch (e) {}
  },
  fuseSfx() {
    if (this.playSample("fuse")) return;
    // sigorta oturması — tak + çıt
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("C2", "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(920, "32n"); } catch (e) {} }, 70);
    } catch (e) {}
  },
  tick() {
    if (this.playSample("tick")) return;
    // klavye tuşu — çok kısa, kısık tık
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(1320, "64n"); } catch (e) {}
  },
  objectiveSfx() {
    if (this.playSample("objective")) return;
    // yeni görev — iki yumuşak nota
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(660, "16n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(880, "16n"); } catch (e) {} }, 140);
    } catch (e) {}
  },
  boom() {
    if (this.playSample("boom")) return;
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("A0", "2n"); } catch (e) {}
  },
  setEnabled(on) {
    this.enabled = on;
    try { Tone.Destination.mute = !on; } catch (e) {}
    if (!on) this.heart(null);
    try {
      if (this._musicEl) { on ? this._musicEl.play().catch(() => {}) : this._musicEl.pause(); }
      if (this._ambEl) { on ? this._ambEl.play().catch(() => {}) : this._ambEl.pause(); }
    } catch (e) {}
  },
};
