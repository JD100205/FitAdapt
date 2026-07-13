// src/components/layout/PrivateLayout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth }                      from '../../context/AuthContext';
import { useGamificacion }              from '../../context/GamificacionContext';
import FitAdaptLogo                     from '../ui/FitAdaptLogo';

const NAV_LINKS = [
  {
    to: '/dashboard',
    label: 'Inicio',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/entrenamiento',
    label: 'Entrenar',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    to: '/ranking',
    label: 'Ranking',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    to: '/tienda',
    label: 'Tienda',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
];

export default function PrivateLayout() {
  const { user, logout } = useAuth();
  const { racha }        = useGamificacion();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 flex flex-col sm:flex-row antialiased select-none">

      {/* SIDEBAR — escritorio */}
      <aside className="hidden sm:flex flex-col w-56 bg-[#0f0f0f] border-r border-[#1a1a1a] sticky top-0 h-screen z-40 p-5 justify-between">

        <div className="flex flex-col gap-7">
          {/* Logo */}
          <FitAdaptLogo size="sm" className="px-1 pt-1" />

          {/* Navegación */}
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 h-9 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors border-l-2 ${
                    isActive
                      ? 'bg-yellow-400/8 border-yellow-400 text-yellow-400'
                      : 'text-neutral-500 border-transparent hover:text-neutral-200 hover:bg-[#161616]'
                  }`
                }
              >
                <span className="flex items-center">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer del sidebar */}
        <div className="flex flex-col gap-3 border-t border-[#1a1a1a] pt-4">
          <div className="px-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-neutral-500">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="uppercase tracking-widest">Racha</span>
            </div>
            <span className="text-[11px] font-bold text-yellow-400">{racha || 0}d</span>
          </div>

          <div className="px-2 flex items-center justify-between">
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Usuario</span>
            <span className="text-[11px] font-semibold text-neutral-300 truncate max-w-[90px]">
              {user?.nombre || '—'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-[10px] bg-[#0a0a0a] hover:bg-red-950/30 text-neutral-600 hover:text-red-400 transition-colors font-semibold border border-[#1a1a1a] hover:border-red-900/40 h-8 flex items-center justify-center uppercase tracking-widest"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-5 py-8 mb-20 sm:mb-0 sm:py-10 overflow-y-auto">
        <Outlet />
      </main>

      {/* NAV MÓVIL inferior */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-[#0f0f0f] border-t border-[#1a1a1a] z-40 shadow-2xl">
        <div className="grid grid-cols-4 h-16">
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                  isActive ? 'text-yellow-400' : 'text-neutral-600'
                }`
              }
            >
              {icon}
              <span className="leading-none">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
