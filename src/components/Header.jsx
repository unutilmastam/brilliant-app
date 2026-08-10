import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV = [
  { to: '/katalog/jalyuzi', label: 'Jalyuzi' },
  { to: '/katalog/parda', label: 'Parda' },
  { to: '/katalog/videokamera', label: 'Videokamera' },
  { to: '/katalog/lyustra', label: 'Lyustra' },
  { to: '/buyurtma-holati', label: 'Buyurtmani kuzatish' },
  { to: '/aloqa', label: 'Aloqa' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-gold text-2xl leading-none">◆</span>
          <span className="font-display text-2xl tracking-wide text-ivory group-hover:text-gold transition-colors">
            BRILIANT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-gold' : 'text-ivory/80 hover:text-gold'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden text-ivory text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menyu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-ink px-5 py-4 flex flex-col gap-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-base ${isActive ? 'text-gold' : 'text-ivory/85'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
