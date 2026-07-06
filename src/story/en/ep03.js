/* ============================================================
   LEVEL-1 — CHAPTER 3: "L-4 / HOME" (full version)
   Floor Owner: CHEF HARUN OKUR — station chef, the father of the "Family."
   (Deniz is his son: in EP02, he said "Say hello to my father.")

   TONE: OUTLAST + RE7 Baker house + dinner table horror. The floor is organized like a HOUSE:
   dining hall, kitchen, children's room, chef's room, cold storage,
   intercom niche. Harun PATROLS the house; he hunts not by sound, but by habit
   — he knows where you should be and finds what is "out of place."

   MAIN MECHANIC — BAIT / INTERCOM:
   · From the intercom niche, you direct the sound to another room → Harun
     goes to that room → you move into the vacated space. If you choose the wrong room
     (if Harun is already there), you give yourself away.

   PART-LOCK: The locked chest in the chef's room requires three FAMILY HEIRLOOMS
   (photo, ring, baby tooth) — scattered across three rooms. Once all three are collected
   and the chest is opened, the 'hatch key' is revealed; the descent to L-3 opens with it.

   MANDATORY DINNER TABLE SCENE: Harun makes you sit down for a "family dinner."
   What you do (eat / refuse / escape) carries consequences.

   CARRIED STATE (from EP01-02):
   · eceEleVerildi → Ece helps / does not help through the intercom
   · sefFarkindalik → Harun's initial aggressiveness
   · denizSoruldu → Deniz leaking into L-4 announcements
   ============================================================ */

