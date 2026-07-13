// src/components/workout/ExerciseCard.jsx
import Timer             from './Timer';
import CompletionModal     from './CompletionModal';
import { useState }        from 'react';
import { useAuth }         from '../../context/AuthContext';
import { registrarHistorial } from '../../services/gamificacionService';
import { useGamificacion } from '../../context/GamificacionContext';
import { useToast }        from '../../context/ToastContext';
import { detectaMedicalAlert } from '../../utils/helpers';

export default function ExerciseCard({ ejercicio, onCompletado }) {
  const { user }                    = useAuth();
  const { actualizarTrasEjercicio } = useGamificacion();
  const { showToast }               = useToast();

  const [completado, setCompletado] = useState(false);
  const [resultado, setResultado]   = useState(null);
  const [tiempoReal, setTiempoReal] = useState(ejercicio.tiempoEstimadoMinutos * 60);
  const [modalAbierto, setModal]    = useState(false);
  const [cargando, setCargando]     = useState(false);

  const esMedical = detectaMedicalAlert(ejercicio.descripcion);

  const handleCompletar = async () => {
    if (completado || cargando) return;
    setCargando(true);
    try {
      const res = await registrarHistorial(
        user.idUsuario,
        ejercicio.idEjercicio,
        Math.max(Math.floor(tiempoReal / 60), 1)
      );
      actualizarTrasEjercicio(res.data);
      setResultado(res.data);
      setCompletado(true);
      setModal(true);
      onCompletado?.(ejercicio.idEjercicio);
    } catch {
      showToast('No se pudo registrar el ejercicio. Intenta de nuevo.', 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`p-5 border rounded-none transition-all duration-150 ${
      esMedical
        ? 'border-red-800 bg-red-950/20'
        : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
    }`}>
      
      {/* Alerta Médica Minimalista */}
      {esMedical && (
        <div className="flex items-center gap-1.5 mb-2 text-red-400 text-[10px] font-black uppercase tracking-wider">
          <span>⚠️ RESTRICCIÓN CLÍNICA EN EJECUCIÓN</span>
        </div>
      )}

      {/* Nombre del Ejercicio */}
      <h3 className="font-black text-white text-base uppercase tracking-wide">
        {ejercicio.nombreEjercicio}
      </h3>
      
      {/* Descripción */}
      <p className={`text-xs mt-1 leading-relaxed font-medium uppercase tracking-wide ${
        esMedical ? 'text-red-300/80' : 'text-neutral-400'
      }`}>
        {ejercicio.descripcion}
      </p>

      {/* Bloque de Metadatos Tácticos */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="inline-flex items-center text-[10px] font-bold bg-neutral-950 border border-neutral-800 text-neutral-300 h-6 px-2.5 rounded-none uppercase tracking-wider">
          {ejercicio.repeticiones} REPS
        </span>
        <span className="inline-flex items-center text-[10px] font-bold bg-neutral-950 border border-neutral-800 text-neutral-300 h-6 px-2.5 rounded-none uppercase tracking-wider">
          {ejercicio.tiempoEstimadoMinutos} MIN
        </span>
        <span className={`inline-flex items-center text-[10px] font-black border h-6 px-2.5 rounded-none uppercase tracking-widest ${
          ejercicio.intensidad === 'Alta'  ? 'bg-red-950/40 border-red-900 text-red-400' :
          ejercicio.intensidad === 'Media' ? 'bg-yellow-950/40 border-yellow-900 text-yellow-400' :
                                             'bg-emerald-950/40 border-emerald-900 text-emerald-400'
        }`}>
          {ejercicio.intensidad}
        </span>
      </div>

      {/* Control del Temporizador */}
      {!completado && (
        <Timer minutos={ejercicio.tiempoEstimadoMinutos} onTick={setTiempoReal} />
      )}

      {/* Acciones del Módulo */}
      {!completado && (
        <button
          type="button"
          onClick={handleCompletar}
          disabled={cargando}
          className="mt-5 w-full h-11 bg-neutral-950 hover:bg-neutral-800 disabled:opacity-30 
            text-white border border-neutral-800 hover:border-neutral-700 font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-150"
        >
          {cargando ? 'Procesando registro...' : 'Marcar como completado'}
        </button>
      )}

      {completado && (
        <div className="mt-5 h-11 border border-emerald-900/40 bg-emerald-950/20 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-none">
          <span>● EXEC_SUCCESS // EJERCICIO FINALIZADO</span>
        </div>
      )}

      {modalAbierto && resultado && (
        <CompletionModal resultado={resultado} onClose={() => setModal(false)} />
      )}
    </div>
  );
}