/* SINIR-1 — HİKAYE YÜKLEYİCİ (dil farkındalıklı)
   Her dilin bölümleri kendi klasöründe: story/tr/, story/en/ ...
   Seçilen dilde bölüm yoksa TR'ye düşer (oyun asla boş kalmaz).

   Yeni dil eklemek:
   1) story/en/ep01.js → EP01 node'larının çevirisi (yapı AYNI,
      yalnız metinler değişir; id'ler, flag'ler, sayılar sabit).
   2) Aşağıdaki STORIES kaydına ekle.
   Yeni bölüm eklemek: tr/ep03.js yaz, buildStory içine spread et. */

import { EP01, EP01_FLAGS } from "./tr/ep01.js";
import { EP02, EP02_FLAGS } from "./tr/ep02.js";
// import { EP01 as EN_EP01 } from "./en/ep01.js";  // çeviri hazır olunca

const buildTR = () => ({
  story: {
    start: EP01.start,
    nodes: { ...EP01.nodes, ...EP02.nodes },
  },
  flags: { ...EP01_FLAGS, ...EP02_FLAGS },
});

const STORIES = {
  tr: buildTR,
  // en: buildEN,   // story/en/ tamamlanınca aç
};

let built = buildTR();

/* Canlı bağlar (live bindings): motor bu ikisini import eder;
   setStoryLang çağrılınca importlar da güncel değeri görür. */
export let STORY = built.story;
export let INITIAL_FLAGS = built.flags;

export function setStoryLang(lang) {
  const b = (STORIES[lang] || STORIES.tr)();
  STORY = b.story;
  INITIAL_FLAGS = b.flags;
}
