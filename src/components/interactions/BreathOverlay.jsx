import { styles as S } from "../../styles/theme";

/* Nefes tutma: tüm ekran basılı tutulur. Kurallar App'te;
   burada yalnız görsel: fazlar, TEHLİKE ve CİĞER barları. */
export default function BreathOverlay({ breath, holdMs, lungMs, onDown, onUp }) {
  return (
    <div style={S.breathOverlay}
      onPointerDown={(e) => { e.stopPropagation(); onDown(); }}
      onPointerUp={(e) => { e.stopPropagation(); onUp(); }}
      onPointerCancel={(e) => { e.stopPropagation(); onUp(); }}>
      <div style={S.breathTitle}>
        {breath.phase === "release" ? "UZAKLAŞIYOR — YAVAŞÇA BIRAK" : "NEFESİNİ TUT"}
      </div>
      <div style={S.breathPhaseText}>
        {breath.t < 2500 ? "Islak adımlar odada dolanıyor…"
          : breath.t < 5000 ? "Tam masanın yanında durdu."
          : breath.t < 7000 ? "Nefesi ensende. Eğiliyor."
          : "Doğruldu. Kapıya yöneliyor…"}
      </div>
      <div style={S.breathBars}>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>TEHLİKE</span>
          <div style={S.mechProgTrack}>
            <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.t / holdMs) * 100) + "%", backgroundColor: "#7fae86" }} />
          </div>
        </div>
        <div style={S.breathBarBlock}>
          <span style={S.statLabel}>CİĞER</span>
          <div style={S.mechProgTrack}>
            <div style={{ ...S.mechProgFill, width: Math.min(100, (breath.lung / lungMs) * 100) + "%", backgroundColor: "#c23b2e" }} />
          </div>
        </div>
      </div>
      <div style={S.breathHint}>
        {breath.spike && breath.holding
          ? "CİĞERLERİN YANIYOR — DAYAN, SES ÇIKARMA"
          : breath.holding ? "" : breath.phase === "wait" ? "EKRANA BAS VE TUTMAYA BAŞLA — ÇABUK" : ""}
      </div>
    </div>
  );
}
