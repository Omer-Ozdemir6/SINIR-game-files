import React, { useState } from 'react';

export default function NotebookOverlay({ isOpen, onClose, logs, setLogs }) {
  // Ekran durumları: 'menu', 'list', 'detail'
  const [viewMode, setViewMode] = useState('menu'); 
  const [selectedCategory, setSelectedCategory] = useState(null); // 'note' veya 'document'
  const [activeLog, setActiveLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Sayfa takibi için eklendi

  if (!isOpen) return null;

  // Dokümanı sayfalara bölme fonksiyonu
  const getPages = (text) => {
    if (!text) return [];
    const charLimit = 800; // Sayfa başına karakter sınırı
    const pages = [];
    for (let i = 0; i < text.length; i += charLimit) {
      pages.push(text.slice(i, i + charLimit));
    }
    return pages;
  };

  const handleSelectLog = (logItem) => {
    if (setLogs) {
      setLogs(prev => prev.map(l => l.id === logItem.id ? { ...l, isRead: true } : l));
    } else {
      logItem.isRead = true;
    }
    setActiveLog(logItem);
    setCurrentPage(0); // Her yeni dokümanda ilk sayfadan başlat
    setViewMode('detail');
  };

  const handleBackToMenu = () => {
    setViewMode('menu');
    setSelectedCategory(null);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setActiveLog(null);
  };

  // Sayfalama hesaplamaları
  const pages = activeLog && activeLog.type === 'document' ? getPages(activeLog.text) : [];
  const hasMultiplePages = pages.length > 1;

  return (
    <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono select-none">
      
      {/* --- KATEGORİ SEÇİM MENÜSÜ --- */}
      {viewMode === 'menu' && (
        <div className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 rounded p-8 text-center space-y-8 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="space-y-6 py-8">
            <button 
              onClick={() => { setSelectedCategory('note'); setViewMode('list'); }}
              className="block w-full text-center text-xl md:text-2xl text-zinc-400 hover:text-white transition-all tracking-widest py-2 hover:scale-105 active:scale-95"
            >
              Notes
            </button>
            <button 
              onClick={() => { setSelectedCategory('document'); setViewMode('list'); }}
              className="block w-full text-center text-xl md:text-2xl text-zinc-400 hover:text-white transition-all tracking-widest py-2 hover:scale-105 active:scale-95"
            >
              Documents
            </button>
          </div>
          <div className="flex justify-center pt-4">
            <button 
              onClick={onClose}
              className="px-8 py-1 rounded-full border border-zinc-700 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs tracking-widest transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- LİSTE GÖRÜNÜMÜ --- */}
      {viewMode === 'list' && (
        <div className="w-full max-w-2xl h-[80vh] bg-zinc-950/40 border border-zinc-800 rounded p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div>
            <h2 className="text-xl text-white tracking-widest border-b border-zinc-800 pb-3 mb-4 capitalize">
              {selectedCategory === 'note' ? 'Notes' : 'Documents'}
            </h2>

            <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-2">
              {logs && logs.filter(l => l.type === selectedCategory).length > 0 ? (
                logs.filter(l => l.type === selectedCategory).map((log) => (
                  <div 
                    key={log.id}
                    onClick={() => handleSelectLog(log)}
                    className="flex items-center space-x-3 cursor-pointer group py-1.5 border-b border-zinc-900 hover:border-zinc-800"
                  >
                    {!log.isRead ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] shrink-0 animate-pulse"></span>
                    ) : (
                      <span className="w-2.5 h-2.5 shrink-0 opacity-0"></span>
                    )}
                    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 tracking-wide transition-colors">
                      {log.title}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-zinc-600 italic text-sm pt-4">Bu kategoride henüz veri bulunmuyor.</p>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-4 border-t border-zinc-900">
            <button 
              onClick={handleBackToMenu}
              className="px-8 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 text-xs tracking-widest transition-all"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* --- DETAY SAYFASI --- */}
      {viewMode === 'detail' && activeLog && (
        <>
          {activeLog.type === 'note' ? (
            <div className="w-full max-w-lg bg-[#f4f1ea] text-[#1e3a8a] shadow-[0_10px_40px_rgba(0,0,0,0.7)] rounded-sm flex flex-col h-[85vh] relative border border-stone-400/40 animate-fade-in">
              <div 
                className="p-8 pb-20 overflow-y-auto flex-1 select-text tracking-wide"
                style={{ 
                  backgroundImage: 'linear-gradient(to bottom, transparent 29px, #93c5fd 29px)', 
                  backgroundSize: '100% 30px',
                  fontFamily: "'Caveat', cursive",
                  lineHeight: '30px',
                  fontSize: '1.35rem'
                }}
              >
                <h3 className="font-sans font-bold uppercase text-xs tracking-widest text-blue-950/40 mb-5 pb-1 block border-b border-blue-200/50">
                  {activeLog.title}
                </h3>
                <p className="whitespace-pre-wrap font-bold opacity-90">
                  {activeLog.text}
                </p>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center bg-gradient-to-t from-[#f4f1ea] via-[#f4f1ea] to-transparent pt-4 pb-2">
                <button 
                  onClick={handleBackToList}
                  className="px-8 py-1 rounded-full border border-stone-400/60 bg-stone-300/40 hover:bg-stone-300/70 text-stone-700 hover:text-stone-900 text-xs font-sans tracking-widest transition-all shadow-sm"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl bg-[#eae6df] text-stone-900 shadow-[0_15px_50px_rgba(0,0,0,0.85)] rounded-none flex flex-col h-[85vh] relative p-8 md:p-12 border border-stone-400/30 font-mono text-xs md:text-sm tracking-normal leading-relaxed overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,black,transparent)]"></div>
              
              <div className="overflow-y-auto flex-1 pb-16 pr-1 select-text scrollbar-thin">
                <div className="space-y-1 text-stone-700 border-b border-stone-400/40 pb-4 mb-6">
                  <div><span className="font-bold">From:</span> {activeLog.from || "station4.system@murkoffcorp.us.com"}</div>
                  <div><span className="font-bold">To:</span> {activeLog.classified_archive || "classified_archive@murkoffcorp.us.com"}</div>
                  <div><span className="font-bold">Subject:</span> {activeLog.title}</div>
                </div>

                <div className="text-stone-800 whitespace-pre-wrap opacity-90 leading-6 antialiased">
                  {pages[currentPage]}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-6 bg-gradient-to-t from-[#eae6df] via-[#eae6df]/95 to-transparent pt-6 pb-6">
                <button 
                  onClick={handleBackToList}
                  className="text-stone-600 hover:text-stone-950 text-xs tracking-widest uppercase transition-all duration-100 border-b border-transparent hover:border-stone-950 px-2 py-0.5"
                >
                  Back
                </button>
                
{hasMultiplePages && (
                  <button 
                    onClick={() => setCurrentPage(prev => (prev + 1) % pages.length)}
                    className="flex items-center space-x-2 text-stone-800 font-bold hover:text-black transition-all hover:scale-110"
                  >
                    <span className="text-[10px]">{currentPage + 1} / {pages.length}</span>
                    <span className="text-lg"> {">"} </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}