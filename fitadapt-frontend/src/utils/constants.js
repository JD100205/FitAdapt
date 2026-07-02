export const VOLUMEN_OPTIONS = ['Corta', 'Normal', 'Intensa'];

export const LIGAS = {
  Hierro:     { color: '#9CA3AF', emoji: '⚙️',  minPuntos: 0     },
  Bronce:     { color: '#CD7F32', emoji: '🥉',  minPuntos: 500   },
  Plata:      { color: '#C0C0C0', emoji: '🥈',  minPuntos: 1500  },
  Oro:        { color: '#FFD700', emoji: '🥇',  minPuntos: 3000  },
  Diamante:   { color: '#00BFFF', emoji: '💎',  minPuntos: 5000  },
  Challenger: { color: '#8B5CF6', emoji: '👑',  minPuntos: 8000  },
};

export const NIVEL_OPTIONS    = ['Novato', 'Intermedio', 'Avanzado'];

export const OBJETIVO_OPTIONS = [
  'Pérdida de peso',
  'Ganancia muscular',
  'Resistencia',
  'Rehabilitación',
  'Mantenimiento',
];

// BUG FIX: sincronizado con backend TiendaController.PRECIO_PROTECTOR = 400
export const COSTO_PROTECTOR_PTS = 400;
