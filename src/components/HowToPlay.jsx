import { t, tRaw } from "../i18n";

/* NASIL OYNANIR — oyun mekaniklerini anlatan overlay.
   Ana menüden ve duraklat menüsünden açılabilir. */
export default function HowToPlay({ onClose }) {
  const sections = tRaw("howto.sections"); // dizi: [{title, body}]
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 56,
        background: "rgba(4,7,9,0.96)",
        overflowY: "auto", cursor: "pointer",
        padding: "28px 22px 60px",
      }}
      className="s1-fadein"
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: 22, fontWeight: 700, letterSpacing: "0.2em",
          color: "#dfe6df", textAlign: "center", marginBottom: 6,
        }}>
          {t("howto.title")}
        </div>
        <div style={{
          fontFamily: "'Courier New', ui-monospace, monospace",
          fontSize: 11, letterSpacing: "0.1em", color: "#5f7075",
          textAlign: "center", marginBottom: 26,
        }}>
          {t("howto.subtitle")}
        </div>

        {Array.isArray(sections) && sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.14em",
              color: "#7a9a86", marginBottom: 6,
              borderLeft: "3px solid #3a5a4c", paddingLeft: 10,
            }}>
              {sec.title}
            </div>
            <div style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              fontSize: 12.5, lineHeight: 1.7, color: "#b4c2b8",
              paddingLeft: 13, whiteSpace: "pre-wrap",
            }}>
              {sec.body}
            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          className="s1-btn"
          style={{
            display: "block", margin: "28px auto 0",
            fontFamily: "'Courier New', ui-monospace, monospace",
            fontSize: 13, letterSpacing: "0.18em",
            color: "#cdd6cf", background: "rgba(20,30,26,0.8)",
            border: "1px solid #3a5a4c", padding: "10px 28px", cursor: "pointer",
          }}
        >
          {t("howto.close")}
        </button>
      </div>
    </div>
  );
}
