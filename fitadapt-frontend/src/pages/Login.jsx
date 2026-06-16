import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const simularLogin = () => {
    setCargando(true);
    axios.get('http://localhost:8080/api/auth/token-test?username=maria@test.com&role=USUARIO')
      .then(respuesta => {
        localStorage.setItem('fitadapt_jwt', respuesta.data);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert("Falló la conexión con el backend");
        setCargando(false);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a FITADAPT</h1>
      <p>Inicia sesión para ver tu rutina</p>
      
      <button 
        onClick={simularLogin} 
        disabled={cargando}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {cargando ? 'Conectando...' : 'Entrar'}
      </button>
    </div>
  );
}