/* ============================================================
   BORDER-1 — EPISODE 1 v2: "K-6 / NIGHT SHIFT" (LABYRINTH WEAVE)
   Design rules apply: target is told ROUTE IS NOT TOLD;
   floor is a mini map; dead ends, loops and fatal wrong
   way exist; direction info is IN DOCUMENTS; doors require
   backtracking (pump C's fuse is in DEPOT).

   K-6 MAP:
   DORMITORY ─ CORRIDOR 6-A ┬ INFIRMARY (dead end, rewarded)
                            ├ CANTEEN ═(service door)═ DEPOT   ← LOOP 1
                            └ JUNCTION ┬ stairs → PLATFORM → BILGE → PUMP C
                                       ├ maintenance passage → DEPOT    ← LOOP 2
                                       ├ 6-B CORRIDOR (opens with power) → RADIO
                                       └ OLD ELEVATOR (DEATH — shaft empty)
   ============================================================ */

export const EP01 = {
  start: "n_uyanis",
  nodes: {

    /* ================= DORMITORY ================= */

    n_uyanis: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k6" },
        { type: "system", text: "BORDER-1 MAINTENANCE TABLET v2.3 — REBOOTING…" },
        { type: "system", text: "TIME: 03:47 · DEPTH: 214M · EXTERNAL CONNECTION: NONE (3 H 12 MIN)" },
        { type: "pause", ms: 900 },
        { type: "system", text: "ASSIGNMENT: MAINTENANCE TECHNICIAN · RECORD NEW · MISSION: ROUTINE INSPECTION" },
        { type: "narrate", text: "That email that arrived three days ago was like a blessing. 'BORDER-1 research station, urgent maintenance personnel wanted.' The salary was unbelievable, not a single interview was conducted. When the submarine's hatches closed on me, I knew there was no going back, but I didn't expect to encounter this pitch-black steel tomb. In the massive facility that has been running non-stop for eleven months, there is not a peep." },
        { type: "narrate", text: "What wakes you up is not an ear-piercing alarm. It's the sudden DYING of the generator. That humming in your ears cuts off like a knife, and the absolute, suffocating darkness of the K-6 floor collapses onto your chest like a nightmare. You feel your heart hammering against your rib cage." },
        { type: "narrate", text: "Your breath shortens as you straighten up from the bunk. Even that sickly red glow of the emergency lighting has gone out, everywhere is pitch black. In a panic, you reach out your hand and your fingers find the company maintenance tablet given to you. When you press the power button, the cracked screen suddenly glows; a raw, blue-white, ice-cold light hits your face. Right now, your only support, your only source of light in this pitch-black world is this screen. Left over from the previous technician; an undeleted name glows on the lock screen stained with fingerprints: 'B. Soylu'." },
        { type: "note", id: "not_uyanis", title: "First night", text: "I've been assigned to BORDER-1 as a maintenance technician — the previous personnel 'left the duty'. My first night and the generator has already gone silent, no alarm, connection with the surface has been lost for three hours. No one welcomed me, no one woke me up. The tablet belonged to the previous technician: B. Soylu. Where is he?" },
        { type: "waitTap" },
        { type: "objective", text: "Investigate the K-6 power outage." },
        { type: "ambient", text: "From the corridor outside the dormitory, from very far away, a wet, heavy sound comes, as if a piece of meat is being dragged. It lasts for a few seconds, then leaves its place to a deadly silence." },
      ],
      choices: [
        { id: "ranza", text: "Search other bunks and lockers", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "cik", text: "Go out into the corridor silently", next: "n_koridor" },
      ],
    },

    n_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { ranzaArandi: true } },
        { type: "narrate", text: "You raise the tablet in the air and scatter the raw light around. Eight bunks... All completely empty but strangely flawless. Blankets folded in military order, pillows neat. No one fled in a panic. It's as if everyone got up from their bunks with a single order and walked into the darkness. Orderly and obediently." },
        { type: "narrate", text: "You yank the door of the locker that says Vedat. The lock is rusty, your fingers slip, you pull with all your might like crazy, and the huge steel locker TOPPLES FORWARD with a massive noise and EXPLODES onto the steel floor. The horrible sound produced echoes through the narrow corridors like a whip. Your chest rises and falls rapidly, you stop and listen to the darkness in terror." },
        { type: "stat", stat: "gurultu", delta: 8, note: "NOISE +8 — The sound echoed in the empty corridors for a long time", noteKind: "alert" },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "A spare battery rolls out from inside the overturned locker and hits the light of your tablet. And on the inner door, taped with a blood-red tape, there is a piece of paper worn out from being copied from hand to hand: the sketch of the floor. The notes etched into the corner by Vedat's trembling hand can be read in the flickering screen light." },
        { type: "document", open: true, doc: {
          id: "d_kroki", title: "K-6 Floor Sketch (hand copy)",
          meta: "copy from official drawing · by V.K.'s hand",
          body: "DORMITORY ─ CORRIDOR 6-A ─┬─ INFIRMARY\n                          ├─ CANTEEN ═(service door)═ DEPOT\n                          └─ JUNCTION\n\nJUNCTION ─┬─ stairs → PUMP PLATFORM\n          │      (from platform → BILGE PASSAGE → PANEL C)\n          ├─ maintenance passage → DEPOT\n          ├─ 6-B CORRIDOR → radio room (ELECTRONIC LOCK —\n          │                  won't open if there's no power)\n          └─ OLD ELEVATOR\n\n(V.K. handwriting, crossed out twice:)\nDO NOT USE THE ELEVATOR. NO CABIN. Do not look\nat what is below.\n\n(smaller:)\ndo not make NOISE in the bilge. it hears the water." } },
      ],
      choices: [
        { id: "cik", text: "Go out into the corridor", next: "n_koridor" },
      ],
    },

    /* ================= CORRIDOR 6-A (HUB 1) ================= */

    n_koridor: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You step into the K-6 main corridor. When you hold the screen of your tablet forward, you can only illuminate a few steps ahead of you; everywhere else is a darkness ready to swallow you. The wetness on the floor shines. And there... there is a sickening trace like vomit. Not a footprint. A wide, sticky and continuous dragging mark... The mark of meat rubbing against steel, extending towards the pitch darkness of the junction.", if: { flag: "korIlk", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "korIlk", equals: false } },
        { type: "narrate", text: "The handover report for yesterday's shift hangs on the panel. The edge of the paper is wrinkled with a dried slimy liquid, as if a hand that does not look human gripped it.", if: { flag: "korIlk", equals: false } },
        { type: "document", open: true, if: { flag: "korIlk", equals: false }, doc: {
          id: "d_devir", title: "Shift Handover Report — Night 6",
          meta: "BORDER-1 · K-6 MAINTENANCE · FORM 12-B · SHIFT SUPERVISOR: B. SOYLU",
          body: "HANDED OVER BY: Baturay Soylu (night)\nHANDED OVER TO: — (no signature)\n\nOPEN TASKS:\n· Lower platform evacuation pumps (A/B/C) faulty.\n  Manual initial start required.\n· PUMP C'S FUSE BURNED OUT AND REMOVED.\n  Spare fuses are in B-2 DEPOT.\n· Radio room access panel re-coded.\n  The code is SPLIT IN TWO for security. (see minutes 7)\n· Main line WILL NOT BE STARTED until all three pumps are turned on.\n\nWARNINGS:\n· Old personnel elevator OUT OF SERVICE. No cabin,\n  shaft empty. DO NOT USE the door.\n· Bilge level rising. If evacuation is not done\n  within 24 hours, K-6 will be submerged.\n\nFOOTNOTE (handwriting, different pen):\nDo not go down to the platform alone after 3 AM.\nDon't ask why. Go down and count: are we missing?" } },
        { type: "flag", set: { korIlk: true } },
        { type: "ambient", text: "On the left side, there is an ajar door leaking a sour decomposition and heavy chemical smell. Ahead, defying logic, the yellow, flickering light of the canteen blinks. The end of the corridor is pitch black like a bottomless pit." },
      ],
      choices: [
        { id: "revir", text: "Look at the ajar door where the medicine smell is coming from", next: "n_revir", if: { flag: "revirGezildi", equals: false } },
        { id: "kantin", text: "Look at the canteen whose light is still on", next: "n_kantin", if: { flag: "kantinGezildi", equals: false } },
        { id: "kavsak", text: "Walk towards the dark junction at the end of the corridor", next: "n_kavsak" },
        { id: "yatak", text: "Return to the dormitory", next: "n_uyanis_geri" },
      ],
    },

    n_uyanis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "The dormitory is cold and dead. Empty bunks are lined up like skeletons under the screen light of your tablet. You look inside from the threshold of the door and shudder; this place is no longer a safe haven, it's a cemetery." },
      ],
      choices: [
        { id: "ranza", text: "Search bunks and lockers", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "geri", text: "Return to the corridor", next: "n_koridor" },
      ],
    },

    /* ================= INFIRMARY (dead end — rewarded) ================= */

    n_revir: {
      cost: 2,
      events: [
        { type: "flag", set: { revirGezildi: true } },
        { type: "narrate", text: "You are in the infirmary room. The sharp antiseptic smell burns your nasal passages. The medicine cabinet has been brutally plundered, its glasses smashed to pieces on the floor. As you take a step, you turn the light of your tablet towards the examination table. You cover your mouth to avoid vomiting: there is a corpse there. The bloody name tag on his chest can be read with difficulty: 'B. SOYLU'. The owner of the tablet in your hand. That man whose place you were eager to take. His eyes are wide open, staring blankly at the ceiling, his mouth left open. That terror-filled calmness on his face gnaws at your soul. 'He left the duty,' they said... No, they left him here to die." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "The corpse's right hand is tightly closed, frozen stiff. Suppressing your urge to vomit, you pry open the man's cold, bruised fingers one by one. His skin crackles. A blood-stained, crumpled piece of paper comes out of his palm. Two numbers written in a hurry: \"21\". The rest has been torn away." },
        { type: "note", id: "not_kod21", title: "Code fragment: 21··", text: "Came out of Baturay's palm. The radio room code was split in two — this is the first half: 21. So this was 'minutes 7' in the handover report. Where is the other half?" },
        { type: "flag", set: { kod21: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_revir", title: "Infirmary Record — Week 42",
          meta: "BORDER-1 HEALTH UNIT · CONFIDENTIAL: INTERNAL",
          body: "COLLECTIVE SYMPTOM REPORT (last 14 days):\n\n· Tinnitus ............................. 19 personnel\n· Sleep disorder ....................... 16 personnel\n· Feeling that \"sounds come from walls\" . 11 personnel\n· COUNTING NUMBERS IN SLEEP ............. 9 personnel\n\nNote: All of those who count in their sleep, unaware\nof each other, count the SAME sequence. Records were\ncompared. No explanation found.\n\nRECOMMENDATION: Collective psychological evaluation +\nrequest for evacuation to surface. (DENIED — H. Tekin:\n'Shift order cannot be disrupted. The family knows\nits business.')\n\nLAST RECORD: B. Soylu refused treatment. 'Not sleeping\nis enough,' he said. He was given stimulants." } },
      ],
      choices: [
        { id: "gunluk", text: "Take the notebook from Baturay's breast pocket", next: "n_revir2" },
        { id: "cik", text: "Leave him alone — exit", next: "n_koridor" },
      ],
    },

    n_revir2: {
      cost: 1,
      events: [
        { type: "narrate", text: "You put your hand into the inside pocket of Baturay's soaked jacket. You take out a small notebook covered with fingerprints and dirty liquids. A single word is etched on the cover in a crazed handwriting: DO NOT COUNT. Its pages are stuck together, barely discernible in the faint glow of the tablet light." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "document", open: true, doc: {
          id: "d_gunluk", title: "Baturay's Diary", style: "hand",
          meta: "— night shift notebook —",
          body: "October 3\nMy ears rang all day. I thought it was the sound\of the generator. It wasn't. I had the generator\nturned off, the ringing didn't stop. The sound is not\nin the machine. The sound is in ME.\n\nOctober 9\nThe sound in the machine; it's like the exact same\nsound inside my head. When I blink, I see static.\nSomething greasy, dark is descending behind my eyelids.\nBut the sound is ALSO coming from INSIDE the walls.\nI know that sound.\n\nOctober 14\nVedat is counting numbers in his sleep. Six. Five.\nFour. I woke him up, he doesn't remember. We counted\nnine people in the infirmary tonight. THEY ALL start\nFROM THE SAME PLACE.\n\nOctober 21\nThe chief held a 'family meeting'. No one talks about\nthe meeting anymore but everyone is smiling now. The\nsame smile. I changed the radio room code and it was\nSPLIT IN TWO. Half is always with me. I etched the\nother half near panel C, on the side flooded with water.\nThe two cannot be together. If something happens to me:\ncount first. Then run.\n\n(last page, broken handwriting)\nI am not the only victim here, not at all.\nSome man waited to burn to death rather than stay\nin this place. I am not that brave. I just won't sleep." } },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "As you shake the notebook, a spare battery sliding from between its pages falls into your palm. The last thing Baturay left in this pit of filth. That cursed sentence echoes in your mind: 'Count first. Then run.'" },
      ],
      choices: [
        { id: "cik", text: "Exit the infirmary", next: "n_koridor" },
      ],
    },

    /* ================= CANTEEN (+ service door → DEPOT) ================= */

    n_kantin: {
      cost: 1,
      events: [
        { type: "flag", set: { kantinGezildi: true } },
        { type: "narrate", text: "When you enter the canteen, your stomach revolts. The lamp overhead flickers as if gasping for air, illuminating the room momentarily. A huge table set for twelve people is laid out. Plates, forks, knives are in place... However, the food is covered with a green, black, hairy mold layer, smelling like a carcass. The plate at the very head of the table, though, is sparkling, pristine clean. Waiting for someone like a horrible invitation.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "narrate", text: "Your eyes shift to the shift schedule on the wall. When you bring the screen of your tablet closer to look, your hair stands on end.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "document", open: true, if: { flag: "kantinIlkGoruldu", equals: false }, doc: {
          id: "d_cizelge", title: "Shift Schedule — ?? Week",
          meta: "BORDER-1 PERSONNEL PLANNING · approval: H.T.",
          body: "MONDAY\n  00-08: FAMILY    08-16: FAMILY    16-24: FAMILY\ TUESDAY\n  00-08: FAMILY    08-16: FAMILY    16-24: FAMILY\ WEDNESDAY\n  00-08: FAMILY    08-16: FAMILY    16-24: FAMILY\ THURSDAY\n  00-08: FAMILY    08-16: FAMILY    16-24: FAMILY\ FRIDAY\n  00-08: F A M I L Y 08-16: F A M I L Y 16-24: FAMILY\ SATURDAY\n  00-08: FAMILYFAMILY 08-16: FAMILYFAMILYFAMILY\ SUNDAY\n  all together all together all together all\n\n(bottom corner, pencil, tiny:)\na place is reserved for late personnel" } },
        { type: "flag", set: { kantinIlkGoruldu: true } },
        { type: "ambient", text: "Right next to that clean, empty plate at the head of the table, there is a small name card. When you hold the flickering light over it, you see your own duty number. Beyond the kitchen, in the shadow of rusty pipes, a service door darkens." },
      ],
      choices: [
        { id: "servis", text: "Force the service door behind the kitchen", next: "n_servis" },
        { id: "cik", text: "Return to the corridor", next: "n_koridor" },
      ],
    },

    n_servis: {
      cost: 2,
      events: [
        { type: "narrate", text: "The rusty service door opens only a few inches and gets jammed. You clench your teeth and throw your shoulder, the metal hinge breaks with a painful scream and echoes in the corridor.", if: { flag: "servisAcildi", equals: false } },
        { type: "stat", stat: "gurultu", delta: 5, note: "NOISE +5 — The hinge was heard by the entire floor", noteKind: "alert", if: { flag: "servisAcildi", equals: false } },
        { type: "flag", set: { servisAcildi: true } },
        { type: "narrate", text: "Behind the door is a claustrophobic nightmare. A narrow, filthy passage... Rotten food crates, greasy pipes and huge meat hooks hanging from the ceiling pass right over your head. Empty hooks... You try to convince yourself of this. The screen light of the tablet dissolves at the border of a denser, bottomless darkness ahead." },
      ],
      choices: [
        { id: "depo", text: "Advance into the darkness where the passage opens", next: "n_depo" },
        { id: "geri", text: "Return to the canteen", next: "n_kantin" },
      ],
    },

    /* ================= JUNCTION (HUB 2) ================= */

    n_kavsak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are at the junction; all the deadly paths of K-6 converge here. From the stairs on the right side below comes a dark, dense sound of water — the regular throbbing of waves hitting the steel. From the narrow hole-like maintenance passage opposite, an ice-cold, foul air blows onto your face. On your left stands the OLD ELEVATOR with bent steel doors, on which there is a torn, almost clawed warning tape.", if: { flag: "kavsakIlk", equals: false } },
        { type: "flag", set: { kavsakIlk: true } },
        { type: "narrate", text: "You head towards the electronic door of the 6-B corridor ahead but the panel stands pitch black, dead. Without power, this door is an impassable wall.", if: { flag: "gucAcik", equals: false } },
        { type: "narrate", text: "The electronic lock of the 6-B corridor finally vomits a green light. The power panel is awake, inviting you into that pitch darkness.", if: { flag: "gucAcik", equals: true } },
        { type: "ambient", text: "That horrible wet dragging mark on the floor splits in two right here: One branch goes down the stairs, into the water. And the other... leaks inside from the crushed bottom gap of the elevator door." },
      ],
      choices: [
        { id: "merdiven", text: "Go down the stairs towards the sound of water", next: "n_platform" },
        { id: "gecit", text: "Enter the narrow maintenance passage blowing cold air", next: "n_gecit" },
        { id: "asansor", text: "Force the elevator door — this must be the fastest descent", next: "n_olum_asansor" },
        { id: "kapib", text: "Pass through the 6-B door", next: "n_koridor2", if: { flag: "gucAcik", equals: true } },
        { id: "geri", text: "Return to the main corridor", next: "n_koridor" },
      ],
    },

    n_olum_asansor: {
      death: true,
      deathText: "Despair has blinded your eyes. You open the door in two pulls because no mechanism is left behind to hold the door. There is no cabin. Just a wet, massive throat descending into the pitch darkness, to the bottom of the 214-meter facility. Warnings, reports, sketches... All explode in your mind as you fall rapidly in the darkness. And when your fall ends, it is not a hard floor that greets you, but a soft, squelching and entirely AWAKE mass of flesh waiting below.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    /* ================= MAINTENANCE PASSAGE → DEPOT (loop 2) ================= */

    n_gecit: {
      cost: 2,
      events: [
        { type: "narrate", text: "The maintenance passage is so narrow that your shoulders rub against the steel on both sides, rusty screws scratch your clothes. A leaking valve somewhere is spraying madly in the pitch darkness, drops falling onto the steel with a rhythm that scratches your brain: Tick. Tick. Tick.", if: { flag: "gecitIlk", equals: false } },
        { type: "flag", set: { gecitIlk: true } },
        { type: "ambient", text: "The rhythm of the drops cuts off hollowly for a moment... As if the sound of another weight stepping in interfered. Then the clicking starts again. You grip the tablet tightly with your trembling hands. You didn't count. You won't count." },
      ],
      choices: [
        { id: "depo", text: "Shoulder the door at the end of the passage", next: "n_depo" },
        { id: "geri", text: "Return to the junction", next: "n_kavsak" },
      ],
    },

    /* ================= DEPOT (B-2 — fuse is here) ================= */

    n_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "The massive silhouette of the B-2 depot appears in the feeble light of your tablet. Shelf upon shelf of rusty parts, moldy canned goods, overturned oil drums... The single emergency lamp on the ceiling hangs down like an internally darkened, dead eye. You have two exits: One opens to that foul passage with meat hooks of the canteen, the other to the narrow tunnel of the junction.", if: { flag: "depoIlk", equals: false } },
        { type: "document", open: true, if: { flag: "depoIlk", equals: false }, doc: {
          id: "d_basinc", title: "Pressure Log — K-6 Outer Hull",
          meta: "AUTOMATIC SENSOR OUTPUT + SHIFT HAND RECORD · depot archive",
          body: "NIGHT 1 — 03:00-04:00\n  Outer hull contact: 6 knocks. Source: EXTERNAL. Whale? (V.)\n\nNIGHT 2 — 03:10-03:40\n  Outer hull contact: 5 knocks. Regular interval.\n  Whales don't knock regularly. (B.S.)\n\nNIGHT 3 — 03:20-03:55\n  Contact: 4 knocks. SENSOR NOTE: vibration signature\n  shows INTERNAL source pattern. Technical error? (B.S.)\n\nNIGHT 4 — 03:47\n  Contact: 3 knocks. From inside. Definitive. Three knocks,\n  by the bilge side. No one was below.\n  NO ONE WAS BELOW. (B.S.)\n\nNIGHT 5 —\n  (no record)\n\nNIGHT 6 —\n  (tonight)" } },
        { type: "flag", set: { depoIlk: true } },
        { type: "ambient", text: "You hold the tablet towards the shelves, you see the stencil letters etched on the dusty metal at eye level: \"ELECTRICAL SPARE — FUSE/RELAY\"." },
      ],
      choices: [
        { id: "sigorta", text: "Search for the fuse box", next: "n_depo_sigorta", if: { flag: "sigortaAlindi", equals: false } },
        { id: "pano", text: "Examine the broken circuit panel on the wall", next: "n_devre_pano", if: { flag: "devreOnarildi", equals: false } },
        { id: "servis", text: "Pass to the canteen side through the service passage", next: "n_servis_geri" },
        { id: "gecit", text: "Return to the junction through the maintenance passage", next: "n_kavsak" },
      ],
    },

    /* NEW: circuit panel — tiles puzzle (sliding piece) */
    n_devre_pano: {
      cost: 1,
      events: [
        { type: "narrate", text: "On the mold-smelling wall at the back of the depot, there stands a circuit panel whose protective glass has been smashed to smithereens. The nine modules inside have been brutally ripped from their slots, crushed and stuffed back into their places randomly... As if someone went mad trying to turn off the lights. The label on the panel is stained: \"K-6 SPARE LIGHTING LINE\". If you can put these modules in the right order, you can stimulate the gasping lamps of the depot." },
        { type: "note", id: "not_devre", title: "Circuit panel", text: "The spare lighting panel in the depot is mixed up — nine modules are in the wrong slots. If I arrange them in the correct order, K-6's spare lights will work. Light means an advantage in the darkness." },
      ],
      interaction: {
        kind: "tiles",
        title: "CIRCUIT PANEL — SORT THE MODULES",
        scramble: [4, 2, 8, 6, 0, 7, 1, 5, 3],
        success: "n_devre_onarildi",
        cancel: "n_depo",
      },
    },

    n_devre_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "SPARE LIGHTING LINE: ACTIVE" },
        { type: "narrate", text: "The moment you fit the last module into place, the panel hums loudly and the dusty tubes on the ceiling of the depot — flickering — suddenly wake up. A sickly, dirty yellow light fills the room. The darkness retreats to the dark corners; at least being able to see something other than your tablet's light in this room relieves your chest." },
        { type: "flag", set: { devreOnarildi: true, yolAydinlik: true } },
        { type: "stat", stat: "akil", delta: 5, note: "SANITY +5 — Light is a small victory", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to the depot", next: "n_depo" },
      ],
    },

    n_depo_sigorta: {
      cost: 1,
      events: [
        { type: "flag", set: { sigortaAlindi: true } },
        { type: "narrate", text: "You open the box, inside there is only a single heavy, glass-bodied spare fuse full of wires left. It fills your palm, ice cold. Someone broke the others or SAKLAMIŞ [hid] them somewhere intentionally." },
        { type: "note", id: "not_sigorta", title: "Spare fuse (Pump C)", text: "I took it from B-2 depot. The handover report said 'C's fuse burned out and was removed' — so I will plug this into pump C's panel. The panel must be on the side flooded with water: Baturay wrote 'on the side flooded with water, near panel C'." },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "At the dark bottom of the box, a spare tablet battery also shines. For now, luck is on your side... But you know, this facility always throws a little bait just before it takes something away from you." },
      ],
      choices: [
        { id: "servis", text: "Pass to the canteen side through the service passage", next: "n_servis_geri" },
        { id: "gecit", text: "Return to the junction through the maintenance passage", next: "n_kavsak" },
      ],
    },

    n_servis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "Crawling through the narrow service tunnel, you exit back to the canteen. That smell... As you pass by the moldy table, you pretend to be blind to avoid looking at those plates. However, the chair of that clean, empty plate at the head of the table... stands pulled back an inch from what you remember. As if someone sat there. Don't look. You'll go mad. Walk." },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "koridor", text: "Go out into the corridor", next: "n_koridor" },
      ],
    },

    /* ================= PUMP PLATFORM (HUB 3) ================= */

    n_platform: {
      checkpoint: true,
      cost: 1,
      noiseGate: [{ min: 50, once: "pusu1", node: "n_enc1" }],
      events: [
        { type: "narrate", text: "Down the iron stairs, you descend into the pitch-black, ice-cold water rising up to your ankles. Pump platform... On your right stands the rusty, massive valve A; on your left stands the door of room B opening into darkness. Opposite, a raw red emergency light illuminates the main panel. And at the far end of the platform, that narrow, claustrophobic bilge tunnel that continues by submerging INTO the water extends.", if: { flag: "platIlk", equals: false } },
        { type: "objective", text: "Start the pump platform." },
        { type: "flag", set: { platIlk: true } },
        { type: "status", items: [
          { label: "PUMP A", flag: "pompaA" },
          { label: "PUMP B", flag: "pompaB" },
          { label: "PUMP C", flag: "pompaC" },
        ] },
        { type: "ambient", text: "The black water throbs slowly at your ankles like a pulse, freezing your skin. Pump C is not around here; the pipelines sink and disappear into that dark abyss inside the water." },
      ],
      choices: [
        { id: "pa", text: "Go to line A where the giant valve is", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "Go to the door of room B which stands ajar", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "sintine", text: "Enter the narrow passage inside the water", next: "n_sintine" },
        { id: "panel", text: "Go to the main control panel", next: "n_anapanel", if: { flag: "gucAcik", equals: false } },
        { id: "bekle", text: "Wait motionless and listen for things to settle down", next: "n_bekle", ifStat: { stat: "gurultu", gte: 25 } },
        { id: "geri", text: "Return to the junction from the stairs", next: "n_kavsak" },
      ],
    },

    n_bekle: {
      cost: 2,
      events: [
        { type: "narrate", text: "You crouch in the shadow of a rusty pipe, lean your back against the steel and NEVER MOVE. You close your eyes and count your breaths. One... Two... The water calms down, the metal groans subside. You think the facility has forgotten you... Or it is pretending like a predator watching its prey." },
        { type: "stat", stat: "gurultu", delta: -25, note: "Things settled down — NOISE decreased", noteKind: "system" },
        { type: "ambient", text: "From very deep, a regular metallic thudding sound comes: Tick... tick... tick... The outer hull is being knocked on from the inside. You can't be sure, you are about to lose your mind." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_pompaA: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are in the pump A room. The giant valve stands as if completely locked by a thick layer of rust. The place where the pressure log should hang on the wall panel is completely empty, only hastily etched with white chalk onto the sheet metal: \"log removed to depot — B.S.\"" },
      ],
      interaction: { kind: "valve", title: "PUMP A — TURN THE VALVE", turns: 9, success: "n_pompaA2", cancel: "n_platform", doneFlag: "pompaA", doneNext: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaA: true } },
        { type: "system", text: "PUMP A: ACTIVE ▮ — EVACUATION LINE 1 OPEN" },
        { type: "narrate", text: "The valve turns with a final effort, screaming. Water begins to be sucked in like that foul sound coming from the throat of someone choking. Your arms are covered in rust and dirt, the monstrous growl of the pump in your ears... The first one is done." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_pompaB: {
      cost: 1,
      events: [
        { type: "narrate", text: "Pump B room is the pitch darkness itself. The feeble screen light of the tablet in your hand is not enough to illuminate more than three steps ahead of you, the light drowns inside the darkness. The switch panel is opposite... On the rotten shelf on the right, among the piles of cables, an orange-colored spare battery shines." },
        { type: "ambient", text: "In the darkest corner of the room, at the border where the tablet light ends, a huge dark shape similar to an old diving suit hangs motionless... Or that thing hanging is not a suit, but a HUMAN body. You never dare to hold the light towards that corner again." },
      ],
      choices: [
        { id: "raf", text: "Reach for the shelf — take the battery (the shelf does not look sturdy)", next: "n_pompaB_raf", if: { flag: "rafAlindi", equals: false } },
        { id: "salter", text: "Go straight to the switch", next: "n_pompaB_int" },
        { id: "geri", text: "Exit the room", next: "n_platform" },
      ],
    },

    n_pompaB_raf: {
      cost: 1,
      events: [
        { type: "flag", set: { rafAlindi: true } },
        { type: "narrate", text: "The moment your fingers touch the battery, the rotten metal shelf carrying the fatigue of years completely collapses; all the heavy iron pieces on it scatter onto the steel floor with a huge explosion. You close your eyes tightly in the dark room and wait for the sound to end. Your heart is beating in your mouth." },
        { type: "stat", stat: "gurultu", delta: 6, note: "NOISE +6 — The shelf overturned", noteKind: "alert" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "salter", text: "Go to the switch", next: "n_pompaB_int" },
        { id: "geri", text: "Exit the room", next: "n_platform" },
      ],
    },

    n_pompaB_int: {
      cost: 1,
      events: [
        { type: "narrate", text: "The switch lever is rusty and giant, its springs are tight... If you leave it halfway, it will spring back hard enough to break your fingers. You clench your teeth and hang on with all your weight. You break out in cold sweats in the dark." },
      ],
      interaction: { kind: "lever", title: "PUMP B — LIFT THE SWITCH", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform", doneFlag: "pompaB", doneNext: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaB: true } },
        { type: "system", text: "PUMP B: ACTIVE ▮ — EVACUATION LINE 2 OPEN" },
        { type: "narrate", text: "The metal lever snaps into place and the whole room shakes with a tremendous vibration. That thing hanging in that corner — that foul suit or whatever it is — begins to SWING slowly with this shaking. You bolt out of the room without even looking back." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    /* ================= BILGE PASSAGE → PUMP C ================= */

    n_sintine: {
      cost: 2,
      events: [
        { type: "narrate", text: "You enter the bilge tunnel. The black water has now risen up to your waist, freezing cold searing your flesh. With your every step, the water sloshes madly, the sounds you make echo in the tunnel, literally REPORTING you to everything here. The ceiling gets lower and lower, sagging rusty pipes rub against your hair, squeezing you into a narrow coffin.", if: { flag: "sintineIlk", equals: false } },
        { type: "stat", stat: "gurultu", delta: 4, note: "NOISE +4 — One cannot walk silently in water", noteKind: "alert", if: { flag: "sintineIlk", equals: false } },
        { type: "flag", set: { sintineIlk: true } },
        { type: "ambient", text: "Ahead of you, at the bottom of the tunnel, the dead screen of a fuse panel can barely be distinguished. And right at that moment you realize: on the surface of the water, there are reverse waves and ripples coming from the opposite side, from inside the darkness, that your steps did not create... Something is swimming towards you." },
      ],
      choices: [
        { id: "pano", text: "Advance to the panel at the bottom", next: "n_pompaC" },
        { id: "geri", text: "Go back, return to the platform", next: "n_platform" },
      ],
    },

    n_pompaC: {
      cost: 1,
      events: [
        { type: "narrate", text: "You reach the front of the pump C panel. Its slot is COMPLETELY EMPTY. The fuse is not in place, that empty hole stares at you like a pitch-black eye socket surrounded by burn marks. On the steel sheet right next to the panel, two numbers are brutally etched with a sharp object: \"47\". And below it, in a shaky handwriting: \"the other is with me\" is written.", if: { flag: "kod47", equals: false } },
        { type: "note", id: "not_kod47", title: "Code fragment: ··47", text: "Etched on the wall of panel C: 47. 'The other is with me' it says — this is Baturay's handwriting. So the code is: [first half][47]. I need to combine the two pieces.", if: { flag: "kod47", equals: false } },
        { type: "flag", set: { kod47: true } },
        { type: "narrate", text: "Pump C is already running. The panel is still wet and dangerous, but the fuse is locked into its slot; touching it again will only get you killed.", if: { flag: "pompaC", equals: true } },
        { type: "narrate", text: "This hungry eye socket wants a spare fuse but you have nothing in your hand. You try to remember the note in the handover report... Where were the spares?", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "alert", text: "PUMP C: NO FUSE — SPARE REQUIRED", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "narrate", text: "That heavy, glass-bodied large fuse you took from the depot gets soaked between your fingers. The line is shaking like crazy; the moment the needle comes to the green zone, you need to slam the fuse into the slot. If you miss, thousands of volts of electric current in this water-filled death pit will turn you into charcoal.", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
      ],
      choices: [
        { id: "tak", text: "Insert the fuse into the slot", next: "n_pompaC_int", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
        { id: "geri", text: "Return from the water — to the platform", next: "n_platform" },
      ],
    },

    n_pompaC_int: {
      events: [
        { type: "narrate", text: "You hold your breath completely, watching the needle as you listen to that thumping sound of your heart in your ears. The black water rises around your knees, your chest. The darkness waits with you too." },
      ],
      interaction: { kind: "fuse", title: "PUMP C — ALIGN THE FUSE", hits: 2, success: "n_pompaC2", cancel: "n_pompaC", doneFlag: "pompaC", doneNext: "n_platform" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaC: true } },
        { type: "system", text: "PUMP C: ACTIVE ▮ — EVACUATION LINE 3 OPEN" },
        { type: "narrate", text: "The fuse snaps into the slot with a loud 'click' and the third line also starts operating with a massive roar. The water rapidly begins to draw back, forming a huge vortex; as you flee back from the tunnel, the level drops to your knees. Now your only chance is the main panel. That big red button." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    /* ================= AMBUSH 1 + MAIN PANEL ================= */

    n_enc1: {
      events: [
        { type: "glitch", ms: 500 },
        { type: "alert", text: "⚠ MOVEMENT IN WATER LINE — CLOSE" },
        { type: "narrate", text: "From beneath the predatory howl of the pumps, ANOTHER sound emerges that will rip your soul out... A wet, massive weight walking towards you with heavy and certain steps, splitting the water, taking its time. You don't have a single second to turn off your tablet's light and hide. If you think, you'll die!" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "don", text: "Get out of the water and FREEZE", next: "n_enc1_ok" },
        { id: "kos", text: "Run to the stairs", next: "n_olum_su", default: true },
      ],
    },

    n_enc1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You wrench yourself out of the water, throw yourself onto the iron pier of the platform and FREEZE right there like a stone. You close your eyes. That wet, massive weight stops exactly three steps in front of you. Water is dripping patteringly... Streams flowing from its massive body, tall enough to touch the ceiling, hit the steel. After a minute that feels like eternity, that creature turns around and dissolves into the darkness." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY −10 — You heard it. It was very close.", noteKind: "alert" },
        { type: "ambient", text: "From the abyss where the creature went, a low, deep metallic GROAN echoes. Like a machine in pain... Or like a demon mimicking a human to deceive its victim." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_olum_su: {
      death: true,
      deathText: "Fool! One cannot run in water! Every crazy step you took, every splash you made echoed off the walls of this floor, revealing your location. With three steps left to the stairs, that wet, massive weight mounts your back from behind. You hear the sound of your bones breaking and the pitch-black, foul water of K-6 closes over you like a secret.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are in front of the main control panel. The raw red emergency light hits your face. On the glass of its cracked, dusty CRT screen, there is nothing but your own pale reflection, about to go mad with fear. Right below the screen, behind the plastic protection cover coated with a thick layer of filth, it stands: the big, blood-red button." },
      ],
      interaction: {
        kind: "panel",
        title: "MAIN CONTROL PANEL — WATER LINE",
        rows: [
          { label: "PUMP A", flag: "pompaA" },
          { label: "PUMP B", flag: "pompaB" },
          { label: "PUMP C", flag: "pompaC" },
        ],
        require: ["pompaA", "pompaB", "pompaC"],
        success: "n_guc",
        cancel: "n_platform",
      },
    },

    n_guc: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "flag", set: { gucAcik: true } },
        { type: "system", text: "MAIN LINE STARTED — POWER DISTRIBUTION: K-6 100%" },
        { type: "narrate", text: "You hit the big red button with all your might. The massive station shakes like an earthquake; platforms, stairs, corridors wake up one by one with huge yellow lights! That deafening monstrous growl of the old generators returns and for a moment... you feel like everything is solved." },
        { type: "pause", ms: 1200 },
        { type: "ambient", text: "However, immediately after, from high above, from the steel floors of the levels, a terrifying, painful GROAN rises. Long, patient and as if... with the gratitude of a predator finding its prey." },
        { type: "stat", stat: "gurultu", delta: 15, note: "NOISE +15 — Light and machine sound. Now everyone knows.", noteKind: "alert" },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Attention attention. Light spotted in the engine room. The family has been informed.」" },
        { type: "anons", text: "「...Welcome, late personnel. I am Deniz. Your orientation has begun.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "waitTap" },
        { type: "note", id: "not_anons", title: "The voice in the announcement", text: "A man spoke from the speaker. Young. Cheerful. He said 'The family has been informed'. Deniz — from the engineers. His voice... was normal. This is the scariest part: his voice was completely normal." },
        { type: "objective", text: "Reach the radio room." },
        { type: "system", text: "K-6 ELECTRONIC LOCKS: ACTIVE — 6-B CORRIDOR DOOR OPENED" },
      ],
      choices: [
        { id: "yukari", text: "Up the stairs, go up to the junction", next: "n_kavsak" },
      ],
    },

    /* ================= 6-B CORRIDOR → RADIO ================= */

    n_koridor2: {
      cost: 1,
      noiseGate: [{ min: 65, once: "pusu2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "The 6-B corridor is now completely bright... You wish it had stayed dark. On the INSIDE of the thick glasses of the observation rooms you pass by, there is a fresh mist. As if someone just blew their breath onto the glasses from inside... And right on the third glass ahead, right in the middle of that mist, stands a huge, recently wiped handprint. The finger joints are too long, thin and distorted to be human." },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kor2Ilk", equals: false } },
        { type: "flag", set: { kor2Ilk: true } },
        { type: "narrate", text: "Right at the end of the corridor, the heavy steel door of the radio room appears. The code panel with a green screen on it waits for you, emitting a digital light." },
      ],
      choices: [
        { id: "kapi", text: "Go to the access panel", next: "n_kapipanel" },
        { id: "geri", text: "Return to the junction", next: "n_kavsak" },
      ],
    },

    n_enc2: {
      events: [
        { type: "glitch", ms: 600 },
        { type: "alert", text: "⚠ CORRIDOR LIGHTS ARE EXPLODING IN SEQUENCE — TOWARDS YOU" },
        { type: "narrate", text: "The lamp at the farthest end of the corridor explodes with a huge noise. Immediately after, the next one... Then the other! The darkness runs MADLY TOWARDS YOU in the corridor like a hungry monster, and there is a dark shape coming towards you from inside that darkness!" },
      ],
      interaction: {
        kind: "chase",
        title: "6-B OBSERVATION CORRIDOR",
        enemy: "STAFF IN THE DARK",
        success: "n_enc2_ok",
        fail: "n_olum_koridor",
        startDanger: 36,
        phaseMs: 1240,
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
        phaseLabels: {
          patrol: "FAR",
          search: "SEARCHING",
          near: "CLOSE",
        },
        hints: {
          patrol: "The lights are bursting in sequence. Steal a few steps toward the door.",
          search: "Breathing leaks from behind the glass. Press yourself to the wall.",
          near: "The smell touches your face. Hold your breath or it will know you.",
        },
      },
    },

    n_enc2_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You press your back against the steel wall like crazy and close your eyes tightly. The wave of darkness passes right over you; an ice-cold, foul-smelling wet wind hitting your face... A sharp smell of the sea bottom and rotten meat. Something STOPS exactly an inch in front of your face. You stop breathing, your heart is about to stop. You don't even count, you just pray not to die." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY −10 — You don't need to remember its face. Its smell is enough.", noteKind: "alert" },
        { type: "narrate", text: "It slowly moves away. The lamps of the corridor flicker and turn back on as if nothing happened. You turn your head and look at the glass; that handprint on the misty glass is now TWO." },
      ],
      choices: [
        { id: "kapi", text: "Go to the access panel — immediately", next: "n_kapipanel" },
      ],
    },

    n_olum_koridor: {
      death: true,
      deathText: "You succumbed to your fear and started running! But you cannot run away from that darkness; it knows every hole of this corridor. You feel its ice-cold, wet fingers gripping your neck. When the lights turn back on, the corridor is empty... Only those bloody mist marks on the glasses are now made from the inside, not the outside.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapipanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "The panel at the door asks for a four-digit password. A cold text blinks on the digital screen: 'RE-CODED — B.S.'" },
        { type: "system", text: "HINT: The code is split into two pieces. Combine the notes in your archive.", if: { flag: "kod21", equals: true } },
        { type: "alert", text: "You DO NOT have the first half of the code. Baturay wrote 'half is always with me'... Where is he now?", if: { flag: "kod21", equals: false } },
      ],
      interaction: { kind: "keypad", code: "2147", success: "n_radyo", cancel: "n_koridor2" },
    },

    n_radyo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "CODE ACCEPTED — RADIO ROOM LOCK OPENED" },
        { type: "narrate", text: "The heavy door opens with a hiss. The radio room... A wall full of smashed, dead devices with wires hanging out, and right in the middle stands the emergency radio console. A strange clicking coming from one of the drawers breaks the silence." },
        { type: "document", open: true, doc: {
          id: "d_talep", title: "Sample Transfer Request — DENIED",
          meta: "BORDER-1 INTERNAL CORRESPONDENCE · FORM 4-A · ARCHIVE COPY",
          body: "REQUESTED BY: Dr. Nevin Aras (K-3 Biology)\nREQUEST: Taking an additional tissue sample from\n'FIND-1' in the K-2 archaeology storehouse and\nits transfer to the K-3 laboratory.\n\nREASON: ████████████████████████████████\n█████████ counting behavior ████████████\n██████████ my daughter's records ██████████\n████████████ answers back ████████\n\nDECISION: DENIED.\n'No one will touch the find. It belongs to the family.\nIs that understood, Nevin? THE FAMILY.'\n— H. Tekin, Station Chief" } },
        { type: "narrate", text: "You collapse onto the radio desk but the device is dead. You frantically dismantle its back cover: The five-lamp fuse circuit has been completely messed up, one is lit, four stand like blind eyes. Without fixing this circuit, you cannot send a single scream to the world." },
      ],
      choices: [
        { id: "cekmece", text: "Open the drawer", next: "n_radyo_cek", if: { flag: "cekmeceAcik", equals: false } },
        { id: "devre", text: "Arrange the power circuit", next: "n_lights" },
        { id: "geri", text: "Return to the corridor", next: "n_koridor2" },
      ],
    },

    n_radyo_cek: {
      cost: 1,
      events: [
        { type: "flag", set: { cekmeceAcik: true } },
        { type: "narrate", text: "You pull the clicking drawer. Inside, there are dozens of dead batteries lined up like empty gun shells... But at the very back, a sparkling FULL tablet battery whose packaging has never been opened stands. A battery that someone hid with a life-and-death effort to be able to return here." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devre", text: "Arrange the power circuit", next: "n_lights" },
        { id: "geri", text: "Return to the corridor", next: "n_koridor2" },
      ],
    },

    n_lights: {
      events: [
        { type: "narrate", text: "Five lamps, five rusty switches... When you flip one, the ones next to it also go wild and change direction. If Baturay were here, he would solve this immediately, but Baturay is now nothing more than a piece of meat in the infirmary." },
      ],
      interaction: { kind: "lights", success: "n_radyo2", cancel: "n_radyo" },
    },

    n_radyo2: {
      cost: 1,
      events: [
        { type: "system", text: "RADIO POWER CIRCUIT: ACTIVE — BAND SCANNING READY" },
        { type: "narrate", text: "The console warms up with a big static crackle and a dense static noise fills the room. Somewhere among the frequencies... there must be a living human. Coast guard, surface, anyone..." },
        { type: "objective", text: "Scan the emergency band." },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_ece", cancel: "n_radyo" },
    },

    n_ece: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "ambient", text: "«Surface? ...The surface hasn't answered for three weeks.» Out of the static, a woman's voice suddenly rises. Exhausted, helpless but a REAL human voice. You cannot believe your ears." },
        { type: "ambient", text: "«Are you... coming from K-6? Are you normal? You're not counting numbers, are you? — Don't answer. If you were counting, I would have understood anyway.»" },
        { type: "ambient", text: "«Listen to me. My name is Ece, sonar operator, it's... it's still me. Why did you turn on the lights?! THE CHIEF sees the lights. Turn off the lights and don't ever go to the table in the canteen—»" },
        { type: "glitch", ms: 800 },
        { type: "alert", text: "— LINE CUT OFF — CARRIER SIGNAL LOSS —" },
        { type: "pause", ms: 900 },
        { type: "anons", text: "「Don't interfere, Ece. The orientation of the new personnel is my job.」" },
        { type: "anons", text: "「...Did you hear that, maintenance? We learned your name too. See you upstairs.」" },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: 10, note: "SANITY +10 — There is still a HUMAN in this facility. You are not alone.", noteKind: "system" },
        { type: "flag", set: { eceIlkTemas: true, frekanslariDuydun: true } },
        { type: "note", id: "not_ece", title: "Ece — sonar operator", text: "A woman at 432.0: Ece. Not transformed, hiding, alone for three weeks. She said 'The chief sees the lights' and was going to say something about the table in the canteen when the line was cut. Deniz cut it. They know each other. I must find Ece — but first I must get out of tonight." },
        { type: "pause", ms: 1000 },
        { type: "narrate", text: "And right at that moment you hear it: those wet, heavy, dragging steps coming from the corridor... A huge shadow grows in the yellow light hitting the frosted glass of the door. The handle of the door — slowly — begins to turn downward!" },
        { type: "objective", text: "Hide in the locker." },
      ],
      choices: [
        { id: "dolap", text: "Get into the equipment locker — hold your breath", next: "n_saklan" },
      ],
    },

    n_saklan: {
      events: [
        { type: "narrate", text: "You throw yourself into the steel equipment locker in a life-and-death panic and pull the door shut. It's pitch black inside. The outside can be seen through the small grate of the locker door. The door opens with a big creak. That wet, massive weight enters the room... That horrible creature inside the torn diving suit GROANS madly right under your nose." },
      ],
      interaction: { kind: "breath", holdMs: 8500, lungMs: 10000, success: "n_saklan_ok", fail: "n_olum_nefes" },
    },

    n_olum_nefes: {
      death: true,
      deathText: "Your lungs are about to explode! Your heart beats so hard with fear that the sheet metal of the locker trembles, and unable to hold your breath any longer, you let it out with a sob. The door of the locker is brutally ripped off and thrown away in a single move. The last thing you hear is your own scream... And the last thing you see is a pair of bloodshot, maddened but familiar HUMAN eyes looking at you from behind that torn diving mask.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_saklan_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The heavy steps slowly leave the room, the door slams with a huge noise. You count for one more minute inside the locker... Baturay's golden phrase is etched in your mind: Count first, then run. Trembling, you step out of the locker." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "When you look at the radio desk, you are horrified: The device has been brutally smashed, the speaker split in two like a rib cage. That thing... UNDERSTOOD that you were trying to talk to the world and punished that machine where you made your voice heard. There is no way to reach Ece from here again." },
        { type: "alert", text: "RADIO: PERMANENT DAMAGE — BROADCAST FROM K-6 IS NO LONGER POSSIBLE" },
        { type: "waitTap" },
        { type: "objective", text: "Reach the K-5 airlock." },
        { type: "ambient", text: "That spine-chilling metallic groaning sound from the corridor is still coming from very close. It hasn't left... It's WAITING right behind the door." },
      ],
      choices: [
        { id: "kacis", text: "Approach the door and listen to the corridor", next: "n_kacis" },
      ],
    },

    /* ================= ESCAPE ================= */

    n_kacis: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You look out from the crack of the door: That creature is standing right in the middle of the corridor, its back turned to you, shaking madly around itself, trembling as if COUNTING in its sleep. The K-5 airlock is at the very other end of the corridor. You have two paths and both have to pass right next to it." },
        { type: "narrate", text: "The floor's main switch stands on the left wall. If you pull it down, the K-6 floor will be completely blind; that monster will slow down in the dark but you will also be condemned to that cracked, faint screen light of your tablet. Or while the lights are on, you will risk the noise and RUN like crazy." },
        { type: "alert", text: "DECIDE — THIS FACILITY DOES NOT LIKE THOSE WHO THINK LONG" },
      ],
      timer: { seconds: 8 },
      choices: [
        { id: "karanlik", text: "Pull the switch down — DARK PATH (silent, consumes battery)", next: "n_yolA" },
        { id: "isikli", text: "Lights are on — RUN (fast, noisy)", next: "n_yolB", default: true },
      ],
    },

    n_yolA: {
      cost: 4,
      events: [
        { type: "system", text: "K-6 POWER LINE: MANUAL INTERRUPTION — ENTIRE FLOOR DARK" },
        { type: "narrate", text: "You pull the switch down and the whole floor plunges into a pitch-black, deaf silence in a single second. Now your only light in the universe is that cracked tablet screen in your hand... And the light of that screen gets a little weaker with every step, its battery depleting. The creature's groaning cuts off suddenly, it pauses as if confused... Good." },
        { type: "ambient", text: "You advance crawling in the blind darkness, counting the wall with your hand. A ventilation... A fire cabinet... A wall niche... Did a clicking sound of something just come from inside that niche?" },
      ],
      choices: [
        { id: "nis", text: "Check the wall niche (waste of time — but maybe...)", next: "n_yolA_nis", if: { flag: "nisYoklandi", equals: false } },
        { id: "devam", text: "Advance without stopping", next: "n_yolA2" },
      ],
    },

    n_yolA_nis: {
      cost: 2,
      events: [
        { type: "flag", set: { nisYoklandi: true } },
        { type: "narrate", text: "You put your fingers into that dark niche with fear... Spider webs, rusty screws and... yes! You find an emergency kit. Smashed, plundered but at the very bottom lies a brand new, wrapped tablet battery! Given to you like a blessing in the darkness." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devam", text: "Advance", next: "n_yolA2" },
      ],
    },

    n_yolA2: {
      cost: 4,
      events: [
        { type: "narrate", text: "Those last ten meters you advance in the dark take years off your life. You lost the direction of that monster's groaning sound... Is it behind you? In front of you? Or right above you? When your hand finally touches that ice-cold steel wheel of the airlock, you hold yourself back with difficulty from sobbing and crying." },
      ],
      choices: [
        { id: "kapak", text: "Turn the airlock wheel", next: "n_kapak" },
      ],
    },

    n_yolB: {
      cost: 1,
      noiseGate: [{ min: 70, once: "pusu3", node: "n_enc3" }],
      events: [
        { type: "flag", set: { yolAydinlik: true } },
        { type: "stat", stat: "gurultu", delta: 20, note: "NOISE +20 — Boots running on steel floor", noteKind: "alert" },
        { type: "narrate", text: "YOU ARE RUNNING LIKE CRAZY! Your heavy boots are practically playing drums on the steel floor, you don't care about anything anymore! That groaning monster suddenly turns towards you —the dead glass of its torn diving mask catches the corridor light and shines— and IT MOVES! That clumsy body lunges towards you with an impossible, terrifying speed for a wet mass of flesh!" },
      ],
      choices: [
        { id: "kapak", text: "Dash to the airlock", next: "n_kapak" },
      ],
    },

    n_enc3: {
      events: [
        { type: "alert", text: "⚠ THE PIPELINE AHEAD IS COLLAPSING" },
        { type: "narrate", text: "The huge high-pressure pipe on the ceiling descends right in front of you with a big explosion, like a guillotine! Hot steam and steel fragments cover everywhere!" },
      ],
      timer: { seconds: 3 },
      choices: [
        { id: "kay", text: "SLIDE under it", next: "n_enc3_ok" },
        { id: "dur", text: "Stop and pull back", next: "n_olum_boru", default: true },
      ],
    },

    n_enc3_ok: {
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You throw yourself to the ground and slide under that hot steam on your knees; the steel brushing your back tears your clothes, burns your flesh but you are on your feet and the airlock is RIGHT OPPOSITE YOU!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "kapak", text: "Dash to the airlock", next: "n_kapak" },
      ],
    },

    n_olum_boru: {
      death: true,
      deathText: "That half second you paused out of fear... was more than enough for it to close the distance. Those huge, ice-cold hands reaching out from behind the steam curtain grip your neck. No one hears your screams at this depth... And those who did hear were already listening to your death throes in the pitch darkness.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are in front of the K-5 airlock; a massive rusty steel wheel as heavy as a coffin lid. Your every turn is a life-and-death battle against eleven months of solidified rust... And right behind you, at the end of the corridor, that horrible groaning starts again; this time running, approaching fast!" },
      ],
      interaction: { kind: "valve", title: "K-5 AIRLOCK — TURN THE WHEEL", turns: 6, success: "n_kapak2", cancel: "n_kapak" },
    },

    n_kapak2: {
      cost: 1,
      events: [
        { type: "system", text: "AIRLOCK: OPEN — K-5 TRANSITION READY" },
        { type: "narrate", text: "With one last crazy move you turn the wheel and the hatch finally opens. Just as you pass to the other side from the threshold... You succumb to the urge to look back. Half a second... At the very end of the bright corridor: That diving suit, a tilted head completely broken to the side, and that pitch-black, bottomless madness behind the mask glass is watching you.", if: { flag: "yolAydinlik", equals: true } },
        { type: "narrate", text: "With one last crazy move you turn the wheel and the hatch finally opens. Just as you pass to the other side from the threshold... In the pitch darkness, at the place hit by the faint light of your tablet giving its last breath: The glass of a diving mask REFLECTS your terror-stricken face BACK to you for half a second.", if: { flag: "yolAydinlik", equals: false } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "kapat", text: "Step inside and turn the hatch BEHIND YOU", next: "n_son" },
      ],
    },

    n_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "The hatch snaps shut with a huge noise, the bolts lock. You lean your back against that thick steel and collapse to the floor; your lungs finally empty out now, with a crazy sob." },
        { type: "narrate", text: "And right at that moment, on the exact other face of that thick hatch, right at the level of your ear, you feel something heavy LEANING against it. It doesn't knock. It doesn't force. It just... stands there like that. Then, that sound coming through the steel, almost gently: Knock. A single knock... As if to say 'I'm here and I know you'.", if: { flag: "isaret", equals: true } },
        { type: "narrate", text: "The other face of the hatch is completely silent. Neither a groan nor a thudding sound... For the first time during this cursed night, nothing in this facility knows exactly where you are. A small, miserable victory... But entirely yours.", if: { flag: "isaret", equals: false } },
        { type: "pause", ms: 1200 },
        { type: "glitch", ms: 400 },
        { type: "ambient", text: "And right in your pocket, that cracked tablet that stands turned off suddenly sputters to life on its own. A digital, broken child's voice rises from its speaker. It counts slowly: «...six... five...» Then suddenly goes silent. The bottomless darkness of the K-5 floor waits for you at the bottom of the stairs." },
        { type: "ambient", text: "Underneath that static, you hear a second layer of sound much deeper down: A wet, wheezing breath and the murmurs of a broken lullaby... You thought you were listening to the surroundings all night long. Whereas all this time, you were the one BEING LISTENED TO from inside the darkness.", if: { flag: "frekanslariDuydun", equals: true } },
        
      ],
      choices: [
        { id: "k5", text: "Climb the stairs — K-5: Life Support", next: "n_k5_giris" },
      ],
    },
  },
};

export const EP01_FLAGS = {
  devreOnarildi: false,
  ranzaArandi: false, korIlk: false, revirGezildi: false,
  kantinGezildi: false, kantinIlkGoruldu: false,
  kavsakIlk: false, gecitIlk: false, depoIlk: false, sintineIlk: false,
  servisAcildi: false, platIlk: false, kor2Ilk: false,
  rafAlindi: false, cekmeceAcik: false, nisYoklandi: false,
  pompaA: false, pompaB: false, pompaC: false, gucAcik: false,
  kod21: false, kod47: false, sigortaAlindi: false,
  pusu1: false, pusu2: false, pusu3: false, isaret: false,
  eceIlkTemas: false, yolAydinlik: false,
  frekansCocuk: false, frekansNefes: false, frekanslariDuydun: false,
};
