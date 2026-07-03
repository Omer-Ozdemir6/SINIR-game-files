import { useState, useEffect, useRef, useCallback } from "react";

import { AudioSys } from "./audio/AudioSys";
import { STORY, INITIAL_FLAGS } from "./story";
import {
  STAT_MAX, BATTERY_START, SPARES_START, INITIAL_STATS,
  LIGHTS_INIT, SPEED_OPTIONS, DARK_MS,
} from "./engine/constants";
import { batteryColorOf, paginateDoc } from "./engine/textFx";
import { saveGame, loadGame, clearGame } from "./save/storage";
import { styles as S } from "./styles/theme";

import MainMenu from "./components/MainMenu";
import WarningScreen from "./components/WarningScreen";
import GameHeader from "./components/GameHeader";
import StoryStream from "./components/StoryStream";
import Hud from "./components/Hud";
import { PauseMenu, SettingsOverlay, CreditsOverlay, DeathOverlay } from "./components/MenuOverlays";
import { ArchiveMenu, ArchiveList, NotePaper, DocPaper } from "./components/ArchiveOverlays";
import PanelOverlay from "./components/interactions/PanelOverlay";
import KeypadOverlay from "./components/interactions/KeypadOverlay";
import RadioOverlay from "./components/interactions/RadioOverlay";
import LightsOverlay from "./components/interactions/LightsOverlay";
import { ValveOverlay, LeverOverlay, FuseOverlay } from "./components/interactions/MechOverlays";
import BreathOverlay from "./components/interactions/BreathOverlay";
import DarknessOverlay from "./components/DarknessOverlay";

/* ============================================================
   SINIR-1 — OYUN MOTORU (App)
   Hikaye verisi: src/story/ · Ses: src/audio/ · Görsel: components/
   Bu dosya durum yönetimi + node oynatıcı + etkileşim mantığıdır.
   ============================================================ */

