import os

app_path = 'src/App.jsx'
if os.path.exists(app_path):
    s = open(app_path, encoding='utf-8').read()
    
    # 1. PuzzleTest Bileşenini En Üste İthal Etme
    old_imp = 'import IntroCinematic from "./components/IntroCinematic";'
    new_imp = 'import IntroCinematic from "./components/IntroCinematic";\nimport PuzzleTest from "./components/PuzzleTest";'
    
    if old_imp in s:
        s = s.replace(old_imp, new_imp, 1)
    else:
        # Alternatif olarak herhangi bir import satırının altına ekleyelim
        s = s.replace('import { useState', 'import PuzzleTest from "./components/PuzzleTest";\nimport { useState', 1)

    # 2. MainMenu İçine onPuzzleTest Callback'ini Enjekte Etme
    old_menu = 'onCredits={() => setScreen("credits")}'
    new_menu = 'onCredits={() => setScreen("credits")}\n          onPuzzleTest={() => setMode("puzzle_test")}'
    
    if old_menu in s:
        s = s.replace(old_menu, new_menu, 1)

    # 3. PuzzleTest Modunun Render Katmanını Araya Ekleme
    # WarningScreen modunun hemen altına veya üstüne ekleyebiliriz
    old_warn_flow = '  /* ================= UYARI EKRANI ================= */'
    new_puzzle_flow = """  /* ================= BULMACA TEST EKRANI ================= */
  if (mode === "puzzle_test") {
    return (
      <div style={{ position: "fixed", inset: 0, backgroundColor: "#000", zIndex: 100, overflowY: "auto", padding: "20px" }}>
        <button 
          className="s1-btn" 
          style={{ position: "absolute", top: "10px", right: "10px", color: "#ff3333", borderColor: "#ff3333" }}
          onClick={() => setMode("menu")}
        >
          KAPAT ✕
        </button>
        <PuzzleTest />
      </div>
    );
  }

  /* ================= UYARI EKRANI ================= */"""

    if old_warn_flow in s:
        s = s.replace(old_warn_flow, new_puzzle_flow.replace('\n', '\r\n') if '\r\n' in s else new_puzzle_flow, 1)

    open(app_path, 'w', encoding='utf-8').write(s)
    print("App.jsx bulmaca modu için başarıyla güncellendi!")
else:
    print("Hata: src/App.jsx bulunamadı.")