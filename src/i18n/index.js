/* ============================================================
   SINIR-1 — DİL SİSTEMİ (i18n)
   · UI + motor metinleri: src/i18n/ui.js sözlüğünden t() ile
   · Hikaye metinleri: src/story/<dil>/ klasörlerinden (bkz.
     story/index.js) — dil eklemek: ui.js'e sözlük + story/<dil>/
   Seçim localStorage'da saklanır; Ayarlar > DİL'den değişir.
   ============================================================ */

import { UI } from "./ui.js";

export const LANGS = [
  { code: "tr", label: "TÜRKÇE" },
  { code: "en", label: "ENGLISH" },
];

const KEY = "sinir1_lang";
let current = "tr";
try {
  const saved = localStorage.getItem(KEY);
  if (saved && UI[saved]) current = saved;
} catch (e) {}

export function getLang() { return current; }

export function setLang(code) {
  if (!UI[code]) return;
  current = code;
  try { localStorage.setItem(KEY, code); } catch (e) {}
}

/* t("menu.newGame") → aktif dilden metin.
   t("eng.batteryCritical", { n: 18 }) → "{n}" yerleşimi doldurulur.
   Anahtar aktif dilde yoksa TR'ye düşer; orada da yoksa anahtarın
   kendisi döner (eksik çeviri ekranda görünür olsun diye). */
export function t(key, vars) {
  const pick = (lang) => {
    let cur = UI[lang];
    for (const part of key.split(".")) {
      if (cur == null) return undefined;
      cur = cur[part];
    }
    return typeof cur === "string" ? cur : undefined;
  };
  let s = pick(current);
  if (s === undefined) s = pick("tr");
  if (s === undefined) return key;
  if (vars) for (const k of Object.keys(vars)) s = s.split("{" + k + "}").join(String(vars[k]));
  return s;
}
