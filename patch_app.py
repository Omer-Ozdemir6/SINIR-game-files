import os

file_path = 'src/App.jsx'

if not os.path.exists(file_path):
    print(f"Hata: {file_path} bulunamadı! Doğru dizinde olduğunuzdan emin olun.")
    exit()

s = open(file_path, encoding='utf-8').read()
ch = []

# ---- 1) importlar ----
old = """import {
  STAT_MAX, BATTERY_START, SPARES_START, INITIAL_STATS,
  LIGHTS_INIT, SPEED_OPTIONS, BLACKOUT_MS, BLACKOUT_HOLD_MS,
} from "./engine/constants";"""
new = """import {
  STAT_MAX, BATTERY_START, SPARES_START, INITIAL_STATS,
  LIGHTS_INIT, SPEED_OPTIONS, DARK_MS,
} from "./engine/constants";"""
if old in s: s = s.replace(old, new, 1); ch.append("imports")

old = 'import BlackoutOverlay from "./components/interactions/BlackoutOverlay";'
new = 'import DarknessOverlay from "./components/DarknessOverlay";'
if old in s: s = s.replace(old, new, 1); ch.append("import-dark")

# ---- 2) state/ref değişimi ----
old = """  // blackout (güç kaybı)
  const [blackout, setBlackout] = useState(null); // {hasSpare}
  const [boCount, setBoCount] = useState(BLACKOUT_MS);
  const [boHold, setBoHold] = useState(0);"""
new = """  // karanlık modu (pil %0 — oyun sürer)
  const [dark, setDark] = useState(null); // {left}"""
if old in s: s = s.replace(old, new, 1); ch.append("state")

old = """  const blackoutResolveRef = useRef(null);
  const blackoutIntRef = useRef(null);
  const boHoldingRef = useRef(false);"""
new = """  const darkIntRef = useRef(null);
  const darkRef = useRef(false);"""
if old in s: s = s.replace(old, new, 1); ch.append("refs")

old = "    [blackoutIntRef, leverIntRef, fuseIntRef, breathIntRef].forEach((r) => {"
new = "    [darkIntRef, leverIntRef, fuseIntRef, breathIntRef].forEach((r) => {"
if old in s: s = s.replace(old, new, 1); ch.append("clearIntervals")

# ---- 3) startBlackout -> startDarkness/stopDarkness ----
if "  const startBlackout = (hasSpare) =>" in s and "  /* ---------------- olay oynatıcı ---------------- */" in s:
    a0 = s.index("  const startBlackout = (hasSpare) =>")
    a1 = s.index("  /* ---------------- olay oynatıcı ---------------- */")
    new_block = """  /* ---------------- KARANLIK MODU (pil %0) ----------------
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

"""
    s = s[:a0] + new_block + s[a1:]
    ch.append("darkness-fns")

# ---- 4) playNode cost dalı ----
old = """    if (node.cost) {
      const left = batteryRef.current - node.cost;
      if (left <= 0) {
        setBatteryBoth(0);
        await startBlackout(sparesRef.current > 0);
        if (runIdRef.current !== runId) return;
        AudioSys.heart(null);
      } else {
        setBatteryBoth(left);
        if (left <= 20) {
          await typeLine("alert", "⚠ BATARYA KRİTİK: %" + left + " — PİL BUL", runId, 14);
        }
      }
    }"""
new = """    if (node.cost) {
      const left = Math.max(0, batteryRef.current - node.cost);
      setBatteryBoth(left);
      if (left === 0) {
        startDarkness(); // oyun durmaz — karanlıkta oynamaya devam
      } else if (left <= 20) {
        await typeLine("alert", "⚠ BATARYA KRİTİK: %" + left + " — PİL BUL", runId, 14);
      }
    }"""
if old in s: s = s.replace(old, new, 1); ch.append("cost")

# ---- 5) playEvent ----
old = """      case "battery": {
        if (ev.spares) {
          setSparesBoth(sparesRef.current + ev.spares);
          AudioSys.pickup();
          showToast("▲", "Yedek Pil +" + ev.spares, "#7fae86");
        }
        if (ev.delta) setBatteryBoth(Math.max(0, Math.min(100, batteryRef.current + ev.delta)));
        return wait(600, runId);
      }"""
new = """      case "battery": {
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
      case "anons": return typeLine("anons", ev.text, runId, 20);"""
if old in s: s = s.replace(old, new, 1); ch.append("battery+anons")

old = '      case "objective": { showObjective(ev.text); return wait(1800, runId); }'
new = '      case "objective": { AudioSys.objectiveSfx(); showObjective(ev.text); return wait(1800, runId); }'
if old in s: s = s.replace(old, new, 1); ch.append("objective-sfx")

# ---- 6) swapBattery ----
old = "    if (sparesRef.current <= 0 || batteryRef.current >= 100 || death || dying || blackout) return;"
new = "    if (sparesRef.current <= 0 || batteryRef.current >= 100 || death || dying) return;"
if old in s: s = s.replace(old, new, 1); ch.append("swap")

# ---- 7) sesler ----
old = """  const valveTurn = () => {
    if (mechDone || !interaction) return;
    AudioSys.clank();"""
new = """  const valveTurn = () => {
    if (mechDone || !interaction) return;
    AudioSys.valveSfx();"""
if old in s: s = s.replace(old, new, 1); ch.append("valve-sfx")

old = """    if (inZone) {
      AudioSys.blipSfx(880);
      const next = fuseHits + 1;"""
new = """    if (inZone) {
      AudioSys.fuseSfx();
      const next = fuseHits + 1;"""
if old in s: s = s.replace(old, new, 1); ch.append("fuse-sfx")

open(file_path, 'w', encoding='utf-8').write(s)
print("PART1 Uygulandı:", ch)