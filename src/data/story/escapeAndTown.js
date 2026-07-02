export const escapeAndTownScenes = {
  // --- PERDE 2: KAÇIŞ ---
  perde_2_baslangic: {
    title: "Bataklık İskelesi - Çıkış Platformu",
    text: "Asansörün devasa çelik kapıları ağır metal gıcırtılarıyla iki yana açılıyor. Yüzüne çarpan ilk şey, yeraltının kimyasal kokusu değil; çürümeye yüz tutmuş bitkilerin, yosunların ve ağır nemin kokusu oluyor. Yoğun, sarımsı bir sis tabakası iskelenin üzerini kaplamış. Burası Louisiana bataklıklarının tam kalbi. Dış dünyayla tek bağlantın, sisin içinde kaybolan ahşap bir iskele yolu.",
    mapLocation: "Swamp Dock",
    batteryDrain: 5,
    pulseRate: 90,
    options: [
      { text: "İskelenin sonundaki kontrol kulübesine ilerle.", nextSceneId: "kontrol_kulubesi" }
    ]
  },

  kontrol_kulubesi: {
    title: "İskele Kontrol Kulübesi",
    text: "Kulübenin camları bataklık çamuruyla kaplanmış. İçeride eski bir kısa dalga telsiz ünitesi parazit yapıyor. Masanın üzerinde askeri mühürlü bir dosya ve frekans ayar şeması duruyor. Kasaba sınır kapısını açmak için telsiz sinyalini doğru frekansa sabitlemelisin.",
    mapLocation: "Control Cabin",
    pulseRate: 95,
    options: [
      { text: "Masadaki askeri telsiz logunu oku.", nextSceneId: "belge_telsiz_log" },
      { text: "Telsiz frekansını ayarlamayı dene (Bulmaca).", nextSceneId: "bulmaca_frekans" }
    ]
  },

  belge_telsiz_log: {
    title: "Askeri Telsiz Kaydı Transkripti",
    text: "[TELSİZ LOGU - KESİNTİ ÖNCESİ SON KAYIT]\n\n'Merkez, sesimi duyuyor musunuz? Karantina hattı yarıldı. Dağıttığınız ilaçlar işe yaramıyor, sivil agresyon artıyor. Kasaba halkı sınır kapısına dayandı, içeri sığınmak istiyorlar. Virüsün bataklık dışına yayılmasını önlemek için gerekirse ateş açacağız... Tanrı bizi affetsin.'",
    hasNotebookUpdate: true,
    notebookTitle: "Karantina İhlal Raporu",
    notebookType: "document",
    notebookText: "Askeri birlikler, enfeksiyonun yayılmasını önlemek için kasaba sınır kapısında sivillere müdahale etmiş. İlaçlar başarısız olmuş.",
    pulseRate: 110,
    options: [
      { text: "Telsiz ünitesine geri dön.", nextSceneId: "bulmaca_frekans" }
    ]
  },

  bulmaca_frekans: {
    title: "Frekans Ayar Paneli",
    text: "Telsizin üzerindeki kadranı çevirerek askeri tahlis frekansını bulmalısın. Şemadaki parazit kırılma noktası 94.2 MHz olarak görünüyor.",
    showRadioTuner: true,
    pulseRate: 100,
    puzzle: {
      type: "frequency_tuner",
      targetFrequency: 94.2,
      nextSceneId: "frekans_basari",
      failSceneId: "frekans_hata"
    }
  },

  frekans_hata: {
    title: "Yoğun Parazit",
    text: "Yanlış frekans. Telsizden kulak tırmalayıcı bir statik cızırtı yükseliyor. Bu cızırtıyla birlikte, kulübenin hemen altındaki bataklık suyundan *Lıkır... Lıkır...* diye bir ses geliyor. Bir şey iskelenin ayaklarına sürtünüyor.",
    stressModifier: 20,
    pulseRate: 125,
    options: [
      { text: "Sakinleş ve frekansı yeniden ayarla.", nextSceneId: "bulmaca_frekans" }
    ]
  },

  frekans_basari: {
    title: "Sinyal Yakalandı - Kapı Kilidi Açıldı",
    text: "94.2 MHz. Parazit anında kesiliyor. Telsizden mekanik bir onay sesi geliyor: 'Karantina Hattı-A kapı kilidi devre dışı bırakıldı.' Kulübenin penceresinden dışarı baktığında, bataklık yolunun sonundaki devasa çelik barikat kapısının ağır ağır yukarı doğru kalktığını görüyorsun.",
    pulseRate: 90,
    options: [
      { text: "Kulübeden çık ve Karantina Kapısına doğru yürü.", nextSceneId: "karantina_kapisi_on" }
    ]
  },

  karantina_kapisi_on: {
    title: "Karantina Sınır Kapısı",
    text: "Kapı tamamen açılmış. Yerde yüzlerce boş kovan, terk edilmiş sedyeler og üzerinde devasa sarı harflerle 'BIOHAZARD - DO NOT ENTER' yazan tabelalar var. Güvenlik kulübesinin duvarına çivilenmiş bir kağıt parçası rüzgarda sallanıyor. Dr. Arlo Vance'e ait bir imza var.",
    pulseRate: 100,
    options: [
      { text: "Dr. Vance'in nihai notunu oku.", nextSceneId: "belge_vance_tahliye" },
      { text: "Kapıyı geç ve sisin içine adım at.", nextSceneId: "perde_2_final_sahne" }
    ]
  },

  belge_vance_tahliye: {
    title: "Dr. Arlo Vance - Nihai Tahliye Notu",
    text: "[PROJE TAHLİYE RAPORU]\n\n'Panzehir sentezi kesin olarak başarısız oldu. Blackwater Bayou tamamen enfekte. Kayıpları kontrol altında tutmak imkansız. Kapıları mühürleyip bataklığı ve bu lanetli kasabayı arkamızda bırakıyoruz. Tanrı geride kalanları korusun.'",
    hasNotebookUpdate: true,
    notebookTitle: "Dr. Vance'in İtirafı",
    notebookType: "note",
    notebookText: "Dr. Vance panzehirin başarısız olduğunu ve tüm kasabayı enfeksiyonla baş başa bırakıp tahliye olduklarını yazmış.",
    pulseRate: 105,
    options: [
      { text: "Belgeyi cebine koy ve sınır kapısından dışarı çık.", nextSceneId: "perde_2_final_sahne" }
    ]
  },

  perde_2_final_sahne: {
    title: "Perde 2: Sonu — Blackwater Kasabası",
    text: "Karantina kapısının sınırını geçtiğin an, arkandaki hidrolik mekanizma büyük bir gürültüyle kapanıyor. Artık yeraltı tesisine dönmenin hiçbir yolu yok.\n\nBataklığın o yoğun, boğucu sarı sisi aniden dağılmaya başlıyor. Ve tam karşına bakıyorsun...\n\nSisin arkasından, bataklığın üzerine kazıklarla inşa edilmiş eski ahşap evler, pencereleri tahtalarla çivilenmiş dükkanlar ve eski bir kilise kulesi yükseliyor. Sokaklar bomboş. Tamamen sessiz. İçinden 'Sonunda kurtuldum, başardım' derken, tabelayı görüyorsun: 'Welcome to Blackwater'.\n\nLaboratuvardan kaçtın. Ama asıl kabusun tam merkezine yeni adım attın. Oyun yeni başlıyor.",
    newObjective: "Kasabayı araştır ve buradaki kayıpların arkasındaki gerçek bağı bul.",
    pulseRate: 85,
    options: [
      { text: "Perde 3'e Geçiş Yap (Kasaba Meydanı)", nextSceneId: "perde_3_kasaba_meydanı" }
    ]
  },

  // --- PERDE 3: KASABA ---
  perde_3_kasaba_meydanı: {
    title: "Blackwater Kasaba Meydanı",
    text: "Kasabanın merkezindesin. Ayaklarının altındaki ahşap iskeleler bataklık suları yükseldikçe gıcırdıyor. Yoğun sisin arkasında üç ana yapı seçebiliyorsun:\n\nSol tarafta pencereleri demirli [Şerif Ofisi], sağ tarafta siluetiyle göğe yükselen [Eski Kilise] ve tam karşıda, tepede duran devasa [Telsiz Kulesi]. Telsiz kulesine giden yol zincirli bir kapayla kilitlenmiş; bir asma kilit var.",
    mapLocation: "Town Square",
    pulseRate: 80,
    options: [
      { text: "Şerif Ofisi'ne gir.", nextSceneId: "serif_ofisi" },
      { text: "Eski Kilise'ye doğru ilerle.", nextSceneId: "eski_kilise" },
      { text: "Telsiz Kulesi kapısını incele.", nextSceneId: "telsiz_kapisi_kilitli" }
    ]
  },

  telsiz_kapisi_kilitli: {
    title: "Telsiz Kulesi Giriş Kapısı",
    text: "Kapı kalın zincirlerle bağlanmış ve üzerinde ağır bir asma kilit var. Kilidin üzerinde 'B.P.D.' (Blackwater Police Dept.) ibaresi kazınmış. Bu kilidi açmak için bir anahtar ya da maymuncuk aleti bulmalısın.",
    mapLocation: "Tower Gate",
    pulseRate: 85,
    options: [
      { text: "Kasaba meydanına geri dön.", nextSceneId: "perde_3_kasaba_meydanı" }
    ]
  },

  serif_ofisi: {
    title: "Blackwater Şerif Ofisi",
    text: "İçerisi darmadağın. Masaların üzerindeki kahve fincanları küflenmiş, evraklar yerlere saçılmış. Duvarlarda kayıp insanlara ait ilanlar var: 'Thomas Vance - 12 Yaşında, Kayıp', 'Mary Miller - Kayıp'... Masanın çekmecesinde paslı bir [Maymuncuk Seti] duruyor. Ayrıca şerifin masasındaki açık dosyada eski bir şikayet raporu var.",
    mapLocation: "Sheriff Office",
    pulseRate: 90,
    options: [
      { text: "Şerifin masasındaki eski şikayet dosyasını oku.", nextSceneId: "belge_serif_sikayet" },
      { text: "[Maymuncuk Seti]'ni al ve meydana dön.", nextSceneId: "meydan_maymuncuk_alindi", inventoryAdd: "Maymuncuk Seti" }
    ]
  },

  belge_serif_sikayet: {
    title: "Eski Bir Şikayet Dosyası (Yıl: 1965)",
    text: "[KAYIT NO: 65-109]\n\n'Kasaba sakinlerinden Mary, oğlu Thomas'ın geceleri uykusunda yürüyerek bataklığa gittiğini ve suyun kenarında durup saatlerce 'aşağıdaki o ritmik uğultuyu' dinlediğini söylüyor. Thomas'ın odasında yaptığımız aramada duvara kazınmış tuhaf geometrik şekiller ve siyah katran lekeleri bulduk. Bu bu ayki 4. vaka. Tesisin kurulmasından yıllar önce de burası tekinsizdi.'",
    hasNotebookUpdate: true,
    notebookTitle: "1965 Tarihli Şerif Raporu",
    notebookType: "document",
    notebookText: "Şok edici veri: Katran ve uyurgezerlik vakaları, yeraltı laboratuvarı kurulmadan (1974) tam 9 yıl önce de kasabada yaşanıyormuş!",
    pulseRate: 110,
    options: [
      { text: "[Maymuncuk Seti]'ni al ve meydana dön.", nextSceneId: "meydan_maymuncuk_alindi", inventoryAdd: "Maymuncuk Seti" }
    ]
  },

  meydan_maymuncuk_alindi: {
    title: "Blackwater Kasaba Meydanı (Maymuncuklu)",
    text: "Cebinde ağır bir maymuncuk setiyle yeniden meydandasın. Sis giderek yoğunlaşıyor. Kilise tarafındaki ağaçların arasından bir çıtırtı geldi.",
    mapLocation: "Town Square",
    pulseRate: 95,
    options: [
      { text: "Eski Kilise'ye gir.", nextSceneId: "eski_kilise_maymuncuklu" },
      { text: "Telsiz Kulesi kapısına gidip kilidi açmayı dene.", nextSceneId: "bulmaca_lockpick" }
    ]
  },

  eski_kilise: {
    title: "Eski Ahşap Kilise",
    text: "İçerideki sıralar devrilmiş, vitraylar kırılmış. Kürsünün üzerinde kalın, tozlu bir defter açık duruyor: Rahibin Günlüğü. Kilisenin derinliklerinden, bataklığın altından gelen o ritmik uğultunun sesi burada çok daha net duyuluyor. *Güm... Güm...*",
    mapLocation: "Old Church",
    pulseRate: 100,
    options: [
      { text: "Rahibin günlüğünü oku.", nextSceneId: "belge_rahip_gunluk" },
      { text: "Meydana geri dön.", nextSceneId: "perde_3_kasaba_meydanı" }
    ]
  },

  eski_kilise_maymuncuklu: {
    title: "Eski Ahşap Kilise",
    text: "İçerideki sıralar devrilmiş, vitraylar kırılmış. Kürsünün üzerinde kalın, tozlu bir defter açık duruyor: Rahibin Günlüğü. Kilisenin derinliklerinden gelen o uğultu maymuncuk sesleriyle birleşiyor.",
    mapLocation: "Old Church",
    pulseRate: 100,
    options: [
      { text: "Rahibin günlüğünü oku.", nextSceneId: "belge_rahip_gunluk_maymuncuklu" },
      { text: "Meydana geri dön.", nextSceneId: "meydan_maymuncuk_alindi" }
    ]
  },

  belge_rahip_gunluk: {
    title: "Rahibin Günlüğü (Yıl: 1974)",
    text: "[NİSAN 1974]\n\n'Devlet adamları bataklığın kalbine devasa demir yapılar inşa etmeye başladı. Bize bunun bir biyolojik laboratuvar olduğunu, bir paraziti inceleyeceklerini söylediler. Yalan söylüyorlar! Onlar buraya bataklığın altındaki o kadim 'Uğultu'yu zapt etmek, onu duvarların arkasına hapsetmek için geldiler. Laboratuvar felaketi başlatan değil, onu gizlemeye çalışan çaresiz bir kale!'",
    hasNotebookUpdate: true,
    notebookTitle: "Rahibin Günlüğü",
    notebookType: "note",
    notebookText: "GERÇEK: Echo Corp. biyolojik sızıntı yapmadı. Bataklığın altındaki kadim anomalinin frekansını dünyadan gizlemek ve zapt etmek için o tesisi üzerine kurdular. Her şey bir aldatmacaydı.",
    pulseRate: 120,
    options: [
      { text: "Dehşet içinde meydana geri dön.", nextSceneId: "perde_3_kasaba_meydanı" }
    ]
  },

  belge_rahip_gunluk_maymuncuklu: {
    title: "Rahibin Günlüğü (Yıl: 1974)",
    text: "[NİSAN 1974]\n\n'Devlet adamları bataklığın kalbine devasa demir yapılar inşa etmeye başladı... Laboratuvar felaketi başlatan değil, onu gizlemeye çalışan çaresiz bir kale!'",
    hasNotebookUpdate: true,
    notebookTitle: "Rahibin Günlüğü",
    notebookType: "note",
    notebookText: "GERÇEK: Echo Corp. biyolojik sızıntı yapmadı. Bataklığın altındaki kadim anomalinin frekansını dünyadan gizlemek ve zapt etmek için o tesisi üzerine kurdular.",
    pulseRate: 120,
    options: [
      { text: "Dehşet içinde meydan geri dön.", nextSceneId: "meydan_maymuncuk_alindi" }
    ]
  },

  bulmaca_lockpick: {
    title: "Telsiz Kapısı - Kilit Patlatma",
    text: "Maymuncuk aletlerini çıkarıyorsun. Kilidin pimlerini sırasıyla oturtman gerek. Yanlış bir hamle aleti kırabilir ve dikkat çekebilir.",
    mapLocation: "Tower Gate",
    pulseRate: 105,
    puzzle: {
      type: "lockpick",
      nextSceneId: "telsiz_kulesi_ici",
      failSceneId: "lockpick_hata"
    }
  },

  lockpick_hata: {
    title: "Metal Sesi!",
    text: "Alet pime sertçe çarptı ve *ÇINK* diye bir ses çıkardı. Ses bataklıkta yankılandı. Hemen arkandaki sisin içinden, kafası yana eğik bir siluetin (Değişmiş) seni izlediğini fark ettin. Sana doğru bakıyor ama saldırmıyor. Sadece nefes alıyor.",
    stressModifier: 25,
    pulseRate: 135,
    options: [
      { text: "Sakinleş (Nefes Al) ve tekrar dene.", nextSceneId: "bulmaca_lockpick" }
    ]
  },

  telsiz_kulesi_ici: {
    title: "Telsiz Kulesi - Kontrol Odası",
    text: "Kilidi patlatıp kapıyı arkandan kapatıyorsun. Kulenin tepesindeki kontrol paneline ulaştın. Jeneratörü çalıştırdığında ana konsol yeşil parazitlerle canlanıyor. Hoparlörden hışırtılı bir ses geliyor:\n\n'Elias?... Sesimi duyuyor musun? Tanrım, ordasın... Ben Sara. Kasabanın dışındaki güvenli sığınaktayım. Ama gitmeden önce alt tünellerdeki gerçek kayıtları bulmalısın...'",
    newObjective: "Tünellere in ve anomaliye dair gizli kayıtları topla.",
    pulseRate: 90,
    options: [
      { text: "Sara'yı dinle ve Kulenin Alt Tünellerine in (Perde 4).", nextSceneId: "perde_4_baslangic" }
    ]
  }
};