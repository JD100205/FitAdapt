// src/components/workout/Timer.jsx
import { useEffect } from 'react';
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

  useEffect(() => {
    if (onTick) onTick(transcurridos);
  }, [transcurridos, onTick]);

  const total     = minutos * 60;
  const progreso = total > 0 ? 1 - (m * 60 + s) / total : 0;
  const radio    = 36;
  const circunf  = 2 * Math.PI * radio;
  const offset   = circunf * (1 - progreso);
  const terminado = m === 0 && s === 0;

  return (
    <div className="mt-5 pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-6">
      
      {/* Anillo Circular Técnico */}
      <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
        <svg width="80" height="80" className="-rotate-90">
          <circle
            cx="40" cy="40" r={radio}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            className="text-neutral-800"
          />
          <circle
            cx="40" cy="40" r={radio}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            strokeLinecap="square"
            strokeDasharray={circunf}
            strokeDashoffset={offset}
            className={terminado ? 'text-emerald-500' : 'text-yellow-400'}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="absolute text-sm font-mono font-bold text-neutral-100 tracking-tighter">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </span>
      </div>

      {/* Controles Planos */}
      <div className="flex flex-col gap-1.5 flex-1 max-w-[160px]">
        {!terminado ? (
          <button
            type="button"
            onClick={activo ? pausar : iniciar}
            className={`h-8 text-[11px] font-bold uppercase tracking-wider border transition-all duration-150 rounded-none ${
              activo
                ? 'bg-neutral-950 text-yellow-400 border-yellow-500/40 hover:bg-neutral-900'
                : 'bg-neutral-100 text-neutral-950 border-transparent hover:bg-white'
            }`}
          >
            {activo ? 'Pausar Módulo' : 'Iniciar Reloj'}
          </button>
        ) : (
          <div className="h-8 flex items-center justify-center text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-900/30 bg-emerald-950/10 rounded-none">
            Tiempo Límite
          </div>
        )}
        
        <button
          type="button"
          onClick={reiniciar}
          className="h-8 bg-transparent text-neutral-500 hover:text-neutral-300 text-[10px] font-bold uppercase tracking-widest border border-transparent hover:border-neutral-800 transition-all duration-150 rounded-none"
        >
          Reset
        </button>
      </div>

    </div>
  );
}