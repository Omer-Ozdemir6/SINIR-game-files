export const truthScenes = {
  // --- PERDE 4: GERÇEK ---
  perde_4_baslangic: {
    title: "Telsiz Kulesi - Alt Drenaj Tünelleri",
    text: "Kulenin altındaki paslı demir merdivenlerden aşağı iniyorsun. Burası kasabanın lağım şebekesi gibi görünse de, duvarlar boyunca uzanan kalın fiber optik kablolar og askeri havalandırma boruları buranın sıradan bir tünel olmadığını kanıtlıyor.\n\nTünel ikiye ayrılıyor: Sol taraf, zayıf bir jeneratör vızıltısının geldiği [Gözlem İstasyonu: Alfa]'ya; sağ taraf ise üzerinde kalın çelik kilitler olan [Arşiv Odası]'na gidiyor.",
    mapLocation: "Sub-Tunnels",
    pulseRate: 90,
    options: [
      { text: "Gözlem İstasyonu: Alfa'ya yönel.", nextSceneId: "gozlem_istasyonu_alfa" },
      { text: "Arşiv Odası'nın kapısını zorla.", nextSceneId: "arsiv_odasi_kilitli" }
    ]
  },

  arsiv_odasi_kilitli: {
    title: "Arşiv Odası Kapısı",
    text: "Kapı elektronik bir şifreleme paneliyle kilitlenmiş. Panel ekranında 'Terminal Alfa Erişimi Gerekli' uyarısı yanıp sönüyor. Önce Gözlem İstasyonu'ndaki ana bilgisayarı bulmalısın.",
    mapLocation: "Sub-Tunnels",
    pulseRate: 95,
    options: [
      { text: "Gözlem İstasyonu: Alfa'ya git.", nextSceneId: "gozlem_istasyonu_alfa" }
    ]
  },

  // --- GÖZLEM İSTASYONU VE SES KAYDI ---
  gozlem_istasyonu_alfa: {
    title: "Gözlem İstasyonu: Alfa",
    text: "Burası kasaba halkını gizlice izlemek için kurulmuş retro-teknolojik bir gözetleme odası. Duvarlardaki ekranlarda kasabanın boş sokakları statik parazitlerle görünüyor. Masanın üzerinde eski bir makaralı teyp dönüyor. Konsolun üzerinde ise Arşiv Odası'nın şifresini içeren bir sistem logu açık.",
    mapLocation: "Observation Alfa",
    pulseRate: 95,
    options: [
      { text: "Makaralı teypteki ses kaydını dinle.", nextSceneId: "belge_ses_kaydi" },
      { text: "Konsoldan Arşiv Şifresini al ve Arşiv Odası'na yönel.", nextSceneId: "arsiv_odasi_acildi", inventoryAdd: "Arşiv Şifre Kartı" }
    ]
  },

  belge_ses_kaydi: {
    title: "Ses Kaydı Transkripti (Dr. Vance)",
    text: "[TEYP KAYDI #09 - KORUMALI FREKANS]\n\nDr. Vance: 'Bataklığın altındaki anomali biyolojik bir virüs değil! O bir frekans... İnsan beyninin evrimleşmemiş bir kısmını tetikliyor ve onları ortak bir bilince, devasa bir kovan zihnine çekiyor. Bizim laboratuvarda ürettiğimiz o 'biyolojik koruma' evrakları, gerçeği gizlemek içindi. Halk gerçeği öğrenirse kitlesel olarak bataklığa atlardı... Onları karantinaya almadık; anomaliyle aralarına set çektik. Ama set yıkılıyor.'",
    hasNotebookUpdate: true,
    notebookTitle: "Frekans ve Duvarlar",
    notebookType: "document",
    notebookText: "Biyolojik sızıntı tamamen bir maskeymiş. Amaç kasaba halkını korumak değil, anomalinin yaydığı ortak rüya frekansını dünyadan gizlemekmiş.",
    pulseRate: 115,
    options: [
      { text: "Konsoldan Arşiv Şifresini al ve Arşiv Odası'na yönel.", nextSceneId: "arsiv_odasi_acildi", inventoryAdd: "Arşiv Şifre Kartı" }
    ]
  },

  // --- ARŞİV ODASI (BÜYÜK AYDINLANMA) ---
  arsiv_odasi_acildi: {
    title: "Arşiv Odası - Proje Dosyaları",
    text: "Şifre kartını kapıdaki elektronik panele okutuyorsun. Hidrolik mekanizma tıslayarak iki yana açılıyor. İçerisi Echo Şirketi'nin tüm operasyonel geçmişini barındıran sunucu dolaplarıyla dolu. Ortadaki ana bilgisayarda 'Proje Echo Gerçek Denek Listesi' açık duruyor.",
    mapLocation: "Archive Room",
    pulseRate: 100,
    options: [
      { text: "Gerçek Denek Listesini incele.", nextSceneId: "belge_gercek_denekler" }
    ]
  },

  belge_gercek_denekler: {
    title: "Proje Echo: Gerçek Denek Listesi",
    text: "Listede kasabadan kaybolan çocukların, şerifin ve rahibin isimleri var. Hepsinin karşısında aynı not yazılı: 'Ortak rüyaya başarıyla entegre edildi. Beden stabilizasyonu bozuldu (Katran salgısı).'\n\nAncak listenin en altına kaydırdığında, kalın kırmızı harflerle işaretlenmiş bir isim görüyorsun:\n\n[DENEK #000: ELIAS (MİMAR)]\nDurum: Hafıza Katmanları Silindi. Döngünün kararlılığını içeriden test etmesi için kriyojenik kapsüle yerleştirildi. Kendini kurban sanacak şekilde programlandı.",
    hasNotebookUpdate: true,
    notebookTitle: "Kendi Kimliğim",
    notebookType: "note",
    notebookText: "Ben bir kurban değilim. Ben bu sistemi inşa eden, bu döngüyü başlatan Mimar'ım. Kendi hafızamı silip sistemi test etmek için bu kabusun içine girdim.",
    pulseRate: 130,
    options: [
      { text: "Zihinsel bir çöküşle Ana Bilgisayar Sistemine bağlan.", nextSceneId: "perde_4_final_sahne" }
    ]
  },

  perde_4_final_sahne: {
    title: "Perde 4: Sonu — Sistem Bilinci",
    text: "Karakterin (Elias) elleri titriyor. Bilgisayar ekranındaki kendi vesikalık fotoğrafına ve 'Mimar' ibaresine bakıyorsun. Sen daha olayı sindiremeden, tünellerin derinliklerindeki hoparlörlerden o ultra düşük frekanslı uğultu katlanarak artmaya başlıyor.\n\nNotebook'undaki eski 'Biyolojik Sızıntı' ve 'Enfeksiyon' başlıklarının üzeri sistem tarafından otomatik olarak çiziliyor ve yerini tek bir kırmızı başlık alıyor: ANOMALİ FREKANSI. Artık gerçeği biliyorsun. Karakterinden bir adım öndesin. Ama istasyon çökmek üzere.",
    newObjective: "Anomali frekansı tavan yaptı. İstasyon yıkılmadan önce Merkez Odası'na ulaş.",
    pulseRate: 120,
    options: [
      { text: "Perde 5'e Geçiş Yap (Çöküş Başlıyor)", nextSceneId: "perde_5_baslangic" }
    ]
  }
};