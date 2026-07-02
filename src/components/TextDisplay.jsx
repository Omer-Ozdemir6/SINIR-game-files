import React, { useState, useEffect, useRef } from 'react';

export default function TextDisplay({ text, pulseRate, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    // Yeni sahneye geçildiğinde temizlik yap
    setDisplayedText('');
    
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    let index = 0;
    let currentText = '';

    // Temiz bir daktilo efekti için interval
    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text.charAt(index);
        setDisplayedText(currentText);
        index++;

        // Yazı akarken kutunun otomatik olarak en aşağı kaymasını sağla (Auto-scroll)
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        if (onComplete) onComplete(); // Yazı bittiğinde App.jsx'e haber ver (Seçenekler görünür)
      }
    }, 20); // Harf basım hızı (ms)

    return () => clearInterval(interval);
  }, [text]);

  // Nabız durumuna göre terminal çerçeve ve gölge rengini belirle
  const getPulseColor = () => {
    if (pulseRate === 'kirmizi') return 'border-red-900/60 shadow-[0_0_20px_rgba(220,38,38,0.15)] text-red-100/90';
    if (pulseRate === 'sari') return 'border-amber-900/50 shadow-[0_0_15px_rgba(245,158,11,0.05)] text-amber-100/90';
    return 'border-zinc-900 shadow-[0_0_15px_rgba(0,0,0,0.5)]';
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full flex-1 bg-zinc-950/40 p-4 rounded border ${getPulseColor()} font-mono my-2 overflow-y-auto min-h-[150px] scrollbar-thin transition-all duration-300`}
    >
      <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap tracking-wide antialiased">
        {displayedText}
        {/* Yazı devam ederken yanıp sönen yeşil terminal imleci */}
        {displayedText.length < text?.length && (
          <span className="animate-pulse text-green-500 font-bold ml-0.5">_</span>
        )}
      </p>
    </div>
  );
}