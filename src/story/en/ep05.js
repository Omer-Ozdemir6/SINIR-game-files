/* ============================================================
   BORDER-1 — CHAPTER 5 (FINAL): "K-2 / THE ARTIFACT" (full version)
   No owner — The Artifact is not a found object, it is a SOURCE. An ancient 
   excavation carved out beneath the station. It "counts" at 432 Hz, linking 
   minds into a single "family" consciousness. The countdown is real: if it 
   reaches zero, everyone on the station — perhaps the surface — becomes one consciousness.

   LAST HUMAN ALLY: Selin. She has a plan to silence the Artifact but 
   cannot do it alone. Ece (if not betrayed) provides sonar support.

   CONSEQUENCES OF CARRIED DECISIONS (all gathered here):
   · eceEleVerildi    → No frequency support from Ece → final gets harder
   · nevinKurtarildi  → Nevin's roots clear a path at the last second
   · sofraYedi        → The Artifact considers you "family" (infiltration / risk)
   · denizSoruldu     → Deniz unexpectedly opens the line
   · frekanslariDuydun→ You partially decode the Artifact's language (easier)

   FINAL PUZZLE: Reversing the Artifact's counting frequency —
   symbol sequence (its language) + radio frequency (overthrowing 432).

   FIVE ENDINGS:
   · SURFACE   — silence + escape (best): Selin + Ece + correct choices
   · SILENCE   — destroy but sacrifice yourself
   · DEEP      — join the Artifact (dark)
   · RECORD    — document and die (whistleblower ending)
   · ZERO      — failing to stop the countdown (bad ending / not hidden)
   ============================================================ */

