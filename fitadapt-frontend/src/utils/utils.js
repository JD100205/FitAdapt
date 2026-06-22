// ─────────────────────────────────────────────────────────────────────────────
// src/utils/constants.js
// ─────────────────────────────────────────────────────────────────────────────

export const VOLUMEN_OPTIONS = ['Corta', 'Normal', 'Intensa'];

export const NIVEL_OPTIONS = ['Novato', 'Intermedio', 'Avanzado'];

export const OBJETIVO_OPTIONS = [
  'Pérdida de peso',
  'Ganancia muscular',
  'Resistencia',
  'Rehabilitación',
  'Mantenimiento',
];

export const LIGAS = {
  Hierro:     { color: '#9CA3AF', emoji: '⚙️',  minPuntos: 0     },
  Bronce:     { color: '#CD7F32', emoji: '🥉',  minPuntos: 500   },
  Plata:      { color: '#C0C0C0', emoji: '🥈',  minPuntos: 1000  },
  Oro:        { color: '#FFD700', emoji: '🥇',  minPuntos: 2000  },
  Diamante:   { color: '#00BFFF', emoji: '💎',  minPuntos: 5000  },
  Challenger: { color: '#8B5CF6', emoji: '👑',  minPuntos: 10000 },
};

// Costo del protector en la tienda (sincronizar con backend)
export const COSTO_PROTECTOR_PTS = 500;


// ─────────────────────────────────────────────────────────────────────────────
// src/utils/helpers.js
// ─────────────────────────────────────────────────────────────────────────────

import { LIGAS } from './constants';

/**
 * Detecta si la descripción de un ejercicio contiene la marca de alerta médica.
 * El backend inserta el prefijo "[ALERTA MÉDICA..." en la descripción.
 */
export const detectaMedicalAlert = (descripcion = '') =>
  /\[ALERTA MÉDICA/i.test(descripcion);

/**
 * Formatea un número como puntos con separador de miles (locale ES-PE).
 * Ej: 12500 → "12.500"
 */
export const formatPuntos = (n = 0) =>
  new Intl.NumberFormat('es-PE').format(n);

/**
 * Determina la liga de un usuario según sus puntos totales.
 * Itera los umbrales de mayor a menor para retornar el nombre correcto.
 */
export const getLiga = (puntos = 0) => {
  const orden = ['Challenger', 'Diamante', 'Oro', 'Plata', 'Bronce', 'Hierro'];
  return orden.find((liga) => puntos >= LIGAS[liga].minPuntos) ?? 'Hierro';
};

/**
 * Convierte segundos a formato mm:ss legible.
 * Ej: 125 → "02:05"
 */
export const formatTiempo = (segundosTotales) => {
  const m = Math.floor(segundosTotales / 60);
  const s = segundosTotales % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
