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
