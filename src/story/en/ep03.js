/* ============================================================
   PERISHED — EPISODE 3: "K-4 / HOME" (Full Version)
   Floor master: CHIEF HARUN OKUR — station chief, father of the "Family."
   (Deniz is his son: in EP02, he said "Say hello to my father.")

   TONE: PERISHED family ritual + dining table horror. The floor is arranged like a HOME:
   dining hall, kitchen, child's room, chief's quarters, cold storage,
   and the intercom niche. Harun PATROLS the house; he hunts not by sound, 
   but by habit — he knows where you should be and finds what is "out of place."

   MAIN MECHANIC — BAIT / INTERCOM:
   · You redirect sound to another room from the intercom niche → Harun 
     marches to that room → you slip into the vacated space. If you select 
     the wrong room (where Harun already is), you expose yourself.

   PIECE-LOCK: The locked chest in the Chief's room demands three FAMILY HEIRLOOMS
   (a photograph, a ring, a baby tooth) — scattered across three rooms. Once all 
   three are collected and the chest opens, it yields the 'vault key'; the descent to K-3 unlocks with it.

   MANDATORY DINING SCENE: Harun forces you to sit at the "family dinner."
   Whatever actions you choose (eat / refuse / escape) trigger direct consequences.

   CARRIED STATUS (From EP01-02):
   · eceEleVerildi → Ece assists/does not assist over the intercom
   · sefFarkindalik → Harun's baseline aggressiveness
   · denizSoruldu → Deniz intercepting the K-4 PA announcements
   ============================================================ */

