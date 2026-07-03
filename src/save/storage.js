/* SINIR-1 — KALICI KAYIT KATMANI
   Şu an: localStorage (tarayıcı + Capacitor WebView'de çalışır).
   Kaydedilen şey son kontrol noktası anlık görüntüsüdür (checkpoint).

   Capacitor'a geçince daha sağlam saklama için @capacitor/preferences
   kullanmak istersen dosyanın altındaki async sürümü aç ve App.jsx'te
   loadGame çağrısını await'li hale getir. */

const KEY = "sinir1_save_v1";

export function saveGame(checkpoint) {
  try {
    localStorage.setItem(KEY, JSON.stringify(checkpoint));
  } catch (e) { /* depolama yoksa sessizce geç */ }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearGame() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}

/* --- Capacitor Preferences sürümü (async) ---
import { Preferences } from "@capacitor/preferences";
const KEY = "sinir1_save_v1";
export async function saveGame(cp) {
  try { await Preferences.set({ key: KEY, value: JSON.stringify(cp) }); } catch (e) {}
}
export async function loadGame() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    return value ? JSON.parse(value) : null;
  } catch (e) { return null; }
}
export async function clearGame() {
  try { await Preferences.remove({ key: KEY }); } catch (e) {}
}
*/
