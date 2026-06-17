import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import api from '../api/client';
import Sidebar from '../components/Sidebar';
import ExerciseCard from '../components/ExerciseCard';

// El login de prueba simula a "maria@test.com", que en los datos
// semilla (INSERTS_FITADAPT.sql) corresponde a Maria Lopez, idUsuario 2.
// (El código anterior usaba idUsuario 1, que en realidad es Juan Pérez;
// lo corrijo aquí para que la rutina generada coincida con la persona
// que inició sesión.)
const ID_USUARIO_DEMO = 2;

export default function Dashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => localStorage.getItem('fitadapt_jwt') || '');

  const [puntosTotales, setPuntosTotales] = useState(350); // Valor inicial

  const [rutina, setRutina] = useState(null);
  const [cargandoRutina, setCargandoRutina] = useState(true);
  const [errorRutina, setErrorRutina] = useState('');

  const [expandidoId, setExpandidoId] = useState(null);
  const [resultados, setResultados] = useState({}); // { [idEjercicio]: { tipo, mensaje } }
  const [enviandoId, setEnviandoId] = useState(null);

  // Evita que React StrictMode (que en desarrollo ejecuta los efectos
  // dos veces) dispare dos POST y genere dos rutinas duplicadas.
  const yaGeneradaRef = useRef(false);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token || yaGeneradaRef.current) return;
    yaGeneradaRef.current = true;

    api.post(`/api/rutinas/generar/${ID_USUARIO_DEMO}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((respuesta) => {
        setRutina(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorRutina(
          'No pudimos generar tu rutina. Verifica que el backend esté corriendo y que el usuario tenga un perfil físico registrado.'
        );
      })
      .finally(() => setCargandoRutina(false));
  }, [token]);

  const toggleExpandido = (idEjercicio) => {
    setExpandidoId((actual) => (actual === idEjercicio ? null : idEjercicio));
  };

  // Se dispara cuando el usuario pulsa "Finalizar" en el cronómetro
  // de un ejercicio puntual dentro de la rutina.
  const registrarEjercicio = (ejercicio, segundosTotales) => {
    const minutosReales = Math.round(segundosTotales / 60);

    setEnviandoId(ejercicio.idEjercicio);

    api.post('/api/v1/historial/registrar', {
      idUsuario: ID_USUARIO_DEMO,
      idEjercicio: ejercicio.idEjercicio,
      tiempoReal: minutosReales,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((respuesta) => {
        const { estado, puntosObtenidos, puntosTotalesNuevos } = respuesta.data;
        const estadoNormalizado = estado.toLowerCase();
        const tipo = estadoNormalizado.includes('insuficiente')
          ? 'error'
          : estadoNormalizado.includes('advertencia')
            ? 'advertencia'
            : 'exito';

        setResultados((actuales) => ({
          ...actuales,
          [ejercicio.idEjercicio]: { tipo, mensaje: `${estado} · +${puntosObtenidos} pts` },
        }));
        setPuntosTotales(puntosTotalesNuevos);
      })
      .catch((error) => {
        console.error(error);
        setResultados((actuales) => ({
          ...actuales,
          [ejercicio.idEjercicio]: { tipo: 'error', mensaje: 'Hubo un error al registrar el ejercicio.' },
        }));
      })
      .finally(() => setEnviandoId(null));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('fitadapt_jwt');
  };

  const ejercicios = rutina?.ejercicios ?? [];
  const completados = ejercicios.filter((ej) => resultados[ej.idEjercicio]).length;
  const totalMinutos = ejercicios.reduce((acc, ej) => acc + (ej.tiempoEstimadoMinutos || 0), 0);
  const progresoPorcentaje = ejercicios.length ? (completados / ejercicios.length) * 100 : 0;
  const todoCompletado = ejercicios.length > 0 && completados === ejercicios.length;

  return (
    <div className="app-layout">
      <Sidebar onCerrarSesion={cerrarSesion} />

      <div className="main-area">
        <header className="routine-header">
          <div className="routine-header-top">
            <h1>Rutina de hoy</h1>
            <span className="points-pill">🏆 {puntosTotales} pts</span>
          </div>

          {!cargandoRutina && !errorRutina && (
            <>
              <p className="routine-meta">
                <Clock size={16} />
                {totalMinutos} minutos · {ejercicios.length} ejercicios
              </p>

              <div className="routine-progress">
                <div className="routine-progress-labels">
                  <span>Progreso</span>
                  <span>{completados}/{ejercicios.length} completados</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progresoPorcentaje}%` }} />
                </div>
              </div>
            </>
          )}
        </header>

        <main className="routine-content">
          {cargandoRutina && <p className="status-text">Generando tu rutina…</p>}

          {errorRutina && <div className="result-banner result-error">{errorRutina}</div>}

          {!cargandoRutina && !errorRutina && (
            <>
              <div className="exercise-grid">
                {ejercicios.map((ejercicio, indice) => (
                  <ExerciseCard
                    key={ejercicio.idEjercicio}
                    ejercicio={ejercicio}
                    numero={indice + 1}
                    resultado={resultados[ejercicio.idEjercicio]}
                    expandido={expandidoId === ejercicio.idEjercicio}
                    enviando={enviandoId === ejercicio.idEjercicio}
                    onToggle={() => toggleExpandido(ejercicio.idEjercicio)}
                    onFinalizar={(segundos) => registrarEjercicio(ejercicio, segundos)}
                  />
                ))}
              </div>

              <div className={`routine-cta ${todoCompletado ? 'is-done' : ''}`}>
                {todoCompletado ? '¡Rutina completada! 🎉' : 'Completa todos los ejercicios'}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
