// src/components/workout/Timer.jsx
import useTimer from '../../hooks/useTimer';

export default function Timer({ minutos, onTick }) {
  const {
    minutos: m,
    segundos: s,
    transcurridos,
    activo,
    iniciar,
    pausar,
    reiniciar,
  } = useTimer(minutos);

  // Notifica al padre el tiempo transcurrido (para registrarHistorial)
  // El padre llama handleCompletar y ya tiene el valor por closure
  // pero también podemos usar un callback por efecto:
  // useEffect(() => onTick(transcurridos), [transcurridos]);

  const total     = minutos * 60;
  const progreso  = 1 - (m * 60 + s) / total;
  const radio     = 36;
  const circunf   = 2 * Math.PI * radio;
  const offset    = circunf * (1 - progreso);
  const terminado = m === 0 && s === 0;

  return (
    <div className="mt-4 flex items-center gap-6">
      {/* Anillo de progreso SVG */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg width="96" height="96" className="-rotate-90">
          {/* Track */}
          <circle
            cx="48" cy="48" r={radio}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-100 dark:text-gray-700"
          />
          {/* Progreso */}
          <circle
            cx="48" cy="48" r={radio}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circunf}
            strokeDashoffset={offset}
            className={terminado ? 'text-green-400' : 'text-indigo-500'}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="absolute text-sm font-mono font-bold text-gray-700 dark:text-gray-200">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </span>
      </div>

      {/* Controles */}
      <div className="flex flex-col gap-2">
        {!terminado ? (
          <button
            onClick={activo ? pausar : iniciar}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              activo
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            {activo ? '⏸ Pausar' : '▶ Iniciar'}
          </button>
        ) : (
          <span className="text-green-600 font-semibold text-sm">✓ Tiempo cumplido</span>
        )}
        <button
          onClick={reiniciar}
          className="px-4 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition"
        >
          ↺ Reiniciar
        </button>
      </div>
    </div>
  );
}
