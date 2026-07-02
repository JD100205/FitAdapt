// src/components/scoreboard/LeagueBadge.jsx

// Mapeo de colores estricto alineado con la paleta de FitAdapt.
// Descartamos los fondos pastel y usamos texto plano con bordes limpios para un look brutalista.
const BADGE_CLASSES = {
  Hierro:     'border-neutral-800 text-neutral-400 font-bold',
  Bronce:     'border-amber-600/40 text-amber-500 font-black',
  Plata:      'border-slate-500/40 text-slate-300 font-black',
  Oro:        'border-yellow-500/40 text-yellow-400 font-black',
  Diamante:   'border-cyan-500/40 text-cyan-400 font-black',
  Challenger: 'border-rose-500/40 text-rose-400 font-black',
};

export default function LeagueBadge({ liga, size = 'sm' }) {
  const classes = BADGE_CLASSES[liga] ?? BADGE_CLASSES['Hierro'];

  return (
    <span
      className={`inline-flex items-center justify-center uppercase tracking-wider border rounded-none bg-transparent ${classes} ${
        size === 'lg' 
          ? 'px-4 h-8 text-xs min-w-[100px]' 
          : 'px-3 h-6 text-[10px] min-w-[84px] text-center'
      }`}
    >
      {liga}
    </span>
  );
}