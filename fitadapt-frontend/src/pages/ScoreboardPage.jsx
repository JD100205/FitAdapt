// src/pages/ScoreboardPage.jsx
import { useState, useEffect } from 'react';
import { getRanking } from '../services/gamificacionService';
import { useAuth } from '../context/AuthContext';

// FIX: esta página mostraba un arreglo RANKING_DATA hardcodeado en el frontend
// y nunca llamaba a getRanking() (que ya existía en gamificacionService.js).
// Ahora se consulta el endpoint real /api/v1/gamificacion/ranking/{nivelExperiencia}
// y se muestran los datos que vienen de la BD.

// Los valores deben coincidir EXACTAMENTE con lo guardado en PerfilFisico.nivelExperiencia
// (ver NIVEL_OPTIONS en utils/constants.js: 'Novato', 'Intermedio', 'Avanzado').
const TABS = [
  { label: 'NOVATO',      valor: 'Novato' },
  { label: 'INTERMEDIO',  valor: 'Intermedio' },
  { label: 'AVANZADO',    valor: 'Avanzado' },
];

export default function ScoreboardPage() {
  const { user } = useAuth();
  const [tabActiva, setTabActiva] = useState(TABS[0].valor);
  const [ranking, setRanking]     = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function cargarRanking() {
      setCargando(true);
      setError(false);
      try {
        const res = await getRanking(tabActiva);
        if (!cancelado) setRanking(res.data ?? []);
      } catch {
        if (!cancelado) setError(true);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarRanking();
    return () => { cancelado = true; };
  }, [tabActiva]);

  const getPosicionEstilo = (pos) => {
    if (pos === 1) return "text-yellow-400 font-black drop-shadow-[0_0_6px_rgba(250,204,21,0.2)]";
    if (pos === 2) return "text-neutral-300 font-bold";
    if (pos === 3) return "text-amber-600 font-bold";
    return "text-neutral-500";
  };

  const getRangoEstilo = (rango) => {
    if (rango === 'Bronce') {
      return "bg-neutral-950 text-amber-500 border-amber-900/50";
    }
    return "bg-neutral-950 text-neutral-400 border-neutral-800";
  };

  return (
    <div className="animate-in max-w-2xl mx-auto space-y-6 font-sans bg-neutral-950 text-white p-4 selection:bg-yellow-400 selection:text-neutral-900">

      {/* Encabezado */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
          <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 9a4 4 0 11-8 0 4 4 0 018 0zm-8 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h1 className="text-sm font-black uppercase tracking-widest text-white">Tabla de Posiciones</h1>
        </div>
        <p className="text-xs text-neutral-400 uppercase tracking-wider mt-1">
          Ranking global por experiencia acumulada
        </p>
      </div>

      {/* Filtros de Categoría (Tabs) */}
      <div className="flex gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-none">
        {TABS.map(({ label, valor }) => (
          <button
            key={valor}
            onClick={() => setTabActiva(valor)}
            className={`flex-1 h-9 text-xs font-bold tracking-wider rounded-none transition-colors duration-150 uppercase ${
              tabActiva === valor
                ? 'bg-yellow-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista del Ranking */}
      {cargando && (
        <div className="flex flex-col gap-2 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 bg-neutral-900 border border-neutral-800 rounded-none" />
          ))}
        </div>
      )}

      {!cargando && error && (
        <p className="text-xs text-red-400 uppercase tracking-wider text-center py-6">
          No se pudo cargar el ranking. Intenta de nuevo más tarde.
        </p>
      )}

      {!cargando && !error && ranking.length === 0 && (
        <p className="text-xs text-neutral-500 uppercase tracking-wider text-center py-6">
          Aún no hay usuarios registrados en esta categoría.
        </p>
      )}

      {!cargando && !error && ranking.length > 0 && (
        <div className="flex flex-col gap-2">
          {ranking.map((row) => (
            <div
              key={`${row.posicion}-${row.nombreJugador}`}
              className={`flex items-center justify-between h-14 px-5 bg-neutral-900 border rounded-none transition-all ${
                row.nombreJugador === user?.nombre
                  ? 'border-yellow-400/60'
                  : row.posicion === 1
                  ? 'border-yellow-400/40'
                  : 'border-neutral-800'
              }`}
            >
              <div className="flex items-center gap-5">
                <span className={`w-6 text-xs font-mono font-bold ${getPosicionEstilo(row.posicion)}`}>
                  #{row.posicion}
                </span>
                <span className="text-xs font-black tracking-wide text-neutral-200 uppercase">
                  {row.nombreJugador}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xs font-mono text-neutral-400">
                  <strong className="text-neutral-200 font-bold mr-1">{row.puntosTotales}</strong> PTS
                </span>

                <span className={`px-2.5 py-1 text-[10px] font-black tracking-widest border rounded-none uppercase ${getRangoEstilo(row.ligaActual)}`}>
                  {row.ligaActual}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
