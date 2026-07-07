/* ============================================================
   CHAPTER-1 — SECTION 4: "K-3 / GARDEN"  (full version)
   Floor Owner: DR. NEVIN ARAS — biologist, "given to the garden".
   Transformed into a plant-entity by the spores of the 'Anomaly';
   but a human remnant still remains inside. The Chief had exiled her here from K-4.

   NEW THREAT TYPE: Nevin is stationary but EVERYWHERE —
   her roots wrap around the entire floor. She hunts by TRACE, not sound:
   if you step on the spore beds on the ground, the roots vibrate and find your location.
   So the danger is not noise; it is where you STEP.

   NEW MECHANIC — SPORE/BREATH: some passages are filled with spore clouds;
   if you pass without holding your breath, 'infection' increases (works through sanity like a hidden counter).
   Clean air pockets are checkpoints.

   ITEM-LOCK + CHEMISTRY: Nevin's seed vault requires three SAMPLES
   (blue spore, root extract, Selin's blood sample). Once all three are collected,
   a SERUM is crafted via a CHEMISTRY puzzle (mix) in the lab. The serum
   serves two purposes: bypassing/sleeping Nevin, or SAVING her.

   MORAL CHOICE (final): Nevin is still partially human.
   · Give the serum to her → restore her to her humanity (hard way, leaves a trace)
   · Drink/use the serum and pass → survive, leave her behind (easy way)
   · Escape through the compost route → Selin's route (hidden, dangerous)

   CARRIED STATE:
   · tableAte/tableRefused → Nevin "smells" you
   · eceBetrayed → Ece's K-3 sonar support
   · denizAsked → Deniz's trace in the archive corruption
   ============================================================ */

