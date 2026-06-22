// src/components/dashboard/VolumenSelector.jsx
import { useState } from 'react';
import { VOLUMEN_OPTIONS } from '../../utils/constants';

const VOLUMEN_META = {
  Corta:   { emoji: '⚡', desc: '~20 min · Ideal para días con poco tiempo',    color: 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20' },
  Normal:  { emoji: '🏋️', desc: '~40 min · La sesión equilibrada recomendada', color: 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20' },
  Intensa: { emoji: '🔥', desc: '~60 min · Máximo desafío adaptativo',          color: 'border-red-300 bg-red-50 dark:bg-red-900/20'          },
};

export default function VolumenSelector({ onConfirm }) {
  const [seleccionado, setSeleccionado] = useState('Normal');
  const [cargando, setCargando]         = useState(false);

  const handleConfirm = async () => {
    setCargando(true);
    await onConfirm(seleccionado);
    setCargando(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ¿Cómo quieres entrenar hoy?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          El sistema ajustará los ejercicios a tu perfil y nivel de experiencia.
        </p>
      </div>

      {/* Opciones de volumen */}
      <div className="grid grid-cols-3 gap-3">
        {VOLUMEN_OPTIONS.map((v) => {
          const meta     = VOLUMEN_META[v];
          const activo   = seleccionado === v;
          return (
            <button
              key={v}
              onClick={() => setSeleccionado(v)}
              className={`rounded-xl p-4 text-left border-2 transition-all ${
                activo
                  ? meta.color + ' border-opacity-100 ring-2 ring-indigo-500 ring-offset-1'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl block mb-2">{meta.emoji}</span>
              <span className="font-bold text-sm block">{v}</span>
              <span className="text-xs text-gray-500 mt-1 block leading-tight">{meta.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Botón generar */}
      <button
        onClick={handleConfirm}
        disabled={cargando}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl text-base transition"
      >
        {cargando ? 'Generando rutina…' : '⚡ Generar Mi Rutina Inteligente'}
      </button>
    </div>
  );
}
