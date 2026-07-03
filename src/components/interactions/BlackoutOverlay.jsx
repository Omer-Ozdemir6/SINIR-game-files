import { styles as S } from "../../styles/theme";

/* Güç kaybı — iki faz:
   "flash": ekran birkaç saniye aralıklı aydınlanıp söner (s1-powerflash)
   "dark":  simsiyah; yedek varsa geri sayım + PİLİ TAK basılı tutma,
            yoksa kısa bir karanlık ve ölüm. */
export default function BlackoutOverlay({ blackout, count, totalMs, hold, spares, onHoldStart, onHoldEnd }) {
  const flash = blackout.phase === "flash";
  return (
    <div style={S.blackoutOverlay} className={flash ? "s1-powerflash" : ""}
      onPointerDown={(e) => { e.stopPropagation(); if (!flash) onHoldStart(); }}
      onPointerUp={(e) => { e.stopPropagation(); onHoldEnd(); }}
      onPointerCancel={(e) => { e.stopPropagation(); onHoldEnd(); }}>
      {flash ? (
        <div style={S.blackoutTitle}>GÜÇ KAYBI</div>
      ) : (
        <>
          <div style={S.blackoutTitle}>GÜÇ KAYBI</div>
          {blackout.hasSpare ? (
            <>
              <div style={S.blackoutText}>
                Zifiri karanlık. Parmakların cebindeki yedek pili arıyor — bul ve tak.
              </div>
              <div style={S.boCountTrack}>
                <div style={{ ...S.boCountFill, width: Math.max(0, (count / totalMs) * 100) + "%" }} />
              </div>
              <div style={S.boHoldBtn}>
                <div style={{ ...S.boHoldFill, width: (hold * 100) + "%" }} />
                <span style={S.boHoldText}>PİLİ TAK — BASILI TUT (×{spares})</span>
              </div>
            </>
          ) : (
            <div style={S.blackoutText}>Ceplerini yokluyorsun. Boşluktan başka bir şey yok.</div>
          )}
        </>
      )}
    </div>
  );
}
