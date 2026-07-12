/* ============================================================
   PERISHED — EPISODE 5 (FINAL): "K-2 / THE ARTIFACT" (Full Version)
   No master — the Artifact is not an entity, it is a SOURCE[cite: 9]. An ancient excavation
   carved beneath the station[cite: 9]. By "counting" at 432 Hz, it tethers minds into a single
   "family" consciousness[cite: 9]. The countdown is real: if it reaches zero, everyone in the 
   station — perhaps the surface — becomes one collective consciousness[cite: 9].

   FINAL HUMAN ALLY: Selin[cite: 9]. She has a plan to silence the Artifact but cannot execute it 
   alone[cite: 9]. Ece provides sonar assistance (if she wasn't betrayed)[cite: 9].

   CARRIED DECISION OUTCOMES (All converge here):
   · eceEleVerildi    → No frequency assistance from Ece → final becomes harder[cite: 9]
   · nevinKurtarildi  → Nevin's roots carve out a path at the final moment[cite: 9]
   · sofraYedi        → The Artifact considers you part of the "family" (infiltration / risk)[cite: 9]
   · denizSoruldu     → Deniz intercepts the transmission line unexpectedly[cite: 9]
   · frekanslariDuydun→ You partially decipher the Artifact's language (ease of play)[cite: 9]

   FINAL PUZZLE: Reversing the Artifact's counting frequency —
   symbol sequence (its language) + radio frequency (overthrowing 432 Hz)[cite: 9].

   FIVE ENDINGS:
   · SURFACE   — silence + escape (best): Selin + Ece + correct choices[cite: 9]
   · SILENCE   — destroy but sacrifice yourself[cite: 9]
   · DEEP      — join the Artifact (dark)[cite: 9]
   · RECORD    — document and die (whistleblower ending)[cite: 9]
   · ZERO      — failing to halt the countdown (bad ending / not hidden)[cite: 9]
   ============================================================ */

