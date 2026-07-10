import { Suspense, lazy, useState, useEffect, useRef, useCallback } from "react";

import { AudioSys } from "./audio/AudioSys";
import { t, getLang, setLang, LANGS } from "./i18n";
import { STORY, INITIAL_FLAGS, setStoryLang, DEMO_START } from "./story";
import { Haptics } from "./engine/haptics";
import {
  STAT_MAX, BATTERY_START, SPARES_START, SPARES_MAX, INITIAL_STATS,
  LIGHTS_INIT, SPEED_OPTIONS, DARK_MS, IS_RELEASE,
  BATTERY_DRAIN_MS, BATTERY_DRAIN_TENSE,
  NOISE_THRESHOLDS,
} from "./engine/constants";
import { batteryColorOf, paginateDoc } from "./engine/textFx";
import { saveGame, loadGame, clearGame } from "./save/storage";
import { styles as S } from "./styles/theme";

import MainMenu from "./components/MainMenu";
import StudioIntro from "./components/StudioIntro";
import DisclaimerScreen from "./components/DisclaimerScreen";
import WarningScreen from "./components/WarningScreen";
import IntroCinematic from "./components/IntroCinematic";
import LoadingScreen from "./components/LoadingScreen";
import GameHeader from "./components/GameHeader";
import StoryStream from "./components/StoryStream";
import Hud from "./components/Hud";
import { PauseMenu, SettingsOverlay, DeathOverlay } from "./components/MenuOverlays";
import Credits from "./components/Credits";
import HowToPlay from "./components/HowToPlay";
import { ArchiveMenu, ArchiveList, NotePaper, DocPaper } from "./components/ArchiveOverlays";
import PanelOverlay from "./components/interactions/PanelOverlay";
import KeypadOverlay from "./components/interactions/KeypadOverlay";
import RadioOverlay from "./components/interactions/RadioOverlay";
import LightsOverlay from "./components/interactions/LightsOverlay";
import { ValveOverlay, LeverOverlay, FuseOverlay } from "./components/interactions/MechOverlays";
import BreathOverlay from "./components/interactions/BreathOverlay";
import ChaseOverlay from "./components/interactions/ChaseOverlay";
import { ShadowOverlay, WiresOverlay, MixOverlay, SymbolsOverlay, RingsOverlay, TilesOverlay, ColorGridOverlay } from "./components/interactions/PuzzleOverlays";
import DarknessOverlay from "./components/DarknessOverlay";

const MENU_AFTER_END_KEY = "sinir1_menu_after_ending";
const PuzzleTest = lazy(() => import("./components/PuzzleTest"));

/* ============================================================
   SINIR-1 — OYUN MOTORU (App)
   Hikaye verisi: src/story/ · Ses: src/audio/ · Görsel: components/
   Bu dosya durum yönetimi + node oynatıcı + etkileşim mantığıdır.
   ============================================================ */

