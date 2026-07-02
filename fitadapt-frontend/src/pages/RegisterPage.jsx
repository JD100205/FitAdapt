// src/pages/RegisterPage.jsx
import { useState }                          from 'react';
import { Link, useNavigate }                 from 'react-router-dom';
import { useAuth }                           from '../context/AuthContext';
import { useToast }                          from '../context/ToastContext';
import { registrarUsuario, loginUsuario }    from '../services/authService';
import FitAdaptLogo                          from '../components/ui/FitAdaptLogo';

const CAMPOS = [
  { name: 'nombre',      label: 'Nombre completo',     type: 'text',     placeholder: 'Tu nombre' },
  { name: 'email',       label: 'Correo electrónico',  type: 'email',    placeholder: 'tu@correo.com' },
  { name: 'contrasenia', label: 'Contraseña',          type: 'password', placeholder: 'Mínimo 6 caracteres' },
  { name: 'confirmar',   label: 'Confirmar contraseña',type: 'password', placeholder: '••••••••' },
];

export default function RegisterPage() {
  const { login }     = useAuth();
  const { showToast } = useToast();
  const navigate      = useNavigate();

  const [form, setForm]         = useState({ nombre: '', email: '', contrasenia: '', confirmar: '' });
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
      await registrarUsuario(form.nombre, form.email, form.contrasenia);
      const res = await loginUsuario(form.email, form.contrasenia);
      const { token, idUsuario, nombre } = res.data;

      // BUG FIX: hasProfile: false → PublicRoute redirige a /onboarding
      // en lugar de al dashboard, permitiendo completar la configuración de perfil.
      login(token, {
        idUsuario,
        nombre,
        puntosTotales:    0,
        rachaActual:      0,
        protectoresRacha: 0,
        hasProfile:       false,
      });
      showToast(`¡Bienvenido, ${nombre}! Configura tu perfil.`, 'success');
      navigate('/onboarding');
    } catch (err) {
      const msg =
        err.response?.status === 400
          ? 'Ese correo ya está registrado.'
          : 'Error al crear la cuenta. Inténtalo de nuevo.';
      showToast(msg, 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <FitAdaptLogo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-[#1f1f1f] p-8">
          <h2 className="text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6">
            Crear cuenta nueva
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {CAMPOS.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-3.5 py-2.5 border border-[#1f1f1f] bg-[#0a0a0a] text-white text-sm placeholder:text-neutral-700 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-[#0a0a0a] font-black uppercase tracking-[0.15em] py-3.5 text-[11px] transition-colors mt-2"
            >
              {cargando ? 'Creando cuenta…' : 'Crear mi cuenta'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1a1a1a] text-center">
            <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-neutral-800 uppercase tracking-widest mt-6">
          El siguiente paso configurará tu perfil físico
        </p>
      </div>
    </div>
  );
}