export const EP03 = {
  nodes: {

    /* ================= ENTRY — THE HOME'S THRESHOLD ================= */

    n_k4_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k4" },
        { type: "sting", name: "stingK4" },
        { type: "system", text: "FLOOR: K-4 — PERSONNEL LIVING QUARTERS · MESS HALL · CABINS" },
        { type: "narrate", text: "You climb out of the shaft hatch straight into a home[cite: 7]. The word home should have been a comforting word to your brain; not here[cite: 7]. Floral wallpaper is glued over steel walls, carpets are rolled across the deck, and crude imitations of family photographs are hung in the corners[cite: 7]. Someone didn't understand the concept of a hearth, but they memorized its recipe[cite: 7]. The faint glow of your tablet exposes the rust, sewage, and decay festering beneath the wallpaper[cite: 7]. The decor is thin; the lie is thick[cite: 7]." },
        { type: "narrate", text: "This home wasn't emulated; it was memorized[cite: 7]. Someone learned the shape of being a family from photographs, dining hours, and child room dimensions, pounding them all inside the steel in the wrong sequence[cite: 7]. There is no affection here; there is only the procedure of affection[cite: 7]. Sit, eat, smile, obey[cite: 7]. Fail to do so, and become a part of the menu[cite: 7]." },
        { type: "narrate", text: "Further ahead, stretching into the absolute darkness of the corridor, lies a long dining table[cite: 7]. Twelve chairs[cite: 7]. And at the head of the table sits that massive, hunchbacked torso, motionless, with his back turned to you[cite: 7]. He strikes his fork against an empty, rusted plate: tap[cite: 7]. Tap[cite: 7]. Tap[cite: 7]. This metallic sound echoing in the dark whispers that you will be the next casualty[cite: 7]." },
        { type: "waitTap" },
        { type: "ambient", text: "Ece's trembling whisper from the tablet's speaker is fractured by static noise: «So you made it up there... K-4[cite: 7]. That monster's floor[cite: 7]. Whatever you do, do not aim your light directly at him... cough twice if you can hear me — I patched the line into the K-4 intercoms[cite: 7].»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The glowing glass screen of the tablet is silent in your pocket[cite: 7]. Ece might have patched the line, but she is not speaking to you[cite: 7]. You are completely alone[cite: 7]. There is only your tablet's charge and the darkness[cite: 7].", if: { flag: "eceEleVerildi", equals: true } },
        { type: "objective", text: "Find an escape vector from K-4." },
        { type: "note", id: "not_ev", title: "K-4: Home", text: "The floor has been converted into a home — wallpaper, carpet, chandelier[cite: 7]. Someone sits at the head of the table, striking a fork against an empty plate[cite: 7]. Deniz had said 'say hello to my father.'[cite: 7] This must be Chief Harun[cite: 7]. The father of the family[cite: 7]." },
      ],
      choices: [
        { id: "yaklas", text: "Quietly approach the table", next: "n_sofra_ilk" },
        { id: "geri", text: "Try to retreat through the shaft hatch", next: "n_baca_kilit" },
      ],
    },

    n_baca_kilit: {
      cost: 1,
      events: [
        { type: "narrate", text: "You spin around and frantically shove the hatch — but it has been locked from the outside with heavy deadbolts[cite: 7]! K-5 won't take you back; you are trapped[cite: 7]. From below, out of those deep abysses, Deniz's loudspeaker crackles like crazy: 「I told you... up there isn't mine[cite: 7]. My father cuts down everything that is out of place[cite: 7].」 In this spiral of dread, there is only one direction: forward[cite: 7]." },
      ],
      choices: [
        { id: "yaklas", text: "Approach the table", next: "n_sofra_ilk" },
      ],
    },

    /* ================= MANDATORY DINING SCENE ================= */

    n_sofra_ilk: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "With trembling hands, you extend the weak screen light of your tablet forward just to see ahead[cite: 7]. As you draw closer to the table, that massive torso looms even larger in the dark, casting a demonic shadow across the wall[cite: 7]. Then, before you can even catch your breath, the fork sounds cut off like a knife[cite: 7]. That muffled, guttural, savage fatherly voice booms through the room[cite: 7]:" },
        { type: "narrate", text: "\"You are late[cite: 7].\" He doesn't turn around[cite: 7]. \"In a family, dinner is eaten together[cite: 7]. Sit[cite: 7]. Your plate is ready[cite: 7].\" A plate indeed rests before the chair[cite: 7]. It is covered, steaming with a heavy scent of meat[cite: 7]. He couldn't have prepared this before you arrived[cite: 7]. But here, time itself feels structured around the family table[cite: 7]. Being late in this house is a pre-written script[cite: 7]." },
        { type: "waitTap" },
        { type: "alert", text: "There is no escape — the only exit from the corridor is behind this psychopath[cite: 7]. You have to sit[cite: 7]." },
      ],
      choices: [
        { id: "otur", text: "Sit in the chair", next: "n_sofra_otur" },
        { id: "kac", text: "Turn around and flee into the corridor", next: "n_sofra_kac" },
      ],
    },

    n_sofra_kac: {
      cost: 1,
      events: [
        { type: "narrate", text: "You spin around and sprint into the darkness like mad — that exact moment, the feeble lamp on the ceiling shatters[cite: 7]. Pitch black[cite: 7]. Only the sickly blue light emitted by your tablet remains[cite: 7]. Right then, a massive, calloused hand smelling of meat clamps around your neck from behind, lifting you with immense force and hurling you onto the chair[cite: 7]! Your bones groan[cite: 7]. That calm yet borderline insane voice finishes right at your ear: \"One does not flee the family table, son[cite: 7]. Try that again, and I'll sever your legs[cite: 7].\"" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Your eyes witnessed pure terror in the dark, your heart is on the verge of stopping!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 10 },
        { type: "narrate", text: "The feeble chandelier flickers back on[cite: 7]. You sit trembling in the chair[cite: 7]. The plate rests right in front of you[cite: 7]. He remains at the head of the table, as if he never even moved, but his heavy breathing fills the room[cite: 7]." },
      ],
      choices: [
        { id: "devam", text: "Look at the plate", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_otur: {
      cost: 1,
      events: [
        { type: "narrate", text: "You sit helplessly in the cold chair[cite: 7]. The freezing chill of the steel seeps through your trousers into your flesh, and from your flesh into your marrow[cite: 7]. The giant at the head of the table slowly turns toward you for the first time... but the upper half of his face is shrouded in dark; only the line of his warped jaw and a crazed eyeball, gleaming wetly under your tablet's light, are visible[cite: 7]." },
        { type: "narrate", text: "\"Good boy[cite: 7]. See how easy it was[cite: 7].\" He drives the rusted fork into the wood of the table[cite: 7]. \"Now, eat[cite: 7]. Your mother prepared it for you[cite: 7]. We've been searching for fresh ingredients for days[cite: 7].\"" },
      ],
      choices: [
        { id: "devam", text: "Look at the plate", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_tabak: {
      cost: 1,
      events: [
        { type: "narrate", text: "With fingers trembling from terror, you lift the lid[cite: 7]. The contents inside behave like food at first: steam, spices, grease[cite: 7]. Then your eyes discern the shapes, and the brain struggles to separate the taste from the smell[cite: 7]. Chunks of meat resembling human extremities[cite: 7]. Worse yet, it smells good[cite: 7]. Your hunger defects sides for a split second[cite: 7]. A small personnel tag gleams amidst the bloody grease at the edge of the plate: 'AYKUT D., technician.'[cite: 7]" },
        { type: "note", id: "not_kunye", title: "The Identification Tag on the Plate", text: "Next to the plate sat a personnel ID tag reading 'AYKUT D.'[cite: 7] Not inside the meat, beside it[cite: 7]. This is worse[cite: 7]. Harun knew exactly who he was[cite: 7]. He preserved his name, cooked his body[cite: 7]. I am writing this down because in a few minutes my brain might decide this wasn't real[cite: 7]. It was real[cite: 7]. The taste is still in my mouth[cite: 7]." },
        { type: "waitTap" },
        { type: "narrate", text: "\"Eat,\" he says, his voice dropping into a deep growl this time[cite: 7]. \"Refusing... would break your mother's heart[cite: 7]. And believe me, if she gets upset, I will paint this table with your blood[cite: 7].\" You lift the fork[cite: 7]. Your stomach, your memories, and the last remaining fragment of you trying to stay human convulse simultaneously[cite: 7]." },
      ],
      choices: [
        { id: "ye", text: "Take a bite — just to survive", next: "n_sofra_ye" },
        { id: "sakla", text: "Pretend to eat, conceal the bite", next: "n_sofra_sakla" },
        { id: "reddet", text: "Drop the fork — \"I won't eat this.\"", next: "n_sofra_reddet" },
      ],
    },

    n_sofra_ye: {
      cost: 1,
      events: [
        { type: "narrate", text: "Squeezing your eyes tight, you force that raw, human flesh into your mouth[cite: 7]. You chew[cite: 7]. The tissues mashing between your teeth turn your stomach inside out; you clutch your throat to keep from throwing up[cite: 7]. You swallow[cite: 7]. The Chief's twisted face relaxes in the shadows, his lips curling upward: \"There... There is my beautiful child[cite: 7]. Now you are a part of our family[cite: 7].\"" },
        { type: "flag", set: { sofraYedi: true } },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — You chewed human flesh. An irreversible threshold has been crossed!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: -15, note: "The Chief is beginning to trust you", noteKind: "system" },
        { type: "narrate", text: "\"Your belly is full[cite: 7]. Now for the household chores[cite: 7].\" He stands up — looming like a colossal mass[cite: 7]. \"I will prepare the new ingredients in the kitchen[cite: 7]. You clean up around here[cite: 7]. But whatever you do, do not enter my room on the upper deck[cite: 7]. And that cold storage... if you step inside, I will hang you from those hooks alive[cite: 7].\" He marches to the kitchen with heavy, dragging strides[cite: 7]." },
      ],
      choices: [
        { id: "devam", text: "Stand up from the table", next: "n_hol" },
      ],
    },

    n_sofra_sakla: {
      cost: 1,
      events: [
        { type: "narrate", text: "You bring the meat chunk to your mouth, closing your lips and letting the vile fluid slick down your fingers as you jam the bite into your palm, and from there, into your pocket[cite: 7]. You mimic the act of swallowing by moving your jaw in exaggerated motions[cite: 7]. The Chief watches you under his wet, crazed eye through your tablet's light... Your heart pounds as if ready to rip out of your chest[cite: 7]." },
        { type: "narrate", text: "Then, he nods slowly[cite: 7]. \"...Good boy[cite: 7]. I love children who listen[cite: 7].\" Your trick worked, but warm blood seeping from your pocket stains your jacket[cite: 7]. \"Your belly is full[cite: 7]. Tend to the household chores[cite: 7]. Don't enter my room, don't enter the cold storage[cite: 7].\" He heads to the kitchen with heavy steps[cite: 7]." },
        { type: "flag", set: { sofraSakladi: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "devam", text: "Leave the table", next: "n_hol" },
      ],
    },

    n_sofra_reddet: {
      cost: 1,
      events: [
        { type: "narrate", text: "You hurl the fork onto the plate[cite: 7]. The clink of the metal echoes through that ominous room[cite: 7]. \"I won't eat this,\" you say, your voice cracking[cite: 7]. A deathly silence falls[cite: 7]. The Chief bolts up, and the dim light of your tablet strikes his face... You wish you hadn't looked[cite: 7]. The right half of his face is entirely flayed; in its place, a bruised chunk of flesh harvested from another victim has been stitched and stapled with rusted wires[cite: 7]!" },
        { type: "stat", stat: "akil", delta: -18, note: "SANITY -18 — That stapled, rotting face will haunt your nightmares!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 20, note: "You broke the CHIEF's heart — he is tracking you now", noteKind: "alert" },
        { type: "flag", set: { sofraReddetti: true } },
        { type: "narrate", text: "\"You insulted your mother's cooking!\" he roars, but his voice suddenly drops to a whisper — this abrupt transition is the pinnacle of madness[cite: 7]. \"In this house, ungrateful wretches get skinned alive[cite: 7]. But I'm in no rush... You are here all night, right in the palm of my hand[cite: 7].\" He turns back to the kitchen with heavy steps[cite: 7]. \"Clean up[cite: 7]. Don't enter my room[cite: 7]. Don't enter the cold storage[cite: 7]. And hammer this into your head... you can never escape from me[cite: 7].\"" },
      ],
      choices: [
        { id: "devam", text: "Leave the table", next: "n_hol" },
      ],
    },

    /* ================= CENTRAL: THE HOME HALLWAY (HUB) ================= */

    n_hol: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are in the home's hallway[cite: 7]. The tablet light hits the framed 'family photographs.'[cite: 7] The faces have been scraped away with a knife; massive smiles have been drawn in their place with blood-red ink[cite: 7]. This isn't vandalism executed in rage; it's a correction made with patience[cite: 7]. Harun didn't erase the faces, he erased the disobedient expressions[cite: 7]. He left behind only mouths fitting for the family[cite: 7].", if: { flag: "holIlk", equals: false } },
        { type: "flag", set: { holIlk: true } },
        { type: "ambient", text: "The sounds of a cleaver hacking and bones snapping emerge from the kitchen — the Chief is butchering something in there[cite: 7]. The feeble glint on your tablet screen illuminates five dark doors ahead: the kitchen, the child's room, the chief's upper deck quarters, the cold storage, and that narrow intercom niche[cite: 7]." },
      ],
      choices: [
        { id: "cocuk", text: "Enter the room where cartoon audio originates", next: "n_cocuk", if: { flag: "cocukBitti", equals: false } },
        { id: "interkom", text: "Go to the intercom niche on the wall", next: "n_interkom" },
        { id: "sef", text: "Ascend to the upper deck, to the locked room", next: "n_sef_kapi" },
        { id: "depo", text: "Approach the heavy door leaking freezing air", next: "n_depo_kapi" },
        { id: "mutfak", text: "Peer into the kitchen (The Chief is inside)", next: "n_mutfak" },
        { id: "vitray", text: "Examine the stained glass panel above the sofa", next: "n_vitray_panel", if: { flag: "vitrayCozuldu", equals: false } },
        { id: "sandik", text: "Try to crack the chest in the Chief's room", next: "n_sef_sandik", if: { flag: "sefOdaAcik", equals: true } },
      ],
    },

    /* FAMILY STAINED GLASS — RINGS PUZZLE */
    n_vitray_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "A panel crafted from stained glass fragments stands on the hallway wall[cite: 7]. It's an old family portrait[cite: 7]. But the glass chunks have been shattered, patched with wrong, sickly colors as if blood splattered across them[cite: 7]. The faces are like a nightmare painting mashed together[cite: 7]. Directly beneath the panel, Deniz's childish yet trembling handwriting is etched: 'My mother knows the correct colors[cite: 7]. I forgot[cite: 7]. My father turned into a monster.'[cite: 7] If you align the glass into the correct pattern, the hidden compartment behind will release[cite: 7]." },
        { type: "document", open: false, doc: {
          id: "d_aile_uyum", title: "Family Harmony Observation Form",
          body: "PERISHED BEHAVIORAL OBSERVATION FORM\nUNIT: K-4 residential family simulation\nOBSERVER: D. Okur\nSTATUS: Active / do not approach while in contact\n\nObserved rituals:\n- When the table call is sounded, all individuals take their seats.\n- Food rejection generates extreme protective violence in the father figure.\n- Child room audio creates a loss of orientation in the father figure.\n- Color/pattern stimuli belonging to the mother produce positive reactions in locked compartments.\n\nClinical commentary:\nFamily behavior is tethered not to affection, but to a recurring cycle of punishment and reward.\nThe father figure sustains his grief response by placing new individuals in stead of the missing spouse.\nAn outsider can survive short-term if they emulate the 'child' role adequately.\n\nWarning:\nThis is not a treatment case. K-4 is no longer a residence, it is a ritual space.\nDo not let Harun Tekin realize you are not a family member." } },
        { type: "note", id: "not_vitray", title: "The Family Stained Glass", text: "The colored glass family portrait in the hallway is patched with wrong colors[cite: 7]. I need to bring it to the correct pattern — touching the cells shifts the color[cite: 7]. Deniz's note: the correct colors are his mother's memory[cite: 7]. There is a compartment behind it[cite: 7]." },
      ],
      interaction: {
        kind: "rings",
        variant: "vitray",
        clockwiseOnly: true,
        title: "FAMILY STAINED GLASS — ALIGN THE GLASS",
        rings: [
          { label: "INNER", color: "#6aaa7a", step: 30, offset: 210, shards: ["#8ec5a0", "#e8e4d4", "#c4a4c8", "#d4a0a8", "#a8d4b8", "#c8b8d8", "#d8c8b4", "#b4d8c4"] },
          { label: "MID", color: "#c88a9a", step: 24, offset: 168, shards: ["#d4a0a8", "#a8d4b8", "#c4a4c8", "#e8e4d4", "#8ec5a0", "#d8b8c4", "#b4c8d8", "#c8d4a8", "#d4b4c8"] },
          { label: "OUTER", color: "#aa8ab8", step: 40, offset: 280, shards: ["#c4a4c8", "#8ec5a0", "#e8e4d4", "#d4a0a8", "#b4d8c4", "#d8c8b4", "#a8b8d4", "#c8a8b4", "#8ec5a0", "#d4b8d4"] },
        ],
        success: "n_vitray_cozuldu",
        cancel: "n_hol",
      },
    },

    n_vitray_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "STAINED GLASS: COMPLETED" },
        { type: "narrate", text: "The moment the final chunk seats home, the panel swings backward with a click[cite: 7]. The raw light of your tablet strikes the dusty hollow behind[cite: 7]. Inside rests a life-saving spare battery and an old, wrinkled scrap of paper[cite: 7]. You scan the note rapidly[cite: 7]." },
        { type: "flag", set: { vitrayCozuldu: true } },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_anne", title: "Mother's Note", style: "hand",
          meta: "— within the hollow behind the stained glass —",
          body: "My Deniz,\n\nHis father has changed. Ever since they found that thing\ndown below. Now, when he says 'family,' he means\nsomething completely different. He wants to include you too.\n\nI made this panel for you — if you remember the correct\ncolors, I'll know you are still my son. Run. Climb upstairs.\nDon't wait for me.\n\n— Your Mother" } },
        { type: "stat", stat: "akil", delta: 4 },
      ],
      choices: [
        { id: "geri", text: "Return to the hallway", next: "n_hol" },
      ],
    },

    /* ================= INTERCOM NICHE — BAIT MECHANIC ================= */

    n_interkom: {
      cost: 1,
      events: [
        { type: "narrate", text: "A rusted, old intercom panel embedded into the wall[cite: 7]. The speakers in every room of the house are linked to this damned mechanism[cite: 7]. If you beam a sound wave into a specific room from here, that maniac Chief will direct his strides there[cite: 7]. This is your only card to manipulate him[cite: 7].", if: { flag: "interkomIlk", equals: false } },
        { type: "flag", set: { interkomIlk: true } },
        { type: "document", open: true, if: { flag: "interkomIlk", equals: false }, doc: {
          id: "d_interkom", title: "Intercom Usage Note (Handwritten)", style: "hand",
          meta: "— pinned inside the niche, drafted in a rush —",
          body: "LISTEN, whoever finds this:\nFather follows the sound. Project audio to a room,\nhe goes there. While he moves, cross to the OTHER room.\n\nBUT: do not project audio to the room he is already in —\nhe will hear you and understand where it originated.\nHe is in the kitchen. Dispatch the sound ELSEWHERE.\n\nThree heirlooms are required for the door:\n- photograph: inside the child room\n- ring: inside the cold storage (caution)\n- tooth: inside his pocket. put him to sleep.\n         — the previous 'child'" } },
        { type: "note", id: "not_interkom", title: "The Bait System", text: "Intercom: dispatch audio to a room, the Chief heads there, I cross to the vacated room[cite: 7]. BUT if I send audio to the room the Chief is already occupying, he will detect me[cite: 7]. Three heirlooms: photograph (child room), ring (cold storage), tooth (in the Chief's pocket — I need to put him to sleep)[cite: 7]." },
      ],
      choices: [
        { id: "cocuga", text: "Dispatch audio to the child's room (Bait)", next: "n_yem_cocuk" },
        { id: "depoya", text: "Dispatch audio to the cold storage (Bait)", next: "n_yem_depo" },
        { id: "salona", text: "Dispatch audio to the dining hall (Bait)", next: "n_yem_salon" },
        { id: "geri", text: "Exit the niche, return to the hallway", next: "n_hol" },
      ],
    },

    n_yem_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "You depress the child's room button and strike the microphone sharply[cite: 7]. The cleaver sounds in the kitchen cut off like a knife instantly[cite: 7]. Heavy, clumsy yet lethal strides pound the hallway floor[cite: 7]. A guttural voice ascends from the corridor: \"...Who is in there? My baby? Deniz? Did you hide in the locker again?\"[cite: 7] He is moving there[cite: 7]." },
        { type: "flag", set: { yemCocuk: true, sefNerede: "cocuk" } },
        { type: "system", text: "CHIEF: PROCEEDED TO THE CHILD'S ROOM — it is no longer EMPTY, he is there[cite: 7]" },
        { type: "ambient", text: "Now the kitchen and the cold storage have cleared out[cite: 7]. But to pull that photograph from the child's room would require absolute madness; because that monster is currently in there, sniffing the darkness[cite: 7]." },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway and utilize the vacated space", next: "n_hol" },
      ],
    },

    n_yem_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "You depress the cold storage button[cite: 7]. You simulate a crackling scream audio through the microphone[cite: 7]. A grunt rips from the kitchen: \"Who is tampering with the storage door again!\"[cite: 7] Heavy strides redirect to the cold storage, rusted keys jangling on his belt[cite: 7]." },
        { type: "flag", set: { yemDepo: true, sefNerede: "depo" } },
        { type: "system", text: "CHIEF: PROCEEDED TO THE COLD STORAGE — the kitchen and upper deck are now vacant[cite: 7]" },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway", next: "n_hol" },
      ],
    },

    n_yem_salon: {
      cost: 1,
      events: [
        { type: "narrate", text: "You depress the dining hall button and transmit an empty plate scraping sound[cite: 7]. \"...Did you return to dinner, son? Good... I'm coming, I'll freshen up the meat,\" he says, redirecting to the hall[cite: 7]." },
        { type: "flag", set: { yemSalon: true, sefNerede: "salon" } },
        { type: "system", text: "CHIEF: PROCEEDED TO THE DINING HALL — the kitchen, storage, and upper deck are vacant[cite: 7]" },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway", next: "n_hol" },
      ],
    },

    /* ================= CHILD'S ROOM — HEIRLOOM 1 (PHOTOGRAPH) ================= */

    n_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "A fractured cartoon melody drifts from the child's room; a three-second snippet of joy locked in an infinite loop, it is no longer joy, it is torture[cite: 7]. Growth notches are carved next to the bunk bed[cite: 7]. At first glance, you mistake it for the log of a growing child[cite: 7]. Then you discern the names: different individuals, different dates, the exact same note[cite: 7]. 'Son.'[cite: 7] This room didn't raise a child[cite: 7]. It measured the human beings meant to replace him[cite: 7].", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "alert", text: "DEATH BY A HAIR'S BREADTH — THE CHIEF IS HERE! If your tablet's light hits the wall, you are dead! EXIT IMMEDIATELY!", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "The cartoon melody leaks into the room from a corrupted tape[cite: 7]. A frame with its glass shattered and coated in dried blood stains rests atop the nightstand[cite: 7]. You aim the dim glow of your tablet toward the frame[cite: 7].", if: { flag: "sefNerede", equals: "cocuk", negate: true } },
      ],
      choices: [
        { id: "kac_c", text: "Exit immediately — he is here", next: "n_cocuk_yakalandi", if: { flag: "sefNerede", equals: "cocuk" } },
        { id: "fotograf", text: "Take the cracked-frame photograph", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "arastir", text: "Inspect beneath the bunk bed", next: "n_cocuk_ranza", if: { flag: "cocukRanza", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_yakalandi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You dash toward the door but that massive shadow has already blocked the threshold[cite: 7]! There are no flashlights or light sources, the blue screen of your tablet illuminates his stapled, sweaty, and bloody face[cite: 7]. He fixes his crazed eyes on you: \"So you came to your room, naughty child... Children should wait quietly and well-behaved in their rooms at night!\"[cite: 7] He locks the heavy steel door behind him[cite: 7]!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "sakla", text: "Squeeze beneath the bunk bed, hold your breath", next: "n_cocuk_nefes" },
      ],
    },

    n_cocuk_nefes: {
      events: [
        { type: "narrate", text: "Pressing your tablet screen against your chest to completely stifle the light, you slide into the filth and dried blood beneath the bunk bed[cite: 7]. His colossal boots enter the room[cite: 7]. His heavy, rasping breath is directly above you[cite: 7]. He steps onto a plastic toy on the floor — crunch[cite: 7]! He stops... Slowly, he bends down toward the floor, the heavy odor of meat filling your nostrils[cite: 7]." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_cocuk_kurtul", fail: "n_olum_cocuk" },
    },

    n_olum_cocuk: {
      death: true,
      deathText: "Your breath explodes beneath the bunk, you give out a sobbing gasp[cite: 7]! That exact moment, a colossal, hairy hand lunges out from within the dark, clamping into your hair and violently dragging you out[cite: 7]! Your head strikes the iron structure of the bunk[cite: 7]. \"I found you, little rat[cite: 7]. Hide and seek is over!\"[cite: 7] The cleaver ascends, everything going black alongside the cartoon music[cite: 7].",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_cocuk_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "The boots finally turn toward the door and exit the room[cite: 7]. \"...Whatever, we'll play later,\" he whispers from the corridor[cite: 7]. You crawl out from beneath the bunk that reeks of urine and sweat[cite: 7]. Your heart is practically beating in your ears, your tablet screen soaked with your sweat[cite: 7]." },
        { type: "flag", set: { sefNerede: "", cocukBitti: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "fotograf", text: "Take the photograph", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_foto: {
      cost: 1,
      events: [
        { type: "narrate", text: "You strip the photograph from the cracked frame[cite: 7]. A young Harun, a clean-faced woman, a small child[cite: 7]. Scrawled across the back: 'Harun, Sevgi, little Deniz — 2009.'[cite: 7] The most terrifying aspect of the photograph isn't being bloody; it's being normal[cite: 7]. This nightmare wasn't forged from a madman's fantasy[cite: 7]. It was born from three people who once genuinely smiled, slowly converting into procedures, rituals, and flesh[cite: 7]." },
        { type: "flag", set: { yadigar1: true } },
        { type: "note", id: "not_yadigar1", title: "Heirloom 1/3: Photograph", text: "Family photograph: Harun, his wife Sevgi, and little DENİZ — 2009[cite: 7]. Deniz really is Harun's son[cite: 7]. This family was once real[cite: 7]. This is one of the three heirlooms needed for the chest[cite: 7]." },
      ],
      choices: [
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { cocukRanza: true } },
        { type: "narrate", text: "Amidst the dust and filth beneath the bunk bed, you locate an old, stained child's journal[cite: 7]. The entries are childish in the first pages, turning completely schizophrenic toward the end[cite: 7]." },
        { type: "document", open: true, doc: {
          id: "d_cocukgunluk", title: "A Child's Journal", style: "hand",
          meta: "— beneath the bunk bed —",
          body: "father brought a new brother today. his name is aykut.\nmother was very happy. we are crowded now.\n\nmy brother aykut tried to run away. father was upset.\nnow my brother is always at the table, though he never speaks.\n\nfather says a family never shrinks, it always grows.\nnew arrivals take the place of those who departed before.\nwhen I grow up, I'm going to be a father too.\nfather says go down to the lower deck and establish your own family.\n\n(final line, a different, mature handwriting:)\nI went down. I established it. My name is now Deniz. — K-5" } },
        { type: "note", id: "not_cocukgunluk", title: "Deniz's Childhood", text: "The journal under the bunk belongs to Deniz[cite: 7]. Harun 'raised' him here, then Deniz descended below to establish 'his own family' on K-5[cite: 7]. This is how the family propagates: every child descends a floor when they grow up to become a new father[cite: 7]. A sick dynasty[cite: 7]." },
      ],
      choices: [
        { id: "fotograf", text: "Take the photograph", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    /* ================= COLD STORAGE — HEIRLOOM 2 (RING) + DEATH ================= */

    n_depo_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You stand before the heavy, steel door of the cold storage[cite: 7]. The freezing air seeping from the edges fogs your tablet screen[cite: 7]. The Chief strictly said 'do not enter' here[cite: 7]. One of PERISHED's unregistered death chambers, its door scratched from the inside, stands right before you[cite: 7]." },
        { type: "alert", text: "SENSOR ALARM — THE CHIEF IS CURRENTLY INSIDE! Even your tablet's microphone detects the meat-hacking sounds originating from within[cite: 7]. You cannot enter!", if: { flag: "sefNerede", equals: "depo" } },
      ],
      choices: [
        { id: "gir", text: "Crack the door open, step inside", next: "n_k4_depo", if: { flag: "sefNerede", equals: "depo", negate: true } },
        { id: "bekle", text: "Wait until the Chief exits (return to hallway)", next: "n_hol", if: { flag: "sefNerede", equals: "depo" } },
      ],
    },

    n_k4_depo: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "You crack the door and slide inside[cite: 7]. The interior of the storage is freezing[cite: 7]. Your breath converts into a dense cloud of vapor in the air, your fingers turning too numb to grip the tablet[cite: 7]. Looking up, the feeble light of your tablet illuminates human torsos suspended from the meat hooks on the ceiling... flayed, frozen corpses[cite: 7]. You have to avert your eyes or you will vomit[cite: 7]." },
        { type: "narrate", text: "A drainage hatch packed under a thick layer of ice rests on the back wall[cite: 7]. But first, you must locate that wedding ring[cite: 7]." },
      ],
      choices: [
        { id: "yuzuk", text: "Search the frozen boxes (wedding ring)", next: "n_depo_yuzuk", if: { flag: "yadigar2", equals: false } },
        { id: "kapak", text: "Examine the icy hatch on the back wall", next: "n_depo_kapak" },
        { id: "cik", text: "It's too cold — exit", next: "n_hol" },
      ],
    },

    n_depo_yuzuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "You scrape through frozen boxes, frozen piles of meat with your bare hands[cite: 7]. Your fingertips freeze, crack, and bleed[cite: 7]. Finally, you locate a rusted tin box[cite: 7]. Inside is a bloody wedding ring, a tuft of shed hair, and a note: 'Belonged to Sevgi[cite: 7]. I lost her but the family must grow... Everyone must take her place[cite: 7].' The origin of this madness lies sealed within this ring[cite: 7]." },
        { type: "flag", set: { yadigar2: true } },
        { type: "note", id: "not_yadigar2", title: "Heirloom 2/3: Wedding Ring", text: "Sevgi's wedding ring, inside a tin box in the cold storage[cite: 7]. Harun's wife is dead; all this 'family' lunacy is an attempt to fill her void[cite: 7]. The ring is the second heirloom for the chest[cite: 7]." },
      ],
      choices: [
        { id: "kapak", text: "Go to the hatch on the back wall", next: "n_depo_kapak" },
        { id: "cik", text: "Exit the storage", next: "n_hol" },
      ],
    },

    n_depo_kapak: {
      cost: 2,
      events: [
        { type: "narrate", text: "You scrape away the ice on the hatch with the edge of your tablet[cite: 7]. A frozen text emerges from beneath: 'K-3 EVACUATION — ONLY WITH VAULT KEY'.[cite: 7] You can escape down through here, but the key is locked inside the chest in that psychopath's room[cite: 7]. You must hurry, you are on the verge of freezing[cite: 7]." },
        { type: "note", id: "not_depokapak", title: "The K-3 Evacuation", text: "An evacuation hatch descending to K-3 rests behind the cold storage — but the 'vault key' is required[cite: 7]. The key is inside the locked chest in the Chief's room[cite: 7]. The chest demands three heirlooms[cite: 7]. The escape vector is clear: crack the chest, take the key, descend through here[cite: 7]." },
        { type: "objective", text: "Locate the three family heirlooms." },
      ],
      choices: [
        { id: "cik", text: "Exit the storage before freezing", next: "n_hol" },
      ],
    },

    /* ================= KITCHEN — The Chief's Place (Danger) ================= */

    n_mutfak: {
      cost: 1,
      events: [
        { type: "narrate", text: "You peer through the crack of the kitchen door[cite: 7]. The Chief is in there[cite: 7]! His back turned, he slams a giant cleaver onto the counter: SLAM! SLAM! SLAM![cite: 7] Blood splashing from the counter paints the wallpaper[cite: 7]. A savage rhythm[cite: 7].", if: { flag: "sefNerede", equals: "", negate: true } },
        { type: "narrate", text: "The kitchen is currently vacant, the Chief is in the child's room[cite: 7]. A giant cauldron boils on the stove, human hair erupting from within[cite: 7]. A massive meat cleaver is missing from the knife rack on the wall...[cite: 7]", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "The kitchen is empty, the Chief is in the storage[cite: 7]. You have a chance to examine the foul-smelling drawers under your tablet's light[cite: 7].", if: { flag: "sefNerede", equals: "depo" } },
        { type: "narrate", text: "The kitchen is empty, the Chief is in the dining hall[cite: 7]. Make it quick or he will corner you in here[cite: 7].", if: { flag: "sefNerede", equals: "salon" } },
      ],
      choices: [
        { id: "cabuk", text: "Rapidly search the vacant kitchen", next: "n_mutfak_ara", if: { flag: "sefNerede", equals: "", negate: true } },
        { id: "geri", text: "The Chief is in there — quietly withdraw", next: "n_hol", if: { flag: "sefNerede", equals: "" } },
      ],
    },

    n_mutfak_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "You dive into the vacant kitchen and rummage through the drawers[cite: 7]. Odors of oil, blood, and burned flesh[cite: 7]. You locate a shift logbook; its layout is still administrative, its contents a slaughterhouse[cite: 7]. Harun wrote human beings down as if keeping an execution registry[cite: 7]. Your assignment number is on the final page[cite: 7]. The box next to it is empty[cite: 7]. Death waits here like an uncompleted task[cite: 7]." },
        { type: "flag", set: { mutfakArandi: true } },
        { type: "document", open: true, doc: {
          id: "d_sefdefter", title: "The Chief's Shift Logbook",
          meta: "PERISHED · STATION CHIEF · H. OKUR",
          body: "JOINED THE FAMILY:\n\n· Aykut D. — 'persuaded' at the table. good son.\n· Nevin A. — resisted. transferred to the garden (K-3).\n· Selin ? — fled. still hunting her.\n· [your number] — [ ] not yet\n\nNOTE: Deniz established his own family below.\nI am proud. This one is next in line. If they eat\nat the table — child. If they refuse — ingredients.\n\nTHE WIRE WEDDING RING is still in storage. I couldn't\nbring Sevgi back, but I expanded the family.\nShe would have wanted it too. She would, wouldn't she?" } },
        { type: "note", id: "not_sefdefter", title: "The Chief's List", text: "Harun's logbook is arranged like a family album, only execution methods occupy the photo slots[cite: 7]. Aykut is at the table[cite: 7]. Nevin is in the garden[cite: 7]. Selin is missing[cite: 7]. My number is at the very bottom, its box empty[cite: 7]. A human can convert into two things here: a child or ingredients[cite: 7]. Both end up on the exact same table[cite: 7]." },
      ],
      choices: [
        { id: "cik", text: "Exit before the Chief returns", next: "n_hol" },
      ],
    },

    /* ================= THE CHIEF'S QUARTERS — THE CHEST (PIECE LOCK) ================= */

    n_sef_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You climb the creaking wooden stairs to the madman's room[cite: 7]. Rather than a room, this place is a twisted shrine decorated with the bones of victims[cite: 7]. Covers crafted from human skin line the walls[cite: 7]. A locked chest stands ahead, and atop it, an ominous object is preserved beneath a glass cloche[cite: 7]." },
        { type: "flag", set: { sefOdaAcik: true } },
      ],
      choices: [
        { id: "sandik", text: "Approach the chest", next: "n_sef_sandik" },
        { id: "fanus", text: "Inspect what is beneath the cloche", next: "n_sef_fanus", if: { flag: "fanusBakildi", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_sef_fanus: {
      cost: 1,
      events: [
        { type: "flag", set: { fanusBakildi: true } },
        { type: "narrate", text: "You bring your tablet's screen glare close to the glass cloche[cite: 7]. Inside rests a dried, bloody baby tooth and a strand of hair[cite: 7]. The label beneath reads: 'Deniz's first tooth[cite: 7]. A piece of him will always stay with me,'[cite: 7] This is the third heirloom[cite: 7]! But the wiring beneath the cloche links to a rig on the wall[cite: 7]. The moment you touch it, the mechanical alarms inside the house will detonate[cite: 7]!" },
        { type: "note", id: "not_fanus", title: "Heirloom 3/3: Baby Tooth", text: "Third heirloom: Deniz's baby tooth, inside a glass cloche in the Chief's room[cite: 7]. The cloche is alarmed — touching it alerts Harun[cite: 7]. The 'put him to sleep' note: I need to neutralize the Chief before taking the tooth[cite: 7]. Or I gamble on snatching it and running[cite: 7]." },
      ],
      choices: [
        { id: "al", text: "Smash the cloche, snatch the tooth (The Chief will come)", next: "n_fanus_al" },
        { id: "birak", text: "Don't touch it for now, back away", next: "n_sef_kapi" },
      ],
    },

    n_fanus_al: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You strike and shatter the glass cloche[cite: 7]! Sharp shards slash your hand, blood smudging onto the tablet[cite: 7]. That exact moment, the ear-tearing, crazed roar of the monster erupts from the loudspeakers in every corner of the house: \"YOU TOUCHED MY SACRED SANCTUM! I WILL TEAR YOU TO PIECES!\"[cite: 7] Fast, thumping footsteps come rushing up the stairs...[cite: 7] You snatch the tooth and bolt[cite: 7]!" },
        { type: "flag", set: { yadigar3: true, sefKizgin: true, sefNerede: "sef_odasi" } },
        { type: "stat", stat: "sefFarkindalik", delta: 25, note: "THE CHIEF WENT INSANE — HE IS SPRINTING HERE!", noteKind: "alert" },
        { type: "alert", text: "⚠ THE MONSTER IS ON THE STAIRS — THERE IS NO PLACE TO HIDE, SPRINT OR DIE!" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "yatak", text: "Dive beneath the bed", next: "n_fanus_yatak" },
        { id: "kos", text: "Sprint down the stairs, bypass him, dash to the hallway", next: "n_fanus_kos", default: true },
      ],
    },

    n_fanus_yatak: {
      events: [
        { type: "narrate", text: "You hurl yourself beneath the bed that reeks of rot[cite: 7]. You tuck your tablet screen into your clothes, staying in absolute dark[cite: 7]. The door flies open as if shattered[cite: 7]! Colossal boots enter, shaking the floor[cite: 7]. He hacks left and right with his cleaver, splintering wooden furniture[cite: 7]. He pants, salivating out of his mouth: \"I can smell your scent... you ate my wife's flesh, you smell like us! Come out!\"[cite: 7] He bends down toward the floor right in front of you[cite: 7]!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9500, success: "n_fanus_kurtul", fail: "n_olum_yatak" },
    },

    n_olum_yatak: {
      death: true,
      deathText: "Your lungs explode beneath the bed, you give out a choking gasp[cite: 7]! Harun's stapled face of dread manifests beneath the frame[cite: 7]. A giant hand grabs your ankle and drags you out in a single motion[cite: 7]! As you strike the wall and lose consciousness, you feel the cleaver burying into your rib cage[cite: 7]. \"New ingredients ready!\"[cite: 7]",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fanus_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "The boots halt, snarling as they bolt out of the room into the corridor[cite: 7]. He thinks you fled[cite: 7]! You crawl out from beneath the bed, your clothes caked in the blood of previous victims[cite: 7]. Gripping your tablet, you quietly slide down to the hallway[cite: 7]. The tooth is in your pocket, all three heirlooms are ready[cite: 7]." },
        { type: "flag", set: { sefNerede: "" } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "sandik", text: "Return to open the chest", next: "n_sef_sandik" },
        { id: "hol", text: "Descend to the hallway", next: "n_hol" },
      ],
    },

    n_fanus_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "You sprint down the stairs like crazy[cite: 7]! You crash face-to-face into the Chief halfway down, the warm saliva of his disgusting stitched face splashing onto you[cite: 7]! He swings the cleaver, tearing your jacket, but you slip beneath his arms with a agile move and tumble into the hallway[cite: 7]. Your heart is ready to pierce your chest, the tablet slipping from your hand and slamming against the iron banister[cite: 7]! Alongside the sound of cracking glass, a massive fracture line stretches across the left corner of the screen...[cite: 7]" },
        { type: "glitch", ms: 900 },
        { type: "flag", set: { sefNerede: "sef_odasi", tabletKirik: true } },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — You felt the breath of death against your face!", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15 },
      ],
      choices: [
        { id: "sandik", text: "Go to open the chest (The Chief is still searching upstairs)", next: "n_sef_sandik" },
      ],
    },

    n_sef_sandik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You stand before the chest[cite: 7]. Three slots and rusted mechanical rings sit upon it[cite: 7]. You need to place the fragments and complete this morbid family's crest[cite: 7]. How many pieces do you hold[cite: 7]?" },
        { type: "alert", text: "CLOSED AND LOCKED — Missing pieces! Without locating the photograph, wedding ring, and baby tooth, this chest will not open!", if: { flag: "yadigar3", equals: false } },
        { type: "narrate", text: "All three bloody heirlooms are in your hands[cite: 7]. You slot the photograph, wedding ring, and tooth into the receptors[cite: 7]. The mechanism of the chest stands ready to rotate, groaning with rusted gears[cite: 7].", if: { flag: "yadigar3", equals: true } },
      ],
      choices: [
        { id: "coz", text: "Rotate the glass panel — complete the crest", next: "n_sandik_puzzle", if: { flag: "yadigar3", equals: true } },
        { id: "ara", text: "Return to search for the missing heirlooms", next: "n_hol", if: { flag: "yadigar3", equals: false } },
        { id: "cik", text: "Leave the chest, return to the hallway", next: "n_hol", if: { flag: "yadigar3", equals: true } },
      ],
    },

    n_sandik_puzzle: {
      cost: 1,
      events: [
        { type: "narrate", text: "The heirlooms released the locks[cite: 7]. Now use your fingers to turn the rusted steel rings, assembling the decayed mahr of this cannibal dynasty[cite: 7]." },
      ],
      interaction: {
        kind: "rings",
        title: "OKUR CHEST — ASSEMBLE THE FAMILY CREST",
        rings: [
          { color: "#8a6a3a", step: 30, offset: 120 },
          { color: "#6a3a3a", step: 45, offset: 225 },
          { color: "#3a5a6a", step: 40, offset: 160 },
        ],
        pieces: [
          { flag: "yadigar1", ring: 0, shard: 2, fig: 0 },
          { flag: "yadigar2", ring: 1, shard: 4, fig: 1 },
          { flag: "yadigar3", ring: 2, shard: 6, fig: 2 },
        ],
        success: "n_sandik_acik",
        cancel: "n_sef_sandik",
      },
    },

    n_sandik_acik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "OKUR CHEST: OPENED" },
        { type: "narrate", text: "The chest pops open like a heavy coffin lid[cite: 7]. Rather than an odor of decay, a concealed family history hits your face[cite: 7]. The vault key and batteries rest right at the top; even the escape tools are buried beneath heirlooms here[cite: 7]. At the very bottom lies a letter written in blood[cite: 7]. Harun's madness didn't begin with a scream[cite: 7]. First he wrote a letter, then he gathered human beings[cite: 7]." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { ambarAnahtari: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_sefmektup", title: "The Chief's Letter (unsent)", style: "hand",
          meta: "— folded at the bottom of the chest —",
          body: "To Sevgi,\n\nWhen I lost you, the station died with me.\nBut I found it — below, the Artifact at K-2.\nIt gives us back the family. It holds everyone\ntogether. When they hear its voice, everyone stops,\ncounts, and belongs.\n\nI raised Deniz. He went down below too, established\nhis own family. I continue to expand it.\nEven without you, the family grows.\n\nIf you ever descend to the Artifact — thank it.\nIt brought us back together.\n\n— H." } },
        { type: "note", id: "not_sefmektup", title: "The Artifact — K-2", text: "The Chief's letter connects everything: the 'Artifact' at K-2 is the source of all this[cite: 7]. When they hear its voice, everyone 'stops, counts, and belongs' — those counting in their sleep, the lullaby, 432 Hz[cite: 7]. The family is built around it[cite: 7]. The vault key is in my hand; I can descend to K-3 from the cold storage[cite: 7]." },
        { type: "objective", text: "Descend to K-3 from the cold storage." },
      ],
      choices: [
        { id: "depo", text: "Head to the cold storage", next: "n_final_yol" },
      ],
    },

    /* ================= FINAL — ESCAPE FROM STORAGE ================= */

    n_final_yol: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k4b" },
        { type: "narrate", text: "The moment you step down into the hallway, the entire house floods with a crimson hell light[cite: 7]! The loudspeakers explode with static, and Harun's savage wail, proving his complete descent into madness, rattles the home: \"YOU TOOK MY KEY! YOU STOLE HIS MOTHER'S RING! I WILL NOT LET YOU LIVE!\"[cite: 7] The baits are spent now, he will hunt you by your scent[cite: 7]!" },
        { type: "alert", text: "⚠ YOU DID NOT EAT THAT MEAT! HE CAUGHT YOUR SCENT AND WENT WILD WITH RAGE — SPRINT TOWARD THE STORAGE!", if: { flag: "sofraReddetti", equals: true } },
        { type: "narrate", text: "The cold storage is at the very end of the corridor[cite: 7]. As the light of your tablet shakes from the tremors, you see that the single obstacle ahead is that colossal cannibal[cite: 7].", if: { flag: "sofraReddetti", equals: false } },
        { type: "narrate", text: "That bite in your stomach is heavy as stone, the monster howling: \"You smell of us but you are a thief!\"[cite: 7] There is no choice but to run[cite: 7]. Sprint to the storage[cite: 7]!", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Sprint across the hallway, reach the cold storage", next: "n_final_kos" },
        { id: "atla", text: "Try to leap over the broken cabinet as a shortcut", next: "n_final_atla" },
      ],
    },

    n_final_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "YOU SPRINT LIKE MAD[cite: 7]! The sound of your strides echoes through the house[cite: 7]. Harun manifests right in the middle of the hallway with his colossal frame, his cleaver hoisted into the air as he rasps: \"Come son... your father will embrace you!\"[cite: 7]" },
      ],
      interaction: {
        kind: "chase",
        title: "K-4 ESCAPE HALLWAY",
        enemy: "CHIEF HARUN",
        success: "n_final_siyril",
        fail: "n_olum_final",
        startDanger: 38,
        phaseMs: 1200,
        hints: {
          patrol: "The Chief is far off, scraping his cleaver against the deck. Sprint to the storage immediately![cite: 7]",
          search: "He fixed his eyes on you, searching. Hide behind the broken shelves![cite: 7]",
          near: "You can smell his scent! Hold your breath, or he will butcher you like an ungrateful wretch![cite: 7]"
        }
      }
    },

    n_final_siyril: {
      cost: 1,
      events: [
        { type: "narrate", text: "Slamming against the wall, you slip right beneath the arm wielding the cleaver[cite: 7]! The cleaver splinters the structure of the wall, wood dust stinging your face[cite: 7]. Reaching the cold storage door, you frantically jam the key into that fogged, frozen lock like crazy[cite: 7]." },
      ],
      choices: [
        { id: "in", text: "Turn the key, descend from storage to K-3", next: "n_k4_son" },
      ],
    },

    n_final_atla: {
      cost: 1,
      events: [
        { type: "narrate", text: "You leap atop the locker but the deck is so slick with the blood of victims that your foot slips[cite: 7]! You crash flat onto the floor, the tablet flying out of your grip and sliding away[cite: 7]. Right then, a colossal hand snatches your ankle and begins dragging you across the deck[cite: 7]!", if: { flag: "sofraYedi", equals: false } },
        { type: "narrate", text: "You leap rapidly over the locker[cite: 7]. Just as the Chief is about to bring down the cleaver, he sniffs the air — that scent of human flesh on you paralyzes his instincts for a split second[cite: 7]! That millisecond pause saves your life; you cross to the other side of the locker and bolt into the storage[cite: 7].", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "in", text: "Reach the storage door, turn the key", next: "n_k4_son", if: { flag: "sofraYedi", equals: true } },
        { id: "tut", text: "You've been caught — try to break free", next: "n_olum_final", if: { flag: "sofraYedi", equals: false } },
      ],
    },

    n_olum_final: {
      death: true,
      deathText: "Your ankle is crushed inside his calloused palm[cite: 7]. \"I caught you, ungrateful child!\"[cite: 7] Ignoring your screams, he drags you across the deck back to that bloody table...[cite: 7] You are hurled face-up onto the wood[cite: 7]. As the cleaver ascends, the final thing you see is the sickly blue light hitting the ceiling from your tablet's inverted screen in the corner[cite: 7]. \"Our home will always grow...\"[cite: 7]",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_k4_son: {
      cost: 1,
      events: [
        { type: "system", text: "VAULT HATCH: OPENED — DESCENT TO K-3" },
        { type: "narrate", text: "You turn the key frantically in the lock, the hatch breaking open with a massive groan[cite: 7]. From below, a wave of sharp decay, wet soil, and botanical scent hits your face[cite: 7]. You hurl yourself down, pulling the hatch shut above you and sliding the deadbolt[cite: 7]! That exact moment, colossal impacts begin striking the hatch — BOOM[cite: 7]! BOOM[cite: 7]! The steel warps but the bolt holds[cite: 7]. Then the blows cease[cite: 7]." },
        { type: "waitTap" },
        { type: "ambient", text: "Right behind the hatch, that monster's tearful, schizophrenic voice ascends: \"...Everyone abandons me[cite: 7]. Sevgi left... Deniz went below... and you fled too[cite: 7]. Am I always to remain all alone at this table?\"[cite: 7] Then a deep, ominous silence falls[cite: 7]." },
        { type: "ambient", text: "Ece's rasping voice comes from the tablet's speaker: «My god... I heard those sounds[cite: 7]. You made it... you descended to K-3[cite: 7]. That's Dr[cite: 7]. Nevin's laboratory floor... biologist[cite: 7]. She might not have gone mad like that guy... Watch out, strange things are breathing down there...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "narrate", text: "You descend the rungs down into absolute darkness[cite: 7]. Your tablet light catches twitching botanical masses below; not vines, but like waiting veins[cite: 7]. K-4 tried to draft you into the family[cite: 7]. The place below will draft you into the soil[cite: 7]. This station converts a human into a different word on every floor: personnel, child, specimen[cite: 7]. Now, you are going to learn the next word[cite: 7]." },
      ],
      choices: [
        { id: "k3", text: "Descend into K-3", next: "n_k3_giris", loading: true },
      ],
    },

  },
};

export const EP03_FLAGS = {
  vitrayCozuldu: false,
  sofraYedi: false, sofraSakladi: false, sofraReddetti: false,
  holIlk: false, interkomIlk: false, cocukRanza: false,
  mutfakArandi: false, fanusBakildi: false, sefOdaAcik: false,
  cocukBitti: false,
  sefNerede: "", yemCocuk: false, yemDepo: false, yemSalon: false,
  yadigar1: false, yadigar2: false, yadigar3: false,
  sefKizgin: false, ambarAnahtari: false,
};