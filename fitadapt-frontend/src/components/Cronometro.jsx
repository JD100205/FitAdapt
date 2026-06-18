import { useEffect, useRef, useState } from 'react';

function formatearTiempo(totalSegundos) {
  const minutos = Math.floor(totalSegundos / 60).toString().padStart(2, '0');
  const segundos = (totalSegundos % 60).toString().padStart(2, '0');
  return `${minutos}:${segundos}`;
}

/**
 * Cronómetro real (Iniciar / Finalizar).
 *
 * - Calcula el tiempo transcurrido a partir de timestamps (Date.now()),
 *   no acumulando "+1" en cada tick. Esto evita el drift típico de
 *   setInterval (que se desincroniza si el hilo de JS se bloquea un
 *   momento) y sigue siendo preciso aunque la pestaña pierda foco.
 * - Al pulsar "Finalizar" entrega los segundos exactos transcurridos
 *   al componente padre mediante onFinalizar(segundosTotales).
 * - El anillo de progreso es solo una referencia visual en vivo:
 *   refleja los mismos umbrales de cumplimiento que usa el backend
 *   (30% = insuficiente, 85% = completado sin advertencia) para que
 *   el usuario tenga feedback inmediato, pero el veredicto oficial
 *   siempre lo calcula el servidor al recibir el tiempo.
 */
export default function Cronometro({ segundosObjetivo, onFinalizar, deshabilitado }) {
  const [segundos, setSegundos] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const inicioRef = useRef(null);
  const intervaloRef = useRef(null);

  useEffect(() => () => clearInterval(intervaloRef.current), []);

  const iniciar = () => {
    if (corriendo || deshabilitado) return;
    inicioRef.current = Date.now();
    setSegundos(0);
    setCorriendo(true);
    intervaloRef.current = setInterval(() => {
      setSegundos(Math.floor((Date.now() - inicioRef.current) / 1000));
    }, 250);
  };

  const finalizar = () => {
    if (!corriendo) return;
    clearInterval(intervaloRef.current);
    const transcurridoFinal = Math.floor((Date.now() - inicioRef.current) / 1000);
    setSegundos(transcurridoFinal);
    setCorriendo(false);
    onFinalizar(transcurridoFinal);
  };

  const ratio = segundosObjetivo ? segundos / segundosObjetivo : 0;
  const progreso = Math.min(ratio, 1);

  let nivel = 'inicio';
  if (segundos > 0) {
    if (ratio < 0.3) nivel = 'bajo';
    else if (ratio < 0.85) nivel = 'medio';
    else nivel = 'alto';
  }

  return (
    <div className="chrono">
      <div
        className={`chrono-ring nivel-${nivel} ${corriendo ? 'is-running' : ''}`}
        style={{ '--progreso': progreso }}
      >
        <div className="chrono-readout">
          <span className="chrono-time">{formatearTiempo(segundos)}</span>
          <span className="chrono-label">
            {corriendo ? 'En marcha' : segundos > 0 ? 'Detenido' : 'Listo para empezar'}
          </span>
        </div>
      </div>

      <div className="chrono-actions">
        {!corriendo ? (
          <button className="btn btn-start" onClick={iniciar} disabled={deshabilitado}>
            ▶ Iniciar
          </button>
        ) : (
          <button className="btn btn-stop" onClick={finalizar}>
            ■ Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
