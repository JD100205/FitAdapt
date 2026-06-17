import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/client';

export default function Login() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const simularLogin = () => {
    setCargando(true);
    api.get('/api/auth/token-test?username=maria@test.com&role=USUARIO')
      .then((respuesta) => {
        localStorage.setItem('fitadapt_jwt', respuesta.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Falló la conexión con el backend');
        setCargando(false);
      });
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <span className="login-brand">FITADAPT</span>
        <h1>Bienvenida de vuelta</h1>
        <p className="card-subtext">Inicia sesión para ver tu rutina de hoy.</p>

        <button
          onClick={simularLogin}
          disabled={cargando}
          className="btn btn-primary btn-block"
        >
          {cargando ? 'Conectando…' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
