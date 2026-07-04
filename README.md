# SINIR-1

Metin tabanlı korku oyunu — Karadeniz'in dibinde, 214 metrede, ölümün çalışmadığı yerde.
React + Vite. Tek dosyalık v8 prototipinin modüler sürümü.

## Kurulum

```bash
npm install
npm run dev        # geliştirme (telefonda test: aynı ağdan http://<bilgisayar-ip>:5173)
npm run build      # dist/ çıktısı
```

## Klasör Yapısı

```
src/
├─ App.jsx                  → OYUN MOTORU: durum, playNode/playEvent,
│                             checkpoint, blackout, tüm etkileşim mantığı
├─ main.jsx                 → giriş noktası (StrictMode bilinçli kapalı)
│
├─ story/                   → HİKAYE (motora dokunmadan bölüm yaz)
│  ├─ ep01.js               → Bölüm 01: K-6 (node'lar + başlangıç bayrakları)
│  └─ index.js              → bölümleri tek STORY havuzunda birleştirir
│
├─ engine/
│  ├─ constants.js          → pil, blackout, hız, stat sınırları
│  └─ textFx.js             → akıl bozulması, kelime karartma, sayfalama
│
├─ audio/
│  └─ AudioSys.js           → Tone.js: ambiyans, kalp, statik, kalem/sayfa/pil sesleri
│
├─ save/
│  └─ storage.js            → kalıcı kayıt (localStorage; Capacitor sürümü yorumda)
│
├─ styles/
│  ├─ theme.js              → tüm inline stiller + fontlar
│  └─ global.css            → animasyonlar, hover/active durumları
│
└─ components/
   ├─ MainMenu / WarningScreen / GameHeader / StoryStream / Hud
   ├─ MenuOverlays.jsx      → Pause, Ayarlar, Hakkında, Ölüm ekranı
   ├─ ArchiveOverlays.jsx   → Arşiv menüsü, listeler, not kağıdı, döküman
   └─ interactions/         → Panel, Keypad, Radyo, Işıklar,
                              Vana/Şalter/Sigorta, Nefes, Güç Kaybı
```

## Yeni Bölüm Ekleme (K-5 ve sonrası)

1. `src/story/ep02.js` oluştur:
   ```js
   export const EP02 = { nodes: { n_k5_giris: { ... } } };
   export const EP02_FLAGS = { yeniBayrak: false };
   ```
2. `src/story/index.js` içinde import edip `nodes` ve `flags`'e spread'le.
3. EP01'in son node'undaki (`n_kesinti`) `ending: true` satırını kaldırıp
   `choices: [{ id: "k5", text: "...", next: "n_k5_giris" }]` ekle.

Node id'leri tüm bölümlerde benzersiz olmalı (`n_k5_...` öneki öneririm).

### Node özellikleri (motor referansı)
- `checkpoint`, `cost`, `death`/`deathText`, `ending`, `timer:{seconds}`
- `noiseGate: [{min, once, node}]` → gürültü pusuları
- `choices`: `if:{flag,equals}`, `ifStat:{stat,gte/lte}`, `requireFlags`, `lockText`, `default`
- `interaction`: `keypad` / `radio` / `lights` / `valve` / `lever` / `fuse` / `breath` / `panel`
- Event tipleri: `narrate, ambient, system, alert, pause, glitch, flag,
  status, objective, stat (noteKind'lı), battery, document, note`

## Kayıt Sistemi

Her `checkpoint: true` node'una girişte anlık görüntü hem RAM'e hem
`localStorage`'a yazılır. Ana menüdeki **Devam Et**:
- aynı oturumda → kaldığın satırdan sürer,
- uygulama yeniden açıldıysa → diskteki son kontrol noktasından yükler.

**Yeni Oyun** kalıcı kaydı siler.

## Capacitor'a Geçiş

```bash
npm run build
npm i @capacitor/core @capacitor/cli
npx cap init sinir1 com.sahip.sinir1 --web-dir dist
npx cap add android   # ve/veya ios
npx cap sync
```
Daha sağlam kayıt için `@capacitor/preferences` kur ve
`src/save/storage.js` altındaki async sürümü aç (App'te `loadGame`
çağrılarını `await`'e çevirmen gerekir — iki yer: `useState` başlangıcı
ve `resumeGame`).

## Bilinen Kurallar
- React inline stillerinde `animation` daima longhand (`animationName`, `animationDuration`...) yazılır.
- `AudioSys.init()` yalnızca kullanıcı dokunuşundan sonra çağrılır (autoplay kuralı) — menü butonlarında zaten bağlı.

## RİTİM KURALLARI (motor destekli)

Oyuncu asla "ödül seline" maruz kalmaz:
- **Otomatik fren:** Aynı node'da art arda iki meta olay
  (document/note/objective/battery) gelirse motor araya kendiliğinden
  dokunma kapısı sokar.
- **`{ type: "waitTap" }`** olayı: akış durur, "▸ devam etmek için
  dokun" belirir. Yoğun sahnelerde elle kullan.
- **`document` + `open: true`:** kağıt ekrana açılır, oyuncu
  kapatana dek HER ŞEY bekler. Varsayılan kullanım bu olmalı.
- Yazım disiplini: bir node'da en fazla 1 döküman VEYA 1 görev;
  etkileşimli node'a meta olay koyma; ödül daima anlatı vuruşundan
  SONRA gelsin.

## BÖLÜM TASARIM KURALLARI (keşif ve zorlanma)

Amaç: oyuncu düz çizgide taşınmasın; DÜŞÜNSÜN, arasın, kaybolsun,
başardığını hissetsin.
1. **Hedef söylenir, YOL söylenmez.** Görev "radyo odasına ulaş"
   der; hangi seçimin oraya gittiğini seçenek metni ELE VERMEZ
   ("Radyo odasına git" diye seçenek olmaz — "soldaki su sesine
   yürü / sağdaki karanlık geçide gir" olur).
2. **Her kat bir mini harita:** 5-8 mekânlık hub yapısı; en az 2
   çıkmaz (içinde lore/pil/ceza olan), en az 1 döngü (iki yoldan
   aynı yere varılır), en az 1 yanlış-ölümcül yol.
3. **Yön bilgisi dökümanlardadır:** tünel şeması, vardiya notu,
   duvar yazısı. Arşivi açmayan oyuncu kaybolur — bu bir hata değil,
   tasarımdır.
4. **Kapılar çaba ister:** panel/kod/bulmaca girdileri farklı
   odalarda toplanır; oyuncu koridorlarda GERİ DÖNMEK zorunda kalır.
5. **Seçenek sayısı ekranda 3-5'i geçmesin ama aynı hedefe giden
   tek seçenek olmasın.**
(EP01–EP02 bu kurallara göre yeniden dokunacak; K-4'ten itibaren
bölümler doğrudan bu şablonla yazılır.)

## SES DOSYALARI

`src/audio/soundMap.js` içindeki isimlere dosya yolu yaz
(`public/audio/` altına koy) — o ses anında gerçek kayıtla çalınır;
boş kalanlar sentetik devam eder. Soundtrack: hikayede
`{ type: "music", track: "k6" }` başlatır, `{ type: "music" }`
susturur (parçalar loop çalar, ses ayarına uyar).
