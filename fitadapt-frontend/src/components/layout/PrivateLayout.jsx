// src/components/layout/PrivateLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth }         from '../../context/AuthContext';
import { useGamificacion } from '../../context/GamificacionContext';

const NAV_LINKS = [
  { to: '/dashboard',     label: 'Inicio',   emoji: '🏠' },
  { to: '/entrenamiento', label: 'Entrena',  emoji: '🏋️' },
  { to: '/ranking',       label: 'Ranking',  emoji: '🏆' },
  { to: '/tienda',        label: 'Tienda',   emoji: '🛒' },
];

export default function PrivateLayout() {
  const { user, logout }   = useAuth();
  const { racha, puntos }  = useGamificacion();
  const navigate           = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Navbar top */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <span className="font-black text-indigo-600 text-lg tracking-tight">
            💪 FitAdapt
          </span>

          {/* Nav links — desktop */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, emoji }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                {emoji} {label}
              </NavLink>
            ))}
          </nav>

          {/* Usuario + racha + logout */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-orange-500 font-bold hidden sm:inline">
              🔥 {racha}
            </span>
            <span className="text-sm text-gray-500 hidden sm:inline">
              {user?.nombre}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-500 transition font-medium"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Contenido de la vista activa */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom nav — móvil */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900
        border-t border-gray-200 dark:border-gray-800 z-40 safe-area-inset-bottom">
        <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-gray-800">
          {NAV_LINKS.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2.5 text-xs font-medium transition ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span className="mt-0.5">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
