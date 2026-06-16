import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [estadoBackend, setEstadoBackend] = useState("");
  const [token, setToken] = useState("");
  
  // Estados para la gamificación
  const [puntosTotales, setPuntosTotales] = useState(350); // Valor inicial
  const [tiempoReal, setTiempoReal] = useState('');
  const [mensajeResultado, setMensajeResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('fitadapt_jwt');
    if (!jwt) {
      navigate('/');
      return;
    }
    setToken(jwt);
  }, [navigate]);

  const enviarEjercicio = () => {
    if (!tiempoReal || tiempoReal <= 0) {
      alert("Ingresa un tiempo válido");
      return;
    }

    setCargando(true);
    setMensajeResultado("Evaluando esfuerzo...");

    // Llamamos al endpoint que construimos en el Paso 2
    axios.post('http://localhost:8080/api/v1/historial/registrar', {
      idUsuario: 1, // María Fernández
      idEjercicio: 1, // Sentadillas (15 min estimados)
      tiempoReal: parseInt(tiempoReal)
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(respuesta => {
      // Si el backend procesa bien, actualizamos la pantalla con el JSON que nos devuelve
      setMensajeResultado(`Resultado: ${respuesta.data.estado} (+${respuesta.data.puntosObtenidos} pts)`);
      setPuntosTotales(respuesta.data.puntosTotalesNuevos);
      setCargando(false);
      setTiempoReal(''); // Limpiamos el input
    })
    .catch(error => {
      console.error(error);
      setMensajeResultado("Hubo un error al registrar el ejercicio.");
      setCargando(false);
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem('fitadapt_jwt');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h1>Panel FITADAPT</h1>
        <h2 style={{ color: '#007BFF' }}>🏆 {puntosTotales} pts</h2>
      </header>

      <main style={{ marginTop: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: '0' }}>Rutina Activa: Sentadillas</h3>
          <p><strong>Nivel:</strong> Novato | <strong>Impacto:</strong> Alto en Rodilla</p>
          <p><strong>Tiempo Estimado:</strong> 15 minutos</p>
          
          <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor="tiempo">¿En cuánto tiempo real lo terminaste? (minutos):</label>
            <input 
              id="tiempo"
              type="number" 
              value={tiempoReal} 
              onChange={(e) => setTiempoReal(e.target.value)}
              placeholder="Ej. 15"
              style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            
            <button 
              onClick={enviarEjercicio}
              disabled={cargando}
              style={{ padding: '12px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
            >
              {cargando ? 'Procesando...' : 'Completar Ejercicio'}
            </button>
          </div>

          {mensajeResultado && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: mensajeResultado.includes('advertencia') || mensajeResultado.includes('insuficiente') ? '#fff3cd' : '#d4edda', borderRadius: '5px', fontWeight: 'bold' }}>
              {mensajeResultado}
            </div>
          )}
        </div>
      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/" onClick={cerrarSesion}>
          <button style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
            Cerrar Sesión
          </button>
        </Link>
      </footer>
    </div>
  );
}