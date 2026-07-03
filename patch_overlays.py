import os

ch = []

# 1. BreathOverlay Güncellemesi
bo_path = 'src/components/interactions/BreathOverlay.jsx'
if os.path.exists(bo_path):
    s = open(bo_path, encoding='utf-8').read()
    
    # Hedef satırları dinamik bulmak için parçalara ayırıyoruz
    target_part = 'breath.holding ? "" : breath.phase === "wait" ? "EKRANA BAS VE TUTMAYA BAŞLA — ÇABUK" : ""'
    replacement_part = 'breath.spike && breath.holding\n          ? "CİĞERLERİN YANIYOR — DAYAN, SES ÇIKARMA"\n          : breath.holding ? "" : breath.phase === "wait" ? "EKRANA BAS VE TUTMAYA BAŞLA — ÇABUK" : ""'
    
    if target_part in s:
        s = s.replace(target_part, replacement_part, 1)
        open(bo_path, 'w', encoding='utf-8').write(s)
        ch.append("breath overlay OK")
    else:
        print("BreathOverlay için hedef aralık bulunamadı.")

# 2. ArchiveOverlays Güncellemesi
ao_path = 'src/components/ArchiveOverlays.jsx'
if os.path.exists(ao_path):
    d = open(ao_path, encoding='utf-8').read()
    
    target_start = 'export function DocPaper({ item, page, pages, onPrev, onNext, onClose }) {'
    
    # RE7 stili el yazısı eklemesi için fonksiyonun girişini güncelliyoruz
    old_block = """export function DocPaper({ item, page, pages, onPrev, onNext, onClose }) {
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={S.docPaper} className="s1-paper">
        <div style={S.docPaperMeta}>{item.meta}</div>
        <div style={S.docPaperBody}>{pages[page]}</div>"""
        
    new_block = """export function DocPaper({ item, page, pages, onPrev, onNext, onClose }) {
  const hand = item.style === "hand"; // el yazısı günlük (RE7 tarzı)
  return (
    <div style={S.overlayDim} onPointerDown={(e) => e.stopPropagation()}>
      <div style={hand ? S.docPaperHand : S.docPaper} className="s1-paper">
        {item.meta && <div style={hand ? S.docHandMeta : S.docPaperMeta}>{item.meta}</div>}
        <div style={hand ? S.docHandBody : S.docPaperBody}>{pages[page]}</div>"""

    # Eğer tam blok eşleşmezse satır sonu karakterlerinden kaçmak için temiz bir replace
    if target_start in d and '<div style={S.docPaper}' in d:
        # Kodun içindeki yapısal bloğu güncelleyelim
        d = d.replace(old_block.replace('\r\n', '\n'), new_block.replace('\r\n', '\n'))
        # Dosyadaki olası CRLF/LF uyumsuzluğuna karşı alternatif deneme
        if "const hand =" not in d:
            d = d.replace(old_block, new_block)
        
        open(ao_path, 'w', encoding='utf-8').write(d)
        ch.append("docpaper OK")
    else:
        print("ArchiveOverlays için hedef aralık bulunamadı.")

print("İŞLEM SONUCU:", ch)