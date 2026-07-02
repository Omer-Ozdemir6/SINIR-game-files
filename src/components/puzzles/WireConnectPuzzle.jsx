import React, { useState } from 'react';

export default function WireConnectPuzzle({ config, onSuccess, onFail }) {
  // Hata koruması: config veya gerekli alt alanlar yoksa boş döner
  if (!config || !config.wires || !config.slots) {
    return <div className="text-red-500 text-xs p-4">Error: Puzzle configuration invalid.</div>;
  }

  const { wires, slots } = config;
  
  const [connections, setConnections] = useState({});
  const [selectedWire, setSelectedWire] = useState(null);
  const [errorCount, setErrorCount] = useState(0);

  const handleWireSelect = (wireId) => {
    // Eğer zaten bağlıysa bağlantıyı kaldır
    if (connections[wireId]) {
      const updated = { ...connections };
      delete updated[wireId];
      setConnections(updated);
    }
    setSelectedWire(wireId);
  };

  const handleSlotSelect = (slotId) => {
    if (!selectedWire) return;

    const updatedConnections = { ...connections };
    // Eğer slot zaten doluysa eski bağlantıyı temizle
    Object.keys(updatedConnections).forEach(wireId => {
      if (updatedConnections[wireId] === slotId) {
        delete updatedConnections[wireId];
      }
    });

    updatedConnections[selectedWire] = slotId;
    setConnections(updatedConnections);
    setSelectedWire(null);

    // Eğer tüm kablolar bağlandıysa kontrol et
    if (Object.keys(updatedConnections).length === wires.length) {
      checkResults(updatedConnections);
    }
  };

  const checkResults = (finalConnections) => {
    let isAllCorrect = true;

    wires.forEach(wire => {
      if (finalConnections[wire.id] !== wire.targetSlot) {
        isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      onSuccess();
    } else {
      setErrorCount(prev => {
        const nextCount = prev + 1;
        if (nextCount >= 3) {
          onFail();
        } else {
          setConnections({}); // Hatalıysa bağlantıları sıfırla
        }
        return nextCount;
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 p-6 rounded shadow-[0_0_30px_rgba(0,0,0,0.6)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-6">
        <span className="text-xs text-amber-500 tracking-widest uppercase">▲ CIRCUIT BYPASS MODULE</span>
        <span className="text-[10px] bg-red-950 text-red-500 px-2 py-0.5 border border-red-900 rounded animate-pulse">
          ATTEMPTS LEFT: {3 - errorCount}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-12 relative my-4">
        <div className="space-y-4">
          <span className="text-[10px] text-zinc-500 block mb-2 uppercase tracking-wider">Outputs</span>
          {wires.map((wire) => {
            const isSelected = selectedWire === wire.id;
            const isConnected = !!connections[wire.id];
            
            return (
              <button
                key={wire.id}
                onClick={() => handleWireSelect(wire.id)}
                className={`w-full flex items-center justify-between p-3 rounded border text-xs transition-all ${
                  isSelected ? 'border-white bg-zinc-800 scale-105' : isConnected ? 'border-zinc-700 bg-zinc-950/60 opacity-60' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${wire.colorClass} shadow-sm`}></span>
                  <span className="text-zinc-300 font-bold">{wire.label}</span>
                </div>
                <span className="text-[9px] text-zinc-600">
                  {isConnected ? `➔ [${connections[wire.id]}]` : isSelected ? '[SELECT]' : '●'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <span className="text-[10px] text-zinc-500 block mb-2 uppercase tracking-wider">Terminal Inputs</span>
          {slots.map((slot) => {
            const connectedWire = wires.find(w => connections[w.id] === slot.id);
            return (
              <button
                key={slot.id}
                disabled={!selectedWire}
                onClick={() => handleSlotSelect(slot.id)}
                className={`w-full flex items-center justify-between p-3 rounded border text-xs text-left transition-all ${
                  connectedWire ? 'border-zinc-800 bg-zinc-950/80 text-zinc-500' : selectedWire ? 'border-amber-900/60 bg-amber-950/10 hover:bg-amber-950/30 text-amber-200 cursor-pointer' : 'border-zinc-800 bg-zinc-900/40 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <span className="font-bold">{slot.label}</span>
                <span className="text-[10px]">{connectedWire ? 'ON' : '○'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}