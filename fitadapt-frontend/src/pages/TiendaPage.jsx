// src/pages/TiendaPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGamificacion } from '../context/GamificacionContext';
import { useToast } from '../context/ToastContext';
import { comprarProtector } from '../services/gamificacionService';

export default function TiendaPage() {
  const { user } = useAuth();
  const { puntos, protectores, actualizarTrasCompra } = useGamificacion();
  const { showToast } = useToast();
  const [comprando, setComprando] = useState(false);

  const precioProtector = 400;

  // FIX: antes esta función solo restaba puntos y sumaba protectores en el
  // contexto local (React state), sin llamar nunca al backend. El resultado
  // se veía correcto en pantalla pero la BD nunca se enteraba de la compra:
  // el saldo real en la BD quedaba intacto (y por ejemplo, al recargar la
  // página o volver a iniciar sesión, los puntos "gastados" reaparecían).
  // Ahora se llama a /api/v1/tienda/comprar-protector/{idUsuario} y el estado
  // del front se actualiza con los valores reales que devuelve el backend
  // (ya persistidos en BD), no con un cálculo optimista en memoria.
  const handleComprarProtector = async () => {
    if (comprando) return;
    if (puntos < precioProtector) {
      showToast('No tienes puntos suficientes.', 'error');
      return;
    }

    setComprando(true);
    try {
      const res = await comprarProtector(user.idUsuario);
      const { puntosTotales, protectoresRacha } = res.data;
      actualizarTrasCompra(puntosTotales, protectoresRacha);
      showToast('¡Protector de racha adquirido con éxito!', 'success');
    } catch (err) {
      const msg = err.response?.data
        ? String(err.response.data)
        : 'No se pudo completar la compra. Intenta de nuevo.';
      showToast(msg, 'error');
    } finally {
      setComprando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 font-sans bg-neutral-950 text-white selection:bg-yellow-400 selection:text-neutral-900">

      {/* ENCABEZADO DE LA TIENDA */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
          <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-sm font-black uppercase tracking-widest text-white">Tienda FitAdapt</h1>
        </div>
        <p className="text-xs text-neutral-400 uppercase tracking-wider mt-1">
          Usa tus puntos para proteger tu progreso y obtener ventajas
        </p>
      </div>

      {/* VENTANA DE SALDO */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-none h-14 px-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.364 1.233.586 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.577-.38-1.81.586-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Saldo disponible</span>
        </div>
        <span className="text-sm font-bold font-mono text-yellow-400">
          {puntos} PTS
        </span>
      </div>

      {/* GRILLA DE ITEMS */}
      <div className="grid grid-cols-1 gap-4">

        {/* ITEM: PROTECTOR DE RACHA */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-none p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition hover:border-neutral-700">

          <div className="flex items-start gap-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-none p-2.5 text-yellow-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white mb-1">
                Protector de Racha ({protectores} activos)
              </h3>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-sm normal-case">
                Evita perder tu racha si un día no puedes completar tus ejercicios. Se consume de manera automática.
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-neutral-800 pt-3 sm:pt-0">
            <span className="text-xs font-bold font-mono text-neutral-200">
              {precioProtector} PTS
            </span>
            <button
              onClick={handleComprarProtector}
              disabled={puntos < precioProtector || comprando}
              className={`h-9 px-4 text-xs font-bold uppercase tracking-wider rounded-none border transition-all ${
                puntos >= precioProtector && !comprando
                  ? 'bg-yellow-400 text-neutral-950 border-yellow-400 hover:bg-yellow-500 shadow-md'
                  : 'bg-neutral-950 text-neutral-600 border-neutral-800 cursor-not-allowed'
              }`}
            >
              {comprando ? 'Procesando…' : 'Adquirir'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
