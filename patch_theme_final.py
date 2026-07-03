import os

# --- 1) src/styles/theme.js GÜNCELLEMESİ ---
theme_path = 'src/styles/theme.js'
if os.path.exists(theme_path):
    s = open(theme_path, encoding='utf-8').read()
    
    # Adım 1: Anons Stili
    old_choice = '    choice: { fontFamily: mono, fontSize: 13, lineHeight: 1.6, margin: "0 0 22px", color: "#5f7573" },\n  },'
    new_choice = '    choice: { fontFamily: mono, fontSize: 13, lineHeight: 1.6, margin: "0 0 22px", color: "#5f7573" },\n    anons: { fontFamily: mono, fontSize: 13, lineHeight: 1.75, margin: "0 0 18px", color: "#d9c27a", letterSpacing: "0.06em", textShadow: "0 0 10px rgba(215,190,110,0.25)" },\n  },'
    
    # Alternatif (satır sonu uyumu için)
    if old_choice.replace('\n', '\r\n') in s:
        s = s.replace(old_choice.replace('\n', '\r\n'), new_choice.replace('\n', '\r\n'), 1)
    elif old_choice in s:
        s = s.replace(old_choice, new_choice, 1)
    else:
        # Düz metin olarak aramayı dene
        s = s.replace('margin: "0 0 22px", color: "#5f7573" },\n  },', 'margin: "0 0 22px", color: "#5f7573" },\n    anons: { fontFamily: mono, fontSize: 13, lineHeight: 1.75, margin: "0 0 18px", color: "#d9c27a", letterSpacing: "0.06em", textShadow: "0 0 10px rgba(215,190,110,0.25)" },\n  },')

    # Adım 2: Karanlık Modu Overlay & Bar Stilleri
    old_outlast = '  /* Ölüm ekranı kenarları — Outlast tarzı kan vinyeti */'
    new_outlast = """  /* Karanlık modu — pil %0: oyun sürer, ekran pırpırlı karanlık */
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
  /* Ölüm ekranı kenarları — Outlast tarzı kan vinyeti */"""
    
    if old_outlast in s:
        s = s.replace(old_outlast, new_outlast.replace('\n', '\r\n') if '\r\n' in s else new_outlast, 1)

    # Adım 3: El Yazısı Döküman Kağıdı (RE7 tarzı)
    old_doc = '  docPaper: {'
    new_doc = """  /* El yazısı döküman (günlük) — çizgili kağıt, mavi mürekkep */
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
  docPaper: {"""
    
    if old_doc in s:
        s = s.replace(old_doc, new_doc.replace('\n', '\r\n') if '\r\n' in s else new_doc, 1)

    open(theme_path, 'w', encoding='utf-8').write(s)
    print("theme OK")

# --- 2) src/styles/global.css GÜNCELLEMESİ ---
css_path = 'src/styles/global.css'
if os.path.exists(css_path):
    c = open(css_path, encoding='utf-8').read()
    
    # Adım 4: Karanlık Modu Pırpır Animasyonu
    old_anim = '  @keyframes s1-powerflashAnim {'
    new_anim = """  @keyframes s1-darkmodeAnim {
    0% { background-color: rgba(0,0,0,0.965); }
    74% { background-color: rgba(0,0,0,0.965); }
    77% { background-color: rgba(0,0,0,0.22); }
    83% { background-color: rgba(0,0,0,0.5); }
    86% { background-color: rgba(0,0,0,0.965); }
    92% { background-color: rgba(0,0,0,0.965); }
    94% { background-color: rgba(0,0,0,0.35); }
    96% { background-color: rgba(0,0,0,0.965); }
    100% { background-color: rgba(0,0,0,0.965); }
  }
  @keyframes s1-powerflashAnim {"""
    
    if old_anim in c:
        c = c.replace(old_anim, new_anim.replace('\n', '\r\n') if '\r\n' in c else new_anim, 1)
        
    old_class = '  .s1-powerflash { animation-name: s1-powerflashAnim; animation-duration: 1.3s; animation-timing-function: steps(1); animation-iteration-count: infinite; }'
    new_class = old_class + '\n  .s1-darkmode { animation-name: s1-darkmodeAnim; animation-duration: 2.6s; animation-timing-function: steps(1); animation-iteration-count: infinite; }'
    
    if old_class in c:
        c = c.replace(old_class, new_class.replace('\n', '\r\n') if '\r\n' in c else new_class, 1)
        
    c = c.replace(".s1-blackflash, .s1-powerflash, .s1-dying", ".s1-blackflash, .s1-powerflash, .s1-darkmode, .s1-dying")
    
    open(css_path, 'w', encoding='utf-8').write(c)
    print("css OK")