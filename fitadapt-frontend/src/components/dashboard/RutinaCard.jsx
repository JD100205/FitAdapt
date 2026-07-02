// src/components/dashboard/RutinaCard.jsx
import { detectaMedicalAlert } from '../../utils/helpers';

const INTENSIDAD_STYLES = {
  Alta:  'bg-red-950/40 border-red-900 text-red-400',
  Media: 'bg-yellow-950/40 border-yellow-900 text-yellow-400',
  Baja:  'bg-emerald-950/40 border-emerald-900 text-emerald-400',
};

export default function RutinaCard({ ejercicio }) {
  const esMedical = detectaMedicalAlert(ejercicio.descripcion);

  return (
    <div
      className={`p-4 border rounded-none transition-all duration-150 ${
        esMedical
          ? 'border-red-800 bg-red-950/20'
          : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
      }`}
    >
      {/* Aviso médico */}
      {esMedical && (
        <div className="flex items-center gap-1.5 mb-2 text-red-400 text-xxs font-black uppercase tracking-wider animate-pulse">
          <span>⚠️ RESTRICCIÓN CLÍNICA — VERIFICA EL RANGO DE MOVIMIENTO</span>
        </div>
      )}

      {/* Nombre */}
      <h3 className="font-black text-white uppercase tracking-wide text-base">
        {ejercicio.nombreEjercicio}
      </h3>

      {/* Descripción */}
      <p className={`text-xs mt-1 line-clamp-2 uppercase tracking-wide font-medium ${
        esMedical ? 'text-red-300/80' : 'text-neutral-400'
      }`}>
        {ejercicio.descripcion}
      </p>

      {/* Chips de metadatos */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="inline-flex items-center text-xxs font-bold bg-neutral-950 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded-none uppercase tracking-wider">
          🔁 {ejercicio.repeticiones} REPS
        </span>

        <span className="inline-flex items-center text-xxs font-bold bg-neutral-950 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded-none uppercase tracking-wider">
          ⏱️ {ejercicio.tiempoEstimatedMinutos || ejercicio.tiempoEstimadoMinutos} MIN
        </span>

        <span className={`inline-flex items-center text-xxs border px-2.5 py-1 rounded-none font-black uppercase tracking-widest ${
          INTENSIDAD_STYLES[ejercicio.intensidad] ?? INTENSIDAD_STYLES['Baja']
        }`}>
          ⚡ {ejercicio.intensidad}
        </span>
      </div>
    </div>
  );
}