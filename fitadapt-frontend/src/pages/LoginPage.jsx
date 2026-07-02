// src/pages/LoginPage.jsx
import { useState }           from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';
import { useToast }           from '../context/ToastContext';
import { loginUsuario }       from '../services/authService';
import FitAdaptLogo           from '../components/ui/FitAdaptLogo';

export default function LoginPage() {
  const { login }       = useAuth();
  const { showToast }   = useToast();
  const navigate        = useNavigate();

  const [form, setForm]         = useState({ email: '', contrasenia: '' });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.contrasenia) {
      showToast('Completa todos los campos.', 'warning');
      return;
    }
    setCargando(true);
    try {
      const res = await loginUsuario(form.email, form.contrasenia);
      const { token, idUsuario, nombre, puntosTotales, rachaActual, protectoresRacha } = res.data;

      // FIX: Leer puntos, racha y protectores directamente desde la respuesta del backend.
      // Antes se hardcodeaban en 0, haciendo que el balance siempre arrancara en cero
      // aunque el usuario ya tuviera puntos acumulados en BD.
      login(token, {
        idUsuario,
        nombre,
        puntosTotales:    puntosTotales    ?? 0,
        rachaActual:      rachaActual      ?? 0,
        protectoresRacha: protectoresRacha ?? 0,
        hasProfile:       true,
      });
      navigate('/dashboard');
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? 'Email o contraseña incorrectos.'
          : 'Error al conectar con el servidor.';
      showToast(msg, 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      <div className="w-full max-w-sm">

        <div className="flex justify-center mb-10">
          <FitAdaptLogo size="lg" />
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] p-8">
          <h2 className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6">
            Acceso a tu cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full px-3.5 py-2.5 border border-[#1f1f1f] bg-[#0a0a0a] text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contrasenia" className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">
                Contraseña
              </label>
              <input
                id="contrasenia"
                type="password"
                name="contrasenia"
                value={form.contrasenia}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-[#1f1f1f] bg-[#0a0a0a] text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-[#0a0a0a] font-black uppercase tracking-[0.15em] py-3.5 text-[11px] transition-colors mt-2"
            >
              {cargando ? 'Verificando…' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1a1a1a] text-center">
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
              ¿Sin cuenta?{' '}
              <Link to="/registro" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors">
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-neutral-800 uppercase tracking-widest mt-6">
          Entrenamiento adaptativo · v1.0
        </p>
      </div>
    </div>
  );
}
