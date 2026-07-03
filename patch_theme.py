import os

theme_path = 'src/styles/theme.js'

if not os.path.exists(theme_path):
    print(f"Hata: {theme_path} bulunamadı!")
    exit()

s = open(theme_path, encoding='utf-8').read()
ch = []

# ---- 1) Darkness Overlay & Bar Stilleri (lineBase civarına enjeksiyon) ----
# lineBase'in bittiği veya bulunduğu nesne yapısına karanlık modu stillerini ekliyoruz
dark_styles = """  // --- KARANLIK MODU V2 STİLLERİ ---
  darknessOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#000",
    opacity: 0.96,
    zIndex: 85,
    pointerEvents: "none",
  },
  darkBarWrap: {
    position: "absolute",
    top: "15px", left: "50%",
    transform: "translateX(-50%)",
    width: "160px",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "4px",
    zIndex: 90,
    opacity: 0.55,
  },
  darkBarLabel: {
    fontSize: "10px",
    fontFamily: "monospace",
    color: "#ff3333",
    letterSpacing: "2px",
    textShadow: "0 0 4px #ff0000",
  },
  darkBarTrack: {
    width: "100%", height: "3px",
    backgroundColor: "#220000",
    borderRadius: "1px",
    overflow: "hidden",
    border: "1px solid #440000",
  },
  darkBarFill: {
    height: "100%",
    backgroundColor: "#ff2222",
    boxShadow: "0 0 6px #ff0000",
    transition: "width 0.1s linear",
  },
"""

if "darknessOverlay:" not in s:
    if "lineBase: {" in s:
        s = s.replace("lineBase: {", dark_styles + "  lineBase: {", 1)
        ch.append("darkness-styles-added")
else:
    ch.append("darkness-styles-already-exists")

# ---- 2) RE7 El Yazısı Günlük Stilleri (notePaper / docPaper civarına enjeksiyon) ----
hand_styles = """  // --- EL YAZISI GÜNLÜK (RE7) STİLLERİ ---
  docPaperHand: {
    position: "relative",
    width: "88%", maxWidth: "420px",
    minHeight: "260px",
    maxHeight: "75vh",
    backgroundColor: "#f2ebd9",
    backgroundImage: "radial-gradient(circle at 50% 50%, #f7f3e8 0%, #e6dcbf 100%)",
    color: "#2a1e17",
    padding: "30px 24px",
    borderRadius: "2px",
    boxShadow: "0 12px 36px rgba(0,0,0,0.7), inset 0 0 20px rgba(42,30,23,0.15)",
    display: "flex", flexDirection: "column",
    border: "1px solid #c2b396",
    transform: "rotate(-1deg)",
  },
  docHandMeta: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    opacity: 0.6,
    marginBottom: "16px",
    borderBottom: "1px dashed rgba(42,30,23,0.2)",
    paddingBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  docHandBody: {
    flex: 1,
    fontSize: "16px",
    fontFamily: "'Georgia', serif",
    fontStyle: "italic",
    lineHeight: "1.6",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
    color: "#1c120c",
  },
"""

if "docPaperHand:" not in s:
    # notePaper stili hedef alınarak hemen üzerine el yazısı stillerini enjekte ediyoruz
    if "notePaper: {" in s:
        s = s.replace("notePaper: {", hand_styles + "  notePaper: {", 1)
        ch.append("handwriting-styles-added")
    elif "docPaper: {" in s:
        s = s.replace("docPaper: {", hand_styles + "  docPaper: {", 1)
        ch.append("handwriting-styles-added")
else:
    ch.append("handwriting-styles-already-exists")

open(theme_path, 'w', encoding='utf-8').write(s)
print("TEMA GÜNCELLEME SONUCU:", ch)