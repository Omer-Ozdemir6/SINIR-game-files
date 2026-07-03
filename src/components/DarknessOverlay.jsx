import { styles as S } from "../styles/theme";

/* KARANLIK MODU: pil %0 — engelleyici DEĞİL (pointerEvents: none).
   Ekran çoğunlukla siyah, aralıklı pırpırlarla görüntü gelip gider;
   oyuncu bu pencerelerde seçim yapıp pil aramaya devam eder.
   Üstte silik "SON GÜÇ" süresi akar. */
export default function DarknessOverlay({ left, totalMs }) {
  return (
    <>
      <div style={S.darknessOverlay} className="s1-darkmode" />
      <div style={S.darkBarWrap}>
        <span style={S.darkBarLabel}>SON GÜÇ</span>
        <div style={S.darkBarTrack}>
          <div style={{ ...S.darkBarFill, width: Math.max(0, (left / totalMs) * 100) + "%" }} />
        </div>
      </div>
    </>
  );
}
