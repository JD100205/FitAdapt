// src/components/dashboard/VolumenSelector.jsx
import { useState } from 'react';
import { VOLUMEN_OPTIONS } from '../../utils/constants';

const VOLUMEN_META = {
  Corta: {
    desc:      'Sprinting · 20 min · Concentrado',
    duracion:  '20',
    color:     'yellow',
    bars:      [true, false, false],
  },
  Normal: {
    desc:      'Estándar · 40 min · Completo',
    duracion:  '40',
    color:     'yellow',
    bars:      [true, true, false],
  },
  Intensa: {
    desc:      'Overload · 60 min · Máxima exigencia',
    duracion:  '60',
    color:     'red',
    bars:      [true, true, true],
  },
};

function BarIndicator({ bars, color, active }) {
  const activeColor  = color === 'red'    ? 'bg-red-500'    : 'bg-yellow-400';
  const inactiveColor = active ? 'bg-neutral-700' : 'bg-[#1a1a1a]';
  return (
    <div className="flex gap-0.5">
      {bars.map((filled, i) => (
        <span
          key={i}
          className={`w-2 h-3 ${filled ? activeColor : inactiveColor}`}
        />
      ))}
    </div>
  );
}

export default function VolumenSelector({ onConfirm }) {
  const [seleccionado, setSeleccionado] = useState('Normal');
  const [cargando, setCargando]         = useState(false);

  const handleConfirm = async () => {
    setCargando(true);
    await onConfirm(seleccionado);
    setCargando(false);
  };

  return (
    <div className="bg-[#111111] border border-[#1f1f1f] p-6 space-y-5">
      <div>
        <h2 className="text-base font-black text-white uppercase tracking-wider">
          Selección de carga diaria
        </h2>
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
          Establece la dosificación de volumen para la sesión de hoy
        </p>
      </div>

      {/* Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {VOLUMEN_OPTIONS.map((v) => {
          const meta   = VOLUMEN_META[v];
          const activo = seleccionado === v;
          const borderColor =
            activo && meta.color === 'red'
              ? 'border-red-500'
              : activo
              ? 'border-yellow-400'
              : 'border-[#1f1f1f] hover:border-neutral-600';

          return (
            <button
              key={v}
              type="button"
              onClick={() => setSeleccionado(v)}
              className={`p-4 text-left border transition-colors flex flex-col gap-3 min-h-[100px] bg-[#0a0a0a] ${borderColor}`}
            >
              <BarIndicator bars={meta.bars} color={meta.color} active={activo} />
              <div>
                <span className={`font-black text-xs uppercase tracking-wider block ${
                  activo
                    ? meta.color === 'red' ? 'text-red-400' : 'text-yellow-400'
                    : 'text-neutral-300'
                }`}>
                  {v}
                </span>
                <span className="text-[10px] text-neutral-600 mt-0.5 block leading-snug uppercase tracking-wide">
                  {meta.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Botón */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={cargando}
        className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-[#0a0a0a] font-black py-4 text-[11px] uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2"
      >
        {cargando ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generando rutina…
          </>
        ) : (
          'Cargar bloque de entrenamiento'
        )}
      </button>
    </div>
  );
}