export const EP04 = {
  nodes: {

    /* ================= INTRODUCTION — HOT DARKNESS ================= */

    n_k3_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k3" },
        { type: "system", text: "TERROR LAYER: K-3 — ABANDONED GREENHOUSE AND FLESH AND ROOT" },
        { type: "narrate", text: "At the bottom of the stairs, a suffocating, foul-smelling hot and humid pitch darkness welcomes you. K-3 is breathing... But not with lungs. Thick roots hanging from the walls like fleshy leeches are plastered everywhere, the ceiling is covered with vines pulsing like veins. The ground you step on slides underneath you like a living skin that must not be stepped on. The cold, raw screen light of the tablet in your hand illuminates nothing but this rot. While the light hits your face, you are completely vulnerable and an open target inside the darkness." },
        { type: "narrate", text: "From the depths of the darkness, a raspy female whisper resembling the groan of a flayed human spreads out. She is not singing; she is madly muttering to the decaying seeds as if they were her children: 'Selin... Where is Selin... They took my baby away from me...'" },
        { type: "waitTap" },
        { type: "ambient", text: "Ece's trembling voice rises through the static from your tablet's speaker: «You descended to K-3... My God, that smell reaches all the way here. Nevin is there. The Chief fed her to that thing. Listen to me, do not step on them! She doesn't care about making noise, every root you step on is directly connected to her nerve ending. Wherever you step, she will pounce directly upon you!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "There is only your own heavy breathing in the darkness. The radio line is completely dead. After you sold out Ece, you are completely alone in this living grave of K-3. Only a dead crackle coming from the speaker scratches the feeling of guilt inside you.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "That raw meat you swallowed at the Chief's table convulses in your stomach as if it were alive. And you realize: as you approach, the fleshy sprouts on the wall stretch towards you like hungry wolves, vibrating... They caught that disgusting smell of the Chief's feast. They know you.", if: { flag: "sofraYedi", equals: true } },
        { type: "objective", text: "Find a way out of K-3." },
        { type: "note", id: "not_k3", title: "K-3: Living Grave", text: "This is not a laboratory, it is a digestive system built out of flesh and plants. Dr. Nevin has woven the entire floor like a web. My ears feel like they are going to burst, but the danger is not making noise, it is stepping on the ground. If I step on the spore beds, she will bury me alive." },
      ],
      choices: [
        { id: "ilerle", text: "Advance from the edge where the moss is thin", next: "n_sera" },
      ],
    },

    /* ================= CENTER: GREENHOUSE (HUB) ================= */

    n_sera: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Center greenhouse: The massive glass dome above it is broken, the blood-red light of the emergency filtering down turns the surroundings into a depiction of hell. Right in the middle, buried up to her waist inside the rotten soil and flesh masses, stands that motionless, terrifying figure: Nevin. Thick roots bursting from her spine pump into the ground of the entire floor like veins. She is the heart of this floor, the embodiment of all this suffering... Around her, there are five deadly paths opening into the pitch darkness.", if: { flag: "seraIlk", equals: false } },
        { type: "flag", set: { seraIlk: true } },
        { type: "status", items: [
          { label: "BLUE SPORE", flag: "ornek1" },
          { label: "ROOT EXTRACT", flag: "ornek2" },
          { flag: "ornek3", label: "BLOOD SAMPLE" },
        ] },
        { type: "ambient", text: "Nevin does not move, but her neck cracks as she slightly turns toward the light of your tablet like a hungry animal. \"...A new piece of flesh...\" she whispers from behind her closed, rotten eyelids. \"Walk, little seedling. The vibration of every step you take reaches my spinal cord and into my brain. You cannot escape. Roots are patient... Wait for me to digest you.\"" },
      ],
      choices: [
        { id: "fide", text: "Enter the humid room where the seedling whispers are coming from", next: "n_fide", if: { flag: "fideBitti", equals: false } },
        { id: "lab", text: "Head towards the laboratory with glass shards", next: "n_lab" },
        { id: "su", text: "Enter the passage of the dripping water warehouse (spore cloud)", next: "n_su_gecit" },
        { id: "iklim", text: "Look at the flashing greenhouse climate panel", next: "n_iklim_panel", if: { flag: "iklimCozuldu", equals: false } },
        { id: "kompost", text: "Approach the pit smelling of rot", next: "n_kompost_kapi" },
        { id: "kasa", text: "Try to open Nevin's seed vault", next: "n_kasa" },
      ],
    },

    /* NEW: greenhouse climate panel — colorgrid puzzle (light spectrum) */
    n_iklim_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "In the corner of the greenhouse, an old climate control panel covered in a slimy fluid is dying. Nine indicators flash arrhythmically like a broken pulse. Because of this wrong spectrum, the seedlings have mutated, looking almost like living human limbs. Nevin carved with her claws into the rusty wall next to the panel: 'The right spectrum puts the monsters to sleep. Red starves, blue stops the rot.' If you can't put these lights in the right order, the roots will tear you apart mercilessly." },
        { type: "note", id: "not_iklim", title: "Climate Panel Despair", text: "The light spectrum is at a breaking point. Seedlings are growing like human flesh. If I can pull the panel to blue, the tension of those disgusting roots will deflate and grant me a chance to catch my breath." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "LIGHT SPECTRUM — PUT THE MONSTERS TO SLEEP",
        palette: ["#1a1a22", "#3a5a9a", "#5a9a6a", "#c2a24a"],
        target: [1,2,1, 2,1,2, 1,2,1],
        start:  [0,0,0, 0,0,0, 0,0,0],
        cols: 3,
        success: "n_iklim_cozuldu",
        cancel: "n_sera",
      },
    },

    n_iklim_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "LIGHT SPECTRUM: DEAD BLUE — TEMPORARY SILENCE" },
        { type: "narrate", text: "The moment the crimson light leaves its place to a cold, sickly blue spectrum, the fleshy roots around loosen with a painful hiss. The vines hanging from the walls collapse to the ground as if they suffered a stroke. Even Nevin's wheezing slows down, retreating into a heavy hibernation. Use this damned dead silence well, because it won't last forever." },
        { type: "flag", set: { iklimCozuldu: true } },
        { type: "stat", stat: "akil", delta: 5, note: "PSYCHOLOGICAL RELIEF +5 — The roots fell asleep", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to the greenhouse", next: "n_sera" },
      ],
    },

    /* ================= SEEDLING ROOM — sample 1 (blue spore) + lore ================= */

    n_fide: {
      cost: 1,
      events: [
        { type: "narrate", text: "Seedling room: Hundreds of pots lined up side by side on shelves smelling of mold... And pale sprouts popping out of each one, resembling severed children's hands the color of human skin, are trembling. In the massive pot in the middle, a glowing BLUE spore sac swollen like a pus-filled boil pulses like a heartbeat. This is the forbidden living-tissue work SINIR-1 buried in K-3." },
        { type: "narrate", text: "A rusty, blood-stained voice recorder flashes its red light on one of the shelves. Nevin's human voice, trembling with fear before she went completely mad, echoes in the room:" },
        { type: "document", open: true, doc: {
          id: "d_nevin_kayit", title: "Dr. Nevin Aras — Secret Audio Recording", style: "hand",
          meta: "— From the Bloody Recorder in the Room —",
          body: "Recording 1: The Chief brought that thing from below, from K-2. A living tissue... It whispers at a terrifying frequency. 432 hertz. It makes my ears bleed but the plants obey it. We will too, I feel it.\n\nRecording 9: I played the sleep recordings of my deceased daughter to that thing... And my God! The Anomaly started counting backwards with my daughter's voice! Six, five, four... I thought my daughter came back! I am losing my sanity, it is a demon!\n\nRecording 14: The Chief punished me, buried me here alive. I am becoming less and less human. But Selin managed to escape. I left my own blood sample in the freezer near the compost. An antidote... That is the only salvation.\n\nFinal recording: I no longer have fingers, I have branches. They are so beautiful... I don't feel pain. Only... Selin... Where is my baby?" } },
        { type: "note", id: "not_nevin_kayit", title: "Nevin's Madness", text: "That creature in K-2 mimics human voices. They drove Nevin mad and sacrificed her to this greenhouse. Someone named Selin left blood along the compost path while escaping. The blue spore, root extract, and that blood... If I don't want to die, I have to make that serum." },
        { type: "waitTap" },
        { type: "narrate", text: "To take the blue spore sac, you have to plunge your hand into that disgusting pot. The moment you touch it, the toxic spore cloud will explode directly into your face. If you don't hold your breath, your lungs will melt within seconds." },
      ],
      choices: [
        { id: "al", text: "Pluck the blue spore sac — hold your breath", next: "n_fide_spor" },
        { id: "cik", text: "Do not touch it for now, exit", next: "n_sera" },
      ],
    },

    n_fide_spor: {
      events: [
        { type: "narrate", text: "You pluck the sac quickly! A blue, glowing but deadly dust cloud explodes into your face like a bomb. Your eyes burn as if washed with acid, your throat tears up to gasp for breath with a sob, but if you inhale the air, it will be your end. You have to endure!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9000, success: "n_fide_al", fail: "n_olum_spor" },
    },

    n_olum_spor: {
      death: true,
      deathText: "Your eyes feel like they are going to pop out of their sockets, and unable to endure, you inhale that toxic blue air into your lungs. A sensation spreads down your throat as if boiling water was poured down. You collapse to the ground vomiting blood. The last thing you see is thin roots sprouting out from under your own skin. Nevin looms over you and whispers: 'Welcome among us, fresh flesh...'",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fide_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "While the toxic cloud slowly dissipates in the air, you stuff the sac into your pocket and seal your mouth tightly. Your chest feels like it's going to burst, your heart is beating madly, but you succeeded. The blue spore is now in your hands." },
        { type: "flag", set: { ornek1: true, fideBitti: true } },
        { type: "note", id: "not_ornek1", title: "Sample 1/3: Purulent Spore", text: "I have the creature's blue spore sac. Only the root extract and Selin's blood remain. Time is running out." },
      ],
      choices: [
        { id: "cik", text: "Exit the seedling room", next: "n_sera" },
      ],
    },

    /* ================= WATER TANK PASSAGE — sample 2 (root extract) ================= */

    n_su_gecit: {
      cost: 1,
      events: [
        { type: "narrate", text: "The corridor leading to the water tank is completely covered with a dense, glowing layer of fog. Your visibility is zero. At the broken pipe junction at the end of the corridor, a pitch-black, viscous liquid filtered from the roots is dripping: Root extract. The passage is very long, and the light of the tablet in your hand only reflects back like a wall in this fog. You have to run across this hell in a single breath." },
        { type: "alert", text: "TOXIC SPORE CORRIDOR — If you don't pass in a single breath, your lungs will tear apart!" },
      ],
      choices: [
        { id: "gec", text: "Hold your breath, run through the passage", next: "n_su_nefes" },
        { id: "geri", text: "Retreat, look for another way", next: "n_sera" },
      ],
    },

    n_su_nefes: {
      events: [
        { type: "narrate", text: "You fill your lungs with as much clean air as you can take and throw yourself into that dense fog! Nothing is visible in the corridor, you just run forward madly, trying not to trip over the slimy roots beneath your feet. Spores stick to your face, your eyes. Your chest tightens, your mind screams at you to give up!" },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9000, success: "n_su_depo", fail: "n_olum_spor" },
    },

    n_su_depo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "When you reach the end of the corridor, you throw yourself into a small room with clean air and collapse on your knees, panting like a wild animal. The water tank room... Thick veins have wrapped around the giant tanks. You fill a rusty bottle on the ground with that tar-black root extract flowing from the pipe." },
        { type: "flag", set: { ornek2: true } },
        { type: "note", id: "not_ornek2", title: "Sample 2/3: Black Extract", text: "I got the second ingredient. There is something inside one of the tanks... Horrifying." },
        { type: "ambient", text: "You shine the light of the tablet in your hand onto the thick glass of one of the tanks. Inside, there is a handprint belonging to a decayed woman in the water. She scratched the glass madly with her fingernails... The trace of the moment she agonized while drowning." },
      ],
      choices: [
        { id: "geri", text: "Gather your breath, run back through the passage", next: "n_su_geri" },
      ],
    },

    n_su_geri: {
      events: [
        { type: "narrate", text: "Taking a deep breath one last time, you dive into that nightmare-like glowing fog cloud. This time to return. Your perception of time is lost, your lungs are rebelling!" },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_sera", fail: "n_olum_spor" },
    },

    /* ================= COMPOST — sample 3 (blood) + Selin + death ================= */

    n_kompost_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "Compost pit: The giant sewage and decay pool at the very bottom of the floor. Its smell is so heavy that you feel like a knife is being stabbed from your nose into your brain. This is where the station dumped failed experiments, waste tissue, and unregistered bodies. Selin's blood, which Nevin mentioned, must be somewhere along this path. A dangerous path covered in sludge extends along the edge of the pit." },
        { type: "alert", text: "Compost gas causes hallucinations, the ground is completely covered with corpse parts and slippery!" },
      ],
      choices: [
        { id: "gecit", text: "Advance through the narrow passage on the edge", next: "n_kompost_gecit" },
        { id: "cukur", text: "Descend into the pit, among what has been thrown away", next: "n_olum_kompost" },
        { id: "geri", text: "Retreat", next: "n_sera" },
      ],
    },

    n_olum_kompost: {
      death: true,
      deathText: "You step into the pit, but what you step on is not the ground! A living swamp consisting of semi-decayed human bodies swarming like leeches... They pull you down rapidly. You try to scream, but that filthy gas and sludge filling your mouth suffocates you. The compost pool swallows you up; you become one of the decaying fertilizers of this floor.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_kompost_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "While advancing through the narrow, slippery passage, you find a small shelter hidden in the wall. A tattered jumpsuit, rusty canned food boxes scattered around, and a medical cooler bag buzzing lightly in the corner... When you open the bag, you find a tube full of fresh human blood about to freeze between the ice packs and a note written in a shaky handwriting. Selin... took refuge here before escaping." },
        { type: "flag", set: { ornek3: true } },
        { type: "document", open: true, doc: {
          id: "d_selin", title: "Selin's Bloody Note", style: "hand",
          meta: "— From the Torn Cooler Bag —",
          body: "Whoever finds this...\n\nMy name is Selin. Nevin thought I was her deceased daughter. Even as she turned into that monster, she protected me with the last shred of human remnant inside her, hid me in this hole. She has a soul that needs to be saved.\n\nI left my own blood here. Nevin's formula is in my head: Blue spore + root extract + my blood. If you mix it in the right ratio, you get an antidote and you can save her from this torment. But do not mess up the ratio! A wrong mixture accelerates the decay and makes her completely a slave to that demon.\n\nI am going down. To K-2... The only way to silence that cursed thing called 'Anomaly' is to rip its heart out. Don't look for me. But if you make that serum... I beg you, save Nevin first. She was a good person.\n\n— S." } },
          { type: "note", id: "not_selin", title: "The Last Piece and Recipe", text: "I got Selin's blood. The recipe is clear: 1 spore, 2 extract, 3 blood = Antidote. If I do it wrong, Nevin will turn into a monster. Selin went down to K-2. I have all three pieces, time to go to the laboratory." },
        { type: "objective", text: "Bring the three samples to the laboratory." },
      ],
      choices: [
        { id: "geri", text: "Return to the greenhouse from the passage", next: "n_sera" },
      ],
    },

    /* ================= LABORATORY — serum (chemistry puzzle) ================= */

    n_lab: {
      cost: 1,
      events: [
        { type: "narrate", text: "Complete destruction is left of the laboratory: Overturned cabinets, broken tubes on the ground, and capillaries starting to cover everywhere... That recipe Nevin carved onto the wall with blood while she was human stands on the table. But if you don't have the materials in your hands, this is just a death warrant.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "You are at the laboratory bench. You fixed the light of your tablet onto the table. All three deadly pieces stand before you: Blue spore, black extract, and Selin's blood. Now you must combine this chemical horror in its exact ratio. A single milligram of error will drive Nevin completely mad.", if: { flag: "ornek3", equals: true } },
        { type: "document", open: true, if: { flag: "labTarif", equals: false }, doc: {
          id: "d_tarif", title: "Formula Carved onto the Wall", style: "hand",
          meta: "— Formula Written by Nevin with Her Own Blood —",
          body: "ANTIDOTE — Cellular Retraction\n\nVery precise ratio. A wrong mixture doesn't kill, it causes something WORSE THAN DEATH.\n\n  BLUE SPORE ...... 1 PART (Cell suppressor)\n  ROOT EXTRACT ...... 2 PARTS (Carrier tar)\n  BLOOD ............ 3 PARTS (Binding life essence)\n\nThe order doesn't matter, the RATIO must be absolute. Total 6 parts. If blood is low, it remains ineffective. If spore is high, it feeds the monster. Be careful!" } },
        { type: "flag", set: { labTarif: true } },
      ],
      choices: [
        { id: "yap", text: "Mix the serum", next: "n_lab_mix", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "First collect the three samples (missing)", next: "n_sera", if: { flag: "ornek3", equals: false } },
        { id: "cik", text: "Exit the laboratory, return to the greenhouse", next: "n_sera", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_lab_mix: {
      cost: 1,
      events: [
        { type: "narrate", text: "Your hands cannot steady the tubes from fear and trembling. The formula is clear: 1 spore, 2 extract, 3 blood. Total 6 parts. Black out your eyes and fill the syringe. If you make a mistake, you won't leave the room alive." },
      ],
      interaction: {
        kind: "mix",
        title: "NIGHTMARE MIXTURE — HIT THE RATIO (1 SPORE · 2 EXTRACT · 3 BLOOD)",
        bottles: [
          { id: "spor", label: "SPORE", color: "#4a6ac2" },
          { id: "ozut", label: "EXTRACT", color: "#4aa26a" },
          { id: "kan", label: "BLOOD", color: "#a23a3a" },
        ],
        target: { spor: 1, ozut: 2, kan: 3 },
        success: "n_serum_hazir",
        cancel: "n_lab",
        penalty: { akil: -12, gurultu: 6, text: "TERRIBLE ERROR — The tube exploded, acid gas spread into the room! SANITY -12" },
      },
    },

    n_serum_hazir: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "SERUM PRODUCED: A syringe full of life, glowing golden yellow." },
        { type: "narrate", text: "The golden liquid inside the syringe glows in the light of your tablet. Selin's testament said 'save Nevin'. But this serum could also be your only escape ticket to prevent Nevin from tearing you apart. The moment of choice is approaching." },
        { type: "flag", set: { serumHazir: true } },
        { type: "battery", spares: 1 },
        { type: "objective", text: "Return to the greenhouse." },
      ],
      choices: [
        { id: "sera", text: "Return to the greenhouse", next: "n_kasa" },
      ],
    },

    /* ================= SEED VAULT — item lock (samples) ================= */

    n_kasa: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nevin's seed vault: A steel SINIR-1 secure cabinet hidden behind thick roots. There are three biometric slots on it, but they don't want fingerprints, they want flesh-and-blood SAMPLES. If the vault opens, you can take the K-2 keycard inside. What is your status?" },
        { type: "alert", text: "SYSTEM LOCKED — Materials missing! This steel door won't open without finding the blue spore, root extract, and blood.", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "You used all three samples and made the serum. The rooted reader mechanism on the vault stretches towards the golden liquid in the syringe like a hungry leech. It will accept the serum like a key.", if: { flag: "serumHazir", equals: true } },
        { type: "narrate", text: "All three samples are in your pocket, but you haven't touched the chemistry table yet. You can sacrifice these raw materials directly to the vault and get the card, but then you will never have a serum to save Nevin. Decide.", if: { flag: "ornek3", equals: true, }, },
      ],
      choices: [
        { id: "serum_ac", text: "Touch the serum to the reader, open the vault", next: "n_kasa_acik", if: { flag: "serumHazir", equals: true } },
        { id: "lab_git", text: "First make the serum in the laboratory", next: "n_lab", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "Return to look for missing samples", next: "n_sera", if: { flag: "ornek3", equals: false } },
      ],
    },

    n_kasa_acik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "SECURITY VAULT OPENED — The steel hydraulic gaped open with a hiss." },
        { type: "narrate", text: "The heavy door of the vault opens. Inside lies the K-2 elevator descent card, two full batteries, and Nevin's last letter written entirely with a human mind." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { inisKarti: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_nevin_son", title: "Nevin's Last Confession", style: "hand",
          meta: "— From the Bottom of the Steel Vault —",
          body: "If you are reading this text, it means you managed to make that golden liquid. It can pull me out of this prison of flesh.\n\nBut I will be honest with you: I am not sure if I want to return. To be a root... means no emotions, the end of fear. Remaining human in this station's hell is nothing but pure pain.\n\nThe choice is yours. Wake me up and let both of us continue to endure the brutality of this station... Or leave me here, let me rot as a part of this floor.\n\nWhatever you do, go down to K-2. Selin is there. That creature is there. This nightmare will end there.\n\n— N." } },
        { type: "objective", text: "Open the K-2 door." },
      ],
      choices: [
        { id: "yuzles", text: "Go to the greenhouse center, to Nevin", next: "n_final" },
      ],
    },

    /* ================= FINAL — CONFRONTATION WITH NEVIN (moral choice) ================= */

    n_final: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Greenhouse center... Nevin stands there as a mass of flesh buried in the soil. The heavy iron door leading to K-2 is right behind her; to pass, you have to steal up right to the base of this monster. The moment the raw light of your tablet hits her face, she slowly opens her green, phosphorescent, purulent eyes. There is an indescribable human weariness and madness in her gaze." },
        { type: "narrate", text: "\"I smell the serum...\" she moans, slimy fluids pouring from her mouth. \"Selin's blood... Still fresh, still warm.\" The massive roots around rise into the air like a whip, surrounding you but they don't strike a blow yet. \"Decide, little insect. Will you end this pain, or will you condemn me to this nightmare?\"" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtar", text: "Give the serum to Nevin — try to save her", next: "n_final_kurtar" },
        { id: "gec", text: "Keep the serum for yourself, slip past her", next: "n_final_gec" },
        { id: "kompost_kac", text: "Escape through the compost route (Selin's route)", next: "n_final_kompost", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_final_kurtar: {
      cost: 1,
      events: [
        { type: "narrate", text: "You close your eyes and plunge forward, plunging the syringe into the thickest, pulsating vein in Nevin's neck! The moment the golden liquid is pumped into her veins, a deafening shriek breaks out in the room — the cry of both a human woman and a dying monster! The roots strike the wall as if driven crazy, Nevin's face smoothens for a moment and becomes completely human." },
        { type: "stat", stat: "akil", delta: 10, note: "SANITY +10 — You didn't lose your humanity", noteKind: "system" },
        { type: "flag", set: { nevinKurtarildi: true } },
        { type: "waitTap" },
        { type: "narrate", text: "\"...Thank you...\" Nevin whispers, crying. With a real, soft human voice. \"Too late... It's too late for me but... At least you ended my pain.\" While her roots dry up completely and turn into dust, the heavy iron door behind her opens with a great noise. \"Find Selin... Tell her I tried to be a good mother to her...\"" },
        { type: "ambient", text: "Nevin's body mixes into the soil like a decayed leaf. That cursed plant smell on the K-3 floor flies away. The floor is finally completely silent and dead.", if: { flag: "eceEleVerildi", equals: false } },
      ],
      choices: [
        { id: "in", text: "Open the K-2 hatch, descend", next: "n_k3_son" },
      ],
    },

    n_final_gec: {
      cost: 1,
      events: [
        { type: "narrate", text: "You hide the serum in your pocket, you can't waste it; it is your only guarantee of survival. Turning off the light of your tablet and holding your breath completely, you glide like a mouse under Nevin's monstrous roots. \"...You are leaving...\" she whispers behind you, her voice coming from deep and resentful. \"Like everyone else... Downwards... You are going to death...\"" },
        { type: "flag", set: { nevinBirakildi: true } },
        { type: "stat", stat: "sefFarkindalik", delta: -5 },
        { type: "narrate", text: "You reach the K-2 door and throw yourself into the corridor. When you look back, you see Nevin closing her eyes again, burying herself in that darkness of flesh. Leaving a human behind to rot like this will scratch your mind forever. But for now, you are alive." },
      ],
      choices: [
        { id: "in", text: "Open the K-2 hatch, descend", next: "n_k3_son" },
      ],
    },

    n_final_kompost: {
      cost: 2,
      events: [
        { type: "narrate", text: "You do not dare to see that terrifying face of Nevin, and you return to that compost path smelling of sewage filth where Selin escaped. This is a narrow passage full of toxic gases, smelling foul. But Nevin's roots couldn't infiltrate this dead zone. In complete darkness, you advance by crawling." },
        { type: "narrate", text: "At the end of the passage, where human waste and chemicals accumulate, you find a rusty discharge pipe opening to K-2. Selin's footprints covered in mud are still fresh. However, the gas leaking from the pipe burns your lungs like a flame; if you don't hurry, you will suffocate here!" },
        { type: "flag", set: { selinRotasi: true } },
        { type: "stat", stat: "akil", delta: -8, note: "SANITY -8 — Suffocating Gas Inhaled", noteKind: "alert" },
      ],
      choices: [
        { id: "in", text: "Descend to K-2 through the hidden discharge", next: "n_k3_son" },
      ],
    },

    /* ================= END OF SECTION ================= */

    n_k3_son: {
      cost: 1,
      events: [
        { type: "system", text: "K-2 DISCHARGE DOOR OPENED" },
        { type: "narrate", text: "The door opens slowly and the air hitting your face from below makes your hair stand on end... An ice-cold, mineral-smelling, ancient air. This is no longer the concrete walls of the station; this is a massive mining and excavation site carved directly underground, into ancient rocks. The madness started here." },
        { type: "waitTap" },
        { type: "ambient", text: "The tablet screen crackles and gives Ece's tearful voice: «You are descending to K-2... My God, that place is the real hell. Even station management couldn't control what was there. The Anomaly is there... Selin is there... Please be careful. And... thank you for not selling me out to the Chief, for protecting me. Please live.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The screen of your tablet vibrates strongly one last time, makes static, and sinks into complete silence. You had sold out Ece; there is no one left to hear your screams in this pitch-black mine miles beneath the ground. You are completely alone. Just the cold light of your tablet and you.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "And from below, from the depths of those pitch-black rocks, that voice rises with a broken child frequency. Now it's very clear, now it's right by your ear: «...Three... Two...» The Anomaly continues its countdown. And almost nothing is left to zero.", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "ambient", text: "And from below, inside the bottomless darkness, a vibration wave resembling the heartbeat of a mechanical, massive metal spreads out. This is not a living thing. This is a timer. And it is approaching its final seconds.", if: { flag: "frekanslariDuydun", equals: false } },
        { type: "narrate", text: "The rusty ladder in front of you descends into that bottomless, absolute darkness inside the rock. You passed five floors, only a single floor remains. And on that final floor, at the source of the curse, the Anomaly is impatient to welcome you." },
        { type: "system", text: "— SECTION 4 COMPLETED: THE DECAY OF THE GARDEN —" },
        { type: "system", text: "K-2: 'THE ANOMALY' — ESCAPE OR DEATH — COMING SOON" },
      ],
      choices: [
        { id: "k2", text: "Descend to K-2", next: "n_k2_giris" },
      ],
    },

  },
};

export const EP04_FLAGS = {
  iklimCozuldu: false,
  seraIlk: false, fideBitti: false,
  ornek1: false, ornek2: false, ornek3: false,
  labTarif: false, serumHazir: false, inisKarti: false,
  nevinKurtarildi: false, nevinBirakildi: false, selinRotasi: false,
};
