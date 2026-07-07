import { useEffect, useRef, useState } from "react";
import { AudioSys } from "../../audio/AudioSys";
import { styles as S } from "../../styles/theme";

const mono = "'Courier New', ui-monospace, monospace";

const PHASES = [
  { key: "patrol", label: "UZAKTA", hint: "Fener duvara vuruyor. Kisa bir kosu sansin var." },
  { key: "search", label: "ARIYOR", hint: "Isik taramaya basladi. Saklan veya yavasla." },
  { key: "near", label: "YAKIN", hint: "Hemen dibinde. Nefesini bile sayiyor." },
];

export default function ChaseOverlay({ config, onSuccess, onFail }) {
  const [progress, setProgress] = useState(0);
  const [danger, setDanger] = useState(config.startDanger ?? 24);
  const [oxygen, setOxygen] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [action, setAction] = useState("idle");
  const [done, setDone] = useState(false);
  const actionRef = useRef("idle");
  const doneRef = useRef(false);
  const phaseIndexRef = useRef(0);
  const phase = PHASES[phaseIndex % PHASES.length];
  const ui = {
    exit: "CIKIS",
    danger: "YAKALANMA",
    breath: "NEFES",
    run: "KOS",
    hide: "SAKLAN",
    hold: "NEFES TUT",
    running: "KOSUYORSUN",
    hiding: "SAKLANIYORSUN",
    holding: "NEFESINI TUTUYORSUN",
    idle: "KARARSIZSIN",
    ...config.ui,
  };

  const setAct = (next) => {
    actionRef.current = next;
    setAction(next);
  };

  useEffect(() => {
    AudioSys.music(config.music || "chase");
    AudioSys.heart(380);
    AudioSys.burst(120);

    const phaseTimer = setInterval(() => {
      setPhaseIndex((p) => {
        const next = p + 1;
        const nextPhase = PHASES[next % PHASES.length];
        if (nextPhase.key === "near") AudioSys.boom();
        else AudioSys.clank();
        return next;
      });
    }, config.phaseMs || 1450);

    const tick = setInterval(() => {
      if (doneRef.current) return;
      const act = actionRef.current;
      const currentPhase = PHASES[phaseIndexRef.current % PHASES.length]?.key || "patrol";

      setProgress((p) => {
        let add = 0;
        if (act === "run") add = currentPhase === "near" ? 3.2 : currentPhase === "search" ? 5.2 : 8.4;
        if (act === "hide") add = currentPhase === "patrol" ? 1.1 : 0.2;
        if (act === "breath") add = 0.45;
        if (act === "idle") add = 0.7;
        const next = Math.min(100, p + add);
        if (next >= 100) {
          doneRef.current = true;
          setDone(true);
          AudioSys.heart(null);
          AudioSys.blipSfx(980);
          setTimeout(onSuccess, 650);
        }
        return next;
      });

      setDanger((d) => {
        let delta = 0;
        if (act === "run") delta = currentPhase === "near" ? 15 : currentPhase === "search" ? 8 : 3;
        if (act === "hide") delta = currentPhase === "near" ? 2 : currentPhase === "search" ? -4 : -7;
        if (act === "breath") delta = currentPhase === "near" ? -8 : -5;
        if (act === "idle") delta = currentPhase === "near" ? 7 : currentPhase === "search" ? 3 : -2;
        const next = Math.max(0, Math.min(100, d + delta));
        if (next >= 100) {
          doneRef.current = true;
          setDone(true);
          AudioSys.buzzSfx();
          AudioSys.heart(null);
          setTimeout(() => onFail(config.failPenalty || { text: config.failText || "Yakalandin." }), 500);
        }
        return next;
      });

      setOxygen((o) => {
        const next = actionRef.current === "breath" ? Math.min(100, o + 10) : Math.max(0, o - 12);
        if (next >= 100) {
          doneRef.current = true;
          setDone(true);
          AudioSys.buzzSfx();
          AudioSys.heart(null);
          setTimeout(() => onFail(config.failPenalty || { text: config.failText || "Nefesin cozuldu." }), 500);
        }
        return next;
      });
    }, 360);

    return () => {
      clearInterval(phaseTimer);
      clearInterval(tick);
      AudioSys.heart(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { phaseIndexRef.current = phaseIndex; }, [phaseIndex]);

  const actionLabel = action === "run" ? ui.running : action === "hide" ? ui.hiding : action === "breath" ? ui.holding : ui.idle;

  return (
    <div style={S.chaseOverlay} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.chasePanel} className={phase.key === "near" ? "s1-powerflash" : ""}>
        <div style={S.chaseTitle}>{config.title || "KOVALANIYORSUN"}</div>
        <div style={S.chaseEnemy}>{config.enemy || "BIRI SENI ARIYOR"}</div>
        <div style={S.chaseCorridor}>
          <div style={{ ...S.chaseBeam, opacity: phase.key === "patrol" ? 0.22 : phase.key === "search" ? 0.42 : 0.72 }} />
          <div style={{ ...S.chaseHunter, right: `${Math.max(8, 62 - danger * 0.42)}%` }} />
          <div style={{ ...S.chasePlayer, left: `${Math.min(82, 8 + progress * 0.74)}%` }} />
        </div>

        <div style={S.chaseStatusRow}>
          <span>{config.phaseLabels?.[phase.key] || phase.label}</span>
          <span>{actionLabel}</span>
        </div>
        <div style={S.chaseHint}>{config.hints?.[phase.key] || phase.hint}</div>

        <Meter label={ui.exit} value={progress} color="#7fae86" />
        <Meter label={ui.danger} value={danger} color="#c23b2e" />
        <Meter label={ui.breath} value={oxygen} color="#d0a64a" />

        <div style={S.chaseButtons}>
          <HoldButton label={ui.run} active={action === "run"} onDown={() => setAct("run")} onUp={() => setAct("idle")} />
          <HoldButton label={ui.hide} active={action === "hide"} onDown={() => setAct("hide")} onUp={() => setAct("idle")} />
          <HoldButton label={ui.hold} active={action === "breath"} onDown={() => setAct("breath")} onUp={() => setAct("idle")} />
        </div>

        {done && <div style={S.chaseHint}>...</div>}
      </div>
    </div>
  );
}

function Meter({ label, value, color }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 9, color: "#6f817a", letterSpacing: "0.14em" }}>
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div style={S.mechProgTrack}>
        <div style={{ ...S.mechProgFill, width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function HoldButton({ label, active, onDown, onUp }) {
  return (
    <button
      className="s1-btn s1-key"
      style={{ ...S.keyBtn, borderColor: active ? "#d0b06a" : S.keyBtn.border, color: active ? "#f3e3b0" : S.keyBtn.color }}
      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); onDown(); }}
      onPointerUp={(e) => { e.preventDefault(); e.stopPropagation(); onUp(); }}
      onPointerCancel={(e) => { e.stopPropagation(); onUp(); }}
      onPointerLeave={(e) => { e.stopPropagation(); onUp(); }}
    >
      {label}
    </button>
  );
}
