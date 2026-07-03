import os

theme_path = 'src/styles/theme.js'

if not os.path.exists(theme_path):
    print(f"Hata: {theme_path} bulunamadı!")
    exit()

s = open(theme_path, encoding='utf-8').read()

old_marker = "  /* Karanlık modu — pil %0: oyun sürer, ekran pırpırlı karanlık */"

new_content = """  /* Açılış sinematiği — kurumsal posta terminali */
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
  /* Karanlık modu — pil %0: oyun sürer, ekran pırpırlı karanlık */"""

# Dosyadaki olası satır sonu (\r\n veya \n) uyumsuzluklarını aşmak için
if old_marker in s:
    s = s.replace(old_marker, new_content.replace('\n', '\r\n') if '\r\n' in s else new_content, 1)
    open(theme_path, 'w', encoding='utf-8').write(s)
    print("intro stilleri OK")
else:
    print("Hedef açıklama satırı bulunamadı! Dosya yapısı değişmiş olabilir.")