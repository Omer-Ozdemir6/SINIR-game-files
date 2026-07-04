import os

path = 'src/components/interactions/PuzzleOverlays.jsx'
if os.path.exists(path):
    s = open(path, encoding='utf-8').read()
    
    # Hata veren satırı bul ve isSparking yerine doğru state kontrolünü koy
    old_line = 'done ? P.msgOk : isSparking ? P.msgBad : P.hint'
    new_line = 'done ? P.msgOk : sparkPort ? P.msgBad : P.hint'
    
    old_msg = 'done ? "✓ ŞEBEKE SENKRONİZASYONU TAMAMLANDI" : isSparking ? "⚠ SİSTEM GÜVENLİĞİ TETİKLENDİ — KISA DEVRE!"'
    new_msg = 'done ? "✓ ŞEBEKE SENKRONİZASYONU TAMAMLANDI" : sparkPort ? "⚠ SİSTEM GÜVENLİĞİ TETİKLENDİ — KISA DEVRE!"'

    s = s.replace(old_line, new_line)
    s = s.replace(old_msg, new_msg)

    open(path, 'w', encoding='utf-8').write(s)
    print("PuzzleOverlays.jsx hatası başarıyla düzeltildi!")
else:
    print("PuzzleOverlays.jsx bulunamadı.")