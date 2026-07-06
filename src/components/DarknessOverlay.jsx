import { styles as S } from "../styles/theme";

/* KARANLIK MODU v2 — pil bitişi karanlığı:
   · süre GİZLİ: bar/rakam yok
   · ekran aralıklı pırpırlar (s1-darkmode)
   · süre azaldıkça (p→1) kenarlar KIZARIR, oyun katmanı App'te
     griye döner — oyuncuya "yavaş yavaş ölüyorsun" hissi
   · kurtuluş: üstteki pil ikonuna dokun (yedek varsa)
   Engelleyici değildir: pointerEvents none. */
export default function DarknessOverlay({ p }) {
  return (
    <>
      {/* aralıklı karartma pırpırı */}
      <div style={S.darknessOverlay} className="s1-darkmode" />
      {/* kızaran kenarlar — ölüme yaklaştıkça koyulaşır */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 25, pointerEvents: "none",
        boxShadow: `inset 0 0 ${Math.round(30 + p * 170)}px ${Math.round(8 + p * 60)}px rgba(150,18,10,${(p * 0.8).toFixed(2)})`,
        transitionProperty: "box-shadow", transitionDuration: "600ms",
      }} />
    </>
  );
}
