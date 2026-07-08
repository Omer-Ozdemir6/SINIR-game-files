/* ============================================================
   SECTOR-1 — CHAPTER 2: "K-5 / THE EXAM" (v4 — PERISHED DREAD & TABLET LIGHT MECHANIC)
   Floor Owner: DENİZ OKUR — The engineer speaking through the system.

   STRUCTURE & ATMOSPHERE (PERISHED psychological realism):
   · n_hub: branches into four directions; the player CHOOSES the order of the exams.
   · The player has NO NIGHT VISION or visor. Only a TABLET.
   · The tablet's screen light (or its flashlight) is the sole light source; when its battery dies, absolute darkness and death are inevitable.
   · The narrative tone is built on helplessness, heavy psychological tension, shortness of breath, bodily terror, and claustrophobic pressure.
   · Code structure, flags, and interactions are preserved; texts, announcements, and descriptions now follow PERISHED's own brutality and closed-station atmosphere.
   ============================================================ */

export const EP02 = {
  nodes: {

    /* ================= INTRODUCTION — THE LOCKED FLOOR ================= */

    n_k5_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k5_sinir_dread" },
        { type: "system", text: "FLOOR: K-5 — LIFE SUPPORT · THE BRINK OF DEATH · WATER AND BLOOD CYCLE" },
        { type: "narrate", text: "The moment you step off the stairs, the air filling your lungs grows heavy with the stench of rust, mildew, and rotting flesh. K-5 is like the inside of a massive beast; pipes throb violently, filters hiss with a choking wheeze, and ceiling shafts gape open like mouths waiting to sink dark teeth into your flesh." },
        { type: "narrate", text: "You take three trembling steps forward. Suddenly, the heavy steel door behind you slams shut with such force that the shockwave violently strikes your back. The sound of the lock clicking into place: CLICK. CLICK. Like a rat caught in a trap, this place is a testing ground, and you are merely a victim whose death throes are meant to be watched." },
        { type: "narrate", text: "The only thing tearing through the darkness is the raw, white screen light of the tablet trembling between your fingers. This light doesn't save you; it illuminates your face like a beacon, showing the things hunting you exactly where you are. The battery bar blinks slowly." },
        { type: "waitTap" },
        { type: "glitch", ms: 300 },
        { type: "anons", text: "「There you are... Fresh, living meat. I am Deniz. I am both the god of this labyrinth and its butcher. Every door, every blind camera, every rusty speaker is my eye, my tongue. And you... you are just a new toy I hope will squirm a little longer.」" },
        { type: "anons", text: "「The rules are painfully simple: there are three brutal lessons on this floor. Each lesson will grant you a KEYCARD PIECE that you must pluck out of your own flesh. If you don't combine the three with your bloody fingers and slot them into the exit door, you will rot here. The choice is yours, watching which agony you will start with takes my breath away...」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "objective", text: "Collect the three keycard pieces." },
        { type: "note", id: "not_deniz", title: "Deniz Okur — The Warden of My Cell", text: "That psychopath spewing saliva over the loudspeaker: Deniz. The systems engineer. The doors, the cameras, every death trap here is at his fingertips. He threw me into these sewer-scented corridors like a lab rat. The twisted amusement in his voice is far more terrifying than pure hatred. Three 'lessons', three card pieces... If I can't complete that card before my batteries run out, I will perish under the cold light of this tablet." },
      ],
      choices: [
        { id: "ilerle", text: "Hold the trembling light of the tablet ahead and slip into the corridor", next: "n_hub" },
      ],
    },

    /* ================= CENTRAL HUB ================= */

    n_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "A suffocating distribution junction opening into four savage darknesses. There is a puddle of coagulated, blackened liquid on the floor — its stench burns your throat. One of the lifeless cameras on the ceiling rotates as its internal gears scream, piercing its lens directly into your eyes. Your tablet's light turns the surrounding shadows into monstrous entities on the walls.", if: { flag: "hubIlk", equals: false } },
        { type: "flag", set: { hubIlk: true } },
        { type: "status", items: [
          { label: "CARD I", flag: "kart1" },
          { label: "CARD II", flag: "kart2" },
          { label: "CARD III", flag: "kart3" },
        ] },
        { type: "ambient", text: "Directional signs on the wall covered in rust and filth: PRESSURE CHAMBER · TUNNEL NETWORK · OBSERVATION ROOM · EXIT. Directly beneath the signs, someone scratched, likely until their fingernails ripped off: 'They didn't die in order, drop dead when you are ready too.'" },
      ],
      choices: [
        { id: "basinc", text: "Turn into the wet, blood-scented corridor where screams of pressure echo", next: "n_s1_kapi", if: { flag: "kart1", equals: false } },
        { id: "tunel", text: "Crawl into the pitch-black abyss where the ceiling shafts descend like a coffin", next: "n_s2_kapi", if: { flag: "kart2", equals: false } },
        { id: "gozlem", text: "Slip into the corridor radiating dead silence from behind broken glass", next: "n_s3_kapi", if: { flag: "kart3", equals: false } },
        { id: "destek", text: "Approach the sputtering, agonizing life support panel emitting sparks", next: "n_destek_panel", if: { flag: "destekOnarildi", equals: false } },
        { id: "cikis", text: "Walk toward that massive steel exit door chained to the floor", next: "n_cikis" },
        { id: "dinlen", text: "Cower in the shadow of a dark pipe and try to suppress your sobs", next: "n_hub_dinlen", ifStat: { stat: "gurultu", gte: 30 } },
      ],
    },

    /* life support panel — wires puzzle */
    n_destek_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "In the darkest corner of the junction, the cover of the life support panel hangs loose, looking as if it was hacked apart with an axe. Five thick cables inside dangle out like ripped veins; blue sparks flying from their ends create sudden flashes on your tablet screen. A bloody label on the panel reads \"K-5 AIR CYCLE — LIFE / DEATH BALANCE\". Deniz smashed this panel on purpose; he wants you to suffer. If you can plug these wild cables into the correct slots, the acidic gas burning your lungs will clear, and every terrified step you take will make less noise." },
        { type: "note", id: "not_destek", title: "The Dying Air Panel", text: "The lungs of K-5 have been ripped out. Five bare cables are sparking, hot enough to burn my fingers if I touch them. I need to find the correct ports. If I fail, this toxic air will suffocate me, and they will immediately find my location because of my wheezing." },
      ],
      interaction: {
        kind: "wires",
        title: "TO BREATHE — CONNECT THE CABLES WITHOUT LETTING THEM TOUCH YOUR FLESH",
        cables: [
          { id: "c_o2", label: "O₂", color: "#4aa2c2" },
          { id: "c_co2", label: "CO₂", color: "#8a8a8a" },
          { id: "c_pmp", label: "PUMP", color: "#c2a24a" },
          { id: "c_fan", label: "FAN", color: "#5aa26a" },
          { id: "c_val", label: "VALVE", color: "#c25a5a" },
        ],
        ports: [
          { id: "p1", label: "1" },
          { id: "p2", label: "2" },
          { id: "p3", label: "3" },
          { id: "p4", label: "4" },
          { id: "p5", label: "5" },
        ],
        pairs: { c_o2: "p3", c_co2: "p1", c_pmp: "p5", c_fan: "p2", c_val: "p4" },
        penalty: { gurultu: 12, akil: -4, text: "BOOM! Wrong connection! High voltage exploded in your fingers and echoed off the steel walls! NOISE +12" },
        success: "n_destek_onarildi",
        cancel: "n_hub",
      },
    },

    n_destek_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "AIR CYCLE: BLOODY GAS PURGED" },
        { type: "narrate", text: "The moment you push the last cable into its slot, the panel sputters to life with a relentless growl. The fans begin to spin, and that piercing stench of rotting iron slowly dissipates. For the first time, you can take a deep breath as your chest heaves like a bellows. You must keep your sanity to escape." },
        { type: "flag", set: { destekOnarildi: true } },
        { type: "stat", stat: "akil", delta: 6, note: "SANITY +6 — Fresh air entering your lungs gave you life", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to that deadly junction", next: "n_hub" },
      ],
    },

    n_hub_dinlen: {
      cost: 2,
      events: [
        { type: "narrate", text: "You lean your back against a soaking wet, ice-cold pipe and pull your knees to your chest. Your heart hammers as if it wants to shatter your ribcage. One... Two... You hide the tablet's light between your legs. The blood-red light atop the camera slowly turns off; Deniz must be watching another victim's agony for now." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Your breathing steadies — NOISE reduced", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Point the light back into the darkness and return to the junction", next: "n_hub" },
      ],
    },

    /* ================= EXAM 1 — PRESSURE (card piece I) ================= */

    n_s1_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「First lesson: PRESSURE. There are three valves inside with enough power to tear your flesh from your bones. If you don't turn them in the correct order, we'll listen to how those precious eardrums of yours explode inside your skull. Start moving, rat.」" },
        { type: "narrate", text: "A rusty, greasy control board stands next to the heavy iron door. Beneath dried bloodstains, there is a schematic. To read it, you will have to press the tablet screen light right against it and scrape off that filth with your fingers. Or you can just choose suicide and dive straight in." },
      ],
      choices: [
        { id: "oku", text: "Press the tablet light to the board, scrape the filth and read", next: "n_s1_sema" },
        { id: "gir", text: "I have no time, batteries are draining! Dive straight in", next: "n_s1" },
      ],
    },

    n_s1_sema: {
      cost: 1,
      events: [
        { type: "flag", set: { s1SemaOkundu: true } },
        { type: "document", open: true, doc: {
          id: "d_havasema", title: "Pressure Protocol Under Terror",
          meta: "PERISHED · K-5 DEATH TALLIES · INSTRUCTION 3-C",
          body: "PRESSURE CHAMBER — AGONY HALTING SEQUENCE\n\nRULE: Anyone breaking this sequence will be torn apart inside.\n\n  1) EQUALIZATION (yellow) — stops the crushing pressure inside your head\n  2) PURGE        (red)   — flushes accumulated bloody gas into the bilge\n  3) MAIN SUPPLY  (green) — blows the lock open\n\nIF YOU MAKE A MISTAKE, YOUR BRAIN WILL OOZE FROM YOUR EARS.\n(Log, week 12: T. Demir — Left eardrum ruptured, went insane.)" } },
        { type: "note", id: "not_havasema", title: "The Sequence to Save My Ears", text: "YELLOW valve first (equalization), then RED (purge), and finally that massive GREEN wheel. One wrong move and my head explodes." },
      ],
      choices: [
        { id: "gir", text: "Engrave the schematic into your mind and enter the pressure chamber", next: "n_s1" },
      ],
    },

    n_s1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you step into the room, a horrific throbbing begins in your ears, your eyes straining as if they might pop from their sockets. Steam escaping from the walls rises with a screaming hiss. Three valves stand before you: Yellow, red, and in the furthest dim corner, a massive wheel painted green. The pressure gauge trembles violently in the blood-red zone.", if: { flag: "s1Ilk", equals: false } },
        { type: "flag", set: { s1Ilk: true } },
        { type: "alert", text: "AIR PRESSURE IS LETHAL — CHOOSE BEFORE YOUR HEAD EXPLODES" },
        { type: "narrate", text: "You came without reading the schematic. Which valve will you turn blindly in the dark? A single mistake will cause blood to ooze from your ears.", if: { flag: "s1SemaOkundu", equals: false } },
      ],
      choices: [
        { id: "sari", text: "Grip the YELLOW valve and turn it with all your might", next: "n_s1_b" },
        { id: "kirmizi", text: "Frantically spin the RED valve", next: "n_s1_yanlis" },
        { id: "yesil", text: "Force that massive GREEN wheel", next: "n_s1_yanlis" },
      ],
    },

    n_s1_yanlis: {
      cost: 1,
      events: [
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "The moment you turn the valve, a horrific blast echoes through the room! The high-pressure shockwave stabs into your ears like two red-hot irons. You collapse to your knees screaming, but you can't even hear your own voice; the inside of your head is filled with nothing but a pure, maddening ringing. You feel warm blood trickling from your nose." },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Blood oozing from your ears, the ringing is maddening", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "NOISE +10 — This horrific blast woke up everything on the floor", noteKind: "alert" },
        { type: "anons", text: "「Ahahaha! My god, I heard that bone-snapping sound all the way from here! Was it really that hard to look at the paper on that board? Come on, get up and suffer from the beginning!」" },
      ],
      choices: [
        { id: "tekrar", text: "Wipe the tears from your eyes, gather yourself through the pain, and return to the valves", next: "n_s1" },
        { id: "cik", text: "Flee outside for dear life, read the schematic on the board", next: "n_s1_kapi", if: { flag: "s1SemaOkundu", equals: false } },
      ],
    },

    n_s1_b: {
      cost: 1,
      events: [
        { type: "system", text: "EQUALIZATION VALVE: OPENED — SKULL PRESSURE IS DROPPING" },
        { type: "narrate", text: "The yellow valve turns with a shrill screech, and that horrific bursting sensation in your ears eases slightly. But you can't stop, the tablet light is flickering. Now for the second one." },
      ],
      choices: [
        { id: "kirmizi", text: "Leap to the RED valve and turn it", next: "n_s1_c" },
        { id: "yesil", text: "Force the GREEN wheel", next: "n_s1_yanlis" },
      ],
    },

    n_s1_c: {
      cost: 1,
      events: [
        { type: "system", text: "PURGE VALVE: OPENED — TOXIC GAS IS VOMITED INTO THE BILGE" },
        { type: "narrate", text: "The pressure needle slides down away from that lethal red zone. One last move remains: the main supply wheel. Rusted, massive, and green." },
      ],
      interaction: { kind: "valve", title: "LIKE TEARING BOULDERS APART — TURN THE WHEEL WITH ALL YOUR MIGHT", turns: 6, success: "n_s1_ok", cancel: "n_s1_c" },
    },

    n_s1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav1: true, kart1: true } },
        { type: "system", text: "ROOM EQUALIZED — CARD PIECE I RIPPED AND RECOVERED FROM THE FLESH" },
        { type: "anons", text: "「...Well, look at that. I guess you're not just a pile of meat, you can actually read. You're more durable than the three wretched pieces of flesh before you. The first piece is yours, enjoy it for now.」" },
        { type: "battery", spares: 1 },
        { type: "note", id: "not_sinav1", title: "The First Bloody Piece (I / III)", text: "I ripped the first card piece out of that pressure hell. Deniz said 'the three candidates before you'... They hunted three other humans in this labyrinth before me. What did he do to them? Where did he throw their bones? His voice is entirely filled with a morbid pleasure." },
      ],
      choices: [
        { id: "hub", text: "Hide the card piece against my chest and return to the junction", next: "n_ara1" },
      ],
    },

    /* ===== ECE FIRST CONTACT ===== */

    n_ara1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "As you take trembling steps back toward the junction, the smashed, turned-inside-out intercom panel on the wall suddenly crackles. Once. Twice. Beneath the static, that suffocating crackle, a voice rises from deep within—terrified, but human, a real woman's voice:" },
        { type: "ambient", text: "«Please don't make a sound, just listen... This line is the old sonar line, Deniz's disgusting ears can't hear this place. ...You made it out of the K-6 hell. No one had ever made it out of there alive. Which hell did you come from? Who are you?»" },
      ],
      choices: [
        { id: "ad", text: "Whisper my name with a voice trembling from fear", next: "n_ara1_ad" },
        { id: "adyok", text: "\"Names mean death here. I'm just a technician trying to survive.\"", next: "n_ara1_adyok" },
      ],
    },

    n_ara1_ad: {
      cost: 1,
      events: [
        { type: "flag", set: { adSoylendi: true } },
        { type: "stat", stat: "eceGuven", delta: 15, note: "ECE clung onto you in the midst of this dread", noteKind: "system" },
        { type: "ambient", text: "«...For three whole weeks in this darkness, no one has told me their name. Everyone just screamed or died like a number...» Behind her voice, you can hear her trying to swallow her sobs. «I am Ece. The sonar operator. Listen to me, if you want to live, listen:»" },
      ],
      choices: [
        { id: "devam", text: "Point the tablet light at the floor and listen intently", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_adyok: {
      cost: 1,
      events: [
        { type: "ambient", text: "«...Right. You're absolutely right. Deniz hunts names. If you give him a name, he engraves it into his mind and makes you his pet until you go insane...» A brief, suffocating pause. «You're terrified, but you haven't lost your mind. That is your only weapon on this floor. Listen to me carefully:»" },
      ],
      choices: [
        { id: "devam", text: "Listen with fear", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_bilgi: {
      cost: 1,
      events: [
        { type: "ambient", text: "«He will hold the tunnel exam in absolute darkness... He'll cut the lights and hunt you. And those tunnels are a total human grinder, a blind maze. For days, I listened over the intercom to how those who entered without a map smashed their heads against the walls... The old tunnel schematic is in that bloody maintenance locker next to the observation room. Go in there and TAKE IT!»" },
        { type: "ambient", text: "«There's one more thing... Deep in the tunnels, living at the bottom of those sewers, there is something else... Even Deniz doesn't know, no one could tell him because everyone who entered the tunnel was eaten. If you hear a wet, crawling sound down there... STOP. Don't you dare breathe, freeze completely. Promise me.»" },
        { type: "note", id: "not_ece2", title: "Ece's Tunnel Warning", text: "Ece is speaking from a hidden line, Deniz is blind to it. Entering the tunnel hell without a map is suicide. The map is in the locker next to the observation room. But what's truly terrifying... is 'that thing' in the tunnels. The only salvation: stop and don't breathe. This girl has been living in this graveyard for three weeks, what she says is my only ticket to survival." },
      ],
      choices: [
        { id: "hub", text: "Point the tablet light down the corridor and slip into the junction", next: "n_hub" },
      ],
    },

    /* ================= EXAM 2 — THE TUNNEL (card piece I) ================= */

    n_s2_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Second lesson: SENSE OF DIRECTION. Crawl into those narrow steel intestines, scrape your way out the other end, and take the second piece. Sounds too easy, right? But here's a little surprise—」" },
        { type: "system", text: "K-5 TUNNEL ZONE: ALL LIGHTS CUT · ABSOLUTE DARKNESS" },
        { type: "anons", text: "「—the lights stay with me! Let's see how much that pathetic screen light of your tiny tablet will protect you? When your batteries die, you'll see what awaits you in the dark...」" },
        { type: "narrate", text: "The mouth of the tunnel stands before you like a massive, pitch-black throat exposing its teeth. A freezing, foul air blows from within. Do you have a map? Or did you stop by that locker Ece mentioned?", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "gir", text: "Crawl toward that black hole, trembling with fear", next: "n_t1" },
        { id: "dolap", text: "Break open that ominous locker next to the observation room first", next: "n_s2_dolap", if: { flag: "tHarita", equals: false } },
      ],
    },

    n_s2_dolap: {
      cost: 1,
      events: [
        { type: "flag", set: { tHarita: true } },
        { type: "narrate", text: "You force the locker door open; the inside is filled with old rusty tools and dried rat corpses. On the inner surface of the door, you find a yellowed, blood-stained tunnel schematic scratched in with nails. And tucked among the greasy rags underneath lies a flickering spare battery you'll cherish more than your life!" },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_tunelharita", title: "K-5 Human Grinder Tunnel Schematic",
          meta: "PERISHED TECHNICAL DRAWING 5-H · DEATH ROUTE",
          body: "CORRIDOR ENTRANCE\n   |\n   +- JUNCTION 1 -- LEFT  -> Salvation line\n   |               RIGHT -> Dead end (Old rotten filters)\n   |\n   +- JUNCTION 2 -- STRAIGHT -> Bottleneck (Risk of getting stuck)\n   |\n   +- JUNCTION 3 -- LEFT  -> EXIT DOOR\n                   RIGHT -> Blind pocket (Death trap)\n\nBLOODY HANDWRITTEN NOTE: Enter -> TURN LEFT -> GO STRAIGHT -> TURN LEFT AND RUN. Memorize it.\nTablet light won't be enough in the tunnel, if batteries die, this place becomes your grave. — T.D." } },
        { type: "note", id: "not_tunelharita", title: "The Route Engraved in My Mind", text: "The route is clear: LEFT → STRAIGHT → LEFT. The right branches are completely dead ends and death traps. It will be absolute darkness inside, I won't have time to open the map and look." },
      ],
      choices: [
        { id: "gir", text: "Press the tablet against my chest and crawl into that narrow abyss", next: "n_t1" },
      ],
    },

    n_t1: {
      checkpoint: true,
      cost: 3,
      events: [
        { type: "narrate", text: "You are inside a narrow, aluminum, ice-cold coffin. You drag yourself forward on your elbows, scraping your flesh against the steel. The flickering screen light of your tablet can only tear through a few meters of the dark ahead, while behind you lies absolute nothingness. The first junction: the left branch slopes steeply downward, while a foul wind wheezes from the right branch.", if: { flag: "t1Ilk", equals: false } },
        { type: "flag", set: { t1Ilk: true } },
        { type: "alert", text: "You don't have the map with you! Every step you take in the dark is a lethal gamble!", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "sol", text: "Crawl LEFT, into the heart of darkness", next: "n_t2" },
        { id: "sag", text: "Crawl RIGHT, toward that strange wheezing breeze", next: "n_t_korucuk" },
      ],
    },

    n_t_korucuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "The airflow leads you to a blind alley containing broken, rusty filters. This place is a complete dead end! There are fingerprints of past victims on the walls. In utter panic, striking your knees against the narrow enclosure, cursing and crying, you crawl backward." },
        { type: "anons", text: "「Hahaha! He went right, the idiot went right! You don't have a map, do you? I can't wait to watch you get lost in the dark and gnaw on your own flesh there!」" },
      ],
      choices: [
        { id: "geri", text: "Crawl backward out into that damn junction for dear life", next: "n_t1" },
      ],
    },

    n_t2: {
      cost: 3,
      events: [
        { type: "narrate", text: "The left branch forces you into a bottleneck so narrow that your shoulders wedge against the steel on both sides, choking your breath. Right as you are trapped in that tight vice, from directly ahead... you hear the wet, heavy, unhuman sound of something crawling toward you, scratching against the aluminum steel. It's getting closer!" },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Wait... Stop! What the hell is that... What is that thing doing in the tunnel?! THIS IS MY GAME! Maintenance, get into the vent right to your right, HIDE RIGHT NOW, FUCK—」" },
        { type: "waitTap" },
        { type: "narrate", text: "The sadistic joy in Deniz's voice vanishes instantly, replaced by sheer terror. To your right, an arm's length away, is a small service vent. Ece said 'stop', but Deniz is screaming 'hide'. That monster is bigger than both of them." },
        { type: "note", id: "not_denizpanik", title: "System Breached", text: "That thing called the 'Wheeler' living in the tunnels broke in, and Deniz DID NOT know. The doors might belong to him, but that monster is entirely outside of this system. Deniz doesn't see everything, he is afraid too." },
      ],
      choices: [
        { id: "menfez", text: "Squeeze yourself inside the vent, shut off the tablet, and hold your breath!", next: "n_t2_nefes" },
        { id: "kos", text: "Try to flee by crawling backward in absolute terror!", next: "n_olum_tahliye" },
      ],
    },

    n_olum_tahliye: {
      death: true,
      deathText: "You cannot escape by crawling backward in this narrow coffin! Every panicked movement makes the steel ring wildly, screaming out your location. That wet, massive weight drops onto you from behind; you hear the sound of your bones snapping. Deniz turns off the speakers completely that night, leaving only your screams echoing through the tunnel.",
      events: [{ type: "glitch", ms: 900 }],
    },

    n_t2_nefes: {
      events: [
        { type: "narrate", text: "You force yourself into that small vertical vent, tearing your flesh. The steel plating squeezes your chest like a vise. Pressing the tablet to your chest, you completely bury that raw light with your body. Right then, that wet, slavering monster begins to crawl past directly in front of you, a finger's width away in the tunnel. Its stench is vile, like a rotting corpse." },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_t3", fail: "n_olum_tunel" },
    },

    n_olum_tunel: {
      death: true,
      deathText: "Your lungs feel like they are about to explode, you can no longer hold your breath in that tight space, and a muffled gasp escapes. In that instant, the wheezing stops. When a mangled, wet hand appears at the mouth of the vent, the tunnel network fills with the sounds of your flesh being ripped from bone.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_t3: {
      cost: 3,
      events: [
        { type: "narrate", text: "That wet crawling sound slowly fades and vanishes into the depths of the tunnel. Trembling, you emerge from the vent and continue crawling; your arms and legs are shaking so violently from fear that you can barely control them. The third junction lies ahead: left and right.", if: { flag: "t3Ilk", equals: false } },
        { type: "flag", set: { t3Ilk: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sol", text: "Crawl LEFT, the exit must be there", next: "n_t4" },
        { id: "sag", text: "Crawl RIGHT, maybe there's something there", next: "n_t_cep", if: { flag: "tCep", equals: false } },
      ],
    },

    n_t_cep: {
      cost: 2,
      events: [
        { type: "flag", set: { tCep: true } },
        { type: "narrate", text: "The right branch ends in a short, pitch-black blind alley. When you aim your tablet's light into the corner, you see a bloody cloth bag. Inside, gleaming inside vacuum packaging, is a pristine tablet battery! It looks like someone died trapped here... Or like bait left behind for that monster living down here." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Grab the battery, turn around immediately, and crawl LEFT", next: "n_t4" },
      ],
    },

    n_t4: {
      cost: 2,
      events: [
        { type: "narrate", text: "The left branch widens, the air finally dynamic and freshening slightly. The raw light of your tablet hits the rusty lever of the steel exit door at the end of the tunnel. This is a spring-loaded lever; you need to press it all the way down and push that heavy weight." },
      ],
      interaction: { kind: "lever", title: "BEFORE IT CLOSES — PRESS THE LEVER ALL THE WAY DOWN AND PUSH", holdMs: 2000, success: "n_s2_ok", cancel: "n_t4" },
    },

    n_s2_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { sinav2: true, kart2: true } },
        { type: "system", text: "TUNNEL HELL SURVIVED — CARD PIECE II RECOVERED" },
        { type: "narrate", text: "Along with the hatch opening, you practically spill out onto the cold concrete of the corridor; your knees are shaking, your lungs hungrily drawing real air. The loudspeaker remains silent for a very long time. When Deniz finally speaks, there is a faint, terrified crack in his sick voice:" },
        { type: "anons", text: "「...So you made it out. Look, what you saw inside... just forget about that thing in the tunnel, alright? There's no need to tell anyone. That's just a small family matter of ours. The second piece is yours, now go.」" },
      ],
      choices: [
        { id: "hub", text: "Gather yourself and return to the junction with trembling steps", next: "n_hub" },
      ],
    },

    /* ================= EXAM 3 — OBSERVATION ROOM / HONESTY (card piece III) ===== */

    n_s3_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "An observation room with its windows completely shattered, illuminated by a cold, white operating room light. A single rusty iron chair in the center, a single buzzing speaker on the ceiling, and a bloody camera lens staring directly at you. Just beneath the chair, a stained ledger has been left behind." },
        { type: "document", open: true, doc: {
          id: "d_sinavdefteri", title: "Deniz's Bloody Hunt Ledger", style: "hand",
          meta: "— with a savage scrawl on the cover: 'EXPERIMENTS. D.' —",
          body: "LOST MEAT 1 — The Welder\nPassed ds1 entirely by luck. Cried for 41 minutes in the ds2 tunnel. Pathetic.\nLied constantly in ds3, staring straight into my eyes. -> Handed over to the Family. They cleaned him up nicely.\n\nLOST MEAT 2 — The Nurse from the Infirmary\nPassed ds1 and ds2 with the map, clever bitch.\nSaid to my face in ds3, 'You're just a helpless freak looking for an audience.' I TOOK NOTE. Caught her in the shaft while she was trying to escape. A pity.\n\nLOST MEAT 3 — That proud piece of filth who wouldn't give a name\nDidn't say a single word throughout ds3, stayed silent even when I ripped his nails off.\n-> Went to the Family. Now he just watches the surroundings and counts numbers.\n\nLOST MEAT 4 —\n(This part is blank... Your duty number is written at the very top in fresh, undried ink.)" } },
        { type: "note", id: "not_sinavdefteri", title: "The Death Ledger", text: "The execution records of the three victims before me are here... Deniz fed both the liars and the silent ones to those cannibals called the 'Family'. The nurse defied him... The fourth page has been opened for me. To escape, I have to play along with this psychopath." },
        { type: "anons", text: "「Sit in that chair. Third lesson: HONESTY. I will ask you three questions. You can lie, I'll know it when I'm cutting your flesh, but you are free to try. The only rule: answer. If you remain silent, we start with your fingernails.」" },
      ],
      choices: [
        { id: "otur", text: "Sit in that cold, rusty iron chair and look into the camera", next: "n_soru1" },
      ],
    },

    n_soru1: {
      cost: 1,
      events: [
        { type: "anons", text: "「Question one. You poked your nose into the K-6 infirmary, all my sensors recorded it. You found Baturay there, didn't you? How did that piece of filth look? Was he in agony?」" },
      ],
      choices: [
        { id: "durust", text: "\"He was dead. On the table. His face... at least it was peaceful now.\"", next: "n_soru1_a" },
        { id: "yalan", text: "\"The infirmary was completely empty. I swear I didn't see anyone.\"", next: "n_soru1_b" },
        { id: "sessiz", text: "Remain silent, clenching your teeth while staring at the tablet screen", next: "n_soru1_c" },
      ],
    },

    n_soru1_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5, note: "The savagery in Deniz's voice subsided slightly", noteKind: "system" },
        { type: "anons", text: "「...Peaceful?」 A very long, heavy silence follows; even the static on the speaker trembles as if ashamed. 「Good... It's good he kicked the bucket without suffering. He used to... Whatever. Question two!」" },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [{ id: "d", text: "Swallow hard in fear and wait", next: "n_soru2" }],
    },

    n_soru1_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10, note: "Deniz engraved your lie into his mind", noteKind: "alert" },
        { type: "anons", text: "「You opened the infirmary door at exactly 04:31, and walked away from that corpse at 04:39! Did you pretend to be blind inside for eight minutes, you piece of shit?!」 A dry, sickly laugh rises from the speaker. 「Put some effort into your lies so I don't slice your flesh open immediately. Question two!」" },
      ],
      choices: [{ id: "d", text: "Wait as cold sweat trickles down your back", next: "n_soru2" }],
    },

    n_soru1_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「Silence... So you possess that pathetic pride too. The third victim stayed silent like this as well.」 You hear a pen striking hard against a ledger; he's adding you to the list of the dead. 「It's much more fun when you stay silent. Question two!」" },
      ],
      choices: [{ id: "d", text: "Wait, holding your breath", next: "n_soru2" }],
    },

    n_soru2: {
      cost: 1,
      events: [
        { type: "anons", text: "「Question two. You tampered with that old sonar line. I can't see there, but I watched your wretched face whispering to those filthy walls. You're talking to Ece! Where is that bitch hiding?! Tell me!」" },
      ],
      choices: [
        { id: "soyle", text: "To save my life, describe the compartment where Ece is hiding", next: "n_soru2_a" },
        { id: "yalan", text: "\"I don't know who she is. The line was one-way, only audio could be heard.\"", next: "n_soru2_b" },
        { id: "reddet", text: "\"I won't answer this question. I won't give you that girl!\"", next: "n_soru2_c" },
      ],
    },

    n_soru2_a: {
      cost: 1,
      events: [
        { type: "flag", set: { eceEleVerildi: true } },
        { type: "stat", stat: "eceGuven", delta: -40, note: "YOU SACRIFICED ECE — Trust is completely shattered into splinters", noteKind: "alert" },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「...So the sonar compartment. Finally...」 The savage laugh you expected doesn't come; his voice turns ice-cold. 「I already knew, you know? I've been looking there for three weeks. I just wondered when you would sell out your pathetic loyalty. And you did. Noted. Question three.」" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — The coldness of betrayal gnaws at your mind", noteKind: "alert" },
        { type: "note", id: "not_ihanet", title: "I Sold Her Out For My Own Skin", text: "I told this monster Ece's location... He said 'I already knew' but that doesn't clear me. I am a traitor. Just to stay alive, I threw that girl to her death. This stain will never wash out." },
      ],
      choices: [{ id: "d", text: "Wait in shame and terror", next: "n_soru3" }],
    },

    n_soru2_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「A one-way line, huh?」 This time his laugh is long, thoroughly enjoying itself like the hissing of a snake. 「A lie... but a clever lie. It has some backbone. You reminded me of that nurse... Question three.」" },
      ],
      choices: [{ id: "d", text: "Wait", next: "n_soru3" }],
    },

    n_soru2_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "stat", stat: "eceGuven", delta: 10, note: "You protected Ece from that monster", noteKind: "system" },
        { type: "anons", text: "「Saying 'Not to you'...」 The cords in his voice tighten, as if the speaker might explode. 「Loyalty... That cannibal pack, that Family loves that, you know? The Chef really loves to chew on loyal meat like you. Question three!」" },
      ],
      choices: [{ id: "d", text: "Tremble and wait for the final question", next: "n_soru3" }],
    },

    n_soru3: {
      cost: 1,
      events: [
        { type: "anons", text: "「Final question... I've asked this to every piece of meat that came here, they all lied out of fear.」 The static deepens, the morbid playfulness in Deniz's voice completely vanishing for the first time. 「Have you ever thought about joining that savage Family, becoming one of them? Instead of being torn apart alone in this darkness, becoming a piece of that madness... Be honest, ask yourself when you will start slicing my flesh.」" },
      ],
      choices: [
        { id: "hayir", text: "\"No! I would never become one with monsters like you!\"", next: "n_soru3_a" },
        { id: "bilmiyorum", text: "\"...I don't know... This darkness and loneliness are driving me insane...\"", next: "n_soru3_b" },
        { id: "karsi", text: "\"What about you, Deniz? Did you join them or are you still just a cowardly spectator?\"", next: "n_soru3_c" },
      ],
    },

    n_soru3_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「'Never'... You all talk big like that at first. The first victim said so too. Now he sits at that bloody banquet table, gnawing on the meat thrown in front of him with a massive appetite! The exam is over, get the fuck out of the chair!」" },
      ],
      choices: [{ id: "d", text: "Leap up from the iron chair and stand", next: "n_s3_ok" }],
    },

    n_soru3_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "anons", text: "「...So you don't know.」 A very long dead silence fills the room. The clicking of the pen stops. 「The first honest, naked answer given to this question out of four candidates... Loneliness is hard, yes. Hard enough to force a person to eat their own flesh... The exam is over.」" },
      ],
      choices: [{ id: "d", text: "Stand up, your legs can barely carry you", next: "n_s3_ok" }],
    },

    n_soru3_c: {
      cost: 1,
      events: [
        { type: "flag", set: { denizSoruldu: true } },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「—」" },
        { type: "narrate", text: "The speaker is open, the line is live, but not a peep comes from Deniz. Five seconds... Ten seconds... You can feel that sick soul behind the camera losing his breath. Finally, with his mask completely fallen, he whispers in the voice of a lonely, old man: 「...Next question cancelled. The exam is over. Get out of here.」" },
        { type: "note", id: "not_denizsoru", title: "I Wounded the Monster", text: "I asked, \"Did you join?\" and that sadist bastard who watches everything couldn't answer. Whether he's a part of that cannibal pack or the next piece of meat waiting for his turn in a cage, he doesn't know himself. This helplessness will make him even more dangerous." },
      ],
      choices: [{ id: "d", text: "Get out of the chair, point the tablet light ahead", next: "n_s3_ok" }],
    },

    n_s3_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav3: true, kart3: true } },
        { type: "system", text: "LAST LESSON OVER — CARD PIECE III RECOVERED · KEY COMPLETED" },
        { type: "anons", text: "「The last piece is yours too... The card is complete, rat. See you at the exit door. That place is no longer my safe zone, but I'll be right at the screen to watch how your bones get crushed.」" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "hub", text: "Pocket the final piece as well and run to that damn junction", next: "n_hub" },
      ],
    },

    /* ================= EXIT — PIECE LOCK ================= */

    n_cikis: {
      cost: 1,
      events: [
        { type: "narrate", text: "The massive, rusty steel exit door standing before you. In its center is a brutally carved card reader with three slots; you need to insert those three bloody pieces into these slots. The flickering light of your tablet sweeps over the empty slots." },
        { type: "alert", text: "THE READER BEEPS FURIOUSLY: CARD PIECES MISSING! This door will not open until you finish all exams!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "There are still missing pieces! You must return to those monsters' rooms and finish the exams before your batteries run out!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "All three pieces tremble between your fingers. You press them into the reader one by one, tearing your flesh—CLICK, CLICK, CLICK. The massive hydraulic locks inside the door release with a deep, agonizing groan!", if: { flag: "kart3", equals: true } },
      ],
      choices: [
        { id: "gec", text: "Push the heavy steel door with all your might and slip into that dark corridor", next: "n_mezun", if: { flag: "kart3", equals: true } },
        { id: "geri", text: "Return to those terrifying rooms containing the remaining pieces", next: "n_hub", if: { flag: "kart3", equals: false } },
      ],
    },

    /* ================= GRADUATION + HARUN ================= */

    n_mezun: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { mezun: true } },
        { type: "system", text: "EXIT LOCK OPENED — TRANSITION TO THE K-4 HELL PERMITTED" },
        { type: "anons", text: "「Congratulations victim... One graduate out of four meats. Here you go, let this be a reward from me to you.」 The dark vent above you suddenly rattles, and a fresh, packaged tablet battery drops right at your feet! 「A small favor... Don't tell anyone, I wouldn't want to ruin my sadistic image here.」" },
        { type: "battery", spares: 1 },
        { type: "waitTap" },
        { type: "anons", text: "「One last free lesson for you: that endless corridor stretching before you when you exit the K-4 door... That is no longer my playground. It belongs to no one. The true overseer of death rules there... Give my regards to my father, rat.」" },
        { type: "objective", text: "Reach the main ventilation shaft." },
      ],
      choices: [
        { id: "cik", text: "Part the K-4 transition door and step into that unknown", next: "n_harun1" },
      ],
    },

    n_harun1: {
      cost: 1,
      events: [
        { type: "narrate", text: "An endless, bare connecting corridor with blood oozing from its walls. When you reach the halfway mark, a massive flashlight beam swings around from the dark corner at the far end — a yellow, heavy, completely unhurried light. Behind it emerges a massive torso wearing a butcher's apron, barely fitting through the doorway." },
        { type: "narrate", text: "\"A new victim...\" The voice comes from so deep, so calm; it's as if a factory shift supervisor, a FATHER, is speaking. \"You are wandering aimlessly through the corridors during working hours. I'll have to write up a very severe disciplinary report for you, son...\" The massive flashlight raises into the air and pierces directly into your eyes frozen with fear!" },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "THE CHEF SPOTTED YOU — You are now on his hunt list!", noteKind: "alert" },
        { type: "waitTap" },
        { type: "alert", text: "⚠ HE HAS BEGUN WALKING TOWARD YOU WITH THOSE MASSIVE STEPS — MAKE A DECISION!" },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "kos", text: "TURN AROUND AND RUN WITH ALL MY MIGHT!", next: "n_harun2" },
        { id: "don", text: "Freeze! It worked against that monster in the tunnel, maybe it'll work on this one too?!", next: "n_olum_harun1", default: true },
      ],
    },

    n_olum_harun1: {
      death: true,
      deathText: "A huge mistake! That blind monster in the tunnel tracked by sound... But the Chef sees you with his eyes, with his giant flashlight! As you stand frozen, his steps don't even quicken; because he knows you can't escape. As he wraps his massive hand around your throat and lifts you into the air, he says, \"You didn't run... Good boy. The Family really loves well-behaved children who don't make their meat tough.\" The tablet drops to the floor with the sound of your bones snapping.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_harun2: {
      cost: 1,
      events: [
        { type: "narrate", text: "YOU ARE RUNNING LIKE CRAZY! Your heart explodes in your ears. That massive man behind you comes swinging his flashlight; his steps are heavy, but they are so large that the distance closes at an impossible speed! Two savage options lie before you: the steel door of the service stairs on the right, or that rusty ventilation vent on the floor!" },
      ],
      interaction: {
        kind: "chase",
        title: "K-5 CORRIDOR",
        enemy: "CHEF HARUN IS SEARCHING",
        success: "n_menfez",
        fail: "n_olum_harun_kovalama",
        startDanger: 30,
        phaseMs: 1320,
        ui: {
          exit: "EXIT",
          danger: "CAUGHT",
          breath: "BREATH",
          run: "RUN",
          hide: "HIDE",
          hold: "HOLD BREATH",
          running: "RUNNING",
          hiding: "HIDING",
          holding: "HOLDING BREATH",
          idle: "HESITATING",
        },
        hints: {
          patrol: "The flashlight scrapes the wall. Steal a few steps.",
          search: "He turns his head. Fold yourself into the locker shadows.",
          near: "Right behind you. If he hears your breath, it is over.",
        },
      },
    },

    n_olum_harun_kovalama: {
      death: true,
      deathText: "The flashlight sticks to your back. You keep running, but the floor seems to pull away under your feet; every step drops back onto the same dirty tile. When Chef Harun catches you, he does not shout. He only bends to your ear and says, \"Meat tightens when it runs, son.\" Then the dark closes with a wet sound from inside your bones.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_olum_harun2: {
      death: true,
      deathText: "The door is locked! An electronic keypad lock, and you know exactly who holds the codes to these locks. Right then, Deniz's whisper rises from the speaker above your head: 「Lesson four, maintenance: you should never have trusted me.」 As that massive flashlight illuminates your back, the Chef's rusty axe buries itself into your flesh. Your vision goes black.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez: {
      events: [
        { type: "narrate", text: "You rip the vent cover off, tearing your nails and bloodying your fingers, and hurl yourself into that narrow hole. A second later, the yellow light of that giant flashlight seeps through the gaps of the grate onto your face. Striped lines of light burn your eyes. The Chef's massive combat boots stop right in front of the vent. He waits... LISTENING to your every single breath, your terror-filled heartbeat!" },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_menfez_ok", fail: "n_olum_menfez" },
    },

    n_olum_menfez: {
      death: true,
      deathText: "Just beneath the grate, your lungs give out and a choking wheeze slips out. That's it. The Chef bends down instantly and rips that massive vent cover away in a single motion like a tin can! Pulling you out by your leg, he says, \"Hide and seek isn't played during working hours, son...\" Everything goes black as he slams your head against the concrete.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "After an endless minute that takes years off your life, those combat boots slowly turn and walk away. The threatening shadow of the flashlight retreats from the walls. From the end of the corridor, that deep voice mutters to itself: \"Let the write-up wait until tomorrow... The Family expects fresh meat at the table...\" You survived." },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "narrate", text: "Through the filth, dust, and dried blood inside the vent, you begin to climb frantically upward — toward that ice-cold airflow of the main shaft." },
      ],
      choices: [
        { id: "baca", text: "Grip the iron rungs of the main shaft and climb", next: "n_baca" },
      ],
    },

    /* ================= END OF CHAPTER ================= */

    n_baca: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "The main shaft: a vertical, pitch-black steel throat connecting the K-5 hell to K-4. The iron rungs you grip freeze your hands, but from above — from the living areas of those cannibals — a warm, nauseating, strange scent of boiled meat descends. You climb while weeping." },
        { type: "ambient", text: "Below, Deniz's speakers crackle one last time: 「...Good lesson, rat. Up there is no longer where my camera is. Up there is HOME... Those at home are hungry...」", if: { flag: "denizSoruldu", equals: false } },
        { type: "ambient", text: "Below, Deniz's speakers crackle one last time: 「...About that question you asked...」 A long crackle of static. 「Don't you dare ask anyone that question up there. Especially there... Because up there is HOME, and everyone at home has already answered that question by giving their own flesh...」", if: { flag: "denizSoruldu", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Ece's trembling voice comes from that tiny sonar radio in your pocket: «I'm still alive... While you climb, I'll try to patch the line into K-4's intercoms. Please don't get lost... Please don't die there...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The radio sinks into dead silence throughout the entire climb. You know Ece is out there, in that darkness... But she will never speak to a traitor like you again. You are alone.", if: { flag: "eceEleVerildi", equals: true } },
      ],
      choices: [
        { id: "son", text: "Extend your bloody hands to the exit hatch of K-4", next: "n_k5_son" },
      ],
    },

    n_k5_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you touch the hatch, that entire massive shaft, all those bloody tunnels you passed, the steel lungs of K-5 all begin to whisper at once as if driven mad:" },
        { type: "ambient", text: "«Five... Four... Three...» A woman's voice coming from deep within. Soft and sickly, like the muttering of someone dying while having nightmares." },
        { type: "waitTap" },
        { type: "narrate", text: "Then the entire floor suddenly falls silent; leaving behind only that warm, wrong scent of home cooking coming from above. You push the hatch with all your might: before you lies the dim, ominous light of K-4 and that great madness awaiting you. Whose home you just entered... you will feel in your bones shortly." },
        { type: "system", text: "—EXAM OVER, THE REAL TERROR BEGINS —" },
      ],
      choices: [
        { id: "k4", text: "Climb through the hatch into the dim corridor of K-4", next: "n_k4_giris" },
      ],
    },
  },
};

export const EP02_FLAGS = {
  destekOnarildi: false,
  hubIlk: false, s1Ilk: false, t1Ilk: false, t3Ilk: false,
  s1SemaOkundu: false, tHarita: false, tCep: false,
  kart1: false, kart2: false, kart3: false,
  sinav1: false, sinav2: false, sinav3: false, mezun: false,
  adSoylendi: false, eceEleVerildi: false,
  denizSoruldu: false,
};
