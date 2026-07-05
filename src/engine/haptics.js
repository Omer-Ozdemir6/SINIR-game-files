/* ============================================================
   TİTREŞİM (Haptics) — mobil cihazlarda dokunsal geri bildirim.
   navigator.vibrate kullanır (Android/Chrome destekler; iOS Safari
   çoğu sürümde desteklemez, o zaman sessizce yok sayılır).
   Ayarlardan açılıp kapatılabilir; kapalıyken hiçbir şey yapmaz.
   ============================================================ */
let enabled = true;

export const Haptics = {
  setEnabled(on) { enabled = !!on; },
  isEnabled() { return enabled; },

  // temel titreşim (ms veya desen dizisi)
  buzz(pattern) {
    if (!enabled) return;
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch (e) {}
  },

  // anlamsal kısayollar
  tap()   { this.buzz(12); },              // hafif dokunuş (seçim)
  hit()   { this.buzz(35); },              // darbe (bulmaca hatası)
  death() { this.buzz([80, 60, 180]); },   // ölüm — uzun, sarsıcı
  glitch(){ this.buzz([20, 30, 20]); },    // parazit — kesik kesik
  low()   { this.buzz([40, 100, 40]); },   // pil kritik / karanlık
  stop()  { try { navigator.vibrate && navigator.vibrate(0); } catch (e) {} },
};
