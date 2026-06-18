import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/client';

export default function Login() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [email, setEmail] = useState('mariaF@test.com'); // Valor por defecto para pruebas
  const [contrasenia, setContrasenia] = useState('123456');
  const [error, setError] = useState('');

  const manejarLogin = (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    api.post('/api/auth/login', { email, contrasenia })
      .then((respuesta) => {
        // Guardamos el token y el ID del usuario real
        localStorage.setItem('fitadapt_jwt', respuesta.data.token);
        localStorage.setItem('fitadapt_userId', respuesta.data.idUsuario);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err);
        setError('Credenciales incorrectas o backend apagado.');
        setCargando(false);
      });
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <span className="login-brand">FITADAPT</span>
        <h1>Bienvenida de vuelta</h1>
        <p className="card-subtext">Ingresa tus datos para ver tu rutina.</p>

        <form onSubmit={manejarLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico" 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
          <input 
            type="password" 
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Contraseña" 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
          
          {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}

          <button type="submit" disabled={cargando} className="btn btn-primary btn-block">
            {cargando ? 'Conectando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}