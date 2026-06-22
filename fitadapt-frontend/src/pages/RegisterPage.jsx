// src/pages/RegisterPage.jsx
import { useState }        from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }         from '../context/AuthContext';
import { useToast }        from '../context/ToastContext';
import { registrarUsuario, loginUsuario } from '../services/authService';

export default function RegisterPage() {
  const { login }     = useAuth();
  const { showToast } = useToast();
  const navigate      = useNavigate();

  const [form, setForm] = useState({ nombre: '', email: '', contrasenia: '', confirmar: '' });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.contrasenia) {
      showToast('Completa todos los campos.', 'warning');
      return;
    }
    if (form.contrasenia !== form.confirmar) {
      showToast('Las contraseñas no coinciden.', 'error');
      return;
    }
    if (form.contrasenia.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres.', 'warning');
      return;
    }

    setCargando(true);
    try {
      // 1. Registrar
      await registrarUsuario(form.nombre, form.email, form.contrasenia);
      // 2. Auto-login inmediato
      const res = await loginUsuario(form.email, form.contrasenia);
      const { token, idUsuario, nombre } = res.data;
      login(token, { idUsuario, nombre, hasProfile: false });
      showToast(`¡Bienvenido, ${nombre}! Completa tu perfil.`, 'success');
      navigate('/onboarding');
    } catch (err) {
      const msg =
        err.response?.status === 409
          ? 'Ese correo ya está registrado.'
          : 'Error al crear la cuenta. Intenta de nuevo.';
      showToast(msg, 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-50 dark:from-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">💪</span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-2">FitAdapt</h1>
          <p className="text-gray-500 text-sm mt-1">Crea tu cuenta gratuita</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Crear cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {[
              { name: 'nombre',     label: 'Nombre completo', type: 'text',     placeholder: 'Tu nombre' },
              { name: 'email',      label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
              { name: 'contrasenia', label: 'Contraseña',     type: 'password', placeholder: 'Mín. 6 caracteres' },
              { name: 'confirmar',  label: 'Confirmar contraseña', type: 'password', placeholder: '••••••••' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60
                text-white font-bold py-3 rounded-xl transition mt-2"
            >
              {cargando ? 'Creando cuenta…' : 'Crear mi cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
