/* SINIR-1 — TEMA: fontlar ve tüm inline stiller.
   Not: React inline stillerinde animation daima longhand yazılır. */

const mono = "'Courier New', ui-monospace, 'SF Mono', Menlo, monospace";
const serif = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const hand = "'Bradley Hand', 'Segoe Script', 'Noteworthy', 'Comic Sans MS', cursive";

export { mono, serif, hand };

export const styles = {
  root: {
    position: "fixed", inset: 0, backgroundColor: "#04090b",
    color: "#aebfbc", fontFamily: serif, overflow: "hidden", userSelect: "none",
  },
  gameLayer: {
    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
    backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(20,42,46,0.35) 0%, rgba(4,9,11,0) 60%)",
  },

  menuRoot: {
    position: "fixed", inset: 0, overflow: "hidden", userSelect: "none",
    backgroundColor: "#050b07",
    backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(30,70,45,0.5) 0%, rgba(5,11,7,0) 55%), radial-gradient(ellipse at 75% 70%, rgba(18,45,30,0.45) 0%, rgba(5,11,7,0) 50%)",
  },
  menuVignette: {
    position: "absolute", inset: 0, pointerEvents: "none",
    boxShadow: "inset 0 0 22vmax 8vmax rgba(0,0,0,0.92)",
  },
  menuInner: {
    position: "relative", height: "100%", display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center", gap: 8,
  },
  menuTitle: { fontFamily: mono, fontSize: "clamp(28px, 10.5vw, 46px)", letterSpacing: "0.28em", whiteSpace: "nowrap", textAlign: "center", maxWidth: "100%", color: "#dceade", fontWeight: 700, textShadow: "0 0 20px rgba(90,180,120,0.3)" },
  menuSub: { fontFamily: mono, fontSize: 10, letterSpacing: "0.25em", color: "#4d6e58", marginBottom: 30 },
  mmButtons: { display: "flex", flexDirection: "column", gap: 20, alignItems: "center" },
  mmBtn: {
    fontFamily: mono, fontSize: 19, fontWeight: 700, letterSpacing: "0.22em",
    color: "#eef4ee", backgroundColor: "transparent", border: "1px solid transparent",
    borderRadius: 999, padding: "10px 30px", cursor: "pointer",
    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
  },

  warnRoot: {
    position: "fixed", inset: 0, backgroundColor: "#070a08",
    backgroundImage: "radial-gradient(ellipse at 60% 20%, rgba(28,42,34,0.5) 0%, rgba(7,10,8,0) 55%)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", padding: "0 30px", userSelect: "none", gap: 40,
  },
  warnBody: { maxWidth: 560, display: "flex", flexDirection: "column", gap: 26 },
  warnText: {
    fontFamily: mono, fontSize: 14.5, lineHeight: 1.85, color: "#c9d4c9",
    letterSpacing: "0.04em", margin: 0, textShadow: "0 1px 3px rgba(0,0,0,0.9)",
  },
  warnContinue: {
    fontFamily: mono, fontSize: 14, fontWeight: 700, letterSpacing: "0.2em",
    color: "#eef4ee", backgroundColor: "rgba(0,0,0,0.45)",
    border: "1px solid #4a5c4e", borderRadius: 999, padding: "10px 34px", cursor: "pointer",
  },

  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px", borderBottom: "1px solid #10201f",
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", flexShrink: 0, gap: 8,
  },
  headerLeft: { display: "flex", gap: 8, alignItems: "center" },
  gearBtn: {
    fontFamily: mono, fontSize: 17, color: "#8ba3a0", backgroundColor: "transparent",
    border: "1px solid #1b3234", borderRadius: 3, padding: "4px 10px", cursor: "pointer", lineHeight: 1.2,
  },
  stationTag: { color: "#d7e4e0", fontWeight: 700 },
  sectorTag: { color: "#4d6b6e" },
  headerRight: { display: "flex", gap: 10, alignItems: "center" },
  gaugeCol: { display: "flex", flexDirection: "column", gap: 4 },
  gauge: { display: "flex", gap: 5, alignItems: "center", justifyContent: "flex-end" },
  statLabel: { color: "#4d6b6e", fontSize: 8, fontFamily: mono, letterSpacing: "0.12em" },
  statTrack: { width: 44, height: 4, backgroundColor: "#0c1718", borderRadius: 2, overflow: "hidden" },
  statFill: { height: "100%", transitionProperty: "width", transitionDuration: "500ms" },

  batteryWrap: {
    display: "flex", alignItems: "center", gap: 3, backgroundColor: "transparent",
    border: "none", padding: "4px 2px", cursor: "pointer",
  },
  batteryShell: {
    width: 82, height: 22, border: "3px solid #d8d8d0", borderRadius: 2,
    padding: "3px 5px 3px 8px", backgroundColor: "rgba(4,5,5,0.86)",
    display: "flex", flexDirection: "row", alignItems: "stretch", gap: 1,
    boxSizing: "border-box",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(255,255,255,0.08)",
  },
  batterySeg: {
    flex: "0 0 calc((100% - 9px) / 10)", borderRadius: 0, minWidth: 0,
    transitionProperty: "background-color", transitionDuration: "400ms",
  },
  batteryCap: { width: 7, height: 12, backgroundColor: "#d8d8d0", borderRadius: "2px 0 0 2px" },
  spareText: { fontFamily: mono, fontSize: 11, marginRight: 4, letterSpacing: "0.05em" },

  archiveBtn: {
    fontFamily: mono, fontSize: 10, letterSpacing: "0.1em",
    padding: "8px 10px", backgroundColor: "transparent", color: "#8ba3a0",
    border: "1px solid #1b3234", borderRadius: 3, cursor: "pointer",
  },

  dimLayer: { position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none", transitionProperty: "background-color", transitionDuration: "800ms" },

  objectiveBand: {
    position: "fixed", top: 64, left: 0, right: 0,
    backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.92) 12%, rgba(0,0,0,0.92) 88%, rgba(0,0,0,0) 100%)",
    padding: "16px 32px", textAlign: "center", zIndex: 8, pointerEvents: "none",
  },
  objectiveText: {
    fontFamily: mono, fontSize: 15, letterSpacing: "0.14em", color: "#e8d98a",
    textShadow: "0 1px 3px rgba(0,0,0,1)",
  },

  toast: {
    position: "fixed", right: 14, bottom: 18, zIndex: 9, pointerEvents: "none",
    fontFamily: mono, fontSize: 12, letterSpacing: "0.1em",
    padding: "9px 14px", backgroundColor: "rgba(4,8,9,0.9)",
    border: "1px solid", borderRadius: 4,
  },
  toastIcon: { marginRight: 4 },

  beginBtn: {
    fontFamily: mono, fontSize: 12, letterSpacing: "0.15em", padding: "14px 28px",
    backgroundColor: "transparent", color: "#d7e4e0", border: "1px solid #2a4548",
    borderRadius: 3, cursor: "pointer", marginTop: 8,
  },

  stream: { flex: 1, overflowY: "auto", padding: "24px 20px 0", maxWidth: 620, width: "100%", margin: "0 auto" },
  streamTrimNotice: { fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", color: "#485b56", textAlign: "center", padding: "4px 0 10px" },

  lineBase: {
    narrate: { fontSize: 17, lineHeight: 1.75, margin: "0 0 18px", color: "#aebfbc" },
    ambient: { fontSize: 15, lineHeight: 1.7, margin: "0 0 18px", color: "#5f7573", fontStyle: "italic" },
    system: { fontFamily: mono, fontSize: 12, lineHeight: 1.6, margin: "0 0 18px", color: "#c79a52", letterSpacing: "0.05em" },
    alert: { fontFamily: mono, fontSize: 12, lineHeight: 1.6, margin: "0 0 18px", color: "#c05a48", letterSpacing: "0.05em" },
    choice: { fontFamily: mono, fontSize: 13, lineHeight: 1.6, margin: "0 0 22px", color: "#5f7573" },
    anons: { fontFamily: mono, fontSize: 13, lineHeight: 1.75, margin: "0 0 18px", color: "#d9c27a", letterSpacing: "0.06em", textShadow: "0 0 10px rgba(215,190,110,0.25)" },
  },

  timerWrap: { margin: "4px 0 14px" },
  timerLabel: { fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "#c05a48", marginBottom: 6 },
  timerTrack: { height: 4, backgroundColor: "#180e0d", borderRadius: 2, overflow: "hidden" },
  timerFill: { height: "100%", backgroundColor: "#c05a48" },

  choices: { display: "flex", flexDirection: "column", gap: 10, margin: "6px 0 20px" },
  choiceBtn: {
    fontFamily: mono, fontSize: 13, textAlign: "left", padding: "14px 16px",
    backgroundColor: "rgba(13,26,27,0.6)", color: "#c3d4d1",
    border: "1px solid #1b3234", borderRadius: 3, cursor: "pointer", lineHeight: 1.5,
  },
  choiceLocked: {
    fontFamily: mono, fontSize: 13, textAlign: "left", padding: "14px 16px",
    backgroundColor: "rgba(10,14,14,0.5)", color: "#48544f",
    border: "1px dashed #1b2626", borderRadius: 3, cursor: "default", lineHeight: 1.5,
  },

  endWrap: { textAlign: "center", padding: "30px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  endTitle: { fontFamily: mono, fontSize: "clamp(16px, 5.5vw, 22px)", letterSpacing: "0.25em", color: "#d7e4e0", textAlign: "center" },
  endText: { color: "#5f7573", fontStyle: "italic", fontSize: 14, lineHeight: 1.6 },

  overlayDim: {
    position: "fixed", inset: 0, backgroundColor: "rgba(2,4,5,0.85)",
    display: "flex", justifyContent: "center", alignItems: "center",
    padding: "20px 14px", zIndex: 20,
  },

  /* Ana kontrol paneli — kırmızı acil ışığı altında metal pano */
  ironPanel: {
    width: "100%", maxWidth: 330, borderRadius: 6,
    backgroundColor: "#240d09",
    backgroundImage: "linear-gradient(165deg, rgba(120,34,22,0.55) 0%, rgba(24,7,5,0.95) 62%), radial-gradient(ellipse at 50% -10%, rgba(220,60,35,0.28) 0%, rgba(0,0,0,0) 55%)",
    border: "1px solid #4a1a10",
    boxShadow: "0 0 80px rgba(150,30,12,0.22), 0 0 40px rgba(0,0,0,0.9), inset 0 0 34px rgba(0,0,0,0.75)",
    padding: "24px 24px 16px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 15,
  },
  ironTitle: { fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", color: "#c98576", textAlign: "center", textShadow: "0 0 8px rgba(200,60,30,0.4)" },
  crtScreen: {
    width: "100%", borderRadius: 4,
    border: "3px solid #140806",
    backgroundColor: "#0a1d14",
    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 2px, transparent 4px), radial-gradient(ellipse at 50% 40%, rgba(80,220,160,0.08) 0%, rgba(0,0,0,0) 70%)",
    boxShadow: "inset 0 0 26px rgba(0,0,0,0.9), 0 0 14px rgba(80,220,160,0.1)",
    padding: "10px 12px",
  },
  crtRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 6px" },
  crtLabel: { fontFamily: mono, fontSize: 12, letterSpacing: "0.16em", color: "#9fd8bc", textShadow: "0 0 7px rgba(90,220,160,0.55)" },
  crtMark: { fontFamily: mono, fontSize: 15, fontWeight: 700 },
  panelLightRow: { display: "flex", alignItems: "center", gap: 8 },
  panelLight: { width: 12, height: 12, borderRadius: "50%", border: "2px solid #140806" },
  panelLightLabel: { fontFamily: mono, fontSize: 9, letterSpacing: "0.2em", color: "#a3705f" },
  redButton: {
    width: 76, height: 76, borderRadius: "50%",
    backgroundColor: "#c0261a",
    backgroundImage: "radial-gradient(circle at 35% 28%, #ef6a58 0%, #a81a10 55%, #650c06 100%)",
    border: "5px solid #2e0f09",
    boxShadow: "0 0 30px rgba(230,60,35,0.55), 0 5px 12px rgba(0,0,0,0.85), inset 0 -5px 10px rgba(0,0,0,0.55)",
    cursor: "pointer", padding: 0,
  },
  redButtonLabel: { fontFamily: mono, fontSize: 10, letterSpacing: "0.28em", color: "#d3948a" },

  keypadPanel: {
    width: "min(92vw, 430px)", maxWidth: 430, borderRadius: 8,
    backgroundColor: "rgba(9,11,10,0.98)",
    backgroundImage: "linear-gradient(135deg, rgba(70,78,68,0.16), rgba(4,8,8,0.4) 42%, rgba(0,0,0,0.25))",
    border: "1px solid #38413a",
    boxShadow: "0 0 70px rgba(0,0,0,0.95), inset 0 0 45px rgba(0,0,0,0.72)",
    padding: "12px 12px 14px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 12,
  },
  keypadTopRail: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 3px" },
  keypadScrew: {
    width: 12, height: 12, borderRadius: "50%",
    backgroundColor: "#161817", border: "1px solid #55584e",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.85)",
  },
  keypadStatusLamp: {
    width: 10, height: 10, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.75)",
    boxShadow: "0 0 14px currentColor",
  },
  keypadFace: {
    width: "100%", borderRadius: 6, padding: "16px 14px 14px",
    backgroundColor: "rgba(12,16,15,0.94)", border: "1px solid #202924",
    boxShadow: "inset 0 0 28px rgba(0,0,0,0.72)",
  },
  keypadHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  keypadTinyLabel: { fontFamily: mono, fontSize: 8, letterSpacing: "0.24em", color: "#60756b", marginBottom: 5 },
  keypadTitle: { fontFamily: mono, fontSize: 12, letterSpacing: "0.16em", color: "#a8c7ba", lineHeight: 1.4 },
  keypadBadge: {
    fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", padding: "5px 7px",
    border: "1px solid #4d4428", backgroundColor: "rgba(0,0,0,0.35)",
  },
  keypadScreen: {
    position: "relative", overflow: "hidden", borderRadius: 5,
    backgroundColor: "#03100e", border: "1px solid #24544c",
    padding: "13px 12px 9px", marginBottom: 12,
    boxShadow: "inset 0 0 22px rgba(0,0,0,0.85), 0 0 20px rgba(42,126,110,0.12)",
  },
  keypadScreenGlow: {
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage: "repeating-linear-gradient(0deg, rgba(130,230,200,0.05) 0, rgba(130,230,200,0.05) 1px, transparent 1px, transparent 4px)",
    opacity: 0.65,
  },
  keypadCodeRow: { position: "relative", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 9 },
  keypadDigitCell: {
    height: 48, borderRadius: 4, border: "1px solid rgba(50,90,82,0.45)",
    backgroundColor: "rgba(2,9,8,0.72)", display: "flex", alignItems: "center", justifyContent: "center",
  },
  keypadDigit: { fontFamily: mono, fontSize: 25, color: "#7fdcc3", width: 22, textAlign: "center", textShadow: "0 0 10px rgba(90,220,190,0.55)" },
  keypadProgress: { position: "relative", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 },
  keypadProgressSeg: { height: 3, borderRadius: 2, transitionProperty: "background-color", transitionDuration: "150ms" },
  keypadSignalLine: { position: "relative", display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: mono, fontSize: 8, letterSpacing: "0.18em", color: "#60756b" },
  keypadMsg: { fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textAlign: "center", minHeight: 16, marginBottom: 10 },
  keypadBodyGrid: { display: "grid", gridTemplateColumns: "42px 1fr", gap: 12, alignItems: "stretch" },
  keypadWireBay: {
    borderRadius: 5, border: "1px solid #252923", backgroundColor: "rgba(0,0,0,0.32)",
    display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "8px 8px",
    boxShadow: "inset 0 0 18px rgba(0,0,0,0.72)",
  },
  keypadWire: { height: 9, borderRadius: 999, boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.55)" },
  keypadGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, width: "100%" },
  keyBtn: {
    fontFamily: mono, fontSize: 16, padding: "13px 0",
    backgroundColor: "rgba(18,25,24,0.95)",
    backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.22))",
    color: "#c3d7cf", border: "1px solid #303b36", borderRadius: 4, cursor: "pointer",
    boxShadow: "0 3px 0 #070908, inset 0 0 10px rgba(0,0,0,0.45)",
  },
  keyAlt: {
    fontFamily: mono, fontSize: 11, padding: "13px 0", backgroundColor: "rgba(35,24,18,0.95)",
    color: "#cdb08a", border: "1px solid #493423", borderRadius: 4, cursor: "pointer",
    boxShadow: "0 3px 0 #090706, inset 0 0 10px rgba(0,0,0,0.45)",
  },
  keyEnter: {
    fontFamily: mono, fontSize: 11, padding: "13px 0", backgroundColor: "rgba(16,34,22,0.98)",
    color: "#9dd9aa", border: "1px solid #2b5735", borderRadius: 4, cursor: "pointer",
    boxShadow: "0 3px 0 #071007, inset 0 0 12px rgba(60,180,90,0.08)",
  },

  lightsRow: { display: "flex", gap: 12, justifyContent: "center" },
  lamp: {
    width: 26, height: 26, borderRadius: "50%",
    border: "2px solid #3a3a2a",
    transitionProperty: "background-color, box-shadow", transitionDuration: "250ms",
  },
  lightBtn: {
    fontFamily: mono, fontSize: 14, width: 42, padding: "12px 0",
    backgroundColor: "rgba(13,26,25,0.8)", color: "#b9d4cc",
    border: "1px solid #1d3a36", borderRadius: 6, cursor: "pointer",
  },
  lightsHintText: { fontFamily: mono, fontSize: 10, color: "#5a6e62", letterSpacing: "0.08em", textAlign: "center", lineHeight: 1.7 },

  /* Vana */
  valveWrap: { padding: 6 },
  valveWheel: {
    width: 110, height: 110, borderRadius: "50%",
    border: "8px solid #5a4f3a", position: "relative",
    transitionProperty: "transform", transitionDuration: "250ms",
    boxShadow: "inset 0 0 18px rgba(0,0,0,0.7)",
  },
  valveSpokeV: { position: "absolute", left: "50%", top: 0, bottom: 0, width: 6, marginLeft: -3, backgroundColor: "#5a4f3a" },
  valveSpokeH: { position: "absolute", top: "50%", left: 0, right: 0, height: 6, marginTop: -3, backgroundColor: "#5a4f3a" },
  valveHub: { position: "absolute", left: "50%", top: "50%", width: 22, height: 22, margin: "-11px 0 0 -11px", borderRadius: "50%", backgroundColor: "#3a3428", border: "2px solid #6b5f46" },

  /* Şalter */
  leverTrack: {
    width: 34, height: 130, borderRadius: 17,
    backgroundColor: "#0c1210", border: "1px solid #2a3830",
    position: "relative", overflow: "hidden",
  },
  leverArm: {
    position: "absolute", left: 4, right: 4, height: 30, borderRadius: 13,
    backgroundColor: "#7d7a68", boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
    transitionProperty: "bottom", transitionDuration: "80ms",
  },

  /* Sigorta */
  fuseTrack: {
    width: "100%", height: 26, borderRadius: 6, position: "relative",
    backgroundColor: "#0c1210", border: "1px solid #2a3830", overflow: "hidden",
  },
  fuseZone: {
    position: "absolute", left: "40%", width: "20%", top: 0, bottom: 0,
    backgroundColor: "rgba(127,174,134,0.25)", borderLeft: "1px solid #7fae86", borderRight: "1px solid #7fae86",
  },
  fuseMarkerEl: {
    position: "absolute", top: 0, bottom: 0, width: 4,
    backgroundColor: "#e8d98a", boxShadow: "0 0 8px rgba(232,217,138,0.8)",
  },

  mechProgTrack: { width: "100%", height: 6, backgroundColor: "#0c1210", borderRadius: 3, overflow: "hidden" },
  mechProgFill: { height: "100%", backgroundColor: "#7fae86", transitionProperty: "width", transitionDuration: "100ms" },
  bigActionBtn: {
    fontFamily: mono, fontSize: 15, letterSpacing: "0.15em", width: "100%",
    padding: "16px 0", backgroundColor: "rgba(13,26,25,0.9)", color: "#d7e4e0",
    border: "1px solid #2a4a44", borderRadius: 8, cursor: "pointer",
    touchAction: "none",
  },

  /* Nefes */
  breathOverlay: {
    position: "fixed", inset: 0, zIndex: 22,
    backgroundColor: "rgba(2,3,3,0.94)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 22, padding: "0 30px", textAlign: "center",
    cursor: "pointer", touchAction: "none",
  },
  breathTitle: { fontFamily: mono, fontSize: 17, letterSpacing: "0.25em", color: "#c9d4c9" },
  breathPhaseText: { fontFamily: serif, fontStyle: "italic", fontSize: 15, color: "#7a8c88", minHeight: 24 },
  breathBars: { display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 340 },
  breathBarBlock: { display: "flex", flexDirection: "column", gap: 5, alignItems: "stretch" },
  breathHint: { fontFamily: mono, fontSize: 11, letterSpacing: "0.15em", color: "#c05a48", minHeight: 16 },

  /* Kovalamaca */
  chaseOverlay: {
    position: "fixed", inset: 0, zIndex: 23,
    backgroundColor: "rgba(2,3,3,0.96)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "0 18px", textAlign: "center", touchAction: "none",
  },
  chasePanel: {
    width: "100%", maxWidth: 470, borderRadius: 8,
    backgroundColor: "rgba(7,10,9,0.98)", border: "1px solid #2c332d",
    boxShadow: "0 0 70px rgba(0,0,0,0.95), inset 0 0 40px rgba(80,30,20,0.18)",
    padding: "22px 18px", display: "flex", flexDirection: "column",
    gap: 13, alignItems: "center",
  },
  chaseTitle: { fontFamily: mono, fontSize: 14, letterSpacing: "0.22em", color: "#d6cfa8" },
  chaseEnemy: { fontFamily: serif, fontStyle: "italic", fontSize: 16, color: "#b55a45" },
  chaseCorridor: {
    position: "relative", width: "100%", height: 84, overflow: "hidden",
    border: "1px solid #25302b", borderRadius: 4, backgroundColor: "#050706",
    backgroundImage: "repeating-linear-gradient(90deg, rgba(55,65,55,0.12) 0, rgba(55,65,55,0.12) 8px, transparent 8px, transparent 26px), linear-gradient(180deg, rgba(210,180,120,0.05), rgba(0,0,0,0.4))",
  },
  chaseBeam: {
    position: "absolute", top: 0, bottom: 0, right: "12%", width: "52%",
    background: "linear-gradient(90deg, transparent, rgba(220,190,120,0.34), transparent)",
    transform: "skewX(-18deg)", transitionProperty: "opacity", transitionDuration: "250ms",
  },
  chaseHunter: {
    position: "absolute", top: 20, width: 22, height: 44, borderRadius: "10px 10px 4px 4px",
    backgroundColor: "#14110e", border: "1px solid #6f563c",
    boxShadow: "0 0 20px rgba(210,160,90,0.25)",
    transitionProperty: "right", transitionDuration: "320ms",
  },
  chasePlayer: {
    position: "absolute", bottom: 14, width: 14, height: 24, borderRadius: 6,
    backgroundColor: "#7fae86", boxShadow: "0 0 12px rgba(127,174,134,0.35)",
    transitionProperty: "left", transitionDuration: "320ms",
  },
  chaseStatusRow: {
    width: "100%", display: "flex", justifyContent: "space-between", gap: 12,
    fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", color: "#9aa393",
  },
  chaseHint: { minHeight: 18, fontFamily: serif, fontStyle: "italic", fontSize: 14, color: "#a69b82" },
  chaseButtons: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, width: "100%" },

  menuPanel: {
    width: "100%", maxWidth: 520, borderRadius: 14,
    backgroundColor: "rgba(8,9,7,0.94)", border: "1px solid #23241c",
    boxShadow: "0 0 60px rgba(0,0,0,0.9)",
    padding: "34px 24px 22px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 26,
  },
  menuObjective: { fontFamily: mono, fontSize: 15, letterSpacing: "0.12em", color: "#e8d98a", textAlign: "center", lineHeight: 1.6 },
  menuButtons: { display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },
  menuItem: {
    fontFamily: mono, fontSize: 14, letterSpacing: "0.35em",
    padding: "10px 26px", backgroundColor: "transparent", color: "#d6cfa8",
    border: "1px solid transparent", borderRadius: 999, cursor: "pointer",
  },
  menuClose: {
    fontFamily: mono, fontSize: 12, letterSpacing: "0.35em", padding: "8px 22px",
    backgroundColor: "transparent", color: "#8f8a70", border: "1px solid transparent",
    borderRadius: 999, cursor: "pointer",
  },
  creditsText: {
    fontFamily: mono, fontSize: 12, lineHeight: 2, color: "#9aa393",
    letterSpacing: "0.08em", textAlign: "center", whiteSpace: "pre-wrap",
  },

  settingsBlock: { display: "flex", flexDirection: "column", gap: 10, alignItems: "center" },
  settingsLabel: { fontFamily: mono, fontSize: 11, letterSpacing: "0.25em", color: "#6e7a6a" },
  segRow: { display: "flex", gap: 10 },
  segBtn: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "9px 16px",
    backgroundColor: "transparent", color: "#7d8878",
    border: "1px solid #26302a", borderRadius: 999, cursor: "pointer",
  },
  segActive: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "9px 16px",
    backgroundColor: "rgba(40,60,48,0.5)", color: "#dbe8dc",
    border: "1px solid #4a6a54", borderRadius: 999, cursor: "pointer",
  },

  listPanel: {
    width: "100%", maxWidth: 560, maxHeight: "82vh", borderRadius: 12,
    backgroundColor: "rgba(8,9,7,0.94)", border: "1px solid #23241c",
    boxShadow: "0 0 60px rgba(0,0,0,0.9)",
    padding: "22px 20px 16px", display: "flex", flexDirection: "column", gap: 14,
  },
  listTitle: { fontFamily: mono, fontSize: 16, letterSpacing: "0.35em", color: "#d6cfa8" },
  listBody: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
  listRow: {
    display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left",
    padding: "11px 6px", backgroundColor: "transparent",
    border: "none", borderBottom: "1px solid #1c1d16", cursor: "pointer",
  },
  rowDotSlot: { width: 12, display: "flex", justifyContent: "center", flexShrink: 0 },
  redDot: { width: 7, height: 7, borderRadius: "50%", backgroundColor: "#c23b2e", display: "block" },
  rowText: { fontFamily: mono, fontSize: 13, letterSpacing: "0.08em", color: "#cfc9a4" },
  emptyText: { fontFamily: mono, fontSize: 12, color: "#5a584a", textAlign: "center", marginTop: 30, lineHeight: 1.8 },

  notePaper: {
    width: "min(82vw, 560px)", height: "92vh", maxHeight: 800,
    overflow: "hidden", position: "relative",
    backgroundColor: "#eeeadd",
    backgroundImage: [
      "linear-gradient(90deg, rgba(255,255,255,0.42), rgba(255,255,255,0) 18%, rgba(0,0,0,0.035) 100%)",
      "repeating-linear-gradient(180deg, transparent 0, transparent 38px, rgba(120,135,145,0.2) 39px, transparent 40px)",
      "radial-gradient(ellipse at 18% 92%, rgba(120,110,88,0.18), transparent 26%)",
      "radial-gradient(ellipse at 72% 82%, rgba(80,70,55,0.10), transparent 20%)",
    ].join(", "),
    boxShadow: "0 18px 70px rgba(0,0,0,0.96), inset 0 0 38px rgba(90,80,58,0.14)",
    padding: "30px clamp(28px, 5.2vw, 44px) 26px",
    display: "flex", flexDirection: "column", gap: 6,
  },
  noteOverlay: {
    backgroundColor: "rgba(2,4,3,0.9)",
    backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(130,132,86,0.28), rgba(8,10,6,0.82) 48%, rgba(0,0,0,0.96) 100%)",
    backdropFilter: "blur(3px) saturate(0.72)",
    padding: "3vh 12px",
  },
  noteTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3, gap: 18, flexShrink: 0 },
  notePaperTitle: { fontFamily: hand, fontSize: "clamp(17px, 2.4vw, 22px)", color: "#293f9d", fontWeight: 700, lineHeight: "38px" },
  notePaperTime: { fontFamily: hand, fontSize: "clamp(11px, 1.7vw, 14px)", color: "#5365ad", whiteSpace: "nowrap" },
  notePaperBody: {
    fontFamily: hand,
    fontSize: "clamp(18px, 2.45vw, 22px)",
    lineHeight: "38px",
    color: "#263f9d",
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textShadow: "none",
    paddingTop: 2,
    flex: 1,
  },
  paperBack: {
    alignSelf: "center", marginTop: 18, fontFamily: mono, fontSize: 11,
    letterSpacing: "0.18em", padding: "5px 18px",
    backgroundColor: "rgba(120,118,104,0.34)", color: "#5e5b4e",
    border: "1px solid rgba(95,92,78,0.22)", borderRadius: 999,
    boxShadow: "inset 0 1px 3px rgba(255,255,255,0.26), 0 1px 8px rgba(0,0,0,0.24)",
    cursor: "pointer",
  },

  /* El yazısı döküman (günlük) — çizgili kağıt, mavi mürekkep */
  docPaperHand: {
    width: "100%", maxWidth: 480, maxHeight: "84vh", overflowY: "auto",
    backgroundColor: "#f3f0e6",
    backgroundImage: "repeating-linear-gradient(transparent, transparent 30px, #c8d3df 31px)",
    boxShadow: "0 10px 50px rgba(0,0,0,0.95)",
    padding: "28px 26px 18px", display: "flex", flexDirection: "column", gap: 6,
  },
  docHandMeta: { fontFamily: hand, fontSize: 15, color: "#7a86b8", marginBottom: 6 },
  docHandBody: {
    fontFamily: hand, fontSize: 18.5, lineHeight: "31px", color: "#2f3e96",
    whiteSpace: "pre-wrap", flex: 1,
  },

  docPaper: {
    width: "100%", maxWidth: 520, height: "min(84vh, 660px)",
    backgroundColor: "#edeadf",
    boxShadow: "0 10px 50px rgba(0,0,0,0.95)",
    padding: "30px 30px 14px", display: "flex", flexDirection: "column",
    overflow: "hidden",
  },
  docPaperMeta: { fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", color: "#6b675a", marginBottom: 16, flexShrink: 0 },
  docPaperBody: { fontFamily: mono, fontSize: 13, lineHeight: 1.62, color: "#2e2c26", whiteSpace: "pre-wrap", flex: 1, overflow: "hidden" },
  docNav: { display: "flex", justifyContent: "center", alignItems: "center", gap: 18, marginTop: 10, flexShrink: 0 },
  docArrow: {
    fontFamily: mono, fontSize: 24, lineHeight: 1, padding: "4px 14px",
    backgroundColor: "transparent", color: "#4a463a",
    border: "none", cursor: "pointer",
  },
  docPageInfo: { fontFamily: mono, fontSize: 10, color: "#8a8574", textAlign: "center", marginTop: 4, flexShrink: 0 },
  paperBackDark: {
    fontFamily: mono, fontSize: 12,
    letterSpacing: "0.3em", padding: "8px 20px", backgroundColor: "transparent",
    color: "#6b675a", border: "1px solid #b9b4a2", borderRadius: 999, cursor: "pointer",
  },

  blackoutOverlay: {
    position: "fixed", inset: 0, zIndex: 26,
    backgroundColor: "rgb(1,1,1)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 20, padding: "0 34px", textAlign: "center",
    cursor: "pointer", touchAction: "none",
  },
  blackoutTitle: { fontFamily: mono, fontSize: 18, letterSpacing: "0.3em", color: "#6b3a34" },
  blackoutText: { fontFamily: serif, fontStyle: "italic", fontSize: 14, color: "#6a6a60", maxWidth: 340, lineHeight: 1.8 },
  boCountTrack: { width: "100%", maxWidth: 300, height: 5, backgroundColor: "#151008", borderRadius: 3, overflow: "hidden" },
  boCountFill: { height: "100%", backgroundColor: "#c23b2e" },
  boHoldBtn: {
    position: "relative", width: "100%", maxWidth: 300, height: 62,
    border: "1px solid #4a3a2e", borderRadius: 8, overflow: "hidden",
    backgroundColor: "rgba(20,14,8,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  boHoldFill: {
    position: "absolute", left: 0, top: 0, bottom: 0,
    backgroundColor: "rgba(127,174,134,0.3)",
  },
  boHoldText: { position: "relative", fontFamily: mono, fontSize: 12, letterSpacing: "0.15em", color: "#c9b89a" },

  dyingVignette: { position: "fixed", inset: 0, zIndex: 25, pointerEvents: "none" },

  /* Açılış sinematiği — kurumsal posta terminali */
  introRoot: {
    position: "fixed", inset: 0, backgroundColor: "#050a09", zIndex: 40,
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", padding: "20px 16px",
    transitionProperty: "opacity", transitionDuration: "1100ms",
  },
  mailWindow: {
    width: "100%", maxWidth: 400, borderRadius: 6, position: "relative",
    backgroundColor: "#07100e", border: "1px solid #1d3230",
    boxShadow: "0 0 70px rgba(0,0,0,0.9), inset 0 0 40px rgba(10,30,28,0.35)",
    padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 10,
    fontFamily: mono, overflow: "hidden",
  },
  mailTitle: { fontSize: 10, letterSpacing: "0.2em", color: "#4d8a7a", textAlign: "center", paddingBottom: 8, borderBottom: "1px solid #14231f" },
  mailField: { display: "flex", gap: 8, fontSize: 11, color: "#7fae9c", alignItems: "baseline" },
  mailFieldLabel: { color: "#3f6b5e", fontSize: 10, letterSpacing: "0.1em", minWidth: 44 },
  mailBody: {
    minHeight: 150, fontSize: 12.5, lineHeight: 1.8, color: "#9fd8bc",
    textShadow: "0 0 6px rgba(90,220,160,0.35)", whiteSpace: "pre-wrap",
    borderTop: "1px solid #14231f", paddingTop: 10,
  },
  mailButtons: { display: "flex", justifyContent: "space-between", gap: 10, paddingTop: 10, borderTop: "1px solid #14231f" },
  mailBtn: {
    fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", color: "#7fae9c",
    backgroundColor: "#0b1a16", border: "1px solid #1d3230", borderRadius: 3,
    padding: "8px 14px", transitionProperty: "background-color, color", transitionDuration: "150ms",
  },
  mailBtnActive: { backgroundColor: "#1d4436", color: "#d8ffe9" },
  mailStatus: { fontSize: 10, letterSpacing: "0.12em", color: "#c79a52", minHeight: 14, textAlign: "center" },
  mailCursor: {
    position: "absolute", width: 0, height: 0, zIndex: 5,
    borderLeft: "7px solid #e8e4d2", borderTop: "4px solid transparent",
    borderBottom: "10px solid transparent",
    filter: "drop-shadow(0 0 4px rgba(0,0,0,0.9))",
    transitionProperty: "left, top", transitionDuration: "750ms",
    transitionTimingFunction: "ease-in-out",
  },
  mailDialog: {
    position: "absolute", left: "50%", top: "42%", transform: "translate(-50%,-50%)",
    backgroundColor: "#0b1512", border: "1px solid #2a4a40", borderRadius: 4,
    boxShadow: "0 8px 40px rgba(0,0,0,0.9)", padding: "14px 16px", zIndex: 4,
    display: "flex", flexDirection: "column", gap: 12, minWidth: 220,
  },
  mailDialogText: { fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", color: "#c79a52", textAlign: "center" },
  mailDialogRow: { display: "flex", justifyContent: "center", gap: 14 },
  introBlack: {
    position: "fixed", inset: 0, backgroundColor: "#000", zIndex: 41,
    display: "flex", justifyContent: "center", alignItems: "center",
    transitionProperty: "opacity", transitionDuration: "1200ms",
  },
  introBlackText: {
    fontFamily: mono, fontSize: 15, letterSpacing: "0.45em", color: "#8a8a7a",
    transitionProperty: "opacity", transitionDuration: "900ms",
  },
  introSkip: {
    position: "fixed", right: 14, bottom: 14, zIndex: 42,
    fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", color: "#3f6b5e",
    backgroundColor: "transparent", border: "none", padding: 10,
  },

  /* Karanlık modu — pil %0: oyun sürer, ekran pırpırlı karanlık */
  darknessOverlay: {
    position: "fixed", inset: 0, zIndex: 24, pointerEvents: "none",
  },
  darkBarWrap: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 25,
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 3, paddingTop: 4, pointerEvents: "none",
  },
  darkBarLabel: { fontFamily: mono, fontSize: 8, letterSpacing: "0.3em", color: "rgba(194,59,46,0.75)" },
  darkBarTrack: { width: "42%", height: 3, backgroundColor: "rgba(24,10,9,0.9)", borderRadius: 2, overflow: "hidden" },
  darkBarFill: { height: "100%", backgroundColor: "rgba(194,59,46,0.85)" },

  /* Ölüm ekranı kenarları — Outlast tarzı kan vinyeti */
  deathBloodEdges: {
    position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
    pointerEvents: "none",
    backgroundImage: [
      "radial-gradient(ellipse 42% 55% at -6% 18%, rgba(112,10,6,0.92) 0%, rgba(112,10,6,0) 62%)",
      "radial-gradient(ellipse 30% 40% at 104% 8%, rgba(96,8,5,0.85) 0%, rgba(96,8,5,0) 60%)",
      "radial-gradient(ellipse 48% 38% at 12% 106%, rgba(126,12,7,0.95) 0%, rgba(126,12,7,0) 58%)",
      "radial-gradient(ellipse 36% 46% at 96% 92%, rgba(104,9,5,0.9) 0%, rgba(104,9,5,0) 60%)",
      "radial-gradient(ellipse 60% 22% at 50% -8%, rgba(84,7,4,0.75) 0%, rgba(84,7,4,0) 55%)",
      "radial-gradient(ellipse 70% 26% at 42% 110%, rgba(92,8,5,0.8) 0%, rgba(92,8,5,0) 55%)",
      "radial-gradient(ellipse 10% 16% at 3% 55%, rgba(140,16,8,0.8) 0%, rgba(140,16,8,0) 70%)",
      "radial-gradient(ellipse 9% 14% at 98% 42%, rgba(130,14,7,0.75) 0%, rgba(130,14,7,0) 70%)",
    ].join(", "),
  },
  deathOverlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(8,3,3,0.96)",
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", gap: 18, padding: "0 28px", textAlign: "center", zIndex: 30,
  },
  deathTitle: { fontFamily: mono, fontSize: "clamp(15px, 5vw, 20px)", letterSpacing: "0.3em", color: "#b8503f", textAlign: "center", maxWidth: "100%" },
  deathText: { fontFamily: serif, fontStyle: "italic", fontSize: 16, color: "#8a6b64", maxWidth: 380, lineHeight: 1.7 },
  deathBtn: {
    fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", padding: "14px 22px",
    backgroundColor: "transparent", color: "#c9a49a", border: "1px solid #4a2b26",
    borderRadius: 3, cursor: "pointer", marginTop: 10,
  },

  /* Radyo konsolu (v8'de eksikti — eklendi) */
  radioPanel: {
    width: "100%", maxWidth: 360, borderRadius: 10,
    backgroundColor: "rgba(7,12,11,0.97)", border: "1px solid #1d3230",
    boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(10,30,28,0.4)",
    padding: "24px 22px 18px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 16,
  },
  radioFreqDisplay: {
    fontFamily: mono, fontSize: 34, color: "#7fdcc3",
    textShadow: "0 0 12px rgba(90,220,190,0.5)", width: "100%", textAlign: "center",
    padding: "10px 0", backgroundColor: "#050a09", border: "1px solid #16403a", borderRadius: 6,
  },
  radioMhz: { fontSize: 14, color: "#4d8a7a" },
  radioSignalRow: { display: "flex", alignItems: "center", gap: 8, width: "100%" },
  radioSignalTrack: { flex: 1, height: 6, backgroundColor: "#0c1718", borderRadius: 3, overflow: "hidden" },
  radioSignalFill: { height: "100%", transitionProperty: "width", transitionDuration: "200ms" },
  radioHint: { fontStyle: "italic", fontSize: 13.5, minHeight: 42, textAlign: "center", lineHeight: 1.65 },
  radioButtons: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, width: "100%" },
  radioLockText: { fontFamily: mono, fontSize: 10, letterSpacing: "0.15em", color: "#7fae86", textAlign: "center" },
};
