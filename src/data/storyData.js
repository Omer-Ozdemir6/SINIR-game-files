export const storyData = {
  // --- PERDE 1: UYANIŞ ---
  intro_kriyojenik: {
    title: "Kriyojenik Oda - Deney Bölümü",
    description: "Gözlerini açıyorsun. Ağzındaki plastik tadı ve ciğerlerindeki soğuk hava, bir kapsülden yeni uyandığını söylüyor. Etraf karanlık. Sadece terminal ekranının titrek yeşil ışığı odadaki yoğun sisi aydınlatıyor. Kafan darmadağın; kimsin, burası neresi, hatırlamıyorsan. Tek hissettiğin şey, buradan çıkman gerektiği.",
    status: { label: "Hafıza: Kayıp", color: "error" },
    pulse: 80,
    options: [
      { text: "Terminal ekranını incele.", nextNode: "belge_terminal" },
      { "text": "Karanlık köşedeki masayı ara.", "nextNode": "masa_arama" }
    ]
  },

  belge_terminal: {
    title: "Terminal Ekranı",
    description: "[SİSTEM UYARISI: ACİL DURUM TAHLİYESİ]\n\nSektör 3'teki sızıntı kontrol altına alınamadı. Havalandırma sistemine biyolojik ajan karışma riski: %84. Tüm personel karantina prosedürlerini uygulayarak yüzeye tahliye edilmelidir. Denek odaları kalıcı olarak kilitlenmiştir.",
    status: { label: "Tehlike: Sızıntı", color: "warning" },
    pulse: 95,
    options: [
      { text: "Geri dön ve odayı kontrol et.", nextNode: "intro_kriyojenik" },
      { text: "Odadan çıkmak için koridor kapısını zorla.", nextNode: "kapi_kilitli" }
    ]
  },

  masa_arama: {
    title: "Paslı Çelik Masa",
    description: "Masanın üzerinde kırık tüpler ve kurumuş siyah bir sıvı var. Çekmeceyi çekiyorsun; içinden eski bir el feneri ve üzerinde 'Echo Corp.' amblemi olan boş bir Not Defteri (Notebook) çıkıyor. En azından artık karanlıkta değilsin.",
    status: { label: "Fener: Alındı", color: "success" },
    pulse: 85,
    inventoryAdd: "El Feneri",
    options: [
      { text: "Koridor kapısına yönel.", nextNode: "kapi_kilitli" }
    ]
  },

  kapi_kilitli: {
    title: "Ağır Çelik Kapı",
    description: "Kapı sımsıkı kapalı. Yanındaki panelde 'GÜÇ YOK' uyarısı yanıp sönüyor. Kabloları takip ettiğinde, koridorun solundaki Jeneratör Odası'na giden bir hat görüyorsun. İçeriden derin bir uğultu geliyor.",
    status: { label: "Hedef: Güç Aktarımı", color: "warning" },
    pulse: 90,
    options: [
      { text: "Jeneratör Odası'na gir.", nextNode: "jenerator_odasi" }
    ]
  },

  jenerator_odasi: {
    title: "Jeneratör ve Basınç Odası",
    description: "Burası devasa borularla dolu. Duvarda paslı bir teknisyen notu asılı. Kapının jeneratörünü devreye sokmak için üç ana vananın basıncını doğru sıralamayla dengelemen gerekiyor.",
    status: { label: "Bulmaca: Vana Sıralaması", color: "info" },
    pulse: 90,
    options: [
      { text: "Duvardaki teknisyen notunu oku.", nextNode: "belge_teknisyen" },
      { text: "Vanaları çevirmeyi dene (Bulmaca).", nextNode: "bulmaca_vana" }
    ]
  },

  belge_teknisyen: {
    title: "Teknisyenin Yırtık Notu",
    description: "[JENERATÖR ODASI BASINÇ SIRALAMASI]\n\nVanaların basınç sırasını unutmama adına buraya kaydediyorum: Önce Merkez Hidrolik (2), sonra Egzoz (1) ve en son Ana Vana (3)... Enfekte olanlar yukarıdaki borularda yürümeye başladı, sesleri duyuyorum. Güç kesilirse filtreler durur, hepimiz ölürze--",
    status: { label: "İpucu Alındı", color: "success" },
    pulse: 105,
    options: [
      { text: "Vanaların başına geç.", nextNode: "bulmaca_vana" }
    ]
  },

  bulmaca_vana: {
    title: "Basınç Kontrol Paneli",
    description: "Karşında üç adet vana duruyor: [Vana 1: Egzoz], [Vana 2: Merkez], [Vana 3: Ana]. Doğru sırayla çevirmelisin.",
    status: { label: "Sıralama Bekleniyor", color: "info" },
    pulse: 100,
    options: [
      { text: "Sıralama: 2 -> 1 -> 3", nextNode: "jenerator_basari" },
      { text: "Sıralama: 1 -> 3 -> 2", nextNode: "jenerator_hata" },
      { text: "Odayı incelemeye geri dön.", nextNode: "jenerator_odasi" }
    ]
  },

  jenerator_hata: {
    title: "Basınç Patlaması!",
    description: "Yanlış vanayı çevirdin! Borulardan sıcak bir buhar fışkırıyor ve odadaki parazitli uğultu artıyor. Nabzın hızlanıyor, sakin olmalısın.",
    status: { label: "Stres Artışı!", color: "error" },
    pulse: 130, // Nabız fırladı, stress mini-game tetiklenebilir
    options: [
      { text: "Nefes al ve tekrar dene.", nextNode: "bulmaca_vana" }
    ]
  },

  jenerator_basari: {
    title: "Güç Devrede",
    description: "Doğru sıralama! Büyük bir gürültüyle jeneratör çalışıyor. Ana koridorun üzerindeki kırmızı ışıklar yeşile dönüyor. Ama tam o sırada, arkandaki havalandırma borusundan derin bir tırmalama sesi geliyor...",
    status: { label: "Güç: Aktif", color: "success" },
    pulse: 110,
    options: [
      { text: "Hızla Ana Koridora (B03) kaç.", nextNode: "koridor_b03" }
    ]
  },

  koridor_b03: {
    title: "Koridor B03 - İlk Karşılaşma",
    description: "Koridorun sonundaki acil durum lambası ritmik bir şekilde çıtırdıyor. Lambanın her yanıp sönüşünde, yukarıdaki borulardan siyaha yakın, katran kıvamında bir sıvının zemine damladığını görüyorsun. Şıp... Şıp...\n\nTam o damlaların düştüğü karanlığın içinde bir siluet beliriyor. İnsana benziyor ama omurgası doğal olmayan bir açıyla arkaya bükülmüş. Üzerinde çürümüş bir tesis tulumu var. Sana saldırmıyor. Sadece orada durmuş, kafasını hafifçe yana eğmiş, seni İZLİYOR. Fenerini ona doğrulttuğun an, geriye sadece duvarda simsiyah bir katran lekesi kalıyor.",
    status: { label: "Korku: Tehdit Algılandı", color: "error" },
    pulse: 140,
    options: [
      { text: "Panik yapma, derin nefes al (Sakinleş).", nextNode: "sakinlesme_odasi" },
      { text: "Koşarak Güvenlik Odası'na sığın.", nextNode: "guvenlik_odasi" }
    ]
  },

  sakinlesme_odasi: {
    title: "Nefes Kontrolü",
    description: "Gözlerini kapatıp bataklık havasının altındaki bu pas kokusunu dışarı üflüyorsun. Nabzın yavaş yavaş düzene giriyor. O şey her neyse, şu an seni öldürmek istemedi.",
    status: { label: "Stabil", color: "success" },
    pulse: 90,
    options: [
      { text: "Güvenlik Odası'na ilerle.", nextNode: "guvenlik_odasi" }
    ]
  },

  guvenlik_odasi: {
    title: "Güvenlik ve Tahliye Odası",
    description: "Kapıyı arkandan kapatıyorsun. Burası ana asansöre giden son durak. Masanın üzerinde parıldayan bir Kartlı Geçiş anahtarı ve 'Denek Raporu' başlıklı bir dosya duruyor.",
    status: { label: "Son Tahliye Noktası", color: "warning" },
    pulse: 100,
    options: [
      { text: "Denek Raporunu oku.", nextNode: "belge_denek" },
      { text: "Kartı al ve Asansör Kilidini aç (Perde Sonu).", nextNode: "perde_1_son" }
    ]
  },

  belge_denek: {
    title: "Denek Raporu #174 (Billy)",
    description: "[ECHO CORP. GİZLİ LAB]\n\nDenek 174, biyolojik ajana maruz kaldıktan sonra şiddetli hücresel deformasyon göstermeye başladı. Deride kararma ve katran benzeri sıvı salgılama mevcut. Agresyon seviyesi kontrol dışı. Enfeksiyonun yayılmaması için karantina odasında tutulmalı.",
    status: { label: "Biyolojik Kanıt", color: "error" },
    pulse: 115,
    options: [
      { text: "Kartı al ve Asansör Kilidini aç (Perde Sonu).", nextNode: "perde_1_son" }
    ]
  },

  perde_1_son: {
    title: "Perde 1 Tamamlandı",
    description: "Kartı panele okutuyorsun. Devasa hidrolik asansörün kapıları gıcırdayarak açılıyor. Kabine binip yukarı butonuna bastığında, yeraltı tesisinin o klostrofobik havası aşağıda kalıyor. Perde 2 başlıyor...",
    status: { label: "Asansör Yükseliyor...", color: "success" },
    pulse: 95,
    options: [
      { text: "Perde 2'ye Geçiş Yap (Bataklık İskelesi)", nextNode: "perde_2_baslangic" }
    ]
  }
};