// src/components/scoreboard/LeagueBadge.jsx
import { LIGAS } from '../../utils/constants';

// Clases de color por liga (Tailwind necesita las clases completas para purge)
const BADGE_CLASSES = {
  Hierro:     'bg-gray-100   text-gray-600  border-gray-300',
  Bronce:     'bg-amber-100  text-amber-700 border-amber-300',
  Plata:      'bg-slate-100  text-slate-600 border-slate-300',
  Oro:        'bg-yellow-100 text-yellow-700 border-yellow-300',
  Diamante:   'bg-cyan-100   text-cyan-700  border-cyan-300',
  Challenger: 'bg-violet-100 text-violet-700 border-violet-300',
};

export default function LeagueBadge({ liga, size = 'sm' }) {
  const meta    = LIGAS[liga] ?? LIGAS['Hierro'];
  const classes = BADGE_CLASSES[liga] ?? BADGE_CLASSES['Hierro'];

  return (
    <span
      className={`inline-flex items-center gap-1 border rounded-full font-semibold ${classes} ${
        size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'
      }`}
    >
      <span>{meta.emoji}</span>
      <span>{liga}</span>
    </span>
  );
}
