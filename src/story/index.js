/* SINIR-1 — HİKAYE BİRLEŞTİRİCİ
   Tüm bölümler burada tek STORY nesnesinde toplanır. */

import { EP01, EP01_FLAGS } from "./ep01";
import { EP02, EP02_FLAGS } from "./ep02";
import { EP03, EP03_FLAGS } from "./ep03";
import { EP04, EP04_FLAGS } from "./ep04";
import { EP05, EP05_FLAGS } from "./ep05";
import { EP06, EP06_FLAGS } from "./ep06";

export const STORY = {
  start: EP01.start,
  nodes: {
    ...EP01.nodes,
    ...EP02.nodes,
    ...EP03.nodes,
    ...EP04.nodes,
    ...EP05.nodes,
    ...EP06.nodes,
  },
};

export const INITIAL_FLAGS = {
  ...EP01_FLAGS,
  ...EP02_FLAGS,
  ...EP03_FLAGS,
  ...EP04_FLAGS,
  ...EP05_FLAGS,
  ...EP06_FLAGS,
};