import React from 'react';

export default function SettingsOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-sm border border-zinc-700 bg-zinc-950 p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] relative">
        
        {/* Sağ Üst Çarpı Butonu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-zinc-300 font-bold mb-6 tracking-widest text-center uppercase">Sistem Ayarları</h2>

        {/* Ayar Seçenekleri */}
        <div className="space-y-6">
          <SettingToggle label="Ses Efektleri" />
          <SettingToggle label="Titreşim" />
          
          <div>
            <label className="text-[10px] text-zinc-500 uppercase">Dil Seçeneği</label>
            <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 p-2 mt-1 text-sm outline-none">
              <option>Türkçe</option>
              <option>English</option>
            </select>
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="mt-8 space-y-3">
          <button onClick={() => window.location.reload()} className="w-full py-2 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 transition-all text-xs uppercase tracking-widest">
            Ana Menüye Dön
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="w-10 h-5 bg-zinc-800 border border-zinc-600 relative cursor-pointer">
        <div className="w-4 h-full bg-zinc-400 absolute right-0"></div>
      </div>
    </div>
  );
}