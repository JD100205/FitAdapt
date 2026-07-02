// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate }         from 'react-router-dom';
import { useAuth }             from '../context/AuthContext';
import { useToast }            from '../context/ToastContext';
import { getRutinaHoy, generarRutina } from '../services/rutinaService';
import VolumenSelector from '../components/dashboard/VolumenSelector';
import RutinaCard      from '../components/dashboard/RutinaCard';
import GamificacionBar from '../components/dashboard/GamificacionBar';

export default function DashboardPage() {
  const { user }      = useAuth();
  const { showToast } = useToast();
  const navigate      = useNavigate();

  const [rutina, setRutina]       = useState(null);
  const [sinRutina, setSinRutina] = useState(false);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const fetchRutina = async () => {
      try {
        const res = await getRutinaHoy(user?.idUsuario);
        if (res.data && res.status !== 204) {
          setRutina(res.data);
          setSinRutina(false);
        } else {
          setSinRutina(true);
        }
      } catch {
        setSinRutina(true);
      } finally {
        setLoading(false);
      }
    };
    if (user?.idUsuario) fetchRutina();
  }, [user?.idUsuario]);

  const handleGenerarRutina = async (volumen) => {
    try {
      const res = await generarRutina(user.idUsuario, volumen);
      setRutina(res.data);
      setSinRutina(false);
      showToast('¡Rutina lista! Puedes comenzar.', 'success');
    } catch (err) {
      const status = err.response?.status;
      const msg =
        status === 404
          ? 'Perfil no encontrado. Contacta con soporte.'
          : status === 422
          ? 'Completa tu perfil físico antes de generar una rutina.'
          : 'No se pudo generar la rutina. Inténtalo de nuevo.';
      showToast(msg, 'error');
    }
  };

  const handleIniciarEntrenamiento = () => {
    navigate('/entrenamiento', { state: { rutina } });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4 animate-pulse">
        <div className="h-16 bg-[#111111] border border-[#1f1f1f]" />
        <div className="h-48 bg-[#111111] border border-[#1f1f1f]" />
        <div className="h-32 bg-[#111111] border border-[#1f1f1f]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans p-6 selection:bg-yellow-400 selection:text-neutral-900">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Barra de gamificación */}
        <GamificacionBar />

        {/* Sin rutina → Selector de volumen */}
        {/* BUG FIX: se eliminó el div wrapper extra que duplicaba el estilo del VolumenSelector */}
        {sinRutina && !rutina && (
          <VolumenSelector onConfirm={handleGenerarRutina} />
        )}

        {/* Rutina cargada */}
        {rutina && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
              <div>
                <h2 className="text-base font-black uppercase tracking-wider text-white">
                  Programa de hoy
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">
                  Objetivo:{' '}
                  <span className="text-yellow-400 font-bold">{rutina.objetivo}</span>
                  {' · '}
                  {rutina.ejercicios?.length || 0} ejercicios
                </p>
              </div>
              <button
                onClick={handleIniciarEntrenamiento}
                className="bg-yellow-400 hover:bg-yellow-300 text-[#0a0a0a] font-black uppercase tracking-wider px-5 py-2.5 text-[11px] transition-colors"
              >
                ▶ Iniciar
              </button>
            </div>

            <div className="space-y-2">
              {rutina.ejercicios?.map((ej) => (
                <div key={ej.idEjercicio} className="border border-[#1f1f1f] hover:border-neutral-700 transition-colors">
                  <RutinaCard ejercicio={ej} />
                </div>
              ))}
            </div>

            <button
              onClick={handleIniciarEntrenamiento}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0a0a0a] font-black uppercase tracking-widest py-4 text-[11px] transition-colors"
            >
              Comenzar entrenamiento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
