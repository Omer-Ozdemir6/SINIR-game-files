import { styles as S } from "../styles/theme";
import { t } from "../i18n";

/* Arşiv ana menüsü */
export function ArchiveMenu({ objective, onNotes, onDocs, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.menuObjective}>{t("hud.objective")}{objective}</div>
        <div style={S.menuButtons}>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onNotes}>{t("archive.notes")}</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onDocs}>{t("archive.docs")}</button>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>{t("archive.close")}</button>
      </div>
    </div>
  );
}

/* Not/Döküman listesi (okunmamışlarda kırmızı nokta) */
export function ArchiveList({ kind, items, onOpen, onBack }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.listPanel} className="s1-panel">
        <div style={S.listTitle}>{kind === "notes" ? t("archive.notes") : t("archive.docs")}</div>
        <div style={S.listBody}>
          {items.length === 0 && (
            <div style={S.emptyText}>
              {kind === "notes" ? t("archive.emptyNotes") : t("archive.emptyDocs")}
            </div>
          )}
          {items.map((item) => (
            <button key={item.id} className="s1-btn s1-row" style={S.listRow}
              onClick={() => onOpen(kind === "notes" ? "note" : "doc", item)}>
              <span style={S.rowDotSlot}>{!item.read && <span style={S.redDot} />}</span>
              <span style={S.rowText}>{item.title}</span>
            </button>
          ))}
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onBack}>{t("archive.back")}</button>
      </div>
    </div>
  );
}

/* El yazısı not kağıdı */
export function NotePaper({ item, onBack }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.notePaper} className="s1-paper">
        <div style={S.noteTitleRow}>
          <span style={S.notePaperTitle}>{item.title}</span>
          <span style={S.notePaperTime}>{item.time}</span>
        </div>
        <div style={S.notePaperBody}>{item.text}</div>
        <button className="s1-btn s1-menuitem" style={S.paperBack} onClick={onBack}>{t("archive.back")}</button>
      </div>
    </div>
  );
}

/* Resmi döküman — sayfalı, kaydırmasız */
export function DocPaper({ item, page, pages, onPrev, onNext, onClose }) {
  const hand = item.style === "hand"; // el yazısı günlük (RE7 tarzı)
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={hand ? S.docPaperHand : S.docPaper} className="s1-paper">
        {item.meta && <div style={hand ? S.docHandMeta : S.docPaperMeta}>{item.meta}</div>}
        <div style={hand ? S.docHandBody : S.docPaperBody}>{pages[page]}</div>
        <div style={S.docNav}>
          <button className="s1-btn" style={{ ...S.docArrow, visibility: page > 0 ? "visible" : "hidden" }}
            onClick={onPrev}>
            ‹
          </button>
          <button className="s1-btn s1-menuitem" style={S.paperBackDark} onClick={onClose}>
            {t("archive.close")}
          </button>
          <button className="s1-btn" style={{ ...S.docArrow, visibility: page < pages.length - 1 ? "visible" : "hidden" }}
            onClick={onNext}>
            ›
          </button>
        </div>
        {pages.length > 1 && (
          <div style={S.docPageInfo}>{page + 1} / {pages.length}</div>
        )}
      </div>
    </div>
  );
}
