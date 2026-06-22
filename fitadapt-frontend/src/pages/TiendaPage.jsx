import { useAuth }         from '../context/AuthContext';
import { useToast }        from '../context/ToastContext';
import { useGamificacion } from '../context/GamificacionContext';
import { comprarProtector } from '../services/gamificacionService';

const COSTO_PROTECTOR = 500;

export default function TiendaPage() {
  const { user }       = useAuth();
  const { showToast }  = useToast();
  const { puntos, setProtectores } = useGamificacion();

  const handleComprar = async () => {
    try {
      await comprarProtector(user.idUsuario);
      setProtectores((prev) => prev + 1);
      showToast('¡Protector de Racha activado! 🛡', 'success');
    } catch (err) {
      if (err.response?.status === 400) {
        const faltantes = COSTO_PROTECTOR - puntos;
        showToast(
          `Puntos insuficientes. Te faltan ${faltantes} pts para comprar este ítem.`,
          'error'
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Tienda FitAdapt</h1>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 space-y-4">
        <div className="text-4xl text-center">🛡</div>
        <h2 className="text-xl font-bold text-center">Protector de Racha</h2>
        <p className="text-gray-500 text-sm text-center">
          Evita perder tu racha si un día no entrenas. ¡Úsalo con sabiduría!
        </p>
        <div className="text-center text-2xl font-bold text-indigo-600">
          {COSTO_PROTECTOR} pts
        </div>
        <p className="text-xs text-center text-gray-400">
          Tus puntos actuales: <strong>{puntos}</strong>
        </p>
        <button
          onClick={handleComprar}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}