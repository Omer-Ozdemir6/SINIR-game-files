import os

app_path = 'src/App.jsx'
if os.path.exists(app_path):
    s = open(app_path, encoding='utf-8').read()
    
    # Eski sorunlu satır
    old_line = 'const flickering = battery > 0 && battery <= 12 && !blackout;'
    # Yeni temiz satır (zaten battery > 0 kontrolü pırpırı pil varken sınırlıyor)
    new_line = 'const flickering = battery > 0 && battery <= 12;'
    
    if old_line in s:
        s = s.replace(old_line, new_line, 1)
        open(app_path, 'w', encoding='utf-8').write(s)
        print("Flicker satırı başarıyla güncellendi!")
    else:
        # Alternatif boşluk varyasyonları için arama
        if '&& !blackout' in s:
            s = s.replace('&& !blackout', '')
            open(app_path, 'w', encoding='utf-8').write(s)
            print("Kalan !blackout ifadesi temizlendi!")
        else:
            print("Hedef satır bulunamadı, zaten güncellenmiş olabilir.")
else:
    print("App.jsx bulunamadı.")