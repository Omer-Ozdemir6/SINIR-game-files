/* ============================================================
   PERISHED — EPISODE 1 v2: "K-6 / THE NIGHT SHIFT" (LABYRINTH WEAVE)
   Design rules apply: state the objective, NEVER tell the path;
   the floor layout acts as a mini-map; contains dead-ends, loops, and fatal wrong turns;
   directional guidance is hidden within DOCUMENTS; doors demand backtracking
   (Pump C's fuse is located in the STORAGE).

   K-6 MAP LAYOUT:
   BUNKROOM ─ CORRIDOR 6-A ┬ INFIRMARY (dead-end, rewarded)
                           ├ CAFETERIA ═(service door)═ STORAGE   ← LOOP 1
                           └ CROSSROAD ┬ stairs → PLATFORM → BILGE → PUMP C
                                       ├ maintenance passage → STORAGE    ← LOOP 2
                                       ├ 6-B CORRIDOR (powered unlock) → RADIO
                                       └ OLD ELEVATOR (DEATH — shaft empty)
   ============================================================ */

export const EP01 = {
  start: "n_uyanis",
  nodes: {

    /* ================= BUNKROOM ================= */

    n_uyanis: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k6" },
        { type: "sting", name: "stingK6" },
        { type: "system", text: "PERISHED MAINTENANCE TABLET v2.3 — REBOOTING…" },
        { type: "system", text: "TIME: 03:47 · DEPTH: 214M · EXTERNAL LINK: NONE (3 HR 12 MIN)" },
        { type: "pause", ms: 900 },
        { type: "system", text: "ASSIGNMENT: MAINTENANCE TECHNICIAN · STATUS: NEW REGISTRY · MISSION: ROUTINE INSPECTION" },
        { type: "narrate", text: "The email that arrived three days ago felt like a blessing at first glance. 'PERISHED research station, urgent maintenance personnel required.' The pay was absurd, no interviews, no questions. Now, you realize it wasn't a job listing; it was just a new name written over an emptied slot. When the submarine's hatches sealed, the only thing left on the surface was your resume. What awaits you down here isn't a shift; it's a properly filed disappearance." },
        { type: "narrate", text: "On the recruitment form, there was a single-line checkbox labeled 'confined space tolerance.' The exact moment you checked that box, this place legally swallowed you whole. Your identity, your signature, your emergency contact number... all stayed on the surface. Down here, you are nothing but a task number, and a task number cannot scream." },
        { type: "narrate", text: "What wakes you up isn't a ear-piercing alarm. It is the generator suddenly DYING. That hum ringing in your ears cuts off like a knife, and the absolute, suffocating darkness of the K-6 floor settles onto your chest like a nightmare. You can feel your heart hammering against your ribs." },
        { type: "narrate", text: "As you sit up from the bunk, your breath shortens. Even the sickly red glow of the emergency lighting has faded out; everything is pitch black. Panicking, you reach out, and your fingers find the corporate maintenance tablet assigned to you. When you press the power button, the tablet's screen suddenly flickers alive, slamming a raw, icy, blue-white light right into your face. Right now, this screen is your only anchor, your only light source in this pitch-black world. It belongs to the previous technician; a single uncleared name gleams across the fingerprint-smudged lock screen: 'B. Soylu'." },
        { type: "note", id: "not_uyanis", title: "The First Night", text: "They didn't call me here for a job; they called me to fill a vacant corpse slot. They claimed the previous technician 'resigned.' The tablet is his. His fingerprints are still on the glass. If Baturay really left, why does the entire station pass his belongings down to me like an inherited shroud? I am not paranoid. This place is lying from the very first minute." },
        { type: "waitTap" },
        { type: "objective", text: "Investigate the K-6 power outage." },
        { type: "ambient", text: "From the corridor outside the bunkroom, coming from far away, a wet, heavy sound echoes, as if a piece of raw meat is being dragged. It lasts for a few seconds, then yields to a dead silence." },
        { type: "system", text: "INTRA-FACILITY WARNING: In the event of personnel loss, operational continuity is mandatory. Personnel assigned to replace missing crew are responsible for the previous operator's equipment." },
      ],
      choices: [
        { id: "ranza", text: "Search the other bunks and lockers", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "cik", text: "Quietly step into the corridor", next: "n_koridor" },
      ],
    },

    n_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { ranzaArandi: true } },
        { type: "narrate", text: "You hold the tablet up, casting its raw light around the room. Eight bunks. Eight voids. The blankets are folded in military precision, the pillows are neat; there are no signs of panic here. This is worse. When people are afraid, they scatter, drop, and break things. The crew here left as if they woke up to a single command, made their beds, and marched straight into the dark. Obedience looks far more terrifying than bloodstains in this room." },
        { type: "narrate", text: "You yank the door of a locker labeled 'Vedat.' The lock is rusted, your fingers slip, and you pull with all your strength like a madman until the massive steel locker TOPPLES FORWARD, CRASHING onto the steel floor with a deafening boom. The horrific sound echoes through the narrow hallways like a whip crack. Your chest heaves heavily; you stop and listen to the darkness in sheer terror." },
        { type: "stat", stat: "gurultu", delta: 8, note: "NOISE +8 — The sound echoed through the empty corridors for a long time", noteKind: "alert" },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "A spare battery rolls out from the fallen locker, bumping right into your tablet's light. Taped to the inner door with blood-red tape is a piece of paper, worn out from being copied hand-to-hand: a crude blueprint of the floor. Notes scratched by Vedat's trembling hand become legible under the faint screen glow." },
        { type: "document", open: true, doc: {
          id: "d_kroki", title: "K-6 Floor Blueprint (Hand-Drawn Copy)",
          meta: "copied from official schematics · by V.K.'s hand",
          body: "BUNKROOM ─ CORRIDOR 6-A ─┬─ INFIRMARY\n                         ├─ CAFETERIA ═(service door)═ STORAGE\n                         └─ CROSSROAD\n\nCROSSROAD ─┬─ stairs → PUMP PLATFORM\n           │      (from platform → BILGE PASSAGE → CONTROL PANEL C)\n           ├─ maintenance passage → STORAGE\n           ├─ 6-B CORRIDOR → radio room (ELECTRONIC LOCK —\n           │                  won't open without power)\n           └─ OLD ELEVATOR\n\n(V.K.'s handwriting, crossed out twice:)\nDO NOT USE THE ELEVATOR. NO CABIN. Do not look\nat what is down there.\n\n(smaller font:)\ndo not make NOISE in the bilge. it hears the water." } },
      ],
      choices: [
        { id: "cik", text: "Exit to the corridor", next: "n_koridor" },
      ],
    },

    /* ================= CORRIDOR 6-A (HUB 1) ================= */

    n_koridor: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You step out into the K-6 main corridor. The tablet only reveals a few paces ahead; everything else is non-existent. At first, you mistake the moisture on the floor for water, because the brain instinctively chooses the harmless option. Then the light catches a trail: wide, sticky, continuous. A body isn't walked this way. A body is dragged like this. Or something is dragging whatever parts no longer count as a body along with it.", if: { flag: "korIlk", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "korIlk", equals: false } },
        { type: "narrate", text: "The handover report from yesterday's shift is posted on the bulletin board. Title, date, task list; this is a place that doesn't break form protocols even while people are dying. The edge of the paper is shriveled by a dried, slimy fluid. Someone read this, understood it, and still went down anyway. Maybe those were the orders. Maybe down here, orders are stronger than survival instincts.", if: { flag: "korIlk", equals: false } },
        { type: "document", open: true, if: { flag: "korIlk", equals: false }, doc: {
          id: "d_devir", title: "Shift Handover Report — Night 6",
          meta: "PERISHED · K-6 MAINTENANCE · FORM 12-B · SHIFT SUPERVISOR: B. SOYLU",
          body: "HANDED OVER BY: Baturay Soylu (Night)\nTAKEN OVER BY: — (no signature)\n\nOPEN TASKS:\n· Lower platform drainage pumps (A/B/C) malfunctioning.\n  Manual priming required.\n· PUMP C'S FUSE HAS BURNED OUT AND BEEN REMOVED.\n  Spare fuses are in STORAGE B-2.\n· Radio room access panel has been re-coded.\n  The code was SPLIT IN TWO for security. (see protocol 7)\n  The main line WILL NOT LOG IN until all three pumps are online.\n\nWARNINGS:\n· The old personnel elevator is OUT OF SERVICE. No cabin,\n  shaft is empty. DO NOT USE the door.\n· The bilge water level is rising. If drainage isn't\n  executed within 24 hours, K-6 will be submerged.\n\nFOOTNOTE (handwritten, different pen):\nDo not descend to the platform alone after 3 AM.\nDon't ask why. Just go down and count: are we missing anyone?" } },
        { type: "flag", set: { korIlk: true } },
        { type: "ambient", text: "To your left, a jarred door leaks an odor of sour decay and heavy chemicals. Further ahead, defying all logic, the yellow, flickering light of the cafeteria blinks. The far end of the corridor is pitch black, like a bottomless well." },
      ],
      choices: [
        { id: "revir", text: "Inspect the slightly open door leaking medicinal stench", next: "n_revir", if: { flag: "revirGezildi", equals: false } },
        { id: "kantin", text: "Check the cafeteria where the light still blinks", next: "n_kantin", if: { flag: "kantinGezildi", equals: false } },
        { id: "kavsak", text: "Walk into the dark crossroad at the end of the hall", next: "n_kavsak" },
        { id: "yatak", text: "Return to the bunkroom", next: "n_uyanis_geri" },
      ],
    },

    n_uyanis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "The bunkroom is cold and dead. Empty bunks are lined up like skeletons under your tablet's screen light. Looking inside from the threshold makes you shudder; this place is no longer a safe haven, it's a graveyard." },
      ],
      choices: [
        { id: "ranza", text: "Search the bunks and lockers", next: "n_ranza", if: { flag: "ranzaArandi", equals: false } },
        { id: "geri", text: "Return to the corridor", next: "n_koridor" },
      ],
    },

    /* ================= INFIRMARY (dead-end — rewarded) ================= */

    n_revir: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "flag", set: { revirGezildi: true } },
        { type: "narrate", text: "You are inside the infirmary. The sharp stench of antiseptic burns your nostrils. The medicine cabinet has been savagely looted, its glass shattered across the floor. As you take a step, you aim your tablet's light toward the examination table. You cover your mouth to keep from vomiting: there is a corpse lying there. The bloody name tag on his chest is barely legible: 'B. SOYLU'. The owner of the tablet in your hand. The man whose place you were so eager to take. His eyes are wide open, staring blankly at the ceiling, his mouth agape. They said he 'resigned'... No, they left him here to die." },
        { type: "narrate", text: "On the medical terminal still running beside his desk, a single-line log is frozen on the screen: 'Shift continuity secured.' Not a death report. Not an emergency evacuation log. Before the human body could even cool down, the first thing the system did was type a new name into the vacant position. Your name." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "The corpse's right hand is tightly clenched, frozen stiff by rigor mortis. Suppressing your urge to vomit, you pry open his cold, bruised fingers one by one. His skin cracks. A crumpled, blood-stained scrap of paper slides out from his palm. Two numbers written in a frantic rush: \"58\". The rest has been torn away." },
        { type: "note", id: "not_kod21", title: "Code Fragment: 58··", text: "Even while dying, Baturay hid something. Two numbers in his palm: 58. I used to think a person's last reflex would be to pray, murmur their mother's name, or beg for help. Baturay hid a passcode. That means calling for help down here is only possible by breaking a dead man's fingers." },
        { type: "flag", set: { kod21: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_revir", title: "Infirmary Log — Week 42",
          meta: "PERISHED MEDICAL UNIT · CONFIDENTIAL: INTERNAL USE ONLY",
          body: "NEURO-AUDITORY SCAN RESULTS — SUMMARY\nPERIOD: Week 42 / Past 14 days\n\nPersonnel tested: 23\nAbnormal tinnitus reports: 19\nSleep fragmentation & sudden startle: 16\nClaims of hearing voices from within walls: 11\nSimultaneous counting during sleep: 9\n\nCOMMON FINDING:\nVoice recordings of the nine personnel counting in their sleep were compared.\nThe sequence initiation, pauses, and breath intervals are identical. The recordings\nwere captured from shifts entirely unaware of one another.\n\nCLINICAL NOTE:\nB. Soylu refused treatment. He stated, 'Just staying awake is enough.' He was\nprescribed a low-dose stimulant. Heart rate returned to normal; upon discharge,\nthe patient stared at his own shadow and apologized three times.\n\nRECOMMENDATION: Total evacuation and surface psychiatric referral.\nDECISION: REJECTED — H. Tekin / 'Shift order cannot be disrupted.'" } },
      ],
      choices: [
        { id: "gunluk", text: "Take the notebook from Baturay's chest pocket", next: "n_revir2" },
        { id: "cik", text: "Leave him in peace — exit", next: "n_koridor" },
      ],
    },

    n_revir2: {
      cost: 1,
      events: [
        { type: "narrate", text: "You slide your hand into the inner pocket of Baturay's soaked jacket. You pull out a small notebook covered in fingerprints and a grimy fluid. Scratched onto the cover in a crazed handwriting is a single word: COUNT. Its pages are stuck together, barely decipherable under the pale glare of the tablet light." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "document", open: true, doc: {
          id: "d_gunluk", title: "Baturay's Journal", style: "hand",
          meta: "— night shift logbook —",
          body: "October 3\nMy ears rang all day long. I thought it was the hum\nof the generator. It wasn't. I had the generator shut\ndown, the ringing didn't stop. The sound isn't in the machine.\nThe sound is IN ME.\n\nOctober 9\nThe sound from the machine; it feels exactly like the voice inside\nmy head. When I blink, I see static. Something oily and dark\nis descending behind my eyelids. But the sound is also coming\nfrom INSIDE the walls. I recognize that voice.\n\nOctober 14\nVedat is counting in his sleep. Six. Five. Four.\nI woke him up, he doesn't remember. We counted nine people\nin the infirmary tonight. THEY ALL START FROM THE SAME PLACE.\n\nOctober 21\nThe Chief called a 'family meeting.' Nobody talks about the\nmeeting anymore, but everyone is smiling now. The same\nsmile. I changed the code to the radio room and SPLIT IT\nIN TWO. Half of it is always with me. I scratched the other\nhalf on the flooded side, near control panel C.\nThey cannot be kept together. If anything happens to me:\ncount first. Then run.\n\n(final page, fractured handwriting)\nWhoever finds this: do not clear my name. Do not think of me\nas a hero. I was terrified, I stayed silent, and I kept working my shift.\nBut I did not go mad. This tablet is full of proof. PERISHED doesn't\njust kill people; it makes them useful before they die. If you make it\nto the surface, show everyone. Do not tell anyone it was an 'accident.'\nThis was a decision." } },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "As you shake the notebook, a spare battery slips from the pages and falls into your palm. The last thing Baturay left behind in this cesspool. That cursed sentence echoes in your mind: 'Count first. Then run.'" },
      ],
      choices: [
        { id: "cik", text: "Exit the infirmary", next: "n_koridor" },
      ],
    },

    /* ================= CAFETERIA (+ service door → STORAGE) ================= */

    n_kantin: {
      cost: 1,
      events: [
        { type: "flag", set: { kantinGezildi: true } },
        { type: "narrate", text: "The moment you enter the cafeteria, your stomach revolts. The table is set for twelve people; silverware is aligned, plates are perfectly in place. This setup is meant to resemble a family dinner, but here, order isn't hospitality, it's a trap. Amidst the moldy food, only the plate at the head of the table is pristine. It isn't empty; it's reserved. Like a chair waiting for someone running late. Your instinct tells you it was prepared for you, and you are terrified of being right.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "narrate", text: "Your eyes drift to the shift schedule on the wall. When you bring your tablet screen closer to read it, your skin crawls.", if: { flag: "kantinIlkGoruldu", equals: false } },
        { type: "document", open: true, if: { flag: "kantinIlkGoruldu", equals: false }, doc: {
          id: "d_cizelge", title: "Shift Schedule — Week ??",
          meta: "PERISHED PERSONNEL PLANNING · approved by: H.T.",
          body: "MONDAY\n  00-08: FAMILY      08-16: FAMILY      16-24: FAMILY\nTUESDAY\n  00-08: FAMILY      08-16: FAMILY      16-24: FAMILY\nWEDNESDAY\n  00-08: FAMILY      08-16: FAMILY      16-24: FAMILY\nTHURSDAY\n  00-08: FAMILY      08-16: FAMILY      16-24: FAMILY\nFRIDAY\n  00-08: F A M I L Y  08-16: F A M I L Y  16-24: FAMILY\nSATURDAY\n  00-08: FAMILYFAMILY 08-16: FAMILYFAMILYFAMILY\nSUNDAY\n  all together all together all together all\n\n(bottom corner, pencil, microscopic:)\na space has been reserved for the late personnel" } },
        { type: "flag", set: { kantinIlkGoruldu: true } },
        { type: "ambient", text: "Right next to that clean, empty plate at the head of the table sits a small name card. When you shine your trembling light on it, you see your own assignment number. Beyond the kitchen, in the shadows of rusted pipes, a service door looms darkly." },
      ],
      choices: [
        { id: "servis", text: "Force open the service door behind the kitchen", next: "n_servis" },
        { id: "cik", text: "Return to the corridor", next: "n_koridor" },
      ],
    },

    n_servis: {
      cost: 2,
      events: [
        { type: "narrate", text: "The rusted service door only opens a few inches before jamming. You grit your teeth and throw your shoulder against it; the metal hinge breaks with a painful screech that echoes down the corridor.", if: { flag: "servisAcildi", equals: false } },
        { type: "stat", stat: "gurultu", delta: 5, note: "NOISE +5 — The screech was heard across the entire floor", noteKind: "alert", if: { flag: "servisAcildi", equals: false } },
        { type: "flag", set: { servisAcildi: true } },
        { type: "narrate", text: "Beyond the door lies a claustrophobic nightmare. A narrow, filthy passage... Rotten ration crates, greasy pipes, and massive meat hooks hanging from the ceiling pass just inches above your head. Empty hooks... You desperately try to convince yourself of that. The screen light of the tablet dissolves at the edge of a denser, bottomless darkness ahead." },
      ],
      choices: [
        { id: "depo", text: "Advance into the darkness where the passage opens", next: "n_depo" },
        { id: "geri", text: "Return to the cafeteria", next: "n_kantin" },
      ],
    },

    /* ================= CROSSROAD (HUB 2) ================= */

    n_kavsak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are at the crossroad; all deadly paths of K-6 converge here. From the stairs on the right, the sound of dark, heavy water ascends—the rhythmic slapping of waves against the steel structure. From the narrow, hole-like maintenance passage straight ahead, an icy, foul draft blows into your face. To your left stands the OLD ELEVATOR, its steel doors warped, bearing a torn, almost clawed warning tape.", if: { flag: "kavsakIlk", equals: false } },
        { type: "flag", set: { kavsakIlk: true } },
        { type: "narrate", text: "You turn toward the electronic door of the 6-B corridor, but the interface panel is dead and dark. Without power, this door is an impassable wall.", if: { flag: "gucAcik", equals: false } },
        { type: "narrate", text: "The electronic lock of the 6-B corridor finally vomits a green light. The power panel is awake, inviting you into that pitch darkness.", if: { flag: "gucAcik", equals: true } },
        { type: "ambient", text: "That terrifying wet drag mark on the floor splits right here: One branch descends down the stairs, into the water. The other... seeps inside through the crushed bottom gap of the elevator door." },
      ],
      choices: [
        { id: "merdiven", text: "Descend the stairs toward the sound of water", next: "n_platform" },
        { id: "gecit", text: "Enter the narrow maintenance passage blowing cold air", next: "n_gecit" },
        { id: "asansor", text: "Force open the elevator door — this must be the fastest way down", next: "n_olum_asansor" },
        { id: "kapib", text: "Pass through the 6-B door", next: "n_koridor2", if: { flag: "gucAcik", equals: true } },
        { id: "geri", text: "Return to the main corridor", next: "n_koridor" },
      ],
    },

    n_olum_asansor: {
      death: true,
      deathText: "Desperation has blinded your judgment. You pry the door open in two yanks because there is no mechanism left behind to hold it shut. There is no cabin. Only a wet, massive throat plunging into the pitch-black abyss of the 214-meter facility. Warnings, reports, blueprints... they all detonate in your mind as you freefall through the dark. And when your fall ends, it isn't a hard floor that greets you, but a soft, squelching, and completely AWAKE mass of flesh waiting below.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    /* ================= MAINTENANCE PASSAGE → STORAGE (LOOP 2) ================= */

    n_gecit: {
      cost: 2,
      events: [
        { type: "narrate", text: "The maintenance passage is so tight that your shoulders scrape against the steel on both sides, rusted bolts clawing at your clothes. Somewhere, a leaking valve discharges into the pitch black, drops falling onto the steel with a rhythm that scratches at your brain: Tap. Tap. Tap.", if: { flag: "gecitIlk", equals: false } },
        { type: "flag", set: { gecitIlk: true } },
        { type: "ambient", text: "The rhythm of the drops cuts out for a split second... as if muffled by the weight of another treading mass. Then the tapping resumes. You grip the tablet tightly with trembling hands. You didn't count. You won't count." },
      ],
      choices: [
        { id: "depo", text: "Shoulder open the door at the end of the passage", next: "n_depo" },
        { id: "geri", text: "Return to the crossroad", next: "n_kavsak" },
      ],
    },

    /* ================= STORAGE (B-2 — fuse is here) ================= */

    n_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "The massive silhouette of Storage B-2 emerges in the feeble light of your tablet. Row after row of rusted parts, moldy canned goods, overturned oil drums... The single emergency lamp on the ceiling hangs down like a blackened, dead eye. You have two exits: one opens to the cafeteria's foul, hook-lined passage, the other to the narrow crossroad tunnel.", if: { flag: "depoIlk", equals: false } },
        { type: "document", open: true, if: { flag: "depoIlk", equals: false }, doc: {
          id: "d_basinc", title: "Pressure Log — K-6 Outer Hull",
          meta: "AUTOMATED SENSOR OUTPUT + MANUAL SHIFT ENTRY · storage archive",
          body: "NIGHT 1 — 03:00-04:00\n  Outer hull contact: 6 impacts. Source: EXTERNAL. Whale? (V.)\n\nNIGHT 2 — 03:10-03:40\n  Outer hull contact: 5 impacts. Regular interval.\n  Whales don't strike rhythmically. (B.S.)\n\nNIGHT 3 — 03:20-03:55\n  Contact: 4 impacts. SENSOR NOTE: vibration signature\n  indicates an INTERNAL source pattern. Technical error? (B.S.)\n\nNIGHT 4 — 03:47\n  Contact: 3 impacts. From inside. Confirmed. Three impacts\n  originating from the bilge side. No one was down there.\n  NO ONE WAS THERE. (B.S.)\n\nNIGHT 5 —\n  (no entries)\n\nHIGHT 6 —\n  (tonight)" } },
        { type: "flag", set: { depoIlk: true } },
        { type: "ambient", text: "You shine the tablet toward the shelving units, spotting stenciled letters etched onto the dusty metal at eye level: \"ELECTRICAL SPARES — FUSE/RELAY\"." },
      ],
      choices: [
        { id: "sigorta", text: "Search for the fuse box", next: "n_depo_sigorta", if: { flag: "sigortaAlindi", equals: false } },
        { id: "pano", text: "Examine the broken circuit panel on the wall", next: "n_devre_pano", if: { flag: "devreOnarildi", equals: false } },
        { id: "servis", text: "Take the service passage back toward the cafeteria", next: "n_servis_geri" },
        { id: "gecit", text: "Return to the crossroad via the maintenance passage", next: "n_kavsak" },
      ],
    },

    /* CIRCUIT PANEL INTERACTION — TILES PUZZLE */
    n_devre_pano: {
      cost: 1,
      events: [
        { type: "narrate", text: "On the mold-scented wall at the back of the storage stands a circuit panel with its protective glass smashed to pieces. The nine modules inside have been violently ripped from their slots, crushed, and crammed back in at random... as if someone lost their mind trying to kill the lights. The label on the panel is smudged: \"K-6 SPARE LIGHTING LINE\". If you can align these modules into the correct sequence, you might awaken the storage's dying lamps." },
        { type: "note", id: "not_devre", title: "Circuit Panel", text: "The backup lighting panel in the storage is scrambled — nine modules are in the wrong slots. If I arrange them correctly, K-6's backup lights will function. Light means an advantage in the dark." },
      ],
      interaction: {
        kind: "tiles",
        title: "CIRCUIT PANEL — ALIGN THE MODULES",
        scramble: [4, 2, 8, 6, 0, 7, 1, 5, 3],
        success: "n_devre_onarildi",
        cancel: "n_depo",
      },
    },

    n_devre_onarildi: {
      cost: 1,
      events: [
        { type: "system", text: "BACKUP LIGHTING LINE: ACTIVE" },
        { type: "narrate", text: "The moment you snap the final module into place, the panel hums loudly, and the dusty tubes on the storage ceiling suddenly blink awake. A sickly, dirty yellow light floods the room. It drives the darkness back into the far corners; being able to see something in this room without relying solely on your tablet's light eases the weight on your chest." },
        { type: "flag", set: { devreOnarildi: true, yolAydinlik: true } },
        { type: "stat", stat: "akil", delta: 5, note: "SANITY +5 — Light brought a small victory", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to storage", next: "n_depo" },
      ],
    },

    n_depo_sigorta: {
      cost: 1,
      events: [
        { type: "flag", set: { sigortaAlindi: true } },
        { type: "narrate", text: "You open the box; only a single, heavy, glass-bodied replacement fuse remains inside, its core packed with wires. It fills your palm, ice cold. Someone smashed the others or intentionally HID them somewhere." },
        { type: "note", id: "not_sigorta", title: "Spare Fuse (Pump C)", text: "Retrieved it from Storage B-2. The handover report noted 'C's fuse burned out and was removed' — so I will install this into Pump C's panel. The panel must be on the flooded side: Baturay wrote 'on the flooded side, near panel C'." },
        { type: "battery", spares: 1 },
        { type: "narrate", text: "A spare tablet battery gleams at the dark bottom of the box. For now, luck is on your side... But you know how this facility works: it always throws you a small bait just before tearing something away from you." },
      ],
      choices: [
        { id: "servis", text: "Take the service passage back toward the cafeteria", next: "n_servis_geri" },
        { id: "gecit", text: "Return to the crossroad via the maintenance passage", next: "n_kavsak" },
      ],
    },

    n_servis_geri: {
      cost: 1,
      events: [
        { type: "narrate", text: "Crawling through the narrow service tunnel, you emerge back into the cafeteria. That smell... As you pass by the moldy dining table, you pretend to be blind to keep your eyes off those plates. However, the chair of that clean, empty plate at the head of the table... it stands pulled back an inch further than you remember. As if someone just sat there. Don't look. You will lose your mind. Just walk." },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "koridor", text: "Exit to the corridor", next: "n_koridor" },
      ],
    },

    /* ================= PUMP PLATFORM (HUB 3) ================= */

    n_platform: {
      checkpoint: true,
      cost: 1,
      noiseGate: [{ min: 50, once: "pusu1", node: "n_enc1" }],
      events: [
        { type: "narrate", text: "You descend the iron ladder into pitch-black, ice-cold water that rises up to your ankles. The pump platform... To your right stands the massive, rusted valve A; to your left, the door to room B opens into darkness. Straight ahead, a raw red emergency light illuminates the main control panel. And at the far end of the platform, the narrow, claustrophobic bilge tunnel stretches out, sinking straight INTO the water.", if: { flag: "platIlk", equals: false } },
        { type: "objective", text: "Boot up the pump platform." },
        { type: "flag", set: { platIlk: true } },
        { type: "ambient", text: "The black water throbs heavily around your ankles like a pulse, freezing your skin. Pump C isn't anywhere in sight; the pipelines sink and disappear into that dark abyss beneath the water." },
      ],
      choices: [
        { id: "pa", text: "Approach line A with the giant valve", next: "n_pompaA", if: { flag: "pompaA", equals: false } },
        { id: "pb", text: "Go to the slightly open door of room B", next: "n_pompaB", if: { flag: "pompaB", equals: false } },
        { id: "sintine", text: "Enter the narrow passage submerged in water", next: "n_sintine" },
        { id: "panel", text: "Go to the main control panel", next: "n_anapanel", if: { flag: "gucAcik", equals: false } },
        { id: "bekle", text: "Stand completely still and listen for things to calm down", next: "n_bekle", ifStat: { stat: "gurultu", gte: 25 } },
        { id: "geri", text: "Return to the crossroad via the ladder", next: "n_kavsak" },
      ],
    },

    n_bekle: {
      cost: 2,
      events: [
        { type: "narrate", text: "You slip into the shadow of a rusted pipe, press your back against the steel, and DO NOT MOVE AT ALL. You close your eyes and count your breaths. One... Two... The water settles, the groaning of the metal calms down. You think the facility has forgotten you... or it's playing a trick, like a predator stalking its prey." },
        { type: "stat", stat: "gurultu", delta: -25, note: "The surroundings quieted down — NOISE reduced", noteKind: "system" },
        { type: "ambient", text: "From deep below, a rhythmic metallic thud echoes: Tap... tap... tap... The outer hull is being struck from the inside. You can't be sure; you are on the verge of losing your mind." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_pompaA: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are in the Pump A chamber. The giant valve appears entirely seized by a thick layer of rust. The wall section where the pressure log should hang is completely empty, save for words hastily scratched onto the sheet metal with white chalk: \"log moved to storage — B.S.\"" },
      ],
      interaction: { kind: "valve", title: "PUMP A — TURN THE VALVE", turns: 9, success: "n_pompaA2", cancel: "n_platform", doneFlag: "pompaA", doneNext: "n_platform" },
    },

    n_pompaA2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaA: true } },
        { type: "narrate", text: "With one final effort, the valve turns, screeching in agony. Water begins to draw with a sound like someone choking on fluid deep in their throat. Your arms are caked in rust and grime, the monstrous growl of the pump fills your ears... The first one is done." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_pompaB: {
      cost: 1,
      events: [
        { type: "narrate", text: "The Pump B room is the definition of pitch black. The feeble light from your tablet screen cannot illuminate more than three steps ahead, dying inside the dark void. The breaker panel is straight ahead... On the rotten shelf to the right, amidst a tangle of wires, an orange spare battery gleams." },
        { type: "ambient", text: "In the darkest corner of the room, right where the tablet light dissolves, a massive silhouette resembling an old diving suit hangs suspended... Or maybe that hanging form isn't a suit, but a HUMAN body. You cannot summon the courage to shine the light back into that corner ever again." },
      ],
      choices: [
        { id: "raf", text: "Reach for the shelf — grab the battery (the shelf looks unstable)", next: "n_pompaB_raf", if: { flag: "rafAlindi", equals: false } },
        { id: "salter", text: "Proceed straight to the breaker", next: "n_pompaB_int" },
        { id: "geri", text: "Exit the room", next: "n_platform" },
      ],
    },

    n_pompaB_raf: {
      cost: 1,
      events: [
        { type: "flag", set: { rafAlindi: true } },
        { type: "narrate", text: "The moment your fingers touch the battery, the decayed metal shelf collapses completely; all the heavy iron components scatter onto the steel floor with a massive crash. In the dark room, you squeeze your eyes shut and wait for the noise to end. Your heart is in your throat." },
        { type: "stat", stat: "gurultu", delta: 6, note: "NOISE +6 — The shelf collapsed", noteKind: "alert" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "salter", text: "Proceed to the breaker", next: "n_pompaB_int" },
        { id: "geri", text: "Exit the room", next: "n_platform" },
      ],
    },

    n_pompaB_int: {
      cost: 1,
      events: [
        { type: "narrate", text: "The lever is rusted and massive, its springs tightly wound... If you let go halfway, it will snap back violently enough to break your fingers. You grit your teeth and throw your entire body weight into it, breaking into cold sweats in the dark." },
      ],
      interaction: { kind: "lever", title: "PUMP B — THROW THE BREAKER", holdMs: 1800, success: "n_pompaB2", cancel: "n_platform", doneFlag: "pompaB", doneNext: "n_platform" },
    },

    n_pompaB2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaB: true } },
        { type: "narrate", text: "The metal lever snaps into place, and the massive room shudders with a violent vibration. That thing hanging in the corner—that foul suit or whatever it is—begins to SWING slowly with the tremor. You bolt out of the room without looking back." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    /* ================= BILGE PASSAGE → PUMP C ================= */

    n_sintine: {
      cost: 2,
      events: [
        { type: "narrate", text: "You enter the bilge tunnel. The black water has now risen to your waist, its ice-cold sting biting into your flesh. With every step, the water sloshes wildly, the sounds you make echoing through the tunnel and literally REPORTING your position to whatever is down here. The ceiling lowers significantly; hanging rusted pipes brush against your hair, trapping you inside a tight coffin.", if: { flag: "sintineIlk", equals: false } },
        { type: "stat", stat: "gurultu", delta: 4, note: "NOISE +4 — One cannot walk silently in water", noteKind: "alert", if: { flag: "sintineIlk", equals: false } },
        { type: "flag", set: { sintineIlk: true } },
        { type: "ambient", text: "Ahead, at the end of the tunnel, the dead screen of a fuse panel is barely visible. And right at that moment, you notice: across the surface of the water, there are ripples and counter-waves coming from the opposite side, from within the dark, that your own steps did not create... Something is swimming toward you." },
      ],
      choices: [
        { id: "pano", text: "Advance to the panel at the deep end", next: "n_pompaC" },
        { id: "geri", text: "Turn back to the platform", next: "n_platform" },
      ],
    },

    n_pompaC: {
      cost: 1,
      events: [
        { type: "narrate", text: "You reach the front of the Pump C panel. Its slot is COMPLETELY EMPTY. The fuse is gone, that vacant hole staring back at you like a blackened eye socket ringed with burn marks. Scratched violently onto the steel plate right next to the panel with a sharp object are two numbers: \"36\". Beneath it, in a shaky handwriting: \"I have the other half.\"", if: { flag: "kod47", equals: false } },
        { type: "note", id: "not_kod47", title: "Code Fragment: ··36", text: "Scratched onto the wall of panel C: 36. It says 'I have the other half' — that's Baturay's handwriting. So the code is: [first half][36]. I need to combine the two pieces.", if: { flag: "kod47", equals: false } },
        { type: "flag", set: { kod47: true } },
        { type: "narrate", text: "The Pump C line is operational now. The panel is still wet and hazardous, but the fuse is locked into its slot; touching it again will gain you nothing.", if: { flag: "pompaC", equals: true } },
        { type: "narrate", text: "This hungry socket demands a replacement fuse, but your hands are empty. You try to recall the note from the handover report... Where were the spares?", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "alert", text: "PUMP C: NO FUSE — SPARE REQUIRED", if: { all: [{ flag: "sigortaAlindi", equals: false }, { flag: "pompaC", equals: false }] } },
        { type: "narrate", text: "The heavy, glass-bodied fuse you took from the storage becomes drenched between your fingers. The line is vibrating like crazy; the moment the gauge hits the green zone, you must slam the fuse into the slot. If you miss, thousands of volts of electrical current running through this water-logged death trap will turn you into charcoal.", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
      ],
      choices: [
        { id: "tak", text: "Insert the fuse into the slot", next: "n_pompaC_int", if: { all: [{ flag: "sigortaAlindi", equals: true }, { flag: "pompaC", equals: false }] } },
        { id: "geri", text: "Retreat from the water — back to the platform", next: "n_platform" },
      ],
    },

    n_pompaC_int: {
      events: [
        { type: "narrate", text: "You hold your breath entirely, tracking the gauge while listening to the thumping of your heart in your ears. The black water rises around your knees, your chest. The darkness waits along with you." },
      ],
      interaction: { kind: "fuse", title: "PUMP C — ALIGN THE FUSE", hits: 2, success: "n_pompaC2", cancel: "n_pompaC", doneFlag: "pompaC", doneNext: "n_platform" },
    },

    n_pompaC2: {
      cost: 1,
      events: [
        { type: "flag", set: { pompaC: true } },
        { type: "narrate", text: "The fuse seats into the slot with a loud click, and the third line roars to life with a massive rumble. The water forms a giant vortex, draining away rapidly; as you scramble back from the tunnel, the level drops to your knees. Now, your only shot is the main panel. That big red button." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    /* ================= AMBUSH 1 + MAIN PANEL ================= */

    n_enc1: {
      events: [
        { type: "glitch", ms: 500 },
        { type: "alert", text: "⚠ MOVEMENT IN WATER LINE — PROXIMATE" },
        { type: "narrate", text: "Beneath the predatory roar of the pumps, another sound detaches itself. The water parts in two, as if yielding not to a body, but to a purpose. The approaching presence does not rush; rushing belongs to the panicked prey. This thing knows exactly where you are. There is no time to shut off your tablet and hide. Right now, even thinking counts as a form of noise." },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "don", text: "Climb out of the water and FREEZE", next: "n_enc1_ok" },
        { id: "kos", text: "Sprint to the ladder", next: "n_olum_su", default: true },
      ],
    },

    n_enc1_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You tear yourself out of the water, throwing your body onto the platform's iron catwalk, and you FREEZE there like a stone. You shut your eyes. That wet, massive weight stops exactly three paces in front of you. Water drips heavily... Streams flowing from its towering torso strike the steel, a form that nearly brushes the ceiling. After a minute that feels like an eternity, the creature turns around and dissolves back into the darkness." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY −10 — You heard it. It was too close.", noteKind: "alert" },
        { type: "ambient", text: "From the abyss where the creature vanished, a low, deep metallic GROAN echoes. Like a suffering piece of machinery... or like a demon mimicking a human to lure its prey." },
      ],
      choices: [
        { id: "don", text: "Return to the platform", next: "n_platform" },
      ],
    },

    n_olum_su: {
      death: true,
      deathText: "Fool! One does not sprint through water! Every frantic stride you took, every splash you kicked up reverberated across the walls of this floor, broadcasting your position. With three steps left to the ladder, that wet, massive weight slams onto your back from behind. You hear the snapping of your own bones, and the pitch-black, foul water of K-6 closes over you like a secret.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_anapanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "You stand before the main control panel. The raw red emergency light beats against your face. On the glass of the cracked, dusty CRT monitor, there is nothing but your own pale reflection, looking on the verge of madness from terror. Right below the screen, behind a plastic shield coated in a thick layer of grime, it rests: the big, blood-red button." },
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
        { type: "system", text: "MAIN LINE INITIATED — POWER DISTRIBUTION: K-6 100%" },
        { type: "narrate", text: "You slam the big red button with all your might. The massive station shudders like an earthquake; platforms, ladders, and corridors awaken one by one under immense yellow floodlights! The deafening, monstrous growl of those old generators returns, and for a split second... you feel as if everything is solved." },
        { type: "pause", ms: 1200 },
        { type: "ambient", text: "But immediately after, from far above, through the steel decks of the upper floors, a terrifying, agonized WAIL ascends. Long, patient, and carrying... the gratitude of a hunter locating its prey." },
        { type: "stat", stat: "gurultu", delta: 15, note: "NOISE +15 — Lights and machine roar. Everyone knows now.", noteKind: "alert" },
        { type: "pause", ms: 800 },
        { type: "glitch", ms: 400 },
        { type: "anons", text: "「Attention, attention. Luminescence detected in the engine room. The Family has been notified.」" },
        { type: "anons", text: "「...Welcome, late personnel. I am Deniz. Your orientation has officially commenced.」" },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "waitTap" },
        { type: "note", id: "not_anons", title: "The Voice on the PA", text: "The man on the loudspeaker introduced himself as Deniz. He didn't speak like an executioner, but like a technician bored during his shift. He said, 'The Family has been notified.' Down here, the word family isn't an expression of affection; it's a procedure that locks doors, extinguishes lights, and forces people into lines. The most terrifying part isn't his voice. It's the calm in his tone." },
        { type: "objective", text: "Reach the radio room." },
        { type: "system", text: "K-6 ELECTRONIC LOCKS: ACTIVE — 6-B CORRIDOR ACCESS GATE UNLOCKED" },
      ],
      choices: [
        { id: "yukari", text: "Ascend the ladder back to the crossroad", next: "n_kavsak" },
      ],
    },

    /* ================= 6-B CORRIDOR → RADIO ================= */

    n_koridor2: {
      checkpoint: true,
      cost: 1,
      noiseGate: [{ min: 65, once: "pusu2", node: "n_enc2" }],
      events: [
        { type: "narrate", text: "The 6-B corridor is illuminated now. You wish it had stayed dark. There is condensation on the glass of the observation rooms; from the inside. Someone, or something, just exhaled behind the glass a moment ago. The handprint on the third window pane looks freshly wiped. The finger joints defy human proportions. These rooms were built for observation. Now you understand: the observing side shifted long ago." },
        { type: "stat", stat: "akil", delta: -5, if: { flag: "kor2Ilk", equals: false } },
        { type: "flag", set: { kor2Ilk: true } },
        { type: "narrate", text: "Right at the end of the corridor, the heavy steel door of the radio room appears. The code panel with its green display screen awaits you, casting a digital light." },
      ],
      choices: [
        { id: "kapi", text: "Approach the access panel", next: "n_kapipanel" },
        { id: "geri", text: "Return to the crossroad", next: "n_kavsak" },
      ],
    },

    n_enc2: {
      events: [
        { type: "glitch", ms: 600 },
        { type: "alert", text: "⚠ CORRIDOR LIGHTS SHATTERING IN SEQUENCE — TOWARD YOU" },
        { type: "narrate", text: "The lamp at the furthest end of the corridor shatters with a loud pop. Immediately after, the next one... then the next! The darkness, like a ravenous monster, RUNS WILDLY DOWN THE HALLWAY TOWARD YOU, and within that darkness, a silhouette is hurtling your way!" },
      ],
      interaction: {
        kind: "chase",
        title: "6-B OBSERVATION CORRIDOR",
        enemy: "PERSONNEL IN THE DARK",
        success: "n_enc2_ok",
        fail: "n_olum_koridor",
        startDanger: 36,
        phaseMs: 1240,
        hints: {
          patrol: "The lights are bursting in sequence. Gain a few paces toward the door.",
          search: "Breathing sounds emerge from behind the glass panes. Crouch flat against the wall base.",
          near: "The stench just brushed your face. Hold your breath, or it will single you out.",
        },
      },
    },

    n_enc2_ok: {
      cost: 1,
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You press your back flat against the steel wall like crazy and squeeze your eyes tight. The wave of darkness passes over you; an icy, foul-smelling, wet wind hits your face... A sharp scent of the deep sea floor and rotting meat. Something STOPS exactly a hair's breadth from your face. You stop breathing, your heart feels ready to seize. You aren't even counting; you just pray not to die." },
        { type: "stat", stat: "akil", delta: -10, note: "SANITY −10 — You don't need to remember its face. The stench is enough.", noteKind: "alert" },
        { type: "narrate", text: "It slowly moves away. The corridor lamps flicker and turn back on as if nothing happened. You turn your head to look at the glass; the handprint on that fogged window pane is now a pair." },
      ],
      choices: [
        { id: "kapi", text: "Go to the access panel — immediately", next: "n_kapipanel" },
      ],
    },

    n_olum_koridor: {
      death: true,
      deathText: "You succumbed to your terror and started running! But you cannot outrun that darkness; it knows every single gap in this corridor. You feel icy, wet fingers clamp around your neck. When the lights flicker back on, the hallway is empty... except those bloody condensation marks on the windows are now made from the inside, not the outside.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapipanel: {
      cost: 1,
      events: [
        { type: "narrate", text: "The panel at the door demands a four-digit passcode. A cold text blinks across the digital screen: 'RE-CODED — B.S.'" },
        { type: "system", text: "HINT: The code is split into two fragments. Combine the notes in your archive.", if: { flag: "kod21", equals: true } },
        { type: "alert", text: "You DO NOT have the first half of the code. Baturay wrote 'half of it is always with me'... Where is he now?", if: { flag: "kod21", equals: false } },
      ],
      interaction: { kind: "keypad", code: "5836", success: "n_radyo", cancel: "n_koridor2" },
    },

    n_radyo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "PASSCODE ACCEPTED — RADIO ROOM GATE UNLOCKED" },
        { type: "narrate", text: "The heavy door swings open with a hiss. The radio room... A wall full of smashed, dead equipment with wires dangling out, and right in the center sits the emergency radio console. A strange clicking sound coming from one of the drawers breaks the silence." },
        { type: "narrate", text: "The old broadcast protocol is still posted on the panel above the wall: 'Record first, then request aid.' Beneath the letters, someone scratched a second sentence with their fingernails: 'If aid isn't coming, at least tell the story while dying.' You hold your tablet tighter. This small screen feels much more like a tombstone than a flashlight now." },
        { type: "document", open: true, doc: {
          id: "d_talep", title: "Specimen Transfer Request — REJECTED",
          meta: "PERISHED INTERNAL CORRESPONDENCE · FORM 4-A · ARCHIVE COPY",
          body: "REQUESTED BY: Dr. Nevin Aras (K-3 Biology)\nREQUEST: Extraction of additional tissue samples\nfrom 'ARTIFACT-1' inside the K-2 archaeological\nvault and its transfer to the K-3 laboratory.\n\nJUSTIFICATION: ████████████████████████████████\n█████████ counting behavior ████████████\n██████████ recordings of my daughter ██████████\n████████████ is responding ████████\n\nDECISION: REJECTED.\n'No one touches the artifact. It belongs to the family.\nIs that understood, Nevin? THE FAMILY.'\n— H. Tekin, Station Chief" } },
        { type: "narrate", text: "You collapse at the radio desk, but the device is dead. You frantically strip off its back cover: The five-lamp fuse circuit has been completely scrambled, one glows, four stand like blind eyes. Without fixing this circuit, you can't send a single scream out to the world." },
      ],
      choices: [
        { id: "cekmece", text: "Open the drawer", next: "n_radyo_cek", if: { flag: "cekmeceAcik", equals: false } },
        { id: "devre", text: "Align the power circuit", next: "n_lights" },
        { id: "geri", text: "Return to the corridor", next: "n_koridor2" },
      ],
    },

    n_radyo_cek: {
      cost: 1,
      events: [
        { type: "flag", set: { cekmeceAcik: true } },
        { type: "narrate", text: "You pull the clicking drawer open. Inside, dozens of dead batteries are lined up like spent bullet casings... But at the very back, a pristine, fully CHARGED tablet battery sits in unopened packaging. A battery someone hid in a desperate breath to ensure they could return here." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devre", text: "Align the power circuit", next: "n_lights" },
        { id: "geri", text: "Return to the corridor", next: "n_koridor2" },
      ],
    },

    n_lights: {
      events: [
        { type: "narrate", text: "Five lamps, five rusted switches... When you flip one, the ones adjacent to it go wild and invert direction. If Baturay were here, he would solve this instantly, but Baturay is nothing more than a scrap of meat in the infirmary now." },
      ],
      interaction: { kind: "lights", success: "n_radyo2", cancel: "n_radyo" },
    },

    n_radyo2: {
      cost: 1,
      events: [
        { type: "system", text: "RADIO POWER CIRCUIT: ACTIVE — BAND SCANNING READY" },
        { type: "narrate", text: "The console warms up with a massive crackle, and a dense static noise floods the room. Somewhere across the frequencies... there must be a living human. Coast guard, the surface, anyone..." },
        { type: "objective", text: "Scan the emergency frequency band." },
      ],
      interaction: { kind: "radio", target: 432.0, success: "n_ece", cancel: "n_radyo" },
    },

    n_ece: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "ambient", text: "«The surface? ...The surface hasn't responded for three weeks.» A woman's voice suddenly emerges from the static. Exhausted, desperate, but a REAL human voice. You cannot believe your ears." },
        { type: "ambient", text: "«Are you... coming from K-6? Are you normal? You aren't counting numbers, right? — Don't answer. If you were counting, I would have known by now.»" },
        { type: "ambient", text: "«Listen to me. My name is Ece, sonar operator, I'm still... still myself. Why did you turn on the lights?! THE CHIEF can see the lights. Cut the power and whatever you do, don't approach the table in the cafeteria—»" },
        { type: "glitch", ms: 800 },
        { type: "alert", text: "— LINE TERMINATED — CARRIER SIGNAL LOSS —" },
        { type: "pause", ms: 900 },
        { type: "anons", text: "「Do not interfere, Ece. The orientation of the new personnel is my job.」" },
        { type: "anons", text: "「...Did you hear that, maintenance? We learned your name too. See you upstairs.」" },
        { type: "waitTap" },
        { type: "stat", stat: "akil", delta: 10, note: "SANITY +10 — There is still a HUMAN in this facility. You are not alone.", noteKind: "system" },
        { type: "flag", set: { eceIlkTemas: true, frekanslariDuydun: true } },
        { type: "note", id: "not_ece", title: "Ece — Sonar Operator", text: "I found a human voice on 432.0. Ece. She's been hiding in the dark for three weeks and can still speak with her own name; that's what counts as a miracle in this station. She said the Chief can see the lights. She was going to warn me about the table in the cafeteria. The line was cut. Deniz knows her, hunts her, plays games. If I die, whoever finds this: Ece might still be alive. Do not mistake her for an automated announcement. Believe her." },
        { type: "pause", ms: 1000 },
        { type: "narrate", text: "And right at that moment, you hear it: those wet, heavy, dragging footsteps coming from the corridor... A massive shadow expands across the frosted glass of the door under the yellow light. The door handle — slowly — begins to turn downward!" },
        { type: "objective", text: "Hide in the locker." },
      ],
      choices: [
        { id: "dolap", text: "Get inside the equipment locker — hold your breath", next: "n_saklan" },
      ],
    },

    n_saklan: {
      events: [
        { type: "narrate", text: "You throw yourself into the steel equipment locker and pull the door shut. It is pitch black inside, but darkness doesn't mean safety; it just means you won't see the face looking back while you are caught. Through the slit grid, you watch the door open. That wet weight enters. Inside that mangled diving suit, it feels less like a creature and more like a staff member who couldn't be relieved of duty. Still on patrol. Still enforcing protocol." },
      ],
      interaction: { kind: "breath", holdMs: 8500, lungMs: 10000, success: "n_saklan_ok", fail: "n_olum_nefes" },
    },

    n_olum_nefes: {
      death: true,
      deathText: "Your lungs are about to burst! Your heart thumps with such terror that the locker sheet metal shakes, and unable to hold it any longer, you let loose a sobbing gasp. The locker door is violently ripped off its hinges in a single motion. The last thing you hear is your own scream... The last thing you see is a pair of bloodshot, crazed, yet familiar HUMAN eyes staring at you from behind that shattered diving mask.",
      events: [
        { type: "glitch", ms: 1000 },
      ],
    },

    n_saklan_ok: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The heavy steps slowly exit the room, the door slamming shut with a loud bang. You count for exactly one more minute inside the locker... Baturay's golden rule remains etched in your mind: Count first, then run. Trembling, you step out of the locker." },
        { type: "stat", stat: "akil", delta: -5 },
        { type: "narrate", text: "When you look at the radio desk, you are struck with horror: The device has been savagely mangled, the speaker split in two like a rib cage. That thing... UNDERSTOOD you were trying to talk to the world and punished the machine that gave you a voice. There is no way to reach Ece from here anymore." },
        { type: "alert", text: "RADIO: PERMANENT DAMAGE — BROADCAST FROM K-6 NO LONGER POSSIBLE" },
        { type: "waitTap" },
        { type: "objective", text: "Reach the K-5 airlock." },
        { type: "ambient", text: "From the corridor, very close by, that spine-chilling metallic groaning sound still echoes. It hasn't left... It is WAITING right behind the door." },
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
        { type: "music", track: "k6b" },
        { type: "narrate", text: "You peer through the door gap: That creature is standing right in the middle of the corridor, its back turned to you, shivering as if it is COUNTING in its sleep while swaying wildly. The K-5 airlock is at the exact opposite end of the hall. You have two paths, and both force you to pass right beside it." },
        { type: "narrate", text: "The main breaker switch of the floor sits on the left wall. If you pull it down, the K-6 floor will be rendered completely blind; that monster will slow down in the dark, but you will also be condemned to the pale screen light of your tablet. Or, with the lights on, you take the risk of making noise and RUN like mad." },
        { type: "alert", text: "MAKE A DECISION — THIS FACILITY DOES NOT FAVOR LONG THINKERS" },
      ],
      timer: { seconds: 8 },
      choices: [
        { id: "karanlik", text: "Throw the breaker — THE DARK PATH (silent, consumes battery)", next: "n_yolA" },
        { id: "isikli", text: "Keep lights active — SPRINT (fast, loud)", next: "n_yolB", default: true },
      ],
    },

    n_yolA: {
      cost: 4,
      events: [
        { type: "system", text: "K-6 POWER GRID: MANUAL SEVERANCE — ENTIRE FLOOR BLINDED" },
        { type: "narrate", text: "You pull the breaker down, and the entire floor plunges into a pitch-black, deafening silence in a single second. Now, your only light in the universe is that tablet screen... and that screen's light grows weaker with every step, its power bleeding out. The creature's groaning abruptly stops, pausing as if confused... Good." },
        { type: "ambient", text: "In the blind darkness, you advance by counting the wall with your hand, crawling along. A ventilation duct... A fire cabinet... A wall niche... Did the rattle of something just emerge from within that niche?" },
      ],
      choices: [
        { id: "nis", text: "Examine the wall niche (a waste of time — but maybe...)", next: "n_yolA_nis", if: { flag: "nisYoklandi", equals: false } },
        { id: "devam", text: "Advance without stopping", next: "n_yolA2" },
      ],
    },

    n_yolA_nis: {
      cost: 2,
      events: [
        { type: "flag", set: { nisYoklandi: true } },
        { type: "narrate", text: "You slide your fingers into that dark niche with fear... Spiderwebs, rusted screws, and... yes! You find an emergency kit. It's torn apart, looted, but at the very bottom sits a packaged, brand-new tablet battery! Like a blessing granted within the dark." },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "devam", text: "Advance", next: "n_yolA2" },
      ],
    },

    n_yolA2: {
      cost: 4,
      events: [
        { type: "narrate", text: "Those final ten meters you advance in the dark shave years off your life. You've lost track of the direction of that monster's groaning sound... Is it behind you? In front of you? Or right above your head? When your hand finally touches the ice-cold steel wheel of the airlock, you can barely keep yourself from sobbing aloud." },
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
        { type: "stat", stat: "gurultu", delta: 20, note: "NOISE +20 — Boots sprinting across the steel deck", noteKind: "alert" },
        { type: "narrate", text: "YOU SPRINT LIKE MAD! Your heavy boots sound like drums on the steel floor, you don't care about anything anymore! That groaning monster suddenly turns toward you —the dead glass of its mangled diving mask catches the corridor light and gleams— and IT MOVES! That clumsy torso lunges toward you with an impossible, horrific speed for a mass of wet flesh!" },
      ],
      choices: [
        { id: "kapak", text: "Dash for the airlock", next: "n_kapak" },
      ],
    },

    n_enc3: {
      events: [
        { type: "alert", text: "⚠ THE PIPELINE AHEAD IS COLLAPSING" },
        { type: "narrate", text: "The massive high-pressure pipe on the ceiling comes crashing down right in front of you like a guillotine with a massive explosion! Scalding steam and steel shards fill the air everywhere!" },
      ],
      timer: { seconds: 3 },
      choices: [
        { id: "kay", text: "SLIDE beneath it", next: "n_enc3_ok" },
        { id: "dur", text: "Stop and retreat", next: "n_olum_boru", default: true },
      ],
    },

    n_enc3_ok: {
      events: [
        { type: "flag", set: { isaret: true } },
        { type: "narrate", text: "You throw yourself to the ground, sliding on your knees beneath that scalding steam; the scraping steel tears your clothing and burns your flesh, but you are on your feet and the airlock is RIGHT IN FRONT OF YOU!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "kapak", text: "Dash for the airlock", next: "n_kapak" },
      ],
    },

    n_olum_boru: {
      death: true,
      deathText: "That half-second you hesitated out of fear... it was more than enough for it to close the distance. Those massive, ice-cold hands reaching through the curtain of steam clamp around your neck. No one hears your screams at this depth... Those who could hear were already listening to your death throes in the pitch black anyway.",
      events: [
        { type: "glitch", ms: 900 },
      ],
    },

    n_kapak: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are in front of the K-5 airlock; a massive, rusted steel wheel as heavy as a coffin lid. Every single turn is a life-or-death struggle against eleven months of solidified rust... And right behind you, at the end of the hall, that horrific groaning resumes; this time it's running, closing in fast!" },
      ],
      interaction: { kind: "valve", title: "K-5 AIRLOCK — TURN THE WHEEL", turns: 6, success: "n_kapak2", cancel: "n_kapak" },
    },

    n_kapak2: {
      cost: 1,
      events: [
        { type: "system", text: "AIRLOCK: OPEN — K-5 TRANSIT READY" },
        { type: "narrate", text: "With one final mad effort, you spin the wheel and the hatch finally breaks open. Just as you cross over to the other side... you succumb to the urge to look back. For half a second... right at the end of the illuminated corridor: That diving suit, a head completely fractured and tilted sideways, and that pitch-black, bottomless madness behind the mask glass watches you.", if: { flag: "yolAydinlik", equals: true } },
        { type: "narrate", text: "With one final mad effort, you spin the wheel and the hatch finally breaks open. Just as you cross over to the other side... you succumb to the urge to look back. Within the blind darkness, right where the fading light of your dying tablet hits: The glass of a diving mask REFLECTS your own terror-stricken face back at you for half a second.", if: { flag: "yolAydinlik", equals: false } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "kapat", text: "Step inside and turn the wheel BEHIND you", next: "n_son" },
      ],
    },

    n_son: {
      cost: 1,
      events: [
        { type: "narrate", text: "The hatch seats home with a massive clang, the deadbolts locking into place. You collapse onto the floor, pressing your back against that thick steel; only now do your lungs empty with a wild, convulsive sob." },
        { type: "narrate", text: "And right at that moment, right on the other side of that thick hatch, exactly at ear level, you feel something HEAVY leaning against it. It doesn't strike. It doesn't force it. It just... stands there. Then, that sound coming through the steel, almost gently: Tap. A single strike... as if to say 'I am here, and I know you.'", if: { flag: "isaret", equals: true } },
        { type: "narrate", text: "The other side of the hatch is completely silent. Not a groan, not an impact sound... For the first time during this cursed night, nothing in this facility knows exactly where you are. A small, pitiful victory... but entirely yours.", if: { flag: "isaret", equals: false } },
        { type: "pause", ms: 1200 },
        { type: "glitch", ms: 400 },
        { type: "ambient", text: "And right in your pocket, that shut-off tablet suddenly wakes up, crackling on its own. A digital, distorted child's voice ascends from its speaker. It counts heavily and slowly: «...six... five...» Then it goes abruptly silent. The bottomless dark of the K-5 floor awaits you at the bottom of the stairs." },
        { type: "ambient", text: "Beneath that static, much deeper down, you catch a second layer of sound: a wet, wheezing breath and the murmurs of a distorted lullaby... You thought you were listening to your surroundings all night. Instead, during all this time, you were the one being LISTENED TO from within the dark.", if: { flag: "frekanslariDuydun", equals: true } },
        
      ],
      choices: [
        { id: "k5", text: "Climb the stairs — K-5: Life Support", next: "n_k5_giris", paywall: true },
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