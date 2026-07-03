import os

# --- 1) src/App.jsx GÜNCELLEMESİ ---
app_path = 'src/App.jsx'
if os.path.exists(app_path):
    s = open(app_path, encoding='utf-8').read()
    
    # İthalat satırını güncelle
    old_imp = 'import WarningScreen from "./components/WarningScreen";'
    new_imp = 'import WarningScreen from "./components/WarningScreen";\nimport IntroCinematic from "./components/IntroCinematic";'
    
    if old_imp in s:
        s = s.replace(old_imp, new_imp)
        
    # Akış kontrolünü / mod yönetimini araya ekle
    old_flow = """  /* ================= UYARI EKRANI ================= */
  if (mode === "warning") {
    return <WarningScreen onContinue={startFresh} />;
  }"""
  
    new_flow = """  /* ================= UYARI EKRANI ================= */
  if (mode === "warning") {
    return <WarningScreen onContinue={() => setMode("intro")} />;
  }
  /* ================= AÇILIŞ SİNEMATİĞİ ================= */
  if (mode === "intro") {
    return <IntroCinematic onFinish={startFresh} />;
  }"""

    # Olası \r\n (CRLF) durumlarını kontrol ederek replace yapıyoruz
    if old_flow.replace('\n', '\r\n') in s:
        s = s.replace(old_flow.replace('\n', '\r\n'), new_flow.replace('\n', '\r\n'), 1)
    elif old_flow in s:
        s = s.replace(old_flow, new_flow, 1)
    else:
        # Daha kısa bir blokla eşleştirmeyi dene
        s = s.replace('return <WarningScreen onContinue={startFresh} />;', 'return <WarningScreen onContinue={() => setMode("intro")} />;\n  }\n  if (mode === "intro") {\n    return <IntroCinematic onFinish={startFresh} />;\n  }')

    open(app_path, 'w', encoding='utf-8').write(s)
    print("App OK")

# --- 2) src/components/WarningScreen.jsx YENİDEN YAZIMI ---
warn_path = 'src/components/WarningScreen.jsx'
warn_code = '''import { useState, useEffect } from "react";
import { styles as S } from "../styles/theme";

/* Yeni oyun öncesi içerik uyarısı + giriş metni.
   Yumuşak fade-in ile gelir; Devam Et'e basılınca fade-out olur,
   ardından açılış sinematiği başlar. */
export default function WarningScreen({ onContinue }) {
  const [opacity, setOpacity] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpacity(1), 60);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (leaving) return;
    setLeaving(true);
    setOpacity(0);
    setTimeout(onContinue, 1150);
  };

  return (
    <div style={{ ...S.warnRoot, opacity, transitionProperty: "opacity", transitionDuration: "1100ms" }}>
      <div style={S.warnBody}>
        <p style={S.warnText}>
          SINIR-1 yoğun gerilim, şiddet ve rahatsız edici temalar içerir. Lütfen keyfini çıkarın.
        </p>
        <p style={S.warnText}>
          SINIR-1 su altı araştırma tesisinde gece bakım vardiyasındaki teknisyensin. Yüzeyle bağlantı
          üç saat önce kesildi ve tesiste bir şeyler korkunç derecede yanlış. Elinde yalnızca çatlak
          ekranlı bakım tabletin var: ışığın, kaydın ve tek dostun. Hayatta kalabildiğin kadar kal.
          Her şeyi belgele. Savaşçı değilsin; bu derinlikte hayatta kalmanın tek yolu koşmak, saklanmak
          ya da ölmek.
        </p>
      </div>
      <button className="s1-btn s1-mm" style={S.warnContinue} onClick={handleContinue}>
        Devam Et
      </button>
    </div>
  );
}'''

# Dosyayı doğrudan temizce üstüne yazıyoruz
os.makedirs(os.path.dirname(warn_path), exist_ok=True)
open(warn_path, 'w', encoding='utf-8').write(warn_code)
print("WarningScreen OK")