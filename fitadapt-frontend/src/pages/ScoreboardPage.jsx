import { useEffect, useState } from 'react';
import { getRanking }          from '../services/gamificacionService';
import LeagueBadge             from '../components/scoreboard/LeagueBadge';

const NIVELES = ['Novato', 'Intermedio', 'Avanzado'];

const getLiga = (puntos) => {
  if (puntos >= 10000) return 'Challenger';
  if (puntos >= 5000)  return 'Diamante';
  if (puntos >= 2000)  return 'Oro';
  if (puntos >= 1000)  return 'Plata';
  if (puntos >= 500)   return 'Bronce';
  return 'Hierro';
};

export default function ScoreboardPage() {
  const [nivel, setNivel]     = useState('Novato');
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    getRanking(nivel).then((res) => setRanking(res.data));
  }, [nivel]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🏆 Tabla de Posiciones</h1>

      {/* Pestañas de nivel */}
      <div className="flex gap-2 mb-6">
        {NIVELES.map((n) => (
          <button
            key={n}
            onClick={() => setNivel(n)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              nivel === n
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="space-y-2">
        {ranking.map((entry, i) => (
          <div
            key={entry.idUsuario}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <span className="text-lg font-bold w-8 text-gray-400">#{i + 1}</span>
            <span className="flex-1 font-semibold">{entry.nombre}</span>
            <span className="text-sm text-gray-500">{entry.puntosTotales} pts</span>
            <LeagueBadge liga={getLiga(entry.puntosTotales)} />
          </div>
        ))}
      </div>
    </div>
  );
}