/* SINIR-1 — METİN EFEKTLERİ
   Pil rengini, düşük pilde kelime karartmayı, düşük akıl
   sağlığında metin bozulmasını ve döküman sayfalamayı üretir.
   Hepsi deterministiktir: aynı metin her render'da aynı bozulur. */

import { DOC_LINES_PER_PAGE } from "./constants";

export const batteryColorOf = (lvl) => {
  if (lvl <= 20) return "#c23b2e";   // kritik: kırmızı
  if (lvl <= 50) return "#d8857a";   // yarının altı: açık kırmızı
  return "#e8e6dc";                  // dolu: beyaz
};

// %15 altında bazı kelimeleri karart
export const obscureText = (text) => {
  let h = 0;
  return text.split(" ").map((w, i) => {
    h = (h + w.length * 31 + i * 7) % 11;
    if (w.length > 2 && h < 3) return "█".repeat(Math.min(w.length, 6));
    return w;
  }).join(" ");
};

// Akıl düştükçe metin bozulur
const INTRUSIONS = ["izliyor", "duyuyor", "aşağıda", "hâlâ orada", "aç"];

const wordHash = (w, i) => {
  let h = i * 13;
  for (let k = 0; k < w.length; k++) h = (h * 31 + w.charCodeAt(k)) % 9973;
  return h;
};

export const corruptText = (text, akil) => {
  if (akil > 60) return text;
  const heavy = akil <= 40;
  return text.split(" ").map((w, i) => {
    const h = wordHash(w, i);
    if (heavy && w.length > 3 && h % 19 === 7) return INTRUSIONS[h % INTRUSIONS.length];
    if (w.length > 3 && h % 9 === 4) {
      const a = w.split("");
      const t = a[1]; a[1] = a[2]; a[2] = t;
      return a.join("");
    }
    return w;
  }).join(" ");
};

export const paginateDoc = (body) => {
  const linesArr = body.split("\n");
  const pages = [];
  for (let i = 0; i < linesArr.length; i += DOC_LINES_PER_PAGE) {
    pages.push(linesArr.slice(i, i + DOC_LINES_PER_PAGE).join("\n"));
  }
  return pages.length ? pages : [body];
};