export const EP05 = {
  nodes: {

    /* ================= INTRODUCTION — THE EXCAVATION ================= */

    n_k2_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k2" },
        { type: "system", text: "FLOOR: K-2 — ARCHAEOLOGY · EXCAVATION SITE · [UNREGISTERED]" },
        { type: "narrate", text: "As the last metal step you step on breaks and echoes behind you, your feet press against a wet, cold, and foreign ROCK. This is K-2. It is not a part of the station; they hid this damn madness beneath that raw steel structure. The only thing in your hand is the screen of the tablet, illuminating your face with a sharp, sickly whiteness. The beam of light hits thousands-of-years-old stains on the wall... No, not stains. Notches carved into stone as if branded into skin. A decreasing, exhausting countdown. The darkness lunges over you as if to swallow the light of your tablet." },
        { type: "narrate", text: "In the middle of the void are rusty scaffoldings, intertwined thick black cables, and decaying equipment arranged like a blind cult worshipping... They all encircle that bottomless anomaly at the center. You cannot see it, because the weak light of your tablet is not enough to rip through that pitch blackness. But you FEEL that awful vibration that comes with a sensation of vomiting. The roots of your teeth ache, your eardrums make static noise as if they are about to burst, and a number slams into your mind like dirty rust: Three." },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — Something fleshy and wet touched your mind", noteKind: "alert" },
        { type: "narrate", text: "«Don't move... Don't even breathe...» A raw, terror-filled whisper rises from the shadows. A real human voice. A woman emerges dressed in a battered excavation jumpsuit as if she just came out of a dust storm, holding a flickering flashlight and a blood-stained, rusty crowbar. When the light of your tablet hits her face, you see her pupils dilated with fear. «You... your consciousness is still intact. Your eyes can see the surroundings... My God, you are the only living human here for three weeks.» Selin.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "«Don't move... Don't make a sound...» A wet hand darting out from a rock crevice almost makes you drop your tablet. A woman, panting inside an excavation jumpsuit. «A scream came from the dead frequency on the sonar line... Ece. She told me about you. She trusts you. I am Selin. And if you want to get out of here alive, the two of us need to kill that thing.» ", if: { flag: "eceEleVerildi", equals: false } },
        { type: "objective", text: "Listen to Selin — Learn the way to stop the Artifact" },
        { type: "note", id: "not_k2", title: "K-2: The Artifact", text: "The station was built on top of this excavation. Every carving on the walls shows a countdown. In the center is the Artifact — I can't see it yet, but the number 'three' dropped into my mind. Selin is here, alive, untransformed." },
      ],
      choices: [
        { id: "selin", text: "Approach Selin", next: "n_selin_plan" },
      ],
    },

    n_selin_plan: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin pulls you sharply behind a rock outcrop. As she leans her back against the stone, her breathing is raspy, her hands are torn down to the cuticles, but there is a survival madness in her eyes. «Listen to me, our time is measured in seconds. That number echoing inside your head... Three... It's not a hallucination. The Artifact is vomiting, counting down, and when that number hits zero...» A dry sob escapes her throat. «Didn't you read the logs left from Nevin's decaying corpse? Everyone will become a single mass of flesh. A single hive mind. Including everyone on the surface.»" },
        { type: "narrate", text: "«The Artifact is a living frequency emitting 432 hertz per second. The only way to KILL it is to shove its own vomit back down its throat: we will read its vile language backward. I decoded those malicious symbols on the walls. But reaching the transmitter panel alone is suicide. You will lock that damn radio onto the frequency, and I will vomit those symbols onto the panel.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«But there is a crucial, awful detail. To reach the transmitter, you have to pass right in front of that thing, through the very heart of that blinding darkness. It will see you. It will read you down to the filthiest corner of your soul... Tell me, what the hell did you do on the upper floors? Did you sit at those madmen's table? If you ate from their vomit-smelling meat, the Artifact will count you as its own blood. This could be a damn advantage... Or a trap where you will be completely swallowed.» She stares at you.", if: { flag: "sofraYedi", equals: true } },
        { type: "narrate", text: "«Good news: at least your soul is not yet steeped in filth. You haven't touched their putrid food, your skin still smells human. But this also means the Artifact will perceive you as a wild tumor, a foreign threat that must be destroyed the moment it sees you. Hold your breath while passing in front of it.»", if: { flag: "sofraYedi", equals: false } },
      ],
      choices: [
        { id: "ilerle", text: "Start exploring the excavation site", next: "n_kazi_hub" },
        { id: "sor", text: "Ask \"How long until zero?\"", next: "n_selin_sifir" },
      ],
    },

    /* ================= EXCAVATION SITE — EXPLORATION HUB ================= */
    n_kazi_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin digs her fingers into your shoulder and pushes you toward the darkness: «I will stay here and alert the console. You enter this foul-smelling labyrinth — any scrap left behind by those who died could be useful to us. But never forget: every step you take, every friction sound you make will awaken the Artifact even more. And the more you LOOK around with that damn light of your tablet, the deeper that thing will violate your mind.»" },
        { type: "narrate", text: "The site ahead of you is a total graveyard: overturned scaffoldings, abandoned tents where worms run wild, pitch-black tunnels... There are four torn paths before you: the corpse-smelling camp area, the gallery covered in carvings, the bottomless borehole, and right in the middle... That ancient, terrifying door opening to that creature. The voice inside your head keeps counting in place, pounding like a pulse: Three... Still three. But it grows like a tumor inside your brain." },
        { type: "objective", text: "Explore the excavation site, then go to the ancient door" },
      ],
      choices: [
        { id: "kamp", text: "Go to the excavation team's camp area", next: "n_kamp", if: { flag: "kampGoruldu", equals: false } },
        { id: "galeri", text: "Enter the carved gallery", next: "n_galeri", if: { flag: "galeriGoruldu", equals: false } },
        { id: "sondaj", text: "Approach the borehole", next: "n_sondaj", if: { flag: "sondajGoruldu", equals: false } },
        { id: "sonar", text: "Enter the sonar array room", next: "n_sonar_oda", if: { flag: "sonarGoruldu", equals: false } },
        { id: "kapi", text: "Advance to the ancient door (Artifact)", next: "n_kadim_kapi" },
        { id: "dinlen", text: "Stop and compose yourself in the shadow of a tent", next: "n_kazi_dinlen", ifStat: { stat: "gurultu", gte: 35 } },
      ],
    },

    n_sonar_oda: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you step into the sonar room, the smell of burnt plastic and rotted flesh hits your nose. The monitors on the walls are cracked, oscilloscopes are vomiting static like crazy. Only a single screen is working, drawing a deadly, perfect waveform on the green screen: 432 hertz. Steady. Hypnotic. The pulse of a living monster. An old tape recorder sits in the middle of the desk, a note scrawled over it in dried blood: 'DO NOT LISTEN. DO NOT PLAY. ABSOLUTELY NOT.'" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "calistir", text: "Play the tape (risky)", next: "n_sonar_teyp" },
        { id: "cik", text: "Do not touch, leave the room", next: "n_sonar_cik" },
      ],
    },

    n_sonar_teyp: {
      cost: 1,
      events: [
        { type: "narrate", text: "Your finger trembles as it presses the rusty button of the tape recorder. First, an ear-piercing static, then the sobs and cries of the excavation team right before they went mad are heard... Then those voices melt one by one and turn into a single foul chorus, counting altogether. And at the very end of the tape, you hear the thing that makes your hair stand on end: Your own voice. Your future scream, which has not yet left your mouth. The Artifact is already eating away at your time. You are listening to your own death scream." },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Your future scream was slammed into your mind", noteKind: "alert" },
        { type: "flag", set: { sonarGoruldu: true, sonarTeyp: true } },
      ],
      choices: [
        { id: "cik", text: "Leave the room", next: "n_kazi_hub" },
      ],
    },

    n_sonar_cik: {
      cost: 1,
      events: [
        { type: "narrate", text: "You don't touch the tape — that terror-filled warning of those who died chills you to the bone. Holding the raw light of the tablet in your hand to the screen, you engrave every curve of that 432 hertz waveform into your memory, into the back of your brain. You must know this frequency while hitting that monster with its own weapon. As you leave the room, the darkness behind you greets you with a whisper as if." },
        { type: "flag", set: { sonarGoruldu: true, sonarBildi: true } },
        { type: "stat", stat: "akil", delta: 3 },
        { type: "note", id: "not_sonar", title: "Sonar array", text: "I saw the voice of the Artifact in the excavation team's sonar room: 432 hertz, steady. I didn't touch the tape. Recognizing this frequency will help me at the transmitter." },
      ],
      choices: [
        { id: "cik", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kazi_dinlen: {
      cost: 1,
      events: [
        { type: "narrate", text: "You slip into the pitch blackness of a torn, moldy-smelling tent. Pressing the screen of your tablet against your chest, you turn off its light; everything is black, you can't see an inch ahead. Closing your mouth, you hold your breath, waiting and listening to the sounds of things scratching the rock outside. The buzzing inside your brain slowly retreats, the pounding of your heart that smashes your ribcage eases. It hasn't noticed you for now." },
        { type: "stat", stat: "gurultu", delta: -25, note: "You held your breath in the dark — NOISE decreased", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kamp: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The camp area is a complete scene of brutality: overturned bloody chairs, maps spread across the table like dried pus... People didn't leave this place in a panic, it's as if they were hypnotized and walked neatly to their deaths. On the wall, that madness written in blood by a person tearing their own fingertips can be read: 'DO NOT STOP COUNTING. IF YOU COUNT, IT HEARS YOU FROM WITHIN.'" },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_kazi_gunluk", title: "Excavation Chief's Diary", style: "type",
          meta: "— Dr. R. Vardar, drilling team —",
          body: "Day 14. When we first uncovered the Artifact, it was in one piece.\nNow, is it growing, or are we shrinking?\nI don't know. Three from the team are counting in their sleep.\n\nDay 19. The number is in everyone's head. 'Seven', they say,\nall in one voice. I don't hear it, yet. Earplugs\ndon't work; the sound doesn't come from the outside, it comes\nfrom within.\n\nDay 21. Half of them are gone. They went down, to the Artifact.\nSmiling. I am the last one left. To whoever finds\this diary: do not count. Whatever happens, do not\nrepeat that number in your mind. The moment you count, it finds you." } },
        { type: "stat", stat: "akil", delta: -8, note: "SANITY -8 — Words grow like a tumor in your mind", noteKind: "alert" },
        { type: "flag", set: { kampGoruldu: true } },
      ],
      choices: [
        { id: "ara", text: "Search the camp (resource)", next: "n_kamp_ara" },
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kamp_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "Directing the raw screen light of your tablet into an overturned equipment crate, you rummage through the filth with your bare hands. Broken drill bits cut your fingers, foul juices leaking from empty tin cans smear onto your hands. But at the very bottom, wrapped in a clotted blood rag, you find two spare batteries and a crushed earplug. The earplugs won't cut that internal voice, but at least they can drown out those maddening screams outside a little bit. You immediately pocket the batteries." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { kampArandi: true } },
      ],
      choices: [
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_galeri: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The place they call the gallery is a narrow death tunnel from whose ceiling wet things drip like leeches. The walls are completely covered with the kind of carvings that drive a person insane: a massive fleshy mass falling from the sky, people touching it and within seconds their faces melting and turning into smooth pieces of flesh... The faces of the figures in the last carving are completely erased, with only black holes in their place. That hollow at your eye level moves under the light of your tablet as if, it is watching you!" },
        { type: "waitTap" },
        { type: "narrate", text: "As you look at the carvings, a intense ringing starts in your ears, you feel nauseous. The stone breathes as if it were a living skin, the notches on it trembling and decreasing. That damn voice inside your mind strikes like a hammer: Three... Three... That whisper of Selin explodes in your brain: The more you look, the faster that thing will corrupt your soul!" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Malicious carvings were engraved into the folds of your brain", noteKind: "alert" },
        { type: "flag", set: { galeriGoruldu: true } },
      ],
      choices: [
        { id: "oku", text: "Examine the last carving closely (risky)", next: "n_galeri_oyma" },
        { id: "cik", text: "Avert your eyes, leave the gallery", next: "n_kazi_hub" },
      ],
    },

    n_galeri_oyma: {
      cost: 1,
      events: [
        { type: "narrate", text: "Darkening your eyes, you rub your trembling hand against that disgusting carving. The stone is not ice-cold; on the contrary, it is hot, moist, and alive like the skin of a patient burning with fever. As the carvings shift under your fingers, lightning flashes in your brain: This damn thing is a language! This is the password for the panel that will vomit that creature's frequency! You found that missing symbol Selin was looking for. But an awful void forms inside your head... For a second, you cannot remember your mother's face, or even your own name. Knowledge ripped a piece out of your soul." },
        { type: "flag", set: { galeriSembol: true } },
        { type: "stat", stat: "akil", delta: -8, note: "SANITY -8 — Ancient language erased a part of your memory", noteKind: "alert" },
        { type: "note", id: "not_galeri", title: "Gallery carving", text: "The last carving in the gallery contains a sequence fragment from the language of the Artifact. It might be useful at the transmitter — I should tell Selin. But looking at the carvings strains my mind." },
      ],
      choices: [
        { id: "geri", text: "Leave the gallery", next: "n_kazi_hub" },
      ],
    },

    n_sondaj: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are at the edge of the borehole. A hellish, black, and deep rip opened in the ground whose end you cannot see no matter how much you shine the light of your tablet. The excavation team must have ripped that curse out from the bottom of this well. Right next to it, a dying generator rasps — its engine shakes like crazy, the noise it makes is the kind that deafens ears but it feeds the last few lamps illuminating the surroundings. If you turn it off, you will gain a pitch-black silence; but at that moment the whole world around you will turn black, only the light of the small tablet in your hand will remain." },
        { type: "waitTap" },
        { type: "flag", set: { sondajGoruldu: true } },
      ],
      choices: [
        { id: "kapat", text: "Turn off the noisy generator (silence but darkness)", next: "n_sondaj_kapat" },
        { id: "bak", text: "Look down the well (risky)", next: "n_sondaj_bak" },
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_sondaj_kapat: {
      cost: 1,
      events: [
        { type: "narrate", text: "Darkening your eyes, you pull down the oily, rusty switch of the generator. That deafening engine rasp cuts like a knife... And along with it, the pale yellow lamps hanging from above burst and go out. Everywhere is pitch black. Only the screen of the tablet in your hand illuminates your face like a corpse. But in this terrifying silence, for the first time, you hear that the voice inside your brain has gone quiet. Even that disgusting hum of the Artifact has retreated. Silence is currently your only refuge." },
        { type: "stat", stat: "gurultu", delta: -20, note: "The generator went quiet — NOISE decreased, darkness fell", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
        { type: "flag", set: { jeneratorKapali: true } },
      ],
      choices: [
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_sondaj_bak: {
      cost: 1,
      events: [
        { type: "narrate", text: "Kneeling down, you lean down from that foul-smelling wet edge of the well. A blind darkness... But seconds later, at the very bottom of that darkness, you see pale red fibers glistening like dirty blood flowing through veins. The roots of the Artifact, its fleshy extensions are spread thousands of meters below. And the moment you look into that sewer, you feel millions of invisible eyes looking at YOU from that bottomless darkness. The number inside your head suddenly turns into a scream — get back, leap back immediately so you don't vomit right away!" },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — The darkness peeped into your soul", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15, note: "You leaped back in terror — NOISE increased", noteKind: "alert" },
        { type: "flag", set: { buluntuyaBakti: true } },
      ],
      choices: [
        { id: "geri", text: "Step away from the well", next: "n_kazi_hub" },
      ],
    },

    /* ANCIENT DOOR — shadow (relic) puzzle: RE7 style 3D turning */
    n_kadim_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The path leading to the very heart of the excavation is blocked by a massive stone door. There is a single hollow on it: a wide, deformed sign of an eye and fleshy arms erupting from that eye. Selin whispers behind you with a trembling voice: «The excavation team pounded the wall with sledgehammers for weeks to open this place but they couldn't even scratch it. The only way to open the lock is to place the thing on this pedestal in front of the projector at the right angle...»" },
        { type: "narrate", text: "You approach the pedestal. The thing standing right in front of the projector lamp... My God, it is a disgusting, deformed tumor piece where metal and human bone are fused together; a relic torn from the flesh of the Artifact. As you touch and turn it, its shadow falling on the massive stone wall behind shifts shapes — while it looks like a messy pile of intestines at one angle, at another angle... The shadow comes alive. You must fit the shadow perfectly over that open eye symbol on the wall." },
        { type: "waitTap" },
        { type: "note", id: "not_kadim", title: "Ancient door", text: "The door leading to the center of the excavation is locked with a shadow puzzle. I need to turn and tilt the relic on the pedestal to fit its shadow onto the mark on the door (circular eye + radiating arms). The shadow falls differently at every angle." },
      ],
      interaction: {
        kind: "shadow",
        title: "ANCIENT LOCK — FIND THE SHADOW",
        targetYaw: 0, targetPitch: 0,
        startYaw: 65, startPitch: -40,
        step: 15, tol: 12,
        success: "n_kadim_acildi",
        cancel: "n_selin_plan",
      },
    },

    n_kadim_acildi: {
      cost: 1,
      events: [
        { type: "narrate", text: "The moment the shadow fits perfectly onto that disgusting fleshy eye on the wall, a shrill, living scream rises from the bone piece on the pedestal — and that massive stone door, with a groan similar to the sound of breaking bones, slides aside millimeter by millimeter to open. The air erupting afterward hits your face like the coldness of a graveyard." },
        { type: "flag", set: { kadimAcildi: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Selin holds her breath while looking at the shadow on the wall, left in terror. «Those big professors went mad in front of this door for months... You... How did you do this in seconds?» You cannot answer, because while turning that bone your fingers moved not with your will, but by the command of that thing leaking into your brain. The Artifact is calling you inside." },
      ],
      choices: [
        { id: "sigina", text: "Enter the dark sanctuary", next: "n_siginak" },
      ],
    },

    /* ================= SANCTUARY — TRACES OF THREE VICTIMS ================= */
    n_siginak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The sanctuary behind the door is the final threshold of that foul-smelling hell. Along the walls are hollows large enough to fit a human; these are the graves of those who went down to the excavation and never saw the sky again. The Artifact swallowed their minds but their remaining putrid bodies are lined up here like altars. Fresh blood and pus are still leaking from three hollows. You recognize those jumpsuits, those belongings. They are here." },
        { type: "waitTap" },
        { type: "objective", text: "Pass through the sanctuary — but you can examine the three traces if you want" },
      ],
      choices: [
        { id: "baturay", text: "Examine the familiar jumpsuit in the first hollow", next: "n_siginak_baturay", if: { flag: "izBaturay", equals: false } },
        { id: "deniz", text: "Examine the small figure in the second hollow", next: "n_siginak_deniz", if: { flag: "izDeniz", equals: false } },
        { id: "nevin", text: "Examine the rooted relic in the third hollow", next: "n_siginak_nevin", if: { flag: "izNevin", equals: false } },
        { id: "tunel", text: "Look at the narrow tunnel descending from the sanctuary", next: "n_tunel_giris", if: { flag: "tunelGoruldu", equals: false } },
        { id: "an", text: "Look at all three traces together, pause for a moment", next: "n_siginak_an", if: { flag: "izBaturay", equals: true } },
        { id: "gec", text: "Pass through the sanctuary, walk to the final threshold", next: "n_son_hazirlik" },
      ],
    },

    n_siginak_an: {
      cost: 1,
      events: [
        { type: "narrate", text: "You direct the light of your tablet onto those three graves at once: Baturay, Deniz, Nevin. A technician, a small child, a botanist... The Artifact used their bodies like puppets and trapped their souls inside that damn hive. Each is counting their own hellish number. But you will not be the fourth victim. There is only one mercy left to be shown to these poor souls: silencing that damn frequency forever." },
        { type: "waitTap" },
        { type: "narrate", text: "That intense wave of fear in the middle of your chest replaces itself with a wild rage. You grit your teeth. For them... And for the last people upstairs who still remember their own names, you will silence that monster.", ifStat: { stat: "akil", gte: 30 } },
        { type: "stat", stat: "akil", delta: 6, note: "SANITY +6 — Fear turned into a wild purpose", noteKind: "system" },
      ],
      choices: [
        { id: "gec", text: "Pass through the sanctuary, walk to the final threshold", next: "n_son_hazirlik" },
      ],
    },

    /* ================= DESCENT TUNNELS (optional depth) ================= */
    n_tunel_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Right in the corner of the sanctuary, there is a narrow, sticky tunnel spiraling downward. This was not excavated by human hands; it's like an organic throat opened by those fleshy, wet roots of the Artifact melting the rock with acid. A hot, moist air that vomits humanity and a low intestinal rumble that makes you nauseous rise from inside. Entering there is complete madness. But something seems to mutter your name from inside that darkness." },
        { type: "waitTap" },
        { type: "flag", set: { tunelGoruldu: true } },
        { type: "narrate", text: "Selin catches your garment from behind and tugs it, her eyes wide open: «Don't enter there! Two guards who went down there melted among those flesh fibers before they could even scream... But the choice is yours. Whatever is at the bottom of that hole is alive, I feel it.»" },
      ],
      choices: [
        { id: "in", text: "Descend into the tunnel (risky — deep exploration)", next: "n_tunel_derin" },
        { id: "vazgec", text: "Give up, return to the sanctuary", next: "n_siginak" },
      ],
    },

    n_tunel_derin: {
      cost: 1,
      events: [
        { type: "narrate", text: "You crawl down through the narrow tunnel, those wet, fleshy walls around rubbing against your shoulders, your hair. The walls are pounding thud-thud like a pulse; at every centimeter you take, that code inside your brain screams. At the very bottom, in the middle of a completely clotted black liquid, are the shredded belongings left from the last members of the excavation team... And a terrifying choice standing before you." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — You are at the bottom of the living flesh tunnel", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "The creature's intestinal rumble surrounded you — NOISE increased", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sandik", text: "Open the crate left by the excavation team", next: "n_tunel_sandik" },
        { id: "fisilti", text: "Listen to the whisper inside the hum (completely risky)", next: "n_tunel_fisilti" },
        { id: "cik", text: "You went too deep — climb back up", next: "n_siginak" },
      ],
    },

    n_tunel_sandik: {
      cost: 1,
      events: [
        { type: "narrate", text: "Directing the light of your tablet onto the muddy case, you break its latches open. Inside lies a blood-stained diary, three spare batteries, and a primitive headphone setup made by the excavators to cut out that maddening sound. The last page of the diary is violently torn but that sentence scratched with a fingernail can be read at the bottom part: 'Reversing the frequency won't kill that bastard, it will only put it to sleep... Until another victim comes along one day and wakes it up again.'" },
        { type: "battery", spares: 3 },
        { type: "document", open: true, doc: {
          id: "d_tunel_gunluk", title: "Last Excavator's Diary", style: "type",
          meta: "— at the bottom of the tunnel —",
          body: "The two of us are left. The others became 'family'. We went\ndown to see the source. Now I understand:\nthe Artifact is not alone. This is only one tip. Its body\nis deeper, beneath the sea, for kilometers.\n\nThe station 'feeds' it — with humans. If you silence it,\nhunger remains. And a hungry thing, sooner or later, reaches\nout. It starts hitting toward the surface. Three times.\nAlways three times." } },
        { type: "flag", set: { tunelSandik: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "cik", text: "Leave the crate, climb back up", next: "n_siginak" },
      ],
    },

    n_tunel_fisilti: {
      cost: 1,
      events: [
        { type: "narrate", text: "Closing your eyes, you press your ear against the hum coming from that wet wall. And that whisper suddenly becomes clear... The vomitous chorus of thousands of dead people shouts your name in one voice! Baturay, Deniz, Nevin, all the crew torn apart upstairs... «Join us... Loneliness is so cold... Count with us... Three... Three... Three...» Your will turns into dust, your knees buckle; at that moment you just want to hug the wall and melt away inside that flesh." },
        { type: "stat", stat: "akil", delta: -20, note: "SANITY -20 — The chorus of the dead grabbed your soul", noteKind: "alert" },
        { type: "waitTap" },
        { type: "narrate", text: "Right as you are about to lose consciousness, you hear your own trembling voice at the very bottom of that foul chorus. 'No!' Passing the primitive headphone frantically over your ears, you rip that bond apart and climb upward by digging your nails into the rock. You know you won't be able to get out of there next time." },
        { type: "flag", set: { tunelFisilti: true } },
      ],
      choices: [
        { id: "cik", text: "Compose yourself, climb back up", next: "n_siginak" },
      ],
    },

    n_siginak_baturay: {
      cost: 1,
      events: [
        { type: "narrate", text: "You hold the light of your tablet over the jumpsuit in the first hollow. The plastic tag on its chest is stuck in mud: B. SOYLU. Baturay. The first victim who dragged you into this hell, who sent that whistleblower email. You had found his body completely mangled in the K-6 infirmary... But it turns out that damn echo of his soul has always been among the flesh here. Between his clenched, decayed fingers, there is a bloody piece of paper he holds tightly." },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_baturay_son", title: "Baturay's Last Note", style: "hand",
          meta: "— in the sanctuary, in his hand —",
          body: "You are the one reading me, I know. The one coming after me.\nThey brought you here because I refused.\n\nIt will say 'three' to you too. Do not count. I counted once,\njust once, because I was curious. That much\nwas enough. Now I am both there and here.\n\nI sent the mail but I was late. Don't you be late.\nThere is a journalist upstairs, Ergin. Reach him.\nLet the world know. — B." } },
        { type: "flag", set: { izBaturay: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Return to the sanctuary", next: "n_siginak" },
      ],
    },

    n_siginak_deniz: {
      cost: 1,
      events: [
        { type: "narrate", text: "When you direct the light of your tablet onto that tiny body in the second hollow, your heart squeezes. A small child size. Next to it stands a walkie-talkie with leaked batteries and that disgusting family picture he drew on the wall with his own blood: A mother, a father, and in their middle a child with no face, hand in hand... Deniz. That toddler who cried to you through the radio static on floor K-5. Scratched with a stone nail right below the picture: 'I became a good boy. now we are all together.'" },
        { type: "waitTap" },
        { type: "narrate", text: "He had asked Deniz that crucial question upstairs: 'Did you join too?' Here is the answer, standing written in blood in this stone grave. But if he opened those doors for you upstairs, it means a piece of that tiny soul is still fluttering in the stomach of that monster.", if: { flag: "denizSoruldu", equals: true } },
        { type: "flag", set: { izDeniz: true } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "geri", text: "Return to the sanctuary", next: "n_siginak" },
      ],
    },

    n_siginak_nevin: {
      cost: 1,
      events: [
        { type: "narrate", text: "The third hollow is completely covered with mold, black leeches, and veiny vines: the decaying body of Dr. Nevin Aras. Botanist. That maddened gardener of floor K-3. Those fleshy roots are still alive, breathing with a slight tremble along with the hairs on them. If you showed her mercy and saved her on the upper floors, these roots will shield you against that monster. If you couldn't save her... Just a foul-smelling pit." },
        { type: "waitTap" },
        { type: "ambient", text: "A wet vine wraps around your wrist — but it doesn't squeeze your flesh, on the contrary, it pushes you upward with tenderness, as if showing the direction, toward those dark stairs. That maddened raspy voice of Nevin echoes in your brain: «The root is patient, my child... The earth swallows every filth. I waited for you here. Now I will be armor to your flesh, you pass through that door...»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "flag", set: { izNevin: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Return to the sanctuary", next: "n_siginak" },
      ],
    },

    n_selin_sifir: {
      cost: 1,
      events: [
        { type: "narrate", text: "«I don't know...» says Selin, gritting her teeth with that wild despair in her eyes. «When I first descended into this sewer, it was roaring 'Seven' inside my brain. Now 'Three'... I don't know if days are left, or seconds — That monster's perception of time doesn't flow like ours. But after three, two will come, then that damn one... And when zero strikes...» She stops and looks into the darkness. «Hurry up, or your head will explode.»" },
        { type: "narrate", text: "Yet you had listened to those secret dead frequencies upstairs — You know the rhythm of that voice. You realize that terrifying truth Selin doesn't know: The number is not fixed. It is getting faster, time is narrowing down!", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      choices: [
        { id: "nasil", text: "Ask \"How did you come here?\"", next: "n_selin_gecmis" },
        { id: "ilerle", text: "Start exploring the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_selin_gecmis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Selin leans her back against the wet rock and closes her eyes. «I was the sonar technician of the excavation team. Supposedly safe on the surface, in that fresh air... But when no sound came from the team below except radio static, they said 'Go down and have a look'. It was eleven months ago.» She lets out a wild, crazy laugh. «When I went down, everyone had stripped completely naked, hugging that mass of flesh and smiling... I was born deaf. My left ear doesn't hear anything. Maybe that's why that foul voice of the monster couldn't completely rot my brain. I hear it halfway. I remained half a human.»" },
        { type: "waitTap" },
        { type: "narrate", text: "«That's why I need you. I can fill that panel but I cannot lock the radio onto that frequency — you need to hear that sound clearly, doing what I couldn't do with that deaf ear of mine. Two half men make one single weapon. Isn't it funny? The Artifact united everyone to make them a mass of flesh; it also united us as a single bullet against it.»" },
        { type: "stat", stat: "akil", delta: 5, note: "SANITY +5 — There is a living soul to lean your back on in the dark", noteKind: "system" },
        { type: "note", id: "not_selin", title: "Selin", text: "Selin is the sonar technician of the excavation team. Since she was born deaf in one ear, the voice of the Artifact didn't completely affect her — she can resist halfway. She will read the sequence, I will adjust the frequency. We complete each other." },
      ],
      choices: [
        { id: "ilerle", text: "Start exploring the excavation site", next: "n_kazi_hub" },
      ],
    },

    /* ================= PASSAGE — IN FRONT OF THE ARTIFACT ================= */

    /* FINAL PREPARATION — point of no return */
    n_son_hazirlik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You stand at that final crevice at the exit of the sanctuary. Its front opens completely to the lair of that creature. Selin puts her hand on your shoulder, her fingers trembling: «The moment you take a single step from this threshold, there is no turning back. The moment we stand in front of that monster, it will lay our souls onto the operating table. Are you ready? Check your tablet, your batteries, the last crumbs left of your mind... If you make a mistake there, I can't save you.»" },
        { type: "waitTap" },
        { type: "narrate", text: "Those earplugs you found from the camp area are in your pocket... They won't completely cut that internal sewer sound but they can give your brain a second to breathe at the moment you are about to go completely mad.", if: { flag: "kampArandi", equals: true } },
        { type: "narrate", text: "That chorus of those disgusting dead people you heard at the bottom of that tunnel is still making static in your ears. Now you know where that sound will hit from — you have already memorized how to defend yourself against it.", if: { flag: "tunelFisilti", equals: true } },
        { type: "objective", text: "Step in front of the Artifact when you are ready" },
      ],
      choices: [
        { id: "hazir", text: "I am ready — Step in front of the Artifact", next: "n_k2_gecit" },
        { id: "bekle", text: "Stop for a moment, compose yourself (decrease noise)", next: "n_son_nefes" },
      ],
    },

    n_son_nefes: {
      cost: 1,
      events: [
        { type: "narrate", text: "You close your eyes tightly. Pressing your tablet against your chest, you take a deep breath in the pitch blackness. One. Two. You listen not to that foreign number in your brain, but only to your own heartbeat tearing your chest. Slowly, that dirty hum retreats from your brain. You are ready." },
        { type: "stat", stat: "gurultu", delta: -20, note: "You took a breath in the dark — NOISE decreased", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
      ],
      choices: [
        { id: "hazir", text: "Step in front of the Artifact", next: "n_k2_gecit" },
      ],
    },

    n_k2_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "And you step out from that crevice... You are right in front of the monster. The moment the light of your tablet hits that massive mass, you force yourself not to vomit." },
        { type: "waitTap" },
        { type: "narrate", text: "A massive, wet, trembling fleshy mass embedded like a tumor inside the rock... Neither plant, nor animal, nor a machine... A combination of the most disgusting states of all three. There are holes on it that open and close irregularly, with pus leaking out from inside; they could be eyes, they could be mouths, or just breathing wounds... That massive radioactive vibration emitting from it makes your bones ache. And right in the middle of your brain, that soft, deceptive voice of your deceased mother whispers: «Three... Why are you late, my child... Three... Come on, come...»" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — That creature is operating on your soul", noteKind: "alert" },
        { type: "narrate", text: "The transmitter platform stands at the exact opposite end of that foul pool. Between you is only that massive mass and its opening holes. Selin shouts: «I am clearing a path for you! Those damn roots of Nevin are moving! Whatever you did upstairs, it is saving your life now!»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "The transmitter platform is right across but there is an empty, unprotected death zone between you. Selin whispers desperately: «There is no cover! Just run like crazy and pray for your soul while it reads you! If we could have saved Nevin upstairs, those roots would be a shield, but now we are alone!»", if: { flag: "nevinKurtarildi", equals: false } },
      ],
      choices: [
        { id: "gec", text: "Pass in front of the Artifact", next: "n_gecis_dene" },
      ],
    },

    n_gecis_dene: {
      cost: 1,
      events: [
        { type: "narrate", text: "You step right into the middle of those malicious gazes. Your consciousness is divided in two: while one half of you is tearing itself apart to run to the opposite side, the other half wants to kneel down, hug that mass of flesh, and melt away inside that deceptive peace. «Three... Your feet are bleeding, why are you running... Three... It's very warm here, everyone is here... Your mother is waiting for you too...»" },
        { type: "narrate", text: "Right at that moment, those massive roots of Nevin that you saved erupt by bursting the rock and close off the front of those purulent holes of the Artifact, becoming a flesh shield for you! «Now! Run! Don't stop!» tears herself apart Selin.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "That heavy bite sitting in your stomach — that filthy food of the Chief — shows you for a moment to that monster's hive consciousness like someone from the 'family'. The Artifact hesitates for a second, it doesn't think you are a foreign tumor. That one-second hesitation becomes life-giving water for you!", if: { flag: "sofraYedi", equals: true } },
        { type: "ambient", text: "And suddenly, something completely unexpected happens — From the speaker of that small tablet in your hand, through the sonar line kilometers above, that childish static voice of little Deniz explodes: 「You asked me upstairs... 'Did you join' ... I still don't know my answer, brother. But now I am bursting those floor doors for you. All of them! Run brother, don't ever get caught by my father!」 All the mechanical locks throughout the cave open with a ring!", if: { flag: "denizSoruldu", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Run to the transmitter", next: "n_gecis_orta", if: { flag: "nevinKurtarildi", equals: true } },
        { id: "kos2", text: "Run to the transmitter (you are counted as family)", next: "n_gecis_orta", if: { flag: "sofraYedi", equals: true } },
        { id: "kos3", text: "Run to the transmitter (Deniz cleared the path)", next: "n_gecis_orta", if: { flag: "denizSoruldu", equals: true } },
        { id: "direncsiz", text: "Resist the number, pass through with your will", next: "n_gecis_irade" },
      ],
    },

    /* middle of the passage — risk of being caught based on noise/sanity state */
    n_gecis_orta: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are right in front of that pile of flesh. Its wet, massive holes turn toward you, the radioactive hum it emits vibrates your internal organs. You are right halfway — One more step, one more step until your lungs burst... The Artifact tries to extract the fear in the deepest part of your soul with tweezers: If you made too much noise, if you ate away at your mind on the upper floors, it will catch you instantly." },
        { type: "waitTap" },
        { type: "narrate", text: "Fortunately, you managed to maintain your silence until coming here — the Artifact cannot find a crumb of madness to hold onto in your mind, you slip right through its hands. The transmitter panel is right in front of you!", ifStat: { stat: "gurultu", lte: 50 } },
      ],
      choices: [
        { id: "ulas", text: "Reach the platform", next: "n_platform_ulas", ifStat: { stat: "gurultu", lte: 50 } },
        { id: "yakala", text: "Advance (The Artifact feels you)", next: "n_gecis_yakala", ifStat: { stat: "gurultu", gte: 51 } },
      ],
    },

    n_gecis_yakala: {
      cost: 1,
      events: [
        { type: "narrate", text: "You made too much noise, your breathings awakened that monster! A shadowy, fleshy arm of the Artifact darts out from the rock and wraps around your left wrist! This touch burns your flesh like acid. That awful hum paralyzes your brain, that number turns into a command: STOP AND JOIN US. For a moment all the strength is drained from your legs, you stop. That scream of Selin coming from afar tears your eardrums: «Fight it! Say your own name! Forget the number!»" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Malicious flesh fibers gripped your wrist", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtul", text: "Shout your own name, break free", next: "n_gecis_kurtul" },
        { id: "birak", text: "Do not resist, let yourself go (dangerous)", next: "n_son_derin" },
      ],
    },

    n_gecis_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "You shout your own name until blood comes from your throat! Against the code of that monster, you vomit your own identity onto the wall! For a moment the entire cave freezes, that hum stops like a knife. That fleshy bond melts and unties from your wrist and you throw yourself forward, onto the transmitter platform. Your clothes are covered in that disgusting fluid, panting but it is still you!" },
        { type: "stat", stat: "gurultu", delta: -15, note: "You tore the flesh by shouting your name — NOISE dropped", noteKind: "system" },
      ],
      choices: [
        { id: "ulas", text: "Reach the platform", next: "n_platform_ulas" },
      ],
    },

    n_gecis_irade: {
      cost: 1,
      events: [
        { type: "narrate", text: "You have neither a root to be a shield nor a bond that protects you — you only have your pure survival madness! While that disgusting sound flows into your mind like sewage, you count every step you take with your own name. As it says 'Three', you say 'Me!'. One! Two! Three — No, not its three, YOUR OWN THREE! With bloody sweat leaking from your forehead, leaving half of your brain there, you throw yourself onto the platform." },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — You passed with pure will but your brain took damage", noteKind: "alert" },
      ],
      choices: [
        { id: "verici", text: "Reach the transmitter platform", next: "n_platform_ulas" },
      ],
    },

    /* ================= TRANSMITTER PLATFORM — PREPARATION ================= */
    n_platform_ulas: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are on the platform. That disgusting mass was left behind, the hot wind it emits licks your back but you are now at the head of the console. Selin leaps out from the rock crevice where she was hiding and collapses next to you, her face pale as chalk: «You made it... My God, you survived that hell!» She shouts panting. «Now the worst part begins.»" },
        { type: "narrate", text: "This transmitter is a primitive sonar panel made by the deceased excavation team to talk to that monster but failed. But half of the screens are dead — the main line coming from the generator is cut. First you need to give life to this junk: connect the cut cables. Selin holds an old schematic to the light of your tablet with trembling hands: «Fit the cables according to their color codes! Don't you dare connect them wrong, if a spark flies out, the sound it makes will completely awaken that bastard!»" },
        { type: "objective", text: "Give power to the transmitter — connect the cut lines" },
        { type: "note", id: "not_verici_guc", title: "Transmitter power line", text: "The transmitter console is powerless — I need to reconnect the cut cables according to the color code. A wrong connection creates a spark (noise). Once power comes, we can reverse the Artifact's frequency." },
      ],
      choices: [
        { id: "bagla", text: "Connect the cut power lines", next: "n_verici_guc", if: { flag: "vericiGuc", equals: false } },
        { id: "gecdur", text: "Power has arrived — proceed to the sequence", next: "n_verici", if: { flag: "vericiGuc", equals: true } },
      ],
    },

    n_verici_guc: {
      cost: 1,
      events: [
        { type: "narrate", text: "You tear open the oily back panel of the console with your nails. Five thick, bare-tipped cut cables await the current to come from the generator. Selin holds the light of your tablet inside the panel, her breath burning your neck: «Be quick... But do not tremble. Every spark will unleash that flesh mass upon us.»" },
      ],
      interaction: {
        kind: "wires",
        title: "TRANSMITTER POWER LINE — CONNECT THE CABLES",
        cables: [
          { id: "w_ana", label: "MAIN", color: "#c2a24a" },
          { id: "w_sonar", label: "SONAR", color: "#4aa2c2" },
          { id: "w_amp", label: "AMP", color: "#c25a5a" },
          { id: "w_faz", label: "PHASE", color: "#5aa26a" },
          { id: "w_top", label: "GROUND", color: "#8a8a8a" },
        ],
        ports: [
          { id: "vp1", label: "I" },
          { id: "vp2", label: "II" },
          { id: "vp3", label: "III" },
          { id: "vp4", label: "IV" },
          { id: "vp5", label: "V" },
        ],
        pairs: { w_ana: "vp1", w_sonar: "vp4", w_amp: "vp2", w_faz: "vp5", w_top: "vp3" },
        penalty: { gurultu: 14, akil: -5, text: "SPARK — Metal collided, the Artifact flinched! NOISE +14" },
        success: "n_verici_guc_ok",
        cancel: "n_platform_ulas",
      },
    },

    n_verici_guc_ok: {
      cost: 1,
      events: [
        { type: "system", text: "TRANSMITTER: POWER ACTIVE" },
        { type: "narrate", text: "The moment you lock the last cable into its slot, the console comes alive like a wild beast — Screens awaken vomiting green static, the massive sonar dish overhead begins to turn with a rusty groan. The Artifact feels this metal current instantly: That voice in your ears sharpens, the number forces your skull with anger: «...THREE... WHAT THE FUCK ARE YOU DOING... THREE...» Selin collapses onto the keys: «Electricity is here! Now we will enter that damn password, quick!»" },
        { type: "flag", set: { vericiGuc: true } },
        { type: "stat", stat: "gurultu", delta: 10, note: "The sonar dish is turning — NOISE increased", noteKind: "alert" },
      ],
      choices: [
        { id: "dizilim", text: "Proceed to the symbol sequence", next: "n_verici" },
      ],
    },

    /* ================= TRANSMITTER — FINAL PUZZLE ================= */

    n_verici: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "This rusty sonar console now glistens before you like a death bill. There are two deadly stages: First you will vomit that symbol sequence we decoded from those malicious carvings on the wall onto the panel, then you will lock the radio onto the exact opposite of that 432 hertz monster frequency." },
        { type: "narrate", text: "Selin is leaning over the console, foam leaking from her mouth: «I am reading the sequence, you will press those damn buttons! The order is this: Triangle-eye, Curve, Four-notch, and Wave... This means 'DIE' in that bastard's language! Tell me you are ready!»" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sembol", text: "Enter the symbol sequence (Selin is reading)", next: "n_verici_sembol" },
      ],
    },

    n_verici_sembol: {
      cost: 1,
      events: [
        { type: "narrate", text: "Eight decayed buttons on top of the console... Each has those maddening carvings on it. Selin shouts behind you as loud as she can. If you press a single button wrong, the Artifact will turn it back as a lobotomy attack to be made to your brain." },
      ],
      interaction: {
        kind: "symbols",
        title: "LANGUAGE OF THE ARTIFACT — ENTER THE 'SILENCE' SEQUENCE",
        glyphs: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
        sequence: ["g5", "g4", "g6", "g7"],
        success: "n_sembol_ok",
        cancel: "n_verici",
        penalty: { akil: -15, gurultu: 10, text: "WRONG BUTTON — Lightning flashed in your brain! SANITY -15" },
      },
    },

    /* The Artifact resists when the sequence is entered — moment of tension */
    n_sembol_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you press the last symbol, the console swallows the password — And the Artifact FEELS its flesh being cut! The entire cave shakes as if an earthquake is happening; stones, filth rain from the ceiling onto your head, projector lamps burst like crazy. That hum is no longer a mother's voice, it is a monster scream bringing blood from your ears: «NO— FAMILY— DO NOT LEAVE US— LET THE COUNTING NOT STOP—»" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — The monster is scratching your brain", noteKind: "alert" },
        { type: "waitTap" },
        { type: "ambient", text: "Just at that time, from the sonar line, that raspy, tearful voice of Ece explodes from the radio: «I am holding it! I am pressing a reverse signal from the sonar network and suppressing its brain, becoming a shield for you — But my head is about to explode, I can't hold out! Adjust the frequency, FINISH THIS JOB!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Ece is gone... You had sold her out like bait upstairs. Protective reverse signal support does not come! That massive mental weight of the Artifact collapses directly inside your skull, your brain is weeping blood, you have to endure alone!", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Selin grabs you by your collar and shakes you like crazy, blood leaking from her eyes: «Don't fall apart! Do not lose your consciousness! The last move — adjust the damn radio! Hit that bastard!»" },
      ],
      choices: [
        { id: "frekans", text: "Proceed to the radio frequency", next: "n_verici_frekans" },
      ],
    },

    n_verici_frekans: {
      cost: 1,
      events: [
        { type: "narrate", text: "The symbols panel flashes red red, the console trembles as if about to explode. Now that final blow: you will bring the dial of the radio to the anti-frequency that will break the 432 hertz death wave of the Artifact. Selin shouts: «Pull it to 433.6! I calculated it, this will collapse that flesh mass! But you have a single chance, if you miss, that wave will turn us to ashes!»" },
        { type: "narrate", text: "But you had listened to those secret dead broadcasts... Your ear recognizes the rhythm of that static. There is a mistake where Selin said 433.6 in that panic; your instinct, that half-maddened brain of yours tells you that the dial should sit at 433.8. Who will you trust? Your own madness, or Selin?", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      interaction: {
        kind: "radio",
        target: 433.6,
        success: "n_buluntu_yuz",
        cancel: "n_verici_frekans",
      },
    },

    /* ================= MOMENT OF SILENCING — ENDING BRANCHING ================= */

    /* ================= CONFRONTATION WITH THE ARTIFACT ================= */
    n_buluntu_yuz: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Everything is ready, your finger is on that death button. But before pulling the trigger, one last time... You look at that disgusting pile of flesh. With its open holes, it looks directly into your soul. And beneath that maddening number, for the first time you feel another sensation: a wild, ancient loneliness. A creature left all alone in this dark sewer for millions of years... Could its hunting of humans and making them a mass of flesh be not a massacre, but a disgusting scream thrown not to be left alone? It just wants a family." },
        { type: "waitTap" },
        { type: "narrate", text: "Selin digs her nails into your shoulder and shakes you: «I know what you are thinking... Do not pity that filth! That is not mercy, it is the last bullet it fires into your brain! It is trying to drag you inside that hive too! Make your decision, seconds are left until zero!»" },
        { type: "narrate", text: "You had decoded the monster's language upstairs... And at that moment lightning flashes in your brain: 'Three' is not a countdown! It is a victim list! It called out three times until today and swallowed three souls: Baturay, Deniz, Nevin. You are the first living piece of flesh that refuses to be the fourth wall of that hive.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "objective", text: "Silence the Artifact — fire the frequency" },
      ],
      choices: [
        { id: "atesle", text: "Fire the frequency — Silence the Artifact", next: "n_sustur" },
      ],
    },

    n_sustur: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You close your eyes and press the trigger! The console fires that anti-frequency with a wild scream! The entire cave splits in two as if; those ancient walls crack, the last remaining lamps explode like bombs. That hypnotic voice of the Artifact changes for the first time — That calm number replaces itself with the howling of a dying wild animal: «THREEE— THREEE— NOOO—»" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "waitTap" },
        { type: "narrate", text: "«It's dying! It's in its death throes!» shouts Selin, wiping the blood flowing from her ears. «But the frequency is not enough, it doesn't completely die! We have to make a final decision, now!» While that last radiation wave emitted by that creature while dying flickers the screen of your tablet, those awful paths before you emerge." },
        { type: "objective", text: "Decide what to do with the Artifact" },
      ],
      choices: [
        { id: "yuzey", text: "Lock the frequency, escape to the surface with Selin", next: "n_veda_selin", if: { flag: "eceEleVerildi", equals: false } },
        { id: "feda", text: "Overload the transmitter — completely destroy the Artifact (sacrifice yourself)", next: "n_son_sessizlik" },
        { id: "katil", text: "Stop resisting — join the number, choose peace", next: "n_son_derin" },
        { id: "kayit", text: "Raise the tablet, record everything (document)", next: "n_son_kayit" },
        { id: "yuzey_zor", text: "Try to escape with Selin (No Ece support)", next: "n_son_sifir", if: { flag: "eceEleVerildi", equals: true } },
      ],
    },

    /* ===== FAREWELL — LAST MOMENT BEFORE ESCAPE TO SURFACE ===== */
    n_veda_selin: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The frequency gets locked, that flesh mass of the Artifact groans by shrinking into itself. Selin grips your hand but before leaving, one last time to the back... She looks at those three fresh graves in that sanctuary. «We left them inside that flesh...» she says, her throat raspy. «Baturay... That tiny toddler... Nevin... We couldn't save them.»" },
        { type: "waitTap" },
        { type: "ambient", text: "Right at that moment, those veiny roots of Nevin that you saved move with a last ditch effort, not to attack you, but by extending from the base of Selin's feet upward, toward those dark stairs, constructing a fleshy escape path for you. You didn't leave them behind; they are carrying you upward.", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "«But you are here...» says Selin, wiping the bloody tears in her eyes and looking at you. «And me. Two living humans. In this damn hole, this is a miracle... Run! Run for their memory!» Those rusty stairs going upward beyond the sanctuary are the only exit door under the fading light of your tablet." },
      ],
      choices: [
        { id: "kac", text: "Run upward, to the surface with Selin", next: "n_son_yuzey" },
      ],
    },

    /* ===== ENDING 1: SURFACE (best) ===== */
    n_son_yuzey: {
      ending: true,
      events: [
        { type: "narrate", text: "You completely lock the frequency. That maddening hum of the Artifact lowers like a dying furnace, rasps... And ends. For the first time, for eleven long months for the first time, this damn station sinks into COMPLETE silence. There are only your breathings." },
        { type: "waitTap" },
        { type: "ambient", text: "The sound of Ece crying with sobs comes from the sonar line through the radio: «It stopped... That son of a bitch went quiet. The workers on the upper floors are waking up... That redness in their eyes is going away. You did it... My God, you did it!»" },
        { type: "narrate", text: "Selin holds your hand tightly: «The escape pod is on the K-1 command floor! While the station is quiet, all electronic locks are open! RUN!» Together you climb upward, toward those pitch-black floors. In your hand is only that weak light of the tablet... Six floors. Five floors. Four floors." },
        { type: "waitTap" },
        { type: "narrate", text: "When you look back through the thick glass of the escape pod, BORDER-1 shrinks like a dead fish at the bottom of that dark sea. Selin is panting in the seat next to you, both crying and laughing. Ece's static voice comes from the radio: «See you on the surface, in the fresh air...» Above your head, hundreds of meters above, is a real sky, real stars. And inside your brain, no monster counts anymore." },
        { type: "waitTap" },
        { type: "ambient", text: "Right as the pod is about to launch to the sea surface, something massive crashes onto the thick steel hull from the outside. Once. Then at regular intervals: Three hits. Just like in that torn diary of Baturay... But this sound does not come from WITHIN. It strikes from the OUTSIDE, from the very bottom of that dark ocean. You silenced the Artifact; but that massive thing that fed that flesh mass there for all these years, striking that hull, is still there... And now there is no one left to feed it. That thing is hungry." },
        { type: "system", text: "— ENDING: SURFACE —" },
        { type: "system", text: "The Artifact went quiet. You escaped together with Selin and Ece. You survived — and brought the truth to the surface." },
        { type: "system", text: "But there is still something striking at the bottom of BORDER-1. And someone, reading the evidence you sent, will decide to descend down there." },
        { type: "system", text: "BORDER-1 · THANK YOU" },
      ],
    },

    /* ===== ENDING 2: SILENCE (sacrifice) ===== */
    n_son_sessizlik: {
      ending: true,
      events: [
        { type: "narrate", text: "You break the dial of the radio all the way to the last stage — Transformers inside the console explode, sparks erupt into your face. Selin screams: «No! If you overload that much current, that frequency will melt your brain too—» But you don't withdraw your hand from the button. Taking all the poison of that creature, you vomit it back to it at the cost of your own life!" },
        { type: "waitTap" },
        { type: "narrate", text: "The entire cave gets covered with a blinding white light. That bitter cry of the Artifact and the scream rising from your throat unite in the same frequency and burn the air. You destroy it down to its cells — But that massive energy explosion nails your body to the rock too. The last thing you feel is Selin dragging you toward the door to save you but you pushing her away: «Go... Save yourself...»" },
        { type: "waitTap" },
        { type: "ambient", text: "Selin barely throws herself out and the thick steel hatch closes between you. You remain right at the center of that white hell. While that flesh mass turns to ashes, it leaves a final gift to your mind: Now there is neither static in your ears nor those damn numbers... Just a absolute, clean silence. And this silence is yours forever." },
        { type: "narrate", text: "Selin will go up to the surface alone. The station was saved. No one downstairs will know the name of that technician who choked that monster with their own life... But that night, everyone on the surface woke up from their sleep with a strange lightness in their chest. As if someone had carried that heavy curse in their place and became a sacrifice." },
        { type: "system", text: "— ENDING: SILENCE —" },
        { type: "system", text: "You destroyed the Artifact. By sacrificing yourself, you saved the station — maybe the world. Selin escaped and will tell the truth." },
        { type: "system", text: "BORDER-1 · THANK YOU" },
      ],
    },

    /* ===== ENDING 3: DEEP (darkness) ===== */
    n_son_derin: {
      ending: true,
      events: [
        { type: "narrate", text: "Now you don't have even a single cell left to resist. This claustrophobic nightmare that lasted eleven months, six floors of corpse piles, and endless deaths... And that deceptive voice of the Artifact inside your brain is so soft, so warm: «Three... Leave that tablet of yours... Three... There is no pain here... Everyone is here, waiting for you...» You slowly withdraw your clenched fingers from the console." },
        { type: "waitTap" },
        { type: "narrate", text: "«What are you doing?! Come to yourself, press that button!» That terror-filled scream of Selin gets further away inside your brain, melts... While that warm wave emitting from that fleshy mass covers your soul, for the first time you don't resist, you leave yourself to that wet current. And that fake peace... My God, it is so beautiful. Aykut is smiling there. Nevin is there. Baturay, little Deniz... All holding hands. Family." },
        { type: "narrate", text: "Selin looks behind her and escapes to the surface alone in terror, leaving behind one more victim swallowed by that hive. You became a cell of that flesh mass now. You have no name of your own, no consciousness of your own; you are now 'Us'. And We count patiently in that darkness... Forever. Waiting for a new piece of flesh from above to descend six floors down with a tablet in hand and find us." },
        { type: "ambient", text: "«...Three... Two... Three... Two... Our sibling has arrived... Welcome...»" },
        { type: "system", text: "— ENDING: DEEP —" },
        { type: "system", text: "You joined the Artifact. The pain ended. You are now of the Family too — and you await the next 'child'." },
        { type: "system", text: "BORDER-1 · THANK YOU" },
      ],
    },

    /* ===== ENDING 4: RECORD (documentation) ===== */
    n_son_kayit: {
      ending: true,
      events: [
        { type: "narrate", text: "Instead of silencing that monster, you raise your tablet in the air with your trembling hands. It has no camera, yes; but you engrave all those malicious sound frequencies emitted by that monster, radioactive waves, the digital map of the carvings — everything into the memory of that small tablet. That last word of Baturay is in your mind: 'Document everything.' The world must see this filth! Everyone rotting in this sewer must have a proof!" },
        { type: "waitTap" },
        { type: "narrate", text: "«What the fuck are you doing?! Leave that damn device, the countdown is ending, WE NEED TO ESCAPE!» tears herself apart Selin. But hitting your fingers against the screen, you do not stop the recording. The Artifact is in its death throes but it didn't die, the countdown continues at full speed inside your brain. «Two» says that voice. Then «One»." },
        { type: "narrate", text: "Selin looks at you one last time mixed with terror and pain and darts toward the stairs with that data copy she took from the tablet. She escapes, with that evidence in hand that will shake the world. You remain here, in front of that flesh. While the Artifact whispers that last number, the memory of your tablet fills up and hurls the data upward. When Selin walks out that door, the world will learn about this hell... Thanks to you." },
        { type: "ambient", text: "In the reflection of the fading screen light of your tablet, you see your own face: completely calm. Like Baturay. Like a true whistleblower who has finished their duty. And that fleshy hole inside your brain whispers one last time: «...Zero.»" },
        { type: "system", text: "— ENDING: RECORD —" },
        { type: "system", text: "You didn't escape — you chose to document. You died, but Selin brought the evidence to the surface. The truth can no longer be hidden. Baturay would be proud." },
        { type: "system", text: "BORDER-1 · THANK YOU" },
      ],
    },

    /* ===== ENDING 5: ZERO (failure — if no Ece) ===== */
    n_son_sifir: {
      ending: true,
      events: [
        { type: "narrate", text: "Together with Selin, you dash like crazy toward those rusty stairs — But Ece is not there! The sonar line has sunk into a pitch-black silence; there is no mind behind that knows which corridor is open, what the code of which door is, where the safe route is. You had fed Ece to those madmen as bait on floor K-5 and now right at the life-and-death struggle, you were left without a guide." },
        { type: "waitTap" },
        { type: "narrate", text: "Under the fading light of your tablet, you turn into a wrong corridor. Before you stands a massive, hydraulically locked steel door... It doesn't open! You desperately turn back but that flesh mass in the back roars «Two» inside your brain now! The vibration is so strong that warm blood leaks from your ears and your nose, because you couldn't silence it. Selin pounds the handle of the door: «There must be a way... There must be a way—» But no. This place is closed." },
        { type: "narrate", text: "«One...» whispers that malicious flesh mass. The entire station, all the steel structures on the walls come alive and hum. On the upper floors, all that zombie crew sleeping in their beds open their eyes wide at the same second — They all stand up at once. «Zero...»" },
        { type: "ambient", text: "And at that moment, that sound stops. Because there is no foreign power left to count inside your brain anymore. Everyone — You, Selin next to you, the workers whose flesh is melting upstairs, and perhaps all that innocent surface at the end of the radio... You are now a single piece of flesh. A single massive hive. A single infinite, calm, completely emptied dead mind." },
        { type: "system", text: "— ENDING: ZERO —" },
        { type: "system", text: "You couldn't fully silence the Artifact and you couldn't find the escape path without Ece. The countdown reached zero. The Family now encompasses everyone. Perhaps the surface too." },
        { type: "system", text: "BORDER-1 · THANK YOU" },
      ],
    },
  },
};

export const EP05_FLAGS = {
  sonarGoruldu: false, sonarTeyp: false, sonarBildi: false,
  tunelGoruldu: false, tunelSandik: false, tunelFisilti: false,
  izBaturay: false, izDeniz: false, izNevin: false,
  vericiGuc: false,
  kampGoruldu: false, galeriGoruldu: false, sondajGoruldu: false, kampArandi: false, galeriSembol: false, jeneratorKapali: false, buluntuyaBakti: false,
  k2Ilk: false, kadimAcildi: false,
};