import { useState, useEffect } from "react";
import { AudioSys } from "../audio/AudioSys";

/* BİTİŞ KARTLARI — bölüm sonundaki özet satırları ("— SON: X —" /
   özet / "TEŞEKKÜRLER") artık kayan hikaye ekranı yerine tek başına
   siyah zeminde, birer birer fade-in → dur → fade-out ile gösterilir.
   Oyuncu dokununca bir sonraki karta geçer; son karttan sonra onDone
   çağrılır (credits'e geçiş için). */
export default function EndingCards({ cards, onDone }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    AudioSys.music("endsound");
  }, []);

  const advance = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      if (index + 1 >= cards.length) { onDone(); return; }
      setIndex((i) => i + 1);
      setLeaving(false);
    }, 700);
  };

  return (
    <div
      onClick={advance}
      style={{
        position: "fixed", inset: 0, zIndex: 56,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 32px", cursor: "pointer",
        userSelect: "none", WebkitUserSelect: "none",
      }}
    >
      <p
        key={index}
        className={leaving ? "s1-fadeout" : "s1-fadein"}
        style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: "clamp(15px, 4vw, 22px)",
          lineHeight: 1.7,
          letterSpacing: "0.04em",
          color: "#eef0f4",
          textShadow: "0 0 16px rgba(220,230,245,0.2)",
          textAlign: "center",
          maxWidth: 640,
        }}
      >
        {cards[index]}
      </p>
    </div>
  );
}
