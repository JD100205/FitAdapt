import { useEffect, useState } from 'react';
import { useAuth }             from '../context/AuthContext';
import { getRutinaHoy, generarRutina } from '../services/rutinaService';
import VolumenSelector from '../components/dashboard/VolumenSelector';
import RutinaCard      from '../components/dashboard/RutinaCard';
import GamificacionBar from '../components/dashboard/GamificacionBar';

export default function DashboardPage() {
  const { user } = useAuth();
  const [rutina, setRutina]         = useState(null);
  const [sinRutina, setSinRutina]   = useState(false);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await getRutinaHoy(user.idUsuario);

        // caso 204 o vacío
        if (!res.data) {
          setSinRutina(true);
          setRutina(null);
        } else {
          setRutina(res.data);
          setSinRutina(false);
        }

      } catch (err) {
        console.log(err);
        setSinRutina(true);
        setRutina(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?.idUsuario) check();
  }, [user?.idUsuario]);
  
  const handleGenerarRutina = async (volumen) => {
    const res = await generarRutina(user.idUsuario, volumen);
    setRutina(res.data);
    setSinRutina(false);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <GamificacionBar />

      {sinRutina && (
        <VolumenSelector onConfirm={handleGenerarRutina} />
      )}

      {rutina && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Rutina de hoy — {rutina.objetivo}</h2>
          {rutina.ejercicios.map((ej) => (
            <RutinaCard key={ej.idEjercicio} ejercicio={ej} />
          ))}
        </div>
      )}
    </div>
  );
}