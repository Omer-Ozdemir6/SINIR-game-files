import React from 'react';

export default function MapDisplay({ discoveredRooms, currentLocation }) {
  // İstasyonun ana koridor hattı ve odaları
  const allRooms = [
    { id: 'Control Room', label: 'CONTROL ROOM' },
    { id: 'B03 Corridor', label: 'B03 CORRIDOR' },
    { id: 'Maintenance', label: 'MAINTENANCE' },
    { id: 'Generator', label: 'GENERATOR ROOM' }
  ];

  return (
    <div className="w-full bg-zinc-950 p-3 rounded border border-zinc-900 font-mono my-2 text-center">
      <p className="text-[10px] text-zinc-600 mb-3 tracking-[0.2em] uppercase">
        📡 Otomatik Haritalama Sistemi v1.2
      </p>
      
      <div className="flex justify-center items-center md:space-x-4 space-x-1 overflow-x-auto py-1">
        {allRooms.map((room, index) => {
          const isDiscovered = discoveredRooms.includes(room.id);
          const isHere = currentLocation === room.id;

          return (
            <React.Fragment key={room.id}>
              {/* ODA KUTUSU */}
              <div 
                className={`px-3 py-1.5 border text-xs tracking-wider transition-all duration-700 rounded select-none min-w-[100px] md:min-w-[130px]
                  ${isHere 
                    ? 'border-green-500 text-green-400 font-bold bg-green-950/20 shadow-[0_0_15px_rgba(34,197,94,0.2)] animate-pulse' 
                    : isDiscovered 
                      ? 'border-zinc-800 text-zinc-500 bg-zinc-950' 
                      : 'border-zinc-950 text-zinc-800 bg-black opacity-40'}`}
              >
                {isDiscovered ? room.label : '???????'}
              </div>

              {/* BAĞLANTI OKU (Son eleman değilse araya ok koy) */}
              {index < allRooms.length - 1 && (
                <span 
                  className={`text-xs font-bold px-1 transition-colors duration-700
                    ${isDiscovered && discoveredRooms.includes(allRooms[index + 1].id)
                      ? 'text-zinc-700' 
                      : 'text-zinc-900'}`}
                >
                  ➔
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}