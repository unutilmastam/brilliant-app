import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-3 text-sm text-ivory/70">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gold">◆</span>
            <span className="font-display text-xl text-ivory">BRILIANT</span>
          </div>
          <p>Jalyuzi, parda, videokamera va lyustra — sotib olish hamda professional o'rnatish bir joyda.</p>
        </div>
        <div>
          <div className="text-ivory mb-3 font-medium">Xizmatlar</div>
          <ul className="space-y-1.5">
            <li>Jalyuzi va parda o'lchov + montaj</li>
            <li>Videokamera o'rnatish</li>
            <li>Lyustra yetkazib berish va o'rnatish</li>
          </ul>
        </div>
        <div>
          <div className="text-ivory mb-3 font-medium">Aloqa</div>
          <ul className="space-y-1.5">
            <li>Tel: +998 90 000 00 00</li>
            <li>Ish vaqti: 09:00 – 19:00</li>
            <li>Toshkent</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-ivory/40 pb-6">© {new Date().getFullYear()} BRILIANT</div>
    </footer>
  );
}
