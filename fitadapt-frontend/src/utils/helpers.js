// src/utils/helpers.js

/**
 * Formatea puntos para mostrar en UI.
 * Ej: 1500 -> "1,500"
 */
export function formatPuntos(puntos = 0) {
  return Number(puntos).toLocaleString('es-PE');
}

/**
 * Detecta si una descripción contiene alerta médica.
 */
export function detectaMedicalAlert(texto = '') {
  if (!texto) return false;

  const patrones = [
    'alerta médica',
    'alerta medica',
    'precaución',
    'precaucion',
    'lesión',
    'lesion',
    'contraindicado',
    'evitar',
  ];

  const contenido = texto.toLowerCase();

  return patrones.some((patron) =>
    contenido.includes(patron.toLowerCase())
  );
}