// src/components/workout/CompletionModal.jsx
import { useGamificacion } from '../../context/GamificacionContext';

// FIX MODAL: El backend devuelve texto libre en resultado.estado
// ("Completado exitosamente", "Completado con advertencia", etc.)
// El mapa anterior usaba claves como "COMPLETADO" que nunca coincidían,
// así que el modal siempre mostraba el fallback y el color nunca variaba.
// Ahora se detecta el estado por substring para ser robusto ante cambios menores.
function resolverConfig(estado = '') {
  const e = estado.toLowerCase();
  if (e.includes('protegida') || e.includes('protector')) {
    return { label: 'RACHA PROTEGIDA',   color: 'text-cyan-400'   };
  }
  if (e.includes('perdida') || e.includes('perdiste')) {
    return { label: 'RACHA PERDIDA',     color: 'text-red-400'    };
  }
  if (e.includes('advertencia')) {
    return { label: 'COMPLETADO',        color: 'text-yellow-400' };
  }
  if (e.includes('racha') && e.includes('aumentada')) {
    return { label: 'RACHA AUMENTADA',   color: 'text-orange-400' };
  }
  // Default: completado exitosamente
  return { label: 'EJERCICIO COMPLETADO', color: 'text-emerald-400' };
}

export default function CompletionModal({ resultado, onClose }) {
  const { racha } = useGamificacion();
  const cfg = resolverConfig(resultado.mensajeRacha || resultado.estado);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-none p-8 w-full max-w-sm mx-4 text-center">

        <div className="text-[10px] font-black tracking-widest text-neutral-500 uppercase mb-2">
          // SISTEMA DE MONITOREO
        </div>

        <h2 className={`text-lg font-black tracking-wide uppercase mb-1 ${cfg.color}`}>
          {cfg.label}
        </h2>

        <div className="bg-neutral-950 border border-neutral-800/60 p-4 my-6 text-center">
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Puntos Asignados</p>
          <div className="text-xl font-black text-yellow-400 font-mono">
            +{resultado.puntosObtenidos ?? 0} PTS
          </div>
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2 border-t border-neutral-800 pt-2">
            Balance Global: {resultado.puntosTotalesNuevos ?? 0} PTS
          </div>
        </div>

        <div className="flex items-center justify-between bg-neutral-950/40 border border-neutral-800/80 px-4 h-11 mb-6 text-xs uppercase tracking-wider">
          <span className="text-neutral-400 font-medium">Historial Continuo:</span>
          <span className="font-black text-orange-400 font-mono">{racha} DÍAS</span>
        </div>

        {/* Mensaje de racha del backend */}
        {resultado.mensajeRacha && resultado.mensajeRacha !== 'Ejercicio registrado.' && (
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-4">
            {resultado.mensajeRacha}
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 bg-neutral-100 hover:bg-white text-neutral-950 font-black text-xs uppercase tracking-widest rounded-none transition-all duration-150"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