export default function App() {
  const [mode, setMode] = useState("menu"); // menu | warning | game
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
  const [timeLeft, setTimeLeft] = useState(null);
  const [typing, setTyping] = useState(false);
  const [screen, setScreen] = useState(null);
  const [settingsFrom, setSettingsFrom] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [docPage, setDocPage] = useState(0);
  const [interaction, setInteraction] = useState(null);
  // ayarlar
  const [speedIdx, setSpeedIdx] = useState(1);
  const [glitchFx, setGlitchFx] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  // keypad
  const [kpEntry, setKpEntry] = useState("");
  const [kpMsg, setKpMsg] = useState(null);
  const [kpFails, setKpFails] = useState(0);
  // radio
  const [radioFreq, setRadioFreq] = useState(425.0);
  const [radioPhase, setRadioPhase] = useState("tune");
  // lights
  const [lights, setLights] = useState([...LIGHTS_INIT]);
  const [lightsDone, setLightsDone] = useState(false);
  // valve / lever / fuse
  const [valveDeg, setValveDeg] = useState(0);
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

  const runIdRef = useRef(0);
  const skipRef = useRef(false);
  const statsRef = useRef({ ...INITIAL_STATS });
  const batteryRef = useRef(BATTERY_START);
  const sparesRef = useRef(SPARES_START);
  const flagsRef = useRef({ ...INITIAL_FLAGS });
  const docsRef = useRef([]);
  const notesRef = useRef([]);
  const objectiveRef = useRef("—");
  const checkpointRef = useRef(null);
  const timerRef = useRef(null);
  const flashRef = useRef(null);
  const toastRef = useRef(null);
  const timeoutsRef = useRef([]);
  const scrollRef = useRef(null);
  const clockRef = useRef(227);
  const speedMultRef = useRef(1);
  const glitchFxRef = useRef(true);
  const darkIntRef = useRef(null);
  const darkRef = useRef(false);
  const leverIntRef = useRef(null);
  const leverHoldingRef = useRef(false);
  const fuseIntRef = useRef(null);
  const breathIntRef = useRef(null);
  const breathHoldingRef = useRef(false);

  /* ---------------- yardımcılar ---------------- */

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimeLeft(null);
  };
  const clearIntervals = () => {
    [darkIntRef, leverIntRef, fuseIntRef, breathIntRef].forEach((r) => {
      if (r.current) { clearInterval(r.current); r.current = null; }
    });
  };
  const clearPending = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (flashRef.current) { clearTimeout(flashRef.current); flashRef.current = null; }
    if (toastRef.current) { clearTimeout(toastRef.current); toastRef.current = null; }
  };
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timeoutsRef.current.push(t); };

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

  const typeLine = (kind, text, runId, speed = 26) =>
    new Promise((resolve) => {
      setLines((ls) => [...ls, { kind, text: "" }]);
      setTyping(true);
      let i = 0;
      const tick = () => {
        if (runIdRef.current !== runId) { setTyping(false); return resolve(); }
        if (skipRef.current) { i = text.length; skipRef.current = false; }
        else i++;
        const slice = text.slice(0, i);
        setLines((ls) => {
          const copy = ls.slice();
          copy[copy.length - 1] = { ...copy[copy.length - 1], text: slice };
          return copy;
        });
        if (i >= text.length) { setTyping(false); resolve(); }
        else later(tick, Math.max(6, Math.round(speed * speedMultRef.current)));
      };
      tick();
    });

  const setBatteryBoth = (v) => { batteryRef.current = v; setBattery(v); };
  const setSparesBoth = (v) => { sparesRef.current = v; setSpares(v); };
  const setFlagsBoth = (updates) => {
    flagsRef.current = { ...flagsRef.current, ...updates };
    setFlags(flagsRef.current);
  };
  const flagOk = (cond) => {
    if (!cond) return true;
    const want = cond.equals !== undefined ? cond.equals : true;
    return !!flagsRef.current[cond.flag] === want;
  };
  const statOk = (cond) => {
    if (!cond) return true;
    const v = statsRef.current[cond.stat] || 0;
    if (cond.gte !== undefined && v < cond.gte) return false;
    if (cond.lte !== undefined && v > cond.lte) return false;
    return true;
  };

  const showObjective = (text) => {
    objectiveRef.current = text;
    setObjective(text);
    setObjectiveFlash({ text, key: Date.now() });
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setObjectiveFlash(null), 4200);
  };

  const showToast = (icon, text, color) => {
    setToast({ icon, text, color, key: Date.now() });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3200);
  };

  const glitchBurst = (ms) => {
    AudioSys.burst(ms);
    if (!glitchFxRef.current) return;
    setGlitching(true);
    later(() => setGlitching(false), ms);
  };

  const runGlitch = async (ms) => {
    AudioSys.burst(Math.min(ms, 400));
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

  const stopDarkness = (silent) => {
    if (darkIntRef.current) { clearInterval(darkIntRef.current); darkIntRef.current = null; }
    darkRef.current = false;
    setDark(null);
    if (!silent) AudioSys.heart(null);
  };

  const startDarkness = () => {
    if (darkRef.current) return;
    darkRef.current = true;
    setDark({ left: DARK_MS });
    AudioSys.heart(430);
    showToast("▼", "GÜÇ BİTTİ — PİL BUL", "#c23b2e");
    let left = DARK_MS;
    darkIntRef.current = setInterval(() => {
      if (batteryRef.current > 0) { stopDarkness(); return; }
      left -= 100;
      setDark({ left });
      if (left <= 0) {
        stopDarkness(true);
        die({
          text: "Ekran son kez sönüyor. Parmakların boş yuvayı yokluyor, yokluyor, yokluyor. Bu derinlikte ışıksız kalmak, çoktan ölmüş olmaktır.",
          battery: true,
        });
      }
    }, 100);
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
          await typeLine("system", item.label + ": " + (on ? "AKTİF ▮" : "DEVRE DIŞI ▯"), runId, 8);
          if (runIdRef.current !== runId) return;
        }
        return;
      }
      case "objective": { AudioSys.objectiveSfx(); showObjective(ev.text); return wait(1800, runId); }
      case "stat": {
        const next = { ...statsRef.current };
        next[ev.stat] = Math.max(0, Math.min(STAT_MAX[ev.stat] || 100, (next[ev.stat] || 0) + ev.delta));
        statsRef.current = next;
        setStats(next);
        if (ev.note) return typeLine(ev.noteKind || "alert", "⚠ " + ev.note, runId, 14);
        return;
      }
      case "battery": {
        if (ev.spares) {
          if (darkRef.current) {
            // karanlıkta bulunan pil beklemez — titreyen ellerle yuvaya çakılır
            setBatteryBoth(100);
            AudioSys.pickup();
            showToast("⚡", "PİL TAKILDI · %100", "#7fae86");
            await typeLine("system", "Pili karanlıkta yuvasına çakıyorsun. Ekran nefes alır gibi geri geliyor.", runId, 12);
          } else {
            setSparesBoth(sparesRef.current + ev.spares);
            AudioSys.pickup();
            showToast("▲", "Yedek Pil +" + ev.spares, "#7fae86");
          }
        }
        if (ev.delta) setBatteryBoth(Math.max(0, Math.min(100, batteryRef.current + ev.delta)));
        return wait(600, runId);
      }
      case "anons": return typeLine("anons", ev.text, runId, 20);
      case "document": {
        if (!docsRef.current.find((d) => d.id === ev.doc.id)) {
          docsRef.current = [...docsRef.current, { ...ev.doc, read: false }];
          setDocs(docsRef.current);
        }
        AudioSys.page();
        showToast("▤", "Döküman Eklendi", "#d0b06a");
        return wait(600, runId);
      }
      case "note": {
        clockRef.current += 3 + Math.floor(Math.random() * 4);
        if (!notesRef.current.find((n) => n.id === ev.id)) {
          notesRef.current = [...notesRef.current, { id: ev.id, title: ev.title, text: ev.text, time: fmtClock(), read: false }];
          setNotes(notesRef.current);
        }
        AudioSys.scratch();
        showToast("✎", "Not Alındı", "#cbb794");
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
    setDying(true);
    later(() => setDeath(payload), 2000);
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

    setCurrentNodeId(nodeId);
    setChoicesVisible(false);
    setInteraction(null);
    clearTimer();

    if (node.cost) {
      const left = Math.max(0, batteryRef.current - node.cost);
      setBatteryBoth(left);
      if (left === 0) {
        startDarkness(); // oyun durmaz — karanlıkta oynamaya devam
      } else if (left <= 20) {
        await typeLine("alert", "⚠ BATARYA KRİTİK: %" + left + " — PİL BUL", runId, 14);
      }
    }

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
        clock: clockRef.current,
      };
      saveGame(checkpointRef.current); // kalıcı kayıt
    }

    for (const ev of node.events) {
      if (runIdRef.current !== runId) return;
      await playEvent(ev, runId);
    }
    if (runIdRef.current !== runId) return;
    if (node.death) { die({ text: node.deathText }); return; }
    if (node.ending) { setEnded(true); return; }
    if (node.interaction) {
      const k = node.interaction.kind;
      if (k === "keypad") { setKpEntry(""); setKpMsg(null); setKpFails(0); }
      if (k === "panel") { setPanelMsg(null); }
      if (k === "radio") { setRadioFreq(425.0); setRadioPhase("tune"); }
      if (k === "lights") { setLights([...LIGHTS_INIT]); setLightsDone(false); }
      if (k === "valve") { setValveDeg(0); setMechDone(false); }
      if (k === "lever") { setLeverProg(0); setMechDone(false); leverHoldingRef.current = false; }
      if (k === "fuse") { setFuseHits(0); setFuseMsg(null); setMechDone(false); }
      if (k === "breath") { breathHoldingRef.current = false; setBreath({ t: 0, lung: 0, holding: false, phase: "wait" }); }
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

  const handleSkipTap = () => { if (!screen && !interaction) skipRef.current = true; };

  const swapBattery = () => {
    if (sparesRef.current <= 0 || batteryRef.current >= 100 || death || dying) return;
    setSparesBoth(sparesRef.current - 1);
    setBatteryBoth(100);
    AudioSys.pickup();
    showToast("⚡", "Pil Değiştirildi · %100", "#7fae86");
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

  /* ---------------- ANA PANEL (kırmızı buton) ---------------- */

  const panelPress = () => {
    if (!interaction || interaction.kind !== "panel") return;
    const allOk = interaction.require.every((f) => flagsRef.current[f]);
    if (allOk) {
      AudioSys.clank();
      AudioSys.blipSfx(980);
      setPanelMsg({ text: "SİSTEM BAŞLATILIYOR…", ok: true });
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 1200);
    } else {
      AudioSys.buzzSfx();
      glitchBurst(160);
      const eksik = interaction.require.filter((f) => !flagsRef.current[f]).length;
      setPanelMsg({ text: "HATA — POMPA HATTI EKSİK (" + eksik + ")", ok: false });
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
      setKpMsg({ text: "KOD KABUL EDİLDİ", ok: true });
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
        setKpMsg({ text: "HATALI KOD — PANEL BİPLİYOR. GÜRÜLTÜ ARTTI.", ok: false });
      } else {
        setKpMsg({ text: "HATALI KOD", ok: false });
      }
    }
  };
  const kpKey = (k) => { if (k === "SİL") kpClear(); else if (k === "GİR") kpSubmit(); else kpPress(k); };

  const interactionCancel = () => {
    if (!interaction) return;
    const target = interaction.cancel;
    setInteraction(null);
    setLines((ls) => [...ls, { kind: "choice", text: "» Uzaklaş" }]);
    playNode(target);
  };

  /* ---------------- RADYO ---------------- */

  const radioAdjust = (delta) => {
    if (radioPhase !== "tune" || !interaction) return;
    AudioSys.blipSfx(340);
    const f = Math.round(Math.max(410, Math.min(450, radioFreq + delta)) * 10) / 10;
    setRadioFreq(f);
    // gizli yayınlar — dinlemek iz bırakır
    if (Math.abs(f - 437.4) <= 0.05 && !flagsRef.current.frekansCocuk) {
      setFlagsBoth({ frekansCocuk: true, frekanslariDuydun: !!flagsRef.current.frekansNefes });
      statsRef.current = { ...statsRef.current, akil: Math.max(0, (statsRef.current.akil || 100) - 5) };
      setStats({ ...statsRef.current });
    }
    if (Math.abs(f - 421.8) <= 0.05 && !flagsRef.current.frekansNefes) {
      setFlagsBoth({ frekansNefes: true, frekanslariDuydun: !!flagsRef.current.frekansCocuk });
      statsRef.current = { ...statsRef.current, akil: Math.max(0, (statsRef.current.akil || 100) - 5) };
      setStats({ ...statsRef.current });
    }
    if (Math.abs(f - interaction.target) <= 0.05) {
      setRadioPhase("lock");
      const target = interaction.success;
      later(() => {
        setRadioPhase("cut");
        glitchBurst(900);
        later(() => {
          setInteraction(null);
          playNode(target);
        }, 1600);
      }, 2200);
    }
  };
  const radioSignal = Math.max(0, Math.round(100 - Math.abs(radioFreq - (interaction?.target || 432)) * 14));
  const radioHint = (() => {
    if (!interaction || interaction.kind !== "radio") return "";
    const f = radioFreq;
    if (radioPhase === "lock") return "«Yüzey mi? …Yüzey üç haftadır cevap vermiyor. Kimsin sen?»";
    if (radioPhase === "cut") return "— HAT KOPTU —";
    if (Math.abs(f - 437.4) < 0.4) return "…karanlıkta bir çocuk sayı sayıyor… yedi… altı…";
    if (Math.abs(f - 421.8) < 0.4) return "…ıslak, ritmik bir nefes. Dinliyor.";
    if (Math.abs(f - interaction.target) < 0.8) return "…bir insan sesi! Genç bir kadın: «—yor musun? Cevap ver—»";
    if (Math.abs(f - interaction.target) < 2.5) return "…statiğin içinde kelime kırıntıları…";
    return "…statik…";
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
    if (mechDone || !interaction) return;
    AudioSys.valveSfx();
    const step = 360 / interaction.turns;
    const next = valveDeg + step;
    setValveDeg(next);
    if (next >= 360) {
      setMechDone(true);
      const target = interaction.success;
      later(() => { setInteraction(null); playNode(target); }, 800);
    }
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
    fuseIntRef.current = setInterval(() => {
      pos += dir * 2.4;
      if (pos >= 100) { pos = 100; dir = -1; }
      if (pos <= 0) { pos = 0; dir = 1; }
      setFuseMarker(pos);
    }, 20);
    return () => { if (fuseIntRef.current) { clearInterval(fuseIntRef.current); fuseIntRef.current = null; } };
  }, [interaction]);

  const fuseTap = () => {
    if (mechDone || !interaction) return;
    const inZone = fuseMarker >= 40 && fuseMarker <= 60;
    if (inZone) {
      AudioSys.fuseSfx();
      const next = fuseHits + 1;
      setFuseHits(next);
      setFuseMsg({ text: "OTURDU (" + next + "/" + interaction.hits + ")", ok: true });
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
      setFuseMsg({ text: "KIVILCIM! — GÜRÜLTÜ +4", ok: false });
    }
  };

  /* ---------------- NEFES TUTMA ---------------- */

  useEffect(() => {
    if (interaction?.kind !== "breath") {
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      return;
    }
    const holdMs = interaction.holdMs || 7000;
    const lungMs = interaction.lungMs || 9500;
    const failTo = interaction.fail;
    AudioSys.heart(520);
    let t = 0, lung = 0, resolved = false;
    const finish = (target) => {
      if (resolved) return;
      resolved = true;
      clearInterval(breathIntRef.current);
      breathIntRef.current = null;
      AudioSys.heart(null);
      setInteraction(null);
      setBreath(null);
      playNode(target);
    };
    let heartStage = 0;
    breathIntRef.current = setInterval(() => {
      t += 60;
      const holding = breathHoldingRef.current;
      // ADRENALİN DALGALARI: iki pencerede ciğer 2 kat hızlı dolar
      const spike = (t > 2600 && t < 3900) || (t > 5100 && t < 6300);
      if (holding) lung += spike ? 120 : 60;
      const phase = t >= holdMs ? "release" : holding ? "hold" : "wait";
      setBreath({ t, lung, holding, phase, spike });
      // ciğer doldukça kalp hızlanır
      const stage = lung / lungMs > 0.62 ? 2 : lung / lungMs > 0.3 ? 1 : 0;
      if (stage !== heartStage) {
        heartStage = stage;
        AudioSys.heart(stage === 2 ? 360 : stage === 1 ? 440 : 520);
      }
      // hiç basmadan 2 sn geçti → nefesin duyuldu
      if (!holding && t < holdMs && t > 2000 && lung === 0) return finish(failTo);
      // ciğer patladı
      if (lung >= lungMs) return finish(failTo);
    }, 60);
    return () => {
      if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
      AudioSys.heart(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interaction]);

  const breathDown = () => { breathHoldingRef.current = true; };
  const breathUp = () => {
    breathHoldingRef.current = false;
    if (!breath || !interaction || interaction.kind !== "breath") return;
    const holdMs = interaction.holdMs || 7000;
    if (breath.lung === 0) return; // hiç basılmamıştı
    const target = breath.t >= holdMs ? interaction.success : interaction.fail;
    if (breathIntRef.current) { clearInterval(breathIntRef.current); breathIntRef.current = null; }
    AudioSys.heart(null);
    setInteraction(null);
    setBreath(null);
    playNode(target);
  };

  /* ---------------- akış kontrol: yeni oyun / devam / respawn ---------------- */

  const restoreFrom = (cp) => {
    statsRef.current = { ...cp.stats };
    setStats({ ...cp.stats });
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
    clockRef.current = cp.clock;
    setScreen(null);
    setLines([{ kind: "system", text: "SON KONTROL NOKTASINDAN DEVAM EDİLİYOR..." }]);
    playNode(cp.nodeId);
  };

  const respawn = () => {
    const cp = checkpointRef.current;
    setDeath(null);
    setDying(false);
    stopDarkness(true);
    clearIntervals();
    clearPending();
    AudioSys.heart(null);
    if (!cp) return startFresh();
    restoreFrom(cp);
  };

  const startFresh = () => {
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
    setBatteryBoth(BATTERY_START);
    setSparesBoth(SPARES_START);
    flagsRef.current = { ...INITIAL_FLAGS };
    setFlags({ ...INITIAL_FLAGS });
    docsRef.current = [];
    setDocs([]);
    notesRef.current = [];
    setNotes([]);
    objectiveRef.current = "—";
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
    playNode(STORY.start);
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
  const applySound = (on) => {
    setSoundOn(on);
    AudioSys.setEnabled(on);
  };

  /* ---------------- ses durumları ---------------- */

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
  }, [battery, mode, death, dark, interaction]);

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
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, choicesVisible, timeLeft]);

  useEffect(() => () => {
    clearPending(); clearTimer(); clearIntervals();
    AudioSys.heart(null); AudioSys.ambient(false); AudioSys.staticLevel(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- türetilen değerler ---------------- */

  const node = currentNodeId ? STORY.nodes[currentNodeId] : null;
  const gurultuPct = Math.round(((stats.gurultu || 0) / (STAT_MAX.gurultu || 100)) * 100);
  const akil = stats.akil !== undefined ? stats.akil : 100;
  const bColor = batteryColorOf(battery);

  const visibleChoices = (node?.choices || []).filter((c) => flagOk(c.if) && statOk(c.ifStat));

  const dimOpacity = battery > 40 ? 0 : battery > 15 ? 0.2 : battery > 5 ? 0.42 : 0.58;
  const wordsObscured = battery <= 15;
  const choicesObscured = battery <= 5;
  const flickering = battery > 0 && battery <= 12;

  const docPages = openItem?.kind === "doc" ? paginateDoc(openItem.item.body) : [];

  /* ================= ANA MENÜ ================= */
  if (mode === "menu") {
    return (
      <>
        <MainMenu
          gameExists={gameExists}
          confirmNew={confirmNew}
          onResume={resumeGame}
          onNewGame={() => {
            if (gameExists && !confirmNew) { setConfirmNew(true); return; }
            setConfirmNew(false);
            AudioSys.init();
            setMode("warning");
          }}
          onSettings={() => { setSettingsFrom("mainmenu"); setScreen("settings"); }}
          onCredits={() => setScreen("credits")}
        />
        {screen === "settings" && (
          <SettingsOverlay speedIdx={speedIdx} glitchFx={glitchFx} soundOn={soundOn}
            onSpeed={applySpeed} onGlitch={applyGlitchFx} onSound={applySound}
            onBack={() => setScreen(null)} />
        )}
        {screen === "credits" && <CreditsOverlay onClose={() => setScreen(null)} />}
      </>
    );
  }

  /* ================= UYARI EKRANI ================= */
  if (mode === "warning") {
    return <WarningScreen onContinue={startFresh} />;
  }

  /* ================= OYUN ================= */
  return (
    <div style={S.root} onPointerDown={handleSkipTap}>
      <div style={S.gameLayer} className={glitching ? "s1-glitch" : flickering ? "s1-flicker" : ""}>
        <GameHeader
          gurultuPct={gurultuPct} akil={akil} battery={battery} bColor={bColor} spares={spares}
          onGear={() => setScreen("pause")}
          onBattery={swapBattery}
          onArchive={() => { setScreen("menu"); setOpenItem(null); }}
        />
        <StoryStream
          scrollRef={scrollRef} lines={lines} typing={typing} akil={akil}
          wordsObscured={wordsObscured} choicesObscured={choicesObscured}
          timeLeft={timeLeft} choicesVisible={choicesVisible} choices={visibleChoices}
          flags={flags} onChoice={handleChoice}
          ended={ended}
          endInfo={{ docs: docs.length, notes: notes.length, battery, spares, akil }}
          onRestart={startFresh}
        />
      </div>

      <Hud dimOpacity={dimOpacity} objectiveFlash={objectiveFlash} toast={toast} />

      {/* Etkileşimler */}
      {interaction?.kind === "panel" && (
        <PanelOverlay interaction={interaction} flags={flags} msg={panelMsg}
          onPress={panelPress} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "keypad" && (
        <KeypadOverlay entry={kpEntry} msg={kpMsg} onKey={kpKey} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "radio" && (
        <RadioOverlay freq={radioFreq} phase={radioPhase} signal={radioSignal}
          hint={radioHint} glitchFx={glitchFx} onAdjust={radioAdjust} />
      )}
      {interaction?.kind === "lights" && (
        <LightsOverlay lights={lights} done={lightsDone}
          onPress={lightsPress} onReset={lightsReset} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "valve" && (
        <ValveOverlay deg={valveDeg} done={mechDone} onTurn={valveTurn} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "lever" && (
        <LeverOverlay prog={leverProg} done={mechDone} onDown={leverDown} onUp={leverUp} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "fuse" && (
        <FuseOverlay marker={fuseMarker} hits={fuseHits} needed={interaction.hits || 2}
          msg={fuseMsg} done={mechDone} onTap={fuseTap} onCancel={interactionCancel} />
      )}
      {interaction?.kind === "breath" && breath && (
        <BreathOverlay breath={breath}
          holdMs={interaction.holdMs || 7000} lungMs={interaction.lungMs || 9500}
          onDown={breathDown} onUp={breathUp} />
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
          onClose={() => setOpenItem(null)} />
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
          onSpeed={applySpeed} onGlitch={applyGlitchFx} onSound={applySound}
          onBack={() => setScreen(settingsFrom === "pause" ? "pause" : null)} />
      )}

      {/* Karanlık modu — pil %0 */}
      {dark && <DarknessOverlay left={dark.left} totalMs={DARK_MS} />}

      {/* Ölüm */}
      {dying && <div style={S.dyingVignette} className="s1-dying" />}
      {death && <DeathOverlay death={death} onRespawn={respawn} />}
    </div>
  );
}
