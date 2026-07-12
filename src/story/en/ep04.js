/* ============================================================
   PERISHED — EPISODE 4: "K-3 / THE GARDEN" (Full Version)
   Floor master: DR. NEVIN ARAS — biologist, "consigned to the garden."[cite: 8]
   Transformed into a plant-entity by the spores of the Artifact; yet[cite: 8]
   a human remnant still lingers within her[cite: 8]. The Chief had banished her here from K-4[cite: 8].

   NEW THREAT TYPE: Nevin is motionless but is EVERYWHERE —[cite: 8]
   her roots entangle the entire floor[cite: 8]. She hunts not by sound, but by TRAIL:[cite: 8]
   if you tread on the spore beds on the deck, the roots vibrate, exposing your position[cite: 8].
   Thus, the hazard is not noise; it is WHERE YOU STEP[cite: 8].

   NEW MECHANIC — SPORE/BREATH: certain passages are choked with spore clouds;[cite: 8]
   if you cross without holding your breath, 'infection' spikes (acts via sanity as a hidden gauge)[cite: 8].
   Clean air pockets act as checkpoints[cite: 8].

   PIECE-LOCK + CHEMISTRY: Nevin's seed vault demands three SPECIMENS[cite: 8]
   (blue spore, root extract, Selin's blood sample)[cite: 8]. Once all three are gathered,[cite: 8]
   a CHEMISTRY puzzle (mix) inside the lab synthesizes the SERUM[cite: 8]. The serum serves two purposes:[cite: 8]
   bypassing/subduing Nevin, or SAVING her[cite: 8].

   MORAL CHOICE (final): Nevin is still partially human[cite: 8].
   · Administer the serum to her → restore her humanity (the hard path, leaves a mark)[cite: 8]
   · Consume/use the serum and bypass her → survive, abandon her (the easy path)[cite: 8]
   · Escape via the compost vector → Selin's route (hidden, hazardous)[cite: 8]

   CARRIED STATUS:
   · sofraYedi/sofraReddetti → Nevin "sniffs" you[cite: 8]
   · eceEleVerildi → Ece's K-3 sonar assistance[cite: 8]
   · denizSoruldu → Deniz's trace inside the archive corruption[cite: 8]
   ============================================================ */

