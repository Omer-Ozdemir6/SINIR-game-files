import * as Tone from "tone";

/* ============================================================
   SINIR-1 — SES SİSTEMİ (Tone.js)
   Tekil (singleton) ses motoru. init() bir kullanıcı dokunuşu
   içinden çağrılmalıdır (tarayıcı autoplay kuralı).
   ============================================================ */
export const AudioSys = {
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
        this.n.memb.triggerAttackRelease("C1", "16n");
        setTimeout(() => { try { this.n.memb.triggerAttackRelease("G0", "16n"); } catch (e) {} }, 140);
      } catch (e) {}
    }, intervalMs);
  },
  staticLevel(level) {
    if (!this.inited) return;
    try { this.n.statG.gain.rampTo(this.enabled ? level : 0, 0.15); } catch (e) {}
  },
  burst(ms = 160) {
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.11, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.08); } catch (e) {} }, ms);
    } catch (e) {}
  },
  blipSfx(freq = 740) {
    if (!this.inited || !this.enabled) return;
    try { this.n.blip.triggerAttackRelease(freq, "32n"); } catch (e) {}
  },
  buzzSfx() {
    if (!this.inited || !this.enabled) return;
    try { this.n.buzz.triggerAttackRelease(96, "8n"); } catch (e) {}
  },
  clank() {
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("E1", "32n"); } catch (e) {}
  },
  scratch() {
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
    // sayfa/kâğıt hışırtısı — tek yumuşak süpürme
    if (!this.inited || !this.enabled) return;
    try {
      this.n.burstG.gain.rampTo(0.028, 0.07);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.14); } catch (e) {} }, 190);
    } catch (e) {}
  },
  pickup() {
    // pil/eşya alma — iki yükselen blip
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(520, "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(840, "32n"); } catch (e) {} }, 110);
    } catch (e) {}
  },
  valveSfx() {
    // vana çevirme — gıcırtılı metal dönüş
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("G1", "16n");
      this.n.burstG.gain.rampTo(0.02, 0.02);
      setTimeout(() => { try { this.n.burstG.gain.rampTo(0, 0.12); } catch (e) {} }, 150);
    } catch (e) {}
  },
  fuseSfx() {
    // sigorta oturması — tak + çıt
    if (!this.inited || !this.enabled) return;
    try {
      this.n.memb.triggerAttackRelease("C2", "32n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(920, "32n"); } catch (e) {} }, 70);
    } catch (e) {}
  },
  objectiveSfx() {
    // yeni görev — iki yumuşak nota
    if (!this.inited || !this.enabled) return;
    try {
      this.n.blip.triggerAttackRelease(660, "16n");
      setTimeout(() => { try { this.n.blip.triggerAttackRelease(880, "16n"); } catch (e) {} }, 140);
    } catch (e) {}
  },
  boom() {
    if (!this.inited || !this.enabled) return;
    try { this.n.memb.triggerAttackRelease("A0", "2n"); } catch (e) {}
  },
  setEnabled(on) {
    this.enabled = on;
    try { Tone.Destination.mute = !on; } catch (e) {}
    if (!on) this.heart(null);
  },
};
