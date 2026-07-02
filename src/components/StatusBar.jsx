import React from 'react';

export default function StatusBar({ pulseRate, battery }) {
  const getPulseConfig = () => {
    switch (pulseRate) {
      case 'kirmizi': return { color: 'bg-red-500', animation: 'animate-pulse' };
      case 'sari': return { color: 'bg-amber-500', animation: 'animate-pulse' };
      default: return { color: 'bg-green-500', animation: 'animate-pulse' };
    }
  };

  const pulse = getPulseConfig();
  const batteryLevel = Math.floor(battery / 10);
  const batteryColor = battery < 20 ? 'bg-red-500' : 'bg-zinc-300';

  return (
    <div className="w-full bg-zinc-950 p-2.5 rounded border border-zinc-900 flex justify-between items-center font-mono text-xs tracking-wider">
      
      {/* SOL: Gelişmiş Nabız Ritim Görselleştirici */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 h-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={`w-1 ${pulse.color} ${pulse.animation}`}
              style={{ 
                height: `${Math.random() * 80 + 20}%`,
                animationDelay: `${i * 0.15}s` 
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* SAĞ: Orijinal Batarya Sistemi */}
      <div className="flex items-center space-x-2">
        <span className="text-[10px] text-zinc-600">{batteryLevel} / 10</span>
        <div className="w-20 h-4 border border-zinc-600 rounded-sm p-[1px] relative">
          <div 
            className={`h-full transition-all duration-500 ${batteryColor}`} 
            style={{ width: `${battery}%` }}
          />
        </div>
      </div>
    </div>
  );
}