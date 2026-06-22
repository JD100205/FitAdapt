// src/components/workout/CompletionModal.jsx
// Recibe resultado: HistorialResponseDTO { estado, puntosObtenidos, puntosTotalesNuevos }
import { useGamificacion } from '../../context/GamificacionContext';

const ESTADO_CONFIG = {
  COMPLETADO:      { emoji: '🎯', label: 'Ejercicio completado',   color: 'text-green-600' },
  RACHA_ACTIVA:    { emoji: '🔥', label: '¡Racha en curso!',       color: 'text-orange-500' },
  RACHA_PROTEGIDA: { emoji: '🛡', label: 'Racha protegida',        color: 'text-blue-500'  },
  RACHA_PERDIDA:   { emoji: '💔', label: 'Racha perdida',          color: 'text-red-500'   },
};

export default function CompletionModal({ resultado, onClose }) {
  const { racha } = useGamificacion();
  const cfg = ESTADO_CONFIG[resultado.estado] ?? ESTADO_CONFIG.COMPLETADO;

  return (
    // Overlay semi-transparente
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center animate-in fade-in zoom-in duration-200">
        {/* Emoji principal */}
        <div className="text-6xl mb-4">{cfg.emoji}</div>

        {/* Estado */}
        <h2 className={`text-xl font-bold mb-1 ${cfg.color}`}>{cfg.label}</h2>

        {/* Puntos ganados */}
        <p className="text-gray-500 text-sm mb-6">
          Ganaste{' '}
          <span className="font-bold text-indigo-600">+{resultado.puntosObtenidos} pts</span>
          {' '}— Total:{' '}
          <span className="font-semibold">{resultado.puntosTotalesNuevos} pts</span>
        </p>

        {/* Racha */}
        <div className="flex items-center justify-center gap-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl py-3 px-4 mb-6">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-orange-600 text-lg">{racha}</span>
          <span className="text-gray-500 text-sm">días de racha</span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
