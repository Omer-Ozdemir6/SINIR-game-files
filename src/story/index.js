/* SINIR-1 — HİKAYE BİRLEŞTİRİCİ
   Tüm bölümler burada tek STORY nesnesinde toplanır.

   Yeni bölüm ekleme adımları:
   1) src/story/ep02.js oluştur → export const EP02 = { nodes: {...} }
      ve varsa export const EP02_FLAGS = {...}
   2) Aşağıya import et, nodes ve flags'i spread ile birleştir.
   3) Bölümler arası geçiş: ep01'in son node'undaki bir choice,
      ep02'nin ilk node id'sine işaret etsin — motor için hepsi
      tek düz node havuzudur. */

import { EP01, EP01_FLAGS } from "./ep01";
import { EP02, EP02_FLAGS } from "./ep02";

export const STORY = {
  start: EP01.start,
  nodes: {
    ...EP01.nodes,
    ...EP02.nodes,
  },
};

export const INITIAL_FLAGS = {
  ...EP01_FLAGS,
  ...EP02_FLAGS,
};
