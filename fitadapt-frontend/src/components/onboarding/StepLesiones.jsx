// src/components/onboarding/StepLesiones.jsx
import { useState } from 'react';

const ZONAS = [
  { id: 1,  label: 'Rodilla',  grupo: 'Inferior' },
  { id: 2,  label: 'Espalda',  grupo: 'Core' },
  { id: 3,  label: 'Hombro',   grupo: 'Superior' },
  { id: 4,  label: 'Cuello',   grupo: 'Superior' },
  { id: 5,  label: 'Tobillo',  grupo: 'Inferior' },
  { id: 13, label: 'Codo',     grupo: 'Superior' },
  { id: 14, label: 'Muñeca',   grupo: 'Superior' },
  { id: 15, label: 'Lumbar',   grupo: 'Core' },
  { id: 16, label: 'Cadera',   grupo: 'Inferior' },
  { id: 17, label: 'Pecho',    grupo: 'Superior' },
  { id: 18, label: 'Abdomen',  grupo: 'Core' },
  { id: 19, label: 'Glúteos',  grupo: 'Inferior' },
];

export default function StepLesiones({ onBack, onFinish }) {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [cargando, setCargando]           = useState(false);

  const toggle = (id) =>
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleFinish = async () => {
    setCargando(true);
    await onFinish(seleccionadas);
    setCargando(false);
  };

  return (
    <div className="space-y-7">

      {/* Descripción */}
      <p className="text-[11px] text-neutral-500 leading-relaxed">
        Selecciona las zonas con lesiones activas o sensibles. El sistema adaptará los ejercicios para protegerlas.
        Si no tienes ninguna, puedes continuar sin seleccionar nada.
      </p>

      {/* Grid de zonas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {ZONAS.map(({ id, label }) => {
          const activo = seleccionadas.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`h-10 px-3 flex items-center justify-between border text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                activo
                  ? 'border-red-500/70 bg-red-950/20 text-red-400'
                  : 'border-[#1f1f1f] bg-[#0a0a0a] text-neutral-500 hover:text-neutral-200 hover:border-neutral-600'
              }`}
            >
              <span>{label}</span>
              {activo && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Indicador */}
      <div className="h-5 flex items-center">
        {seleccionadas.length > 0 ? (
          <p className="text-[10px] text-red-400/80 uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            {seleccionadas.length} zona{seleccionadas.length > 1 ? 's' : ''} restringida{seleccionadas.length > 1 ? 's' : ''}
          </p>
        ) : (
          <p className="text-[10px] text-neutral-700 uppercase tracking-widest">
            Sin restricciones seleccionadas — entrenamiento completo
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={onBack}
          type="button"
          className="flex-1 h-12 border border-[#1f1f1f] text-neutral-500 hover:text-neutral-200 hover:border-neutral-600 font-bold text-[11px] uppercase tracking-[0.15em] transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={handleFinish}
          disabled={cargando}
          type="button"
          className="flex-[2] h-12 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-[#0a0a0a] font-black text-[11px] uppercase tracking-[0.15em] transition-colors"
        >
          {cargando ? 'Guardando perfil…' : 'Finalizar y entrenar'}
        </button>
      </div>
    </div>
  );
}
