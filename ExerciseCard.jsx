import { CheckCircle2, Circle, Dumbbell } from 'lucide-react';
import Cronometro from './Cronometro';

/**
 * Tarjeta de un ejercicio dentro de la rutina.
 *
 * - El círculo de la derecha refleja si ya se registró un resultado
 *   para este ejercicio (no es un checkbox manual: se marca solo
 *   cuando el backend confirma el registro en /historial/registrar).
 * - Al tocar la tarjeta se expande y aparece el cronómetro real
 *   (Iniciar/Finalizar) para ese ejercicio en concreto.
 */
export default function ExerciseCard({
  ejercicio,
  numero,
  resultado,
  expandido,
  enviando,
  onToggle,
  onFinalizar,
}) {
  const { nombreEjercicio, descripcion, repeticiones, tiempoEstimadoMinutos, intensidad } = ejercicio;
  const completado = Boolean(resultado);

  return (
    <article className={`exercise-card ${expandido ? 'is-expanded' : ''} ${completado ? 'is-done' : ''}`}>
      <button type="button" className="exercise-card-summary" onClick={onToggle}>
        <span className="exercise-thumb" aria-hidden="true">
          <Dumbbell size={22} />
        </span>

        <span className="exercise-info">
          <span className="exercise-name">{numero}. {nombreEjercicio}</span>
          <span className="exercise-meta">
            {repeticiones} repeticiones · Intensidad {(intensidad || '').toLowerCase()} · {tiempoEstimadoMinutos} min
          </span>
        </span>

        <span className="exercise-status" aria-hidden="true">
          {completado ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </span>
      </button>

      {expandido && (
        <div className="exercise-card-body">
          {descripcion && <p className="exercise-description">{descripcion}</p>}

          <Cronometro
            segundosObjetivo={tiempoEstimadoMinutos * 60}
            onFinalizar={onFinalizar}
            deshabilitado={enviando}
          />

          {enviando && <p className="status-text">Evaluando esfuerzo…</p>}

          {resultado && (
            <div className={`result-banner result-${resultado.tipo}`}>
              {resultado.mensaje}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