export const EP05 = {
  nodes: {

    /* ================= ENTRY — THE EXCAVATION ================= */

    n_k2_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k2" },
        { type: "sting", name: "stingK2" },
        { type: "system", text: "FLOOR: K-2 — ARCHAEOLOGY · EXCAVATION SITE · [UNREGISTERED]" },
        { type: "narrate", text: "The final metal rung snaps and clangs behind you, and your feet step onto wet, cold, alien rock[cite: 9]. K-2 is not part of the station; the station is a hatch sealed over it[cite: 9]. The tablet light catches marks on the wall[cite: 9]. No, not stains[cite: 9]. Notches carved into the stone as if etched into skin[cite: 9]. A recording system thousands of years old[cite: 9]. Not human writing, yet still like a ledger: something diminishing, exhausting, counting[cite: 9]." },
        { type: "narrate", text: "In the center of the void are rusted scaffoldings, tangled thick black cables, and decaying equipment arranged like a blindly worshipping cult... All of them surround that bottomless anomaly in the center[cite: 9]. You cannot see it, because the weak light of your tablet isn't enough to rip through that pitch darkness[cite: 9]. But you CAN FEEL that wretched vibration coming with a wave of nausea[cite: 9]. The roots of your teeth ache, your eardrums emit static as if ready to burst, and a number is pounded into your mind like a dirty rust nail: Three[cite: 9]." },
        { type: "document", open: false, doc: {
          id: "d_k2_karantina", title: "K-2 Quarantine Protocol — Unregistered",
          body: "PERISHED / EXCAVATION SITE K-2\nSTATUS: Quarantine extended indefinitely.\nDISTRIBUTION: Chief's Office, Systems Oversight, Biology Unit\n\nDetected symptoms:\n- Personnel repeat the same digit simultaneously across entirely different shifts.\n- Audio logs recorded from subjects respond with the voices of deceased staff before their own voices occur.\n- Personnel left in darkness begin to define themselves as 'we' instead of 'I.'\n- Biological samples gathered around the Artifact are incompatible with human tissue, yet mimic human tissue morphology.\n\nMANAGEMENT DECISION:\nNo reporting shall be made to the surface. Excavation shall not be halted. Personnel losses will be classified as maintenance accidents, barometric failures, or shift desertion protocols.\nNew technical staff shall be routed to the lower decks to ensure the incident is reported as a natural systems malfunction.\n\nADDITIONAL NOTE:\nIf three impacts are heard from below, no response shall be given. Staff who responded trudge into confined spaces shortly after and repeat the word 'home.'" } },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — Something fleshy and wet brushed against your mind", noteKind: "alert" },
        { type: "narrate", text: "«Don't move... Don't even breathe...» A raw, terror-packed whisper ascends from within the shadows[cite: 9]. A real human voice[cite: 9]. Emerging from a crevice, battered as if spit from a dust storm in an excavation jumpsuit, appears a woman holding a trembling flashlight and a blood-stained rusted crowbar[cite: 9]. When the light of your tablet strikes her face, you see her pupils dilated from terror[cite: 9]. «Your... your consciousness is still intact[cite: 9]. Your eyes can see the surroundings... My God, you are the only living human here for three weeks[cite: 9].» Selin[cite: 9].", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "«Don't move... Whatever you do, don't make a sound...» A wet hand lunging from the rock crevice nearly causes you to drop your tablet[cite: 9]. A woman, panting inside an excavation jumpsuit[cite: 9]. «A scream came through the dead frequency on the sonar line... Ece[cite: 9]. She told me about you[cite: 9]. She trusts you[cite: 9]. I am Selin[cite: 9]. And if you want to make it out of here alive, the two of us need to butcher that thing[cite: 9].»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "objective", text: "Listen to Selin's plan." },
        { type: "note", id: "not_k2", title: "K-2: The Artifact", text: "The station was constructed atop this excavation[cite: 9]. No, not on top; it was built around it to hide it[cite: 9]. Every carving on the walls is a countdown[cite: 9]. The Artifact is in the center[cite: 9]. I can't see it yet, but there is a nail labeled 'three' in my mind[cite: 9]. Selin is alive[cite: 9]. I am writing down this data because seeing a living human here demands documentation more than sanity[cite: 9]." },
      ],
      choices: [
        { id: "selin", text: "Approach Selin", next: "n_selin_plan" },
      ],
    },

    n_selin_plan: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin pulls you behind the rock ledge[cite: 9]. Her hands are mangled, her breath raspy, but there is still a human in her eyes capable of making a decision[cite: 9]. «The three inside your head isn't an hallucination,» she says[cite: 9]. «The Artifact is counting down[cite: 9].» She speaks like a witness, not a scientist, while stating this[cite: 9]. No one diagnoses anymore[cite: 9]. Everyone is merely trying to record what they witness[cite: 9]. When it hits zero, everyone will turn into a single mass of flesh, a single hive mind[cite: 9]. The surface included[cite: 9]." },
        { type: "narrate", text: "«The Artifact is a living frequency emitting a 432 hertz wave[cite: 9]. The ONLY way to BUTCHER it is to choke its own vomit back down its throat: we will read its foul language in reverse[cite: 9]. I deciphered those ominous symbols on the walls[cite: 9]. But reaching the transmitter panel alone is suicide[cite: 9]. You will lock that damned radio into the frequency, and I will vomit those symbols into the panel[cite: 9].»" },
        { type: "waitTap" },
        { type: "narrate", text: "«But there is a crucial, horrific detail[cite: 9]. To reach the transmitter, you are forced to pass directly in front of that thing, through the heart of that blinding darkness[cite: 9]. It will see you[cite: 9]. It will read you down to the foulest corner of your soul... Tell me, what absolute garbage did you partake in on the upper decks[cite: 9]? Did you sit at that madmen's table[cite: 9]? If you ate from that meat reeking of vomit, the Artifact considers you of its own blood[cite: 9]. This could be a damned advantage... or a trap where you get completely consumed[cite: 9].» She stares at you[cite: 9].", if: { flag: "sofraYedi", equals: true } },
        { type: "narrate", text: "«The good news: at least your soul isn't drenched in filth yet[cite: 9]. You haven't touched their rancid meals, your skin still smells of a human[cite: 9]. But that also means the moment the Artifact sees you, it will perceive you as a savage tumor, an alien threat that must be destroyed[cite: 9]. Hold your breath as you pass in front of it[cite: 9].»", if: { flag: "sofraYedi", equals: false } },
      ],
      choices: [
        { id: "ilerle", text: "Commence exploring the excavation site", next: "n_kazi_hub" },
        { id: "sor", text: "Ask, \"How much is left until zero?\"", next: "n_selin_sifir" },
      ],
    },

    /* ================= EXCAVATION SITE — OVERSIGHT HUB ================= */
    n_kazi_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Selin digs her fingers into your shoulder, shoving you toward the darkness: «I will stay here and prime the console[cite: 9]. You enter this foul-smelling labyrinth — every piece of scrap those who died left behind could be useful to us[cite: 9]. But never forget: every step you take, every scraping sound you generate will awaken the Artifact further[cite: 9]. And the more you LOOK around with that damned light of your tablet, the deeper it will violate your mind[cite: 9].»" },
        { type: "narrate", text: "The excavation site before you is scattered like a graveyard: overturned scaffoldings, abandoned tents, pitch-black tunnels[cite: 9]. But graveyards make room for the dead; this place kept the dead on duty[cite: 9]. The campsite, the gallery coated in carvings, the borehole, and the ancient gate in the center[cite: 9]. They all say the same thing: Discovery wasn't executed here, contact was established[cite: 9]. The digit in your head is still three, but it's no longer a voice; it demands space like a growing tumor[cite: 9]." },
        { type: "objective", text: "Investigate the excavation site." },
      ],
      choices: [
        { id: "kamp", text: "Go to the excavation crew's campsite", next: "n_kamp", if: { flag: "kampGoruldu", equals: false } },
        { id: "galeri", text: "Enter the carved gallery", next: "n_galeri", if: { flag: "galeriGoruldu", equals: false } },
        { id: "sondaj", text: "Approach the borehole", next: "n_sondaj", if: { flag: "sondajGoruldu", equals: false } },
        { id: "sonar", text: "Enter the sonar array chamber", next: "n_sonar_oda", if: { flag: "sonarGoruldu", equals: false } },
        { id: "kapi", text: "Advance to the ancient gate (The Artifact)", next: "n_kadim_kapi" },
        { id: "dinlen", text: "Halt inside a tent's shadow to gather yourself", next: "n_kazi_dinlen", ifStat: { stat: "gurultu", gte: 35 } },
      ],
    },

    n_sonar_oda: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you step into the sonar room, odors of burned plastic and decayed meat hit your nostrils[cite: 9]. The monitors on the walls are cracked, oscilloscopes vomiting static like crazy[cite: 9]. Only a single screen operates, drafting a fatal, flawless wave shape across its green interface: 432 hertz[cite: 9]. Fixed[cite: 9]. Hypnotic[cite: 9]. The pulse of a live monster[cite: 9]. An old tape deck rests in the center of the desk, a note scrawled across it in dried blood: 'DO NOT LISTEN. DO NOT PLAY. NEVER.'[cite: 9]" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "calistir", text: "Play the tape deck (hazardous)", next: "n_sonar_teyp" },
        { id: "cik", text: "Do not touch, exit the room", next: "n_sonar_cik" },
      ],
    },

    n_sonar_teyp: {
      cost: 1,
      events: [
        { type: "narrate", text: "Your finger presses the rusted button of the deck, trembling[cite: 9]. First an ear-tearing hiss, then the sobs and weeping of the excavation crew right before they went mad emerge... Then those voices melt one by one, converting into a single foul choir, counting together[cite: 9]. And at the very end of the tape, you hear that thing that makes your skin crawl: Your own voice[cite: 9]. Your future scream, not yet escaped from your mouth[cite: 9]. The Artifact is already eroding your time[cite: 9]. You are listening to your own death rattle[cite: 9]." },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Your future scream has been nailed into your mind", noteKind: "alert" },
        { type: "flag", set: { sonarGoruldu: true, sonarTeyp: true } },
      ],
      choices: [
        { id: "cik", text: "Exit the room", next: "n_kazi_hub" },
      ],
    },

    n_sonar_cik: {
      cost: 1,
      events: [
        { type: "narrate", text: "You don't touch the deck — the terror-packed warning of those who died shudders inside you[cite: 9]. Holding the raw light of your tablet against the screen, you engrave every bend of that 432 hertz wave shape into your memory, into the back of your brain[cite: 9]. You must know this frequency when striking that monster with its own weapon[cite: 9]. As you exit the room, the dark behind you seems to usher you out with a whisper[cite: 9]." },
        { type: "flag", set: { sonarGoruldu: true, sonarBildi: true } },
        { type: "stat", stat: "akil", delta: 3 },
        { type: "note", id: "not_sonar", title: "Sonar Array", text: "I witnessed the sound of the Artifact inside the crew's sonar room: 432 hertz, fixed[cite: 9]. I didn't touch the deck[cite: 9]. Recognizing this frequency will serve me at the transmitter[cite: 9]." },
      ],
      choices: [
        { id: "cik", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kazi_dinlen: {
      cost: 1,
      events: [
        { type: "narrate", text: "You slide into the pitch darkness of a torn, mold-scented tent[cite: 9]. You press your tablet screen against your chest to douse its light; the surroundings are black, you can't see your hand in front of your face[cite: 9]. Sealing your mouth, you hold your breath, waiting while listening to the sounds of things scratching the rock outside[cite: 9]. The hum inside your brain slowly withdraws, the rib-shattering thumping of your heart eases[cite: 9]. For now, it hasn't detected you[cite: 9]." },
        { type: "stat", stat: "gurultu", delta: -25, note: "You held your breath in the pitch black — NOISE reduced", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
      ],
      choices: [
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kamp: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The campsite is a complete scene of brutality: overturned bloody chairs, maps spread across the desk like dried purulence... These people didn't leave this place in panic; they marched to their deaths orderly as if hypnotized[cite: 9]. Scratched onto the wall by a human shredding their own fingertips, this madness reads: 'DO NOT STOP COUNTING. IF YOU COUNT, IT HEARS YOU FROM WITHIN.'[cite: 9]" },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_kazi_gunluk", title: "Excavation Chief's Journal", style: "type",
          meta: "— Dr. R. Vardar, drilling crew —",
          body: "DRILLING CREW INCIDENT REPORT — DR. R. VARDAR\nEXCAVATION DAY 14: The Artifact was a single piece when first extracted. Today, new tissues clinging to peripheral cables were observed. Growth velocity could not be calculated; the technician executing measurements began counting digits in his sleep.\n\nEXCAVATION DAY 19: Staff report the exact same digit: seven. Earplugs, sedation, and isolation are ineffective. The sound doesn't originate from the external environment. The subject states they hear it from within their own skull.\n\nEXCAVATION DAY 21: Half the crew descended below. No command was issued. All of them were smiling. Camera logs show their mouths moving simultaneously.\nInstruction to personnel locating this report: Do not repeat the digit. Not even in your mind." } },
        { type: "stat", stat: "akil", delta: -8, note: "SANITY -8 — Words are growing like an ur inside your mind", noteKind: "alert" },
        { type: "flag", set: { kampGoruldu: true } },
      ],
      choices: [
        { id: "ara", text: "Search the camp (resources)", next: "n_kamp_ara" },
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_kamp_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "Directing the raw screen light of your tablet at an overturned equipment chest, you rummage through the grime with your bare hands[cite: 9]. Broken drill bits slice your fingers, foul liquids leaking from empty ration cans smudge your hands[cite: 9]. But at the very bottom, wrapped in a coagulated blood rag, you locate two spare batteries and a crushed earplug[cite: 9]. The earplugs won't cut off that inner voice, but they can at least muffle those maddening screams outside a bit[cite: 9]. You pocket the batteries immediately[cite: 9]." },
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
        { type: "narrate", text: "The place they call the gallery is a tight death tunnel with wet things dripping from its ceiling like leeches[cite: 9]. The walls are entirely covered in carvings that drive a human mad: a massive fleshy mass falling from the sky, humans touching it and having their faces melt and turn into smooth pieces of flesh within seconds... The faces of the figures in the final carving are completely erased, black holes in their place[cite: 7, 9]. That hollow at eye level seems to quiver under your tablet light, watching you[cite: 9]!" },
        { type: "waitTap" },
        { type: "narrate", text: "As you stare at the carvings, a dense ringing begins in your ears, your stomach turning[cite: 9]. The stone breathes as if it were a living skin, the notches on it trembling and diminishing[cite: 9]. That cursed voice inside your brain strikes like a sledgehammer: Three... Three... Selin’s whisper detonates in your brain: The more you look, the faster it will drench your soul in filth[cite: 9]!" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — The ominous carvings are engraved into the folds of your brain", noteKind: "alert" },
        { type: "flag", set: { galeriGoruldu: true } },
      ],
      choices: [
        { id: "oku", text: "Examine the final carving closely (hazardous)", next: "n_galeri_oyma" },
        { id: "cik", text: "Avert your eyes, exit the gallery", next: "n_kazi_hub" },
      ],
    },

    n_galeri_oyma: {
      cost: 1,
      events: [
        { type: "narrate", text: "Steeling your nerves, you slide your trembling hand over that foul carving[cite: 9]. The stone isn't ice cold; on the contrary, it's warm, humid, and alive like the skin of a patient burning with fever[cite: 9]. As the carvings shift beneath your fingers, lightning bolts strike inside your brain: This damned thing is a language[cite: 9]! This is the passcode of the panel that will vomit that creature's frequency[cite: 9]! You found that missing symbol Selin was searching for[cite: 9]. But a horrific void forms in the center of your head... For a second, you can't recall your mother's face, or even your own name[cite: 9]. The knowledge ripped a fragment from your soul[cite: 9]." },
        { type: "flag", set: { galeriSembol: true } },
        { type: "stat", stat: "akil", delta: -8, note: "SANITY -8 — The ancient language erased a portion of your memory", noteKind: "alert" },
        { type: "note", id: "not_galeri", title: "Gallery Carving", text: "The final carving in the gallery contains an alignment piece from the Artifact's language[cite: 9]. It might serve me at the transmitter — I should tell Selin[cite: 9]. But staring at the carvings strains my sanity[cite: 9]." },
      ],
      choices: [
        { id: "cik", text: "Exit the gallery", next: "n_kazi_hub" },
      ],
    },

    n_sondaj: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You stand at the edge of the borehole[cite: 9]. A black, deep rift opened into the deck; no matter how much you aim your tablet light, you can't see its end, a hellish void[cite: 9]. The excavation crew must have ripped that curse out from the bottom of this pit[cite: 9]. Right beside it, a dying generator is rasping — its engine shaking like crazy, the noise it emits is loud enough to deafen your ears, but it feeds the final few lamps illuminating the area[cite: 9]. If you shut it down, you will gain a pitch silence; but that moment, the entire world around you will go black, leaving only the tiny light of your tablet[cite: 9]." },
        { type: "waitTap" },
        { type: "flag", set: { sondajGoruldu: true } },
      ],
      choices: [
        { id: "kapat", text: "Shut down the noisy generator (silence but darkness)", next: "n_sondaj_kapat" },
        { id: "bak", text: "Look into the bottom of the pit (hazardous)", next: "n_sondaj_bak" },
        { id: "geri", text: "Return to the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_sondaj_kapat: {
      cost: 1,
      events: [
        { type: "narrate", text: "Steeling your nerves, you pull down the greasy, rusted breaker switch of the generator[cite: 9]. That deafening engine rasp cuts off like a knife... and along with it, the soluk yellow lamps hanging from above burst and extinguish[cite: 9]. Everything is pitch black[cite: 9]. Only your tablet screen illuminates your face like a corpse[cite: 9]. But in this horrific silence, for the first time, you hear the voice inside your brain cease[cite: 9]. Even that foul hum of the Artifact withdrew[cite: 9]. Silence is your sole haven right now[cite: 9]." },
        { type: "stat", stat: "gurultu", delta: -20, note: "The generator silenced — NOISE reduced, darkness collapsed", noteKind: "system" },
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
        { type: "narrate", text: "Sinking to your knees, you lean down over that foul-smelling, wet edge of the pit[cite: 9]. A blind darkness... But seconds later, at the absolute bottom of that darkness, you see soluk red fibers gleaming like dirty blood running through veins[cite: 9]. The roots, fleshy extensions of the Artifact have spread thousands of meters below[cite: 9]. And the moment you look into that abyss, you feel millions of invisible eyes staring at YOU from that bottomless dark[cite: 9]. The digit inside your head turns into a scream instantly — retreat, bolt back immediately before vomiting[cite: 9]!" },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — The dark peeked into your soul", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15, note: "You bolted back in terror — NOISE increased", noteKind: "alert" },
        { type: "flag", set: { buluntuyaBakti: true } },
      ],
      choices: [
        { id: "geri", text: "Withdraw from the pit", next: "n_kazi_hub" },
      ],
    },

    /* ANCIENT GATE — SHADOW (REMNANT) PUZZLE: 3D ROTATION */
    n_kadim_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The path leading to the exact heart of the excavation is blocked by a massive stone gate[cite: 9]. It bears a single carving: a deformed, wide eye sign and fleshy arms erupting from that eye[cite: 9]. Selin whispers behind you with a trembling voice: «The excavation crew pounded this wall with sledgehammers for weeks to open it, but they couldn't even scratch it... The only way to open the lock is to place the object on this pedestal before the projector at the correct angle...»[cite: 9]" },
        { type: "narrate", text: "You approach the pedestal[cite: 9]. The thing standing directly before the projector lamp... My God, a deformed, mutated remnant piece where metal and human bone have fused together; a fragment torn from the flesh of the Artifact[cite: 9]. As you touch and rotate it, its shadow falling across the massive stone wall behind shifts shape — At one angle, it looks like a jumbled mess of intestines, while at another... The shadow comes alive[cite: 9]. You must align the shadow perfectly over that open eye symbol on the wall[cite: 9]." },
        { type: "waitTap" },
        { type: "note", id: "not_kadim", title: "Ancient Gate", text: "The door to the center of the excavation is locked by a shadow puzzle[cite: 9]. I must rotate and tilt the remnant on the pedestal to overlay its shadow onto the sign on the gate (circular eye + extending arms)[cite: 9]. The shadow falls differently at every angle[cite: 9]." },
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
        { type: "narrate", text: "The instant the shadow aligns perfectly over that foul fleshy eye on the wall, a shrill, live scream ascends from the bone fragment on the pedestal — and that massive stone gate, with a groan resembling the sound of bone snapping, slides aside millimeter by millisecond to open[cite: 9]. The air blasting out hits your face like the chill of a graveyard[cite: 9]." },
        { type: "flag", set: { kadimAcildi: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Selin holds her breath while staring at the shadow on the wall, completely horrified[cite: 9]. «Those big professors lost their minds before this gate for months... You... How did you execute this within seconds?»[cite: 9] You cannot answer, because while your fingers rotated that bone, they moved not by your own volition, but by the command of that thing infiltrating your brain[cite: 9]. The Artifact is calling you inside[cite: 9]." },
      ],
      choices: [
        { id: "sigina", text: "Enter the dark shelter", next: "n_siginak" },
      ],
    },

    /* ================= VAULT CONSOLE — TRACES OF THE THREE VlCTIMS ================= */
    n_siginak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The vault behind the gate is the final threshold of that foul-smelling hell[cite: 9]. Hollows large enough to fit a human stretch along the walls; these are the graves of those who descended into the excavation and never witnessed the sky again[cite: 9]. The Artifact devoured their minds, but their remaining putrid bodies are arranged here like separate altars[cite: 9]. Fresh blood and purulence still seep from three hollows[cite: 9]. You recognize those overalls, those belongings[cite: 9]. They are here[cite: 9]." },
        { type: "waitTap" },
        { type: "objective", text: "Pass through the vault." },
      ],
      choices: [
        { id: "baturay", text: "Examine the familiar jumpsuit in the first hollow", next: "n_siginak_baturay", if: { flag: "izBaturay", equals: false } },
        { id: "deniz", text: "Examine the small figure in the second hollow", next: "n_siginak_deniz", if: { flag: "izDeniz", equals: false } },
        { id: "nevin", text: "Examine the rooted remnant in the third hollow", next: "n_siginak_nevin", if: { flag: "izNevin", equals: false } },
        { id: "tunel", text: "Inspect the tight tunnel descending from the vault", next: "n_tunel_giris", if: { flag: "tunelGoruldu", equals: false } },
        { id: "an", text: "Look at the three traces together, pause for a moment", next: "n_siginak_an", if: { flag: "izBaturay", equals: true } },
        { id: "gec", text: "Pass the vault, walk to the final threshold", next: "n_son_hazirlik" },
      ],
    },

    n_siginak_an: {
      cost: 1,
      events: [
        { type: "narrate", text: "You aim your tablet light at those three graves simultaneously: Baturay, Deniz, Nevin[cite: 9]. A technician, a small child, a biologist... The Artifact used their bodies like puppets and trapped their souls inside that damned hive[cite: 9]. Each counts their own hellish number[cite: 9]. But you won't be the fourth victim[cite: 9]. Only a single mercy remains for these poor souls: To silence that damned frequency forever[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "The dense wave of fear in the center of your chest yields to a savage rage[cite: 9]. You grit your teeth[cite: 9]. For them... And for the final people upstairs who still remember their own names, you will silence that monster[cite: 9].", ifStat: { stat: "akil", gte: 30 } },
        { type: "stat", stat: "akil", delta: 6, note: "SANITY +6 — Fear converted into a savage purpose", noteKind: "system" },
      ],
      choices: [
        { id: "gec", text: "Pass the vault, walk to the final threshold", next: "n_son_hazirlik" },
      ],
    },

    /* ================= DESCENT TUNNELS (OPTIONAL DEPTH) ================= */
    n_tunel_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "epRandom" },
        { type: "narrate", text: "Right in the corner of the vault, there is a tight, sticky tunnel spiraling downward[cite: 9]. This wasn't dug by human hands; it's like an organic throat opened by the Artifact's wet, fleshy roots dissolving the rock with acid[cite: 9]. A warm, humid air that vomits humanity and a low bowel growl that turns your stomach ascend from within[cite: 9]. Entering there is pure madness[cite: 9]. But something inside that darkness seems to murmur your name[cite: 9]." },
        { type: "waitTap" },
        { type: "flag", set: { tunelGoruldu: true } },
        { type: "narrate", text: "Selin snatches your garment from behind, pulling it: «Don't go down there! Two security guards who descended there dissolved among those flesh fibers before they could even scream... But the choice is yours[cite: 9]. Whatever is at the bottom of that hole is alive, I feel it[cite: 9].»" },
      ],
      choices: [
        { id: "in", text: "Descend into the tunnel (hazardous — deep exploration)", next: "n_tunel_derin" },
        { id: "vazgec", text: "Abandon, return to the vault", next: "n_siginak" },
      ],
    },

    n_tunel_derin: {
      cost: 1,
      events: [
        { type: "narrate", text: "You crawl down the tight tunnel, those wet, fleshy walls brushing against your shoulders, your hair[cite: 9]. The walls throb like a pulse; at every centimeter you gain, that passcode inside your brain screams[cite: 9]. At the very bottom, in the middle of a completely coagulated black liquid, are mangled items remaining from the final members of the excavation crew... And a terrifying choice confronting you[cite: 9]." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — You are at the bottom of the live flesh tunnel", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "The creature's bowel growl enveloped you — NOISE increased", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sandik", text: "Open the chest left by the excavation crew", next: "n_tunel_sandik" },
        { id: "fisilti", text: "Listen to the whisper within the hum (compl. hazardous)", next: "n_tunel_fisilti" },
        { id: "cik", text: "You descended too deep — climb back up", next: "n_siginak" },
      ],
    },

    n_tunel_sandik: {
      cost: 1,
      events: [
        { type: "narrate", text: "You aim your tablet light at the muddy chest and open it by breaking its latches[cite: 9]. Inside stands a blood-smeared journal, three spare batteries, and a primitive headphone rig crafted by excavators to cut out that maddening voice[cite: 9]. The final leaf of the journal has been violently torn out, but that sentence scratched with a fingernail at the bottom remains legible: 'Reversing the frequency won't kill that bastard, it will only put it to sleep... Until another victim comes along down the line one day and awakens it again.'[cite: 9]" },
        { type: "battery", spares: 3 },
        { type: "document", open: true, doc: {
          id: "d_tunel_gunluk", title: "Last Excavator's Journal", style: "type",
          meta: "— at the bottom of the tunnel —",
          body: "K-2 RESEARCH NOTE — PARTIAL ENTRY\n\nThe two of us remain. The others became 'family.' We descended below to verify the source.\nIt is clear now: The Artifact is not a solitary component; it is merely a node reaching upward.\nThe main body spreads for miles beneath the ocean floor.\n\nPERISHED fed it with humans. If the flow is cut, starvation will commence.\nThe starving structure strikes toward the surface: three contacts, regular interval, identical signature across every log.\n\nThis note shall not be forwarded to upper management if found. Upper management already knows." } },
        { type: "flag", set: { tunelSandik: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "cik", text: "Leave the chest, climb upward", next: "n_siginak" },
      ],
    },

    n_tunel_fisilti: {
      cost: 1,
      events: [
        { type: "narrate", text: "Squeezing your eyes shut, you lean your ear against the hum emanating from that wet wall[cite: 9]. And that whisper suddenly goes crystal clear... The putrid choir of thousands of dead humans bellows your name from a single mouth[cite: 9]! Baturay, Deniz, Nevin, all the crew torn apart upstairs... «Join us... Isolation is so cold... Count with us... Three... Three... Three...»[cite: 9] Your volition turns to dust, your knees buckle; at that moment, you just want to embrace the wall and melt away inside that flesh[cite: 9]." },
        { type: "stat", stat: "akil", delta: -20, note: "SANITY -20 — The choir of the dead captured your soul", noteKind: "alert" },
        { type: "waitTap" },
        { type: "narrate", text: "Just as you are losing consciousness, you catch your own trembling voice at the absolute bottom of that foul choir[cite: 9]. 'No!'[cite: 9] You frantically jam the primitive headphones over your ears, ripping that bond apart, and climb upward by digging your fingernails into the rock[cite: 9]. You know you won't make it out of there a second time[cite: 9]." },
        { type: "flag", set: { tunelFisilti: true } },
      ],
      choices: [
        { id: "cik", text: "Gather yourself, climb upward", next: "n_siginak" },
      ],
    },

    n_siginak_baturay: {
      cost: 1,
      events: [
        { type: "narrate", text: "You hold your tablet light over the jumpsuit in the first hollow[cite: 9]. The plastic tag on his chest is caked in mud: B. SOYLU[cite: 9]. Baturay[cite: 9]. The first victim who dragged you into this hell, who sent that whistleblower email[cite: 9]. You had located his completely mangled corpse in the K-6 infirmary... But it turns out the damned echo of his soul was always here among the flesh[cite: 9]. There is a bloody scrap of paper he holds tightly between his clenched, decayed fingers[cite: 9]." },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_baturay_son", title: "Baturay's Final Note", style: "hand",
          meta: "— inside the vault, in his hand —",
          body: "PERSONAL STATEMENT — B. SOYLU\n\nThe person reading this must be the maintenance staff arriving after me. They brought you here because I rejected the assignment.\n\nIt will say 'three' to you too. Do not count. I counted once; I was merely curious.\nThat much sufficed. Since that day, a part of my voice remains below, while a part still lingers in this room.\n\nI dispatched the whistleblower email but I was late. Don't you be late. There is a journalist named Ergin on the surface. Reach him. Let the world know.\n\n— Baturay Soylu" } },
        { type: "flag", set: { izBaturay: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Return to the vault", next: "n_siginak" },
      ],
    },

    n_siginak_deniz: {
      cost: 1,
      events: [
        { type: "narrate", text: "Your heart constricts when you aim your tablet light at that tiny body in the second hollow[cite: 9]. A small child's dimensions[cite: 9]. Beside him lies a walkie-talkie with its batteries leaked and that disgusting family drawing he sketched on the wall with his own blood: A mother, a father, and a faceless child between them, holding hands...[cite: 9] Deniz[cite: 9]. That toddler who wept to you through the radio static on the K-5 floor[cite: 9]. Scratched into the stone with a rock nail below the drawing: 'I became a good boy. we are all together now.'[cite: 9]" },
        { type: "waitTap" },
        { type: "narrate", text: "You had asked Deniz that crucial question upstairs: 'Did you join too?'[cite: 9] Here is his answer, written in blood inside this stone grave[cite: 9]. But if he opened those gates for you upstairs, it means a fragment of that tiny soul is still squirming inside the stomach of that monster[cite: 9].", if: { flag: "denizSoruldu", equals: true } },
        { type: "flag", set: { izDeniz: true } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "geri", text: "Return to the vault", next: "n_siginak" },
      ],
    },

    n_siginak_nevin: {
      cost: 1,
      events: [
        { type: "narrate", text: "The third hollow is entirely coated in mold, black leeches, and veiny vines: the decaying body of Dr. Nevin Aras[cite: 9]. The biologist[cite: 9]. That maddened gardener of the K-3 floor[cite: 9]. Those fleshy roots are still alive, breathing subtly along with the hairs coating them[cite: 9]. If you showed her mercy and saved her on the upper floors, these roots will act as a shield for you before that monster[cite: 9]. If you couldn't save her... nothing but a foul-smelling pit[cite: 9]." },
        { type: "waitTap" },
        { type: "ambient", text: "A wet vine wraps around your ankle — but it doesn't tighten around your flesh, on the contrary, it subtly shoves you upward as if indicating a direction[cite: 9]. Nevin’s maddened, rasping voice echoes inside your brain: «The root is patient, my child... The soil swallows every piece of filth[cite: 8, 9]. I waited for you here[cite: 9]. Now I become armor for your flesh, you pass through that gate...»", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "flag", set: { izNevin: true } },
        { type: "stat", stat: "akil", delta: -6 },
      ],
      choices: [
        { id: "geri", text: "Return to the vault", next: "n_siginak" },
      ],
    },

    n_selin_sifir: {
      cost: 1,
      events: [
        { type: "narrate", text: "«I don't know...» Selin says, gritting her teeth with that savage helplessness in her eyes[cite: 9]. «When I first descended into this sewer, it bellowed 'Seven' inside my brain[cite: 9]. Now it's 'Three'... I don't know if days are left, or seconds — That monster's perception of time doesn't flow like ours[cite: 9]. But after three will come two, then that damned one... And when zero strikes...»[cite: 9] She stops and stares into the dark[cite: 9]. «Hurry up, or your head will explode[cite: 9].»" },
        { type: "narrate", text: "Yet you had listened to those hidden dead broadcasts upstairs... Your ear recognizes the rhythm of that voice[cite: 9]. You realize that horrific truth Selin is unaware of: The digit is not fixed[cite: 9]. It is accelerating, the duration narrowing!", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      choices: [
        { id: "nasil", text: "Ask, \"How did you get here?\"", next: "n_selin_gecmis" },
        { id: "ilerle", text: "Return to explore the excavation site", next: "n_kazi_hub" },
      ],
    },

    n_selin_gecmis: {
      cost: 1,
      events: [
        { type: "narrate", text: "Selin presses her back against the wet rock and closes her eyes[cite: 9]. «I was the sonar technician of the excavation crew[cite: 9]. Supposedly safe up on the surface, fresh air... But when no sound except radio static emerged from the crew below, they said 'Go down and take a look.'[cite: 9] It was eleven months ago[cite: 9].» She lets loose a wild, crazy laugh[cite: 9]. «When I descended, everyone had stripped stark naked, embracing that mass of flesh and smiling... I was born deaf[cite: 9]. My left ear hears absolutely nothing[cite: 9]. Perhaps that's why that monster's foul voice couldn't completely rot my brain[cite: 9]. I hear it halfway[cite: 9]. I remained a half-human[cite: 9].»" },
        { type: "waitTap" },
        { type: "narrate", text: "«That's why I am dependent on you[cite: 9]. I can fill that panel but I can't lock the radio into that frequency — you need to hear that voice clearly, doing what I couldn't execute with my deaf ear[cite: 9]. Two half-humans make a single weapon[cite: 9]. Isn't that funny[cite: 9]? The Artifact united everyone to make them a mass of flesh, to form a hive; it united us against it as a single bullet[cite: 9].»" },
        { type: "stat", stat: "akil", delta: 5, note: "SANITY +5 — There is a living entity you can lean your back against in the dark", noteKind: "system" },
        { type: "note", id: "not_selin", title: "Selin", text: "Selin is the sonar technician of the excavation crew[cite: 9]. Since she was born deaf in one ear, the Artifact's voice didn't fully affect her — she can resist halfway[cite: 9]. She will read the sequence, I will dial the frequency[cite: 9]. We complete one another[cite: 9]." },
      ],
      choices: [
        { id: "ilerle", text: "Return to explore the excavation site", next: "n_kazi_hub" },
      ],
    },

    /* ================= PASSAGE — BEFORE THE ARTIFACT ================= */

    /* FINAL PREPARATION — Point of No Return */
    n_son_hazirlik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k2b" },
        { type: "narrate", text: "You stand at that final crevice at the exit of the vault[cite: 9]. The front opens entirely into the lair of that creature[cite: 9]. Selin places her hand on your shoulder, her fingers trembling: «The moment you take a single step across this threshold, there is no turning back[cite: 9]. The moment we stand before that monster, it will lay our souls on an operating table[cite: 9]. Are you ready[cite: 9]? Check your tablet, your batteries, the final remnants remaining of your wits... I can't rescue you if you make an error out there[cite: 9].»" },
        { type: "waitTap" },
        { type: "narrate", text: "Those earplugs you retrieved from the campsite are in your pocket... They won't completely cut off that inner sewer voice, but they can grant your brain a second of breath right when you are about to go mad[cite: 9].", if: { flag: "kampArandi", equals: true } },
        { type: "narrate", text: "That putrid choir of the dead you heard at the bottom of that tunnel still generates static inside your ears[cite: 9]. Now you know where that voice will strike from — you've already memorized how to defend yourself against it[cite: 9].", if: { flag: "tunelFisilti", equals: true } },
        { type: "objective", text: "Step out before the Artifact." },
      ],
      choices: [
        { id: "hazir", text: "I am ready — step out before the Artifact", next: "n_k2_gecit" },
        { id: "bekle", text: "Pause for a moment, gather yourself (reduce noise)", next: "n_son_nefes" },
      ],
    },

    n_son_nefes: {
      cost: 1,
      events: [
        { type: "narrate", text: "You close your eyes tightly[cite: 9]. Pressing your tablet against your chest, you draw a deep breath in the pitch black[cite: 9]. One[cite: 9]. Two[cite: 9]. You listen not to that alien digit inside your brain, but solely to your own heart pounding tearing your chest[cite: 9]. Slowly, that dirty hum withdraws from your brain[cite: 9]. You are ready[cite: 9]." },
        { type: "stat", stat: "gurultu", delta: -20, note: "You gathered your breath in the dark — NOISE reduced", noteKind: "system" },
        { type: "stat", stat: "akil", delta: 5 },
      ],
      choices: [
        { id: "hazir", text: "Step out before the Artifact", next: "n_k2_gecit" },
      ],
    },

    n_k2_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "You step out from the crevice and you are finally in front of it[cite: 9]. Documents, voices, corpses, and family tales across all these floors pointed to the exact same center[cite: 9]. Now the center is beneath your light[cite: 9]. You hold yourself to keep from vomiting; because if what you witnessed was as simple as a monster, it would be easier to endure[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "A massive, wet, shivering mass embedded into the rock like an ur[cite: 9]. Neither plant, nor animal, nor machine[cite: 9]. Perhaps that's why all of PERISHED's classifications failed; they searched for the wrong file title[cite: 9]. The holes on it could be eyes, mouths, or merely breathing wounds[cite: 9]. Its vibration makes your bones ache[cite: 9]. Then it speaks inside the center of your brain with the voice of your deceased mother: «Three... Why are you late, my child... Three... Come along...»[cite: 9] It uses your own memories against you like evidence[cite: 9]." },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — That entity is operating on your soul", noteKind: "alert" },
        { type: "narrate", text: "The transmitter platform stands at the exact opposite edge of that foul pool[cite: 9]. Between you is only that massive mass and its opening holes[cite: 9]. Selin shouts: «I'm carving out a path for you! Those damned roots of Nevin are moving! Whatever you executed on the upper decks, it's saving your life now!»[cite: 9]", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "The transmitter platform is straight ahead, but between you is a completely unprotected, bare death zone[cite: 9]. Selin whispers in despair: «There is no cover! Just sprint like mad and pray for your soul while it reads you! If we could have saved Nevin upstairs, those roots would be cover, but now we are alone!»[cite: 9]", if: { flag: "nevinKurtarildi", equals: false } },
      ],
      choices: [
        { id: "gec", text: "Pass in front of the Artifact", next: "n_gecis_dene" },
      ],
    },

    n_gecis_dene: {
      cost: 1,
      events: [
        { type: "narrate", text: "You step right into the center of those foul gazes[cite: 9]. Your consciousness splits in two: one side of you is tearing to sprint to the other side like mad, while the other side wants to sink to its knees and embrace that mass of flesh, melting within that fraudulent peace[cite: 9]. «Three... Your feet are bleeding, why are you running... Three... It is very warm here, everyone is here... Your mother is waiting for you too...»[cite: 9]" },
        { type: "narrate", text: "Right at that moment, those massive roots of Nevin you saved spout out, shattering the rock, and close off the front of the Artifact's purulent holes to become a fleshy shield for you[cite: 8, 9]! «Now! Sprint! Don't stop!» Selin screams frantically[cite: 9].", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "That heavy bite resting in your stomach — that foul meal of the Chief — portrays you to that monster's hive mind like someone from the 'family' for a split second[cite: 9]. The Artifact pauses for a moment, not perceiving you as an alien tumor[cite: 9]. That one-second pause becomes life-saving water for you[cite: 9]!", if: { flag: "sofraYedi", equals: true } },
        { type: "ambient", text: "And suddenly, something you completely didn't expect happens — Out from the speaker of that small tablet in your hand, from the sonar line miles above, little Deniz's childish, static voice detonates: 「You asked me upstairs... if I joined... I still don't know my answer, brother. But now I am detonating those floor gates for you. All of them! Sprint, brother, don't get caught by my father!」 All the mechanical locks across the cave open with a ring[cite: 9]!", if: { flag: "denizSoruldu", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Sprint to the transmitter", next: "n_gecis_orta", if: { flag: "nevinKurtarildi", equals: true } },
        { id: "kos2", text: "Sprint to the transmitter (You are counted as family)", next: "n_gecis_orta", if: { flag: "sofraYedi", equals: true } },
        { id: "kos3", text: "Sprint to the transmitter (Deniz cleared the path)", next: "n_gecis_orta", if: { flag: "denizSoruldu", equals: true } },
        { id: "direncsiz", text: "Resist the digit, pass with your volition", next: "n_gecis_irade" },
      ],
    },

    /* mid-passage — risk of capture depending on noise/sanity status */
    n_gecis_orta: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are right in front of that mass of flesh[cite: 9]. Its wet, massive holes turn toward you, the radioactive hum it emits vibrating your internal organs[cite: 9]. You are right at the halfway point — One more step, one more step until your lungs burst... The Artifact attempts to pull the fear at the deepest corner of your soul with a tweezer: if you made too much noise, if you ate your wits on the upper decks, it will capture you instantly[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "Fortunately, you managed to preserve your silence until reaching here — the Artifact locates no remnant of madness to cling onto in your mind, you slip through its fingers[cite: 9]. The transmitter panel is right before you[cite: 9]!", ifStat: { stat: "gurultu", lte: 50 } },
      ],
      choices: [
        { id: "ulas", text: "Reach the platform", next: "n_platform_ulas", ifStat: { stat: "gurultu", lte: 50 } },
        { id: "yakala", text: "Advance (The Artifact senses you)", next: "n_gecis_yakala", ifStat: { stat: "gurultu", gte: 51 } },
      ],
    },

    n_gecis_yakala: {
      cost: 1,
      events: [
        { type: "narrate", text: "You made too much noise, your breaths awakened that monster[cite: 9]! A shadowy, fleshy arm of the Artifact lunges from the rock and wraps around your left ankle[cite: 9]! This touch burns your flesh like acid[cite: 9]. That foul hum paralyzes your brain, that digit converting into an order: STOP AND JOIN US[cite: 9]. For a moment, all power drains from your legs, you stop[cite: 9]. Selin’s scream echoing from afar tears your eardrums: «Fight it! Say your own name! Forget the digit!»[cite: 9]" },
        { type: "tab", stat: "akil", delta: -12, note: "SANITY -12 — Ominous flesh fibers gripped your ankle", noteKind: "alert" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtul", text: "Bellow your own name, break free", next: "n_gecis_kurtul" },
        { id: "birak", text: "Don't resist, surrender yourself (hazardous)", next: "n_son_derin" },
      ],
    },

    n_gecis_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "You bellow your own name until blood comes from your throat[cite: 9]! You vomit your own identity against the wall in defiance of that monster's passcode[cite: 9]! For a moment, the entire cave turns ice cold, that hum freezing like a knife[cite: 9]. That fleshy bond dissolves from your ankle and you hurl yourself forward, onto the transmitter platform[cite: 9]. You are coated in that disgusting fluid, panting, but it is still you[cite: 9]!" },
        { type: "stat", stat: "gurultu", delta: -15, note: "You tore the flesh by bellowing your name — NOISE dropped", noteKind: "system" },
      ],
      choices: [
        { id: "ulas", text: "Reach the platform", next: "n_platform_ulas" },
      ],
    },

    n_gecis_irade: {
      cost: 1,
      events: [
        { type: "narrate", text: "You have no root to serve as cover, nor a bond protecting you — you only possess your pure survival madness[cite: 9]! While that foul voice flows into your mind like a sewer, you count every step you take with your own name[cite: 9]. As it says 'Three,' you say 'Me!'[cite: 9] One! Two! Three — No, not its three, YOUR OWN THREE[cite: 9]! With bloody sweat seeping from your forehead, leaving half your brain behind, you fling yourself onto the platform[cite: 9]." },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — You passed through pure volition, but your brain sustained damage", noteKind: "alert" },
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
        { type: "narrate", text: "You are atop the platform[cite: 9]. That foul mass remains behind you, that warm wind it emits licking your back, but now you are at the console[cite: 9]. Selin lunges out from the rock crevice she was hiding in and collapses beside you, her face white as chalk: «You made it... My God, you came out of that hell alive!»[cite: 9] she screams, panting[cite: 9]. «Now the absolute worst part commences[cite: 9].»" },
        { type: "narrate", text: "This transmitter is a primitive sonar panel built by the deceased excavation crew to speak with that monster, but they failed[cite: 9]. But half the screens are dead — The main line coming from the generator is severed[cite: 9]. First you need to give life to this junk: connect the severed cables[cite: 9]. Selin holds an old schematic to your tablet light with trembling hands: «Connect the cables according to the color codes! Do not connect them faulty, if a spark flies, the sound it generates will awaken that bastard completely!»[cite: 9]" },
        { type: "objective", text: "Power up the transmitter." },
        { type: "note", id: "not_verici_guc", title: "Transmitter Power Line", text: "The transmitter is dead[cite: 9]. The cables are severed, as if someone cut its throat at the final moment so it wouldn't speak to the world[cite: 9]. If I can connect the color codes, we will reverse the Artifact's frequency[cite: 9]. This is no longer a repair; it's a report launched from the bottom of the grave[cite: 9]." },
      ],
      choices: [
        { id: "bagla", text: "Connect the severed power lines", next: "n_verici_guc", if: { flag: "vericiGuc", equals: false } },
        { id: "gecdur", text: "Power active — proceed to alignment", next: "n_verici", if: { flag: "vericiGuc", equals: true } },
      ],
    },

    n_verici_guc: {
      cost: 1,
      events: [
        { type: "narrate", text: "You tear open the greasy, rusted back panel of the console with your fingernails[cite: 9]. Five thick, bare-ended severed cables await the current coming from the generator[cite: 9]. Selin holds your tablet light inside the panel, her breath burning your neck: «Be quick... but do not tremble[cite: 9]. Every spark will unleash that mass of flesh upon us[cite: 9].»" },
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
        penalty: { gurultu: 14, text: "SPARK — Metal clashed, the Artifact startled. NOISE +14" },
        success: "n_verici_guc_ok",
        cancel: "n_platform_ulas",
      },
    },

    n_verici_guc_ok: {
      cost: 1,
      events: [
        { type: "system", text: "TRANSMITTER: POWER ACTIVE" },
        { type: "narrate", text: "The instant you lock the final cable into its port, the console awakens like a wild animal — The screens awaken vomiting green static, the giant sonar dish above rotating with a rusted groan[cite: 9]. The Artifact senses this metallic current instantly: The voice inside your ears sharpens, the digit forcing your skull with rage: «...THREE... WHAT THE HELL ARE YOU DOING... THREE...»[cite: 9] Selin collapses onto the buttons: «Electricity is up! Now we input that damned passcode, quick!»[cite: 9]" },
        { type: "flag", set: { vericiGuc: true } },
        { type: "stat", stat: "gurultu", delta: 10, note: "The sonar dish is rotating — NOISE increased", noteKind: "alert" },
      ],
      choices: [
        { id: "dizilim", text: "Proceed to symbol sequence alignment", next: "n_verici" },
      ],
    },

    /* ================= TRANSMITTER — FINAL PUZZLE ================= */

    n_verici: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The rusted sonar console stands before you like a death bill, gleaming. There are two phases: first you will input the language the Artifact carved onto the stones into the panel, then you will lock its 432 hertz pulse into reverse. Like breaking a ritual with technology. Or forcing the device of the corporation to confess the crime it hid for years." },
        { type: "narrate", text: "Selin is leaning over the console, froth seeping from her mouth: «I am reading the sequence, you will hit those damned buttons! The order is this: Triangle-eye, Four-notch, Hook, Star, Curl, then Arrow... This means 'PERISH' in its foul tongue! Tell me you are ready!»" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "sembol", text: "Input the symbol sequence (Selin is reading)", next: "n_verici_sembol" },
      ],
    },

    n_verici_sembol: {
      cost: 1,
      events: [
        { type: "narrate", text: "Eight decayed keys atop the console... Each bears those maddening carvings[cite: 9]. Selin screams behind you with all her might[cite: 9]. If you strike a single key faulty, the Artifact will repel it as a lobotomy attack executed upon your brain[cite: 9]." },
      ],
      interaction: {
        kind: "symbols",
        title: "LANGUAGE OF THE ARTIFACT — INPUT THE 'SILENCE' SEQUENCE",
        glyphs: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"],
        sequence: ["g5", "g4", "g6", "g7", "g2", "g8"],
        success: "n_sembol_ok",
        cancel: "n_verici",
        penalty: { gurultu: 10, text: "WRONG KEY — The console beeped like a shriek. NOISE +10" },
      },
    },

    /* The Artifact resists when the sequence is input — moment of tension */
    n_sembol_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you press the final symbol, the console swallows the passcode — And the Artifact FEELS its flesh being cut[cite: 9]! The entire cave shudders as if an earthquake is striking; rocks and filth rain down on your head from the ceiling, the projector lamps shattering wildly[cite: 9]. That hum is no longer a mother's voice, it's a savage monster howl bringing blood from your ears: «NO— FAMILY— DO NOT LEAVE US— DO NOT LET THE COUNTING STOP—»[cite: 9]" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — The monster is clawing at your brain", noteKind: "alert" },
        { type: "waitTap" },
        { type: "ambient", text: "Right then, out from the sonar line, Ece’s rasping, tearful voice detonates over the radio: «I am holding it! I am pumping a reverse signal from the sonar array and depressing its brain, becoming a shield for you — But my head is ready to explode, I can't hold out! Adjust the frequency, FINISH THIS!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "Ece is gone... You sold her out like a bait on the upper floors[cite: 9]. No protective reverse signal assistance arrives! That massive mental weight of the Artifact collapses directly inside your skull, your brain weeping blood, you must endure alone!", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "Selin grabs you by the collar, shaking you wildly, blood seeping from her eyes: «Don't disintegrate! Don't lose consciousness! The final move — adjust the damned radio! Strike that bastard!»[cite: 9]" },
      ],
      choices: [
        { id: "frekans", text: "Proceed to the radio frequency adjustments", next: "n_verici_frekans" },
      ],
    },

    n_verici_frekans: {
      cost: 1,
      events: [
        { type: "narrate", text: "The symbols panel flashes red, the console trembling as if ready to explode[cite: 9]. Now for the final blow: you will tune the radio dial to the anti-frequency that will break the Artifact’s 432 hertz death wave[cite: 9]. Selin screams: «Pull it to 433.6! I calculated it, this will collapse that mass of flesh! But you have a single shot, if you miss, that wave will turn us to ash!»[cite: 9]" },
        { type: "narrate", text: "Yet you listened to those hidden dead broadcasts... Your ear recognizes the rhythm of that static[cite: 9]. You realize that horrific truth Selin is unaware of: There is an error in her panic-driven 433.6; your instinct, your half-mad brain tells you the dial must seat onto 433.8[cite: 9]. Who will you trust[cite: 9]? Your own madness, or Selin[cite: 9]?", if: { flag: "frekanslariDuydun", equals: true } },
      ],
      interaction: {
        kind: "radio",
        target: 433.6,
        success: "n_buluntu_yuz",
        cancel: "n_verici_frekans",
        mode: "transmit",
      },
    },

    /* ================= SILENCING MOMENT — END DIVERGENCE ================= */

    /* ================= CONFRONTING THE ARTIFACT ================= */
    n_buluntu_yuz: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Everything is ready, your finger rests atop the death button[cite: 9]. Before pulling the trigger, you look at it one final time[cite: 9]. It looks at you from its holes, or so you think[cite: 9]. Beneath the digit, for the first time, you hear something else: isolation[cite: 9]. An ancient, ravenous isolation that insults human logic[cite: 9]. The terrifying thought is this: Perhaps it doesn't destroy humans[cite: 9]. Perhaps it adds them to itself just to avoid being alone[cite: 9]. An entity that doesn't know the difference between a massacre and a family[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "Selin digs her fingernails into your shoulder, shaking you: «I know what you are thinking... Don't show pity to that filth! That isn't mercy, it's the final bullet it's firing into your brain! It's trying to drag you into that hive too! Make your decision, seconds remain until zero!»[cite: 9]" },
        { type: "narrate", text: "You had deciphered that monster's language upstairs... And at that moment, lightning strikes your brain: 'Three' is not a countdown[cite: 9]! It's a victim list[cite: 9]! It called out three times until today and devoured three souls: Baturay, Deniz, Nevin[cite: 9]. You are the first piece of live flesh that refuses to become the fourth wall of that hive[cite: 9].", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "objective", text: "Fire the frequency." },
      ],
      choices: [
        { id: "atesle", text: "Fire the frequency — Silence the Artifact", next: "n_sustur" },
      ],
    },

    n_sustur: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Closing your eyes, you pull the trigger[cite: 9]! The console hurls that anti-frequency with a wild shriek[cite: 9]! The entire cave seems split in two; those ancient walls crack, the remaining final lamps exploding like bombs[cite: 9]. That hypnotic voice of the Artifact alters for the first time — That calm digit yields to a savage animal howl experiencing death throes: «TTHHHRREEEEE— TTHHHRREEEEE— NOOOO— FAMILY— DO NOT LEAVE US— DO NOT LET THE COUNTING STOP—»[cite: 9]" },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "waitTap" },
        { type: "narrate", text: "«It's dying! It's in agony!» Selin screams, wiping the blood leaking from her ears[cite: 9]. «But the frequency isn't enough, it's not dying completely! We must make a final decision, now!» As that final radiation wave emitted by the creature while dying trembles your tablet screen, those foul paths before you manifest[cite: 9]." },
        { type: "objective", text: "Make your final choice." },
      ],
      choices: [
        { id: "yuzey", text: "Lock the frequency, flee to the surface with Selin", next: "n_veda_selin", if: { flag: "eceEleVerildi", equals: false } },
        { id: "feda", text: "Overload the transmitter — eliminate the Artifact completely (sacrifice yourself)", next: "n_son_sessizlik" },
        { id: "katil", text: "Cease resisting — join the digit, choose serenity", next: "n_son_derin" },
        { id: "kayit", text: "Hoist the tablet, record everything (document it)", next: "n_son_kayit" },
        { id: "yuzey_zor", text: "Attempt to flee with Selin (No assistance from Ece)", next: "n_son_sifir", if: { flag: "eceEleVerildi", equals: true } },
      ],
    },

    /* ===== FAREWELL — THE FINAL MOMENT BEFORE ESCAPING TO THE SURFACE ===== */
    n_veda_selin: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The frequency locks, that mass of flesh groaning as it contracts into itself[cite: 9]. Selin grips your hand, but before leaving, she looks back at those three fresh graves inside the vault one final time[cite: 9]. «We left them inside that flesh...» she says, her throat rasping[cite: 9]. «Baturay... That tiny toddler... Nevin... We couldn't rescue them[cite: 9].»" },
        { type: "waitTap" },
        { type: "ambient", text: "That exact moment, those veiny roots of Nevin you saved stir with a final effort, not to strike you, but extending from beside Selin’s feet upward, toward those dark stairs to build a fleshy escape path for you[cite: 9]. You didn't leave them behind; they are carrying you upward[cite: 9].", if: { flag: "nevinKurtarildi", equals: true } },
        { type: "narrate", text: "«But you are here...» Selin says, wiping the bloody tears from her eyes to look at you[cite: 9]. «And I[cite: 9]. Two living humans[cite: 9]. Inside this damned hole, this is a miracle... Sprint[cite: 9]! Sprint for their memory!» Beyond the vault, those rusted stairs climbing upward are the single exit hatch beneath the dimming light of your tablet[cite: 9]." },
      ],
      choices: [
        { id: "kac", text: "Sprint upward to the surface with Selin", next: "n_son_yuzey" },
      ],
    },

    /* ===== ENDING 1: SURFACE (THE BEST) ===== */
    n_son_yuzey: {
      events: [
        { type: "narrate", text: "You lock the frequency entirely[cite: 9]. The hum of the Artifact lowers first, then rasps, then terminates[cite: 9]. For the first time, the station is silent[cite: 9]. This wasn't real silence; this is a crime machine finally falling unregistered[cite: 9]. Only your breaths remain[cite: 9]. The tiny, irregular, imperfect sounds generated by two living humans[cite: 9]. No protocol can sanitize this sound[cite: 9]." },
        { type: "waitTap" },
        { type: "ambient", text: "Ece’s sobbing voice emerges from the sonar line: «It stopped... That piece of garbage went silent[cite: 9]. The workers on the upper decks are waking up... That redness in their eyes is dissolving[cite: 9]. You made it... My God, you made it!»" },
        { type: "narrate", text: "Selin squeezes your hand tightly: «The escape pod is on the K-1 command floor[cite: 9]! While the station is silent, all electronic locks are open[cite: 9]! SPRINT!» Together you climb upward toward those pitch-black decks[cite: 9]. In your hand is only that weak tablet light... Six floors[cite: 9]. Five floors[cite: 9]. Four floors[cite: 9]." },
      ],
      interaction: {
        kind: "chase",
        title: "K-1 ESCAPE ROUTE — THE FINAL RUN",
        enemy: "THE COLLAPSING STATION AND THE ARTIFACT",
        success: "n_son_yuzey_basari",
        fail: "n_olum_kacis",
        startDanger: 45,
        phaseMs: 1100,
        hints: {
          patrol: "The station is groaning, the ceiling collapsing! Accelerate toward the pod![cite: 9]",
          search: "Water is flooding the surroundings and roots block the path. Hide while protecting yourself![cite: 9]",
          near: "A massive mass of flesh rises in the dark. Don't move, hold your breath![cite: 9]"
        }
      }
    },

    n_olum_kacis: {
      death: true,
      deathText: "Just as you reached the door of the escape pod, the ceiling collapsed with a massive roar, and the final extensions of the Artifact dragged you to the bottom of the darkness, into that cold ocean[cite: 9].",
      events: [{ type: "glitch", ms: 1000 }]
    },

    n_son_yuzey_basari: {
      ending: true,
      events: [
        { type: "narrate", text: "Looking back from the thick glass of the escape pod, PERISHED shrinks like a dead fish at the bottom of that dark sea[cite: 9]. Selin sits in the seat beside you, panting, both weeping and laughing[cite: 9]. Ece’s static voice comes over the radio: «See you on the surface, in the clean air...» Above your head, hundreds of meters up, is a real sky, real stars[cite: 9]. And inside your brain, no monster counts anymore[cite: 9]." },
        { type: "waitTap" },
        { type: "ambient", text: "Just as the pod is about to launch to the sea surface, something massive strikes the thick steel hull from the outside[cite: 9]. Once[cite: 9]. Then at regular intervals: Three impacts[cite: 9]. Just like inside Baturay’s torn journal... But this sound doesn't originate from WITHIN[cite: 9]. It strikes from OUTSIDE, from the absolute bottom of that dark ocean[cite: 9]. You silenced the Artifact; but that massive thing that struck the hull, that fed that mass of flesh for all these years, is still out there... And now there is no one left to feed it[cite: 9]. That thing is hungry[cite: 9]." },
        { type: "system", text: "— ENDING: SURFACE —[cite: 9]" },
        { type: "system", text: "The Artifact went silent[cite: 9]. You escaped along with Selin and Ece[cite: 9]. You survived — and brought the truth to the surface[cite: 9]." },
        { type: "system", text: "But something is still striking at the bottom of PERISHED[cite: 9]. And someone, reading the evidence you dispatched, will decide to descend down there[cite: 9]." },
        { type: "system", text: "PERISHED · THANK YOU" },
      ]
    },

    /* ===== ENDING 2: SILENCE (SACRIFICE) ===== */
    n_son_sessizlik: {
      ending: true,
      events: [
        { type: "narrate", text: "You turn the radio dial all the way to the final stage — The transformers inside the console detonate, sparks venting into your face[cite: 9]. Selin screams: «No! If you overload that much current, that frequency will melt your brain too—» But you don't withdraw your hand from the button[cite: 9]. You take all the poison of that creature and vomit it back at it at the cost of your own life[cite: 9]!" },
        { type: "waitTap" },
        { type: "narrate", text: "The entire cave gets blanketed by a blinding white light[cite: 9]. That sharp wail of the Artifact and the scream ascending from your throat merge at the exact same frequency, burning the air[cite: 9]. You eliminate it down to its cells — But that massive energy blast nails your body to the rock as well[cite: 9]. The final thing you feel is Selin pulling you toward the hatch to save you, but you shove her away: «Go... Save yourself...»[cite: 9]" },
        { type: "waitTap" },
        { type: "ambient", text: "Selin barely flings herself outside, and the thick steel hatch closes between you[cite: 9]. You remain right in the center of that white hell[cite: 9]. As that mass of flesh turns to ash, it leaves a final gift to your mind: No more static in your ears, nor those damned numbers... Only an absolute, clean silence[cite: 9]. And this silence is yours forever[cite: 9]." },
        { type: "narrate", text: "Selin will ascend to the surface alone[cite: 9]. The station is saved[cite: 9]. No one down below will know the name of the technician who silenced the frequency with their own body[cite: 9]. This is the kind of ending corporations love: an anonymous sacrifice, a clean report, a missing log[cite: 9]. But that night, everyone on the surface woke up with a strange lightness in their chests[cite: 9]. Without knowing someone carried and silenced that heavy digit in their stead[cite: 9]." },
        { type: "system", text: "— ENDING: SILENCE —[cite: 9]" },
        { type: "system", text: "You destroyed the Artifact[cite: 9]. By sacrificing yourself, you saved the station — perhaps the world[cite: 9]. Selin escaped and will tell the truth[cite: 9]." },
        { type: "system", text: "PERISHED · THANK YOU" },
      ],
    },

    /* ===== ENDING 3: DEEP (DARKNESS) ===== */
    n_son_derin: {
      ending: true,
      events: [
        { type: "narrate", text: "You don't have a single cell left to resist anymore[cite: 9]. Across six floors, everything prepared you for a place: to be personnel, to be a child, to be a specimen, to be a log[cite: 9]. The voice of the Artifact is soft and warm: «Three... Abandon your tablet... There is no pain here... Everyone is here, awaiting you...» Your contracted fingers withdraw from the console[cite: 9]. Surrendering feels less like cowardice, and more like returning home[cite: 9]. That is exactly why it is terrifying[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "«What are you doing?! Snap out of it, hit that button!» Selin’s terror-packed scream grows distant inside your brain, melting away... As that warm wave emitted from that fleshy mass wraps your soul, you don't resist for the first time, abandoning yourself to that wet current[cite: 9]. And that fraudulent peace... My God, it is so beautiful[cite: 9]. Aykut is smiling out there[cite: 9]. Nevin is there[cite: 9]. Baturay, little Deniz... All of them holding hands[cite: 9]. Family[cite: 7, 9]." },
        { type: "narrate", text: "Selin looks back and flees to the surface alone in sheer terror, leaving behind another victim swallowed by that hive[cite: 9]. You've become a cell of that mass of flesh now[cite: 9]. You have no name of your own, no consciousness of your own; you are now 'We.'[cite: 9] And We count patiently in that dark... forever[cite: 9]. Waiting for another piece of fresh meat from above to descend six floors down with a tablet in hand and find us[cite: 9]." },
        { type: "ambient", text: "«...Three... Two... Three... Two... Our brother arrived... Welcome...»[cite: 9]" },
        { type: "system", text: "— ENDING: DEEP —[cite: 9]" },
        { type: "system", text: "You joined the Artifact[cite: 9]. The pain ended[cite: 9]. You are now of the Family as well — and you await the next 'child.'[cite: 9]" },
        { type: "system", text: "PERISHED · THANK YOU" },
      ],
    },

    /* ===== ENDING 4: RECORD (DOCUMENTATION) ===== */
    n_son_kayit: {
      ending: true,
      events: [
        { type: "narrate", text: "Instead of silencing that monster, you hoist your tablet into the air with trembling hands[cite: 9]. It lacks a camera, yes; but you engrave all those foul voice frequencies emitted by that monster, the radioactive waves, the digital map of the carvings — everything into the memory of that small tablet[cite: 9]. Baturay’s final word is in your mind: 'Document everything.'[cite: 9] If they find your corpse, they won't think you were clever[cite: 9]. It doesn't matter[cite: 9]. Evidence outlives intellect[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "«What the hell are you doing?! Drop that damned device, the countdown is ending, WE NEED TO FLEE!» Selin screams frantically[cite: 9]. But you don't stop the logging by tapping the screen[cite: 9]. The Artifact is in agony, but it hasn't died; the countdown continues at full speed inside your brain[cite: 9]. «Two» says that voice[cite: 9]. Then «One»[cite: 9]." },
        { type: "narrate", text: "Selin gives you a final look mixed with terror and agony and dashes toward the stairs with that data copy she pulled from the tablet[cite: 9]. She is fleeing, with that world-shaking evidence in her hand[cite: 9]. You remain here, before that flesh[cite: 9]. While the Artifact whispers that final digit, your tablet's memory fills up and launches the data upward[cite: 9]. When Selin exits that door, the world will learn of this hell... Thanks to you[cite: 9]." },
        { type: "ambient", text: "In the reflection of your dimming tablet monitor, you see your own face: Completely calm[cite: 9]. Like Baturay[cite: 9]. Like a true whistleblower who completed their duty[cite: 9]. Whoever listens to this, do not turn my name into something sacred[cite: 9]. Don't call this heroism[cite: 9]. Call this the final log of the people the corporation buried[cite: 9]. And that fleshy hole inside your brain whispers one final time: «...Zero.»[cite: 9]" },
        { type: "system", text: "— ENDING: RECORD —[cite: 9]" },
        { type: "system", text: "You didn't flee — you chose to document[cite: 9]. You died, but Selin brought the evidence to the surface[cite: 9]. The truth can no longer be hidden[cite: 9]. Baturay would be proud[cite: 9]." },
        { type: "system", text: "PERISHED · THANK YOU" },
      ],
    },

    /* ===== ENDING 5: ZERO (FAILURE — IF NO ECE) ===== */
    n_son_sifir: {
      ending: true,
      events: [
        { type: "narrate", text: "You dash like crazy along with Selin toward those rusted stairs — But Ece is gone[cite: 9]! The sonar line has sunk into a pitch silence; there is no mind left behind to know which corridor is open, what the code to which door is, or where the safe path rests[cite: 9]. You had fed Ece as bait to those madmen on the K-5 floor, and now you are left completely without a guide right in the center of the flesh-market[cite: 9]." },
        { type: "waitTap" },
        { type: "narrate", text: "Under the dimming light of your tablet, you turn into the wrong corridor[cite: 9]. Before you looms a massive steel door with a thick, hydraulic lock... It won't open[cite: 9]! You turn back in despair, but that mass of flesh behind is now bellowing «Two» inside your brain[cite: 9]! The vibration is so powerful that warm blood seeps from your ears and nose, because you couldn't silence it[cite: 9]. Selin pounds the door handle: «There must be a way... There must be a way—» But there isn't[cite: 9]. This place is closed[cite: 9]." },
        { type: "narrate", text: "«One...» whispers that foul mass of flesh[cite: 9]. The entire station, all the steel structures on the walls awaken and hum[cite: 9]. On the upper floors, all that zombie crew sleeping in their beds open their eyes wide simultaneously — All of them stand up at once[cite: 9]. «Zero...»[cite: 9]" },
        { type: "ambient", text: "And at that moment, that voice stops[cite: 9]. Because there is no longer a foreign power left to count inside your brain[cite: 9]. Everyone — You, Selin beside you, the workers whose flesh is melting upstairs, and perhaps all that innocent surface at the end of the radio... You are now a single piece of flesh[cite: 9]. A single massive hive[cite: 9]. A single endless, calm, entirely hollowed-out dead mind[cite: 9]." },
        { type: "system", text: "— ENDING: ZERO —[cite: 9]" },
        { type: "system", text: "You couldn't fully silence the Artifact and failed to find the escape route without Ece[cite: 9]. The countdown hit zero[cite: 9]. The Family now encompasses everyone[cite: 9]. Perhaps the surface too[cite: 9]." },
        { type: "system", text: "PERISHED · THANK YOU" },
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