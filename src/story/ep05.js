/* ============================================================
   SINIR-1 — BÖLÜM 05: "K-2 / KOMUTA MERKEZİ" (GÜNCELLENMİŞ v3)
   Saf hikaye verisi. Koşullu şalter mekanizması ve B6 köprüsü entegre edildi.
   ============================================================ */

export const EP05 = {
  start: "n_k2_giris",
  nodes: {
    n_k2_giris: {
      checkpoint: true, cost: 0,
      events: [
        { type: "system", text: "SINIR-1 // K-2 KOMUTA MERKEZİ — YEREL SAAT 06:00" },
        { type: "objective", text: "Komuta konsolunu ele geçir ve K-1 Derinlik Kazı Alanı asansörünü aktif et." },
        { type: "narrate", text: "Asansörün çelik kapıları açılıyor. K-2 Komuta Merkezi, tüm istasyonu yukarıdan gören devasa cam panoramasıyla karşında duruyor. Camların arkası zifiri karanlık bir okyanus." },
        { type: "pause", ms: 700 },
        { type: "narrate", text: "Odanın ortasında, yüzlerce biyoterminal kablosunun doğrudan omuriliğine bağlandığı Deniz Okur oturuyor. Gözleri açık ama tamamen obsidyen siyahı parlıyor. Telsizin artık çalışmıyor; sesi doğrudan zihninde yankılanıyor." },
        { type: "system", text: "DENİZ: \"Geldin... K-3'te Konteyner 7'nin içindekini gördün. Ama burası son durak değil teknisyen. Harun ve Nevin'in benden sakladığı anahtar kodları asansörü K-1'e, o kütlenin kalbine indirmek için şart. Onları bulamadın, değil mi?\"" },
      ],
      choices: [
        { id: "konsol_zorla", text: "Deniz'in bağlı olduğu ana konsolu bypass etmeyi dene", next: "n_konsol_bypass" },
        { id: "kanit_goster", text: "Nevin'in laboratuvar diskini terminale oku", next: "n_k2_kanit_etki", if: { flag: "labKanitBulundu", equals: true } },
      ],
    },

    /* --- LABORATUVAR KANITI KONTROLÜ --- */
    n_k2_kanit_etki: {
      cost: 2,
      events: [
        { type: "narrate", text: "Nevin'in laboratuvardan aldığın veri diskini ana terminale takıyorsun. Ekranda Nevin'in son yazdığı kilit açma protokolü parlıyor. Deniz'in omuriliğine bağlı kablolardan mavi kıvılcımlar çakıyor, acıyla bağırıyor!" },
        { type: "flag", set: { k2BypassKolay: true } },
        { type: "stat", stat: "akil", delta: 10, note: "DENİZ'İN ZİHİNSEL BASKISI KIRILDI" },
      ],
      choices: [{ id: "ilerle", text: "K-1 Asansör şalterine ilerle", next: "n_k2_salter_kolay" }],
    },

    /* --- MANUEL BYPASS BULMACASI --- */
    n_konsol_bypass: {
      cost: 3,
      events: [
        { type: "narrate", text: "Kanıtın yok ama soğukkanlılığını koruyarak terminale gömülüyorsun. Deniz zihnini bulandırmak için çocuk sesli o gerisayımı frekanstan tekrar başlatıyor." },
        { type: "system", text: "K-2 BYPASS KODUNU GİR (Kod: 2147)" },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_k2_salter_normal", cancel: "n_k2_giris" },
    },

    /* --- REAKTÖR / ASANSÖR ŞALTER ETKİLEŞİMLERİ (DİNAMİK SÜRE AYRIMI) --- */
    n_k2_salter_kolay: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Komuta merkezinin altındaki gizli hidrolik şalter yükseliyor. Nevin'in bypass protokolü sayesinde mekanizma gevşemiş durumda." },
        { type: "system", text: "K-1 KİLİDİNİ AÇMAK İÇİN ŞALTERİ AŞAĞI ÇEK — BASILI TUT (KOLAYLAŞTIRILDI)" },
      ],
      interaction: { 
        kind: "lever", 
        holdMs: 1500, 
        success: "n_k2_asansor_aktif", 
        cancel: "n_k2_giris" 
      },
    },

    n_k2_salter_normal: {
      checkpoint: true, cost: 2,
      events: [
        { type: "narrate", text: "Komuta merkezinin altındaki gizli hidrolik şalter yükseliyor. Sistem kilitli olduğu için mekanizma inanılmaz sert ve direnç gösteriyor." },
        { type: "system", text: "K-1 KİLİDİNİ AÇMAK İÇİN ŞALTERİ AŞAĞI ÇEK — BASILI TUT (SİSTEM DİRENİYOR)" },
      ],
      interaction: { 
        kind: "lever", 
        holdMs: 3500, 
        success: "n_k2_asansor_aktif", 
        cancel: "n_k2_giris" 
      },
    },

    /* --- BÖLÜM ÇIKIŞI VE GEÇİŞ --- */
    n_k2_asansor_aktif: {
      checkpoint: true, cost: 0, // ending: true kaldırıldı!
      events: [
        { type: "system", text: "K-2 SİSTEMLERİ KAPATILDI — K-1 ASANSÖRÜ DEVREDE" },
        { type: "narrate", text: "Şalter yerine oturuyor. Komuta merkezindeki tüm ışıklar, Deniz'in ekranları ve panoramik camların projektörleri aynı anda sönüyor. İstasyon tam bir sessizliğe gömülüyor." },
        { type: "pause", ms: 800 },
        { type: "narrate", text: "Deniz'in bedeni kablolardan ayrılıp yere yığılırken, zihnindeki ses son bir kez fısıldıyor: 'Gidiyorsun demek... En dibe. O kütlenin kalbine. Oraya inen hiç kimse yukarıya bir daha insan olarak çıkamadı teknisyen...'" },
        { type: "pause", ms: 900 },
        { type: "system", text: "K-2 KOMUTA MERKEZİNDEN ÇIKILDI — ASANSÖR EN DİBE, K-1 KATINA İNİYOR" },
        { type: "objective", text: "BÖLÜM SONU. BÖLÜM 6: K-1 DERİNLİK KAZI ALANI (FİNAL) KATINA GEÇİLİYOR." },
      ],
      choices: [
        {
          id: "final_bolum_gecis",
          text: "K-1 Derinlik Kazı Alanı'na İniş Yap (Final)",
          next: "n_k1_final_giris" // Bölüm 6 dosyasının başlangıç node ID'si
        }
      ]
    },
  },
};

export const EP05_FLAGS = {
  k2BypassKolay: false
};