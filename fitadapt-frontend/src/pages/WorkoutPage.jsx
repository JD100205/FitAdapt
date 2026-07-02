// src/pages/WorkoutPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect }      from 'react';
import { useAuth }                  from '../context/AuthContext';
import { useGamificacion }          from '../context/GamificacionContext';
import { useToast }                 from '../context/ToastContext';
import { registrarHistorial }       from '../services/gamificacionService';
import { getRutinaHoy }             from '../services/rutinaService';
import Timer                        from '../components/workout/Timer';
import CompletionModal              from '../components/workout/CompletionModal';
import { detectaMedicalAlert }      from '../utils/helpers';

// ─── Tarjeta de ejercicio activo ──────────────────────────────────────────────
function ExerciseCard({ ejercicio, onCompletado }) {
  const { user }                    = useAuth();
  const { actualizarTrasEjercicio } = useGamificacion();
  const { showToast }               = useToast();

  const [segundosTranscurridos, setSegundosTranscurridos] = useState(0);
  const [completado, setCompletado] = useState(false);
  const [resultado, setResultado]   = useState(null);
  const [modalAbierto, setModal]    = useState(false);
  const [cargando, setCargando]     = useState(false);

  const esMedical = detectaMedicalAlert(ejercicio.descripcion);

  const handleCompletar = async () => {
    if (completado || cargando) return;
    setCargando(true);
    try {
      // FIX PUNTOS: Si el usuario no inició el timer (segundosTranscurridos === 0),
      // se usa el tiempo estimado del ejercicio como tiempo real.
      // Esto evita que el cumplimiento sea 0% y se otorguen 0 puntos
      // cuando el usuario completa el ejercicio sin usar el cronómetro.
      const tiempoEstimadoSegundos = ejercicio.tiempoEstimadoMinutos * 60;
      const segundosReales = segundosTranscurridos > 0
        ? segundosTranscurridos
        : tiempoEstimadoSegundos;

      const minutosReales = Math.max(Math.round(segundosReales / 60), 1);

      const res = await registrarHistorial(
        user.idUsuario,
        ejercicio.idEjercicio,
        minutosReales
      );
      actualizarTrasEjercicio(res.data);
      setResultado(res.data);
      setCompletado(true);
      setModal(true);
      onCompletado(ejercicio.idEjercicio);
    } catch (err) {
      const msg = err.response?.data
        ? String(err.response.data)
        : 'No se pudo registrar el ejercicio. Intenta de nuevo.';
      showToast(msg, 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className={`rounded-none p-6 border ${
        completado
          ? 'border-green-500/30 bg-neutral-900/50 opacity-60'
          : esMedical
          ? 'border-red-600 bg-neutral-900'
          : 'border-neutral-800 bg-neutral-900'
      }`}>

        {esMedical && !completado && (
          <div className="flex items-center gap-2 mb-4 bg-red-950/40 border border-red-800 rounded-none px-3 py-2">
            <span role="img" aria-label="Alerta" className="text-red-500 text-sm">⚠️</span>
            <p className="text-red-400 text-xs font-bold uppercase tracking-wider">
              Precaución clínica — revisar indicaciones antes de iniciar.
            </p>
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-black text-sm text-white uppercase tracking-wider">
              {ejercicio.nombreEjercicio}
            </h3>
            <p className={`text-xs leading-relaxed ${
              esMedical ? 'text-red-400/90' : 'text-neutral-400'
            }`}>
              {ejercicio.descripcion}
            </p>
          </div>
          {completado && (
            <span className="shrink-0 bg-green-500 text-neutral-950 font-black px-2 py-0.5 text-xs">
              DONE
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 font-mono">
          <span className="text-xs bg-neutral-950 text-neutral-300 border border-neutral-800 px-2.5 py-1 rounded-none">
            <span role="img" aria-label="Repeticiones">🔁</span> RPS // {ejercicio.repeticiones}
          </span>
          <span className="text-xs bg-neutral-950 text-neutral-300 border border-neutral-800 px-2.5 py-1 rounded-none">
            <span role="img" aria-label="Tiempo">⏱</span> MIN // {ejercicio.tiempoEstimadoMinutos}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-none border font-bold uppercase ${
            ejercicio.intensidad === 'Alta'  ? 'bg-neutral-950 text-red-400 border-red-900/40' :
            ejercicio.intensidad === 'Media' ? 'bg-neutral-950 text-yellow-400 border-yellow-900/40' :
                                               'bg-neutral-950 text-green-400 border-green-900/40'
          }`}>
            <span role="img" aria-label="Intensidad">⚡</span> INT // {ejercicio.intensidad}
          </span>
        </div>

        {!completado && (
          <div className="mt-4 pt-4 border-t border-neutral-800/60 font-mono">
            <Timer
              minutos={ejercicio.tiempoEstimadoMinutos}
              onTick={setSegundosTranscurridos}
            />
          </div>
        )}

        {!completado && (
          <button
            onClick={handleCompletar}
            disabled={cargando}
            className="mt-5 w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-neutral-900 font-black text-xs py-3 px-4 rounded-none uppercase tracking-widest"
          >
            {cargando ? 'Registrando…' : 'Finalizar Bloque'}
          </button>
        )}
      </div>

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
  const { user } = useAuth();
  const { showToast } = useToast();

  const [rutina, setRutina]           = useState(location.state?.rutina ?? null);
  const [completados, setCompletados] = useState([]);
  const [loading, setLoading]         = useState(!location.state?.rutina);

  useEffect(() => {
    if (!rutina && user?.idUsuario) {
      getRutinaHoy(user.idUsuario)
        .then((res) => {
          if (res.data) {
            setRutina(res.data);
          } else {
            showToast('No hay rutina activa para hoy.', 'warning');
            navigate('/dashboard');
          }
        })
        .catch(() => {
          showToast('No hay rutina activa. Genera una desde el Dashboard.', 'warning');
          navigate('/dashboard');
        })
        .finally(() => setLoading(false));
    }
  }, [user?.idUsuario, rutina, navigate, showToast]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4 animate-pulse">
        <div className="h-12 bg-neutral-900 border border-neutral-800 rounded-none" />
        <div className="h-64 bg-neutral-900 border border-neutral-800 rounded-none" />
      </div>
    );
  }

  if (!rutina) return null;

  const totalEj        = rutina.ejercicios.length;
  const progresoPorc   = Math.round((completados.length / totalEj) * 100);
  const todosCompletos = completados.length === totalEj;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
        <div className="space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs text-neutral-500 hover:text-neutral-300 font-bold uppercase tracking-wider block"
          >
            &larr; Volver
          </button>
          <h1 className="text-xl font-black text-white uppercase tracking-wider">
            Sesión de entrenamiento
          </h1>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">
            {rutina.objetivo} &middot; {rutina.fecha}
          </p>
        </div>
        <div className="text-right font-mono">
          <p className="text-2xl font-black text-yellow-400">{progresoPorc}%</p>
          <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">
            {completados.length} / {totalEj} COMPLETADOS
          </p>
        </div>
      </div>

      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-none h-2.5 p-[2px]">
        <div
          className={`h-full rounded-none transition-all duration-300 ${
            todosCompletos ? 'bg-green-500' : 'bg-yellow-400'
          }`}
          style={{ width: `${progresoPorc}%` }}
        />
      </div>

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

      {todosCompletos && (
        <div className="rounded-none bg-neutral-900 border-2 border-green-500 p-8 text-center space-y-4 shadow-2xl">
          <span role="img" aria-label="Racha" className="text-3xl filter drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] block">⚡</span>
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Objetivo cumplido con éxito
          </h2>
          <p className="text-neutral-400 text-xs max-w-sm mx-auto uppercase tracking-wide leading-relaxed">
            Todos los bloques del día han sido consolidados y sincronizados en tu historial de rendimiento.
          </p>
          <button
            onClick={() => navigate('/ranking')}
            className="bg-green-500 hover:bg-green-600 text-neutral-950 font-black text-xs px-6 py-3 rounded-none uppercase tracking-widest mt-2"
          >
            Ver tabla de posiciones
          </button>
        </div>
      )}
    </div>
  );
}
