// src/pages/OnboardingPage.jsx
import { useState }                               from 'react';
import { useNavigate }                            from 'react-router-dom';
import { useAuth }                                from '../context/AuthContext';
import { useToast }                               from '../context/ToastContext';
import { crearPerfil, registrarLesiones }         from '../services/perfilService';
import StepFisico                                 from '../components/onboarding/StepFisico';
import StepLesiones                               from '../components/onboarding/StepLesiones';
import FitAdaptLogo                               from '../components/ui/FitAdaptLogo';

export default function OnboardingPage() {
  const { user, login, token } = useAuth();
  const { showToast }          = useToast();
  const navigate               = useNavigate();

  const [step, setStep]               = useState(1);
  const [datosFisicos, setDatosFisicos] = useState(null);

  const handleStep1 = (datos) => {
    setDatosFisicos(datos);
    setStep(2);
  };

  const handleStep2 = async (idsZonasLesionadas) => {
    try {
      await crearPerfil({ idUsuario: user.idUsuario, ...datosFisicos });
      await registrarLesiones(user.idUsuario, idsZonasLesionadas);
      login(token, { ...user, hasProfile: true });
      showToast('¡Perfil configurado! Ya puedes entrenar.', 'success');
      navigate('/dashboard');
    } catch (err) {
      // BUG FIX: antes era catch silencioso — ahora se muestra el error.
      const msg =
        err.response?.status === 400
          ? 'Datos inválidos. Revisa los campos e intenta de nuevo.'
          : 'No se pudo guardar el perfil. Inténtalo de nuevo.';
      showToast(msg, 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-6 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      
      {/* Logo arriba */}
      <div className="mb-8">
        <FitAdaptLogo size="md" />
      </div>

      <div className="w-full max-w-lg bg-[#111111] border border-[#1f1f1f] p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-[0.2em]">
            Paso {step} de 2
          </p>
          <h1 className="text-base font-black text-white uppercase tracking-wider mt-0.5">
            {step === 1 ? 'Parámetros físicos' : 'Zonas de restricción'}
          </h1>
        </div>

        {/* Barra de progreso */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                s <= step ? 'bg-yellow-400' : 'bg-[#1f1f1f]'
              }`}
            />
          ))}
        </div>

        {/* Pasos */}
        <div className="text-white">
          {step === 1 && <StepFisico onNext={handleStep1} />}
          {step === 2 && (
            <StepLesiones
              onBack={() => setStep(1)}
              onFinish={handleStep2}
            />
          )}
        </div>
      </div>
    </div>
  );
}
