import React, { useState, useEffect } from 'react';

export default function MemoryPatternPuzzle({ config, onSuccess, onFail }) {
  const { pattern, symbols, displayDuration } = config;

  const [gameState, setGameState] = useState('SHOWING'); // SHOWING, INPUT, SUCCESS, FAIL
  const [playerInput, setPlayerInput] = useState([]);
  const [lives, setLives] = useState(3);

  // İlk açılışta veya başarısız denemede sembolleri oyuncuya gösterir
  useEffect(() => {
    if (gameState === 'SHOWING') {
      const timer = setTimeout(() => {
        setGameState('INPUT');
      }, displayDuration);
      return () => clearTimeout(timer);
    }
  }, [gameState, displayDuration]);

  const handleSymbolClick = (symbol) => {
    if (gameState !== 'INPUT') return;

    const nextInput = [...playerInput, symbol];
    const currentIndex = playerInput.length;

    // Girdi doğru mu gidiyor?
    if (pattern[currentIndex] === symbol) {
      setPlayerInput(nextInput);

      // Tüm dizi doğru tamamlandıysa
      if (nextInput.length === pattern.length) {
        setGameState('SUCCESS');
        setTimeout(() => onSuccess(), 1200);
      }
    } else {
      // Hatalı giriş: Canı düşür, girdiyi sıfırla ve tekrar gösterim moduna geç
      const nextLives = lives - 1;
      setLives(nextLives);
      setPlayerInput([]);

      if (nextLives <= 0) {
        setGameState('FAIL');
        setTimeout(() => onFail(), 1000);
      } else {
        setGameState('SHOWING'); // Hafıza tazelemesi için örüntüyü tekrar göster
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-950/90 border border-zinc-900 p-6 rounded shadow-[0_0_25px_rgba(0,0,0,0.8)] font-mono animate-fade-in my-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-4">
        <span className="text-xs text-cyan-500 tracking-widest uppercase">🖥️ MAINFRAME PATTERN KEY</span>
        <span className="text-[10px] bg-red-950 text-red-500 px-2 py-0.5 border border-red-900 rounded">
          ATTEMPTS LEFT: {lives}
        </span>
      </div>

      {/* SEMBOL GÖSTERİM VEYA GİRİŞ EKRANI */}
      <div className="bg-zinc-950 border border-zinc-900 p-6 rounded text-center my-4 min-h-[90px] flex flex-col items-center justify-center relative overflow-hidden">
        {gameState === 'SHOWING' && (
          <>
            <span className="text-[8px] text-amber-500 tracking-widest uppercase mb-3 animate-pulse">
              ⚠️ MEMORIZE SECURITY PATTERN:
            </span>
            <div className="flex space-x-4 text-2xl text-cyan-400 font-sans tracking-widest font-bold">
              {pattern.map((sym, index) => (
                <span key={index} className="animate-fade-in">{sym}</span>
              ))}
            </div>
          </>
        )}

        {gameState === 'INPUT' && (
          <>
            <span className="text-[8px] text-zinc-500 tracking-widest uppercase mb-3">
              ENTER OVERRIDE SEQUENCE:
            </span>
            <div className="flex space-x-4 text-2xl text-zinc-300 font-sans tracking-widest min-h-[32px]">
              {playerInput.map((sym, index) => (
                <span key={index} className="text-emerald-400">
                  {sym}
                </span>
              ))}
              {Array.from({ length: pattern.length - playerInput.length }).map((_, i) => (
                <span key={i} className="text-zinc-800 border-b border-zinc-800 w-6 text-center inline-block">_</span>
              ))}
            </div>
          </>
        )}

        {gameState === 'SUCCESS' && (
          <span className="text-xs text-emerald-400 font-bold tracking-widest animate-pulse uppercase">
            [ ACCESS GRANTED - CREDENTIALS MATCHED ]
          </span>
        )}

        {gameState === 'FAIL' && (
          <span className="text-xs text-red-500 font-bold tracking-widest animate-pulse uppercase">
            [ SYSTEM LOCKDOWN INITIATED ]
          </span>
        )}
      </div>

      {/* OYUNCU ETKİLEŞİM PANELİ (KLAVYE) */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {symbols.map((symbol, index) => (
          <button
            key={index}
            onClick={() => handleSymbolClick(symbol)}
            disabled={gameState !== 'INPUT'}
            className={`p-4 bg-zinc-900 border text-base font-sans font-bold rounded transition-all active:scale-95 flex items-center justify-center ${
              gameState === 'INPUT'
                ? 'border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                : 'border-zinc-950 text-zinc-700 cursor-not-allowed'
            }`}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
}