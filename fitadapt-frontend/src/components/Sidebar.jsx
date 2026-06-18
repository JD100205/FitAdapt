import { Link } from 'react-router-dom';
import { Home, Activity, TrendingUp, MessageCircle, Crown, LogOut } from 'lucide-react';

// Enlaces que ya existen visualmente en el prototipo de Figma pero que
// todavía no tienen una página real detrás. Se muestran como referencia
// de hacia dónde va el producto, marcados con "Pronto" para no fingir
// que funcionan.
const ENLACES_FUTUROS = [
  { key: 'inicio', label: 'Inicio', Icon: Home },
  { key: 'progreso', label: 'Progreso', Icon: TrendingUp },
  { key: 'asistente', label: 'Asistente', Icon: MessageCircle },
  { key: 'premium', label: 'Premium', Icon: Crown },
];

export default function Sidebar({ onCerrarSesion }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M3 13h3l2-5 3 9 3-7 2 3h5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="brand-name">FitAdapt</span>
      </div>

      <nav className="sidebar-nav">
        {ENLACES_FUTUROS.slice(0, 1).map(({ key, label, Icon }) => (
          <div key={key} className="nav-item is-disabled" aria-disabled="true">
            <Icon size={18} />
            <span className="nav-label">{label}</span>
            <span className="pronto-tag">Pronto</span>
          </div>
        ))}

        <div className="nav-item is-active" aria-current="page">
          <Activity size={18} />
          <span className="nav-label">Rutina</span>
        </div>

        {ENLACES_FUTUROS.slice(1).map(({ key, label, Icon }) => (
          <div key={key} className="nav-item is-disabled" aria-disabled="true">
            <Icon size={18} />
            <span className="nav-label">{label}</span>
            <span className="pronto-tag">Pronto</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" onClick={onCerrarSesion} className="nav-item nav-logout">
          <LogOut size={18} />
          <span className="nav-label">Cerrar sesión</span>
        </Link>
      </div>
    </aside>
  );
}
