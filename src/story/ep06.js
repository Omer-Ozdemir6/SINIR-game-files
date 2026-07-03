/* ============================================================
   SINIR-1 — BÖLÜM 06: "K-1 / DERİNLİK KAZI ALANI" (FİNAL v2)
   Saf hikaye verisi. Bölüm geçiş uyuşmazlıkları ve eksik son 
   parametreleri motor standartlarına göre düzeltilmiştir.
   ============================================================ */

export const EP06 = {
  start: "n_k1_final_giris", // B05 çıkışındaki köprü ID'si ile eşitlendi
  nodes: {
    n_k1_final_giris: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-1 DERİNLİK KAZI ALANI — YEREL SAAT 06:30" },
        { type: "objective", text: "Kadim kütleyle yüzleş ve SINIR-1 hikayesini sonlandır." },
        { type: "narrate", text: "Asansör, insanlığın daha önce hiç ayak basmadığı, okyanus tabanının da altındaki devasa bir doğal mağaraya oturuyor. Burası K-1. Nem yok, sadece dondurucu bir soğuk ve havada asılı duran siyah obsidyen tozları var." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Mağaranın ortasında, Konteyner 7'deki parçanın ana gövdesi olan, kilometrelerce uzanan o devasa antik kütle duruyor. Telsizin tamamen sustu, ama zihnindeki çocuk sesi artık net bir yetişkin sesine, senin kendi sesine dönüştü." },
      ],
      choices: [
        { id: "kutleye_yuru", text: "Kütleye doğru ilerle ve elini yüzeyine koy", next: "n_k1_yuzlesme" },
        { id: "kurtarma_dene", text: "Mağara duvarındaki acil durum fırlatma hattına koş", next: "n_k1_kacis_kontrol", ifStat: { stat: "akil", gte: 30 } },
      ],
    },

    /* --- AKIL SAĞLIĞI KONTROLÜ VEYA YÖNLENDİRME --- */
    n_k1_yuzlesme: {
      cost: 2,
      events: [
        { type: "narrate", text: "Kütleye yaklaştıkça şakaklarında dayanılmaz bir basınç hissediyorsun. 7.400 yıllık bir hafıza zihnine akmaya başlıyor." },
      ],
      choices: [
        { id: "teslim_ol", text: "Frekansın seni tamamen ele geçirmesine izin ver", next: "n_final_karanlik", ifStat: { stat: "akil", lt: 35 } },
        { id: "diren", text: "Zihnini toparla, iradeni koru ve son şaltere asıl", next: "n_k1_irade_savasi", ifStat: { stat: "akil", gte: 35 } },
      ],
    },

    /* --- İRADE SAVAŞI (`breath`) --- */
    n_k1_irade_savasi: {
      cost: 3,
      events: [
        { type: "narrate", text: "Kütle zihnini tamamen silmek için son bir dalga yayıyor. Kulaklarından kan sızarken kendi ismini unutmamak için nefesini ve iradeni tutmak zorundasın." },
        { type: "system", text: "ZİHNİNİ KORU — NEFESİNİ TUT VE BIRAKMA" },
      ],
      interaction: { kind: "breath", holdMs: 10000, lungMs: 13000, success: "n_k1_reaktor_feda", fail: "n_final_karanlik" },
    },

    /* --- FİNAL 1: DERİNLİĞİN PARÇASI (KÖTÜ SON) --- */
    n_final_karanlik: {
      checkpoint: true, ending: true, cost: 0,
      events: [
        { type: "glitch", ms: 2000 },
        { type: "narrate", text: "Direnç duvarların parça parça yıkılıyor. Teknolojik bir cihazın ekranına bakar gibi boş gözlerle kütleye bakıyorsun. Artık ne bir ismin var, ne modern web siteleri, ne de kurtulman gereken bir yüzey." },
        { type: "narrate", text: "Derinlik seni tamamen yuttu. SINIR-1'in yeni efendisi, Aile'nin yeni kalbi sensin. Yukarıdaki asansör hiçbir zaman çalışmayacak." },
        { type: "system", text: "FİNAL 1/3: DERİNLİĞİN PARÇASI — ZİHNİN TAMAMEN ÇÖZÜLDÜ." },
      ],
    },

    /* --- FİNAL 2: SINIR PROTOKOLÜ (FEDA SONU) --- */
    n_k1_reaktor_feda: {
      checkpoint: true, cost: 1,
      events: [
        { type: "narrate", text: "İradeni korumayı başardın! Kütlenin hemen altındaki jeotermal sondaj çekirdeğinin manuel patlatma valfini görüyorsun. Bunu çevirirsen bu mağara tüm istasyonla birlikte okyanusun altına gömülecek." },
      ],
      choices: [
        { id: "patlat", text: "Valfi çevir ve reaktörü aşırı yükle", next: "n_final_feda_aksiyon" }
      ],
    },

    n_final_feda_aksiyon: {
      checkpoint: true, ending: true, cost: 0, // Eksik olan ending parametresi eklendi!
      events: [
        { type: "system", text: "JEOTERMAL ÇEKİRDEK ERİMESİ BAŞLADI — GERİ DÖNÜŞ YOK" },
        { type: "narrate", text: "Valfi sonuna kadar çeviriyorsun. Mağaranın tavanı büyük bir gürültüyle çökmeye başlıyor. Yukarıdaki K-2 and K-3 katlarının patlama sesleri buraya kadar ulaşıyor." },
        { type: "pause", ms: 900 },
        { type: "narrate", text: "Üzerine tonlarca kaya ve okyanus suyu çökerken son hissettiğin şey, telsizdeki parazitlerin tamamen bitmesi ve zihnindeki o çocuk sesinin sonsuza dek susması oluyor. Kendini feda ettin ama bu laneti dünyaya yayılmadan durdurdun." },
        { type: "system", text: "FİNAL 2/3: SINIR PROTOKOLÜ — KADİM KÜTLE VE SINIR-1 YOK EDİLDİ." },
      ],
    },

    /* --- FİNAL 3: YÜZEYE ÇIKIŞ (İYİ SON) --- */
    n_k1_kacis_kontrol: {
      cost: 2,
      events: [
        { type: "narrate", text: "Kütleye arkanı dönüp acil durum tahliye kapsülünün paneline koşuyorsun. Harun'un ses kaydı ve Nevin'in laboratuvar diskindeki tüm veriler burada, kapsülün kilidini açacak anahtarı oluşturuyor." },
        { type: "system", text: "FİNAL KAÇIŞ KODUNU GİR (Kod: 2147)" },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_final_kurtulus_aksiyon", cancel: "n_k1_final_giris" },
    },

    n_final_kurtulus_aksiyon: {
      checkpoint: true, ending: true, cost: 0,
      events: [
        { type: "system", text: "TAHLİYE KAPSÜLÜ FIRLATILDI — DIKEY TIRMANIŞ" },
        { type: "narrate", text: "Kapsülün çelik kapısı arkandan kapandığı an, mağaradan yükselen o siyah obsidyen dalgası kapsülün camına çarpıyor ama seni yakalayamıyor. Muazzam bir basınçla dikey tünelden yukarı fırlıyorsun." },
        { type: "pause", ms: 1000 },
        { type: "glitch", ms: 300 },
        { type: "narrate", text: "K-6, K-5, K-2... Tüm o kabus dolu katlar altından birer birer akıp gidiyor. En sonunda, kapsül büyük bir hızla okyanusun yüzeyine fırlıyor ve suların üzerinde sallanmaya başlıyor." },
        { type: "pause", ms: 1200 },
        { type: "narrate", text: "Kapsülün kapağını açtığında yüzüne vuran ilk şey, soluk ama gerçek bir sabah güneşi ve temiz deniz havası oluyor. Telsizinden hafif bir cızırtı yükseliyor... ama bu kez sadece rüzgarın ve dalgaların sesi. Başardın. Kurtuldun." },
        { type: "system", text: "FİNAL 3/3: YÜZEYE ÇIKIŞ — SINIR-1 KABUSUNDAN İNSAN OLARAK KURTULDUN." },
        { type: "system", text: "============================================================" },
        { type: "system", text: "SINIR-1 (İSTASYON-4) — OYUN BAŞARIYLA TAMAMLANDI. TEBRİKLER!" },
        { type: "system", text: "============================================================" },
      ],
    },
  },
};

export const EP06_FLAGS = {
  oyunBitti: true,
};