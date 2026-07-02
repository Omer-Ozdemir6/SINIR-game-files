import React, { useState } from 'react';
import { storyData } from '../data/storyData';

export default function GameContainer() {
  const [currentNodeKey, setCurrentNodeKey] = useState('intro_kriyojenik');
  const [inventory, setInventory] = useState([]);
  const [logs, setLogs] = useState(['Simülasyon Başlatıldı...']);

  const currentNode = storyData[currentNodeKey];

  const handleOptionClick = (nextNodeKey, inventoryAdd) => {
    // Eğer seçenekte envantere eklenecek bir eşya varsa ekle
    if (inventoryAdd && !inventory.includes(inventoryAdd)) {
      setInventory([...inventory, inventoryAdd]);
      setLogs(prev => [...prev, `[ENVANTER]: ${inventoryAdd} eklendi.`]);
    }

    // Log kaydı düş
    setLogs(prev => [...prev, `> ${storyData[nextNodeKey]?.title || 'Yeni Alan'}`]);
    
    // Sahneyi değiştir
    if (storyData[nextNodeKey]) {
      setCurrentNodeKey(nextNodeKey);
    } else {
      alert("Bu düğüm henüz kutsal kitapta yazılmadı (Perde 2 Yapım Aşamasında)!");
    }
  };

  // Nabız rengini dinamik belirleme
  const getPulseColor = (pulse) => {
    if (pulse > 120) return 'text-red-500 font-bold animate-pulse';
    if (pulse > 100) return 'text-yellow-500';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-mono p-6 flex flex-col md:flex-row gap-6 selection:bg-neutral-800 selection:text-emerald-400">
      
      {/* SOL PANEL: Oyun Alanı ve Tasvirler */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col justify-between shadow-2xl">
        
        {/* Üst Bar: Durum Göstergeleri */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-4">
          <div>
            <span className="text-neutral-500 text-xs uppercase block">Bölge</span>
            <h2 className="text-emerald-400 font-semibold">{currentNode.title}</h2>
          </div>
          <div className="text-right">
            <span className="text-neutral-500 text-xs uppercase block">Hayati Durum</span>
            <span className={`text-xs px-2 py-1 rounded bg-neutral-950 border border-neutral-800`}>
              {currentNode.status.label}
            </span>
          </div>
          <div className="text-right">
            <span className="text-neutral-500 text-xs uppercase block">Anlık Nabız</span>
            <span className={getPulseColor(currentNode.pulse)}>{currentNode.pulse} BPM</span>
          </div>
        </div>

        {/* Orta Alan: Metin Tasviri */}
        <div className="flex-1 my-6 overflow-y-auto pr-2 text-sm leading-relaxed whitespace-pre-line text-neutral-300">
          {currentNode.description}
        </div>

        {/* Alt Alan: Karar Butonları */}
        <div className="border-t border-neutral-800 pt-4 flex flex-col gap-2">
          <span className="text-neutral-500 text-xs uppercase mb-1 block">[ Bir Karar Ver ]</span>
          {currentNode.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.nextNode, option.inventoryAdd)}
              className="w-full text-left bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-600 p-3 rounded text-sm transition-all duration-200 group flex items-center gap-2"
            >
              <span className="text-emerald-500 group-hover:translate-x-1 transition-transform">➔</span>
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* SAĞ PANEL: Envanter ve Sistem Logları */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        
        {/* Envanter Kutusu */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-xl">
          <h3 className="text-xs text-neutral-500 uppercase border-b border-neutral-800 pb-2 mb-3">🎒 Sırt Çantası</h3>
          {inventory.length === 0 ? (
            <p className="text-xs text-neutral-600 italic">Çanta boş...</p>
          ) : (
            <ul className="text-xs space-y-1 text-emerald-500">
              {inventory.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>•</span> {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sistem Terminal Logları */}
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-4 shadow-xl flex flex-col justify-between max-h-64 md:max-h-none">
          <h3 className="text-xs text-neutral-500 uppercase border-b border-neutral-800 pb-2 mb-3">📟 Terminal Günlüğü</h3>
          <div className="flex-1 overflow-y-auto text-[11px] text-neutral-500 space-y-1 font-mono">
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}