// src/components/workout/ExerciseCard.jsx
import Timer               from './Timer';
import CompletionModal     from './CompletionModal';
import { useState }        from 'react';
import { useAuth }         from '../../context/AuthContext';
import { registrarHistorial } from '../../services/gamificacionService';
import { useGamificacion } from '../../context/GamificacionContext';

const MEDICAL_PATTERN = /\[ALERTA MÉDICA/i;

export default function ExerciseCard({ ejercicio }) {
  const { user }                         = useAuth();
  const { actualizarTrasEjercicio }      = useGamificacion();
  const [completado, setCompletado]      = useState(false);
  const [resultado, setResultado]        = useState(null);
  const [tiempoReal, setTiempoReal]      = useState(0);

  const esMedical = MEDICAL_PATTERN.test(ejercicio.descripcion);

  const handleCompletar = async () => {
    const res = await registrarHistorial(
      user.idUsuario,
      ejercicio.idEjercicio,
      tiempoReal
    );
    actualizarTrasEjercicio(res.data);
    setResultado(res.data);
    setCompletado(true);
  };

  return (
    <div
      className={`rounded-xl p-5 border ${
        esMedical
          ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      {esMedical && (
        <div className="flex items-center gap-2 mb-3 text-red-600 text-sm font-semibold">
          <span>⚠</span>
          <span>Precaución clínica — lee la descripción completa</span>
        </div>
      )}

      <h3 className="font-bold text-lg">{ejercicio.nombreEjercicio}</h3>
      <p className={`text-sm mt-1 ${esMedical ? 'text-red-700 dark:text-red-300' : 'text-gray-500'}`}>
        {ejercicio.descripcion}
      </p>

      <div className="flex gap-4 mt-3 text-sm text-gray-500">
        <span>🔁 {ejercicio.repeticiones} reps</span>
        <span>⏱ {ejercicio.tiempoEstimadoMinutos} min</span>
        <span>⚡ {ejercicio.intensidad}</span>
      </div>

      <Timer
        minutos={ejercicio.tiempoEstimadoMinutos}
        onTick={setTiempoReal}
      />

      {!completado && (
        <button
          onClick={handleCompletar}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Marcar como Completado ✓
        </button>
      )}

      {completado && resultado && (
        <CompletionModal resultado={resultado} />
      )}
    </div>
  );
}