// src/pages/LoginPage.jsx
import { useState }     from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }      from '../context/AuthContext';
import { useToast }     from '../context/ToastContext';
import { loginUsuario } from '../services/authService';

export default function LoginPage() {
  const { login }  = useAuth();
  const { showToast } = useToast();
  const navigate   = useNavigate();

  const [form, setForm]       = useState({ email: '', contrasenia: '' });
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
      // res.data → { token, idUsuario, nombre }
      const { token, idUsuario, nombre } = res.data;

      // hasProfile: la API podría incluirlo; si no, lo detectamos en Onboarding
      login(token, { idUsuario, nombre, hasProfile: res.data.hasProfile ?? false });
      navigate(res.data.hasProfile ? '/dashboard' : '/onboarding');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Marca */}
        <div className="text-center mb-8">
          <span className="text-4xl">💪</span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-2">FitAdapt</h1>
          <p className="text-gray-500 text-sm mt-1">Entrenamiento inteligente y adaptativo</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasenia"
                value={form.contrasenia}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                  bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                text-white font-bold py-3 rounded-xl transition mt-2"
            >
              {cargando ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-indigo-600 font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
