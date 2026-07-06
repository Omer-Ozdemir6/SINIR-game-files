/* SINIR-1 — METİN EFEKTLERİ
   Pil rengini, düşük pilde kelime karartmayı ve döküman
   sayfalamayı üretir.
   Hepsi deterministiktir: aynı metin her render'da aynı bozulur. */

import { DOC_LINES_PER_PAGE } from "./constants";

export const batteryColorOf = (lvl) => {
  if (lvl <= 30) return "#c23b2e";   // kritik: kırmızı
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

const wrapLine = (line, maxChars) => {
  if (!line.trim()) return [""];
  const words = line.split(/\s+/);
  const out = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? cur + " " + word : word;
    if (next.length > maxChars && cur) {
      out.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) out.push(cur);
  return out;
};

export const paginateDoc = (body) => {
  const maxChars = 46;
  const linesArr = body
    .split("\n")
    .flatMap((line) => wrapLine(line, maxChars));
  const pages = [];
  for (let i = 0; i < linesArr.length; i += DOC_LINES_PER_PAGE) {
    pages.push(linesArr.slice(i, i + DOC_LINES_PER_PAGE).join("\n"));
  }
  return pages.length ? pages : [body];
};
