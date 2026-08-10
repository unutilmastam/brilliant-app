import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LINKS = [
  { to: '/admin', label: 'Umumiy', end: true },
  { to: '/admin/mahsulotlar', label: 'Mahsulotlar' },
  { to: '/admin/buyurtmalar', label: 'Buyurtmalar' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-line px-5 py-6 hidden sm:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-gold">◆</span>
            <span className="font-display text-xl text-ivory">BRILIANT</span>
          </div>
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-sm text-sm ${isActive ? 'bg-gold/15 text-gold' : 'text-ivory/70 hover:text-ivory'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div>
          <div className="text-xs text-ivory/40 mb-2 truncate">{user?.email}</div>
          <button onClick={handleLogout} className="text-sm text-ivory/60 hover:text-gold">
            Chiqish
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
