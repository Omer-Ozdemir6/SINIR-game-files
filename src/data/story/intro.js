export const introScenes = {
  // --- PERDE 1: TESİS VE İLK UYANIŞ ---
  intro_awakening: {
    title: "Kriyojenik Kapsül - Laboratuvar 04",
    text: "Gözlerini açtığında yüzüne çarpan ilk şey dondurucu bir soğuk ve yüzeyini kaplayan yapışkan bir sıvı oluyor. Kapsülün cam kapağı tıslayarak yukarı doğru kalkıyor. Hafızan bomboş; adının Elias olduğunu göğsündeki yırtık kimlik kartından okuyorsun. Odadaki acil durum ışıkları kırmızı renkte dönüyor ve uzaklardan mekanik bir alarm sesi geliyor.",
    mapLocation: "Cryo Lab 04",
    pulseRate: 75,
    options: [
      { text: "Kapsülden dışarı adım at ve odayı incele.", nextSceneId: "laboratuvar_inceleme" }
    ]
  },

  laboratuvar_inceleme: {
    title: "Laboratuvar 04 - Detaylar",
    text: "Yerde kırık tüpler ve donmuş sıvı birikintileri var. Terminal ekranında 'SİSTEM KRİTİK HATA - GÜÇ KAYNAĞI DEVRE DIŞI' uyarısı yanıp sönüyor. Masanın üzerinde Dr. Arlo Vance adına düzenlenmiş bir günlük duruyor.",
    mapLocation: "Cryo Lab 04",
    pulseRate: 80,
    options: [
      { text: "Masadaki Dr. Vance'in günlüğünü oku.", nextSceneId: "belge_vance_gunluk" },
      { text: "Ağır çelik kapıyı zorlayarak koridora çık.", nextSceneId: "ana_koridor_1" }
    ]
  },

  belge_vance_gunluk: {
    title: "Dr. Vance'in Laboratuvar Günlüğü",
    text: "[KAYIT NO: 742]\n\n'Denek #000 üzerinde yaptığımız hafıza silme işlemi başarılı oldu. Ancak bataklıktan gelen o düşük frekanslı sinyal, tesisin alt katmanlarına kadar sızıyor. Karantina duvarları yetersiz kalabilir. Eğer uyanırsa, ona buranın bir biyolojik araştırma merkezi olduğunu söyleyen sahte protokolleri devreye sokmalıyız.'",
    hasNotebookUpdate: true,
    notebookTitle: "Dr. Vance'in Gizli Günlüğü",
    notebookType: "document",
    notebookText: "Tesiste bir şeyler ters gitmiş. Biyolojik laboratuvar maskesinin altında başka bir şeyler dönüyor olabilir. Hafızam kasten silinmiş.",
    pulseRate: 95,
    options: [
      { text: "Not defterini kapat ve ana koridora çık.", nextSceneId: "ana_koridor_1" }
    ]
  },

  ana_koridor_1: {
    title: "Tesis Ana Koridoru",
    text: "Uzun, metal panellerle kaplı bir koridor. Tavan lambaları parazit yaparak göz kırpıyor. Koridor ikiye ayrılıyor: Sol taraf ağır bir hidrolik kapıyla kapatılmış ve üzerinde 'Jeneratör Odası' yazıyor. Sağ taraf ise 'Telsiz Odası' tabelasını taşıyor ama telsiz odasına giden yol kalın bir parazit bulutu (Sarı Sis) ile kaplı.",
    mapLocation: "Main Corridor",
    pulseRate: 85,
    options: [
      { text: "Gücü geri getirmek için Jeneratör Odası'na gir.", nextSceneId: "jenerator_odasi" },
      { text: "Sarı sisin içine girmeyi dene.", nextSceneId: "sis_hata" }
    ]
  },

  sis_hata: {
    title: "Zehirli Sarı Sis",
    text: "Sisin içine adım attığın an ciğerlerin yanmaya başlıyor ve yoğun bir baş dönmesi yaşıyorsun. Kalp atışların hızla yükseliyor. Jeneratörü çalıştırıp havalandırma sistemini devreye sokmadan buradan geçiş imkansız.",
    stressModifier: 15,
    pulseRate: 110,
    options: [
      { text: "Öksürerek geri çekil ve Jeneratör Odası'na yönel.", nextSceneId: "jenerator_odasi" }
    ]
  },

  jenerator_odasi: {
    title: "Ana Jeneratör Dairesi",
    text: "Devasa dizel motor sessizliğe gömülmüş. Kontrol panelinde üç adet sigorta şalteri aşağı inmiş durumda. Havalandırmayı ve ana kapıları açmak için bu şalterleri doğru kombinasyonla kaldırmalısın.",
    mapLocation: "Generator Room",
    pulseRate: 90,
    options: [
      { text: "Jeneratör şalterlerini kaldırmayı dene (Bulmaca).", nextSceneId: "bulmaca_jenerator" }
    ]
  },

  bulmaca_jenerator: {
    title: "Şalter Kombinasyonu",
    text: "Panelde Sol, Orta ve Sağ olmak üzere üç şalter var. Doğru voltaj dengesini bulmalısın.",
    pulseRate: 95,
    puzzle: {
      type: "voltage_balance",
      correctSequence: ["Sol", "Sağ", "Orta"],
      nextSceneId: "jenerator_basari",
      failSceneId: "jenerator_hata"
    }
  },

  jenerator_hata: {
    title: "Yüksek Voltaj Patlaması!",
    text: "Yanlış kombinasyon! Panelden kıvılcımlar fışkırıyor ve parmaklarını hafifçe yakıyorsun. Tesisin derinliklerinden mekanik bir inleme sesi geliyor, sanki bir şeyler sese doğru yaklaşıyor.",
    stressModifier: 10,
    pulseRate: 115,
    options: [
      { text: "Tekrar dene ve dikkatli ol.", nextSceneId: "bulmaca_jenerator" }
    ]
  },

  jenerator_basari: {
    title: "Güç Sağlandı - Havalandırma Aktif",
    text: "Doğru şalterler oturdu! Devasa motor gürleyerek çalışmaya başlıyor. Havalandırma fanlarının dönme sesiyle birlikte koridordaki o boğucu sarı sis hızla emiliyor. Artık Telsiz Odası'na giden yol temiz.",
    pulseRate: 80,
    options: [
      { text: "Jeneratör odasından çık ve Telsiz Odası'na ilerle.", nextSceneId: "telsiz_odasi" }
    ]
  },

  telsiz_odasi: {
    title: "Telsiz ve Ana İletişim Merkezi",
    text: "Konsolun üzerindeki ekranlar yeşil parazitlerle açılıyor. Masada duran ana mikrofon aktif hale geliyor. Dış dünyaya acil durum sinyali gönderebilmek ve ana asansörü yukarı çağırabilmek için buradan bir çıkış frekansı tetiklemelisin.",
    mapLocation: "Radio Room",
    pulseRate: 85,
    options: [
      { text: "Ana konsolu çalıştır ve yardım sinyali gönder.", nextSceneId: "sinyal_gonderildi" }
    ]
  },

  sinyal_gonderildi: {
    title: "Sinyal Gönderildi - Telsiz Yanıtı",
    text: "Frekans modülü kilitleniyor ve dışarıya sinyal gidiyor. Tam o esnada hoparlörden cızırtılı, panik dolu bir kadın sesi yükseliyor:\n\n'Elias? Orada mısın? Aman Tanrım, yaşadığını biliyordum! Ben Sara. Tesisin altındaki asansör kilidini açtım. Yukarı, bataklık iskelesine çık. Seni kasabanın dışındaki güvenli bölgede bekliyorum. Acele et, sistem çöküyor!'",
    newObjective: "Ana asansöre ulaş ve yüzeye, bataklık iskelesine çık.",
    pulseRate: 100,
    options: [
      { text: "Asansör koridoruna doğru koş.", nextSceneId: "asansor_platformu" }
    ]
  },

  asansor_platformu: {
    title: "Ana Tahlique Asansörü",
    text: "Kolları paslanmış devasa endüstriyel asansör seni bekliyor. Arkandaki laboratuvar kapılarından gelen o ritmik uğultu şiddetlenirken asansörün kabinine biniyor ve yukarı yönlü kolu çekiyorsun. Kabin gıcırdayarak yüzeye, bilinmezliğe doğru yükselmeye başlıyor.",
    pulseRate: 110,
    options: [
      { text: "Perde 2'ye Geçiş Yap (Yüzeye Çıkış)", nextSceneId: "perde_2_baslangic" }
    ]
  }
};