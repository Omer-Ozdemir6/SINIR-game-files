import { styles as S } from "../styles/theme";

/* Arşiv ana menüsü */
export function ArchiveMenu({ objective, onNotes, onDocs, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.menuPanel} className="s1-panel">
        <div style={S.menuObjective}>Görev: {objective}</div>
        <div style={S.menuButtons}>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onNotes}>Notlar</button>
          <button className="s1-btn s1-menuitem" style={S.menuItem} onClick={onDocs}>Dökümanlar</button>
        </div>
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
}

/* Not/Döküman listesi (okunmamışlarda kırmızı nokta) */
export function ArchiveList({ kind, items, onOpen, onBack }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.listPanel} className="s1-panel">
        <div style={S.listTitle}>{kind === "notes" ? "Notlar" : "Dökümanlar"}</div>
        <div style={S.listBody}>
          {items.length === 0 && (
            <div style={S.emptyText}>
              {kind === "notes" ? "Henüz not yazılmadı." : "Henüz döküman toplanmadı. Ortalığı aramayı dene."}
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
        <button className="s1-btn s1-menuitem" style={S.menuClose} onClick={onBack}>Geri</button>
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
        <button className="s1-btn s1-menuitem" style={S.paperBack} onClick={onBack}>Geri</button>
      </div>
    </div>
  );
}

/* Resmi döküman — sayfalı, kaydırmasız */
export function DocPaper({ item, page, pages, onPrev, onNext, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.docPaper} className="s1-paper">
        <div style={S.docPaperMeta}>{item.meta}</div>
        <div style={S.docPaperBody}>{pages[page]}</div>
        <div style={S.docNav}>
          <button className="s1-btn" style={{ ...S.docArrow, visibility: page > 0 ? "visible" : "hidden" }}
            onClick={onPrev}>
            ‹
          </button>
          <button className="s1-btn s1-menuitem" style={S.paperBackDark} onClick={onClose}>
            Kapat
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