export default function App() {
  const [mode, setMode] = useState("boot"); // boot | disclaimer | bootload | menu | warning | loading | intro | game | puzzletest
  const [lang, setLangState] = useState(getLang());
  const [gameExists, setGameExists] = useState(() => !!loadGame());
  const [confirmNew, setConfirmNew] = useState(false);

  const [lines, setLines] = useState([]);
  const [stats, setStats] = useState({ ...INITIAL_STATS });
  const [battery, setBattery] = useState(BATTERY_START);
  const [spares, setSpares] = useState(SPARES_START);
  const [flags, setFlags] = useState({ ...INITIAL_FLAGS });
  const [docs, setDocs] = useState([]);
  const [notes, setNotes] = useState([]);
  const [objective, setObjective] = useState("—");
  const [objectiveFlash, setObjectiveFlash] = useState(null);
  const [toast, setToast] = useState(null);
  const [glitching, setGlitching] = useState(false);
  const [dying, setDying] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [death, setDeath] = useState(null);
  const [ended, setEnded] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [endFade, setEndFade] = useState(false);
  const [menuAfterEnding, setMenuAfterEnding] = useState(() => {
    try { return localStorage.getItem(MENU_AFTER_END_KEY) === "1"; }
    catch (e) { return false; }
  });
  const [pendingBattery, setPendingBattery] = useState(null);
  const batteryResolveRef = useRef(null);
  const firedThresholdsRef = useRef(new Set());
  const [timeLeft, setTimeLeft] = useState(null);
  const [typing, setTyping] = useState(false);
  const [screen, setScreen] = useState(null);
  const [settingsFrom, setSettingsFrom] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [docPage, setDocPage] = useState(0);
  const [interaction, setInteraction] = useState(null);
  const [tapWait, setTapWait] = useState(false); // ▸ dokun göstergesi
  // ayarlar
  const [speedIdx, setSpeedIdx] = useState(1);
  const [glitchFx, setGlitchFx] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticsOn, setHapticsOn] = useState(true);
  useEffect(() => {
    try {
      const h = localStorage.getItem("sinir1_haptics");
      if (h !== null) { const on = h === "1"; setHapticsOn(on); Haptics.setEnabled(on); }
    } catch (e) {}
  }, []);
  // keypad
  const [kpEntry, setKpEntry] = useState("");
  const [kpMsg, setKpMsg] = useState(null);
  const [kpFails, setKpFails] = useState(0);
  // radio
  const [radioFreq, setRadioFreq] = useState(425.0);
  const [radioPhase, setRadioPhase] = useState("tune");
  const [radioLock, setRadioLock] = useState(0);
  // lights
  const [lights, setLights] = useState([...LIGHTS_INIT]);
  const [lightsDone, setLightsDone] = useState(false);
  // valve / lever / fuse
  const [valveDeg, setValveDeg] = useState(0);
  const [valveBusy, setValveBusy] = useState(false);
  const [leverProg, setLeverProg] = useState(0);
  const [fuseMarker, setFuseMarker] = useState(0);
  const [fuseHits, setFuseHits] = useState(0);
  const [fuseMsg, setFuseMsg] = useState(null);
  const [mechDone, setMechDone] = useState(false);
  // panel
  const [panelMsg, setPanelMsg] = useState(null);
  // breath
  const [breath, setBreath] = useState(null); // {t, lung, holding, phase}
  // karanlık modu (pil %0 — oyun sürer)
  const [dark, setDark] = useState(null); // {left}
  const [batteryFlicker, setBatteryFlicker] = useState(false);

  const runIdRef = useRef(0);
  const skipRef = useRef(false);
  const statsRef = useRef({ ...INITIAL_STATS });
  const batteryRef = useRef(BATTERY_START);
  const sparesRef = useRef(SPARES_START);
  const flagsRef = useRef({ ...INITIAL_FLAGS });
  const docsRef = useRef([]);
  const notesRef = useRef([]);
  const objectiveRef = useRef("—");
  const seenObjectivesRef = useRef(new Set());
  const checkpointRef = useRef(null);
  const currentTrackRef = useRef(null);
  const timerRef = useRef(null);
  const flashRef = useRef(null);
  const toastRef = useRef(null);
  const toastQueueRef = useRef([]);
  const batteryWarnRef = useRef(null);
  const timeoutsRef = useRef([]);
  const scrollRef = useRef(null);
  const clockRef = useRef(227);
  const speedMultRef = useRef(1);
  const glitchFxRef = useRef(true);
  const darkIntRef = useRef(null);
  const darkSfxIntRef = useRef(null);
  const darkRef = useRef(false);
  const screenRef = useRef(null);
  const modeRef = useRef(mode);
  const valveBusyRef = useRef(false);
  const leverIntRef = useRef(null);
  const leverHoldingRef = useRef(false);
  const fuseIntRef = useRef(null);
  const breathIntRef = useRef(null);
  const breathHoldingRef = useRef(false);
  const breathStateRef = useRef(null);
  const tapWaitRef = useRef(null);   // "devam için dokun" kapısı
  const docCloseRef = useRef(null);  // açık döküman kapanana dek bekleme

  /* ---------------- yardımcılar ---------------- */

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimeLeft(null);
  };
  const clearIntervals = () => {
    [darkIntRef, darkSfxIntRef, leverIntRef, fuseIntRef, breathIntRef].forEach((r) => {
      if (r.current) { clearInterval(r.current); r.current = null; }
    });
  };
  const clearPending = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (flashRef.current) { clearTimeout(flashRef.current); flashRef.current = null; }
    if (toastRef.current) { clearTimeout(toastRef.current); toastRef.current = null; }
    toastQueueRef.current = [];
    setToast(null);
  };
  const later = (fn, ms) => {
    const id = setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => { screenRef.current = screen; }, [screen]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  const fmtClock = () => {
    const m = clockRef.current;
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  };

  const wait = (ms, runId) =>
    new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        if (runIdRef.current !== runId) return resolve();
        if (skipRef.current || Date.now() - start >= ms) { skipRef.current = false; return resolve(); }
        later(check, 60);
      };
      check();
    });

  const hardWait = (ms) => new Promise((resolve) => later(resolve, ms));

  /* RİTİM KAPISI: hikaye durur, oyuncu dokunana kadar bekler.
     Yoğun anları (döküman+görev+not selini) tek tek sindirtir. */
  const waitTap = (runId) =>
    new Promise((resolve) => {
      if (runIdRef.current !== runId) return resolve();
      setTapWait(true);
      tapWaitRef.current = () => {
        tapWaitRef.current = null;
        setTapWait(false);
        resolve();
      };
    });

  const releaseGates = () => {
    if (tapWaitRef.current) tapWaitRef.current();
    if (docCloseRef.current) { docCloseRef.current(); docCloseRef.current = null; }
  };

  const readingDelayFor = (kind, text) => {
    const len = String(text || "").length;
    if (kind === "system") return Math.min(3000, Math.max(1000, len * 20));
    if (kind === "alert") return Math.min(4500, Math.max(1500, len * 28));
    if (kind === "anons") return Math.min(8000, Math.max(2500, len * 35));
    // Regular narration & dialogue: slow it down to len * 42 with a comfortable 9.5s max cap,
    // so players have ample time to read, and fast readers can tap to skip.
    return Math.min(9500, Math.max(2200, len * 42));
  };

  const typeLine = (kind, text, runId, speed = 26) =>
    new Promise((resolve) => {
      if (runIdRef.current !== runId) return resolve();
      setTyping(false);
      setLines((ls) => [...ls, { kind, text }]);
      const delay = Math.round(readingDelayFor(kind, text) * speedMultRef.current);
      wait(delay, runId).then(resolve);
    });

  const setBatteryBoth = (v) => {
    batteryRef.current = v;
    setBattery(v);
    if (v > 0 && darkRef.current) stopDarkness();
  };
  const setSparesBoth = (v) => { sparesRef.current = v; setSpares(v); };
  const setFlagsBoth = (updates) => {
    flagsRef.current = { ...flagsRef.current, ...updates };
    setFlags(flagsRef.current);
  };
  const flagOk = (cond) => {
    if (!cond) return true;
    if (Array.isArray(cond.all)) return cond.all.every(flagOk);
    if (Array.isArray(cond.any)) return cond.any.some(flagOk);
    const cur = flagsRef.current[cond.flag];
    let ok;
    if (cond.equals !== undefined) {
      // boolean flag: !!cur === bool ; string/sayı flag: cur === değer
      ok = typeof cond.equals === "boolean"
        ? (!!cur === cond.equals)
        : (cur === cond.equals || ((cur ?? "") === cond.equals));
    } else {
      ok = !!cur;
    }
    return cond.negate ? !ok : ok;
  };
  const statOk = (cond) => {
    if (!cond) return true;
    if (cond.stat === "akil") return true;
    const v = statsRef.current[cond.stat] || 0;
    if (cond.gte !== undefined && v < cond.gte) return false;
    if (cond.lte !== undefined && v > cond.lte) return false;
    return true;
  };

  const showObjective = (text) => {
    const key = String(text || "").trim();
    const alreadySeen = key && seenObjectivesRef.current.has(key);
    objectiveRef.current = text;
    setObjective(text);
    if (alreadySeen) {
      if (flashRef.current) { clearTimeout(flashRef.current); flashRef.current = null; }
      setObjectiveFlash(null);
      return false;
    }
    if (key) seenObjectivesRef.current.add(key);
    setObjectiveFlash({ text, key: Date.now() });
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setObjectiveFlash(null), 4200);
    return true;
  };

  // Tek seferde bir toast gösterilir; art arda gelenler kuyruğa girer ki
  // bir toast (örn. "Kaydediliyor…") başka biri tarafından anında ezilmesin.
  const advanceToast = () => {
    const next = toastQueueRef.current.shift();
    if (!next) { toastRef.current = null; setToast(null); return; }
    setToast(next);
    const dur = toastQueueRef.current.length > 0 ? 1400 : 3200;
    toastRef.current = setTimeout(advanceToast, dur);
  };

  const showToast = (icon, text, color) => {
    toastQueueRef.current.push({ icon, text, color, key: Date.now() + Math.random() });
    if (!toastRef.current) advanceToast();
  };

  const glitchBurst = (ms) => {
    AudioSys.burst(ms);
    Haptics.glitch();
    if (!glitchFxRef.current) return;
    setGlitching(true);
    later(() => setGlitching(false), ms);
  };

  const runGlitch = async (ms) => {
    AudioSys.burst(Math.min(ms, 400));
    Haptics.glitch();
    if (!glitchFxRef.current) return hardWait(Math.min(ms, 300));
    setGlitching(true);
    await hardWait(ms);
    setGlitching(false);
  };

  /* ---------------- GÜÇ KAYBI (blackout) ---------------- */

  /* ---------------- KARANLIK MODU (pil %0) ----------------
     Oyun durmaz: ekran pırpırlı karanlığa düşer, oyuncu hikayede
     ilerleyip pil bulmaya çalışır. Süre dolarsa ölüm. Pil takılırsa
     (yedek varsa pil ikonuna dokun / hikayede pil bul) mod biter. */

  function stopDarkness(silent) {
    if (darkIntRef.current) { clearInterval(darkIntRef.current); darkIntRef.current = null; }
    if (darkSfxIntRef.current) { clearInterval(darkSfxIntRef.current); darkSfxIntRef.current = null; }
    darkRef.current = false;
    setDark(null);
    if (!silent) AudioSys.heart(null);
  }

  const startDarkness = () => {
    if (darkRef.current) return;
    darkRef.current = true;
    setDark({ left: DARK_MS });
    AudioSys.heart(430);
    showToast("▼", t("eng.darkStart"), "#c23b2e");

    // İlk kısa devre kıvılcımı ve ekran titremesi
    AudioSys.burst(500);
    setGlitching(true);
    later(() => setGlitching(false), 500);

    let left = DARK_MS;
    let last = performance.now();

    // 4.8 saniyede bir CSS animasyonuyla senkron şekilde kısa devre ve pırpır
    darkSfxIntRef.current = setInterval(() => {
      if (batteryRef.current > 0 || modeRef.current !== "game" || screenRef.current) return;
      AudioSys.burst(600);
      setGlitching(true);
      later(() => setGlitching(false), 600);
    }, 4800);

    darkIntRef.current = setInterval(() => {
      if (batteryRef.current > 0) { stopDarkness(); return; }
      if (modeRef.current !== "game" || screenRef.current) return;
      const now = performance.now();
      const dt = Math.min(500, Math.max(100, now - last));
      last = now;
      left -= dt;
      setDark({ left });
      if (left <= 0) {
        stopDarkness(true);
        die({
          text: t("eng.darkDeath"),
          battery: true,
        });
      }
    }, 250);
  };

  /* ---------------- olay oynatıcı ---------------- */

  const playEvent = async (ev, runId) => {
    if (ev.if && !flagOk(ev.if)) return;
    switch (ev.type) {
      case "narrate": return typeLine("narrate", ev.text, runId, 26);
      case "ambient": return typeLine("ambient", ev.text, runId, 30);
      case "system": return typeLine("system", ev.text, runId, 12);
      case "alert": return typeLine("alert", ev.text, runId, 14);
      case "pause": return wait(ev.ms || 800, runId);
      case "glitch": return runGlitch(ev.ms || 600);
      case "flag": { setFlagsBoth(ev.set); return; }
      case "status": {
        for (const item of ev.items) {
          const on = !!flagsRef.current[item.flag];
          await typeLine("system", item.label + ": " + (on ? t("eng.statusOn") : t("eng.statusOff")), runId, 8);
          if (runIdRef.current !== runId) return;
        }
        return;
      }
      case "objective": {
        const shown = showObjective(ev.text);
        if (shown) AudioSys.objectiveSfx();
        return wait(shown ? 1800 : 200, runId);
      }
      case "stat": {
        if (ev.stat === "akil") return;
        const next = { ...statsRef.current };
        next[ev.stat] = Math.max(0, Math.min(STAT_MAX[ev.stat] || 100, (next[ev.stat] || 0) + ev.delta));
        statsRef.current = next;
        setStats(next);
        // merkezî eşik izleyicisi: gürültü/akıl eşiklerini kontrol et
        if (checkThresholds(runId)) return;   // ölüm tetiklendiyse akışı durdur
        if (ev.note) return typeLine(ev.noteKind || "alert", "⚠ " + ev.note, runId, 14);
        return;
      }
      case "battery": {
        // pil DÜŞÜŞÜ otomatik (delta), ama YEDEK PİL için oyuncuya sor
        if (ev.delta) setBatteryBoth(Math.max(0, Math.min(100, batteryRef.current + ev.delta)));
        if (ev.spares) {
          // akışı durdur, oyuncuya "Pili al / Bırak" seçeneği göster
          setPendingBattery({ n: ev.spares });
          return new Promise((resolve) => { batteryResolveRef.current = resolve; });
        }
        return wait(1500, runId);
      }
      case "anons": return typeLine("anons", ev.text, runId, 20);
      case "music": { currentTrackRef.current = ev.track || null; AudioSys.music(ev.track || null); return; }
      case "document": {
        if (!docsRef.current.find((d) => d.id === ev.doc.id)) {
          docsRef.current = [...docsRef.current, { ...ev.doc, read: !!ev.open }];
          setDocs(docsRef.current);
        }
        AudioSys.page();
        showToast("▤", t("eng.docAdded"), "#d0b06a");
        if (ev.open) {
          // Outlast tarzı: kağıt ekrana gelir, kapatılana dek hikaye BEKLER
          await wait(500, runId);
          if (runIdRef.current !== runId) return;
          const item = docsRef.current.find((d) => d.id === ev.doc.id);
          setDocPage(0);
          setOpenItem({ kind: "doc", item });
          await new Promise((res) => { docCloseRef.current = res; });
          return wait(500, runId);
        }
        return wait(1800, runId);
      }
      case "waitTap": return waitTap(runId);
      case "note": {
        clockRef.current += 3 + Math.floor(Math.random() * 4);
        if (!notesRef.current.find((n) => n.id === ev.id)) {
          notesRef.current = [...notesRef.current, { id: ev.id, title: ev.title, text: ev.text, time: fmtClock(), read: false }];
          setNotes(notesRef.current);
        }
        AudioSys.scratch();
        showToast("✎", t("eng.noteAdded"), "#cbb794");
        return wait(600, runId);
      }
      default: return;
    }
  };

  const startTimer = (node) => {
    const total = node.timer.seconds;
    let left = total;
    setTimeLeft({ left, total });
    timerRef.current = setInterval(() => {
      left -= 0.1;
      if (left <= 0) {
        clearTimer();
        const avail = node.choices.filter((c) => flagOk(c.if) && statOk(c.ifStat));
        const def = avail.find((c) => c.default) || avail[avail.length - 1];
        handleChoice(def, true);
      } else {
        setTimeLeft({ left, total });
      }
    }, 100);
  };

  const die = (payload) => {
    AudioSys.boom();
    AudioSys.heart(null);
    setPendingBattery(null);
    if (batteryResolveRef.current) { batteryResolveRef.current(); batteryResolveRef.current = null; }
    setDying(true);
    later(() => setDeath(payload), 2000);
  };

  /* ---- MERKEZÎ EŞİK İZLEYİCİSİ (watchdog) ----
     Her stat değişiminden sonra çağrılır. Gürültü eşiklerini kontrol
     eder; eşik ilk kez aşıldığında uyarı verir veya öldürür.
     Her bölümde otomatik çalışır — ayrıca noiseGate koymaya gerek yok.
     Dönüş: true = ölüm tetiklendi (akış durmalı). */
  const checkThresholds = (runId) => {
    if (death || dying) return false;
    const s = statsRef.current;
    const noise = s.gurultu || 0;
    const fired = firedThresholdsRef.current;

    // GÜRÜLTÜ: yükseldikçe tehlike (at değerini AŞUNCA)
    for (const th of NOISE_THRESHOLDS) {
      if (noise >= th.at && !fired.has(th.key)) {
        fired.add(th.key);
        if (th.kind === "death") {
          Haptics.death();
          die({ text: t("eng." + th.key) });
          return true;
        }
        Haptics.low();
        AudioSys.blipSfx(220);
        showToast("⚠", t("eng." + th.key), "#c2884a");
      }
    }
    return false;
  };

  /* ---------------- node oynatıcı ---------------- */

  const playNode = useCallback(async (nodeId) => {
    const runId = ++runIdRef.current;
    const node = STORY.nodes[nodeId];
    if (!node) return;

    // GÜRÜLTÜ KAPISI — pusular
    if (node.noiseGate) {
      const gates = node.noiseGate.slice().sort((a, b) => b.min - a.min);
      for (const g of gates) {
        if ((statsRef.current.gurultu || 0) >= g.min && !flagsRef.current[g.once]) {
          setFlagsBoth({ [g.once]: true });
          return playNode(g.node);
        }
      }
    }

    releaseGates(); // yarım kalmış kapı/döküman beklemesi varsa çöz
    setCurrentNodeId(nodeId);
    setChoicesVisible(false);
    setInteraction(null);
    clearTimer();

    // NOT: pil artık node başına DEĞİL, zamanla otomatik azalıyor (Outlast tarzı).
    // Eski 'cost' alanları hikâyede kalabilir ama pili düşürmez.

    if (node.checkpoint) {
      checkpointRef.current = {
        nodeId,
        stats: { ...statsRef.current },
        battery: batteryRef.current,
        spares: sparesRef.current,
        flags: { ...flagsRef.current },
        docs: docsRef.current.map((d) => ({ ...d })),
        notes: notesRef.current.map((n) => ({ ...n })),
        objective: objectiveRef.current,
        seenObjectives: [...seenObjectivesRef.current],
        clock: clockRef.current,
      };
      saveGame(checkpointRef.current); // kalıcı kayıt
      showToast("💾", t("eng.saved"), "#6f8a90");
    }

    // RİTİM KURALI: art arda iki "meta" olay (döküman/not/görev/pil)
    // gelirse araya otomatik dokunma kapısı girer — ödül seli oluşamaz.
    const META = new Set(["document", "note", "objective", "battery"]);
    let prevMeta = false;
    for (const ev of node.events) {
      if (runIdRef.current !== runId) return;
      const isMeta = META.has(ev.type);
      if (isMeta && prevMeta) {
        await waitTap(runId);
        if (runIdRef.current !== runId) return;
      }
      await playEvent(ev, runId);
      if (ev.type === "narrate" || ev.type === "ambient" || ev.type === "waitTap") prevMeta = false;
      else if (isMeta) prevMeta = true;
    }
    if (runIdRef.current !== runId) return;
    if (node.death) { Haptics.death(); die({ text: node.deathText }); return; }
    if (node.ending) {
      setEnded(true);
      setMenuAfterEnding(true);
      try { localStorage.setItem(MENU_AFTER_END_KEY, "1"); } catch (e) {}
      clearGame();
      setGameExists(false);
      return;
    }
    if (node.interaction) {
      if (node.interaction.doneFlag && flagsRef.current[node.interaction.doneFlag]) {
        playNode(node.interaction.doneNext || node.interaction.success);
        return;
      }
      const k = node.interaction.kind;
      if (k === "keypad") { setKpEntry(""); setKpMsg(null); setKpFails(0); }
      if (k === "panel") { setPanelMsg(null); }
      if (k === "radio") { setRadioFreq(425.0); setRadioPhase("tune"); setRadioLock(0); }
      if (k === "lights") { setLights([...LIGHTS_INIT]); setLightsDone(false); }
      if (k === "valve") { setValveDeg(0); setMechDone(false); setValveBusy(false); valveBusyRef.current = false; }
      if (k === "lever") { setLeverProg(0); setMechDone(false); leverHoldingRef.current = false; }
      if (k === "fuse") { setFuseHits(0); setFuseMsg(null); setMechDone(false); }
      if (k === "breath") { breathHoldingRef.current = false; setBreath({ t: 0, lung: 0, holding: false, phase: "wait" }); }
      if (k === "chase") { AudioSys.music("chase"); }
      setInteraction({ ...node.interaction });
      return;
    }
    setChoicesVisible(true);
    if (node.timer) startTimer(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoice = (choice, auto = false) => {
    if (!choice) return;
    AudioSys.blipSfx(520);
    clearTimer();
    setChoicesVisible(false);
    clockRef.current += 1 + Math.floor(Math.random() * 3);
    setLines((ls) => [...ls, { kind: "choice", text: (auto ? "· · · " : "» ") + choice.text }]);
    playNode(choice.next);
  };

  const handleSkipTap = () => {
    if (screen || interaction) return;
    if (tapWaitRef.current) { AudioSys.blipSfx(420); tapWaitRef.current(); return; }
    skipRef.current = true;
  };

  const swapBattery = () => {
    if (death || dying) return;
    if (batteryRef.current >= 100) {
      AudioSys.blipSfx(300);
      showToast("🔋", t("eng.batteryAlreadyFull"), "#b89a4a");
      return;
    }
    if (sparesRef.current <= 0) return;
    setSparesBoth(sparesRef.current - 1);
    setBatteryBoth(100);
    AudioSys.pickup();
    showToast("⚡", t("eng.swapped"), "#7f9eb5");
  };

  // oyuncu bulunan pili almayı seçti
  const takeBattery = () => {
    const n = pendingBattery?.n || 1;
    const before = sparesRef.current;
    const after = Math.min(SPARES_MAX, before + n);
    const gained = after - before;
    if (gained > 0) {
      setSparesBoth(after);
      AudioSys.pickup();
      showToast("▲", t("eng.spareGain", { n: gained }), "#7f9eb5");
    } else {
      // yer yok
      AudioSys.blipSfx(300);
      showToast("■", t("eng.spareFull", { max: SPARES_MAX }), "#b89a4a");
    }
    setPendingBattery(null);
    if (batteryResolveRef.current) { batteryResolveRef.current(); batteryResolveRef.current = null; }
  };

  // oyuncu pili bırakmayı seçti
  const skipBattery = () => {
    setPendingBattery(null);
    if (batteryResolveRef.current) { batteryResolveRef.current(); batteryResolveRef.current = null; }
  };

  const markRead = (kind, id) => {
    if (kind === "doc") {
      docsRef.current = docsRef.current.map((d) => (d.id === id ? { ...d, read: true } : d));
      setDocs(docsRef.current);
    } else {
      notesRef.current = notesRef.current.map((n) => (n.id === id ? { ...n, read: true } : n));
      setNotes(notesRef.current);
    }
  };

  const openArchiveItem = (kind, item) => {
    AudioSys.page();
    markRead(kind, item.id);
    setDocPage(0);
    setOpenItem({ kind, item });
  };

  /* ---------------- BULMACA KANCALARI ---------------- */
  const puzzleFail = (p) => {
    AudioSys.buzzSfx();
    glitchBurst(180);
    if (p?.gurultu) {
      statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + p.gurultu) };
      setStats({ ...statsRef.current });
      checkThresholds(runIdRef.current);
    }
    if (p?.text) showToast("⚠", p.text, "#c23b2e");
  };
  const puzzleWin = () => {
    if (!interaction) return;
    if (interaction.kind === "chase") {
      AudioSys.fadeOutMusic(2800);
    }
    const target = interaction.success;
    setInteraction(null);
    playNode(target);
  };
  const chaseFail = () => {
    if (!interaction) return;
    const target = interaction.fail;
    setInteraction(null);
    if (target) playNode(target);
    else puzzleFail({ text: interaction.failText || "Yakalandin." });
  };

  /* ---------------- ANA PANEL (kırmızı buton) ---------------- */

  const panelPress = () => {
    if (!interaction || interaction.kind !== "panel") return;
    const allOk = interaction.require.every((f) => flagsRef.current[f]);
    if (allOk) {
      AudioSys.clank();
      AudioSys.blipSfx(980);
      setPanelMsg({ text: t("panel.starting"), ok: true });
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 1200);
    } else {
      AudioSys.buzzSfx();
      glitchBurst(160);
      const eksik = interaction.require.filter((f) => !flagsRef.current[f]).length;
      setPanelMsg({ text: t("panel.error", { n: eksik }), ok: false });
    }
  };

  /* ---------------- TUŞ PANELİ ---------------- */

  const kpPress = (d) => {
    if (kpEntry.length >= 4) return;
    AudioSys.blipSfx(620);
    setKpMsg(null);
    setKpEntry(kpEntry + d);
  };
  const kpClear = () => { setKpEntry(""); setKpMsg(null); AudioSys.blipSfx(440); };
  const kpSubmit = () => {
    if (kpEntry.length < 4 || !interaction) return;
    if (kpEntry === interaction.code) {
      AudioSys.blipSfx(980);
      setKpMsg({ text: t("keypad.ok"), ok: true });
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 900);
    } else {
      const fails = kpFails + 1;
      setKpFails(fails);
      setKpEntry("");
      AudioSys.buzzSfx();
      glitchBurst(250);
      if (fails === 3) {
        statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + 10) };
        setStats({ ...statsRef.current });
        checkThresholds(runIdRef.current);
        setKpMsg({ text: t("keypad.badNoisy"), ok: false });
      } else {
        setKpMsg({ text: t("keypad.bad"), ok: false });
      }
    }
  };
  const kpKey = (k) => { if (k === t("keypad.del")) kpClear(); else if (k === t("keypad.enter")) kpSubmit(); else kpPress(k); };

  const interactionCancel = () => {
    if (!interaction) return;
    const target = interaction.cancel;
    setInteraction(null);
    setLines((ls) => [...ls, { kind: "choice", text: "» Uzaklaş" }]);
    playNode(target);
  };

  /* ---------------- RADYO ---------------- */

  const finishRadioLock = () => {
    if (!interaction || interaction.kind !== "radio") return;
    const mode = interaction.mode || "cut";
    setRadioPhase(mode);
    setRadioLock(100);
    if (mode === "cut") {
      glitchBurst(900);
    } else {
      AudioSys.blipSfx(880);
    }
    const target = interaction.success;
    later(() => {
      setInteraction(null);
      setRadioLock(0);
      playNode(target);
    }, 1600);
  };

  const radioAdjust = (delta) => {
    if ((radioPhase !== "tune" && radioPhase !== "lock") || !interaction) return;
    if (radioLock >= 100) return;
    AudioSys.blipSfx(340);
    const f = Math.round(Math.max(410, Math.min(450, radioFreq + delta)) * 10) / 10;
    setRadioFreq(f);
    // gizli yayınlar — dinlemek iz bırakır
    if (Math.abs(f - 437.4) <= 0.05 && !flagsRef.current.frekansCocuk) {
      setFlagsBoth({ frekansCocuk: true, frekanslariDuydun: !!flagsRef.current.frekansNefes });
    }
    if (Math.abs(f - 421.8) <= 0.05 && !flagsRef.current.frekansNefes) {
      setFlagsBoth({ frekansNefes: true, frekanslariDuydun: !!flagsRef.current.frekansCocuk });
    }
  };
  const radioSignal = Math.max(0, Math.round(100 - Math.abs(radioFreq - (interaction?.target || 432)) * 22));
  const radioHint = (() => {
    if (!interaction || interaction.kind !== "radio") return "";
    const f = radioFreq;
    if (radioPhase === "lock") return t("radio.hintLock");
    if (radioPhase === "cut") return t("radio.hintCut");
    if (radioPhase === "transmit") return t("radio.hintTransmit");
    if (Math.abs(f - 437.4) < 0.4) return t("radio.hintChild");
    if (Math.abs(f - 421.8) < 0.4) return t("radio.hintBreath");
    if (Math.abs(f - interaction.target) < 0.8) return t("radio.hintNear");
    if (Math.abs(f - interaction.target) < 2.5) return t("radio.hintFar");
    return t("radio.hintStatic");
  })();

  /* ---------------- IŞIK DEVRESİ ---------------- */

  const lightsPress = (i) => {
    if (lightsDone || !interaction) return;
    AudioSys.blipSfx(560);
    const next = lights.slice();
    [i - 1, i, i + 1].forEach((j) => {
      if (j >= 0 && j < next.length) next[j] = !next[j];
    });
    setLights(next);
    if (next.every(Boolean)) {
      setLightsDone(true);
      AudioSys.blipSfx(980);
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 1000);
    }
  };
  const lightsReset = () => { if (!lightsDone) { setLights([...LIGHTS_INIT]); AudioSys.blipSfx(440); } };

  /* ---------------- VANA ---------------- */

  const valveTurn = () => {
    if (mechDone || !interaction || valveBusyRef.current) return;
    valveBusyRef.current = true;
    setValveBusy(true);
    AudioSys.valveSfx();
    const step = 360 / interaction.turns;
    const next = valveDeg + step;
    setValveDeg(next);
    const delay = interaction.turnDelayMs ?? 420;
    if (next >= 360) {
      setMechDone(true);
      const target = interaction.success;
      later(() => { valveBusyRef.current = false; setValveBusy(false); setInteraction(null); playNode(target); }, Math.max(800, delay));
      return;
    }
    later(() => {
      valveBusyRef.current = false;
      setValveBusy(false);
    }, delay);
  };

  /* ---------------- ŞALTER (basılı tut) ---------------- */

  const leverDown = () => {
    if (mechDone || !interaction) return;
    leverHoldingRef.current = true;
    if (leverIntRef.current) return;
    leverIntRef.current = setInterval(() => {
      setLeverProg((p) => {
        let next = p;
        if (leverHoldingRef.current) next = Math.min(1, p + 50 / (interaction.holdMs || 1800));
        else next = Math.max(0, p - 0.05);
        if (next >= 1) {
          clearInterval(leverIntRef.current);
          leverIntRef.current = null;
          setMechDone(true);
          AudioSys.clank();
          const target = interaction.success;
          later(() => { setInteraction(null); playNode(target); }, 700);
        }
        return next;
      });
    }, 50);
  };
  const leverUp = () => { leverHoldingRef.current = false; };

  /* ---------------- SİGORTA (zamanlama) ---------------- */

  useEffect(() => {
    if (interaction?.kind !== "fuse") {
      if (fuseIntRef.current) { clearInterval(fuseIntRef.current); fuseIntRef.current = null; }
      return;
    }
    let dir = 1, pos = 0;
    let last = performance.now();
    fuseIntRef.current = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(80, Math.max(20, now - last));
      last = now;
      pos += dir * 2.4 * (dt / 20);
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      setFuseMarker(pos);
    }, 40);
    return () => { if (fuseIntRef.current) { clearInterval(fuseIntRef.current); fuseIntRef.current = null; } };
  }, [interaction]);

  const fuseTap = () => {
    if (mechDone || !interaction) return;
    const min = interaction.zoneMin ?? 44;
    const max = interaction.zoneMax ?? 56;
    const inZone = fuseMarker >= min && fuseMarker <= max;
    if (inZone) {
      AudioSys.fuseSfx();
      const next = fuseHits + 1;
      setFuseHits(next);
      setFuseMsg({ text: t("mech.fuseOk", { a: next, b: interaction.hits }), ok: true });
      if (next >= interaction.hits) {
        setMechDone(true);
        const target = interaction.success;
        later(() => { setInteraction(null); playNode(target); }, 800);
      }
    } else {
      AudioSys.buzzSfx();
      glitchBurst(180);
      statsRef.current = { ...statsRef.current, gurultu: Math.min(100, (statsRef.current.gurultu || 0) + 4) };
      setStats({ ...statsRef.current });
      checkThresholds(runIdRef.current);
      setFuseMsg({ text: t("mech.fuseSpark"), ok: false });
    }
  };

  /* ---------------- NEFES TUTMA (ADRENALİN KONTROLÜ) ---------------- */

  const finishBreath = useCallback((target) => {
    AudioSys.heart(null);
    setInteraction(null);
    setBreath(null);
    playNode(target);
  }, [playNode]);

  useEffect(() => {
    if (interaction?.kind !== "breath") {
      setBreath(null);
      return;
    }
    setBreath({}); // BreathOverlay'i render etmek için
  }, [interaction]);

  /* ---------------- akış kontrol: yeni oyun / devam / respawn ---------------- */

  const restoreFrom = (cp) => {
    statsRef.current = { ...cp.stats };
    setStats({ ...cp.stats });
    // eşik izleyicisini sıfırla: geri yüklenen değerin ötesindeki eşikleri
    // yeniden "silahlı" hale getir (checkpoint'teki gürültü/akıl seviyesine göre)
    firedThresholdsRef.current = new Set();
    setBatteryBoth(cp.battery);
    setSparesBoth(cp.spares);
    flagsRef.current = { ...cp.flags };
    setFlags(flagsRef.current);
    docsRef.current = cp.docs.map((d) => ({ ...d }));
    setDocs(docsRef.current);
    notesRef.current = cp.notes.map((n) => ({ ...n }));
    setNotes(notesRef.current);
    objectiveRef.current = cp.objective;
    setObjective(cp.objective);
    seenObjectivesRef.current = new Set(cp.seenObjectives || (cp.objective && cp.objective !== "—" ? [cp.objective] : []));
    clockRef.current = cp.clock;
    setScreen(null);
    setLines([{ kind: "system", text: t("eng.restored") }]);
    playNode(cp.nodeId);
  };

  const respawn = () => {
    const cp = checkpointRef.current;
    const batteryDeath = !!death?.battery;
    setDeath(null);
    setDying(false);
    stopDarkness(true);
    releaseGates();
    setOpenItem(null);
    clearIntervals();
    clearPending();
    AudioSys.heart(null);
    if (!cp) return startFresh();
    restoreFrom(batteryDeath ? { ...cp, battery: Math.max(cp.battery || 0, 25) } : cp);
  };

  const startFresh = (startNode) => {
    clearPending();
    clearTimer();
    clearIntervals();
    clearGame(); // eski kalıcı kaydı sil (ilk checkpoint hemen yenisini yazar)
    setDeath(null);
    setDying(false);
    stopDarkness(true);
    setEnded(false);
    statsRef.current = { ...INITIAL_STATS };
    setStats({ ...INITIAL_STATS });
    firedThresholdsRef.current = new Set();
    setBatteryBoth(BATTERY_START);
    setSparesBoth(SPARES_START);
    flagsRef.current = { ...INITIAL_FLAGS };
    setFlags({ ...INITIAL_FLAGS });
    docsRef.current = [];
    setDocs([]);
    notesRef.current = [];
    setNotes([]);
    objectiveRef.current = "—";
    seenObjectivesRef.current = new Set();
    setObjective("—");
    setObjectiveFlash(null);
    setToast(null);
    setInteraction(null);
    setBreath(null);
    clockRef.current = 227;
    checkpointRef.current = null;
    setScreen(null);
    setOpenItem(null);
    setLines([]);
    setGameExists(true);
    setMode("game");
    AudioSys.init().then(() => AudioSys.ambient(true));
    playNode(typeof startNode === "string" ? startNode : STORY.start);
  };

  const resumeGame = () => {
    AudioSys.init().then(() => AudioSys.ambient(true));
    // Oturum içinde oyun zaten varsa: kaldığı yerden sür
    if (checkpointRef.current || lines.length > 0) { setMode("game"); return; }
    // Uygulama yeni açıldıysa: diskteki kayıttan yükle
    const cp = loadGame();
    if (!cp || !STORY.nodes[cp.nodeId]) {
      setMode("game");
      playNode(STORY.start);
      return;
    }
    checkpointRef.current = cp;
    setMode("game");
    restoreFrom(cp);
  };

  /* ---------------- ayarlar ---------------- */

  const applySpeed = (idx) => {
    setSpeedIdx(idx);
    speedMultRef.current = SPEED_OPTIONS[idx].mult;
  };
  const applyGlitchFx = (on) => {
    setGlitchFx(on);
    glitchFxRef.current = on;
    if (!on) setGlitching(false);
  };
  const applyHaptics = (on) => {
    setHapticsOn(on);
    Haptics.setEnabled(on);
    try { localStorage.setItem("sinir1_haptics", on ? "1" : "0"); } catch (e) {}
    if (on) Haptics.tap();
  };
  const applySound = (on) => {
    setSoundOn(on);
    AudioSys.setEnabled(on);
  };
  const applyLang = (code) => {
    setLang(code);        // UI sözlüğü + kalıcı kayıt
    setStoryLang(code);   // hikaye havuzu (yoksa TR'ye düşer)
    setLangState(code);   // yeniden çizim
  };

  /* ---------------- otomatik pil azalması (Outlast tarzı) ---------------- */
  // oyun ekranı aktifken pil sürekli azalır; oyuncu yedekle değiştirmeli
  useEffect(() => {
    // sadece oyun oynanırken azalt: bulmaca/menü/ölüm/pil-seçimi yokken
    const active = mode === "game" && !death && !dying && !pendingBattery
      && !interaction && !screen && !ended;
    if (!active) return;
    // gerilim durumu: karanlık modu veya yüksek gürültü → daha hızlı erir
    const tense = dark || (stats.gurultu || 0) >= 60;
    const rate = tense ? BATTERY_DRAIN_TENSE : BATTERY_DRAIN_MS;
    const iv = setInterval(() => {
      if (batteryRef.current <= 0) return;
      const nb = Math.max(0, batteryRef.current - 1);
      setBatteryBoth(nb);
      if (nb === 0) startDarkness();          // pil bitti → karanlık
      else if (nb <= 25) Haptics.low();        // kritik uyarı titreşimi
    }, rate);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, death, dying, pendingBattery, interaction, screen, ended, dark, stats.gurultu]);

  const isBatteryLow = battery > 0 && battery <= 25;

  useEffect(() => {
    if (batteryWarnRef.current) {
      clearInterval(batteryWarnRef.current);
      batteryWarnRef.current = null;
    }
    const active = mode === "game" && isBatteryLow && !death && !dying && !screen;
    if (!active) return;
    AudioSys.batteryLowSfx();
    batteryWarnRef.current = setInterval(() => AudioSys.batteryLowSfx(), 1600);
    return () => {
      if (batteryWarnRef.current) {
        clearInterval(batteryWarnRef.current);
        batteryWarnRef.current = null;
      }
    };
  }, [isBatteryLow, mode, death, dying, screen]);

  useEffect(() => {
    if (battery > 0 && battery <= 25) {
      const iv = setInterval(() => {
        setBatteryFlicker(true);
        setTimeout(() => setBatteryFlicker(false), 350);
      }, 2800);
      return () => {
        clearInterval(iv);
        setBatteryFlicker(false);
      };
    } else {
      setBatteryFlicker(false);
    }
  }, [battery]);

  // Radyo kilitleme otomatik artış/azalış döngüsü
  useEffect(() => {
    const active = interaction?.kind === "radio" && (radioPhase === "tune" || radioPhase === "lock");
    if (!active) return;
    const iv = setInterval(() => {
      const diff = Math.abs(radioFreq - interaction.target);
      const isExact = diff <= 0.05;
      
      if (isExact) {
        setRadioPhase("lock");
        setRadioLock((p) => {
          const next = Math.min(100, p + 10); // 2 saniyede kilitlenir
          if (next >= 100) {
            clearInterval(iv);
            later(finishRadioLock, 280);
          }
          return next;
        });
      } else {
        setRadioLock((p) => {
          if (p <= 0) return 0;
          const next = Math.max(0, p - 15);
          if (next <= 0) setRadioPhase("tune");
          return next;
        });
      }
    }, 200);
    return () => clearInterval(iv);
  }, [interaction, radioFreq, radioPhase]);

  /* ---------------- ses durumları ---------------- */

  // global buton tıklama sesi + hafif titreşim (tüm butonlara)
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("button, .s1-btn, [role='button']");
      if (!el) return;
      AudioSys.uiClick();
      Haptics.tap();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // arayüz müziği: mode'a göre menü / intro / credits parçaları
  useEffect(() => {
    // credits ekranı açıksa credits müziği (mode ne olursa olsun öncelikli)
    if (showCredits || screen === "credits") {
      AudioSys.pauseGameMusic();
      AudioSys.music("credits");
      return;
    }
    if (mode === "menu" || mode === "warning") {
      AudioSys.music("menu");
      return;
    }
    if (mode === "intro") {
      AudioSys.music("intro");
      return;
    }
    // boot/disclaimer/loading: sessiz.
    if (mode === "boot" || mode === "disclaimer" || mode === "bootload" || mode === "resumeload") {
      AudioSys.music(null);
      return;
    }
    // arşiv (menu, notes, docs) veya ayarlar (pause, settings) açıkken sakin ambiyans müziği
    if (mode === "game" && (screen === "pause" || screen === "settings" || screen === "menu" || screen === "notes" || screen === "docs")) {
      AudioSys.pauseGameMusic();
      AudioSys.music("archive"); // Sakin arşiv/ayarlar müziği
      return;
    }
    // oyun moduna dönünce (menüler kapandığında) durdurulan oyun müziğini/ambiansını geri yükle
    if (mode === "game" && !screen) {
      AudioSys.resumeGameMusic();
      return;
    }
  }, [mode, showCredits, screen]);

  useEffect(() => {
    if (mode !== "game") { AudioSys.ambient(false); AudioSys.heart(null); return; }
    AudioSys.ambient(true);
  }, [mode]);

  useEffect(() => {
    // kalp atışı: kriz seviyeleri
    if (mode !== "game" || death || dark || interaction?.kind === "breath") return;
    if (battery > 0 && battery <= 8) AudioSys.heart(620);
    else if (battery > 0 && battery <= 15) AudioSys.heart(880);
    else AudioSys.heart(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battery, mode, death, !!dark, interaction]);

  useEffect(() => {
    // radyo statiği
    if (interaction?.kind === "radio") {
      const lvl = radioPhase === "cut" ? 0.005
        : radioPhase === "lock" ? 0.006
        : 0.008 + (1 - radioSignal / 100) * 0.045;
      AudioSys.staticLevel(lvl);
    } else {
      AudioSys.staticLevel(0);
    }
  }, [interaction, radioFreq, radioPhase, radioSignal]);

  useEffect(() => {
    // Mobil: uzun basışta tarayıcı bağlam menüsü / kopyalama balonu çıkmasın
    const prevent = (e) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    return () => document.removeEventListener("contextmenu", prevent);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, choicesVisible, timeLeft]);

  useEffect(() => () => {
    clearPending(); clearTimer(); clearIntervals();
    if (batteryWarnRef.current) clearInterval(batteryWarnRef.current);
    AudioSys.heart(null); AudioSys.ambient(false); AudioSys.staticLevel(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- türetilen değerler ---------------- */

  const node = currentNodeId ? STORY.nodes[currentNodeId] : null;
  const bColor = batteryColorOf(battery);

  const visibleChoices = (node?.choices || []).filter((c) => flagOk(c.if) && statOk(c.ifStat));

  const dimOpacity = battery > 40 ? 0 : battery > 15 ? 0.2 : battery > 5 ? 0.42 : 0.58;
  const wordsObscured = battery <= 15;
  const choicesObscured = battery <= 5;
  const flickering = (battery > 0 && battery <= 12 && screen !== "blackout") || batteryFlicker;

  const docPages = openItem?.kind === "doc" ? paginateDoc(openItem.item.body) : [];
  // karanlıkta ölüme yaklaşma oranı (0→1) — SÜRE OYUNCUYA GÖSTERİLMEZ
  const darkP = dark ? Math.min(1, Math.max(0, 1 - dark.left / DARK_MS)) : 0;

  /* ================= ANA MENÜ ================= */
  if (mode === "menu") {
    return (
      <>
        <MainMenu
          gameExists={gameExists}
          confirmNew={confirmNew}
          afterEnding={menuAfterEnding}
          onResume={() => setMode("resumeload")}
          onNewGame={() => {
            if (gameExists && !confirmNew) { setConfirmNew(true); return; }
            setConfirmNew(false);
            AudioSys.init();
            setMode("warning");
          }}
          onSettings={() => { setSettingsFrom("mainmenu"); setScreen("settings"); }}
          onCredits={() => setScreen("credits")}
          onHowTo={() => setScreen("howto")}
          onPuzzleTest={IS_RELEASE ? null : () => setMode("puzzletest")}
        />
        {screen === "settings" && (
          <SettingsOverlay speedIdx={speedIdx} glitchFx={glitchFx} soundOn={soundOn}
            lang={lang} onLang={applyLang}
            onSpeed={applySpeed} onGlitch={applyGlitchFx} onSound={applySound}
            hapticsOn={hapticsOn} onHaptics={applyHaptics}
            onBack={() => setScreen(null)} />
        )}
        {screen === "credits" && <Credits onClose={() => setScreen(null)} />}
        {screen === "howto" && <HowToPlay onClose={() => setScreen(null)} />}
      </>
    );
  }

  /* ================= BULMACA TESTİ (geçici) ================= */
  if (mode === "puzzletest") {
    return (
      <Suspense fallback={<LoadingScreen onDone={() => {}} />}>
        <PuzzleTest onBack={() => setMode("menu")} onDemo={() => startFresh(DEMO_START)} />
      </Suspense>
    );
  }

  /* ================= AÇILIŞ: YAPIMCI LOGOSU ================= */
  if (mode === "boot") {
    return <StudioIntro onDone={() => setMode("disclaimer")} />;
  }

  /* ================= AÇILIŞ: KURGU UYARISI ================= */
  if (mode === "disclaimer") {
    return <DisclaimerScreen onDone={() => setMode("bootload")} />;
  }

  /* ================= AÇILIŞ: YÜKLEME → MENÜ ================= */
  if (mode === "bootload") {
    return <LoadingScreen onDone={() => setMode("menu")} />;
  }

  /* ================= DEVAM: YÜKLEME → OYUN ================= */
  if (mode === "resumeload") {
    return <LoadingScreen onDone={() => resumeGame()} />;
  }

  /* ================= UYARI EKRANI ================= */
  if (mode === "warning") {
    return <WarningScreen onContinue={() => setMode("loading")} />;
  }

  /* ================= YÜKLEME ================= */
  if (mode === "loading") {
    return <LoadingScreen onDone={() => setMode("intro")} />;
  }

  /* ================= AÇILIŞ SİNEMATİĞİ ================= */
  if (mode === "intro") {
    return <IntroCinematic onFinish={() => startFresh()} />;
  }

  /* ================= OYUN ================= */
  return (
    <div style={S.root} onContextMenu={(e) => e.preventDefault()}>
      <div
        style={{
          ...S.gameLayer,
          ...(dark ? {
            filter: `grayscale(${Math.round(darkP * 90)}%) brightness(${(1 - darkP * 0.22).toFixed(2)})`,
            transitionProperty: "filter", transitionDuration: "500ms",
          } : {}),
        }}
        className={glitching ? "s1-glitch" : flickering ? "s1-flicker" : ""}>
        <GameHeader
          battery={battery} bColor={bColor} spares={spares} sparesMax={SPARES_MAX}
          onGear={() => setScreen("pause")}
          onBattery={swapBattery}
          onArchive={() => { setScreen("menu"); setOpenItem(null); }}
        />
        <StoryStream
          scrollRef={scrollRef} lines={lines} typing={typing}
          wordsObscured={wordsObscured} choicesObscured={choicesObscured}
          timeLeft={timeLeft} choicesVisible={choicesVisible} choices={visibleChoices}
          flags={flags} onChoice={handleChoice}
          ended={ended} tapWait={tapWait}
          onSkipTap={handleSkipTap}
          onEndContinue={() => { setEndFade(true); setTimeout(() => { setEndFade(false); setShowCredits(true); }, 1400); }}
        />
      </div>

      <Hud dimOpacity={dimOpacity} objectiveFlash={objectiveFlash} toast={toast} />

      {pendingBattery && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 53,
          background: "rgba(4,7,9,0.82)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }} className="s1-fadein">
          <div style={{
            maxWidth: 360, width: "100%",
            background: "rgba(12,18,16,0.96)", border: "1px solid #2f4a42",
            borderRadius: 8, padding: "22px 20px", textAlign: "center",
          }} className="s1-panel">
            <div style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              fontSize: 30, marginBottom: 10,
            }}>🔋</div>
            <div style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              fontSize: 14, fontWeight: 700, letterSpacing: "0.1em",
              color: "#dfe6df", marginBottom: 6,
            }}>
              {t("eng.batteryFound", { n: pendingBattery.n })}
            </div>
            <div style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              fontSize: 12, color: spares >= SPARES_MAX ? "#c2884a" : "#7a9a86",
              marginBottom: 18,
            }}>
              {spares >= SPARES_MAX
                ? t("eng.batteryPouchFull", { max: SPARES_MAX })
                : t("eng.batterySlots", { cur: spares, max: SPARES_MAX })}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="s1-btn" onClick={takeBattery}
                style={{
                  flex: 1, maxWidth: 150,
                  fontFamily: "'Courier New', ui-monospace, monospace",
                  fontSize: 13, letterSpacing: "0.1em",
                  color: spares >= SPARES_MAX ? "#8a8478" : "#cdf0d6",
                  background: spares >= SPARES_MAX ? "rgba(30,30,26,0.7)" : "rgba(20,40,28,0.85)",
                  border: "1px solid " + (spares >= SPARES_MAX ? "#4a4a42" : "#4a7a5a"),
                  padding: "11px 14px", cursor: "pointer", borderRadius: 5,
                }}>
                {t("eng.batteryTake")}
              </button>
              <button className="s1-btn" onClick={skipBattery}
                style={{
                  flex: 1, maxWidth: 150,
                  fontFamily: "'Courier New', ui-monospace, monospace",
                  fontSize: 13, letterSpacing: "0.1em", color: "#9db0a6",
                  background: "rgba(20,26,24,0.7)", border: "1px solid #3a4a42",
                  padding: "11px 14px", cursor: "pointer", borderRadius: 5,
                }}>
                {t("eng.batteryLeave")}
              </button>
            </div>
          </div>
        </div>
      )}

      {endFade && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 54, background: "#000",
          animation: "s1-fade 1.4s ease-in forwards",
        }} />
      )}

      {showCredits && (
        <Credits onClose={() => {
          setShowCredits(false); clearGame(); setGameExists(false); setEnded(false); setMode("menu");
        }} />
      )}

      {/* Etkileşimler */}
      {interaction?.kind === "panel" && (
        <PanelOverlay interaction={interaction} flags={flags} msg={panelMsg}
          onPress={panelPress} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "keypad" && (
        <KeypadOverlay entry={kpEntry} msg={kpMsg} onKey={kpKey} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "radio" && (
        <RadioOverlay freq={radioFreq} target={interaction.target} phase={radioPhase} signal={radioSignal}
          lock={radioLock} hint={radioHint} glitchFx={glitchFx} onAdjust={radioAdjust} />
      )}
      {interaction?.kind === "lights" && (
        <LightsOverlay lights={lights} done={lightsDone}
          onPress={lightsPress} onReset={lightsReset} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "valve" && (
        <ValveOverlay title={interaction.title} deg={valveDeg} done={mechDone} busy={valveBusy}
          onTurn={valveTurn} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "lever" && (
        <LeverOverlay title={interaction.title} prog={leverProg} done={mechDone} onDown={leverDown} onUp={leverUp} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "fuse" && (
        <FuseOverlay title={interaction.title} marker={fuseMarker} hits={fuseHits} needed={interaction.hits || 2}
          msg={fuseMsg} done={mechDone} onTap={fuseTap} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "shadow" && (
        <ShadowOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "wires" && (
        <WiresOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "mix" && (
        <MixOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "symbols" && (
        <SymbolsOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "rings" && (
        <RingsOverlay key={currentNodeId} config={interaction} flags={flags}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "tiles" && (
        <TilesOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "colorgrid" && (
        <ColorGridOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={puzzleFail} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "breath" && breath && (
        <BreathOverlay
          interaction={interaction}
          onSuccess={finishBreath}
          onFail={finishBreath}
        />
      )}
      {interaction?.kind === "chase" && (
        <ChaseOverlay key={currentNodeId} config={interaction}
          onSuccess={puzzleWin} onFail={chaseFail} />
      )}

      {/* Arşiv */}
      {screen === "menu" && (
        <ArchiveMenu objective={objective}
          onNotes={() => setScreen("notes")} onDocs={() => setScreen("docs")}
          onClose={() => setScreen(null)} />
      )}
      {(screen === "notes" || screen === "docs") && !openItem && (
        <ArchiveList kind={screen} items={screen === "notes" ? notes : docs}
          onOpen={openArchiveItem} onBack={() => setScreen("menu")} />
      )}
      {openItem?.kind === "note" && (
        <NotePaper item={openItem.item} onBack={() => setOpenItem(null)} />
      )}
      {openItem?.kind === "doc" && (
        <DocPaper item={openItem.item} page={docPage} pages={docPages}
          onPrev={() => { AudioSys.page(); setDocPage(docPage - 1); }}
          onNext={() => { AudioSys.page(); setDocPage(docPage + 1); }}
          onClose={() => {
            setOpenItem(null);
            if (docCloseRef.current) { docCloseRef.current(); docCloseRef.current = null; }
          }} />
      )}

      {/* Çark menüsü ve ayarlar */}
      {screen === "pause" && (
        <PauseMenu
          onResume={() => setScreen(null)}
          onRespawn={respawn}
          onSettings={() => { setSettingsFrom("pause"); setScreen("settings"); }}
          onMainMenu={() => { setScreen(null); setMode("menu"); }}
          onClose={() => setScreen(null)} />
      )}
      {screen === "settings" && (
        <SettingsOverlay speedIdx={speedIdx} glitchFx={glitchFx} soundOn={soundOn}
          lang={lang} onLang={applyLang}
          onSpeed={applySpeed} onGlitch={applyGlitchFx} onSound={applySound}
            hapticsOn={hapticsOn} onHaptics={applyHaptics}
          onBack={() => setScreen(settingsFrom === "pause" ? "pause" : null)} />
      )}

      {/* Karanlık modu — pil %0 */}
      {dark && !screen && <DarknessOverlay p={darkP} />}

      {/* Ölüm */}
      {dying && <div style={S.dyingVignette} className="s1-dying" />}
      {death && <DeathOverlay death={death} onRespawn={respawn} />}

      {/* Fiziksel Kırık Ekran Camı Efekti (Outlast Miles kamerası tarzı) */}
      {mode === "game" && !screen && !openItem && flags.tabletKirik && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10000,
          }}
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Ana çarpışma noktası sağ altta (940, 560) */}
          {/* 1. Ana hat — sola yukarı uzanan en belirgin çatlak */}
          <path
            d="M 940,560 L 870,520 L 780,460 L 670,400 L 520,340 L 340,290 L 140,260"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* 2. Ana hat — yukarı çıkan */}
          <path
            d="M 940,560 L 920,470 L 890,380 L 840,270 L 780,160 L 720,60"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.1"
            fill="none"
          />
          {/* 3. Ana hat — sol alt köşeye doğru */}
          <path
            d="M 940,560 L 850,570 L 720,585 L 540,592 L 300,596"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.0"
            fill="none"
          />
          {/* 4. Ana hat — sağ üste doğru kısa */}
          <path
            d="M 940,560 L 960,480 L 975,390 L 990,280"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.0"
            fill="none"
          />
          {/* 5. Kısa çapraz hat */}
          <path
            d="M 940,560 L 895,545 L 830,530"
            stroke="rgba(255,255,255,0.38)"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Dallanmalar — ana hatlardan ayrılan ince kollar */}
          <path d="M 780,460 L 750,500 L 730,520" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" fill="none" />
          <path d="M 670,400 L 700,360 L 720,330" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="none" />
          <path d="M 520,340 L 530,380 L 510,410" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" fill="none" />
          <path d="M 890,380 L 840,370 L 800,380" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="none" />
          <path d="M 840,270 L 880,250 L 910,220" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" fill="none" />
          <path d="M 850,570 L 860,590 L 870,598" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
          <path d="M 960,480 L 980,470 L 998,450" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />

          {/* Örümcek ağı halkaları — darbe merkezinin etrafında eğri çizgiler */}
          <path
            d="M 920,540 Q 950,530 960,550"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 900,525 Q 955,505 975,545"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.7"
            fill="none"
          />
          <path
            d="M 880,510 Q 960,475 988,540"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.6"
            fill="none"
          />

          {/* Darbe merkezi — küçük kırık cam parçaları */}
          <polygon
            points="940,560 950,548 935,543 928,555"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.8"
          />
          <polygon
            points="940,560 955,555 950,570 938,568"
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="0.7"
          />
          <polygon
            points="940,560 930,568 920,578 932,580"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />
          {/* Darbe noktasında hafif parlama */}
          <circle cx="940" cy="560" r="3" fill="rgba(255,255,255,0.18)" />
          <circle cx="940" cy="560" r="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </svg>
      )}
    </div>
  );
}
