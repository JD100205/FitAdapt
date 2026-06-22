// src/components/dashboard/GamificacionBar.jsx
import { useGamificacion } from '../../context/GamificacionContext';
import { formatPuntos }    from '../../utils/helpers';

export default function GamificacionBar() {
  const { racha, protectores, puntos } = useGamificacion();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Racha */}
      <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl px-4 py-2.5">
        <span className="text-2xl leading-none">🔥</span>
        <div className="leading-tight">
          <p className="text-xs text-orange-400 font-medium uppercase tracking-wide">Racha</p>
          <p className="text-xl font-black text-orange-600 dark:text-orange-400">
            {racha} <span className="text-sm font-medium">días</span>
          </p>
        </div>
      </div>

      {/* Protectores */}
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl px-4 py-2.5">
        <span className="text-2xl leading-none">🛡</span>
        <div className="leading-tight">
          <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">Protectores</p>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400">
            {protectores}
          </p>
        </div>
      </div>

      {/* Puntos totales */}
      <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl px-4 py-2.5 ml-auto">
        <span className="text-2xl leading-none">⭐</span>
        <div className="leading-tight">
          <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Puntos</p>
          <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {formatPuntos(puntos)}
          </p>
        </div>
      </div>
    </div>
  );
}
