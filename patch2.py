import os

file_path = 'src/App.jsx'

if not os.path.exists(file_path):
    print(f"Hata: {file_path} bulunamadı!")
    exit()

s = open(file_path, encoding='utf-8').read()
ch = []

# ---- 8) nefes v2: adrenalin dalgaları + kademeli kalp ----
old = """    breathIntRef.current = setInterval(() => {
      t += 60;
      const holding = breathHoldingRef.current;
      if (holding) lung += 60;
      const phase = t >= holdMs ? "release" : holding ? "hold" : "wait";
      setBreath({ t, lung, holding, phase });
      // hiç basmadan 2 sn geçti → nefesin duyuldu
      if (!holding && t < holdMs && t > 2000 && lung === 0) return finish(failTo);
      // ciğer patladı
      if (lung >= lungMs) return finish(failTo);
    }, 60);"""
new = """    let heartStage = 0;
    breathIntRef.current = setInterval(() => {
      t += 60;
      const holding = breathHoldingRef.current;
      // ADRENALİN DALGALARI: iki pencerede ciğer 2 kat hızlı dolar
      const spike = (t > 2600 && t < 3900) || (t > 5100 && t < 6300);
      if (holding) lung += spike ? 120 : 60;
      const phase = t >= holdMs ? "release" : holding ? "hold" : "wait";
      setBreath({ t, lung, holding, phase, spike });
      // ciğer doldukça kalp hızlanır
      const stage = lung / lungMs > 0.62 ? 2 : lung / lungMs > 0.3 ? 1 : 0;
      if (stage !== heartStage) {
        heartStage = stage;
        AudioSys.heart(stage === 2 ? 360 : stage === 1 ? 440 : 520);
      }
      // hiç basmadan 2 sn geçti → nefesin duyuldu
      if (!holding && t < holdMs && t > 2000 && lung === 0) return finish(failTo);
      // ciğer patladı
      if (lung >= lungMs) return finish(failTo);
    }, 60);"""
if old in s: s = s.replace(old, new, 1); ch.append("breath-v2")

# ---- 9) radyo: yan frekans bayrakları + Ece kilit repliği ----
old = """  const radioAdjust = (delta) => {
    if (radioPhase !== "tune" || !interaction) return;
    AudioSys.blipSfx(340);
    const f = Math.round(Math.max(410, Math.min(450, radioFreq + delta)) * 10) / 10;
    setRadioFreq(f);"""
new = """  const radioAdjust = (delta) => {
    if (radioPhase !== "tune" || !interaction) return;
    AudioSys.blipSfx(340);
    const f = Math.round(Math.max(410, Math.min(450, radioFreq + delta)) * 10) / 10;
    setRadioFreq(f);
    // gizli yayınlar — dinlemek iz bırakır
    if (Math.abs(f - 437.4) <= 0.05 && !flagsRef.current.frekansCocuk) {
      setFlagsBoth({ frekansCocuk: true, frekanslariDuydun: !!flagsRef.current.frekansNefes });
      statsRef.current = { ...statsRef.current, akil: Math.max(0, (statsRef.current.akil || 100) - 5) };
      setStats({ ...statsRef.current });
    }
    if (Math.abs(f - 421.8) <= 0.05 && !flagsRef.current.frekansNefes) {
      setFlagsBoth({ frekansNefes: true, frekanslariDuydun: !!flagsRef.current.frekansCocuk });
      statsRef.current = { ...statsRef.current, akil: Math.max(0, (statsRef.current.akil || 100) - 5) };
      setStats({ ...statsRef.current });
    }"""
if old in s: s = s.replace(old, new, 1); ch.append("radio-flags")

old = '    if (radioPhase === "lock") return "\\\\"SINIR-1, sizi alıyoruz, konumunuzu—\\\\"";'
new = '    if (radioPhase === "lock") return "«Yüzey mi? …Yüzey üç haftadır cevap vermiyor. Kimsin sen?»";'
if old in s: s = s.replace(old, new, 1); ch.append("radio-lock-line")

old = '    if (Math.abs(f - interaction.target) < 0.8) return "…\'—NIR-1, duyuyor mus—\' … bir insan sesi!";'
new = '    if (Math.abs(f - interaction.target) < 0.8) return "…bir insan sesi! Genç bir kadın: «—yor musun? Cevap ver—»";'
if old in s: s = s.replace(old, new, 1); ch.append("radio-near-line")

# ---- 10) respawn/startFresh/restore temizliği ----
old = """  const respawn = () => {
    const cp = checkpointRef.current;
    setDeath(null);
    setDying(false);
    setBlackout(null);
    clearIntervals();
    if (blackoutResolveRef.current) blackoutResolveRef.current();
    clearPending();
    AudioSys.heart(null);
    if (!cp) return startFresh();
    restoreFrom(cp);
  };"""
new = """  const respawn = () => {
    const cp = checkpointRef.current;
    setDeath(null);
    setDying(false);
    stopDarkness(true);
    clearIntervals();
    clearPending();
    AudioSys.heart(null);
    if (!cp) return startFresh();
    restoreFrom(cp);
  };"""
if old in s: s = s.replace(old, new, 1); ch.append("respawn")

old = """    setDeath(null);
    setDying(false);
    setBlackout(null);
    if (blackoutResolveRef.current) blackoutResolveRef.current();
    setEnded(false);"""
new = """    setDeath(null);
    setDying(false);
    stopDarkness(true);
    setEnded(false);"""
if old in s: s = s.replace(old, new, 1); ch.append("startFresh")

# ---- 11) kalp efekti + skip + render ----
old = """    if (mode !== "game" || death || blackout || interaction?.kind === "breath") return;"""
new = """    if (mode !== "game" || death || dark || interaction?.kind === "breath") return;"""
if old in s: s = s.replace(old, new, 1); ch.append("heart-effect")

old = """  }, [battery, mode, death, blackout, interaction]);"""
new = """  }, [battery, mode, death, dark, interaction]);"""
if old in s: s = s.replace(old, new, 1); ch.append("heart-deps")

old = "  const handleSkipTap = () => { if (!screen && !interaction && !blackout) skipRef.current = true; };"
new = "  const handleSkipTap = () => { if (!screen && !interaction) skipRef.current = true; };"
if old in s: s = s.replace(old, new, 1); ch.append("skip")

old = """      {/* Güç kaybı */}
      {blackout && (
        <BlackoutOverlay blackout={blackout} count={boCount} totalMs={BLACKOUT_MS}
          hold={boHold} spares={spares}
          onHoldStart={() => { if (blackout.hasSpare) boHoldingRef.current = true; }}
          onHoldEnd={() => { boHoldingRef.current = false; }} />
      )}"""
new = """      {/* Karanlık modu — pil %0 */}
      {dark && <DarknessOverlay left={dark.left} totalMs={DARK_MS} />}"""
if old in s: s = s.replace(old, new, 1); ch.append("render")

open(file_path, 'w', encoding='utf-8').write(s)
print("PART2 Uygulandı:", ch)