export const EP03 = {
  nodes: {

    /* ================= INTRODUCTION — THE THRESHOLD OF THE HOUSE ================= */

    n_k4_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k4" },
        { type: "system", text: "FLOOR: L-4 — PERSONNEL LIVING AREA · MESS HALL · CABINS" },
        { type: "narrate", text: "You climb up through the vent cover into a house. But this is not a home; it's a slaughterhouse built in the middle of a mental asylum. Rustling floral wallpapers are pasted over the steel walls, and thick carpets are laid on the floor. The only thing in your hand is a dim tablet, its raw and pixelated light illuminating your face. The light of the tablet is not enough to rip through the pitch blackness; it is too weak to expose the smell of rust and sewage coming from behind the wallpapers, the rot bloated from humidity." },
        { type: "narrate", text: "Ahead, in the absolute darkness of the corridor, stretches a long dining table. Twelve chairs. And at the head of the table, sitting motionless with his back turned to you, is that massive, hunched torso. He taps his fork against a rusty, empty plate: click. Click. Click. This metallic sound echoing in the darkness whispers that you will be the next victim." },
        { type: "waitTap" },
        { type: "ambient", text: "Ece's trembling whisper from the tablet's speaker is cut by static noise: «So you made it up there... L-4. The floor of that monster. Whatever you do, don't shine your light directly at him... Cough twice if you can hear me — I've patched the line into the L-4 intercoms.»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The glowing glass screen of the tablet is silent in your pocket. Ece might have connected the line, but she is not speaking to you. You are completely alone. There is only the charge of your tablet and the darkness.", if: { flag: "eceEleVerildi", equals: true } },
        { type: "objective", text: "Find a way out of this floor" },
        { type: "note", id: "not_ev", title: "L-4: Home", text: "The floor has been turned into a house — wallpaper, carpet, chandelier. Someone is sitting at the head of the table, tapping a fork against an empty plate. Deniz had said 'say hello to my father.' This must be Chef Harun. The father of the family." },
      ],
      choices: [
        { id: "yaklas", text: "Quietly approach the table", next: "n_sofra_ilk" },
        { id: "geri", text: "Try to go back through the vent cover", next: "n_baca_kilit" },
      ],
    },

    n_baca_kilit: {
      cost: 1,
      events: [
        { type: "narrate", text: "You turn back and push the hatch like crazy — but it's locked from the outside with heavy bolts! L-5 won't take you back; you are trapped. From below, out of those deep shafts, Deniz's speaker crackles as if insane: 「I told you... Up there is not mine. My father cuts down everything that is out of place.」 In the spiral of terror, there is only one direction: forward." },
      ],
      choices: [
        { id: "yaklas", text: "Approach the table", next: "n_sofra_ilk" },
      ],
    },

    /* ================= MANDATORY DINNER TABLE SCENE ================= */

    n_sofra_ilk: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You extend the weak screen light of your tablet forward with trembling hands to see ahead. As you approach the table, that massive body grows even larger in the darkness, its shadow casting on the wall like a demon. Then, before you can even take a breath, the sounds of the fork cut off like a knife. That muffled, guttural, savage fatherly voice shakes the room:" },
        { type: "narrate", text: "\"You're late.\" He doesn't turn around. \"In a family, dinner is eaten together. Sit down. Your plate is ready.\" In front of the chair, indeed, sits a rusty plate — covered, with a heavy, nauseating meat steam rising from it." },
        { type: "waitTap" },
        { type: "alert", text: "There is no escape — the only exit from the corridor is behind this psychopath. You need to sit down." },
      ],
      choices: [
        { id: "otur", text: "Sit on the chair", next: "n_sofra_otur" },
        { id: "kac", text: "Turn around and run into the corridor", next: "n_sofra_kac" },
      ],
    },

    n_sofra_kac: {
      cost: 1,
      events: [
        { type: "narrate", text: "You turn around and run like mad into the darkness — at that moment, the dim light on the ceiling pops. Pitch black. Only that sickly blue light emitted by your tablet remains. Just then, a massive, calloused hand smelling of meat clamps down on your neck from behind and lifts you into the air with immense strength, slamming you onto the chair! Your bones creak. That calm voice, yet on the brink of madness, finishes right by your ear: \"No escaping the family dinner table, son. Try that again, and I'll cut off your legs.\"" },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — Your eyes witnessed terror in the darkness, your heart is at a standstill!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 10 },
        { type: "narrate", text: "The dim chandelier flickers back on. You sit trembling in the chair. The plate stands right in front of you. He is at the head of the table, as if he never left his spot, but his heavy breathing fills the room." },
      ],
      choices: [
        { id: "devam", text: "Look at the plate", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_otur: {
      cost: 1,
      events: [
        { type: "narrate", text: "You sit helplessly on the cold chair. The freezing cold of the steel seeps through your trousers into your flesh, just like that helplessness that seeped into the bones of the others. The giant at the head of the table turns slowly toward you for the first time... but the upper part of his face is in darkness; only the line of his crooked jaw and a crazy eyeball, wetly glistening in the light of your tablet, are visible." },
        { type: "narrate", text: "\"Good. See how easy that was?\" He drives the rusty fork into the table. \"Now eat. Your mother prepared it for you. We've been looking for fresh ingredients for days.\"" },
      ],
      choices: [
        { id: "devam", text: "Look at the plate", next: "n_sofra_tabak" },
      ],
    },

    n_sofra_tabak: {
      cost: 1,
      events: [
        { type: "narrate", text: "With fingers trembling from fear, you lift the lid of the plate. Inside... are steaming, seasoned chunks of meat resembling human limbs. The smell is terrifyingly good, and it brings you to the brink of vomiting because you are hungry! Right at the edge of the plate, glistening among the bloody grease, is a small personnel dog tag: 'AYKUT D., technician'." },
        { type: "note", id: "not_kunye", title: "Dog tag on the plate", text: "There was a personnel dog tag next to the plate — 'AYKUT D., technician'. Next to the meat. I won't think about it. I can't think about it." },
        { type: "waitTap" },
        { type: "narrate", text: "\"Eat,\" he says, his voice turning into a deep growl this time. \"Refusing... upsets your mother. And believe me, if she gets upset, I will paint this table with your blood.\" You lift the fork. The moment your sanity hangs by a thread." },
      ],
      choices: [
        { id: "ye", text: "Take a bite — to survive", next: "n_sofra_ye" },
        { id: "sakla", text: "Pretend to eat, hide the bite", next: "n_sofra_sakla" },
        { id: "reddet", text: "Put down the fork — \"I won't eat this.\"", next: "n_sofra_reddet" },
      ],
    },

    n_sofra_ye: {
      cost: 1,
      events: [
        { type: "narrate", text: "You close your eyes tightly and put that raw, human meat into your mouth. You chew. The tissues crushing between your teeth turn your stomach inside out; you squeeze your throat to avoid vomiting. You swallow. The Chef's perverted face in the shadow relaxes, his lips curling upward: \"There... There is my beautiful child. You are part of our family now.\"" },
        { type: "flag", set: { sofraYedi: true } },
        { type: "stat", stat: "akil", delta: -15, note: "SANITY -15 — You chewed the flesh of a human. The threshold of no return has been crossed!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: -15, note: "The Chef has begun to trust you", noteKind: "system" },
        { type: "narrate", text: "\"Your stomach is full. Now, chores.\" He stands up — standing almost like a massive boulder. \"I'll prepare the new ingredients in the kitchen. You clean up around here. But don't you dare enter my room upstairs. And that cold storage... if you enter it, I will hang you on those hooks alive.\" He walks toward the kitchen with heavy, dragging steps." },
      ],
      choices: [
        { id: "devam", text: "Get up from the table", next: "n_hol" },
      ],
    },

    n_sofra_sakla: {
      cost: 1,
      events: [
        { type: "narrate", text: "You bring the piece of meat to your mouth, closing your lips and letting the disgusting fluid flow from your fingers as you squeeze the bite into your palm, and from there into your pocket. Moving your jaw with large motions, you fake a swallow. The Chef watches you under the light of your tablet with his wet and crazy eye... Your heart beats as if it's going to tear through your ribcage." },
        { type: "narrate", text: "Then he slowly nods his head. \"...Good boy. I like children who listen.\" Your trick worked, but the warm blood leaking from your pocket stains your jacket. \"Your stomach is full. Tend to the chores. Don't enter my room, don't enter the cold storage.\" He goes to the kitchen with heavy steps." },
        { type: "flag", set: { sofraSakladi: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "devam", text: "Get up from the table", next: "n_hol" },
      ],
    },

    n_sofra_reddet: {
      cost: 1,
      events: [
        { type: "narrate", text: "You fling the fork onto the plate. The clinking of the metal echoes in that ominous room. \"I won't eat this,\" you say, your voice trembling. A deadly silence falls. The Chef leaps up, and the dim light of your tablet hits his face... You wish you hadn't looked. The right half of his face is completely flayed; in its place, a bruised piece of flesh from another victim has been stitched and attached with rusty staples!" },
        { type: "stat", stat: "akil", delta: -18, note: "SANITY -18 — That stapled, rotting face will haunt your dreams!", noteKind: "alert" },
        { type: "stat", stat: "sefFarkindalik", delta: 20, note: "The CHEF is offended by you — he is watching you now", noteKind: "alert" },
        { type: "flag", set: { sofraReddetti: true } },
        { type: "narrate", text: "\"You insulted your mother's food!\" he roars, but his voice suddenly drops to a whisper — this sudden transition is the height of madness. \"In this house, ungrateful people are flayed. But I'm in no hurry... You're here all night, right in the palm of my hand.\" He turns back to the kitchen with heavy steps. \"Clean up. Don't enter my room. Don't enter the cold storage. And get it into your head... that you can never escape from me.\"" },
      ],
      choices: [
        { id: "devam", text: "Get up from the table", next: "n_hol" },
      ],
    },

    /* ================= MAIN: HOME HALLWAY (HUB) ================= */

    n_hol: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are in the hallway of the house. The dim light of the tablet in your hand hits the framed 'family photos' hanging on the wall. The faces of the people in the photos have been scraped off with a knife, and crooked, massive smiles have been drawn over all of them with blood-red ink. A maniacal piece of handiwork.", if: { flag: "holIlk", equals: false } },
        { type: "flag", set: { holIlk: true } },
        { type: "status", items: [
          { label: "PHOTO", flag: "yadigar1" },
          { label: "RING", flag: "yadigar2" },
          { label: "BABY TOOTH", flag: "yadigar3" },
        ] },
        { type: "ambient", text: "Sounds of a cleaver and bone-crushing noises come from the kitchen — the Chef is chopping something up there. The weak glow on your tablet screen illuminates five dark doors ahead of you: kitchen, children's room, chef's room upstairs, cold storage, and that narrow intercom niche." },
      ],
      choices: [
        { id: "cocuk", text: "Enter the room where cartoon sounds are coming from", next: "n_cocuk", if: { flag: "cocukBitti", equals: false } },
        { id: "interkom", text: "Go to the intercom niche on the wall", next: "n_interkom" },
        { id: "sef", text: "Go upstairs to the locked room", next: "n_sef_kapi" },
        { id: "depo", text: "Approach the heavy door leaking cold air", next: "n_depo_kapi" },
        { id: "mutfak", text: "Glance into the kitchen (The Chef is there)", next: "n_mutfak" },
        { id: "vitray", text: "Examine the stained glass panel above the sofa", next: "n_vitray_panel", if: { flag: "vitrayCozuldu", equals: false } },
        { id: "sandik", text: "Try to open the chest in the chef's room", next: "n_sef_sandik", if: { flag: "sefOdaAcik", equals: true } },
      ],
    },

    /* NEW: family stained glass — colorgrid puzzle (color pattern) */
    n_vitray_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "On the wall of the hallway stands a panel made of stained glass. This is an old family portrait. But the glasses are broken, patched with wrong, sickly colors as if blood had splattered onto them. The faces are like a nightmare painting mixed together. Just below the panel, Deniz's childish but shaky handwriting is carved: 'My mother knows the right colors. I forgot. My father turned into a monster.' If you bring the colors to the correct pattern, the secret recess behind will open." },
        { type: "note", id: "not_vitray", title: "Family stained glass", text: "The stained glass family portrait in the hallway is patched with the wrong colors. I need to bring it to the correct pattern — touching the cells changes the color. Deniz's note: the correct colors are his mother's memory. There is a recess behind it." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "FAMILY STAINED GLASS — REPAIR PATTERN",
        palette: ["#2a2a30", "#b23a3a", "#c2a24a", "#3a6a9a", "#5a9a6a"],
        target: [0,3,3,0, 3,1,1,3, 2,1,1,2, 0,4,4,0],
        start:  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
        cols: 4,
        success: "n_vitray_cozuldu",
        cancel: "n_hol",
      },
    },

    n_vitray_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "STAINED GLASS: COMPLETED" },
        { type: "narrate", text: "When the last piece clicks into place, the panel swings backward with a click. The raw light of your tablet strikes the dusty recess behind. Inside, there is a life-saving spare battery and an old, wrinkled piece of paper. You quickly read the note." },
        { type: "flag", set: { vitrayCozuldu: true } },
        { type: "battery", spares: 1 },
        { type: "document", open: true, doc: {
          id: "d_anne", title: "Mother's Note", style: "hand",
          meta: "— in the recess behind the stained glass —",
          body: "My Deniz,\n\nHis father has changed. Ever since they found that\nthing below. Now, when he says 'family', he means\nsomething completely different. He wants to include you too.\n\nI made this panel for you — if you remember the\nright colors, I will know you are still my son.\nEscape. Go upstairs. Don't wait for me.\n\n— Your Mother" } },
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
        { type: "narrate", text: "An old, rusty intercom panel embedded in the wall. The speakers in every room of the house are connected to this damned mechanism. If you send a sound wave to a room from here, that maniac Chef will direct his steps there. This is your only card to manipulate him.", if: { flag: "interkomIlk", equals: false } },
        { type: "flag", set: { interkomIlk: true } },
        { type: "document", open: true, if: { flag: "interkomIlk", equals: false }, doc: {
          id: "d_interkom", title: "Intercom Usage Note (handwritten)", style: "hand",
          meta: "— pinned inside the niche, written in a hurry —",
          body: "LISTEN, whoever finds this:\nFather follows the sound. Give sound to a room,\nhe goes there. While he goes, move to the OTHER room.\n\nBUT: don't give sound to the room he is already in —\nhe will hear you, and understand where it came from.\nHe is in the kitchen. Send the sound ELSEWHERE.\n\nThree heirlooms are needed for the door:\n- photo: in the child's room\n- ring: in cold storage (careful)\n- tooth: in his pocket. put him to sleep.\n         — the previous 'child'" } },
        { type: "note", id: "not_interkom", title: "Bait system", text: "Intercom: send sound to a room, the Chef goes there, I move to the vacated room. BUT if I send sound to the room the Chef is already in, he will notice me. Three heirlooms: photo (children's room), ring (cold storage), tooth (Chef's pocket — I need to put him to sleep)." },
      ],
      choices: [
        { id: "cocuga", text: "Send sound to the children's room (bait)", next: "n_yem_cocuk" },
        { id: "depoya", text: "Send sound to cold storage (bait)", next: "n_yem_depo" },
        { id: "salona", text: "Send sound to the dining hall (bait)", next: "n_yem_salon" },
        { id: "geri", text: "Exit the niche, return to the hallway", next: "n_hol" },
      ],
    },

    n_yem_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "You press the children's room button and tap the microphone hard. The cleaver sounds in the kitchen stop instantly like a knife. Heavy, clumsy but deadly steps strike the hallway. A guttural voice rises from the corridor: \"...Who's there? My baby? Deniz? Did you hide in the closet again?\" He goes there." },
        { type: "flag", set: { yemCocuk: true, sefNerede: "cocuk" } },
        { type: "system", text: "CHEF: WENT TO THE CHILDREN'S ROOM — it is no longer EMPTY, he is there" },
        { type: "ambient", text: "Now the kitchen and cold storage are emptied. But it would be madness to go take that photo in the children's room; because that monster is there right now, sniffing the darkness." },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway and use the vacated space", next: "n_hol" },
      ],
    },

    n_yem_depo: {
      cost: 1,
      events: [
        { type: "narrate", text: "You press the cold storage button. You simulate a crackling scream sound from the speaker. A grunt breaks out from the kitchen: \"Who the hell is tampering with the storage door again!\" Heavy steps head toward the cold storage, the rusty keys on his belt jingling." },
        { type: "flag", set: { yemDepo: true, sefNerede: "depo" } },
        { type: "system", text: "CHEF: WENT TO COLD STORAGE — kitchen and upstairs are now empty" },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway", next: "n_hol" },
      ],
    },

    n_yem_salon: {
      cost: 1,
      events: [
        { type: "narrate", text: "You press the dining hall button and send the creak of an empty plate. \"...Did you come back for dinner, son? Good... I'm coming, I'll refresh the meat,\" he says, heading toward the hall." },
        { type: "flag", set: { yemSalon: true, sefNerede: "salon" } },
        { type: "system", text: "CHEF: WENT TO THE DINING HALL — kitchen, storage, and upstairs are empty" },
      ],
      choices: [
        { id: "hol", text: "Return to the hallway", next: "n_hol" },
      ],
    },

    /* ================= CHILDREN'S ROOM — heirloom 1 (photo) ================= */

    n_cocuk: {
      cost: 1,
      events: [
        { type: "narrate", text: "From the children's room, a crackling cartoon music coming from a broken television rises — the same terrifying three-second melody spins in an endless loop. There are height lines on the wall next to the bunk bed, but this is not a child's development... The names of different victims are carved from bottom to top, and the note 'Child' has been brutally dropped next to all of them.", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "alert", text: "MOMENT OF TERROR BY A HAIR'S BREADTH — THE CHEF IS HERE! If the light of your tablet hits the wall, you're dead! GET OUT IMMEDIATELY!", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "The cartoon melody spreads into the room from the broken tape. On the nightstand, there is a frame with cracked glass, covered in dried blood stains. You aim the dim glow of your tablet at the frame.", if: { flag: "sefNerede", equals: "cocuk", negate: true } },
      ],
      choices: [
        { id: "kac_c", text: "Get out immediately — he is here", next: "n_cocuk_yakalandi", if: { flag: "sefNerede", equals: "cocuk" } },
        { id: "fotograf", text: "Take the photo with the cracked frame", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "arastir", text: "Look under the bunk bed", next: "n_cocuk_ranza", if: { flag: "cocukRanza", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_yakalandi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You dash toward the door, but that massive shadow has already blocked the threshold! There is no flashlight or light source; the blue screen of your tablet illuminates his stapled, sweaty, and bloody face. He fixes his crazy eyes on you: \"So you came to your room, naughty boy... Children should wait quietly in their rooms at night!\" He locks the heavy steel door behind him!" },
        { type: "stat", stat: "akil", delta: -10 },
      ],
      choices: [
        { id: "sakla", text: "Squeeze under the bunk bed, hold your breath", next: "n_cocuk_nefes" },
      ],
    },

    n_cocuk_nefes: {
      events: [
        { type: "narrate", text: "Pressing your tablet screen against your chest to completely smother the light, you slide into the filth and dried blood under the bunk bed. Massive boots enter the room. His heavy, wheezing breath is right above you. He steps on a plastic toy on the floor — crunch! He stops... He slowly bends down toward the floor, the heavy smell of meat filling your nose." },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9500, success: "n_cocuk_kurtul", fail: "n_olum_cocuk" },
    },

    n_olum_cocuk: {
      death: true,
      deathText: "Your breath bursts under the bunk bed; you gasp with a sob! At that moment, a massive, hairy hand darts out from the darkness, grabs you by the hair, and flings you out, pulling you away! Your head slams against the iron of the bunk bed. \"I found you, little mouse. Hide and seek is over!\" The cleaver rises into the air, and everything goes black accompanied by the cartoon music.",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_cocuk_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "The boots finally head toward the door and exit the room. \"...Whatever, we'll play later,\" he whispers from the corridor. You crawl out from under the bunk bed that smells of urine and sweat. Your heart is practically beating in your ears, your tablet screen soaked with your sweat." },
        { type: "flag", set: { sefNerede: "", cocukBitti: true } },
        { type: "stat", stat: "akil", delta: -5 },
      ],
      choices: [
        { id: "fotograf", text: "Take the photo", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_foto: {
      cost: 1,
      events: [
        { type: "narrate", text: "You rip the photo out of the cracked frame. In the photo, a young Harun, who hasn't yet gone mad and turned into a monster, stands next to a clean-faced woman and a little child. You turn it over and read it under the tablet light: 'Harun, Sevgi, little Deniz — 2009.' So this nightmare was a real family once..." },
        { type: "flag", set: { yadigar1: true } },
        { type: "note", id: "not_yadigar1", title: "Heirloom 1/3: Photo", text: "Family photo: Harun, his wife Sevgi, and little DENIZ — 2009. Deniz is indeed Harun's son. This family was real once. This is one of the three heirlooms for the chest." },
      ],
      choices: [
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_cocuk_ranza: {
      cost: 1,
      events: [
        { type: "flag", set: { cocukRanza: true } },
        { type: "narrate", text: "Among the dust and filth under the bunk bed, you find an old, stained child's diary. The writings are childish on the first pages, but toward the end, they turn completely schizophrenic." },
        { type: "document", open: true, doc: {
          id: "d_cocukgunluk", title: "A Child's Diary", style: "hand",
          meta: "— under the bunk bed —",
          body: "my father brought a new brother today. his name is aykut.\nmy mother was very happy. we are crowded now.\n\nmy brother aykut tried to run away. my father got sad.\nnow my brother is always at the table, but he never talks.\n\nfather says the family never shrinks, it always grows.\nnewcomers take the place of those who left old.\nwhen I grow up, I am going to be a father too.\nhe says go down to the lower floor and start your own family.\n\n(last line, in a different, mature handwriting:)\nI went down. I started it. my name is now Deniz. — L-5" } },
        { type: "note", id: "not_cocukgunluk", title: "Deniz's childhood", text: "The diary in the bunk bed belongs to Deniz. Harun 'raised' him here, then Deniz went down and established 'his own family' in L-5. This is how the family multiplies: every child goes down a floor when they grow up and becomes a new father. A sick dynasty." },
      ],
      choices: [
        { id: "fotograf", text: "Take the photo", next: "n_cocuk_foto", if: { flag: "yadigar1", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    /* ================= COLD STORAGE — heirloom 2 (ring) + death ================= */

    n_depo_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You are in front of the heavy, steel door of the cold storage. The icy air leaking from the edges fogs up your tablet screen. The Chef had strictly said 'do not enter' here. One of those uncanny death rooms in Outlast labyrinths stands right before you." },
        { type: "alert", text: "SENSOR ALERT — THE CHEF IS INSIDE RIGHT NOW! Even your tablet's microphone detects the meat-chopping sounds coming from inside. You cannot enter!", if: { flag: "sefNerede", equals: "depo" } },
      ],
      choices: [
        { id: "gir", text: "Crack the door open, go inside", next: "n_k4_depo", if: { flag: "sefNerede", equals: "depo", negate: true } },
        { id: "bekle", text: "Wait until the Chef leaves (return to the hallway)", next: "n_hol", if: { flag: "sefNerede", equals: "depo" } },
      ],
    },

    n_k4_depo: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "You crack the door open and slip inside. The inside of the storage is freezing. Your breath turns into a dense cloud of vapor in the air; your fingers are too numb to hold the tablet. When you raise your head, the dim light of the tablet illuminates human torsos hanging from meat hooks on the ceiling... Flayed, frozen corpses. You have to avert your eyes or you will vomit." },
        { type: "narrate", text: "On the back wall, there is another evacuation hatch covered with a thick layer of ice. But first, you must find that wedding ring." },
      ],
      choices: [
        { id: "yuzuk", text: "Search the frozen boxes (ring)", next: "n_depo_yuzuk", if: { flag: "yadigar2", equals: false } },
        { id: "kapak", text: "Examine the icy hatch on the back wall", next: "n_depo_kapak" },
        { id: "cik", text: "You're too cold — exit", next: "n_hol" },
      ],
    },

    n_depo_yuzuk: {
      cost: 2,
      events: [
        { type: "narrate", text: "You dig through the frozen boxes and frozen piles of meat with your bare hands. Your fingertips freeze, crack, and bleed. Finally, you find a rusty tin can. Inside is a bloody wedding ring, a clump of shed hair, and a note: 'Sevgi's. I lost her, but the family must grow... Everyone must take her place.' The root of this madness is hidden in this ring." },
        { type: "flag", set: { yadigar2: true } },
        { type: "note", id: "not_yadigar2", title: "Heirloom 2/3: Ring", text: "Sevgi's wedding ring, in a tin can in the cold storage. Harun's wife is dead; all this 'family' madness is an attempt to fill her absence. The ring is the second heirloom for the chest." },
      ],
      choices: [
        { id: "kapak", text: "Go to the hatch on the back wall", next: "n_depo_kapak" },
        { id: "cik", text: "Exit the storage", next: "n_hol" },
      ],
    },

    n_depo_kapak: {
      cost: 2,
      events: [
        { type: "narrate", text: "You scrape off the ice on the hatch with the edge of your tablet. A frozen text emerges from underneath: 'L-3 EVACUATION — ONLY WITH HATCH KEY'. You can escape down through here, but the key is locked in the chest in that psychopath's room. You must hurry, you are about to freeze." },
        { type: "note", id: "not_depokapak", title: "L-3 evacuation", text: "Behind the cold storage, there is an evacuation hatch descending to L-3 — but the 'hatch key' is required. The key is in the locked chest in the Chef's room. The chest wants three heirlooms. The escape route is clear: open the chest, take the key, descend from here." },
        { type: "objective", text: "Find the three heirlooms, open the chest, and descend from the storage to L-3 using the hatch key" },
      ],
      choices: [
        { id: "cik", text: "Exit the storage before freezing", next: "n_hol" },
      ],
    },

    /* ================= KITCHEN — The Chef's place (danger) ================= */

    n_mutfak: {
      cost: 1,
      events: [
        { type: "narrate", text: "You look through the crack of the kitchen door. The Chef is there! His back is turned, slamming something onto the counter with a massive cleaver: WHACK! WHACK! WHACK! Blood splattering from the counter paints the wallpaper. A savage rhythm.", if: { flag: "sefNerede", equals: "", negate: true } },
        { type: "narrate", text: "The kitchen is currently empty; the Chef is in the children's room. A massive cauldron is boiling on the stove, human hair bursting out of it. A massive meat cleaver is missing from the knife rack on the wall...", if: { flag: "sefNerede", equals: "cocuk" } },
        { type: "narrate", text: "The kitchen is empty; the Chef is in the storage. You have a chance to examine the foul smells leaking from the drawers under the light of your tablet.", if: { flag: "sefNerede", equals: "depo" } },
        { type: "narrate", text: "The kitchen is empty; the Chef is in the dining hall. Be quick or he will trap you here.", if: { flag: "sefNerede", equals: "salon" } },
      ],
      choices: [
        { id: "cabuk", text: "Quickly search the empty kitchen", next: "n_mutfak_ara", if: { flag: "sefNerede", equals: "", negate: true } },
        { id: "geri", text: "The Chef is there — silently back away", next: "n_hol", if: { flag: "sefNerede", equals: "" } },
      ],
    },

    n_mutfak_ara: {
      cost: 1,
      events: [
        { type: "narrate", text: "You dive into the empty kitchen, rummaging through the drawers like crazy. You find the shift log covered in grease and blood stains. This is the Chef's victim list. When you open the last page, the dim blue light of your tablet shines over your own duty number... The checkbox next to it is still empty. He is waiting to cut you up and throw you into this cauldron." },
        { type: "flag", set: { mutfakArandi: true } },
        { type: "document", open: true, doc: {
          id: "d_sefdefter", title: "Chef's Shift Log",
          meta: "LIMIT-1 · STATION CHEF · H. OKUR",
          body: "JOINED THE FAMILY:\n\n· Aykut D. — 'convinced' at the table. good son.\n· Nevin A. — resisted. assigned to the garden (L-3).\n· Selin ? — escaped. still searching.\n· [your no] — [ ] not yet\n\nNOTE: Deniz established his own family below.\nI am proud. This one is next. If they eat\nat the table — child. If they refuse — ingredient.\n\nTHE RING is still in storage. I couldn't bring\nSevgi back but I grew the family.\nShe would want it too. She would, right?" } },
        { type: "note", id: "not_sefdefter", title: "Chef's list", text: "Chef's log: 'those who joined the family'. Aykut (at the table), Nevin (to L-3, 'the garden'), Selin (escaped, still wanted). My number is at the very bottom, the box is empty. If I eat, 'child', if I refuse, 'ingredient'. Nevin is in L-3 — there is someone on the next floor." },
      ],
      choices: [
        { id: "cik", text: "Exit before the Chef returns", next: "n_hol" },
      ],
    },

    /* ================= CHEF'S ROOM — chest (part lock) ================= */

    n_sef_kapi: {
      cost: 1,
      events: [
        { type: "narrate", text: "You climb up the creaking wooden stairs to the upstairs floor, to the maniac's room. Rather than a room, this is a twisted shrine adorned with the bones of victims. There are coverings made of human skin on the walls. Opposite stands a locked chest, and above it, an ominous thing protected inside a glass bell jar." },
        { type: "flag", set: { sefOdaAcik: true } },
      ],
      choices: [
        { id: "sandik", text: "Approach the chest", next: "n_sef_sandik" },
        { id: "fanus", text: "Look at what's under the bell jar", next: "n_sef_fanus", if: { flag: "fanusBakildi", equals: false } },
        { id: "cik", text: "Exit the room", next: "n_hol" },
      ],
    },

    n_sef_fanus: {
      cost: 1,
      events: [
        { type: "flag", set: { fanusBakildi: true } },
        { type: "narrate", text: "You bring the screen glow of your tablet close to the glass bell jar. Inside is a dried, bloody baby tooth and a strand of hair. On the label underneath: 'Deniz's first tooth. A piece of him will always stay with me,' it reads. This is the third heirloom! But the wires beneath the jar are connected to a mechanism on the wall. The moment you touch it, mechanical alarms inside the house will burst!" },
        { type: "note", id: "not_fanus", title: "Heirloom 3/3: Baby tooth", text: "The third heirloom: Deniz's baby tooth, in a glass bell jar in the Chef's room. The jar is alarmed — if touched, the Chef will know. The 'put him to sleep' note: I need to incapacitate the Chef before taking the jar. Or I take the risk of grabbing it and running." },
      ],
      choices: [
        { id: "al", text: "Break the jar, grab the tooth (The Chef will come)", next: "n_fanus_al" },
        { id: "birak", text: "Don't touch it for now, back away", next: "n_sef_kapi" },
      ],
    },

    n_fanus_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "You smash the glass bell jar! Sharp pieces of shrapnel cut your hand, blood smearing onto the tablet. At that moment, the monster's ear-piercing, crazed roar rises from the speakers in every corner of the house: \"YOU TOUCHED MY SACRED THING! I WILL TEAR YOU TO PIECES!\" Very fast, thundering running footsteps coming up the stairs... You grab the tooth and bolt!" },
        { type: "flag", set: { yadigar3: true, sefKizgin: true, sefNerede: "sef_odasi" } },
        { type: "stat", stat: "sefFarkindalik", delta: 25, note: "THE CHEF HAS GONE MAD — RUNNING HERE!", noteKind: "alert" },
        { type: "alert", text: "⚠ THE MONSTER IS ON THE STAIRS — NO PLACE TO HIDE, RUN OR DIE!" },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "yatak", text: "Dive under the bed", next: "n_fanus_yatak" },
        { id: "kos", text: "Run down the stairs, slip past him, dash into the hallway", next: "n_fanus_kos", default: true },
      ],
    },

    n_fanus_yatak: {
      events: [
        { type: "narrate", text: "You fling yourself under the bed that smells like a carcass. Squeezing your tablet screen into your clothes, you remain in pitch darkness. The door opens as if being broken down! The massive boots entering shake the floor. He swings his cleaver left and right, smashing the wooden furniture. Panting with drool flowing from his mouth: \"I can smell you... You ate my mother's meat, you smell like us! Come out!\" Right in front of you, he bends down toward the floor!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9500, success: "n_fanus_kurtul", fail: "n_olum_yatak" },
    },

    n_olum_yatak: {
      death: true,
      deathText: "Your lungs burst from fear; you can't hold your breath and gasp with a sob! Harun's stapled face of horror appears under the bed. The giant hand grabs your ankle and flings you out in a single move! As you crash against the wall and lose consciousness, you feel the cleaver descending upon your chest. \"New ingredient ready!\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fanus_kurtul: {
      cost: 1,
      events: [
        { type: "narrate", text: "The boots pause, growling as they bolt out of the room, toward the corridor. He thinks you escaped! You crawl out from under the bed, your clothes covered in the blood of victims. Grabbing your tablet, you silently slip down into the hallway. The tooth is in your pocket; all three heirlooms are ready." },
        { type: "flag", set: { sefNerede: "" } },
        { type: "stat", stat: "akil", delta: -8 },
      ],
      choices: [
        { id: "sandik", text: "Return to open the chest", next: "n_sef_sandik" },
        { id: "hol", text: "Go down to the hallway", next: "n_hol" },
      ],
    },

    n_fanus_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "You dash down the stairs like crazy! Halfway down the stairs, you come face to face with the Chef, the hot drool from his disgusting stitched face splattering onto yours! He swings the cleaver, tearing your jacket, but with an agile move, you slip under his arms and roll into the hallway. Your heart is about to pierce your chest, the tablet almost falling from your hand from the impact!" },
        { type: "flag", set: { sefNerede: "sef_odasi" } },
        { type: "stat", stat: "akil", delta: -12, note: "SANITY -12 — You felt the breath of death on your face!", noteKind: "alert" },
        { type: "stat", stat: "gurultu", delta: 15 },
      ],
      choices: [
        { id: "sandik", text: "Go open the chest (The Chef is still searching upstairs)", next: "n_sef_sandik" },
      ],
    },

    n_sef_sandik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "You are in front of the chest. There are three slots and rusty mechanical rings on it. You need to place the pieces and complete the crest of this sick family. How many pieces do you have?" },
        { type: "alert", text: "CLOSED AND LOCKED — There are missing pieces! This chest will not open without finding the photo, wedding ring, and baby tooth!", if: { flag: "yadigar3", equals: false } },
        { type: "narrate", text: "All three bloody heirlooms are in your hand. You place the photo, the wedding ring, and the tooth into the slots. The chest's mechanism becomes ready to turn, groaning with rusty gears.", if: { flag: "yadigar3", equals: true } },
      ],
      choices: [
        { id: "coz", text: "Turn the glass panel — complete the crest", next: "n_sandik_puzzle", if: { flag: "yadigar3", equals: true } },
        { id: "ara", text: "Return to look for missing heirlooms", next: "n_hol", if: { flag: "yadigar3", equals: false } },
        { id: "cik", text: "Leave the chest, return to the hallway", next: "n_hol", if: { flag: "yadigar3", equals: true } },
      ],
    },

    n_sandik_puzzle: {
      cost: 1,
      events: [
        { type: "narrate", text: "The heirlooms have released the locks. Now, turn the rusty steel rings with your fingers to piece together the rotting seal of this cannibalistic dynasty." },
      ],
      interaction: {
        kind: "rings",
        title: "OKUR CHEST — COMPLETE THE FAMILY CREST",
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
        { type: "narrate", text: "The chest opens like a heavy coffin lid. The smell of decay emitting from inside hits your face. At the very top lie a rusty, heavy HATCH KEY and spare batteries. You quickly toss them into your pocket. At the very bottom, there is a letter written in blood." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { ambarAnahtari: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_sefmektup", title: "Chef's Letter (unsent)", style: "hand",
          meta: "— folded at the bottom of the chest —",
          body: "To Sevgi,\n\nWhen I lost you, the station died with me too.\nBut I found it — below, the Foundling in L-2.\nIt gives us back the family. It keeps everyone\ntogether. When they hear its voice, everyone stops,\ncounts, belongs.\n\nI raised Deniz. He went down too, established his\nown family. And I continue to raise. Even without you,\nthe family grows.\n\nIf one day you go down to the Foundling — thank it.\nIt brought us back together again.\n\n— H." } },
        { type: "note", id: "not_sefmektup", title: "The Foundling — L-2", text: "The Chef's letter connects everything: the 'Foundling' in L-2 is the source of all this. When they hear its voice, everyone 'stops, counts, belongs' — those counting in their sleep, lullaby, 432 Hz. The family is built around it. The hatch key is in my hand; I can descend from the cold storage to L-3." },
        { type: "objective", text: "Return to the cold storage, descend to L-3 with the hatch key" },
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
        { type: "narrate", text: "The moment you descend into the hallway, the whole house is flooded with a red hellish light! The speakers crackle and explode, and that savage lament showing that Harun has completely gone mad shakes the house: \"YOU TOOK MY KEY! YOU STOLE HIS MOTHER'S RING! I WON'T LET YOU LIVE!\" Now the baits are over, he will hunt you down by your scent!" },
        { type: "alert", text: "⚠ YOU DID NOT EAT THAT MEAT! HE CAUGHT YOUR SCENT AND WENT MAD WITH RAGE — RUN TOWARD THE STORAGE!", if: { flag: "sofraReddetti", equals: true } },
        { type: "narrate", text: "The cold storage is at the very end of the corridor. While the light of the tablet in your hand shakes from the impact, you see that the only obstacle before you is that massive cannibal.", if: { flag: "sofraReddetti", equals: false } },
        { type: "narrate", text: "That bite in your stomach is heavy as a stone, the monster laments: \"You smell like us but you are a thief!\" There is no choice but to escape. Run to the storage!", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "kos", text: "Run through the hallway, reach the cold storage", next: "n_final_kos" },
      ],
    },

    n_final_kos: {
      cost: 1,
      events: [
        { type: "narrate", text: "You run like mad! The sound of your steps echoes through the house. Harun appears right in the middle of the hallway with his massive bulk, wheezing with the cleaver raised in the air: \"Come son... Your father will embrace you!\" You have two deadly options before you: either slip past him or leap over the overturned cabinet." },
        { type: "flag", stat: "sefFarkindalik", delta: 10 },
      ],
      timer: { seconds: 5 },
      choices: [
        { id: "siyril", text: "Stick to the wall and slip past him", next: "n_final_siyril" },
        { id: "atla", text: "Leap over the overturned cabinet", next: "n_final_atla", default: true },
      ],
    },

    n_final_siyril: {
      cost: 1,
      events: [
        { type: "narrate", text: "Crashing against the wall, you slip under the arm where the monster swings his cleaver! The cleaver smashes the wall, wooden dust burning your face. You reach the door of the cold storage and frantically stick the key into that foggy, frozen lock." },
      ],
      choices: [
        { id: "in", text: "Turn the key, descend from the storage to L-3", next: "n_k4_son" },
      ],
    },

    n_final_atla: {
      cost: 1,
      events: [
        { type: "narrate", text: "You leap onto the cabinet, but the floor is so slippery with the blood of victims that your foot slips! You faceplant onto the ground, the tablet flying out of your hand and falling far away. Just then, a massive hand grabs your ankle and begins dragging you along the floor!", if: { flag: "sofraYedi", equals: false } },
        { type: "narrate", text: "You quickly leap over the cabinet. Just as the Chef is about to bring down the cleaver, he sniffs — that smell of human meat on you paralyzes his instincts for a moment! That split-second pause saves your life; you get to the other side of the cabinet and dart into the storage.", if: { flag: "sofraYedi", equals: true } },
      ],
      choices: [
        { id: "in", text: "Reach the storage door, turn the key", next: "n_k4_son", if: { flag: "sofraYedi", equals: true } },
        { id: "tut", text: "You're caught — try to break free", next: "n_olum_final", if: { flag: "sofraYedi", equals: false } },
      ],
    },

    n_olum_final: {
      death: true,
      deathText: "Your ankle is crushed inside his calloused palm. \"I caught you, ungrateful child!\" Ignoring your screams, he drags you to that bloody table... You are thrown onto the table on your back. As the cleaver rises into the air, the last thing you see is the sickly blue light hitting the ceiling from your tablet's inverted screen in the corner. \"Our home will always grow...\"",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_k4_son: {
      cost: 1,
      events: [
        { type: "system", text: "HATCH COVER: OPENED — DESCENT TO L-3" },
        { type: "narrate", text: "You turn the key frantically in the lock, the cover opening with a massive creak. A wave of sharp decay, wet soil, and plant smell hits your face from below. You throw yourself down, close the cover over you, and bolt it! Right at that moment, massive blows begin to descend upon the cover — THUD! THUD! The steel bends, but the bolt holds. Then the blows stop." },
        { type: "waitTap" },
        { type: "ambient", text: "Right from behind the cover, that monster's tearful, schizophrenic voice rises: \"...Everyone abandons me. Sevgi left... Deniz went down... You escaped too. Am I always going to stay at this table all by myself?\" Then a deep, uncanny silence falls." },
        { type: "ambient", text: "Ece's wheezing voice comes from the tablet's speaker: «Oh my God... I heard those sounds. You made it... You descended to L-3. That's Dr. Nevin's laboratory floor... The biologist. She might not be mad like that guy... Watch out, strange things are breathing down there...»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "narrate", text: "You descend the stairs into absolute darkness. The light of the tablet in your hand illuminates massive, botanical, creeping vines moving below. This is a living garden... And something is breathing heavily in the darkness. 'The Garden' awaits its new victim." },
        { type: "system", text: "— END OF CHAPTER 3: HOME —" },
        { type: "system", text: "L-3: 'GARDEN' — Dr. Nevin's floor — coming soon" },
      ],
      choices: [
        { id: "k3", text: "Descend to L-3", next: "n_k3_giris" },
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