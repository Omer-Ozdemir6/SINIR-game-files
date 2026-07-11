/* ============================================================
   PERISHED — EPISODE 2: "K-5 / THE ORDEAL" (v4 — SEVERE PSYCHOLOGICAL HORROR & TABLET GLOW)
   Floor master: DENİZ OKUR — the engineer speaking through the intercom system.

   STRUCTURE & ATMOSPHERE (PERISHED psychological realism):
   · n_hub: splits into four branches; the player CHOOSES the order of the trials.
   · The player has NO NIGHT VISION or visor goggles. Only the MAINTENANCE TABLET.
   · The tablet's screen light (or its flash) is the sole light source; if the battery dies, absolute dark and death are certain.
   · Narrative language is forged around despair, heavy psychological dread, visceral somatic horror, and claustrophobic pressure.
   · All code syntax, flags, and interactions are perfectly preserved; texts revised to match PERISHED's own brutality and sub-surface isolation.
   ============================================================ */

export const EP02 = {
  nodes: {

    /* ================= ENTRY — THE SEALED FLOOR ================= */

    n_k5_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k5" },
        { type: "sting", name: "stingK5" },
        { type: "system", text: "FLOOR: K-5 — LIFE SUPPORT · THE BRINK OF DEATH · CYCLE OF WATER AND BLOOD" },
        { type: "narrate", text: "The moment you descend the stairs, the air filling your lungs turns heavy with rust, mold, and decaying meat. K-5 doesn't operate like a facility floor; it operates like a hollowed organ you've stepped inside. Pipes throb, filters hiss as if suffocating. The machinery here isn't malfunctioning; it has been kept alive under the guise of an error. It feels as if someone designed this place not to offer aid, but to measure your breath count." },
        { type: "narrate", text: "Fear down here is not random. The cameras, loudspeakers, and console panels along the walls are placed so methodically that K-5 feels less like a floor and more like a massive experimental cage stripped of an observation booth. At the end of every corridor, something is measuring you: how much noise you make, how fast you panic, how many seconds you endure before begging." },
        { type: "narrate", text: "You take three trembling steps forward. Suddenly, the heavy steel door behind you slams shut with such violence that the shockwave slaps your back. The deadbolt slots into place: CLICK. CLICK. Like a rat caught in a trap, this is a testing ground and you are merely a victim whose death throes are meant to be watched." },
        { type: "narrate", text: "The only thing piercing the darkness is the raw, white screen glow of the tablet trembling between your fingers. This light doesn't rescue you; it illuminates your face like a flare, showing the things hunting you exactly where you stand. The battery indicator slowly blinks." },
        { type: "waitTap" },
        { type: "glitch", ms: 300 },
        { type: "anons", text: "「There you are... fresh living meat. I am Deniz. I am the god of this labyrinth, and I am its butcher. Every gate, every blind camera, every rusted loudspeaker is my eye, my tongue. And you... you are just a new toy I hope will squirm a little longer.」" },
        { type: "anons", text: "「The rules are brutally simple enough to hurt: There are three merciless lessons on this floor. Each lesson will reward you with a CARD FRAGMENT, which you must pull from your flesh like splinters. If you cannot splice all three with your bloody fingers and slot them into the exit hatch, you rot here. The choice is yours; watching which agony you begin with takes my breath away...」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "objective", text: "Collect the three card fragments." },
        { type: "note", id: "not_deniz", title: "Deniz Okur — Guard of My Cell", text: "Deniz doesn't manage this floor; he has become its tongue. The doors are his teeth, the cameras his eyes, the loudspeakers his mouth. What he calls 'lessons' are torture stations. He demands three card fragments. This isn't a game, but he has to pretend it is; otherwise, he'll look in the mirror and see that he's locked in the cage too." },
        { type: "document", open: false, doc: {
          id: "d_deniz_protokol", title: "Behavioral Measurement Protocol — K-5",
          body: "From: d.okur@sinir1.local\nTo: h.tekin@sinir1.local\nSubject: New maintenance personnel / K-5 behavioral assessment\n\nChief,\n\nThe new personnel made it out of K-6 alive. This is statistically unsettling.\nUpon their entry to K-5, I will enforce standard protocol:\n\n1. Exit vectors will be withheld.\n2. Three operational lines will be unlocked separately.\n3. Distress calls will be logged, then severed.\n4. If they state their name, the test will be personalized. Names prolong the subject's panic.\n\nIn the previous three candidates, the desire to speak decreased significantly after the third task.\nThis silence isn't obedience; it's the subject withdrawing from within themselves.\n\nNote: If this candidate endures as well, I want to see them before handing them over to the Family.\nCuriosity isn't scientific, I know. But we both know that what we started here under the name of science turned into something else long ago.\n\nD. Okur\nSystems Oversight" } },
      ],
      choices: [
        { id: "ilerle", text: "Infiltrate the corridor, holding the tablet's trembling light ahead", next: "n_hub" },
      ],
    },

    /* ================= CENTRAL HUB ================= */

    n_hub: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "A suffocating distribution junction opening into four savage darknesses. A puddle of coagulated, blackened fluid rests on the deck — its stench scratches your throat. One of the lifeless cameras on the ceiling rotates, its inner gears screeching in agony, driving its lens straight into your eyes. The light from your tablet stretches the surrounding shadows into towering monsters on the walls.", if: { flag: "hubIlk", equals: false } },
        { type: "flag", set: { hubIlk: true } },
        { type: "ambient", text: "Directional signs on the wall are choked with rust and grime: PRESSURE CHAMBER · TUNNEL NETWORK · OBSERVATION ROOM · EXIT. Directly beneath the signs, someone scratched, likely until their fingernails ripped off: 'They didn't die in order, so croak whenever you are ready.'" },
      ],
      choices: [
        { id: "basinc", text: "Turn into the wet, blood-scented corridor where pressure shrieks echo", next: "n_s1_kapi", if: { flag: "kart1", equals: false } },
        { id: "tunel", text: "Crawl into the pitch-black abyss where the ceiling shafts lower like a coffin", next: "n_s2_kapi", if: { flag: "kart2", equals: false } },
        { id: "gozlem", text: "Infiltrate the corridor projecting dead silence from behind broken glass", next: "n_s3_kapi", if: { flag: "kart3", equals: false } },
        { id: "destek", text: "Approach the life support panel convulsing with sparks", next: "n_destek_panel", if: { flag: "destekOnarildi", equals: false } },
        { id: "cikis", text: "Walk toward that massive steel exit door chained to the floor", next: "n_cikis" },
        { id: "dinlen", text: "Cower in the shadow of a dark pipe, trying to suppress your sobs", next: "n_hub_dinlen", ifStat: { stat: "gurultu", gte: 30 } },
      ],
    },

    /* LIFE SUPPORT PANEL — WIRES PUZZLE */
    n_destek_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "In the darkest corner of the junction, the life support panel hangs askew. Its cover looks hacked open with an axe; the five wires inside dangle out like veins pulled from a split rib cage. The label still holds an official composure: \"K-5 AIR CIRCULATION — YAŞAM / LIFE & DEATH BALANCE\". This isn't a balance. This is a mechanism that calibrates suffocation. If Deniz broke this panel, it wasn't to kill you; it was to see what horrors you would touch just to catch a breath." },
        { type: "note", id: "not_destek", title: "The Dying Air Panel", text: "The lungs of K-5 have been ripped out. Five bare wires are spitting sparks, hot enough to burn my fingers if I touch them. I need to find the correct ports. If I fail, this toxic air will choke me, and the wheezing sounds I make will expose my position instantly." },
      ],
      interaction: {
        kind: "wires",
        title: "TO BREATHE — CONNECT THE WIRES WITHOUT LETTING THEM TOUCH YOUR FLESH",
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
        penalty: { gurultu: 12, text: "BOOM! Faulty connection. High voltage detonated across your fingers and reverberated against the steel walls. NOISE +12" },
        success: "n_destek_onarildi",
        cancel: "n_hub",
      },
    },

    n_destek_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "AIR CIRCULATION: FOUL GAS VENTED" },
        { type: "narrate", text: "The instant you force the final wire into its port, the panel sparks alive with a fierce growl. Fans begin to spin, and that raw, rotting iron stench tearing your throat slowly dissipates. For the first time, you can draw a deep breath as your chest heaves heavily. To escape, you must keep your wits about you." },
        { type: "flag", set: { destekOnarildi: true } },
        { type: "grid", stat: "akil", delta: 6, note: "SANITY +6 — Fresh air entering your lungs brought back life", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to that deadly crossroad junction", next: "n_hub" },
      ],
    },

    n_hub_dinlen: {
      cost: 2,
      events: [
        { type: "narrate", text: "You sink against a drenched, ice-cold pipe and pull your knees to your chest. Your heart hammers as if trying to rip through your rib cage. One... Two... You hide the tablet's light between your legs. The blood-red light atop the camera slowly turns off; Deniz must be watching another victim's agony for the moment." },
        { type: "stat", stat: "gurultu", delta: -20, note: "Your breathing stabilized — NOISE reduced", noteKind: "system" },
      ],
      choices: [
        { id: "geri", text: "Aim the light back into the darkness and return to the junction", next: "n_hub" },
      ],
    },

    /* ================= TRIAL 1 — PRESSURE (CARD FRAGMENT I) ================= */

    n_s1_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Lesson one: PRESSURE. Inside are three valves powerful enough to separate your flesh from your bones. If you don't turn them in the correct sequence, we will listen to your precious eardrums bursting inside your head. Begin, little rat.」" },
        { type: "narrate", text: "Next to the heavy iron door stands a rusted schematic board. A diagram rests beneath layers of dried blood; someone must have tried to wipe it clean before dying. Approaching the board, you realize: This isn't a hint; it's the corporation's way of clearing its name. There were instructions. If they read them, they would have lived. That's what they will write. To read it, you have to scrape away the grime with your fingers. Lunging straight inside isn't courage; it's just making their reporting duties easier." },
      ],
      choices: [
        { id: "oku", text: "Press the tablet light against the board, scrape the grime, and read", next: "n_s1_sema" },
        { id: "gir", text: "I have no time, batteries are bleeding out! Dive straight inside", next: "n_s1" },
      ],
    },

    n_s1_sema: {
      cost: 1,
      events: [
        { type: "flag", set: { s1SemaOkundu: true } },
        { type: "document", open: true, doc: {
          id: "d_havasema", title: "Pressure Protocol Under Duress",
          meta: "PERISHED · K-5 FATALITY TRACKING · INSTRUCTION 3-C",
          body: "PRESSURE CHAMBER — EMERGENCY MANUAL VENTING PROTOCOL\n\nCONFIDENTIAL: INTERNAL USE ONLY / MEDICAL INCIDENT REPORT ATTACHED\n\nThe sequence of execution shall not be altered:\n\n  1) EQUALIZATION (yellow) — halts cranial pressure spike\n  2) VENTING      (red)    — discharges bloody gas into the bilge line\n  3) MAIN SUPPLY  (green)  — releases the hatch lock mechanisms\n\nCASE 12-TD: Sequence violation resulted in left tympanic membrane rupture,\nintraocular vessel bursting, and 43 seconds of consciousness loss.\nPersonnel was extracted alive; speech capacity did not return.\n\nNote: The screaming audio captures within the chamber are not training materials.\nRe-playing them is strictly prohibited." } },
        { type: "note", id: "not_havasema", title: "The Sequence to Save My Ears", text: "First the YELLOW valve (equalization), then the RED one (venting), and finally that massive GREEN wheel. If I make a wrong move, my head will burst." },
      ],
      choices: [
        { id: "gir", text: "Engrave the diagram into your mind and enter the pressure chamber", next: "n_s1" },
      ],
    },

    n_s1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The instant you step into the room, a horrific throbbing begins in your ears, your eyes straining as if ready to pop from their sockets. Steam escaping from the walls rises with a shriek. Three valves stand before you: Yellow, red, and at the deepest, dimmest corner, a giant wheel painted green. The pressure gauge trembles violently in the crimson zone.", if: { flag: "s1Ilk", equals: false } },
        { type: "flag", set: { s1Ilk: true } },
        { type: "alert", text: "BAROMETRIC PRESSURE AT FATAL LEVEL — CHOOSE BEFORE YOUR HEAD EXPLODES" },
        { type: "narrate", text: "You charged in without reading the diagram. Which valve will you turn by hand-groping in the dark? A single mistake will cause blood to leak from your ears.", if: { flag: "s1SemaOkundu", equals: false } },
      ],
      choices: [
        { id: "sari", text: "Grab the YELLOW valve and crank it with all your might", next: "n_s1_b" },
        { id: "kirmizi", text: "Spin the RED valve frantically", next: "n_s1_yanlis" },
        { id: "yesil", text: "Force open that giant GREEN wheel", next: "n_s1_yanlis" },
      ],
    },

    n_s1_yanlis: {
      cost: 1,
      events: [
        { type: "glitch", ms: 500 },
        { type: "narrate", text: "The moment you turn the valve, a horrific explosion reverberates through the room! A high-pressure shockwave stabs into your ears like two white-hot irons. You collapse to your knees screaming, but you can't even hear your own voice; the inside of your head is choked by a pure, maddening ringing. You feel warm blood leaking from your nose." },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Blood seeps from your ears, the ringing is maddening", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 10, note: "NOISE +10 — This horrific blast woke up everything on the floor", noteKind: "alert" },
        { type: "anons", text: "「Ahahaha! My god, I heard that bone-cracking sound all the way from here! Was looking at the paper on that board really that hard? Come on, drag yourself up and suffer from the beginning!」" },
      ],
      choices: [
        { id: "tekrar", text: "Wipe the tears from your eyes, gather yourself through the pain, and face the valves", next: "n_s1" },
        { id: "cik", text: "Flee outside in desperation, read the schematic on the board", next: "n_s1_kapi", if: { flag: "s1SemaOkundu", equals: false } },
      ],
    },

    n_s1_b: {
      cost: 1,
      events: [
        { type: "system", text: "EQUALIZATION VALVE: OPEN — CRANIAL PRESSURE DROPPING" },
        { type: "narrate", text: "The yellow valve turns with a shrill screech, and that horrific bursting sensation in your ears eases slightly. But you can't stall; your tablet light is flickering. Now for the second one." },
      ],
      choices: [
        { id: "kirmizi", text: "Leap to the RED valve and spin it", next: "n_s1_c" },
        { id: "yesil", text: "Force the GREEN wheel", next: "n_s1_yanlis" },
      ],
    },

    n_s1_c: {
      cost: 1,
      events: [
        { type: "system", text: "VENTING VALVE: OPEN — FOUL GAS DISCHARGING INTO THE BILGE" },
        { type: "narrate", text: "The pressure gauge slides down from that deadly red zone. One final strike remains: The main supply wheel. Rusted, giant, and green." },
      ],
      interaction: { kind: "valve", title: "LIKE TEARING APART STONE — TURN THE WHEEL WITH ALL YOUR STRENGTH", turns: 6, success: "n_s1_ok", cancel: "n_s1_c" },
    },

    n_s1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav1: true, kart1: true } },
        { type: "system", text: "CHAMBER EQUALIZED — CARD FRAGMENT I RIPPED FROM THE APPARATUS AND SECURED" },
        { type: "anons", text: "「...Well, look at you. You aren't just a mindless sack of meat after all, you can read. You are more durable than the previous three miserable pieces of flesh. The first fragment is yours, enjoy your little victory for now.」" },
        { type: "battery", spares: 1 },
        { type: "note", id: "not_sinav1", title: "The First Bloody Fragment (I / III)", text: "Secured the first fragment. The pressure chamber isn't a puzzle; it's a tomb machine designed to measure how much pressure a human skull can take before losing its personality. Deniz mentioned three candidates before me. Candidates. They don't say victims. They think wrapping murder in corporate language makes it clean." },
      ],
      choices: [
        { id: "hub", text: "Hide the card fragment near my chest and return to the junction", next: "n_ara1" },
      ],
    },

    /* ===== ECE FIRST CONTACT ===== */

    n_ara1: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "As you trudge back toward the junction, trembling, the mangled intercom panel on the wall suddenly crackles. Once. Twice. Beneath the static, beneath that choking hiss, a terrified yet human—a real woman's voice ascends:" },
        { type: "ambient", text: "«Please don't make a sound, just listen... This is the old sonar line, Deniz's disgusting ears can't hear this grid. ...You made it out of the K-6 hellhole. No one had ever come out of there alive. What nightmare did you emerge from? Who are you?»" },
      ],
      choices: [
        { id: "ad", text: "Whisper my name with a voice shaking from terror", next: "n_ara1_ad" },
        { id: "adyok", text: "\"Names mean death down here. I'm just a technician trying to survive.\"", next: "n_ara1_adyok" },
      ],
    },

    n_ara1_ad: {
      cost: 1,
      events: [
        { type: "flag", set: { adSoylendi: true } },
        { type: "stat", stat: "eceGuven", delta: 15, note: "ECE anchored herself to you in the midst of this horror", noteKind: "system" },
        { type: "ambient", text: "«...For three whole weeks in this dark, no one has told me their name. Everyone just screamed or croaked like a number...» You hear her trying to swallow her sobs behind the transmission. «I am Ece. Sonar operator. Listen to me, if you want to live, listen closely:»" },
      ],
      choices: [
        { id: "devam", text: "Aim the tablet light at the floor and listen with absolute focus", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_adyok: {
      cost: 1,
      events: [
        { type: "ambient", text: "«...Right. You are completely right. Deniz hunts names. If you give him a name, he engraves it into his mind and makes you his pet until you go mad...» A brief, heavy pause. «You are terrified, but you haven't lost your mind. That is your only weapon on this floor. Listen to me carefully:»" },
      ],
      choices: [
        { id: "devam", text: "Listen with dread", next: "n_ara1_bilgi" },
      ],
    },

    n_ara1_bilgi: {
      cost: 1,
      events: [
        { type: "ambient", text: "«He will run the tunnel trial in absolute darkness... He will cut the lights and hunt you down. and those tunnels are a literal human grinder, a blind maze. For days, I listened through the intercom as those who entered without a map shattered their skulls against the walls... There is an old tunnel schematic inside that bloody maintenance locker next to the observation room. Go in there and TAKE IT!»" },
        { type: "ambient", text: "«One more thing... Deep inside the tunnels, at the bottom of those sewers, lives something else... Even Deniz doesn't know; no one could tell him because everyone who entered the tunnels was consumed. If you hear a wet, crawling sound down there... STOP. Do not even breathe, freeze completely still. Promise me.»" },
        { type: "note", id: "not_ece2", title: "Ece's Tunnel Warning", text: "Ece is speaking through a hidden line, Deniz is blind. Entering that tunnel meat-grinder without a map is suicide. The map is inside the locker next to the observation room. But the real horror... is 'that thing' in the tunnels. The only escape: Stop and do not breathe. This girl has survived in this graveyard for three weeks; what she says is my only ticket out." },
      ],
      choices: [
        { id: "hub", text: "Aim the tablet light down the hall and slide back into the junction", next: "n_hub" },
      ],
    },

    /* ================= TRIAL 2 — TUNNEL (CARD FRAGMENT II) ================= */

    n_s2_kapi: {
      cost: 1,
      events: [
        { type: "anons", text: "「Lesson two: SENSE OF DIRECTION. Crawl into those tight steel intestines, scrape your way out the other end, and claim the second fragment. Sounds easy, right? But here's a little surprise—」" },
        { type: "system", text: "K-5 TUNNEL SECTOR: ALL LIGHTS KILLED · ABSOLUTE DARKNESS" },
        { type: "anons", text: "「—the lights stay with me! Let's see how long the pathetic screen glow of that little tablet protects you. When your batteries die, you'll see what awaits you in the dark...」" },
        { type: "narrate", text: "The mouth of the tunnel stands before you like a massive, pitch-black throat baring its teeth. A cold, rotten draft blows from within. Do you have a map? Or did you stop by that ominous locker Ece mentioned?", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "gir", text: "Crawl toward that black hole, trembling with terror", next: "n_t1" },
        { id: "dolap", text: "First, pry open that ominous locker near the observation room", next: "n_s2_dolap", if: { flag: "tHarita", equals: false } },
      ],
    },

    n_s2_dolap: {
      cost: 1,
      events: [
        { type: "flag", set: { tHarita: true } },
        { type: "narrate", text: "You force the locker door open. Rusted tools, dried rats, greasy rags. Affixed to the inner side with nails is a tunnel schematic; the paper is yellowed, its edges hardened with blood. This map isn't a product of intellect; it's the remnant of someone's panic. Before getting lost in the tunnel, a human nailed their survival chances to the wall, not just directions. A spare battery gleams beneath the rags. This facility sometimes packages its bait like a reward." },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_tunelharita", title: "K-5 Human Grinder Tunnel Schematic",
          meta: "PERISHED TECHNICAL DRAWING 5-H · DEATH ROUTE",
          body: "CORRIDOR ENTRANCE\n   |\n   +- JUNCTION 1 -- LEFT  -> Escape line\n   |               RIGHT -> Dead end (Old decayed filters)\n   |\n   +- JUNCTION 2 -- STRAIGHT -> Narrow neck (Squeeze hazard)\n   |\n   +- JUNCTION 3 -- LEFT  -> EXIT GATE\n                   RIGHT -> Blind pocket (Death trap)\n\nBLOODY HAND NOTE: Enter -> TURN LEFT -> PROCEED STRAIGHT -> TURN LEFT AND RUN. Memorize it.\nTablet light won't suffice inside; if batteries die, this place becomes your grave. — T.D." } },
        { type: "note", id: "not_tunelharita", title: "The Route Engraved in My Mind", text: "The route is clear: LEFT → STRAIGHT → LEFT. Right branches are complete dead ends and death traps. It will be absolute darkness inside, I won't have time to open and look at the map." },
      ],
      choices: [
        { id: "gir", text: "Press the tablet against your chest and crawl into that narrow shaft", next: "n_t1" },
      ],
    },

    n_t1: {
      checkpoint: true,
      cost: 3,
      events: [
        { type: "narrate", text: "You are inside an aluminum, tight, ice-cold coffin. As you push forward on your elbows, the steel scrapes your skin. The tablet light only reveals a few meters; the darkness behind you closes instantly, as if denying the path you just took. The first junction is ahead. The left branch slants down, while a foul draft drifts from the right. The map stated this was a simple choice of direction. Your body knows it is a choice of graves.", if: { flag: "t1Ilk", equals: false } },
        { type: "flag", set: { t1Ilk: true } },
        { type: "alert", text: "You don't have the map with you! Every step you take in the dark is a fatal gamble!", if: { flag: "tHarita", equals: false } },
      ],
      choices: [
        { id: "sol", text: "Crawl LEFT, straight into the heart of the darkness", next: "n_t2" },
        { id: "sag", text: "Crawl RIGHT, toward that strange rasping draft", next: "n_t_korucuk" },
      ],
    },

    n_t_korucuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "The air draft leads you into a blind pocket packed with shattered, rusted filters. This is a complete dead end! The fingerprints of previous victims mar the walls. Terrified, knocking your knees against the tight space, you crawl backward, sobbing and cursing." },
        { type: "anons", text: "「Hahaha! He went right, the idiot went right! You don't have the map, do you? I can't wait to watch you get lost in the dark and chew your own flesh down there!」" },
      ],
      choices: [
        { id: "geri", text: "Crawl backward in sheer panic to that cursed junction", next: "n_t1" },
      ],
    },

    n_t2: {
      checkpoint: true,
      cost: 3,
      events: [
        { type: "narrate", text: "The left branch squeezes you into such a tight bottleneck that your shoulders wedge against the steel on both sides; you can't breathe. Just as you are pinned in that narrow trap, from directly ahead... you hear the sound of something wet, heavy, and unhuman scraping the aluminum steel, crawling toward you. It's closing in!" },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Stop... Stop! What the hell is that... What is that thing doing in the tunnel?! THIS IS MY GAME! Maintenance, get into the vent on your right, HIDE NOW, DAMN IT—」" },
        { type: "waitTap" },
        { type: "narrate", text: "The twisted joy in Deniz's voice vanishes instantly. For the first time, he isn't acting. There is a small service vent to your right. Ece said 'stop,' Deniz screams 'hide.' Both are afraid of different things. At that moment, you understand: even the man managing you on this floor doesn't know the entire system. There is another cage inside the cage." },
        { type: "note", id: "not_denizpanik", title: "System Breached", text: "That 'Groaner' thing living in the tunnels broke inside and Deniz DID NOT know. The gates might be his, but that monster exists completely outside this system. Deniz doesn't see everything; he is afraid too." },
      ],
      choices: [
        { id: "menfez", text: "Squeeze yourself into the service vent, shut off the tablet, and hold your breath!", next: "n_t2_nefes" },
        { id: "kos", text: "Try to flee by crawling backward in sheer terror!", next: "n_olum_tahliye" },
      ],
    },

    n_olum_tahliye: {
      death: true,
      deathText: "You cannot crawl out of this tight coffin to escape! Every panicked move you make rings the sheet metal wildly, broadcasting your position. That wet, massive weight slams onto you from behind; you hear the shattering of your bones. Deniz shuts down the loudspeakers entirely that night, leaving only your screams to echo through the shafts.",
      events: [{ type: "glitch", ms: 900 }],
    },

    n_t2_nefes: {
      events: [
        { type: "narrate", text: "Simply holding your breath all at once and waiting to die won't cut it here. As that thing passes in front of the vent, there are moments its own rasping drowns within the metal structure; only during those brief gaps can you slip a microscopic pocket of air from your lungs. If you vent at the wrong millisecond, even the smallest sob will turn this sheet-metal coffin into your grave." },
        { type: "narrate", text: "You wedge yourself into that small vertical vent, tearing your skin. The steel plate compresses your chest like a vice. You press your tablet against your chest, completely burying that raw light with your body. Right then, that wet, slimy monstrosity begins to rasp past the tunnel just an inch from you. Its stench is vile." },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_t3", fail: "n_olum_tunel" },
    },

    n_olum_tunel: {
      death: true,
      deathText: "Your lungs feel ready to burst, you cannot hold your breath any longer in that tight space, and a muffled sob slips out. That exact moment, the rasping halts. When a mangled, wet hand manifests at the mouth of the vent, the tunnel network fills with the sounds of your flesh tearing from your bones.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_t3: {
      cost: 3,
      events: [
        { type: "narrate", text: "That wet crawling sound slowly dissolves and fades into the depths of the tunnel. You tremble as you emerge from the vent and continue crawling; your arms and legs shake so violently from terror that you can barely control them. The third junction confronts you: Left and right.", if: { flag: "t3Ilk", equals: false } },
        { type: "flag", set: { t3Ilk: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "sol", text: "Crawl LEFT, the exit must be that way", next: "n_t4" },
        { id: "sag", text: "Crawl RIGHT, maybe there is something", next: "n_t_cep", if: { flag: "tCep", equals: false } },
      ],
    },

    n_t_cep: {
      cost: 2,
      events: [
        { type: "flag", set: { tCep: true } },
        { type: "narrate", text: "The right branch ends in a short, pitch-black blind pocket. When you aim your tablet light into the corner, you spot a bloody canvas sack. Inside, gleaming in its vacuum packaging, rests a brand-new tablet battery! Like a blessing granted within the dark... or a bait left behind for the monster living here." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Snatch the battery, turn around immediately, and crawl LEFT", next: "n_t4" },
      ],
    },

    n_t4: {
      cost: 2,
      events: [
        { type: "narrate", text: "The left branch widens, the air finally thinning out a bit. The raw light of your tablet strikes the rusted lever of the steel exit hatch. This is a spring-loaded lever; you must compress it all the way down and shove that massive weight open." },
      ],
      interaction: { kind: "lever", title: "BEFORE IT SLAMS — COMPRESS THE LEVER ALL THE WAY AND SHOVE", holdMs: 2000, success: "n_s2_ok", cancel: "n_t4" },
    },

    n_s2_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { sinav2: true, kart2: true } },
        { type: "system", text: "TUNNEL HELL SURPASSED — CARD FRAGMENT IL SECURED" },
        { type: "narrate", text: "You practically spill out onto the cold concrete of the corridor along with the hatch; your knees shake, your lungs hungrily drawing the real air. The loudspeaker remains silent for a long time. When Deniz finally speaks, there is a narrow, terrified crack in his twisted voice:" },
        { type: "anons", text: "「...So you made it out. Look, whatever you saw inside... just forget about that thing in the tunnel, alright? No need to tell anyone. That's just a small internal family matter of ours. The second fragment is yours, now move along.」" },
      ],
      choices: [
        { id: "hub", text: "Gather yourself and return to the junction with trembling steps", next: "n_hub" },
      ],
    },

    /* ================= TRIAL 3 — OBSERVATION ROOM / HONESTY (CARD FRAGMENT III) ===== */

    n_s3_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You enter an observation room with its window panes shattered. The light is white, cold, the kind that tries to look innocent. A rusted chair stands in the center; built not for a human to sit, but to answer. A single loudspeaker on the ceiling, a bloody camera lens ahead. A stained ledger rests beneath the chair. Not left as if forgotten. Specifically placed. Reading the victims is also part of the ordeal." },
        { type: "document", open: true, doc: {
          id: "d_sinavdefteri", title: "Deniz's Bloody Hunt Ledger", style: "hand",
          meta: "— across the cover, a wild scrawl reads: 'EXPERIMENTS. D.' —",
          body: "CANDIDATE 01 — Welder\nPassed DS-1 by chance. Wept for 41 minutes inside the DS-2 tunnel.\nAltered the same answer three times during DS-3.\nRESULT: Delivered to the Family. Cleanup complete.\n\nCANDIDATE 02 — Infirmary Attendant\nPassed DS-1 and DS-2 utilizing the map.\nDirectly insulted the proctor managing the subject during DS-3.\nEscape attempt terminated at the shaft entry.\nRESULT: Delivered to the Family following vocal cord extraction.\n\nCANDIDATE 03 — Identity Unverified\nRemained entirely silent throughout DS-3. Displayed no reaction even during nail extraction.\nRESULT: Delivered to the Family. Currently tracking the perimeter and only counting.\n\nCANDIDATE 04 —\n(Log field empty. Your assignment number is freshly inked across the top row.)" } },
        { type: "note", id: "not_sinavdefteri", title: "The Death Ledger", text: "I read about three human beings in the ledger. A welder, an infirmary attendant, and someone whose name was erased. Deniz doesn't write that he killed them; he says 'delivered.' As if it's a cargo tracking form. My task number is on the fourth row. If this page fills after me, let it be known: I answered him, I lied, I was terrified, but I refused to be his toy." },
        { type: "anons", text: "「Sit in that chair. Lesson three: HONESTY. I will ask you three questions. You can lie, I'll know while carving your flesh, but it's permitted. The single rule: Answer. If you go silent, we start with your fingernails.」" },
      ],
      choices: [
        { id: "otur", text: "Sit in that cold, rusted iron chair and face the camera", next: "n_soru1" },
      ],
    },

    n_soru1: {
      cost: 1,
      events: [
        { type: "anons", text: "「Question one. You poked your nose into the K-6 infirmary, all my sensors logged it. You found Baturay there, didn't you? How did that piece of filth look? Was he agonizing?」" },
      ],
      choices: [
        { id: "durust", text: "\"He was dead. Resting on the table. His face... at least it was peaceful now.\"", next: "n_soru1_a" },
        { id: "yalan", text: "\"The infirmary was completely empty. I swear I didn't see anyone.\"", next: "n_soru1_b" },
        { id: "sessiz", text: "Stare at the tablet screen and remain silent, gritting your teeth", next: "n_soru1_c" },
      ],
    },

    n_soru1_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5, note: "The ferocity in Deniz's voice eased slightly", noteKind: "system" },
        { type: "anons", text: "「...Peaceful?」 A very long, heavy silence falls; even the static on the speaker trembles as if ashamed. 「Good... Dying without agony is good. He... Never mind. Question two!」" },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [{ id: "d", text: "Swallow with fear and wait", next: "n_soru2" }],
    },

    n_soru1_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10, note: "Deniz engraved your lie into his mind", noteKind: "alert" },
        { type: "anons", text: "「You cracked open the infirmary door at exactly 04:31, and emerged from beside that corpse at 04:39! Did you play blind for eight minutes inside, huh?!」 A dry, sickly laugh ascends the loudspeaker. 「Put some effort into your lies so I don't carve your flesh immediately. Question two!」" },
      ],
      choices: [{ id: "d", text: "Wait as cold sweat runs down your spine", next: "n_soru2" }],
    },

    n_soru1_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「Silence... So you possess that pathetic pride as well. The third victim went silent just like that.」 You hear the sharp click of a pen striking the ledger, signing you into the dead list. 「Things get far more entertaining when you go silent. Question two!」" },
      ],
      choices: [{ id: "d", text: "Wait, holding your breath", next: "n_soru2" }],
    },

    n_soru2: {
      cost: 1,
      events: [
        { type: "anons", text: "「Question two. You meddled with that old sonar line. I can't see inside there, but I watched your miserable face whispering to those filthy walls. You are speaking with Ece! Where is that bitch hiding?! Tell me!」" },
      ],
      choices: [
        { id: "soyle", text: "Expose Ece's hidden compartment to save my own skin", next: "n_soru2_a" },
        { id: "yalan", text: "\"I don't know who she is. The line was one-way, only audio could be heard.\"", next: "n_soru2_b" },
        { id: "reddet", text: "\"I won't answer this question. I won't give that girl to you!\"", next: "n_soru2_c" },
      ],
    },

    n_soru2_a: {
      cost: 1,
      events: [
        { type: "flag", set: { eceEleVerildi: true } },
        { type: "stat", stat: "eceGuven", delta: -40, note: "YOU SACRIFICED ECE — Trust has been completely shattered to splinters", noteKind: "alert" },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「...So the sonar compartment. Finally...」 The savage laugh you expected doesn't come; his voice goes ice cold. 「I already knew, you know? I've been looking there for three weeks. I just wondered when you would sell out your pathetic loyalty. And you did. Noted. Question three.」" },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY -10 — The chill of betrayal gnaws at your mind", noteKind: "alert" },
        { type: "note", id: "not_ihanet", title: "I Sold Her Out For My Own Skin", text: "I revealed Ece's location to this monster... He said 'I already knew,' but that doesn't clear my name. I am a traitor. I hurled that girl to her death just to survive. This stain will never wash out." },
      ],
      choices: [{ id: "d", text: "Wait in shame and terror", next: "n_soru3" }],
    },

    n_soru2_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "anons", text: "「A one-way line, huh?」 This time his laugh is long, pleasurable like a snake's hiss. 「A lie... but a clever one. It has a spine. You remind me of that nurse... Question three.」" },
      ],
      choices: [{ id: "d", text: "Wait", next: "n_soru3" }],
    },

    n_soru2_c: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 10 },
        { type: "stat", stat: "eceGuven", delta: 10, note: "You shielded Ece from that monster", noteKind: "system" },
        { type: "anons", text: "「Saying 'Not to you'...」 The wires in his voice strain, as if the speaker is about to blow. 「Loyalty... That cannibalistic horde, that Family loves that stuff, you know? The Chief loves chewing on loyal meat like yours. Question three!」" },
      ],
      choices: [{ id: "d", text: "Wait, trembling for the final question", next: "n_soru3" }],
    },

    n_soru3: {
      cost: 1,
      events: [
        { type: "anons", text: "「Final question... I asked this to every piece of meat that came through here, they all lied out of fear.」 The static deepens, that sickly game in Deniz's voice completely vanishing for the first time. 「Have you ever thought about joining that savage Family, becoming one of them? Instead of being torn apart alone in this dark, being a part of that madness... Be honest, ask yourself when they will carve your flesh.」" },
      ],
      choices: [
        { id: "hayir", text: "\"No! I will never become one with monsters like you!\"", next: "n_soru3_a" },
        { id: "bilmiyorum", text: "\"...I don't know... This dark and isolation are driving me mad...\"", next: "n_soru3_b" },
        { id: "karsi", text: "\"What about you, Deniz? Did you join them or are you still just a cowardly spectator?\"", next: "n_soru3_c" },
      ],
    },

    n_soru3_a: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: 5 },
        { type: "anons", text: "「'Never'... You all talk big like that at first. The first victim said the exact same thing. Now he sits at that bloody dining table, gnawing on the meat thrown before him with a massive appetite! The ordeal is over, get off the chair!」" },
      ],
      choices: [{ id: "d", text: "Bolt up from the iron chair", next: "n_s3_ok" }],
    },

    n_soru3_b: {
      cost: 1,
      events: [
        { type: "stat", stat: "denizOfke", delta: -5 },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "anons", text: "「...You don't know, then.」 A very long dead silence fills the room. The clicking of the pen stops. 「The first honest, raw answer given to this question out of four candidates... Isolation is hard, yes. Hard enough to force a person to eat their own flesh... The ordeal is over.」" },
      ],
      choices: [{ id: "d", text: "Stand up, your legs can barely carry you", next: "n_s3_ok" }],
    },

    n_soru3_c: {
      cost: 1,
      events: [
        { type: "flag", set: { denizSoruldu: true } },
        { type: "stat", stat: "denizOfke", delta: -10 },
        { type: "anons", text: "「—」" },
        { type: "narrate", text: "The speaker is open, the line is live, but not a peep comes from Deniz. Five seconds... Ten seconds... You can feel that sickly soul behind the camera losing its breath. Finally, he whispers with the voice of an absolute unmasked, completely isolated old man: 「...Next question canceled. The ordeal is over. Get out of here.」" },
        { type: "note", id: "not_denizsoru", title: "I Wounded the Monster", text: "I asked, \"Did you join?\" and that sadistic bastard who watches everything couldn't answer. Whether he's a part of that cannibalistic pack or just the next piece of meat waiting for his turn in the cage, he doesn't know himself. This despair will make him even more dangerous." },
      ],
      choices: [{ id: "d", text: "Leave the chair, aim the tablet light ahead", next: "n_s3_ok" }],
    },

    n_s3_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { sinav3: true, kart3: true } },
        { type: "system", text: "FINAL LESSON OVER — CARD FRAGMENT III SECURED · KEY COMPLETED" },
        { type: "anons", text: "ngL「The last fragment is yours... The card is complete, rat. See you at the exit gate. It's no longer my safe zone, but I'll be at my screen to watch how your bones get shattered.」" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "hub", text: "Pocket the final fragment and run back to that cursed junction", next: "n_hub" },
      ],
    },

    /* ================= EXIT — PIECE KEYPAD LOCK ================= */

    n_cikis: {
      cost: 1,
      events: [
        { type: "narrate", text: "The massive, rusted steel exit door stands before you. A card reader with three violently carved slots sits in its center; you must press those three bloody fragments into these slots. The trembling light of your tablet sweeps across the empty slots." },
        { type: "alert", text: "READER BEEPS WITH MALICE: CARD FRAGMENTS MISSING! This door will not open until all trials are finished!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "There are still missing fragments! You must return to those monsters' rooms and finish the trials before your batteries bleed out!", if: { flag: "kart3", equals: false } },
        { type: "narrate", text: "All three fragments tremble between your fingers. You press them into the reader one by one, tearing your skin — CLICK, CLICK, CLICK. The massive hydraulic locks inside the door release with a deep, agonizing groan!", if: { flag: "kart3", equals: true } },
      ],
      choices: [
        { id: "gec", text: "Shove the heavy steel door with all your might and slip into that dark corridor", next: "n_mezun", if: { flag: "kart3", equals: true } },
        { id: "geri", text: "Return to those incomplete rooms of terror", next: "n_hub", if: { flag: "kart3", equals: false } },
      ],
    },

    /* ================= GRADUATION + HARUN ================= */

    n_mezun: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k5b" },
        { type: "flag", set: { mezun: true } },
        { type: "system", text: "EXIT LOCK OPENED — TRANSIT TO K-4 HELL PERMITTED" },
        { type: "anons", text: "「Congratulations, victim... One graduate out of four pieces of meat. Take this, let it be a reward from me to you.」 The dark vent above you suddenly shudders, and a fresh, packaged tablet battery drops right at your feet! 「A small favor... Don't tell anyone, I wouldn't want to ruin my sadistic image here.」" },
        { type: "battery", spares: 1 },
        { type: "waitTap" },
        { type: "anons", text: "「One final free lesson for you: When you step out of the K-4 gate, that endless corridor stretching before you... it's no longer my playground. It belongs to no one. The true supervisor of death rules there... Say hello to my father for me, rat.」" },
        { type: "objective", text: "Reach the main ventilation shaft." },
      ],
      choices: [
        { id: "cik", text: "Crack open the K-4 transit hatch and step into that unknown", next: "n_harun1" },
      ],
    },

    n_harun1: {
      cost: 1,
      events: [
        { type: "narrate", text: "An endless, bare connecting corridor with blood seeping from its walls. Halfway through, a yellow flashlight turns from the far end; a light that doesn't rush, a light that knows its duty. A torso clad in a butcher's apron, too massive to fit the door frame, emerges behind it. This doesn't feel like a monster's arrival, but like a shift supervisor heading out for inspection. That is the most twisted part: horror has a shift schedule here." },
        { type: "narrate", text: "\"A new victim...\" The voice is so calm, coming from so deep; it sounds like a factory shift supervisor, speaking like a FATHER. \"You are roaming the corridors aimlessly during shift hours. I will have to draft a very severe disciplinary report for you, son...\" The massive flashlight ascends, stabbing directly into your terror-frozen eyes!" },
        { type: "stat", stat: "sefFarkindalik", delta: 15, note: "THE CHIEF SPOTTED YOU — You are on his hunt list now!", noteKind: "alert" },
        { type: "waitTap" },
        { type: "alert", text: "⚠ HE BEGAN MARCHING TOWARD YOU WITH THOSE MASSIVE STEPS — MAKE A DECISION!" },
      ],
      timer: { seconds: 4 },
      choices: [
        { id: "kos", text: "TURN AROUND AND RUN WITH ALL YOUR MIGHT!", next: "n_harun2" },
        { id: "don", text: "Freeze! It worked on that monster in the tunnel, maybe it works on this one too?!", next: "n_olum_harun1", default: true },
      ],
    },

    n_olum_harun1: {
      death: true,
      deathText: "A massive error! That blind monster in the tunnel saw through sound... But the Chief sees you with his eyes, with that giant flashlight! As you stand frozen, his steps don't accelerate at all; because he knows you cannot escape. Clamping his massive hand around your throat and lifting you into the air, he says, \"You didn't run... Good boy. The Family loves well-behaved children who don't make their meat tough.\" The tablet hits the floor along with the sound of your bones shattering.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_harun2: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "YOU SPRINT LIKE CRAZY! Your heart explodes in your ears. That massive man behind you pursues, swinging his flashlight; his strides are heavy but so immense that the distance closes with impossible speed! Two savage choices lie before you: the steel door of the service ladder to the right, or that rusted ventilation vent on the floor!" },
      ],
      choices: [
        { id: "menfez", text: "Lunge toward the vent and force its cover open", next: "n_harun2_chase" },
        { id: "kapi", text: "Try to open the steel door", next: "n_olum_harun2" },
      ],
    },

    n_harun2_chase: {
      events: [],
      interaction: {
        kind: "chase",
        title: "K-5 CORRIDOR",
        enemy: "CHIEF HARUN IS SEARCHING FOR YOU",
        success: "n_menfez",
        fail: "n_olum_harun_kovalama",
        startDanger: 30,
        phaseMs: 1320,
        hints: {
          patrol: "The flashlight sweeps the wall. Gain a few steps.",
          search: "He turned his head. Cower into the locker shadows.",
          near: "Right behind you. If he hears even a breath, it's over.",
        },
      },
    },

    n_olum_harun_kovalama: {
      death: true,
      deathText: "The flashlight pins your back. You keep running but the floor feels pulled out from beneath your feet; every step falls back onto the same grimy tile. Chief Harun doesn't shout when he catches you. He merely leans to your ear and whispers, \"The meat tightens when you run like this, son.\" Then darkness closes with a wet sound originating from within your bones.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_olum_harun2: {
      death: true,
      deathText: "The door is locked! An electronic passcode lock, and you know exactly who holds those passcodes. Right then, Deniz's whisper ascends from the loudspeaker above your head: 「Lesson four, maintenance: You should have never trusted me.」 As that massive flashlight illuminates your back, the Chief's rusted axe buries into your flesh. Your vision goes dark.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez: {
      events: [
        { type: "narrate", text: "You rip the vent cover off, tearing your nails and bleeding your fingers, and hurl yourself into that tight gap. A second later, the yellow beam of that giant flashlight seeps through the slots of the grid onto your face. Stripes of light burn your eyes. The Chief's massive combat boots stop right in front of the vent. He waits... LISTENING to your every breath, your terror-packed heartbeat!" },
      ],
      interaction: { kind: "breath", holdMs: 8000, lungMs: 9500, success: "n_menfez_ok", fail: "n_olum_menfez" },
    },

    n_olum_menfez: {
      death: true,
      deathText: "Right below the grid, your lungs give out and a suffocating rattle slips past your lips. That is all it takes. The Chief bends down instantly, ripping and throwing that massive vent cover away in a single motion like a tin can! Catching you by the leg and dragging you out, he says, \"Hide and seek isn't played during shift hours, son...\" Everything goes black as your head strikes the concrete.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_menfez_ok: {
      cost: 1,
      events: [
        { type: "narrate", text: "Those combat boots slowly turn and march away following an endless minute that shaves years off your life. That threatening shadow of the flashlight withdraws from the walls. From the end of the hall, that deep voice murmurs to itself: \"The report can wait until tomorrow... The Family expects fresh meat at the table...\" You survived." },
        { type: "stat", stat: "akil", delta: -10 },
        { type: "narrate", text: "Through the filth, dust, and dried blood inside the vent, you begin climbing wildly upward — toward that ice-cold air draft blowing from the main shaft." },
      ],
      choices: [
        { id: "baca", text: "Grip the iron rungs of the main shaft and climb", next: "n_baca" },
      ],
    },

    /* ================= END OF EPISODE ================= */

    n_baca: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "The main shaft: a vertical, pitch-black steel throat connecting the K-5 hellhole to K-4. The iron rungs you grip freeze your hands, but from above — from the living quarters of those cannibals — a warm, nauseating, strange scent of boiled meat descends. You climb while weeping." },
        { type: "ambient", text: "Below, Deniz's loudspeakers crackle one final time: 「...Good lesson, rat. Up there is no longer where my camera watches. Up there is HOME... Those at home are hungry...」", if: { flag: "denizSoruldu", equals: false } },
        { type: "ambient", text: "Below, Deniz's loudspeakers crackle one final time: 「...About that question you asked...」 A long static hiss. 「Don't you dare ask anyone that question up there. Especially there... Because up there is HOME, and everyone at home answered that question long ago by surrendering their own flesh... Hawk.」", if: { flag: "denizSoruldu", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "Ece's trembling voice comes from that tiny sonar radio in your pocket: «I'm still alive... While you climb, I'll try to patch the line into K-4's intercoms. Please don't get lost... Please don't die up there...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The radio sinks into a deathly silence throughout the entire climb. You know Ece is out there, in that dark... but she will never speak to a traitor like you again. You are alone.", if: { flag: "eceEleVerildi", equals: true } },
      ],
      choices: [
        { id: "son", text: "Reach your bloody hands out to the exit hatch of K-4", next: "n_k5_son" },
      ],
    },

    n_k5_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "The moment you touch the hatch, that entire massive shaft, all those bloody tunnels you crossed, the steel lungs of K-5 simultaneously begin to whisper as if crazed:" },
        { type: "ambient", text: "«Five... Four... Three...» A woman's voice coming from deep down. Soft and sickly, like the murmurs of someone dying while trapped in nightmares." },
        { type: "waitTap" },
        { type: "narrate", text: "Then the entire floor goes abruptly silent; leaving behind only that warm, wrong scent of a home-cooked meal descending from above. You shove the hatch with all your strength: Confronting you is the dim, ominous light of K-4 and that great madness awaiting you. Whose home you've entered... you'll feel it within your bones shortly." },
        { type: "system", text: "— THE ORDEAL CONCLUDED, THE TRUE HORROR BEGINS —" },
      ],
      choices: [
        { id: "k4", text: "Climb with the hatch into the dim corridor of K-4", next: "n_k4_giris" },
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