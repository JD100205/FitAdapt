// src/components/dashboard/GamificacionBar.jsx
// FIX: reemplazados colores slate-* por neutral-* para consistencia visual.
import { useGamificacion } from '../../context/GamificacionContext';
import { formatPuntos }    from '../../utils/helpers';

function StatPill({ icon, label, value, valueClass = 'text-white' }) {
  return (
    <div className="flex items-center gap-3 bg-[#0a0a0a] border border-[#1f1f1f] px-4 h-12 flex-1 min-w-[120px]">
      <span className="flex-shrink-0">{icon}</span>
      <div className="leading-tight min-w-0">
        <p className="text-[9px] text-neutral-600 font-semibold uppercase tracking-widest">
          {label}
        </p>
        <p className={`text-xs font-bold tabular-nums ${valueClass}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function GamificacionBar() {
  const { racha, protectores, puntos } = useGamificacion();

  return (
    <div className="flex items-center gap-2 flex-wrap bg-[#111111] border border-[#1f1f1f] p-2">
      <StatPill
        icon={
          <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        label="Racha"
        value={`${racha} días`}
      />
      <StatPill
        icon={
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
        label="Escudos"
        value={protectores}
      />
      <StatPill
        icon={
          <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        }
        label="Score"
        value={formatPuntos(puntos)}
        valueClass="text-yellow-400"
      />
    </div>
  );
}
