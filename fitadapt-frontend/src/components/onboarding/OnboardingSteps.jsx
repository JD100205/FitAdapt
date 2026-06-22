// ─────────────────────────────────────────────────────────────────────────────
// src/components/onboarding/StepFisico.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { NIVEL_OPTIONS, OBJETIVO_OPTIONS } from '../../utils/constants';

export function StepFisico({ onNext }) {
  const [form, setForm] = useState({
    edad: '', peso: '', altura: '',
    nivelExperiencia: '', objetivo: '',
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const valido = Object.values(form).every(Boolean);

  const handleNext = () => {
    if (!valido) return;
    onNext({
      edad:             Number(form.edad),
      peso:             Number(form.peso),
      altura:           Number(form.altura),
      nivelExperiencia: form.nivelExperiencia,
      objetivo:         form.objetivo,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Cuéntanos sobre ti
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Paso 1 de 2 — Datos físicos y objetivos
        </p>
      </div>

      {/* Campos numéricos */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'edad',   label: 'Edad',    unit: 'años', min: 10, max: 100 },
          { key: 'peso',   label: 'Peso',    unit: 'kg',   min: 20, max: 300 },
          { key: 'altura', label: 'Altura',  unit: 'cm',   min: 100, max: 250 },
        ].map(({ key, label, unit, min, max }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              {label} ({unit})
            </label>
            <input
              type="number"
              min={min} max={max}
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              placeholder="—"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        ))}
      </div>

      {/* Nivel de experiencia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nivel de experiencia
        </label>
        <div className="grid grid-cols-3 gap-2">
          {NIVEL_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set('nivelExperiencia', n)}
              className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition ${
                form.nivelExperiencia === n
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 hover:border-gray-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Objetivo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Objetivo principal
        </label>
        <div className="space-y-2">
          {OBJETIVO_OPTIONS.map((obj) => (
            <button
              key={obj}
              type="button"
              onClick={() => set('objetivo', obj)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition ${
                form.objetivo === obj
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-900/30'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 hover:border-gray-300'
              }`}
            >
              {obj}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!valido}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50
          text-white font-bold py-3 rounded-xl transition"
      >
        Siguiente →
      </button>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// src/components/onboarding/StepLesiones.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';

// Las zonas deben coincidir con los IDs del backend
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

export function StepLesiones({ onBack, onFinish }) {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [cargando, setCargando]           = useState(false);

  const toggle = (id) =>
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleFinish = async () => {
    setCargando(true);
    await onFinish(seleccionadas);   // puede ser array vacío si no hay lesiones
    setCargando(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Zonas con lesiones o molestias
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Paso 2 de 2 — El sistema evitará ejercicios que puedan afectar estas zonas.
          Si no tienes ninguna, haz clic en "Finalizar".
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
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 font-semibold'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span>{label}</span>
              {activo && <span className="ml-auto text-red-500">✓</span>}
            </button>
          );
        })}
      </div>

      {seleccionadas.length > 0 && (
        <p className="text-sm text-red-600 font-medium">
          {seleccionadas.length} zona{seleccionadas.length > 1 ? 's' : ''} marcada{seleccionadas.length > 1 ? 's' : ''}.
          Tus rutinas serán adaptadas.
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-600
            font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
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