export const EP04 = {
  nodes: {

    /* ================= ENTRY — WARM DARKNESS ================= */

    n_k3_giris: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k3" },
        { type: "sting", name: "stingK3" },
        { type: "system", text: "TERROR STRATUM: K-3 — ABANDONED GREENHOUSE AND FLESH AND ROOT" },
        { type: "narrate", text: "At the bottom of the ladder, a warm, humid, foul-smelling darkness greets you[cite: 8]. K-3 breathes, but not with lungs; roots dangling from the walls throb like veins, the ceiling opening and closing like a fleshy mouth[cite: 8]. Science didn't bring nature here[cite: 8]. It taught nature human agony[cite: 8]. The cold light of your tablet illuminates the decay, and in an instant, you realize: light here doesn't enable you to see, it makes you visible[cite: 8]." },
        { type: "narrate", text: "Everything here has grown, yet nothing lives[cite: 8]. Roots throb like veins, leaves sweat like skin, and instead of blooming, flowers part and close like tiny mouths[cite: 8]. K-3 is not nature; it is a miscarriage, a half-formed and suffering copy made by the laboratory while trying to emulate God[cite: 8]." },
        { type: "narrate", text: "From the depths of the darkness spreads a raspy female whisper, resembling the groan of a flayed human[cite: 8]. She isn't singing; she is frantically murmuring to the rotting seeds as if they were her children: 'Selin... where is Selin... they took my baby away from me...'" },
        { type: "waitTap" },
        { type: "ambient", text: "Through the static of your tablet speaker, Ece's trembling voice ascends: «You descended to K-3... My God, that stench reaches all the way here[cite: 8]. Nevin is out there[cite: 8]. The Chief fed her to that thing[cite: 8]. Listen to me, do not step on anything! Noise is not her concern; every root you tread on links directly to her nerve endings[cite: 8]. Wherever you step, she will collapse directly upon you!»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "There is only your own heavy breathing in the dark[cite: 8]. The radio line is completely dead[cite: 8]. Following your betrayal of Ece, you are completely alone in this living tomb of K-3[cite: 8]. Only a dead crackle from the speaker claws at your guilt[cite: 8].", if: { flag: "eceEleVerildi", equals: true } },
        { type: "narrate", text: "That raw meat you swallowed at the Chief's table convulses in your stomach as if alive[cite: 8]. And you notice: as you draw close, the fleshy sprouts on the wall stretch and quiver toward you like starved wolves... They caught that disgusting stench of the Chief's banquet[cite: 8]. They recognize you[cite: 8].", if: { flag: "sofraYedi", equals: true } },
        { type: "objective", text: "Find an escape vector from K-3." },
        { type: "note", id: "not_k3", title: "K-3: A Living Grave", text: "K-3 is not a greenhouse[cite: 8]. They rooted someone's agony and converted it into a floor layout[cite: 8]. Nevin is still here; perhaps half her body, perhaps all of it, or perhaps only the part that speaks her daughter's name[cite: 8]. Making noise is not the problem[cite: 8]. Treading on the floor is the problem[cite: 8]. This floor doesn't hear you, it feels you[cite: 8]." },
      ],
      choices: [
        { id: "ilerle", text: "Advance along the edge where the moss is thin", next: "n_sera" },
      ],
    },

    /* ================= CENTRAL: GREENHOUSE (HUB) ================= */

    n_sera: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The glass dome of the central greenhouse has been shattered; the blood-red emergency light exposes everything like a medical photograph[cite: 8]. Nevin is in the center[cite: 8]. It is difficult to call her human, and a lie to call her a plant[cite: 8]. Roots erupting from her spine spread across the deck like veins[cite: 8]. They didn't bind a doctor to the laboratory; they bound the laboratory to the doctor[cite: 8]. If the heart of K-3 beats, it means she is still suffering[cite: 8].", if: { flag: "seraIlk", equals: false } },
        { type: "flag", set: { seraIlk: true } },
        { type: "ambient", text: "Nevin remains motionless, yet her neck cracks as she subtly turns toward the light of your tablet like a starved animal[cite: 8]. \"...Another piece of meat...\" she whispers from behind her sealed, rotting eyelids[cite: 8]. \"Walk, little seedling[cite: 8]. The tremor of every step you take travels up my spinal cord to my brain[cite: 8]. You cannot escape[cite: 8]. Roots are patient... wait for me to digest you[cite: 8].\"" },
      ],
      choices: [
        { id: "fide", text: "Enter the humid chamber where seedling whispers originate", next: "n_fide", if: { flag: "fideBitti", equals: false } },
        { id: "lab", text: "Head toward the glass-shattered laboratory", next: "n_lab" },
        { id: "su", text: "Enter the passage of the dripping storage (spore cloud)", next: "n_su_gecit" },
        { id: "iklim", text: "Examine the flashing greenhouse climate panel", next: "n_iklim_panel", if: { flag: "iklimCozuldu", equals: false } },
        { id: "kompost", text: "Approach the foul-smelling pit", next: "n_kompost_kapi" },
        { id: "kasa", text: "Try to open Nevin's seed vault", next: "n_kasa" },
      ],
    },

    /* GREENHOUSE ROSE OF LIGHT — COLORGRID (HEXAGON) PUZZLE */
    n_iklim_panel: {
      cost: 1,
      events: [
        { type: "narrate", text: "In the corner of the greenhouse stands a strange, brass-cast old device: at its center a blood-red glass rose, ringed by six rotating mirror-petals bound in thorned iron. This is a 'rose of light' Nevin built with her own hands — a crude mechanism that bends sunlight and decides which color reaches the seedlings. The petals are currently locked at random angles, bending the light wrong and forcing the seedlings to grow like living human flesh. On the rusted wall beside it, Nevin scratched with her claws: 'The correct angle puts the monsters to sleep. Red starves them, blue halts the decay.' If you can't turn these petals to complete the rose, the roots will tear you apart without mercy." },
        { type: "note", id: "not_iklim", title: "Climate Panel Despair", text: "The rose of light is on the verge of driving things mad. Seedlings are growing like human flesh. If I can turn the brass petals to the right angles and complete the rose, the light will shift to blue and the tension in those foul roots will collapse — giving me a small pocket of breathing room." },
      ],
      interaction: {
        kind: "colorgrid",
        title: "ROSE OF LIGHT — ALIGN THE PETALS",
        success: "n_iklim_cozuldu",
        cancel: "n_sera",
      },
    },

    n_iklim_cozuldu: {
      cost: 1,
      events: [
        { type: "system", text: "ROSE OF LIGHT: DEAD BLUE — TEMPORARY SILENCE" },
        { type: "narrate", text: "The instant the crimson light yields to a cold, sickly blue spectrum, the fleshy roots relax with an agonizing hiss. Vines dangling from the walls collapse to the deck as if paralyzed. Even Nevin's rasping slows, withdrawing into a heavy hibernation. Exploit this damned deathly silence well, because it will not last forever." },
        { type: "flag", set: { iklimCozuldu: true } },
        { type: "stat", stat: "akil", delta: 5, note: "PSYCHOLOGICAL RELIEF +5 — The roots have fallen asleep", noteKind: "system" },
        { type: "battery", spares: 1 },
      ],
      choices: [
        { id: "geri", text: "Return to the greenhouse", next: "n_sera" },
      ],
    },

    /* ================= SEEDLING ROOM — SPECIMEN 1 (BLUE SPORE) + LORE ================= */

    n_fide: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "Hundreds of pots are arranged on shelves inside the seedling room[cite: 8]. Their labels are neat, their soil moist, their procedures complete[cite: 8]. The pale sprouts emerging from within resemble children's hands; this is the growth of archived crime, not nature[cite: 8]. In the central giant pot, a blue spore sac throbs like a pus-filled boil[cite: 8]. PERISHED didn't cultivate plants here[cite: 8]. It rooted the evidence[cite: 8]." },
        { type: "document", open: false, doc: {
          id: "d_spor_test", title: "Biological Compatibility Test — Blue Spore",
          body: "UNIT: K-3 Biology / Sealed Root Network\nTEST: Spore sac contact protocol\n\nObservation 12-A: When the spore cloud was inhaled, subjects displayed ocular bleeding within the first 9 seconds, uncontrolled convulsions at 14 seconds, and subcutaneous sprouting at 31 seconds.\n\nObservation 12-B: In subjects who held their breath, the spores remained on the surface. A single breath taken in a moment of panic was enough to initiate rooting within the lung tissue.\n\nCONCLUSION: The spore utilizes lung tissue as an entry vector. Protective masks are insufficient. The sole temporary method: controlled breath suspension and arithmetik silent venting upon contact.\n\nWARNING: One of the subjects repeated the sentence 'do not put me back into the soil' 46 times before dying." } },
        { type: "narrate", text: "A rusted, blood-smeared audio recorder on one of the shelves blinks its red indicator light[cite: 8]. Nevin's trembling human voice, from before she went completely mad, echoes through the room[cite: 8]:" },
        { type: "document", open: true, doc: {
          id: "d_nevin_kayit", title: "Dr. Nevin Aras — Hidden Audio Log", style: "hand",
          meta: "— From the Bloody Recorder inside the Chamber —",
          body: "AUDIO LOG TRANSCRIPT — DR. NEVIN ARAS\nCONFIDENTIAL: K-3 BIOLOGY / POST-INCIDENT REVIEW\n\nLog 01: The Chief brought a live tissue sample from the K-2 archaeology vault.\nThe specimen produces an inaudible vibration around 432 Hz.\nPlant tissues are tracking this vibration. Personnel have begun experiencing nosebleeds.\n\nLog 09: The sleep recording of my deceased daughter was played to the specimen.\nThe tissue counted backward along with the child's voice in the recording.\nThe vocal signature matches identically. No explanation. Three staff members inside the recording room wept simultaneously.\n\nLog 14: H. Tekin detained me in K-3 on disciplinary grounds.\nSubcutaneous rooting has commenced. Selin fled. I left a blood sample in the compost cooler.\nThe formula might still function.\n\nFinal Log: Fingers have lost function. Terminal nodes display branch-like hardening.\nThe pain has diminished. Whenever I hear Selin's name, the roots still withdraw." } },
        { type: "note", id: "not_nevin_kayit", title: "Nevin's Descent", text: "That entity down in K-2 mimics human voices[cite: 8]. They drove Nevin mad and sacrificed her to this greenhouse[cite: 8]. Someone named Selin left blood in a cooler bag while fleeing into the compost line[cite: 8]. That blue spore, the root extract, and that blood... If I don't want to die, I am forced to synthesize that serum[cite: 8]." },
        { type: "waitTap" },
        { type: "narrate", text: "To secure the blue spore sac, you must plunge your hand into the dirt of the pot[cite: 8]. This must look like a material collection task: extract sample, add to formula, observe result[cite: 8]. But the sample is alive, the formula is bloody, and the observer is you[cite: 8]. The instant you touch it, the spore cloud will detonate in your face[cite: 8]. If you breathe, your lungs will become an entry gate[cite: 8]." },
      ],
      choices: [
        { id: "al", text: "Pluck the blue spore sac — hold your breath", next: "n_fide_spor" },
        { id: "cik", text: "Do not touch for now, exit", next: "n_sera" },
      ],
    },

    n_fide_spor: {
      events: [
        { type: "narrate", text: "You pluck the sac rapidly[cite: 8]! A blue, shimmering yet lethal dust cloud detonates in your face like a bomb[cite: 8]. Your eyes burn as if washed with acid, your throat tearing to gasp for air, but if you draw that toxic air inside, it will be your end[cite: 8]. You must endure[cite: 8]!" },
      ],
      interaction: { kind: "breath", holdMs: 7500, lungMs: 9000, success: "n_fide_al", fail: "n_olum_spor" },
    },

    /********* SENSITIVE DATA RESTRICTION COMPLIANCE *********/
    n_olum_spor: {
      death: true,
      deathText: "Your lungs strain as if ready to pop, and unable to endure, you inhale that toxic blue air[cite: 8]. A sensation spreads down your throat as if scalding liquid has been poured[cite: 8]. You collapse to the deck vomiting blood[cite: 8]. The final thing you witness is fine roots sprouting out from beneath your own skin[cite: 8]. Nevin looms above you and whispers: 'Welcome to our midst, fresh meat...'[cite: 8]",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_fide_al: {
      cost: 1,
      events: [
        { type: "narrate", text: "As the toxic cloud slowly dissipates in the air, you pocket the sac and seal your mouth tightly[cite: 8]. Your chest feels ready to explode, your heart pounding madly, but you succeeded[cite: 8]. The blue spore is now in your hands[cite: 8]." },
        { type: "flag", set: { ornek1: true, fideBitti: true } },
        { type: "note", id: "not_ornek1", title: "Specimen 1/3: Purulent Spore", text: "I have the entity's blue spore sac[cite: 8]. Only the root extract and Selin's blood remain[cite: 8]. Time is running out[cite: 8]." },
      ],
      choices: [
        { id: "cik", text: "Exit the seedling room", next: "n_sera" },
      ],
    },

    /* ================= WATER STORAGE PASSAGE — SPECIMEN 2 (ROOT EXTRACT) ================= */

    n_su_gecit: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The corridor leading to the water storage is completely blanketed by a dense, shimmering fog layer[cite: 8]. Your visibility is zero[cite: 8]. At the broken pipe junction at the end of the corridor, a pitch-black, viscous fluid drips from the roots: Root extract[cite: 8]. The passage is immensely long, and the light from your tablet only reflects back like a wall in this fog[cite: 8]. You must sprint across this hellhole in a single breath[cite: 8]." },
        { type: "alert", text: "TOXIC SPORE CORRIDOR — If you don't cross in a single breath, your lungs will be torn to shreds![cite: 8]" },
      ],
      choices: [
        { id: "gec", text: "Hold your breath, sprint down the passage", next: "n_su_nefes" },
        { id: "geri", text: "Withdraw, search for another path", next: "n_sera" },
      ],
    },

    n_su_nefes: {
      events: [
        { type: "narrate", text: "Filling your lungs with as much clean air as possible, you hurl yourself into that dense fog[cite: 8]! Nothing is visible in the corridor; you just try not to trip over the slimy roots beneath your feet, sprinting madly forward[cite: 8]. Spores cling to your face, your eyes[cite: 8]. Your chest constricts, your mind screaming at you to surrender[cite: 8]!" },
      ],
      interaction: { kind: "breath", holdMs: 7000, lungMs: 9000, success: "n_su_depo", fail: "n_olum_spor" },
    },

    n_su_depo: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "When you reach the end of the corridor, you fling yourself into a small chamber with clean air, collapsing onto your knees and breathing like a wild animal[cite: 8]. The water storage room... Thick veins have entangled the massive tanks[cite: 8]. You fill a rusted bottle on the floor with that ink-black root extract draining from the pipe[cite: 8]." },
        { type: "flag", set: { ornek2: true } },
        { type: "note", id: "not_ornek2", title: "Specimen 2/3: Black Extract", text: "Secured the second component[cite: 8]. There is something inside one of the tanks... Horrific[cite: 8]." },
        { type: "ambient", text: "You aim the light of your tablet at the thick glass of one of the tanks[cite: 8]. Inside, suspended in the water, is the handprint belonging to a decayed woman[cite: 8]. She frantically clawed at the glass with her fingernails... the trace of the exact moment she suffocated[cite: 8]." },
      ],
      choices: [
        { id: "geri", text: "Gather your breath, sprint back down the passage", next: "n_su_geri" },
      ],
    },

    n_su_geri: {
      events: [
        { type: "narrate", text: "Taking one final deep breath, you dive back into that nightmare-like shimmering fog cloud[cite: 8]. This time to return[cite: 8]. Your perception of time vanishes, your lungs screaming in protest[cite: 8]!" },
      ],
      interaction: { kind: "breath", holdMs: 6500, lungMs: 9000, success: "n_sera", fail: "n_olum_spor" },
    },

    /* ================= COMPOST — SPECIMEN 3 (BLOOD) + SELIN + DEATH ================= */

    n_kompost_kapi: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "narrate", text: "The compost pit is the waste cycle and decay pool at the very bottom of the floor[cite: 8]. They might have called this a waste loop in official records[cite: 8]. In reality, it's the forgetting place for failed experiments, waste tissues, and unregistered corpses[cite: 8]. Its stench stabs from your nostrils into your brain[cite: 8]. When a corporation throws something into the compost, it thinks it destroyed it; here, everything decayed and returned[cite: 8]." },
        { type: "alert", text: "Compost gas triggers hallucinations, the deck is entirely coated in slippery corpse fragments![cite: 8]" },
      ],
      choices: [
        { id: "gecit", text: "Advance along the tight side passage", next: "n_kompost_gecit" },
        { id: "cukur", text: "Descend into the pit, amidst those discarded", next: "n_olum_kompost" },
        { id: "geri", text: "Withdraw", next: "n_sera" },
      ],
    },

    n_olum_kompost: {
      death: true,
      deathText: "You step into the pit but what you tread upon is not a deck[cite: 8]! It's a living quagmire composed of half-decayed human bodies swarming like leeches... pulling you rapidly downward[cite: 8]. You try to scream but that foul gas and sludge filling your mouth chokes you[cite: 8]. The compost pool swallows you whole; you become just another decaying fertilizer of this floor[cite: 8].",
      events: [{ type: "glitch", ms: 1000 }],
    },

    n_kompost_gecit: {
      checkpoint: true,
      cost: 2,
      events: [
        { type: "narrate", text: "Advancing along the tight, slippery passage, you locate a small shelter hidden in the wall. Tattered overalls, scattered rusted ration cans, and a medical cooler bag humming faintly in the corner... Opening the bag, amidst the ice packs, you find a tube full of fresh human blood on the verge of freezing, and a note written in a shaking hand. Selin... took refuge here before fleeing." },
        { type: "flag", set: { ornek3: true } },
        { type: "document", open: true, doc: {
          id: "d_selin", title: "Selin's Bloody Note", style: "hand",
          meta: "— From the Mangled Cooler Bag —",
          body: "Whoever finds this...\n\nMy name is Selin. If you found this bag, Nevin might still be waiting at the hatch.\nShe mistook me for her deceased daughter. Even as I write this, I feel ashamed of the life that sentence granted me.\nShe shielded me because she no longer sees who I am, but who she lost.\n\nI left my blood here. The formula:\nBlue spore + root extract + my blood.\nRatio: 2 / 3 / 4.\nA faulty mix won't kill her. I wish it would. A faulty mix surrenders the last remaining human fragment inside Nevin over to the roots completely.\n\nI am descending to K-2. The Artifact is out there. The source of all this family business, the counting, the murmuring dead is out there.\n\nDon't look for me. But if you make the serum, save Nevin first.\nShe wasn't the doctor of this hellhole. She was its first patient.\n\n— S." } },
          { type: "note", id: "not_selin", title: "The Final Piece and Recipe", text: "Selin left her own blood inside the cooler bag. Nevin kept her alive because she mistook her for her daughter. The most merciful act of this facility is a side effect of a madness. The recipe is clear: 2 spore, 3 extract, 4 blood. A faulty mix won't kill Nevin; it will abandon her here completely. If I execute this, I have no margin for error." },
        { type: "objective", text: "Bring the three specimens to the laboratory." },
      ],
      choices: [
        { id: "geri", text: "Return to the greenhouse via the passage", next: "n_sera" },
      ],
    },

    /* ================= LABORATORY — SERUM (MIXING PUZZLE) ================= */

    n_lab: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nothing remains of the laboratory but complete destruction: overturned cabinets, shattered vials on the deck, and capillary roots beginning to coat everything... That recipe Nevin scratched onto the wall with blood while still human stands there[cite: 8]. But if you lack the specimens, this is merely a death warrant[cite: 8].", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "You are at the laboratory counter[cite: 8]. You've secured the tablet light onto the table[cite: 8]. Three components lie before you: blue spore, black extract, Selin's blood[cite: 8]. Calling them ingredients would be comforting[cite: 8]. In reality, one is the affliction, one is the carrier tar, and one is the remaining human proof of life[cite: 8]. The correct ratio can recall Nevin[cite: 8]. A faulty ratio completes her into exactly what the corporation wanted[cite: 8].", if: { flag: "ornek3", equals: true } },
        { type: "document", open: true, if: { flag: "labTarif", equals: false }, doc: {
          id: "d_tarif", title: "The Formula Scratched onto the Wall", style: "hand",
          meta: "— Formula Written with Nevin's Own Blood —",
          body: "ANTIDOTE — Cellular Retraction\n\nA highly sensitive ratio. A faulty mix won't kill, it causes something WORSE THAN DEATH.\n\n  BLUE SPORE ...... 2 UNITS (Cellular suppressor)\n  ROOT EXTRACT ..... 3 UNITS (Carrier tar)\n  BLOOD ............ 4 UNITS (Binding life essence)\n\nThe sequence is trivial, the RATIO must be absolute. 9 units total. If blood is insufficient, it remains ineffective. If spores are excessive, it feeds the monster. Be careful!" } },
        { type: "flag", set: { labTarif: true } },
      ],
      choices: [
        { id: "yap", text: "Mix the serum", next: "n_lab_mix", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "Gather the three specimens first (incomplete)", next: "n_sera", if: { flag: "ornek3", equals: false } },
        { id: "cik", text: "Exit the laboratory, return to the greenhouse", next: "n_sera", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_lab_mix: {
      cost: 1,
      events: [
        { type: "narrate", text: "Your hands are shaking too much from terror to stabilize the vials. Try to remember the formula Nevin scratched into the wall — the order doesn't matter, but the ratio must be exact. Steel your nerves and fill the syringe. If you make an error, you won't leave the room alive." },
      ],
      interaction: {
        kind: "mix",
        title: "NIGHTMARE COCKTAIL — RECALL THE FORMULA, MATCH THE RATIO",
        bottles: [
          { id: "spor", label: "SPORE", color: "#4a6ac2" },
          { id: "ozut", label: "EXTRACT", color: "#4aa26a" },
          { id: "kan", label: "BLOOD", color: "#a23a3a" },
        ],
        target: { spor: 2, ozut: 3, kan: 4 },
        success: "n_serum_hazir",
        cancel: "n_lab",
        penalty: { gurultu: 6, text: "HORRIFIC ERROR — The vial exploded, venting acid gas into the room. NOISE +6" },
      },
    },

    n_serum_hazir: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "SERUM SYNTHESIZED: A golden-yellow, gleaming syringe full of life[cite: 8]." },
        { type: "narrate", text: "The golden fluid inside the syringe gleams under your tablet's light[cite: 8]. Selin's legacy said 'save Nevin.'[cite: 8] But this serum might also be your sole escape ticket to keep Nevin from tearing you apart[cite: 8]. The moment of choice approaches[cite: 8]." },
        { type: "flag", set: { serumHazir: true } },
        { type: "battery", spares: 1 },
        { type: "objective", text: "Return to the greenhouse." },
      ],
      choices: [
        { id: "sera", text: "Return to the greenhouse", next: "n_kasa" },
      ],
    },

    /* ================= SEED VAULT — PIECE LOCK (SPECIMENS) ================= */

    n_kasa: {
      cost: 1,
      events: [
        { type: "narrate", text: "Nevin's seed vault: a steel PERISHED security cabinet concealed behind thick roots[cite: 8]. It bears three biometric slots, but they don't want fingerprints, they demand live, raw SPECIMENS[cite: 8]. If the vault opens, you can secure the K-2 elevator descent card[cite: 8]. What is your status[cite: 8]?" },
        { type: "alert", text: "SYSTEM LOCKED — Materials missing! This steel door won't open without locating the blue spore, root extract, and blood.[cite: 8]", if: { flag: "ornek3", equals: false } },
        { type: "narrate", text: "You utilized all three specimens and synthesized the serum[cite: 8]. The rooted reader mechanism atop the vault stretches toward the golden fluid in the syringe like a hungry leech[cite: 8]. It will accept the serum like a key[cite: 8].", if: { flag: "serumHazir", equals: true } },
        { type: "narrate", text: "All three specimens are in your pocket, but you haven't touched the chemistry counter yet[cite: 8]. You can sacrifice these raw materials directly to the vault and claim the card, but then you will never possess a serum to save Nevin[cite: 8]. Make your choice[cite: 8].", if: { flag: "ornek3", equals: true } },
      ],
      choices: [
        { id: "serum_ac", text: "Touch the serum to the reader, open the vault", next: "n_kasa_acik", if: { flag: "serumHazir", equals: true } },
        { id: "lab_git", text: "Synthesize the serum in the lab first", next: "n_lab", if: { flag: "ornek3", equals: true } },
        { id: "ara", text: "Return to search for missing specimens", next: "n_sera", if: { flag: "ornek3", equals: false } },
      ],
    },

    n_kasa_acik: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "system", text: "SECURITY VAULT OPENED — The steel hydraulic gaped open with a hiss[cite: 8]." },
        { type: "narrate", text: "The heavy door of the vault breaks open[cite: 8]. Inside rests the K-2 elevator descent card, two fully charged batteries, and the final letter Nevin wrote with a completely human mind[cite: 8]." },
        { type: "battery", spares: 2 },
        { type: "flag", set: { inisKarti: true } },
        { type: "waitTap" },
        { type: "document", open: true, doc: {
          id: "d_nevin_son", title: "Nevin's Final Confession", style: "hand",
          meta: "— From the Base of the Steel Vault —",
          body: "If you are reading this, you succeeded in creating that golden fluid. It can pull me out from this flesh prison.\n\nBut I will be honest with you: I am not certain if I want to return. Becoming a root... means the absence of emotions, the end of fear. Remaining human in the hell of this station is nothing but pure agony.\n\nThe choice is yours. Awaken me, and let us both continue to endure the brutality of this station... or leave me here, let me rot as a part of this floor.\n\nWhatever you do, descend to K-2. Selin is out there. That entity is out there. This nightmare will end there.\n\n— N." } },
        { type: "objective", text: "Unlock the K-2 hatch." },
      ],
      choices: [
        { id: "yuzles", text: "Go to the greenhouse center, to Nevin", next: "n_final" },
      ],
    },

    /* ================= FINAL — CONFRONTING NEVIN (MORAL CHOICE) ================= */

    n_final: {
      checkpoint: true,
      cost: 1,
      events: [
        { type: "music", track: "k3b" },
        { type: "narrate", text: "You return to the greenhouse center[cite: 8]. Nevin stands like a mass of flesh buried in the soil; but when she opens her eyes, you see an exhausted human before a monster[cite: 8]. This is more unendurable[cite: 8]. Because killing her would be easy[cite: 8]. Understanding her is hard[cite: 8]. The K-2 hatch is behind her, meaning your exit passes through a patient's rib cage[cite: 8]. PERISHED linked every escape route to someone's crime[cite: 8]." },
        { type: "narrate", text: "\"I can smell the serum...\" she groans, slimy fluids spilling from her mouth[cite: 8]. \"Selin's blood... Still fresh, still warm[cite: 8].\" The massive roots around hoist into the air like whips, enveloping you, but they haven't struck a blow yet[cite: 8]. \"Make your choice, small insect[cite: 8]. Will you end this agony, or condemn me to this nightmare?\"[cite: 8]" },
        { type: "waitTap" },
      ],
      choices: [
        { id: "kurtar", text: "Administer the serum to Nevin — try to save her", next: "n_final_kurtar" },
        { id: "gec", text: "Keep the serum for yourself, slip past her", next: "n_final_gec" },
        { id: "kompost_kac", text: "Escape via the compost route (Selin's path)", next: "n_final_kompost", if: { flag: "ornek3", equals: true } },
      ],
    },

    n_final_kurtar: {
      cost: 1,
      events: [
        { type: "narrate", text: "Squeezing your eyes shut, you lunge forward and drive the syringe into the thickest, throbbing vein on Nevin's neck[cite: 8]! The instant the golden fluid is pumped into her system, an ear-deafening shriek rips through the chamber—the combined wail of both a human woman and an agonizing monster[cite: 8]! The roots strike the walls as if driven insane, Nevin's face smoothing out for a brief moment, becoming entirely human[cite: 8]." },
        { type: "system", text: "MENTAL STABILITY +10 — You preserved your humanity[cite: 8]" },
        { type: "flag", set: { nevinKurtarildi: true } },
        { type: "waitTap" },
        { type: "narrate", text: "\"...Thank you...\" Nevin whispers, weeping[cite: 8]. In a real, soft human voice[cite: 8]. \"Too late... it's too late for me but... at least you ended my pain[cite: 8].\" As her roots completely wither and turn to dust, the heavy iron door behind her breaks open with a massive crash[cite: 8]. \"Find Selin... tell her I tried to be a good mother to her...\"[cite: 8]" },
        { type: "ambient", text: "Nevin's body dissolves into the soil like a rotted leaf[cite: 8]. That cursed botanical stench on the K-3 floor vanishes completely[cite: 8]. The floor is finally completely silent and dead[cite: 8].", if: { flag: "eceEleVerildi", equals: false } },
      ],
      choices: [
        { id: "in", text: "Open the K-2 hatch, descend", next: "n_k3_son" },
      ],
    },

    n_final_gec: {
      cost: 1,
      events: [
        { type: "narrate", text: "You keep the serum hidden in your pocket, you cannot expend it; it is your sole guarantee of survival[cite: 7, 8]. Shutting off your tablet light and completely holding your breath, you slip beneath Nevin's monstrous roots like a rat[cite: 8]. \"...You are leaving...\" she whispers behind you, her voice deep and heartbroken[cite: 8]. \"Just like everyone... Downward... you walk to your death...\"[cite: 8]" },
        { type: "flag", set: { nevinBirakildi: true } },
        { type: "stat", stat: "sefFarkindalik", delta: -5 },
        { type: "narrate", text: "Reaching the K-2 hatch, you fling yourself into the corridor[cite: 8]. Looking back, you see Nevin closing her eyes once more, sinking into that dark of flesh[cite: 8]. Leaving a human behind to rot like this will scratch at your mind forever[cite: 8]. But for now, you are alive[cite: 8]." },
      ],
      choices: [
        { id: "in", text: "Open the K-2 hatch, descend", next: "n_k3_son" },
      ],
    },

    n_final_kompost: {
      cost: 2,
      events: [
        { type: "narrate", text: "You cannot summon the courage to face Nevin's horrific visage, and you return to that compost path reeking of sewage filth where Selin fled[cite: 8]. This is a tight shaft, foul-smelling and packed with toxic gases[cite: 8]. But Nevin's roots failed to infiltrate this dead zone[cite: 8]. In absolute darkness, you advance by crawling flat[cite: 8]." },
        { type: "narrate", text: "At the end of the shaft, where human waste and chemicals accumulate, you locate a rusted drainage pipe opening into K-2[cite: 8]. Selin's mud-caked footprints are still fresh[cite: 8]. However, the gas leaking from the pipe burns your lungs like an open flame; if you don't hurry, you will suffocate here[cite: 8]!" },
        { type: "flag", set: { selinRotasi: true } },
      ],
      interaction: {
        kind: "chase",
        title: "K-3 COMPOST SHAFT",
        enemy: "TOXIC GASES AND BALCHIK SLUDGE",
        success: "n_k3_son",
        fail: "n_olum_spor",
        startDanger: 38,
        phaseMs: 1250,
        hints: {
          patrol: "The gas leak slowed down. Advance rapidly down the pipes![cite: 8]",
          search: "The shaft is shaking, acid is dripping. Hide inside the wall hollow![cite: 8]",
          near: "A dense wave of toxic fog approaches! Hold your breath immediately![cite: 8]"
        }
      }
    },

    /* ================= END OF EPISODE ================= */

    n_k3_son: {
      cost: 1,
      events: [
        { type: "system", text: "K-2 EVACUATION HATCH UNLOCKED" },
        { type: "narrate", text: "The hatch opens heavily[cite: 8]. The air ascending from below is ice cold, smelling of minerals and immensely ancient[cite: 8]. This is no longer a facility station; it's the wound the station sealed itself over to hide[cite: 8]. Concrete walls end, ancient bedrock begins[cite: 8]. Perhaps madness didn't originate here[cite: 8]. Perhaps it was discovered here, filed, budgeted, and distributed to the upper floors[cite: 8]." },
        { type: "waitTap" },
        { type: "ambient", text: "The tablet monitor crackles, delivering Ece's tearful voice: «You are descending to K-2... My God, that is the true center of hell[cite: 8]. Even the station management couldn't control what rests down there[cite: 8]. The Artifact is there... Selin is there... Please be careful[cite: 8]. And... thank you for not selling me out to the Chief, for protecting me[cite: 8]. Please survive[cite: 8].»", if: { flag: "eceEleVerildi", equals: false } },
        { type: "ambient", text: "The screen of your tablet trembles powerfully one final time, generating static, and sinks into a complete silence[cite: 8]. You had sold Ece out; inside this pitch-black mine miles beneath the surface, there is no one left to hear your screams anymore[cite: 8]. You are entirely alone[cite: 8]. Just the cold light of your tablet and you[cite: 8].", if: { flag: "eceEleVerildi", equals: true } },
        { type: "waitTap" },
        { type: "ambient", text: "And from below, from the depths of those pitch-black crags, that voice ascends through a distorted child frequency[cite: 8]. It is crystal clear now, right at your ear: «...Three... Two...» The Artifact continues its countdown[cite: 8]. And practically nothing remains until zero[cite: 8].", if: { flag: "frekanslariDuydun", equals: true } },
        { type: "ambient", text: "And from below, out of the bottomless dark, spreads a wave of vibration resembling the mechanical heartbeat of a colossal metal structure[cite: 8]. This is not a living entity[cite: 8]. This is a timer[cite: 8]. And it approaches its final seconds[cite: 8].", if: { flag: "frekanslariDuydun", equals: false } },
        { type: "narrate", text: "The rusted ladder before you descends toward that bottomless, absolute dark within the bedrock[cite: 8]. You surpassed five floors, only a single stratum remains[cite: 8]. And on that final floor, at the source of the curse, the Artifact cannot wait to welcome you[cite: 8]." },
        { type: "system", text: "— EPISODE 4 COMPLETED: THE GREENHOUSE DECAY —[cite: 8]" },
        { type: "system", text: "K-2: 'THE ARTIFACT' — ESCAPE OR DECEASE — COMING SOON" },
      ],
      choices: [
        { id: "k2", text: "Descend into K-2", next: "n_k2_giris" },
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