// src/components/onboarding/StepLesiones.jsx
import { useState } from 'react';

// Los IDs deben coincidir con los registros de zonas del backend
const ZONAS = [
  { id: 1,  label: 'Hombro derecho',    emoji: '💪' },
  { id: 2,  label: 'Hombro izquierdo',  emoji: '💪' },
  { id: 3,  label: 'Codo derecho',      emoji: '🦾' },
  { id: 4,  label: 'Codo izquierdo',    emoji: '🦾' },
  { id: 5,  label: 'Muñeca derecha',    emoji: '✋' },
  { id: 6,  label: 'Muñeca izquierda',  emoji: '✋' },
  { id: 7,  label: 'Rodilla derecha',   emoji: '🦵' },
  { id: 8,  label: 'Rodilla izquierda', emoji: '🦵' },
  { id: 9,  label: 'Tobillo derecho',   emoji: '🦶' },
  { id: 10, label: 'Tobillo izquierdo', emoji: '🦶' },
  { id: 11, label: 'Zona lumbar',       emoji: '🔙' },
  { id: 12, label: 'Zona cervical',     emoji: '🫀' },
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
    // Envía array vacío si no hay lesiones — el backend lo acepta
    await onFinish(seleccionadas);
    setCargando(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Zonas con lesiones o molestias
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Paso 2 de 2 — El sistema evitará ejercicios que afecten estas zonas.
          Si no tienes ninguna, haz clic en "Finalizar" directamente.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {ZONAS.map(({ id, label, emoji }) => {
          const activo = seleccionadas.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm text-left transition ${
                activo
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-semibold'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span className="flex-1">{label}</span>
              {activo && <span className="text-red-500 text-xs font-bold">✓</span>}
            </button>
          );
        })}
      </div>

      {seleccionadas.length > 0 && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
          {seleccionadas.length} zona{seleccionadas.length > 1 ? 's' : ''} marcada{seleccionadas.length > 1 ? 's' : ''}.
          Tus rutinas serán adaptadas clínicamente.
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300
            font-semibold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          ← Atrás
        </button>
        <button
          onClick={handleFinish}
          disabled={cargando}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
            text-white font-bold py-3 rounded-xl transition"
        >
          {cargando ? 'Guardando…' : 'Finalizar ✓'}
        </button>
      </div>
    </div>
  );
}