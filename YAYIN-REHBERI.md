# SINIR-1 — Yayın Rehberi

Sürüm 1.0.0 · Türkçe · Metin tabanlı korku

## Oyun nedir
Karadeniz'in dibinde 214 metre derinlikteki SINIR-1 araştırma
istasyonunda geçen, mobil öncelikli metin tabanlı korku oyunu.
Oyuncu, kaybolan bir teknisyenin yerine gelen yeni bakım
personelidir. Altı kat aşağı iner (K-6→K-2), her katta farklı bir
"aile" üyesiyle yüzleşir ve **5 farklı sona** ulaşabilir.

- 198 düğüm, 5 bölüm, 5 son
- 17 ölümcül yol, 24 bulmaca/etkileşim
- Kalıcı kayıt (checkpoint), karar-sonuç sistemi
- Karanlık modu, pil yönetimi, yem/interkom, spor/nefes mekanikleri

## Çalıştırma (geliştirme)
```
npm install
npm run dev       # yerel geliştirme sunucusu
```

## Yayın derlemesi
```
npm run build     # dist/ klasörü üretir
npm run preview   # derlemeyi yerel test et
```
`dist/` klasörünü herhangi bir statik sunucuya (Netlify, Vercel,
GitHub Pages, kendi sunucun) yükleyerek yayınlayabilirsin. PWA
olduğu için mobilde "ana ekrana ekle" ile uygulama gibi çalışır.

## Ses ekleme (opsiyonel)
Oyun şu an tamamen **sentetik ses** (Tone.js) ile çalışır — hiç
dosya gerektirmez. Gerçek ses/müzik eklemek istersen:
1. Ses dosyalarını `public/audio/{sfx,music,amb}/` altına koy.
2. `src/audio/soundMap.js` içinde ilgili ismin karşısına yolu yaz.
Boş kalan her ses sentetik devam eder; doldurduğun anında gerçek
kayıt çalar. Bölüm müzikleri: k6, k5, k4, k3, k2 (her kat için).

## Mobil uygulama (Capacitor — opsiyonel)
Native APK/IPA için:
```
npm install @capacitor/core @capacitor/cli
npx cap init SINIR-1 com.sahip.sinir1
npm run build
npx cap add android
npx cap copy
npx cap open android
```
`src/save/storage.js` içinde Capacitor Preferences sürümü hazır
(yorumda) — daha sağlam kayıt için açılabilir.

## Geliştirici modu
`src/engine/constants.js` içindeki `IS_RELEASE` bayrağı:
- `true` (yayın): bulmaca testi ve dil seçici gizli
- `false` (geliştirme): ana menüde "bulmaca testi" görünür,
  ayarlarda dil seçici açılır

## Dil
Oyun Türkçe yayınlanır. i18n altyapısı (`src/i18n/`) çok dilli
desteğe hazırdır; İngilizce hikâye çevirisi eklenmek istenirse
`src/story/en/` klasörü doldurulup `story/index.js`'te `buildEN`
açılır. Yayın sürümünde dil seçici gizlidir.

## Devam oyunu için not
1. oyunun sonu (özellikle YÜZEY sonu) 2. oyuna kanca bırakır:
İnleyen'in kimliği, Deniz'in kaderi ve gövdeye vuran şey bilinçli
açık uçlardır. 2. oyun tasarımı: oyuncu ihbar mailini *alan*
gazeteci olacak; 1. oyunun seçimleri (Ece'nin kaderi, sofra kararı,
Nevin'in sonu) 2. oyunda "yaşanmışlık izleri" olarak görünecek.
