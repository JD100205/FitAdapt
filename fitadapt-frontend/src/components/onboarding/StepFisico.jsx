// src/components/onboarding/StepFisico.jsx
import { useState } from 'react';
import { NIVEL_OPTIONS, OBJETIVO_OPTIONS } from '../../utils/constants';

const OBJETIVO_ICONS = {
  'Pérdida de peso':   '↓',
  'Ganancia muscular': '↑',
  'Resistencia':       '∞',
  'Rehabilitación':    '+',
  'Mantenimiento':     '≈',
};

export default function StepFisico({ onNext }) {
  const [form, setForm] = useState({
    edad:             '',
    peso:             '',
    altura:           '',
    nivelExperiencia: '',
    objetivo:         '',
  });

  const set    = (k, v) => setForm((p) => ({ ...p, [k]: v }));
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
    <div className="space-y-7">

      {/* Métricas numéricas */}
      <div>
        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-3">
          Datos biométricos
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'edad',   label: 'Edad',   unit: 'años', min: 10,  max: 100 },
            { key: 'peso',   label: 'Peso',   unit: 'kg',   min: 20,  max: 300 },
            { key: 'altura', label: 'Altura', unit: 'cm',   min: 100, max: 250 },
          ].map(({ key, label, unit, min, max }) => (
            <div key={key}>
              <label className="block text-[10px] font-semibold text-neutral-600 uppercase tracking-widest mb-1">
                {label}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={min}
                  max={max}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder="—"
                  className="w-full h-11 bg-[#0a0a0a] text-white text-sm text-center font-semibold border border-[#1f1f1f] focus:outline-none focus:border-yellow-400/60 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute bottom-1.5 right-2 text-[9px] text-neutral-600 uppercase font-semibold pointer-events-none">
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nivel de experiencia */}
      <div>
        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-3">
          Nivel de experiencia
        </p>
        <div className="grid grid-cols-3 gap-2">
          {NIVEL_OPTIONS.map((n) => {
            const activo = form.nivelExperiencia === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => set('nivelExperiencia', n)}
                className={`h-10 text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                  activo
                    ? 'border-yellow-400 bg-yellow-400/8 text-yellow-400'
                    : 'border-[#1f1f1f] bg-[#0a0a0a] text-neutral-500 hover:text-neutral-200 hover:border-neutral-600'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Objetivo */}
      <div>
        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.18em] mb-3">
          Objetivo principal
        </p>
        <div className="space-y-1.5">
          {OBJETIVO_OPTIONS.map((obj) => {
            const activo = form.objetivo === obj;
            return (
              <button
                key={obj}
                type="button"
                onClick={() => set('objetivo', obj)}
                className={`w-full h-11 px-4 flex items-center justify-between text-left border transition-colors ${
                  activo
                    ? 'border-yellow-400 bg-yellow-400/8 text-yellow-400'
                    : 'border-[#1f1f1f] bg-[#0a0a0a] text-neutral-500 hover:text-neutral-200 hover:border-neutral-600'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider">{obj}</span>
                <span className={`text-base leading-none font-light ${activo ? 'text-yellow-400' : 'text-neutral-700'}`}>
                  {OBJETIVO_ICONS[obj] || '›'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón continuar */}
      <button
        onClick={handleNext}
        disabled={!valido}
        className="w-full h-12 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-25 disabled:cursor-not-allowed text-[#0a0a0a] font-black text-[11px] uppercase tracking-[0.18em] transition-colors"
      >
        Continuar → Zonas de restricción
      </button>
    </div>
  );
}
