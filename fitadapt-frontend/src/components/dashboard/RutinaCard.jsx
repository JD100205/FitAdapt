// src/components/dashboard/RutinaCard.jsx
// Tarjeta de previsualización de ejercicio en el Dashboard.
// Es de solo lectura — el cronómetro y el botón de completar
// viven en WorkoutPage > ExerciseCard.
import { detectaMedicalAlert } from '../../utils/helpers';

const INTENSIDAD_STYLES = {
  Alta:  'bg-red-100    text-red-700    dark:bg-red-900/20    dark:text-red-300',
  Media: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
  Baja:  'bg-green-100  text-green-700  dark:bg-green-900/20  dark:text-green-300',
};

export default function RutinaCard({ ejercicio }) {
  const esMedical = detectaMedicalAlert(ejercicio.descripcion);

  return (
    <div
      className={`rounded-xl p-4 border transition ${
        esMedical
          ? 'border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-800'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      {/* Aviso médico */}
      {esMedical && (
        <div className="flex items-center gap-1.5 mb-2 text-red-600 dark:text-red-400 text-xs font-semibold">
          <span>⚠️</span>
          <span>Precaución clínica — revisa la descripción antes de entrenar</span>
        </div>
      )}

      {/* Nombre */}
      <h3 className="font-bold text-gray-900 dark:text-white text-base">
        {ejercicio.nombreEjercicio}
      </h3>

      {/* Descripción — truncada en el dashboard */}
      <p className={`text-sm mt-1 line-clamp-2 ${
        esMedical
          ? 'text-red-700 dark:text-red-300'
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        {ejercicio.descripcion}
      </p>

      {/* Chips de metadatos */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700
          text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
          🔁 {ejercicio.repeticiones} reps
        </span>

        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700
          text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
          ⏱ {ejercicio.tiempoEstimadoMinutos} min
        </span>

        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium
          ${INTENSIDAD_STYLES[ejercicio.intensidad] ?? INTENSIDAD_STYLES['Baja']}`}>
          ⚡ {ejercicio.intensidad}
        </span>
      </div>
    </div>
  );
}