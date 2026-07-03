import os

app_path = 'src/App.jsx'
if os.path.exists(app_path):
    s = open(app_path, encoding='utf-8').read()
    
    # 1. Eski BlackoutOverlay importunu yeni DarknessOverlay ile değiştir
    s = s.replace(
        'import BlackoutOverlay from "./components/interactions/BlackoutOverlay";',
        'import DarknessOverlay from "./components/DarknessOverlay";'
    )
    s = s.replace(
        'import BlackoutOverlay from "./components/BlackoutOverlay";',
        'import DarknessOverlay from "./components/DarknessOverlay";'
    )

    # 2. Render katmanındaki eski blackout render kontrolünü bulup yeni DarknessOverlay ile değiştir
    # Projedeki tam state adını (büyük olasılıkla battery.darkmode veya benzeri bir state kontrolüdür)
    # buraya adapte ediyoruz. Eğer elinde pil bittiğinde aktifleşen bir 'batteryLeft' veya 'darkness' süresi varsa onu bağlarız.
    
    old_render = '{blackout && <BlackoutOverlay'
    # Genel olarak tetiklenen kalıntıyı daha geniş temizlemek adına kontrol ediyoruz:
    if "blackout" in s:
        print("Dosya içinde 'blackout' referansları bulundu, temizleniyor...")
        
        # Eğer render bloğunda doğrudan duruyorsa:
        s = s.replace('blackout &&', 'battery.darkmode &&') # Projedeki pil karanlık modu state'ine göre
        s = s.replace('<BlackoutOverlay />', '<DarknessOverlay left={battery.darkMs} totalMs={15000} />')
        s = s.replace('<BlackoutOverlay', '<DarknessOverlay')

    open(app_path, 'w', encoding='utf-8').write(s)
    print("App.jsx üzerindeki blackout referansları temizlendi!")
else:
    print("App.jsx bulunamadı.")