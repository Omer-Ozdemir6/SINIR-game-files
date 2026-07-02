import React from 'react';

export default function PowerControl({ powerGrid, onTogglePower }) {
  const sectors = [
    { id: 'laboratory', label: 'LABORATORY GRIDS', desc: 'Açıkken terminal dosyaları okunabilir.' },
    { id: 'elevator', label: 'ELEVATOR SHAFT', desc: 'Alt katlara iniş için aktif olmalı.' },
    { id: 'securityDoors', label: 'MAGNETIC SEC-DOORS', desc: 'Kapatılırsa manyetik kilitler devre dışı kalır!' }
  ];

  // Aktif olan sistem sayısına göre şebeke yük barı hesaplama
  const activeCount = Object.values(powerGrid).filter(Boolean).length;
  const loadPercentage = activeCount === 3 ? '100% [CRITICAL LOAD]' : activeCount === 2 ? '66% [STABLE]' : activeCount === 1 ? '33% [LOW]' : '0% [DEAD]';

  return (
    <div className="w-full bg-zinc-950 p-3 rounded border border-zinc-900 font-mono my-2">
      <div className="flex justify-between items-center mb-2 border-b border-zinc-900 pb-1.5">
        <span className="text-[10px] text-zinc-500 tracking-widest uppercase">⚡ ANA GÜÇ DAĞITIM MATRİSİ</span>
        <span className={`text-[10px] font-bold ${activeCount === 3 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
          YÜK: {loadPercentage}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {sectors.map((sector) => {
          const isActive = powerGrid[sector.id];

          return (
            <div 
              key={sector.id} 
              className={`p-2 rounded border transition-all flex flex-col justify-between items-start
                ${isActive 
                  ? 'border-amber-600/40 bg-amber-950/5' 
                  : 'border-zinc-900 bg-black opacity-60'}`}
            >
              <div>
                <p className={`text-xs font-bold tracking-wider ${isActive ? 'text-amber-500' : 'text-zinc-600'}`}>
                  {sector.label}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">{sector.desc}</p>
              </div>

              <button
                onClick={() => onTogglePower(sector.id)}
                className={`mt-2 w-full py-1 text-[10px] font-bold tracking-widest rounded border transition-all active:scale-95
                  ${isActive 
                    ? 'bg-amber-500 text-black border-amber-400 hover:bg-amber-400' 
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'}`}
              >
                {isActive ? '[ ÇEVRİMİÇİ / GÜÇ VER ]' : '[ ÇEVRİMDIŞI / KES ]'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}