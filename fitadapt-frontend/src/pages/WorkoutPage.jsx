// src/pages/WorkoutPage.jsx
// Muestra la rutina activa con sus tarjetas de ejercicios.
// Se navega aquí desde el Dashboard una vez la rutina está generada;
// la rutina se pasa a través de React Router state para no repetir la petición.

import { useLocation, useNavigate } from 'react-router-dom';
import { useState }                 from 'react';
import { useAuth }                  from '../context/AuthContext';
import { useGamificacion }          from '../context/GamificacionContext';
import { useToast }                 from '../context/ToastContext';
import { registrarHistorial }       from '../services/gamificacionService';
import Timer                        from '../components/workout/Timer';
import CompletionModal              from '../components/workout/CompletionModal';
import { detectaMedicalAlert }      from '../utils/helpers';

// ─── Tarjeta de ejercicio individual ────────────────────────────────────────
function ExerciseCard({ ejercicio, onCompletado }) {
  const { user }                    = useAuth();
  const { actualizarTrasEjercicio } = useGamificacion();
  const { showToast }               = useToast();

  const [tiempoReal, setTiempoReal]   = useState(ejercicio.tiempoEstimadoMinutos * 60);
  const [completado, setCompletado]   = useState(false);
  const [resultado, setResultado]     = useState(null);
  const [modalAbierto, setModal]      = useState(false);
  const [cargando, setCargando]       = useState(false);

  const esMedical = detectaMedicalAlert(ejercicio.descripcion);

  const handleCompletar = async () => {
    if (completado || cargando) return;
    setCargando(true);
    try {
      const res = await registrarHistorial(
        user.idUsuario,
        ejercicio.idEjercicio,
        Math.floor(tiempoReal / 60) // tiempo en minutos reales
      );
      // res.data → HistorialResponseDTO
      actualizarTrasEjercicio(res.data);
      setResultado(res.data);
      setCompletado(true);
      setModal(true);
      onCompletado(ejercicio.idEjercicio);
    } catch {
      showToast('No se pudo registrar el ejercicio. Intenta de nuevo.', 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div
        className={`rounded-2xl p-5 border-2 transition-all ${
          completado
            ? 'border-green-300 bg-green-50 dark:bg-green-900/10 opacity-75'
            : esMedical
            ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
        }`}
      >
        {/* Alerta médica */}
        {esMedical && !completado && (
          <div className="flex items-center gap-2 mb-3 bg-red-100 dark:bg-red-900/20
            border border-red-300 rounded-xl px-3 py-2">
            <span className="text-red-500 text-lg">⚠️</span>
            <p className="text-red-700 dark:text-red-400 text-xs font-semibold">
              Precaución clínica — lee la descripción completa antes de comenzar.
            </p>
          </div>
        )}

        {/* Cabecera */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug">
              {ejercicio.nombreEjercicio}
            </h3>
            <p className={`text-sm mt-1 leading-relaxed ${
              esMedical
                ? 'text-red-700 dark:text-red-300'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {ejercicio.descripcion}
            </p>
          </div>
          {completado && (
            <span className="shrink-0 bg-green-500 text-white rounded-full w-8 h-8
              flex items-center justify-center text-sm font-bold">✓</span>
          )}
        </div>

        {/* Metadatos */}
        <div className="flex flex-wrap gap-3 mt-3">
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700
            text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
            🔁 {ejercicio.repeticiones} reps
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700
            text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
            ⏱ {ejercicio.tiempoEstimadoMinutos} min
          </span>
          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${
            ejercicio.intensidad === 'Alta'
              ? 'bg-red-100 text-red-700'
              : ejercicio.intensidad === 'Media'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            ⚡ {ejercicio.intensidad}
          </span>
        </div>

        {/* Cronómetro — solo si no está completado */}
        {!completado && (
          <Timer minutos={ejercicio.tiempoEstimadoMinutos} onTick={setTiempoReal} />
        )}

        {/* Botón de completado */}
        {!completado && (
          <button
            onClick={handleCompletar}
            disabled={cargando}
            className="mt-5 w-full bg-green-500 hover:bg-green-600 disabled:opacity-60
              text-white font-bold py-3 px-4 rounded-xl transition"
          >
            {cargando ? 'Registrando…' : 'Marcar como Completado ✓'}
          </button>
        )}
      </div>

      {/* Modal de éxito */}
      {modalAbierto && resultado && (
        <CompletionModal
          resultado={resultado}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}

// ─── WorkoutPage ──────────────────────────────────────────────────────────────
export default function WorkoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // La rutina llega vía navigate('/entrenamiento', { state: { rutina } })
  const rutina = location.state?.rutina;

  const [completados, setCompletados] = useState([]);

  if (!rutina) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center space-y-4">
        <p className="text-gray-500">No hay una rutina activa.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-indigo-600 font-semibold hover:underline"
        >
          ← Volver al Dashboard
        </button>
      </div>
    );
  }

  const totalEj       = rutina.ejercicios.length;
  const progresoPorc  = Math.round((completados.length / totalEj) * 100);
  const todosCompletos = completados.length === totalEj;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-400 hover:text-gray-600 mb-1 block"
          >
            ← Dashboard
          </button>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Entrenamiento de hoy
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {rutina.objetivo} · {rutina.fecha}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-indigo-600">{progresoPorc}%</p>
          <p className="text-xs text-gray-400">
            {completados.length}/{totalEj} ejercicios
          </p>
        </div>
      </div>

      {/* Barra de progreso general */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            todosCompletos ? 'bg-green-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${progresoPorc}%` }}
        />
      </div>

      {/* Lista de ejercicios */}
      <div className="space-y-4">
        {rutina.ejercicios.map((ej) => (
          <ExerciseCard
            key={ej.idEjercicio}
            ejercicio={ej}
            onCompletado={(id) =>
              setCompletados((prev) => [...new Set([...prev, id])])
            }
          />
        ))}
      </div>

      {/* Banner de felicitación al terminar */}
      {todosCompletos && (
        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600
          text-white p-6 text-center space-y-2">
          <p className="text-4xl">🏆</p>
          <h2 className="text-2xl font-black">¡Rutina completada!</h2>
          <p className="text-green-100 text-sm">
            Todos los ejercicios registrados correctamente.
          </p>
          <button
            onClick={() => navigate('/ranking')}
            className="mt-3 bg-white text-green-700 font-bold px-6 py-2 rounded-xl hover:bg-green-50 transition"
          >
            Ver mi posición en el ranking →
          </button>
        </div>
      )}
    </div>
  );
}
