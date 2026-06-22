import { useState }           from 'react';
import { useNavigate }        from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';
import { crearPerfil, registrarLesiones } from '../services/perfilService';
import StepFisico   from '../components/onboarding/StepFisico';
import StepLesiones from '../components/onboarding/StepLesiones';

export default function OnboardingPage() {
  const { user, login, token } = useAuth();
  const navigate = useNavigate();
  const [step, setStep]     = useState(1);
  const [datosFisicos, setDatosFisicos] = useState(null);

  const handleStep1 = (datos) => {
    setDatosFisicos(datos);
    setStep(2);
  };

  const handleStep2 = async (idsZonasLesionadas) => {
    await crearPerfil({ idUsuario: user.idUsuario, ...datosFisicos });
    await registrarLesiones(user.idUsuario, idsZonasLesionadas);
    login(token, { ...user, hasProfile: true });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Barra de progreso */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {step === 1 && <StepFisico onNext={handleStep1} />}
        {step === 2 && <StepLesiones onBack={() => setStep(1)} onFinish={handleStep2} />}
      </div>
    </div>
  );
}